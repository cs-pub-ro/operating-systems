"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[923],{5680:(e,t,n)=>{n.d(t,{xA:()=>u,yg:()=>f});var r=n(6540);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=r.createContext({}),p=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},u=function(e){var t=p(e.components);return r.createElement(l.Provider,{value:t},e.children)},c="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},y=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,l=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),c=p(n),y=o,f=c["".concat(l,".").concat(y)]||c[y]||m[y]||i;return n?r.createElement(f,a(a({ref:t},u),{},{components:n})):r.createElement(f,a({ref:t},u))}));function f(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,a=new Array(i);a[0]=y;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[c]="string"==typeof e?e:o,a[1]=s;for(var p=2;p<i;p++)a[p]=n[p];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}y.displayName="MDXCreateElement"},2725:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>a,default:()=>m,frontMatter:()=>i,metadata:()=>s,toc:()=>p});var r=n(8168),o=(n(6540),n(5680));const i={},a="Limitation of Anonymous Pipes",s={unversionedId:"Lab/IO/quiz/anonymous-pipes-limitation",id:"Lab/IO/quiz/anonymous-pipes-limitation",title:"Limitation of Anonymous Pipes",description:"Question Text",source:"@site/docs/Lab/IO/quiz/anonymous-pipes-limitation.md",sourceDirName:"Lab/IO/quiz",slug:"/Lab/IO/quiz/anonymous-pipes-limitation",permalink:"/operating-systems/85/Lab/IO/quiz/anonymous-pipes-limitation",draft:!1,tags:[],version:"current",frontMatter:{}},l={},p=[{value:"Question Text",id:"question-text",level:2},{value:"Question Answers",id:"question-answers",level:2},{value:"Feedback",id:"feedback",level:2}],u={toc:p},c="wrapper";function m(e){let{components:t,...n}=e;return(0,o.yg)(c,(0,r.A)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,o.yg)("h1",{id:"limitation-of-anonymous-pipes"},"Limitation of Anonymous Pipes"),(0,o.yg)("h2",{id:"question-text"},"Question Text"),(0,o.yg)("p",null,"What of the following is the largest drawback of using anonymous pipes (created with ",(0,o.yg)("inlineCode",{parentName:"p"},"pipe()"),") for inter-process communication?"),(0,o.yg)("h2",{id:"question-answers"},"Question Answers"),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},"they only allow unidirectional communication")),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},'they only allow IPC between "related" processes (parent - child - grandchild etc.)')),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("p",{parentName:"li"},"if more processes use the same end of the same pipe, there may be race conditions")),(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("p",{parentName:"li"},"a pipe only has 2 file descriptors, but some processes may need more channels to communicate"))),(0,o.yg)("h2",{id:"feedback"},"Feedback"),(0,o.yg)("p",null,"Out of the answers above, the only limitation that cannot be overcome by using pipes alone is the requirement for the processes using them to be related.\nThe parent must create the pipes so the children can inherit them.\nAll other downsides can be overcome by using more pipes."),(0,o.yg)("p",null,"The answer to this is to employ ",(0,o.yg)("em",{parentName:"p"},"some")," filesystem support."))}m.isMDXComponent=!0}}]);