"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[7089],{3905:(e,t,r)=>{r.d(t,{Zo:()=>u,kt:()=>f});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var c=n.createContext({}),p=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):s(s({},t),e)),r},u=function(e){var t=p(e.components);return n.createElement(c.Provider,{value:t},e.children)},l="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,c=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),l=p(r),d=a,f=l["".concat(c,".").concat(d)]||l[d]||m[d]||o;return r?n.createElement(f,s(s({ref:t},u),{},{components:r})):n.createElement(f,s({ref:t},u))}));function f(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,s=new Array(o);s[0]=d;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i[l]="string"==typeof e?e:a,s[1]=i;for(var p=2;p<o;p++)s[p]=r[p];return n.createElement.apply(null,s)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},9726:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>s,default:()=>m,frontMatter:()=>o,metadata:()=>i,toc:()=>p});var n=r(7462),a=(r(7294),r(3905));const o={},s="Cgroups versus namespaces",i={unversionedId:"Lab/Application Interaction/quiz/cgroups-vs-namespaces",id:"Lab/Application Interaction/quiz/cgroups-vs-namespaces",title:"Cgroups versus namespaces",description:"Question Text",source:"@site/docs/Lab/Application Interaction/quiz/cgroups-vs-namespaces.md",sourceDirName:"Lab/Application Interaction/quiz",slug:"/Lab/Application Interaction/quiz/cgroups-vs-namespaces",permalink:"/operating-systems/17/Lab/Application Interaction/quiz/cgroups-vs-namespaces",draft:!1,tags:[],version:"current",frontMatter:{}},c={},p=[{value:"Question Text",id:"question-text",level:2},{value:"Question Answers",id:"question-answers",level:2},{value:"Feedback",id:"feedback",level:2}],u={toc:p},l="wrapper";function m(e){let{components:t,...r}=e;return(0,a.kt)(l,(0,n.Z)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"cgroups-versus-namespaces"},"Cgroups versus namespaces"),(0,a.kt)("h2",{id:"question-text"},"Question Text"),(0,a.kt)("p",null,"Which of the following affirmations about namespaces and cgroups is correct?"),(0,a.kt)("h2",{id:"question-answers"},"Question Answers"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Cgroups provide resource management and namespaces provide isolation and security.")),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"Namespaces provide resource management and cgroups provide isolation and security.")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"Both provide resource management.")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"Both provide isolation and security."))),(0,a.kt)("h2",{id:"feedback"},"Feedback"),(0,a.kt)("p",null,"They both serve different purposes, cgroups provide resource management and namespaces provide isolation and security.\nCgroups manage resources, while namespaces isolate and secure them."))}m.isMDXComponent=!0}}]);