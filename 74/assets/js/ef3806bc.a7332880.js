"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[2308],{5680:(e,t,r)=>{r.d(t,{xA:()=>p,yg:()=>m});var n=r(6540);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var l=n.createContext({}),u=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},p=function(e){var t=u(e.components);return n.createElement(l.Provider,{value:t},e.children)},c="mdxType",y={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},f=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),c=u(r),f=a,m=c["".concat(l,".").concat(f)]||c[f]||y[f]||o;return r?n.createElement(m,i(i({ref:t},p),{},{components:r})):n.createElement(m,i({ref:t},p))}));function m(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,i=new Array(o);i[0]=f;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[c]="string"==typeof e?e:a,i[1]=s;for(var u=2;u<o;u++)i[u]=r[u];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}f.displayName="MDXCreateElement"},7955:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>y,frontMatter:()=>o,metadata:()=>s,toc:()=>u});var n=r(8168),a=(r(6540),r(5680));const o={},i="Fiber Strace",s={unversionedId:"Compute/Questions/fiber-strace",id:"Compute/Questions/fiber-strace",title:"Fiber Strace",description:"Question Text",source:"@site/docs/Compute/Questions/fiber-strace.md",sourceDirName:"Compute/Questions",slug:"/Compute/Questions/fiber-strace",permalink:"/operating-systems/74/Compute/Questions/fiber-strace",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"Sleeping on a Fiber",permalink:"/operating-systems/74/Compute/Questions/sleeping-on-a-fiber"},next:{title:"Type of Scheduler in `libult.so`",permalink:"/operating-systems/74/Compute/Questions/type-of-scheduler-in-libult"}},l={},u=[{value:"Question Text",id:"question-text",level:2},{value:"Question Answers",id:"question-answers",level:2},{value:"Feedback",id:"feedback",level:2}],p={toc:u},c="wrapper";function y(e){let{components:t,...r}=e;return(0,a.yg)(c,(0,n.A)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,a.yg)("h1",{id:"fiber-strace"},"Fiber Strace"),(0,a.yg)("h2",{id:"question-text"},"Question Text"),(0,a.yg)("p",null,"How many ",(0,a.yg)("inlineCode",{parentName:"p"},"clone()")," system calls are performed when creating a fiber?"),(0,a.yg)("h2",{id:"question-answers"},"Question Answers"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"none")),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},"one for each fiber")),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},"one for every 2 fibers")),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},"2 for each fiber"))),(0,a.yg)("h2",{id:"feedback"},"Feedback"),(0,a.yg)("p",null,"Being ",(0,a.yg)("strong",{parentName:"p"},"user-level threads"),", the fibers aren't created by the operating system.\nThe only system calls that you see used are ",(0,a.yg)("inlineCode",{parentName:"p"},"mmap()")," and ",(0,a.yg)("inlineCode",{parentName:"p"},"munmap()"),", used to create each fiber's stack."))}y.isMDXComponent=!0}}]);