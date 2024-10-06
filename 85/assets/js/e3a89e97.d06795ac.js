"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[4126],{5680:(e,n,t)=>{t.d(n,{xA:()=>c,yg:()=>y});var r=t(6540);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function s(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var l=r.createContext({}),p=function(e){var n=r.useContext(l),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},c=function(e){var n=p(e.components);return r.createElement(l.Provider,{value:n},e.children)},u="mdxType",g={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},m=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),u=p(t),m=a,y=u["".concat(l,".").concat(m)]||u[m]||g[m]||o;return t?r.createElement(y,i(i({ref:n},c),{},{components:t})):r.createElement(y,i({ref:n},c))}));function y(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var o=t.length,i=new Array(o);i[0]=m;var s={};for(var l in n)hasOwnProperty.call(n,l)&&(s[l]=n[l]);s.originalType=e,s[u]="string"==typeof e?e:a,i[1]=s;for(var p=2;p<o;p++)i[p]=t[p];return r.createElement.apply(null,i)}return r.createElement.apply(null,t)}m.displayName="MDXCreateElement"},2506:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>i,default:()=>g,frontMatter:()=>o,metadata:()=>s,toc:()=>p});var r=t(8168),a=(t(6540),t(5680));const o={},i="Network Configurations Manager",s={unversionedId:"Exams/Network Configurations Manager/network-configurations-manager",id:"Exams/Network Configurations Manager/network-configurations-manager",title:"Network Configurations Manager",description:"Scenario",source:"@site/docs/Exams/Network Configurations Manager/network-configurations-manager.md",sourceDirName:"Exams/Network Configurations Manager",slug:"/Exams/Network Configurations Manager/network-configurations-manager",permalink:"/operating-systems/85/Exams/Network Configurations Manager/network-configurations-manager",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"System Process Monitoring Tool",permalink:"/operating-systems/85/Exams/System Process Monitoring Tool/system-process-monitoring-tool"},next:{title:"FaaS Application",permalink:"/operating-systems/85/Exams/FaaS Application/faas-application"}},l={},p=[{value:"Scenario",id:"scenario",level:2},{value:"Questions",id:"questions",level:2}],c={toc:p},u="wrapper";function g(e){let{components:n,...t}=e;return(0,a.yg)(u,(0,r.A)({},c,t,{components:n,mdxType:"MDXLayout"}),(0,a.yg)("h1",{id:"network-configurations-manager"},"Network Configurations Manager"),(0,a.yg)("h2",{id:"scenario"},"Scenario"),(0,a.yg)("p",null,"We aim to implement an application to run on a home router (Wi-Fi router) to manage network configurations: routing, port forwarding, firewall, Wi-Fi security, etc.\nThe router runs a modern operating system - rich OS, like Linux.\nOther applications, such as a web service providing a user web interface, will interact with the configuration application through IPC mechanisms to query the state of network configurations and/or modify them."),(0,a.yg)("p",null,'Answer the following questions with "True" or "False" and justify the answer.\nJustification should be simple, 2-3 sentences for each answer.'),(0,a.yg)("h2",{id:"questions"},"Questions"),(0,a.yg)("ol",null,(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"The application must be written entirely in a compiled language like C/C++/Rust.\nAnswer: False")),(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"The application can be multi-threaded.\nAnswer: True")),(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"The application is portable to other operating systems.\nAnswer: False")),(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"The application must run in privileged mode.\nAnswer: True")),(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"For security reasons, the application cannot use demand paging.\nAnswer: False")),(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"The application does not have a file descriptor table.\nAnswer: False")),(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"Interaction between the application and other services (such as the web) can be achieved through anonymous pipes.\nAnswer: False")),(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"The application is CPU intensive.\nAnswer: False")),(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"Two instances of the application can be started on the system.\nAnswer: True")),(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"In the application's address space, there are memory areas without write permissions.\nAnswer: True")),(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"The application process will consistently have the highest priority.\nAnswer: False"))))}g.isMDXComponent=!0}}]);