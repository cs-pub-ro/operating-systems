"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[1992],{5680:(e,n,t)=>{t.d(n,{xA:()=>l,yg:()=>d});var a=t(6540);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function p(e,n){if(null==e)return{};var t,a,r=function(e,n){if(null==e)return{};var t,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var s=a.createContext({}),c=function(e){var n=a.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},l=function(e){var n=c(e.components);return a.createElement(s.Provider,{value:n},e.children)},m="mdxType",u={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},g=a.forwardRef((function(e,n){var t=e.components,r=e.mdxType,o=e.originalType,s=e.parentName,l=p(e,["components","mdxType","originalType","parentName"]),m=c(t),g=r,d=m["".concat(s,".").concat(g)]||m[g]||u[g]||o;return t?a.createElement(d,i(i({ref:n},l),{},{components:t})):a.createElement(d,i({ref:n},l))}));function d(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var o=t.length,i=new Array(o);i[0]=g;var p={};for(var s in n)hasOwnProperty.call(n,s)&&(p[s]=n[s]);p.originalType=e,p[m]="string"==typeof e?e:r,i[1]=p;for(var c=2;c<o;c++)i[c]=t[c];return a.createElement.apply(null,i)}return a.createElement.apply(null,t)}g.displayName="MDXCreateElement"},2249:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>s,contentTitle:()=>i,default:()=>u,frontMatter:()=>o,metadata:()=>p,toc:()=>c});var a=t(8168),r=(t(6540),t(5680));const o={},i="Extending an App Manager",p={unversionedId:"Exams/Extending an App Manager/extending-an-app-manager",id:"Exams/Extending an App Manager/extending-an-app-manager",title:"Extending an App Manager",description:"Scenario",source:"@site/docs/Exams/Extending an App Manager/extending-an-app-manager.md",sourceDirName:"Exams/Extending an App Manager",slug:"/Exams/Extending an App Manager/extending-an-app-manager",permalink:"/operating-systems/85/Exams/Extending an App Manager/extending-an-app-manager",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"Header Analysis Application",permalink:"/operating-systems/85/Exams/Header Analysis Application/header-analysis-application"},next:{title:"Backup System",permalink:"/operating-systems/85/Exams/Backup System/backup-system"}},s={},c=[{value:"Scenario",id:"scenario",level:2},{value:"Questions",id:"questions",level:2}],l={toc:c},m="wrapper";function u(e){let{components:n,...t}=e;return(0,r.yg)(m,(0,a.A)({},l,t,{components:n,mdxType:"MDXLayout"}),(0,r.yg)("h1",{id:"extending-an-app-manager"},"Extending an App Manager"),(0,r.yg)("h2",{id:"scenario"},"Scenario"),(0,r.yg)("p",null,"We want to extend the functionality of an application manager (a program that runs and manages executables).\nWe want to add functionality to the application manager through which we can transfer a process managed by it from one system to another system managed by another application manager while the process is running.\nFor simplicity, we consider that the process does not use files from the disk."),(0,r.yg)("p",null,"All answers should be justified."),(0,r.yg)("h2",{id:"questions"},"Questions"),(0,r.yg)("ol",null,(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},"How do you establish the connection and transfer between managers?\nDescribe a minimal communication protocol.")),(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},"What process data needs to be transferred so that the process can continue running (from where it left off) on the new system?")),(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},"How do you minimize the time the process is stopped?"))))}u.isMDXComponent=!0}}]);