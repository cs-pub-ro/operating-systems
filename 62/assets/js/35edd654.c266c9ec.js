"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[8065],{5680:(e,n,t)=>{t.d(n,{xA:()=>p,yg:()=>d});var r=t(6540);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function l(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?l(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):l(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function o(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},l=Object.keys(e);for(r=0;r<l.length;r++)t=l[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)t=l[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var s=r.createContext({}),u=function(e){var n=r.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},p=function(e){var n=u(e.components);return r.createElement(s.Provider,{value:n},e.children)},c="mdxType",g={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},y=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,l=e.originalType,s=e.parentName,p=o(e,["components","mdxType","originalType","parentName"]),c=u(t),y=a,d=c["".concat(s,".").concat(y)]||c[y]||g[y]||l;return t?r.createElement(d,i(i({ref:n},p),{},{components:t})):r.createElement(d,i({ref:n},p))}));function d(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var l=t.length,i=new Array(l);i[0]=y;var o={};for(var s in n)hasOwnProperty.call(n,s)&&(o[s]=n[s]);o.originalType=e,o[c]="string"==typeof e?e:a,i[1]=o;for(var u=2;u<l;u++)i[u]=t[u];return r.createElement.apply(null,i)}return r.createElement.apply(null,t)}y.displayName="MDXCreateElement"},1163:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>s,contentTitle:()=>i,default:()=>g,frontMatter:()=>l,metadata:()=>o,toc:()=>u});var r=t(8168),a=(t(6540),t(5680));const l={},i="Valgrind Leaks",o={unversionedId:"Lab/Data/quiz/valgrind-leaks",id:"Lab/Data/quiz/valgrind-leaks",title:"Valgrind Leaks",description:"Question Text",source:"@site/docs/Lab/Data/quiz/valgrind-leaks.md",sourceDirName:"Lab/Data/quiz",slug:"/Lab/Data/quiz/valgrind-leaks",permalink:"/operating-systems/62/Lab/Data/quiz/valgrind-leaks",draft:!1,tags:[],version:"current",frontMatter:{}},s={},u=[{value:"Question Text",id:"question-text",level:2},{value:"Question Answers",id:"question-answers",level:2},{value:"Feedback",id:"feedback",level:2}],p={toc:u},c="wrapper";function g(e){let{components:n,...t}=e;return(0,a.yg)(c,(0,r.A)({},p,t,{components:n,mdxType:"MDXLayout"}),(0,a.yg)("h1",{id:"valgrind-leaks"},"Valgrind Leaks"),(0,a.yg)("h2",{id:"question-text"},"Question Text"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-c"},'struct student {\n    char *name;\n    int age;\n}\n\nstruct student *s = malloc(sizeof(*s));\ns->name = strdup("Reginald");\n// ...\nfree(s);\n')),(0,a.yg)("p",null,"What are the leaks in the above c program?"),(0,a.yg)("h2",{id:"question-answers"},"Question Answers"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},"There are no leaks")),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},(0,a.yg)("inlineCode",{parentName:"p"},"s->name")," is ",(0,a.yg)("strong",{parentName:"p"},"definitely lost")))),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("inlineCode",{parentName:"li"},"s->name")," is ",(0,a.yg)("strong",{parentName:"li"},"indirectly lost"))),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("inlineCode",{parentName:"li"},"s->name")," is ",(0,a.yg)("strong",{parentName:"li"},"still reachable"))),(0,a.yg)("h2",{id:"feedback"},"Feedback"),(0,a.yg)("p",null,(0,a.yg)("inlineCode",{parentName:"p"},"strdup()")," allocates memory for a string so the returned pointer must be freed.\nFreeing ",(0,a.yg)("inlineCode",{parentName:"p"},"s")," will leave us unable to free ",(0,a.yg)("inlineCode",{parentName:"p"},"s->name"),", so ",(0,a.yg)("inlineCode",{parentName:"p"},"s->name")," is ",(0,a.yg)("strong",{parentName:"p"},"indirectly lost"),".\nFind more about valgrind leak categories ",(0,a.yg)("a",{parentName:"p",href:"https://valgrind.org/docs/manual/faq.html#faq.deflost"},"here"),"."))}g.isMDXComponent=!0}}]);