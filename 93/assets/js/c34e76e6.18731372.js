"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[9026],{5680:(e,t,r)=>{r.d(t,{xA:()=>c,yg:()=>y});var n=r(6540);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var l=n.createContext({}),p=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},c=function(e){var t=p(e.components);return n.createElement(l.Provider,{value:t},e.children)},u="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},g=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,i=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),u=p(r),g=a,y=u["".concat(l,".").concat(g)]||u[g]||m[g]||i;return r?n.createElement(y,o(o({ref:t},c),{},{components:r})):n.createElement(y,o({ref:t},c))}));function y(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=r.length,o=new Array(i);o[0]=g;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[u]="string"==typeof e?e:a,o[1]=s;for(var p=2;p<i;p++)o[p]=r[p];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}g.displayName="MDXCreateElement"},7182:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>m,frontMatter:()=>i,metadata:()=>s,toc:()=>p});var n=r(8168),a=(r(6540),r(5680));const i={},o="Web GUI 2",s={unversionedId:"Exams/Web GUI 2/web-gui-2",id:"Exams/Web GUI 2/web-gui-2",title:"Web GUI 2",description:"Scenario",source:"@site/docs/Exams/Web GUI 2/web-gui-2.md",sourceDirName:"Exams/Web GUI 2",slug:"/Exams/Web GUI 2/web-gui-2",permalink:"/operating-systems/93/Exams/Web GUI 2/web-gui-2",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"Web GUI 1",permalink:"/operating-systems/93/Exams/Web GUI 1/web-gui-1"},next:{title:"Memory Deduplication",permalink:"/operating-systems/93/Exams/Memory Deduplication/memory-deduplication"}},l={},p=[{value:"Scenario",id:"scenario",level:2},{value:"Questions",id:"questions",level:2}],c={toc:p},u="wrapper";function m(e){let{components:t,...r}=e;return(0,a.yg)(u,(0,n.A)({},c,r,{components:t,mdxType:"MDXLayout"}),(0,a.yg)("h1",{id:"web-gui-2"},"Web GUI 2"),(0,a.yg)("h2",{id:"scenario"},"Scenario"),(0,a.yg)("p",null,(0,a.yg)("inlineCode",{parentName:"p"},"Node.js")," is a programming platform that exposes the JavaScript language for programs of any kind, not just for the browser.\nThis platform has several important properties:"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"It provides programmers access to most functions offered by the operating system libraries."),(0,a.yg)("li",{parentName:"ul"},"It offers programmers a single execution thread."),(0,a.yg)("li",{parentName:"ul"},"It provides programmers with a method to add native libraries.")),(0,a.yg)("p",null,"All answers should be justified."),(0,a.yg)("h2",{id:"questions"},"Questions"),(0,a.yg)("ol",null,(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},(0,a.yg)("inlineCode",{parentName:"p"},"Node.js")," supports concurrency (simulating parallelism), which is why it is used for writing web servers.\nExplain how the platform's engine achieves this.")),(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"When using ",(0,a.yg)("inlineCode",{parentName:"p"},"Node.js"),", what are the restrictions (in terms of interacting with the operating system)?")),(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"Propose an improvement to the platform to support parallelism (parallel processing).\nTake into account that the JavaScript engine (V8) can only execute JavaScript code on a single thread.\nYou cannot modify the V8 engine.")),(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"Answer one of the following:"))),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("inlineCode",{parentName:"li"},"Node.js")," (V8) uses a Just-in-time compiler, compiling the most frequently used parts of JavaScript code for the processor.\nDescribe the architecture of this system and explain how it interacts with the operating system on the computer it runs on."),(0,a.yg)("li",{parentName:"ul"},"Explain the necessity of using trait bounds in Rust.")))}m.isMDXComponent=!0}}]);