"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[9764],{5680:(e,t,n)=>{n.d(t,{xA:()=>u,yg:()=>y});var r=n(6540);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=r.createContext({}),p=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},u=function(e){var t=p(e.components);return r.createElement(c.Provider,{value:t},e.children)},l="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},g=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,c=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),l=p(n),g=a,y=l["".concat(c,".").concat(g)]||l[g]||m[g]||o;return n?r.createElement(y,s(s({ref:t},u),{},{components:n})):r.createElement(y,s({ref:t},u))}));function y(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,s=new Array(o);s[0]=g;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i[l]="string"==typeof e?e:a,s[1]=i;for(var p=2;p<o;p++)s[p]=n[p];return r.createElement.apply(null,s)}return r.createElement.apply(null,n)}g.displayName="MDXCreateElement"},1383:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>s,default:()=>m,frontMatter:()=>o,metadata:()=>i,toc:()=>p});var r=n(8168),a=(n(6540),n(5680));const o={},s="Cgroups Versus namespaces",i={unversionedId:"Application Interaction/Questions/cgroups-vs-namespaces",id:"Application Interaction/Questions/cgroups-vs-namespaces",title:"Cgroups Versus namespaces",description:"Question Text",source:"@site/docs/Application Interaction/Questions/cgroups-vs-namespaces.md",sourceDirName:"Application Interaction/Questions",slug:"/Application Interaction/Questions/cgroups-vs-namespaces",permalink:"/operating-systems/148/Application Interaction/Questions/cgroups-vs-namespaces",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"Container Versus VM",permalink:"/operating-systems/148/Application Interaction/Questions/container-vs-vm"},next:{title:"Lab 12 - Application Interaction",permalink:"/operating-systems/148/Application Interaction/lab12"}},c={},p=[{value:"Question Text",id:"question-text",level:2},{value:"Question Answers",id:"question-answers",level:2},{value:"Feedback",id:"feedback",level:2}],u={toc:p},l="wrapper";function m(e){let{components:t,...n}=e;return(0,a.yg)(l,(0,r.A)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,a.yg)("h1",{id:"cgroups-versus-namespaces"},"Cgroups Versus namespaces"),(0,a.yg)("h2",{id:"question-text"},"Question Text"),(0,a.yg)("p",null,"Which of the following affirmations about namespaces and cgroups is correct?"),(0,a.yg)("h2",{id:"question-answers"},"Question Answers"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"Cgroups provide resource management and namespaces provide isolation and security.")),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},"Namespaces provide resource management and cgroups provide isolation and security.")),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},"Both provide resource management.")),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},"Both provide isolation and security."))),(0,a.yg)("h2",{id:"feedback"},"Feedback"),(0,a.yg)("p",null,"They both serve different purposes, cgroups provide resource management and namespaces provide isolation and security.\nCgroups manage resources, while namespaces isolate and secure them."))}m.isMDXComponent=!0}}]);