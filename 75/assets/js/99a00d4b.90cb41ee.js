"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[8192],{5680:(e,t,r)=>{r.d(t,{xA:()=>c,yg:()=>d});var n=r(6540);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function a(e,t){if(null==e)return{};var r,n,i=function(e,t){if(null==e)return{};var r,n,i={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(i[r]=e[r]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}var l=n.createContext({}),p=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):s(s({},t),e)),r},c=function(e){var t=p(e.components);return n.createElement(l.Provider,{value:t},e.children)},u="mdxType",f={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},y=n.forwardRef((function(e,t){var r=e.components,i=e.mdxType,o=e.originalType,l=e.parentName,c=a(e,["components","mdxType","originalType","parentName"]),u=p(r),y=i,d=u["".concat(l,".").concat(y)]||u[y]||f[y]||o;return r?n.createElement(d,s(s({ref:t},c),{},{components:r})):n.createElement(d,s({ref:t},c))}));function d(e,t){var r=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=r.length,s=new Array(o);s[0]=y;var a={};for(var l in t)hasOwnProperty.call(t,l)&&(a[l]=t[l]);a.originalType=e,a[u]="string"==typeof e?e:i,s[1]=a;for(var p=2;p<o;p++)s[p]=r[p];return n.createElement.apply(null,s)}return n.createElement.apply(null,r)}y.displayName="MDXCreateElement"},2914:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>s,default:()=>f,frontMatter:()=>o,metadata:()=>a,toc:()=>p});var n=r(8168),i=(r(6540),r(5680));const o={},s="Client-Server Number of Copies",a={unversionedId:"IO/Questions/server-copies",id:"IO/Questions/server-copies",title:"Client-Server Number of Copies",description:"Question Text",source:"@site/docs/IO/Questions/server-copies.md",sourceDirName:"IO/Questions",slug:"/IO/Questions/server-copies",permalink:"/operating-systems/75/IO/Questions/server-copies",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"Firefox: TCP or UDP?",permalink:"/operating-systems/75/IO/Questions/firefox-tcp-udp"},next:{title:"Fewer than Two Copies",permalink:"/operating-systems/75/IO/Questions/fewer-than-2-copies"}},l={},p=[{value:"Question Text",id:"question-text",level:2},{value:"Question Answers",id:"question-answers",level:2},{value:"Feedback",id:"feedback",level:2}],c={toc:p},u="wrapper";function f(e){let{components:t,...o}=e;return(0,i.yg)(u,(0,n.A)({},c,o,{components:t,mdxType:"MDXLayout"}),(0,i.yg)("h1",{id:"client-server-number-of-copies"},"Client-Server Number of Copies"),(0,i.yg)("h2",{id:"question-text"},"Question Text"),(0,i.yg)("p",null,"The server in the image below uses regular TCP sockets to handle the connection and ",(0,i.yg)("inlineCode",{parentName:"p"},"send()")," to send the data.\nHow many times are the contents of the file copied by the server while being sent to the client?"),(0,i.yg)("p",null,(0,i.yg)("img",{alt:"Client-Server Steps",src:r(1975).A})),(0,i.yg)("h2",{id:"question-answers"},"Question Answers"),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("p",{parentName:"li"},"2")),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("p",{parentName:"li"},"1"))),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},"4")),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},"3")),(0,i.yg)("h2",{id:"feedback"},"Feedback"),(0,i.yg)("p",null,"Remember double buffering!\nWhen the app calls ",(0,i.yg)("inlineCode",{parentName:"p"},"read()"),", the server's kernel will first save the file to an internal buffer destined for reading.\nThen the app will copy the file to its own buffer.\nFollowing this step, the app will call ",(0,i.yg)("inlineCode",{parentName:"p"},"send()"),", which will first copy the file to a buffer in the kernel.\nFrom this buffer, the kernel itself will copy the file to another buffer on the NIC (Network Interface Card).\nIn total, there the file is copied ",(0,i.yg)("strong",{parentName:"p"},"4 times"),", as outlined in the image below."),(0,i.yg)("p",null,(0,i.yg)("img",{alt:"Server Copies - Read-Send",src:r(7366).A})))}f.isMDXComponent=!0},1975:(e,t,r)=>{r.d(t,{A:()=>n});const n=r.p+"assets/images/client-server-file-c21c08a102e6557188be7f080092a12c.svg"},7366:(e,t,r)=>{r.d(t,{A:()=>n});const n=r.p+"assets/images/server-copies-normal-7e82d53d42a478d0313cb85917335f94.svg"}}]);