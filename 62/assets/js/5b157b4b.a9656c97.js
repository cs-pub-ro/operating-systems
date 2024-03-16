"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[8393],{5680:(e,t,a)=>{a.d(t,{xA:()=>c,yg:()=>y});var n=a(6540);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function s(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},o=Object.keys(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var p=n.createContext({}),l=function(e){var t=n.useContext(p),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},c=function(e){var t=l(e.components);return n.createElement(p.Provider,{value:t},e.children)},m="mdxType",h={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},u=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,o=e.originalType,p=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),m=l(a),u=r,y=m["".concat(p,".").concat(u)]||m[u]||h[u]||o;return a?n.createElement(y,i(i({ref:t},c),{},{components:a})):n.createElement(y,i({ref:t},c))}));function y(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=a.length,i=new Array(o);i[0]=u;var s={};for(var p in t)hasOwnProperty.call(t,p)&&(s[p]=t[p]);s.originalType=e,s[m]="string"==typeof e?e:r,i[1]=s;for(var l=2;l<o;l++)i[l]=a[l];return n.createElement.apply(null,i)}return n.createElement.apply(null,a)}u.displayName="MDXCreateElement"},303:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>p,contentTitle:()=>i,default:()=>h,frontMatter:()=>o,metadata:()=>s,toc:()=>l});var n=a(8168),r=(a(6540),a(5680));const o={},i="Copy-on-Write",s={unversionedId:"Lab/Compute/copy-on-write",id:"Lab/Compute/copy-on-write",title:"Copy-on-Write",description:"So far, you know that the parent and child process have separate virtual address spaces.",source:"@site/docs/Lab/Compute/copy-on-write.md",sourceDirName:"Lab/Compute",slug:"/Lab/Compute/copy-on-write",permalink:"/operating-systems/62/Lab/Compute/copy-on-write",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"Usage of Processes and Threads in `apache2`",permalink:"/operating-systems/62/Lab/Compute/processes-threads-apache2"},next:{title:"Synchronization",permalink:"/operating-systems/62/Lab/Compute/synchronization"}},p={},l=[{value:"Practice",id:"practice",level:2}],c={toc:l},m="wrapper";function h(e){let{components:t,...o}=e;return(0,r.yg)(m,(0,n.A)({},c,o,{components:t,mdxType:"MDXLayout"}),(0,r.yg)("h1",{id:"copy-on-write"},"Copy-on-Write"),(0,r.yg)("p",null,'So far, you know that the parent and child process have separate virtual address spaces.\nBut how are they created, namely how are they "separated"?\nAnd what about the ',(0,r.yg)("strong",{parentName:"p"},"PAS (physical address space)"),"?\nOf course, we would like the stack of the parent, for example, to be physically distinct from that of the child, so they can execute different functions and use different local variables."),(0,r.yg)("p",null,"But should ",(0,r.yg)("strong",{parentName:"p"},"all")," memory sections from the PAS of the parent be distinct from that of the child?\nWhat about some read-only memory sections, such as ",(0,r.yg)("inlineCode",{parentName:"p"},".text")," and ",(0,r.yg)("inlineCode",{parentName:"p"},".rodata"),"?\nAnd what about the heap, where the child ",(0,r.yg)("em",{parentName:"p"},"may")," use some data previously written by the parent and then override it with its own data."),(0,r.yg)("p",null,"The answer to all of these questions is a core mechanism of multiprocess operating systems called ",(0,r.yg)("strong",{parentName:"p"},"Copy-on-Write"),".\nIt works according to one very simple principle:"),(0,r.yg)("blockquote",null,(0,r.yg)("p",{parentName:"blockquote"},"The VAS of the child process initially points to the same PAS as that of the parent.\nA (physical) frame is only duplicated by the child when it attempts to ",(0,r.yg)("strong",{parentName:"p"},"write")," data to it.")),(0,r.yg)("p",null,"This ensures that read-only sections remain shared, while writable sections are shared as long as their contents remain unchanged.\nWhen changes happen, the process making the change receives a unique frame as a modified copy of the original frame ",(0,r.yg)("em",{parentName:"p"},"on demand"),"."),(0,r.yg)("p",null,"In the image below, we have the state of the child and parent processes right after ",(0,r.yg)("inlineCode",{parentName:"p"},"fork()")," returns in both of them.\nSee how each has its own VAS, both of them being mapped to (mostly) the same PAS."),(0,r.yg)("p",null,(0,r.yg)("img",{alt:"Copy-on-Write",src:a(7124).A})),(0,r.yg)("p",null,"When one process writes data to a writeable page (in our case, the child writes to a heap page), the frame to which it corresponds is first duplicated.\nThen the process' page table points the page to the newly copied frame, as you can see in the image below."),(0,r.yg)("p",null,(0,r.yg)("img",{alt:"Copy-on-Write",src:a(6408).A})),(0,r.yg)("p",null,(0,r.yg)("strong",{parentName:"p"},"Be careful!"),"\nDo not confuse ",(0,r.yg)("strong",{parentName:"p"},"copy-on-write")," with ",(0,r.yg)("strong",{parentName:"p"},"demand paging"),".\nRemember from the ",(0,r.yg)("a",{parentName:"p",href:"../../../data/"},"Data chapter")," that ",(0,r.yg)("strong",{parentName:"p"},"demand paging")," means that when you allocate memory, the OS allocates virtual memory that remains unmapped to physical memory until it's used.\nOn the other hand, ",(0,r.yg)("strong",{parentName:"p"},"copy-on-write")," posits that the virtual memory is already mapped to some frames.\nThese frames are only duplicated when one of the processes attempts to write data to them."),(0,r.yg)("h2",{id:"practice"},"Practice"),(0,r.yg)("p",null,"Now let's see the copy-on-write mechanism in practice.\nKeep in mind that ",(0,r.yg)("inlineCode",{parentName:"p"},"fork()")," is a function used to create a process."),(0,r.yg)("p",null,"Open two terminals (or better: use ",(0,r.yg)("a",{parentName:"p",href:"https://github.com/tmux/tmux/wiki"},(0,r.yg)("inlineCode",{parentName:"a"},"tmux")),").\nIn one of them, compile and run the code in ",(0,r.yg)("inlineCode",{parentName:"p"},"support/fork-faults/fork_faults.c"),".\nAfter each time you press ",(0,r.yg)("inlineCode",{parentName:"p"},"Enter")," in the first terminal window, run the following command in the second window:"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-console"},"student@os:~/.../lab/support/fork-faults$ ps -o min_flt,maj_flt -p $(pidof fork_faults)\n")),(0,r.yg)("p",null,"It will show you the number of minor and major page faults performed by the ",(0,r.yg)("inlineCode",{parentName:"p"},"fork_faults")," process and its child."),(0,r.yg)("p",null,"To better understand minor and major page faults, go through the ",(0,r.yg)("a",{parentName:"p",href:"/operating-systems/62/Lab/Compute/arena#minor-and-major-page-faults"},"Minor and Major Page Faults")," excercise in Arena."),(0,r.yg)("p",null,(0,r.yg)("a",{parentName:"p",href:"/operating-systems/62/Lab/Compute/quiz/parent-faults-before-fork"},"Quiz 1")),(0,r.yg)("p",null,"Note that after ",(0,r.yg)("inlineCode",{parentName:"p"},"fork()"),"-ing, there is a second row in the output of ",(0,r.yg)("inlineCode",{parentName:"p"},"ps"),".\nThat corresponds to the child process.\nThe first one still corresponds to the parent."),(0,r.yg)("p",null,(0,r.yg)("a",{parentName:"p",href:"/operating-systems/62/Lab/Compute/quiz/child-faults-after-write"},"Quiz 2")),(0,r.yg)("p",null,"Now it should be clear how demand paging differs from copy-on-write.\nShared memory is a similar concept.\nIt's a way of marking certain allocated pages so that copy-on-write is disabled.\nAs you may imagine, changes made by the parent to this memory are visible to the child and vice-versa.\nYou can learn more about it in ",(0,r.yg)("a",{parentName:"p",href:"/operating-systems/62/Lab/Compute/arena#shared-memory"},"its dedicated section in the Arena"),"."))}h.isMDXComponent=!0},6408:(e,t,a)=>{a.d(t,{A:()=>n});const n=a.p+"assets/images/copy-on-write-final-2dfe1835636c0b38b11fed42b5b690d2.svg"},7124:(e,t,a)=>{a.d(t,{A:()=>n});const n=a.p+"assets/images/copy-on-write-initial-a3673d26b2087aaacf630bc556e0a6a8.svg"}}]);