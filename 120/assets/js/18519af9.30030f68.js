"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[4639],{5680:(e,n,t)=>{t.d(n,{xA:()=>c,yg:()=>g});var r=t(6540);function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function a(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){o(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function s(e,n){if(null==e)return{};var t,r,o=function(e,n){if(null==e)return{};var t,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var l=r.createContext({}),p=function(e){var n=r.useContext(l),t=n;return e&&(t="function"==typeof e?e(n):a(a({},n),e)),t},c=function(e){var n=p(e.components);return r.createElement(l.Provider,{value:n},e.children)},m="mdxType",y={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},u=r.forwardRef((function(e,n){var t=e.components,o=e.mdxType,i=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),m=p(t),u=o,g=m["".concat(l,".").concat(u)]||m[u]||y[u]||i;return t?r.createElement(g,a(a({ref:n},c),{},{components:t})):r.createElement(g,a({ref:n},c))}));function g(e,n){var t=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var i=t.length,a=new Array(i);a[0]=u;var s={};for(var l in n)hasOwnProperty.call(n,l)&&(s[l]=n[l]);s.originalType=e,s[m]="string"==typeof e?e:o,a[1]=s;for(var p=2;p<i;p++)a[p]=t[p];return r.createElement.apply(null,a)}return r.createElement.apply(null,t)}u.displayName="MDXCreateElement"},6839:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>a,default:()=>y,frontMatter:()=>i,metadata:()=>s,toc:()=>p});var r=t(8168),o=(t(6540),t(5680));const i={},a="System Process Monitoring Tool",s={unversionedId:"Exams/System Process Monitoring Tool/system-process-monitoring-tool",id:"Exams/System Process Monitoring Tool/system-process-monitoring-tool",title:"System Process Monitoring Tool",description:"Scenario",source:"@site/docs/Exams/System Process Monitoring Tool/system-process-monitoring-tool.md",sourceDirName:"Exams/System Process Monitoring Tool",slug:"/Exams/System Process Monitoring Tool/system-process-monitoring-tool",permalink:"/operating-systems/120/Exams/System Process Monitoring Tool/system-process-monitoring-tool",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"User-level Threading Library",permalink:"/operating-systems/120/Exams/User-level Threading Library/user-level-threading-library"},next:{title:"Network Configurations Manager",permalink:"/operating-systems/120/Exams/Network Configurations Manager/network-configurations-manager"}},l={},p=[{value:"Scenario",id:"scenario",level:2},{value:"Questions",id:"questions",level:2}],c={toc:p},m="wrapper";function y(e){let{components:n,...t}=e;return(0,o.yg)(m,(0,r.A)({},c,t,{components:n,mdxType:"MDXLayout"}),(0,o.yg)("h1",{id:"system-process-monitoring-tool"},"System Process Monitoring Tool"),(0,o.yg)("h2",{id:"scenario"},"Scenario"),(0,o.yg)("p",null,"We want to use a continuous system process monitoring tool that is portable across multiple operating systems.\nThe application shows the resource consumption trends (CPU, memory, disk, network) for all system processes throughout their lifespan.\nInformation is periodically collected using specific operating system interfaces, and it's stored in a database."),(0,o.yg)("p",null,'Answer the following questions with "True" or "False" and justify the answer.\nJustification should be simple, 2-3 sentences for each answer.'),(0,o.yg)("h2",{id:"questions"},"Questions"),(0,o.yg)("ol",null,(0,o.yg)("li",{parentName:"ol"},(0,o.yg)("p",{parentName:"li"},"The application must run in privileged mode.\nAnswer: True")),(0,o.yg)("li",{parentName:"ol"},(0,o.yg)("p",{parentName:"li"},"The application must be written in the C language.\nAnswer: False")),(0,o.yg)("li",{parentName:"ol"},(0,o.yg)("p",{parentName:"li"},"The application is CPU-intensive.\nAnswer: False")),(0,o.yg)("li",{parentName:"ol"},(0,o.yg)("p",{parentName:"li"},"The application will have significantly higher memory consumption than other applications on the system.\nAnswer: False")),(0,o.yg)("li",{parentName:"ol"},(0,o.yg)("p",{parentName:"li"},"The application requires IPC interfaces (pipes, shared memory, sockets) to interact with other applications and collect the necessary monitoring information.\nAnswer: False")),(0,o.yg)("li",{parentName:"ol"},(0,o.yg)("p",{parentName:"li"},"The application can function, with specific design, on both desktop and mobile systems.\nAnswer: True")),(0,o.yg)("li",{parentName:"ol"},(0,o.yg)("p",{parentName:"li"},"The application can only monitor single-threaded processes.\nAnswer: False")),(0,o.yg)("li",{parentName:"ol"},(0,o.yg)("p",{parentName:"li"},"The application cannot run in a virtual machine.\nAnswer: False")),(0,o.yg)("li",{parentName:"ol"},(0,o.yg)("p",{parentName:"li"},"The application cannot memory-map files.\nAnswer: False")),(0,o.yg)("li",{parentName:"ol"},(0,o.yg)("p",{parentName:"li"},"The application benefits from using the buffer cache.\nAnswer: True")),(0,o.yg)("li",{parentName:"ol"},(0,o.yg)("p",{parentName:"li"},"The application can be implemented without using synchronization primitives.\nAnswer: True"))))}y.isMDXComponent=!0}}]);