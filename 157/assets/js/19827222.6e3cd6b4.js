"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[8712],{5680:(e,n,t)=>{t.d(n,{xA:()=>u,yg:()=>d});var r=t(6540);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function o(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function s(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var l=r.createContext({}),p=function(e){var n=r.useContext(l),t=n;return e&&(t="function"==typeof e?e(n):o(o({},n),e)),t},u=function(e){var n=p(e.components);return r.createElement(l.Provider,{value:n},e.children)},c="mdxType",f={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},y=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,i=e.originalType,l=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),c=p(t),y=a,d=c["".concat(l,".").concat(y)]||c[y]||f[y]||i;return t?r.createElement(d,o(o({ref:n},u),{},{components:t})):r.createElement(d,o({ref:n},u))}));function d(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var i=t.length,o=new Array(i);o[0]=y;var s={};for(var l in n)hasOwnProperty.call(n,l)&&(s[l]=n[l]);s.originalType=e,s[c]="string"==typeof e?e:a,o[1]=s;for(var p=2;p<i;p++)o[p]=t[p];return r.createElement.apply(null,o)}return r.createElement.apply(null,t)}y.displayName="MDXCreateElement"},8171:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>o,default:()=>f,frontMatter:()=>i,metadata:()=>s,toc:()=>p});var r=t(8168),a=(t(6540),t(5680));const i={},o="`printf()` Under Strace",s={unversionedId:"IO/Questions/strace-printf",id:"IO/Questions/strace-printf",title:"`printf()` Under Strace",description:"Question Text",source:"@site/docs/IO/Questions/strace-printf.md",sourceDirName:"IO/Questions",slug:"/IO/Questions/strace-printf",permalink:"/operating-systems/157/IO/Questions/strace-printf",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"Fewer than Two Copies",permalink:"/operating-systems/157/IO/Questions/fewer-than-2-copies"},next:{title:"`mmap()` vs `read()` and `write()` Benchmark",permalink:"/operating-systems/157/IO/Questions/mmap-read-write-benchmark"}},l={},p=[{value:"Question Text",id:"question-text",level:2},{value:"Question Answers",id:"question-answers",level:2},{value:"Feedback",id:"feedback",level:2}],u={toc:p},c="wrapper";function f(e){let{components:n,...t}=e;return(0,a.yg)(c,(0,r.A)({},u,t,{components:n,mdxType:"MDXLayout"}),(0,a.yg)("h1",{id:"printf-under-strace"},(0,a.yg)("inlineCode",{parentName:"h1"},"printf()")," Under Strace"),(0,a.yg)("h2",{id:"question-text"},"Question Text"),(0,a.yg)("p",null,"How many calls to ",(0,a.yg)("inlineCode",{parentName:"p"},"write()")," does the code in ",(0,a.yg)("inlineCode",{parentName:"p"},"support/buffering/printf_buffering.c")," do?"),(0,a.yg)("h2",{id:"question-answers"},"Question Answers"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"none")),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"1")),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},"6")),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},"5"))),(0,a.yg)("h2",{id:"feedback"},"Feedback"),(0,a.yg)("p",null,"Just run the binary under ",(0,a.yg)("inlineCode",{parentName:"p"},"strace"),":"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-console"},'student@os:/.../support/buffering$ strace -e write ./printf_buffering\nwrite(1, "Dovahkiin, Dovahkiin Naal ok zin"..., 169Dovahkiin, Dovahkiin Naal ok zin los vahriin Wah dein vokul mahfaeraak ahst vaal! Ahrk fin norok paal graan Fod nust hon zindro zaan Dovahkiin, fah hin kogaan mu draal! ) = 169\n+++ exited with 0 +++\n')),(0,a.yg)("p",null,"There's ",(0,a.yg)("strong",{parentName:"p"},"one")," call to ",(0,a.yg)("inlineCode",{parentName:"p"},"write()"),"."))}f.isMDXComponent=!0}}]);