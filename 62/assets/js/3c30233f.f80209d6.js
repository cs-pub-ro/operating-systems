"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[6434],{5680:(e,t,r)=>{r.d(t,{xA:()=>l,yg:()=>d});var a=r(6540);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},o=Object.keys(e);for(a=0;a<o.length;a++)r=o[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)r=o[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var p=a.createContext({}),c=function(e){var t=a.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):s(s({},t),e)),r},l=function(e){var t=c(e.components);return a.createElement(p.Provider,{value:t},e.children)},h="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,o=e.originalType,p=e.parentName,l=i(e,["components","mdxType","originalType","parentName"]),h=c(r),u=n,d=h["".concat(p,".").concat(u)]||h[u]||m[u]||o;return r?a.createElement(d,s(s({ref:t},l),{},{components:r})):a.createElement(d,s({ref:t},l))}));function d(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=r.length,s=new Array(o);s[0]=u;var i={};for(var p in t)hasOwnProperty.call(t,p)&&(i[p]=t[p]);i.originalType=e,i[h]="string"==typeof e?e:n,s[1]=i;for(var c=2;c<o;c++)s[c]=r[c];return a.createElement.apply(null,s)}return a.createElement.apply(null,r)}u.displayName="MDXCreateElement"},3993:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>p,contentTitle:()=>s,default:()=>m,frontMatter:()=>o,metadata:()=>i,toc:()=>c});var a=r(8168),n=(r(6540),r(5680));const o={},s="Hardware Perspective",i={unversionedId:"Lab/Compute/hardware-perspective",id:"Lab/Compute/hardware-perspective",title:"Hardware Perspective",description:"The main criterion we use to rank CPUs is their computation power, i.e. their ability to crunch numbers and do math.",source:"@site/docs/Lab/Compute/hardware-perspective.md",sourceDirName:"Lab/Compute",slug:"/Lab/Compute/hardware-perspective",permalink:"/operating-systems/62/Lab/Compute/hardware-perspective",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"Compute",permalink:"/operating-systems/62/Lab/Compute/overview"},next:{title:"Processes",permalink:"/operating-systems/62/Lab/Compute/processes"}},p={},c=[{value:"The Role of the Operating System",id:"the-role-of-the-operating-system",level:2}],l={toc:c},h="wrapper";function m(e){let{components:t,...o}=e;return(0,n.yg)(h,(0,a.A)({},l,o,{components:t,mdxType:"MDXLayout"}),(0,n.yg)("h1",{id:"hardware-perspective"},"Hardware Perspective"),(0,n.yg)("p",null,"The main criterion we use to rank CPUs is their ",(0,n.yg)("em",{parentName:"p"},"computation power"),", i.e. their ability to crunch numbers and do math.\nNumerous benchmarks exist out there, and they are publicly displayed on sites such as ",(0,n.yg)("a",{parentName:"p",href:"https://www.cpubenchmark.net/"},"CPUBenchmark"),"."),(0,n.yg)("p",null,"For example, a benchmark can measure the performance of the computer's CPU in a variety of scenarios:"),(0,n.yg)("ul",null,(0,n.yg)("li",{parentName:"ul"},"its ability to perform integer operations"),(0,n.yg)("li",{parentName:"ul"},"its speed in floating point arithmetic"),(0,n.yg)("li",{parentName:"ul"},"data encryption and compression"),(0,n.yg)("li",{parentName:"ul"},"sorting algorithms and others")),(0,n.yg)("p",null,"You can take a look at what exactly is measured using ",(0,n.yg)("a",{parentName:"p",href:"https://www.cpubenchmark.net/cpu.php?cpu=AMD+Ryzen+Threadripper+PRO+5995WX"},"this link"),".\nIt displays the scores obtained by a high-end CPU.\nApart from the tests above, other benchmarks might focus on different performance metrics, such as branch prediction or prefetching."),(0,n.yg)("p",null,"Other approaches are less artificial, measuring performance on real-world applications such as compile times and performance in the latest (and most resource-demanding) video games.\nThe latter metric revolves around how many average FPS (frames per second) a given CPU is able to crank out in a specific video game.\n",(0,n.yg)("a",{parentName:"p",href:"https://www.gamersnexus.net/guides/3577-cpu-test-methodology-unveil-for-2020-compile-gaming-more"},"This article")," goes into more detail regarding the methodology of running CPU benchmarks on real-world applications."),(0,n.yg)("p",null,"Most benchmarks, unfortunately, are not open source, especially the more popular ones, such as ",(0,n.yg)("a",{parentName:"p",href:"https://browser.geekbench.com/processor-benchmarks"},"Geekbench 5"),".\nDespite this shortcoming, benchmarks are widely used to compare the performance of various computer ",(0,n.yg)("strong",{parentName:"p"},"hardware"),", CPUs included."),(0,n.yg)("h2",{id:"the-role-of-the-operating-system"},"The Role of the Operating System"),(0,n.yg)("p",null,'As you\'ve seen so far, the CPU provides the "muscle" required for fast computation, i.e. the highly optimised hardware and multiple ALUs, FPUs\nand cores necessary to perform those computations.\nHowever, it is the ',(0,n.yg)("strong",{parentName:"p"},"operating system"),' that provides the "brains" for this computation.\nSpecifically, modern CPUs have the capacity to run multiple tasks in parallel.\nBut they do not provide a means to decide which task to run at each moment.\nThe OS comes as an ',(0,n.yg)("em",{parentName:"p"},"orchestrator")," to ",(0,n.yg)("strong",{parentName:"p"},"schedule")," the way these tasks (that we will later call threads) are allowed to run and use the CPU's resources.\nThis way, the OS tells the CPU what code to run on each CPU core so that it reaches a good balance between high throughput (running many instructions) and fair access to CPU cores."),(0,n.yg)("p",null,"It is cumbersome for a user-level application to interact directly with the CPU.\nThe developer would have to write hardware-specific code, which is not scalable and is difficult to maintain.\nIn addition, doing so would leave it up to the developer to isolate their application from the others that are present on the system.\nThis leaves applications vulnerable to countless bugs and exploits."),(0,n.yg)("p",null,"To guard apps from these pitfalls, the OS comes and mediates interactions between regular programs and the CPU by providing a set of ",(0,n.yg)("strong",{parentName:"p"},"abstractions"),".\nThese abstractions offer a safe, uniform and also isolated way to leverage the CPU's resources, i.e. its cores.\nThere are 2 main abstractions: ",(0,n.yg)("strong",{parentName:"p"},"processes")," and ",(0,n.yg)("strong",{parentName:"p"},"threads"),"."),(0,n.yg)("p",null,(0,n.yg)("img",{alt:"Interaction between applications, OS and CPU",src:r(5148).A})),(0,n.yg)("p",null,"As we can see from the image above, an application can spawn one or more processes.\nEach of these is handled and maintained by the OS.\nSimilarly, each process can spawn however many threads, which are also managed by the OS.\nThe OS decides when and on what CPU core to make each thread run.\nThis is in line with the general interaction between an application and the hardware: it is always mediated by the OS."))}m.isMDXComponent=!0},5148:(e,t,r)=>{r.d(t,{A:()=>a});const a=r.p+"assets/images/app-os-cpu-interaction-ca7fbdbb7da380e0992c95467ef267ce.svg"}}]);