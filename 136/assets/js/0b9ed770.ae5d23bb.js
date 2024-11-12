"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[6001],{5680:(e,n,a)=>{a.d(n,{xA:()=>c,yg:()=>d});var t=a(6540);function i(e,n,a){return n in e?Object.defineProperty(e,n,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[n]=a,e}function r(e,n){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);n&&(t=t.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),a.push.apply(a,t)}return a}function o(e){for(var n=1;n<arguments.length;n++){var a=null!=arguments[n]?arguments[n]:{};n%2?r(Object(a),!0).forEach((function(n){i(e,n,a[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):r(Object(a)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(a,n))}))}return e}function s(e,n){if(null==e)return{};var a,t,i=function(e,n){if(null==e)return{};var a,t,i={},r=Object.keys(e);for(t=0;t<r.length;t++)a=r[t],n.indexOf(a)>=0||(i[a]=e[a]);return i}(e,n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(t=0;t<r.length;t++)a=r[t],n.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(i[a]=e[a])}return i}var l=t.createContext({}),p=function(e){var n=t.useContext(l),a=n;return e&&(a="function"==typeof e?e(n):o(o({},n),e)),a},c=function(e){var n=p(e.components);return t.createElement(l.Provider,{value:n},e.children)},m="mdxType",u={inlineCode:"code",wrapper:function(e){var n=e.children;return t.createElement(t.Fragment,{},n)}},y=t.forwardRef((function(e,n){var a=e.components,i=e.mdxType,r=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),m=p(a),y=i,d=m["".concat(l,".").concat(y)]||m[y]||u[y]||r;return a?t.createElement(d,o(o({ref:n},c),{},{components:a})):t.createElement(d,o({ref:n},c))}));function d(e,n){var a=arguments,i=n&&n.mdxType;if("string"==typeof e||i){var r=a.length,o=new Array(r);o[0]=y;var s={};for(var l in n)hasOwnProperty.call(n,l)&&(s[l]=n[l]);s.originalType=e,s[m]="string"==typeof e?e:i,o[1]=s;for(var p=2;p<r;p++)o[p]=a[p];return t.createElement.apply(null,o)}return t.createElement.apply(null,a)}y.displayName="MDXCreateElement"},5255:(e,n,a)=>{a.r(n),a.d(n,{assets:()=>l,contentTitle:()=>o,default:()=>u,frontMatter:()=>r,metadata:()=>s,toc:()=>p});var t=a(8168),i=(a(6540),a(5680));const r={},o="Database Application",s={unversionedId:"Exams/Database Application/database-application",id:"Exams/Database Application/database-application",title:"Database Application",description:"Scenario",source:"@site/docs/Exams/Database Application/database-application.md",sourceDirName:"Exams/Database Application",slug:"/Exams/Database Application/database-application",permalink:"/operating-systems/136/Exams/Database Application/database-application",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"Benchmarking Application",permalink:"/operating-systems/136/Exams/Benchmarking Application/benchmarking-application"},next:{title:"Application Investigator",permalink:"/operating-systems/136/Exams/Application Investigator/application-investigator"}},l={},p=[{value:"Scenario",id:"scenario",level:2},{value:"Questions",id:"questions",level:2}],c={toc:p},m="wrapper";function u(e){let{components:n,...a}=e;return(0,i.yg)(m,(0,t.A)({},c,a,{components:n,mdxType:"MDXLayout"}),(0,i.yg)("h1",{id:"database-application"},"Database Application"),(0,i.yg)("h2",{id:"scenario"},"Scenario"),(0,i.yg)("p",null,"We aim to run a database application in a containerized solution (Docker, Podman) for ease of deployment and isolation.\nRunning in a container involves isolating the filesystem (and necessary files), necessary processes, computing resources (CPU, memory, disk), and the network portion.\nThe database application will be accessible from outside the container through a virtual network."),(0,i.yg)("p",null,'Answer the following questions with "True" or "False" and justify the answer.\nJustification should be simple, 2-3 sentences for each answer.'),(0,i.yg)("h2",{id:"questions"},"Questions"),(0,i.yg)("ol",null,(0,i.yg)("li",{parentName:"ol"},(0,i.yg)("p",{parentName:"li"},"The database application can only be implemented as a static executable, not a dynamic one.\nAnswer: False")),(0,i.yg)("li",{parentName:"ol"},(0,i.yg)("p",{parentName:"li"},"Within the container, the application will use virtual memory mechanisms.\nAnswer: True")),(0,i.yg)("li",{parentName:"ol"},(0,i.yg)("p",{parentName:"li"},"Within the container, the application can use the ",(0,i.yg)("inlineCode",{parentName:"p"},"fork()")," system call.\nAnswer: True")),(0,i.yg)("li",{parentName:"ol"},(0,i.yg)("p",{parentName:"li"},"The database application can use pipes to communicate outside the container.\nAnswer: False")),(0,i.yg)("li",{parentName:"ol"},(0,i.yg)("p",{parentName:"li"},"Information from the application's filesystem is lost when the container terminates.\nAnswer: False")),(0,i.yg)("li",{parentName:"ol"},(0,i.yg)("p",{parentName:"li"},"The application can be multi-threaded.\nAnswer: True")),(0,i.yg)("li",{parentName:"ol"},(0,i.yg)("p",{parentName:"li"},"For synchronization, the application can only use mutexes, not spinlocks.\nAnswer: False")),(0,i.yg)("li",{parentName:"ol"},(0,i.yg)("p",{parentName:"li"},"Processes within the container do have PIDs.\nAnswer: False")),(0,i.yg)("li",{parentName:"ol"},(0,i.yg)("p",{parentName:"li"},"The application in the container can have buffer overflow vulnerabilities.\nAnswer: True")),(0,i.yg)("li",{parentName:"ol"},(0,i.yg)("p",{parentName:"li"},"Memory within the container cannot be visible from outside the container, even by a privileged account.\nAnswer: False")),(0,i.yg)("li",{parentName:"ol"},(0,i.yg)("p",{parentName:"li"},"The application exclusively spends time in user mode, not in kernel mode.\nAnswer: False"))))}u.isMDXComponent=!0}}]);