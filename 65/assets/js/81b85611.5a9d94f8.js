"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[9759],{5680:(e,t,n)=>{n.d(t,{xA:()=>c,yg:()=>y});var a=n(6540);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=a.createContext({}),p=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},c=function(e){var t=p(e.components);return a.createElement(s.Provider,{value:t},e.children)},d="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},h=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),d=p(n),h=r,y=d["".concat(s,".").concat(h)]||d[h]||u[h]||i;return n?a.createElement(y,o(o({ref:t},c),{},{components:n})):a.createElement(y,o({ref:t},c))}));function y(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,o=new Array(i);o[0]=h;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[d]="string"==typeof e?e:r,o[1]=l;for(var p=2;p<i;p++)o[p]=n[p];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}h.displayName="MDXCreateElement"},8339:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>o,default:()=>u,frontMatter:()=>i,metadata:()=>l,toc:()=>p});var a=n(8168),r=(n(6540),n(5680));const i={},o="File Handling",l={unversionedId:"Lab/IO/file-handlers",id:"Lab/IO/file-handlers",title:"File Handling",description:"You've most likely had to deal with files in the past.",source:"@site/docs/Lab/IO/file-handlers.md",sourceDirName:"Lab/IO",slug:"/Lab/IO/file-handlers",permalink:"/operating-systems/65/Lab/IO/file-handlers",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"I/O",permalink:"/operating-systems/65/Lab/IO/overview"},next:{title:"File Descriptors",permalink:"/operating-systems/65/Lab/IO/file-descriptors"}},s={},p=[{value:"Reaching the File",id:"reaching-the-file",level:2},{value:"Limitations of High-level File Handlers",id:"limitations-of-high-level-file-handlers",level:3}],c={toc:p},d="wrapper";function u(e){let{components:t,...n}=e;return(0,r.yg)(d,(0,a.A)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,r.yg)("h1",{id:"file-handling"},"File Handling"),(0,r.yg)("p",null,"You've most likely had to deal with files in the past.\nGo to ",(0,r.yg)("inlineCode",{parentName:"p"},"support/simple-file-operations")," and run a most basic command:\n",(0,r.yg)("inlineCode",{parentName:"p"},"cat file.txt"),":"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-console"},"student@os:~/.../lab/support/simple-file-operations$ cat file.txt\nOS Rullz!\n")),(0,r.yg)("p",null,"But how does ",(0,r.yg)("inlineCode",{parentName:"p"},"cat"),' actually "reach" the file, then read its contents, then print them to standard output?\nThis is part of what we\'re going to learn.'),(0,r.yg)("h2",{id:"reaching-the-file"},"Reaching the File"),(0,r.yg)("p",null,"To manipulate the file (read its contents, modify them, change its size etc.), each process must first get a ",(0,r.yg)("strong",{parentName:"p"},"handler")," to this file.\nThink of this handler as an object by which the process can identify and refer to the file."),(0,r.yg)("p",null,"Now take a look at the code examples in ",(0,r.yg)("inlineCode",{parentName:"p"},"support/simple-file-operations"),".\nEach of them reads the contents of ",(0,r.yg)("inlineCode",{parentName:"p"},"file.txt"),", modifies them, and then reads the previously modified file again.\nUse ",(0,r.yg)("inlineCode",{parentName:"p"},"make")," to compile the C code, and ",(0,r.yg)("inlineCode",{parentName:"p"},"make java-file-operations")," to compile the Java code."),(0,r.yg)("p",null,"Now run the programs repeatedly in whatever order you wish:"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-console"},"student@os:~/.../lab/support/simple-file-operations$ python3 file_operations.py\nFile contents are: OS Rullz!\nWrote new data to file\nFile contents are: Python was here!\n\nstudent@os:~/.../lab/support/simple-file-operations$ ./file_operations  # from the C code\nFile contents are: Python was here!\nWrote new data to file\nFile contents are: C was here!\n\nstudent@os:~/.../lab/support/simple-file-operations$ java FileOperations\nFile contents are: Python was here!\nWrote new data to file\nFile contents are: Java was here!\n")),(0,r.yg)("p",null,"Note that each piece of code creates a variable, which is then used as a handler."),(0,r.yg)("p",null,(0,r.yg)("a",{parentName:"p",href:"/operating-systems/65/Lab/IO/quiz/file-handler-c"},"Quiz")),(0,r.yg)("h3",{id:"limitations-of-high-level-file-handlers"},"Limitations of High-level File Handlers"),(0,r.yg)("p",null,(0,r.yg)("strong",{parentName:"p"},"Everything in Linux is a file."),"\nThis statement says that the Linux OS treats every entry in a file system (regular file, directory, block device, char device, link, UNIX socket) as a file.\nThis is very convenient for creating a unified interface that deals with all these files.\nWe would like our file handlers to also be able to handle all types of files."),(0,r.yg)("p",null,"Let's try this.\nNavigate to ",(0,r.yg)("inlineCode",{parentName:"p"},"support/simple-file-operations/directory_operations.c"),".\nRead the code.\nIt does something very simple:\nit attempts to open the ",(0,r.yg)("inlineCode",{parentName:"p"},"dir")," directory the same way ",(0,r.yg)("inlineCode",{parentName:"p"},"file_operations.c")," tried to open ",(0,r.yg)("inlineCode",{parentName:"p"},"file.txt"),".\nCompile and run the code."),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-console"},"student@os:~/.../lab/support/simple-file-operations$ ./directory_operations\n18:18:11 FATAL directory_operations.c:14: fopen: Is a directory\n")),(0,r.yg)("p",null,"The error message is crystal clear: we cannot use ",(0,r.yg)("inlineCode",{parentName:"p"},"fopen()")," on directories.\nSo the ",(0,r.yg)("inlineCode",{parentName:"p"},"FILE")," structure is unsuited for directories.\nTherefore, this handler is not generic enough for a regular Linux filesystem."),(0,r.yg)("p",null,"To get to the directory, we need to use a lower-level function.\nLet's take a look at the syscall used by ",(0,r.yg)("inlineCode",{parentName:"p"},"fopen()"),"."),(0,r.yg)("p",null,(0,r.yg)("a",{parentName:"p",href:"/operating-systems/65/Lab/IO/quiz/fopen-syscall"},"Quiz")),(0,r.yg)("p",null,"We will use a simpler syscall, called ",(0,r.yg)("a",{parentName:"p",href:"https://man7.org/linux/man-pages/man2/open.2.html"},(0,r.yg)("inlineCode",{parentName:"a"},"open()")),".\nIn fact, ",(0,r.yg)("inlineCode",{parentName:"p"},"open()")," is a wrapper over ",(0,r.yg)("inlineCode",{parentName:"p"},"openat()"),".\nNavigate to ",(0,r.yg)("inlineCode",{parentName:"p"},"support/file-descriptors/directory_open.c"),".\nInspect, compile and run the code."),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-console"},"student@os:~/.../lab/support/file-descriptors$ ./open_directory\nDirectory file descriptor is: 3\n")),(0,r.yg)("p",null,"We can now see that the ",(0,r.yg)("inlineCode",{parentName:"p"},"open()")," syscall is capable of also handling directories, so it's closer to what we want.\nNote that it is rather uncommon to use ",(0,r.yg)("inlineCode",{parentName:"p"},"open()")," for directories.\nMost of the time, ",(0,r.yg)("a",{parentName:"p",href:"https://man7.org/linux/man-pages/man3/opendir.3.html"},(0,r.yg)("inlineCode",{parentName:"a"},"opendir()"))," is used instead.\nBut what does it return?\nFind out in ",(0,r.yg)("a",{parentName:"p",href:"/operating-systems/65/Lab/IO/file-descriptors"},'the "File Descriptors" section'),"."))}u.isMDXComponent=!0}}]);