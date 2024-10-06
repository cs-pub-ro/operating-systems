"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[3383],{5680:(e,r,t)=>{t.d(r,{xA:()=>c,yg:()=>v});var n=t(6540);function s(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function i(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function a(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?i(Object(t),!0).forEach((function(r){s(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function o(e,r){if(null==e)return{};var t,n,s=function(e,r){if(null==e)return{};var t,n,s={},i=Object.keys(e);for(n=0;n<i.length;n++)t=i[n],r.indexOf(t)>=0||(s[t]=e[t]);return s}(e,r);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)t=i[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(s[t]=e[t])}return s}var p=n.createContext({}),l=function(e){var r=n.useContext(p),t=r;return e&&(t="function"==typeof e?e(r):a(a({},r),e)),t},c=function(e){var r=l(e.components);return n.createElement(p.Provider,{value:r},e.children)},u="mdxType",y={inlineCode:"code",wrapper:function(e){var r=e.children;return n.createElement(n.Fragment,{},r)}},m=n.forwardRef((function(e,r){var t=e.components,s=e.mdxType,i=e.originalType,p=e.parentName,c=o(e,["components","mdxType","originalType","parentName"]),u=l(t),m=s,v=u["".concat(p,".").concat(m)]||u[m]||y[m]||i;return t?n.createElement(v,a(a({ref:r},c),{},{components:t})):n.createElement(v,a({ref:r},c))}));function v(e,r){var t=arguments,s=r&&r.mdxType;if("string"==typeof e||s){var i=t.length,a=new Array(i);a[0]=m;var o={};for(var p in r)hasOwnProperty.call(r,p)&&(o[p]=r[p]);o.originalType=e,o[u]="string"==typeof e?e:s,a[1]=o;for(var l=2;l<i;l++)a[l]=t[l];return n.createElement.apply(null,a)}return n.createElement.apply(null,t)}m.displayName="MDXCreateElement"},5655:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>p,contentTitle:()=>a,default:()=>y,frontMatter:()=>i,metadata:()=>o,toc:()=>l});var n=t(8168),s=(t(6540),t(5680));const i={},a="Supervisor-type Service",o={unversionedId:"Exams/Supervisor-type Service/supervisor-type-service",id:"Exams/Supervisor-type Service/supervisor-type-service",title:"Supervisor-type Service",description:"Scenario",source:"@site/docs/Exams/Supervisor-type Service/supervisor-type-service.md",sourceDirName:"Exams/Supervisor-type Service",slug:"/Exams/Supervisor-type Service/supervisor-type-service",permalink:"/operating-systems/78/Exams/Supervisor-type Service/supervisor-type-service",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"Blockchain System",permalink:"/operating-systems/78/Exams/Blockchain System/blockchain-system"},next:{title:"Header Analysis Application",permalink:"/operating-systems/78/Exams/Header Analysis Application/header-analysis-application"}},p={},l=[{value:"Scenario",id:"scenario",level:2},{value:"Questions",id:"questions",level:2}],c={toc:l},u="wrapper";function y(e){let{components:r,...t}=e;return(0,s.yg)(u,(0,n.A)({},c,t,{components:r,mdxType:"MDXLayout"}),(0,s.yg)("h1",{id:"supervisor-type-service"},"Supervisor-type Service"),(0,s.yg)("h2",{id:"scenario"},"Scenario"),(0,s.yg)("p",null,"A supervisor-type service is one used to start, stop, restart, and control other processes/services.\nBased on a configuration, the supervisor can start, stop, restart, or report the status of other services it controls.\nAdditionally, the supervisor can monitor the status of a process and restart it if it terminates erroneously (e.g., due to a segmentation fault or other exception, or forced termination with a signal)."),(0,s.yg)("p",null,"We aim to implement a supervisor-type service.\nIt will have one or more configuration files and a control program that users will use to send commands to the service: ",(0,s.yg)("inlineCode",{parentName:"p"},"start"),", ",(0,s.yg)("inlineCode",{parentName:"p"},"stop"),", ",(0,s.yg)("inlineCode",{parentName:"p"},"restart"),", ",(0,s.yg)("inlineCode",{parentName:"p"},"status"),", ",(0,s.yg)("inlineCode",{parentName:"p"},"read_conf"),", ",(0,s.yg)("inlineCode",{parentName:"p"},"list"),"."),(0,s.yg)("p",null,'Answer the following questions with "True" or "False" and justify your answer.\nThe justification should be simple, 2-3 sentences for each answer.'),(0,s.yg)("h2",{id:"questions"},"Questions"),(0,s.yg)("ol",null,(0,s.yg)("li",{parentName:"ol"},(0,s.yg)("p",{parentName:"li"},"The service can be implemented and run only on POSIX/UNIX systems.\nAnswer: False")),(0,s.yg)("li",{parentName:"ol"},(0,s.yg)("p",{parentName:"li"},"The service starts/restarts other processes through ",(0,s.yg)("inlineCode",{parentName:"p"},"fork()"),"/",(0,s.yg)("inlineCode",{parentName:"p"},"exec()")," calls (or equivalents).\nAnswer: True")),(0,s.yg)("li",{parentName:"ol"},(0,s.yg)("p",{parentName:"li"},"Communication between the control program and the supervisor-type service can be done via UNIX sockets.\nAnswer: True")),(0,s.yg)("li",{parentName:"ol"},(0,s.yg)("p",{parentName:"li"},"The service must run in privileged mode (with root privileges).\nAnswer: False")),(0,s.yg)("li",{parentName:"ol"},(0,s.yg)("p",{parentName:"li"},"The service will be able to stop processes started through commands transmitted via pipes.\nAnswer: False")),(0,s.yg)("li",{parentName:"ol"},(0,s.yg)("p",{parentName:"li"},"The service will be able to detect the erroneous termination of started processes through a ",(0,s.yg)("inlineCode",{parentName:"p"},"wait()"),"/",(0,s.yg)("inlineCode",{parentName:"p"},"waitpid()")," call.\nAnswer: True")),(0,s.yg)("li",{parentName:"ol"},(0,s.yg)("p",{parentName:"li"},"Two or more supervisor-type services can coexist on the same system.\nAnswer: True")),(0,s.yg)("li",{parentName:"ol"},(0,s.yg)("p",{parentName:"li"},"The service is a CPU-intensive process.\nAnswer: False")),(0,s.yg)("li",{parentName:"ol"},(0,s.yg)("p",{parentName:"li"},"The services started by the supervisor service can coexist as threads of the supervisor process.\nAnswer: False")),(0,s.yg)("li",{parentName:"ol"},(0,s.yg)("p",{parentName:"li"},"The service can configure the started processes to have standard descriptors redirected to a ",(0,s.yg)("inlineCode",{parentName:"p"},"/dev/null"),"-like input.\nAnswer: True")),(0,s.yg)("li",{parentName:"ol"},(0,s.yg)("p",{parentName:"li"},"The service can memory-map the configuration file.\nAnswer: True"))))}y.isMDXComponent=!0}}]);