"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[1400],{5680:(e,n,t)=>{t.d(n,{xA:()=>m,yg:()=>g});var a=t(6540);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function o(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,a,r=function(e,n){if(null==e)return{};var t,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)t=i[a],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)t=i[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var s=a.createContext({}),p=function(e){var n=a.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):o(o({},n),e)),t},m=function(e){var n=p(e.components);return a.createElement(s.Provider,{value:n},e.children)},y="mdxType",c={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},u=a.forwardRef((function(e,n){var t=e.components,r=e.mdxType,i=e.originalType,s=e.parentName,m=l(e,["components","mdxType","originalType","parentName"]),y=p(t),u=r,g=y["".concat(s,".").concat(u)]||y[u]||c[u]||i;return t?a.createElement(g,o(o({ref:n},m),{},{components:t})):a.createElement(g,o({ref:n},m))}));function g(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var i=t.length,o=new Array(i);o[0]=u;var l={};for(var s in n)hasOwnProperty.call(n,s)&&(l[s]=n[s]);l.originalType=e,l[y]="string"==typeof e?e:r,o[1]=l;for(var p=2;p<i;p++)o[p]=t[p];return a.createElement.apply(null,o)}return a.createElement.apply(null,t)}u.displayName="MDXCreateElement"},2281:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>s,contentTitle:()=>o,default:()=>c,frontMatter:()=>i,metadata:()=>l,toc:()=>p});var a=t(8168),r=(t(6540),t(5680));const i={},o="Variables in memory regions",l={unversionedId:"Data/Questions/memory-regions-vars",id:"Data/Questions/memory-regions-vars",title:"Variables in memory regions",description:"Question Text",source:"@site/docs/Data/Questions/memory-regions-vars.md",sourceDirName:"Data/Questions",slug:"/Data/Questions/memory-regions-vars",permalink:"/operating-systems/119/Data/Questions/memory-regions-vars",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"ASLR",permalink:"/operating-systems/119/Data/Questions/memory-aslr"},next:{title:"Stack Protector",permalink:"/operating-systems/119/Data/Questions/memory-stack-protector"}},s={},p=[{value:"Question Text",id:"question-text",level:2},{value:"Question Answers",id:"question-answers",level:2},{value:"Feedback",id:"feedback",level:2}],m={toc:p},y="wrapper";function c(e){let{components:n,...t}=e;return(0,r.yg)(y,(0,a.A)({},m,t,{components:n,mdxType:"MDXLayout"}),(0,r.yg)("h1",{id:"variables-in-memory-regions"},"Variables in memory regions"),(0,r.yg)("h2",{id:"question-text"},"Question Text"),(0,r.yg)("p",null,"In what memory regions are the ",(0,r.yg)("inlineCode",{parentName:"p"},"a"),", ",(0,r.yg)("inlineCode",{parentName:"p"},"b"),", ",(0,r.yg)("inlineCode",{parentName:"p"},"c"),", ",(0,r.yg)("inlineCode",{parentName:"p"},"k")," variables from ",(0,r.yg)("inlineCode",{parentName:"p"},"support/memory-security/buff_leak.c")," stored?"),(0,r.yg)("h2",{id:"question-answers"},"Question Answers"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"a - ",(0,r.yg)("inlineCode",{parentName:"li"},".data"),", b - ",(0,r.yg)("inlineCode",{parentName:"li"},".bss"),", c - ",(0,r.yg)("inlineCode",{parentName:"li"},".stack"),", k - ",(0,r.yg)("inlineCode",{parentName:"li"},".heap"))),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"a - ",(0,r.yg)("inlineCode",{parentName:"li"},".data"),", b - ",(0,r.yg)("inlineCode",{parentName:"li"},".bss"),", c - ",(0,r.yg)("inlineCode",{parentName:"li"},".stack"),", k - ",(0,r.yg)("inlineCode",{parentName:"li"},".stack"))),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},"a - ",(0,r.yg)("inlineCode",{parentName:"p"},".data"),", b - ",(0,r.yg)("inlineCode",{parentName:"p"},".data"),", c - ",(0,r.yg)("inlineCode",{parentName:"p"},".stack"),", k - ",(0,r.yg)("inlineCode",{parentName:"p"},".heap"))),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},"a - ",(0,r.yg)("inlineCode",{parentName:"p"},".bss"),", b - ",(0,r.yg)("inlineCode",{parentName:"p"},".bss"),", c - ",(0,r.yg)("inlineCode",{parentName:"p"},".stack"),", k - ",(0,r.yg)("inlineCode",{parentName:"p"},".heap")))),(0,r.yg)("h2",{id:"feedback"},"Feedback"),(0,r.yg)("p",null,"Global initialized variables go to ",(0,r.yg)("inlineCode",{parentName:"p"},".data")," (",(0,r.yg)("inlineCode",{parentName:"p"},"a"),").\nGlobal uninitialized variables go to ",(0,r.yg)("inlineCode",{parentName:"p"},".bss")," (",(0,r.yg)("inlineCode",{parentName:"p"},"b"),").\nNon-static local variables go on the",(0,r.yg)("inlineCode",{parentName:"p"},".stack")," (",(0,r.yg)("inlineCode",{parentName:"p"},"c"),", ",(0,r.yg)("inlineCode",{parentName:"p"},"k"),").\n",(0,r.yg)("inlineCode",{parentName:"p"},"malloc()"),"'ed memory goes on the",(0,r.yg)("inlineCode",{parentName:"p"},".heap"),".\nFor ",(0,r.yg)("inlineCode",{parentName:"p"},"k"),", the pointer is stored on the",(0,r.yg)("inlineCode",{parentName:"p"},".stack"),", but the allocated memory, to which ",(0,r.yg)("inlineCode",{parentName:"p"},"k")," points is stored on the",(0,r.yg)("inlineCode",{parentName:"p"},".heap"),"."))}c.isMDXComponent=!0}}]);