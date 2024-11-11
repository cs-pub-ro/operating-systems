"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[6159],{5680:(e,t,r)=>{r.d(t,{xA:()=>p,yg:()=>f});var n=r(6540);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var l=n.createContext({}),c=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):s(s({},t),e)),r},p=function(e){var t=c(e.components);return n.createElement(l.Provider,{value:t},e.children)},u="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},y=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,l=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),u=c(r),y=o,f=u["".concat(l,".").concat(y)]||u[y]||m[y]||a;return r?n.createElement(f,s(s({ref:t},p),{},{components:r})):n.createElement(f,s({ref:t},p))}));function f(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,s=new Array(a);s[0]=y;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i[u]="string"==typeof e?e:o,s[1]=i;for(var c=2;c<a;c++)s[c]=r[c];return n.createElement.apply(null,s)}return n.createElement.apply(null,r)}y.displayName="MDXCreateElement"},3024:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>s,default:()=>m,frontMatter:()=>a,metadata:()=>i,toc:()=>c});var n=r(8168),o=(r(6540),r(5680));const a={},s="Who Calls `execve` in the Log of the Parent Process?",i={unversionedId:"Compute/Questions/who-calls-execve-parent",id:"Compute/Questions/who-calls-execve-parent",title:"Who Calls `execve` in the Log of the Parent Process?",description:"Question Text",source:"@site/docs/Compute/Questions/who-calls-execve-parent.md",sourceDirName:"Compute/Questions",slug:"/Compute/Questions/who-calls-execve-parent",permalink:"/operating-systems/120/Compute/Questions/who-calls-execve-parent",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"Process Creation",permalink:"/operating-systems/120/Compute/Questions/process-creation"},next:{title:"exec()` Without `fork()",permalink:"/operating-systems/120/Compute/Questions/exec-without-fork"}},l={},c=[{value:"Question Text",id:"question-text",level:2},{value:"Question Answers",id:"question-answers",level:2},{value:"Feedback",id:"feedback",level:2}],p={toc:c},u="wrapper";function m(e){let{components:t,...r}=e;return(0,o.yg)(u,(0,n.A)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,o.yg)("h1",{id:"who-calls-execve-in-the-log-of-the-parent-process"},"Who Calls ",(0,o.yg)("inlineCode",{parentName:"h1"},"execve")," in the Log of the Parent Process?"),(0,o.yg)("h2",{id:"question-text"},"Question Text"),(0,o.yg)("p",null,"Which process calls ",(0,o.yg)("inlineCode",{parentName:"p"},'execve("sleepy_creator", ["sleepy_creator"], ...)'),", that you found in the log of the parent process?"),(0,o.yg)("h2",{id:"question-answers"},"Question Answers"),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("p",{parentName:"li"},"The kernel because that's where the loader is located")),(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("p",{parentName:"li"},"The loader because it is the loader who creates new processes")),(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("p",{parentName:"li"},"The C runtime because this is the C interpreter"))),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("inlineCode",{parentName:"li"},"bash")," because we run ",(0,o.yg)("inlineCode",{parentName:"li"},"sleepy_creator")," from terminal, i.e. from ",(0,o.yg)("inlineCode",{parentName:"li"},"bash"))),(0,o.yg)("h2",{id:"feedback"},"Feedback"),(0,o.yg)("p",null,"All processes spawned from the command-line are children of the current ",(0,o.yg)("inlineCode",{parentName:"p"},"bash")," process."))}m.isMDXComponent=!0}}]);