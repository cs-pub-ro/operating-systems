"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[3946],{5680:(e,t,r)=>{r.d(t,{xA:()=>c,yg:()=>u});var a=r(6540);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},i=Object.keys(e);for(a=0;a<i.length;a++)r=i[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)r=i[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var s=a.createContext({}),p=function(e){var t=a.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},c=function(e){var t=p(e.components);return a.createElement(s.Provider,{value:t},e.children)},m="mdxType",y={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},b=a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,i=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),m=p(r),b=n,u=m["".concat(s,".").concat(b)]||m[b]||y[b]||i;return r?a.createElement(u,o(o({ref:t},c),{},{components:r})):a.createElement(u,o({ref:t},c))}));function u(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var i=r.length,o=new Array(i);o[0]=b;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[m]="string"==typeof e?e:n,o[1]=l;for(var p=2;p<i;p++)o[p]=r[p];return a.createElement.apply(null,o)}return a.createElement.apply(null,r)}b.displayName="MDXCreateElement"},5316:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>s,contentTitle:()=>o,default:()=>y,frontMatter:()=>i,metadata:()=>l,toc:()=>p});var a=r(8168),n=(r(6540),r(5680));const i={},o="Libraries and libc",l={unversionedId:"Software Stack/Lab 2 - Library Perspective/Libc/Drills/Tasks/Libc/README",id:"Software Stack/Lab 2 - Library Perspective/Libc/Drills/Tasks/Libc/README",title:"Libraries and libc",description:"Enter the chapters/software-stack/libc/libc/drills/tasks/support/ folder and go through the practice items below.",source:"@site/docs/Software Stack/Lab 2 - Library Perspective/Libc/Drills/Tasks/Libc/README.md",sourceDirName:"Software Stack/Lab 2 - Library Perspective/Libc/Drills/Tasks/Libc",slug:"/Software Stack/Lab 2 - Library Perspective/Libc/Drills/Tasks/Libc/",permalink:"/operating-systems/Software Stack/Lab 2 - Library Perspective/Libc/Drills/Tasks/Libc/",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"Common Functions",permalink:"/operating-systems/Software Stack/Lab 2 - Library Perspective/Libc/Drills/Tasks/Common Functions/"},next:{title:"Questions",permalink:"/operating-systems/Software Stack/Lab 2 - Library Perspective/Libc/Drills/Questions/"}},s={},p=[],c={toc:p},m="wrapper";function y(e){let{components:t,...r}=e;return(0,n.yg)(m,(0,a.A)({},c,r,{components:t,mdxType:"MDXLayout"}),(0,n.yg)("h1",{id:"libraries-and-libc"},"Libraries and libc"),(0,n.yg)("p",null,"Enter the ",(0,n.yg)("inlineCode",{parentName:"p"},"chapters/software-stack/libc/libc/drills/tasks/support/")," folder and go through the practice items below."),(0,n.yg)("ol",null,(0,n.yg)("li",{parentName:"ol"},(0,n.yg)("p",{parentName:"li"},"Use ",(0,n.yg)("inlineCode",{parentName:"p"},"malloc()")," and ",(0,n.yg)("inlineCode",{parentName:"p"},"free()")," functions in the ",(0,n.yg)("inlineCode",{parentName:"p"},"memory.c")," program.\nMake your own use of the allocated memory."),(0,n.yg)("p",{parentName:"li"},"It's very easy to use memory management functions with the libc.\nThe alternative (without the libc) would be more cumbersome."),(0,n.yg)("p",{parentName:"li"},"Use different values for ",(0,n.yg)("inlineCode",{parentName:"p"},"malloc()"),", i.e. the allocation size.\nUse ",(0,n.yg)("inlineCode",{parentName:"p"},"strace")," to check the system calls invoked by ",(0,n.yg)("inlineCode",{parentName:"p"},"malloc()")," and ",(0,n.yg)("inlineCode",{parentName:"p"},"free()"),".\nYou'll see that, depending on the size, the ",(0,n.yg)("inlineCode",{parentName:"p"},"brk()")," or ",(0,n.yg)("inlineCode",{parentName:"p"},"mmap()")," / ",(0,n.yg)("inlineCode",{parentName:"p"},"munmap()")," system calls are invoked.\nAnd for certain calls to ",(0,n.yg)("inlineCode",{parentName:"p"},"malloc()")," / ",(0,n.yg)("inlineCode",{parentName:"p"},"free()")," no syscall is happening.\nYou'll find more about them in the ",(0,n.yg)("a",{parentName:"p",href:"../../../data/lab"},"Data chapter"),"."),(0,n.yg)("p",{parentName:"li"},(0,n.yg)("a",{parentName:"p",href:"/operating-systems/Software%20Stack/Lab%202%20-%20Library%20Perspective/Libc/Drills/Questions/malloc"},"Quiz"))),(0,n.yg)("li",{parentName:"ol"},(0,n.yg)("p",{parentName:"li"},"Create your own C program with calls to the standard C library in ",(0,n.yg)("inlineCode",{parentName:"p"},"vendetta.c"),".\nBe as creative as you can about the types of functions being made."),(0,n.yg)("p",{parentName:"li"},(0,n.yg)("a",{parentName:"p",href:"/operating-systems/Software%20Stack/Lab%202%20-%20Library%20Perspective/Libc/Drills/Questions/libc"},"Quiz"))),(0,n.yg)("li",{parentName:"ol"},(0,n.yg)("p",{parentName:"li"},"Inside the ",(0,n.yg)("inlineCode",{parentName:"p"},"vendetta.c")," file make a call ",(0,n.yg)("inlineCode",{parentName:"p"},'open("a.txt", O_RDWR | O_CREAT, 0644)')," to open / create the ",(0,n.yg)("inlineCode",{parentName:"p"},"a.txt")," file.\nMake sure you include all required headers.\nCheck the system call being made."),(0,n.yg)("p",{parentName:"li"},"Make an ",(0,n.yg)("inlineCode",{parentName:"p"},"fopen()")," with the proper arguments that gets as close as possible to the ",(0,n.yg)("inlineCode",{parentName:"p"},"open()")," call, i.e. the system call arguments are as close as possible.")),(0,n.yg)("li",{parentName:"ol"},(0,n.yg)("p",{parentName:"li"},"Inside the ",(0,n.yg)("inlineCode",{parentName:"p"},"vendetta.c")," file make a call to ",(0,n.yg)("inlineCode",{parentName:"p"},"sin()")," function (for sine).\nCompute ",(0,n.yg)("inlineCode",{parentName:"p"},"sin(0)")," and ",(0,n.yg)("inlineCode",{parentName:"p"},"sin(PI/2)"),"."))),(0,n.yg)("p",null,"If you're having difficulties solving this exercise, go through ",(0,n.yg)("a",{parentName:"p",href:"/operating-systems/Software%20Stack/Lab%202%20-%20Library%20Perspective/Libc/Reading/libc"},"this")," reading material."))}y.isMDXComponent=!0}}]);