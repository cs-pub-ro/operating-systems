"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[5098],{5680:(e,t,n)=>{n.d(t,{xA:()=>s,yg:()=>d});var r=n(6540);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=r.createContext({}),l=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},s=function(e){var t=l(e.components);return r.createElement(c.Provider,{value:t},e.children)},u="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},y=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,c=e.parentName,s=p(e,["components","mdxType","originalType","parentName"]),u=l(n),y=a,d=u["".concat(c,".").concat(y)]||u[y]||m[y]||i;return n?r.createElement(d,o(o({ref:t},s),{},{components:n})):r.createElement(d,o({ref:t},s))}));function d(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=y;var p={};for(var c in t)hasOwnProperty.call(t,c)&&(p[c]=t[c]);p.originalType=e,p[u]="string"==typeof e?e:a,o[1]=p;for(var l=2;l<i;l++)o[l]=n[l];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}y.displayName="MDXCreateElement"},1035:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>o,default:()=>m,frontMatter:()=>i,metadata:()=>p,toc:()=>l});var r=n(8168),a=(n(6540),n(5680));const i={},o="Application Interaction",p={unversionedId:"Application Interaction/app-interact-overview",id:"Application Interaction/app-interact-overview",title:"Application Interaction",description:"In this chapter, you will discover various mechanisms through which applications on a system can interact.",source:"@site/docs/Application Interaction/app-interact-overview.md",sourceDirName:"Application Interaction",slug:"/Application Interaction/app-interact-overview",permalink:"/operating-systems/137/Application Interaction/app-interact-overview",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"Application-Interaction",permalink:"/operating-systems/137/Application Interaction/Application-Interaction"},next:{title:"Questions",permalink:"/operating-systems/137/Application Interaction/Questions/"}},c={},l=[{value:"Setup",id:"setup",level:2},{value:"Contents",id:"contents",level:2}],s={toc:l},u="wrapper";function m(e){let{components:t,...n}=e;return(0,a.yg)(u,(0,r.A)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,a.yg)("h1",{id:"application-interaction"},"Application Interaction"),(0,a.yg)("p",null,"In this chapter, you will discover various mechanisms through which applications on a system can interact.\nYou will see these mechanisms in action in existing applications, but also use them in some code of your own."),(0,a.yg)("h2",{id:"setup"},"Setup"),(0,a.yg)("p",null,"Make sure the following packages are installed:"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-console"},"sudo apt-get -y update; sudo apt-get -y install net-tools x11-apps libssl-dev d-feet firefox\n")),(0,a.yg)("h2",{id:"contents"},"Contents"),(0,a.yg)("ol",null,(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("a",{parentName:"li",href:"./time-server.md"},"Time Server")),(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("a",{parentName:"li",href:"./password-cracker.md"},"Password Cracker")),(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("a",{parentName:"li",href:"./x-window-system.md"},"The X Window System")),(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("a",{parentName:"li",href:"./dbus.md"},"D-Bus")),(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("a",{parentName:"li",href:"./os-cloud.md"},"OS Cloud")),(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("a",{parentName:"li",href:"./arena.md"},"Arena"))))}m.isMDXComponent=!0}}]);