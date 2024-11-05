"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[7205],{5680:(e,t,n)=>{n.d(t,{xA:()=>c,yg:()=>m});var r=n(6540);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=r.createContext({}),p=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},c=function(e){var t=p(e.components);return r.createElement(l.Provider,{value:t},e.children)},u="mdxType",y={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},f=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),u=p(n),f=a,m=u["".concat(l,".").concat(f)]||u[f]||y[f]||o;return n?r.createElement(m,s(s({ref:t},c),{},{components:n})):r.createElement(m,s({ref:t},c))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,s=new Array(o);s[0]=f;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i[u]="string"==typeof e?e:a,s[1]=i;for(var p=2;p<o;p++)s[p]=n[p];return r.createElement.apply(null,s)}return r.createElement.apply(null,n)}f.displayName="MDXCreateElement"},8022:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>s,default:()=>y,frontMatter:()=>o,metadata:()=>i,toc:()=>p});var r=n(8168),a=(n(6540),n(5680));const o={},s="Bypass Canary",i={unversionedId:"Data/Questions/bypass-canary",id:"Data/Questions/bypass-canary",title:"Bypass Canary",description:"Question",source:"@site/docs/Data/Questions/bypass-canary.md",sourceDirName:"Data/Questions",slug:"/Data/Questions/bypass-canary",permalink:"/operating-systems/121/Data/Questions/bypass-canary",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"Valgrind Leaks",permalink:"/operating-systems/121/Data/Questions/valgrind-leaks"},next:{title:"ASLR",permalink:"/operating-systems/121/Data/Questions/memory-aslr"}},l={},p=[{value:"Question",id:"question",level:2}],c={toc:p},u="wrapper";function y(e){let{components:t,...n}=e;return(0,a.yg)(u,(0,r.A)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,a.yg)("h1",{id:"bypass-canary"},"Bypass Canary"),(0,a.yg)("h2",{id:"question"},"Question"),(0,a.yg)("p",null,"If we enable ASLR, can we still exploit the ",(0,a.yg)("inlineCode",{parentName:"p"},"stack_protector")," program?"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},"no, because the address of ",(0,a.yg)("inlineCode",{parentName:"p"},"pawned")," is  going to be different for every run.")),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},"yes, because ASLR cannot work well when the canary is activated."))),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"yes, because ASLR randomizes the start address of a section, but the offsets remain the same.")),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"no, because the address to which ",(0,a.yg)("inlineCode",{parentName:"li"},"addr")," points to is going to be random")))}y.isMDXComponent=!0}}]);