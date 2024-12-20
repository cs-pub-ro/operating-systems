"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[8640],{5680:(e,t,r)=>{r.d(t,{xA:()=>p,yg:()=>y});var n=r(6540);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function a(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var c=n.createContext({}),l=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):s(s({},t),e)),r},p=function(e){var t=l(e.components);return n.createElement(c.Provider,{value:t},e.children)},u="mdxType",f={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},h=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,i=e.originalType,c=e.parentName,p=a(e,["components","mdxType","originalType","parentName"]),u=l(r),h=o,y=u["".concat(c,".").concat(h)]||u[h]||f[h]||i;return r?n.createElement(y,s(s({ref:t},p),{},{components:r})):n.createElement(y,s({ref:t},p))}));function y(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=r.length,s=new Array(i);s[0]=h;var a={};for(var c in t)hasOwnProperty.call(t,c)&&(a[c]=t[c]);a.originalType=e,a[u]="string"==typeof e?e:o,s[1]=a;for(var l=2;l<i;l++)s[l]=r[l];return n.createElement.apply(null,s)}return n.createElement.apply(null,r)}h.displayName="MDXCreateElement"},8563:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>s,default:()=>f,frontMatter:()=>i,metadata:()=>a,toc:()=>l});var n=r(8168),o=(r(6540),r(5680));const i={},s="Fewer than Two Copies",a={unversionedId:"IO/Questions/fewer-than-2-copies",id:"IO/Questions/fewer-than-2-copies",title:"Fewer than Two Copies",description:"Question Text",source:"@site/docs/IO/Questions/fewer-than-2-copies.md",sourceDirName:"IO/Questions",slug:"/IO/Questions/fewer-than-2-copies",permalink:"/operating-systems/148/IO/Questions/fewer-than-2-copies",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"Client-Server Number of Copies",permalink:"/operating-systems/148/IO/Questions/server-copies"},next:{title:"`printf()` Under Strace",permalink:"/operating-systems/148/IO/Questions/strace-printf"}},c={},l=[{value:"Question Text",id:"question-text",level:2},{value:"Question Answers",id:"question-answers",level:2},{value:"Feedback",id:"feedback",level:2}],p={toc:l},u="wrapper";function f(e){let{components:t,...i}=e;return(0,o.yg)(u,(0,n.A)({},p,i,{components:t,mdxType:"MDXLayout"}),(0,o.yg)("h1",{id:"fewer-than-two-copies"},"Fewer than Two Copies"),(0,o.yg)("h2",{id:"question-text"},"Question Text"),(0,o.yg)("p",null,"Can zero-copy be implemented so as to copy the file fewer than 2 times?"),(0,o.yg)("p",null,(0,o.yg)("img",{alt:"Zero-Copy",src:r(9825).A})),(0,o.yg)("h2",{id:"question-answers"},"Question Answers"),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},"Yes, by copying the file straight from the disk to the network")),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},"No")),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("p",{parentName:"li"},"Yes, by sending the file straight from the kernel buffer to the network")),(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("p",{parentName:"li"},"Yes, by copying the file directly from the storage to the NIC's buffer"))),(0,o.yg)("h2",{id:"feedback"},"Feedback"),(0,o.yg)("p",null,'The truth is that we can\'t have fewer copies while using a server with a common PC-like architecture.\nThe disk is not directly connected to the internet, so the file cannot be sent directly from there.\nThe only place from where we can send data to the Web is the NIC.\nThen we need the intermediary storage in that kernel buffer because the disk and the NIC aren\'t directly connected.\nThey are both connected to the CPU via the motherboard, so it\'s the CPU\'s job to do the transfer.\nFor this, it needs a "temporary buffer".\nThen the NIC needs its own buffer because the speed of the network may be slower than the speed at which it receives data from the kernel, so it needs some memory where to place the "surplus" while waiting for the network to "clear".'))}f.isMDXComponent=!0},9825:(e,t,r)=>{r.d(t,{A:()=>n});const n=r.p+"assets/images/server-copies-zero-copy-fc1fa1195f2444d92486d7d63dfc81a3.svg"}}]);