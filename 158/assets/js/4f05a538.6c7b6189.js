"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[9195],{5680:(e,t,r)=>{r.d(t,{xA:()=>p,yg:()=>m});var n=r(6540);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var l=n.createContext({}),u=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):s(s({},t),e)),r},p=function(e){var t=u(e.components);return n.createElement(l.Provider,{value:t},e.children)},c="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},y=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),c=u(r),y=a,m=c["".concat(l,".").concat(y)]||c[y]||d[y]||o;return r?n.createElement(m,s(s({ref:t},p),{},{components:r})):n.createElement(m,s({ref:t},p))}));function m(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,s=new Array(o);s[0]=y;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i[c]="string"==typeof e?e:a,s[1]=i;for(var u=2;u<o;u++)s[u]=r[u];return n.createElement.apply(null,s)}return n.createElement.apply(null,r)}y.displayName="MDXCreateElement"},9622:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>s,default:()=>d,frontMatter:()=>o,metadata:()=>i,toc:()=>u});var n=r(8168),a=(r(6540),r(5680));const o={},s="Threads Shared Data",i={unversionedId:"Compute/Questions/threads-shared-data",id:"Compute/Questions/threads-shared-data",title:"Threads Shared Data",description:"Question Text",source:"@site/docs/Compute/Questions/threads-shared-data.md",sourceDirName:"Compute/Questions",slug:"/Compute/Questions/threads-shared-data",permalink:"/operating-systems/158/Compute/Questions/threads-shared-data",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"Segfault Exit Code",permalink:"/operating-systems/158/Compute/Questions/seg-fault-exit-code"},next:{title:"Thread Memory",permalink:"/operating-systems/158/Compute/Questions/thread-memory"}},l={},u=[{value:"Question Text",id:"question-text",level:2},{value:"Question Answers",id:"question-answers",level:2},{value:"Feedback",id:"feedback",level:2}],p={toc:u},c="wrapper";function d(e){let{components:t,...r}=e;return(0,a.yg)(c,(0,n.A)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,a.yg)("h1",{id:"threads-shared-data"},"Threads Shared Data"),(0,a.yg)("h2",{id:"question-text"},"Question Text"),(0,a.yg)("p",null,"Which section may store per-thread non-shared (variables) variables?"),(0,a.yg)("h2",{id:"question-answers"},"Question Answers"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},"On the heap")),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},"In the ",(0,a.yg)("inlineCode",{parentName:"p"},".rodata")," section"))),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"On the stack")),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"In the ",(0,a.yg)("inlineCode",{parentName:"li"},".text")," section")),(0,a.yg)("h2",{id:"feedback"},"Feedback"),(0,a.yg)("p",null,"Each thread has its own separate stack.\nEvery other section is shared with the other threads.\nData can also be stored in the ",(0,a.yg)("inlineCode",{parentName:"p"},".text")," section, albeit this is a bit unorthodox."))}d.isMDXComponent=!0}}]);