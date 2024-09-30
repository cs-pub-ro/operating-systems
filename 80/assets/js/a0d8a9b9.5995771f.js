"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[3005],{5680:(e,n,t)=>{t.d(n,{xA:()=>l,yg:()=>d});var r=t(6540);function i(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function a(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function o(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?a(Object(t),!0).forEach((function(n){i(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function s(e,n){if(null==e)return{};var t,r,i=function(e,n){if(null==e)return{};var t,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||(i[t]=e[t]);return i}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}var p=r.createContext({}),c=function(e){var n=r.useContext(p),t=n;return e&&(t="function"==typeof e?e(n):o(o({},n),e)),t},l=function(e){var n=c(e.components);return r.createElement(p.Provider,{value:n},e.children)},m="mdxType",g={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},f=r.forwardRef((function(e,n){var t=e.components,i=e.mdxType,a=e.originalType,p=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),m=c(t),f=i,d=m["".concat(p,".").concat(f)]||m[f]||g[f]||a;return t?r.createElement(d,o(o({ref:n},l),{},{components:t})):r.createElement(d,o({ref:n},l))}));function d(e,n){var t=arguments,i=n&&n.mdxType;if("string"==typeof e||i){var a=t.length,o=new Array(a);o[0]=f;var s={};for(var p in n)hasOwnProperty.call(n,p)&&(s[p]=n[p]);s.originalType=e,s[m]="string"==typeof e?e:i,o[1]=s;for(var c=2;c<a;c++)o[c]=t[c];return r.createElement.apply(null,o)}return r.createElement.apply(null,t)}f.displayName="MDXCreateElement"},7623:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>p,contentTitle:()=>o,default:()=>g,frontMatter:()=>a,metadata:()=>s,toc:()=>c});var r=t(8168),i=(t(6540),t(5680));const a={},o="Common Functions",s={unversionedId:"Software Stack/Lab 2 - Library Perspective/Libc/Reading/common-functions",id:"Software Stack/Lab 2 - Library Perspective/Libc/Reading/common-functions",title:"Common Functions",description:"By using wrapper calls, we are able to write our programs in C.",source:"@site/docs/Software Stack/Lab 2 - Library Perspective/Libc/Reading/common-functions.md",sourceDirName:"Software Stack/Lab 2 - Library Perspective/Libc/Reading",slug:"/Software Stack/Lab 2 - Library Perspective/Libc/Reading/common-functions",permalink:"/operating-systems/80/Software Stack/Lab 2 - Library Perspective/Libc/Reading/common-functions",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"Reading",permalink:"/operating-systems/80/Software Stack/Lab 2 - Library Perspective/Libc/Reading/"},next:{title:"Libraries and libc",permalink:"/operating-systems/80/Software Stack/Lab 2 - Library Perspective/Libc/Reading/libc"}},p={},c=[],l={toc:c},m="wrapper";function g(e){let{components:n,...t}=e;return(0,i.yg)(m,(0,r.A)({},l,t,{components:n,mdxType:"MDXLayout"}),(0,i.yg)("h1",{id:"common-functions"},"Common Functions"),(0,i.yg)("p",null,"By using wrapper calls, we are able to write our programs in C.\nHowever, we still need to implement common functions for string management, working with I/O, working with memory."),(0,i.yg)("p",null,"The simple attempt is to implement these functions (",(0,i.yg)("inlineCode",{parentName:"p"},"printf()")," or ",(0,i.yg)("inlineCode",{parentName:"p"},"strcpy()")," or ",(0,i.yg)("inlineCode",{parentName:"p"},"malloc()"),") once in a C source code file and then reuse them when needed.\nThis saves us time (we don't have to reimplement) and allows us to constantly improve one implementation constantly;\nthere will only be one implementation that we update to increase its safety, efficiency or performance."),(0,i.yg)("p",null,"The ",(0,i.yg)("inlineCode",{parentName:"p"},"common-functions/support")," folder stores the implementation of string management functions, in ",(0,i.yg)("inlineCode",{parentName:"p"},"string.c")," and ",(0,i.yg)("inlineCode",{parentName:"p"},"string.h")," and of printing functions in ",(0,i.yg)("inlineCode",{parentName:"p"},"printf.c")," and ",(0,i.yg)("inlineCode",{parentName:"p"},"printf.h"),".\nThe ",(0,i.yg)("inlineCode",{parentName:"p"},"printf")," implementation is ",(0,i.yg)("a",{parentName:"p",href:"https://github.com/mpaland/printf"},"this one"),"."),(0,i.yg)("p",null,"There are two programs: ",(0,i.yg)("inlineCode",{parentName:"p"},"main_string.c")," showcases string management functions, ",(0,i.yg)("inlineCode",{parentName:"p"},"main_printf.c")," showcases the ",(0,i.yg)("inlineCode",{parentName:"p"},"printf()")," function."),(0,i.yg)("p",null,(0,i.yg)("inlineCode",{parentName:"p"},"main_string.c")," depends on the ",(0,i.yg)("inlineCode",{parentName:"p"},"string.h")," and ",(0,i.yg)("inlineCode",{parentName:"p"},"string.c")," files that implement the ",(0,i.yg)("inlineCode",{parentName:"p"},"strlen()")," and ",(0,i.yg)("inlineCode",{parentName:"p"},"strcpy()")," functions.\nWe print messages using the ",(0,i.yg)("inlineCode",{parentName:"p"},"write()")," system call wrapper implemented in ",(0,i.yg)("inlineCode",{parentName:"p"},"syscall.s")),(0,i.yg)("p",null,"Let's build and run the program:"),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-console"},'student@os:~/.../tasks/common-functions/support$ make main_string\ngcc -fno-stack-protector   -c -o main_string.o main_string.c\ngcc -fno-stack-protector   -c -o string.o string.c\nnasm -f elf64 -o syscall.o syscall.s\ngcc -nostdlib -no-pie -Wl,--entry=main -Wl,--build-id=none  main_string.o string.o syscall.o   -o main_string\n\nstudent@os:~/.../tasks/common-functions/support$ ./main_string\nDestination string is: warhammer40k\n\nstudent@os:~/.../tasks/common-functions/support$ strace ./main_string\nexecve("./main_string", ["./main_string"], 0x7ffd544d0a70 /- 63 vars */) = 0\nwrite(1, "Destination string is: ", 23Destination string is: ) = 23\nwrite(1, "warhammer40k\\n", 13warhammer40k\n)          = 13\nexit(0)                                 = ?\n+++ exited with 0 +++\n')),(0,i.yg)("p",null,"When using ",(0,i.yg)("inlineCode",{parentName:"p"},"strace")," we see that only the ",(0,i.yg)("inlineCode",{parentName:"p"},"write()")," system call wrapper triggers a system call.\nThere are no system calls triggered by ",(0,i.yg)("inlineCode",{parentName:"p"},"strlen()")," and ",(0,i.yg)("inlineCode",{parentName:"p"},"strcpy()")," as can be seen in their implementation."),(0,i.yg)("p",null,"In addition, ",(0,i.yg)("inlineCode",{parentName:"p"},"main_printf.c")," depends on the ",(0,i.yg)("inlineCode",{parentName:"p"},"printf.h")," and ",(0,i.yg)("inlineCode",{parentName:"p"},"printf.c")," files that implement the ",(0,i.yg)("inlineCode",{parentName:"p"},"printf()")," function.\nThere is a requirement to implement the ",(0,i.yg)("inlineCode",{parentName:"p"},"_putchar()")," function;\nwe implement it in the ",(0,i.yg)("inlineCode",{parentName:"p"},"main_printf.c")," file using the ",(0,i.yg)("inlineCode",{parentName:"p"},"write()")," syscall call wrapper.\nThe ",(0,i.yg)("inlineCode",{parentName:"p"},"main()")," function ",(0,i.yg)("inlineCode",{parentName:"p"},"main_printf.c")," file contains all the string and printing calls.\n",(0,i.yg)("inlineCode",{parentName:"p"},"printf()")," offers a more powerful printing interface, allowing us to print addresses and integers."),(0,i.yg)("p",null,"Let's build and run the program:"),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-console"},'student@os:~/.../tasks/common-functions/support$ make main_printf\ngcc -fno-stack-protector   -c -o printf.o printf.c\ngcc -nostdlib -no-pie -Wl,--entry=main -Wl,--build-id=none  main_printf.o printf.o string.o syscall.o   -o main_printf\n\nstudent@os:~/.../tasks/common-functions/support$ ./main_printf\n[before] src is at 00000000004026A0, len is 12, content: "warhammer40k"\n[before] dest is at 0000000000603000, len is 0, content: ""\ncopying src to dest\n[after] src is at 00000000004026A0, len is 12, content: "warhammer40k"\n[after] dest is at 0000000000603000, len is 12, content: "warhammer40k"\n\nstudent@os:~/.../tasks/common-functions/support$ strace ./main_printf\nexecve("./main_printf", ["./main_printf"], 0x7ffcaaa1d660 /- 63 vars */) = 0\nwrite(1, "[", 1[)                        = 1\nwrite(1, "b", 1b)                        = 1\nwrite(1, "e", 1e)                        = 1\nwrite(1, "f", 1f)                        = 1\nwrite(1, "o", 1o)                        = 1\nwrite(1, "r", 1r)                        = 1\nwrite(1, "e", 1e)                        = 1\nwrite(1, "]", 1])                        = 1\nwrite(1, " ", 1 )                        = 1\nwrite(1, "s", 1s)                        = 1\nwrite(1, "r", 1r)                        = 1\n[...]\n')),(0,i.yg)("p",null,"We see that we have greater printing flexibility with the ",(0,i.yg)("inlineCode",{parentName:"p"},"printf()")," function.\nHowever, one downside of the current implementation is that it makes a system call for each character.\nThis is inefficient and could be improved by printing a whole string."))}g.isMDXComponent=!0}}]);