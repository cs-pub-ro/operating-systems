"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[3246],{5680:(e,t,r)=>{r.d(t,{xA:()=>c,yg:()=>f});var n=r(6540);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,i=function(e,t){if(null==e)return{};var r,n,i={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(i[r]=e[r]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}var l=n.createContext({}),p=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},c=function(e){var t=p(e.components);return n.createElement(l.Provider,{value:t},e.children)},u="mdxType",y={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,i=e.mdxType,a=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),u=p(r),m=i,f=u["".concat(l,".").concat(m)]||u[m]||y[m]||a;return r?n.createElement(f,o(o({ref:t},c),{},{components:r})):n.createElement(f,o({ref:t},c))}));function f(e,t){var r=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var a=r.length,o=new Array(a);o[0]=m;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[u]="string"==typeof e?e:i,o[1]=s;for(var p=2;p<a;p++)o[p]=r[p];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},6604:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>y,frontMatter:()=>a,metadata:()=>s,toc:()=>p});var n=r(8168),i=(r(6540),r(5680));const a={},o="Network Performance Utility",s={unversionedId:"Exams/2024 Winter/Network Performance Utility/network-performance-utility",id:"Exams/2024 Winter/Network Performance Utility/network-performance-utility",title:"Network Performance Utility",description:"Scenario",source:"@site/docs/Exams/2024 Winter/Network Performance Utility/network-performance-utility.md",sourceDirName:"Exams/2024 Winter/Network Performance Utility",slug:"/Exams/2024 Winter/Network Performance Utility/network-performance-utility",permalink:"/operating-systems/158/Exams/2024 Winter/Network Performance Utility/network-performance-utility",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"Distributed System",permalink:"/operating-systems/158/Exams/2024 Winter/Distributed System/distributed-system"},next:{title:"FaaS Application",permalink:"/operating-systems/158/Exams/2024 Winter/FaaS Application/faas-application"}},l={},p=[{value:"Scenario",id:"scenario",level:2},{value:"Questions",id:"questions",level:2}],c={toc:p},u="wrapper";function y(e){let{components:t,...r}=e;return(0,i.yg)(u,(0,n.A)({},c,r,{components:t,mdxType:"MDXLayout"}),(0,i.yg)("h1",{id:"network-performance-utility"},"Network Performance Utility"),(0,i.yg)("h2",{id:"scenario"},"Scenario"),(0,i.yg)("p",null,"We aim to implement a utility to measure network performance similar to tools like iperf or speedtest.\nThis utility will present metrics such as bandwidth (download and upload), network latency/response time (also known as RTT - round trip time) for various sites.\nTypically, the utility will establish multiple connections/transfers and display their average."),(0,i.yg)("p",null,'Respond to the following questions with "True" or "False" and justify the answer.\nThe justification should be simple, 2-3 sentences for each answer.'),(0,i.yg)("h2",{id:"questions"},"Questions"),(0,i.yg)("ol",null,(0,i.yg)("li",{parentName:"ol"},(0,i.yg)("p",{parentName:"li"},"The utility can use UNIX sockets for measurements.\nAnswer: False")),(0,i.yg)("li",{parentName:"ol"},(0,i.yg)("p",{parentName:"li"},"The process started by the utility is I/O-intensive.\nAnswer: True")),(0,i.yg)("li",{parentName:"ol"},(0,i.yg)("p",{parentName:"li"},"To function on systems with wireless connection, the utility needs to be started with privileged rights.\nAnswer: False")),(0,i.yg)("li",{parentName:"ol"},(0,i.yg)("p",{parentName:"li"},"The process started by the utility will heavily use buffer cache.\nAnswer: False")),(0,i.yg)("li",{parentName:"ol"},(0,i.yg)("p",{parentName:"li"},"The utility can be written in an interpreted language like Python.\nAnswer: True")),(0,i.yg)("li",{parentName:"ol"},(0,i.yg)("p",{parentName:"li"},"For efficient operation of the utility's process, the limit of file descriptor table needs to be increased above 1024.\nAnswer: False")),(0,i.yg)("li",{parentName:"ol"},(0,i.yg)("p",{parentName:"li"},"The process started by the utility will consume a lot of RAM.\nAnswer: False")),(0,i.yg)("li",{parentName:"ol"},(0,i.yg)("p",{parentName:"li"},"To achieve the best results, the utility should be used at a time when other applications are using very little or no network.\nAnswer: True")),(0,i.yg)("li",{parentName:"ol"},(0,i.yg)("p",{parentName:"li"},"Hardware interrupts will be generated during the use of the utility.\nAnswer: True")),(0,i.yg)("li",{parentName:"ol"},(0,i.yg)("p",{parentName:"li"},"The process started by the utility will use shared memory mechanisms.\nAnswer: False")),(0,i.yg)("li",{parentName:"ol"},(0,i.yg)("p",{parentName:"li"},"The process started by the utility is a component that requires additional security/isolation compared to other processes.\nAnswer: False"))))}y.isMDXComponent=!0}}]);