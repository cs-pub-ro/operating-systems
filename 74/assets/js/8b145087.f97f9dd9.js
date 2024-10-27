"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[6826],{5680:(e,t,n)=>{n.d(t,{xA:()=>u,yg:()=>f});var r=n(6540);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=r.createContext({}),p=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},u=function(e){var t=p(e.components);return r.createElement(s.Provider,{value:t},e.children)},m="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},y=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,s=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),m=p(n),y=a,f=m["".concat(s,".").concat(y)]||m[y]||c[y]||i;return n?r.createElement(f,o(o({ref:t},u),{},{components:n})):r.createElement(f,o({ref:t},u))}));function f(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=y;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[m]="string"==typeof e?e:a,o[1]=l;for(var p=2;p<i;p++)o[p]=n[p];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}y.displayName="MDXCreateElement"},6737:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>o,default:()=>c,frontMatter:()=>i,metadata:()=>l,toc:()=>p});var r=n(8168),a=(n(6540),n(5680));const i={},o="`mmap()` file",l={unversionedId:"Data/Questions/mmap-file",id:"Data/Questions/mmap-file",title:"`mmap()` file",description:"Question Text",source:"@site/docs/Data/Questions/mmap-file.md",sourceDirName:"Data/Questions",slug:"/Data/Questions/mmap-file",permalink:"/operating-systems/74/Data/Questions/mmap-file",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"Memory Granularity",permalink:"/operating-systems/74/Data/Questions/memory-granularity"},next:{title:"Page Allocation",permalink:"/operating-systems/74/Data/Questions/page-allocation"}},s={},p=[{value:"Question Text",id:"question-text",level:2},{value:"Question Answers",id:"question-answers",level:2},{value:"Feedback",id:"feedback",level:2}],u={toc:p},m="wrapper";function c(e){let{components:t,...n}=e;return(0,a.yg)(m,(0,r.A)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,a.yg)("h1",{id:"mmap-file"},(0,a.yg)("inlineCode",{parentName:"h1"},"mmap()")," file"),(0,a.yg)("h2",{id:"question-text"},"Question Text"),(0,a.yg)("p",null,"What is one advantage of mapping a file in memory?"),(0,a.yg)("h2",{id:"question-answers"},"Question Answers"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"It reduces interaction with the disk")),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},"Consumes less memory")),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},"It is faster because it does not uses the file API")),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},"Allows all threads to use the same memory area"))),(0,a.yg)("h2",{id:"feedback"},"Feedback"),(0,a.yg)("p",null,"After mapping a file in memory, all changes will be visible only in memory.\nWhen removing the mapping or explicitly calling ",(0,a.yg)("inlineCode",{parentName:"p"},"msync()")," the information from memory will be visible on disk."))}c.isMDXComponent=!0}}]);