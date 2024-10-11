"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[5046],{5680:(e,t,n)=>{n.d(t,{xA:()=>c,yg:()=>f});var a=n(6540);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},s=Object.keys(e);for(a=0;a<s.length;a++)n=s[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(a=0;a<s.length;a++)n=s[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var o=a.createContext({}),p=function(e){var t=a.useContext(o),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},c=function(e){var t=p(e.components);return a.createElement(o.Provider,{value:t},e.children)},y="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,s=e.originalType,o=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),y=p(n),u=r,f=y["".concat(o,".").concat(u)]||y[u]||m[u]||s;return n?a.createElement(f,l(l({ref:t},c),{},{components:n})):a.createElement(f,l({ref:t},c))}));function f(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var s=n.length,l=new Array(s);l[0]=u;var i={};for(var o in t)hasOwnProperty.call(t,o)&&(i[o]=t[o]);i.originalType=e,i[y]="string"==typeof e?e:r,l[1]=i;for(var p=2;p<s;p++)l[p]=n[p];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},7997:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>o,contentTitle:()=>l,default:()=>m,frontMatter:()=>s,metadata:()=>i,toc:()=>p});var a=n(8168),r=(n(6540),n(5680));const s={},l="System Call Wrappers",i={unversionedId:"Software Stack/Lab 1 - Operating System Perspective/System Calls/Reading/syscall-wrapper",id:"Software Stack/Lab 1 - Operating System Perspective/System Calls/Reading/syscall-wrapper",title:"System Call Wrappers",description:"The syscall-wrapper/support/ folder stores the implementation of a simple program written in C (main.c) that calls the write() and exit() functions.",source:"@site/docs/Software Stack/Lab 1 - Operating System Perspective/System Calls/Reading/syscall-wrapper.md",sourceDirName:"Software Stack/Lab 1 - Operating System Perspective/System Calls/Reading",slug:"/Software Stack/Lab 1 - Operating System Perspective/System Calls/Reading/syscall-wrapper",permalink:"/operating-systems/94/Software Stack/Lab 1 - Operating System Perspective/System Calls/Reading/syscall-wrapper",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"Analyzing the Software Stack",permalink:"/operating-systems/94/Software Stack/Lab 1 - Operating System Perspective/System Calls/Reading/basic-syscall"},next:{title:"Library calls vs System Calls",permalink:"/operating-systems/94/Software Stack/Lab 1 - Operating System Perspective/System Calls/Reading/libcall-syscall"}},o={},p=[],c={toc:p},y="wrapper";function m(e){let{components:t,...n}=e;return(0,r.yg)(y,(0,a.A)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,r.yg)("h1",{id:"system-call-wrappers"},"System Call Wrappers"),(0,r.yg)("p",null,"The ",(0,r.yg)("inlineCode",{parentName:"p"},"syscall-wrapper/support/")," folder stores the implementation of a simple program written in C (",(0,r.yg)("inlineCode",{parentName:"p"},"main.c"),") that calls the ",(0,r.yg)("inlineCode",{parentName:"p"},"write()")," and ",(0,r.yg)("inlineCode",{parentName:"p"},"exit()")," functions.\nThe functions are defined in ",(0,r.yg)("inlineCode",{parentName:"p"},"syscall.asm")," as wrappers around corresponding system calls.\nEach function invokes the corresponding system call using the specific system call ID and the arguments provided for the function call."),(0,r.yg)("p",null,"The implementation of the two wrapper functions in ",(0,r.yg)("inlineCode",{parentName:"p"},"syscall.asm")," is very simple, as the function arguments are passed in the same registers required by the system call.\nThis is because of the overlap of the first three registers for the ",(0,r.yg)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/X86_calling_conventions#System_V_AMD64_ABI"},"x86_64 Linux function calling convention")," and the ",(0,r.yg)("a",{parentName:"p",href:"https://x64.syscall.sh/"},"x86_64 Linux system call convention"),"."),(0,r.yg)("p",null,(0,r.yg)("inlineCode",{parentName:"p"},"syscall.h")," contains the declaration of the two functions and is included in ",(0,r.yg)("inlineCode",{parentName:"p"},"main.c"),".\nThis way, C programs can be written that make function calls that end up making system calls."),(0,r.yg)("p",null,"Let's build, run and trace system calls for the program:"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-console"},'student@os:~/.../syscall-wrapper/support$ ls\nmain.c  Makefile  syscall.h  syscall.s\n\nstudent@os:~/.../syscall-wrapper/support$ make\ngcc -c -o main.o main.c\nnasm -f elf64 -o syscall.o syscall.s\ncc -nostdlib -no-pie -Wl,--entry=main -Wl,--build-id=none  main.o syscall.o   -o main\n\nstudent@os:~/.../syscall-wrapper/support$ ls\nmain  main.c  main.o  Makefile  syscall.h  syscall.o  syscall.s\n\nstudent@os:~/.../software-stack/lab/syscall-wrapper$ ./main\nHello, world!\n\nstudent@os:~/.../syscall-wrapper/support$ strace ./main\nexecve("./main", ["./main"], 0x7ffee60fb590 /- 63 vars */) = 0\nwrite(1, "Hello, world!\\n", 14Hello, world!\n)         = 14\nexit(0)                                 = ?\n+++ exited with 0 +++\n')),(0,r.yg)("p",null,"The trace is similar to the previous example, showing the ",(0,r.yg)("inlineCode",{parentName:"p"},"write()")," and ",(0,r.yg)("inlineCode",{parentName:"p"},"exit()")," system calls."),(0,r.yg)("p",null,"By creating system call wrappers as C functions, we are now relieved of the burden of writing assembly language code.\nOf course, there has to be an initial implementation of wrapper functions written in assembly language;\nbut, after that, we can use C only."))}m.isMDXComponent=!0}}]);