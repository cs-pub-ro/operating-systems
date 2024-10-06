"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[8361],{5680:(e,n,t)=>{t.d(n,{xA:()=>c,yg:()=>y});var r=t(6540);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function o(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var p=r.createContext({}),s=function(e){var n=r.useContext(p),t=n;return e&&(t="function"==typeof e?e(n):o(o({},n),e)),t},c=function(e){var n=s(e.components);return r.createElement(p.Provider,{value:n},e.children)},m="mdxType",f={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},u=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,i=e.originalType,p=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),m=s(t),u=a,y=m["".concat(p,".").concat(u)]||m[u]||f[u]||i;return t?r.createElement(y,o(o({ref:n},c),{},{components:t})):r.createElement(y,o({ref:n},c))}));function y(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var i=t.length,o=new Array(i);o[0]=u;var l={};for(var p in n)hasOwnProperty.call(n,p)&&(l[p]=n[p]);l.originalType=e,l[m]="string"==typeof e?e:a,o[1]=l;for(var s=2;s<i;s++)o[s]=t[s];return r.createElement.apply(null,o)}return r.createElement.apply(null,t)}u.displayName="MDXCreateElement"},8798:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>p,contentTitle:()=>o,default:()=>f,frontMatter:()=>i,metadata:()=>l,toc:()=>s});var r=t(8168),a=(t(6540),t(5680));const i={},o="Common Functions",l={unversionedId:"Software Stack/Lab 2 - Library Perspective/Libc/tasks/common-functions/README",id:"Software Stack/Lab 2 - Library Perspective/Libc/tasks/common-functions/README",title:"Common Functions",description:"Enter the chapters/software-stack/libc/drills/tasks/common-functions/support/ folder and go through the practice items below.",source:"@site/docs/Software Stack/Lab 2 - Library Perspective/Libc/tasks/common-functions/README.md",sourceDirName:"Software Stack/Lab 2 - Library Perspective/Libc/tasks/common-functions",slug:"/Software Stack/Lab 2 - Library Perspective/Libc/tasks/common-functions/",permalink:"/operating-systems/85/Software Stack/Lab 2 - Library Perspective/Libc/tasks/common-functions/",draft:!1,tags:[],version:"current",frontMatter:{}},p={},s=[],c={toc:s},m="wrapper";function f(e){let{components:n,...t}=e;return(0,a.yg)(m,(0,r.A)({},c,t,{components:n,mdxType:"MDXLayout"}),(0,a.yg)("h1",{id:"common-functions"},"Common Functions"),(0,a.yg)("p",null,"Enter the ",(0,a.yg)("inlineCode",{parentName:"p"},"chapters/software-stack/libc/drills/tasks/common-functions/support/")," folder and go through the practice items below."),(0,a.yg)("ol",null,(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"Update ",(0,a.yg)("inlineCode",{parentName:"p"},"string.c")," and ",(0,a.yg)("inlineCode",{parentName:"p"},"string.h")," to make available the ",(0,a.yg)("inlineCode",{parentName:"p"},"strcat()")," function.\nCall that function in ",(0,a.yg)("inlineCode",{parentName:"p"},"main_string.c")," and print the result.")),(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"Update the ",(0,a.yg)("inlineCode",{parentName:"p"},"main_printf.c")," file to use the implementation of ",(0,a.yg)("inlineCode",{parentName:"p"},"sprintf()")," to collect information to be printed inside a buffer.\nCall the ",(0,a.yg)("inlineCode",{parentName:"p"},"write()")," function to print the information.\nThe ",(0,a.yg)("inlineCode",{parentName:"p"},"printf()")," function will no longer be called.\nThis results in a single ",(0,a.yg)("inlineCode",{parentName:"p"},"write")," system call."),(0,a.yg)("p",{parentName:"li"},"Using previously implemented functions allows us to more efficiently write new programs.\nThese functions provide us with extensive features that we use in our programs."),(0,a.yg)("p",{parentName:"li"},(0,a.yg)("a",{parentName:"p",href:"../drills/questions/printf-syscall.md"},"Quiz 1")),(0,a.yg)("p",{parentName:"li"},(0,a.yg)("a",{parentName:"p",href:"../drills/questions/strcpy-syscall.md"},"Quiz 2")),(0,a.yg)("p",{parentName:"li"},(0,a.yg)("a",{parentName:"p",href:"../drills/questions/printf-vs-write.md"},"Quiz 3"))),(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"Update the ",(0,a.yg)("inlineCode",{parentName:"p"},"putchar()")," function in ",(0,a.yg)("inlineCode",{parentName:"p"},"main_printf.c")," to implement a buffered functionality of ",(0,a.yg)("inlineCode",{parentName:"p"},"printf()"),".\nCharacters passed via the ",(0,a.yg)("inlineCode",{parentName:"p"},"putchar()")," call will be stored in a predefined static global buffer.\nThe ",(0,a.yg)("inlineCode",{parentName:"p"},"write()")," call will be invoked when a newline is encountered or when the buffer is full.\nThis results in a reduced number of ",(0,a.yg)("inlineCode",{parentName:"p"},"write")," system calls.\nUse ",(0,a.yg)("inlineCode",{parentName:"p"},"strace")," to confirm the reduction of the number of ",(0,a.yg)("inlineCode",{parentName:"p"},"write")," system calls.")),(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"Update the ",(0,a.yg)("inlineCode",{parentName:"p"},"main_printf.c")," file to also feature a ",(0,a.yg)("inlineCode",{parentName:"p"},"flush()")," function that forces the flushing of the static global buffer and a ",(0,a.yg)("inlineCode",{parentName:"p"},"write")," system call.\nMake calls to ",(0,a.yg)("inlineCode",{parentName:"p"},"printf()")," and ",(0,a.yg)("inlineCode",{parentName:"p"},"flush()")," to validate the implementation.\nUse ",(0,a.yg)("inlineCode",{parentName:"p"},"strace")," to inspect the ",(0,a.yg)("inlineCode",{parentName:"p"},"write")," system calls invoked by ",(0,a.yg)("inlineCode",{parentName:"p"},"printf()")," and ",(0,a.yg)("inlineCode",{parentName:"p"},"flush()"),"."))),(0,a.yg)("p",null,"If you're having difficulties solving this exercise, go through ",(0,a.yg)("a",{parentName:"p",href:"../../../reading/common-functions.md"},"this")," reading material."))}f.isMDXComponent=!0}}]);