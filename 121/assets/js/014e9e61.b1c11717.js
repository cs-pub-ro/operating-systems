"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[4886],{5680:(e,r,n)=>{n.d(r,{xA:()=>y,yg:()=>g});var t=n(6540);function a(e,r,n){return r in e?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n,e}function i(e,r){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);r&&(t=t.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),n.push.apply(n,t)}return n}function o(e){for(var r=1;r<arguments.length;r++){var n=null!=arguments[r]?arguments[r]:{};r%2?i(Object(n),!0).forEach((function(r){a(e,r,n[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))}))}return e}function s(e,r){if(null==e)return{};var n,t,a=function(e,r){if(null==e)return{};var n,t,a={},i=Object.keys(e);for(t=0;t<i.length;t++)n=i[t],r.indexOf(n)>=0||(a[n]=e[n]);return a}(e,r);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(t=0;t<i.length;t++)n=i[t],r.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=t.createContext({}),p=function(e){var r=t.useContext(l),n=r;return e&&(n="function"==typeof e?e(r):o(o({},r),e)),n},y=function(e){var r=p(e.components);return t.createElement(l.Provider,{value:r},e.children)},m="mdxType",u={inlineCode:"code",wrapper:function(e){var r=e.children;return t.createElement(t.Fragment,{},r)}},c=t.forwardRef((function(e,r){var n=e.components,a=e.mdxType,i=e.originalType,l=e.parentName,y=s(e,["components","mdxType","originalType","parentName"]),m=p(n),c=a,g=m["".concat(l,".").concat(c)]||m[c]||u[c]||i;return n?t.createElement(g,o(o({ref:r},y),{},{components:n})):t.createElement(g,o({ref:r},y))}));function g(e,r){var n=arguments,a=r&&r.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=c;var s={};for(var l in r)hasOwnProperty.call(r,l)&&(s[l]=r[l]);s.originalType=e,s[m]="string"==typeof e?e:a,o[1]=s;for(var p=2;p<i;p++)o[p]=n[p];return t.createElement.apply(null,o)}return t.createElement.apply(null,n)}c.displayName="MDXCreateElement"},1821:(e,r,n)=>{n.r(r),n.d(r,{assets:()=>l,contentTitle:()=>o,default:()=>u,frontMatter:()=>i,metadata:()=>s,toc:()=>p});var t=n(8168),a=(n(6540),n(5680));const i={},o="Sysinfo Library",s={unversionedId:"Exams/2024 Summer/Sysinfo Library/sysinfo-library",id:"Exams/2024 Summer/Sysinfo Library/sysinfo-library",title:"Sysinfo Library",description:"Scenario",source:"@site/docs/Exams/2024 Summer/Sysinfo Library/sysinfo-library.md",sourceDirName:"Exams/2024 Summer/Sysinfo Library",slug:"/Exams/2024 Summer/Sysinfo Library/sysinfo-library",permalink:"/operating-systems/121/Exams/2024 Summer/Sysinfo Library/sysinfo-library",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"Syscall Tracing",permalink:"/operating-systems/121/Exams/2024 Summer/Syscall Tracing/syscall-tracing"},next:{title:"Digital Forensics",permalink:"/operating-systems/121/Exams/Digital Forensics/digital-forensics"}},l={},p=[{value:"Scenario",id:"scenario",level:2},{value:"Questions",id:"questions",level:2}],y={toc:p},m="wrapper";function u(e){let{components:r,...n}=e;return(0,a.yg)(m,(0,t.A)({},y,n,{components:r,mdxType:"MDXLayout"}),(0,a.yg)("h1",{id:"sysinfo-library"},"Sysinfo Library"),(0,a.yg)("h2",{id:"scenario"},"Scenario"),(0,a.yg)("p",null,"We propose the implementation of a library called ",(0,a.yg)("inlineCode",{parentName:"p"},"sysinfo"),", which will provide information about the hardware and software of the system where it is used.\nThis information is useful for the proper configuration of an application or for inventorying systems within a network.\nThe library is portable.\nExamples of information include: processor type, number of cores, frequency, memory capacity, operating system, distribution version, compiler version(s), standard C library version, virtualization support."),(0,a.yg)("p",null,'Answer the following questions with "True" or "False" and justify your answer.\nThe justification should be simple, 2-3 sentences for each answer.'),(0,a.yg)("h2",{id:"questions"},"Questions"),(0,a.yg)("ol",null,(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"The information can be fully collected using the library on another system without the inspected system being turned on."),(0,a.yg)("ul",{parentName:"li"},(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("strong",{parentName:"li"},"Answer:")," False"),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("strong",{parentName:"li"},"Justification:"),' The system needs to be on to obtain information such as the compiler version or kernel version or the distribution used.\nTheoretically, the disk can be mounted without starting the system, but there are still details about the processor or others that need to be obtained either beforehand or "live."'))),(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"The library can be used to investigate a virtualized system."),(0,a.yg)("ul",{parentName:"li"},(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("strong",{parentName:"li"},"Answer:")," True"),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("strong",{parentName:"li"},"Justification:")," The information provided is specific to any system.\nEven hardware information is provided by the hypervisor, which is responsible for ensuring information as similar as possible to a real system."))),(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"The library can be used by programs written in compiled languages (such as C) and programs written in interpreted languages (such as JavaScript/Node or Python)."),(0,a.yg)("ul",{parentName:"li"},(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("strong",{parentName:"li"},"Answer:")," True"),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("strong",{parentName:"li"},"Justification:")," Each language can create a binding to the respective library, and then programs written in that language can use it."))),(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"The functions exposed by the library are CPU-intensive."),(0,a.yg)("ul",{parentName:"li"},(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("strong",{parentName:"li"},"Answer:")," False"),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("strong",{parentName:"li"},"Justification:")," Generally, the information is obtained by investigating the file system or hardware, with the support of the operating system.\nThese operations are simple, not CPU-intensive."))),(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"The library can be used simultaneously by two or more distinct applications."),(0,a.yg)("ul",{parentName:"li"},(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("strong",{parentName:"li"},"Answer:")," True"),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("strong",{parentName:"li"},"Justification:")," The operations performed by the library are reading information or configurations from the system.\nThere is no blockage in performing these read operations simultaneously."))),(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"Using the functions exposed by the library will generate system calls."),(0,a.yg)("ul",{parentName:"li"},(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("strong",{parentName:"li"},"Answer:")," True"),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("strong",{parentName:"li"},"Justification:")," Most information requires interaction with the file system or hardware.\nThese operations perform system calls."))),(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"To ensure the portability of the library on different operating systems (Linux, Windows, macOS), the application using the library must be run in a container."),(0,a.yg)("ul",{parentName:"li"},(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("strong",{parentName:"li"},"Answer:")," False"),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("strong",{parentName:"li"},"Justification:")," The library must be portable, meaning it should provide mechanisms for informing about the system used through the exposed interface.\nThese mechanisms should be implemented and present regardless of running in a container.\nA container offers application isolation and easy deployment by managing dependencies, but it does not help portability."))),(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"Applications using the library will only be able to run on x86 processor architectures."),(0,a.yg)("ul",{parentName:"li"},(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("strong",{parentName:"li"},"Answer:")," False"),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("strong",{parentName:"li"},"Justification:")," The information provided by the library is either generic or universally available on each type of architecture.\nIt is irrelevant whether the system running the application uses an x86, ARM, or MIPS architecture."))),(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"The operating system on which the library runs must provide shared memory mechanisms to deliver the obtained information."),(0,a.yg)("ul",{parentName:"li"},(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("strong",{parentName:"li"},"Answer:")," False"),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("strong",{parentName:"li"},"Justification:")," There is no requirement for the application to use shared memory mechanisms.\nThe obtained information can be collected in an application's memory area and used from there."))),(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"If software packages or applications are not installed/uninstalled, then on consecutive runs, the library will provide the same information."),(0,a.yg)("ul",{parentName:"li"},(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("strong",{parentName:"li"},"Answer:")," True"),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("strong",{parentName:"li"},"Justification:"),' The information does not change in the system on consecutive runs:\nthe same hardware, the same functionalities, the same applications with the same versions.\nHere it can be argued that it might investigate the number of processes or occupied disk space.\nPoints are also awarded if argued this way and the answer is "False".'))),(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"The library can be provided as both a dynamically linked library and a statically linked library."),(0,a.yg)("ul",{parentName:"li"},(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("strong",{parentName:"li"},"Answer:")," True"),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("strong",{parentName:"li"},"Justification:")," The functionalities provided by the library do not depend on its linking mode.\nThe linking modes allow a broader range of applications to can use it, so providing it in both ways is advantageous.")))))}u.isMDXComponent=!0}}]);