"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[881],{5680:(e,t,r)=>{r.d(t,{xA:()=>u,yg:()=>g});var n=r(6540);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var l=n.createContext({}),c=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},u=function(e){var t=c(e.components);return n.createElement(l.Provider,{value:t},e.children)},m="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},y=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,l=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),m=c(r),y=o,g=m["".concat(l,".").concat(y)]||m[y]||p[y]||a;return r?n.createElement(g,i(i({ref:t},u),{},{components:r})):n.createElement(g,i({ref:t},u))}));function g(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,i=new Array(a);i[0]=y;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[m]="string"==typeof e?e:o,i[1]=s;for(var c=2;c<a;c++)i[c]=r[c];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}y.displayName="MDXCreateElement"},9033:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>p,frontMatter:()=>a,metadata:()=>s,toc:()=>c});var n=r(8168),o=(r(6540),r(5680));const a={},i="Resource Monitor",s={unversionedId:"Exams/Resource Monitor/resource-monitor",id:"Exams/Resource Monitor/resource-monitor",title:"Resource Monitor",description:"Scenario",source:"@site/docs/Exams/Resource Monitor/resource-monitor.md",sourceDirName:"Exams/Resource Monitor",slug:"/Exams/Resource Monitor/resource-monitor",permalink:"/operating-systems/80/Exams/Resource Monitor/resource-monitor",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"Intrusion Detection System",permalink:"/operating-systems/80/Exams/Intrusion Detection System/intrusion-detection-system"},next:{title:"Library Warmer",permalink:"/operating-systems/80/Exams/Library Warmer/library-warmer"}},l={},c=[{value:"Scenario",id:"scenario",level:2},{value:"Questions",id:"questions",level:2}],u={toc:c},m="wrapper";function p(e){let{components:t,...r}=e;return(0,o.yg)(m,(0,n.A)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,o.yg)("h1",{id:"resource-monitor"},"Resource Monitor"),(0,o.yg)("h2",{id:"scenario"},"Scenario"),(0,o.yg)("p",null,"We aim to build a solution to monitor resource usage in computer systems within a network.\nOn each system, an agent process runs, collecting information locally and transmitting it to a master process running on a dedicated system.\nThe master process is responsible for sending configurations to the agents and reporting resource (ab)use issues to the administrator or commanding actions for the agents to perform.\nThe implementation of the agents should be as portable as possible to allow them to run on various platforms/operating systems."),(0,o.yg)("p",null,"All answers should be justified."),(0,o.yg)("h2",{id:"questions"},"Questions"),(0,o.yg)("ol",null,(0,o.yg)("li",{parentName:"ol"},(0,o.yg)("p",{parentName:"li"},"What resources/information will agents collect to report the overall system status?\nHow will the configuration that the master process will transmit to the agents look like, schematically?")),(0,o.yg)("li",{parentName:"ol"},(0,o.yg)("p",{parentName:"li"},"Could you describe the design and implementation idea of an agent?")),(0,o.yg)("li",{parentName:"ol"},(0,o.yg)("p",{parentName:"li"},"Could you describe the design and implementation idea of the master process?")),(0,o.yg)("li",{parentName:"ol"},(0,o.yg)("p",{parentName:"li"},"Describe schematically the communication protocol between agent and master: what information is transferred, at what intervals, on what triggers, what happens when there are network issues, or when an agent or master fails?"))))}p.isMDXComponent=!0}}]);