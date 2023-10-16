"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[3004],{3905:(e,t,n)=>{n.d(t,{Zo:()=>s,kt:()=>y});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=r.createContext({}),l=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},s=function(e){var t=l(e.components);return r.createElement(c.Provider,{value:t},e.children)},u="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},f=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,c=e.parentName,s=p(e,["components","mdxType","originalType","parentName"]),u=l(n),f=a,y=u["".concat(c,".").concat(f)]||u[f]||m[f]||i;return n?r.createElement(y,o(o({ref:t},s),{},{components:n})):r.createElement(y,o({ref:t},s))}));function y(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=f;var p={};for(var c in t)hasOwnProperty.call(t,c)&&(p[c]=t[c]);p.originalType=e,p[u]="string"==typeof e?e:a,o[1]=p;for(var l=2;l<i;l++)o[l]=n[l];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}f.displayName="MDXCreateElement"},7695:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>o,default:()=>m,frontMatter:()=>i,metadata:()=>p,toc:()=>l});var r=n(7462),a=(n(7294),n(3905));const i={},o="Application Interaction",p={unversionedId:"Lab/Application Interaction/overview",id:"Lab/Application Interaction/overview",title:"Application Interaction",description:"In this chapter, you will discover various mechanisms through which applications on a system can interact.",source:"@site/docs/Lab/Application Interaction/overview.md",sourceDirName:"Lab/Application Interaction",slug:"/Lab/Application Interaction/overview",permalink:"/operating-systems/3/Lab/Application Interaction/overview",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"Application Interaction",permalink:"/operating-systems/3/Lab/Application Interaction/"},next:{title:"Time Server",permalink:"/operating-systems/3/Lab/Application Interaction/time-server"}},c={},l=[{value:"Setup",id:"setup",level:2},{value:"Contents",id:"contents",level:2}],s={toc:l},u="wrapper";function m(e){let{components:t,...n}=e;return(0,a.kt)(u,(0,r.Z)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"application-interaction"},"Application Interaction"),(0,a.kt)("p",null,"In this chapter, you will discover various mechanisms through which applications on a system can interact.\nYou will see these mechanisms in action in existing applications, but also use them in some code of your own."),(0,a.kt)("h2",{id:"setup"},"Setup"),(0,a.kt)("p",null,"Make sure the following packages are installed:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-console"},"sudo apt-get -y update; sudo apt-get -y install net-tools x11-apps libssl-dev d-feet firefox\n")),(0,a.kt)("h2",{id:"contents"},"Contents"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("a",{parentName:"li",href:"/operating-systems/3/Lab/Application%20Interaction/time-server"},"Time Server")),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("a",{parentName:"li",href:"/operating-systems/3/Lab/Application%20Interaction/password-cracker"},"Password Cracker")),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("a",{parentName:"li",href:"/operating-systems/3/Lab/Application%20Interaction/x-window-system"},"The X Window System")),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("a",{parentName:"li",href:"/operating-systems/3/Lab/Application%20Interaction/dbus"},"D-Bus")),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("a",{parentName:"li",href:"/operating-systems/3/Lab/Application%20Interaction/os-cloud"},"OS Cloud")),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("a",{parentName:"li",href:"/operating-systems/3/Lab/Application%20Interaction/arena"},"Arena"))))}m.isMDXComponent=!0}}]);