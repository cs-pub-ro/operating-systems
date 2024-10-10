"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[5745],{5680:(e,r,t)=>{t.d(r,{xA:()=>p,yg:()=>f});var a=t(6540);function n(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function i(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);r&&(a=a.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,a)}return t}function o(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?i(Object(t),!0).forEach((function(r){n(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function s(e,r){if(null==e)return{};var t,a,n=function(e,r){if(null==e)return{};var t,a,n={},i=Object.keys(e);for(a=0;a<i.length;a++)t=i[a],r.indexOf(t)>=0||(n[t]=e[t]);return n}(e,r);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)t=i[a],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(n[t]=e[t])}return n}var l=a.createContext({}),c=function(e){var r=a.useContext(l),t=r;return e&&(t="function"==typeof e?e(r):o(o({},r),e)),t},p=function(e){var r=c(e.components);return a.createElement(l.Provider,{value:r},e.children)},m="mdxType",u={inlineCode:"code",wrapper:function(e){var r=e.children;return a.createElement(a.Fragment,{},r)}},y=a.forwardRef((function(e,r){var t=e.components,n=e.mdxType,i=e.originalType,l=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),m=c(t),y=n,f=m["".concat(l,".").concat(y)]||m[y]||u[y]||i;return t?a.createElement(f,o(o({ref:r},p),{},{components:t})):a.createElement(f,o({ref:r},p))}));function f(e,r){var t=arguments,n=r&&r.mdxType;if("string"==typeof e||n){var i=t.length,o=new Array(i);o[0]=y;var s={};for(var l in r)hasOwnProperty.call(r,l)&&(s[l]=r[l]);s.originalType=e,s[m]="string"==typeof e?e:n,o[1]=s;for(var c=2;c<i;c++)o[c]=t[c];return a.createElement.apply(null,o)}return a.createElement.apply(null,t)}y.displayName="MDXCreateElement"},9013:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>l,contentTitle:()=>o,default:()=>u,frontMatter:()=>i,metadata:()=>s,toc:()=>c});var a=t(8168),n=(t(6540),t(5680));const i={},o="Library Warmer",s={unversionedId:"Exams/Library Warmer/library-warmer",id:"Exams/Library Warmer/library-warmer",title:"Library Warmer",description:"Scenario",source:"@site/docs/Exams/Library Warmer/library-warmer.md",sourceDirName:"Exams/Library Warmer",slug:"/Exams/Library Warmer/library-warmer",permalink:"/operating-systems/93/Exams/Library Warmer/library-warmer",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"Resource Monitor",permalink:"/operating-systems/93/Exams/Resource Monitor/resource-monitor"},next:{title:"Web GUI 1",permalink:"/operating-systems/93/Exams/Web GUI 1/web-gui-1"}},l={},c=[{value:"Scenario",id:"scenario",level:2},{value:"Questions",id:"questions",level:2}],p={toc:c},m="wrapper";function u(e){let{components:r,...t}=e;return(0,n.yg)(m,(0,a.A)({},p,t,{components:r,mdxType:"MDXLayout"}),(0,n.yg)("h1",{id:"library-warmer"},"Library Warmer"),(0,n.yg)("h2",{id:"scenario"},"Scenario"),(0,n.yg)("p",null,'The concept of "cold start" refers to starting a process for the first time.\nIn this situation, during the initial start-up, the executable of the process, data/configuration files and dynamic libraries used need to be loaded for the first time.\nA "hot/warm start" implies that some of this information is already loaded into memory, resulting in a faster start-up of the process.'),(0,n.yg)("p",null,'We aim to implement an application for "warming up" the start-up of processes by loading the dynamic libraries used by these processes.\nThis system involves a process that loads, according to a strategy, the commonly used libraries of applications to facilitate a "warm start" of the applications.'),(0,n.yg)("p",null,'The "warming up" application will monitor the usage of dynamic libraries in the system by system processes and decide which libraries need to be "warmed up" for future application launches.'),(0,n.yg)("p",null,"All answers should be justified."),(0,n.yg)("h2",{id:"questions"},"Questions"),(0,n.yg)("ol",null,(0,n.yg)("li",{parentName:"ol"},(0,n.yg)("p",{parentName:"li"},"Describe schematically what the components of the heating application are.\nWhat is the execution flow of the application?")),(0,n.yg)("li",{parentName:"ol"},(0,n.yg)("p",{parentName:"li"},"What functionalities does the operating system need to expose in order to efficiently and effectively implement the heating application?")),(0,n.yg)("li",{parentName:"ol"},(0,n.yg)("p",{parentName:"li"},"What configuration interface will the application expose to the user/system administrator?\nWhat will they be able to configure?")),(0,n.yg)("li",{parentName:"ol"},(0,n.yg)("p",{parentName:"li"},"How will you evaluate the use of the heating application?\nWhat will you measure to demonstrate an improvement (or not) compared to the case where you do not use the application?"))))}u.isMDXComponent=!0}}]);