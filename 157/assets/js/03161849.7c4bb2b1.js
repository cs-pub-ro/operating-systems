"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[8899],{5680:(e,t,r)=>{r.d(t,{xA:()=>u,yg:()=>y});var n=r(6540);function s(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function a(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){s(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,s=function(e,t){if(null==e)return{};var r,n,s={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(s[r]=e[r]);return s}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(s[r]=e[r])}return s}var p=n.createContext({}),l=function(e){var t=n.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):a(a({},t),e)),r},u=function(e){var t=l(e.components);return n.createElement(p.Provider,{value:t},e.children)},c="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,s=e.mdxType,o=e.originalType,p=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),c=l(r),m=s,y=c["".concat(p,".").concat(m)]||c[m]||d[m]||o;return r?n.createElement(y,a(a({ref:t},u),{},{components:r})):n.createElement(y,a({ref:t},u))}));function y(e,t){var r=arguments,s=t&&t.mdxType;if("string"==typeof e||s){var o=r.length,a=new Array(o);a[0]=m;var i={};for(var p in t)hasOwnProperty.call(t,p)&&(i[p]=t[p]);i.originalType=e,i[c]="string"==typeof e?e:s,a[1]=i;for(var l=2;l<o;l++)a[l]=r[l];return n.createElement.apply(null,a)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},6736:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>p,contentTitle:()=>a,default:()=>d,frontMatter:()=>o,metadata:()=>i,toc:()=>l});var n=r(8168),s=(r(6540),r(5680));const o={},a="Processes Speedup",i={unversionedId:"Compute/Questions/processes-speedup",id:"Compute/Questions/processes-speedup",title:"Processes Speedup",description:"Question Text",source:"@site/docs/Compute/Questions/processes-speedup.md",sourceDirName:"Compute/Questions",slug:"/Compute/Questions/processes-speedup",permalink:"/operating-systems/157/Compute/Questions/processes-speedup",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"`create_sleepy` Process Ending",permalink:"/operating-systems/157/Compute/Questions/create-sleepy-process-ending"},next:{title:"Parent of `sleep` Processes",permalink:"/operating-systems/157/Compute/Questions/parent-of-sleep-processes"}},p={},l=[{value:"Question Text",id:"question-text",level:2},{value:"Question Answers",id:"question-answers",level:2},{value:"Feedback",id:"feedback",level:2}],u={toc:l},c="wrapper";function d(e){let{components:t,...r}=e;return(0,s.yg)(c,(0,n.A)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,s.yg)("h1",{id:"processes-speedup"},"Processes Speedup"),(0,s.yg)("h2",{id:"question-text"},"Question Text"),(0,s.yg)("p",null,"Why is the speedup from running the program in ",(0,s.yg)("inlineCode",{parentName:"p"},"support/sum-array/d/sum_array_processes.d")," with 1, 2, 4 and 8 processes less than expected?"),(0,s.yg)("h2",{id:"question-answers"},"Question Answers"),(0,s.yg)("ul",null,(0,s.yg)("li",{parentName:"ul"},"Because the array is split into unequal parts")),(0,s.yg)("ul",null,(0,s.yg)("li",{parentName:"ul"},"Because of the overhead introduced by the creation of the additional processes")),(0,s.yg)("ul",null,(0,s.yg)("li",{parentName:"ul"},(0,s.yg)("p",{parentName:"li"},"Because the algorithm is incorrect")),(0,s.yg)("li",{parentName:"ul"},(0,s.yg)("p",{parentName:"li"},"Because the operating systems runs all processes sequentially on the same core"))),(0,s.yg)("h2",{id:"feedback"},"Feedback"),(0,s.yg)("p",null,"Creating a new process involves an inherent overhead.\nThe OS calls the loader, launches the new process, then the parent process waits for it to finish, extracts its return value etc.\nAll this work together with creating the initial process has to be done by a single thread.\nIn addition, in real-world apps, other actions such as receiving data from the network or reading a file are inherently ",(0,s.yg)("strong",{parentName:"p"},"sequential"),".\nTherefore there will always be parts of any given program that cannot be run in parallel.\nAs a result, the speedup can never be equal to the number of processes between which we spread the workload."),(0,s.yg)("p",null,"It is possible to compute the speedup obtained from parallelising a portion of a given program.\nThe formula is rather simple and is called ",(0,s.yg)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/Amdahl%27s_law"},"Amdahl's law")))}d.isMDXComponent=!0}}]);