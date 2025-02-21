"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[9008],{4471:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>o,default:()=>y,frontMatter:()=>a,metadata:()=>i,toc:()=>l});var r=n(8168),s=(n(6540),n(5680));const a={},o="`create_sleepy` Process Ending",i={unversionedId:"Compute/Questions/create-sleepy-process-ending",id:"Compute/Questions/create-sleepy-process-ending",title:"`create_sleepy` Process Ending",description:"Question Text",source:"@site/docs/Compute/Questions/create-sleepy-process-ending.md",sourceDirName:"Compute/Questions",slug:"/Compute/Questions/create-sleepy-process-ending",permalink:"/operating-systems/Compute/Questions/create-sleepy-process-ending",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"exec()` Without `fork()",permalink:"/operating-systems/Compute/Questions/exec-without-fork"},next:{title:"Processes Speedup",permalink:"/operating-systems/Compute/Questions/processes-speedup"}},p={},l=[{value:"Question Text",id:"question-text",level:2},{value:"Question Answers",id:"question-answers",level:2},{value:"Feedback",id:"feedback",level:2}],u={toc:l},c="wrapper";function y(e){let{components:t,...n}=e;return(0,s.yg)(c,(0,r.A)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,s.yg)("h1",{id:"create_sleepy-process-ending"},(0,s.yg)("inlineCode",{parentName:"h1"},"create_sleepy")," Process Ending"),(0,s.yg)("h2",{id:"question-text"},"Question Text"),(0,s.yg)("p",null,"Why does the ",(0,s.yg)("inlineCode",{parentName:"p"},"create_sleepy")," process wait a very long time before ending?\nUse ",(0,s.yg)("a",{parentName:"p",href:"https://man7.org/linux/man-pages/man3/system.3.html"},(0,s.yg)("inlineCode",{parentName:"a"},"system"),"'s man page")," to find the answer."),(0,s.yg)("h2",{id:"question-answers"},"Question Answers"),(0,s.yg)("ul",null,(0,s.yg)("li",{parentName:"ul"},(0,s.yg)("p",{parentName:"li"},"Because the code is unoptimized (the default optimisation level is ",(0,s.yg)("inlineCode",{parentName:"p"},"-O0"),")")),(0,s.yg)("li",{parentName:"ul"},(0,s.yg)("p",{parentName:"li"},"Because the operating system takes very long to finish the process"))),(0,s.yg)("ul",null,(0,s.yg)("li",{parentName:"ul"},"Because ",(0,s.yg)("inlineCode",{parentName:"li"},"system")," returns when the command given to it (",(0,s.yg)("inlineCode",{parentName:"li"},"sleep 1000"),") ends")),(0,s.yg)("ul",null,(0,s.yg)("li",{parentName:"ul"},"Because the CPU is very slow")),(0,s.yg)("h2",{id:"feedback"},"Feedback"),(0,s.yg)("p",null,"The ",(0,s.yg)("a",{parentName:"p",href:"https://man7.org/linux/man-pages/man3/system.3.html"},"man page")," says it clearly:"),(0,s.yg)("pre",null,(0,s.yg)("code",{parentName:"pre",className:"language-text"},"system() returns after the command has been completed.\n")),(0,s.yg)("p",null,"Therefore, in our case, it returns after ",(0,s.yg)("inlineCode",{parentName:"p"},"sleep 1000")," ends."))}y.isMDXComponent=!0},5680:(e,t,n)=>{n.d(t,{xA:()=>u,yg:()=>g});var r=n(6540);function s(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){s(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,s=function(e,t){if(null==e)return{};var n,r,s={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(s[n]=e[n]);return s}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(s[n]=e[n])}return s}var p=r.createContext({}),l=function(e){var t=r.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},u=function(e){var t=l(e.components);return r.createElement(p.Provider,{value:t},e.children)},c="mdxType",y={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,s=e.mdxType,a=e.originalType,p=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),c=l(n),m=s,g=c["".concat(p,".").concat(m)]||c[m]||y[m]||a;return n?r.createElement(g,o(o({ref:t},u),{},{components:n})):r.createElement(g,o({ref:t},u))}));function g(e,t){var n=arguments,s=t&&t.mdxType;if("string"==typeof e||s){var a=n.length,o=new Array(a);o[0]=m;var i={};for(var p in t)hasOwnProperty.call(t,p)&&(i[p]=t[p]);i.originalType=e,i[c]="string"==typeof e?e:s,o[1]=i;for(var l=2;l<a;l++)o[l]=n[l];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"}}]);