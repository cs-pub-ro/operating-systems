"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[4075],{5680:(e,t,n)=>{n.d(t,{xA:()=>c,yg:()=>d});var r=n(6540);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=r.createContext({}),p=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},c=function(e){var t=p(e.components);return r.createElement(l.Provider,{value:t},e.children)},u="mdxType",y={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),u=p(n),m=a,d=u["".concat(l,".").concat(m)]||u[m]||y[m]||o;return n?r.createElement(d,s(s({ref:t},c),{},{components:n})):r.createElement(d,s({ref:t},c))}));function d(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,s=new Array(o);s[0]=m;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i[u]="string"==typeof e?e:a,s[1]=i;for(var p=2;p<o;p++)s[p]=n[p];return r.createElement.apply(null,s)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},5584:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>s,default:()=>y,frontMatter:()=>o,metadata:()=>i,toc:()=>p});var r=n(8168),a=(n(6540),n(5680));const o={},s="Always Shared Sections",i={unversionedId:"Compute/Questions/sections-always-shared",id:"Compute/Questions/sections-always-shared",title:"Always Shared Sections",description:"Question Text",source:"@site/docs/Compute/Questions/sections-always-shared.md",sourceDirName:"Compute/Questions",slug:"/Compute/Questions/sections-always-shared",permalink:"/operating-systems/74/Compute/Questions/sections-always-shared",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"Copy-on-write Flag for `mmap()`",permalink:"/operating-systems/74/Compute/Questions/mmap-cow-flag"},next:{title:"Child Faults After Write",permalink:"/operating-systems/74/Compute/Questions/child-faults-after-write"}},l={},p=[{value:"Question Text",id:"question-text",level:2},{value:"Question Answers",id:"question-answers",level:2},{value:"Feedback",id:"feedback",level:2}],c={toc:p},u="wrapper";function y(e){let{components:t,...n}=e;return(0,a.yg)(u,(0,r.A)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,a.yg)("h1",{id:"always-shared-sections"},"Always Shared Sections"),(0,a.yg)("h2",{id:"question-text"},"Question Text"),(0,a.yg)("p",null,"The pages of which sections in the process virtual address space are ",(0,a.yg)("strong",{parentName:"p"},"always")," shared between the parent and child process?"),(0,a.yg)("h2",{id:"question-answers"},"Question Answers"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},"None, because they are marked copy-on-write")),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},"Kernel pages because there is only one kernel"))),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"Non-writable sections, such as ",(0,a.yg)("inlineCode",{parentName:"li"},".text")," or ",(0,a.yg)("inlineCode",{parentName:"li"},".rodata"))),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("inlineCode",{parentName:"li"},"libc")," pages, because it is a shared library and all processes refer the same memory")),(0,a.yg)("h2",{id:"feedback"},"Feedback"),(0,a.yg)("p",null,"The name of the mechanism is copy-on-",(0,a.yg)("strong",{parentName:"p"},"write"),".\nPages are only copied when written to.\nIf you never write data to a page, it will remain shared.\nYou cannot write data to non-writable pages, such as those in the ",(0,a.yg)("inlineCode",{parentName:"p"},".text")," or ",(0,a.yg)("inlineCode",{parentName:"p"},".rodata")," sections."))}y.isMDXComponent=!0}}]);