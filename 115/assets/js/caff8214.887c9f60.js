"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[3882],{5680:(e,t,r)=>{r.d(t,{xA:()=>u,yg:()=>f});var n=r(6540);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var l=n.createContext({}),c=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},u=function(e){var t=c(e.components);return n.createElement(l.Provider,{value:t},e.children)},p="mdxType",y={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),p=c(r),m=a,f=p["".concat(l,".").concat(m)]||p[m]||y[m]||o;return r?n.createElement(f,i(i({ref:t},u),{},{components:r})):n.createElement(f,i({ref:t},u))}));function f(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,i=new Array(o);i[0]=m;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[p]="string"==typeof e?e:a,i[1]=s;for(var c=2;c<o;c++)i[c]=r[c];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},100:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>y,frontMatter:()=>o,metadata:()=>s,toc:()=>c});var n=r(8168),a=(r(6540),r(5680));const o={},i="Stack Protector",s={unversionedId:"Data/Questions/memory-stack-protector",id:"Data/Questions/memory-stack-protector",title:"Stack Protector",description:"Question Text",source:"@site/docs/Data/Questions/memory-stack-protector.md",sourceDirName:"Data/Questions",slug:"/Data/Questions/memory-stack-protector",permalink:"/operating-systems/115/Data/Questions/memory-stack-protector",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"Variables in memory regions",permalink:"/operating-systems/115/Data/Questions/memory-regions-vars"},next:{title:"Stack layout",permalink:"/operating-systems/115/Data/Questions/stack-layout"}},l={},c=[{value:"Question Text",id:"question-text",level:2},{value:"Question Answers",id:"question-answers",level:2},{value:"Feedback",id:"feedback",level:2}],u={toc:c},p="wrapper";function y(e){let{components:t,...r}=e;return(0,a.yg)(p,(0,n.A)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,a.yg)("h1",{id:"stack-protector"},"Stack Protector"),(0,a.yg)("h2",{id:"question-text"},"Question Text"),(0,a.yg)("p",null,"For the ",(0,a.yg)("inlineCode",{parentName:"p"},"support/memory-security/bo_write_practice")," executable we are not able overwrite the ",(0,a.yg)("inlineCode",{parentName:"p"},"s")," variable no matter the input.\nWhy is that?"),(0,a.yg)("h2",{id:"question-answers"},"Question Answers"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("inlineCode",{parentName:"li"},"s")," needs to be declared after ",(0,a.yg)("inlineCode",{parentName:"li"},"buffer"),".")),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"when using the stack canary, the buffer is always placed right below it.")),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},"due to ASLR, the address of ",(0,a.yg)("inlineCode",{parentName:"p"},"s")," is random.")),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},"the stack canary makes it impossible to overwrite local variables."))),(0,a.yg)("h2",{id:"feedback"},"Feedback"),(0,a.yg)("p",null,"When using the canary, to minimize the damage a buffer overflow could cause, the buffers are always placed right below the canary.\nBy doing so, a buffer overflow will not overwrite anything.\nHowever, it is still possible to overwrite other local buffers, provided that a function declares more than 1 array or if we use the pointer directly."))}y.isMDXComponent=!0}}]);