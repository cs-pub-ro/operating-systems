"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[6984],{5680:(e,n,t)=>{t.d(n,{xA:()=>p,yg:()=>d});var r=t(6540);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function l(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function i(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var s=r.createContext({}),c=function(e){var n=r.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):l(l({},n),e)),t},p=function(e){var n=c(e.components);return r.createElement(s.Provider,{value:n},e.children)},u="mdxType",m={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},y=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),u=c(t),y=a,d=u["".concat(s,".").concat(y)]||u[y]||m[y]||o;return t?r.createElement(d,l(l({ref:n},p),{},{components:t})):r.createElement(d,l({ref:n},p))}));function d(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var o=t.length,l=new Array(o);l[0]=y;var i={};for(var s in n)hasOwnProperty.call(n,s)&&(i[s]=n[s]);i.originalType=e,i[u]="string"==typeof e?e:a,l[1]=i;for(var c=2;c<o;c++)l[c]=t[c];return r.createElement.apply(null,l)}return r.createElement.apply(null,t)}y.displayName="MDXCreateElement"},5985:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>s,contentTitle:()=>l,default:()=>m,frontMatter:()=>o,metadata:()=>i,toc:()=>c});var r=t(8168),a=(t(6540),t(5680));const o={},l="malloc()` and `brk()",i={unversionedId:"Data/Questions/malloc-brk",id:"Data/Questions/malloc-brk",title:"malloc()` and `brk()",description:"Question Text",source:"@site/docs/Data/Questions/malloc-brk.md",sourceDirName:"Data/Questions",slug:"/Data/Questions/malloc-brk",permalink:"/operating-systems/128/Data/Questions/malloc-brk",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"Half Page",permalink:"/operating-systems/128/Data/Questions/half-page"},next:{title:"malloc()` and `mmap()",permalink:"/operating-systems/128/Data/Questions/malloc-mmap"}},s={},c=[{value:"Question Text",id:"question-text",level:2},{value:"Question Answers",id:"question-answers",level:2},{value:"Feedback",id:"feedback",level:2}],p={toc:c},u="wrapper";function m(e){let{components:n,...t}=e;return(0,a.yg)(u,(0,r.A)({},p,t,{components:n,mdxType:"MDXLayout"}),(0,a.yg)("h1",{id:"malloc-and-brk"},(0,a.yg)("inlineCode",{parentName:"h1"},"malloc()")," and ",(0,a.yg)("inlineCode",{parentName:"h1"},"brk()")),(0,a.yg)("h2",{id:"question-text"},"Question Text"),(0,a.yg)("p",null,"When does ",(0,a.yg)("inlineCode",{parentName:"p"},"malloc()")," use ",(0,a.yg)("inlineCode",{parentName:"p"},"brk()"),"?"),(0,a.yg)("h2",{id:"question-answers"},"Question Answers"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("inlineCode",{parentName:"li"},"brk()")," is outdated, ",(0,a.yg)("inlineCode",{parentName:"li"},"malloc()")," always uses ",(0,a.yg)("inlineCode",{parentName:"li"},"mmap()"))),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"When it allocates a small chunk of memory")),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},"When it allocates an array")),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},"When it's working with dynamic libraries"))),(0,a.yg)("h2",{id:"feedback"},"Feedback"),(0,a.yg)("p",null,(0,a.yg)("inlineCode",{parentName:"p"},"malloc()")," uses both ",(0,a.yg)("inlineCode",{parentName:"p"},"brk()")," and ",(0,a.yg)("inlineCode",{parentName:"p"},"mmap()"),", but prefers ",(0,a.yg)("inlineCode",{parentName:"p"},"brk()")," for small chunks of memory to keep granular allocations in a contiguous area.\nThis way, ",(0,a.yg)("inlineCode",{parentName:"p"},"free()"),' does not necessarily return the memory to the OS as it might only mark the zone as "free" within ',(0,a.yg)("inlineCode",{parentName:"p"},"libc"),"'s allocator and reuse it for later allocations."))}m.isMDXComponent=!0}}]);