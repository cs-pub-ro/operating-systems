"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[9482],{5680:(e,t,r)=>{r.d(t,{xA:()=>p,yg:()=>f});var n=r(6540);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function l(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?l(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function o(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},l=Object.keys(e);for(n=0;n<l.length;n++)r=l[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)r=l[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var i=n.createContext({}),c=function(e){var t=n.useContext(i),r=t;return e&&(r="function"==typeof e?e(t):s(s({},t),e)),r},p=function(e){var t=c(e.components);return n.createElement(i.Provider,{value:t},e.children)},y="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,l=e.originalType,i=e.parentName,p=o(e,["components","mdxType","originalType","parentName"]),y=c(r),m=a,f=y["".concat(i,".").concat(m)]||y[m]||u[m]||l;return r?n.createElement(f,s(s({ref:t},p),{},{components:r})):n.createElement(f,s({ref:t},p))}));function f(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var l=r.length,s=new Array(l);s[0]=m;var o={};for(var i in t)hasOwnProperty.call(t,i)&&(o[i]=t[i]);o.originalType=e,o[y]="string"==typeof e?e:a,s[1]=o;for(var c=2;c<l;c++)s[c]=r[c];return n.createElement.apply(null,s)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},7414:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>i,contentTitle:()=>s,default:()=>u,frontMatter:()=>l,metadata:()=>o,toc:()=>c});var n=r(8168),a=(r(6540),r(5680));const l={},s="Syscall Tool",o={unversionedId:"Software Stack/Lab 1 - Operating System Perspective/System Calls/Drills/Questions/syscall-tool",id:"Software Stack/Lab 1 - Operating System Perspective/System Calls/Drills/Questions/syscall-tool",title:"Syscall Tool",description:"Question Text",source:"@site/docs/Software Stack/Lab 1 - Operating System Perspective/System Calls/Drills/Questions/syscall-tool.md",sourceDirName:"Software Stack/Lab 1 - Operating System Perspective/System Calls/Drills/Questions",slug:"/Software Stack/Lab 1 - Operating System Perspective/System Calls/Drills/Questions/syscall-tool",permalink:"/operating-systems/90/Software Stack/Lab 1 - Operating System Perspective/System Calls/Drills/Questions/syscall-tool",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"Syscall ID",permalink:"/operating-systems/90/Software Stack/Lab 1 - Operating System Perspective/System Calls/Drills/Questions/syscall-id"},next:{title:"Syscall Numbers",permalink:"/operating-systems/90/Software Stack/Lab 1 - Operating System Perspective/System Calls/Drills/Questions/syscall-numbers"}},i={},c=[{value:"Question Text",id:"question-text",level:2},{value:"Question Answers",id:"question-answers",level:2},{value:"Feedback",id:"feedback",level:2}],p={toc:c},y="wrapper";function u(e){let{components:t,...r}=e;return(0,a.yg)(y,(0,n.A)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,a.yg)("h1",{id:"syscall-tool"},"Syscall Tool"),(0,a.yg)("h2",{id:"question-text"},"Question Text"),(0,a.yg)("p",null,"What tool do we use to capture system calls?"),(0,a.yg)("h2",{id:"question-answers"},"Question Answers"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("inlineCode",{parentName:"li"},"strace"))),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},(0,a.yg)("inlineCode",{parentName:"p"},"make"))),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},(0,a.yg)("inlineCode",{parentName:"p"},"gcc"))),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},(0,a.yg)("inlineCode",{parentName:"p"},"./exec")))),(0,a.yg)("h2",{id:"feedback"},"Feedback"),(0,a.yg)("p",null,(0,a.yg)("inlineCode",{parentName:"p"},"strace")," is used to trace system calls invoked by a running program."))}u.isMDXComponent=!0}}]);