"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[805],{5680:(e,t,n)=>{n.d(t,{xA:()=>c,yg:()=>y});var r=n(6540);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=r.createContext({}),p=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},c=function(e){var t=p(e.components);return r.createElement(l.Provider,{value:t},e.children)},u="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},g=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),u=p(n),g=a,y=u["".concat(l,".").concat(g)]||u[g]||m[g]||i;return n?r.createElement(y,o(o({ref:t},c),{},{components:n})):r.createElement(y,o({ref:t},c))}));function y(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=g;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[u]="string"==typeof e?e:a,o[1]=s;for(var p=2;p<i;p++)o[p]=n[p];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}g.displayName="MDXCreateElement"},3175:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>m,frontMatter:()=>i,metadata:()=>s,toc:()=>p});var r=n(8168),a=(n(6540),n(5680));const i={},o="FaaS Application",s={unversionedId:"Exams/FaaS Application/faas-application",id:"Exams/FaaS Application/faas-application",title:"FaaS Application",description:"Scenario",source:"@site/docs/Exams/FaaS Application/faas-application.md",sourceDirName:"Exams/FaaS Application",slug:"/Exams/FaaS Application/faas-application",permalink:"/operating-systems/116/Exams/FaaS Application/faas-application",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"Network Configurations Manager",permalink:"/operating-systems/116/Exams/Network Configurations Manager/network-configurations-manager"},next:{title:"Industrial System",permalink:"/operating-systems/116/Exams/Industrial System/industrial-system"}},l={},p=[{value:"Scenario",id:"scenario",level:2},{value:"Questions",id:"questions",level:2}],c={toc:p},u="wrapper";function m(e){let{components:t,...n}=e;return(0,a.yg)(u,(0,r.A)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,a.yg)("h1",{id:"faas-application"},"FaaS Application"),(0,a.yg)("h2",{id:"scenario"},"Scenario"),(0,a.yg)("p",null,"We aim to implement a Function as a Service (FaaS) type service.\nThis service exposes a REST network API.\nWith this API, network clients can order the remote execution of programs.\nA client sends the program written in a given programming language to be remotely executed, along with the program's arguments.\nThe FaaS service runs the program and transmits the result to the client."),(0,a.yg)("p",null,'Respond to the following questions with "True" or "False" and justify the answer.\nThe justification should be simple, 2-3 sentences for each response.'),(0,a.yg)("h2",{id:"questions"},"Questions"),(0,a.yg)("ol",null,(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"The service uses shared memory to interact with clients.\nAnswer: False")),(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"The service can run distributed, with client requests being redirected to multiple execution systems.\nAnswer: True")),(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"For security reasons, programs (functions) are executed in isolated contexts, within containers or virtual machines.\nAnswer: True")),(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"In handling requests, the service will benefit from an implementation with a thread pool.\nAnswer: True")),(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"During its execution, the service does NOT generate involuntary context switches.\nAnswer: False")),(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"Among processor, memory, network, and disk resources, the service uses the least disk.\nAnswer: True")),(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"The service does NOT consume file descriptors outside of the standard descriptors 0, 1 and 2.\nAnswer: False")),(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"The service would lead to significant performance improvements if implemented in a low-level language like C compared to a high-level one like Python.\nAnswer: False")),(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"To serve requests and execute programs sent by clients, the service will start new processes.\nAnswer: True")),(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"During the execution of the service, NO hardware interrupts are generated.\nAnswer: False")),(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"The service can only operate on a Linux operating system.\nAnswer: False"))))}m.isMDXComponent=!0}}]);