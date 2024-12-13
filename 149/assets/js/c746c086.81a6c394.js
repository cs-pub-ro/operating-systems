"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[9788],{5680:(e,t,n)=>{n.d(t,{xA:()=>s,yg:()=>d});var a=n(6540);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var m=a.createContext({}),p=function(e){var t=a.useContext(m),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},s=function(e){var t=p(e.components);return a.createElement(m.Provider,{value:t},e.children)},u="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},y=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,m=e.parentName,s=i(e,["components","mdxType","originalType","parentName"]),u=p(n),y=r,d=u["".concat(m,".").concat(y)]||u[y]||c[y]||o;return n?a.createElement(d,l(l({ref:t},s),{},{components:n})):a.createElement(d,l({ref:t},s))}));function d(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,l=new Array(o);l[0]=y;var i={};for(var m in t)hasOwnProperty.call(t,m)&&(i[m]=t[m]);i.originalType=e,i[u]="string"==typeof e?e:r,l[1]=i;for(var p=2;p<o;p++)l[p]=n[p];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}y.displayName="MDXCreateElement"},805:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>m,contentTitle:()=>l,default:()=>c,frontMatter:()=>o,metadata:()=>i,toc:()=>p});var a=n(8168),r=(n(6540),n(5680));const o={},l="malloc()` and `mmap()",i={unversionedId:"Data/Questions/malloc-mmap",id:"Data/Questions/malloc-mmap",title:"malloc()` and `mmap()",description:"Question Text",source:"@site/docs/Data/Questions/malloc-mmap.md",sourceDirName:"Data/Questions",slug:"/Data/Questions/malloc-mmap",permalink:"/operating-systems/149/Data/Questions/malloc-mmap",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"malloc()` and `brk()",permalink:"/operating-systems/149/Data/Questions/malloc-brk"},next:{title:"Memory Granularity",permalink:"/operating-systems/149/Data/Questions/memory-granularity"}},m={},p=[{value:"Question Text",id:"question-text",level:2},{value:"Question Answers",id:"question-answers",level:2},{value:"Feedback",id:"feedback",level:2}],s={toc:p},u="wrapper";function c(e){let{components:t,...n}=e;return(0,r.yg)(u,(0,a.A)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,r.yg)("h1",{id:"malloc-and-mmap"},(0,r.yg)("inlineCode",{parentName:"h1"},"malloc()")," and ",(0,r.yg)("inlineCode",{parentName:"h1"},"mmap()")),(0,r.yg)("h2",{id:"question-text"},"Question Text"),(0,r.yg)("p",null,"When does ",(0,r.yg)("inlineCode",{parentName:"p"},"malloc()")," use ",(0,r.yg)("inlineCode",{parentName:"p"},"mmap()"),"?"),(0,r.yg)("h2",{id:"question-answers"},"Question Answers"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},"When it allocates read-only memory")),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},"When it allocates zeroed memory"))),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"When it allocates chunks of memory bigger than an internal threshold")),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"When the heap is full")),(0,r.yg)("h2",{id:"feedback"},"Feedback"),(0,r.yg)("p",null,(0,r.yg)("inlineCode",{parentName:"p"},"malloc")," uses both ",(0,r.yg)("inlineCode",{parentName:"p"},"brk()")," and ",(0,r.yg)("inlineCode",{parentName:"p"},"mmap()"),", but prefers ",(0,r.yg)("inlineCode",{parentName:"p"},"mmap()")," for big chunks of memory (by default larger than 128 KB).\nThis value can be altered using ",(0,r.yg)("a",{parentName:"p",href:"https://linux.die.net/man/3/mallopt"},(0,r.yg)("inlineCode",{parentName:"a"},"mallopt()"))," with the ",(0,r.yg)("inlineCode",{parentName:"p"},"param")," argument set to ",(0,r.yg)("inlineCode",{parentName:"p"},"M_MMAP_THRESHOLD"),".\nThese memory blocks are unlikely to be reused so they are not placed on heap to avoid memory fragmentation."))}c.isMDXComponent=!0}}]);