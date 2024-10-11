"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[2608],{5680:(e,t,n)=>{n.d(t,{xA:()=>c,yg:()=>y});var r=n(6540);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var l=r.createContext({}),p=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},c=function(e){var t=p(e.components);return r.createElement(l.Provider,{value:t},e.children)},m="mdxType",f={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},u=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,a=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),m=p(n),u=i,y=m["".concat(l,".").concat(u)]||m[u]||f[u]||a;return n?r.createElement(y,o(o({ref:t},c),{},{components:n})):r.createElement(y,o({ref:t},c))}));function y(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var a=n.length,o=new Array(a);o[0]=u;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[m]="string"==typeof e?e:i,o[1]=s;for(var p=2;p<a;p++)o[p]=n[p];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}u.displayName="MDXCreateElement"},2376:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>f,frontMatter:()=>a,metadata:()=>s,toc:()=>p});var r=n(8168),i=(n(6540),n(5680));const a={},o="Common Functions",s={unversionedId:"Software Stack/Lab 2 - Library Perspective/Libc/Drills/Tasks/Common Functions/README",id:"Software Stack/Lab 2 - Library Perspective/Libc/Drills/Tasks/Common Functions/README",title:"Common Functions",description:"Enter the chapters/software-stack/libc/drills/tasks/common-functions/support/ folder and go through the practice items below.",source:"@site/docs/Software Stack/Lab 2 - Library Perspective/Libc/Drills/Tasks/Common Functions/README.md",sourceDirName:"Software Stack/Lab 2 - Library Perspective/Libc/Drills/Tasks/Common Functions",slug:"/Software Stack/Lab 2 - Library Perspective/Libc/Drills/Tasks/Common Functions/",permalink:"/operating-systems/94/Software Stack/Lab 2 - Library Perspective/Libc/Drills/Tasks/Common Functions/",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"Tasks",permalink:"/operating-systems/94/Software Stack/Lab 2 - Library Perspective/Libc/Drills/Tasks/"},next:{title:"Libraries and libc",permalink:"/operating-systems/94/Software Stack/Lab 2 - Library Perspective/Libc/Drills/Tasks/Libc/"}},l={},p=[],c={toc:p},m="wrapper";function f(e){let{components:t,...n}=e;return(0,i.yg)(m,(0,r.A)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,i.yg)("h1",{id:"common-functions"},"Common Functions"),(0,i.yg)("p",null,"Enter the ",(0,i.yg)("inlineCode",{parentName:"p"},"chapters/software-stack/libc/drills/tasks/common-functions/support/")," folder and go through the practice items below."),(0,i.yg)("ol",null,(0,i.yg)("li",{parentName:"ol"},(0,i.yg)("p",{parentName:"li"},"Update ",(0,i.yg)("inlineCode",{parentName:"p"},"string.c")," and ",(0,i.yg)("inlineCode",{parentName:"p"},"string.h")," to make available the ",(0,i.yg)("inlineCode",{parentName:"p"},"strcat()")," function.\nCall that function in ",(0,i.yg)("inlineCode",{parentName:"p"},"main_string.c")," and print the result.")),(0,i.yg)("li",{parentName:"ol"},(0,i.yg)("p",{parentName:"li"},"Update the ",(0,i.yg)("inlineCode",{parentName:"p"},"main_printf.c")," file to use the implementation of ",(0,i.yg)("inlineCode",{parentName:"p"},"sprintf()")," to collect information to be printed inside a buffer.\nCall the ",(0,i.yg)("inlineCode",{parentName:"p"},"write()")," function to print the information.\nThe ",(0,i.yg)("inlineCode",{parentName:"p"},"printf()")," function will no longer be called.\nThis results in a single ",(0,i.yg)("inlineCode",{parentName:"p"},"write")," system call."),(0,i.yg)("p",{parentName:"li"},"Using previously implemented functions allows us to more efficiently write new programs.\nThese functions provide us with extensive features that we use in our programs."),(0,i.yg)("p",{parentName:"li"},(0,i.yg)("a",{parentName:"p",href:"/operating-systems/94/Software%20Stack/Lab%202%20-%20Library%20Perspective/Libc/Drills/Questions/printf-syscall"},"Quiz 1")),(0,i.yg)("p",{parentName:"li"},(0,i.yg)("a",{parentName:"p",href:"/operating-systems/94/Software%20Stack/Lab%202%20-%20Library%20Perspective/Libc/Drills/Questions/strcpy-syscall"},"Quiz 2")),(0,i.yg)("p",{parentName:"li"},(0,i.yg)("a",{parentName:"p",href:"/operating-systems/94/Software%20Stack/Lab%202%20-%20Library%20Perspective/Libc/Drills/Questions/printf-vs-write"},"Quiz 3"))),(0,i.yg)("li",{parentName:"ol"},(0,i.yg)("p",{parentName:"li"},"Update the ",(0,i.yg)("inlineCode",{parentName:"p"},"putchar()")," function in ",(0,i.yg)("inlineCode",{parentName:"p"},"main_printf.c")," to implement a buffered functionality of ",(0,i.yg)("inlineCode",{parentName:"p"},"printf()"),".\nCharacters passed via the ",(0,i.yg)("inlineCode",{parentName:"p"},"putchar()")," call will be stored in a predefined static global buffer.\nThe ",(0,i.yg)("inlineCode",{parentName:"p"},"write()")," call will be invoked when a newline is encountered or when the buffer is full.\nThis results in a reduced number of ",(0,i.yg)("inlineCode",{parentName:"p"},"write")," system calls.\nUse ",(0,i.yg)("inlineCode",{parentName:"p"},"strace")," to confirm the reduction of the number of ",(0,i.yg)("inlineCode",{parentName:"p"},"write")," system calls.")),(0,i.yg)("li",{parentName:"ol"},(0,i.yg)("p",{parentName:"li"},"Update the ",(0,i.yg)("inlineCode",{parentName:"p"},"main_printf.c")," file to also feature a ",(0,i.yg)("inlineCode",{parentName:"p"},"flush()")," function that forces the flushing of the static global buffer and a ",(0,i.yg)("inlineCode",{parentName:"p"},"write")," system call.\nMake calls to ",(0,i.yg)("inlineCode",{parentName:"p"},"printf()")," and ",(0,i.yg)("inlineCode",{parentName:"p"},"flush()")," to validate the implementation.\nUse ",(0,i.yg)("inlineCode",{parentName:"p"},"strace")," to inspect the ",(0,i.yg)("inlineCode",{parentName:"p"},"write")," system calls invoked by ",(0,i.yg)("inlineCode",{parentName:"p"},"printf()")," and ",(0,i.yg)("inlineCode",{parentName:"p"},"flush()"),"."))),(0,i.yg)("p",null,"If you're having difficulties solving this exercise, go through ",(0,i.yg)("a",{parentName:"p",href:"/operating-systems/94/Software%20Stack/Lab%202%20-%20Library%20Perspective/Libc/Reading/common-functions"},"this")," reading material."))}f.isMDXComponent=!0}}]);