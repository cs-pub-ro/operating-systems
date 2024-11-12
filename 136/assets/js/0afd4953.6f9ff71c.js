"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[2741],{5680:(e,t,r)=>{r.d(t,{xA:()=>c,yg:()=>m});var n=r(6540);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function s(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?s(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):s(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},s=Object.keys(e);for(n=0;n<s.length;n++)r=s[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(n=0;n<s.length;n++)r=s[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var i=n.createContext({}),u=function(e){var t=n.useContext(i),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},c=function(e){var t=u(e.components);return n.createElement(i.Provider,{value:t},e.children)},p="mdxType",y={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},f=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,s=e.originalType,i=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),p=u(r),f=a,m=p["".concat(i,".").concat(f)]||p[f]||y[f]||s;return r?n.createElement(m,o(o({ref:t},c),{},{components:r})):n.createElement(m,o({ref:t},c))}));function m(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var s=r.length,o=new Array(s);o[0]=f;var l={};for(var i in t)hasOwnProperty.call(t,i)&&(l[i]=t[i]);l.originalType=e,l[p]="string"==typeof e?e:a,o[1]=l;for(var u=2;u<s;u++)o[u]=r[u];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}f.displayName="MDXCreateElement"},6474:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>i,contentTitle:()=>o,default:()=>y,frontMatter:()=>s,metadata:()=>l,toc:()=>u});var n=r(8168),a=(r(6540),r(5680));const s={},o="Syscall Numbers",l={unversionedId:"Software Stack/Questions/syscall-numbers",id:"Software Stack/Questions/syscall-numbers",title:"Syscall Numbers",description:"Question Text",source:"@site/docs/Software Stack/Questions/syscall-numbers.md",sourceDirName:"Software Stack/Questions",slug:"/Software Stack/Questions/syscall-numbers",permalink:"/operating-systems/136/Software Stack/Questions/syscall-numbers",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"Static Executables",permalink:"/operating-systems/136/Software Stack/Questions/static-executables"},next:{title:"printf() System Call",permalink:"/operating-systems/136/Software Stack/Questions/printf-syscall"}},i={},u=[{value:"Question Text",id:"question-text",level:2},{value:"Question Answers",id:"question-answers",level:2},{value:"Feedback",id:"feedback",level:2}],c={toc:u},p="wrapper";function y(e){let{components:t,...r}=e;return(0,a.yg)(p,(0,n.A)({},c,r,{components:t,mdxType:"MDXLayout"}),(0,a.yg)("h1",{id:"syscall-numbers"},"Syscall Numbers"),(0,a.yg)("h2",{id:"question-text"},"Question Text"),(0,a.yg)("p",null,"What is the approximate number of system call numbers in Linux?"),(0,a.yg)("h2",{id:"question-answers"},"Question Answers"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},"3")),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},"30"))),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"300")),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"3000")),(0,a.yg)("h2",{id:"feedback"},"Feedback"),(0,a.yg)("p",null,"As show ",(0,a.yg)("a",{parentName:"p",href:"https://x64.syscall.sh/"},"here"),", they're about 300 system calls in Linux."))}y.isMDXComponent=!0}}]);