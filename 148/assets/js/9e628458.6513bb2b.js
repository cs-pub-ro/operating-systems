"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[9954],{5680:(e,t,n)=>{n.d(t,{xA:()=>u,yg:()=>m});var r=n(6540);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=r.createContext({}),p=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},u=function(e){var t=p(e.components);return r.createElement(l.Provider,{value:t},e.children)},c="mdxType",f={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},y=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,l=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),c=p(n),y=o,m=c["".concat(l,".").concat(y)]||c[y]||f[y]||i;return n?r.createElement(m,a(a({ref:t},u),{},{components:n})):r.createElement(m,a({ref:t},u))}));function m(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,a=new Array(i);a[0]=y;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[c]="string"==typeof e?e:o,a[1]=s;for(var p=2;p<i;p++)a[p]=n[p];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}y.displayName="MDXCreateElement"},3478:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>a,default:()=>f,frontMatter:()=>i,metadata:()=>s,toc:()=>p});var r=n(8168),o=(n(6540),n(5680));const i={},a="Sleeping on a Fiber",s={unversionedId:"Compute/Questions/sleeping-on-a-fiber",id:"Compute/Questions/sleeping-on-a-fiber",title:"Sleeping on a Fiber",description:"Question Text",source:"@site/docs/Compute/Questions/sleeping-on-a-fiber.md",sourceDirName:"Compute/Questions",slug:"/Compute/Questions/sleeping-on-a-fiber",permalink:"/operating-systems/148/Compute/Questions/sleeping-on-a-fiber",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"Parent of `sleep` Processes",permalink:"/operating-systems/148/Compute/Questions/parent-of-sleep-processes"},next:{title:"Fiber Strace",permalink:"/operating-systems/148/Compute/Questions/fiber-strace"}},l={},p=[{value:"Question Text",id:"question-text",level:2},{value:"Question Answers",id:"question-answers",level:2},{value:"Feedback",id:"feedback",level:2}],u={toc:p},c="wrapper";function f(e){let{components:t,...n}=e;return(0,o.yg)(c,(0,r.A)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,o.yg)("h1",{id:"sleeping-on-a-fiber"},"Sleeping on a Fiber"),(0,o.yg)("h2",{id:"question-text"},"Question Text"),(0,o.yg)("p",null,"What happens if a fiber calls ",(0,o.yg)("inlineCode",{parentName:"p"},"sleep()"),"?"),(0,o.yg)("h2",{id:"question-answers"},"Question Answers"),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},"the whole kernel-level thread is blocked")),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("p",{parentName:"li"},"only that fiber is blocked, and is scheduled out")),(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("p",{parentName:"li"},"nothing, a fiber can't sleep")),(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("p",{parentName:"li"},"the whole process sleeps - regardless of how many threads there are"))),(0,o.yg)("h2",{id:"feedback"},"Feedback"),(0,o.yg)("p",null,"The whole thread on which the fiber runs is blocked until the ",(0,o.yg)("inlineCode",{parentName:"p"},"sleep()")," call is finished.\nFor this reason, the fibers are best used with asynchronous operations, which you will explore in the following weeks."))}f.isMDXComponent=!0}}]);