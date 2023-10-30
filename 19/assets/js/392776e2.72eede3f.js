"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[8351],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>f});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var p=a.createContext({}),m=function(e){var t=a.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},u=function(e){var t=m(e.components);return a.createElement(p.Provider,{value:t},e.children)},c="mdxType",s={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,p=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),c=m(n),d=r,f=c["".concat(p,".").concat(d)]||c[d]||s[d]||o;return n?a.createElement(f,l(l({ref:t},u),{},{components:n})):a.createElement(f,l({ref:t},u))}));function f(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,l=new Array(o);l[0]=d;var i={};for(var p in t)hasOwnProperty.call(t,p)&&(i[p]=t[p]);i.originalType=e,i[c]="string"==typeof e?e:r,l[1]=i;for(var m=2;m<o;m++)l[m]=n[m];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},1201:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>l,default:()=>s,frontMatter:()=>o,metadata:()=>i,toc:()=>m});var a=n(7462),r=(n(7294),n(3905));const o={},l="Malloc `mmap()`",i={unversionedId:"Lab/Data/quiz/malloc-mmap",id:"Lab/Data/quiz/malloc-mmap",title:"Malloc `mmap()`",description:"Question Text",source:"@site/docs/Lab/Data/quiz/malloc-mmap.md",sourceDirName:"Lab/Data/quiz",slug:"/Lab/Data/quiz/malloc-mmap",permalink:"/operating-systems/19/Lab/Data/quiz/malloc-mmap",draft:!1,tags:[],version:"current",frontMatter:{}},p={},m=[{value:"Question Text",id:"question-text",level:2},{value:"Question Answers",id:"question-answers",level:2},{value:"Feedback",id:"feedback",level:2}],u={toc:m},c="wrapper";function s(e){let{components:t,...n}=e;return(0,r.kt)(c,(0,a.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"malloc-mmap"},"Malloc ",(0,r.kt)("inlineCode",{parentName:"h1"},"mmap()")),(0,r.kt)("h2",{id:"question-text"},"Question Text"),(0,r.kt)("p",null,"When does ",(0,r.kt)("inlineCode",{parentName:"p"},"malloc()")," use ",(0,r.kt)("inlineCode",{parentName:"p"},"mmap()"),"?"),(0,r.kt)("h2",{id:"question-answers"},"Question Answers"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"When it allocates read-only memory")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"When it allocates zeroed memory"))),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"When it allocates chunks of memory bigger than an internal threshold")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"When the heap is full")),(0,r.kt)("h2",{id:"feedback"},"Feedback"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"malloc")," uses both ",(0,r.kt)("inlineCode",{parentName:"p"},"brk()")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"mmap()"),", but prefers ",(0,r.kt)("inlineCode",{parentName:"p"},"mmap()")," for big chunks of memory (by default larger than 128 KB).\nThis value can be altered using ",(0,r.kt)("a",{parentName:"p",href:"https://linux.die.net/man/3/mallopt"},(0,r.kt)("inlineCode",{parentName:"a"},"mallopt()"))," with the ",(0,r.kt)("inlineCode",{parentName:"p"},"param")," argument set to ",(0,r.kt)("inlineCode",{parentName:"p"},"M_MMAP_THRESHOLD"),".\nThese memroy blocks are unlikely to be reused so they are not placed on heap to avoid memory fragmentation."))}s.isMDXComponent=!0}}]);