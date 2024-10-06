"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[2851],{5680:(e,r,t)=>{t.d(r,{xA:()=>u,yg:()=>f});var n=t(6540);function a(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function i(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function o(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?i(Object(t),!0).forEach((function(r){a(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function l(e,r){if(null==e)return{};var t,n,a=function(e,r){if(null==e)return{};var t,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)t=i[n],r.indexOf(t)>=0||(a[t]=e[t]);return a}(e,r);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)t=i[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var s=n.createContext({}),p=function(e){var r=n.useContext(s),t=r;return e&&(t="function"==typeof e?e(r):o(o({},r),e)),t},u=function(e){var r=p(e.components);return n.createElement(s.Provider,{value:r},e.children)},c="mdxType",d={inlineCode:"code",wrapper:function(e){var r=e.children;return n.createElement(n.Fragment,{},r)}},y=n.forwardRef((function(e,r){var t=e.components,a=e.mdxType,i=e.originalType,s=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),c=p(t),y=a,f=c["".concat(s,".").concat(y)]||c[y]||d[y]||i;return t?n.createElement(f,o(o({ref:r},u),{},{components:t})):n.createElement(f,o({ref:r},u))}));function f(e,r){var t=arguments,a=r&&r.mdxType;if("string"==typeof e||a){var i=t.length,o=new Array(i);o[0]=y;var l={};for(var s in r)hasOwnProperty.call(r,s)&&(l[s]=r[s]);l.originalType=e,l[c]="string"==typeof e?e:a,o[1]=l;for(var p=2;p<i;p++)o[p]=t[p];return n.createElement.apply(null,o)}return n.createElement.apply(null,t)}y.displayName="MDXCreateElement"},3268:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>s,contentTitle:()=>o,default:()=>d,frontMatter:()=>i,metadata:()=>l,toc:()=>p});var n=t(8168),a=(t(6540),t(5680));const i={},o="File Descriptor of `stderr`",l={unversionedId:"Lab/IO/quiz/stderr-fd",id:"Lab/IO/quiz/stderr-fd",title:"File Descriptor of `stderr`",description:"Question Text",source:"@site/docs/Lab/IO/quiz/stderr-fd.md",sourceDirName:"Lab/IO/quiz",slug:"/Lab/IO/quiz/stderr-fd",permalink:"/operating-systems/86/Lab/IO/quiz/stderr-fd",draft:!1,tags:[],version:"current",frontMatter:{}},s={},p=[{value:"Question Text",id:"question-text",level:2},{value:"Question Answers",id:"question-answers",level:2},{value:"Feedaback",id:"feedaback",level:2}],u={toc:p},c="wrapper";function d(e){let{components:r,...t}=e;return(0,a.yg)(c,(0,n.A)({},u,t,{components:r,mdxType:"MDXLayout"}),(0,a.yg)("h1",{id:"file-descriptor-of-stderr"},"File Descriptor of ",(0,a.yg)("inlineCode",{parentName:"h1"},"stderr")),(0,a.yg)("h2",{id:"question-text"},"Question Text"),(0,a.yg)("p",null,"Which file descriptor is associated by default to ",(0,a.yg)("inlineCode",{parentName:"p"},"stderr"),"?"),(0,a.yg)("h2",{id:"question-answers"},"Question Answers"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},"it varies from process to process")),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},"it varies from one Linux distribution to another")),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},(0,a.yg)("inlineCode",{parentName:"p"},"stderr")," has no associated file descriptor"))),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"2")),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},"0")),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},"1"))),(0,a.yg)("h2",{id:"feedaback"},"Feedaback"),(0,a.yg)("p",null,"You would type ",(0,a.yg)("inlineCode",{parentName:"p"},"ls 2> /dev/null")," to ignore ",(0,a.yg)("inlineCode",{parentName:"p"},"ls"),"'s errors.\nThis equates to ",(0,a.yg)("strong",{parentName:"p"},"redirecting")," ",(0,a.yg)("inlineCode",{parentName:"p"},"stderr")," to ",(0,a.yg)("inlineCode",{parentName:"p"},"/dev/null"),".\nThe number 2 in ",(0,a.yg)("inlineCode",{parentName:"p"},"2>")," hints that ",(0,a.yg)("inlineCode",{parentName:"p"},"stderr")," is by default associated with file descriptor 2."))}d.isMDXComponent=!0}}]);