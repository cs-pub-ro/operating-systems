"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[6454],{5680:(e,t,n)=>{n.d(t,{xA:()=>u,yg:()=>m});var a=n(6540);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var i=a.createContext({}),p=function(e){var t=a.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},u=function(e){var t=p(e.components);return a.createElement(i.Provider,{value:t},e.children)},c="mdxType",f={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},g=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,i=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),c=p(n),g=r,m=c["".concat(i,".").concat(g)]||c[g]||f[g]||o;return n?a.createElement(m,l(l({ref:t},u),{},{components:n})):a.createElement(m,l({ref:t},u))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,l=new Array(o);l[0]=g;var s={};for(var i in t)hasOwnProperty.call(t,i)&&(s[i]=t[i]);s.originalType=e,s[c]="string"==typeof e?e:r,l[1]=s;for(var p=2;p<o;p++)l[p]=n[p];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}g.displayName="MDXCreateElement"},9558:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>i,contentTitle:()=>l,default:()=>f,frontMatter:()=>o,metadata:()=>s,toc:()=>p});var a=n(8168),r=(n(6540),n(5680));const o={},l="Half Page",s={unversionedId:"Data/Questions/half-page",id:"Data/Questions/half-page",title:"Half Page",description:"Question Text",source:"@site/docs/Data/Questions/half-page.md",sourceDirName:"Data/Questions",slug:"/Data/Questions/half-page",permalink:"/operating-systems/116/Data/Questions/half-page",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"Modify String",permalink:"/operating-systems/116/Data/Questions/memory-access"},next:{title:"malloc()` and `brk()",permalink:"/operating-systems/116/Data/Questions/malloc-brk"}},i={},p=[{value:"Question Text",id:"question-text",level:2},{value:"Question Answers",id:"question-answers",level:2},{value:"Feedback",id:"feedback",level:2}],u={toc:p},c="wrapper";function f(e){let{components:t,...n}=e;return(0,r.yg)(c,(0,a.A)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,r.yg)("h1",{id:"half-page"},"Half Page"),(0,r.yg)("h2",{id:"question-text"},"Question Text"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-c"},"char *p = malloc(2 * 1024);\n")),(0,r.yg)("p",null,"What is a potential problem when allocating half a page?"),(0,r.yg)("h2",{id:"question-answers"},"Question Answers"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},"It will fragment the virtual memory because users should always request at least one page")),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},"Asking for less than a page might place the memory on two different pages"))),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"Writing to the other half may be allowed")),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"Allocations smaller than one page should use the stack")),(0,r.yg)("h2",{id:"feedback"},"Feedback"),(0,r.yg)("p",null,"The OS allocates memory in chunks of 4 KB (the page size).\nIf the memory we allocate happens to be placed at the beginning of a page, we have permission to update the second half of this page despite not requesting it.\nThis might be a problem because buffer overflows can pass unnoticed."))}f.isMDXComponent=!0}}]);