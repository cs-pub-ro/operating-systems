"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[2573],{5680:(e,t,r)=>{r.d(t,{xA:()=>l,yg:()=>f});var n=r(6540);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function s(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?s(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):s(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function a(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},s=Object.keys(e);for(n=0;n<s.length;n++)r=s[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(n=0;n<s.length;n++)r=s[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var u=n.createContext({}),c=function(e){var t=n.useContext(u),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},l=function(e){var t=c(e.components);return n.createElement(u.Provider,{value:t},e.children)},p="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},y=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,s=e.originalType,u=e.parentName,l=a(e,["components","mdxType","originalType","parentName"]),p=c(r),y=o,f=p["".concat(u,".").concat(y)]||p[y]||m[y]||s;return r?n.createElement(f,i(i({ref:t},l),{},{components:r})):n.createElement(f,i({ref:t},l))}));function f(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var s=r.length,i=new Array(s);i[0]=y;var a={};for(var u in t)hasOwnProperty.call(t,u)&&(a[u]=t[u]);a.originalType=e,a[p]="string"==typeof e?e:o,i[1]=a;for(var c=2;c<s;c++)i[c]=r[c];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}y.displayName="MDXCreateElement"},3741:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>u,contentTitle:()=>i,default:()=>m,frontMatter:()=>s,metadata:()=>a,toc:()=>c});var n=r(8168),o=(r(6540),r(5680));const s={},i="Process Creation",a={unversionedId:"Compute/Questions/process-creation",id:"Compute/Questions/process-creation",title:"Process Creation",description:"Question Text",source:"@site/docs/Compute/Questions/process-creation.md",sourceDirName:"Compute/Questions",slug:"/Compute/Questions/process-creation",permalink:"/operating-systems/148/Compute/Questions/process-creation",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"Cause of `FileNotFoundError`",permalink:"/operating-systems/148/Compute/Questions/cause-of-file-not-found-error"},next:{title:"Who Calls `execve` in the Log of the Parent Process?",permalink:"/operating-systems/148/Compute/Questions/who-calls-execve-parent"}},u={},c=[{value:"Question Text",id:"question-text",level:2},{value:"Question Answers",id:"question-answers",level:2}],l={toc:c},p="wrapper";function m(e){let{components:t,...r}=e;return(0,o.yg)(p,(0,n.A)({},l,r,{components:t,mdxType:"MDXLayout"}),(0,o.yg)("h1",{id:"process-creation"},"Process Creation"),(0,o.yg)("h2",{id:"question-text"},"Question Text"),(0,o.yg)("p",null,"At what stage is a new process created?"),(0,o.yg)("h2",{id:"question-answers"},"Question Answers"),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},"At load time")),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("p",{parentName:"li"},"At link time")),(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("p",{parentName:"li"},"At runtime")),(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("p",{parentName:"li"},"At compile time"))))}m.isMDXComponent=!0}}]);