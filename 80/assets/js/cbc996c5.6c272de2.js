"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[2289],{5680:(e,n,t)=>{t.d(n,{xA:()=>c,yg:()=>f});var r=t(6540);function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function a(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function l(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?a(Object(t),!0).forEach((function(n){o(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function u(e,n){if(null==e)return{};var t,r,o=function(e,n){if(null==e)return{};var t,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var i=r.createContext({}),s=function(e){var n=r.useContext(i),t=n;return e&&(t="function"==typeof e?e(n):l(l({},n),e)),t},c=function(e){var n=s(e.components);return r.createElement(i.Provider,{value:n},e.children)},p="mdxType",m={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},y=r.forwardRef((function(e,n){var t=e.components,o=e.mdxType,a=e.originalType,i=e.parentName,c=u(e,["components","mdxType","originalType","parentName"]),p=s(t),y=o,f=p["".concat(i,".").concat(y)]||p[y]||m[y]||a;return t?r.createElement(f,l(l({ref:n},c),{},{components:t})):r.createElement(f,l({ref:n},c))}));function f(e,n){var t=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var a=t.length,l=new Array(a);l[0]=y;var u={};for(var i in n)hasOwnProperty.call(n,i)&&(u[i]=n[i]);u.originalType=e,u[p]="string"==typeof e?e:o,l[1]=u;for(var s=2;s<a;s++)l[s]=t[s];return r.createElement.apply(null,l)}return r.createElement.apply(null,t)}y.displayName="MDXCreateElement"},6808:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>i,contentTitle:()=>l,default:()=>m,frontMatter:()=>a,metadata:()=>u,toc:()=>s});var r=t(8168),o=(t(6540),t(5680));const a={},l="Number of RUNNING User-Level Threads",u={unversionedId:"Lab/Compute/quiz/number-of-running-ults",id:"Lab/Compute/quiz/number-of-running-ults",title:"Number of RUNNING User-Level Threads",description:"Question Text",source:"@site/docs/Lab/Compute/quiz/number-of-running-ults.md",sourceDirName:"Lab/Compute/quiz",slug:"/Lab/Compute/quiz/number-of-running-ults",permalink:"/operating-systems/80/Lab/Compute/quiz/number-of-running-ults",draft:!1,tags:[],version:"current",frontMatter:{}},i={},s=[{value:"Question Text",id:"question-text",level:2},{value:"Question Answers",id:"question-answers",level:2},{value:"Feedback",id:"feedback",level:2}],c={toc:s},p="wrapper";function m(e){let{components:n,...t}=e;return(0,o.yg)(p,(0,r.A)({},c,t,{components:n,mdxType:"MDXLayout"}),(0,o.yg)("h1",{id:"number-of-running-user-level-threads"},"Number of RUNNING User-Level Threads"),(0,o.yg)("h2",{id:"question-text"},"Question Text"),(0,o.yg)("p",null,"How many threads can be RUNNING simultaneously if we only create them using the API exposed by ",(0,o.yg)("inlineCode",{parentName:"p"},"libult.so"),"?"),(0,o.yg)("h2",{id:"question-answers"},"Question Answers"),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},"Equal to the number of cores on the CPU")),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},"1")),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("p",{parentName:"li"},"None")),(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("p",{parentName:"li"},"2: the main thread and another one for the created threads"))),(0,o.yg)("h2",{id:"feedback"},"Feedback"),(0,o.yg)("p",null,"Only kernel-level threads can run in parallel.\nSince all ",(0,o.yg)("inlineCode",{parentName:"p"},"libult.so")," threads are user-level threads, they run within the same kernel-level thread, so only one of them can run at any time."))}m.isMDXComponent=!0}}]);