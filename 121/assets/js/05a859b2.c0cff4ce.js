"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[5023],{5680:(e,t,r)=>{r.d(t,{xA:()=>u,yg:()=>y});var n=r(6540);function s(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function a(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){s(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,s=function(e,t){if(null==e)return{};var r,n,s={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(s[r]=e[r]);return s}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(s[r]=e[r])}return s}var c=n.createContext({}),l=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):a(a({},t),e)),r},u=function(e){var t=l(e.components);return n.createElement(c.Provider,{value:t},e.children)},p="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,s=e.mdxType,o=e.originalType,c=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),p=l(r),d=s,y=p["".concat(c,".").concat(d)]||p[d]||m[d]||o;return r?n.createElement(y,a(a({ref:t},u),{},{components:r})):n.createElement(y,a({ref:t},u))}));function y(e,t){var r=arguments,s=t&&t.mdxType;if("string"==typeof e||s){var o=r.length,a=new Array(o);a[0]=d;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i[p]="string"==typeof e?e:s,a[1]=i;for(var l=2;l<o;l++)a[l]=r[l];return n.createElement.apply(null,a)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},6779:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>a,default:()=>m,frontMatter:()=>o,metadata:()=>i,toc:()=>l});var n=r(8168),s=(r(6540),r(5680));const o={},a="Cloud System",i={unversionedId:"Exams/Cloud System/cloud-system",id:"Exams/Cloud System/cloud-system",title:"Cloud System",description:"Scenario",source:"@site/docs/Exams/Cloud System/cloud-system.md",sourceDirName:"Exams/Cloud System",slug:"/Exams/Cloud System/cloud-system",permalink:"/operating-systems/121/Exams/Cloud System/cloud-system",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"Memory Deduplication",permalink:"/operating-systems/121/Exams/Memory Deduplication/memory-deduplication"},next:{title:"Hackathons",permalink:"/operating-systems/121/Hackathons/"}},c={},l=[{value:"Scenario",id:"scenario",level:2},{value:"Questions",id:"questions",level:2}],u={toc:l},p="wrapper";function m(e){let{components:t,...r}=e;return(0,s.yg)(p,(0,n.A)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,s.yg)("h1",{id:"cloud-system"},"Cloud System"),(0,s.yg)("h2",{id:"scenario"},"Scenario"),(0,s.yg)("p",null,'We are designing a cloud system to run microservices using small virtual machines (microVMs).\nThe system consists of "executor" nodes that store and run the virtual machines and a "dispatcher" node that distributes requests to the "executor" nodes.'),(0,s.yg)("p",null,"Executor nodes can stop, suspend, start, or resume virtual machines based on requests received from the dispatcher.\nSuspension can occur either in RAM or on disk."),(0,s.yg)("p",null,"All answers should be justified."),(0,s.yg)("h2",{id:"questions"},"Questions"),(0,s.yg)("ol",null,(0,s.yg)("li",{parentName:"ol"},(0,s.yg)("p",{parentName:"li"},"Describe the criteria based on which the dispatcher will send requests to the executors and how it obtains/measures the necessary metrics.")),(0,s.yg)("li",{parentName:"ol"},(0,s.yg)("p",{parentName:"li"},"What usage scenarios are suitable for such a cloud system?\nIn these scenarios, when does the starting/resuming and stopping/suspending of a virtual machine occur?")),(0,s.yg)("li",{parentName:"ol"},(0,s.yg)("p",{parentName:"li"},"How does an executor node decide which method to use: stopping, suspending in RAM, or suspending on disk?\nWhat criteria does it use, and how does it use them in the decision-making process?")),(0,s.yg)("li",{parentName:"ol"},(0,s.yg)("p",{parentName:"li"},"How will you calculate the billing for the system's customers?"))))}m.isMDXComponent=!0}}]);