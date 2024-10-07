"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[3884],{5680:(e,t,n)=>{n.d(t,{xA:()=>l,yg:()=>g});var r=n(6540);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},s=Object.keys(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=r.createContext({}),p=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},l=function(e){var t=p(e.components);return r.createElement(c.Provider,{value:t},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},y=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,s=e.originalType,c=e.parentName,l=i(e,["components","mdxType","originalType","parentName"]),u=p(n),y=a,g=u["".concat(c,".").concat(y)]||u[y]||d[y]||s;return n?r.createElement(g,o(o({ref:t},l),{},{components:n})):r.createElement(g,o({ref:t},l))}));function g(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var s=n.length,o=new Array(s);o[0]=y;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i[u]="string"==typeof e?e:a,o[1]=i;for(var p=2;p<s;p++)o[p]=n[p];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}y.displayName="MDXCreateElement"},7688:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>o,default:()=>d,frontMatter:()=>s,metadata:()=>i,toc:()=>p});var r=n(8168),a=(n(6540),n(5680));const s={},o="Access Counter",i={unversionedId:"Data/Lab 3 - Memory/Working with Memory/tasks/access-counter/README",id:"Data/Lab 3 - Memory/Working with Memory/tasks/access-counter/README",title:"Access Counter",description:"Navigate to the drills/tasks/access-counter/support directory.",source:"@site/docs/Data/Lab 3 - Memory/Working with Memory/tasks/access-counter/README.md",sourceDirName:"Data/Lab 3 - Memory/Working with Memory/tasks/access-counter",slug:"/Data/Lab 3 - Memory/Working with Memory/tasks/access-counter/",permalink:"/operating-systems/77/Data/Lab 3 - Memory/Working with Memory/tasks/access-counter/",draft:!1,tags:[],version:"current",frontMatter:{}},c={},p=[],l={toc:p},u="wrapper";function d(e){let{components:t,...n}=e;return(0,a.yg)(u,(0,r.A)({},l,n,{components:t,mdxType:"MDXLayout"}),(0,a.yg)("h1",{id:"access-counter"},"Access Counter"),(0,a.yg)("p",null,"Navigate to the ",(0,a.yg)("inlineCode",{parentName:"p"},"drills/tasks/access-counter/support")," directory."),(0,a.yg)("p",null,"Your goal is to update the ",(0,a.yg)("inlineCode",{parentName:"p"},"src/access_counter.c")," source code file to capture memory access exceptions (i.e. the ",(0,a.yg)("inlineCode",{parentName:"p"},"SIGSEGV")," signal) and to update page permissions in order for the access to eventually succeed.\nUse ",(0,a.yg)("inlineCode",{parentName:"p"},"mprotect")," to update the protection of the pages in stages: read, write and then exec.\nEach time an update is made, the ",(0,a.yg)("inlineCode",{parentName:"p"},"counter")," variable is increased;\nthis is used for testing."),(0,a.yg)("p",null,"The signal handler is already in place as the ",(0,a.yg)("inlineCode",{parentName:"p"},"access_handler()")," function.\nIt is called any time a ",(0,a.yg)("inlineCode",{parentName:"p"},"SIGSEGV")," signal is being sent out to the current process.\nYou will update the handler by following the ",(0,a.yg)("inlineCode",{parentName:"p"},"TODO")," comments and instructions here."),(0,a.yg)("p",null,"The ",(0,a.yg)("inlineCode",{parentName:"p"},"pages")," array stores information about accessed pages.\nAssume the ",(0,a.yg)("inlineCode",{parentName:"p"},"MAX_PAGES")," size of the array is enough to store information.\nWhen an existing page is accessed and causes a memory exception, the permission is update, in the stages mentioned above: read, write, and then exec.\nWhen a new page is accessed, a new entry is filled in the ",(0,a.yg)("inlineCode",{parentName:"p"},"pages")," array, initialized with read protection.\nUse ",(0,a.yg)("inlineCode",{parentName:"p"},"mmap()")," to reserve virtual pages.\nUse anonymous mapping (i.e. the ",(0,a.yg)("inlineCode",{parentName:"p"},"MAP_ANONYMOUS"),") flag.\nUse any permissions required."),(0,a.yg)("p",null,"To test it, enter the ",(0,a.yg)("inlineCode",{parentName:"p"},"tests/")," directory and run:"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-console"},"make check\n")),(0,a.yg)("p",null,"In case of a correct solution, you will get an output such as:"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-text"},"./run_all_tests.sh\ntest_acess_read                  ........................ passed ...   9\ntest_acess_write                 ........................ passed ...   9\ntest_acess_exec                  ........................ passed ...  10\ntest_acess_read_write            ........................ passed ...  12\ntest_acess_read_exec             ........................ passed ...  12\ntest_acess_write_exec            ........................ passed ...  12\ntest_acess_exec_read             ........................ passed ...  12\ntest_acess_exec_write            ........................ passed ...  12\ntest_acess_write_read            ........................ passed ...  12\n\nTotal:                                                           100/100\n")),(0,a.yg)("p",null,"If you're having difficulties solving this exercise, go through ",(0,a.yg)("a",{parentName:"p",href:"../../../reading/working-with-memory.md"},"this")," reading material."))}d.isMDXComponent=!0}}]);