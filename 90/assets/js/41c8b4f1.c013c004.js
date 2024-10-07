"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[9614],{5680:(e,t,r)=>{r.d(t,{xA:()=>p,yg:()=>d});var a=r(6540);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function o(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},i=Object.keys(e);for(a=0;a<i.length;a++)r=i[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)r=i[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var l=a.createContext({}),c=function(e){var t=a.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):s(s({},t),e)),r},p=function(e){var t=c(e.components);return a.createElement(l.Provider,{value:t},e.children)},y="mdxType",g={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,i=e.originalType,l=e.parentName,p=o(e,["components","mdxType","originalType","parentName"]),y=c(r),m=n,d=y["".concat(l,".").concat(m)]||y[m]||g[m]||i;return r?a.createElement(d,s(s({ref:t},p),{},{components:r})):a.createElement(d,s({ref:t},p))}));function d(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var i=r.length,s=new Array(i);s[0]=m;var o={};for(var l in t)hasOwnProperty.call(t,l)&&(o[l]=t[l]);o.originalType=e,o[y]="string"==typeof e?e:n,s[1]=o;for(var c=2;c<i;c++)s[c]=r[c];return a.createElement.apply(null,s)}return a.createElement.apply(null,r)}m.displayName="MDXCreateElement"},2219:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>s,default:()=>g,frontMatter:()=>i,metadata:()=>o,toc:()=>c});var a=r(8168),n=(r(6540),r(5680));const i={},s="Software Stack",o={unversionedId:"Software Stack/Lab 1 - Operating System Perspective/Overview/overview",id:"Software Stack/Lab 1 - Operating System Perspective/Overview/overview",title:"Software Stack",description:"Software comprises of code and data that is loaded in memory and used by the CPU.",source:"@site/docs/Software Stack/Lab 1 - Operating System Perspective/Overview/overview.md",sourceDirName:"Software Stack/Lab 1 - Operating System Perspective/Overview",slug:"/Software Stack/Lab 1 - Operating System Perspective/Overview/",permalink:"/operating-systems/90/Software Stack/Lab 1 - Operating System Perspective/Overview/",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"Overview",permalink:"/operating-systems/90/Software Stack/Lab 1 - Operating System Perspective/Overview/"},next:{title:"Drills",permalink:"/operating-systems/90/Software Stack/Lab 1 - Operating System Perspective/Overview/Drills/"}},l={},c=[{value:"Contents",id:"contents",level:2}],p={toc:c},y="wrapper";function g(e){let{components:t,...i}=e;return(0,n.yg)(y,(0,a.A)({},p,i,{components:t,mdxType:"MDXLayout"}),(0,n.yg)("h1",{id:"software-stack"},"Software Stack"),(0,n.yg)("p",null,"Software comprises of code and data that is loaded in memory and used by the CPU.\nCode means instructions that are to be fetched by the CPU, decoded and executed.\nThis is called ",(0,n.yg)("strong",{parentName:"p"},"machine code"),", i.e. binary instructions that are understood by the CPU."),(0,n.yg)("p",null,(0,n.yg)("img",{alt:"Hardware and Software",src:r(922).A})),(0,n.yg)("p",null,"So, when compared to hardware, ",(0,n.yg)("strong",{parentName:"p"},"software is highly flexible"),".\nWe can tie together specific instructions to handle a given task and run them on hardware (CPU, memory, I/O).\nDifferent pieces of these instructions solve different tasks and run on the same hardware.\nMoreover, these pieces of instructions can be duplicated and run on different pieces of hardware, thus providing ",(0,n.yg)("strong",{parentName:"p"},"software reusability"),".\nAll we are left with is creating those pieces of instructions, also called programs."),(0,n.yg)("p",null,"In summary, software has intrinsic characteristics:"),(0,n.yg)("ul",null,(0,n.yg)("li",{parentName:"ul"},(0,n.yg)("strong",{parentName:"li"},"flexibility"),": We can (easily) create new pieces of software.\nLittle is required, we don't need raw materials as in the case of hardware or housing or transportation."),(0,n.yg)("li",{parentName:"ul"},(0,n.yg)("strong",{parentName:"li"},"reusability"),": Software can be easily copied to new systems and provide the same benefits there.")),(0,n.yg)("p",null,"Other characteristics are important to have, as they make life easier for both users and developers of software:"),(0,n.yg)("ul",null,(0,n.yg)("li",{parentName:"ul"},(0,n.yg)("strong",{parentName:"li"},"portability"),": This is the ability to build and run the same program on different computing platforms.\nThis allows a developer to write the application code once and then run it everywhere."),(0,n.yg)("li",{parentName:"ul"},(0,n.yg)("strong",{parentName:"li"},"fast development"),": We want developers to be able to write code faster, using higher-level programming languages.")),(0,n.yg)("p",null,"The last two characteristics rely on two items:"),(0,n.yg)("ul",null,(0,n.yg)("li",{parentName:"ul"},(0,n.yg)("p",{parentName:"li"},(0,n.yg)("strong",{parentName:"p"},"higher-level programming languages"),": As discussed above, a compiler will take a higher-level program and transform it into binary code for different computing platforms, thus providing portability.\nAlso, it's easier to read (comprehend) and write (develop) source code in a higher-level programming language, thus providing fast development.")),(0,n.yg)("li",{parentName:"ul"},(0,n.yg)("p",{parentName:"li"},(0,n.yg)("strong",{parentName:"p"},"software stacks"),": A software stack is the layering of software such that each lower layer provides a set of features that the higher layer can directly use.\nThis means that there is no need for the higher layer to reimplement those features;\nthis provides fast development: focus on only the newer / required parts of software."),(0,n.yg)("p",{parentName:"li"},'Also, each lower layer provides a generic interface to the higher layer.\nThese generic interfaces "hides" possible differences in the even lower layers.\nThis way, a software stack ensures portability across different other parts of software (and hardware as well).\nFor example, the standard C library, that we will present shortly, ensures portability across different operating systems.'))),(0,n.yg)("p",null,(0,n.yg)("img",{alt:"Software Stack",src:r(9216).A})),(0,n.yg)("p",null,(0,n.yg)("a",{parentName:"p",href:"../drills/software.md"},"Quiz")),(0,n.yg)("h2",{id:"contents"},"Contents"),(0,n.yg)("ul",null,(0,n.yg)("li",{parentName:"ul"},(0,n.yg)("a",{parentName:"li",href:"../Modern%20Software%20Stacks/modern-sw-stack"},"Modern Software Stacks")),(0,n.yg)("li",{parentName:"ul"},(0,n.yg)("a",{parentName:"li",href:"../System%20Calls/Reading/basic-syscall"},"Basic System Calls")),(0,n.yg)("li",{parentName:"ul"},(0,n.yg)("a",{parentName:"li",href:"../System%20Calls/Reading/syscall-wrapper"},"System Call Wrapper")),(0,n.yg)("li",{parentName:"ul"},(0,n.yg)("a",{parentName:"li",href:"../../Lab%202%20-%20Library%20Perspective/Libc/Reading/common-functions"},"Common Functions")),(0,n.yg)("li",{parentName:"ul"},(0,n.yg)("a",{parentName:"li",href:"../../system-calls/reading/libc.md"},"Libraries and libc")),(0,n.yg)("li",{parentName:"ul"},(0,n.yg)("a",{parentName:"li",href:"../../libraries/reading/static-dynamic.md"},"Statically-linked and Dynamically-linked Libraries")),(0,n.yg)("li",{parentName:"ul"},(0,n.yg)("a",{parentName:"li",href:"../System%20Calls/Reading/libcall-syscall"},"Library calls vs system calls")),(0,n.yg)("li",{parentName:"ul"},(0,n.yg)("a",{parentName:"li",href:"../../Lab%202%20-%20Library%20Perspective/High-Level%20Languages/Reading/high-level-lang"},"High-Level Languages")),(0,n.yg)("li",{parentName:"ul"},(0,n.yg)("a",{parentName:"li",href:"../../Lab%202%20-%20Library%20Perspective/Applications/Reading/app-investigate"},"App Investigation"))))}g.isMDXComponent=!0},922:(e,t,r)=>{r.d(t,{A:()=>a});const a=r.p+"assets/images/hardware-software-98463c6b754c2d0e75ccc886451176e6.svg"},9216:(e,t,r)=>{r.d(t,{A:()=>a});const a=r.p+"assets/images/software-stack-ffefaf1db325c303dbc9909b608b58a5.svg"}}]);