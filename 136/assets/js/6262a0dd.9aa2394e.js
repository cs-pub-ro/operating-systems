"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[3700],{5680:(e,n,t)=>{t.d(n,{xA:()=>c,yg:()=>d});var r=t(6540);function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function a(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?a(Object(t),!0).forEach((function(n){o(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function s(e,n){if(null==e)return{};var t,r,o=function(e,n){if(null==e)return{};var t,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var l=r.createContext({}),p=function(e){var n=r.useContext(l),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},c=function(e){var n=p(e.components);return r.createElement(l.Provider,{value:n},e.children)},u="mdxType",m={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},y=r.forwardRef((function(e,n){var t=e.components,o=e.mdxType,a=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),u=p(t),y=o,d=u["".concat(l,".").concat(y)]||u[y]||m[y]||a;return t?r.createElement(d,i(i({ref:n},c),{},{components:t})):r.createElement(d,i({ref:n},c))}));function d(e,n){var t=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var a=t.length,i=new Array(a);i[0]=y;var s={};for(var l in n)hasOwnProperty.call(n,l)&&(s[l]=n[l]);s.originalType=e,s[u]="string"==typeof e?e:o,i[1]=s;for(var p=2;p<a;p++)i[p]=t[p];return r.createElement.apply(null,i)}return r.createElement.apply(null,t)}y.displayName="MDXCreateElement"},5759:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>i,default:()=>m,frontMatter:()=>a,metadata:()=>s,toc:()=>p});var r=t(8168),o=(t(6540),t(5680));const a={},i="Mini-shell Stops After Command",s={unversionedId:"Compute/Questions/mini-shell-stops-after-command",id:"Compute/Questions/mini-shell-stops-after-command",title:"Mini-shell Stops After Command",description:"Question Text",source:"@site/docs/Compute/Questions/mini-shell-stops-after-command.md",sourceDirName:"Compute/Questions",slug:"/Compute/Questions/mini-shell-stops-after-command",permalink:"/operating-systems/136/Compute/Questions/mini-shell-stops-after-command",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"`apache2` Document Root",permalink:"/operating-systems/136/Compute/Questions/apache2-strace"},next:{title:"Cause of `FileNotFoundError`",permalink:"/operating-systems/136/Compute/Questions/cause-of-file-not-found-error"}},l={},p=[{value:"Question Text",id:"question-text",level:2},{value:"Question Answers",id:"question-answers",level:2},{value:"Feedback",id:"feedback",level:2}],c={toc:p},u="wrapper";function m(e){let{components:n,...t}=e;return(0,o.yg)(u,(0,r.A)({},c,t,{components:n,mdxType:"MDXLayout"}),(0,o.yg)("h1",{id:"mini-shell-stops-after-command"},"Mini-shell Stops After Command"),(0,o.yg)("h2",{id:"question-text"},"Question Text"),(0,o.yg)("p",null,"Why does the ",(0,o.yg)("inlineCode",{parentName:"p"},"mini_shell")," process stop after executing a single command?"),(0,o.yg)("h2",{id:"question-answers"},"Question Answers"),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},"Because of an implementation error")),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},"Because the ",(0,o.yg)("inlineCode",{parentName:"li"},"mini_shell")," process doesn't exist anymore")),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("p",{parentName:"li"},"Because the OS sees that the command has ended and ends the ",(0,o.yg)("inlineCode",{parentName:"p"},"mini_shell")," process as well")),(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("p",{parentName:"li"},"Because ",(0,o.yg)("inlineCode",{parentName:"p"},"exec*()")," syscalls also kill the caller process when the callee ends"))),(0,o.yg)("h2",{id:"feedback"},"Feedback"),(0,o.yg)("p",null,"When you ",(0,o.yg)("inlineCode",{parentName:"p"},"exec*()")," any binary, the VAS current process is ",(0,o.yg)("strong",{parentName:"p"},"replaced")," by that corresponding to that binary.\nSo when you ",(0,o.yg)("inlineCode",{parentName:"p"},'exec*("ls")'),", for example, the ",(0,o.yg)("inlineCode",{parentName:"p"},"mini_shell")," process ",(0,o.yg)("em",{parentName:"p"},"becomes")," ",(0,o.yg)("inlineCode",{parentName:"p"},"ls"),".\nThere is no more ",(0,o.yg)("inlineCode",{parentName:"p"},"mini_shell")," past this point.\nSo when ",(0,o.yg)("inlineCode",{parentName:"p"},"ls")," ends, there is no ",(0,o.yg)("inlineCode",{parentName:"p"},"mini_shell")," process to continue its execution anymore."))}m.isMDXComponent=!0}}]);