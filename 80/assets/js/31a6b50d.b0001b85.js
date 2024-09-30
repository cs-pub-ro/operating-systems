"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[6889],{5680:(e,t,n)=>{n.d(t,{xA:()=>p,yg:()=>d});var r=n(6540);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=r.createContext({}),l=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=l(e.components);return r.createElement(c.Provider,{value:t},e.children)},m="mdxType",h={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},u=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,c=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),m=l(n),u=a,d=m["".concat(c,".").concat(u)]||m[u]||h[u]||o;return n?r.createElement(d,i(i({ref:t},p),{},{components:n})):r.createElement(d,i({ref:t},p))}));function d(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=u;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s[m]="string"==typeof e?e:a,i[1]=s;for(var l=2;l<o;l++)i[l]=n[l];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}u.displayName="MDXCreateElement"},464:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>h,frontMatter:()=>o,metadata:()=>s,toc:()=>l});var r=n(8168),a=(n(6540),n(5680));const o={},i="The X Window System",s={unversionedId:"Lab/Application Interaction/x-window-system",id:"Lab/Application Interaction/x-window-system",title:"The X Window System",description:"Unix-like systems that support a Graphical User Interface usually do this through the X Window System.",source:"@site/docs/Lab/Application Interaction/x-window-system.md",sourceDirName:"Lab/Application Interaction",slug:"/Lab/Application Interaction/x-window-system",permalink:"/operating-systems/80/Lab/Application Interaction/x-window-system",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"Password Cracker",permalink:"/operating-systems/80/Lab/Application Interaction/password-cracker"},next:{title:"D-Bus",permalink:"/operating-systems/80/Lab/Application Interaction/dbus"}},c={},l=[{value:"X Client and Server on the Same Machine",id:"x-client-and-server-on-the-same-machine",level:2}],p={toc:l},m="wrapper";function h(e){let{components:t,...o}=e;return(0,a.yg)(m,(0,r.A)({},p,o,{components:t,mdxType:"MDXLayout"}),(0,a.yg)("h1",{id:"the-x-window-system"},"The X Window System"),(0,a.yg)("p",null,"Unix-like systems that support a Graphical User Interface usually do this through the X Window System.\nThis system is implemented with a client-server model: the X Server is the component that controls the screen, keyboard, mouse, and other parts related to the GUI, while the X clients are the applications that want to use the graphical interface (like, for example, an internet browser)."),(0,a.yg)("p",null,"The clients and the server communicate using a standardized protocol, and the system does not necessarily require the client and server to be on the same machine.\nAlthough not so common nowadays, the X client can run on a different machine than the server, with the communication happening over the network.\nBut in the more usual case, when both the client and the server are on the same machine, modern implementations of the X Window System use a faster communication channel, like a Unix socket."),(0,a.yg)("h2",{id:"x-client-and-server-on-the-same-machine"},"X Client and Server on the Same Machine"),(0,a.yg)("p",null,"Let's investigate the case when both the X client and X server run on the same machine.\nFirst we'll take a look at the Unix sockets that are in listening mode."),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-console"},"student@os:~$ sudo netstat -xnlp | grep X11\nunix  2      [ ACC ]     STREAM     LISTENING     29120    3472/Xorg            @/tmp/.X11-unix/X0\nunix  2      [ ACC ]     STREAM     LISTENING     29121    3472/Xorg            /tmp/.X11-unix/X0\n")),(0,a.yg)("p",null,"We observe the ",(0,a.yg)("inlineCode",{parentName:"p"},"Xorg")," process (the X server) listening on a Unix socket with the path ",(0,a.yg)("inlineCode",{parentName:"p"},"/tmp/.X11-unix/X0"),"."),(0,a.yg)("p",null,"Now let's run an X client (that is, a GUI application) and check that it will indeed connect to this Unix socket.\nA very simple example is the ",(0,a.yg)("inlineCode",{parentName:"p"},"xeyes")," application:"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-console"},'student@os:~$ strace -e trace=socket,connect xeyes\nsocket(AF_UNIX, SOCK_STREAM|SOCK_CLOEXEC, 0) = 3\nconnect(3, {sa_family=AF_UNIX, sun_path=@"/tmp/.X11-unix/X0"}, 20) = 0\n')),(0,a.yg)("p",null,"As expected, the application creates a Unix socket, then connects to the path ",(0,a.yg)("inlineCode",{parentName:"p"},'@"/tmp/.X11-unix/X0"'),"."),(0,a.yg)("p",null,"Furthermore, let's confirm that there is actual communication taking place between ",(0,a.yg)("inlineCode",{parentName:"p"},"xeyes")," and the X server.\nWe'll run ",(0,a.yg)("inlineCode",{parentName:"p"},"xeyes")," again, and then we'll keep moving the mouse cursor around.\nWhen the mouse is moved, the following events are taking place:"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"The X server captures the mouse movements (since the server is the one that controls the mouse)"),(0,a.yg)("li",{parentName:"ul"},'The X server will pass these "mouse moved" events to the clients (including xeyes)'),(0,a.yg)("li",{parentName:"ul"},"The client (xeyes) uses these events to update its window (changing the position of the pupils inside the eyes)")),(0,a.yg)("p",null,"So, if we run ",(0,a.yg)("inlineCode",{parentName:"p"},"xeyes")," under ",(0,a.yg)("inlineCode",{parentName:"p"},"strace"),", we expect to see some communication on the Unix socket that is created at the beginning:"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-console"},"strace -e 'trace=!poll' -e trace='socket,connect,recvmsg' xeyes |& grep -v '\\-1 EAGAIN'\n")),(0,a.yg)("p",null,(0,a.yg)("img",{alt:"strace-xeyes",src:n(9116).A,width:"1920",height:"1080"})))}h.isMDXComponent=!0},9116:(e,t,n)=>{n.d(t,{A:()=>r});const r=n.p+"assets/images/strace_xeyes-f055c379e7028e39de13f0d039171718.gif"}}]);