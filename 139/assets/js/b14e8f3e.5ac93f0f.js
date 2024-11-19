"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[3899],{5680:(e,t,a)=>{a.d(t,{xA:()=>c,yg:()=>u});var n=a(6540);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function i(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function l(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?i(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function o(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},i=Object.keys(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var s=n.createContext({}),p=function(e){var t=n.useContext(s),a=t;return e&&(a="function"==typeof e?e(t):l(l({},t),e)),a},c=function(e){var t=p(e.components);return n.createElement(s.Provider,{value:t},e.children)},m="mdxType",y={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},g=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,i=e.originalType,s=e.parentName,c=o(e,["components","mdxType","originalType","parentName"]),m=p(a),g=r,u=m["".concat(s,".").concat(g)]||m[g]||y[g]||i;return a?n.createElement(u,l(l({ref:t},c),{},{components:a})):n.createElement(u,l({ref:t},c))}));function u(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=a.length,l=new Array(i);l[0]=g;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o[m]="string"==typeof e?e:r,l[1]=o;for(var p=2;p<i;p++)l[p]=a[p];return n.createElement.apply(null,l)}return n.createElement.apply(null,a)}g.displayName="MDXCreateElement"},8881:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>s,contentTitle:()=>l,default:()=>y,frontMatter:()=>i,metadata:()=>o,toc:()=>p});var n=a(8168),r=(a(6540),a(5680));const i={},l="Syscall Tracing",o={unversionedId:"Exams/2024 Summer/Syscall Tracing/syscall-tracing",id:"Exams/2024 Summer/Syscall Tracing/syscall-tracing",title:"Syscall Tracing",description:"Scenario",source:"@site/docs/Exams/2024 Summer/Syscall Tracing/syscall-tracing.md",sourceDirName:"Exams/2024 Summer/Syscall Tracing",slug:"/Exams/2024 Summer/Syscall Tracing/syscall-tracing",permalink:"/operating-systems/139/Exams/2024 Summer/Syscall Tracing/syscall-tracing",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"2024 Summer",permalink:"/operating-systems/139/Exams/2024 Summer/"},next:{title:"Sysinfo Library",permalink:"/operating-systems/139/Exams/2024 Summer/Sysinfo Library/sysinfo-library"}},s={},p=[{value:"Scenario",id:"scenario",level:2},{value:"Questions",id:"questions",level:2}],c={toc:p},m="wrapper";function y(e){let{components:t,...a}=e;return(0,r.yg)(m,(0,n.A)({},c,a,{components:t,mdxType:"MDXLayout"}),(0,r.yg)("h1",{id:"syscall-tracing"},"Syscall Tracing"),(0,r.yg)("h2",{id:"scenario"},"Scenario"),(0,r.yg)("p",null,"We propose the development of a system call tracing and benchmarking tool, similar to strace.\nThis tool can attach to an application and capture the system calls made by that application - system call number, parameters, return value, along with information about the duration of the system call.\nThe tool will create a log with this information, which can later be used to profile the application (create graphs, identify the most frequent system calls, see potential bottlenecks, categorize system calls by received arguments, etc.)."),(0,r.yg)("p",null,'Answer the following questions with "True" or "False" and justify your answer.\nThe justification should be simple, 2-3 sentences for each answer.'),(0,r.yg)("h2",{id:"questions"},"Questions"),(0,r.yg)("ol",null,(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},"The tool requires administrative privileges to run."),(0,r.yg)("ul",{parentName:"li"},(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("strong",{parentName:"li"},"Answer:"),"False"),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("strong",{parentName:"li"},"Justification:")," The tool requires tracing permissions for the application, which generally means that both should belong to the same user."))),(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},"For performance reasons, it is advisable for the tool to store the log information in memory, rather than displaying it in real time on the standard output."),(0,r.yg)("ul",{parentName:"li"},(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("strong",{parentName:"li"},"Answer:"),"True"),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("strong",{parentName:"li"},"Justification:")," Displaying to the standard output is slow, uses the terminal, and the monitored application will have overhead caused by this."))),(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},"The application's code needs to be modified to be monitored by the tool."),(0,r.yg)("ul",{parentName:"li"},(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("strong",{parentName:"li"},"Answer:"),"False"),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("strong",{parentName:"li"},"Justification:")," Tracing functionalities are provided by the operating system and are not specific to the application."))),(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},"An application written in Python, an interpreted language, will not generate information that can be monitored by the tool."),(0,r.yg)("ul",{parentName:"li"},(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("strong",{parentName:"li"},"Answer:"),"False"),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("strong",{parentName:"li"},"Justification:")," Any application, in any language, executes system calls to access system resources.\nIf not directly, then through the interpreter."))),(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},"Two consecutive runs of the application will generate the same sequence of system calls, possibly with some timing differences."),(0,r.yg)("ul",{parentName:"li"},(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("strong",{parentName:"li"},"Answer:"),"False"),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("strong",{parentName:"li"},"Justification:")," This cannot be guaranteed.\nAn application may consider certain external parameters (time, input, network) that affect which system calls it makes."))),(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},"Generally, the application will consume more CPU time than the tracing tool."),(0,r.yg)("ul",{parentName:"li"},(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("strong",{parentName:"li"},"Answer:"),"True"),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("strong",{parentName:"li"},"Justification:")," The tool only captures and writes information to a log, which is minimal consumption."))),(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},"Multiple instances of the tool process can run simultaneously to capture information from different applications."),(0,r.yg)("ul",{parentName:"li"},(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("strong",{parentName:"li"},"Answer:"),"True"),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("strong",{parentName:"li"},"Justification:")," There is no central point that enforces a single application run.\nThe operating system provides the tracing facility used by each instance of the tool."))),(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},"The results displayed by the tool will differ significantly when the application runs on a bare-metal operating system compared to a virtual machine operating system."),(0,r.yg)("ul",{parentName:"li"},(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("strong",{parentName:"li"},"Answer:"),"False"),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("strong",{parentName:"li"},"Justification:")," The operating system provides the same system call interface, and thus the information displayed will be similar for both types of runs."))),(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},"The tool will capture page faults."),(0,r.yg)("ul",{parentName:"li"},(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("strong",{parentName:"li"},"Answer:"),"False"),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("strong",{parentName:"li"},"Justification:")," Page faults are not system calls and are not related to the information captured by the tool."))),(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},"The tool cannot be used when the captured application communicates with another application."),(0,r.yg)("ul",{parentName:"li"},(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("strong",{parentName:"li"},"Answer:"),"False"),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("strong",{parentName:"li"},"Justification:")," The application makes system calls that will be captured, regardless of whether it communicates with another application or not."))),(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},"The analyzed application can be statically or dynamically linked."),(0,r.yg)("ul",{parentName:"li"},(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("strong",{parentName:"li"},"Answer:"),"True"),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("strong",{parentName:"li"},"Justification:")," The application makes system calls, either directly or through a library, and the tool will capture this.")))))}y.isMDXComponent=!0}}]);