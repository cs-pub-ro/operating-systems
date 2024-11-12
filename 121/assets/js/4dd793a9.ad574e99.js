"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[6198],{5680:(e,t,r)=>{r.d(t,{xA:()=>c,yg:()=>g});var n=r(6540);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var l=n.createContext({}),p=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},c=function(e){var t=p(e.components);return n.createElement(l.Provider,{value:t},e.children)},u="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},y=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,i=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),u=p(r),y=a,g=u["".concat(l,".").concat(y)]||u[y]||m[y]||i;return r?n.createElement(g,o(o({ref:t},c),{},{components:r})):n.createElement(g,o({ref:t},c))}));function g(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=r.length,o=new Array(i);o[0]=y;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[u]="string"==typeof e?e:a,o[1]=s;for(var p=2;p<i;p++)o[p]=r[p];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}y.displayName="MDXCreateElement"},2114:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>m,frontMatter:()=>i,metadata:()=>s,toc:()=>p});var n=r(8168),a=(r(6540),r(5680));const i={},o="Web GUI 1",s={unversionedId:"Exams/Web GUI 1/web-gui-1",id:"Exams/Web GUI 1/web-gui-1",title:"Web GUI 1",description:"Scenario",source:"@site/docs/Exams/Web GUI 1/web-gui-1.md",sourceDirName:"Exams/Web GUI 1",slug:"/Exams/Web GUI 1/web-gui-1",permalink:"/operating-systems/121/Exams/Web GUI 1/web-gui-1",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"Library Warmer",permalink:"/operating-systems/121/Exams/Library Warmer/library-warmer"},next:{title:"Web GUI 2",permalink:"/operating-systems/121/Exams/Web GUI 2/web-gui-2"}},l={},p=[{value:"Scenario",id:"scenario",level:2},{value:"Questions",id:"questions",level:2}],c={toc:p},u="wrapper";function m(e){let{components:t,...r}=e;return(0,a.yg)(u,(0,n.A)({},c,r,{components:t,mdxType:"MDXLayout"}),(0,a.yg)("h1",{id:"web-gui-1"},"Web GUI 1"),(0,a.yg)("h2",{id:"scenario"},"Scenario"),(0,a.yg)("p",null,"Since most graphical interfaces today are implemented as browser-based applications, we want to create a system that allows the use of web technologies (HTML/CSS/JavaScript) to build applications that run directly on the operating system.\nThe idea is to unify the way graphical interface applications are written, so there is no need to rewrite applications for each platform."),(0,a.yg)("p",null,"We start from the following premises:"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"Each operating system has its own libraries for graphical interfaces, which can display web pages and run JavaScript code."),(0,a.yg)("li",{parentName:"ul"},"Applications do not necessarily have to be written in a single programming language."),(0,a.yg)("li",{parentName:"ul"},"No one wants to write applications in C/C++.")),(0,a.yg)("p",null,"All answers should be justified."),(0,a.yg)("h2",{id:"questions"},"Questions"),(0,a.yg)("ol",null,(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"Propose an architecture for such a system so that any kind of desktop application can be written.\nDescribe the general components and their interaction.\nApplications should be able to access system resources.")),(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"We want to add the possibility of having threads in the application.\nPropose an architecture for this.")),(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"Propose a mechanism that will allow the use of async and await primitives for functions that interact with the operating system.")),(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"Answer one of the two options:"))),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"What security elements should we be aware of when implementing such a system?"),(0,a.yg)("li",{parentName:"ul"},"Explain the necessity of using lifetimes in Rust.")))}m.isMDXComponent=!0}}]);