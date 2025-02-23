"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[9612],{919:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>p,contentTitle:()=>i,default:()=>f,frontMatter:()=>o,metadata:()=>l,toc:()=>u});var r=t(8168),a=(t(6540),t(5680));const o={},i='open()` equivalent of `fopen(..., "w")',l={unversionedId:"Lab/IO/quiz/fopen-w",id:"Lab/IO/quiz/fopen-w",title:'open()` equivalent of `fopen(..., "w")',description:"Question Text",source:"@site/docs/Lab/IO/quiz/fopen-w.md",sourceDirName:"Lab/IO/quiz",slug:"/Lab/IO/quiz/fopen-w",permalink:"/operating-systems/12/Lab/IO/quiz/fopen-w",draft:!1,tags:[],version:"current",frontMatter:{}},p={},u=[{value:"Question Text",id:"question-text",level:2},{value:"Question Answers",id:"question-answers",level:2},{value:"Feedback",id:"feedback",level:2}],s={toc:u},c="wrapper";function f(e){let{components:n,...t}=e;return(0,a.yg)(c,(0,r.A)({},s,t,{components:n,mdxType:"MDXLayout"}),(0,a.yg)("h1",{id:"open-equivalent-of-fopen-w"},(0,a.yg)("inlineCode",{parentName:"h1"},"open()")," equivalent of ",(0,a.yg)("inlineCode",{parentName:"h1"},'fopen(..., "w")')),(0,a.yg)("h2",{id:"question-text"},"Question Text"),(0,a.yg)("p",null,"Use ",(0,a.yg)("inlineCode",{parentName:"p"},"strace")," on the code in ",(0,a.yg)("inlineCode",{parentName:"p"},"support/simple-file-operations/file_operations.c")," to find the flags used by ",(0,a.yg)("inlineCode",{parentName:"p"},"openat()")," when calling ",(0,a.yg)("inlineCode",{parentName:"p"},'fopen(file_name, "w")'),".\nFirst, try to make an educated guess and only then verify your answer by running ",(0,a.yg)("inlineCode",{parentName:"p"},"strace"),"."),(0,a.yg)("h2",{id:"question-answers"},"Question Answers"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("inlineCode",{parentName:"li"},"O_WRONLY | O_CREAT | O_TRUNC"))),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},(0,a.yg)("inlineCode",{parentName:"p"},"O_WRONLY | O_CREAT"))),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},(0,a.yg)("inlineCode",{parentName:"p"},"O_WRONLY"))),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},(0,a.yg)("inlineCode",{parentName:"p"},"O_WRONLY | O_TRUNC")))),(0,a.yg)("h2",{id:"feedback"},"Feedback"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-console"},'student@os:~/.../lab/support/simple-file-operations$ strace ./file_operations\n[...]\nopenat(AT_FDCWD, "file.txt", O_WRONLY|O_CREAT|O_TRUNC, 0666) = 3\n[...]\n')))}f.isMDXComponent=!0},5680:(e,n,t)=>{t.d(n,{xA:()=>s,yg:()=>m});var r=t(6540);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var p=r.createContext({}),u=function(e){var n=r.useContext(p),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},s=function(e){var n=u(e.components);return r.createElement(p.Provider,{value:n},e.children)},c="mdxType",f={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},y=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,o=e.originalType,p=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),c=u(t),y=a,m=c["".concat(p,".").concat(y)]||c[y]||f[y]||o;return t?r.createElement(m,i(i({ref:n},s),{},{components:t})):r.createElement(m,i({ref:n},s))}));function m(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var o=t.length,i=new Array(o);i[0]=y;var l={};for(var p in n)hasOwnProperty.call(n,p)&&(l[p]=n[p]);l.originalType=e,l[c]="string"==typeof e?e:a,i[1]=l;for(var u=2;u<o;u++)i[u]=t[u];return r.createElement.apply(null,i)}return r.createElement.apply(null,t)}y.displayName="MDXCreateElement"}}]);