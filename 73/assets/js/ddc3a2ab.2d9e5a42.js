"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[333],{5680:(e,t,a)=>{a.d(t,{xA:()=>h,yg:()=>u});var r=a(6540);function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function s(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function o(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?s(Object(a),!0).forEach((function(t){n(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):s(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function i(e,t){if(null==e)return{};var a,r,n=function(e,t){if(null==e)return{};var a,r,n={},s=Object.keys(e);for(r=0;r<s.length;r++)a=s[r],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)a=s[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var p=r.createContext({}),l=function(e){var t=r.useContext(p),a=t;return e&&(a="function"==typeof e?e(t):o(o({},t),e)),a},h=function(e){var t=l(e.components);return r.createElement(p.Provider,{value:t},e.children)},m="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var a=e.components,n=e.mdxType,s=e.originalType,p=e.parentName,h=i(e,["components","mdxType","originalType","parentName"]),m=l(a),d=n,u=m["".concat(p,".").concat(d)]||m[d]||c[d]||s;return a?r.createElement(u,o(o({ref:t},h),{},{components:a})):r.createElement(u,o({ref:t},h))}));function u(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var s=a.length,o=new Array(s);o[0]=d;var i={};for(var p in t)hasOwnProperty.call(t,p)&&(i[p]=t[p]);i.originalType=e,i[m]="string"==typeof e?e:n,o[1]=i;for(var l=2;l<s;l++)o[l]=a[l];return r.createElement.apply(null,o)}return r.createElement.apply(null,a)}d.displayName="MDXCreateElement"},865:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>p,contentTitle:()=>o,default:()=>c,frontMatter:()=>s,metadata:()=>i,toc:()=>l});var r=a(8168),n=(a(6540),a(5680));const s={},o="Threads",i={unversionedId:"Lab/Compute/threads",id:"Lab/Compute/threads",title:"Threads",description:"Spreading the Work Among Other Threads",source:"@site/docs/Lab/Compute/threads.md",sourceDirName:"Lab/Compute",slug:"/Lab/Compute/threads",permalink:"/operating-systems/73/Lab/Compute/threads",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"Processes",permalink:"/operating-systems/73/Lab/Compute/processes"},next:{title:"Usage of Processes and Threads in `apache2`",permalink:"/operating-systems/73/Lab/Compute/processes-threads-apache2"}},p={},l=[{value:"Spreading the Work Among Other Threads",id:"spreading-the-work-among-other-threads",level:2},{value:"Practice: Wait for Me Once More",id:"practice-wait-for-me-once-more",level:3},{value:"Threads vs Processes",id:"threads-vs-processes",level:2},{value:"Safety",id:"safety",level:3},{value:"Practice: Wait for It",id:"practice-wait-for-it",level:3},{value:"Memory Corruption",id:"memory-corruption",level:3},{value:"Memory Layout of Multithreaded Programs",id:"memory-layout-of-multithreaded-programs",level:2},{value:"Practice",id:"practice",level:3}],h={toc:l},m="wrapper";function c(e){let{components:t,...a}=e;return(0,n.yg)(m,(0,r.A)({},h,a,{components:t,mdxType:"MDXLayout"}),(0,n.yg)("h1",{id:"threads"},"Threads"),(0,n.yg)("h2",{id:"spreading-the-work-among-other-threads"},"Spreading the Work Among Other Threads"),(0,n.yg)("p",null,"Compile the code in ",(0,n.yg)("inlineCode",{parentName:"p"},"support/sum-array/c/sum_array_threads.c")," and run it using 1, 2, 4 and 8 threads as you did before.\nEach thread runs the ",(0,n.yg)("inlineCode",{parentName:"p"},"calculateArrayPartSum")," function and then finishes.\nRunning times should be ",(0,n.yg)("em",{parentName:"p"},"slightly")," smaller than the implementation using processes.\nThis slight time difference is caused by process creation actions, which are costlier than thread creation actions.\nBecause a process needs a separate virtual address space (VAS) and needs to duplicate some internal structures such as the file descriptor table and page table, it takes the operating system more time to create it than to create a thread.\nOn the other hand, threads belonging to the same process share the same VAS and, implicitly, the same OS-internal structures.\nTherefore, they are more lightweight than processes."),(0,n.yg)("h3",{id:"practice-wait-for-me-once-more"},"Practice: Wait for Me Once More"),(0,n.yg)("p",null,"Go to ",(0,n.yg)("inlineCode",{parentName:"p"},"support/wait-for-me/wait_for_me_threads.c"),".\nSpawn a thread that executes the ",(0,n.yg)("inlineCode",{parentName:"p"},"negate_array()")," function.\nFor now, do not wait for it to finish;\nsimply start it."),(0,n.yg)("p",null,"Compile the code and run the resulting executable several times.\nSee that the negative numbers appear from different indices.\nThis is precisely the nondeterminism that we talked about ",(0,n.yg)("a",{parentName:"p",href:"/operating-systems/73/Lab/Compute/processes#practice-wait-for-me"},"in the previous section"),"."),(0,n.yg)("p",null,"Now wait for that thread to finish and see that all the printed numbers are consistently negative."),(0,n.yg)("p",null,"As you can see, waiting is a very coarse form of synchronization.\nIf we only use waiting, we can expect no speedup as a result of parallelism, because one thread must finish completely before another can continue.\nWe will discuss more fine-grained synchronization mechanisms ",(0,n.yg)("a",{parentName:"p",href:"/operating-systems/73/Lab/Compute/synchronization"},"later in this lab"),"."),(0,n.yg)("p",null,"Also, at this point, you might be wondering why this exercise is written in D, while ",(0,n.yg)("a",{parentName:"p",href:"/operating-systems/73/Lab/Compute/processes#practice-wait-for-me"},"the same exercise, but with processes")," was written in Python.\nThere is a very good reason for this and has to do with how threads are synchronized by default in Python.\nYou can find out what this is about ",(0,n.yg)("a",{parentName:"p",href:"/operating-systems/73/Lab/Compute/arena#the-gil"},"in the Arena section"),", after you have completed the ",(0,n.yg)("a",{parentName:"p",href:"/operating-systems/73/Lab/Compute/synchronization"},"Synchronization section"),"."),(0,n.yg)("h2",{id:"threads-vs-processes"},"Threads vs Processes"),(0,n.yg)("p",null,"So why use the implementation that spawns more processes if it's slower than the one using threads?\nThe table below lists the differences between threads and processes.\nGenerally, if we only want to do some computing, we use threads.\nIf we need to drastically change the behaviour of the program, we need a new program altogether, or we need more than computing (e.g. communication on the network to create a computing cluster), we use processes."),(0,n.yg)("table",null,(0,n.yg)("thead",{parentName:"table"},(0,n.yg)("tr",{parentName:"thead"},(0,n.yg)("th",{parentName:"tr",align:"left"},"PROCESS"),(0,n.yg)("th",{parentName:"tr",align:"left"},"THREAD"))),(0,n.yg)("tbody",{parentName:"table"},(0,n.yg)("tr",{parentName:"tbody"},(0,n.yg)("td",{parentName:"tr",align:"left"},"independent"),(0,n.yg)("td",{parentName:"tr",align:"left"},"part of a process")),(0,n.yg)("tr",{parentName:"tbody"},(0,n.yg)("td",{parentName:"tr",align:"left"},"collection of threads"),(0,n.yg)("td",{parentName:"tr",align:"left"},"shares VAS with other threads")),(0,n.yg)("tr",{parentName:"tbody"},(0,n.yg)("td",{parentName:"tr",align:"left"},"slower creation (new page table must be created)"),(0,n.yg)("td",{parentName:"tr",align:"left"},"faster creation")),(0,n.yg)("tr",{parentName:"tbody"},(0,n.yg)("td",{parentName:"tr",align:"left"},"longer context switch duration (TLB must be flushed)"),(0,n.yg)("td",{parentName:"tr",align:"left"},"shorter context switch duration (part of the same process, so same TLB)")),(0,n.yg)("tr",{parentName:"tbody"},(0,n.yg)("td",{parentName:"tr",align:"left"},"ending means ending all threads"),(0,n.yg)("td",{parentName:"tr",align:"left"},"other threads continue when finished")))),(0,n.yg)("h3",{id:"safety"},"Safety"),(0,n.yg)("p",null,"Compile and run the two programs in ",(0,n.yg)("inlineCode",{parentName:"p"},"support/sum-array-bugs/seg-fault/"),", first with 2 processes and threads and then with 4.\nThey do the same thing as before: compute the sum of the elements in an array, but with a twist: each of them contains a bug causing a segfault.\nNotice that ",(0,n.yg)("inlineCode",{parentName:"p"},"sum_array_threads"),' doesn\'t print anything with 4 threads, but merely a "Segmentation fault" message.\nOn the other hand, ',(0,n.yg)("inlineCode",{parentName:"p"},"sum_array_processes")," prints a sum and a running time, albeit different from the sums we've seen so far."),(0,n.yg)("p",null,"The reason is that signals such as ",(0,n.yg)("inlineCode",{parentName:"p"},"SIGSEGV"),", which is used when a segmentation fault happens affect the entire process that handles them.\nTherefore, when we split our workload between several threads and one of them causes an error such as a segfault, that error is going to terminate the entire process.\nThe same thing happens when we use processes instead of threads: one process causes an error, which gets it killed, but the other processes continue their work unhindered.\nThis is why we end up with a lower sum in the end: because one process died too early and didn't manage to write the partial sum it had computed to the ",(0,n.yg)("inlineCode",{parentName:"p"},"results")," array."),(0,n.yg)("h3",{id:"practice-wait-for-it"},"Practice: Wait for It"),(0,n.yg)("p",null,"The process that spawns all the others and subsequently calls ",(0,n.yg)("inlineCode",{parentName:"p"},"waitpid")," to wait for them to finish can also get their return codes.\nUpdate the code in ",(0,n.yg)("inlineCode",{parentName:"p"},"support/sum-array-bugs/seg-fault/sum_array_processes.c")," and modify the call to ",(0,n.yg)("inlineCode",{parentName:"p"},"waitpid")," to obtain and investigate this return code.\nDisplay an appropriate message if one of the child processes returns an error."),(0,n.yg)("p",null,"Remember to use the appropriate ",(0,n.yg)("a",{parentName:"p",href:"https://linux.die.net/man/2/waitpid"},"macros")," for handling the ",(0,n.yg)("inlineCode",{parentName:"p"},"status")," variable that is modified by ",(0,n.yg)("inlineCode",{parentName:"p"},"waitpid()"),", as it is a bit-field.\nWhen a process runs into a system error, it receives a signal.\nA signal is a means to interrupt the normal execution of a program from the outside.\nIt is associated with a number.\nUse ",(0,n.yg)("inlineCode",{parentName:"p"},"kill -l")," to find the full list of signals."),(0,n.yg)("p",null,(0,n.yg)("a",{parentName:"p",href:"/operating-systems/73/Lab/Compute/quiz/seg-fault-exit-code"},"Quiz")),(0,n.yg)("p",null,"So up to this point we've seen that one advantage of processes is that they offer better safety than threads.\nBecause they use separate virtual address spaces, sibling processes are better isolated than threads.\nThus, an application that uses processes can be more robust to errors than if it were using threads."),(0,n.yg)("h3",{id:"memory-corruption"},"Memory Corruption"),(0,n.yg)("p",null,"Because they share the same address space, threads run the risk of corrupting each other's data.\nTake a look at the code in ",(0,n.yg)("inlineCode",{parentName:"p"},"support/sum-array-bugs/memory-corruption/python/"),".\nThe two programs only differ in how they spread their workload.\nOne uses threads while the other uses processes."),(0,n.yg)("p",null,"Run both programs with and without memory corruption.\nPass any value as a third argument to trigger the corruption."),(0,n.yg)("pre",null,(0,n.yg)("code",{parentName:"pre",className:"language-console"},"student@os:~/.../sum-array-bugs/memory-corruption/python$ python3 memory_corruption_processes.py <number_of_processes>  # no memory corruption\n[...]\n\nstudent@os:~/.../sum-array-bugs/memory-corruption/python$ python3 memory_corruption_processes.py <number_of_processes> 1  # do memory corruption\n[...]\n")),(0,n.yg)("p",null,"The one using threads will most likely print a negative sum, while the other displays the correct sum.\nThis happens because all threads refer to the same memory for the array ",(0,n.yg)("inlineCode",{parentName:"p"},"arr"),".\nWhat happens to the processes is a bit more complicated."),(0,n.yg)("p",null,(0,n.yg)("a",{parentName:"p",href:"/operating-systems/73/Lab/Compute/copy-on-write"},"Later in this lab"),", we will see that initially, the page tables of all processes point to the same physical frames or ",(0,n.yg)("inlineCode",{parentName:"p"},"arr"),".\nWhen the malicious process tries to corrupt this array by ",(0,n.yg)("strong",{parentName:"p"},"writing data to it"),", the OS duplicates the original frames of ",(0,n.yg)("inlineCode",{parentName:"p"},"arr")," so that the malicious process writes the corrupted values to these new frames, while leaving the original ones untouched.\nThis mechanism is called ",(0,n.yg)("strong",{parentName:"p"},"Copy-on-Write")," and is an OS optimisation so that memory is shared between the parent and the child process, until one of them attempts to write to it.\nAt this point, this process receives its own separate copies of the previously shared frames."),(0,n.yg)("p",null,"Note that in order for the processes to share the ",(0,n.yg)("inlineCode",{parentName:"p"},"sums")," dictionary, it is not created as a regular dictionary, but using the ",(0,n.yg)("inlineCode",{parentName:"p"},"Manager")," module.\nThis module provides some special data structures that are allocated in ",(0,n.yg)("strong",{parentName:"p"},"shared memory")," so that all processes can access them.\nYou can learn more about shared memory and its various implementations ",(0,n.yg)("a",{parentName:"p",href:"/operating-systems/73/Lab/Compute/arena#shared-memory"},"in the Arena section"),"."),(0,n.yg)("h2",{id:"memory-layout-of-multithreaded-programs"},"Memory Layout of Multithreaded Programs"),(0,n.yg)("p",null,"When a new thread is created, a new stack is allocated for a thread.\nThe default stack size if ",(0,n.yg)("inlineCode",{parentName:"p"},"8 MB")," / ",(0,n.yg)("inlineCode",{parentName:"p"},"8192 KB"),":"),(0,n.yg)("pre",null,(0,n.yg)("code",{parentName:"pre",className:"language-console"},"student@os:~$ ulimit -s\n8192\n")),(0,n.yg)("p",null,"Enter the ",(0,n.yg)("inlineCode",{parentName:"p"},"support/multithreaded/")," directory to observe the update of the memory layout when creating new threads."),(0,n.yg)("p",null,"Build the ",(0,n.yg)("inlineCode",{parentName:"p"},"multithreaded")," executable:"),(0,n.yg)("pre",null,(0,n.yg)("code",{parentName:"pre",className:"language-console"},"student@os:~/.../lab/support/multithreaded$ make\n")),(0,n.yg)("p",null,"Start the program:"),(0,n.yg)("pre",null,(0,n.yg)("code",{parentName:"pre",className:"language-console"},"student@os:~/.../lab/support/multithreaded$ ./multithreaded\nPress key to start creating threads ...\n[...]\n")),(0,n.yg)("p",null,"And investigate it with ",(0,n.yg)("inlineCode",{parentName:"p"},"pmap")," on another console, while pressing a key to create new threads."),(0,n.yg)("p",null,"As you can see, there is a new ",(0,n.yg)("inlineCode",{parentName:"p"},"8192 KB")," area created for every thread, also increasing the total virtual size."),(0,n.yg)("h3",{id:"practice"},"Practice"),(0,n.yg)("ol",null,(0,n.yg)("li",{parentName:"ol"},(0,n.yg)("p",{parentName:"li"},"Build the multithreaded program as a static executable by adding ",(0,n.yg)("inlineCode",{parentName:"p"},"LDFLAGS = -static")," to the Makefile:\nRun it.\nYou can check the executable is statically linked by executing the command ",(0,n.yg)("inlineCode",{parentName:"p"},"ldd multithreaded"),".\nNotice the same effect of the thread creation on the process memory layout: the creation of a new stack of ",(0,n.yg)("inlineCode",{parentName:"p"},"8192 KB"),".")),(0,n.yg)("li",{parentName:"ol"},(0,n.yg)("p",{parentName:"li"},"Make a program in another language of your choice that creates threads.\nInvestigate it with ",(0,n.yg)("inlineCode",{parentName:"p"},"pmap"),"."))),(0,n.yg)("p",null,(0,n.yg)("a",{parentName:"p",href:"/operating-systems/73/Lab/Compute/quiz/thread-memory"},"Quiz")))}c.isMDXComponent=!0}}]);