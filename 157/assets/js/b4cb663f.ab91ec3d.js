"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[269],{5680:(e,t,n)=>{n.d(t,{xA:()=>u,yg:()=>g});var r=n(6540);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=r.createContext({}),s=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=s(e.components);return r.createElement(l.Provider,{value:t},e.children)},m="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},y=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,u=p(e,["components","mdxType","originalType","parentName"]),m=s(n),y=a,g=m["".concat(l,".").concat(y)]||m[y]||c[y]||o;return n?r.createElement(g,i(i({ref:t},u),{},{components:n})):r.createElement(g,i({ref:t},u))}));function g(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=y;var p={};for(var l in t)hasOwnProperty.call(t,l)&&(p[l]=t[l]);p.originalType=e,p[m]="string"==typeof e?e:a,i[1]=p;for(var s=2;s<o;s++)i[s]=n[s];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}y.displayName="MDXCreateElement"},704:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>c,frontMatter:()=>o,metadata:()=>p,toc:()=>s});var r=n(8168),a=(n(6540),n(5680));const o={},i="Copy-on-write Flag for `mmap()`",p={unversionedId:"Compute/Questions/mmap-cow-flag",id:"Compute/Questions/mmap-cow-flag",title:"Copy-on-write Flag for `mmap()`",description:"Question Text",source:"@site/docs/Compute/Questions/mmap-cow-flag.md",sourceDirName:"Compute/Questions",slug:"/Compute/Questions/mmap-cow-flag",permalink:"/operating-systems/157/Compute/Questions/mmap-cow-flag",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"Parent Faults before `fork()`",permalink:"/operating-systems/157/Compute/Questions/parent-faults-before-fork"},next:{title:"Always Shared Sections",permalink:"/operating-systems/157/Compute/Questions/sections-always-shared"}},l={},s=[{value:"Question Text",id:"question-text",level:2},{value:"Question Answers",id:"question-answers",level:2},{value:"Feedback",id:"feedback",level:2}],u={toc:s},m="wrapper";function c(e){let{components:t,...n}=e;return(0,a.yg)(m,(0,r.A)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,a.yg)("h1",{id:"copy-on-write-flag-for-mmap"},"Copy-on-write Flag for ",(0,a.yg)("inlineCode",{parentName:"h1"},"mmap()")),(0,a.yg)("h2",{id:"question-text"},"Question Text"),(0,a.yg)("p",null,"From the description in its ",(0,a.yg)("a",{parentName:"p",href:"https://man7.org/linux/man-pages/man2/mmap.2.html"},"man page"),", what flag should we pass to ",(0,a.yg)("inlineCode",{parentName:"p"},"mmap()")," in order to mark the mapped pages as copy-on-write?"),(0,a.yg)("h2",{id:"question-answers"},"Question Answers"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("inlineCode",{parentName:"li"},"MAP_SHARED"))),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("inlineCode",{parentName:"li"},"MAP_PRIVATE"))),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},(0,a.yg)("inlineCode",{parentName:"p"},"MAP_ANONYMOUS"))),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},(0,a.yg)("inlineCode",{parentName:"p"},"MAP_POPULATE")))),(0,a.yg)("h2",{id:"feedback"},"Feedback"),(0,a.yg)("p",null,"Quoting the ",(0,a.yg)("a",{parentName:"p",href:"https://man7.org/linux/man-pages/man2/mmap.2.html"},"man page"),":"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-text"},"MAP_PRIVATE\n              Create a private copy-on-write mapping.\n")))}c.isMDXComponent=!0}}]);