"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[296],{5680:(e,t,n)=>{n.d(t,{xA:()=>p,yg:()=>g});var r=n(6540);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var l=r.createContext({}),u=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},p=function(e){var t=u(e.components);return r.createElement(l.Provider,{value:t},e.children)},c="mdxType",f={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},y=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,o=e.originalType,l=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),c=u(n),y=i,g=c["".concat(l,".").concat(y)]||c[y]||f[y]||o;return n?r.createElement(g,a(a({ref:t},p),{},{components:n})):r.createElement(g,a({ref:t},p))}));function g(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=n.length,a=new Array(o);a[0]=y;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[c]="string"==typeof e?e:i,a[1]=s;for(var u=2;u<o;u++)a[u]=n[u];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}y.displayName="MDXCreateElement"},9511:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>a,default:()=>f,frontMatter:()=>o,metadata:()=>s,toc:()=>u});var r=n(8168),i=(n(6540),n(5680));const o={},a="String Buffer Overflow",s={unversionedId:"Data/Questions/string-buff-over",id:"Data/Questions/string-buff-over",title:"String Buffer Overflow",description:"Question Text",source:"@site/docs/Data/Questions/string-buff-over.md",sourceDirName:"Data/Questions",slug:"/Data/Questions/string-buff-over",permalink:"/operating-systems/121/Data/Questions/string-buff-over",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"Stack layout",permalink:"/operating-systems/121/Data/Questions/stack-layout"},next:{title:"Strcpy Buffer Overflow",permalink:"/operating-systems/121/Data/Questions/string-strcpy"}},l={},u=[{value:"Question Text",id:"question-text",level:2},{value:"Question Answers",id:"question-answers",level:2},{value:"Feedback",id:"feedback",level:2}],p={toc:u},c="wrapper";function f(e){let{components:t,...n}=e;return(0,i.yg)(c,(0,r.A)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,i.yg)("h1",{id:"string-buffer-overflow"},"String Buffer Overflow"),(0,i.yg)("h2",{id:"question-text"},"Question Text"),(0,i.yg)("p",null,"Why does the buffer overflow occur?"),(0,i.yg)("h2",{id:"question-answers"},"Question Answers"),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("p",{parentName:"li"},"the initial string, declared in ",(0,i.yg)("inlineCode",{parentName:"p"},"main()"),", does not contain a terminating null byte.")),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("p",{parentName:"li"},"the buffer is not large enough to store the copied bytes.")),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("p",{parentName:"li"},(0,i.yg)("inlineCode",{parentName:"p"},"memcpy()")," skips the copying of terminating null bytes."))),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("inlineCode",{parentName:"li"},"memcpy()")," copies 4 bytes, whereas the size of the string, including the terminating null byte, is 5.")),(0,i.yg)("h2",{id:"feedback"},"Feedback"),(0,i.yg)("p",null,"The string ",(0,i.yg)("inlineCode",{parentName:"p"},"soso")," has length equal to 4, however, 5 bytes are actually used to store it, including the terminating null byte.\nEven though the buffer declared in ",(0,i.yg)("inlineCode",{parentName:"p"},"fun()")," is not large enough to store the 5 bytes, the underlying issue is that we copying just 4 bytes, thus skipping the null byte."))}f.isMDXComponent=!0}}]);