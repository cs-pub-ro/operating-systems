"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[7143],{5680:(e,t,n)=>{n.d(t,{xA:()=>p,yg:()=>f});var r=n(6540);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function u(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?u(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):u(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},u=Object.keys(e);for(r=0;r<u.length;r++)n=u[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var u=Object.getOwnPropertySymbols(e);for(r=0;r<u.length;r++)n=u[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var i=r.createContext({}),s=function(e){var t=r.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},p=function(e){var t=s(e.components);return r.createElement(i.Provider,{value:t},e.children)},c="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},y=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,u=e.originalType,i=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),c=s(n),y=o,f=c["".concat(i,".").concat(y)]||c[y]||m[y]||u;return n?r.createElement(f,a(a({ref:t},p),{},{components:n})):r.createElement(f,a({ref:t},p))}));function f(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var u=n.length,a=new Array(u);a[0]=y;var l={};for(var i in t)hasOwnProperty.call(t,i)&&(l[i]=t[i]);l.originalType=e,l[c]="string"==typeof e?e:o,a[1]=l;for(var s=2;s<u;s++)a[s]=n[s];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}y.displayName="MDXCreateElement"},7210:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>i,contentTitle:()=>a,default:()=>m,frontMatter:()=>u,metadata:()=>l,toc:()=>s});var r=n(8168),o=(n(6540),n(5680));const u={},a="Number of RUNNING User-Level Threads",l={unversionedId:"Compute/Questions/number-of-running-ults",id:"Compute/Questions/number-of-running-ults",title:"Number of RUNNING User-Level Threads",description:"Question Text",source:"@site/docs/Compute/Questions/number-of-running-ults.md",sourceDirName:"Compute/Questions",slug:"/Compute/Questions/number-of-running-ults",permalink:"/operating-systems/137/Compute/Questions/number-of-running-ults",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"Type of Scheduler in `libult.so`",permalink:"/operating-systems/137/Compute/Questions/type-of-scheduler-in-libult"},next:{title:"The Need for a COMPLETED Queue",permalink:"/operating-systems/137/Compute/Questions/why-use-completed-queue"}},i={},s=[{value:"Question Text",id:"question-text",level:2},{value:"Question Answers",id:"question-answers",level:2},{value:"Feedback",id:"feedback",level:2}],p={toc:s},c="wrapper";function m(e){let{components:t,...n}=e;return(0,o.yg)(c,(0,r.A)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,o.yg)("h1",{id:"number-of-running-user-level-threads"},"Number of RUNNING User-Level Threads"),(0,o.yg)("h2",{id:"question-text"},"Question Text"),(0,o.yg)("p",null,"How many threads can be RUNNING simultaneously if we only create them using the API exposed by ",(0,o.yg)("inlineCode",{parentName:"p"},"libult.so"),"?"),(0,o.yg)("h2",{id:"question-answers"},"Question Answers"),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},"Equal to the number of cores on the CPU")),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},"1")),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("p",{parentName:"li"},"None")),(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("p",{parentName:"li"},"2: the main thread and another one for the created threads"))),(0,o.yg)("h2",{id:"feedback"},"Feedback"),(0,o.yg)("p",null,"Only kernel-level threads can run in parallel.\nSince all ",(0,o.yg)("inlineCode",{parentName:"p"},"libult.so")," threads are user-level threads, they run within the same kernel-level thread, so only one of them can run at any time."))}m.isMDXComponent=!0}}]);