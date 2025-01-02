"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[6875],{5680:(e,t,n)=>{n.d(t,{xA:()=>c,yg:()=>d});var r=n(6540);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var s=r.createContext({}),p=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},c=function(e){var t=p(e.components);return r.createElement(s.Provider,{value:t},e.children)},u="mdxType",y={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,o=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),u=p(n),m=i,d=u["".concat(s,".").concat(m)]||u[m]||y[m]||o;return n?r.createElement(d,a(a({ref:t},c),{},{components:n})):r.createElement(d,a({ref:t},c))}));function d(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=n.length,a=new Array(o);a[0]=m;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[u]="string"==typeof e?e:i,a[1]=l;for(var p=2;p<o;p++)a[p]=n[p];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},4694:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>a,default:()=>y,frontMatter:()=>o,metadata:()=>l,toc:()=>p});var r=n(8168),i=(n(6540),n(5680));const o={},a="Time Server Protocol",l={unversionedId:"Application Interaction/Questions/time-server",id:"Application Interaction/Questions/time-server",title:"Time Server Protocol",description:"Question Text",source:"@site/docs/Application Interaction/Questions/time-server.md",sourceDirName:"Application Interaction/Questions",slug:"/Application Interaction/Questions/time-server",permalink:"/operating-systems/Application Interaction/Questions/time-server",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"Questions",permalink:"/operating-systems/Application Interaction/Questions/"},next:{title:"Time Server Interoperability",permalink:"/operating-systems/Application Interaction/Questions/time-server-interop"}},s={},p=[{value:"Question Text",id:"question-text",level:2},{value:"Question Answers",id:"question-answers",level:2},{value:"Feedback",id:"feedback",level:2}],c={toc:p},u="wrapper";function y(e){let{components:t,...n}=e;return(0,i.yg)(u,(0,r.A)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,i.yg)("h1",{id:"time-server-protocol"},"Time Server Protocol"),(0,i.yg)("h2",{id:"question-text"},"Question Text"),(0,i.yg)("p",null,"What format does the message exchanged between the server and the client have?"),(0,i.yg)("h2",{id:"question-answers"},"Question Answers"),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("p",{parentName:"li"},"4 byte length (little endian) followed by 8 byte timestamp (little endian)")),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("p",{parentName:"li"},"8 byte length (little endian) followed by 4 byte timestamp (little endian)"))),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},"4 byte length (big endian) followed by 8 byte timestamp (big endian)")),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},"8 byte length (big endian) followed by 4 byte timestamp (big endian)")),(0,i.yg)("h2",{id:"feedback"},"Feedback"),(0,i.yg)("p",null,"If we consider one output example:"),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-console"},"00000000  00 00 00 08 00 00 00 00  63 1b a9 50              |........c..P|\n0000000c\n")),(0,i.yg)("p",null,"We can identify the 4 byte length in big endian (",(0,i.yg)("inlineCode",{parentName:"p"},"00 00 00 08"),"), then the 8 byte timestamp (",(0,i.yg)("inlineCode",{parentName:"p"},"00 00 00 00  63 1b a9 50"),"), also in big endian."))}y.isMDXComponent=!0}}]);