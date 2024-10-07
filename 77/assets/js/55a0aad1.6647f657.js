"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[6009],{5680:(e,t,r)=>{r.d(t,{xA:()=>c,yg:()=>d});var n=r(6540);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var p=n.createContext({}),u=function(e){var t=n.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},c=function(e){var t=u(e.components);return n.createElement(p.Provider,{value:t},e.children)},s="mdxType",f={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},y=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,p=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),s=u(r),y=a,d=s["".concat(p,".").concat(y)]||s[y]||f[y]||o;return r?n.createElement(d,i(i({ref:t},c),{},{components:r})):n.createElement(d,i({ref:t},c))}));function d(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,i=new Array(o);i[0]=y;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l[s]="string"==typeof e?e:a,i[1]=l;for(var u=2;u<o;u++)i[u]=r[u];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}y.displayName="MDXCreateElement"},2094:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>p,contentTitle:()=>i,default:()=>f,frontMatter:()=>o,metadata:()=>l,toc:()=>u});var n=r(8168),a=(r(6540),r(5680));const o={},i="Buffer Overflow Info Leak",l={unversionedId:"Data/Lab 5 - Memory Security/Guides/Buffer Overflow Leak/README",id:"Data/Lab 5 - Memory Security/Guides/Buffer Overflow Leak/README",title:"Buffer Overflow Info Leak",description:"Since arrays decay to pointers in C, the same effect may be obtained by using them.",source:"@site/docs/Data/Lab 5 - Memory Security/Guides/Buffer Overflow Leak/README.md",sourceDirName:"Data/Lab 5 - Memory Security/Guides/Buffer Overflow Leak",slug:"/Data/Lab 5 - Memory Security/Guides/Buffer Overflow Leak/",permalink:"/operating-systems/77/Data/Lab 5 - Memory Security/Guides/Buffer Overflow Leak/",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"Guides",permalink:"/operating-systems/77/Data/Lab 5 - Memory Security/Guides/"},next:{title:"Buffer Overflow Overwrite",permalink:"/operating-systems/77/Data/Lab 5 - Memory Security/Guides/Buffer Overflow Overwrite/"}},p={},u=[{value:"Practice",id:"practice",level:2}],c={toc:u},s="wrapper";function f(e){let{components:t,...r}=e;return(0,a.yg)(s,(0,n.A)({},c,r,{components:t,mdxType:"MDXLayout"}),(0,a.yg)("h1",{id:"buffer-overflow-info-leak"},"Buffer Overflow Info Leak"),(0,a.yg)("p",null,"Since arrays decay to pointers in C, the same effect may be obtained by using them."),(0,a.yg)("p",null,"Navigate to the ",(0,a.yg)("inlineCode",{parentName:"p"},"guide/buffer-overflow-leak/")," directory.\nOpen and analyze the ",(0,a.yg)("inlineCode",{parentName:"p"},"array_leak.c")," file."),(0,a.yg)("p",null,"Compile and run the program.\nCan you extract any information from the output?\nCan you identify the return address of the main function?"),(0,a.yg)("p",null,(0,a.yg)("strong",{parentName:"p"},"Note:")," You can use ",(0,a.yg)("inlineCode",{parentName:"p"},"objdump -d -M intel array_leak")," to check the stack layout.\n",(0,a.yg)("strong",{parentName:"p"},"Note:")," Depending on the environment the layout may differ."),(0,a.yg)("p",null,"Next, open and analyze the ",(0,a.yg)("inlineCode",{parentName:"p"},"string_leak.c")," file.\nCompile and run the program.\nTo better understand the output, use ",(0,a.yg)("inlineCode",{parentName:"p"},"xxd")," to interpret the output as hexadecimal bytes:"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-console"},"student@os:~/.../guides/buffer-overflow-leak/$ ./string_leak | xxd\n")),(0,a.yg)("p",null,(0,a.yg)("strong",{parentName:"p"},"Note:")," ",(0,a.yg)("inlineCode",{parentName:"p"},"73")," and ",(0,a.yg)("inlineCode",{parentName:"p"},"6f")," are the ascii values of ",(0,a.yg)("inlineCode",{parentName:"p"},"s")," and ",(0,a.yg)("inlineCode",{parentName:"p"},"o")),(0,a.yg)("h2",{id:"practice"},"Practice"),(0,a.yg)("p",null,"In file ",(0,a.yg)("inlineCode",{parentName:"p"},"string_leak.c")," replace the usage of ",(0,a.yg)("inlineCode",{parentName:"p"},"memcpy")," with ",(0,a.yg)("inlineCode",{parentName:"p"},"strcpy"),".\nDo not modify anything else (including the size of the buffer).\nAs the name suggests, ",(0,a.yg)("inlineCode",{parentName:"p"},"strcpy()")," is specialized for string copies, therefore we don need to specify how much we want to copy.\nWhat is the result?\nIs the result correct?\nExplain the result."))}f.isMDXComponent=!0}}]);