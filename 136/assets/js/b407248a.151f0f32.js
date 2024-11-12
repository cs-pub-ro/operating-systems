"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[2429],{5680:(e,t,n)=>{n.d(t,{xA:()=>c,yg:()=>u});var a=n(6540);function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){l(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,l=function(e,t){if(null==e)return{};var n,a,l={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(l[n]=e[n]);return l}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(l[n]=e[n])}return l}var r=a.createContext({}),p=function(e){var t=a.useContext(r),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},c=function(e){var t=p(e.components);return a.createElement(r.Provider,{value:t},e.children)},m="mdxType",g={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,l=e.mdxType,o=e.originalType,r=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),m=p(n),d=l,u=m["".concat(r,".").concat(d)]||m[d]||g[d]||o;return n?a.createElement(u,i(i({ref:t},c),{},{components:n})):a.createElement(u,i({ref:t},c))}));function u(e,t){var n=arguments,l=t&&t.mdxType;if("string"==typeof e||l){var o=n.length,i=new Array(o);i[0]=d;var s={};for(var r in t)hasOwnProperty.call(t,r)&&(s[r]=t[r]);s.originalType=e,s[m]="string"==typeof e?e:l,i[1]=s;for(var p=2;p<o;p++)i[p]=n[p];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},854:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>r,contentTitle:()=>i,default:()=>g,frontMatter:()=>o,metadata:()=>s,toc:()=>p});var a=n(8168),l=(n(6540),n(5680));const o={},i="Memory Allocator",s={unversionedId:"Assignments/Memory Allocator/README",id:"Assignments/Memory Allocator/README",title:"Memory Allocator",description:"Objectives",source:"@site/docs/Assignments/Memory Allocator/README.md",sourceDirName:"Assignments/Memory Allocator",slug:"/Assignments/Memory Allocator/",permalink:"/operating-systems/136/Assignments/Memory Allocator/",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"Mini-libc",permalink:"/operating-systems/136/Assignments/Mini Libc/"},next:{title:"Parallel Graph",permalink:"/operating-systems/136/Assignments/Parallel Graph/"}},r={},p=[{value:"Objectives",id:"objectives",level:2},{value:"Statement",id:"statement",level:2},{value:"Support Code",id:"support-code",level:2},{value:"API",id:"api",level:2},{value:"Implementation",id:"implementation",level:2},{value:"Memory Alignment",id:"memory-alignment",level:3},{value:"Block Reuse",id:"block-reuse",level:3},{value:"<code>struct block_meta</code>",id:"struct-block_meta",level:4},{value:"Split Block",id:"split-block",level:4},{value:"Coalesce Blocks",id:"coalesce-blocks",level:4},{value:"Find Best Block",id:"find-best-block",level:4},{value:"Heap Preallocation",id:"heap-preallocation",level:3},{value:"Building Memory Allocator",id:"building-memory-allocator",level:2},{value:"Testing and Grading",id:"testing-and-grading",level:2},{value:"Running the Checker",id:"running-the-checker",level:3},{value:"Running the Linters",id:"running-the-linters",level:3},{value:"Debugging",id:"debugging",level:3},{value:"Debugging in VSCode",id:"debugging-in-vscode",level:3},{value:"Resources",id:"resources",level:2}],c={toc:p},m="wrapper";function g(e){let{components:t,...o}=e;return(0,l.yg)(m,(0,a.A)({},c,o,{components:t,mdxType:"MDXLayout"}),(0,l.yg)("h1",{id:"memory-allocator"},"Memory Allocator"),(0,l.yg)("h2",{id:"objectives"},"Objectives"),(0,l.yg)("ul",null,(0,l.yg)("li",{parentName:"ul"},"Learn the basics of memory management by implementing minimal versions of ",(0,l.yg)("inlineCode",{parentName:"li"},"malloc()"),", ",(0,l.yg)("inlineCode",{parentName:"li"},"calloc()"),", ",(0,l.yg)("inlineCode",{parentName:"li"},"realloc()"),", and ",(0,l.yg)("inlineCode",{parentName:"li"},"free()"),"."),(0,l.yg)("li",{parentName:"ul"},"Accommodate with the memory management syscalls in Linux: ",(0,l.yg)("inlineCode",{parentName:"li"},"brk()"),", ",(0,l.yg)("inlineCode",{parentName:"li"},"mmap()"),", and ",(0,l.yg)("inlineCode",{parentName:"li"},"munmap()"),"."),(0,l.yg)("li",{parentName:"ul"},"Understand the bottlenecks of memory allocation and how to reduce them.")),(0,l.yg)("h2",{id:"statement"},"Statement"),(0,l.yg)("p",null,"Build a minimalistic memory allocator that can be used to manually manage virtual memory.\nThe goal is to have a reliable library that accounts for explicit allocation, reallocation, and initialization of memory."),(0,l.yg)("h2",{id:"support-code"},"Support Code"),(0,l.yg)("p",null,"The support code consists of three directories:"),(0,l.yg)("ul",null,(0,l.yg)("li",{parentName:"ul"},(0,l.yg)("inlineCode",{parentName:"li"},"src/")," will contain your solution"),(0,l.yg)("li",{parentName:"ul"},(0,l.yg)("inlineCode",{parentName:"li"},"tests/")," contains the test suite and a Python script to verify your work"),(0,l.yg)("li",{parentName:"ul"},(0,l.yg)("inlineCode",{parentName:"li"},"utils/")," contains ",(0,l.yg)("inlineCode",{parentName:"li"},"osmem.h")," that describes your library interface, ",(0,l.yg)("inlineCode",{parentName:"li"},"block_meta.h")," which contains details of ",(0,l.yg)("inlineCode",{parentName:"li"},"struct block_meta"),", and an implementation for ",(0,l.yg)("inlineCode",{parentName:"li"},"printf()")," function that does ",(0,l.yg)("strong",{parentName:"li"},"NOT")," use the heap")),(0,l.yg)("p",null,"The test suite consists of ",(0,l.yg)("inlineCode",{parentName:"p"},".c")," files that will be dynamically linked to your library, ",(0,l.yg)("inlineCode",{parentName:"p"},"libosmem.so"),".\nYou can find the sources in the ",(0,l.yg)("inlineCode",{parentName:"p"},"tests/snippets/")," directory.\nThe results of the previous will also be stored in ",(0,l.yg)("inlineCode",{parentName:"p"},"tests/snippets/")," and the reference files are in the ",(0,l.yg)("inlineCode",{parentName:"p"},"tests/ref/")," directory."),(0,l.yg)("p",null,"The automated checking is performed using ",(0,l.yg)("inlineCode",{parentName:"p"},"run_tests.py"),".\nIt runs each test and compares the syscalls made by the ",(0,l.yg)("inlineCode",{parentName:"p"},"os_*")," functions with the reference file, providing a diff if the test failed."),(0,l.yg)("h2",{id:"api"},"API"),(0,l.yg)("ol",null,(0,l.yg)("li",{parentName:"ol"},(0,l.yg)("p",{parentName:"li"},(0,l.yg)("inlineCode",{parentName:"p"},"void *os_malloc(size_t size)")),(0,l.yg)("p",{parentName:"li"},"Allocates ",(0,l.yg)("inlineCode",{parentName:"p"},"size")," bytes and returns a pointer to the allocated memory."),(0,l.yg)("p",{parentName:"li"},"Chunks of memory smaller than ",(0,l.yg)("inlineCode",{parentName:"p"},"MMAP_THRESHOLD")," are allocated with ",(0,l.yg)("inlineCode",{parentName:"p"},"brk()"),".\nBigger chunks are allocated using ",(0,l.yg)("inlineCode",{parentName:"p"},"mmap()"),".\nThe memory is uninitialized."),(0,l.yg)("ul",{parentName:"li"},(0,l.yg)("li",{parentName:"ul"},"Passing ",(0,l.yg)("inlineCode",{parentName:"li"},"0")," as ",(0,l.yg)("inlineCode",{parentName:"li"},"size")," will return ",(0,l.yg)("inlineCode",{parentName:"li"},"NULL"),"."))),(0,l.yg)("li",{parentName:"ol"},(0,l.yg)("p",{parentName:"li"},(0,l.yg)("inlineCode",{parentName:"p"},"void *os_calloc(size_t nmemb, size_t size)")),(0,l.yg)("p",{parentName:"li"},"Allocates memory for an array of ",(0,l.yg)("inlineCode",{parentName:"p"},"nmemb")," elements of ",(0,l.yg)("inlineCode",{parentName:"p"},"size")," bytes each and returns a pointer to the allocated memory."),(0,l.yg)("p",{parentName:"li"},"Chunks of memory smaller than ",(0,l.yg)("a",{parentName:"p",href:"https://man7.org/linux/man-pages/man2/getpagesize.2.html"},(0,l.yg)("inlineCode",{parentName:"a"},"page_size"))," are allocated with ",(0,l.yg)("inlineCode",{parentName:"p"},"brk()"),".\nBigger chunks are allocated using ",(0,l.yg)("inlineCode",{parentName:"p"},"mmap()"),".\nThe memory is set to zero."),(0,l.yg)("ul",{parentName:"li"},(0,l.yg)("li",{parentName:"ul"},"Passing ",(0,l.yg)("inlineCode",{parentName:"li"},"0")," as ",(0,l.yg)("inlineCode",{parentName:"li"},"nmemb")," or ",(0,l.yg)("inlineCode",{parentName:"li"},"size")," will return ",(0,l.yg)("inlineCode",{parentName:"li"},"NULL"),"."))),(0,l.yg)("li",{parentName:"ol"},(0,l.yg)("p",{parentName:"li"},(0,l.yg)("inlineCode",{parentName:"p"},"void *os_realloc(void *ptr, size_t size)")),(0,l.yg)("p",{parentName:"li"},"Changes the size of the memory block pointed to by ",(0,l.yg)("inlineCode",{parentName:"p"},"ptr")," to ",(0,l.yg)("inlineCode",{parentName:"p"},"size")," bytes.\nIf the size is smaller than the previously allocated size, the memory block will be truncated."),(0,l.yg)("p",{parentName:"li"},"If ",(0,l.yg)("inlineCode",{parentName:"p"},"ptr")," points to a block on heap, ",(0,l.yg)("inlineCode",{parentName:"p"},"os_realloc()")," will first try to expand the block, rather than moving it.\nOtherwise, the block will be reallocated and its contents copied."),(0,l.yg)("p",{parentName:"li"},"When attempting to expand a block followed by multiple free blocks, ",(0,l.yg)("inlineCode",{parentName:"p"},"os_realloc()")," will coalesce them one at a time and verify the condition for each.\nBlocks will remain coalesced even if the resulting block will not be big enough for the new size."),(0,l.yg)("p",{parentName:"li"},"Calling ",(0,l.yg)("inlineCode",{parentName:"p"},"os_realloc()")," on a block that has ",(0,l.yg)("inlineCode",{parentName:"p"},"STATUS_FREE")," should return ",(0,l.yg)("inlineCode",{parentName:"p"},"NULL"),".\nThis is a measure to prevent undefined behavior and make the implementation robust, it should not be considered a valid use case of ",(0,l.yg)("inlineCode",{parentName:"p"},"os_realloc()"),"."),(0,l.yg)("ul",{parentName:"li"},(0,l.yg)("li",{parentName:"ul"},"Passing ",(0,l.yg)("inlineCode",{parentName:"li"},"NULL")," as ",(0,l.yg)("inlineCode",{parentName:"li"},"ptr")," will have the same effect as ",(0,l.yg)("inlineCode",{parentName:"li"},"os_malloc(size)"),"."),(0,l.yg)("li",{parentName:"ul"},"Passing ",(0,l.yg)("inlineCode",{parentName:"li"},"0")," as ",(0,l.yg)("inlineCode",{parentName:"li"},"size")," will have the same effect as ",(0,l.yg)("inlineCode",{parentName:"li"},"os_free(ptr)"),"."))),(0,l.yg)("li",{parentName:"ol"},(0,l.yg)("p",{parentName:"li"},(0,l.yg)("inlineCode",{parentName:"p"},"void os_free(void *ptr)")),(0,l.yg)("p",{parentName:"li"},"Frees memory previously allocated by ",(0,l.yg)("inlineCode",{parentName:"p"},"os_malloc()"),", ",(0,l.yg)("inlineCode",{parentName:"p"},"os_calloc()")," or ",(0,l.yg)("inlineCode",{parentName:"p"},"os_realloc()"),"."),(0,l.yg)("p",{parentName:"li"},(0,l.yg)("inlineCode",{parentName:"p"},"os_free()")," will not return memory from the heap to the OS by calling ",(0,l.yg)("inlineCode",{parentName:"p"},"brk()"),", but rather mark it as free and reuse it in future allocations.\nIn the case of mapped memory blocks, ",(0,l.yg)("inlineCode",{parentName:"p"},"os_free()")," will call ",(0,l.yg)("inlineCode",{parentName:"p"},"munmap()"),".")),(0,l.yg)("li",{parentName:"ol"},(0,l.yg)("p",{parentName:"li"},"General"),(0,l.yg)("ul",{parentName:"li"},(0,l.yg)("li",{parentName:"ul"},"Allocations that increase the heap size will only expand the last block if it is free."),(0,l.yg)("li",{parentName:"ul"},"You are allowed to use ",(0,l.yg)("inlineCode",{parentName:"li"},"sbrk()")," instead of ",(0,l.yg)("inlineCode",{parentName:"li"},"brk()"),", in view of the fact that ",(0,l.yg)("a",{parentName:"li",href:"https://man7.org/linux/man-pages/man2/brk.2.html#NOTES"},"on Linux")," ",(0,l.yg)("inlineCode",{parentName:"li"},"sbrk()")," is implemented using the ",(0,l.yg)("inlineCode",{parentName:"li"},"brk()"),"."),(0,l.yg)("li",{parentName:"ul"},"Do ",(0,l.yg)("strong",{parentName:"li"},"NOT")," use ",(0,l.yg)("a",{parentName:"li",href:"https://man7.org/linux/man-pages/man2/mremap.2.html"},(0,l.yg)("inlineCode",{parentName:"a"},"mremap()"))),(0,l.yg)("li",{parentName:"ul"},"You must check the error code returned by every syscall.\nYou can use the ",(0,l.yg)("inlineCode",{parentName:"li"},"DIE()")," macro for this.")))),(0,l.yg)("h2",{id:"implementation"},"Implementation"),(0,l.yg)("p",null,"An efficient implementation must keep data aligned, keep track of memory blocks and reuse freed blocks.\nThis can be further improved by reducing the number of syscalls and block operations."),(0,l.yg)("h3",{id:"memory-alignment"},(0,l.yg)("a",{parentName:"h3",href:"https://stackoverflow.com/a/381368"},"Memory Alignment")),(0,l.yg)("p",null,"Allocated memory should be aligned (i.e. all addresses are multiple of a given size).\nThis is a space-time trade-off because memory blocks are padded so each can be read in one transaction.\nIt also allows for atomicity when interacting with a block of memory."),(0,l.yg)("p",null,"All memory allocations should be aligned to ",(0,l.yg)("strong",{parentName:"p"},"8 bytes")," as required by 64 bit systems."),(0,l.yg)("h3",{id:"block-reuse"},"Block Reuse"),(0,l.yg)("h4",{id:"struct-block_meta"},(0,l.yg)("inlineCode",{parentName:"h4"},"struct block_meta")),(0,l.yg)("p",null,"We will consider a ",(0,l.yg)("strong",{parentName:"p"},"block")," to be a continuous zone of memory, allocated and managed by our implementation.\nThe structure ",(0,l.yg)("inlineCode",{parentName:"p"},"block_meta")," will be used to manage the metadata of a block.\nEach allocated zone will comprise of a ",(0,l.yg)("inlineCode",{parentName:"p"},"block_meta")," structure placed at the start, followed by data (",(0,l.yg)("strong",{parentName:"p"},"payload"),").\nFor all functions, the returned address will be that of the ",(0,l.yg)("strong",{parentName:"p"},"payload")," (not of the ",(0,l.yg)("inlineCode",{parentName:"p"},"block_meta")," structure)."),(0,l.yg)("pre",null,(0,l.yg)("code",{parentName:"pre",className:"language-C"},"struct block_meta {\n    size_t size;\n    int status;\n    struct block_meta *prev;\n    struct block_meta *next;\n};\n")),(0,l.yg)("p",null,(0,l.yg)("em",{parentName:"p"},"Note"),": Both the ",(0,l.yg)("inlineCode",{parentName:"p"},"struct block_meta")," and the ",(0,l.yg)("strong",{parentName:"p"},"payload")," of a block should be aligned to ",(0,l.yg)("strong",{parentName:"p"},"8 bytes"),"."),(0,l.yg)("p",null,(0,l.yg)("em",{parentName:"p"},"Note"),": Most compilers will automatically pad the structure, but you should still align it for portability."),(0,l.yg)("p",null,(0,l.yg)("img",{alt:"memory-block",src:n(7734).A})),(0,l.yg)("h4",{id:"split-block"},"Split Block"),(0,l.yg)("p",null,"Reusing memory blocks improves the allocator's performance, but might lead to ",(0,l.yg)("a",{parentName:"p",href:"https://www.tutorialspoint.com/difference-between-internal-fragmentation-and-external-fragmentation#:~:text=What%20is%20Internal%20Fragmentation%3F"},"Internal Memory Fragmentation"),".\nThis happens when we allocate a size smaller than all available free blocks.\nIf we use one larger block the remaining size of that block will be wasted since it cannot be used for another allocation."),(0,l.yg)("p",null,"To avoid this, a block should be truncated to the required size and the remaining bytes should be used to create a new free block."),(0,l.yg)("p",null,(0,l.yg)("img",{alt:"Split Block",src:n(3089).A})),(0,l.yg)("p",null,"The resulting free block should be reusable.\nThe split will not be performed if the remaining size (after reserving space for ",(0,l.yg)("inlineCode",{parentName:"p"},"block_meta")," structure and payload) is not big enough to fit another block (",(0,l.yg)("inlineCode",{parentName:"p"},"block_meta")," structure and at least ",(0,l.yg)("strong",{parentName:"p"},"1 byte")," of usable memory)."),(0,l.yg)("p",null,(0,l.yg)("em",{parentName:"p"},"Note"),": Do not forget the alignment!"),(0,l.yg)("h4",{id:"coalesce-blocks"},"Coalesce Blocks"),(0,l.yg)("p",null,"There are cases when there is enough free memory for an allocation, but it is spread across multiple blocks that cannot be used.\nThis is called ",(0,l.yg)("a",{parentName:"p",href:"https://www.tutorialspoint.com/difference-between-internal-fragmentation-and-external-fragmentation#:~:text=What%20is%20External%20Fragmentation%3F"},"External Memory Fragmentation"),"."),(0,l.yg)("p",null,"One technique to reduce external memory fragmentation is ",(0,l.yg)("strong",{parentName:"p"},"block coalescing")," which implies merging adjacent free blocks to form a contiguous chunk."),(0,l.yg)("p",null,(0,l.yg)("img",{alt:"Coalesce Block Image",src:n(8277).A})),(0,l.yg)("p",null,"Coalescing will be used before searching for a block and in ",(0,l.yg)("inlineCode",{parentName:"p"},"os_realloc()")," to expand the current block when possible."),(0,l.yg)("p",null,(0,l.yg)("em",{parentName:"p"},"Note"),": You might still need to split the block after coalesce."),(0,l.yg)("h4",{id:"find-best-block"},"Find Best Block"),(0,l.yg)("p",null,"Our aim is to reuse a free block with a size closer to what we need in order to reduce the number of future operations on it.\nThis strategy is called ",(0,l.yg)("strong",{parentName:"p"},"find best"),".\nOn every allocation we need to search the whole list of blocks and choose the best fitting free block."),(0,l.yg)("p",null,"In practice, it also uses a list of free blocks to avoid parsing all blocks, but this is out of the scope of the assignment."),(0,l.yg)("p",null,(0,l.yg)("em",{parentName:"p"},"Note"),": For consistent results, coalesce all adjacent free blocks before searching."),(0,l.yg)("h3",{id:"heap-preallocation"},"Heap Preallocation"),(0,l.yg)("p",null,"Heap is used in most modern programs.\nThis hints at the possibility of preallocating a relatively big chunk of memory (i.e. ",(0,l.yg)("strong",{parentName:"p"},"128 kilobytes"),") when the heap is used for the first time.\nThis reduces the number of future ",(0,l.yg)("inlineCode",{parentName:"p"},"brk()")," syscalls."),(0,l.yg)("p",null,"For example, if we try to allocate 1000 bytes we should first allocate a block of 128 kilobytes and then split it.\nOn future small allocations, we should proceed to split the preallocated chunk."),(0,l.yg)("p",null,(0,l.yg)("em",{parentName:"p"},"Note"),": Heap preallocation happens only once."),(0,l.yg)("h2",{id:"building-memory-allocator"},"Building Memory Allocator"),(0,l.yg)("p",null,"To build ",(0,l.yg)("inlineCode",{parentName:"p"},"libosmem.so"),", run ",(0,l.yg)("inlineCode",{parentName:"p"},"make")," in the ",(0,l.yg)("inlineCode",{parentName:"p"},"src/")," directory:"),(0,l.yg)("pre",null,(0,l.yg)("code",{parentName:"pre",className:"language-console"},"student@os:~/.../mem-alloc$ cd src/\nstudent@os:~/.../mem-alloc/src$ make\ngcc -fPIC -Wall -Wextra -g -I../utils  -c -o osmem.o osmem.c\ngcc -fPIC -Wall -Wextra -g -I../utils  -c -o ../utils/printf.o ../utils/printf.c\ngcc -shared -o libosmem.so osmem.o helpers.o ../utils/printf.o\n")),(0,l.yg)("h2",{id:"testing-and-grading"},"Testing and Grading"),(0,l.yg)("p",null,"Testing is automated.\nTests are located in the ",(0,l.yg)("inlineCode",{parentName:"p"},"tests/")," directory:"),(0,l.yg)("pre",null,(0,l.yg)("code",{parentName:"pre",className:"language-console"},"student@so:~/.../mem-alloc/tests$ ls -F\nMakefile  grade.sh@  ref/  run_tests.py  snippets/\n")),(0,l.yg)("p",null,"To test and grade your assignment solution, enter the ",(0,l.yg)("inlineCode",{parentName:"p"},"tests/")," directory and run ",(0,l.yg)("inlineCode",{parentName:"p"},"grade.sh"),".\nNote that this requires linters being available.\nThe easiest is to use a Docker-based setup with everything installed, as shown in the section ",(0,l.yg)("a",{parentName:"p",href:"#running-the-linters"},'"Running the Linters"'),".\nWhen using ",(0,l.yg)("inlineCode",{parentName:"p"},"grade.sh")," you will get grades for correctness (maximum ",(0,l.yg)("inlineCode",{parentName:"p"},"90")," points) and for coding style (maximum ",(0,l.yg)("inlineCode",{parentName:"p"},"10")," points).\nA successful run will provide you an output ending with:"),(0,l.yg)("pre",null,(0,l.yg)("code",{parentName:"pre",className:"language-console"},"### GRADE\n\n\nChecker:                                                         90/ 90\nStyle:                                                           10/ 10\nTotal:                                                          100/100\n\n\n### STYLE SUMMARY\n\n\n")),(0,l.yg)("h3",{id:"running-the-checker"},"Running the Checker"),(0,l.yg)("p",null,"To run only the checker, use the ",(0,l.yg)("inlineCode",{parentName:"p"},"run_tests.py")," script from the ",(0,l.yg)("inlineCode",{parentName:"p"},"tests/")," directory."),(0,l.yg)("p",null,"Before running ",(0,l.yg)("inlineCode",{parentName:"p"},"run_tests.py"),", you first have to build ",(0,l.yg)("inlineCode",{parentName:"p"},"libosmem.so")," in the ",(0,l.yg)("inlineCode",{parentName:"p"},"src/")," directory and generate the test binaries in ",(0,l.yg)("inlineCode",{parentName:"p"},"tests/snippets"),".\nYou can do so using the all-in-one ",(0,l.yg)("inlineCode",{parentName:"p"},"Makefile")," rule from ",(0,l.yg)("inlineCode",{parentName:"p"},"tests/"),": ",(0,l.yg)("inlineCode",{parentName:"p"},"make check"),"."),(0,l.yg)("pre",null,(0,l.yg)("code",{parentName:"pre",className:"language-console"},"student@os:~/.../mem-alloc$ cd tests/\nstudent@os:~/.../mem-alloc/tests$ make check\ngcc -fPIC -Wall -Wextra -g -I../utils  -c -o osmem.o osmem.c\ngcc -fPIC -Wall -Wextra -g -I../utils  -c -o helpers.o helpers.c\ngcc -fPIC -Wall -Wextra -g -I../utils  -c -o ../utils/printf.o ../utils/printf.c\n[...]\ngcc -I../utils -fPIC -Wall -Wextra -g -o snippets/test-all snippets/test-all.c -L../src -losmem\ngcc -I../utils -fPIC -Wall -Wextra -g -o snippets/test-calloc-arrays snippets/test-calloc-arrays.c -L../src -losmem\ngcc -I../utils -fPIC -Wall -Wextra -g -o snippets/test-calloc-block-reuse snippets/test-calloc-block-reuse.c -L../src -losmem\ngcc -I../utils -fPIC -Wall -Wextra -g -o snippets/test-calloc-coalesce-big snippets/test-calloc-coalesce-big.c -L../src -losmem\ngcc -I../utils -fPIC -Wall -Wextra -g -o snippets/test-calloc-coalesce snippets/test-calloc-coalesce.c -L../src -losmem\ngcc -I../utils -fPIC -Wall -Wextra -g -o snippets/test-calloc-expand-block snippets/test-calloc-expand-block.c -L../src -losmem\n[...]\ntest-malloc-no-preallocate       ........................ passed ...   2\ntest-malloc-preallocate          ........................ passed ...   3\ntest-malloc-arrays               ........................ passed ...   5\ntest-malloc-block-reuse          ........................ passed ...   3\ntest-malloc-expand-block         ........................ passed ...   2\ntest-malloc-no-split             ........................ passed ...   2\ntest-malloc-split-one-block      ........................ passed ...   3\ntest-malloc-split-first          ........................ passed ...   2\ntest-malloc-split-last           ........................ passed ...   2\ntest-malloc-split-middle         ........................ passed ...   3\ntest-malloc-split-vector         ........................ passed ...   2\ntest-malloc-coalesce             ........................ passed ...   3\ntest-malloc-coalesce-big         ........................ passed ...   3\ntest-calloc-no-preallocate       ........................ passed ...   1\ntest-calloc-preallocate          ........................ passed ...   1\ntest-calloc-arrays               ........................ passed ...   5\ntest-calloc-block-reuse          ........................ passed ...   1\ntest-calloc-expand-block         ........................ passed ...   1\ntest-calloc-no-split             ........................ passed ...   1\ntest-calloc-split-one-block      ........................ passed ...   1\ntest-calloc-split-first          ........................ passed ...   1\ntest-calloc-split-last           ........................ passed ...   1\ntest-calloc-split-middle         ........................ passed ...   1\ntest-calloc-split-vector         ........................ passed ...   2\ntest-calloc-coalesce             ........................ passed ...   2\ntest-calloc-coalesce-big         ........................ passed ...   2\ntest-realloc-no-preallocate      ........................ passed ...   1\ntest-realloc-preallocate         ........................ passed ...   1\ntest-realloc-arrays              ........................ passed ...   3\ntest-realloc-block-reuse         ........................ passed ...   3\ntest-realloc-expand-block        ........................ passed ...   2\ntest-realloc-no-split            ........................ passed ...   3\ntest-realloc-split-one-block     ........................ passed ...   3\ntest-realloc-split-first         ........................ passed ...   3\ntest-realloc-split-last          ........................ passed ...   3\ntest-realloc-split-middle        ........................ passed ...   2\ntest-realloc-split-vector        ........................ passed ...   2\ntest-realloc-coalesce            ........................ passed ...   3\ntest-realloc-coalesce-big        ........................ passed ...   1\ntest-all                         ........................ passed ...   5\n\nTotal:                                                            90/100\n")),(0,l.yg)("p",null,(0,l.yg)("strong",{parentName:"p"},"NOTE:")," By default, ",(0,l.yg)("inlineCode",{parentName:"p"},"run_tests.py")," checks for memory leaks, which can be time-consuming.\nTo speed up testing, use the ",(0,l.yg)("inlineCode",{parentName:"p"},"-d")," flag or ",(0,l.yg)("inlineCode",{parentName:"p"},"make check-fast")," to skip memory leak checks."),(0,l.yg)("h3",{id:"running-the-linters"},"Running the Linters"),(0,l.yg)("p",null,"To run the linters, use the ",(0,l.yg)("inlineCode",{parentName:"p"},"make lint")," command in the ",(0,l.yg)("inlineCode",{parentName:"p"},"tests/")," directory.\nNote that the linters have to be installed on your system: ",(0,l.yg)("a",{parentName:"p",href:"https://github.com/torvalds/linux/blob/master/scripts/checkpatch.pl"},(0,l.yg)("inlineCode",{parentName:"a"},"checkpatch.pl")),", ",(0,l.yg)("a",{parentName:"p",href:"https://github.com/cpplint/cpplint"},(0,l.yg)("inlineCode",{parentName:"a"},"cpplint")),", ",(0,l.yg)("a",{parentName:"p",href:"https://www.shellcheck.net/"},(0,l.yg)("inlineCode",{parentName:"a"},"shellcheck"))," with certain configuration options.\nIt's easiest to run them in a Docker-based setup with everything configured:"),(0,l.yg)("pre",null,(0,l.yg)("code",{parentName:"pre",className:"language-console"},"student@so:~/.../mem-alloc/tests$ make lint\n[...]\ncd .. && checkpatch.pl -f checker/*.sh tests/*.sh\n[...]\ncd .. && cpplint --recursive src/ tests/ checker/\n[...]\ncd .. && shellcheck checker/*.sh tests/*.sh\n")),(0,l.yg)("h3",{id:"debugging"},"Debugging"),(0,l.yg)("p",null,(0,l.yg)("inlineCode",{parentName:"p"},"run_tests.py")," uses ",(0,l.yg)("inlineCode",{parentName:"p"},"ltrace")," to capture all the libcalls and syscalls performed."),(0,l.yg)("p",null,"The output of ",(0,l.yg)("inlineCode",{parentName:"p"},"ltrace")," is formatted to show only top level library calls and nested system calls.\nFor consistency, the heap start and addresses returned by ",(0,l.yg)("inlineCode",{parentName:"p"},"mmap()")," are replaced with labels.\nEvery other address is displayed as ",(0,l.yg)("inlineCode",{parentName:"p"},"<label> + offset"),", where the label is the closest mapped address."),(0,l.yg)("p",null,(0,l.yg)("inlineCode",{parentName:"p"},"run_tests.py")," supports three modes:"),(0,l.yg)("ul",null,(0,l.yg)("li",{parentName:"ul"},"verbose (",(0,l.yg)("inlineCode",{parentName:"li"},"-v"),"), prints the output of the test"),(0,l.yg)("li",{parentName:"ul"},"diff (",(0,l.yg)("inlineCode",{parentName:"li"},"-d"),"), prints the diff between the output and the ref"),(0,l.yg)("li",{parentName:"ul"},"memcheck (",(0,l.yg)("inlineCode",{parentName:"li"},"-m"),"), prints the diff between the output and the ref and announces memory leaks")),(0,l.yg)("p",null,"If you want to run a single test, you give its name or its path as arguments to ",(0,l.yg)("inlineCode",{parentName:"p"},"run_tests.py"),":"),(0,l.yg)("pre",null,(0,l.yg)("code",{parentName:"pre",className:"language-console"},"student@os:~/.../mem-alloc/tests$ python3 run_tests.py test-all\nOR\nstudent@os:~/.../mem-alloc/tests$ python3 run_tests.py snippets/test-all\n")),(0,l.yg)("h3",{id:"debugging-in-vscode"},"Debugging in VSCode"),(0,l.yg)("p",null,"If you are using ",(0,l.yg)("a",{parentName:"p",href:"https://code.visualstudio.com/"},"Visual Studio Code"),", you can use the ",(0,l.yg)("a",{target:"_blank",href:n(7535).A},(0,l.yg)("code",null,"launch.json"))," configurations to run tests."),(0,l.yg)("p",null,"Setup the breakpoints in the source files or the tests and go to Run and Debug (",(0,l.yg)("inlineCode",{parentName:"p"},"F5"),").\nSelect ",(0,l.yg)("inlineCode",{parentName:"p"},"Run test")," script and press ",(0,l.yg)("inlineCode",{parentName:"p"},"F5"),".\nThis will enter a dialogue where you can choose which test to run."),(0,l.yg)("p",null,"You can find more on this in the official documentation: ",(0,l.yg)("a",{parentName:"p",href:"https://code.visualstudio.com/docs/editor/debugging"},"Debugging with VSCode"),"."),(0,l.yg)("p",null,"If VSCode complains about ",(0,l.yg)("inlineCode",{parentName:"p"},"MAP_ANON")," argument for ",(0,l.yg)("inlineCode",{parentName:"p"},"mmap()")," change ",(0,l.yg)("inlineCode",{parentName:"p"},"C_Cpp.default.cStandard")," option to ",(0,l.yg)("inlineCode",{parentName:"p"},"gnu11"),"."),(0,l.yg)("h2",{id:"resources"},"Resources"),(0,l.yg)("ul",null,(0,l.yg)("li",{parentName:"ul"},(0,l.yg)("a",{parentName:"li",href:"https://moss.cs.iit.edu/cs351/slides/slides-malloc.pdf"},'"Implementing malloc" slides by Michael Saelee')),(0,l.yg)("li",{parentName:"ul"},(0,l.yg)("a",{parentName:"li",href:"https://danluu.com/malloc-tutorial/"},"Malloc Tutorial"))))}g.isMDXComponent=!0},7535:(e,t,n)=>{n.d(t,{A:()=>a});const a=n.p+"assets/files/launch-ea3f022c13d189fcf8c0e87abc815e51.json"},8277:(e,t,n)=>{n.d(t,{A:()=>a});const a=n.p+"assets/images/coalesce-blocks-d56dae67c5b407080ddab19c660ca56d.svg"},7734:(e,t,n)=>{n.d(t,{A:()=>a});const a=n.p+"assets/images/memory-block-27bcad65f280db00766c7a9824c624f2.svg"},3089:(e,t,n)=>{n.d(t,{A:()=>a});const a=n.p+"assets/images/split-block-0e690e7363ed4af850595e15c0f8cd7e.svg"}}]);