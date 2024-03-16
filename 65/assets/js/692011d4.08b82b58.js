"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[896],{5680:(e,t,n)=>{n.d(t,{xA:()=>c,yg:()=>d});var a=n(6540);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function p(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=a.createContext({}),l=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):p(p({},t),e)),n},c=function(e){var t=l(e.components);return a.createElement(s.Provider,{value:t},e.children)},u="mdxType",g={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},y=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,s=e.parentName,c=o(e,["components","mdxType","originalType","parentName"]),u=l(n),y=r,d=u["".concat(s,".").concat(y)]||u[y]||g[y]||i;return n?a.createElement(d,p(p({ref:t},c),{},{components:n})):a.createElement(d,p({ref:t},c))}));function d(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,p=new Array(i);p[0]=y;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o[u]="string"==typeof e?e:r,p[1]=o;for(var l=2;l<i;l++)p[l]=n[l];return a.createElement.apply(null,p)}return a.createElement.apply(null,n)}y.displayName="MDXCreateElement"},5348:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>p,default:()=>g,frontMatter:()=>i,metadata:()=>o,toc:()=>l});var a=n(8168),r=(n(6540),n(5680));const i={},p="App Investigation",o={unversionedId:"Lab/Software Stack/app-investigate",id:"Lab/Software Stack/app-investigate",title:"App Investigation",description:"Let's spend some time investigating actual applications residing on the local system.",source:"@site/docs/Lab/Software Stack/app-investigate.md",sourceDirName:"Lab/Software Stack",slug:"/Lab/Software Stack/app-investigate",permalink:"/operating-systems/65/Lab/Software Stack/app-investigate",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"High-Level Languages",permalink:"/operating-systems/65/Lab/Software Stack/high-level-lang"},next:{title:"Arena",permalink:"/operating-systems/65/Lab/Software Stack/arena"}},s={},l=[{value:"Practice",id:"practice",level:2}],c={toc:l},u="wrapper";function g(e){let{components:t,...n}=e;return(0,r.yg)(u,(0,a.A)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,r.yg)("h1",{id:"app-investigation"},"App Investigation"),(0,r.yg)("p",null,"Let's spend some time investigating actual applications residing on the local system.\nFor now, we know that applications are developed using high-level languages and then compiled or interpreted to use the lower-layer interfaces of the software stack, such as the system call API."),(0,r.yg)("p",null,"Let's enter the ",(0,r.yg)("inlineCode",{parentName:"p"},"support/app-investigate/")," folder and run the ",(0,r.yg)("inlineCode",{parentName:"p"},"get_app_types.sh")," script:"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-console"},"student@os:~/.../lab/support/app-investigate$ ./get_app_types.sh\nbinary apps: 2223\nPerl apps: 256\nShell apps: 454\nPython apps: 123\nOther apps: 27\n")),(0,r.yg)("p",null,"The script prints the types of the application executables in the system.\nThe output will differ between systems, given each has particular types of applications installed."),(0,r.yg)("p",null,"We list them by running the command inside the ",(0,r.yg)("inlineCode",{parentName:"p"},"get_app_types.sh")," script:"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-console"},"student@os:~/.../lab/support/app-investigate$ find /usr/bin /bin /usr/sbin /sbin -type f -exec file {} \\;\n[...]\n/usr/bin/qpdldecode: ELF 64-bit LSB shared object, x86-64 [...]\n/usr/bin/mimeopen: Perl script text executable\n[...]\n")),(0,r.yg)("p",null,"As above, the output will differ between systems."),(0,r.yg)("p",null,"So, depending on the developers' choice, applications may be:"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"compiled into executables, from compiled languages such as C, C++, Go, Rust, D"),(0,r.yg)("li",{parentName:"ul"},"developed as scripts, from interpreted languages such as Python, Perl, JavaScript")),(0,r.yg)("h2",{id:"practice"},"Practice"),(0,r.yg)("p",null,"Enter the ",(0,r.yg)("inlineCode",{parentName:"p"},"support/app-investigate/")," folder and go through the practice items below.\nSelect a binary executable application and a scripted application from those listed above."),(0,r.yg)("ol",null,(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},"Use ",(0,r.yg)("inlineCode",{parentName:"p"},"ldd")," on the two applications.\nNotice the resulting messages and explain the results.")),(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},"Use ",(0,r.yg)("inlineCode",{parentName:"p"},"ltrace")," and ",(0,r.yg)("inlineCode",{parentName:"p"},"strace")," on the two applications.\nFollow the library calls and the system calls done by each application."))))}g.isMDXComponent=!0}}]);