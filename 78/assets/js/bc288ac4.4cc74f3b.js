"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[7188],{5680:(e,t,a)=>{a.d(t,{xA:()=>m,yg:()=>d});var r=a(6540);function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function s(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function l(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?s(Object(a),!0).forEach((function(t){n(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):s(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function i(e,t){if(null==e)return{};var a,r,n=function(e,t){if(null==e)return{};var a,r,n={},s=Object.keys(e);for(r=0;r<s.length;r++)a=s[r],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)a=s[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var o=r.createContext({}),p=function(e){var t=r.useContext(o),a=t;return e&&(a="function"==typeof e?e(t):l(l({},t),e)),a},m=function(e){var t=p(e.components);return r.createElement(o.Provider,{value:t},e.children)},y="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},g=r.forwardRef((function(e,t){var a=e.components,n=e.mdxType,s=e.originalType,o=e.parentName,m=i(e,["components","mdxType","originalType","parentName"]),y=p(a),g=n,d=y["".concat(o,".").concat(g)]||y[g]||c[g]||s;return a?r.createElement(d,l(l({ref:t},m),{},{components:a})):r.createElement(d,l({ref:t},m))}));function d(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var s=a.length,l=new Array(s);l[0]=g;var i={};for(var o in t)hasOwnProperty.call(t,o)&&(i[o]=t[o]);i.originalType=e,i[y]="string"==typeof e?e:n,l[1]=i;for(var p=2;p<s;p++)l[p]=a[p];return r.createElement.apply(null,l)}return r.createElement.apply(null,a)}g.displayName="MDXCreateElement"},2215:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>o,contentTitle:()=>l,default:()=>c,frontMatter:()=>s,metadata:()=>i,toc:()=>p});var r=a(8168),n=(a(6540),a(5680));const s={},l="System Calls",i={unversionedId:"Software Stack/Lab 1 - Operating System Perspective/System Calls/Drills/Tasks/Basic Syscall/README",id:"Software Stack/Lab 1 - Operating System Perspective/System Calls/Drills/Tasks/Basic Syscall/README",title:"System Calls",description:"Enter the basic-syscall/support/ folder and go through the practice items below.",source:"@site/docs/Software Stack/Lab 1 - Operating System Perspective/System Calls/Drills/Tasks/Basic Syscall/README.md",sourceDirName:"Software Stack/Lab 1 - Operating System Perspective/System Calls/Drills/Tasks/Basic Syscall",slug:"/Software Stack/Lab 1 - Operating System Perspective/System Calls/Drills/Tasks/Basic Syscall/",permalink:"/operating-systems/78/Software Stack/Lab 1 - Operating System Perspective/System Calls/Drills/Tasks/Basic Syscall/",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"Tasks",permalink:"/operating-systems/78/Software Stack/Lab 1 - Operating System Perspective/System Calls/Drills/Tasks/"},next:{title:"System Call Wrappers",permalink:"/operating-systems/78/Software Stack/Lab 1 - Operating System Perspective/System Calls/Drills/Tasks/System Call Wrapper/"}},o={},p=[],m={toc:p},y="wrapper";function c(e){let{components:t,...a}=e;return(0,n.yg)(y,(0,r.A)({},m,a,{components:t,mdxType:"MDXLayout"}),(0,n.yg)("h1",{id:"system-calls"},"System Calls"),(0,n.yg)("p",null,"Enter the ",(0,n.yg)("inlineCode",{parentName:"p"},"basic-syscall/support/")," folder and go through the practice items below."),(0,n.yg)("p",null,"For debugging, use ",(0,n.yg)("inlineCode",{parentName:"p"},"strace")," to trace the system calls from your program and make sure the arguments are set right."),(0,n.yg)("ol",null,(0,n.yg)("li",{parentName:"ol"},(0,n.yg)("p",{parentName:"li"},"Update the ",(0,n.yg)("inlineCode",{parentName:"p"},"hello.asm")," and / or ",(0,n.yg)("inlineCode",{parentName:"p"},"hello.s")," files to print both ",(0,n.yg)("inlineCode",{parentName:"p"},"Hello, world!")," and ",(0,n.yg)("inlineCode",{parentName:"p"},"Bye, world!"),".\nThis means adding another ",(0,n.yg)("inlineCode",{parentName:"p"},"write()")," system call."),(0,n.yg)("p",{parentName:"li"},(0,n.yg)("a",{parentName:"p",href:"../../../tasks/drills/questions/syscall-id.md"},"Quiz 1")),(0,n.yg)("p",{parentName:"li"},(0,n.yg)("a",{parentName:"p",href:"../../../tasks/drills/questions/syscall-tool.md"},"Quiz 2")),(0,n.yg)("p",{parentName:"li"},(0,n.yg)("a",{parentName:"p",href:"../../../tasks/drills/questions/syscall-numbers.md"},"Quiz 3"))),(0,n.yg)("li",{parentName:"ol"},(0,n.yg)("p",{parentName:"li"},"Update the ",(0,n.yg)("inlineCode",{parentName:"p"},"hello.asm")," and / or ",(0,n.yg)("inlineCode",{parentName:"p"},"hello.s")," files to sleep before the ",(0,n.yg)("inlineCode",{parentName:"p"},"exit")," system call."),(0,n.yg)("p",{parentName:"li"},"You need to make the ",(0,n.yg)("inlineCode",{parentName:"p"},"sys_nanosleep()")," system call, with the ",(0,n.yg)("inlineCode",{parentName:"p"},"timespec")," structure.\nFind its ID ",(0,n.yg)("a",{parentName:"p",href:"https://blog.rchapman.org/posts/Linux_System_Call_Table_for_x86_64/"},"here"),".")),(0,n.yg)("li",{parentName:"ol"},(0,n.yg)("p",{parentName:"li"},"Update the ",(0,n.yg)("inlineCode",{parentName:"p"},"hello.asm")," and / or ",(0,n.yg)("inlineCode",{parentName:"p"},"hello.s")," files to read a message from standard input and print it to standard output."),(0,n.yg)("p",{parentName:"li"},"You'll need to define a buffer in the ",(0,n.yg)("inlineCode",{parentName:"p"},"data")," or ",(0,n.yg)("inlineCode",{parentName:"p"},"bss")," section.\nUse the ",(0,n.yg)("inlineCode",{parentName:"p"},"read")," system call to read data in the buffer.\nThe return value of ",(0,n.yg)("inlineCode",{parentName:"p"},"read")," (placed in the ",(0,n.yg)("inlineCode",{parentName:"p"},"rax")," register) is the number of bytes read.\nUse that value as the 3rd argument or ",(0,n.yg)("inlineCode",{parentName:"p"},"write"),", i.e. the number of bytes printed."),(0,n.yg)("p",{parentName:"li"},"Find the ID of the ",(0,n.yg)("inlineCode",{parentName:"p"},"read")," system call ",(0,n.yg)("a",{parentName:"p",href:"https://x64.syscall.sh/"},"here"),".\nTo find out more about its arguments, see ",(0,n.yg)("a",{parentName:"p",href:"https://man7.org/linux/man-pages/man2/read.2.html"},"its man page"),".\nStandard input descriptor is ",(0,n.yg)("inlineCode",{parentName:"p"},"0"),".")),(0,n.yg)("li",{parentName:"ol"},(0,n.yg)("p",{parentName:"li"},(0,n.yg)("strong",{parentName:"p"},"Difficult"),": Port the initial program to ARM on 64 bits (also called ",(0,n.yg)("strong",{parentName:"p"},"aarch64"),")."),(0,n.yg)("p",{parentName:"li"},"Use the skeleton files in the ",(0,n.yg)("inlineCode",{parentName:"p"},"arm/")," folder.\nFind information about the ",(0,n.yg)("inlineCode",{parentName:"p"},"aarch64")," system calls ",(0,n.yg)("a",{parentName:"p",href:"https://arm64.syscall.sh/"},"here"),".")),(0,n.yg)("li",{parentName:"ol"},(0,n.yg)("p",{parentName:"li"},"Create your own program, written in assembly, doing some system calls you want to learn more about.\nSome system calls you could try: ",(0,n.yg)("inlineCode",{parentName:"p"},"open()"),", ",(0,n.yg)("inlineCode",{parentName:"p"},"rename()"),", ",(0,n.yg)("inlineCode",{parentName:"p"},"mkdir()"),".\nCreate a Makefile for that program.\nRun the resulting program with ",(0,n.yg)("inlineCode",{parentName:"p"},"strace")," to see the actual system calls being made (and their arguments)."))),(0,n.yg)("p",null,"If you're having difficulties solving this exercise, go through ",(0,n.yg)("a",{parentName:"p",href:"/operating-systems/78/Software%20Stack/Lab%201%20-%20Operating%20System%20Perspective/System%20Calls/Reading/basic-syscall"},"this")," reading material."))}c.isMDXComponent=!0}}]);