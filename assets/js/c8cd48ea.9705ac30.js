"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[6513],{768:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>p,contentTitle:()=>o,default:()=>c,frontMatter:()=>s,metadata:()=>a,toc:()=>l});var r=t(8168),i=(t(6540),t(5680));const s={},o="Pipe Ends",a={unversionedId:"IO/Questions/pipe-ends",id:"IO/Questions/pipe-ends",title:"Pipe Ends",description:"Question Text",source:"@site/docs/IO/Questions/pipe-ends.md",sourceDirName:"IO/Questions",slug:"/IO/Questions/pipe-ends",permalink:"/operating-systems/IO/Questions/pipe-ends",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"Limitation of Anonymous Pipes",permalink:"/operating-systems/IO/Questions/anonymous-pipes-limitation"},next:{title:"Receiver Socked File Descriptor",permalink:"/operating-systems/IO/Questions/receiver-socket-fd"}},p={},l=[{value:"Question Text",id:"question-text",level:2},{value:"Question Answers",id:"question-answers",level:2},{value:"Feedback",id:"feedback",level:2}],u={toc:l},d="wrapper";function c(e){let{components:n,...t}=e;return(0,i.yg)(d,(0,r.A)({},u,t,{components:n,mdxType:"MDXLayout"}),(0,i.yg)("h1",{id:"pipe-ends"},"Pipe Ends"),(0,i.yg)("h2",{id:"question-text"},"Question Text"),(0,i.yg)("p",null,"Which end of a pipe created by ",(0,i.yg)("inlineCode",{parentName:"p"},"pipe()")," is for reading and which one is for writing?"),(0,i.yg)("h2",{id:"question-answers"},"Question Answers"),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("inlineCode",{parentName:"li"},"pipefds[0]")," is for reading;\n",(0,i.yg)("inlineCode",{parentName:"li"},"pipefds[1]")," is for writing")),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("p",{parentName:"li"},(0,i.yg)("inlineCode",{parentName:"p"},"pipefds[0]")," is for writing;\n",(0,i.yg)("inlineCode",{parentName:"p"},"pipefds[1]")," is for reading")),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("p",{parentName:"li"},"both heads are for reading and writing;"))),(0,i.yg)("h2",{id:"feedback"},"Feedback"),(0,i.yg)("p",null,"Running the binary first tells us which file descriptor is which:"),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-console"},"student@os:~/.../lab/support/pipes$ ./anonymous_pipes\npipedes[0] = 3; pipedes[1] = 4\n * pipe created\n -- Press ENTER to continue ...\n")),(0,i.yg)("p",null,"Then ",(0,i.yg)("inlineCode",{parentName:"p"},"lsof")," gives us the complete answer:"),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-console"},"student@os:~/.../lab/support/pipes$ lsof -w -p $(pidof anonymous_pipes)\nanonymous 22474  student  cwd    DIR    8,1      504  296964 /media/student/2TB/Chestii/Poli/Asistent/SO/operating-systems-oer/content/chapters/io/lab/support/pipes\nanonymous 22474  student  rtd    DIR  259,6     4096       2 /\nanonymous 22474  student  txt    REG    8,1    26712  296968 /media/student/2TB/Chestii/Poli/Asistent/SO/operating-systems-oer/content/chapters/io/lab/support/pipes/anonymous_pipes\nanonymous 22474  student  mem    REG  259,6  2029592 1857435 /usr/lib/x86_64-linux-gnu/libc-2.31.so\nanonymous 22474  student  mem    REG  259,6   191504 1835092 /usr/lib/x86_64-linux-gnu/ld-2.31.so\nanonymous 22474  student    0u   CHR  136,0      0t0       3 /dev/pts/0\nanonymous 22474  student    1u   CHR  136,0      0t0       3 /dev/pts/0\nanonymous 22474  student    2u   CHR  136,0      0t0       3 /dev/pts/0\nanonymous 22474  student    3r  FIFO   0,13      0t0  252007 pipe\nanonymous 22474  student    4w  FIFO   0,13      0t0  252007 pipe\n")),(0,i.yg)("p",null,"The last 2 lines are the 2 ends of the pipe:\n3 and 4.\nNote each of these numbers is followed by a letter.\nAs you might have guessed:"),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("inlineCode",{parentName:"li"},"r"),' means "read"'),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("inlineCode",{parentName:"li"},"w"),' means "write"'),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("inlineCode",{parentName:"li"},"u"),' means both "read" and "write"')),(0,i.yg)("p",null,"Also, the ",(0,i.yg)("a",{parentName:"p",href:"https://man7.org/linux/man-pages/man2/pipe.2.html"},"man page")," is quite clear on this issue:"),(0,i.yg)("blockquote",null,(0,i.yg)("p",{parentName:"blockquote"},(0,i.yg)("inlineCode",{parentName:"p"},"pipefd[0]")," refers to the read end of the pipe.  ",(0,i.yg)("inlineCode",{parentName:"p"},"pipefd[1]")," refers\nto the write end of the pipe.")))}c.isMDXComponent=!0},5680:(e,n,t)=>{t.d(n,{xA:()=>u,yg:()=>y});var r=t(6540);function i(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function s(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function o(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?s(Object(t),!0).forEach((function(n){i(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):s(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function a(e,n){if(null==e)return{};var t,r,i=function(e,n){if(null==e)return{};var t,r,i={},s=Object.keys(e);for(r=0;r<s.length;r++)t=s[r],n.indexOf(t)>=0||(i[t]=e[t]);return i}(e,n);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)t=s[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}var p=r.createContext({}),l=function(e){var n=r.useContext(p),t=n;return e&&(t="function"==typeof e?e(n):o(o({},n),e)),t},u=function(e){var n=l(e.components);return r.createElement(p.Provider,{value:n},e.children)},d="mdxType",c={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},m=r.forwardRef((function(e,n){var t=e.components,i=e.mdxType,s=e.originalType,p=e.parentName,u=a(e,["components","mdxType","originalType","parentName"]),d=l(t),m=i,y=d["".concat(p,".").concat(m)]||d[m]||c[m]||s;return t?r.createElement(y,o(o({ref:n},u),{},{components:t})):r.createElement(y,o({ref:n},u))}));function y(e,n){var t=arguments,i=n&&n.mdxType;if("string"==typeof e||i){var s=t.length,o=new Array(s);o[0]=m;var a={};for(var p in n)hasOwnProperty.call(n,p)&&(a[p]=n[p]);a.originalType=e,a[d]="string"==typeof e?e:i,o[1]=a;for(var l=2;l<s;l++)o[l]=t[l];return r.createElement.apply(null,o)}return r.createElement.apply(null,t)}m.displayName="MDXCreateElement"}}]);