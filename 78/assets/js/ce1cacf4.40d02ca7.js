"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[1349],{5680:(e,n,t)=>{t.d(n,{xA:()=>p,yg:()=>f});var a=t(6540);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function s(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function o(e,n){if(null==e)return{};var t,a,r=function(e,n){if(null==e)return{};var t,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)t=i[a],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)t=i[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var l=a.createContext({}),c=function(e){var n=a.useContext(l),t=n;return e&&(t="function"==typeof e?e(n):s(s({},n),e)),t},p=function(e){var n=c(e.components);return a.createElement(l.Provider,{value:n},e.children)},m="mdxType",d={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},u=a.forwardRef((function(e,n){var t=e.components,r=e.mdxType,i=e.originalType,l=e.parentName,p=o(e,["components","mdxType","originalType","parentName"]),m=c(t),u=r,f=m["".concat(l,".").concat(u)]||m[u]||d[u]||i;return t?a.createElement(f,s(s({ref:n},p),{},{components:t})):a.createElement(f,s({ref:n},p))}));function f(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var i=t.length,s=new Array(i);s[0]=u;var o={};for(var l in n)hasOwnProperty.call(n,l)&&(o[l]=n[l]);o.originalType=e,o[m]="string"==typeof e?e:r,s[1]=o;for(var c=2;c<i;c++)s[c]=t[c];return a.createElement.apply(null,s)}return a.createElement.apply(null,t)}u.displayName="MDXCreateElement"},3998:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>s,default:()=>d,frontMatter:()=>i,metadata:()=>o,toc:()=>c});var a=t(8168),r=(t(6540),t(5680));const i={},s="Libraries and libc",o={unversionedId:"Software Stack/Lab 2 - Library Perspective/Libc/Reading/libc",id:"Software Stack/Lab 2 - Library Perspective/Libc/Reading/libc",title:"Libraries and libc",description:"Once we have common functions implemented, we can reuse them at any time.",source:"@site/docs/Software Stack/Lab 2 - Library Perspective/Libc/Reading/libc.md",sourceDirName:"Software Stack/Lab 2 - Library Perspective/Libc/Reading",slug:"/Software Stack/Lab 2 - Library Perspective/Libc/Reading/libc",permalink:"/operating-systems/78/Software Stack/Lab 2 - Library Perspective/Libc/Reading/libc",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"Common Functions",permalink:"/operating-systems/78/Software Stack/Lab 2 - Library Perspective/Libc/Reading/common-functions"},next:{title:"Drills",permalink:"/operating-systems/78/Software Stack/Lab 2 - Library Perspective/Libc/Drills/"}},l={},c=[],p={toc:c},m="wrapper";function d(e){let{components:n,...t}=e;return(0,r.yg)(m,(0,a.A)({},p,t,{components:n,mdxType:"MDXLayout"}),(0,r.yg)("h1",{id:"libraries-and-libc"},"Libraries and libc"),(0,r.yg)("p",null,"Once we have common functions implemented, we can reuse them at any time.\nThe main unit for software reusability is the ",(0,r.yg)("strong",{parentName:"p"},"library"),".\nIn short, a library is a common machine code that can be linked against different other software components.\nEach time we want to use the ",(0,r.yg)("inlineCode",{parentName:"p"},"printf()")," function or the ",(0,r.yg)("inlineCode",{parentName:"p"},"strlen()")," function, we don't need to reimplement them.\nWe also don't need to use existing source code files, rebuild them and reuse them.\nWe (re)use existing machine code in libraries."),(0,r.yg)("p",null,"A library is a collection of object files that export given data structures and functions to be used by other programs.\nWe create a program, we compile and then we link it against the library for all the features it provides."),(0,r.yg)("p",null,"The most important library in modern operating systems is the ",(0,r.yg)("strong",{parentName:"p"},"standard C library"),", also called ",(0,r.yg)("strong",{parentName:"p"},"libc"),".\nThis is the library providing system call wrappers and basic functionality for input-output, string management, memory management.\nBy default, a program is always linked with the standard C library.\nIn the examples above, we've explicitly disabled the use of the standard C library with the help of the ",(0,r.yg)("inlineCode",{parentName:"p"},"-nostdlib")," linker option."),(0,r.yg)("p",null,"By using the standard C library, it's much easier to create new programs.\nYou call existing functionality in the library and implement only features particular to your program."),(0,r.yg)("p",null,"The ",(0,r.yg)("inlineCode",{parentName:"p"},"libc/support/")," folder stores the implementation of programs using the standard C library: ",(0,r.yg)("inlineCode",{parentName:"p"},"hello.c"),", ",(0,r.yg)("inlineCode",{parentName:"p"},"main_string.c")," and ",(0,r.yg)("inlineCode",{parentName:"p"},"main_printf.c"),".\nThese programs are almost identical to those used in the past sections:"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("inlineCode",{parentName:"li"},"hello.c")," is similar to the programs in ",(0,r.yg)("inlineCode",{parentName:"li"},"solution/basic-syscall/")," and ",(0,r.yg)("inlineCode",{parentName:"li"},"solution/syscall-wrapper/")),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("inlineCode",{parentName:"li"},"main_string.c")," and ",(0,r.yg)("inlineCode",{parentName:"li"},"main_printf.c")," are similar to the programs in ",(0,r.yg)("inlineCode",{parentName:"li"},"solution/common-functions/"))),(0,r.yg)("p",null,"Let's build and run them:"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-console"},'student@os:~/.../tasks/libc/support$ ls\nhello  hello.c  hello.o  main_printf  main_printf.c  main_printf.o  main_string  main_string.c  main_string.o  Makefile\n\nstudent@os:~/.../tasks/libc/support$ make clean\nrm -f hello hello.o\nrm -f main_printf main_printf.o\nrm -f main_string main_string.o\n\nstudent@os:~/.../tasks/libc/support$ ls\nhello.c  main_printf.c  main_string.c  Makefile\n\nstudent@os:~/.../tasks/libc/support$ make\ncc -Wall   -c -o hello.o hello.c\ncc -static  hello.o   -o hello\ncc -Wall   -c -o main_printf.o main_printf.c\ncc -static  main_printf.o   -o main_printf\ncc -Wall   -c -o main_string.o main_string.c\ncc -static  main_string.o   -o main_string\n\nstudent@os:~/.../tasks/libc/support$ ls\nhello  hello.c  hello.o  main_printf  main_printf.c  main_printf.o  main_string  main_string.c  main_string.o  Makefile\n\nstudent@os:~/.../tasks/libc/support$ ./hello\nHello, world!\nBye, world!\naaa\naaa\n^C\n\nstudent@os:~/.../tasks/libc/support$ ./main_string\nDestination string is: warhammer40k\n\nstudent@os:~/.../tasks/libc/support$ ./main_printf\n[before] src is at 0x492308, len is 12, content: "warhammer40k"\n[before] dest is at 0x6bb340, len is 0, content: ""\ncopying src to dest\n[after] src is at 0x492308, len is 12, content: "warhammer40k"\n[after] dest is at 0x6bb340, len is 12, content: "warhammer40k"\nabc\n')),(0,r.yg)("p",null,"The behavior / output is similar to the ones in the previous sections:"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-console"},'student@os:~/.../tasks/libc/support$ ../../solution/basic-syscall/hello-nasm\nHello, world!\nBye, world!\naaa\naaa\n^C\n\nstudent@os:~/.../tasks/libc/support$ ../../solution/common-functions/main_string\nDestination string is: warhammer40k\n\nstudent@os:~/.../tasks/libc/support$ ../../solution/common-functions/main_printf\n[before] src is at 0000000000402680, len is 12, content: "warhammer40k"\n[before] dest is at 0000000000604000, len is 0, content: ""\ncopying src to dest\n[after] src is at 0000000000402680, len is 12, content: "warhammer40k"\n[after] dest is at 0000000000604000, len is 12, content: "warhammer40k"\nabc\n')),(0,r.yg)("p",null,"We can inspect the system calls made to check the similarities.\nFor example, for the ",(0,r.yg)("inlineCode",{parentName:"p"},"main_printf")," program we get the outputs:"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-console"},'student@os:~/.../tasks/libc/support$ strace ./main_printf\nexecve("./main_printf", ["./main_printf"], 0x7fff7b38c240 /- 66 vars */) = 0\nbrk(NULL)                               = 0x15af000\nbrk(0x15b01c0)                          = 0x15b01c0\narch_prctl(ARCH_SET_FS, 0x15af880)      = 0\nuname({sysname="Linux", nodename="[...]", ...}) = 0\nreadlink("/proc/self/exe", "[...]/operating"..., 4096) = 105\nbrk(0x15d11c0)                          = 0x15d11c0\nbrk(0x15d2000)                          = 0x15d2000\naccess("/etc/ld.so.nohwcap", F_OK)      = -1 ENOENT (No such file or directory)\nfstat(1, {st_mode=S_IFCHR|0620, st_rdev=makedev(136, 18), ...}) = 0\nwrite(1, "[before] src is at 0x492308, len"..., 64[before] src is at 0x492308, len is 12, content: "warhammer40k"\n) = 64\nwrite(1, "[before] dest is at 0x6bb340, le"..., 52[before] dest is at 0x6bb340, len is 0, content: ""\n) = 52\nwrite(1, "copying src to dest\\n", 20copying src to dest\n)   = 20\nwrite(1, "[after] src is at 0x492308, len "..., 63[after] src is at 0x492308, len is 12, content: "warhammer40k"\n) = 63\nwrite(1, "[after] dest is at 0x6bb340, len"..., 64[after] dest is at 0x6bb340, len is 12, content: "warhammer40k"\n) = 64\nwrite(1, "ab", 2ab)                       = 2\nwrite(1, "c\\n", 2c\n)                      = 2\nexit_group(0)                           = ?\n+++ exited with 0 +++\n\nstudent@os:~/.../tasks/libc/support$ strace ../../solution/common-functions/main_printf\nexecve("../../solution/common-functions/main_printf", ["../../solution/common-functions/"...], 0x7ffe204eec00 /- 66 vars */) = 0\nwrite(1, "[before] src is at 0000000000402"..., 72[before] src is at 0000000000402680, len is 12, content: "warhammer40k"\n) = 72\nwrite(1, "[before] dest is at 000000000060"..., 60[before] dest is at 0000000000604000, len is 0, content: ""\n) = 60\nwrite(1, "copying src to dest\\n", 20copying src to dest\n)   = 20\nwrite(1, "[after] src is at 00000000004026"..., 71[after] src is at 0000000000402680, len is 12, content: "warhammer40k"\n) = 71\nwrite(1, "[after] dest is at 0000000000604"..., 72[after] dest is at 0000000000604000, len is 12, content: "warhammer40k"\n) = 72\nwrite(1, "ab", 2ab)                       = 2\nwrite(1, "c\\n", 2c\n)                      = 2\nexit(0)                                 = ?\n+++ exited with 0 +++\n')),(0,r.yg)("p",null,"The output is similar, with differences at the beginning and the end of the system call trace.\nIn the case of the libc-built program, a series of additional system calls (",(0,r.yg)("inlineCode",{parentName:"p"},"brk"),", ",(0,r.yg)("inlineCode",{parentName:"p"},"arch_prctl"),", ",(0,r.yg)("inlineCode",{parentName:"p"},"uname")," etc.) are made.\nAlso, there is an implicit call to ",(0,r.yg)("inlineCode",{parentName:"p"},"exit_group")," instead of an explicit one to ",(0,r.yg)("inlineCode",{parentName:"p"},"exit")," in the non-libc case.\nThese are initialization and cleanup routines that are implicitly added when using the standard C library.\nThey are generally used for setting and cleaning up the stack, environment variables and other pieces of information required by the program or the standard C library itself."),(0,r.yg)("p",null,"We could argue that the initialization steps incur overhead, and that's a downside of using the standard C library.\nHowever, these initialization steps are required for almost all programs.\nAnd, given that almost all programs make use of the basic features of the standard C library, libc is almost always used.\nWe can say the above were exceptions to the rule, where we didn't make use of the standard C library."),(0,r.yg)("p",null,"Summarizing, the advantages and disadvantages of using the standard C library are:"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"(+) easier development: do calls to existing functions already implemented in the standard C library;\ndefault build and link flags"),(0,r.yg)("li",{parentName:"ul"},"(+) portability: if the system provides a standard C library, one calls the library functions that will then interact with the lower-layer API"),(0,r.yg)("li",{parentName:"ul"},"(+) implicit initialization and cleanup: no need for you do explicitly create them"),(0,r.yg)("li",{parentName:"ul"},"(-) usually larger in size (static) executables"),(0,r.yg)("li",{parentName:"ul"},"(-) a level of overhead as the standard C library wraps system calls"),(0,r.yg)("li",{parentName:"ul"},"(-) potential security issues: a larger set of (potentially vulnerable) functions are presented by the standard C library")))}d.isMDXComponent=!0}}]);