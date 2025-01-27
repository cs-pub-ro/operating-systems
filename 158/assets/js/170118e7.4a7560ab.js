"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[9881],{5680:(e,t,n)=>{n.d(t,{xA:()=>u,yg:()=>y});var a=n(6540);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=a.createContext({}),m=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},u=function(e){var t=m(e.components);return a.createElement(l.Provider,{value:t},e.children)},p="mdxType",g={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},c=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,l=e.parentName,u=o(e,["components","mdxType","originalType","parentName"]),p=m(n),c=r,y=p["".concat(l,".").concat(c)]||p[c]||g[c]||i;return n?a.createElement(y,s(s({ref:t},u),{},{components:n})):a.createElement(y,s({ref:t},u))}));function y(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,s=new Array(i);s[0]=c;var o={};for(var l in t)hasOwnProperty.call(t,l)&&(o[l]=t[l]);o.originalType=e,o[p]="string"==typeof e?e:r,s[1]=o;for(var m=2;m<i;m++)s[m]=n[m];return a.createElement.apply(null,s)}return a.createElement.apply(null,n)}c.displayName="MDXCreateElement"},5986:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>s,default:()=>g,frontMatter:()=>i,metadata:()=>o,toc:()=>m});var a=n(8168),r=(n(6540),n(5680));const i={},s="Fuzzing Systems for Embedded Applications",o={unversionedId:"Exams/2024 Autumn/Fuzzing System/fuzzing-system",id:"Exams/2024 Autumn/Fuzzing System/fuzzing-system",title:"Fuzzing Systems for Embedded Applications",description:"A fuzzer/fuzzing system generates semi-random inputs to send to a target application to discover bugs\u2014inputs that lead to crashes.",source:"@site/docs/Exams/2024 Autumn/Fuzzing System/fuzzing-system.md",sourceDirName:"Exams/2024 Autumn/Fuzzing System",slug:"/Exams/2024 Autumn/Fuzzing System/fuzzing-system",permalink:"/operating-systems/158/Exams/2024 Autumn/Fuzzing System/fuzzing-system",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"Testing System",permalink:"/operating-systems/158/Exams/2024 Autumn/Testing System/testing-system"},next:{title:"2024 Summer",permalink:"/operating-systems/158/Exams/2024 Summer/"}},l={},m=[],u={toc:m},p="wrapper";function g(e){let{components:t,...n}=e;return(0,r.yg)(p,(0,a.A)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,r.yg)("h1",{id:"fuzzing-systems-for-embedded-applications"},"Fuzzing Systems for Embedded Applications"),(0,r.yg)("p",null,"A fuzzer/fuzzing system generates semi-random inputs to send to a target application to discover bugs\u2014inputs that lead to crashes.\nWe propose building a fuzzing system for binary applications on embedded systems with specific architectures (e.g., ARM/MIPS).\nThe fuzzing system runs on an x86 system and uses an emulator to run the application.\nThe fuzzer sends inputs to the application through the emulator and extracts introspection information useful for fuzzing."),(0,r.yg)("p",null,'Answer the following questions with "True" or "False" and justify your answer.\nJustifications should be simple, 2-3 sentences for each response.'),(0,r.yg)("ol",null,(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},"The fuzzing system is an application that must run with privileged permissions."),(0,r.yg)("ul",{parentName:"li"},(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("strong",{parentName:"li"},"Answer:")," False"),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("strong",{parentName:"li"},"Justification:")," The fuzzing system starts the emulator and sends inputs without performing privileged actions."))),(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},"The fuzzing system can run inside a virtual machine."),(0,r.yg)("ul",{parentName:"li"},(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("strong",{parentName:"li"},"Answer:")," True"),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("strong",{parentName:"li"},"Justification:")," Since the system uses an emulator, nothing prevents it from running inside a virtual machine."))),(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},"The performance of the fuzzing system (number of inputs sent per second) is comparable to that of a fuzzing system for native applications (running natively on the local x86 system)."),(0,r.yg)("ul",{parentName:"li"},(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("strong",{parentName:"li"},"Answer:")," False"),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("strong",{parentName:"li"},"Justification:")," Emulating instructions introduces significant overhead compared to running natively."))),(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},"During the execution of the embedded application in the emulator, no system calls are made on the local system."),(0,r.yg)("ul",{parentName:"li"},(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("strong",{parentName:"li"},"Answer:")," False"),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("strong",{parentName:"li"},"Justification:")," The emulator performs system calls for tasks such as memory allocation or synchronization."))),(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},"The emulated application must be an ELF (Executable and Linking Format) file, specific to Linux."),(0,r.yg)("ul",{parentName:"li"},(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("strong",{parentName:"li"},"Answer:")," False"),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("strong",{parentName:"li"},"Justification:")," The executable format depends on the emulator and can be ELF, PE, COFF, or raw."))),(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},"We can run only one instance of the fuzzing system because we can run only one instance of the emulator."),(0,r.yg)("ul",{parentName:"li"},(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("strong",{parentName:"li"},"Answer:")," False"),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("strong",{parentName:"li"},"Justification:")," Multiple emulator instances can run simultaneously, limited only by available resources."))),(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},"The application source code is required to run the application on the emulator."),(0,r.yg)("ul",{parentName:"li"},(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("strong",{parentName:"li"},"Answer:")," False"),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("strong",{parentName:"li"},"Justification:")," The emulator runs machine code, so only the binary application is needed, while the source code is optional."))),(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},"The emulator appears as a process in the local system."),(0,r.yg)("ul",{parentName:"li"},(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("strong",{parentName:"li"},"Answer:")," True"),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("strong",{parentName:"li"},"Justification:")," Applications run as processes, and the emulator on the local system functions as a process."))),(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},"Using the emulator, the fuzzing system can have direct access to the memory of the running application."),(0,r.yg)("ul",{parentName:"li"},(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("strong",{parentName:"li"},"Answer:")," True"),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("strong",{parentName:"li"},"Justification:")," The emulator emulates memory and the processor, allowing direct memory access."))),(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},"If the system is x86 on 32-bit, the emulated application architecture cannot be 64-bit."),(0,r.yg)("ul",{parentName:"li"},(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("strong",{parentName:"li"},"Answer:")," False"),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("strong",{parentName:"li"},"Justification:")," Emulation allows any architecture to be simulated, depending on the emulator's capabilities."))),(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},"A crash in the emulated application can lead to a crash of the fuzzing system."),(0,r.yg)("ul",{parentName:"li"},(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("strong",{parentName:"li"},"Answer:")," False"),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("strong",{parentName:"li"},"Justification:")," The application crashes inside the emulator, which should not affect the local system if implemented properly.")))))}g.isMDXComponent=!0}}]);