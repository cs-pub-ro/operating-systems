"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[7560],{5680:(e,t,r)=>{r.d(t,{xA:()=>u,yg:()=>m});var n=r(6540);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var c=n.createContext({}),i=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},u=function(e){var t=i(e.components);return n.createElement(c.Provider,{value:t},e.children)},p="mdxType",y={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},g=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,c=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),p=i(r),g=o,m=p["".concat(c,".").concat(g)]||p[g]||y[g]||a;return r?n.createElement(m,l(l({ref:t},u),{},{components:r})):n.createElement(m,l({ref:t},u))}));function m(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,l=new Array(a);l[0]=g;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s[p]="string"==typeof e?e:o,l[1]=s;for(var i=2;i<a;i++)l[i]=r[i];return n.createElement.apply(null,l)}return n.createElement.apply(null,r)}g.displayName="MDXCreateElement"},1036:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>l,default:()=>y,frontMatter:()=>a,metadata:()=>s,toc:()=>i});var n=r(8168),o=(r(6540),r(5680));const a={},l="Operator Overloading",s={unversionedId:"Data/Questions/operators",id:"Data/Questions/operators",title:"Operator Overloading",description:"Question Text",source:"@site/docs/Data/Questions/operators.md",sourceDirName:"Data/Questions",slug:"/Data/Questions/operators",permalink:"/operating-systems/86/Data/Questions/operators",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"Page Allocation",permalink:"/operating-systems/86/Data/Questions/page-allocation"},next:{title:"Memory Leaks",permalink:"/operating-systems/86/Data/Questions/memory-leaks"}},c={},i=[{value:"Question Text",id:"question-text",level:2},{value:"Question Answers",id:"question-answers",level:2},{value:"Feedback",id:"feedback",level:2}],u={toc:i},p="wrapper";function y(e){let{components:t,...r}=e;return(0,o.yg)(p,(0,n.A)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,o.yg)("h1",{id:"operator-overloading"},"Operator Overloading"),(0,o.yg)("h2",{id:"question-text"},"Question Text"),(0,o.yg)("p",null,"How many constructor calls, copy constructor calls, assignment operator calls and destructor calls does the following program issue?"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-d"},"Obj quiz(Obj o1, Obj o2)\n{\n    o2 = o1;\n    return o2;\n}\nvoid main()\n{\n    Obj b = quiz(o1, o2);\n}\n")),(0,o.yg)("h2",{id:"question-answers"},"Question Answers"),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},"constructor calls = 0, copy constructor calls = 3, assignment operator calls = 1, destructor calls = 3")),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("p",{parentName:"li"},"constructor calls = 1, copy constructor calls = 2, assignment operator calls = 1, destructor calls = 2")),(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("p",{parentName:"li"},"constructor calls = 0, copy constructor calls = 2, assignment operator calls = 1, destructor calls = 2")),(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("p",{parentName:"li"},"constructor calls = 0, copy constructor calls = 3, assignment operator calls = 1, destructor calls = 1"))),(0,o.yg)("h2",{id:"feedback"},"Feedback"),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},"There are no constructor calls because there is no object construction when using ",(0,o.yg)("inlineCode",{parentName:"li"},"int"),"."),(0,o.yg)("li",{parentName:"ul"},"There are 3 copy constructor calls: for passing ",(0,o.yg)("inlineCode",{parentName:"li"},"o1"),", for passing ",(0,o.yg)("inlineCode",{parentName:"li"},"o2"),", and for returning ",(0,o.yg)("inlineCode",{parentName:"li"},"o2"),"."),(0,o.yg)("li",{parentName:"ul"},"There is 1 assignment operator call for ",(0,o.yg)("inlineCode",{parentName:"li"},"o2 = o1"),"."),(0,o.yg)("li",{parentName:"ul"},"There are 3 destructor calls, because each constructed object needs to be destroyed.")))}y.isMDXComponent=!0}}]);