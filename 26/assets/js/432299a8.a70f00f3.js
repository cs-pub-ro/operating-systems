"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[9859],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>f});var a=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var s=a.createContext({}),c=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},p=function(e){var t=c(e.components);return a.createElement(s.Provider,{value:t},e.children)},m="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,r=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),m=c(n),u=i,f=m["".concat(s,".").concat(u)]||m[u]||d[u]||r;return n?a.createElement(f,o(o({ref:t},p),{},{components:n})):a.createElement(f,o({ref:t},p))}));function f(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var r=n.length,o=new Array(r);o[0]=u;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[m]="string"==typeof e?e:i,o[1]=l;for(var c=2;c<r;c++)o[c]=n[c];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},7939:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>o,default:()=>d,frontMatter:()=>r,metadata:()=>l,toc:()=>c});var a=n(7462),i=(n(7294),n(3905));const r={},o="Libraries and libc",l={unversionedId:"Lab/Software Stack/libc",id:"Lab/Software Stack/libc",title:"Libraries and libc",description:"Once we have common functions implemented, we can reuse them at any time.",source:"@site/docs/Lab/Software Stack/libc.md",sourceDirName:"Lab/Software Stack",slug:"/Lab/Software Stack/libc",permalink:"/operating-systems/26/Lab/Software Stack/libc",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"Common Functions",permalink:"/operating-systems/26/Lab/Software Stack/common-functions"},next:{title:"Statically-linked and Dynamically-linked Libraries",permalink:"/operating-systems/26/Lab/Software Stack/static-dynamic"}},s={},c=[{value:"Practice",id:"practice",level:2}],p={toc:c},m="wrapper";function d(e){let{components:t,...n}=e;return(0,i.kt)(m,(0,a.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"libraries-and-libc"},"Libraries and libc"),(0,i.kt)("p",null,"Once we have common functions implemented, we can reuse them at any time.\nThe main unit for software reusability is the ",(0,i.kt)("strong",{parentName:"p"},"library"),".\nIn short, a library is a common machine code that can be linked against different other software components.\nEach time we want to use the ",(0,i.kt)("inlineCode",{parentName:"p"},"printf()")," function or the ",(0,i.kt)("inlineCode",{parentName:"p"},"strlen()")," function, we don't need to reimplement them.\nWe also don't need to use existing source code files, rebuild them and reuse them.\nWe (re)use existing machine code in libraries."),(0,i.kt)("p",null,"A library is a collection of object files that export given data structures and functions to be used by other programs.\nWe create a program, we compile and then we link it against the library for all the features it provides."),(0,i.kt)("p",null,"The most important library in modern operating systems is the ",(0,i.kt)("strong",{parentName:"p"},"standard C library"),", also called ",(0,i.kt)("strong",{parentName:"p"},"libc"),".\nThis is the library providing system call wrappers and basic functionality for input-output, string management, memory management.\nBy default, a program is always linked with the standard C library.\nIn the examples above, we've explicitly disabled the use of the standard C library with the help of the ",(0,i.kt)("inlineCode",{parentName:"p"},"-nostdlib")," linker option."),(0,i.kt)("p",null,"By using the standard C library, it's much easier to create new programs.\nYou call existing functionality in the library and implement only features particular to your program."),(0,i.kt)("p",null,"The ",(0,i.kt)("inlineCode",{parentName:"p"},"support/libc/")," folder stores the implementation of programs using the standard C library: ",(0,i.kt)("inlineCode",{parentName:"p"},"hello.c"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"main_string.c")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"main_printf.c"),".\nThese programs are almost identical to those used in the past sections:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"hello.c")," is similar to the programs in ",(0,i.kt)("inlineCode",{parentName:"li"},"solution/basic-syscall/")," and ",(0,i.kt)("inlineCode",{parentName:"li"},"solution/syscall-wrapper/")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"main_string.c")," and ",(0,i.kt)("inlineCode",{parentName:"li"},"main_printf.c")," are similar to the programs in ",(0,i.kt)("inlineCode",{parentName:"li"},"solution/common-functions/"))),(0,i.kt)("p",null,"Let's build and run them:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-console"},'student@os:~/.../lab/support/libc$ ls\nhello  hello.c  hello.o  main_printf  main_printf.c  main_printf.o  main_string  main_string.c  main_string.o  Makefile\n\nstudent@os:~/.../lab/support/libc$ make clean\nrm -f hello hello.o\nrm -f main_printf main_printf.o\nrm -f main_string main_string.o\n\nstudent@os:~/.../lab/support/libc$ ls\nhello.c  main_printf.c  main_string.c  Makefile\n\nstudent@os:~/.../lab/support/libc$ make\ncc -Wall   -c -o hello.o hello.c\ncc -static  hello.o   -o hello\ncc -Wall   -c -o main_printf.o main_printf.c\ncc -static  main_printf.o   -o main_printf\ncc -Wall   -c -o main_string.o main_string.c\ncc -static  main_string.o   -o main_string\n\nstudent@os:~/.../lab/support/libc$ ls\nhello  hello.c  hello.o  main_printf  main_printf.c  main_printf.o  main_string  main_string.c  main_string.o  Makefile\n\nstudent@os:~/.../lab/support/libc$ ./hello\nHello, world!\nBye, world!\naaa\naaa\n^C\n\nstudent@os:~/.../lab/support/libc$ ./main_string\nDestination string is: warhammer40k\n\nstudent@os:~/.../lab/support/libc$ ./main_printf\n[before] src is at 0x492308, len is 12, content: "warhammer40k"\n[before] dest is at 0x6bb340, len is 0, content: ""\ncopying src to dest\n[after] src is at 0x492308, len is 12, content: "warhammer40k"\n[after] dest is at 0x6bb340, len is 12, content: "warhammer40k"\nabc\n')),(0,i.kt)("p",null,"The behavior / output is similar to the ones in the previous sections:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-console"},'student@os:~/.../lab/support/libc$ ../../solution/basic-syscall/hello-nasm\nHello, world!\nBye, world!\naaa\naaa\n^C\n\nstudent@os:~/.../lab/support/libc$ ../../solution/common-functions/main_string\nDestination string is: warhammer40k\n\nstudent@os:~/.../lab/support/libc$ ../../solution/common-functions/main_printf\n[before] src is at 0000000000402680, len is 12, content: "warhammer40k"\n[before] dest is at 0000000000604000, len is 0, content: ""\ncopying src to dest\n[after] src is at 0000000000402680, len is 12, content: "warhammer40k"\n[after] dest is at 0000000000604000, len is 12, content: "warhammer40k"\nabc\n')),(0,i.kt)("p",null,"We can inspect the system calls made to check the similarities.\nFor example, for the ",(0,i.kt)("inlineCode",{parentName:"p"},"main_printf")," program we get the outputs:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-console"},'student@os:~/.../lab/support/libc$ strace ./main_printf\nexecve("./main_printf", ["./main_printf"], 0x7fff7b38c240 /* 66 vars */) = 0\nbrk(NULL)                               = 0x15af000\nbrk(0x15b01c0)                          = 0x15b01c0\narch_prctl(ARCH_SET_FS, 0x15af880)      = 0\nuname({sysname="Linux", nodename="[...]", ...}) = 0\nreadlink("/proc/self/exe", "[...]/operating"..., 4096) = 105\nbrk(0x15d11c0)                          = 0x15d11c0\nbrk(0x15d2000)                          = 0x15d2000\naccess("/etc/ld.so.nohwcap", F_OK)      = -1 ENOENT (No such file or directory)\nfstat(1, {st_mode=S_IFCHR|0620, st_rdev=makedev(136, 18), ...}) = 0\nwrite(1, "[before] src is at 0x492308, len"..., 64[before] src is at 0x492308, len is 12, content: "warhammer40k"\n) = 64\nwrite(1, "[before] dest is at 0x6bb340, le"..., 52[before] dest is at 0x6bb340, len is 0, content: ""\n) = 52\nwrite(1, "copying src to dest\\n", 20copying src to dest\n)   = 20\nwrite(1, "[after] src is at 0x492308, len "..., 63[after] src is at 0x492308, len is 12, content: "warhammer40k"\n) = 63\nwrite(1, "[after] dest is at 0x6bb340, len"..., 64[after] dest is at 0x6bb340, len is 12, content: "warhammer40k"\n) = 64\nwrite(1, "ab", 2ab)                       = 2\nwrite(1, "c\\n", 2c\n)                      = 2\nexit_group(0)                           = ?\n+++ exited with 0 +++\n\nstudent@os:~/.../lab/support/libc$ strace ../../solution/common-functions/main_printf\nexecve("../../solution/common-functions/main_printf", ["../../solution/common-functions/"...], 0x7ffe204eec00 /* 66 vars */) = 0\nwrite(1, "[before] src is at 0000000000402"..., 72[before] src is at 0000000000402680, len is 12, content: "warhammer40k"\n) = 72\nwrite(1, "[before] dest is at 000000000060"..., 60[before] dest is at 0000000000604000, len is 0, content: ""\n) = 60\nwrite(1, "copying src to dest\\n", 20copying src to dest\n)   = 20\nwrite(1, "[after] src is at 00000000004026"..., 71[after] src is at 0000000000402680, len is 12, content: "warhammer40k"\n) = 71\nwrite(1, "[after] dest is at 0000000000604"..., 72[after] dest is at 0000000000604000, len is 12, content: "warhammer40k"\n) = 72\nwrite(1, "ab", 2ab)                       = 2\nwrite(1, "c\\n", 2c\n)                      = 2\nexit(0)                                 = ?\n+++ exited with 0 +++\n')),(0,i.kt)("p",null,"The output is similar, with differences at the beginning and the end of the system call trace.\nIn the case of the libc-built program, a series of additional system calls (",(0,i.kt)("inlineCode",{parentName:"p"},"brk"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"arch_prctl"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"uname")," etc.) are made.\nAlso, there is an implicit call to ",(0,i.kt)("inlineCode",{parentName:"p"},"exit_group")," instead of an explicit one to ",(0,i.kt)("inlineCode",{parentName:"p"},"exit")," in the non-libc case.\nThese are initialization and cleanup routines that are implicitly added when using the standard C library.\nThey are generally used for setting and cleaning up the stack, environment variables and other pieces of information required by the program or the standard C library itself."),(0,i.kt)("p",null,"We could argue that the initialization steps incur overhead, and that's a downside of using the standard C library.\nHowever, these initialization steps are required for almost all programs.\nAnd, given that almost all programs make use of the basic features of the standard C library, libc is almost always used.\nWe can say the above were exceptions to the rule, where we didn't make use of the standard C library."),(0,i.kt)("p",null,"Summarizing, the advantages and disadvantages of using the standard C library are:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"(+) easier development: do calls to existing functions already implemented in the standard C library;\ndefault build and link flags"),(0,i.kt)("li",{parentName:"ul"},"(+) portability: if the system provides a standard C library, one calls the library functions that will then interact with the lower-layer API"),(0,i.kt)("li",{parentName:"ul"},"(+) implicit initialization and cleanup: no need for you do explicitly create them"),(0,i.kt)("li",{parentName:"ul"},"(-) usually larger in size (static) executables"),(0,i.kt)("li",{parentName:"ul"},"(-) a level of overhead as the standard C library wraps system calls"),(0,i.kt)("li",{parentName:"ul"},"(-) potential security issues: a larger set of (potentially vulnerable) functions are presented by the standard C library")),(0,i.kt)("h2",{id:"practice"},"Practice"),(0,i.kt)("p",null,"Enter the ",(0,i.kt)("inlineCode",{parentName:"p"},"support/libc/")," folder and go through the practice items below."),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},"Use ",(0,i.kt)("inlineCode",{parentName:"p"},"malloc()")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"free()")," functions in the ",(0,i.kt)("inlineCode",{parentName:"p"},"memory.c")," program.\nMake your own use of the allocated memory."),(0,i.kt)("p",{parentName:"li"},"It's very easy to use memory management functions with the libc.\nThe alternative (without the libc) would be more cumbersome."),(0,i.kt)("p",{parentName:"li"},"Use different values for ",(0,i.kt)("inlineCode",{parentName:"p"},"malloc()"),", i.e. the allocation size.\nUse ",(0,i.kt)("inlineCode",{parentName:"p"},"strace")," to check the system calls invoked by ",(0,i.kt)("inlineCode",{parentName:"p"},"malloc()")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"free()"),".\nYou'll see that, depending on the size, the ",(0,i.kt)("inlineCode",{parentName:"p"},"brk")," or ",(0,i.kt)("inlineCode",{parentName:"p"},"mmap")," / ",(0,i.kt)("inlineCode",{parentName:"p"},"munmap")," system calls are invoked.\nAnd for certain calls to ",(0,i.kt)("inlineCode",{parentName:"p"},"malloc()")," / ",(0,i.kt)("inlineCode",{parentName:"p"},"free()")," no syscall is happening.\nYou'll find more about them in the ",(0,i.kt)("a",{parentName:"p",href:"../../../data/lab"},"Data chapter"),".")),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},"Create your own C program with calls to the standard C library in ",(0,i.kt)("inlineCode",{parentName:"p"},"vendetta.c"),".\nBe as creative as you can about the types of functions being made."))),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/operating-systems/26/Lab/Software%20Stack/quiz/libc"},"Quiz")))}d.isMDXComponent=!0}}]);