"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[4711],{5680:(e,n,t)=>{t.d(n,{xA:()=>c,yg:()=>y});var a=t(6540);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function o(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function s(e,n){if(null==e)return{};var t,a,r=function(e,n){if(null==e)return{};var t,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)t=i[a],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)t=i[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var p=a.createContext({}),l=function(e){var n=a.useContext(p),t=n;return e&&(t="function"==typeof e?e(n):o(o({},n),e)),t},c=function(e){var n=l(e.components);return a.createElement(p.Provider,{value:n},e.children)},m="mdxType",u={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},g=a.forwardRef((function(e,n){var t=e.components,r=e.mdxType,i=e.originalType,p=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),m=l(t),g=r,y=m["".concat(p,".").concat(g)]||m[g]||u[g]||i;return t?a.createElement(y,o(o({ref:n},c),{},{components:t})):a.createElement(y,o({ref:n},c))}));function y(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var i=t.length,o=new Array(i);o[0]=g;var s={};for(var p in n)hasOwnProperty.call(n,p)&&(s[p]=n[p]);s.originalType=e,s[m]="string"==typeof e?e:r,o[1]=s;for(var l=2;l<i;l++)o[l]=t[l];return a.createElement.apply(null,o)}return a.createElement.apply(null,t)}g.displayName="MDXCreateElement"},295:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>p,contentTitle:()=>o,default:()=>u,frontMatter:()=>i,metadata:()=>s,toc:()=>l});var a=t(8168),r=(t(6540),t(5680));const i={},o="Benchmarking Application",s={unversionedId:"Exams/Benchmarking Application/benchmarking-application",id:"Exams/Benchmarking Application/benchmarking-application",title:"Benchmarking Application",description:"Scenario",source:"@site/docs/Exams/Benchmarking Application/benchmarking-application.md",sourceDirName:"Exams/Benchmarking Application",slug:"/Exams/Benchmarking Application/benchmarking-application",permalink:"/operating-systems/67/Exams/Benchmarking Application/benchmarking-application",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"Distributed system",permalink:"/operating-systems/67/Exams/Distributed System/distributed-system"},next:{title:"Hackathons",permalink:"/operating-systems/67/Hackathons/"}},p={},l=[{value:"Scenario",id:"scenario",level:2},{value:"Questions",id:"questions",level:2}],c={toc:l},m="wrapper";function u(e){let{components:n,...t}=e;return(0,r.yg)(m,(0,a.A)({},c,t,{components:n,mdxType:"MDXLayout"}),(0,r.yg)("h1",{id:"benchmarking-application"},"Benchmarking Application"),(0,r.yg)("h2",{id:"scenario"},"Scenario"),(0,r.yg)("p",null,"We aim to implement a web application benchmarking solution.\nThis application will perform web client actions towards a remote web application to obtain metrics such as response time, scalability (how response time degrades with the number of simultaneous connections to the application), with variations for request or response size."),(0,r.yg)("p",null,'Answer the following questions with "True" or "False" and justify the answer.\nJustification should be simple, 2-3 sentences for each answer.'),(0,r.yg)("h2",{id:"questions"},"Questions"),(0,r.yg)("ol",null,(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},"The benchmarking application uses network sockets.\nAnswer: True")),(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},"The benchmarking application is required to be multi-threaded.\nAnswer: False")),(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},"The benchmarking application has more voluntary context switches than involuntary ones.\nAnswer: True")),(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},"The benchmarking application must run as a privileged user.\nAnswer: False")),(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},"Two benchmarking applications can run simultaneously on the same system.\nAnswer: True")),(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},"The benchmarking application heavily uses the system's disk/storage.\nAnswer: False")),(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},"The benchmarking application must be implemented in a compiled language, not an interpreted one.\nAnswer: False")),(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},"The benchmarking application can be implemented as a static executable.\nAnswer: True")),(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},"Running the benchmarking application on the same station as the web application provides better results than remote testing.\nAnswer: True")),(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},"With the necessary modifications, the application can handle both HTTP and HTTPS connections.\nAnswer: True")),(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},"The benchmarking application can only measure open-source web applications + open-source web servers (with available sources).\nAnswer: False"))))}u.isMDXComponent=!0}}]);