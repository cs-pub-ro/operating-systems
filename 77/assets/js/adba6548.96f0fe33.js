"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[4176],{5680:(e,t,r)=>{r.d(t,{xA:()=>p,yg:()=>m});var n=r(6540);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var i=n.createContext({}),c=function(e){var t=n.useContext(i),r=t;return e&&(r="function"==typeof e?e(t):s(s({},t),e)),r},p=function(e){var t=c(e.components);return n.createElement(i.Provider,{value:t},e.children)},u="mdxType",y={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,i=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),u=c(r),d=a,m=u["".concat(i,".").concat(d)]||u[d]||y[d]||o;return r?n.createElement(m,s(s({ref:t},p),{},{components:r})):n.createElement(m,s({ref:t},p))}));function m(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,s=new Array(o);s[0]=d;var l={};for(var i in t)hasOwnProperty.call(t,i)&&(l[i]=t[i]);l.originalType=e,l[u]="string"==typeof e?e:a,s[1]=l;for(var c=2;c<o;c++)s[c]=r[c];return n.createElement.apply(null,s)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},6812:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>i,contentTitle:()=>s,default:()=>y,frontMatter:()=>o,metadata:()=>l,toc:()=>c});var n=r(8168),a=(r(6540),r(5680));const o={},s="ASLR",l={unversionedId:"Data/Lab 5 - Memory Security/tasks/aslr/README",id:"Data/Lab 5 - Memory Security/tasks/aslr/README",title:"ASLR",description:"Practice",source:"@site/docs/Data/Lab 5 - Memory Security/tasks/aslr/README.md",sourceDirName:"Data/Lab 5 - Memory Security/tasks/aslr",slug:"/Data/Lab 5 - Memory Security/tasks/aslr/",permalink:"/operating-systems/77/Data/Lab 5 - Memory Security/tasks/aslr/",draft:!1,tags:[],version:"current",frontMatter:{}},i={},c=[{value:"Practice",id:"practice",level:2}],p={toc:c},u="wrapper";function y(e){let{components:t,...r}=e;return(0,a.yg)(u,(0,n.A)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,a.yg)("h1",{id:"aslr"},"ASLR"),(0,a.yg)("h2",{id:"practice"},"Practice"),(0,a.yg)("p",null,"Use the ",(0,a.yg)("inlineCode",{parentName:"p"},"Makefile.aslr")," file to compile the ",(0,a.yg)("inlineCode",{parentName:"p"},"drills/tasks/aslr/support/aslr.c")," file:"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-console"},"student@os:~/.../drills/tasks/aslr/support/$ make -f Makefile.aslr\n")),(0,a.yg)("p",null,"By default, ASLR and PIC are enabled.\nObserve the results.\nNext, we disable ASLR:"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-console"},"student@os:~/.../drills/tasks/aslr/support/$ echo 0 | sudo tee /proc/sys/kernel/randomize_va_space\n")),(0,a.yg)("p",null,"Even though the code is compiled with PIC, both library and user functions have the same address between runs.\nRe-enable ASLR:"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-console"},"student@os:~/.../drills/tasks/aslr/support/$ echo 2 | sudo tee /proc/sys/kernel/randomize_va_space\n")),(0,a.yg)("p",null,"Disable PIC by uncommenting the ",(0,a.yg)("inlineCode",{parentName:"p"},"-fno-PIC")," and ",(0,a.yg)("inlineCode",{parentName:"p"},"LDFLAGS")," lines."),(0,a.yg)("p",null,"We observe that for randomization to work, we need to instruct the OS to randomize the program sections and the compiler to generate code that is position independent."),(0,a.yg)("p",null,"If you're having difficulties solving this exercise, go through ",(0,a.yg)("a",{parentName:"p",href:"../../../reading/memory-security.md"},"this")," reading material."))}y.isMDXComponent=!0}}]);