"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[6806],{5680:(e,t,n)=>{n.d(t,{xA:()=>c,yg:()=>y});var r=n(6540);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function u(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=r.createContext({}),l=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},c=function(e){var t=l(e.components);return r.createElement(s.Provider,{value:t},e.children)},p="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},f=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,s=e.parentName,c=u(e,["components","mdxType","originalType","parentName"]),p=l(n),f=o,y=p["".concat(s,".").concat(f)]||p[f]||m[f]||a;return n?r.createElement(y,i(i({ref:t},c),{},{components:n})):r.createElement(y,i({ref:t},c))}));function y(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,i=new Array(a);i[0]=f;var u={};for(var s in t)hasOwnProperty.call(t,s)&&(u[s]=t[s]);u.originalType=e,u[p]="string"==typeof e?e:o,i[1]=u;for(var l=2;l<a;l++)i[l]=n[l];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}f.displayName="MDXCreateElement"},6489:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>m,frontMatter:()=>a,metadata:()=>u,toc:()=>l});var r=n(8168),o=(n(6540),n(5680));const a={},i="Number of Running Threads",u={unversionedId:"Compute/Questions/number-of-running-threads",id:"Compute/Questions/number-of-running-threads",title:"Number of Running Threads",description:"Question Text",source:"@site/docs/Compute/Questions/number-of-running-threads.md",sourceDirName:"Compute/Questions",slug:"/Compute/Questions/number-of-running-threads",permalink:"/operating-systems/137/Compute/Questions/number-of-running-threads",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"Time Slice Value",permalink:"/operating-systems/137/Compute/Questions/time-slice-value"},next:{title:"Both Condition and Mutex",permalink:"/operating-systems/137/Compute/Questions/notify-only-with-mutex"}},s={},l=[{value:"Question Text",id:"question-text",level:2},{value:"Question Answers",id:"question-answers",level:2},{value:"Feedback",id:"feedback",level:2}],c={toc:l},p="wrapper";function m(e){let{components:t,...n}=e;return(0,o.yg)(p,(0,r.A)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,o.yg)("h1",{id:"number-of-running-threads"},"Number of Running Threads"),(0,o.yg)("h2",{id:"question-text"},"Question Text"),(0,o.yg)("p",null,"What is the maximum number of threads that can be in the RUNNING state at any time?"),(0,o.yg)("h2",{id:"question-answers"},"Question Answers"),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("p",{parentName:"li"},"All of them")),(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("p",{parentName:"li"},"Only one")),(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("p",{parentName:"li"},"It depends on the ISA"))),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},"As many as the number of CPU cores")),(0,o.yg)("h2",{id:"feedback"},"Feedback"),(0,o.yg)("p",null,"A RUNNING thread needs a CPU core on which to run.\nTherefore, we cannot have more threads in the RUNNING state than the number of CPU cores."))}m.isMDXComponent=!0}}]);