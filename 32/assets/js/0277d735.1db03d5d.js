"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[1018],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>d});var r=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var u=r.createContext({}),c=function(e){var t=r.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},p=function(e){var t=c(e.components);return r.createElement(u.Provider,{value:t},e.children)},f="mdxType",s={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},b=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,a=e.originalType,u=e.parentName,p=o(e,["components","mdxType","originalType","parentName"]),f=c(n),b=i,d=f["".concat(u,".").concat(b)]||f[b]||s[b]||a;return n?r.createElement(d,l(l({ref:t},p),{},{components:n})):r.createElement(d,l({ref:t},p))}));function d(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var a=n.length,l=new Array(a);l[0]=b;var o={};for(var u in t)hasOwnProperty.call(t,u)&&(o[u]=t[u]);o.originalType=e,o[f]="string"==typeof e?e:i,l[1]=o;for(var c=2;c<a;c++)l[c]=n[c];return r.createElement.apply(null,l)}return r.createElement.apply(null,n)}b.displayName="MDXCreateElement"},8088:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>u,contentTitle:()=>l,default:()=>s,frontMatter:()=>a,metadata:()=>o,toc:()=>c});var r=n(7462),i=(n(7294),n(3905));const a={},l="Flush Libc Buffer",o={unversionedId:"Lab/IO/quiz/flush-libc-buffer",id:"Lab/IO/quiz/flush-libc-buffer",title:"Flush Libc Buffer",description:"Question Text",source:"@site/docs/Lab/IO/quiz/flush-libc-buffer.md",sourceDirName:"Lab/IO/quiz",slug:"/Lab/IO/quiz/flush-libc-buffer",permalink:"/operating-systems/32/Lab/IO/quiz/flush-libc-buffer",draft:!1,tags:[],version:"current",frontMatter:{}},u={},c=[{value:"Question Text",id:"question-text",level:2},{value:"Question Answers",id:"question-answers",level:2},{value:"Feedback",id:"feedback",level:2}],p={toc:c},f="wrapper";function s(e){let{components:t,...n}=e;return(0,i.kt)(f,(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"flush-libc-buffer"},"Flush Libc Buffer"),(0,i.kt)("h2",{id:"question-text"},"Question Text"),(0,i.kt)("p",null,"Which of the following is a method of flushing libc's internal buffer?"),(0,i.kt)("h2",{id:"question-answers"},"Question Answers"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"print a ",(0,i.kt)("inlineCode",{parentName:"li"},"\\0")," character")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"print a ",(0,i.kt)("inlineCode",{parentName:"li"},"\\n")," character")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"print a space character")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"print a ",(0,i.kt)("inlineCode",{parentName:"p"},"\\t")," character"))),(0,i.kt)("h2",{id:"feedback"},"Feedback"),(0,i.kt)("p",null,"Newlines (",(0,i.kt)("inlineCode",{parentName:"p"},"\\n"),") force ",(0,i.kt)("inlineCode",{parentName:"p"},"printf()")," to dump the internal buffer associated with the ",(0,i.kt)("inlineCode",{parentName:"p"},"stdout")," ",(0,i.kt)("inlineCode",{parentName:"p"},"FILE")," ",(0,i.kt)("inlineCode",{parentName:"p"},"struct"),".\nIf you place a ",(0,i.kt)("inlineCode",{parentName:"p"},"\\n")," character within one of the strings in ",(0,i.kt)("inlineCode",{parentName:"p"},"support/buffering/printf_buffering.c"),", a ",(0,i.kt)("inlineCode",{parentName:"p"},"write()")," syscall will be made right after it."))}s.isMDXComponent=!0}}]);