"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[9034],{5680:(e,n,a)=>{a.d(n,{xA:()=>m,yg:()=>g});var t=a(6540);function r(e,n,a){return n in e?Object.defineProperty(e,n,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[n]=a,e}function i(e,n){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);n&&(t=t.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),a.push.apply(a,t)}return a}function o(e){for(var n=1;n<arguments.length;n++){var a=null!=arguments[n]?arguments[n]:{};n%2?i(Object(a),!0).forEach((function(n){r(e,n,a[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(a,n))}))}return e}function l(e,n){if(null==e)return{};var a,t,r=function(e,n){if(null==e)return{};var a,t,r={},i=Object.keys(e);for(t=0;t<i.length;t++)a=i[t],n.indexOf(a)>=0||(r[a]=e[a]);return r}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(t=0;t<i.length;t++)a=i[t],n.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var p=t.createContext({}),s=function(e){var n=t.useContext(p),a=n;return e&&(a="function"==typeof e?e(n):o(o({},n),e)),a},m=function(e){var n=s(e.components);return t.createElement(p.Provider,{value:n},e.children)},y="mdxType",c={inlineCode:"code",wrapper:function(e){var n=e.children;return t.createElement(t.Fragment,{},n)}},u=t.forwardRef((function(e,n){var a=e.components,r=e.mdxType,i=e.originalType,p=e.parentName,m=l(e,["components","mdxType","originalType","parentName"]),y=s(a),u=r,g=y["".concat(p,".").concat(u)]||y[u]||c[u]||i;return a?t.createElement(g,o(o({ref:n},m),{},{components:a})):t.createElement(g,o({ref:n},m))}));function g(e,n){var a=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var i=a.length,o=new Array(i);o[0]=u;var l={};for(var p in n)hasOwnProperty.call(n,p)&&(l[p]=n[p]);l.originalType=e,l[y]="string"==typeof e?e:r,o[1]=l;for(var s=2;s<i;s++)o[s]=a[s];return t.createElement.apply(null,o)}return t.createElement.apply(null,a)}u.displayName="MDXCreateElement"},5905:(e,n,a)=>{a.r(n),a.d(n,{assets:()=>p,contentTitle:()=>o,default:()=>c,frontMatter:()=>i,metadata:()=>l,toc:()=>s});var t=a(8168),r=(a(6540),a(5680));const i={},o="Variables in memory regions",l={unversionedId:"Lab/Data/quiz/memory-regions-vars",id:"Lab/Data/quiz/memory-regions-vars",title:"Variables in memory regions",description:"Question Text",source:"@site/docs/Lab/Data/quiz/memory-regions-vars.md",sourceDirName:"Lab/Data/quiz",slug:"/Lab/Data/quiz/memory-regions-vars",permalink:"/operating-systems/12/Lab/Data/quiz/memory-regions-vars",draft:!1,tags:[],version:"current",frontMatter:{}},p={},s=[{value:"Question Text",id:"question-text",level:2},{value:"Question Answers",id:"question-answers",level:2},{value:"Feedback",id:"feedback",level:2}],m={toc:s},y="wrapper";function c(e){let{components:n,...a}=e;return(0,r.yg)(y,(0,t.A)({},m,a,{components:n,mdxType:"MDXLayout"}),(0,r.yg)("h1",{id:"variables-in-memory-regions"},"Variables in memory regions"),(0,r.yg)("h2",{id:"question-text"},"Question Text"),(0,r.yg)("p",null,"In what memory regions are the ",(0,r.yg)("inlineCode",{parentName:"p"},"a"),", ",(0,r.yg)("inlineCode",{parentName:"p"},"b"),", ",(0,r.yg)("inlineCode",{parentName:"p"},"c"),", ",(0,r.yg)("inlineCode",{parentName:"p"},"k")," varaables from ",(0,r.yg)("inlineCode",{parentName:"p"},"support/memory-security/buff_leak.c")," stored?"),(0,r.yg)("h2",{id:"question-answers"},"Question Answers"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"a - ",(0,r.yg)("inlineCode",{parentName:"li"},".data"),", b - ",(0,r.yg)("inlineCode",{parentName:"li"},".bss"),", c - ",(0,r.yg)("inlineCode",{parentName:"li"},".stack"),", k - ",(0,r.yg)("inlineCode",{parentName:"li"},".heap"))),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"a - ",(0,r.yg)("inlineCode",{parentName:"li"},".data"),", b - ",(0,r.yg)("inlineCode",{parentName:"li"},".bss"),", c - ",(0,r.yg)("inlineCode",{parentName:"li"},".stack"),", k - ",(0,r.yg)("inlineCode",{parentName:"li"},".stack"))),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},"a - ",(0,r.yg)("inlineCode",{parentName:"p"},".data"),", b - ",(0,r.yg)("inlineCode",{parentName:"p"},".data"),", c - ",(0,r.yg)("inlineCode",{parentName:"p"},".stack"),", k - ",(0,r.yg)("inlineCode",{parentName:"p"},".heap"))),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},"a - ",(0,r.yg)("inlineCode",{parentName:"p"},".bss"),", b - ",(0,r.yg)("inlineCode",{parentName:"p"},".bss"),", c - ",(0,r.yg)("inlineCode",{parentName:"p"},".stack"),", k - ",(0,r.yg)("inlineCode",{parentName:"p"},".heap")))),(0,r.yg)("h2",{id:"feedback"},"Feedback"),(0,r.yg)("p",null,"Global initialized variables go to ",(0,r.yg)("inlineCode",{parentName:"p"},".data")," (",(0,r.yg)("inlineCode",{parentName:"p"},"a"),").\nGlobal uninitialized variables go to ",(0,r.yg)("inlineCode",{parentName:"p"},".bss")," (",(0,r.yg)("inlineCode",{parentName:"p"},"b"),").\nNon-static local variables go on the",(0,r.yg)("inlineCode",{parentName:"p"},".stack")," (",(0,r.yg)("inlineCode",{parentName:"p"},"c"),", ",(0,r.yg)("inlineCode",{parentName:"p"},"k"),").\n",(0,r.yg)("inlineCode",{parentName:"p"},"malloc()"),"'ed memory goes on the",(0,r.yg)("inlineCode",{parentName:"p"},".heap"),".\nFor ",(0,r.yg)("inlineCode",{parentName:"p"},"k"),", the pointer is stored on the",(0,r.yg)("inlineCode",{parentName:"p"},".stack"),", but the allocated memory, to which ",(0,r.yg)("inlineCode",{parentName:"p"},"k")," points is stored on the",(0,r.yg)("inlineCode",{parentName:"p"},".heap"),"."))}c.isMDXComponent=!0}}]);