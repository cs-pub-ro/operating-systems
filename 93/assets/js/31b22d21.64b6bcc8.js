"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[9462],{5680:(e,t,n)=>{n.d(t,{xA:()=>g,yg:()=>y});var a=n(6540);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=a.createContext({}),p=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},g=function(e){var t=p(e.components);return a.createElement(l.Provider,{value:t},e.children)},c="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,l=e.parentName,g=s(e,["components","mdxType","originalType","parentName"]),c=p(n),m=r,y=c["".concat(l,".").concat(m)]||c[m]||u[m]||i;return n?a.createElement(y,o(o({ref:t},g),{},{components:n})):a.createElement(y,o({ref:t},g))}));function y(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,o=new Array(i);o[0]=m;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[c]="string"==typeof e?e:r,o[1]=s;for(var p=2;p<i;p++)o[p]=n[p];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},7215:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>u,frontMatter:()=>i,metadata:()=>s,toc:()=>p});var a=n(8168),r=(n(6540),n(5680));const i={},o="Aggregator Application",s={unversionedId:"Exams/Aggregator Application/aggregator-application",id:"Exams/Aggregator Application/aggregator-application",title:"Aggregator Application",description:"Scenario",source:"@site/docs/Exams/Aggregator Application/aggregator-application.md",sourceDirName:"Exams/Aggregator Application",slug:"/Exams/Aggregator Application/aggregator-application",permalink:"/operating-systems/93/Exams/Aggregator Application/aggregator-application",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"Distributed System",permalink:"/operating-systems/93/Exams/Distributed System/distributed-system"},next:{title:"Benchmarking Application",permalink:"/operating-systems/93/Exams/Benchmarking Application/benchmarking-application"}},l={},p=[{value:"Scenario",id:"scenario",level:2},{value:"Questions",id:"questions",level:2}],g={toc:p},c="wrapper";function u(e){let{components:t,...n}=e;return(0,r.yg)(c,(0,a.A)({},g,n,{components:t,mdxType:"MDXLayout"}),(0,r.yg)("h1",{id:"aggregator-application"},"Aggregator Application"),(0,r.yg)("h2",{id:"scenario"},"Scenario"),(0,r.yg)("p",null,"We are pursuing the design of an aggregator application that interfaces with multiple sites / solutions of Large Language Models (LLMs) like ChatGPT.\nThe application should be portable across different architectures, operating systems, and interfaces: native, web, mobile.\nThe application will receive a query from the user, which it will then transmit to all LLM sites / solutions.\nThen it will display all their responses, allowing the user to choose a response (from an LLM solution), possibly based on similarity to other responses from other LLM solutions."),(0,r.yg)("p",null,'Respond to the following questions with "True" or "False" and provide reasoning.\nThe justification should be simple, 2-3 sentences for each response.'),(0,r.yg)("h2",{id:"questions"},"Questions"),(0,r.yg)("ol",null,(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},"The aggregator application can be written in the C language.\nAnswer: True")),(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},"Interaction with LLM sites can be done through named pipes mechanisms.\nAnswer: False")),(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},"Two instances of the aggregator application can run on the same system.\nAnswer: True")),(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},"The aggregator application is CPU intensive.\nAnswer: False")),(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},"The aggregator application would benefit from increasing the file descriptor table size beyond the standard limit of 1024.\nAnswer: False / True, depending on argumentation")),(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},"In the case of a multi-threaded implementation, the aggregator application would achieve significant performance improvements.\nAnswer: False")),(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},"The aggregator application can run in a Docker container.\nAnswer: True")),(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},"The protocol used for communication between the aggregator application and LLM sites must be HTTP.\nAnswer: False")),(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},"The aggregator application can run as an unprivileged user.\nAnswer: True")),(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},"The aggregator application's page table DOES NOT contain pages without write permission.\nAnswer: False")),(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},"The system can only function if the communication between the aggregator application and LLM sites is encrypted.\nAnswer: False"))))}u.isMDXComponent=!0}}]);