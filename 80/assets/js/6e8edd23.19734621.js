"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[5232],{5680:(e,t,r)=>{r.d(t,{xA:()=>c,yg:()=>u});var a=r(6540);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function p(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},i=Object.keys(e);for(a=0;a<i.length;a++)r=i[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)r=i[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var l=a.createContext({}),o=function(e){var t=a.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):p(p({},t),e)),r},c=function(e){var t=o(e.components);return a.createElement(l.Provider,{value:t},e.children)},y="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},g=a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,i=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),y=o(r),g=n,u=y["".concat(l,".").concat(g)]||y[g]||m[g]||i;return r?a.createElement(u,p(p({ref:t},c),{},{components:r})):a.createElement(u,p({ref:t},c))}));function u(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var i=r.length,p=new Array(i);p[0]=g;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[y]="string"==typeof e?e:n,p[1]=s;for(var o=2;o<i;o++)p[o]=r[o];return a.createElement.apply(null,p)}return a.createElement.apply(null,r)}g.displayName="MDXCreateElement"},4308:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>p,default:()=>m,frontMatter:()=>i,metadata:()=>s,toc:()=>o});var a=r(8168),n=(r(6540),r(5680));const i={},p="System Call Wrappers",s={unversionedId:"Software Stack/Lab 1 - Operating System Perspective/System Calls/tasks/syscall-wrapper/README",id:"Software Stack/Lab 1 - Operating System Perspective/System Calls/tasks/syscall-wrapper/README",title:"System Call Wrappers",description:"Enter the syscall-wrapper/support/ folder and go through the practice items below.",source:"@site/docs/Software Stack/Lab 1 - Operating System Perspective/System Calls/tasks/syscall-wrapper/README.md",sourceDirName:"Software Stack/Lab 1 - Operating System Perspective/System Calls/tasks/syscall-wrapper",slug:"/Software Stack/Lab 1 - Operating System Perspective/System Calls/tasks/syscall-wrapper/",permalink:"/operating-systems/80/Software Stack/Lab 1 - Operating System Perspective/System Calls/tasks/syscall-wrapper/",draft:!1,tags:[],version:"current",frontMatter:{}},l={},o=[],c={toc:o},y="wrapper";function m(e){let{components:t,...r}=e;return(0,n.yg)(y,(0,a.A)({},c,r,{components:t,mdxType:"MDXLayout"}),(0,n.yg)("h1",{id:"system-call-wrappers"},"System Call Wrappers"),(0,n.yg)("p",null,"Enter the ",(0,n.yg)("inlineCode",{parentName:"p"},"syscall-wrapper/support/")," folder and go through the practice items below."),(0,n.yg)("ol",null,(0,n.yg)("li",{parentName:"ol"},(0,n.yg)("p",{parentName:"li"},"Update the files in the ",(0,n.yg)("inlineCode",{parentName:"p"},"syscall-wrapper/")," folder to make ",(0,n.yg)("inlineCode",{parentName:"p"},"read")," system call available as a wrapper.\nMake a call to the ",(0,n.yg)("inlineCode",{parentName:"p"},"read")," system call to read data from standard input in a buffer.\nThen call ",(0,n.yg)("inlineCode",{parentName:"p"},"write()")," to print data from that buffer."),(0,n.yg)("p",{parentName:"li"},"Note that the ",(0,n.yg)("inlineCode",{parentName:"p"},"read")," system call returns the number of bytes ",(0,n.yg)("inlineCode",{parentName:"p"},"read"),".\nUse that as the argument to the subsequent ",(0,n.yg)("inlineCode",{parentName:"p"},"write")," call that prints read data."),(0,n.yg)("p",{parentName:"li"},"We can see that it's easier to have wrapper calls and write most of the code in C than in assembly language."),(0,n.yg)("p",{parentName:"li"},(0,n.yg)("a",{parentName:"p",href:"../drills/questions/syscall-wrapper.md"},"Quiz"))),(0,n.yg)("li",{parentName:"ol"},(0,n.yg)("p",{parentName:"li"},"Update the files in the ",(0,n.yg)("inlineCode",{parentName:"p"},"syscall-wrapper/")," folder to make the ",(0,n.yg)("inlineCode",{parentName:"p"},"getpid")," system call available as a wrapper.\nCreate a function with the signature ",(0,n.yg)("inlineCode",{parentName:"p"},"unsigned int itoa(int n, char *a)")," that converts an integer to a string.\nIt returns the number of digits in the string.\nFor example, it will convert the number ",(0,n.yg)("inlineCode",{parentName:"p"},"1234")," to the string ",(0,n.yg)("inlineCode",{parentName:"p"},'"1234"')," string (",(0,n.yg)("inlineCode",{parentName:"p"},"NULL"),"-terminated, 5 bytes long);\nthe return value is ",(0,n.yg)("inlineCode",{parentName:"p"},"4")," (the number of digits of the ",(0,n.yg)("inlineCode",{parentName:"p"},'"1234"')," string)."),(0,n.yg)("p",{parentName:"li"},"Then make the call to ",(0,n.yg)("inlineCode",{parentName:"p"},"getpid"),";\nit gets no arguments and returns an integer (the PID - *process ID- of the current process)."))),(0,n.yg)("p",null,"If you're having difficulties solving this exercise, go through ",(0,n.yg)("a",{parentName:"p",href:"../../../reading/syscall-wrapper.md"},"this")," reading material."))}m.isMDXComponent=!0}}]);