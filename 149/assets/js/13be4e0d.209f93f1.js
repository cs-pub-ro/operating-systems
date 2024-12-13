"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[9445],{5680:(e,t,r)=>{r.d(t,{xA:()=>c,yg:()=>f});var a=r(6540);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},o=Object.keys(e);for(a=0;a<o.length;a++)r=o[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)r=o[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var p=a.createContext({}),l=function(e){var t=a.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):s(s({},t),e)),r},c=function(e){var t=l(e.components);return a.createElement(p.Provider,{value:t},e.children)},u="mdxType",y={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,o=e.originalType,p=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),u=l(r),m=n,f=u["".concat(p,".").concat(m)]||u[m]||y[m]||o;return r?a.createElement(f,s(s({ref:t},c),{},{components:r})):a.createElement(f,s({ref:t},c))}));function f(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=r.length,s=new Array(o);s[0]=m;var i={};for(var p in t)hasOwnProperty.call(t,p)&&(i[p]=t[p]);i.originalType=e,i[u]="string"==typeof e?e:n,s[1]=i;for(var l=2;l<o;l++)s[l]=r[l];return a.createElement.apply(null,s)}return a.createElement.apply(null,r)}m.displayName="MDXCreateElement"},1017:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>p,contentTitle:()=>s,default:()=>y,frontMatter:()=>o,metadata:()=>i,toc:()=>l});var a=r(8168),n=(r(6540),r(5680));const o={},s="Backup System",i={unversionedId:"Exams/Backup System/backup-system",id:"Exams/Backup System/backup-system",title:"Backup System",description:"Scenario",source:"@site/docs/Exams/Backup System/backup-system.md",sourceDirName:"Exams/Backup System",slug:"/Exams/Backup System/backup-system",permalink:"/operating-systems/149/Exams/Backup System/backup-system",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"Extending an App Manager",permalink:"/operating-systems/149/Exams/Extending an App Manager/extending-an-app-manager"},next:{title:"File Changes Notifier",permalink:"/operating-systems/149/Exams/File Changes Notifier/file-changes-notifier"}},p={},l=[{value:"Scenario",id:"scenario",level:2},{value:"Questions",id:"questions",level:2}],c={toc:l},u="wrapper";function y(e){let{components:t,...r}=e;return(0,n.yg)(u,(0,a.A)({},c,r,{components:t,mdxType:"MDXLayout"}),(0,n.yg)("h1",{id:"backup-system"},"Backup System"),(0,n.yg)("h2",{id:"scenario"},"Scenario"),(0,n.yg)("p",null,"For speed, a data analysis program uses memory pages (typically, it uses around 4GB of RAM) to store information.\nBecause the data is critical, its loss is not allowed in case the operating system is unexpectedly restarted.\nWe want to add a backup functionality to the program so that data from memory is periodically saved to disk.\nFor data recovery, analysis data for the last N intervals is kept (we have N files of 4GB each, each file retains analysis data from a backup)."),(0,n.yg)("p",null,"All answers should be justified."),(0,n.yg)("h2",{id:"questions"},"Questions"),(0,n.yg)("ol",null,(0,n.yg)("li",{parentName:"ol"},(0,n.yg)("p",{parentName:"li"},"How would you implement such a backup system?")),(0,n.yg)("li",{parentName:"ol"},(0,n.yg)("p",{parentName:"li"},"How do you determine the opportune moment for performing the backup?")),(0,n.yg)("li",{parentName:"ol"},(0,n.yg)("p",{parentName:"li"},"Do you use a separate process or thread for performing the backup?\nJustify your answer.")),(0,n.yg)("li",{parentName:"ol"},(0,n.yg)("p",{parentName:"li"},"How do you manage the files saved to disk?")),(0,n.yg)("li",{parentName:"ol"},(0,n.yg)("p",{parentName:"li"},"How do you analyze the overhead brought by the backup functionality?"))))}y.isMDXComponent=!0}}]);