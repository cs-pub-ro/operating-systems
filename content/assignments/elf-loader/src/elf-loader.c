// SPDX-License-Identifier: BSD-3-Clause

#define _GNU_SOURCE

#include <stdio.h>
#include <stdlib.h>
#include <sys/stat.h>
#include <unistd.h>
#include <sys/mman.h>
#include <fcntl.h>
#include <elf.h>
#include <string.h>
#include <sys/auxv.h>

#define STACK_PAGE_C 1024
#define AUXV_PAIRS 21

void *map_elf(const char *filename)
{
	// This part helps you store the content of the ELF file inside the buffer.
	struct stat st;
	void *file;
	int fd;

	fd = open(filename, O_RDONLY);
	if (fd < 0) {
		perror("open");
		exit(1);
	}

	fstat(fd, &st);

	file = mmap(NULL, st.st_size, PROT_READ, MAP_PRIVATE, fd, 0);
	if (file == MAP_FAILED) {
		perror("mmap");
		close(fd);
		exit(1);
	}

	return file;
}

void load_and_run(const char *filename, int argc, char **argv, char **envp)
{
	void *elf_contents = (char *)map_elf(filename);
	Elf64_Ehdr *elf_header = (Elf64_Ehdr *)elf_contents;
	if (memcmp(elf_header->e_ident, ELFMAG, SELFMAG)) {
		fprintf(stderr, "Not a valid ELF file\n");
		exit(3);
	}

	if (elf_header->e_ident[EI_CLASS] != ELFCLASS64) {
		fprintf(stderr, "Not a 64-bit ELF\n");
		exit(4);
	}

	long page_size = sysconf(_SC_PAGESIZE);
	long at_phdr = 0;

	uint64_t program_min = UINT64_MAX;
	uint64_t program_end = 0;

	Elf64_Phdr *program_header_table = elf_contents + elf_header->e_phoff;
	Elf64_Phdr *program_header = program_header_table;

	for (int i = 0; i < elf_header->e_phnum; i++) {

		if (program_header->p_type != PT_LOAD) {
			program_header = (Elf64_Phdr *)((void *)program_header + elf_header->e_phentsize);
			continue;
		}

		uint64_t start = program_header->p_vaddr & ~(uint64_t)(page_size - 1);
		uint64_t end = program_header->p_vaddr + program_header->p_memsz;

		if (start < program_min)
			program_min = start;
		if (end > program_end)
			program_end = end;

		program_header = (Elf64_Phdr *)((void *)program_header + elf_header->e_phentsize);
	}

	uint64_t program_size = program_end - program_min;
	uint64_t load_bias = 0;

	if (elf_header->e_type == ET_DYN) {
		void *image = mmap(NULL, program_size, PROT_READ | PROT_WRITE,
				   MAP_PRIVATE | MAP_ANONYMOUS, -1, 0);

		load_bias = (uint64_t)image - program_min;
	} else {
		mmap((void *)program_min, program_size, PROT_READ | PROT_WRITE,
		     MAP_PRIVATE | MAP_ANONYMOUS | MAP_FIXED, -1, 0);
	}

	program_header = program_header_table;
	for (int i = 0; i < elf_header->e_phnum; i++) {

		if (program_header->p_type != PT_LOAD) {
			program_header = (Elf64_Phdr *)((void *)program_header + elf_header->e_phentsize);
			continue;
		}

		if (elf_header->e_phoff >= program_header->p_offset &&
		    elf_header->e_phoff < program_header->p_offset + program_header->p_filesz) {
			at_phdr = (program_header->p_vaddr + load_bias) + (elf_header->e_phoff - program_header->p_offset);
		}

		memcpy((void *)(program_header->p_vaddr + load_bias),
		       elf_contents + program_header->p_offset,
		       program_header->p_filesz);

		program_header = (Elf64_Phdr *)((void *)program_header + elf_header->e_phentsize);
	}

	program_header = program_header_table;
	for (int i = 0; i < elf_header->e_phnum; i++) {

		if (program_header->p_type != PT_LOAD) {
			program_header = (Elf64_Phdr *)((void *)program_header + elf_header->e_phentsize);
			continue;
		}

		int permissions = 0;
		if (program_header->p_flags & PF_R)
			permissions |= PROT_READ;
		if (program_header->p_flags & PF_W)
			permissions |= PROT_WRITE;
		if (program_header->p_flags & PF_X)
			permissions |= PROT_EXEC;

		uint64_t start = program_header->p_vaddr + load_bias;
		void *p_ali_vaddr = (void *)(start & ~(uint64_t)(page_size - 1));

		mprotect(p_ali_vaddr,
			 program_header->p_memsz + (start - (uint64_t)p_ali_vaddr),
			 permissions);

		program_header = (Elf64_Phdr *)((void *)program_header + elf_header->e_phentsize);
	}

	void *stack_base = mmap(NULL, STACK_PAGE_C * page_size, PROT_READ | PROT_WRITE,
							MAP_ANONYMOUS | MAP_PRIVATE, -1, 0);
	
	long arg_size = 0;
	for (int i = 0; i < argc; i++) {
		arg_size += strlen(argv[i]) + 1;
	}

	long envc = 0;
	long env_size = 0;

	for (int i = 0; envp[i] != 0; i++) {
		envc++;
		env_size += strlen(envp[i]) + 1;
	}

	void *stack_top = stack_base + STACK_PAGE_C * page_size;

	long data_size = arg_size + env_size + 16 + sizeof("x86_64");
	long block_bytes = (argc + envc + 3) * 8 + AUXV_PAIRS * 16;
	char *strings = (char *)stack_top - data_size;
	void *sp = (void *)(((uintptr_t)strings - block_bytes) & ~(uintptr_t)0xF);
	void *stack_pointers = sp;

	*(long *)stack_pointers = argc;
	stack_pointers = (char *)stack_pointers + 8;

	char *execfn = strings;

	for (int i = 0; i < argc; i++) {
		*(char **)stack_pointers = strings;
		strings = stpcpy(strings, argv[i]) + 1;
		stack_pointers = (char *)stack_pointers + 8;
	}

	*(long *)stack_pointers = 0;
	stack_pointers = (char *)stack_pointers + 8;

	for (int i = 0; i < envc; i++) {
		*(char **)stack_pointers = strings;
		strings = stpcpy(strings, envp[i]) + 1;
		stack_pointers = (char *)stack_pointers + 8;
	}

	*(long *)stack_pointers = 0;
	stack_pointers = (char *)stack_pointers + 8;

	char *random_addr = strings;

	memcpy(random_addr, (const void *)getauxval(AT_RANDOM), 16);
	strings += 16;

	char *platform_addr = strings;

	strcpy(platform_addr, "x86_64");

	struct {
		uint64_t type;
		uint64_t value;
	} auxv[] = {
		{ AT_PHDR, at_phdr },
		{ AT_PHENT, elf_header->e_phentsize },
		{ AT_PHNUM, elf_header->e_phnum },
		{ AT_PAGESZ, page_size },
		{ AT_FLAGS, 0 },
		{ AT_BASE, 0 },
		{ AT_ENTRY, elf_header->e_entry + load_bias },
		{ AT_UID, getuid() },
		{ AT_EUID, geteuid() },
		{ AT_GID, getgid() },
		{ AT_EGID, getegid() },
		{ AT_SECURE, 0 },
		{ AT_RANDOM, (uint64_t)(uintptr_t)random_addr },
		{ AT_HWCAP, getauxval(AT_HWCAP) },
		{ AT_CLKTCK, sysconf(_SC_CLK_TCK) },
		{ AT_PLATFORM, (uint64_t)(uintptr_t)platform_addr },
		{ AT_EXECFN, (uint64_t)(uintptr_t)execfn },
		{ AT_HWCAP2, getauxval(AT_HWCAP2) },
		{ AT_SYSINFO_EHDR, getauxval(AT_SYSINFO_EHDR) },
		{ AT_MINSIGSTKSZ, getauxval(AT_MINSIGSTKSZ) },
		{ AT_NULL, 0 }
	};

	memcpy(stack_pointers, auxv, sizeof(auxv));

	void (*entry)() = (void *)(elf_header->e_entry + load_bias);

	// Transfer control
	__asm__ __volatile__(
			"mov %0, %%rsp\n"
			"xor %%rbp, %%rbp\n"
			"mov %1, %%rax\n"
			"xor %%rdx, %%rdx\n"
			"jmp *%%rax\n"
			:
			: "r"(sp), "r"(entry)
			: "rax", "rdx", "memory"
			);
}

int main(int argc, char **argv, char **envp)
{
	if (argc < 2) {
		fprintf(stderr, "Usage: %s <static-elf-binary>\n", argv[0]);
		exit(1);
	}

	load_and_run(argv[1], argc - 1, &argv[1], envp);
	return 0;
}
