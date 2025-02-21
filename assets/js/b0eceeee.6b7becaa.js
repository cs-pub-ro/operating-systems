"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[7657],{4967:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>a,default:()=>y,frontMatter:()=>i,metadata:()=>s,toc:()=>u});var n=r(8168),o=(r(6540),r(5680));const i={},a="Cause of `bind()` Error",s={unversionedId:"IO/Questions/bind-error-cause",id:"IO/Questions/bind-error-cause",title:"Cause of `bind()` Error",description:"Question Text",source:"@site/docs/IO/Questions/bind-error-cause.md",sourceDirName:"IO/Questions",slug:"/IO/Questions/bind-error-cause",permalink:"/operating-systems/IO/Questions/bind-error-cause",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"Questions",permalink:"/operating-systems/IO/Questions/"},next:{title:"Limitation of Anonymous Pipes",permalink:"/operating-systems/IO/Questions/anonymous-pipes-limitation"}},l={},u=[{value:"Question Text",id:"question-text",level:2},{value:"Question Answers",id:"question-answers",level:2},{value:"Feedback",id:"feedback",level:2}],c={toc:u},p="wrapper";function y(e){let{components:t,...r}=e;return(0,o.yg)(p,(0,n.A)({},c,r,{components:t,mdxType:"MDXLayout"}),(0,o.yg)("h1",{id:"cause-of-bind-error"},"Cause of ",(0,o.yg)("inlineCode",{parentName:"h1"},"bind()")," Error"),(0,o.yg)("h2",{id:"question-text"},"Question Text"),(0,o.yg)("p",null,"While ",(0,o.yg)("inlineCode",{parentName:"p"},"receiver.py")," is still running, run it again from another terminal.\nYou will get an error.\nWhat is its cause?"),(0,o.yg)("h2",{id:"question-answers"},"Question Answers"),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},"the IP ",(0,o.yg)("inlineCode",{parentName:"li"},"127.0.0.1")," is already used by ",(0,o.yg)("inlineCode",{parentName:"li"},"receive.py"))),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},"the port 5000 is already used (by ",(0,o.yg)("inlineCode",{parentName:"li"},"receive.py"),")")),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("p",{parentName:"li"},"a port may not be used multiple times by the same process")),(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("p",{parentName:"li"},"the socket was not created correctly"))),(0,o.yg)("h2",{id:"feedback"},"Feedback"),(0,o.yg)("p",null,"One port may only be bound to ",(0,o.yg)("strong",{parentName:"p"},"one socket")," at a time.\nThe fact that it's the same program (same source code) using it is irrelevant because they're different processes."))}y.isMDXComponent=!0},5680:(e,t,r)=>{r.d(t,{xA:()=>c,yg:()=>d});var n=r(6540);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function a(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var l=n.createContext({}),u=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):a(a({},t),e)),r},c=function(e){var t=u(e.components);return n.createElement(l.Provider,{value:t},e.children)},p="mdxType",y={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,i=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),p=u(r),m=o,d=p["".concat(l,".").concat(m)]||p[m]||y[m]||i;return r?n.createElement(d,a(a({ref:t},c),{},{components:r})):n.createElement(d,a({ref:t},c))}));function d(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=r.length,a=new Array(i);a[0]=m;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[p]="string"==typeof e?e:o,a[1]=s;for(var u=2;u<i;u++)a[u]=r[u];return n.createElement.apply(null,a)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"}}]);