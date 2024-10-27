"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[4422],{5680:(e,n,t)=>{t.d(n,{xA:()=>u,yg:()=>m});var r=t(6540);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function s(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var o=r.createContext({}),p=function(e){var n=r.useContext(o),t=n;return e&&(t="function"==typeof e?e(n):s(s({},n),e)),t},u=function(e){var n=p(e.components);return r.createElement(o.Provider,{value:n},e.children)},c="mdxType",y={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},g=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,i=e.originalType,o=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),c=p(t),g=a,m=c["".concat(o,".").concat(g)]||c[g]||y[g]||i;return t?r.createElement(m,s(s({ref:n},u),{},{components:t})):r.createElement(m,s({ref:n},u))}));function m(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var i=t.length,s=new Array(i);s[0]=g;var l={};for(var o in n)hasOwnProperty.call(n,o)&&(l[o]=n[o]);l.originalType=e,l[c]="string"==typeof e?e:a,s[1]=l;for(var p=2;p<i;p++)s[p]=t[p];return r.createElement.apply(null,s)}return r.createElement.apply(null,t)}g.displayName="MDXCreateElement"},7651:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>o,contentTitle:()=>s,default:()=>y,frontMatter:()=>i,metadata:()=>l,toc:()=>p});var r=t(8168),a=(t(6540),t(5680));const i={},s="Valgrind Leaks",l={unversionedId:"Data/Questions/valgrind-leaks",id:"Data/Questions/valgrind-leaks",title:"Valgrind Leaks",description:"Question Text",source:"@site/docs/Data/Questions/valgrind-leaks.md",sourceDirName:"Data/Questions",slug:"/Data/Questions/valgrind-leaks",permalink:"/operating-systems/74/Data/Questions/valgrind-leaks",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"Memory Leaks",permalink:"/operating-systems/74/Data/Questions/memory-leaks"},next:{title:"Bypass Canary",permalink:"/operating-systems/74/Data/Questions/bypass-canary"}},o={},p=[{value:"Question Text",id:"question-text",level:2},{value:"Question Answers",id:"question-answers",level:2},{value:"Feedback",id:"feedback",level:2}],u={toc:p},c="wrapper";function y(e){let{components:n,...t}=e;return(0,a.yg)(c,(0,r.A)({},u,t,{components:n,mdxType:"MDXLayout"}),(0,a.yg)("h1",{id:"valgrind-leaks"},"Valgrind Leaks"),(0,a.yg)("h2",{id:"question-text"},"Question Text"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-c"},'struct student {\n    char *name;\n    int age;\n}\n\nstruct student *s = malloc(sizeof(*s));\ns->name = strdup("Reginald");\n// ...\nfree(s);\n')),(0,a.yg)("p",null,"What are the leaks in the above c program?"),(0,a.yg)("h2",{id:"question-answers"},"Question Answers"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},"There are no leaks")),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},(0,a.yg)("inlineCode",{parentName:"p"},"s->name")," is ",(0,a.yg)("strong",{parentName:"p"},"definitely lost")))),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("inlineCode",{parentName:"li"},"s->name")," is ",(0,a.yg)("strong",{parentName:"li"},"indirectly lost"))),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("inlineCode",{parentName:"li"},"s->name")," is ",(0,a.yg)("strong",{parentName:"li"},"still reachable"))),(0,a.yg)("h2",{id:"feedback"},"Feedback"),(0,a.yg)("p",null,(0,a.yg)("inlineCode",{parentName:"p"},"strdup()")," allocates memory for a string so the returned pointer must be freed.\nFreeing ",(0,a.yg)("inlineCode",{parentName:"p"},"s")," will leave us unable to free ",(0,a.yg)("inlineCode",{parentName:"p"},"s->name"),", so ",(0,a.yg)("inlineCode",{parentName:"p"},"s->name")," is ",(0,a.yg)("strong",{parentName:"p"},"indirectly lost"),".\nFind more about valgrind leak categories ",(0,a.yg)("a",{parentName:"p",href:"https://valgrind.org/docs/manual/faq.html#faq.deflost"},"here"),"."))}y.isMDXComponent=!0}}]);