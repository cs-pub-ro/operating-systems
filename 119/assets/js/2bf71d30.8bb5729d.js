"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[3748],{5680:(e,n,t)=>{t.d(n,{xA:()=>m,yg:()=>d});var r=t(6540);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function s(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?s(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):s(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function o(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},s=Object.keys(e);for(r=0;r<s.length;r++)t=s[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)t=s[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var l=r.createContext({}),c=function(e){var n=r.useContext(l),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},m=function(e){var n=c(e.components);return r.createElement(l.Provider,{value:n},e.children)},p="mdxType",y={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},u=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,s=e.originalType,l=e.parentName,m=o(e,["components","mdxType","originalType","parentName"]),p=c(t),u=a,d=p["".concat(l,".").concat(u)]||p[u]||y[u]||s;return t?r.createElement(d,i(i({ref:n},m),{},{components:t})):r.createElement(d,i({ref:n},m))}));function d(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var s=t.length,i=new Array(s);i[0]=u;var o={};for(var l in n)hasOwnProperty.call(n,l)&&(o[l]=n[l]);o.originalType=e,o[p]="string"==typeof e?e:a,i[1]=o;for(var c=2;c<s;c++)i[c]=t[c];return r.createElement.apply(null,i)}return r.createElement.apply(null,t)}u.displayName="MDXCreateElement"},9193:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>i,default:()=>y,frontMatter:()=>s,metadata:()=>o,toc:()=>c});var r=t(8168),a=(t(6540),t(5680));const s={},i="Blockchain System",o={unversionedId:"Exams/Blockchain System/blockchain-system",id:"Exams/Blockchain System/blockchain-system",title:"Blockchain System",description:"Scenario",source:"@site/docs/Exams/Blockchain System/blockchain-system.md",sourceDirName:"Exams/Blockchain System",slug:"/Exams/Blockchain System/blockchain-system",permalink:"/operating-systems/119/Exams/Blockchain System/blockchain-system",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"Industrial System",permalink:"/operating-systems/119/Exams/Industrial System/industrial-system"},next:{title:"Supervisor-type Service",permalink:"/operating-systems/119/Exams/Supervisor-type Service/supervisor-type-service"}},l={},c=[{value:"Scenario",id:"scenario",level:2},{value:"Questions",id:"questions",level:2}],m={toc:c},p="wrapper";function y(e){let{components:n,...t}=e;return(0,a.yg)(p,(0,r.A)({},m,t,{components:n,mdxType:"MDXLayout"}),(0,a.yg)("h1",{id:"blockchain-system"},"Blockchain System"),(0,a.yg)("h2",{id:"scenario"},"Scenario"),(0,a.yg)("p",null,"A blockchain system can be viewed as a database replicated across multiple nodes (each node having its own operating system) distributed in different locations.\nAll nodes start with exactly the same user database.\nThere are frontend services to handle client requests (e.g., transferring from Alice to Bob).\nThe backend service, each node receives the same transaction and applies changes to its own local database (subtracting from Alice's wallet variable and adding to Bob's wallet variable).\nFinally, there's a consensus stage where it's checked if the majority of nodes have the same database in the end.\nIf yes, the action is retained.\nOtherwise, it's canceled."),(0,a.yg)("p",null,'Answer the following questions with "True" or "False" and justify the response.\nJustification should be simple, 2-3 sentences for each response.'),(0,a.yg)("h2",{id:"questions"},"Questions"),(0,a.yg)("ol",null,(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"At the node level, transaction execution will benefit from using the buffer cache.\nAnswer: True")),(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"The frontend services are I/O intensive.\nAnswer: True")),(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"The backend service is I/O intensive.\nAnswer: True")),(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"For the consensus routine, communication between nodes can be done through shared memory.\nAnswer: False")),(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"If a node becomes unavailable, the entire system becomes unusable.\nAnswer: False")),(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"The frontend service predominantly uses socket file descriptors.\nAnswer: True")),(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"The backend service predominantly uses file descriptors of type file.\nAnswer: True")),(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"All nodes need to use the same operating system to communicate and synchronize.\nAnswer: False")),(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"If consensus is reached, all nodes will write the obtained result into the database.\nSynchronization mechanism is needed for this write.\nAnswer: False")),(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"An SSD (fast storage) is more useful for the frontend service than for the backend.\nAnswer: False")),(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"The backend service uses a lot of RAM (almost the entire system memory).\nAnswer: True"))))}y.isMDXComponent=!0}}]);