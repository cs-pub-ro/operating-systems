"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[7503],{5680:(e,t,r)=>{r.d(t,{xA:()=>p,yg:()=>m});var a=r(6540);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},o=Object.keys(e);for(a=0;a<o.length;a++)r=o[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)r=o[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var l=a.createContext({}),c=function(e){var t=a.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},p=function(e){var t=c(e.components);return a.createElement(l.Provider,{value:t},e.children)},y="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,o=e.originalType,l=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),y=c(r),u=n,m=y["".concat(l,".").concat(u)]||y[u]||d[u]||o;return r?a.createElement(m,i(i({ref:t},p),{},{components:r})):a.createElement(m,i({ref:t},p))}));function m(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=r.length,i=new Array(o);i[0]=u;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[y]="string"==typeof e?e:n,i[1]=s;for(var c=2;c<o;c++)i[c]=r[c];return a.createElement.apply(null,i)}return a.createElement.apply(null,r)}u.displayName="MDXCreateElement"},7736:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>d,frontMatter:()=>o,metadata:()=>s,toc:()=>c});var a=r(8168),n=(r(6540),r(5680));const o={},i="Memory Security",s={unversionedId:"Data/Lab 5 - Memory Security/memory-security",id:"Data/Lab 5 - Memory Security/memory-security",title:"Memory Security",description:"Memory security is one of the most important aspects in today's computer systems.",source:"@site/docs/Data/Lab 5 - Memory Security/memory-security.md",sourceDirName:"Data/Lab 5 - Memory Security",slug:"/Data/Lab 5 - Memory Security/memory-security",permalink:"/operating-systems/77/Data/Lab 5 - Memory Security/memory-security",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"Lab 5 - Memory Security",permalink:"/operating-systems/77/Data/Lab 5 - Memory Security/"},next:{title:"Drills",permalink:"/operating-systems/77/Data/Lab 5 - Memory Security/Drills/"}},l={},c=[{value:"Wild Pointer Arithmetic Info Leak",id:"wild-pointer-arithmetic-info-leak",level:2},{value:"ASLR",id:"aslr",level:2},{value:"Stack Protector",id:"stack-protector",level:2},{value:"Bypassing the Stack Protector",id:"bypassing-the-stack-protector",level:2}],p={toc:c},y="wrapper";function d(e){let{components:t,...r}=e;return(0,n.yg)(y,(0,a.A)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,n.yg)("h1",{id:"memory-security"},"Memory Security"),(0,n.yg)("p",null,"Memory security is one of the most important aspects in today's computer systems.\nIts main objectives are to avoid the development of vulnerable code and prevent attackers from exploiting existing memory vulnerabilities.\nMemory protection techniques are implemented at all levels of memory abstraction: hardware, operating system and programming language.\nIn addition, third-party software tools may be used to statically and dynamically examine a program to identify vulnerabilities when working with memory."),(0,n.yg)("p",null,"In this section, we will focus on the main memory vulnerabilities and how to exploit them.\nWe will use the C programming language for presentation purposes, however, these examples may be reproduced in any language that implements arrays as pointers without bounds and allows the liberal use of pointers."),(0,n.yg)("h2",{id:"wild-pointer-arithmetic-info-leak"},"Wild Pointer Arithmetic Info Leak"),(0,n.yg)("p",null,"In C, once a pointer has been initialized with a valid address it can potentially access any location of the process address space.\nThis is problematic for situations where the binary contains sensitive information.\nTake for example a server that authenticates users: if the password is stored in some buffer, then if a pointer is wrongfully used, it can end up leaking the password."),(0,n.yg)("h2",{id:"aslr"},"ASLR"),(0,n.yg)("p",null,"Address Space Layout Randomization (ASLR) is a protection technique employed by operating systems to make it harder for attackers to identify code locations to jump to.\nEssentially, every program section (including shared library code) is mapped at a random virtual address every time the program is run.\nThat way, it is harder for the attacker to exploit a buffer overflow: the address of a potential code target is different with each run."),(0,n.yg)("p",null,"To enable randomization, there are 2 steps that need to be taken:"),(0,n.yg)("ol",null,(0,n.yg)("li",{parentName:"ol"},(0,n.yg)("p",{parentName:"li"},"Enable ASLR on the operating system.\nThis enables the operating system to map library code at different virtual addresses in a program.")),(0,n.yg)("li",{parentName:"ol"},(0,n.yg)("p",{parentName:"li"},"Compile our code as Position Independent Code (PIC).\nThis instructs the compiler to generate code such that it does not use absolute addresses when calling functions or accessing variables.\nAs a consequence, the code may be loaded at any given address in memory."))),(0,n.yg)("p",null,"On most Linux systems, ASLR is enabled by default.\nModern compilers generate position independent code by default."),(0,n.yg)("h2",{id:"stack-protector"},"Stack Protector"),(0,n.yg)("p",null,"As observed in the previous quiz, ASLR prevents an attacker (most of the times) from discovering a reliable address where to jump to, however, it does not prevent the occurrence of a buffer overflow.\nAn effective strategy to protect against buffer overflow is represented by the stack protector (or stack canary).\nBetween the end of the buffer and the return address (below the saved base pointer ",(0,n.yg)("inlineCode",{parentName:"p"},"rbp"),"), a random value is placed on the stack.\nBefore the function returns, the value is checked: if the initial value was modified, then an exception is issued and the program is aborted."),(0,n.yg)("p",null,"Stack canaries are enabled by default, however, for learning purposes we have disabled it by passing ",(0,n.yg)("inlineCode",{parentName:"p"},"-fno-stack-protector")," to the compiler."),(0,n.yg)("h2",{id:"bypassing-the-stack-protector"},"Bypassing the Stack Protector"),(0,n.yg)("p",null,"The stack protector is generally placed immediately after the old ",(0,n.yg)("inlineCode",{parentName:"p"},"rbp"),".\nWith this information we can craft various exploits to bypass it:"),(0,n.yg)("ul",null,(0,n.yg)("li",{parentName:"ul"},(0,n.yg)("p",{parentName:"li"},"Leak the canary and do not modify it.\nReading the canary, as long as we do not modify it is not going to cause any disturbances.\nIf we have the canary, we can just include it in our payload and happily overwrite the return address.")),(0,n.yg)("li",{parentName:"ul"},(0,n.yg)("p",{parentName:"li"},"If we have access to a pointer that we can modify appropriately, we can just jump over the canary and directly modify the return address.")),(0,n.yg)("li",{parentName:"ul"},(0,n.yg)("p",{parentName:"li"},"In case we have multiple buffers defined in the same stack frame, we can simply overwrite data in a buffer that is placed above the buffer we are exploiting without the stack protector intervention."))))}d.isMDXComponent=!0}}]);