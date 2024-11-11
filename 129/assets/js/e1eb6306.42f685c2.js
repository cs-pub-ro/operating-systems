"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[3207],{5680:(e,l,i)=>{i.d(l,{xA:()=>m,yg:()=>p});var n=i(6540);function d(e,l,i){return l in e?Object.defineProperty(e,l,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[l]=i,e}function I(e,l){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);l&&(n=n.filter((function(l){return Object.getOwnPropertyDescriptor(e,l).enumerable}))),i.push.apply(i,n)}return i}function t(e){for(var l=1;l<arguments.length;l++){var i=null!=arguments[l]?arguments[l]:{};l%2?I(Object(i),!0).forEach((function(l){d(e,l,i[l])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):I(Object(i)).forEach((function(l){Object.defineProperty(e,l,Object.getOwnPropertyDescriptor(i,l))}))}return e}function a(e,l){if(null==e)return{};var i,n,d=function(e,l){if(null==e)return{};var i,n,d={},I=Object.keys(e);for(n=0;n<I.length;n++)i=I[n],l.indexOf(i)>=0||(d[i]=e[i]);return d}(e,l);if(Object.getOwnPropertySymbols){var I=Object.getOwnPropertySymbols(e);for(n=0;n<I.length;n++)i=I[n],l.indexOf(i)>=0||Object.prototype.propertyIsEnumerable.call(e,i)&&(d[i]=e[i])}return d}var Z=n.createContext({}),c=function(e){var l=n.useContext(Z),i=l;return e&&(i="function"==typeof e?e(l):t(t({},l),e)),i},m=function(e){var l=c(e.components);return n.createElement(Z.Provider,{value:l},e.children)},b="mdxType",o={inlineCode:"code",wrapper:function(e){var l=e.children;return n.createElement(n.Fragment,{},l)}},s=n.forwardRef((function(e,l){var i=e.components,d=e.mdxType,I=e.originalType,Z=e.parentName,m=a(e,["components","mdxType","originalType","parentName"]),b=c(i),s=d,p=b["".concat(Z,".").concat(s)]||b[s]||o[s]||I;return i?n.createElement(p,t(t({ref:l},m),{},{components:i})):n.createElement(p,t({ref:l},m))}));function p(e,l){var i=arguments,d=l&&l.mdxType;if("string"==typeof e||d){var I=i.length,t=new Array(I);t[0]=s;var a={};for(var Z in l)hasOwnProperty.call(l,Z)&&(a[Z]=l[Z]);a.originalType=e,a[b]="string"==typeof e?e:d,t[1]=a;for(var c=2;c<I;c++)t[c]=i[c];return n.createElement.apply(null,t)}return n.createElement.apply(null,i)}s.displayName="MDXCreateElement"},6629:(e,l,i)=>{i.r(l),i.d(l,{assets:()=>Z,contentTitle:()=>t,default:()=>o,frontMatter:()=>I,metadata:()=>a,toc:()=>c});var n=i(8168),d=(i(6540),i(5680));const I={},t="exec()` Without `fork()",a={unversionedId:"Compute/Questions/exec-without-fork",id:"Compute/Questions/exec-without-fork",title:"exec()` Without `fork()",description:"Question Text",source:"@site/docs/Compute/Questions/exec-without-fork.md",sourceDirName:"Compute/Questions",slug:"/Compute/Questions/exec-without-fork",permalink:"/operating-systems/129/Compute/Questions/exec-without-fork",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"Who Calls `execve` in the Log of the Parent Process?",permalink:"/operating-systems/129/Compute/Questions/who-calls-execve-parent"},next:{title:"`create_sleepy` Process Ending",permalink:"/operating-systems/129/Compute/Questions/create-sleepy-process-ending"}},Z={},c=[{value:"Question Text",id:"question-text",level:2},{value:"Question Answers",id:"question-answers",level:2},{value:"Feedback",id:"feedback",level:2}],m={toc:c},b="wrapper";function o(e){let{components:l,...I}=e;return(0,d.yg)(b,(0,n.A)({},m,I,{components:l,mdxType:"MDXLayout"}),(0,d.yg)("h1",{id:"exec-without-fork"},(0,d.yg)("inlineCode",{parentName:"h1"},"exec()")," Without ",(0,d.yg)("inlineCode",{parentName:"h1"},"fork()")),(0,d.yg)("h2",{id:"question-text"},"Question Text"),(0,d.yg)("p",null,"We type the following command:"),(0,d.yg)("pre",null,(0,d.yg)("code",{parentName:"pre",className:"language-console"},"student@os:~$ ls\n")),(0,d.yg)("p",null,"Why does the shell ",(0,d.yg)("strong",{parentName:"p"},"NOT")," simply call ",(0,d.yg)("inlineCode",{parentName:"p"},'exec("/bin/ls")'),"?"),(0,d.yg)("p",null,(0,d.yg)("img",{alt:"Bash exec",src:i(1573).A})),(0,d.yg)("h2",{id:"question-answers"},"Question Answers"),(0,d.yg)("ul",null,(0,d.yg)("li",{parentName:"ul"},"Because ",(0,d.yg)("inlineCode",{parentName:"li"},"/bin/ls")," may be buggy or vulnerable and compromise the shell")),(0,d.yg)("ul",null,(0,d.yg)("li",{parentName:"ul"},"Because when ",(0,d.yg)("inlineCode",{parentName:"li"},"ls")," ends, the shell is closed")),(0,d.yg)("ul",null,(0,d.yg)("li",{parentName:"ul"},(0,d.yg)("p",{parentName:"li"},"Because the ",(0,d.yg)("inlineCode",{parentName:"p"},"ls")," and ",(0,d.yg)("inlineCode",{parentName:"p"},"bash")," processes must not share the same address space")),(0,d.yg)("li",{parentName:"ul"},(0,d.yg)("p",{parentName:"li"},"Because ",(0,d.yg)("inlineCode",{parentName:"p"},"bash")," needs to pass data to the ",(0,d.yg)("inlineCode",{parentName:"p"},"ls")," process"))),(0,d.yg)("h2",{id:"feedback"},"Feedback"),(0,d.yg)("p",null,"If the shell simply ",(0,d.yg)("inlineCode",{parentName:"p"},"exec"),"s ",(0,d.yg)("inlineCode",{parentName:"p"},'"/bin/ls"'),", the ",(0,d.yg)("inlineCode",{parentName:"p"},"bash")," process is entirely replaced by the ",(0,d.yg)("inlineCode",{parentName:"p"},"ls")," process.\nTherefore, when the ",(0,d.yg)("inlineCode",{parentName:"p"},"ls")," process ends, the old ",(0,d.yg)("inlineCode",{parentName:"p"},"bash")," process is no more and the terminal closes.\nThis way, each command would close the terminal."))}o.isMDXComponent=!0},1573:(e,l,i)=>{i.d(l,{A:()=>n});const n="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPCEtLSBEbyBub3QgZWRpdCB0aGlzIGZpbGUgd2l0aCBlZGl0b3JzIG90aGVyIHRoYW4gZGlhZ3JhbXMubmV0IC0tPgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZlcnNpb249IjEuMSIgd2lkdGg9IjMzM3B4IiBoZWlnaHQ9IjIyM3B4IiB2aWV3Qm94PSItMC41IC0wLjUgMzMzIDIyMyIgY29udGVudD0iJmx0O214ZmlsZSBob3N0PSZxdW90O2FwcC5kaWFncmFtcy5uZXQmcXVvdDsgbW9kaWZpZWQ9JnF1b3Q7MjAyMi0wNi0wNlQyMTowNDo1NC4yMzFaJnF1b3Q7IGFnZW50PSZxdW90OzUuMCAoWDExKSZxdW90OyBldGFnPSZxdW90O2ZEYjlrUU9wRldUd3dzNVd3NnNtJnF1b3Q7IHZlcnNpb249JnF1b3Q7MTguMS4yJnF1b3Q7IHR5cGU9JnF1b3Q7ZGV2aWNlJnF1b3Q7Jmd0OyZsdDtkaWFncmFtIGlkPSZxdW90O2RSU0prbFNQdkU3WWFyUF8yX1JPJnF1b3Q7IG5hbWU9JnF1b3Q7UGFnZS0xJnF1b3Q7Jmd0OzVWZkJjcHN3RVAwYVp0cERPb0NNN1J3ZEozWXZuZWswaHlaSEJXMUFFNEVjSVdLY1E3KzlFa2lBZ0xUSnhHblRxY2RqbzdmU1NucHZwVjA4dE02cXJjQzc5QXNud0x6UUo1V0h6cjB3REdaaDZPbXZUdzROc2d6OUJrZ0VKYVpUQjF6U1J6Q2c3VlpTQW9YVFVYTE9KTjI1WU16ekhHTHBZRmdJdm5lNzNYTG16cnJEQ1l5QXl4aXpNZnFkRXBtYVhVUitoMzhHbXFSMjVzQTNsZ3piemdZb1VrejR2Z2VoQ3crdEJlZXllY3FxTlRCTm51V2xHYmQ1d3RvdVRFQXVuek9ndkhqOHh1ODN5NnVyakc4VHNZM3ZUcTlQckpzSHpFcXpZN05hZWJBVUNGN21CTFNYd0VObis1Ukt1TnpoV0Z2M1NuU0ZwVEpqeG56TGMybFVWT3RCWjRVVS9BN1duSEdob0p6bjBJS1dUNlNROFdic3drQklxSHFRMmR3V2VBWlNIRlFYYTUwYm9rMmtXZDczbld3SUdTenRTZFoyeENaVWt0WjF4Nlo2TUlTK2dOd3BidWRNR3BZY2t1ZjNKYmVHazZMbWI2VTZLRXFxenFpZUV2MS9nNHZVZWxJTGE1dzFwbGVLUnhtelVua2hnbG1BZzNna29yTDQ5Y2VzdDRkdjZzK2JLYngwRlo2TkZRN0NDWVhuYnlWd05CS1lGY2M5UGdORjBHSUJOOHYzcTBoN0J2K2FKSXZmMzJlUWs1WE9ES29WTTF3VU5IWTE2QVRUZkNweXhPRktOejVGdG5uZHQ1MVhUdXRnV3hXVnZXR3FkVzM4NitkdWtHN1lNVVFkN0RaU1hpQ1l4Q0lCK1F0V1prMC9JRTZ5Rzh2YWt5MmFVTTFpQWhpVzlNRk5rVk5TbWhtK2NscmZkMjFWTUxpcGh6ZHd3VXNSZ3huVlQya0RSKzE5Ymh5aDA0R2pocGlSb3pxeTJtMi80b0lQLytWb08yYUFSZThxd01KQmdMVkYyVXNEckMxRGJhUXUvbkNBb1NkTENFSWZubDFCMUtYRG9JaUFDdUlQZlhoelEzUDFxek9ZQlQvMnFveDZ2aWVLREpVdHBCdlZrMlZmUDVrWkNET2E1UHBvcUlnRGhaL3AzRU5WK2IweWhvd1NvcWVaVEp6dTJaa3VQWStjOGRvUXRhRVZQRFBqb1Rlck1rOUhNVkxJa3VndHpueXVabHY5OEVLVkFQeUoydVEvRWc0TmpuSVVqWFZiSEVjMzFleGU2NXFyb0hzNVJoYy9BUT09Jmx0Oy9kaWFncmFtJmd0OyZsdDsvbXhmaWxlJmd0OyI+PGRlZnMvPjxnPjxyZWN0IHg9IjEiIHk9IjEiIHdpZHRoPSIzMzAiIGhlaWdodD0iMjIwIiByeD0iMzMiIHJ5PSIzMyIgZmlsbD0icmdiKDI1NSwgMjU1LCAyNTUpIiBzdHJva2U9Im5vbmUiIHBvaW50ZXItZXZlbnRzPSJhbGwiLz48cmVjdCB4PSIyMSIgeT0iMjEiIHdpZHRoPSIxMjAiIGhlaWdodD0iNjAiIHJ4PSI5IiByeT0iOSIgZmlsbD0iI2U0MWExYyIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjMiIHBvaW50ZXItZXZlbnRzPSJhbGwiLz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMC41IC0wLjUpIj48c3dpdGNoPjxmb3JlaWduT2JqZWN0IHN0eWxlPSJvdmVyZmxvdzogdmlzaWJsZTsgdGV4dC1hbGlnbjogbGVmdDsiIHBvaW50ZXItZXZlbnRzPSJub25lIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiByZXF1aXJlZEZlYXR1cmVzPSJodHRwOi8vd3d3LnczLm9yZy9UUi9TVkcxMS9mZWF0dXJlI0V4dGVuc2liaWxpdHkiPjxkaXYgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWwiIHN0eWxlPSJkaXNwbGF5OiBmbGV4OyBhbGlnbi1pdGVtczogdW5zYWZlIGNlbnRlcjsganVzdGlmeS1jb250ZW50OiB1bnNhZmUgY2VudGVyOyB3aWR0aDogMTE4cHg7IGhlaWdodDogMXB4OyBwYWRkaW5nLXRvcDogNTFweDsgbWFyZ2luLWxlZnQ6IDIycHg7Ij48ZGl2IHN0eWxlPSJib3gtc2l6aW5nOiBib3JkZXItYm94OyBmb250LXNpemU6IDBweDsgdGV4dC1hbGlnbjogY2VudGVyOyIgZGF0YS1kcmF3aW8tY29sb3JzPSJjb2xvcjogI0ZGRkZGRjsgIj48ZGl2IHN0eWxlPSJkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IGZvbnQtc2l6ZTogMTJweDsgZm9udC1mYW1pbHk6IEhlbHZldGljYTsgY29sb3I6IHJnYigyNTUsIDI1NSwgMjU1KTsgbGluZS1oZWlnaHQ6IDEuMjsgcG9pbnRlci1ldmVudHM6IGFsbDsgd2hpdGUtc3BhY2U6IG5vcm1hbDsgb3ZlcmZsb3ctd3JhcDogbm9ybWFsOyI+PGZvbnQgc3R5bGU9ImZvbnQtc2l6ZTogMjBweCI+YmFzaDwvZm9udD48L2Rpdj48L2Rpdj48L2Rpdj48L2ZvcmVpZ25PYmplY3Q+PHRleHQgeD0iODEiIHk9IjU1IiBmaWxsPSIjRkZGRkZGIiBmb250LWZhbWlseT0iSGVsdmV0aWNhIiBmb250LXNpemU9IjEycHgiIHRleHQtYW5jaG9yPSJtaWRkbGUiPmJhc2g8L3RleHQ+PC9zd2l0Y2g+PC9nPjxyZWN0IHg9IjIxIiB5PSIxNDEiIHdpZHRoPSIxMjAiIGhlaWdodD0iNjAiIHJ4PSI5IiByeT0iOSIgZmlsbD0iIzM3N2ViOCIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjMiIHBvaW50ZXItZXZlbnRzPSJhbGwiLz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMC41IC0wLjUpIj48c3dpdGNoPjxmb3JlaWduT2JqZWN0IHN0eWxlPSJvdmVyZmxvdzogdmlzaWJsZTsgdGV4dC1hbGlnbjogbGVmdDsiIHBvaW50ZXItZXZlbnRzPSJub25lIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiByZXF1aXJlZEZlYXR1cmVzPSJodHRwOi8vd3d3LnczLm9yZy9UUi9TVkcxMS9mZWF0dXJlI0V4dGVuc2liaWxpdHkiPjxkaXYgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWwiIHN0eWxlPSJkaXNwbGF5OiBmbGV4OyBhbGlnbi1pdGVtczogdW5zYWZlIGNlbnRlcjsganVzdGlmeS1jb250ZW50OiB1bnNhZmUgY2VudGVyOyB3aWR0aDogMTE4cHg7IGhlaWdodDogMXB4OyBwYWRkaW5nLXRvcDogMTcxcHg7IG1hcmdpbi1sZWZ0OiAyMnB4OyI+PGRpdiBzdHlsZT0iYm94LXNpemluZzogYm9yZGVyLWJveDsgZm9udC1zaXplOiAwcHg7IHRleHQtYWxpZ246IGNlbnRlcjsiIGRhdGEtZHJhd2lvLWNvbG9ycz0iY29sb3I6ICNGRkZGRkY7ICI+PGRpdiBzdHlsZT0iZGlzcGxheTogaW5saW5lLWJsb2NrOyBmb250LXNpemU6IDIwcHg7IGZvbnQtZmFtaWx5OiBIZWx2ZXRpY2E7IGNvbG9yOiByZ2IoMjU1LCAyNTUsIDI1NSk7IGxpbmUtaGVpZ2h0OiAxLjI7IHBvaW50ZXItZXZlbnRzOiBhbGw7IHdoaXRlLXNwYWNlOiBub3JtYWw7IG92ZXJmbG93LXdyYXA6IG5vcm1hbDsiPmxzPC9kaXY+PC9kaXY+PC9kaXY+PC9mb3JlaWduT2JqZWN0Pjx0ZXh0IHg9IjgxIiB5PSIxNzciIGZpbGw9IiNGRkZGRkYiIGZvbnQtZmFtaWx5PSJIZWx2ZXRpY2EiIGZvbnQtc2l6ZT0iMjBweCIgdGV4dC1hbmNob3I9Im1pZGRsZSI+bHM8L3RleHQ+PC9zd2l0Y2g+PC9nPjxwYXRoIGQ9Ik0gODEgODEgTCA4MSAxMzAuOSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2IoMCwgMCwgMCkiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBwb2ludGVyLWV2ZW50cz0ic3Ryb2tlIi8+PHBhdGggZD0iTSA4MSAxMzcuNjUgTCA3Ni41IDEyOC42NSBMIDgxIDEzMC45IEwgODUuNSAxMjguNjUgWiIgZmlsbD0icmdiKDAsIDAsIDApIiBzdHJva2U9InJnYigwLCAwLCAwKSIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHBvaW50ZXItZXZlbnRzPSJhbGwiLz48cmVjdCB4PSI5MSIgeT0iOTEiIHdpZHRoPSIxMjAiIGhlaWdodD0iMzAiIGZpbGw9Im5vbmUiIHN0cm9rZT0ibm9uZSIgcG9pbnRlci1ldmVudHM9ImFsbCIvPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0wLjUgLTAuNSkiPjxzd2l0Y2g+PGZvcmVpZ25PYmplY3Qgc3R5bGU9Im92ZXJmbG93OiB2aXNpYmxlOyB0ZXh0LWFsaWduOiBsZWZ0OyIgcG9pbnRlci1ldmVudHM9Im5vbmUiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHJlcXVpcmVkRmVhdHVyZXM9Imh0dHA6Ly93d3cudzMub3JnL1RSL1NWRzExL2ZlYXR1cmUjRXh0ZW5zaWJpbGl0eSI+PGRpdiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbCIgc3R5bGU9ImRpc3BsYXk6IGZsZXg7IGFsaWduLWl0ZW1zOiB1bnNhZmUgY2VudGVyOyBqdXN0aWZ5LWNvbnRlbnQ6IHVuc2FmZSBjZW50ZXI7IHdpZHRoOiAxMThweDsgaGVpZ2h0OiAxcHg7IHBhZGRpbmctdG9wOiAxMDZweDsgbWFyZ2luLWxlZnQ6IDkycHg7Ij48ZGl2IHN0eWxlPSJib3gtc2l6aW5nOiBib3JkZXItYm94OyBmb250LXNpemU6IDBweDsgdGV4dC1hbGlnbjogY2VudGVyOyIgZGF0YS1kcmF3aW8tY29sb3JzPSJjb2xvcjogcmdiKDAsIDAsIDApOyAiPjxkaXYgc3R5bGU9ImRpc3BsYXk6IGlubGluZS1ibG9jazsgZm9udC1zaXplOiAyMHB4OyBmb250LWZhbWlseTogSGVsdmV0aWNhOyBjb2xvcjogcmdiKDAsIDAsIDApOyBsaW5lLWhlaWdodDogMS4yOyBwb2ludGVyLWV2ZW50czogYWxsOyB3aGl0ZS1zcGFjZTogbm9ybWFsOyBvdmVyZmxvdy13cmFwOiBub3JtYWw7Ij48ZGl2IHN0eWxlPSJmb250LXNpemU6IDIwcHg7Ij5leGVjKCIvYmluL2xzIik8L2Rpdj48L2Rpdj48L2Rpdj48L2Rpdj48L2ZvcmVpZ25PYmplY3Q+PHRleHQgeD0iMTUxIiB5PSIxMTIiIGZpbGw9InJnYigwLCAwLCAwKSIgZm9udC1mYW1pbHk9IkhlbHZldGljYSIgZm9udC1zaXplPSIyMHB4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5leGVjKCIvYmluL2wuLi48L3RleHQ+PC9zd2l0Y2g+PC9nPjxyZWN0IHg9IjE1MSIgeT0iMzYiIHdpZHRoPSIxNzAiIGhlaWdodD0iMzAiIGZpbGw9Im5vbmUiIHN0cm9rZT0ibm9uZSIgcG9pbnRlci1ldmVudHM9ImFsbCIvPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0wLjUgLTAuNSkiPjxzd2l0Y2g+PGZvcmVpZ25PYmplY3Qgc3R5bGU9Im92ZXJmbG93OiB2aXNpYmxlOyB0ZXh0LWFsaWduOiBsZWZ0OyIgcG9pbnRlci1ldmVudHM9Im5vbmUiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHJlcXVpcmVkRmVhdHVyZXM9Imh0dHA6Ly93d3cudzMub3JnL1RSL1NWRzExL2ZlYXR1cmUjRXh0ZW5zaWJpbGl0eSI+PGRpdiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbCIgc3R5bGU9ImRpc3BsYXk6IGZsZXg7IGFsaWduLWl0ZW1zOiB1bnNhZmUgY2VudGVyOyBqdXN0aWZ5LWNvbnRlbnQ6IHVuc2FmZSBjZW50ZXI7IHdpZHRoOiAxNjhweDsgaGVpZ2h0OiAxcHg7IHBhZGRpbmctdG9wOiA1MXB4OyBtYXJnaW4tbGVmdDogMTUycHg7Ij48ZGl2IHN0eWxlPSJib3gtc2l6aW5nOiBib3JkZXItYm94OyBmb250LXNpemU6IDBweDsgdGV4dC1hbGlnbjogY2VudGVyOyIgZGF0YS1kcmF3aW8tY29sb3JzPSJjb2xvcjogcmdiKDAsIDAsIDApOyAiPjxkaXYgc3R5bGU9ImRpc3BsYXk6IGlubGluZS1ibG9jazsgZm9udC1zaXplOiAyMHB4OyBmb250LWZhbWlseTogSGVsdmV0aWNhOyBjb2xvcjogcmdiKDAsIDAsIDApOyBsaW5lLWhlaWdodDogMS4yOyBwb2ludGVyLWV2ZW50czogYWxsOyB3aGl0ZS1zcGFjZTogbm9ybWFsOyBvdmVyZmxvdy13cmFwOiBub3JtYWw7Ij5zdHVkZW50QG9zOn4kIGxzPC9kaXY+PC9kaXY+PC9kaXY+PC9mb3JlaWduT2JqZWN0Pjx0ZXh0IHg9IjIzNiIgeT0iNTciIGZpbGw9InJnYigwLCAwLCAwKSIgZm9udC1mYW1pbHk9IkhlbHZldGljYSIgZm9udC1zaXplPSIyMHB4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5zdHVkZW50QG9zOn4kIGxzPC90ZXh0Pjwvc3dpdGNoPjwvZz48L2c+PHN3aXRjaD48ZyByZXF1aXJlZEZlYXR1cmVzPSJodHRwOi8vd3d3LnczLm9yZy9UUi9TVkcxMS9mZWF0dXJlI0V4dGVuc2liaWxpdHkiLz48YSB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLC01KSIgeGxpbms6aHJlZj0iaHR0cHM6Ly93d3cuZGlhZ3JhbXMubmV0L2RvYy9mYXEvc3ZnLWV4cG9ydC10ZXh0LXByb2JsZW1zIiB0YXJnZXQ9Il9ibGFuayI+PHRleHQgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMHB4IiB4PSI1MCUiIHk9IjEwMCUiPlRleHQgaXMgbm90IFNWRyAtIGNhbm5vdCBkaXNwbGF5PC90ZXh0PjwvYT48L3N3aXRjaD48L3N2Zz4="}}]);