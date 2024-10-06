"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[651],{5680:(e,n,t)=>{t.d(n,{xA:()=>m,yg:()=>d});var r=t(6540);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function o(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function s(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var p=r.createContext({}),l=function(e){var n=r.useContext(p),t=n;return e&&(t="function"==typeof e?e(n):o(o({},n),e)),t},m=function(e){var n=l(e.components);return r.createElement(p.Provider,{value:n},e.children)},c="mdxType",u={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},y=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,i=e.originalType,p=e.parentName,m=s(e,["components","mdxType","originalType","parentName"]),c=l(t),y=a,d=c["".concat(p,".").concat(y)]||c[y]||u[y]||i;return t?r.createElement(d,o(o({ref:n},m),{},{components:t})):r.createElement(d,o({ref:n},m))}));function d(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var i=t.length,o=new Array(i);o[0]=y;var s={};for(var p in n)hasOwnProperty.call(n,p)&&(s[p]=n[p]);s.originalType=e,s[c]="string"==typeof e?e:a,o[1]=s;for(var l=2;l<i;l++)o[l]=t[l];return r.createElement.apply(null,o)}return r.createElement.apply(null,t)}y.displayName="MDXCreateElement"},5607:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>p,contentTitle:()=>o,default:()=>u,frontMatter:()=>i,metadata:()=>s,toc:()=>l});var r=t(8168),a=(t(6540),t(5680));const i={},o="`mmap()` vs `read()` and `write()` Benchmark",s={unversionedId:"Lab/IO/quiz/mmap-read-write-benchmark",id:"Lab/IO/quiz/mmap-read-write-benchmark",title:"`mmap()` vs `read()` and `write()` Benchmark",description:"Question Text",source:"@site/docs/Lab/IO/quiz/mmap-read-write-benchmark.md",sourceDirName:"Lab/IO/quiz",slug:"/Lab/IO/quiz/mmap-read-write-benchmark",permalink:"/operating-systems/86/Lab/IO/quiz/mmap-read-write-benchmark",draft:!1,tags:[],version:"current",frontMatter:{}},p={},l=[{value:"Question Text",id:"question-text",level:2},{value:"Question Answers",id:"question-answers",level:2},{value:"Feedback",id:"feedback",level:2}],m={toc:l},c="wrapper";function u(e){let{components:n,...t}=e;return(0,a.yg)(c,(0,r.A)({},m,t,{components:n,mdxType:"MDXLayout"}),(0,a.yg)("h1",{id:"mmap-vs-read-and-write-benchmark"},(0,a.yg)("inlineCode",{parentName:"h1"},"mmap()")," vs ",(0,a.yg)("inlineCode",{parentName:"h1"},"read()")," and ",(0,a.yg)("inlineCode",{parentName:"h1"},"write()")," Benchmark"),(0,a.yg)("h2",{id:"question-text"},"Question Text"),(0,a.yg)("p",null,"According to the times shown by ",(0,a.yg)("inlineCode",{parentName:"p"},"benchmark_cp.sh"),", which of the two implementations is faster?"),(0,a.yg)("h2",{id:"question-answers"},"Question Answers"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},"the one using ",(0,a.yg)("inlineCode",{parentName:"p"},"mmap()"))),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},"the one using ",(0,a.yg)("inlineCode",{parentName:"p"},"read()")," and ",(0,a.yg)("inlineCode",{parentName:"p"},"write()")))),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},"they are roughly equivalent")),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},(0,a.yg)("inlineCode",{parentName:"p"},"cp")," is faster if it uses ",(0,a.yg)("inlineCode",{parentName:"p"},"copy_file_range()")))),(0,a.yg)("h2",{id:"feedback"},"Feedback"),(0,a.yg)("p",null,"In our case, running the script a few times results in the following running times:"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-console"},"student@os:/.../support/file-mappings$ ./benchmark_cp.sh\nmake: Nothing to be done for 'all'.\nBenchmarking mmap_cp on a 1GB file...\n\nreal    0m30,597s\nuser    0m0,569s\nsys     0m2,286s\nBenchmarking cp on a 1 GB file...\n\nreal    0m36,012s\nuser    0m0,039s\nsys     0m2,469s\n\n\nstudent@os:/.../support/file-mappings$ ./benchmark_cp.sh\nmake: Nothing to be done for 'all'.\nBenchmarking mmap_cp on a 1 GB file...\n\nreal    0m27,803s\nuser    0m0,590s\nsys     0m2,114s\nBenchmarking cp on a 1 GB file...\n\nreal    0m35,607s\nuser    0m0,033s\nsys     0m2,564s\n")),(0,a.yg)("p",null,"So it seems that using ",(0,a.yg)("inlineCode",{parentName:"p"},"mmap()")," rather than ",(0,a.yg)("inlineCode",{parentName:"p"},"read()")," and ",(0,a.yg)("inlineCode",{parentName:"p"},"write()")," yields about a 15% increase in performance.\nHowever, you might get different results on your system.\nThis depends on your storage device (SSD vs HDD) and its specific speed (like its RPM for an HDD).\nSo the more conservative answer is to say that this depends on external aspects and that, in general, the 2 implementations are more or less equivalent."),(0,a.yg)("p",null,"If you want to know why there isn't much of a difference between the 2 implementations, check out ",(0,a.yg)("a",{parentName:"p",href:"https://stackoverflow.com/a/27987994"},"this explanation"),"."),(0,a.yg)("p",null,"However, some newer Linux systems use an updated ",(0,a.yg)("inlineCode",{parentName:"p"},"cp")," that doesn't use ",(0,a.yg)("inlineCode",{parentName:"p"},"read")," and ",(0,a.yg)("inlineCode",{parentName:"p"},"write")," anymore, but instead uses zero-copy, by means of the ",(0,a.yg)("inlineCode",{parentName:"p"},"copy_file_range()")," syscall.\nThis implementation is likely going to be significantly faster than the one using ",(0,a.yg)("inlineCode",{parentName:"p"},"mmap"),", as shown in the snippet below:"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-console"},"student@os:/.../support/file-mappings$ ./benchmark_cp.sh\nmake: Nothing to be done for 'all'.\nBenchmarking mmap_cp on a 1 GB file...\n\nreal    0m1,443s\nuser    0m0,429s\nsys     0m0,971s\nBenchmarking cp on a 1 GB file...\n\nreal    0m0,821s\nuser    0m0,001s\nsys     0m0,602s\n")))}u.isMDXComponent=!0}}]);