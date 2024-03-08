"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[4222],{5680:(e,t,n)=>{n.d(t,{xA:()=>u,yg:()=>d});var r=n(6540);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=r.createContext({}),p=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=p(e.components);return r.createElement(l.Provider,{value:t},e.children)},s="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},y=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,u=c(e,["components","mdxType","originalType","parentName"]),s=p(n),y=a,d=s["".concat(l,".").concat(y)]||s[y]||m[y]||o;return n?r.createElement(d,i(i({ref:t},u),{},{components:n})):r.createElement(d,i({ref:t},u))}));function d(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=y;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c[s]="string"==typeof e?e:a,i[1]=c;for(var p=2;p<o;p++)i[p]=n[p];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}y.displayName="MDXCreateElement"},6903:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>m,frontMatter:()=>o,metadata:()=>c,toc:()=>p});var r=n(8168),a=(n(6540),n(5680));const o={},i="`apache2` Document Root",c={unversionedId:"Lab/Compute/quiz/apache2-strace",id:"Lab/Compute/quiz/apache2-strace",title:"`apache2` Document Root",description:"Question Text",source:"@site/docs/Lab/Compute/quiz/apache2-strace.md",sourceDirName:"Lab/Compute/quiz",slug:"/Lab/Compute/quiz/apache2-strace",permalink:"/operating-systems/56/Lab/Compute/quiz/apache2-strace",draft:!1,tags:[],version:"current",frontMatter:{}},l={},p=[{value:"Question Text",id:"question-text",level:2},{value:"Question Answers",id:"question-answers",level:2},{value:"Feedback",id:"feedback",level:2}],u={toc:p},s="wrapper";function m(e){let{components:t,...n}=e;return(0,a.yg)(s,(0,r.A)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,a.yg)("h1",{id:"apache2-document-root"},(0,a.yg)("inlineCode",{parentName:"h1"},"apache2")," Document Root"),(0,a.yg)("h2",{id:"question-text"},"Question Text"),(0,a.yg)("p",null,"What is the document root of the ",(0,a.yg)("inlineCode",{parentName:"p"},"apache2")," server?"),(0,a.yg)("h2",{id:"question-answers"},"Question Answers"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("inlineCode",{parentName:"li"},"/etc/apache2"))),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("inlineCode",{parentName:"li"},"/usr/local/apache2/htdocs/"))),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},(0,a.yg)("inlineCode",{parentName:"p"},"/var/www/html"))),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},(0,a.yg)("inlineCode",{parentName:"p"},"/var/www/apache2/htdocs")))),(0,a.yg)("h2",{id:"feedback"},"Feedback"),(0,a.yg)("p",null,"In ",(0,a.yg)("inlineCode",{parentName:"p"},"strace")," we see that the server opens the file ",(0,a.yg)("inlineCode",{parentName:"p"},"/usr/local/apache2/htdocs/index.html"),".\nThis means that the document root is ",(0,a.yg)("inlineCode",{parentName:"p"},"/usr/local/apache2/htdocs/"),"."))}m.isMDXComponent=!0}}]);