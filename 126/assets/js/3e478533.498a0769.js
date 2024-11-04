"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[9795],{5680:(e,t,n)=>{n.d(t,{xA:()=>m,yg:()=>g});var s=n(6540);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);t&&(s=s.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,s)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function r(e,t){if(null==e)return{};var n,s,a=function(e,t){if(null==e)return{};var n,s,a={},i=Object.keys(e);for(s=0;s<i.length;s++)n=i[s],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(s=0;s<i.length;s++)n=i[s],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var p=s.createContext({}),o=function(e){var t=s.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},m=function(e){var t=o(e.components);return s.createElement(p.Provider,{value:t},e.children)},d="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return s.createElement(s.Fragment,{},t)}},_=s.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,p=e.parentName,m=r(e,["components","mdxType","originalType","parentName"]),d=o(n),_=a,g=d["".concat(p,".").concat(_)]||d[_]||c[_]||i;return n?s.createElement(g,l(l({ref:t},m),{},{components:n})):s.createElement(g,l({ref:t},m))}));function g(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,l=new Array(i);l[0]=_;var r={};for(var p in t)hasOwnProperty.call(t,p)&&(r[p]=t[p]);r.originalType=e,r[d]="string"==typeof e?e:a,l[1]=r;for(var o=2;o<i;o++)l[o]=n[o];return s.createElement.apply(null,l)}return s.createElement.apply(null,n)}_.displayName="MDXCreateElement"},9343:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>l,default:()=>c,frontMatter:()=>i,metadata:()=>r,toc:()=>o});var s=n(8168),a=(n(6540),n(5680));const i={},l="Mini-libc",r={unversionedId:"Assignments/Mini Libc/README",id:"Assignments/Mini Libc/README",title:"Mini-libc",description:"Objectives",source:"@site/docs/Assignments/Mini Libc/README.md",sourceDirName:"Assignments/Mini Libc",slug:"/Assignments/Mini Libc/",permalink:"/operating-systems/126/Assignments/Mini Libc/",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"Assignments",permalink:"/operating-systems/126/Assignments/"},next:{title:"Memory Allocator",permalink:"/operating-systems/126/Assignments/Memory Allocator/"}},p={},o=[{value:"Objectives",id:"objectives",level:2},{value:"Statement",id:"statement",level:2},{value:"Support Code",id:"support-code",level:2},{value:"API and Implementation Tasks",id:"api-and-implementation-tasks",level:3},{value:"Building mini-libc",id:"building-mini-libc",level:3},{value:"Testing and Grading",id:"testing-and-grading",level:2},{value:"Behind the Scenes",id:"behind-the-scenes",level:3},{value:"Resources",id:"resources",level:2}],m={toc:o},d="wrapper";function c(e){let{components:t,...n}=e;return(0,a.yg)(d,(0,s.A)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,a.yg)("h1",{id:"mini-libc"},"Mini-libc"),(0,a.yg)("h2",{id:"objectives"},"Objectives"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"Learn about the structure and functionalities provided by the standard C library"),(0,a.yg)("li",{parentName:"ul"},"Accommodate with the syscall interface in Linux"),(0,a.yg)("li",{parentName:"ul"},"Gain a better understanding of strings and memory management functions"),(0,a.yg)("li",{parentName:"ul"},"Learn how the standard C library provides support for low-level input/output operations")),(0,a.yg)("h2",{id:"statement"},"Statement"),(0,a.yg)("p",null,"Build a ",(0,a.yg)("strong",{parentName:"p"},"minimalistic*- ["),"standard C library",(0,a.yg)("strong",{parentName:"p"},"](",(0,a.yg)("a",{parentName:"strong",href:"https://en.wikipedia.org/wiki/C_standard_library"},"https://en.wikipedia.org/wiki/C_standard_library"),") implementation for Linux systems (named "),"mini-libc",(0,a.yg)("strong",{parentName:"p"},"), that can be used as a replacement for the "),"system libc*- (",(0,a.yg)("a",{parentName:"p",href:"https://www.gnu.org/software/libc/"},"glibc")," in Linux).\nThe goal is to have a minimally functional libc with features such as string management, basic memory support and POSIX file I/O."),(0,a.yg)("p",null,"The implementation of mini-libc will be ",(0,a.yg)("strong",{parentName:"p"},"freestanding"),", i.e. it will not use any outside library calls.\nIt will be implemented on top of the system call interface provided by Linux on an ",(0,a.yg)("inlineCode",{parentName:"p"},"x86_64")," architecture.\nAny function you require, that is typically part of libc, you will have to implement.\nYou can reuse functions that you implement in other parts of the mini-libc."),(0,a.yg)("p",null,"In case you are using a macOS device with ARM64 / Aarch64, you will have to install an ",(0,a.yg)("inlineCode",{parentName:"p"},"x86_64")," virtual machine."),(0,a.yg)("h2",{id:"support-code"},"Support Code"),(0,a.yg)("p",null,"The support code consists of three directories:"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},(0,a.yg)("inlineCode",{parentName:"p"},"libc/")," is the skeleton mini-libc implementation.\nYou will have to implement missing parts marked as ",(0,a.yg)("inlineCode",{parentName:"p"},"TODO")," items.")),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},(0,a.yg)("inlineCode",{parentName:"p"},"samples/")," stores use cases and tests of mini-libc.")),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},(0,a.yg)("inlineCode",{parentName:"p"},"tests/")," are states used to validate (and grade) the assignment."))),(0,a.yg)("p",null,"System call invocation is done via the ",(0,a.yg)("inlineCode",{parentName:"p"},"syscall()")," function defined in ",(0,a.yg)("inlineCode",{parentName:"p"},"libc/syscall.c"),".\nThat itself makes a call to the architecture-specific call in ",(0,a.yg)("inlineCode",{parentName:"p"},"libc/internal/arch/x86_64/syscall_arch.h"),";\nhence the dependency on the ",(0,a.yg)("inlineCode",{parentName:"p"},"x86_64")," architecture."),(0,a.yg)("h3",{id:"api-and-implementation-tasks"},"API and Implementation Tasks"),(0,a.yg)("p",null,"The application programming interface (API) of the C standard library is declared in a number of header files.\nEach header file contains one or more function declarations, data type definitions and macros.\nFor your minimal implementation, the following header files are of interest:"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},(0,a.yg)("inlineCode",{parentName:"p"},"<string.h>"),": defines string-handling functions"),(0,a.yg)("p",{parentName:"li"},"For this assignment, you will have to implement the following functions: ",(0,a.yg)("inlineCode",{parentName:"p"},"strcpy()"),", ",(0,a.yg)("inlineCode",{parentName:"p"},"strcat()"),", ",(0,a.yg)("inlineCode",{parentName:"p"},"strlen()"),", ",(0,a.yg)("inlineCode",{parentName:"p"},"strncpy()"),", ",(0,a.yg)("inlineCode",{parentName:"p"},"strncat()"),", ",(0,a.yg)("inlineCode",{parentName:"p"},"strcmp()"),", ",(0,a.yg)("inlineCode",{parentName:"p"},"strncmp()"),", ",(0,a.yg)("inlineCode",{parentName:"p"},"strstr()"),", ",(0,a.yg)("inlineCode",{parentName:"p"},"strrstr()"),", ",(0,a.yg)("inlineCode",{parentName:"p"},"memcpy()"),", ",(0,a.yg)("inlineCode",{parentName:"p"},"memset()"),", ",(0,a.yg)("inlineCode",{parentName:"p"},"memmove()"),", ",(0,a.yg)("inlineCode",{parentName:"p"},"memcmp()"),".")),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},(0,a.yg)("inlineCode",{parentName:"p"},"<stdio.h>"),": defines printing and I/O functions"),(0,a.yg)("p",{parentName:"li"},"For this assignment, you will have to implement ",(0,a.yg)("inlineCode",{parentName:"p"},"puts()"),".")),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},(0,a.yg)("inlineCode",{parentName:"p"},"<unistd.h>"),", ",(0,a.yg)("inlineCode",{parentName:"p"},"<sys/fcntl.h>")," and ",(0,a.yg)("inlineCode",{parentName:"p"},"<sys/stat.h>"),": define I/O primitives"),(0,a.yg)("p",{parentName:"li"},"For this assignment, you will have to implement the following functions: ",(0,a.yg)("inlineCode",{parentName:"p"},"open()"),", ",(0,a.yg)("inlineCode",{parentName:"p"},"close()"),", ",(0,a.yg)("inlineCode",{parentName:"p"},"lseek()"),", ",(0,a.yg)("inlineCode",{parentName:"p"},"stat()"),", ",(0,a.yg)("inlineCode",{parentName:"p"},"fstat()"),", ",(0,a.yg)("inlineCode",{parentName:"p"},"truncate()"),", ",(0,a.yg)("inlineCode",{parentName:"p"},"ftruncate()"),"."),(0,a.yg)("p",{parentName:"li"},"You will also have to implement the ",(0,a.yg)("inlineCode",{parentName:"p"},"nanosleep()")," and ",(0,a.yg)("inlineCode",{parentName:"p"},"sleep()")," functions.")),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},(0,a.yg)("inlineCode",{parentName:"p"},"<stdlib.h"),"> and ",(0,a.yg)("inlineCode",{parentName:"p"},"<sys/mman.h>")," define memory allocation functions"),(0,a.yg)("p",{parentName:"li"},"For this assignment, you will have to implement the following functions: ",(0,a.yg)("inlineCode",{parentName:"p"},"malloc()"),", ",(0,a.yg)("inlineCode",{parentName:"p"},"free()"),", ",(0,a.yg)("inlineCode",{parentName:"p"},"calloc()"),", ",(0,a.yg)("inlineCode",{parentName:"p"},"realloc()"),", ",(0,a.yg)("inlineCode",{parentName:"p"},"realloc_array()"),", ",(0,a.yg)("inlineCode",{parentName:"p"},"mmap()"),", ",(0,a.yg)("inlineCode",{parentName:"p"},"mremap()"),", ",(0,a.yg)("inlineCode",{parentName:"p"},"munmap()"),"."),(0,a.yg)("p",{parentName:"li"},"For managing memory areas, a basic list structure is provided in ",(0,a.yg)("inlineCode",{parentName:"p"},"include/internal/mm/mem_list.h")," and ",(0,a.yg)("inlineCode",{parentName:"p"},"mm/mem_list.c"),".")),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},(0,a.yg)("inlineCode",{parentName:"p"},"<errno.h>")," and ",(0,a.yg)("inlineCode",{parentName:"p"},"errno.c"),": declare and define the integer variable ",(0,a.yg)("inlineCode",{parentName:"p"},"errno"),", which is set by system calls and some library functions in the event of an error to indicate what went wrong."))),(0,a.yg)("p",null,"Some tests do not build.\nThis is intentional.\nYou will have to add the missing features to make those tests compile, that is"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},"the ",(0,a.yg)("inlineCode",{parentName:"p"},"time.h")," header")),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},"the declaration and the implementation of ",(0,a.yg)("inlineCode",{parentName:"p"},"puts()"))),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},"the declaration and the implementation of ",(0,a.yg)("inlineCode",{parentName:"p"},"nanosleep()")," and ",(0,a.yg)("inlineCode",{parentName:"p"},"sleep()"))),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},"the update of the libc ",(0,a.yg)("inlineCode",{parentName:"p"},"Makefile")," to build the source code files implementing ",(0,a.yg)("inlineCode",{parentName:"p"},"puts()"),", ",(0,a.yg)("inlineCode",{parentName:"p"},"nanosleep()")," and ",(0,a.yg)("inlineCode",{parentName:"p"},"sleep()")),(0,a.yg)("p",{parentName:"li"},"\u2757\u2757 *",(0,a.yg)("em",{parentName:"p"},"Pay attention"),"- to which functions have to modify the ",(0,a.yg)("inlineCode",{parentName:"p"},"errno")," variable."))),(0,a.yg)("h3",{id:"building-mini-libc"},"Building mini-libc"),(0,a.yg)("p",null,"To build mini-libc, run ",(0,a.yg)("inlineCode",{parentName:"p"},"make")," in the ",(0,a.yg)("inlineCode",{parentName:"p"},"libc/")," directory:"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-console"},"student@so:~/.../content/assignments/mini-libc$ cd libc/\n\nstudent@so:~/.../assignments/mini-libc/libc$ make\n")),(0,a.yg)("p",null,"To build samples, enter the ",(0,a.yg)("inlineCode",{parentName:"p"},"samples")," directory and run ",(0,a.yg)("inlineCode",{parentName:"p"},"make"),":"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-console"},"student@so:~/.../content/assignments/mini-libc$ cd samples/\n\nstudent@so:~/.../assignments/mini-libc/samples$ make\n")),(0,a.yg)("h2",{id:"testing-and-grading"},"Testing and Grading"),(0,a.yg)("p",null,"The testing is automated.\nTests are located in the ",(0,a.yg)("inlineCode",{parentName:"p"},"tests/")," directory."),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-console"},"student@so:~/.../assignments/mini-libc/tests$ ls -F\ngraded_test.c       memory/             test_io.c                      test_malloc_free.sh-        test_mmap_munmap.sh-      test_multiple_malloc_free.sh-  test_sleep.sh*\ngraded_test.h       process/            test_io_file_create.sh-        test_malloc_perm_notok.sh-  test_mmap_perm_none.sh-   test_multiple_malloc.sh-       test_stat.sh*\ngraded_test.inc.sh  run_all_tests.sh-   test_io_file_delete.sh-        test_malloc_perm_ok.sh-     test_mmap_perm_notok.sh-  test_nanosleep.sh-             test_string.c\nio/                 test_fstat.sh-      test_lseek.sh-                 test_malloc.sh-             test_mmap_perm_ok.sh-     test_open_close.sh-            test_truncate.sh*\nMakefile            test_ftruncate.sh-  test_malloc_free_sequence.sh-  test_memory.c               test_mmap.sh-             test_puts.sh*\n")),(0,a.yg)("p",null,"To run the checker and everything else required, use the ",(0,a.yg)("inlineCode",{parentName:"p"},"make check")," command in the ",(0,a.yg)("inlineCode",{parentName:"p"},"tests/")," directory:"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-console"},"student@so:~/.../assignments/mini-libc/tests$ make check\nmake[1]: Entering directory '...'\nrm -f *~\n[...]\ntest_mmap_perm_ok                ........................ failed ...  0\ntest_mmap_perm_notok             ........................ failed ...  0\ntest_mmap_perm_none              ........................ failed ...  0\n\nTotal:                                                             0/100\n")),(0,a.yg)("p",null,"Some files will fail to build, it's expected.\nThis is because there are missing files or missing functions that cause build errors.\nYou'll need to add those files and implement those functions for the build error to disappear."),(0,a.yg)("p",null,"Obviously, most tests will fail, as there is no implementation.\nSome tests don't fail because the missing implementation equates to the bad behavior being tested not happening."),(0,a.yg)("p",null,"Each test is worth a number of points.\nThe total number of points is ",(0,a.yg)("inlineCode",{parentName:"p"},"900"),".\nThe maximum grade is obtained by dividing the number of points to ",(0,a.yg)("inlineCode",{parentName:"p"},"10"),", for a maximum grade of ",(0,a.yg)("inlineCode",{parentName:"p"},"90"),"."),(0,a.yg)("p",null,"A successful run will show the output:"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-console"},"student@so:~/.../assignments/mini-libc/tests$ make check\n[...]\ntest_strcpy                      ........................ passed ...   9\ntest_strcpy_append               ........................ passed ...   9\ntest_strncpy                     ........................ passed ...   9\ntest_strncpy_cut                 ........................ passed ...   9\ntest_strcat                      ........................ passed ...   9\ntest_strcat_from_zero            ........................ passed ...   9\ntest_strcat_multiple             ........................ passed ...   9\ntest_strncat                     ........................ passed ...   9\ntest_strncat_cut                 ........................ passed ...   9\ntest_strcmp_equal                ........................ passed ...   9\ntest_strcmp_same_size_less       ........................ passed ...   1\ntest_strcmp_same_size_greater    ........................ passed ...   9\ntest_strcmp_diff_size_less       ........................ passed ...   1\ntest_strcmp_diff_size_greater    ........................ passed ...   9\ntest_strncmp_equal_size_equal    ........................ passed ...   9\ntest_strncmp_diff_contents_equal ........................ passed ...   9\ntest_strncmp_diff_size_equal     ........................ passed ...   9\ntest_strchr_exists               ........................ passed ...  11\ntest_strchr_exists_twice         ........................ passed ...   9\ntest_strchr_not_exists           ........................ passed ...   1\ntest_strrchr_exists              ........................ passed ...  11\ntest_strrchr_exists_twice        ........................ passed ...   9\ntest_strrchr_not_exists          ........................ passed ...   1\ntest_strstr_exists               ........................ passed ...  11\ntest_strstr_exists_twice         ........................ passed ...   9\ntest_strstr_not_exists           ........................ passed ...   1\ntest_strrstr_exists              ........................ passed ...  11\ntest_strrstr_exists_twice        ........................ passed ...   9\ntest_strrstr_not_exists          ........................ passed ...   1\ntest_memcpy                      ........................ passed ...  11\ntest_memcpy_part                 ........................ passed ...   9\ntest_memcmp_equal_size_equal     ........................ passed ...   9\ntest_memcmp_diff_contents_equal  ........................ passed ...   9\ntest_memcmp_diff_size_equal      ........................ passed ...   9\ntest_memset                      ........................ passed ...   9\ntest_memset_part                 ........................ passed ...   9\ntest_memmove_apart               ........................ passed ...   9\ntest_memmove_src_before_dst      ........................ passed ...   9\ntest_memmove_src_after_dst       ........................ passed ...   9\ntest_open_non_existent_file      ........................ passed ...   8\ntest_open_invalid_access_mode    ........................ passed ...   8\ntest_open_file_as_directory      ........................ passed ...   8\ntest_open_directory_for_writing  ........................ passed ...   8\ntest_open_force_invalid_creation ........................ passed ...   8\ntest_open_close_existent_file    ........................ passed ...   8\ntest_open_close_create_file      ........................ passed ...   8\ntest_open_read_write_only_mode   ........................ passed ...   8\ntest_open_write_read_only_mode   ........................ passed ...   8\ntest_lseek_invalid_fd            ........................ passed ...   8\ntest_lseek_invalid_whence        ........................ passed ...   8\ntest_lseek_invalid_offset        ........................ passed ...   8\ntest_lseek_set                   ........................ passed ...   8\ntest_lseek_cur                   ........................ passed ...   8\ntest_lseek_end                   ........................ passed ...   8\ntest_lseek_combined              ........................ passed ...   8\ntest_truncate_read_only_file     ........................ passed ...   8\ntest_truncate_invalid_size       ........................ passed ...   8\ntest_truncate_directory          ........................ passed ...   8\ntest_truncate_non_existent_file  ........................ passed ...   8\ntest_truncate_file               ........................ passed ...   8\ntest_ftruncate_read_only_file    ........................ passed ...   8\ntest_ftruncate_invalid_size      ........................ passed ...   8\ntest_ftruncate_directory         ........................ passed ...   8\ntest_ftruncate_bad_fd            ........................ passed ...   8\ntest_ftruncate_file              ........................ passed ...   8\ntest_stat_non_existent_file      ........................ passed ...   8\ntest_stat_regular_file           ........................ passed ...   8\ntest_fstat_bad_fd                ........................ passed ...   8\ntest_fstat_regular_file          ........................ passed ...   8\ntest_puts                        ........................ passed ...  15\ntest_open_close_create_file      ........................ passed ...  10\ntest_open_close_read_byte        ........................ passed ...  10\ntest_ftruncate                   ........................ passed ...  10\ntest_truncate                    ........................ passed ...  10\ntest_fstat                       ........................ passed ...  10\ntest_stat                        ........................ passed ...  10\ntest_sleep                       ........................ passed ...  20\ntest_nanosleep                   ........................ passed ...  20\ntest_mmap                        ........................ passed ...   8\ntest_mmap_bad_fd                 ........................ passed ...   8\ntest_mmap_bad_flags              ........................ passed ...   8\ntest_mremap                      ........................ passed ...   8\ntest_malloc                      ........................ passed ...   8\ntest_malloc_two                  ........................ passed ...   8\ntest_malloc_access               ........................ passed ...   8\ntest_malloc_memset               ........................ passed ...   8\ntest_malloc_memcpy               ........................ passed ...   8\ntest_calloc                      ........................ passed ...   8\ntest_realloc                     ........................ passed ...   8\ntest_realloc_access              ........................ passed ...   8\ntest_realloc_memset              ........................ passed ...   8\ntest_realloc_array               ........................ passed ...   8\ntest_malloc                      ........................ passed ...  10\ntest_multiple_malloc             ........................ passed ...  10\ntest_malloc_free                 ........................ passed ...  10\ntest_multiple_malloc_free        ........................ passed ...  10\ntest_malloc_free_sequence        ........................ passed ...  10\ntest_malloc_perm_ok              ........................ passed ...  10\ntest_malloc_perm_notok           ........................ passed ...  10\ntest_mmap                        ........................ passed ...  10\ntest_mmap_munmap                 ........................ passed ...  10\ntest_mmap_perm_ok                ........................ passed ...  10\ntest_mmap_perm_notok             ........................ passed ...  10\ntest_mmap_perm_none              ........................ passed ...  10\n\nTotal:                                                            90/100\n")),(0,a.yg)("h3",{id:"behind-the-scenes"},"Behind the Scenes"),(0,a.yg)("p",null,"For a fine grained approach, build tests and ignore errors (due to missing source code and header files) by using:"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-console"},"student@so:~/.../assignments/mini-libc/tests$ make -i\n")),(0,a.yg)("p",null,"Then run the tests, either individually via executable files and scripts:"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-console"},"student@so:~/.../assignments/mini-libc/tests$ ./test_lseek.sh\ntest_lseek                       ........................ passed ...  10\n\nstudent@so:~/.../assignments/mini-libc/tests$ ./test_memory\ntest_mmap                        ........................ passed ...   8\ntest_mmap_bad_fd                 ........................ passed ...   8\n[...]\n")),(0,a.yg)("p",null,"Or run them all via the ",(0,a.yg)("inlineCode",{parentName:"p"},"run_all_tests.sh")," script:"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-console"},"student@so:~/.../assignments/mini-libc/tests$ ./run_all_tests.sh\ntest_strcpy                      ........................ passed ...   9\ntest_strcpy_append               ........................ passed ...   9\ntest_strncpy                     ........................ passed ...   9\n[...]\n")),(0,a.yg)("h2",{id:"resources"},"Resources"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},(0,a.yg)("a",{parentName:"p",href:"https://www.gnu.org/software/libc/manual/html_mono/libc.html"},"GNU libc manual"))),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},(0,a.yg)("a",{parentName:"p",href:"https://elixir.bootlin.com/musl/latest/source"},"musl implementation of the standard C library for Linux-based systems"))),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},"Syscall interface in Linux - ",(0,a.yg)("a",{parentName:"p",href:"https://man7.org/linux/man-pages/index.html"},"Linux man pages online"))),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},(0,a.yg)("a",{parentName:"p",href:"https://elixir.bootlin.com/glibc/latest/source"},"glibc implementation of the standard C library for Linux-based systems")))))}c.isMDXComponent=!0}}]);