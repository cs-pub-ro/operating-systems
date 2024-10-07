"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[675],{5680:(e,n,t)=>{t.d(n,{xA:()=>p,yg:()=>h});var o=t(6540);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function r(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);n&&(o=o.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,o)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?r(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):r(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,o,a=function(e,n){if(null==e)return{};var t,o,a={},r=Object.keys(e);for(o=0;o<r.length;o++)t=r[o],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(o=0;o<r.length;o++)t=r[o],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var s=o.createContext({}),c=function(e){var n=o.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},p=function(e){var n=c(e.components);return o.createElement(s.Provider,{value:n},e.children)},m="mdxType",u={inlineCode:"code",wrapper:function(e){var n=e.children;return o.createElement(o.Fragment,{},n)}},g=o.forwardRef((function(e,n){var t=e.components,a=e.mdxType,r=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),m=c(t),g=a,h=m["".concat(s,".").concat(g)]||m[g]||u[g]||r;return t?o.createElement(h,i(i({ref:n},p),{},{components:t})):o.createElement(h,i({ref:n},p))}));function h(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var r=t.length,i=new Array(r);i[0]=g;var l={};for(var s in n)hasOwnProperty.call(n,s)&&(l[s]=n[s]);l.originalType=e,l[m]="string"==typeof e?e:a,i[1]=l;for(var c=2;c<r;c++)i[c]=t[c];return o.createElement.apply(null,i)}return o.createElement.apply(null,t)}g.displayName="MDXCreateElement"},1327:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>s,contentTitle:()=>i,default:()=>u,frontMatter:()=>r,metadata:()=>l,toc:()=>c});var o=t(8168),a=(t(6540),t(5680));const r={},i="I/O Multiplexing",l={unversionedId:"Lab/IO/io-multiplexing",id:"Lab/IO/io-multiplexing",title:"I/O Multiplexing",description:"I/O multiplexing is the ability to serve multiple I/O channels (or anything that can be referenced via a file descriptor / handle) simultaneously.",source:"@site/docs/Lab/IO/io-multiplexing.md",sourceDirName:"Lab/IO",slug:"/Lab/IO/io-multiplexing",permalink:"/operating-systems/77/Lab/IO/io-multiplexing",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"Asynchronous I/O",permalink:"/operating-systems/77/Lab/IO/async-io"},next:{title:"Arena",permalink:"/operating-systems/77/Lab/IO/arena"}},s={},c=[{value:"Practice",id:"practice",level:2}],p={toc:c},m="wrapper";function u(e){let{components:n,...t}=e;return(0,a.yg)(m,(0,o.A)({},p,t,{components:n,mdxType:"MDXLayout"}),(0,a.yg)("h1",{id:"io-multiplexing"},"I/O Multiplexing"),(0,a.yg)("p",null,"I/O multiplexing is the ability to serve multiple I/O channels (or anything that can be referenced via a file descriptor / handle) simultaneously.\nIf a given application, such a server, has multiple sockets on which it serves connection, it may be the case that operating on one socket blocks the server.\nOne solution is using asynchronous operations, with different backends.\nThe other solution is using I/O multiplexing."),(0,a.yg)("p",null,"With I/O multiplexing, the API provides a structure / an array to list all used channels.\nAnd then it provides an API to operate on that channel.\nAnd a (blocking) function to retrieve the channel that is ready for interaction (or channels).\nSo instead of waiting for a given channel (while others may be ready), you now simultaneously wait on all channels, and the ready channel is returned by the function."),(0,a.yg)("p",null,"The classical functions for I/O multiplexing are ",(0,a.yg)("a",{parentName:"p",href:"https://man7.org/linux/man-pages/man2/select.2.html"},(0,a.yg)("inlineCode",{parentName:"a"},"select"))," and ",(0,a.yg)("a",{parentName:"p",href:"https://man7.org/linux/man-pages/man2/poll.2.html"},(0,a.yg)("inlineCode",{parentName:"a"},"poll")),".\nDue to several limitations, modern operating systems provide advanced (non-portable) variants to these:"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"Windows provides ",(0,a.yg)("a",{parentName:"li",href:"https://learn.microsoft.com/en-us/windows/win32/fileio/i-o-completion-ports"},"I/O completion ports (IOCP)"),"."),(0,a.yg)("li",{parentName:"ul"},"BSD provides ",(0,a.yg)("a",{parentName:"li",href:"https://www.freebsd.org/cgi/man.cgi?kqueue"},(0,a.yg)("inlineCode",{parentName:"a"},"kqueue")),"."),(0,a.yg)("li",{parentName:"ul"},"Linux provides ",(0,a.yg)("a",{parentName:"li",href:"https://man7.org/linux/man-pages/man7/epoll.7.html"},(0,a.yg)("inlineCode",{parentName:"a"},"epoll()")),".")),(0,a.yg)("p",null,(0,a.yg)("strong",{parentName:"p"},"Note")," that I/O multiplexing is orthogonal to asynchronous operations.\nYou could tie them together if the completion of the asynchronous operation sends a notification that can be handled via a file descriptor / handle.\nThis is the case with Windows asynchronous I/O (called ",(0,a.yg)("a",{parentName:"p",href:"https://learn.microsoft.com/en-us/windows/win32/fileio/synchronous-and-asynchronous-i-o"},"overlapped I/O"),")."),(0,a.yg)("h2",{id:"practice"},"Practice"),(0,a.yg)("p",null,"Enter the ",(0,a.yg)("inlineCode",{parentName:"p"},"multiplex/")," directory.\nSee the implementation of an ",(0,a.yg)("inlineCode",{parentName:"p"},"epoll()"),"-based server in ",(0,a.yg)("inlineCode",{parentName:"p"},"epoll_echo_server.c"),"."),(0,a.yg)("ol",null,(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"Build the server:"),(0,a.yg)("pre",{parentName:"li"},(0,a.yg)("code",{parentName:"pre",className:"language-console"},"student@os:~/.../lab/support/multiplex$ make\ngcc -g -Wall -Wextra -I../../../../../common/makefile/..  -c -o epoll_echo_server.o epoll_echo_server.c\ngcc -g -Wall -Wextra -I../../../../../common/makefile/..  -c -o ../../../../../common/makefile/../utils/log/log.o ../../../../../common/makefile/../utils/log/log.c\ngcc -g -Wall -Wextra -I../../../../../common/makefile/..  -c -o ../../../../../common/utils/sock/sock_util.o ../../../../../common/utils/sock/sock_util.c\ngcc epoll_echo_server.o ../../../../../common/makefile/../utils/log/log.o ../../../../../common/utils/sock/sock_util.o  -o epoll_echo_server\n")),(0,a.yg)("p",{parentName:"li"},"And run it:"),(0,a.yg)("pre",{parentName:"li"},(0,a.yg)("code",{parentName:"pre",className:"language-console"},"student@os:~/.../lab/support/multiplex$ ./epoll_echo_server\n08:41:07 INFO  epoll_echo_server.c:252: Server waiting for connections on port 42424\n")),(0,a.yg)("p",{parentName:"li"},"It listens for connection on port ",(0,a.yg)("inlineCode",{parentName:"p"},"42424"),"."),(0,a.yg)("p",{parentName:"li"},"Connect using ",(0,a.yg)("inlineCode",{parentName:"p"},"netcat")," on another console and send messages:"),(0,a.yg)("pre",{parentName:"li"},(0,a.yg)("code",{parentName:"pre",className:"language-console"},"$ nc localhost 42424\naaa\naaa\nbbb\nbbb\n")),(0,a.yg)("p",{parentName:"li"},"Keep the connection open and, on the third console, initiate another ",(0,a.yg)("inlineCode",{parentName:"p"},"netcat")," connection.\nThe server is now multiplexing both connections.")),(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"Create a script and / or a program to exercise the server.\nCreate many connections to the server and continuously send messages to the server.\nSee it multiplex the I/O channels (one for each connection - actually two: one for receiving and one for sending)."))))}u.isMDXComponent=!0}}]);