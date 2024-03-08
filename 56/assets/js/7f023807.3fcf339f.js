"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[6152],{5680:(e,t,r)=>{r.d(t,{xA:()=>p,yg:()=>d});var n=r(6540);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function a(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,i=function(e,t){if(null==e)return{};var r,n,i={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(i[r]=e[r]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}var s=n.createContext({}),c=function(e){var t=n.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):a(a({},t),e)),r},p=function(e){var t=c(e.components);return n.createElement(s.Provider,{value:t},e.children)},u="mdxType",f={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},y=n.forwardRef((function(e,t){var r=e.components,i=e.mdxType,o=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),u=c(r),y=i,d=u["".concat(s,".").concat(y)]||u[y]||f[y]||o;return r?n.createElement(d,a(a({ref:t},p),{},{components:r})):n.createElement(d,a({ref:t},p))}));function d(e,t){var r=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=r.length,a=new Array(o);a[0]=y;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[u]="string"==typeof e?e:i,a[1]=l;for(var c=2;c<o;c++)a[c]=r[c];return n.createElement.apply(null,a)}return n.createElement.apply(null,r)}y.displayName="MDXCreateElement"},4938:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>s,contentTitle:()=>a,default:()=>f,frontMatter:()=>o,metadata:()=>l,toc:()=>c});var n=r(8168),i=(r(6540),r(5680));const o={},a="Client-Server Number of Copies",l={unversionedId:"Lab/IO/quiz/server-copies",id:"Lab/IO/quiz/server-copies",title:"Client-Server Number of Copies",description:"Question Text",source:"@site/docs/Lab/IO/quiz/server-copies.md",sourceDirName:"Lab/IO/quiz",slug:"/Lab/IO/quiz/server-copies",permalink:"/operating-systems/56/Lab/IO/quiz/server-copies",draft:!1,tags:[],version:"current",frontMatter:{}},s={},c=[{value:"Question Text",id:"question-text",level:2},{value:"Question Answers",id:"question-answers",level:2},{value:"Feedback",id:"feedback",level:2}],p={toc:c},u="wrapper";function f(e){let{components:t,...o}=e;return(0,i.yg)(u,(0,n.A)({},p,o,{components:t,mdxType:"MDXLayout"}),(0,i.yg)("h1",{id:"client-server-number-of-copies"},"Client-Server Number of Copies"),(0,i.yg)("h2",{id:"question-text"},"Question Text"),(0,i.yg)("p",null,"The server in the image below uses regular TCP sockets to handle the connection and ",(0,i.yg)("inlineCode",{parentName:"p"},"send()")," to send the data.\nHow many times are the contents of the file copied by the server while being sent to the client?"),(0,i.yg)("p",null,(0,i.yg)("img",{alt:"Client-Server Steps",src:r(2843).A})),(0,i.yg)("h2",{id:"question-answers"},"Question Answers"),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("p",{parentName:"li"},"2")),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("p",{parentName:"li"},"1"))),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},"4")),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},"3")),(0,i.yg)("h2",{id:"feedback"},"Feedback"),(0,i.yg)("p",null,"Rembember double buffering!\nWhen the app calls ",(0,i.yg)("inlineCode",{parentName:"p"},"read()"),", the server's kernel will first save the file to an internal buffer destined for reading.\nThen the app will copy the file to its own buffer.\nFollowing this step, the app will call ",(0,i.yg)("inlineCode",{parentName:"p"},"send()"),", which will first copy the file to a buffer in the kernel.\nFrom this buffer, the kernel itself will copy the file to another buffer on the NIC (Network Interface Card).\nIn total, there the file is copied ",(0,i.yg)("strong",{parentName:"p"},"4 times"),", as outlined in the image below."),(0,i.yg)("p",null,(0,i.yg)("img",{alt:"Server Copies - Read-Send",src:r(8962).A})))}f.isMDXComponent=!0},2843:(e,t,r)=>{r.d(t,{A:()=>n});const n=r.p+"assets/images/client-server-file-c21c08a102e6557188be7f080092a12c.svg"},8962:(e,t,r)=>{r.d(t,{A:()=>n});const n=r.p+"assets/images/server-copies-normal-7e82d53d42a478d0313cb85917335f94.svg"}}]);