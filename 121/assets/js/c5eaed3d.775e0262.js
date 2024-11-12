"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[4943],{5680:(e,t,n)=>{n.d(t,{xA:()=>c,yg:()=>d});var r=n(6540);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var l=r.createContext({}),u=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},c=function(e){var t=u(e.components);return r.createElement(l.Provider,{value:t},e.children)},p="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},g=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,a=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),p=u(n),g=i,d=p["".concat(l,".").concat(g)]||p[g]||m[g]||a;return n?r.createElement(d,o(o({ref:t},c),{},{components:n})):r.createElement(d,o({ref:t},c))}));function d(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var a=n.length,o=new Array(a);o[0]=g;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[p]="string"==typeof e?e:i,o[1]=s;for(var u=2;u<a;u++)o[u]=n[u];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}g.displayName="MDXCreateElement"},1906:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>m,frontMatter:()=>a,metadata:()=>s,toc:()=>u});var r=n(8168),i=(n(6540),n(5680));const a={},o="Time Slice Value",s={unversionedId:"Compute/Questions/time-slice-value",id:"Compute/Questions/time-slice-value",title:"Time Slice Value",description:"Question Text",source:"@site/docs/Compute/Questions/time-slice-value.md",sourceDirName:"Compute/Questions",slug:"/Compute/Questions/time-slice-value",permalink:"/operating-systems/121/Compute/Questions/time-slice-value",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"Similarities Between the TCBs of `libult` and Unikraft",permalink:"/operating-systems/121/Compute/Questions/tcb-libult-unikraft"},next:{title:"Number of Running Threads",permalink:"/operating-systems/121/Compute/Questions/number-of-running-threads"}},l={},u=[{value:"Question Text",id:"question-text",level:2},{value:"Question Answers",id:"question-answers",level:2},{value:"Feedback",id:"feedback",level:2}],c={toc:u},p="wrapper";function m(e){let{components:t,...n}=e;return(0,i.yg)(p,(0,r.A)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,i.yg)("h1",{id:"time-slice-value"},"Time Slice Value"),(0,i.yg)("h2",{id:"question-text"},"Question Text"),(0,i.yg)("p",null,"Using the ",(0,i.yg)("a",{parentName:"p",href:"https://man7.org/linux/man-pages/man2/setitimer.2.html"},"man page"),", what is the time slice used by the scheduler in ",(0,i.yg)("inlineCode",{parentName:"p"},"libult.so"),"?"),(0,i.yg)("h2",{id:"question-answers"},"Question Answers"),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("p",{parentName:"li"},"100 milliseconds")),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("p",{parentName:"li"},"10 microseconds")),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("p",{parentName:"li"},"100 microseconds"))),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},"10 milliseconds")),(0,i.yg)("h2",{id:"feedback"},"Feedback"),(0,i.yg)("p",null,"The code we're interested in lies in the function ",(0,i.yg)("inlineCode",{parentName:"p"},"init_profiling_timer()"),":"),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-C"},"const struct itimerval timer = {\n    { 0, 10000 },\n    { 0, 1 }  // arms the timer as soon as possible\n};\n")),(0,i.yg)("p",null,"The ",(0,i.yg)("a",{parentName:"p",href:"https://man7.org/linux/man-pages/man2/setitimer.2.html"},"man page")," gives the following definition the ",(0,i.yg)("inlineCode",{parentName:"p"},"struct itimerval"),":"),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-C"},"struct itimerval {\n    struct timeval it_interval; /* Interval for periodic timer */\n    struct timeval it_value;    /* Time until next expiration */\n};\n\nstruct timeval {\n    time_t      tv_sec;         /* seconds */\n    suseconds_t tv_usec;        /* microseconds */\n};\n")),(0,i.yg)("p",null,"So when constructing the ",(0,i.yg)("inlineCode",{parentName:"p"},"timer")," variable, ",(0,i.yg)("inlineCode",{parentName:"p"},"{ 0, 10000 }")," means 0 seconds and 10000 microseconds, i.e. 0 seconds and 10 milliseconds."))}m.isMDXComponent=!0}}]);