"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[2122],{5680:(e,n,a)=>{a.d(n,{xA:()=>m,yg:()=>y});var t=a(6540);function o(e,n,a){return n in e?Object.defineProperty(e,n,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[n]=a,e}function l(e,n){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);n&&(t=t.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),a.push.apply(a,t)}return a}function r(e){for(var n=1;n<arguments.length;n++){var a=null!=arguments[n]?arguments[n]:{};n%2?l(Object(a),!0).forEach((function(n){o(e,n,a[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(a,n))}))}return e}function i(e,n){if(null==e)return{};var a,t,o=function(e,n){if(null==e)return{};var a,t,o={},l=Object.keys(e);for(t=0;t<l.length;t++)a=l[t],n.indexOf(a)>=0||(o[a]=e[a]);return o}(e,n);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(t=0;t<l.length;t++)a=l[t],n.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(o[a]=e[a])}return o}var s=t.createContext({}),p=function(e){var n=t.useContext(s),a=n;return e&&(a="function"==typeof e?e(n):r(r({},n),e)),a},m=function(e){var n=p(e.components);return t.createElement(s.Provider,{value:n},e.children)},c="mdxType",d={inlineCode:"code",wrapper:function(e){var n=e.children;return t.createElement(t.Fragment,{},n)}},g=t.forwardRef((function(e,n){var a=e.components,o=e.mdxType,l=e.originalType,s=e.parentName,m=i(e,["components","mdxType","originalType","parentName"]),c=p(a),g=o,y=c["".concat(s,".").concat(g)]||c[g]||d[g]||l;return a?t.createElement(y,r(r({ref:n},m),{},{components:a})):t.createElement(y,r({ref:n},m))}));function y(e,n){var a=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var l=a.length,r=new Array(l);r[0]=g;var i={};for(var s in n)hasOwnProperty.call(n,s)&&(i[s]=n[s]);i.originalType=e,i[c]="string"==typeof e?e:o,r[1]=i;for(var p=2;p<l;p++)r[p]=a[p];return t.createElement.apply(null,r)}return t.createElement.apply(null,a)}g.displayName="MDXCreateElement"},8894:(e,n,a)=>{a.r(n),a.d(n,{assets:()=>s,contentTitle:()=>r,default:()=>d,frontMatter:()=>l,metadata:()=>i,toc:()=>p});var t=a(8168),o=(a(6540),a(5680));const l={},r="Investigate Memory Actions",i={unversionedId:"Lab/Data/investigate-memory",id:"Lab/Data/investigate-memory",title:"Investigate Memory Actions",description:"Memory actions generally mean:",source:"@site/docs/Lab/Data/investigate-memory.md",sourceDirName:"Lab/Data",slug:"/Lab/Data/investigate-memory",permalink:"/operating-systems/78/Lab/Data/investigate-memory",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"Process Memory",permalink:"/operating-systems/78/Lab/Data/process-memory"},next:{title:"Memory Security",permalink:"/operating-systems/78/Lab/Data/memory-security"}},s={},p=[{value:"Memory Leaks",id:"memory-leaks",level:2},{value:"Practice",id:"practice",level:3},{value:"Memory Actions (and Leaks) in Existing Programs",id:"memory-actions-and-leaks-in-existing-programs",level:2},{value:"Practice",id:"practice-1",level:3},{value:"jemalloc",id:"jemalloc",level:2},{value:"malloc in Musl",id:"malloc-in-musl",level:2},{value:"App Investigation: Deluge",id:"app-investigation-deluge",level:2},{value:"Practice",id:"practice-2",level:3},{value:"App Investigation: Servo",id:"app-investigation-servo",level:2},{value:"Practice",id:"practice-3",level:3},{value:"Investigation: Alocator in the D Programming Language",id:"investigation-alocator-in-the-d-programming-language",level:2},{value:"Practice",id:"practice-4",level:3},{value:"App Investigation: Git",id:"app-investigation-git",level:2},{value:"Practice",id:"practice-5",level:3}],m={toc:p},c="wrapper";function d(e){let{components:n,...a}=e;return(0,o.yg)(c,(0,t.A)({},m,a,{components:n,mdxType:"MDXLayout"}),(0,o.yg)("h1",{id:"investigate-memory-actions"},"Investigate Memory Actions"),(0,o.yg)("p",null,"Memory actions generally mean:"),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},"memory access: read, write or execute"),(0,o.yg)("li",{parentName:"ul"},"memory allocation"),(0,o.yg)("li",{parentName:"ul"},"memory deallocation")),(0,o.yg)("p",null,"By far, the most important actions are allocation and deallocation.\nBecause, if not done right, these can get to memory loss and poor memory use."),(0,o.yg)("p",null,"Memory loss generally happens in the form of memory leaks."),(0,o.yg)("h2",{id:"memory-leaks"},"Memory Leaks"),(0,o.yg)("p",null,"A memory leak occurs when we lose reference to a memory area.\nThat is, a pointer used to point to a memory area.\nAnd then it's pointing to a new memory area and the old memory area is lost."),(0,o.yg)("p",null,"Enter the ",(0,o.yg)("inlineCode",{parentName:"p"},"support/memory-leak/")," folder.\nIt stores two files showing memory leaks:"),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},"one in C++: ",(0,o.yg)("inlineCode",{parentName:"li"},"memory_leak.cpp")),(0,o.yg)("li",{parentName:"ul"},"one in C: ",(0,o.yg)("inlineCode",{parentName:"li"},"memory_leak_malloc"))),(0,o.yg)("p",null,"Let's build and run the two executables:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-console"},"student@os:~/.../lab/support/memory-leak$ make\ng++    -c -o memory_leak.o memory_leak.cpp\ncc   memory_leak.o  -lstdc++ -o memory_leak\ncc    -c -o memory_leak_malloc.o memory_leak_malloc.c\ncc   memory_leak_malloc.o  -lstdc++ -o memory_leak_malloc\n")),(0,o.yg)("p",null,"Running them yields similar output:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-console"},"student@os:~/.../lab/support/memory-leak$ ./memory_leak\nAndrei Popescu is 22 years old and likes Linux\nIoana David is 23 years old and likes macOS\nstudent@os:~/.../lab/support/memory-leak$ ./memory_leak_malloc\nAndrei Popescu is 22 years old and likes Linux\nIoana David is 23 years old and likes macOS\n")),(0,o.yg)("p",null,"We investigate the memory leaks of the two programs by using ",(0,o.yg)("a",{parentName:"p",href:"https://valgrind.org/"},"Valgrind"),":"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-console"},"student@os:~/.../lab/support/memory-leak$ valgrind ./memory_leak\n==22362== Memcheck, a memory error detector\n==22362== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.\n==22362== Using Valgrind-3.13.0 and LibVEX; rerun with -h for copyright info\n==22362== Command: ./memory_leak\n==22362==\nAndrei Popescu is 22 years old and likes Linux\nIoana David is 23 years old and likes macOS\n==22362==\n==22362== HEAP SUMMARY:\n==22362==     in use at exit: 72 bytes in 1 blocks\n==22362==   total heap usage: 4 allocs, 3 frees, 73,872 bytes allocated\n==22362==\n==22362== LEAK SUMMARY:\n==22362==    definitely lost: 72 bytes in 1 blocks\n==22362==    indirectly lost: 0 bytes in 0 blocks\n==22362==      possibly lost: 0 bytes in 0 blocks\n==22362==    still reachable: 0 bytes in 0 blocks\n==22362==         suppressed: 0 bytes in 0 blocks\n==22362== Rerun with --leak-check=full to see details of leaked memory\n==22362==\n==22362== For counts of detected and suppressed errors, rerun with: -v\n==22362== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)\n\nstudent@os:~/.../lab/support/memory-leak$ valgrind ./memory_leak_malloc\n==22369== Memcheck, a memory error detector\n==22369== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.\n==22369== Using Valgrind-3.13.0 and LibVEX; rerun with -h for copyright info\n==22369== Command: ./memory_leak_malloc\n==22369==\nAndrei Popescu is 22 years old and likes Linux\nIoana David is 23 years old and likes macOS\n==22369==\n==22369== HEAP SUMMARY:\n==22369==     in use at exit: 148 bytes in 1 blocks\n==22369==   total heap usage: 3 allocs, 2 frees, 1,320 bytes allocated\n==22369==\n==22369== LEAK SUMMARY:\n==22369==    definitely lost: 148 bytes in 1 blocks\n==22369==    indirectly lost: 0 bytes in 0 blocks\n==22369==      possibly lost: 0 bytes in 0 blocks\n==22369==    still reachable: 0 bytes in 0 blocks\n==22369==         suppressed: 0 bytes in 0 blocks\n==22369== Rerun with --leak-check=full to see details of leaked memory\n==22369==\n==22369== For counts of detected and suppressed errors, rerun with: -v\n==22369== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)\n")),(0,o.yg)("p",null,"As we are doing allocations that are not freed, this results in memory leaks."),(0,o.yg)("p",null,"For ",(0,o.yg)("inlineCode",{parentName:"p"},"malloc()"),"-based programs, we can use ",(0,o.yg)("a",{parentName:"p",href:"https://man7.org/linux/man-pages/man3/mtrace.3.html"},(0,o.yg)("inlineCode",{parentName:"a"},"mtrace()")," feature")," and ",(0,o.yg)("a",{parentName:"p",href:"https://man7.org/linux/man-pages/man1/mtrace.1.html"},(0,o.yg)("inlineCode",{parentName:"a"},"mtrace")," command")," to verify proper allocations with ",(0,o.yg)("inlineCode",{parentName:"p"},"malloc()")," and deallocations with ",(0,o.yg)("inlineCode",{parentName:"p"},"free()"),".\nWe call ",(0,o.yg)("inlineCode",{parentName:"p"},"mtrace()")," in the program (in ",(0,o.yg)("inlineCode",{parentName:"p"},"memory_leak_malloc.c"),") to enable ",(0,o.yg)("inlineCode",{parentName:"p"},"malloc()")," and ",(0,o.yg)("inlineCode",{parentName:"p"},"free()")," checking."),(0,o.yg)("p",null,"To use ",(0,o.yg)("inlineCode",{parentName:"p"},"mtrace()")," we define the ",(0,o.yg)("inlineCode",{parentName:"p"},"MALLOC_TRACE")," environment variable.\nWe probably also require to preload the libc malloc debugging library, so we use ",(0,o.yg)("inlineCode",{parentName:"p"},"LD_PRELOAD")," for that.\nNote that the file path used for ",(0,o.yg)("inlineCode",{parentName:"p"},"LD_PRELOAD")," may need to be updated, depending on your distribution:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-console"},"student@os:~/.../lab/support/memory-leak$ LD_PRELOAD=/lib/x86_64-linux-gnu/libc_malloc_debug.so.0 MALLOC_TRACE=mem.trace ./memory_leak_malloc\nAndrei Popescu is 22 years old and likes Linux\nIoana David is 23 years old and likes macOS\n")),(0,o.yg)("p",null,"Subsequently, we use the ",(0,o.yg)("inlineCode",{parentName:"p"},"mtrace")," tool to show information about the leaked data:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-console"},"student@os:~/.../lab/support/memory-leak$ mtrace ./memory_leak_malloc mem.trace\n\nMemory not freed:\n-----------------\n           Address     Size     Caller\n0x000056506d8be6a0     0x94  at 0x56506c3777ec\n")),(0,o.yg)("p",null,"The size (",(0,o.yg)("inlineCode",{parentName:"p"},"0x94"),") is the same value shown by Valgrind (",(0,o.yg)("inlineCode",{parentName:"p"},"148"),")."),(0,o.yg)("p",null,(0,o.yg)("inlineCode",{parentName:"p"},"mtrace")," provides an outcome similar to Valgrind.\nValgrind is however more powerful: it works on different types of memory (not only those allocated with ",(0,o.yg)("inlineCode",{parentName:"p"},"malloc()"),") and it doesn't require access to the source code (and the compiler phase)."),(0,o.yg)("h3",{id:"practice"},"Practice"),(0,o.yg)("ol",null,(0,o.yg)("li",{parentName:"ol"},(0,o.yg)("p",{parentName:"li"},"Print the size of the ",(0,o.yg)("inlineCode",{parentName:"p"},"Student")," class and the ",(0,o.yg)("inlineCode",{parentName:"p"},"struct student")," structure to see if it equates to the leak shown by Valgrind.")),(0,o.yg)("li",{parentName:"ol"},(0,o.yg)("p",{parentName:"li"},"Solve the memory leaks in both programs.\nValidate with Valgrind."))),(0,o.yg)("p",null,(0,o.yg)("a",{parentName:"p",href:"/operating-systems/78/Lab/Data/quiz/valgrind-leaks"},"Quiz")),(0,o.yg)("h2",{id:"memory-actions-and-leaks-in-existing-programs"},"Memory Actions (and Leaks) in Existing Programs"),(0,o.yg)("p",null,"We can use Valgrind to investigate existing programs in the system.\nThis tells us whether they possess memory leaks:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-console"},"student@os:~/.../lab/support/memory-leak$ valgrind ls\n==24669== Memcheck, a memory error detector\n==24669== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.\n==24669== Using Valgrind-3.13.0 and LibVEX; rerun with -h for copyright info\n==24669== Command: ls\n==24669==\nMakefile  memory_leak  memory_leak.cpp  memory_leak_malloc  memory_leak_malloc.c  memory_leak_malloc.o  memory_leak.o\n==24669==\n==24669== HEAP SUMMARY:\n==24669==     in use at exit: 21,696 bytes in 14 blocks\n==24669==   total heap usage: 51 allocs, 37 frees, 61,331 bytes allocated\n==24669==\n==24669== LEAK SUMMARY:\n==24669==    definitely lost: 0 bytes in 0 blocks\n==24669==    indirectly lost: 0 bytes in 0 blocks\n==24669==      possibly lost: 0 bytes in 0 blocks\n==24669==    still reachable: 21,696 bytes in 14 blocks\n==24669==         suppressed: 0 bytes in 0 blocks\n==24669== Rerun with --leak-check=full to see details of leaked memory\n==24669==\n==24669== For counts of detected and suppressed errors, rerun with: -v\n==24669== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)\n\nstudent@os:~/.../lab/support/memory-leak$ valgrind ps\n==24671== Memcheck, a memory error detector\n==24671== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.\n==24671== Using Valgrind-3.13.0 and LibVEX; rerun with -h for copyright info\n==24671== Command: ps\n==24671==\n  PID TTY          TIME CMD\n24671 pts/22   00:00:00 memcheck-amd64-\n26732 pts/22   00:00:01 bash\n==24671==\n==24671== HEAP SUMMARY:\n==24671==     in use at exit: 264,929 bytes in 25 blocks\n==24671==   total heap usage: 692 allocs, 667 frees, 334,268 bytes allocated\n==24671==\n==24671== LEAK SUMMARY:\n==24671==    definitely lost: 0 bytes in 0 blocks\n==24671==    indirectly lost: 0 bytes in 0 blocks\n==24671==      possibly lost: 0 bytes in 0 blocks\n==24671==    still reachable: 264,929 bytes in 25 blocks\n==24671==         suppressed: 0 bytes in 0 blocks\n==24671== Rerun with --leak-check=full to see details of leaked memory\n==24671==\n==24671== For counts of detected and suppressed errors, rerun with: -v\n==24671== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)\n\nstudent@os:~/.../lab/support/memory-leak$ valgrind bash -c 'echo \"ha\"'\n==24675== Memcheck, a memory error detector\n==24675== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.\n==24675== Using Valgrind-3.13.0 and LibVEX; rerun with -h for copyright info\n==24675== Command: bash -c echo\\ \"ha\"\n==24675==\nha\n==24675==\n==24675== HEAP SUMMARY:\n==24675==     in use at exit: 43,056 bytes in 672 blocks\n==24675==   total heap usage: 774 allocs, 102 frees, 51,405 bytes allocated\n==24675==\n==24675== LEAK SUMMARY:\n==24675==    definitely lost: 12 bytes in 1 blocks\n==24675==    indirectly lost: 0 bytes in 0 blocks\n==24675==      possibly lost: 0 bytes in 0 blocks\n==24675==    still reachable: 43,044 bytes in 671 blocks\n==24675==         suppressed: 0 bytes in 0 blocks\n==24675== Rerun with --leak-check=full to see details of leaked memory\n==24675==\n==24675== For counts of detected and suppressed errors, rerun with: -v\n==24675== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)\n")),(0,o.yg)("p",null,"We can see that ",(0,o.yg)("inlineCode",{parentName:"p"},"ls")," and ",(0,o.yg)("inlineCode",{parentName:"p"},"ps")," don't have memory leaks.\nHowever, the shell (Bash) shows a memory leak of 12 bytes (on the test system).\nThis may be a false positive or the subject of an actual investigation."),(0,o.yg)("p",null,"Note that the ",(0,o.yg)("inlineCode",{parentName:"p"},"still reachable")," section of the output refers to memory that wasn't freed, but still has pointers referring to it.\nA true memory leak occurs when no pointers refer any memory area."),(0,o.yg)("h3",{id:"practice-1"},"Practice"),(0,o.yg)("ol",null,(0,o.yg)("li",{parentName:"ol"},(0,o.yg)("p",{parentName:"li"},"Investigate 2-3 other executables in the system using Valgrind.")),(0,o.yg)("li",{parentName:"ol"},(0,o.yg)("p",{parentName:"li"},"Use ",(0,o.yg)("inlineCode",{parentName:"p"},"ltrace")," to list ",(0,o.yg)("inlineCode",{parentName:"p"},"malloc()")," and ",(0,o.yg)("inlineCode",{parentName:"p"},"free()")," calls made by the investigated system executables."))),(0,o.yg)("p",null,"Note that, as explained in the ",(0,o.yg)("a",{parentName:"p",href:"https://open-education-hub.github.io/operating-systems/Lab/Software%20Stack/libcall-syscall"},"Software Stack lab"),", on some systems, ",(0,o.yg)("inlineCode",{parentName:"p"},"ltrace")," does not accurately show the output, due to ",(0,o.yg)("em",{parentName:"p"},"now binding"),".\nFear not, you can always check the library calls with a more verbose and harder to parse ",(0,o.yg)("inlineCode",{parentName:"p"},"ltrace")," command:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-console"},'student@os:~$ ltrace -x "*"\n')),(0,o.yg)("p",null,(0,o.yg)("a",{parentName:"p",href:"/operating-systems/78/Lab/Data/quiz/memory-leaks"},"Quiz")),(0,o.yg)("h2",{id:"jemalloc"},"jemalloc"),(0,o.yg)("p",null,(0,o.yg)("a",{parentName:"p",href:"http://jemalloc.net/"},"jemalloc")," is a featureful allocator that is intended to replace the standard allocator in the standard C library (libc).\njemalloc provides replacements for the general ",(0,o.yg)("inlineCode",{parentName:"p"},"malloc()")," and ",(0,o.yg)("inlineCode",{parentName:"p"},"free()")," functions, and also provides a custom API targeted for performance tuning."),(0,o.yg)("p",null,"As ",(0,o.yg)("a",{parentName:"p",href:"https://github.com/jemalloc/jemalloc/wiki/Getting-Started"},"documented"),", there are multiple ways to use ",(0,o.yg)("inlineCode",{parentName:"p"},"jemalloc"),", the easiest of which is to use the ",(0,o.yg)("inlineCode",{parentName:"p"},"LD_PRELOAD")," environment variable and preload the library and hook into ",(0,o.yg)("inlineCode",{parentName:"p"},"malloc()")," and ",(0,o.yg)("inlineCode",{parentName:"p"},"free()")," function calls."),(0,o.yg)("p",null,"First install ",(0,o.yg)("inlineCode",{parentName:"p"},"jemalloc")," on our system.\nOn your typical Ubuntu / Debian-based system, use ",(0,o.yg)("inlineCode",{parentName:"p"},"apt"),":"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-console"},"student@os:~/.../data/lab/content$ sudo apt -y install libjemalloc-dev\n")),(0,o.yg)("p",null,"Note that this installs the distribution package, not the latest one (that may provide more features)."),(0,o.yg)("p",null,"With this in place, we can use ",(0,o.yg)("inlineCode",{parentName:"p"},"jemalloc")," against our pre-built executables or system executables (such as ",(0,o.yg)("inlineCode",{parentName:"p"},"ls"),", ",(0,o.yg)("inlineCode",{parentName:"p"},"ps"),").\nWe can test it against the executable files from ",(0,o.yg)("inlineCode",{parentName:"p"},"support/memory-leak/"),":"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-console"},"student@os:~/.../lab/support/memory-leak$ LD_PRELOAD=/usr/lib/x86_64-linux-gnu/libjemalloc.so ./memory_leak_malloc\nAndrei Popescu is 22 years old and likes Linux\nIoana David is 23 years old and likes macOS\n")),(0,o.yg)("p",null,(0,o.yg)("inlineCode",{parentName:"p"},"jemalloc")," can use the ",(0,o.yg)("inlineCode",{parentName:"p"},"MALLOC_CONF")," environment variable for a ",(0,o.yg)("a",{parentName:"p",href:"https://www.freebsd.org/cgi/man.cgi?query=malloc.conf"},"diverse set of configurations"),".\nFor example, by using ",(0,o.yg)("inlineCode",{parentName:"p"},"stats_print:true")," we print out information regarding the use of the library functions:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-console"},'student@os:~/.../lab/support/memory-leak$ LD_PRELOAD=/usr/lib/x86_64-linux-gnu/libjemalloc.so MALLOC_CONF="stats_print:true" ./memory_leak_malloc\nAndrei Popescu is 22 years old and likes Linux\nIoana David is 23 years old and likes macOS\n___ Begin jemalloc statistics ___\nVersion: 3.6.0-11\nAssertions disabled\nRun-time option settings:\n  opt.abort: false\n  opt.lg_chunk: 22\n  opt.dss: "secondary"\n  opt.narenas: 32\n  opt.lg_dirty_mult: 3\n  opt.stats_print: true\n  opt.junk: false\n  opt.quarantine: 0\n  opt.redzone: false\n[...]\ndirty pages: 26:0 active:dirty, 0 sweeps, 0 madvises, 0 purged\n            allocated      nmalloc      ndalloc    nrequests\nsmall:          72672          114            0            3\nlarge:          32768            1            0            1\ntotal:         105440          115            0            4\nactive:        106496\nmapped:       4194304\n[...]\n')),(0,o.yg)("p",null,(0,o.yg)("inlineCode",{parentName:"p"},"jemalloc")," doesn't work against system executables using preloading, likely because of security options disabling the use of the library:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-console"},'student@os:~/.../lab/support/memory-leak$ LD_PRELOAD=/usr/lib/x86_64-linux-gnu/libjemalloc.so MALLOC_CONF="stats_print:true" /bin/ls\nMakefile  memory_leak  memory_leak.cpp  memory_leak_malloc  memory_leak_malloc.c  memory_leak_malloc.o  memory_leak.o\n\nstudent@os:~/.../lab/support/memory-leak$ LD_PRELOAD=/usr/lib/x86_64-linux-gnu/libjemalloc.so MALLOC_CONF="stats_print:true" /bin/ps\n  PID TTY          TIME CMD\n 1581 pts/22   00:00:00 ps\n26732 pts/22   00:00:01 bash\n')),(0,o.yg)("h2",{id:"malloc-in-musl"},"malloc in Musl"),(0,o.yg)("p",null,"Each libc (or memory allocator such as ",(0,o.yg)("inlineCode",{parentName:"p"},"jemalloc"),") uses their own implementation of ",(0,o.yg)("inlineCode",{parentName:"p"},"malloc()"),", ",(0,o.yg)("inlineCode",{parentName:"p"},"free()")," and other functions.\n",(0,o.yg)("a",{parentName:"p",href:"https://musl.libc.org/"},"Musl libc")," is a lightweight standard C library that provides compatible features with the more heavyweights ",(0,o.yg)("a",{parentName:"p",href:"https://www.gnu.org/software/libc/"},"GNU libc"),"."),(0,o.yg)("p",null,"Take a look through implementation of ",(0,o.yg)("inlineCode",{parentName:"p"},"malloc()")," and ",(0,o.yg)("inlineCode",{parentName:"p"},"free()")," in ",(0,o.yg)("a",{parentName:"p",href:"https://elixir.bootlin.com/musl/v1.2.3/source/src/malloc"},"Musl libc"),".\nSee all three implementations for ",(0,o.yg)("inlineCode",{parentName:"p"},"malloc()"),":"),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},"the one in ",(0,o.yg)("inlineCode",{parentName:"li"},"lite_malloc.c")),(0,o.yg)("li",{parentName:"ul"},"the one in ",(0,o.yg)("inlineCode",{parentName:"li"},"mallocng/malloc.c")),(0,o.yg)("li",{parentName:"ul"},"the one in ",(0,o.yg)("inlineCode",{parentName:"li"},"oldmalloc/malloc"))),(0,o.yg)("p",null,"See also ",(0,o.yg)("a",{parentName:"p",href:"https://elixir.bootlin.com/musl/v1.2.3/source/src/malloc/mallocng/free.c#L101"},"the implementation of ",(0,o.yg)("inlineCode",{parentName:"a"},"free()")),".\nAnd ",(0,o.yg)("a",{parentName:"p",href:"https://elixir.bootlin.com/musl/v1.2.3/source/src/malloc/calloc.c#L33"},"the implementation of ",(0,o.yg)("inlineCode",{parentName:"a"},"calloc()")),"."),(0,o.yg)("p",null,"You needn't spend too much time browsing the implementation of these functions, just having a broad understanding of how they work."),(0,o.yg)("h2",{id:"app-investigation-deluge"},"App Investigation: Deluge"),(0,o.yg)("p",null,(0,o.yg)("a",{parentName:"p",href:"https://www.deluge-torrent.org/"},"Deluge")," is a Bittorrent client written in Python."),(0,o.yg)("p",null,"We want to locate places that allocate memory in Deluge (in Python).\nThis generally means locating instantiation of classes."),(0,o.yg)("p",null,"Let's clone the ",(0,o.yg)("a",{parentName:"p",href:"https://github.com/deluge-torrent/deluge"},"source code"),":"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-console"},"student@os:~/.../data/lab/support$ git clone https://github.com/deluge-torrent/deluge\nCloning into 'deluge'...\n[...]\n\nstudent@os:~/.../data/lab/support$ cd deluge/\n\nstudent@os:~/.../lab/support/deluge$ ls\nAUTHORS       deluge      docs             gen_web_gettext.py  MANIFEST.in       msgfmt.py  pyproject.toml  requirements-dev.txt    requirements.txt  setup.py  version.py\nCHANGELOG.md  DEPENDS.md  generate_pot.py  LICENSE             minify_web_js.py  packaging  README.md       requirements-tests.txt  setup.cfg         tox.ini\n")),(0,o.yg)("p",null,"And enter the ",(0,o.yg)("inlineCode",{parentName:"p"},"deluge/core/")," subdirectory:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-console"},"student@os:~/.../lab/support/deluge$ cd deluge/core/\n\nstudent@os:~/.../deluge/deluge/core$ ls\nalertmanager.py  core.py          daemon.py        filtermanager.py  pluginmanager.py       rpcserver.py       torrent.py\nauthmanager.py   daemon_entry.py  eventmanager.py  __init__.py       preferencesmanager.py  torrentmanager.py\n")),(0,o.yg)("p",null,"Most files in the subdirectory have a class defined.\nWe can search for instantiations of that class using ",(0,o.yg)("inlineCode",{parentName:"p"},"grep"),":"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-console"},"student@os:~/.../deluge/deluge/core$ grep -rn 'Torrent('\ntorrentmanager.py:644:        torrent = Torrent(handle, options, state, filename, magne\n\nstudent@os:~/.../deluge/deluge/core$ grep -rn 'TorrentManager('\ncore.py:139:        self.torrentmanager = TorrentManager()\ntorrentmanager.py:135:class TorrentManager(component.Component):\n")),(0,o.yg)("p",null,"This gives us an overview of when memory is allocated in Deluge / Python."),(0,o.yg)("h3",{id:"practice-2"},"Practice"),(0,o.yg)("ol",null,(0,o.yg)("li",{parentName:"ol"},(0,o.yg)("p",{parentName:"li"},"Investigate the lines shown to contain instantiations of classes.\nExplore the source code and understand their placements in the source code.")),(0,o.yg)("li",{parentName:"ol"},(0,o.yg)("p",{parentName:"li"},"Find out other classes and search for their instantiation in the source code."))),(0,o.yg)("h2",{id:"app-investigation-servo"},"App Investigation: Servo"),(0,o.yg)("p",null,(0,o.yg)("a",{parentName:"p",href:"https://servo.org/"},"Servo")," is a browser engine written in Rust that provides reusable components to implement web standards."),(0,o.yg)("p",null,"We do not clone the repository, since it's very large."),(0,o.yg)("p",null,"We find information about allocator used, by accessing the ",(0,o.yg)("inlineCode",{parentName:"p"},"components/allocator/")," in ",(0,o.yg)("a",{parentName:"p",href:"https://github.com/servo/servo/tree/master/components/allocator"},"its source code"),".\nIn ",(0,o.yg)("inlineCode",{parentName:"p"},"Cargo.toml")," we see that it requires ",(0,o.yg)("inlineCode",{parentName:"p"},"jemalloc")," for non-Windows implementations and the standard Windows API (called ",(0,o.yg)("inlineCode",{parentName:"p"},"heapapi"),") for Windows:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-text"},'[...]\n[lib]\npath = "lib.rs"\n\n[target.\'cfg(not(windows))\'.dependencies]\njemalloc-sys = { version = "0.3.2" }\n\n[target.\'cfg(windows)\'.dependencies]\nwinapi = { version = "0.3", features = ["heapapi"] }\nust: https://github.com/servo/servo\n')),(0,o.yg)("p",null,"In ",(0,o.yg)("inlineCode",{parentName:"p"},"lib.rs"),", in ",(0,o.yg)("a",{parentName:"p",href:"https://github.com/servo/servo/blob/master/components/allocator/lib.rs#L70"},(0,o.yg)("inlineCode",{parentName:"a"},"GlobalAlloc:alloc()"))," we see it is using ",(0,o.yg)("a",{parentName:"p",href:"https://jemalloc.net/jemalloc.3.html"},"the ",(0,o.yg)("inlineCode",{parentName:"a"},"mallocx")," custom function from ",(0,o.yg)("inlineCode",{parentName:"a"},"jemalloc()")),".\nSee ",(0,o.yg)("a",{parentName:"p",href:"https://github.com/servo/servo/blob/master/components/allocator/lib.rs#L17"},"the initialization of ",(0,o.yg)("inlineCode",{parentName:"a"},"ffi")),"."),(0,o.yg)("p",null,"See the use of the allocator in the ",(0,o.yg)("a",{parentName:"p",href:"https://github.com/servo/servo/blob/master/components/net/Cargo.toml"},(0,o.yg)("inlineCode",{parentName:"a"},"Cargo.toml")," file in the ",(0,o.yg)("inlineCode",{parentName:"a"},"net")," component"),".\nSearch for the ",(0,o.yg)("em",{parentName:"p"},"alloc")," string."),(0,o.yg)("h3",{id:"practice-3"},"Practice"),(0,o.yg)("ol",null,(0,o.yg)("li",{parentName:"ol"},"Look for uses of the allocator in other components of Servo.")),(0,o.yg)("h2",{id:"investigation-alocator-in-the-d-programming-language"},"Investigation: Alocator in the D Programming Language"),(0,o.yg)("p",null,(0,o.yg)("a",{parentName:"p",href:"https://github.com/dlang/phobos"},"Phobos")," is the standard library that comes with the D programming language compiler."),(0,o.yg)("p",null,"Let's clone the source code:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-console"},"student@os:~/.../data/lab/support$ git clone https://github.com/dlang/phobos\n[...]\n\nstudent@os:~/.../data/lab/support$ cd phobos/\n\nstudent@os:~/.../lab/support/phobos$ ls\nazure-pipelines.yml  changelog  CODEOWNERS  CONTRIBUTING.md  dub.sdl  etc  index.dd  LICENSE_1_0.txt  posix.mak  project.ddoc  README.md  std  test  unittest.d  win32.mak  win64.mak\n")),(0,o.yg)("p",null,"And enter ",(0,o.yg)("inlineCode",{parentName:"p"},"std/experimental/allocator/")," to browse information about the allocator:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-console"},"student@os:~/.../lab/support/phobos$ cd std/experimental/allocator/\n\nstudent@os:~/.../std/experimental/allocator$ ls\nbuilding_blocks  common.d  gc_allocator.d  mallocator.d  mmap_allocator.d  package.d  showcase.d  typed.d\n")),(0,o.yg)("p",null,"We then do a search of the ",(0,o.yg)("inlineCode",{parentName:"p"},"allocate(")," string to find instances of allocation calls:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-console"},"student@os:~/.../std/experimental/allocator$ grep -r 'allocate('\n[...]\n")),(0,o.yg)("p",null,"We see that there are definitions of the function (as expected) as part of ",(0,o.yg)("inlineCode",{parentName:"p"},"...allocator")," files: ",(0,o.yg)("inlineCode",{parentName:"p"},"mallocator.d"),", ",(0,o.yg)("inlineCode",{parentName:"p"},"gc_allocator.d"),", ",(0,o.yg)("inlineCode",{parentName:"p"},"mmap_allocator.d"),".\nBrowse the functions and look for implementations of the ",(0,o.yg)("inlineCode",{parentName:"p"},"allocate()")," function."),(0,o.yg)("h3",{id:"practice-4"},"Practice"),(0,o.yg)("ol",null,(0,o.yg)("li",{parentName:"ol"},"Do a similar search and then source code browsing for the ",(0,o.yg)("inlineCode",{parentName:"li"},"deallocate()")," function.")),(0,o.yg)("h2",{id:"app-investigation-git"},"App Investigation: Git"),(0,o.yg)("p",null,(0,o.yg)("a",{parentName:"p",href:"https://git-scm.com/"},"Git")," is among the most used source code management system, powering development infrastructures such as ",(0,o.yg)("a",{parentName:"p",href:"https://github.com/"},"GitHub"),", ",(0,o.yg)("a",{parentName:"p",href:"https://about.gitlab.com/"},"GitLab")," and ",(0,o.yg)("a",{parentName:"p",href:"https://bitbucket.org/"},"Bitbucket"),"."),(0,o.yg)("p",null,"Let's clone ",(0,o.yg)("a",{parentName:"p",href:"https://github.com/git/git"},"the repository"),".\nNote that it is about 200MB large:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-console"},"student@os:~/.../data/lab/support$ git clone https://github.com/git/git\n[...]\n\nstudent@os:~/.../data/lab/support$ cd git/\n")),(0,o.yg)("p",null,"We look of uses of ",(0,o.yg)("inlineCode",{parentName:"p"},"malloc()"),":"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-console"},"student@os:~/.../lab/support/git$ grep -r 'malloc(' .\n")),(0,o.yg)("p",null,"We see there are multiple calls to the ",(0,o.yg)("inlineCode",{parentName:"p"},"xmalloc()")," function, which is likely a wrapper for ",(0,o.yg)("inlineCode",{parentName:"p"},"malloc()"),".\nWe search for the definition of ",(0,o.yg)("inlineCode",{parentName:"p"},"xmalloc()"),":"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-console"},"student@os:~/.../lab/support/git$ grep -rn 'xmalloc(' . | grep -v ';'\n./commit.c:188:                 graft = xmalloc(st_add(sizeof(*graft),\n./add-interactive.c:157:        list->sorted.items = xmalloc(st_mult(sizeof(*list->sorted.items),\n./Documentation/RelNotes/2.24.0.txt:91: * xmalloc() used to have a mechanism to ditch memory and address\n./Documentation/RelNotes/2.24.0.txt:210:   xmalloc() wrapper, as the rest of the system, for consistency.\n./Documentation/RelNotes/2.34.0.txt:230: * mmap() imitation used to call xmalloc() that dies upon malloc()\n./Documentation/RelNotes/2.33.1.txt:44: * mmap() imitation used to call xmalloc() that dies upon malloc()\n./diffcore-delta.c:56:  new_spanhash = xmalloc(st_add(sizeof(*orig),\n./diffcore-delta.c:135: hash = xmalloc(st_add(sizeof(*hash),\n./kwset.c:41:/* adapter for `xmalloc()`, which takes `size_t`, not `long` */\n./builtin/fast-import.c:461:    b = xmalloc(sizeof(struct object_entry_pool)\n./hashmap.h:311: * your structure was allocated with xmalloc(), you can just free(3) it,\n./xdiff/xdiff.h:122:#define xdl_malloc(x) xmalloc(x)\n./wrapper.c:45:static void *do_xmalloc(size_t size, int gentle)\n./wrapper.c:70:void *xmalloc(size_t size)\n./contrib/credential/wincred/git-credential-wincred.c:26:static void *xmalloc(size_t size)\nBinary file ./.git/objects/pack/pack-c587b9f11a82bc4d49848d74132e60ea4dbeb177.pack matches\n./git-compat-util.h:1046:# define xalloca(size)      (xmalloc(size))\n./git-compat-util.h:1086:#define ALLOC_ARRAY(x, alloc) (x) = xmalloc(st_mult(sizeof(*(x)), (alloc)))\n./read-cache.c:3768:    ieot = xmalloc(sizeof(struct index_entry_offset_table)\n")),(0,o.yg)("p",null,"Line ",(0,o.yg)("inlineCode",{parentName:"p"},"./wrapper.c:70")," is the one with the definition of the ",(0,o.yg)("inlineCode",{parentName:"p"},"xmalloc()")," function.\nIt makes a call of the ",(0,o.yg)("a",{parentName:"p",href:"https://github.com/git/git/blob/master/wrapper.c#L45"},(0,o.yg)("inlineCode",{parentName:"a"},"do_xmalloc()")," function"),", that makes extra checks.\nAlso, if the ",(0,o.yg)("inlineCode",{parentName:"p"},"XMALLOC_POISON"),' macro is defined, all the allocated data is overwritten with a "poison" value (',(0,o.yg)("inlineCode",{parentName:"p"},"0xA5"),").\nThis is useful for early detection of memory-related issues, although, evidently, it adds overhead."),(0,o.yg)("p",null,"We can look for parts of the source code with the largest number of uses of ",(0,o.yg)("inlineCode",{parentName:"p"},"xmalloc()"),":"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-console"},"student@os:~/.../lab/support/git$ grep -rc 'xmalloc(' . | grep -v ':0' | sort -n -t ':' -k 20\n[...]\n./compat/mingw.c:6\n./submodule-config.c:6\n./merge-recursive.c:7\n")),(0,o.yg)("p",null,"We can look into the ",(0,o.yg)("a",{parentName:"p",href:"https://github.com/git/git/blob/master/merge-recursive.c"},(0,o.yg)("inlineCode",{parentName:"a"},"merge-recursive.c")," file")," for uses of the ",(0,o.yg)("inlineCode",{parentName:"p"},"xmalloc()")," function."),(0,o.yg)("h3",{id:"practice-5"},"Practice"),(0,o.yg)("ol",null,(0,o.yg)("li",{parentName:"ol"},(0,o.yg)("p",{parentName:"li"},"Do the same actions as above for the ",(0,o.yg)("inlineCode",{parentName:"p"},"mmap()")," and ",(0,o.yg)("inlineCode",{parentName:"p"},"xmmap()")," function calls."),(0,o.yg)("p",{parentName:"li"},"Note that these are not memory allocation calls, since a valid ",(0,o.yg)("inlineCode",{parentName:"p"},"fd")," file argument is passed.\nThese are file mapping calls, that we will talk more as part of the I/O chapter."))))}d.isMDXComponent=!0}}]);