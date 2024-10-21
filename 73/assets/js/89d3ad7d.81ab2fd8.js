"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[8871],{5680:(e,t,n)=>{n.d(t,{xA:()=>c,yg:()=>g});var r=n(6540);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=r.createContext({}),p=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},c=function(e){var t=p(e.components);return r.createElement(s.Provider,{value:t},e.children)},u="mdxType",y={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,s=e.parentName,c=o(e,["components","mdxType","originalType","parentName"]),u=p(n),d=a,g=u["".concat(s,".").concat(d)]||u[d]||y[d]||i;return n?r.createElement(g,l(l({ref:t},c),{},{components:n})):r.createElement(g,l({ref:t},c))}));function g(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,l=new Array(i);l[0]=d;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o[u]="string"==typeof e?e:a,l[1]=o;for(var p=2;p<i;p++)l[p]=n[p];return r.createElement.apply(null,l)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},6031:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>l,default:()=>y,frontMatter:()=>i,metadata:()=>o,toc:()=>p});var r=n(8168),a=(n(6540),n(5680));const i={},l="Syscalls Used by `cp`",o={unversionedId:"Lab/IO/quiz/syscalls-cp",id:"Lab/IO/quiz/syscalls-cp",title:"Syscalls Used by `cp`",description:"Question Text",source:"@site/docs/Lab/IO/quiz/syscalls-cp.md",sourceDirName:"Lab/IO/quiz",slug:"/Lab/IO/quiz/syscalls-cp",permalink:"/operating-systems/73/Lab/IO/quiz/syscalls-cp",draft:!1,tags:[],version:"current",frontMatter:{}},s={},p=[{value:"Question Text",id:"question-text",level:2},{value:"Question Answers",id:"question-answers",level:2},{value:"Feedback",id:"feedback",level:2}],c={toc:p},u="wrapper";function y(e){let{components:t,...n}=e;return(0,a.yg)(u,(0,r.A)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,a.yg)("h1",{id:"syscalls-used-by-cp"},"Syscalls Used by ",(0,a.yg)("inlineCode",{parentName:"h1"},"cp")),(0,a.yg)("h2",{id:"question-text"},"Question Text"),(0,a.yg)("p",null,"What syscalls does ",(0,a.yg)("inlineCode",{parentName:"p"},"cp")," use to copy files?"),(0,a.yg)("h2",{id:"question-answers"},"Question Answers"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("inlineCode",{parentName:"li"},"mmap()"))),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},(0,a.yg)("inlineCode",{parentName:"p"},"read()")," and ",(0,a.yg)("inlineCode",{parentName:"p"},"write()"))),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},(0,a.yg)("inlineCode",{parentName:"p"},"copy_file_range()")))),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"a combination of ",(0,a.yg)("inlineCode",{parentName:"li"},"read()")," - ",(0,a.yg)("inlineCode",{parentName:"li"},"write()")," and ",(0,a.yg)("inlineCode",{parentName:"li"},"mmap()"))),(0,a.yg)("h2",{id:"feedback"},"Feedback"),(0,a.yg)("p",null,"It suffices to use ",(0,a.yg)("inlineCode",{parentName:"p"},"strace")," to see that ",(0,a.yg)("inlineCode",{parentName:"p"},"cp")," uses ",(0,a.yg)("inlineCode",{parentName:"p"},"read()")," and ",(0,a.yg)("inlineCode",{parentName:"p"},"write()"),"."),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-console"},'student@os:/.../support/file-mappings$ strace cp test-file.txt output.txt\nopenat(AT_FDCWD, "test-file.txt", O_RDONLY) = 3\nfstat(3, {st_mode=S_IFREG|0664, st_size=1048576, ...}) = 0\nopenat(AT_FDCWD, "output.txt", O_WRONLY|O_CREAT|O_EXCL, 0664) = 4\nfstat(4, {st_mode=S_IFREG|0664, st_size=0, ...}) = 0\n[...]\nread(3, "@Y\\344\\0025\\317\\27\\243\\23\\201:\\27\\342\\356\\240\\345\\331Nq\\v/\\36\\244\\200\\301\\247\\3152\\35WZ\\337"..., 131072) = 131072\nwrite(4, "@Y\\344\\0025\\317\\27\\243\\23\\201:\\27\\342\\356\\240\\345\\331Nq\\v/\\36\\244\\200\\301\\247\\3152\\35WZ\\337"..., 131072) = 131072\nread(3, "\\201\\240J7x\\275\\257Z\\343\\334\\307d<\\321U\\275\\337\\10\\233j\\222\\313,##cQD\\268e\\324"..., 131072) = 131072\nwrite(4, "\\201\\240J7x\\275\\257Z\\343\\334\\307d<\\321U\\275\\337\\10\\233j\\222\\313,##cQD\\268e\\324"..., 131072) = 131072\nread(3, "\\371\\3244=\\17\\300L9\\243\\201\\362\\25\\273\\37\\326\\323\\362\\200\\1T\\310N\\316\\305\\253\\331\\331Nt\\346\\3369"..., 131072) = 131072\nwrite(4, "\\371\\3244=\\17\\300L9\\243\\201\\362\\25\\273\\37\\326\\323\\362\\200\\1T\\310N\\316\\305\\253\\331\\331Nt\\346\\3369"..., 131072) = 131072\nread(3, "\\350\\304\\345f\\16\\305V\\356\\371\\263?+\\355{\\16\\235\\344\\310P4}\\2043%\\0052\\345D\\265\\243t\\354"..., 131072) = 131072\nwrite(4, "\\350\\304\\345f\\16\\305V\\356\\371\\263?+\\355{\\16\\235\\344\\310P4}\\2043%\\0052\\345D\\265\\243t\\354"..., 131072) = 131072\nread(3, "\\277\\226\\315\\226\\n\\37\\337;N*\\211\\352\\254$\\273\\2\\351\\30a\\254\\ta\\352R\\25-\\23\\274\\376zy\\211"..., 131072) = 131072\nwrite(4, "\\277\\226\\315\\226\\n\\37\\337;N*\\211\\352\\254$\\273\\2\\351\\30a\\254\\ta\\352R\\25-\\23\\274\\376zy\\211"..., 131072) = 131072\nread(3, "}\\245\\356;\\222\\327\\204\\242u\\26dy%\\346\\374\\201ndT\\226\\233\\3575\\345\\247\\356\\362\\344\\350\\354\\17\\261"..., 131072) = 131072\nwrite(4, "}\\245\\356;\\222\\327\\204\\242u\\26dy%\\346\\374\\201ndT\\226\\233\\3575\\345\\247\\356\\362\\344\\350\\354\\17\\261"..., 131072) = 131072\nread(3, "\\35\\277\\207\\243~\\355(i\\351^\\1\\346\\312V\\232\\204\\32\\230~\\376\\20\\245\\"\\305\\344d\\304\\304B\\272\\346\\332"..., 131072) = 131072\nwrite(4, "\\35\\277\\207\\243~\\355(i\\351^\\1\\346\\312V\\232\\204\\32\\230~\\376\\20\\245\\"\\305\\344d\\304\\304B\\272\\346\\332"..., 131072) = 131072\nread(3, "\\n)\\334\\275\\331:R\\236O\\231\\243\\302\\314\\267\\326\\"\\rY\\262\\21\\374\\305\\275\\3\\332\\23\\345\\16>\\214\\210\\235"..., 131072) = 131072\nwrite(4, "\\n)\\334\\275\\331:R\\236O\\231\\243\\302\\314\\267\\326\\"\\rY\\262\\21\\374\\305\\275\\3\\332\\23\\345\\16>\\214\\210\\235"..., 131072) = 131072\n')),(0,a.yg)("p",null,"Alternatively, if your kernel version is ",(0,a.yg)("inlineCode",{parentName:"p"},"5.19")," or newer, it's likely that ",(0,a.yg)("inlineCode",{parentName:"p"},"cp")," will use ",(0,a.yg)("inlineCode",{parentName:"p"},"copy_file_range()"),":"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-console"},'student@os:/.../support/file-mappings$ strace cp test-file.txt output.txt\nopenat(AT_FDCWD, "test-file.txt", O_RDONLY) = 3\nnewfstatat(3, "", {st_mode=S_IFREG|0664, st_size=1048576, ...}, AT_EMPTY_PATH) = 0\nopenat(AT_FDCWD, "output.txt", O_WRONLY|O_CREAT|O_EXCL, 0664) = 4\nioctl(4, BTRFS_IOC_CLONE or FICLONE, 3) = -1 EOPNOTSUPP (Operation not supported)\nnewfstatat(4, "", {st_mode=S_IFREG|0644, st_size=0, ...}, AT_EMPTY_PATH) = 0\nfadvise64(3, 0, 0, POSIX_FADV_SEQUENTIAL) = 0\ncopy_file_range(3, NULL, 4, NULL, 9223372035781033984, 0) = 1048576\ncopy_file_range(3, NULL, 4, NULL, 9223372035781033984, 0) = 0\n')),(0,a.yg)("p",null,(0,a.yg)("a",{parentName:"p",href:"https://man7.org/linux/man-pages/man2/copy_file_range.2.html"},"This syscall")," copies files inside the kernel without having the data pass through the user space.\nThis procedure is called zero-copy."))}y.isMDXComponent=!0}}]);