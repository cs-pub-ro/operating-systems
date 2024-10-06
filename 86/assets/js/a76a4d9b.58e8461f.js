"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[8365],{5680:(e,a,r)=>{r.d(a,{xA:()=>g,yg:()=>y});var t=r(6540);function n(e,a,r){return a in e?Object.defineProperty(e,a,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[a]=r,e}function i(e,a){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);a&&(t=t.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),r.push.apply(r,t)}return r}function l(e){for(var a=1;a<arguments.length;a++){var r=null!=arguments[a]?arguments[a]:{};a%2?i(Object(r),!0).forEach((function(a){n(e,a,r[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(r,a))}))}return e}function o(e,a){if(null==e)return{};var r,t,n=function(e,a){if(null==e)return{};var r,t,n={},i=Object.keys(e);for(t=0;t<i.length;t++)r=i[t],a.indexOf(r)>=0||(n[r]=e[r]);return n}(e,a);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(t=0;t<i.length;t++)r=i[t],a.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var s=t.createContext({}),p=function(e){var a=t.useContext(s),r=a;return e&&(r="function"==typeof e?e(a):l(l({},a),e)),r},g=function(e){var a=p(e.components);return t.createElement(s.Provider,{value:a},e.children)},c="mdxType",m={inlineCode:"code",wrapper:function(e){var a=e.children;return t.createElement(t.Fragment,{},a)}},u=t.forwardRef((function(e,a){var r=e.components,n=e.mdxType,i=e.originalType,s=e.parentName,g=o(e,["components","mdxType","originalType","parentName"]),c=p(r),u=n,y=c["".concat(s,".").concat(u)]||c[u]||m[u]||i;return r?t.createElement(y,l(l({ref:a},g),{},{components:r})):t.createElement(y,l({ref:a},g))}));function y(e,a){var r=arguments,n=a&&a.mdxType;if("string"==typeof e||n){var i=r.length,l=new Array(i);l[0]=u;var o={};for(var s in a)hasOwnProperty.call(a,s)&&(o[s]=a[s]);o.originalType=e,o[c]="string"==typeof e?e:n,l[1]=o;for(var p=2;p<i;p++)l[p]=r[p];return t.createElement.apply(null,l)}return t.createElement.apply(null,r)}u.displayName="MDXCreateElement"},3968:(e,a,r)=>{r.r(a),r.d(a,{assets:()=>s,contentTitle:()=>l,default:()=>m,frontMatter:()=>i,metadata:()=>o,toc:()=>p});var t=r(8168),n=(r(6540),r(5680));const i={},l="High-Level Languages",o={unversionedId:"Software Stack/Lab 2 - Library Perspective/High-Level Languages/Drills/Tasks/High-Level Languages/README",id:"Software Stack/Lab 2 - Library Perspective/High-Level Languages/Drills/Tasks/High-Level Languages/README",title:"High-Level Languages",description:"Enter the chapters/software-stack/high-level-languages/drills/tasks/high-level-lang/support/ folder and go through the practice items below.",source:"@site/docs/Software Stack/Lab 2 - Library Perspective/High-Level Languages/Drills/Tasks/High-Level Languages/README.md",sourceDirName:"Software Stack/Lab 2 - Library Perspective/High-Level Languages/Drills/Tasks/High-Level Languages",slug:"/Software Stack/Lab 2 - Library Perspective/High-Level Languages/Drills/Tasks/High-Level Languages/",permalink:"/operating-systems/86/Software Stack/Lab 2 - Library Perspective/High-Level Languages/Drills/Tasks/High-Level Languages/",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"Tasks",permalink:"/operating-systems/86/Software Stack/Lab 2 - Library Perspective/High-Level Languages/Drills/Tasks/"},next:{title:"Questions",permalink:"/operating-systems/86/Software Stack/Lab 2 - Library Perspective/High-Level Languages/Drills/Questions/"}},s={},p=[],g={toc:p},c="wrapper";function m(e){let{components:a,...r}=e;return(0,n.yg)(c,(0,t.A)({},g,r,{components:a,mdxType:"MDXLayout"}),(0,n.yg)("h1",{id:"high-level-languages"},"High-Level Languages"),(0,n.yg)("p",null,"Enter the ",(0,n.yg)("inlineCode",{parentName:"p"},"chapters/software-stack/high-level-languages/drills/tasks/high-level-lang/support/")," folder and go through the practice items below."),(0,n.yg)("ol",null,(0,n.yg)("li",{parentName:"ol"},(0,n.yg)("p",{parentName:"li"},"Use ",(0,n.yg)("inlineCode",{parentName:"p"},"make")," to create the ",(0,n.yg)("inlineCode",{parentName:"p"},"hello")," executable from the ",(0,n.yg)("inlineCode",{parentName:"p"},"hello.go"),' file (a Go "Hello, World!"-printing program).\nUse ',(0,n.yg)("inlineCode",{parentName:"p"},"ltrace")," and ",(0,n.yg)("inlineCode",{parentName:"p"},"strace")," to compute the number of library calls and system calls.\nUse ",(0,n.yg)("inlineCode",{parentName:"p"},"perf")," to measure the running time."),(0,n.yg)("p",{parentName:"li"},'Compare the values with those from the "Hello, World!"-printing programs in C and Python.')),(0,n.yg)("li",{parentName:"ol"},(0,n.yg)("p",{parentName:"li"},'Create a "Hello, World!"-printing program in a programming language of your choice (other than C, Python and Go).\nFind the values above (library calls, system calls and running time).'),(0,n.yg)("p",{parentName:"li"},(0,n.yg)("a",{parentName:"p",href:"../drills/questions/high-level-lang.md"},"Quiz"))),(0,n.yg)("li",{parentName:"ol"},(0,n.yg)("p",{parentName:"li"},"Create programs in C, Python and Go that compute the N-th Fibonacci number.\n",(0,n.yg)("inlineCode",{parentName:"p"},"N")," is passed as a command-line argument."),(0,n.yg)("p",{parentName:"li"},"Use ",(0,n.yg)("inlineCode",{parentName:"p"},"ltrace")," and ",(0,n.yg)("inlineCode",{parentName:"p"},"strace")," to compute the number of library calls and system calls.\nUse ",(0,n.yg)("inlineCode",{parentName:"p"},"perf")," to measure the running time."),(0,n.yg)("p",{parentName:"li"},"Compare the values of the three programs.")),(0,n.yg)("li",{parentName:"ol"},(0,n.yg)("p",{parentName:"li"},"Create programs in C, Python and Go that copy a source file into a destination file.\nBoth files are passed as the two command-line arguments for the program.\nSample run:"),(0,n.yg)("pre",{parentName:"li"},(0,n.yg)("code",{parentName:"pre",className:"language-console"},"student@so:~$ cp src dest\n")),(0,n.yg)("p",{parentName:"li"},"Use ",(0,n.yg)("inlineCode",{parentName:"p"},"ltrace")," and ",(0,n.yg)("inlineCode",{parentName:"p"},"strace")," to compute the number of library calls and system calls.\nUse ",(0,n.yg)("inlineCode",{parentName:"p"},"perf")," to measure the running time.\nUse source files of different sizes.\nCompare the outputs of these commands on the three programs."))),(0,n.yg)("p",null,"If you're having difficulties solving this exercise, go through ",(0,n.yg)("a",{parentName:"p",href:"/operating-systems/86/Software%20Stack/Lab%202%20-%20Library%20Perspective/High-Level%20Languages/Reading/high-level-lang"},"this")," reading material."))}m.isMDXComponent=!0}}]);