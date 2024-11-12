"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[4363],{5680:(e,t,n)=>{n.d(t,{xA:()=>c,yg:()=>m});var a=n(6540);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=a.createContext({}),p=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},c=function(e){var t=p(e.components);return a.createElement(l.Provider,{value:t},e.children)},u="mdxType",y={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),u=p(n),d=r,m=u["".concat(l,".").concat(d)]||u[d]||y[d]||i;return n?a.createElement(m,o(o({ref:t},c),{},{components:n})):a.createElement(m,o({ref:t},c))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,o=new Array(i);o[0]=d;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[u]="string"==typeof e?e:r,o[1]=s;for(var p=2;p<i;p++)o[p]=n[p];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},4064:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>y,frontMatter:()=>i,metadata:()=>s,toc:()=>p});var a=n(8168),r=(n(6540),n(5680));const i={},o="Header Analysis Application",s={unversionedId:"Exams/Header Analysis Application/header-analysis-application",id:"Exams/Header Analysis Application/header-analysis-application",title:"Header Analysis Application",description:"Scenario",source:"@site/docs/Exams/Header Analysis Application/header-analysis-application.md",sourceDirName:"Exams/Header Analysis Application",slug:"/Exams/Header Analysis Application/header-analysis-application",permalink:"/operating-systems/136/Exams/Header Analysis Application/header-analysis-application",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"Supervisor-type Service",permalink:"/operating-systems/136/Exams/Supervisor-type Service/supervisor-type-service"},next:{title:"Extending an App Manager",permalink:"/operating-systems/136/Exams/Extending an App Manager/extending-an-app-manager"}},l={},p=[{value:"Scenario",id:"scenario",level:2},{value:"Questions",id:"questions",level:2}],c={toc:p},u="wrapper";function y(e){let{components:t,...n}=e;return(0,r.yg)(u,(0,a.A)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,r.yg)("h1",{id:"header-analysis-application"},"Header Analysis Application"),(0,r.yg)("h2",{id:"scenario"},"Scenario"),(0,r.yg)("p",null,"We aim to implement a network packet header analysis application to detect suspicious behaviors from a network security standpoint.\nWe assume the following steps are already implemented sequentially:"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"Packet headers are received through a socket."),(0,r.yg)("li",{parentName:"ul"},"Packet analysis is performed using functions already implemented in a shared library."),(0,r.yg)("li",{parentName:"ul"},"Data about suspicious packets (according to the analysis) are written to an application log file.")),(0,r.yg)("p",null,"All answers should be justified."),(0,r.yg)("h2",{id:"questions"},"Questions"),(0,r.yg)("ol",null,(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},"What specific technologies and concepts do you use to optimize the application (multithreading, multiprocessing, I/O multiplexing, asynchronous operations)?")),(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},"How do you ensure scalability/performance of the application in case the number of packets in the network is very high (network flooding)?")),(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},"How do you ensure uniform data writing to the application analysis log file?"))))}y.isMDXComponent=!0}}]);