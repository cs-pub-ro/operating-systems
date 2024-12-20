"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[3416],{5680:(e,t,n)=>{n.d(t,{xA:()=>c,yg:()=>m});var r=n(6540);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var u=r.createContext({}),l=function(e){var t=r.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},c=function(e){var t=l(e.components);return r.createElement(u.Provider,{value:t},e.children)},p="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},f=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,u=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),p=l(n),f=o,m=p["".concat(u,".").concat(f)]||p[f]||d[f]||i;return n?r.createElement(m,a(a({ref:t},c),{},{components:n})):r.createElement(m,a({ref:t},c))}));function m(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,a=new Array(i);a[0]=f;var s={};for(var u in t)hasOwnProperty.call(t,u)&&(s[u]=t[u]);s.originalType=e,s[p]="string"==typeof e?e:o,a[1]=s;for(var l=2;l<i;l++)a[l]=n[l];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}f.displayName="MDXCreateElement"},924:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>u,contentTitle:()=>a,default:()=>d,frontMatter:()=>i,metadata:()=>s,toc:()=>l});var r=n(8168),o=(n(6540),n(5680));const i={},a="Cause of `FileNotFoundError`",s={unversionedId:"Compute/Questions/cause-of-file-not-found-error",id:"Compute/Questions/cause-of-file-not-found-error",title:"Cause of `FileNotFoundError`",description:"Question Text",source:"@site/docs/Compute/Questions/cause-of-file-not-found-error.md",sourceDirName:"Compute/Questions",slug:"/Compute/Questions/cause-of-file-not-found-error",permalink:"/operating-systems/148/Compute/Questions/cause-of-file-not-found-error",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"Mini-shell Stops After Command",permalink:"/operating-systems/148/Compute/Questions/mini-shell-stops-after-command"},next:{title:"Process Creation",permalink:"/operating-systems/148/Compute/Questions/process-creation"}},u={},l=[{value:"Question Text",id:"question-text",level:2},{value:"Question Answers",id:"question-answers",level:2},{value:"Feedback",id:"feedback",level:2}],c={toc:l},p="wrapper";function d(e){let{components:t,...n}=e;return(0,o.yg)(p,(0,r.A)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,o.yg)("h1",{id:"cause-of-filenotfounderror"},"Cause of ",(0,o.yg)("inlineCode",{parentName:"h1"},"FileNotFoundError")),(0,o.yg)("h2",{id:"question-text"},"Question Text"),(0,o.yg)("p",null,"What causes the ",(0,o.yg)("inlineCode",{parentName:"p"},"FileNotFoundError")," when running ",(0,o.yg)("inlineCode",{parentName:"p"},"support/wait-for-me/wait_for_me_processes.py"),"?"),(0,o.yg)("h2",{id:"question-answers"},"Question Answers"),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},"The parent process attempts to open the file before the child process has had the time to create it")),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("p",{parentName:"li"},"There is a syntax error in the Python code")),(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("p",{parentName:"li"},"The mode with which to open the file is not specified in the parent process")),(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("p",{parentName:"li"},"The child process doesn't close the file"))),(0,o.yg)("h2",{id:"feedback"},"Feedback"),(0,o.yg)("p",null,"What you've just experienced is a ",(0,o.yg)("strong",{parentName:"p"},"race condition"),".\nRace conditions are situations in which one thread uses data that may or may not have been previously modified by another thread.\nBecause scheduling is generally nondeterministic, this means that on some runs, the first thread may access unmodified data and modified on others.\nIt's impossible to say what kind of data will be used by the first thread.\nIn our case, the data is the file you give to the script as an argument.\nIf scheduling the parent process or its running time takes long enough, the file may have been created by the time the parent needs it, but we can never be sure."))}d.isMDXComponent=!0}}]);