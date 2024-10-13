"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[1918],{5680:(e,a,l)=>{l.d(a,{xA:()=>p,yg:()=>g});var t=l(6540);function n(e,a,l){return a in e?Object.defineProperty(e,a,{value:l,enumerable:!0,configurable:!0,writable:!0}):e[a]=l,e}function r(e,a){var l=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);a&&(t=t.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),l.push.apply(l,t)}return l}function s(e){for(var a=1;a<arguments.length;a++){var l=null!=arguments[a]?arguments[a]:{};a%2?r(Object(l),!0).forEach((function(a){n(e,a,l[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(l)):r(Object(l)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(l,a))}))}return e}function o(e,a){if(null==e)return{};var l,t,n=function(e,a){if(null==e)return{};var l,t,n={},r=Object.keys(e);for(t=0;t<r.length;t++)l=r[t],a.indexOf(l)>=0||(n[l]=e[l]);return n}(e,a);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(t=0;t<r.length;t++)l=r[t],a.indexOf(l)>=0||Object.prototype.propertyIsEnumerable.call(e,l)&&(n[l]=e[l])}return n}var i=t.createContext({}),c=function(e){var a=t.useContext(i),l=a;return e&&(l="function"==typeof e?e(a):s(s({},a),e)),l},p=function(e){var a=c(e.components);return t.createElement(i.Provider,{value:a},e.children)},y="mdxType",m={inlineCode:"code",wrapper:function(e){var a=e.children;return t.createElement(t.Fragment,{},a)}},d=t.forwardRef((function(e,a){var l=e.components,n=e.mdxType,r=e.originalType,i=e.parentName,p=o(e,["components","mdxType","originalType","parentName"]),y=c(l),d=n,g=y["".concat(i,".").concat(d)]||y[d]||m[d]||r;return l?t.createElement(g,s(s({ref:a},p),{},{components:l})):t.createElement(g,s({ref:a},p))}));function g(e,a){var l=arguments,n=a&&a.mdxType;if("string"==typeof e||n){var r=l.length,s=new Array(r);s[0]=d;var o={};for(var i in a)hasOwnProperty.call(a,i)&&(o[i]=a[i]);o.originalType=e,o[y]="string"==typeof e?e:n,s[1]=o;for(var c=2;c<r;c++)s[c]=l[c];return t.createElement.apply(null,s)}return t.createElement.apply(null,l)}d.displayName="MDXCreateElement"},2937:(e,a,l)=>{l.r(a),l.d(a,{assets:()=>i,contentTitle:()=>s,default:()=>m,frontMatter:()=>r,metadata:()=>o,toc:()=>c});var t=l(8168),n=(l(6540),l(5680));const r={},s="Library calls vs System Calls",o={unversionedId:"Software Stack/Lab 1 - Operating System Perspective/System Calls/Reading/libcall-syscall",id:"Software Stack/Lab 1 - Operating System Perspective/System Calls/Reading/libcall-syscall",title:"Library calls vs System Calls",description:"The standard C library has primarily two uses:",source:"@site/docs/Software Stack/Lab 1 - Operating System Perspective/System Calls/Reading/libcall-syscall.md",sourceDirName:"Software Stack/Lab 1 - Operating System Perspective/System Calls/Reading",slug:"/Software Stack/Lab 1 - Operating System Perspective/System Calls/Reading/libcall-syscall",permalink:"/operating-systems/79/Software Stack/Lab 1 - Operating System Perspective/System Calls/Reading/libcall-syscall",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"System Call Wrappers",permalink:"/operating-systems/79/Software Stack/Lab 1 - Operating System Perspective/System Calls/Reading/syscall-wrapper"},next:{title:"Drills",permalink:"/operating-systems/79/Software Stack/Lab 1 - Operating System Perspective/System Calls/Drills/"}},i={},c=[],p={toc:c},y="wrapper";function m(e){let{components:a,...l}=e;return(0,n.yg)(y,(0,t.A)({},p,l,{components:a,mdxType:"MDXLayout"}),(0,n.yg)("h1",{id:"library-calls-vs-system-calls"},"Library calls vs System Calls"),(0,n.yg)("p",null,"The standard C library has primarily two uses:"),(0,n.yg)("ol",null,(0,n.yg)("li",{parentName:"ol"},"wrapping system calls into easier to use C-style library calls, such as ",(0,n.yg)("inlineCode",{parentName:"li"},"open()"),", ",(0,n.yg)("inlineCode",{parentName:"li"},"write()"),", ",(0,n.yg)("inlineCode",{parentName:"li"},"read()")),(0,n.yg)("li",{parentName:"ol"},"adding common functionality required for our program, such as string management (",(0,n.yg)("inlineCode",{parentName:"li"},"strcpy"),"), memory management (",(0,n.yg)("inlineCode",{parentName:"li"},"malloc()"),") or formatted I/O (",(0,n.yg)("inlineCode",{parentName:"li"},"printf()"),")")),(0,n.yg)("p",null,"The first use means a 1-to-1 mapping between library calls and system calls: one library call means one system call.\nThe second group doesn't have a standard mapping.\nA library call could be mapped to no system calls, one system call, two or more system calls, or it may depend (a system call may or may not happen)."),(0,n.yg)("p",null,"The ",(0,n.yg)("inlineCode",{parentName:"p"},"libcall-syscall/support")," folder stores the implementation of a simple program that makes different library calls.\nLet's build the program and then trace the library calls (with ",(0,n.yg)("inlineCode",{parentName:"p"},"ltrace"),") and the system calls (with ",(0,n.yg)("inlineCode",{parentName:"p"},"strace"),"):"),(0,n.yg)("pre",null,(0,n.yg)("code",{parentName:"pre",className:"language-console"},'student@os:~/.../libcall-syscall/support$ make\ncc -Wall   -c -o call.o call.c\ncc   call.o   -o call\ncc -Wall   -c -o call2.o call2.c\ncc   call2.o   -o call2\n\nstudent@os:~/.../libcall-syscall/support$ ltrace ./call\nfopen("a.txt", "wt")                                                                                             = 0x556d57679260\nstrlen("Hello, world!\\n")                                                                                        = 14\nfwrite("Hello, world!\\n", 1, 14, 0x556d57679260)                                                                 = 14\nstrlen("Bye, world!\\n")                                                                                          = 12\nfwrite("Bye, world!\\n", 1, 12, 0x556d57679260)                                                                   = 12\nfflush(0x556d57679260)                                                                                           = 0\n+++ exited (status 0) +++\n\nstudent@os:~/.../libcall-syscall/support$ strace ./call\n[...]\nopenat(AT_FDCWD, "a.txt", O_WRONLY|O_CREAT|O_TRUNC, 0666) = 3\nfstat(3, {st_mode=S_IFREG|0664, st_size=0, ...}) = 0\nwrite(3, "Hello, world!\\nBye, world!\\n", 26) = 26\nexit_group(0)                           = ?\n+++ exited with 0 +++\n')),(0,n.yg)("p",null,"We have the following mappings:"),(0,n.yg)("ul",null,(0,n.yg)("li",{parentName:"ul"},"The ",(0,n.yg)("inlineCode",{parentName:"li"},"fopen()")," library call invokes the ",(0,n.yg)("inlineCode",{parentName:"li"},"openat")," and the ",(0,n.yg)("inlineCode",{parentName:"li"},"fstat")," system calls."),(0,n.yg)("li",{parentName:"ul"},"The ",(0,n.yg)("inlineCode",{parentName:"li"},"fwrite()")," library call invokes no system calls."),(0,n.yg)("li",{parentName:"ul"},"The ",(0,n.yg)("inlineCode",{parentName:"li"},"strlen()")," library call invokes no system calls."),(0,n.yg)("li",{parentName:"ul"},"The ",(0,n.yg)("inlineCode",{parentName:"li"},"fflush()")," library call invokes the ",(0,n.yg)("inlineCode",{parentName:"li"},"write")," system call.")),(0,n.yg)("p",null,"This all seems to make sense.\nThe main reason for ",(0,n.yg)("inlineCode",{parentName:"p"},"fwrite()")," not making any system calls is the use of a standard C library buffer.\nCalls the ",(0,n.yg)("inlineCode",{parentName:"p"},"fwrite()")," end up writing to that buffer to reduce the number of system calls.\nActual system calls are made either when the standard C library buffer is full or when an ",(0,n.yg)("inlineCode",{parentName:"p"},"fflush()")," library call is made."),(0,n.yg)("p",null,"Note that on some systems, ",(0,n.yg)("inlineCode",{parentName:"p"},"ltrace")," ",(0,n.yg)("strong",{parentName:"p"},"does not work*- as expected, due to "),"now binding",(0,n.yg)("strong",{parentName:"p"},".\nTo avoid this behaviour, you can force the "),"lazy binding",(0,n.yg)("em",{parentName:"p"},"- (based on which ",(0,n.yg)("inlineCode",{parentName:"em"},"ltrace")," is constructed to work).\nAn example can be found in ",(0,n.yg)("inlineCode",{parentName:"em"},"libcall-syscall/support/Makefile"),", however for system binaries, such as ",(0,n.yg)("inlineCode",{parentName:"em"},"ls")," or ",(0,n.yg)("inlineCode",{parentName:"em"},"pwd"),', the only alternative is to add the `-x "'),'"` argument to force the command to trace all symbols in the symbol table:'),(0,n.yg)("pre",null,(0,n.yg)("code",{parentName:"pre",className:"language-console"},'student@os:~$ ltrace -x "*" ls\n')),(0,n.yg)("p",null,"You can always choose what library functions ",(0,n.yg)("inlineCode",{parentName:"p"},"ltrace")," is investigating, by replacing the wildcard with their name:"),(0,n.yg)("pre",null,(0,n.yg)("code",{parentName:"pre",className:"language-console"},'student@os:~$ ltrace -x "malloc" -x "free" ls\nmalloc@libc.so.6(5)                                                    = 0x55c42b2b8910\nfree@libc.so.6(0x55c42b2b8910)                                         = <void>\nmalloc@libc.so.6(120)                                                  = 0x55c42b2b8480\nmalloc@libc.so.6(12)                                                   = 0x55c42b2b8910\nmalloc@libc.so.6(776)                                                  = 0x55c42b2b8930\nmalloc@libc.so.6(112)                                                  = 0x55c42b2b8c40\nmalloc@libc.so.6(1336)                                                 = 0x55c42b2b8cc0\nmalloc@libc.so.6(216)                                                  = 0x55c42b2b9200\nmalloc@libc.so.6(432)                                                  = 0x55c42b2b92e0\nmalloc@libc.so.6(104)                                                  = 0x55c42b2b94a0\nmalloc@libc.so.6(88)                                                   = 0x55c42b2b9510\nmalloc@libc.so.6(120)                                                  = 0x55c42b2b9570\n[...]\n')),(0,n.yg)("p",null,"If you would like to know more about ",(0,n.yg)("strong",{parentName:"p"},"lazy binding"),", ",(0,n.yg)("strong",{parentName:"p"},"now binding*- or "),"PLT*- entries, check out ",(0,n.yg)("a",{parentName:"p",href:"https://maskray.me/blog/2021-09-19-all-about-procedure-linkage-table"},"this blog post"),"."))}m.isMDXComponent=!0}}]);