"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[5794],{5680:(e,t,n)=>{n.d(t,{xA:()=>p,yg:()=>d});var r=n(6540);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=r.createContext({}),c=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=c(e.components);return r.createElement(l.Provider,{value:t},e.children)},u="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},y=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),u=c(n),y=a,d=u["".concat(l,".").concat(y)]||u[y]||m[y]||o;return n?r.createElement(d,i(i({ref:t},p),{},{components:n})):r.createElement(d,i({ref:t},p))}));function d(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=y;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[u]="string"==typeof e?e:a,i[1]=s;for(var c=2;c<o;c++)i[c]=n[c];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}y.displayName="MDXCreateElement"},893:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>m,frontMatter:()=>o,metadata:()=>s,toc:()=>c});var r=n(8168),a=(n(6540),n(5680));const o={},i="Modify String",s={unversionedId:"Data/Questions/memory-access",id:"Data/Questions/memory-access",title:"Modify String",description:"Question Text",source:"@site/docs/Data/Questions/memory-access.md",sourceDirName:"Data/Questions",slug:"/Data/Questions/memory-access",permalink:"/operating-systems/158/Data/Questions/memory-access",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"Questions",permalink:"/operating-systems/158/Data/Questions/"},next:{title:"Half Page",permalink:"/operating-systems/158/Data/Questions/half-page"}},l={},c=[{value:"Question Text",id:"question-text",level:2},{value:"Question Answers",id:"question-answers",level:2},{value:"Feedback",id:"feedback",level:2}],p={toc:c},u="wrapper";function m(e){let{components:t,...n}=e;return(0,a.yg)(u,(0,r.A)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,a.yg)("h1",{id:"modify-string"},"Modify String"),(0,a.yg)("h2",{id:"question-text"},"Question Text"),(0,a.yg)("p",null,"What happens if we introduce the code ",(0,a.yg)("inlineCode",{parentName:"p"},"cp[2] = 't'")," in the program located in the ",(0,a.yg)("inlineCode",{parentName:"p"},"chapters/data/working-with-memory/drills/tasks/memory-access/mem_access.c")," file?"),(0,a.yg)("h2",{id:"question-answers"},"Question Answers"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},"Compile time error because we are trying to modify a ",(0,a.yg)("inlineCode",{parentName:"p"},"const")," pointer.")),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},"Compile time error because we are trying to modify a ",(0,a.yg)("inlineCode",{parentName:"p"},"const")," value."))),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"Segmentation fault at runtime we are trying to modify read-only memory.")),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"Program compiles and runs successfully.")),(0,a.yg)("h2",{id:"feedback"},"Feedback"),(0,a.yg)("p",null,"The declaration ",(0,a.yg)("inlineCode",{parentName:"p"},'char *const cp = "ConstLeString"')," actually defines 2 memory locations.\nOne stores a constant pointer, ",(0,a.yg)("inlineCode",{parentName:"p"},"cp"),", whereas the other stores the actual string.\nThe compiler thinks that ",(0,a.yg)("inlineCode",{parentName:"p"},"cp")," is able to modify the memory location that it points therefore it passes compilation.\nBut at runtime a segmentation fault is issued because we are accessing data that is stored in read-only memory."))}m.isMDXComponent=!0}}]);