"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[9088],{5680:(e,r,n)=>{n.d(r,{xA:()=>y,yg:()=>g});var t=n(6540);function a(e,r,n){return r in e?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n,e}function i(e,r){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);r&&(t=t.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),n.push.apply(n,t)}return n}function l(e){for(var r=1;r<arguments.length;r++){var n=null!=arguments[r]?arguments[r]:{};r%2?i(Object(n),!0).forEach((function(r){a(e,r,n[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))}))}return e}function s(e,r){if(null==e)return{};var n,t,a=function(e,r){if(null==e)return{};var n,t,a={},i=Object.keys(e);for(t=0;t<i.length;t++)n=i[t],r.indexOf(n)>=0||(a[n]=e[n]);return a}(e,r);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(t=0;t<i.length;t++)n=i[t],r.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var o=t.createContext({}),p=function(e){var r=t.useContext(o),n=r;return e&&(n="function"==typeof e?e(r):l(l({},r),e)),n},y=function(e){var r=p(e.components);return t.createElement(o.Provider,{value:r},e.children)},c="mdxType",u={inlineCode:"code",wrapper:function(e){var r=e.children;return t.createElement(t.Fragment,{},r)}},m=t.forwardRef((function(e,r){var n=e.components,a=e.mdxType,i=e.originalType,o=e.parentName,y=s(e,["components","mdxType","originalType","parentName"]),c=p(n),m=a,g=c["".concat(o,".").concat(m)]||c[m]||u[m]||i;return n?t.createElement(g,l(l({ref:r},y),{},{components:n})):t.createElement(g,l({ref:r},y))}));function g(e,r){var n=arguments,a=r&&r.mdxType;if("string"==typeof e||a){var i=n.length,l=new Array(i);l[0]=m;var s={};for(var o in r)hasOwnProperty.call(r,o)&&(s[o]=r[o]);s.originalType=e,s[c]="string"==typeof e?e:a,l[1]=s;for(var p=2;p<i;p++)l[p]=n[p];return t.createElement.apply(null,l)}return t.createElement.apply(null,n)}m.displayName="MDXCreateElement"},9198:(e,r,n)=>{n.r(r),n.d(r,{assets:()=>o,contentTitle:()=>l,default:()=>u,frontMatter:()=>i,metadata:()=>s,toc:()=>p});var t=n(8168),a=(n(6540),n(5680));const i={},l="User-level Threading Library",s={unversionedId:"Exams/User-level Threading Library/user-level-threading-library",id:"Exams/User-level Threading Library/user-level-threading-library",title:"User-level Threading Library",description:"Scenario",source:"@site/docs/Exams/User-level Threading Library/user-level-threading-library.md",sourceDirName:"Exams/User-level Threading Library",slug:"/Exams/User-level Threading Library/user-level-threading-library",permalink:"/operating-systems/137/Exams/User-level Threading Library/user-level-threading-library",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"Nightly Builds System",permalink:"/operating-systems/137/Exams/Nightly Builds System/nightly-builds-system"},next:{title:"System Process Monitoring Tool",permalink:"/operating-systems/137/Exams/System Process Monitoring Tool/system-process-monitoring-tool"}},o={},p=[{value:"Scenario",id:"scenario",level:2},{value:"Questions",id:"questions",level:2}],y={toc:p},c="wrapper";function u(e){let{components:r,...n}=e;return(0,a.yg)(c,(0,t.A)({},y,n,{components:r,mdxType:"MDXLayout"}),(0,a.yg)("h1",{id:"user-level-threading-library"},"User-level Threading Library"),(0,a.yg)("h2",{id:"scenario"},"Scenario"),(0,a.yg)("p",null,"We aim to implement a user-level threading library that provides a POSIX Threads (",(0,a.yg)("inlineCode",{parentName:"p"},"pthreads"),") API.\nThe library should be portable across different operating systems and architectures and should be usable in programs written in various programming languages."),(0,a.yg)("p",null,'Answer the following questions with "True" or "False" and justify the answer.\nJustification should be simple, 2-3 sentences for each answer.'),(0,a.yg)("h2",{id:"questions"},"Questions"),(0,a.yg)("ol",null,(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"The library can only be used in programs written in compiled languages, NOT interpreted ones.\nAnswer: False")),(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"The library can work on operating systems with and without kernel-level thread support.\nAnswer: True")),(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"The library does not need to expose synchronization primitives (working with mutexes, spinlocks, condition variables).\nAnswer: False")),(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"Programs using the library must be dynamically linked.\nAnswer: False")),(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"Code within the library does produce page faults.\nAnswer: False")),(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"Code within the library does not lead to system calls.\nAnswer: False")),(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"For creating a thread on Linux, the library uses the ",(0,a.yg)("inlineCode",{parentName:"p"},"clone()")," system call.\nAnswer: False")),(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"Programs using the library can run in a Docker container.\nAnswer: True")),(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"Modifying a file cursor in one thread will be visible in another thread.\nAnswer: True")),(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"A program using the library will use only one core/processor.\nAnswer: True")),(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"Programs using the library cannot use shared memory to communicate with other processes.\nAnswer: False"))))}u.isMDXComponent=!0}}]);