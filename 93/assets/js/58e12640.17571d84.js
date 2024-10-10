"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[3986],{5680:(e,t,n)=>{n.d(t,{xA:()=>c,yg:()=>f});var a=n(6540);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=a.createContext({}),p=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},c=function(e){var t=p(e.components);return a.createElement(l.Provider,{value:t},e.children)},m="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},y=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,l=e.parentName,c=o(e,["components","mdxType","originalType","parentName"]),m=p(n),y=r,f=m["".concat(l,".").concat(y)]||m[y]||u[y]||i;return n?a.createElement(f,s(s({ref:t},c),{},{components:n})):a.createElement(f,s({ref:t},c))}));function f(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,s=new Array(i);s[0]=y;var o={};for(var l in t)hasOwnProperty.call(t,l)&&(o[l]=t[l]);o.originalType=e,o[m]="string"==typeof e?e:r,s[1]=o;for(var p=2;p<i;p++)s[p]=n[p];return a.createElement.apply(null,s)}return a.createElement.apply(null,n)}y.displayName="MDXCreateElement"},1049:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>s,default:()=>u,frontMatter:()=>i,metadata:()=>o,toc:()=>p});var a=n(8168),r=(n(6540),n(5680));const i={},s="Industrial System",o={unversionedId:"Exams/Industrial System/industrial-system",id:"Exams/Industrial System/industrial-system",title:"Industrial System",description:"Scenario",source:"@site/docs/Exams/Industrial System/industrial-system.md",sourceDirName:"Exams/Industrial System",slug:"/Exams/Industrial System/industrial-system",permalink:"/operating-systems/93/Exams/Industrial System/industrial-system",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"FaaS Application",permalink:"/operating-systems/93/Exams/FaaS Application/faas-application"},next:{title:"Blockchain System",permalink:"/operating-systems/93/Exams/Blockchain System/blockchain-system"}},l={},p=[{value:"Scenario",id:"scenario",level:2},{value:"Questions",id:"questions",level:2}],c={toc:p},m="wrapper";function u(e){let{components:t,...n}=e;return(0,r.yg)(m,(0,a.A)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,r.yg)("h1",{id:"industrial-system"},"Industrial System"),(0,r.yg)("h2",{id:"scenario"},"Scenario"),(0,r.yg)("p",null,"We aim to develop an industrial system that will run distributed applications in the web assembly format, a binary code (bytecode) that requires an executor called wasmer (similar to Java Virtual Machine) to run.\nApplications can be written in any language that can generate web assembly code.\nOne of the compilers that can generate web assembly code is LLVM.\nWasmer allows the use of any existing libraries on the system it runs on, requiring adaptation libraries (glue code)."),(0,r.yg)("p",null,'Answer the following questions with "True" or "False" and justify the response.\nJustification should be simple, 2-3 sentences for each response.'),(0,r.yg)("h2",{id:"questions"},"Questions"),(0,r.yg)("ol",null,(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},"The startup of each application is more efficient on POSIX systems.\nAnswer: True")),(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},"A JIT system is a system that allows for the compilation of parts of an application to be executed directly on the processor when needed.\nBy integrating a JIT compiler into wasmer, the performance of applications using graphical interfaces, which in turn use the OpenGL libraries of the operating system, has increased.\nAnswer: False")),(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},"Applications can use both types of threads, kernel, and user.\nAnswer: True")),(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},"Applications can always use UNIX sockets for communication.\nAnswer: False")),(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},"Communication between two threads, regardless of the application they are in, is possible via signals.\nAnswer: False")),(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},"The operating system mandates wasmer to use garbage collection.\nAnswer: False")),(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},"As a virtual executor, wasmer does not use memory paging.\nAnswer: False")),(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},"Wasmer can simulate the functioning of a container.\nAnswer: True")),(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},"An IO Intensive application will run efficiently on wasmer.\nAnswer: True")),(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},"Context switching is more costly for applications in wasmer.\nAnswer: False")),(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},"Applications in wasmer do not use the libc file access API but still benefit from the file cache system of the operating system.\nAnswer: True"))))}u.isMDXComponent=!0}}]);