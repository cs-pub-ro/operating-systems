"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[4921],{5680:(e,t,r)=>{r.d(t,{xA:()=>u,yg:()=>g});var n=r(6540);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var l=n.createContext({}),c=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},u=function(e){var t=c(e.components);return n.createElement(l.Provider,{value:t},e.children)},p="mdxType",y={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},f=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),p=c(r),f=a,g=p["".concat(l,".").concat(f)]||p[f]||y[f]||o;return r?n.createElement(g,i(i({ref:t},u),{},{components:r})):n.createElement(g,i({ref:t},u))}));function g(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,i=new Array(o);i[0]=f;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[p]="string"==typeof e?e:a,i[1]=s;for(var c=2;c<o;c++)i[c]=r[c];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}f.displayName="MDXCreateElement"},7002:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>y,frontMatter:()=>o,metadata:()=>s,toc:()=>c});var n=r(8168),a=(r(6540),r(5680));const o={},i="Strcpy Buffer Overflow",s={unversionedId:"Data/Questions/string-strcpy",id:"Data/Questions/string-strcpy",title:"Strcpy Buffer Overflow",description:"Question Text",source:"@site/docs/Data/Questions/string-strcpy.md",sourceDirName:"Data/Questions",slug:"/Data/Questions/string-strcpy",permalink:"/operating-systems/74/Data/Questions/string-strcpy",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"String Buffer Overflow",permalink:"/operating-systems/74/Data/Questions/string-buff-over"},next:{title:"Lab 3 - Memory",permalink:"/operating-systems/74/Data/lab3"}},l={},c=[{value:"Question Text",id:"question-text",level:2},{value:"Question Answers",id:"question-answers",level:2},{value:"Feedback",id:"feedback",level:2}],u={toc:c},p="wrapper";function y(e){let{components:t,...r}=e;return(0,a.yg)(p,(0,n.A)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,a.yg)("h1",{id:"strcpy-buffer-overflow"},"Strcpy Buffer Overflow"),(0,a.yg)("h2",{id:"question-text"},"Question Text"),(0,a.yg)("p",null,"Does any buffer overflow occur with the latest version of the program?"),(0,a.yg)("h2",{id:"question-answers"},"Question Answers"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},"no, because ",(0,a.yg)("inlineCode",{parentName:"p"},"strcpy()")," was designed to correctly handle such situations.")),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},"no, because the string is correctly printed, i.e. no extra characters.")),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},"we cannot know"))),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"yes, ",(0,a.yg)("inlineCode",{parentName:"li"},"strcpy()")," copies the entirety of the source, including the ",(0,a.yg)("inlineCode",{parentName:"li"},"\\0"),"; since the size of ",(0,a.yg)("inlineCode",{parentName:"li"},"dst")," is 4 the null byte overwrites the least significant byte of ",(0,a.yg)("inlineCode",{parentName:"li"},"var"))),(0,a.yg)("h2",{id:"feedback"},"Feedback"),(0,a.yg)("p",null,"Print the contents of variable ",(0,a.yg)("inlineCode",{parentName:"p"},"var"),"."))}y.isMDXComponent=!0}}]);