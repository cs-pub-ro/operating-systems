"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[8665],{5680:(e,t,r)=>{r.d(t,{xA:()=>p,yg:()=>m});var n=r(6540);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var s=n.createContext({}),d=function(e){var t=n.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},p=function(e){var t=d(e.components);return n.createElement(s.Provider,{value:t},e.children)},u="mdxType",h={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},c=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,i=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),u=d(r),c=a,m=u["".concat(s,".").concat(c)]||u[c]||h[c]||i;return r?n.createElement(m,o(o({ref:t},p),{},{components:r})):n.createElement(m,o({ref:t},p))}));function m(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=r.length,o=new Array(i);o[0]=c;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[u]="string"==typeof e?e:a,o[1]=l;for(var d=2;d<i;d++)o[d]=r[d];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}c.displayName="MDXCreateElement"},9010:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>s,contentTitle:()=>o,default:()=>h,frontMatter:()=>i,metadata:()=>l,toc:()=>d});var n=r(8168),a=(r(6540),r(5680));const i={},o="User-Level Threads",l={unversionedId:"Lab/Compute/user-level-threads",id:"Lab/Compute/user-level-threads",title:"User-Level Threads",description:"User-level threads differ from the threads you are used to (kernel-level threads, those created by pthread_create).",source:"@site/docs/Lab/Compute/user-level-threads.md",sourceDirName:"Lab/Compute",slug:"/Lab/Compute/user-level-threads",permalink:"/operating-systems/86/Lab/Compute/user-level-threads",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"Synchronization",permalink:"/operating-systems/86/Lab/Compute/synchronization"},next:{title:"Arena",permalink:"/operating-systems/86/Lab/Compute/arena"}},s={},d=[{value:"Prerequisites",id:"prerequisites",level:2},{value:"Creation",id:"creation",level:2},{value:"Practice: Sleeper Fiber",id:"practice-sleeper-fiber",level:3},{value:"No system calls",id:"no-system-calls",level:2},{value:"Synchronization",id:"synchronization",level:2},{value:"Yielding",id:"yielding",level:3},{value:"Practice",id:"practice",level:4},{value:"Barriers",id:"barriers",level:3},{value:"Interaction Between Threads and Fibers",id:"interaction-between-threads-and-fibers",level:2},{value:"C++ unique_lock",id:"c-unique_lock",level:3}],p={toc:d},u="wrapper";function h(e){let{components:t,...r}=e;return(0,a.yg)(u,(0,n.A)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,a.yg)("h1",{id:"user-level-threads"},"User-Level Threads"),(0,a.yg)("p",null,"User-level threads differ from the threads you are used to (kernel-level threads, those created by pthread_create).\nThis kind of threads are scheduled by an user-level scheduler, and can run on the same kernel-level thread.\nFrom now on, we will reffer to user-level threads as fibers, and kernel-level threads as simply threads."),(0,a.yg)("p",null,"We will use the fiber implementation from libboost.\nThis implementation uses a cooperative scheduler on each thread, meaning that each fiber has to yield, in order for other fiber to be executed.\nWe will also use C++, and the standard ",(0,a.yg)("inlineCode",{parentName:"p"},"thread")," implementation."),(0,a.yg)("h2",{id:"prerequisites"},"Prerequisites"),(0,a.yg)("p",null,"Unless you are using the OS docker image, you will need to install ",(0,a.yg)("inlineCode",{parentName:"p"},"cmake")," and ",(0,a.yg)("inlineCode",{parentName:"p"},"libboost"),".\nYou can do this with the following command:"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-console"},"student@os:~$ sudo apt-get install cmake libboost-context-dev libboost-fiber-dev\n")),(0,a.yg)("h2",{id:"creation"},"Creation"),(0,a.yg)("p",null,"Follow the ",(0,a.yg)("inlineCode",{parentName:"p"},"support/user-level-threads/simple.cc")," implementation.\nIt creates ",(0,a.yg)("inlineCode",{parentName:"p"},"NUM_FIBERS"),' fibers, that each prints "Hello World".\nTo compile and run the program, do the following steps:'),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-console"},"student@os:~/.../lab/support/user-level-threads$ mkdir build/\nstudent@os:~/.../lab/support/user-level-threads$ cd build/\nstudent@os:~/.../lab/support/user-level-threads$ cmake -S .. -B .\nstudent@os:~/.../lab/support/user-level-threads$ make\nstudent@os:~/.../lab/support/user-level-threads$ ./simple\n")),(0,a.yg)("p",null,"The ",(0,a.yg)("inlineCode",{parentName:"p"},"cmake")," step must be executed only once.\nAfter modifying the source files, it is enough to run ",(0,a.yg)("inlineCode",{parentName:"p"},"make"),"."),(0,a.yg)("h3",{id:"practice-sleeper-fiber"},"Practice: Sleeper Fiber"),(0,a.yg)("p",null,"Add in ",(0,a.yg)("inlineCode",{parentName:"p"},"support/user-level-threads/simple.cc")," a fiber that sleeps for 5 seconds, before the other ones are created.\nWhat happens?\nAnswer in this ",(0,a.yg)("a",{parentName:"p",href:"/operating-systems/86/Lab/Compute/quiz/sleeping-on-a-fiber"},"quiz"),"."),(0,a.yg)("h2",{id:"no-system-calls"},"No system calls"),(0,a.yg)("p",null,"Use ",(0,a.yg)("inlineCode",{parentName:"p"},"strace")," to find calls to ",(0,a.yg)("inlineCode",{parentName:"p"},"clone()")," in the execution of ",(0,a.yg)("inlineCode",{parentName:"p"},"simple"),".\nCan you find any?\nProvide your answer in this ",(0,a.yg)("a",{parentName:"p",href:"/operating-systems/86/Lab/Compute/quiz/fiber-strace"},"quiz"),"\nRemember that ",(0,a.yg)("inlineCode",{parentName:"p"},"clone()")," is the system call used to create ",(0,a.yg)("strong",{parentName:"p"},"kernel-level")," threads, as pointed out ",(0,a.yg)("a",{parentName:"p",href:"/operating-systems/86/Lab/Compute/arena#threads-and-processes-clone"},"here"),"."),(0,a.yg)("h2",{id:"synchronization"},"Synchronization"),(0,a.yg)("p",null,"By default, the fibers that run on the same thread are synchronized - no race-conditions can occur.\nThis is illustrated by the ",(0,a.yg)("inlineCode",{parentName:"p"},"support/user-level-threads/sum.cc")," implementation."),(0,a.yg)("p",null,"The user can, however, implement further synchronization, by using the ",(0,a.yg)("inlineCode",{parentName:"p"},"yield()")," call, or classic synchronization methods, like mutexes, barriers and condition variables."),(0,a.yg)("h3",{id:"yielding"},"Yielding"),(0,a.yg)("p",null,"As the scheduler is cooperative, each fiber can yield (or not), to allow another fiber to run.\nFollow the ",(0,a.yg)("inlineCode",{parentName:"p"},"support/user-level-threads/yield_launch.cc")," implementation and run it.\nNote the ",(0,a.yg)("inlineCode",{parentName:"p"},"boost::fibers::launch::dispatch")," parameter provided to the fiber constructor.\nIt notifies the scheduler to start the fibre as soon as it is created.\nIn order to explain the output, we must consider that the fibers are created by a ",(0,a.yg)("strong",{parentName:"p"},"main fiber"),", that is scheduled along with the others, in this case."),(0,a.yg)("h4",{id:"practice"},"Practice"),(0,a.yg)("p",null,"Modify the launch parameter into ",(0,a.yg)("inlineCode",{parentName:"p"},"boost::fibers::launch::post"),", compile and notice the differences.\nThe ",(0,a.yg)("inlineCode",{parentName:"p"},"post")," parameter notifies the scheduler not to start the fibers imediately, but rather place them into an execution queue.\nTheir execution will start after the main fiber calls the ",(0,a.yg)("inlineCode",{parentName:"p"},"join()")," function."),(0,a.yg)("h3",{id:"barriers"},"Barriers"),(0,a.yg)("p",null,"Follow the ",(0,a.yg)("inlineCode",{parentName:"p"},"support/user-level-threads/yield_barrier.cc")," implementation.\nIt uses a barrier to achieve the same result as the previos implementation, that used ",(0,a.yg)("inlineCode",{parentName:"p"},"post")," as the launch parameter."),(0,a.yg)("h2",{id:"interaction-between-threads-and-fibers"},"Interaction Between Threads and Fibers"),(0,a.yg)("p",null,"As we mentioned before, multiple fibers can run on the same thread, and a scheduler is implemented on each thread.\nBy default, the scheduling algorithm is ",(0,a.yg)("a",{parentName:"p",href:"https://www.guru99.com/round-robin-scheduling-example.html"},(0,a.yg)("inlineCode",{parentName:"a"},"round_robin")),".\nIt runs the fibers, in the order of their creation, until they yield or finish their work.\nIf a fiber yields, it is placed at the back of the round-robin queue.\nUsing this scheduler, each thread only uses its fibers;\nif one thread has more work to do than another, bad luck.\nThis may lead to starvation."),(0,a.yg)("p",null,"But there are other scheduler implementations, such as ",(0,a.yg)("inlineCode",{parentName:"p"},"shared_work")," and ",(0,a.yg)("inlineCode",{parentName:"p"},"work_stealing"),".\nFollow the ",(0,a.yg)("inlineCode",{parentName:"p"},"support/user-level-threads/threads_and_fibers.cc")," implementation.\nIt creates multiple fibers and threads, and uses the ",(0,a.yg)("inlineCode",{parentName:"p"},"shared_work")," scheduler to balance the workload between the threads.\nEach main fiber, from each thread, is suspended until all worker fibers have completed their work, using a condition variable."),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-cpp"},"cnd_count.wait( lk, [](){ return 0 == fiber_count; } );\n")),(0,a.yg)("p",null,"The program also uses ",(0,a.yg)("inlineCode",{parentName:"p"},"thread local storage")," and ",(0,a.yg)("inlineCode",{parentName:"p"},"fiber local storage")," to store the ID of each thread / fiber."),(0,a.yg)("p",null,"Now change the ",(0,a.yg)("inlineCode",{parentName:"p"},"shared_work")," scheduler into the ",(0,a.yg)("inlineCode",{parentName:"p"},"work_stealing")," one.\nIt takes a parameter, the number of threads that will use that scheduler."),(0,a.yg)("p",null,"Compile, rerun and note the differences.\nThe ",(0,a.yg)("inlineCode",{parentName:"p"},"work_stealing"),' scheduler, as the name suggests, will "steal" fibers from other schedulers.\nSo, if the ',(0,a.yg)("inlineCode",{parentName:"p"},"shared_work")," scheduler tried to balance the available work between the available threads, the ",(0,a.yg)("inlineCode",{parentName:"p"},"work_stealing")," one will focus on having as many threads as possible on 100% workload.\nVary the number of threads and fibers, and the workload (maybe put each fibre to do some computational-intensive work), and observe the results."),(0,a.yg)("h3",{id:"c-unique_lock"},"C++ unique_lock"),(0,a.yg)("p",null,(0,a.yg)("inlineCode",{parentName:"p"},"unique_lock")," is a type of mutex that is unlocked automatically when the end of its scope is reached (end of function or bracket-pair)."))}h.isMDXComponent=!0}}]);