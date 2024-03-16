"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[480],{5680:(e,t,r)=>{r.d(t,{xA:()=>p,yg:()=>f});var n=r(6540);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function s(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?s(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):s(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},s=Object.keys(e);for(n=0;n<s.length;n++)r=s[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(n=0;n<s.length;n++)r=s[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var o=n.createContext({}),c=function(e){var t=n.useContext(o),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},p=function(e){var t=c(e.components);return n.createElement(o.Provider,{value:t},e.children)},y="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,s=e.originalType,o=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),y=c(r),m=a,f=y["".concat(o,".").concat(m)]||y[m]||u[m]||s;return r?n.createElement(f,l(l({ref:t},p),{},{components:r})):n.createElement(f,l({ref:t},p))}));function f(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var s=r.length,l=new Array(s);l[0]=m;var i={};for(var o in t)hasOwnProperty.call(t,o)&&(i[o]=t[o]);i.originalType=e,i[y]="string"==typeof e?e:a,l[1]=i;for(var c=2;c<s;c++)l[c]=r[c];return n.createElement.apply(null,l)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},6213:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>o,contentTitle:()=>l,default:()=>u,frontMatter:()=>s,metadata:()=>i,toc:()=>c});var n=r(8168),a=(r(6540),r(5680));const s={},l="Syscall Wrappers",i={unversionedId:"Software Stack/Lab 1 - Operating System Perspective/System Calls/Drills/Questions/syscall-wrapper",id:"Software Stack/Lab 1 - Operating System Perspective/System Calls/Drills/Questions/syscall-wrapper",title:"Syscall Wrappers",description:"Question Text",source:"@site/docs/Software Stack/Lab 1 - Operating System Perspective/System Calls/Drills/Questions/syscall-wrapper.md",sourceDirName:"Software Stack/Lab 1 - Operating System Perspective/System Calls/Drills/Questions",slug:"/Software Stack/Lab 1 - Operating System Perspective/System Calls/Drills/Questions/syscall-wrapper",permalink:"/operating-systems/55/Software Stack/Lab 1 - Operating System Perspective/System Calls/Drills/Questions/syscall-wrapper",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"Libcall with Syscall",permalink:"/operating-systems/55/Software Stack/Lab 1 - Operating System Perspective/System Calls/Drills/Questions/libcall-syscall"},next:{title:"Syscall ID",permalink:"/operating-systems/55/Software Stack/Lab 1 - Operating System Perspective/System Calls/Drills/Questions/syscall-id"}},o={},c=[{value:"Question Text",id:"question-text",level:2},{value:"Question Answers",id:"question-answers",level:2},{value:"Feedback",id:"feedback",level:2}],p={toc:c},y="wrapper";function u(e){let{components:t,...r}=e;return(0,a.yg)(y,(0,n.A)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,a.yg)("h1",{id:"syscall-wrappers"},"Syscall Wrappers"),(0,a.yg)("h2",{id:"question-text"},"Question Text"),(0,a.yg)("p",null,"What language do we use to invoke system calls?"),(0,a.yg)("h2",{id:"question-answers"},"Question Answers"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"assembly")),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},"C")),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},"C++")),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},"Go"))),(0,a.yg)("h2",{id:"feedback"},"Feedback"),(0,a.yg)("p",null,"System calls require setting of registers that can only be done in assembly language."))}u.isMDXComponent=!0}}]);