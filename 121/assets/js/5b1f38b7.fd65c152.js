"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[8607],{5680:(e,t,r)=>{r.d(t,{xA:()=>p,yg:()=>d});var n=r(6540);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var l=n.createContext({}),u=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},p=function(e){var t=u(e.components);return n.createElement(l.Provider,{value:t},e.children)},c="mdxType",f={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},y=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,i=e.originalType,l=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),c=u(r),y=a,d=c["".concat(l,".").concat(y)]||c[y]||f[y]||i;return r?n.createElement(d,o(o({ref:t},p),{},{components:r})):n.createElement(d,o({ref:t},p))}));function d(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=r.length,o=new Array(i);o[0]=y;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[c]="string"==typeof e?e:a,o[1]=s;for(var u=2;u<i;u++)o[u]=r[u];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}y.displayName="MDXCreateElement"},5325:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>f,frontMatter:()=>i,metadata:()=>s,toc:()=>u});var n=r(8168),a=(r(6540),r(5680));const i={},o="Child Faults After Write",s={unversionedId:"Compute/Questions/child-faults-after-write",id:"Compute/Questions/child-faults-after-write",title:"Child Faults After Write",description:"Question Text",source:"@site/docs/Compute/Questions/child-faults-after-write.md",sourceDirName:"Compute/Questions",slug:"/Compute/Questions/child-faults-after-write",permalink:"/operating-systems/121/Compute/Questions/child-faults-after-write",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"Always Shared Sections",permalink:"/operating-systems/121/Compute/Questions/sections-always-shared"},next:{title:"Segfault Exit Code",permalink:"/operating-systems/121/Compute/Questions/seg-fault-exit-code"}},l={},u=[{value:"Question Text",id:"question-text",level:2},{value:"Question Answers",id:"question-answers",level:2}],p={toc:u},c="wrapper";function f(e){let{components:t,...r}=e;return(0,a.yg)(c,(0,n.A)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,a.yg)("h1",{id:"child-faults-after-write"},"Child Faults After Write"),(0,a.yg)("h2",{id:"question-text"},"Question Text"),(0,a.yg)("p",null,"What causes the page faults registered by the child after the fifth step?"),(0,a.yg)("h2",{id:"question-answers"},"Question Answers"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"The child writes data to the frames it previously shared with its parent and the copy-on-write mechanism copies and remaps them before writing said data")),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},"Demand paging propagates the lazy allocation of pages from the parent to the child")),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},"Creating the child process inherently duplicates some frames")),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},"They are caused by the loader forking itself when creating the child process")),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},"They are caused by the ",(0,a.yg)("inlineCode",{parentName:"p"},"bash")," process forking itself when creating the child process"))))}f.isMDXComponent=!0}}]);