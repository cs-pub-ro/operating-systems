"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[9724],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>f});var r=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var p=r.createContext({}),l=function(e){var t=r.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},u=function(e){var t=l(e.components);return r.createElement(p.Provider,{value:t},e.children)},d="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,a=e.originalType,p=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),d=l(n),m=i,f=d["".concat(p,".").concat(m)]||d[m]||c[m]||a;return n?r.createElement(f,o(o({ref:t},u),{},{components:n})):r.createElement(f,o({ref:t},u))}));function f(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var a=n.length,o=new Array(a);o[0]=m;var s={};for(var p in t)hasOwnProperty.call(t,p)&&(s[p]=t[p]);s.originalType=e,s[d]="string"==typeof e?e:i,o[1]=s;for(var l=2;l<a;l++)o[l]=n[l];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},1094:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>o,default:()=>c,frontMatter:()=>a,metadata:()=>s,toc:()=>l});var r=n(7462),i=(n(7294),n(3905));const a={},o="Pipe Ends",s={unversionedId:"Lab/IO/quiz/pipe-ends",id:"Lab/IO/quiz/pipe-ends",title:"Pipe Ends",description:"Question Text",source:"@site/docs/Lab/IO/quiz/pipe-ends.md",sourceDirName:"Lab/IO/quiz",slug:"/Lab/IO/quiz/pipe-ends",permalink:"/operating-systems/3/Lab/IO/quiz/pipe-ends",draft:!1,tags:[],version:"current",frontMatter:{}},p={},l=[{value:"Question Text",id:"question-text",level:2},{value:"Question Answers",id:"question-answers",level:2},{value:"Feedback",id:"feedback",level:2}],u={toc:l},d="wrapper";function c(e){let{components:t,...n}=e;return(0,i.kt)(d,(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"pipe-ends"},"Pipe Ends"),(0,i.kt)("h2",{id:"question-text"},"Question Text"),(0,i.kt)("p",null,"Which end of a pipe created by ",(0,i.kt)("inlineCode",{parentName:"p"},"pipe()")," is for reading and which one is for writing?"),(0,i.kt)("h2",{id:"question-answers"},"Question Answers"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"pipefds[0]")," is for reading;\n",(0,i.kt)("inlineCode",{parentName:"li"},"pipefds[1]")," is for writing")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("inlineCode",{parentName:"p"},"pipefds[0]")," is for writing;\n",(0,i.kt)("inlineCode",{parentName:"p"},"pipefds[1]")," is for reading")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"both heads are for reading and writing;"))),(0,i.kt)("h2",{id:"feedback"},"Feedback"),(0,i.kt)("p",null,"Running the binary first tells us which file descriptor is which:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-console"},"student@os:~/.../lab/support/pipes$ ./anonymous_pipes\npipedes[0] = 3; pipedes[1] = 4\n * pipe created\n -- Press ENTER to continue ...\n")),(0,i.kt)("p",null,"Then ",(0,i.kt)("inlineCode",{parentName:"p"},"lsof")," gives us the complete answer:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-console"},"student@os:~/.../lab/support/pipes$ lsof -w -p $(pidof anonymous_pipes)\nanonymous 22474  student  cwd    DIR    8,1      504  296964 /media/student/2TB/Chestii/Poli/Asistent/SO/operating-systems-oer/content/chapters/io/lab/support/pipes\nanonymous 22474  student  rtd    DIR  259,6     4096       2 /\nanonymous 22474  student  txt    REG    8,1    26712  296968 /media/student/2TB/Chestii/Poli/Asistent/SO/operating-systems-oer/content/chapters/io/lab/support/pipes/anonymous_pipes\nanonymous 22474  student  mem    REG  259,6  2029592 1857435 /usr/lib/x86_64-linux-gnu/libc-2.31.so\nanonymous 22474  student  mem    REG  259,6   191504 1835092 /usr/lib/x86_64-linux-gnu/ld-2.31.so\nanonymous 22474  student    0u   CHR  136,0      0t0       3 /dev/pts/0\nanonymous 22474  student    1u   CHR  136,0      0t0       3 /dev/pts/0\nanonymous 22474  student    2u   CHR  136,0      0t0       3 /dev/pts/0\nanonymous 22474  student    3r  FIFO   0,13      0t0  252007 pipe\nanonymous 22474  student    4w  FIFO   0,13      0t0  252007 pipe\n")),(0,i.kt)("p",null,"The last 2 lines are the 2 ends of the pipe:\n3 and 4.\nNote each of these numbers is followed by a letter.\nAs you might have guessed:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"r"),' means "read"'),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"w"),' means "write"'),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"u"),' means both "read" and "write"')),(0,i.kt)("p",null,"Also, the ",(0,i.kt)("a",{parentName:"p",href:"https://man7.org/linux/man-pages/man2/pipe.2.html"},"man page")," is quite clear on this issue:"),(0,i.kt)("blockquote",null,(0,i.kt)("p",{parentName:"blockquote"},(0,i.kt)("inlineCode",{parentName:"p"},"pipefd[0]")," refers to the read end of the pipe.  ",(0,i.kt)("inlineCode",{parentName:"p"},"pipefd[1]")," refers\nto the write end of the pipe.")))}c.isMDXComponent=!0}}]);