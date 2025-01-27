"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[9659],{5680:(e,t,a)=>{a.d(t,{xA:()=>p,yg:()=>m});var r=a(6540);function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function s(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function o(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?s(Object(a),!0).forEach((function(t){n(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):s(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function i(e,t){if(null==e)return{};var a,r,n=function(e,t){if(null==e)return{};var a,r,n={},s=Object.keys(e);for(r=0;r<s.length;r++)a=s[r],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)a=s[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var l=r.createContext({}),c=function(e){var t=r.useContext(l),a=t;return e&&(a="function"==typeof e?e(t):o(o({},t),e)),a},p=function(e){var t=c(e.components);return r.createElement(l.Provider,{value:t},e.children)},f="mdxType",g={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},y=r.forwardRef((function(e,t){var a=e.components,n=e.mdxType,s=e.originalType,l=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),f=c(a),y=n,m=f["".concat(l,".").concat(y)]||f[y]||g[y]||s;return a?r.createElement(m,o(o({ref:t},p),{},{components:a})):r.createElement(m,o({ref:t},p))}));function m(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var s=a.length,o=new Array(s);o[0]=y;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i[f]="string"==typeof e?e:n,o[1]=i;for(var c=2;c<s;c++)o[c]=a[c];return r.createElement.apply(null,o)}return r.createElement.apply(null,a)}y.displayName="MDXCreateElement"},9526:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>g,frontMatter:()=>s,metadata:()=>i,toc:()=>c});var r=a(8168),n=(a(6540),a(5680));const s={},o="Software Stack",i={unversionedId:"Software Stack/software-stack-overview",id:"Software Stack/software-stack-overview",title:"Software Stack",description:"Software comprises of code and data that is loaded in memory and used by the CPU.",source:"@site/docs/Software Stack/software-stack-overview.md",sourceDirName:"Software Stack",slug:"/Software Stack/software-stack-overview",permalink:"/operating-systems/158/Software Stack/software-stack-overview",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"Software-Stack",permalink:"/operating-systems/158/Software Stack/Software-Stack"},next:{title:"Questions",permalink:"/operating-systems/158/Software Stack/Questions/"}},l={},c=[{value:"Contents",id:"contents",level:2}],p={toc:c},f="wrapper";function g(e){let{components:t,...s}=e;return(0,n.yg)(f,(0,r.A)({},p,s,{components:t,mdxType:"MDXLayout"}),(0,n.yg)("h1",{id:"software-stack"},"Software Stack"),(0,n.yg)("p",null,"Software comprises of code and data that is loaded in memory and used by the CPU.\nCode means instructions that are to be fetched by the CPU, decoded and executed.\nThis is called ",(0,n.yg)("strong",{parentName:"p"},"machine code"),", i.e. binary instructions that are understood by the CPU."),(0,n.yg)("p",null,(0,n.yg)("img",{alt:"Hardware and Software",src:a(3982).A})),(0,n.yg)("p",null,"So, when compared to hardware, ",(0,n.yg)("strong",{parentName:"p"},"software is highly flexible"),".\nWe can tie together specific instructions to handle a given task and run them on hardware (CPU, memory, I/O).\nDifferent pieces of these instructions solve different tasks and run on the same hardware.\nMoreover, these pieces of instructions can be duplicated and run on different pieces of hardware, thus providing ",(0,n.yg)("strong",{parentName:"p"},"software reusability"),".\nAll we are left with is creating those pieces of instructions, also called programs."),(0,n.yg)("p",null,"In summary, software has intrinsic characteristics:"),(0,n.yg)("ul",null,(0,n.yg)("li",{parentName:"ul"},(0,n.yg)("strong",{parentName:"li"},"flexibility"),": We can (easily) create new pieces of software.\nLittle is required, we don't need raw materials as in the case of hardware or housing or transportation."),(0,n.yg)("li",{parentName:"ul"},(0,n.yg)("strong",{parentName:"li"},"reusability"),": Software can be easily copied to new systems and provide the same benefits there.")),(0,n.yg)("p",null,"Other characteristics are important to have, as they make life easier for both users and developers of software:"),(0,n.yg)("ul",null,(0,n.yg)("li",{parentName:"ul"},(0,n.yg)("strong",{parentName:"li"},"portability"),": This is the ability to build and run the same program on different computing platforms.\nThis allows a developer to write the application code once and then run it everywhere."),(0,n.yg)("li",{parentName:"ul"},(0,n.yg)("strong",{parentName:"li"},"fast development"),": We want developers to be able to write code faster, using higher-level programming languages.")),(0,n.yg)("p",null,"The last two characteristics rely on two items:"),(0,n.yg)("ul",null,(0,n.yg)("li",{parentName:"ul"},(0,n.yg)("p",{parentName:"li"},(0,n.yg)("strong",{parentName:"p"},"higher-level programming languages"),": As discussed above, a compiler will take a higher-level program and transform it into binary code for different computing platforms, thus providing portability.\nAlso, it's easier to read (comprehend) and write (develop) source code in a higher-level programming language, thus providing fast development.")),(0,n.yg)("li",{parentName:"ul"},(0,n.yg)("p",{parentName:"li"},(0,n.yg)("strong",{parentName:"p"},"software stacks"),": A software stack is the layering of software such that each lower layer provides a set of features that the higher layer can directly use.\nThis means that there is no need for the higher layer to reimplement those features;\nthis provides fast development: focus on only the newer / required parts of software."),(0,n.yg)("p",{parentName:"li"},'Also, each lower layer provides a generic interface to the higher layer.\nThese generic interfaces "hides" possible differences in the even lower layers.\nThis way, a software stack ensures portability across different other parts of software (and hardware as well).\nFor example, the standard C library, that we will present shortly, ensures portability across different operating systems.'))),(0,n.yg)("p",null,(0,n.yg)("img",{alt:"Software Stack",src:a(5180).A})),(0,n.yg)("p",null,(0,n.yg)("a",{parentName:"p",href:"questions/software.md"},"Quiz")),(0,n.yg)("h2",{id:"contents"},"Contents"),(0,n.yg)("ul",null,(0,n.yg)("li",{parentName:"ul"},(0,n.yg)("a",{parentName:"li",href:"/operating-systems/158/Software%20Stack/lab1#modern-software-stacks"},"Modern Software Stacks")),(0,n.yg)("li",{parentName:"ul"},(0,n.yg)("a",{parentName:"li",href:"/operating-systems/158/Software%20Stack/lab1#analyzing-the-software-stack"},"Basic System Calls")),(0,n.yg)("li",{parentName:"ul"},(0,n.yg)("a",{parentName:"li",href:"/operating-systems/158/Software%20Stack/lab1#system-call-wrappers"},"System Call Wrapper")),(0,n.yg)("li",{parentName:"ul"},(0,n.yg)("a",{parentName:"li",href:"/operating-systems/158/Software%20Stack/lab2#common-functions"},"Common Functions")),(0,n.yg)("li",{parentName:"ul"},(0,n.yg)("a",{parentName:"li",href:"/operating-systems/158/Software%20Stack/lab2#libraries-and-libc"},"Libraries and libc")),(0,n.yg)("li",{parentName:"ul"},(0,n.yg)("a",{parentName:"li",href:"/operating-systems/158/Software%20Stack/lab1#library-calls-vs-system-calls"},"Library calls vs system calls")),(0,n.yg)("li",{parentName:"ul"},(0,n.yg)("a",{parentName:"li",href:"/operating-systems/158/Software%20Stack/lab2#high-level-languages"},"High-Level Languages")),(0,n.yg)("li",{parentName:"ul"},(0,n.yg)("a",{parentName:"li",href:"/operating-systems/158/Software%20Stack/lab2#app-investigation"},"App Investigation"))))}g.isMDXComponent=!0},3982:(e,t,a)=>{a.d(t,{A:()=>r});const r=a.p+"assets/images/hardware-software-98463c6b754c2d0e75ccc886451176e6.svg"},5180:(e,t,a)=>{a.d(t,{A:()=>r});const r=a.p+"assets/images/software-stack-ffefaf1db325c303dbc9909b608b58a5.svg"}}]);