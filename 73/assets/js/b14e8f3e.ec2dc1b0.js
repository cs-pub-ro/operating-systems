"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[3899],{5680:(e,t,n)=>{n.d(t,{xA:()=>p,yg:()=>h});var a=n(6540);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=a.createContext({}),c=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},p=function(e){var t=c(e.components);return a.createElement(s.Provider,{value:t},e.children)},m="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},y=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),m=c(n),y=r,h=m["".concat(s,".").concat(y)]||m[y]||u[y]||i;return n?a.createElement(h,o(o({ref:t},p),{},{components:n})):a.createElement(h,o({ref:t},p))}));function h(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,o=new Array(i);o[0]=y;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[m]="string"==typeof e?e:r,o[1]=l;for(var c=2;c<i;c++)o[c]=n[c];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}y.displayName="MDXCreateElement"},8881:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>o,default:()=>u,frontMatter:()=>i,metadata:()=>l,toc:()=>c});var a=n(8168),r=(n(6540),n(5680));const i={},o="Syscall Tracing",l={unversionedId:"Exams/2024 Summer/Syscall Tracing/syscall-tracing",id:"Exams/2024 Summer/Syscall Tracing/syscall-tracing",title:"Syscall Tracing",description:"Scenario",source:"@site/docs/Exams/2024 Summer/Syscall Tracing/syscall-tracing.md",sourceDirName:"Exams/2024 Summer/Syscall Tracing",slug:"/Exams/2024 Summer/Syscall Tracing/syscall-tracing",permalink:"/operating-systems/73/Exams/2024 Summer/Syscall Tracing/syscall-tracing",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"2024 Summer",permalink:"/operating-systems/73/Exams/2024 Summer/"},next:{title:"Sysinfo Library",permalink:"/operating-systems/73/Exams/2024 Summer/Sysinfo Library/sysinfo-library"}},s={},c=[{value:"Scenario",id:"scenario",level:2},{value:"Questions",id:"questions",level:2}],p={toc:c},m="wrapper";function u(e){let{components:t,...n}=e;return(0,r.yg)(m,(0,a.A)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,r.yg)("h1",{id:"syscall-tracing"},"Syscall Tracing"),(0,r.yg)("h2",{id:"scenario"},"Scenario"),(0,r.yg)("p",null,"We propose the development of a system call tracing and benchmarking tool, similar to strace.\nThis tool can attach to an application and capture the system calls made by that application - system call number, parameters, return value, along with information about the duration of the system call.\nThe tool will create a log with this information, which can later be used to profile the application (create graphs, identify the most frequent system calls, see potential bottlenecks, categorize system calls by received arguments, etc.)."),(0,r.yg)("p",null,'Answer the following questions with "True" or "False" and justify your answer.\nThe justification should be simple, 2-3 sentences for each answer.'),(0,r.yg)("h2",{id:"questions"},"Questions"),(0,r.yg)("ol",null,(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},"The tool requires administrative privileges to run.\\\nAnswer: False\\\nJustification: Tracing permission on the application is needed, which generally means it belongs to the same user.\nAdministrative permissions are not required.")),(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},"For performance reasons, it is advisable for the tool to store the log information in memory, rather than displaying it in real time on the standard output.\\\nAnswer: True\\\nJustification: Displaying to the standard output is slow, uses the terminal, and the monitored application will have overhead caused by this.")),(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},"The application's code needs to be modified to be monitored by the tool.\\\nAnswer: False\\\nJustification: Tracing functionalities are provided by the operating system and are not specific to the application.")),(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},"An application written in Python, an interpreted language, will not generate information that can be captured by the tool.\\\nAnswer: False\\\nJustification: Any application, in any language, executes system calls.\nIf not directly, then through the interpreter.")),(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},"Two consecutive runs of the application will generate the same sequence of system calls, possibly with some timing differences.\\\nAnswer: False\\\nJustification: This cannot be guaranteed.\nAn application may consider certain external parameters (time, input, network) that affect which system calls it makes.")),(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},"Generally, the application will consume more CPU time than the tracing tool.\\\nAnswer: True\\\nJustification: The tool only captures and writes information to a log, which is minimal consumption.")),(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},"Multiple instances of the tool process can run simultaneously to capture information from different applications.\\\nAnswer: True\\\nJustification: There is no central point that enforces a single application run.\nThe operating system provides the tracing facility used by each instance of the tool.")),(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},"The results displayed by the tool will differ significantly when the application runs on a bare-metal operating system compared to a virtual machine operating system.\\\nAnswer: False\\\nJustification: The operating system provides the same system call interface, and thus the information displayed will be similar for both types of runs.")),(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},"The tool will capture page faults.\\\nAnswer: False\\\nJustification: Page faults are not system calls and are not related to the information captured by the tool.")),(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},"The tool cannot be used when the captured application communicates with another application.\\\nAnswer: False\\\nJustification: The application makes system calls that will be captured, regardless of whether it communicates with another application or not.")),(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},"The analyzed application can be statically or dynamically linked.\\\nAnswer: True\\\nJustification: The application makes system calls, either directly or through a library, and the tool will capture this."))))}u.isMDXComponent=!0}}]);