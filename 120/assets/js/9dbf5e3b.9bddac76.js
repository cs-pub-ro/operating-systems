"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[3885],{5680:(e,t,n)=>{n.d(t,{xA:()=>u,yg:()=>m});var r=n(6540);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=r.createContext({}),p=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},u=function(e){var t=p(e.components);return r.createElement(s.Provider,{value:t},e.children)},c="mdxType",y={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,s=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),c=p(n),d=a,m=c["".concat(s,".").concat(d)]||c[d]||y[d]||i;return n?r.createElement(m,o(o({ref:t},u),{},{components:n})):r.createElement(m,o({ref:t},u))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=d;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[c]="string"==typeof e?e:a,o[1]=l;for(var p=2;p<i;p++)o[p]=n[p];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},4992:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>o,default:()=>y,frontMatter:()=>i,metadata:()=>l,toc:()=>p});var r=n(8168),a=(n(6540),n(5680));const i={},o="Stack layout",l={unversionedId:"Data/Questions/stack-layout",id:"Data/Questions/stack-layout",title:"Stack layout",description:"Question Text",source:"@site/docs/Data/Questions/stack-layout.md",sourceDirName:"Data/Questions",slug:"/Data/Questions/stack-layout",permalink:"/operating-systems/120/Data/Questions/stack-layout",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"Stack Protector",permalink:"/operating-systems/120/Data/Questions/memory-stack-protector"},next:{title:"String Buffer Overflow",permalink:"/operating-systems/120/Data/Questions/string-buff-over"}},s={},p=[{value:"Question Text",id:"question-text",level:2},{value:"Question Answers",id:"question-answers",level:2},{value:"Feedback",id:"feedback",level:2}],u={toc:p},c="wrapper";function y(e){let{components:t,...n}=e;return(0,a.yg)(c,(0,r.A)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,a.yg)("h1",{id:"stack-layout"},"Stack layout"),(0,a.yg)("h2",{id:"question-text"},"Question Text"),(0,a.yg)("p",null,"What is the stack layout for the ",(0,a.yg)("inlineCode",{parentName:"p"},"fun")," function in the ",(0,a.yg)("inlineCode",{parentName:"p"},"bo_write.c")," program (starting from a high address)?"),(0,a.yg)("h2",{id:"question-answers"},"Question Answers"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"return address, old ",(0,a.yg)("inlineCode",{parentName:"li"},"rbp"),", maybe some padding, variable ",(0,a.yg)("inlineCode",{parentName:"li"},"a"),", ",(0,a.yg)("inlineCode",{parentName:"li"},"b[0]"),", ",(0,a.yg)("inlineCode",{parentName:"li"},"b[1]"),", ",(0,a.yg)("inlineCode",{parentName:"li"},"b[2]"))),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"return address, old ",(0,a.yg)("inlineCode",{parentName:"li"},"rbp"),", maybe some padding, variable ",(0,a.yg)("inlineCode",{parentName:"li"},"a"),", ",(0,a.yg)("inlineCode",{parentName:"li"},"b[2]"),", ",(0,a.yg)("inlineCode",{parentName:"li"},"b[1]"),", ",(0,a.yg)("inlineCode",{parentName:"li"},"b[0]"))),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},"return address, maybe some padding, variable ",(0,a.yg)("inlineCode",{parentName:"p"},"a"),", ",(0,a.yg)("inlineCode",{parentName:"p"},"b[0]"),", ",(0,a.yg)("inlineCode",{parentName:"p"},"b[1]"),", ",(0,a.yg)("inlineCode",{parentName:"p"},"b[2]"))),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},"return address, old ",(0,a.yg)("inlineCode",{parentName:"p"},"rbp"),", maybe some padding, ",(0,a.yg)("inlineCode",{parentName:"p"},"b[0]"),", ",(0,a.yg)("inlineCode",{parentName:"p"},"b[1]"),", ",(0,a.yg)("inlineCode",{parentName:"p"},"b[2]"),", variable ",(0,a.yg)("inlineCode",{parentName:"p"},"a")))),(0,a.yg)("h2",{id:"feedback"},"Feedback"),(0,a.yg)("p",null,"Look at the assembly code and notice the exact layout."))}y.isMDXComponent=!0}}]);