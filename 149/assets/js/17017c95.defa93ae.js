"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[2574],{5680:(e,t,r)=>{r.d(t,{xA:()=>c,yg:()=>f});var n=r(6540);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var l=n.createContext({}),u=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):s(s({},t),e)),r},c=function(e){var t=u(e.components);return n.createElement(l.Provider,{value:t},e.children)},p="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},y=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),p=u(r),y=a,f=p["".concat(l,".").concat(y)]||p[y]||m[y]||o;return r?n.createElement(f,s(s({ref:t},c),{},{components:r})):n.createElement(f,s({ref:t},c))}));function f(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,s=new Array(o);s[0]=y;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i[p]="string"==typeof e?e:a,s[1]=i;for(var u=2;u<o;u++)s[u]=r[u];return n.createElement.apply(null,s)}return n.createElement.apply(null,r)}y.displayName="MDXCreateElement"},1415:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>s,default:()=>m,frontMatter:()=>o,metadata:()=>i,toc:()=>u});var n=r(8168),a=(r(6540),r(5680));const o={},s="Memory Leaks",i={unversionedId:"Data/Questions/memory-leaks",id:"Data/Questions/memory-leaks",title:"Memory Leaks",description:"Question Text",source:"@site/docs/Data/Questions/memory-leaks.md",sourceDirName:"Data/Questions",slug:"/Data/Questions/memory-leaks",permalink:"/operating-systems/149/Data/Questions/memory-leaks",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"Operator Overloading",permalink:"/operating-systems/149/Data/Questions/operators"},next:{title:"Valgrind Leaks",permalink:"/operating-systems/149/Data/Questions/valgrind-leaks"}},l={},u=[{value:"Question Text",id:"question-text",level:2},{value:"Question Answers",id:"question-answers",level:2},{value:"Feedback",id:"feedback",level:2}],c={toc:u},p="wrapper";function m(e){let{components:t,...r}=e;return(0,a.yg)(p,(0,n.A)({},c,r,{components:t,mdxType:"MDXLayout"}),(0,a.yg)("h1",{id:"memory-leaks"},"Memory Leaks"),(0,a.yg)("h2",{id:"question-text"},"Question Text"),(0,a.yg)("p",null,"What happens to the leaked memory when the process finishes execution?"),(0,a.yg)("h2",{id:"question-answers"},"Question Answers"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},"It will be freed by the OS garbage collector")),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},"It remains unusable until the first restart"))),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"It is freed alongside all memory used by process")),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"It will remain reachable until another process explicitly frees it")),(0,a.yg)("h2",{id:"feedback"},"Feedback"),(0,a.yg)("p",null,"When a process ends, all its memory zones are freed by the OS to be reused.\nLeaking memory becomes a major problem in case of programs that run indefinitely, because the leaked memory will stack, causing a memory outage."))}m.isMDXComponent=!0}}]);