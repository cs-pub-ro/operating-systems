"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[4641],{5680:(e,t,r)=>{r.d(t,{xA:()=>c,yg:()=>b});var n=r(6540);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,i=function(e,t){if(null==e)return{};var r,n,i={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(i[r]=e[r]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}var l=n.createContext({}),p=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},c=function(e){var t=p(e.components);return n.createElement(l.Provider,{value:t},e.children)},u="mdxType",f={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},y=n.forwardRef((function(e,t){var r=e.components,i=e.mdxType,a=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),u=p(r),y=i,b=u["".concat(l,".").concat(y)]||u[y]||f[y]||a;return r?n.createElement(b,o(o({ref:t},c),{},{components:r})):n.createElement(b,o({ref:t},c))}));function b(e,t){var r=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var a=r.length,o=new Array(a);o[0]=y;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[u]="string"==typeof e?e:i,o[1]=s;for(var p=2;p<a;p++)o[p]=r[p];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}y.displayName="MDXCreateElement"},5459:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>f,frontMatter:()=>a,metadata:()=>s,toc:()=>p});var n=r(8168),i=(r(6540),r(5680));const a={},o="printf() vs write",s={unversionedId:"Software Stack/Lab 2 - Library Perspective/Libc/Drills/Questions/printf-vs-write",id:"Software Stack/Lab 2 - Library Perspective/Libc/Drills/Questions/printf-vs-write",title:"printf() vs write",description:"Question Text",source:"@site/docs/Software Stack/Lab 2 - Library Perspective/Libc/Drills/Questions/printf-vs-write.md",sourceDirName:"Software Stack/Lab 2 - Library Perspective/Libc/Drills/Questions",slug:"/Software Stack/Lab 2 - Library Perspective/Libc/Drills/Questions/printf-vs-write",permalink:"/operating-systems/94/Software Stack/Lab 2 - Library Perspective/Libc/Drills/Questions/printf-vs-write",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"strcpy() System Call",permalink:"/operating-systems/94/Software Stack/Lab 2 - Library Perspective/Libc/Drills/Questions/strcpy-syscall"},next:{title:"malloc()",permalink:"/operating-systems/94/Software Stack/Lab 2 - Library Perspective/Libc/Drills/Questions/malloc"}},l={},p=[{value:"Question Text",id:"question-text",level:2},{value:"Question Answers",id:"question-answers",level:2},{value:"Feedback",id:"feedback",level:2}],c={toc:p},u="wrapper";function f(e){let{components:t,...r}=e;return(0,i.yg)(u,(0,n.A)({},c,r,{components:t,mdxType:"MDXLayout"}),(0,i.yg)("h1",{id:"printf-vs-write"},"printf() vs write"),(0,i.yg)("h2",{id:"question-text"},"Question Text"),(0,i.yg)("p",null,"What are features provided by ",(0,i.yg)("inlineCode",{parentName:"p"},"printf()")," when compared to ",(0,i.yg)("inlineCode",{parentName:"p"},"write"),"? (choose 2 answers)"),(0,i.yg)("h2",{id:"question-answers"},"Question Answers"),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},"buffering")),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("p",{parentName:"li"},"outputs to standard output")),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("p",{parentName:"li"},"may write to file"))),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},"does output formatting")),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},"can work with binary data")),(0,i.yg)("h2",{id:"feedback"},"Feedback"),(0,i.yg)("p",null,(0,i.yg)("inlineCode",{parentName:"p"},"printf()")," can do buffering to reduce the number of system calls.\nAlso, ",(0,i.yg)("inlineCode",{parentName:"p"},"printf()"),", as it name suggests (the ",(0,i.yg)("inlineCode",{parentName:"p"},"f")," suffix), does output formatting."))}f.isMDXComponent=!0}}]);