"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[3828],{5680:(e,t,n)=>{n.d(t,{xA:()=>p,yg:()=>y});var r=n(6540);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function u(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=r.createContext({}),l=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):u(u({},t),e)),n},p=function(e){var t=l(e.components);return r.createElement(s.Provider,{value:t},e.children)},c="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),c=l(n),m=a,y=c["".concat(s,".").concat(m)]||c[m]||d[m]||o;return n?r.createElement(y,u(u({ref:t},p),{},{components:n})):r.createElement(y,u({ref:t},p))}));function y(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,u=new Array(o);u[0]=m;var i={};for(var s in t)hasOwnProperty.call(t,s)&&(i[s]=t[s]);i.originalType=e,i[c]="string"==typeof e?e:a,u[1]=i;for(var l=2;l<o;l++)u[l]=n[l];return r.createElement.apply(null,u)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},4304:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>u,default:()=>d,frontMatter:()=>o,metadata:()=>i,toc:()=>l});var r=n(8168),a=(n(6540),n(5680));const o={},u="The Need for a COMPLETED Queue",i={unversionedId:"Compute/Questions/why-use-completed-queue",id:"Compute/Questions/why-use-completed-queue",title:"The Need for a COMPLETED Queue",description:"Question Text",source:"@site/docs/Compute/Questions/why-use-completed-queue.md",sourceDirName:"Compute/Questions",slug:"/Compute/Questions/why-use-completed-queue",permalink:"/operating-systems/149/Compute/Questions/why-use-completed-queue",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"Number of RUNNING User-Level Threads",permalink:"/operating-systems/149/Compute/Questions/number-of-running-ults"},next:{title:"ULT Thread IDs",permalink:"/operating-systems/149/Compute/Questions/ult-thread-ids"}},s={},l=[{value:"Question Text",id:"question-text",level:2},{value:"Question Answers",id:"question-answers",level:2},{value:"Feedback",id:"feedback",level:2}],p={toc:l},c="wrapper";function d(e){let{components:t,...n}=e;return(0,a.yg)(c,(0,r.A)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,a.yg)("h1",{id:"the-need-for-a-completed-queue"},"The Need for a COMPLETED Queue"),(0,a.yg)("h2",{id:"question-text"},"Question Text"),(0,a.yg)("p",null,"Why does the scheduler need a COMPLETED queue and not simply terminate one thread once its function finishes?"),(0,a.yg)("h2",{id:"question-answers"},"Question Answers"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},"The COMPLETED queue is an implementation preference.\nThe scheduler can expose the same functions without it")),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},"Because the OS's scheduler may kill the main kernel-level thread unless we keep the user-level thread in a queue"))),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"The COMPLETED queue is needed to save the value returned by the thread so that it can later be retrieved by ",(0,a.yg)("inlineCode",{parentName:"li"},"threads_join()"),".")),(0,a.yg)("h2",{id:"feedback"},"Feedback"),(0,a.yg)("p",null,"Take a look at the ",(0,a.yg)("inlineCode",{parentName:"p"},"handle_thread_start()")," function.\nIt is used by ",(0,a.yg)("inlineCode",{parentName:"p"},"threads_create()")," to start executing the given function.\nThis is a wrapper that calls the function associated with the thread (",(0,a.yg)("inlineCode",{parentName:"p"},"this->start_routine"),"), saves its result and then calls ",(0,a.yg)("inlineCode",{parentName:"p"},"threads_exit()"),"\nto store this result in the COMPLETED queue."))}d.isMDXComponent=!0}}]);