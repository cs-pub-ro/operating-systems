"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[9457],{5680:(e,a,l)=>{l.d(a,{xA:()=>p,yg:()=>g});var n=l(6540);function t(e,a,l){return a in e?Object.defineProperty(e,a,{value:l,enumerable:!0,configurable:!0,writable:!0}):e[a]=l,e}function r(e,a){var l=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);a&&(n=n.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),l.push.apply(l,n)}return l}function o(e){for(var a=1;a<arguments.length;a++){var l=null!=arguments[a]?arguments[a]:{};a%2?r(Object(l),!0).forEach((function(a){t(e,a,l[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(l)):r(Object(l)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(l,a))}))}return e}function i(e,a){if(null==e)return{};var l,n,t=function(e,a){if(null==e)return{};var l,n,t={},r=Object.keys(e);for(n=0;n<r.length;n++)l=r[n],a.indexOf(l)>=0||(t[l]=e[l]);return t}(e,a);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(n=0;n<r.length;n++)l=r[n],a.indexOf(l)>=0||Object.prototype.propertyIsEnumerable.call(e,l)&&(t[l]=e[l])}return t}var s=n.createContext({}),c=function(e){var a=n.useContext(s),l=a;return e&&(l="function"==typeof e?e(a):o(o({},a),e)),l},p=function(e){var a=c(e.components);return n.createElement(s.Provider,{value:a},e.children)},y="mdxType",m={inlineCode:"code",wrapper:function(e){var a=e.children;return n.createElement(n.Fragment,{},a)}},d=n.forwardRef((function(e,a){var l=e.components,t=e.mdxType,r=e.originalType,s=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),y=c(l),d=t,g=y["".concat(s,".").concat(d)]||y[d]||m[d]||r;return l?n.createElement(g,o(o({ref:a},p),{},{components:l})):n.createElement(g,o({ref:a},p))}));function g(e,a){var l=arguments,t=a&&a.mdxType;if("string"==typeof e||t){var r=l.length,o=new Array(r);o[0]=d;var i={};for(var s in a)hasOwnProperty.call(a,s)&&(i[s]=a[s]);i.originalType=e,i[y]="string"==typeof e?e:t,o[1]=i;for(var c=2;c<r;c++)o[c]=l[c];return n.createElement.apply(null,o)}return n.createElement.apply(null,l)}d.displayName="MDXCreateElement"},7301:(e,a,l)=>{l.r(a),l.d(a,{assets:()=>s,contentTitle:()=>o,default:()=>m,frontMatter:()=>r,metadata:()=>i,toc:()=>c});var n=l(8168),t=(l(6540),l(5680));const r={},o="Library calls vs system calls",i={unversionedId:"Lab/Software Stack/libcall-syscall",id:"Lab/Software Stack/libcall-syscall",title:"Library calls vs system calls",description:"The standard C library has primarily two uses:",source:"@site/docs/Lab/Software Stack/libcall-syscall.md",sourceDirName:"Lab/Software Stack",slug:"/Lab/Software Stack/libcall-syscall",permalink:"/operating-systems/56/Lab/Software Stack/libcall-syscall",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"Statically-linked and Dynamically-linked Libraries",permalink:"/operating-systems/56/Lab/Software Stack/static-dynamic"},next:{title:"High-Level Languages",permalink:"/operating-systems/56/Lab/Software Stack/high-level-lang"}},s={},c=[{value:"Practice",id:"practice",level:2}],p={toc:c},y="wrapper";function m(e){let{components:a,...l}=e;return(0,t.yg)(y,(0,n.A)({},p,l,{components:a,mdxType:"MDXLayout"}),(0,t.yg)("h1",{id:"library-calls-vs-system-calls"},"Library calls vs system calls"),(0,t.yg)("p",null,"The standard C library has primarily two uses:"),(0,t.yg)("ol",null,(0,t.yg)("li",{parentName:"ol"},"wrapping system calls into easier to use C-style library calls, such as ",(0,t.yg)("inlineCode",{parentName:"li"},"open()"),", ",(0,t.yg)("inlineCode",{parentName:"li"},"write()"),", ",(0,t.yg)("inlineCode",{parentName:"li"},"read()")),(0,t.yg)("li",{parentName:"ol"},"adding common functionality required for our program, such as string management (",(0,t.yg)("inlineCode",{parentName:"li"},"strcpy"),"), memory management (",(0,t.yg)("inlineCode",{parentName:"li"},"malloc()"),") or formatted I/O (",(0,t.yg)("inlineCode",{parentName:"li"},"printf()"),")")),(0,t.yg)("p",null,"The first use means a 1-to-1 mapping between library calls and system calls: one library call means one system call.\nThe second group doesn't have a standard mapping.\nA library call could be mapped to no system calls, one system call, two or more system calls, or it may depend (a system call may or may not happen)."),(0,t.yg)("p",null,"The ",(0,t.yg)("inlineCode",{parentName:"p"},"support/libcall-syscall/")," folder stores the implementation of a simple program that makes different library calls.\nLet's build the program and then trace the library calls (with ",(0,t.yg)("inlineCode",{parentName:"p"},"ltrace"),") and the system calls (with ",(0,t.yg)("inlineCode",{parentName:"p"},"strace"),"):"),(0,t.yg)("pre",null,(0,t.yg)("code",{parentName:"pre",className:"language-console"},'student@os:~/.../lab/support/libcall-syscall$ make\ncc -Wall   -c -o call.o call.c\ncc   call.o   -o call\ncc -Wall   -c -o call2.o call2.c\ncc   call2.o   -o call2\n\nstudent@os:~/.../lab/support/libcall-syscall$ ltrace ./call\nfopen("a.txt", "wt")                                                                                             = 0x556d57679260\nstrlen("Hello, world!\\n")                                                                                        = 14\nfwrite("Hello, world!\\n", 1, 14, 0x556d57679260)                                                                 = 14\nstrlen("Bye, world!\\n")                                                                                          = 12\nfwrite("Bye, world!\\n", 1, 12, 0x556d57679260)                                                                   = 12\nfflush(0x556d57679260)                                                                                           = 0\n+++ exited (status 0) +++\n\nstudent@os:~/.../lab/support/libcall-syscall$ strace ./call\n[...]\nopenat(AT_FDCWD, "a.txt", O_WRONLY|O_CREAT|O_TRUNC, 0666) = 3\nfstat(3, {st_mode=S_IFREG|0664, st_size=0, ...}) = 0\nwrite(3, "Hello, world!\\nBye, world!\\n", 26) = 26\nexit_group(0)                           = ?\n+++ exited with 0 +++\n')),(0,t.yg)("p",null,"We have the following mappings:"),(0,t.yg)("ul",null,(0,t.yg)("li",{parentName:"ul"},"The ",(0,t.yg)("inlineCode",{parentName:"li"},"fopen()")," library call invokes the ",(0,t.yg)("inlineCode",{parentName:"li"},"openat")," and the ",(0,t.yg)("inlineCode",{parentName:"li"},"fstat")," system calls."),(0,t.yg)("li",{parentName:"ul"},"The ",(0,t.yg)("inlineCode",{parentName:"li"},"fwrite()")," library call invokes no system calls."),(0,t.yg)("li",{parentName:"ul"},"The ",(0,t.yg)("inlineCode",{parentName:"li"},"strlen()")," library call invokes no system calls."),(0,t.yg)("li",{parentName:"ul"},"The ",(0,t.yg)("inlineCode",{parentName:"li"},"fflush()")," library call invokes the ",(0,t.yg)("inlineCode",{parentName:"li"},"write")," system call.")),(0,t.yg)("p",null,"This all seems to make sense.\nThe main reason for ",(0,t.yg)("inlineCode",{parentName:"p"},"fwrite()")," not making any system calls is the use of a standard C library buffer.\nCalls the ",(0,t.yg)("inlineCode",{parentName:"p"},"fwrite()")," end up writing to that buffer to reduce the number of system calls.\nActual system calls are made either when the standard C library buffer is full or when an ",(0,t.yg)("inlineCode",{parentName:"p"},"fflush()")," library call is made."),(0,t.yg)("p",null,"Note that on some systems, ",(0,t.yg)("inlineCode",{parentName:"p"},"ltrace")," ",(0,t.yg)("strong",{parentName:"p"},"does not work")," as expected, due to ",(0,t.yg)("strong",{parentName:"p"},"now binding"),".\nTo avoid this behaviour, you can force the ",(0,t.yg)("strong",{parentName:"p"},"lazy binding")," (based on which ",(0,t.yg)("inlineCode",{parentName:"p"},"ltrace")," is constructed to work).\nAn example can be found in ",(0,t.yg)("inlineCode",{parentName:"p"},"support/libcall-syscall/Makefile"),", however for system binaries, such as ",(0,t.yg)("inlineCode",{parentName:"p"},"ls")," or ",(0,t.yg)("inlineCode",{parentName:"p"},"pwd"),", the only alternative is to add the ",(0,t.yg)("inlineCode",{parentName:"p"},'-x "*"')," argument to force the command to trace all symbols in the symbol table:"),(0,t.yg)("pre",null,(0,t.yg)("code",{parentName:"pre",className:"language-console"},'student@os:~$ ltrace -x "*" ls\n')),(0,t.yg)("p",null,"You can always choose what library functions ",(0,t.yg)("inlineCode",{parentName:"p"},"ltrace")," is investigating, by replacing the wildcard with their name:"),(0,t.yg)("pre",null,(0,t.yg)("code",{parentName:"pre",className:"language-console"},'student@os:~$ ltrace -x "malloc" -x "free" ls\nmalloc@libc.so.6(5)                                                    = 0x55c42b2b8910\nfree@libc.so.6(0x55c42b2b8910)                                         = <void>\nmalloc@libc.so.6(120)                                                  = 0x55c42b2b8480\nmalloc@libc.so.6(12)                                                   = 0x55c42b2b8910\nmalloc@libc.so.6(776)                                                  = 0x55c42b2b8930\nmalloc@libc.so.6(112)                                                  = 0x55c42b2b8c40\nmalloc@libc.so.6(1336)                                                 = 0x55c42b2b8cc0\nmalloc@libc.so.6(216)                                                  = 0x55c42b2b9200\nmalloc@libc.so.6(432)                                                  = 0x55c42b2b92e0\nmalloc@libc.so.6(104)                                                  = 0x55c42b2b94a0\nmalloc@libc.so.6(88)                                                   = 0x55c42b2b9510\nmalloc@libc.so.6(120)                                                  = 0x55c42b2b9570\n[...]\n')),(0,t.yg)("p",null,"If you would like to know more about ",(0,t.yg)("strong",{parentName:"p"},"lazy binding"),", ",(0,t.yg)("strong",{parentName:"p"},"now binding")," or ",(0,t.yg)("strong",{parentName:"p"},"PLT")," entries, check out ",(0,t.yg)("a",{parentName:"p",href:"https://maskray.me/blog/2021-09-19-all-about-procedure-linkage-table"},"this blog post"),"."),(0,t.yg)("h2",{id:"practice"},"Practice"),(0,t.yg)("p",null,"Enter the ",(0,t.yg)("inlineCode",{parentName:"p"},"support/libcall-syscall/")," folder and go through the practice items below."),(0,t.yg)("ol",null,(0,t.yg)("li",{parentName:"ol"},(0,t.yg)("p",{parentName:"li"},"Check library calls and system calls for the ",(0,t.yg)("inlineCode",{parentName:"p"},"call2.c")," file.\nUse ",(0,t.yg)("inlineCode",{parentName:"p"},"ltrace")," and ",(0,t.yg)("inlineCode",{parentName:"p"},"strace"),"."),(0,t.yg)("p",{parentName:"li"},"Find explanations for the calls being made and the library call to system call mapping."))),(0,t.yg)("p",null,(0,t.yg)("a",{parentName:"p",href:"/operating-systems/56/Lab/Software%20Stack/quiz/libcall-syscall"},"Quiz")))}m.isMDXComponent=!0}}]);