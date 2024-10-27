"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[2334],{5680:(e,n,t)=>{t.d(n,{xA:()=>d,yg:()=>c});var a=t(6540);function i(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function r(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function l(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?r(Object(t),!0).forEach((function(n){i(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):r(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function s(e,n){if(null==e)return{};var t,a,i=function(e,n){if(null==e)return{};var t,a,i={},r=Object.keys(e);for(a=0;a<r.length;a++)t=r[a],n.indexOf(t)>=0||(i[t]=e[t]);return i}(e,n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)t=r[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}var o=a.createContext({}),p=function(e){var n=a.useContext(o),t=n;return e&&(t="function"==typeof e?e(n):l(l({},n),e)),t},d=function(e){var n=p(e.components);return a.createElement(o.Provider,{value:n},e.children)},u="mdxType",h={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},g=a.forwardRef((function(e,n){var t=e.components,i=e.mdxType,r=e.originalType,o=e.parentName,d=s(e,["components","mdxType","originalType","parentName"]),u=p(t),g=i,c=u["".concat(o,".").concat(g)]||u[g]||h[g]||r;return t?a.createElement(c,l(l({ref:n},d),{},{components:t})):a.createElement(c,l({ref:n},d))}));function c(e,n){var t=arguments,i=n&&n.mdxType;if("string"==typeof e||i){var r=t.length,l=new Array(r);l[0]=g;var s={};for(var o in n)hasOwnProperty.call(n,o)&&(s[o]=n[o]);s.originalType=e,s[u]="string"==typeof e?e:i,l[1]=s;for(var p=2;p<r;p++)l[p]=t[p];return a.createElement.apply(null,l)}return a.createElement.apply(null,t)}g.displayName="MDXCreateElement"},5173:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>o,contentTitle:()=>l,default:()=>h,frontMatter:()=>r,metadata:()=>s,toc:()=>p});var a=t(8168),i=(t(6540),t(5680));const r={},l="Parallel Graph",s={unversionedId:"Assignments/Parallel Graph/README",id:"Assignments/Parallel Graph/README",title:"Parallel Graph",description:"Objectives",source:"@site/docs/Assignments/Parallel Graph/README.md",sourceDirName:"Assignments/Parallel Graph",slug:"/Assignments/Parallel Graph/",permalink:"/operating-systems/74/Assignments/Parallel Graph/",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"Memory Allocator",permalink:"/operating-systems/74/Assignments/Memory Allocator/"},next:{title:"Minishell",permalink:"/operating-systems/74/Assignments/Mini Shell/"}},o={},p=[{value:"Objectives",id:"objectives",level:2},{value:"Statement",id:"statement",level:2},{value:"Support Code",id:"support-code",level:2},{value:"Implementation",id:"implementation",level:2},{value:"Thread Pool Description",id:"thread-pool-description",level:3},{value:"Graph Traversal",id:"graph-traversal",level:3},{value:"Synchronization",id:"synchronization",level:3},{value:"Input Files",id:"input-files",level:3},{value:"Data Structures",id:"data-structures",level:3},{value:"Graph",id:"graph",level:4},{value:"List",id:"list",level:4},{value:"Thread Pool",id:"thread-pool",level:4},{value:"Requirements",id:"requirements",level:3},{value:"Operations",id:"operations",level:2},{value:"Building",id:"building",level:3},{value:"Testing and Grading",id:"testing-and-grading",level:2},{value:"Running the Checker",id:"running-the-checker",level:3},{value:"Running the Linters",id:"running-the-linters",level:3},{value:"Fine-Grained Testing",id:"fine-grained-testing",level:3}],d={toc:p},u="wrapper";function h(e){let{components:n,...t}=e;return(0,i.yg)(u,(0,a.A)({},d,t,{components:n,mdxType:"MDXLayout"}),(0,i.yg)("h1",{id:"parallel-graph"},"Parallel Graph"),(0,i.yg)("h2",{id:"objectives"},"Objectives"),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},"Learn how to design and implement parallel programs"),(0,i.yg)("li",{parentName:"ul"},"Gain skills in using synchronization primitives for parallel programs"),(0,i.yg)("li",{parentName:"ul"},"Get a better understanding of the POSIX threading and synchronization API"),(0,i.yg)("li",{parentName:"ul"},"Gain insight on the differences between serial and parallel programs")),(0,i.yg)("h2",{id:"statement"},"Statement"),(0,i.yg)("p",null,"Implement a generic thread pool, then use it to traverse a graph and compute the sum of the elements contained by the nodes.\nYou will be provided with a serial implementation of the graph traversal and with most of the data structures needed to implement the thread pool.\nYour job is to write the thread pool routines and then use the thread pool to traverse the graph."),(0,i.yg)("h2",{id:"support-code"},"Support Code"),(0,i.yg)("p",null,"The support code consists of the directories:"),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("p",{parentName:"li"},(0,i.yg)("inlineCode",{parentName:"p"},"src/")," is the skeleton parallel graph implementation.\nYou will have to implement missing parts marked as ",(0,i.yg)("inlineCode",{parentName:"p"},"TODO")," items.")),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("p",{parentName:"li"},(0,i.yg)("inlineCode",{parentName:"p"},"utils/")," utility files (used for debugging & logging)")),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("p",{parentName:"li"},(0,i.yg)("inlineCode",{parentName:"p"},"tests/")," are tests used to validate (and grade) the assignment."))),(0,i.yg)("h2",{id:"implementation"},"Implementation"),(0,i.yg)("h3",{id:"thread-pool-description"},"Thread Pool Description"),(0,i.yg)("p",null,"A thread pool contains a given number of active threads that simply wait to be given specific tasks.\nThe threads are created when the thread pool is created.\nEach thread continuously polls the task queue for available tasks.\nOnce tasks are put in the task queue, the threads poll tasks, and start running them.\nA thread pool creates ",(0,i.yg)("strong",{parentName:"p"},"N")," threads upon its creation and does not destroy (join) them throughout its lifetime.\nThat way, the penalty of creating and destroying threads ad-hoc is avoided.\nAs such, you must implement the following functions (marked with ",(0,i.yg)("inlineCode",{parentName:"p"},"TODO")," in the provided skeleton, in ",(0,i.yg)("inlineCode",{parentName:"p"},"src/os_threadpool.c"),"):"),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("inlineCode",{parentName:"li"},"enqueue_task()"),": Enqueue task to the shared task queue.\nUse synchronization."),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("inlineCode",{parentName:"li"},"dequeue_task()"),": Dequeue task from the shared task queue.\nUse synchronization."),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("inlineCode",{parentName:"li"},"wait_for_completion()"),": Wait for all worker threads.\nUse synchronization."),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("inlineCode",{parentName:"li"},"create_threadpool()"),": Create a new thread pool."),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("inlineCode",{parentName:"li"},"destroy_threadpool()"),": Destroy a thread pool.\nAssume all threads have been joined.")),(0,i.yg)("p",null,"You must also update the ",(0,i.yg)("inlineCode",{parentName:"p"},"os_threadpool_t")," structure in ",(0,i.yg)("inlineCode",{parentName:"p"},"src/os_threadpool.h")," with the required bits for synchronizing the parallel implementation."),(0,i.yg)("p",null,"Notice that the thread pool is completely independent of any given application.\nAny function can be registered in the task queue."),(0,i.yg)("p",null,"Since the threads are polling the task queue indefinitely, you need to define a condition for them to stop once the graph has been traversed completely.\nThat is, the condition used by the ",(0,i.yg)("inlineCode",{parentName:"p"},"wait_for_completion()")," function.\nThe recommended way is to note when no threads have any more work to do.\nSince no thread is doing any work, no other task will be created."),(0,i.yg)("h3",{id:"graph-traversal"},"Graph Traversal"),(0,i.yg)("p",null,"Once you have implemented the thread pool, you need to test it by doing a parallel traversal of all connected nodes in a graph.\nA serial implementation for this algorithm is provided in ",(0,i.yg)("inlineCode",{parentName:"p"},"src/serial.c"),".\nTo make use of the thread pool, you will need to create tasks that will be put in the task queue.\nA task consists of 2 steps:"),(0,i.yg)("ol",null,(0,i.yg)("li",{parentName:"ol"},"Add the current node value to the overall sum."),(0,i.yg)("li",{parentName:"ol"},"Create tasks and add them to the task queue for the neighbouring nodes.")),(0,i.yg)("p",null,"Implement this in the ",(0,i.yg)("inlineCode",{parentName:"p"},"src/parallel.c")," (see the ",(0,i.yg)("inlineCode",{parentName:"p"},"TODO")," items).\nYou must implement the parallel and synchronized version of the ",(0,i.yg)("inlineCode",{parentName:"p"},"process_node()")," function, also used in the serial implementation."),(0,i.yg)("h3",{id:"synchronization"},"Synchronization"),(0,i.yg)("p",null,"For synchronization you can use mutexes, semaphores, spinlocks, condition variables - anything that grinds your gear.\nHowever, you are not allowed to use hacks such as ",(0,i.yg)("inlineCode",{parentName:"p"},"sleep()"),", ",(0,i.yg)("inlineCode",{parentName:"p"},"printf()")," synchronization or adding superfluous computation."),(0,i.yg)("h3",{id:"input-files"},"Input Files"),(0,i.yg)("p",null,"Reading the graphs from the input files is being taken care of the functions implemented in ",(0,i.yg)("inlineCode",{parentName:"p"},"src/os_graph.c"),".\nA graph is represented in input files as follows:"),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},"First line contains 2 integers ",(0,i.yg)("inlineCode",{parentName:"li"},"N")," and ",(0,i.yg)("inlineCode",{parentName:"li"},"M"),": ",(0,i.yg)("inlineCode",{parentName:"li"},"N")," - number of nodes, ",(0,i.yg)("inlineCode",{parentName:"li"},"M")," - numbed or edges"),(0,i.yg)("li",{parentName:"ul"},"Second line contains ",(0,i.yg)("inlineCode",{parentName:"li"},"N")," integer numbers - the values of the nodes."),(0,i.yg)("li",{parentName:"ul"},"The next ",(0,i.yg)("inlineCode",{parentName:"li"},"M")," lines contain each 2 integers that represent the source and the destination of an edge.")),(0,i.yg)("h3",{id:"data-structures"},"Data Structures"),(0,i.yg)("h4",{id:"graph"},"Graph"),(0,i.yg)("p",null,"A graph is represented internally by the ",(0,i.yg)("inlineCode",{parentName:"p"},"os_graph_t")," structure (see ",(0,i.yg)("inlineCode",{parentName:"p"},"src/os_graph.h"),")."),(0,i.yg)("h4",{id:"list"},"List"),(0,i.yg)("p",null,"A list is represented internally by the ",(0,i.yg)("inlineCode",{parentName:"p"},"os_queue_t")," structure (see ",(0,i.yg)("inlineCode",{parentName:"p"},"src/os_list.h"),").\nYou will use this list to implement the task queue."),(0,i.yg)("h4",{id:"thread-pool"},"Thread Pool"),(0,i.yg)("p",null,"A thread pool is represented internally by the ",(0,i.yg)("inlineCode",{parentName:"p"},"os_threadpool_t")," structure (see ",(0,i.yg)("inlineCode",{parentName:"p"},"src/os_threadpool.h"),").\nThe thread pool contains information about the task queue and the threads."),(0,i.yg)("h3",{id:"requirements"},"Requirements"),(0,i.yg)("p",null,"Your implementation needs to be contained in the ",(0,i.yg)("inlineCode",{parentName:"p"},"src/os_threadpool.c"),", ",(0,i.yg)("inlineCode",{parentName:"p"},"src/os_threadpool.h")," and ",(0,i.yg)("inlineCode",{parentName:"p"},"src/parallel.c")," files.\nAny other files that you are using will not be taken into account.\nAny modifications that you are doing to the other files in the ",(0,i.yg)("inlineCode",{parentName:"p"},"src/")," directory will not be taken into account."),(0,i.yg)("h2",{id:"operations"},"Operations"),(0,i.yg)("h3",{id:"building"},"Building"),(0,i.yg)("p",null,"To build both the serial and the parallel versions, run ",(0,i.yg)("inlineCode",{parentName:"p"},"make")," in the ",(0,i.yg)("inlineCode",{parentName:"p"},"src/")," directory:"),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-console"},"student@so:~/.../content/assignments/parallel-graph$ cd src/\n\nstudent@so:~/.../assignments/parallel-graph/src$ make\n")),(0,i.yg)("p",null,"That will create the ",(0,i.yg)("inlineCode",{parentName:"p"},"serial")," and ",(0,i.yg)("inlineCode",{parentName:"p"},"parallel")," binaries."),(0,i.yg)("h2",{id:"testing-and-grading"},"Testing and Grading"),(0,i.yg)("p",null,"Testing is automated.\nTests are located in the ",(0,i.yg)("inlineCode",{parentName:"p"},"tests/")," directory."),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-console"},"student@so:~/.../assignments/parallel-graph/tests$ ls -F\nMakefile  checker.py  grade.sh@  in/\n")),(0,i.yg)("p",null,"To test and grade your assignment solution, enter the ",(0,i.yg)("inlineCode",{parentName:"p"},"tests/")," directory and run ",(0,i.yg)("inlineCode",{parentName:"p"},"grade.sh"),".\nNote that this requires linters being available.\nThe easiest is to use a Docker-based setup with everything installed and configured.\nWhen using ",(0,i.yg)("inlineCode",{parentName:"p"},"grade.sh")," you will get grades for checking correctness (maximum ",(0,i.yg)("inlineCode",{parentName:"p"},"90")," points) and for coding style (maxim ",(0,i.yg)("inlineCode",{parentName:"p"},"10")," points).\nA successful run will provide you an output ending with:"),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-console"},"### GRADE\n\n\nChecker:                                                         90/ 90\nStyle:                                                           10/ 10\nTotal:                                                          100/100\n\n\n### STYLE SUMMARY\n\n\n")),(0,i.yg)("h3",{id:"running-the-checker"},"Running the Checker"),(0,i.yg)("p",null,"To run only the checker, use the ",(0,i.yg)("inlineCode",{parentName:"p"},"make check")," command in the ",(0,i.yg)("inlineCode",{parentName:"p"},"tests/")," directory:"),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-console"},"student@so:~/.../assignments/parallel-graph/tests$ make check\n[...]\nSRC_PATH=../src python checker.py\nmake[1]: Entering directory '...'\nrm -f *~\n[...]\nTODO\ntest1.in                         ....................... failed ...   0.0\ntest2.in                         ....................... failed ...   0.0\ntest3.in                         ....................... failed ...   0.0\n[...]\n\nTotal:                                                             0/100\n")),(0,i.yg)("p",null,"Obviously, all tests will fail, as there is no implementation."),(0,i.yg)("p",null,"Each test is worth a number of points.\nThe maximum grade is ",(0,i.yg)("inlineCode",{parentName:"p"},"90"),"."),(0,i.yg)("p",null,"A successful run will show the output:"),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-console"},"student@so:~/.../assignments/parallel-graph/tests$ make check\n[...]\nSRC_PATH=../src python checker.py\ntest1.in                         ....................... passed ...   4.5\ntest2.in                         ....................... passed ...   4.5\ntest3.in                         ....................... passed ...   4.5\ntest4.in                         ....................... passed ...   4.5\ntest5.in                         ....................... passed ...   4.5\ntest6.in                         ....................... passed ...   4.5\ntest7.in                         ....................... passed ...   4.5\ntest8.in                         ....................... passed ...   4.5\ntest9.in                         ....................... passed ...   4.5\ntest10.in                        ....................... passed ...   4.5\ntest11.in                        ....................... passed ...   4.5\ntest12.in                        ....................... passed ...   4.5\ntest13.in                        ....................... passed ...   4.5\ntest14.in                        ....................... passed ...   4.5\ntest15.in                        ....................... passed ...   4.5\ntest16.in                        ....................... passed ...   4.5\ntest17.in                        ....................... passed ...   4.5\ntest18.in                        ....................... passed ...   4.5\ntest19.in                        ....................... passed ...   4.5\ntest20.in                        ....................... passed ...   4.5\n\nTotal:                                                              90/100\n")),(0,i.yg)("h3",{id:"running-the-linters"},"Running the Linters"),(0,i.yg)("p",null,"To run the linters, use the ",(0,i.yg)("inlineCode",{parentName:"p"},"make lint")," command in the ",(0,i.yg)("inlineCode",{parentName:"p"},"tests/")," directory:"),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-console"},"student@so:~/.../assignments/parallel-graph/tests$ make lint\n[...]\ncd .. && checkpatch.pl -f checker/*.sh tests/*.sh\n[...]\ncd .. && cpplint --recursive src/ tests/ checker/\n[...]\ncd .. && shellcheck checker/*.sh tests/*.sh\n")),(0,i.yg)("p",null,"Note that the linters have to be installed on your system: ",(0,i.yg)("a",{parentName:"p",href:"https://.com/torvalds/linux/blob/master/scripts/checkpatch.pl"},(0,i.yg)("inlineCode",{parentName:"a"},"checkpatch.pl")),", ",(0,i.yg)("a",{parentName:"p",href:"https://github.com/cpplint/cpplint"},(0,i.yg)("inlineCode",{parentName:"a"},"cpplint")),", ",(0,i.yg)("a",{parentName:"p",href:"https://www.shellcheck.net/"},(0,i.yg)("inlineCode",{parentName:"a"},"shellcheck")),".\nThey also need to have certain configuration options.\nIt's easiest to run them in a Docker-based setup with everything configured."),(0,i.yg)("h3",{id:"fine-grained-testing"},"Fine-Grained Testing"),(0,i.yg)("p",null,"Input tests cases are located in ",(0,i.yg)("inlineCode",{parentName:"p"},"tests/in/"),".\nIf you want to run a single test, use commands such as below while in the ",(0,i.yg)("inlineCode",{parentName:"p"},"src/")," directory:"),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-console"},"$./parallel ../tests/in/test5.in\n-38\n\n$ ./serial ../tests/in/test5.in\n-38\n")),(0,i.yg)("p",null,"Results provided by the serial and parallel implementation must be the same for the test to successfully pass."))}h.isMDXComponent=!0}}]);