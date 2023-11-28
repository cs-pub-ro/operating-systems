"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[1482],{3905:(e,t,r)=>{r.d(t,{Zo:()=>u,kt:()=>d});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var p=n.createContext({}),c=function(e){var t=n.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},u=function(e){var t=c(e.components);return n.createElement(p.Provider,{value:t},e.children)},s="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},f=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,p=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),s=c(r),f=a,d=s["".concat(p,".").concat(f)]||s[f]||m[f]||o;return r?n.createElement(d,i(i({ref:t},u),{},{components:r})):n.createElement(d,i({ref:t},u))}));function d(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,i=new Array(o);i[0]=f;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l[s]="string"==typeof e?e:a,i[1]=l;for(var c=2;c<o;c++)i[c]=r[c];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}f.displayName="MDXCreateElement"},5133:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>p,contentTitle:()=>i,default:()=>m,frontMatter:()=>o,metadata:()=>l,toc:()=>c});var n=r(7462),a=(r(7294),r(3905));const o={},i="TLS `var` Copies",l={unversionedId:"Lab/Compute/quiz/tls-var-copies",id:"Lab/Compute/quiz/tls-var-copies",title:"TLS `var` Copies",description:"Question Text",source:"@site/docs/Lab/Compute/quiz/tls-var-copies.md",sourceDirName:"Lab/Compute/quiz",slug:"/Lab/Compute/quiz/tls-var-copies",permalink:"/operating-systems/32/Lab/Compute/quiz/tls-var-copies",draft:!1,tags:[],version:"current",frontMatter:{}},p={},c=[{value:"Question Text",id:"question-text",level:2},{value:"Question Answers",id:"question-answers",level:2},{value:"Feedback",id:"feedback",level:2}],u={toc:c},s="wrapper";function m(e){let{components:t,...r}=e;return(0,a.kt)(s,(0,n.Z)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"tls-var-copies"},"TLS ",(0,a.kt)("inlineCode",{parentName:"h1"},"var")," Copies"),(0,a.kt)("h2",{id:"question-text"},"Question Text"),(0,a.kt)("p",null,"How many copies of the ",(0,a.kt)("inlineCode",{parentName:"p"},"var")," variable from ",(0,a.kt)("inlineCode",{parentName:"p"},"support/race-condition/c/race_condition_tls.c")," are there after each thread has modified it at leas once?"),(0,a.kt)("h2",{id:"question-answers"},"Question Answers"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"1")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"2"))),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"3")),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"5")),(0,a.kt)("h2",{id:"feedback"},"Feedback"),(0,a.kt)("p",null,"There are 3 copies one for the ",(0,a.kt)("inlineCode",{parentName:"p"},"main()")," thread, another one for ",(0,a.kt)("inlineCode",{parentName:"p"},"increment_var()")," and the third for ",(0,a.kt)("inlineCode",{parentName:"p"},"decrement_var()"),"."))}m.isMDXComponent=!0}}]);