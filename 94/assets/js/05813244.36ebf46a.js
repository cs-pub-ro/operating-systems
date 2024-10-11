"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[2036],{5680:(e,t,a)=>{a.d(t,{xA:()=>s,yg:()=>d});var n=a(6540);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function i(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function o(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?i(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function l(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},i=Object.keys(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var p=n.createContext({}),c=function(e){var t=n.useContext(p),a=t;return e&&(a="function"==typeof e?e(t):o(o({},t),e)),a},s=function(e){var t=c(e.components);return n.createElement(p.Provider,{value:t},e.children)},m="mdxType",y={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},u=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,i=e.originalType,p=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),m=c(a),u=r,d=m["".concat(p,".").concat(u)]||m[u]||y[u]||i;return a?n.createElement(d,o(o({ref:t},s),{},{components:a})):n.createElement(d,o({ref:t},s))}));function d(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=a.length,o=new Array(i);o[0]=u;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l[m]="string"==typeof e?e:r,o[1]=l;for(var c=2;c<i;c++)o[c]=a[c];return n.createElement.apply(null,o)}return n.createElement.apply(null,a)}u.displayName="MDXCreateElement"},8333:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>p,contentTitle:()=>o,default:()=>y,frontMatter:()=>i,metadata:()=>l,toc:()=>c});var n=a(8168),r=(a(6540),a(5680));const i={},o="Libraries and libc",l={unversionedId:"Software Stack/Lab 2 - Library Perspective/Libc/tasks/libc/README",id:"Software Stack/Lab 2 - Library Perspective/Libc/tasks/libc/README",title:"Libraries and libc",description:"Enter the chapters/software-stack/libc/libc/drills/tasks/support/ folder and go through the practice items below.",source:"@site/docs/Software Stack/Lab 2 - Library Perspective/Libc/tasks/libc/README.md",sourceDirName:"Software Stack/Lab 2 - Library Perspective/Libc/tasks/libc",slug:"/Software Stack/Lab 2 - Library Perspective/Libc/tasks/libc/",permalink:"/operating-systems/94/Software Stack/Lab 2 - Library Perspective/Libc/tasks/libc/",draft:!1,tags:[],version:"current",frontMatter:{}},p={},c=[],s={toc:c},m="wrapper";function y(e){let{components:t,...a}=e;return(0,r.yg)(m,(0,n.A)({},s,a,{components:t,mdxType:"MDXLayout"}),(0,r.yg)("h1",{id:"libraries-and-libc"},"Libraries and libc"),(0,r.yg)("p",null,"Enter the ",(0,r.yg)("inlineCode",{parentName:"p"},"chapters/software-stack/libc/libc/drills/tasks/support/")," folder and go through the practice items below."),(0,r.yg)("ol",null,(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},"Use ",(0,r.yg)("inlineCode",{parentName:"p"},"malloc()")," and ",(0,r.yg)("inlineCode",{parentName:"p"},"free()")," functions in the ",(0,r.yg)("inlineCode",{parentName:"p"},"memory.c")," program.\nMake your own use of the allocated memory."),(0,r.yg)("p",{parentName:"li"},"It's very easy to use memory management functions with the libc.\nThe alternative (without the libc) would be more cumbersome."),(0,r.yg)("p",{parentName:"li"},"Use different values for ",(0,r.yg)("inlineCode",{parentName:"p"},"malloc()"),", i.e. the allocation size.\nUse ",(0,r.yg)("inlineCode",{parentName:"p"},"strace")," to check the system calls invoked by ",(0,r.yg)("inlineCode",{parentName:"p"},"malloc()")," and ",(0,r.yg)("inlineCode",{parentName:"p"},"free()"),".\nYou'll see that, depending on the size, the ",(0,r.yg)("inlineCode",{parentName:"p"},"brk()")," or ",(0,r.yg)("inlineCode",{parentName:"p"},"mmap()")," / ",(0,r.yg)("inlineCode",{parentName:"p"},"munmap()")," system calls are invoked.\nAnd for certain calls to ",(0,r.yg)("inlineCode",{parentName:"p"},"malloc()")," / ",(0,r.yg)("inlineCode",{parentName:"p"},"free()")," no syscall is happening.\nYou'll find more about them in the ",(0,r.yg)("a",{parentName:"p",href:"../../../data/lab"},"Data chapter"),"."),(0,r.yg)("p",{parentName:"li"},(0,r.yg)("a",{parentName:"p",href:"/operating-systems/94/Software%20Stack/Lab%202%20-%20Library%20Perspective/Libc/questions/malloc"},"Quiz"))),(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},"Create your own C program with calls to the standard C library in ",(0,r.yg)("inlineCode",{parentName:"p"},"vendetta.c"),".\nBe as creative as you can about the types of functions being made."),(0,r.yg)("p",{parentName:"li"},(0,r.yg)("a",{parentName:"p",href:"/operating-systems/94/Software%20Stack/Lab%202%20-%20Library%20Perspective/Libc/questions/libc"},"Quiz"))),(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},"Inside the ",(0,r.yg)("inlineCode",{parentName:"p"},"vendetta.c")," file make a call ",(0,r.yg)("inlineCode",{parentName:"p"},'open("a.txt", O_RDWR | O_CREAT, 0644)')," to open / create the ",(0,r.yg)("inlineCode",{parentName:"p"},"a.txt")," file.\nMake sure you include all required headers.\nCheck the system call being made."),(0,r.yg)("p",{parentName:"li"},"Make an ",(0,r.yg)("inlineCode",{parentName:"p"},"fopen()")," with the proper arguments that gets as close as possible to the ",(0,r.yg)("inlineCode",{parentName:"p"},"open()")," call, i.e. the system call arguments are as close as possible.")),(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},"Inside the ",(0,r.yg)("inlineCode",{parentName:"p"},"vendetta.c")," file make a call to ",(0,r.yg)("inlineCode",{parentName:"p"},"sin()")," function (for sine).\nCompute ",(0,r.yg)("inlineCode",{parentName:"p"},"sin(0)")," and ",(0,r.yg)("inlineCode",{parentName:"p"},"sin(PI/2)"),"."))),(0,r.yg)("p",null,"If you're having difficulties solving this exercise, go through ",(0,r.yg)("a",{parentName:"p",href:"../../../reading/libc.md"},"this")," reading material."))}y.isMDXComponent=!0}}]);