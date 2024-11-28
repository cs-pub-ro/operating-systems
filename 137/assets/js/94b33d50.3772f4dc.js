"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[7479],{5680:(e,t,r)=>{r.d(t,{xA:()=>u,yg:()=>m});var n=r(6540);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var s=n.createContext({}),c=function(e){var t=n.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},u=function(e){var t=c(e.components);return n.createElement(s.Provider,{value:t},e.children)},p="mdxType",y={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},f=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),p=c(r),f=a,m=p["".concat(s,".").concat(f)]||p[f]||y[f]||o;return r?n.createElement(m,i(i({ref:t},u),{},{components:r})):n.createElement(m,i({ref:t},u))}));function m(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,i=new Array(o);i[0]=f;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[p]="string"==typeof e?e:a,i[1]=l;for(var c=2;c<o;c++)i[c]=r[c];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}f.displayName="MDXCreateElement"},6926:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>y,frontMatter:()=>o,metadata:()=>l,toc:()=>c});var n=r(8168),a=(r(6540),r(5680));const o={},i="Syscall Tool",l={unversionedId:"Software Stack/Questions/libc",id:"Software Stack/Questions/libc",title:"Syscall Tool",description:"Question Text",source:"@site/docs/Software Stack/Questions/libc.md",sourceDirName:"Software Stack/Questions",slug:"/Software Stack/Questions/libc",permalink:"/operating-systems/137/Software Stack/Questions/libc",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"Libcall with Syscall",permalink:"/operating-systems/137/Software Stack/Questions/libcall-syscall"},next:{title:"Dynamic Libraries",permalink:"/operating-systems/137/Software Stack/Questions/dynamic-libraries"}},s={},c=[{value:"Question Text",id:"question-text",level:2},{value:"Question Answers",id:"question-answers",level:2},{value:"Feedback",id:"feedback",level:2}],u={toc:c},p="wrapper";function y(e){let{components:t,...r}=e;return(0,a.yg)(p,(0,n.A)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,a.yg)("h1",{id:"syscall-tool"},"Syscall Tool"),(0,a.yg)("h2",{id:"question-text"},"Question Text"),(0,a.yg)("p",null,"Which of following is *",(0,a.yg)("em",{parentName:"p"},"not"),"- and advantage of using libc for programs?"),(0,a.yg)("h2",{id:"question-answers"},"Question Answers"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"increased portability")),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"reduced executable size")),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},"richer set of features")),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},"easier development"))),(0,a.yg)("h2",{id:"feedback"},"Feedback"),(0,a.yg)("p",null,"When using libc, because we add a new software component, the size of the resulting executable increases."))}y.isMDXComponent=!0}}]);