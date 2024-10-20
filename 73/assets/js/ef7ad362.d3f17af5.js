"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[941],{5680:(e,t,n)=>{n.d(t,{xA:()=>c,yg:()=>g});var r=n(6540);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var p=r.createContext({}),l=function(e){var t=r.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},c=function(e){var t=l(e.components);return r.createElement(p.Provider,{value:t},e.children)},m="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},y=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,p=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),m=l(n),y=a,g=m["".concat(p,".").concat(y)]||m[y]||u[y]||i;return n?r.createElement(g,o(o({ref:t},c),{},{components:n})):r.createElement(g,o({ref:t},c))}));function g(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=y;var s={};for(var p in t)hasOwnProperty.call(t,p)&&(s[p]=t[p]);s.originalType=e,s[m]="string"==typeof e?e:a,o[1]=s;for(var l=2;l<i;l++)o[l]=n[l];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}y.displayName="MDXCreateElement"},2549:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>o,default:()=>u,frontMatter:()=>i,metadata:()=>s,toc:()=>l});var r=n(8168),a=(n(6540),n(5680));const i={},o="Application Investigator",s={unversionedId:"Exams/Application Investigator/application-investigator",id:"Exams/Application Investigator/application-investigator",title:"Application Investigator",description:"Scenario",source:"@site/docs/Exams/Application Investigator/application-investigator.md",sourceDirName:"Exams/Application Investigator",slug:"/Exams/Application Investigator/application-investigator",permalink:"/operating-systems/73/Exams/Application Investigator/application-investigator",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"Database Application",permalink:"/operating-systems/73/Exams/Database Application/database-application"},next:{title:"Network Performance Utility",permalink:"/operating-systems/73/Exams/Network Performance Utility/network-performance-utility"}},p={},l=[{value:"Scenario",id:"scenario",level:2},{value:"Questions",id:"questions",level:2}],c={toc:l},m="wrapper";function u(e){let{components:t,...n}=e;return(0,a.yg)(m,(0,r.A)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,a.yg)("h1",{id:"application-investigator"},"Application Investigator"),(0,a.yg)("h2",{id:"scenario"},"Scenario"),(0,a.yg)("p",null,"We aim to investigate, for security/forensics reasons, applications running on a system.\nFor this purpose, we design an application that, given a PID (or equivalent), suspends the execution of the target process and dumps the memory of that process into a file, using a dedicated interface of the operating system."),(0,a.yg)("p",null,'Answer the following questions with "True" or "False" and justify the answer.\nJustification should be simple, 2-3 sentences for each answer.'),(0,a.yg)("h2",{id:"questions"},"Questions"),(0,a.yg)("ol",null,(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"The application runs in privileged mode.\nAnswer: True")),(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"The suspended process must be single-threaded.\nAnswer: False")),(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"The application uses an IPC interface to communicate with the process after it has been suspended.\nAnswer: False")),(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"Dumping can only be done in read-only or read-execute areas, not in read-write areas.\nAnswer: False")),(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"The most frequently used system call of the application is ",(0,a.yg)("inlineCode",{parentName:"p"},"write()"),".\nAnswer: True")),(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"The application would benefit from a multi-threaded implementation.\nAnswer: False")),(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"The application can function in a virtual machine.\nAnswer: True")),(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"The application does not perform context switches.\nAnswer: False")),(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"The application benefits from increasing the size of the file descriptor table.\nAnswer: False")),(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"The resulting file from the memory dump is a binary file, not text.\nAnswer: True")),(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"In principle, with certain adjustments, the application can work on both 32-bit and 64-bit systems.\nAnswer: True"))))}u.isMDXComponent=!0}}]);