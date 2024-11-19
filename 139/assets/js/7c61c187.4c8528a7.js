"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[8897],{5680:(e,t,n)=>{n.d(t,{xA:()=>c,yg:()=>m});var a=n(6540);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=a.createContext({}),p=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},c=function(e){var t=p(e.components);return a.createElement(s.Provider,{value:t},e.children)},u="mdxType",y={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},g=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),u=p(n),g=r,m=u["".concat(s,".").concat(g)]||u[g]||y[g]||o;return n?a.createElement(m,i(i({ref:t},c),{},{components:n})):a.createElement(m,i({ref:t},c))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,i=new Array(o);i[0]=g;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[u]="string"==typeof e?e:r,i[1]=l;for(var p=2;p<o;p++)i[p]=n[p];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}g.displayName="MDXCreateElement"},1425:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>y,frontMatter:()=>o,metadata:()=>l,toc:()=>p});var a=n(8168),r=(n(6540),n(5680));const o={},i="Page Allocation",l={unversionedId:"Data/Questions/page-allocation",id:"Data/Questions/page-allocation",title:"Page Allocation",description:"Question Text",source:"@site/docs/Data/Questions/page-allocation.md",sourceDirName:"Data/Questions",slug:"/Data/Questions/page-allocation",permalink:"/operating-systems/139/Data/Questions/page-allocation",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"`mmap()` file",permalink:"/operating-systems/139/Data/Questions/mmap-file"},next:{title:"Operator Overloading",permalink:"/operating-systems/139/Data/Questions/operators"}},s={},p=[{value:"Question Text",id:"question-text",level:2},{value:"Question Answers",id:"question-answers",level:2},{value:"Feedback",id:"feedback",level:2}],c={toc:p},u="wrapper";function y(e){let{components:t,...n}=e;return(0,r.yg)(u,(0,a.A)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,r.yg)("h1",{id:"page-allocation"},"Page Allocation"),(0,r.yg)("h2",{id:"question-text"},"Question Text"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-console"},"student@os:~/.../drills/tasks/static-dynamic/support$ size hello-static\ntext    data     bss     dec     hex filename\n893333   20996    7128  921457   e0f71 hello-static\n")),(0,r.yg)("p",null,"How many bytes should we add to the ",(0,r.yg)("inlineCode",{parentName:"p"},".data")," section to make its size ",(0,r.yg)("inlineCode",{parentName:"p"},"28 KB"),", instead of ",(0,r.yg)("inlineCode",{parentName:"p"},"24 KB"),"?"),(0,r.yg)("h2",{id:"question-answers"},"Question Answers"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},"1 KB")),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},"4 KB")),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},"3580 bytes"))),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"3581 bytes")),(0,r.yg)("h2",{id:"feedback"},"Feedback"),(0,r.yg)("p",null,"The total size must be ",(0,r.yg)("inlineCode",{parentName:"p"},"1")," byte over the ",(0,r.yg)("inlineCode",{parentName:"p"},"24 KB")," threshold to cause a new page allocation.\nSo in order to get that past the current size of ",(0,r.yg)("inlineCode",{parentName:"p"},"20996"),", we need ",(0,r.yg)("inlineCode",{parentName:"p"},"3581")," bytes:"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-console"},'student@os:~$ echo "24 * 1024 + 1 - 20996" | bc\n3581\n')))}y.isMDXComponent=!0}}]);