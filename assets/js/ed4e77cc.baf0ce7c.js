"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[8361],{5680:(e,t,n)=>{n.d(t,{xA:()=>c,yg:()=>y});var r=n(6540);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=r.createContext({}),l=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},c=function(e){var t=l(e.components);return r.createElement(s.Provider,{value:t},e.children)},m="mdxType",f={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},u=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,s=e.parentName,c=p(e,["components","mdxType","originalType","parentName"]),m=l(n),u=a,y=m["".concat(s,".").concat(u)]||m[u]||f[u]||i;return n?r.createElement(y,o(o({ref:t},c),{},{components:n})):r.createElement(y,o({ref:t},c))}));function y(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=u;var p={};for(var s in t)hasOwnProperty.call(t,s)&&(p[s]=t[s]);p.originalType=e,p[m]="string"==typeof e?e:a,o[1]=p;for(var l=2;l<i;l++)o[l]=n[l];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}u.displayName="MDXCreateElement"},8798:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>o,default:()=>f,frontMatter:()=>i,metadata:()=>p,toc:()=>l});var r=n(8168),a=(n(6540),n(5680));const i={},o="Common Functions",p={unversionedId:"Software Stack/Lab 2 - Library Perspective/Libc/tasks/common-functions/README",id:"Software Stack/Lab 2 - Library Perspective/Libc/tasks/common-functions/README",title:"Common Functions",description:"Enter the chapters/software-stack/libc/drills/tasks/common-functions/support/ folder and go through the practice items below.",source:"@site/docs/Software Stack/Lab 2 - Library Perspective/Libc/tasks/common-functions/README.md",sourceDirName:"Software Stack/Lab 2 - Library Perspective/Libc/tasks/common-functions",slug:"/Software Stack/Lab 2 - Library Perspective/Libc/tasks/common-functions/",permalink:"/operating-systems/Software Stack/Lab 2 - Library Perspective/Libc/tasks/common-functions/",draft:!1,tags:[],version:"current",frontMatter:{}},s={},l=[],c={toc:l},m="wrapper";function f(e){let{components:t,...n}=e;return(0,a.yg)(m,(0,r.A)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,a.yg)("h1",{id:"common-functions"},"Common Functions"),(0,a.yg)("p",null,"Enter the ",(0,a.yg)("inlineCode",{parentName:"p"},"chapters/software-stack/libc/drills/tasks/common-functions/support/")," folder and go through the practice items below."),(0,a.yg)("ol",null,(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"Update ",(0,a.yg)("inlineCode",{parentName:"p"},"string.c")," and ",(0,a.yg)("inlineCode",{parentName:"p"},"string.h")," to make available the ",(0,a.yg)("inlineCode",{parentName:"p"},"strcat()")," function.\nCall that function in ",(0,a.yg)("inlineCode",{parentName:"p"},"main_string.c")," and print the result.")),(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"Update the ",(0,a.yg)("inlineCode",{parentName:"p"},"main_printf.c")," file to use the implementation of ",(0,a.yg)("inlineCode",{parentName:"p"},"sprintf()")," to collect information to be printed inside a buffer.\nCall the ",(0,a.yg)("inlineCode",{parentName:"p"},"write()")," function to print the information.\nThe ",(0,a.yg)("inlineCode",{parentName:"p"},"printf()")," function will no longer be called.\nThis results in a single ",(0,a.yg)("inlineCode",{parentName:"p"},"write")," system call."),(0,a.yg)("p",{parentName:"li"},"Using previously implemented functions allows us to more efficiently write new programs.\nThese functions provide us with extensive features that we use in our programs."),(0,a.yg)("p",{parentName:"li"},(0,a.yg)("a",{parentName:"p",href:"/operating-systems/Software%20Stack/Lab%202%20-%20Library%20Perspective/Libc/questions/printf-syscall"},"Quiz 1")),(0,a.yg)("p",{parentName:"li"},(0,a.yg)("a",{parentName:"p",href:"/operating-systems/Software%20Stack/Lab%202%20-%20Library%20Perspective/Libc/questions/strcpy-syscall"},"Quiz 2")),(0,a.yg)("p",{parentName:"li"},(0,a.yg)("a",{parentName:"p",href:"/operating-systems/Software%20Stack/Lab%202%20-%20Library%20Perspective/Libc/questions/printf-vs-write"},"Quiz 3"))),(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"Update the ",(0,a.yg)("inlineCode",{parentName:"p"},"putchar()")," function in ",(0,a.yg)("inlineCode",{parentName:"p"},"main_printf.c")," to implement a buffered functionality of ",(0,a.yg)("inlineCode",{parentName:"p"},"printf()"),".\nCharacters passed via the ",(0,a.yg)("inlineCode",{parentName:"p"},"putchar()")," call will be stored in a predefined static global buffer.\nThe ",(0,a.yg)("inlineCode",{parentName:"p"},"write()")," call will be invoked when a newline is encountered or when the buffer is full.\nThis results in a reduced number of ",(0,a.yg)("inlineCode",{parentName:"p"},"write")," system calls.\nUse ",(0,a.yg)("inlineCode",{parentName:"p"},"strace")," to confirm the reduction of the number of ",(0,a.yg)("inlineCode",{parentName:"p"},"write")," system calls.")),(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"Update the ",(0,a.yg)("inlineCode",{parentName:"p"},"main_printf.c")," file to also feature a ",(0,a.yg)("inlineCode",{parentName:"p"},"flush()")," function that forces the flushing of the static global buffer and a ",(0,a.yg)("inlineCode",{parentName:"p"},"write")," system call.\nMake calls to ",(0,a.yg)("inlineCode",{parentName:"p"},"printf()")," and ",(0,a.yg)("inlineCode",{parentName:"p"},"flush()")," to validate the implementation.\nUse ",(0,a.yg)("inlineCode",{parentName:"p"},"strace")," to inspect the ",(0,a.yg)("inlineCode",{parentName:"p"},"write")," system calls invoked by ",(0,a.yg)("inlineCode",{parentName:"p"},"printf()")," and ",(0,a.yg)("inlineCode",{parentName:"p"},"flush()"),"."))),(0,a.yg)("p",null,"If you're having difficulties solving this exercise, go through ",(0,a.yg)("a",{parentName:"p",href:"../../../reading/common-functions.md"},"this")," reading material."))}f.isMDXComponent=!0}}]);