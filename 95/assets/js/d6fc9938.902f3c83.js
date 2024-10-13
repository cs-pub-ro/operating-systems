"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[4711],{5680:(e,n,a)=>{a.d(n,{xA:()=>c,yg:()=>h});var t=a(6540);function r(e,n,a){return n in e?Object.defineProperty(e,n,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[n]=a,e}function i(e,n){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);n&&(t=t.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),a.push.apply(a,t)}return a}function o(e){for(var n=1;n<arguments.length;n++){var a=null!=arguments[n]?arguments[n]:{};n%2?i(Object(a),!0).forEach((function(n){r(e,n,a[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(a,n))}))}return e}function p(e,n){if(null==e)return{};var a,t,r=function(e,n){if(null==e)return{};var a,t,r={},i=Object.keys(e);for(t=0;t<i.length;t++)a=i[t],n.indexOf(a)>=0||(r[a]=e[a]);return r}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(t=0;t<i.length;t++)a=i[t],n.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var l=t.createContext({}),s=function(e){var n=t.useContext(l),a=n;return e&&(a="function"==typeof e?e(n):o(o({},n),e)),a},c=function(e){var n=s(e.components);return t.createElement(l.Provider,{value:n},e.children)},m="mdxType",u={inlineCode:"code",wrapper:function(e){var n=e.children;return t.createElement(t.Fragment,{},n)}},g=t.forwardRef((function(e,n){var a=e.components,r=e.mdxType,i=e.originalType,l=e.parentName,c=p(e,["components","mdxType","originalType","parentName"]),m=s(a),g=r,h=m["".concat(l,".").concat(g)]||m[g]||u[g]||i;return a?t.createElement(h,o(o({ref:n},c),{},{components:a})):t.createElement(h,o({ref:n},c))}));function h(e,n){var a=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var i=a.length,o=new Array(i);o[0]=g;var p={};for(var l in n)hasOwnProperty.call(n,l)&&(p[l]=n[l]);p.originalType=e,p[m]="string"==typeof e?e:r,o[1]=p;for(var s=2;s<i;s++)o[s]=a[s];return t.createElement.apply(null,o)}return t.createElement.apply(null,a)}g.displayName="MDXCreateElement"},295:(e,n,a)=>{a.r(n),a.d(n,{assets:()=>l,contentTitle:()=>o,default:()=>u,frontMatter:()=>i,metadata:()=>p,toc:()=>s});var t=a(8168),r=(a(6540),a(5680));const i={},o="Benchmarking Application",p={unversionedId:"Exams/Benchmarking Application/benchmarking-application",id:"Exams/Benchmarking Application/benchmarking-application",title:"Benchmarking Application",description:"Scenario",source:"@site/docs/Exams/Benchmarking Application/benchmarking-application.md",sourceDirName:"Exams/Benchmarking Application",slug:"/Exams/Benchmarking Application/benchmarking-application",permalink:"/operating-systems/95/Exams/Benchmarking Application/benchmarking-application",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"Aggregator Application",permalink:"/operating-systems/95/Exams/Aggregator Application/aggregator-application"},next:{title:"Database Application",permalink:"/operating-systems/95/Exams/Database Application/database-application"}},l={},s=[{value:"Scenario",id:"scenario",level:2},{value:"Questions",id:"questions",level:2}],c={toc:s},m="wrapper";function u(e){let{components:n,...a}=e;return(0,r.yg)(m,(0,t.A)({},c,a,{components:n,mdxType:"MDXLayout"}),(0,r.yg)("h1",{id:"benchmarking-application"},"Benchmarking Application"),(0,r.yg)("h2",{id:"scenario"},"Scenario"),(0,r.yg)("p",null,"We aim to implement a web application benchmarking solution.\nThis application will perform web client actions towards a remote web application to obtain metrics such as response time, scalability (how response time degrades with the number of simultaneous connections to the application), with variations for request or response size."),(0,r.yg)("p",null,'Answer the following questions with "True" or "False" and justify the answer.\nJustification should be simple, 2-3 sentences for each answer.'),(0,r.yg)("h2",{id:"questions"},"Questions"),(0,r.yg)("ol",null,(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},"The benchmarking application uses network sockets.\nAnswer: True")),(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},"The benchmarking application is required to be multi-threaded.\nAnswer: False")),(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},"The benchmarking application has more voluntary context switches than involuntary ones.\nAnswer: True")),(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},"The benchmarking application must run as a privileged user.\nAnswer: False")),(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},"Two benchmarking applications can run simultaneously on the same system.\nAnswer: True")),(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},"The benchmarking application heavily uses the system's disk/storage.\nAnswer: False")),(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},"The benchmarking application must be implemented in a compiled language, not an interpreted one.\nAnswer: False")),(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},"The benchmarking application can be implemented as a static executable.\nAnswer: True")),(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},"Running the benchmarking application on the same station as the web application provides better results than remote testing.\nAnswer: True")),(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},"With the necessary modifications, the application can handle both HTTP and HTTPS connections.\nAnswer: True")),(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},"The benchmarking application can only measure open-source web applications + open-source web servers (with available sources).\nAnswer: False"))))}u.isMDXComponent=!0}}]);