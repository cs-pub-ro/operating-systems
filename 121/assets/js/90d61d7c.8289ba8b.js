"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[6739],{5680:(e,t,n)=>{n.d(t,{xA:()=>c,yg:()=>m});var r=n(6540);function s(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){s(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,s=function(e,t){if(null==e)return{};var n,r,s={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(s[n]=e[n]);return s}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(s[n]=e[n])}return s}var p=r.createContext({}),l=function(e){var t=r.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},c=function(e){var t=l(e.components);return r.createElement(p.Provider,{value:t},e.children)},u="mdxType",y={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,s=e.mdxType,o=e.originalType,p=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),u=l(n),d=s,m=u["".concat(p,".").concat(d)]||u[d]||y[d]||o;return n?r.createElement(m,a(a({ref:t},c),{},{components:n})):r.createElement(m,a({ref:t},c))}));function m(e,t){var n=arguments,s=t&&t.mdxType;if("string"==typeof e||s){var o=n.length,a=new Array(o);a[0]=d;var i={};for(var p in t)hasOwnProperty.call(t,p)&&(i[p]=t[p]);i.originalType=e,i[u]="string"==typeof e?e:s,a[1]=i;for(var l=2;l<o;l++)a[l]=n[l];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},5554:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>a,default:()=>y,frontMatter:()=>o,metadata:()=>i,toc:()=>l});var r=n(8168),s=(n(6540),n(5680));const o={},a="Parent of `sleep` Processes",i={unversionedId:"Compute/Questions/parent-of-sleep-processes",id:"Compute/Questions/parent-of-sleep-processes",title:"Parent of `sleep` Processes",description:"Question Text",source:"@site/docs/Compute/Questions/parent-of-sleep-processes.md",sourceDirName:"Compute/Questions",slug:"/Compute/Questions/parent-of-sleep-processes",permalink:"/operating-systems/121/Compute/Questions/parent-of-sleep-processes",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"Processes Speedup",permalink:"/operating-systems/121/Compute/Questions/processes-speedup"},next:{title:"Sleeping on a Fiber",permalink:"/operating-systems/121/Compute/Questions/sleeping-on-a-fiber"}},p={},l=[{value:"Question Text",id:"question-text",level:2},{value:"Question Answers",id:"question-answers",level:2},{value:"Feedback",id:"feedback",level:2}],c={toc:l},u="wrapper";function y(e){let{components:t,...n}=e;return(0,s.yg)(u,(0,r.A)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,s.yg)("h1",{id:"parent-of-sleep-processes"},"Parent of ",(0,s.yg)("inlineCode",{parentName:"h1"},"sleep")," Processes"),(0,s.yg)("h2",{id:"question-text"},"Question Text"),(0,s.yg)("p",null,"Who is the parent of the ",(0,s.yg)("inlineCode",{parentName:"p"},"sleep")," processes?\nWhy?"),(0,s.yg)("h2",{id:"question-answers"},"Question Answers"),(0,s.yg)("ul",null,(0,s.yg)("li",{parentName:"ul"},(0,s.yg)("p",{parentName:"li"},(0,s.yg)("inlineCode",{parentName:"p"},"sleepy_creator.py")," because it is the one who created them")),(0,s.yg)("li",{parentName:"ul"},(0,s.yg)("p",{parentName:"li"},(0,s.yg)("inlineCode",{parentName:"p"},"bash")," because it is ",(0,s.yg)("inlineCode",{parentName:"p"},"sleepy_creator.py"),"'s parent and when a process dies, its parent adopts its orphan children"))),(0,s.yg)("ul",null,(0,s.yg)("li",{parentName:"ul"},(0,s.yg)("inlineCode",{parentName:"li"},"systemd")," because this is the default process that adopts orphans")),(0,s.yg)("ul",null,(0,s.yg)("li",{parentName:"ul"},(0,s.yg)("inlineCode",{parentName:"li"},"systemd")," because it is ",(0,s.yg)("inlineCode",{parentName:"li"},"sleepy_creator.py"),"'s parent and when a process dies, its parent adopts its orphan children")),(0,s.yg)("h2",{id:"feedback"},"Feedback"),(0,s.yg)("p",null,"When a process dies without waiting for the termination of all its children, those processes are now orphans.\nThen the ",(0,s.yg)("inlineCode",{parentName:"p"},"systemd")," process adopts those orphan processes by default.\nOn older Linux systems, it was the ",(0,s.yg)("inlineCode",{parentName:"p"},"init")," process who adopted orphans."))}y.isMDXComponent=!0}}]);