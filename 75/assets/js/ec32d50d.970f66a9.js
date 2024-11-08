"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[2609],{5680:(e,t,a)=>{a.d(t,{xA:()=>h,yg:()=>u});var n=a(6540);function o(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function r(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function s(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?r(Object(a),!0).forEach((function(t){o(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):r(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function i(e,t){if(null==e)return{};var a,n,o=function(e,t){if(null==e)return{};var a,n,o={},r=Object.keys(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||(o[a]=e[a]);return o}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(o[a]=e[a])}return o}var p=n.createContext({}),l=function(e){var t=n.useContext(p),a=t;return e&&(a="function"==typeof e?e(t):s(s({},t),e)),a},h=function(e){var t=l(e.components);return n.createElement(p.Provider,{value:t},e.children)},d="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},c=n.forwardRef((function(e,t){var a=e.components,o=e.mdxType,r=e.originalType,p=e.parentName,h=i(e,["components","mdxType","originalType","parentName"]),d=l(a),c=o,u=d["".concat(p,".").concat(c)]||d[c]||m[c]||r;return a?n.createElement(u,s(s({ref:t},h),{},{components:a})):n.createElement(u,s({ref:t},h))}));function u(e,t){var a=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var r=a.length,s=new Array(r);s[0]=c;var i={};for(var p in t)hasOwnProperty.call(t,p)&&(i[p]=t[p]);i.originalType=e,i[d]="string"==typeof e?e:o,s[1]=i;for(var l=2;l<r;l++)s[l]=a[l];return n.createElement.apply(null,s)}return n.createElement.apply(null,a)}c.displayName="MDXCreateElement"},9498:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>p,contentTitle:()=>s,default:()=>m,frontMatter:()=>r,metadata:()=>i,toc:()=>l});var n=a(8168),o=(a(6540),a(5680));const r={},s="Lab 7 - Copy-on-Write",i={unversionedId:"Compute/lab7",id:"Compute/lab7",title:"Lab 7 - Copy-on-Write",description:"Task: Investigate apache2 Using strace",source:"@site/docs/Compute/lab7.md",sourceDirName:"Compute",slug:"/Compute/lab7",permalink:"/operating-systems/75/Compute/lab7",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"Lab 6 - Multiprocess and Multithread",permalink:"/operating-systems/75/Compute/lab6"},next:{title:"Lab 8 - Syncronization",permalink:"/operating-systems/75/Compute/lab8"}},p={},l=[{value:"Task: Investigate <code>apache2</code> Using <code>strace</code>",id:"task-investigate-apache2-using-strace",level:2},{value:"Task: Minor and Major Page Faults",id:"task-minor-and-major-page-faults",level:2},{value:"Minor Page Faults",id:"minor-page-faults",level:3},{value:"Major Page Faults",id:"major-page-faults",level:3},{value:"Task: Shared Memory",id:"task-shared-memory",level:2},{value:"Usage of Processes and Threads in <code>apache2</code>",id:"usage-of-processes-and-threads-in-apache2",level:2},{value:"Conclusion",id:"conclusion",level:3},{value:"Copy-on-Write",id:"copy-on-write",level:2},{value:"Guide: <code>apache2</code> Live Action",id:"guide-apache2-live-action",level:2},{value:"Guide: Fork Faults",id:"guide-fork-faults",level:2}],h={toc:l},d="wrapper";function m(e){let{components:t,...r}=e;return(0,o.yg)(d,(0,n.A)({},h,r,{components:t,mdxType:"MDXLayout"}),(0,o.yg)("h1",{id:"lab-7---copy-on-write"},"Lab 7 - Copy-on-Write"),(0,o.yg)("h2",{id:"task-investigate-apache2-using-strace"},"Task: Investigate ",(0,o.yg)("inlineCode",{parentName:"h2"},"apache2")," Using ",(0,o.yg)("inlineCode",{parentName:"h2"},"strace")),(0,o.yg)("p",null,"Enter the ",(0,o.yg)("inlineCode",{parentName:"p"},"apache2/support/")," folder and go through the practice items below."),(0,o.yg)("ol",null,(0,o.yg)("li",{parentName:"ol"},"Use ",(0,o.yg)("inlineCode",{parentName:"li"},"strace")," to discover the server document root.\nThe document root is the path in the filesystem from where ",(0,o.yg)("inlineCode",{parentName:"li"},"httpd")," serves all the files requested by the clients.")),(0,o.yg)("p",null,"First, you will have to stop the running container using ",(0,o.yg)("inlineCode",{parentName:"p"},"make stop"),", then restart it with ",(0,o.yg)("inlineCode",{parentName:"p"},"make run-privileged"),"."),(0,o.yg)("ol",null,(0,o.yg)("li",{parentName:"ol"},(0,o.yg)("p",{parentName:"li"},"Use ",(0,o.yg)("inlineCode",{parentName:"p"},"strace")," inside the container to attach to the worker processes (use the ",(0,o.yg)("inlineCode",{parentName:"p"},"-p")," option for this).\nYou will also have to use the ",(0,o.yg)("inlineCode",{parentName:"p"},"-f")," flag with ",(0,o.yg)("inlineCode",{parentName:"p"},"strace"),", so that it will follow all the threads inside the processes.")),(0,o.yg)("li",{parentName:"ol"},(0,o.yg)("p",{parentName:"li"},"After you have attached successfully to all worker processes, use the ",(0,o.yg)("inlineCode",{parentName:"p"},"curl")," command to send a request.")),(0,o.yg)("li",{parentName:"ol"},(0,o.yg)("p",{parentName:"li"},"Then check the ",(0,o.yg)("inlineCode",{parentName:"p"},"strace")," output to see what files were opened by the server."))),(0,o.yg)("p",null,(0,o.yg)("a",{parentName:"p",href:"Questions/apache2-strace"},"Quiz")),(0,o.yg)("h2",{id:"task-minor-and-major-page-faults"},"Task: Minor and Major Page Faults"),(0,o.yg)("p",null,"The code in ",(0,o.yg)("inlineCode",{parentName:"p"},"page-faults/support/page_faults.c")," generates some minor and major page faults.\nOpen 2 terminals: one in which you will run the program, and one which will monitor the page faults of the program.\nIn the monitoring terminal, run the following command:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-console"},"watch -n 1 'ps -eo min_flt,maj_flt,cmd | grep ./page_faults | head -n 1'\n")),(0,o.yg)("p",null,"Compile the program and run it in the other terminal.\nYou must press ",(0,o.yg)("inlineCode",{parentName:"p"},"enter")," one time, before the program will prompt you to press ",(0,o.yg)("inlineCode",{parentName:"p"},"enter")," more times.\nWatch the first number on the monitoring terminal;\nit increases.\nThose are the minor page faults."),(0,o.yg)("h3",{id:"minor-page-faults"},"Minor Page Faults"),(0,o.yg)("p",null,"A minor page fault is generated whenever a requested page is present in the physical memory, as a frame, but that frame isn't allocated to the process generating the request.\nThese types of page faults are the most common, and they happen when calling functions from dynamic libraries, allocating heap memory, loading programs, reading files that have been cached, and many more situations.\nNow back to the program."),(0,o.yg)("p",null,"The monitoring command already starts with some minor page faults, generated when loading the program."),(0,o.yg)("p",null,"After pressing ",(0,o.yg)("inlineCode",{parentName:"p"},"enter"),", the number increases, because a function from a dynamic library (libc) is fetched when the first ",(0,o.yg)("inlineCode",{parentName:"p"},"printf()")," is executed.\nSubsequent calls to functions that are in the same memory page as ",(0,o.yg)("inlineCode",{parentName:"p"},"printf()")," won't generate other page faults."),(0,o.yg)("p",null,'After allocating the 100 Bytes, you might not see the number of page faults increase.\nThis is because the "bookkeeping" data allocated by ',(0,o.yg)("inlineCode",{parentName:"p"},"malloc()")," was able to fit in an already mapped page.\nThe second allocation, the 1GB one, will always generate one minor page fault - for the bookkeeping data about the allocated memory zone.\nNotice that not all the pages for the 1GB are allocated.\nThey are allocated - and generate page faults - when modified.\nBy now you should know that this mechanism is called ",(0,o.yg)("a",{parentName:"p",href:"/operating-systems/75/Compute/lab7#copy-on-write"},"copy-on-write"),"."),(0,o.yg)("p",null,"Continue with pressing ",(0,o.yg)("inlineCode",{parentName:"p"},"enter")," and observing the effects util you reach opening ",(0,o.yg)("inlineCode",{parentName:"p"},"file.txt"),"."),(0,o.yg)("p",null,"Note that neither opening a file, getting information about it, nor mapping it in memory using ",(0,o.yg)("inlineCode",{parentName:"p"},"mmap()"),", generate page faults.\nAlso note the ",(0,o.yg)("inlineCode",{parentName:"p"},"posix_fadvise()")," call after the one to ",(0,o.yg)("inlineCode",{parentName:"p"},"fstat()"),".\nWith this call we force the OS to not cache the file, so we can generate a ",(0,o.yg)("strong",{parentName:"p"},"major page fault"),"."),(0,o.yg)("h3",{id:"major-page-faults"},"Major Page Faults"),(0,o.yg)("p",null,"Major page faults happen when a page is requested, but it isn't present in the physical memory.\nThese types of page faults happen in 2 situations:"),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},"a page that was swapped out (to the disk), due to lack of memory, is now accessed - this case is harder to show"),(0,o.yg)("li",{parentName:"ul"},"the OS needs to read a file from the disk, because the file contents aren't present in the cache - the case we are showing now")),(0,o.yg)("p",null,"Press ",(0,o.yg)("inlineCode",{parentName:"p"},"enter")," to print the file contents.\nNote the second number go up in the monitoring terminal."),(0,o.yg)("p",null,"Comment the ",(0,o.yg)("inlineCode",{parentName:"p"},"posix_fadvise()")," call, recompile the program, and run it again.\nYou won't get any major page fault, because the file contents are cached by the OS, to avoid those page faults.\nAs a rule, the OS will avoid major page faults whenever possible, because they are very costly in terms of running time."),(0,o.yg)("h2",{id:"task-shared-memory"},"Task: Shared Memory"),(0,o.yg)("p",null,"As you remember from the ",(0,o.yg)("a",{parentName:"p",href:"reading/process-memory.md#memory-mapping"},"Data chapter"),", one way to allocate a given number of pages is to use the ",(0,o.yg)("inlineCode",{parentName:"p"},"mmap()")," syscall.\nLet's look at its ",(0,o.yg)("a",{parentName:"p",href:"https://man7.org/linux/man-pages/man2/mmap.2.html"},"man page"),", specifically at the ",(0,o.yg)("inlineCode",{parentName:"p"},"flags")," argument.\nIts main purpose is to determine the way in which child processes interact with the mapped pages."),(0,o.yg)("p",null,(0,o.yg)("a",{parentName:"p",href:"Questions/mmap-cow-flag"},"Quiz")),(0,o.yg)("p",null,"Now let's test this flag, as well as its opposite: ",(0,o.yg)("inlineCode",{parentName:"p"},"MAP_SHARED"),".\nCompile and run the code in ",(0,o.yg)("inlineCode",{parentName:"p"},"shared-memory/support/shared_memory.c"),"."),(0,o.yg)("ol",null,(0,o.yg)("li",{parentName:"ol"},(0,o.yg)("p",{parentName:"li"},"See the value read by the parent is different from that written by the child.\nModify the ",(0,o.yg)("inlineCode",{parentName:"p"},"flags")," parameter of ",(0,o.yg)("inlineCode",{parentName:"p"},"mmap()")," so they are the same.")),(0,o.yg)("li",{parentName:"ol"},(0,o.yg)("p",{parentName:"li"},"Create a semaphore in the shared page and use it to make the parent signal the child before it can exit.\nUse the API defined in ",(0,o.yg)("a",{parentName:"p",href:"https://man7.org/linux/man-pages/man0/semaphore.h.0p.html"},(0,o.yg)("inlineCode",{parentName:"a"},"semaphore.h")),"."),(0,o.yg)("pre",{parentName:"li"},(0,o.yg)("code",{parentName:"pre"},"**Be careful!**\nThe value written and read previously by the child and the parent, respectively, must not change.\n\nOne way of creating a shared semaphore is to place it within a shared memory area, as we've just done.\nThis only works between \"related\" processes.\nIf you want to share a semaphore or other types of memory between any two processes, you need filesystem support.\nFor this, you should use **named semaphores**, created using [`sem_open()`](https://man7.org/linux/man-pages/man3/sem_open.3.html).\nYou'll get more accustomed to such functions in the [Application Interaction chapter].\n")))),(0,o.yg)("h2",{id:"usage-of-processes-and-threads-in-apache2"},"Usage of Processes and Threads in ",(0,o.yg)("inlineCode",{parentName:"h2"},"apache2")),(0,o.yg)("p",null,"We'll take a look at how a real-world application - the ",(0,o.yg)("inlineCode",{parentName:"p"},"apache2")," HTTP server - makes use of processes and threads.\nSince the server must be able to handle multiple clients at the same time, it must therefore use some form of concurrency.\nWhen a new client arrives, the server offloads the work of interacting with that client to another process or thread."),(0,o.yg)("p",null,"The choice of whether to use multiple processes or threads is not baked into the code.\nInstead, ",(0,o.yg)("inlineCode",{parentName:"p"},"apache2")," provides a couple of modules called MPMs (Multi-Processing Modules).\nEach module implements a different concurrency model, and the users can pick whatever module best fits their needs by editing the server configuration files."),(0,o.yg)("p",null,"The most common MPMs are"),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("inlineCode",{parentName:"li"},"prefork"),": there are multiple worker processes, each process is single-threaded and handles one client request at a time"),(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("inlineCode",{parentName:"li"},"worker"),": there are multiple worker processes, each process is multi-threaded, and each thread handles one client request at a time"),(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("inlineCode",{parentName:"li"},"event"),": same as ",(0,o.yg)("inlineCode",{parentName:"li"},"worker")," but designed to better handle some particular use cases")),(0,o.yg)("p",null,"In principle, ",(0,o.yg)("inlineCode",{parentName:"p"},"prefork")," provides more stability and backwards compatibility, but it has a bigger overhead.\nOn the other hand, ",(0,o.yg)("inlineCode",{parentName:"p"},"worker")," and ",(0,o.yg)("inlineCode",{parentName:"p"},"event")," are more scalable, and thus able to handle more simultaneous connections, due to the usage of threads.\nOn modern systems, ",(0,o.yg)("inlineCode",{parentName:"p"},"event")," is almost always the default."),(0,o.yg)("h3",{id:"conclusion"},"Conclusion"),(0,o.yg)("p",null,'So far, you\'ve probably seen that spawning a process can "use" a different program (hence the path in the args of ',(0,o.yg)("inlineCode",{parentName:"p"},"system")," or ",(0,o.yg)("inlineCode",{parentName:"p"},"Popen"),"), but some languages such as Python allow you to spawn a process that executes a function from the same script.\nA thread, however, can only start from a certain entry point ",(0,o.yg)("strong",{parentName:"p"},"within the current address space"),", as it is bound to the same process.\nConcretely, a process is but a group of threads.\nFor this reason, when we talk about scheduling or synchronization, we talk about threads.\nA thread is, thus, an abstraction of a task running on a CPU core.\nA process is a logical group of such tasks."),(0,o.yg)("p",null,"We can sum up what we've learned so far by saying that processes are better used for separate, independent work, such as the different connections handled by a server.\nConversely, threads are better suited for replicated work: when the same task has to be performed on multiple cores.\nHowever, replicated work can also be suited for processes.\nDistributed applications, however, leverage different processes as this allows them to run on multiple physical machines at once.\nThis is required by the very large workloads such applications are commonly required to process."),(0,o.yg)("p",null,"These rules are not set in stone, though.\nLike we saw in the ",(0,o.yg)("inlineCode",{parentName:"p"},"apache2")," example, the server uses multiple threads as well as multiple processes.\nThis provides a degree of stability - if one worker thread crashes, it will only crash the other threads belonging to the same process - while still taking advantage of the light resource usage inherent to threads."),(0,o.yg)("p",null,"These kinds of trade-offs are a normal part of the development of real-world applications."),(0,o.yg)("h2",{id:"copy-on-write"},"Copy-on-Write"),(0,o.yg)("p",null,'So far, you know that the parent and child process have separate virtual address spaces.\nBut how are they created, namely how are they "separated"?\nAnd what about the ',(0,o.yg)("strong",{parentName:"p"},"PAS (physical address space)"),"?\nOf course, we would like the stack of the parent, for example, to be physically distinct from that of the child, so they can execute different functions and use different local variables."),(0,o.yg)("p",null,"But should ",(0,o.yg)("strong",{parentName:"p"},"all")," memory sections from the PAS of the parent be distinct from that of the child?\nWhat about some read-only memory sections, such as ",(0,o.yg)("inlineCode",{parentName:"p"},".text")," and ",(0,o.yg)("inlineCode",{parentName:"p"},".rodata"),"?\nAnd what about the heap, where the child ",(0,o.yg)("em",{parentName:"p"},"may")," use some data previously written by the parent and then override it with its own data."),(0,o.yg)("p",null,"The answer to all of these questions is a core mechanism of multiprocess operating systems called ",(0,o.yg)("strong",{parentName:"p"},"Copy-on-Write"),".\nIt works according to one very simple principle:"),(0,o.yg)("blockquote",null,(0,o.yg)("p",{parentName:"blockquote"},"The VAS of the child process initially points to the same PAS as that of the parent.\nA (physical) frame is only duplicated by the child when it attempts to ",(0,o.yg)("strong",{parentName:"p"},"write")," data to it.")),(0,o.yg)("p",null,"This ensures that read-only sections remain shared, while writable sections are shared as long as their contents remain unchanged.\nWhen changes happen, the process making the change receives a unique frame as a modified copy of the original frame ",(0,o.yg)("em",{parentName:"p"},"on demand"),"."),(0,o.yg)("p",null,"In the image below, we have the state of the child and parent processes right after ",(0,o.yg)("inlineCode",{parentName:"p"},"fork()")," returns in both of them.\nSee how each has its own VAS, both of them being mapped to (mostly) the same PAS."),(0,o.yg)("p",null,(0,o.yg)("img",{alt:"Copy-on-Write",src:a(4352).A})),(0,o.yg)("p",null,"When one process writes data to a writeable page (in our case, the child writes to a heap page), the frame to which it corresponds is first duplicated.\nThen the process' page table points the page to the newly copied frame, as you can see in the image below."),(0,o.yg)("p",null,(0,o.yg)("img",{alt:"Copy-on-Write",src:a(3092).A})),(0,o.yg)("p",null,(0,o.yg)("strong",{parentName:"p"},"Be careful!"),"\nDo not confuse ",(0,o.yg)("strong",{parentName:"p"},"copy-on-write")," with ",(0,o.yg)("strong",{parentName:"p"},"demand paging"),".\nRemember from the ",(0,o.yg)("a",{parentName:"p",href:"lab3.md#working-with-memory"},"Data chapter")," that ",(0,o.yg)("strong",{parentName:"p"},"demand paging")," means that when you allocate memory, the OS allocates virtual memory that remains unmapped to physical memory until it's used.\nOn the other hand, ",(0,o.yg)("strong",{parentName:"p"},"copy-on-write")," posits that the virtual memory is already mapped to some frames.\nThese frames are only duplicated when one of the processes attempts to write data to them."),(0,o.yg)("h2",{id:"guide-apache2-live-action"},"Guide: ",(0,o.yg)("inlineCode",{parentName:"h2"},"apache2")," Live Action"),(0,o.yg)("p",null,"Let's run an actual instance of ",(0,o.yg)("inlineCode",{parentName:"p"},"apache2")," and see how everything works.\nGo to ",(0,o.yg)("inlineCode",{parentName:"p"},"apache2/support")," and run ",(0,o.yg)("inlineCode",{parentName:"p"},"make run"),".\nThis will start a container with ",(0,o.yg)("inlineCode",{parentName:"p"},"apache2")," running inside."),(0,o.yg)("p",null,"Check that the server runs as expected:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-console"},"student@os:~$ curl localhost:8080\n<html><body><h1>It works!</h1></body></html>\n")),(0,o.yg)("p",null,"Now go inside the container and take a look at running processes:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-console"},"student@os:~/.../apache2/support$ docker exec -it apache2-test bash\n\nroot@56b9a761d598:/usr/local/apache2# ps -ef\nUID          PID    PPID  C STIME TTY          TIME CMD\nroot           1       0  0 20:38 pts/0    00:00:00 httpd -DFOREGROUND\nwww-data       9       1  0 20:38 pts/0    00:00:00 httpd -DFOREGROUND\nwww-data      10       1  0 20:38 pts/0    00:00:00 httpd -DFOREGROUND\nroot          25       0  0 20:40 pts/1    00:00:00 bash\nroot          31      25  0 20:40 pts/1    00:00:00 ps -ef\n")),(0,o.yg)("p",null,"We see 3 ",(0,o.yg)("inlineCode",{parentName:"p"},"httpd")," processes.\nThe first one, running as root, is the main process, while the other 2 are the workers."),(0,o.yg)("p",null,"Let's confirm that we are using the ",(0,o.yg)("inlineCode",{parentName:"p"},"event")," mpm:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-console"},"root@56b9a761d598:/usr/local/apache2# grep mod_mpm conf/httpd.conf\nLoadModule mpm_event_module modules/mod_mpm_event.so\nLoadModule mpm_prefork_module modules/mod_mpm_prefork.so\nLoadModule mpm_worker_module modules/mod_mpm_worker.so\n")),(0,o.yg)("p",null,"The ",(0,o.yg)("inlineCode",{parentName:"p"},"event")," mpm is enabled, so we expect each worker to be multithreaded.\nLet's check:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-console"},"root@56b9a761d598:/usr/local/apache2# ps -efL\nUID          PID    PPID     LWP  C NLWP STIME TTY          TIME CMD\nroot           1       0       1  0    1 20:56 pts/0    00:00:00 httpd -DFOREGROUND\nwww-data       8       1       8  0    7 20:56 pts/0    00:00:00 httpd -DFOREGROUND\nwww-data       8       1      11  0    7 20:56 pts/0    00:00:00 httpd -DFOREGROUND\nwww-data       8       1      12  0    7 20:56 pts/0    00:00:00 httpd -DFOREGROUND\nwww-data       8       1      16  0    7 20:56 pts/0    00:00:00 httpd -DFOREGROUND\nwww-data       8       1      17  0    7 20:56 pts/0    00:00:00 httpd -DFOREGROUND\nwww-data       8       1      18  0    7 20:56 pts/0    00:00:00 httpd -DFOREGROUND\nwww-data       8       1      19  0    7 20:56 pts/0    00:00:00 httpd -DFOREGROUND\nwww-data       9       1       9  0    7 20:56 pts/0    00:00:00 httpd -DFOREGROUND\nwww-data       9       1      14  0    7 20:56 pts/0    00:00:00 httpd -DFOREGROUND\nwww-data       9       1      15  0    7 20:56 pts/0    00:00:00 httpd -DFOREGROUND\nwww-data       9       1      20  0    7 20:56 pts/0    00:00:00 httpd -DFOREGROUND\nwww-data       9       1      21  0    7 20:56 pts/0    00:00:00 httpd -DFOREGROUND\nwww-data       9       1      22  0    7 20:56 pts/0    00:00:00 httpd -DFOREGROUND\nwww-data       9       1      23  0    7 20:56 pts/0    00:00:00 httpd -DFOREGROUND\nroot          24       0      24  1    1 20:56 pts/1    00:00:00 bash\nroot          30      24      30  0    1 20:56 pts/1    00:00:00 ps -efL\n")),(0,o.yg)("p",null,"Indeed, each worker has 7 threads.\nIn fact, the number of threads per worker is configurable, as well as the number of initial workers."),(0,o.yg)("p",null,"When a new connection is created, it will be handled by whatever thread is available from any worker.\nIf all the threads are busy, then the server will spawn more worker processes (and therefore more threads), as long as the total number of threads is below some threshold, which is also configurable."),(0,o.yg)("p",null,"Let's see this dynamic scaling in action.\nWe need to create a number of simultaneous connections that is larger than the current number of threads.\nThere is a simple script in ",(0,o.yg)("inlineCode",{parentName:"p"},"/apache2/supportmake_conn.py")," to do this:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-console"},"student@os:~/.../apache2/support$ python3 make_conn.py localhost 8080\nPress ENTER to exit\n")),(0,o.yg)("p",null,"The script has created 100 connections and will keep them open until we press Enter."),(0,o.yg)("p",null,"Now, in another terminal, let's check the situation inside the container:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-console"},"student@os:~/.../apache2/support$ docker exec -it apache2-test bash\n\nroot@56b9a761d598:/usr/local/apache2# ps -efL\nUID          PID    PPID     LWP  C NLWP STIME TTY          TIME CMD\nroot           1       0       1  0    1 20:56 pts/0    00:00:00 httpd -DFOREGROUND\nwww-data      40       1      40  0    7 21:07 pts/0    00:00:00 httpd -DFOREGROUND\nwww-data      40       1      45  0    7 21:07 pts/0    00:00:00 httpd -DFOREGROUND\nwww-data      40       1      46  0    7 21:07 pts/0    00:00:00 httpd -DFOREGROUND\nwww-data      40       1      51  0    7 21:07 pts/0    00:00:00 httpd -DFOREGROUND\nwww-data      40       1      52  0    7 21:07 pts/0    00:00:00 httpd -DFOREGROUND\nwww-data      40       1      53  0    7 21:07 pts/0    00:00:00 httpd -DFOREGROUND\nwww-data      40       1      54  0    7 21:07 pts/0    00:00:00 httpd -DFOREGROUND\nwww-data      55       1      55  0    7 21:07 pts/0    00:00:00 httpd -DFOREGROUND\nwww-data      55       1      58  0    7 21:07 pts/0    00:00:00 httpd -DFOREGROUND\nwww-data      55       1      60  0    7 21:07 pts/0    00:00:00 httpd -DFOREGROUND\nwww-data      55       1      62  0    7 21:07 pts/0    00:00:00 httpd -DFOREGROUND\nwww-data      55       1      63  0    7 21:07 pts/0    00:00:00 httpd -DFOREGROUND\nwww-data      55       1      65  0    7 21:07 pts/0    00:00:00 httpd -DFOREGROUND\nwww-data      55       1      66  0    7 21:07 pts/0    00:00:00 httpd -DFOREGROUND\n[...]\nwww-data     109       1     109  0    7 21:07 pts/0    00:00:00 httpd -DFOREGROUND\nwww-data     109       1     115  0    7 21:07 pts/0    00:00:00 httpd -DFOREGROUND\nwww-data     109       1     116  0    7 21:07 pts/0    00:00:00 httpd -DFOREGROUND\nwww-data     109       1     121  0    7 21:07 pts/0    00:00:00 httpd -DFOREGROUND\nwww-data     109       1     122  0    7 21:07 pts/0    00:00:00 httpd -DFOREGROUND\nwww-data     109       1     123  0    7 21:07 pts/0    00:00:00 httpd -DFOREGROUND\nwww-data     109       1     124  0    7 21:07 pts/0    00:00:00 httpd -DFOREGROUND\nroot         146       0     146  0    1 21:10 pts/1    00:00:00 bash\nroot         152     146     152  0    1 21:10 pts/1    00:00:00 ps -efL\n")),(0,o.yg)("p",null,"We see a much larger number of threads, as expected."),(0,o.yg)("h2",{id:"guide-fork-faults"},"Guide: Fork Faults"),(0,o.yg)("p",null,"Now let's see the copy-on-write mechanism in practice.\nKeep in mind that ",(0,o.yg)("inlineCode",{parentName:"p"},"fork()")," is a function used to create a process."),(0,o.yg)("p",null,"Open two terminals (or better: use ",(0,o.yg)("a",{parentName:"p",href:"https://github.com/tmux/tmux/wiki"},(0,o.yg)("inlineCode",{parentName:"a"},"tmux")),").\nIn one of them, compile and run the code in ",(0,o.yg)("inlineCode",{parentName:"p"},"fork-faults/support/fork_faults.c"),".\nAfter each time you press ",(0,o.yg)("inlineCode",{parentName:"p"},"Enter")," in the first terminal window, run the following command in the second window:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-console"},"student@os:~/.../fork-faults/support$ ps -o min_flt,maj_flt -p $(pidof fork_faults)\n")),(0,o.yg)("p",null,"It will show you the number of minor and major page faults performed by the ",(0,o.yg)("inlineCode",{parentName:"p"},"fork_faults")," process and its child."),(0,o.yg)("p",null,"To better understand minor and major page faults, go through the ",(0,o.yg)("a",{parentName:"p",href:"/operating-systems/75/Compute/lab7#task-minor-and-major-page-faults"},"Minor and Major Page Faults")," exercise in Arena."),(0,o.yg)("p",null,(0,o.yg)("a",{parentName:"p",href:"Questions/parent-faults-before-fork"},"Quiz 1")),(0,o.yg)("p",null,"Note that after ",(0,o.yg)("inlineCode",{parentName:"p"},"fork()"),"-ing, there is a second row in the output of ",(0,o.yg)("inlineCode",{parentName:"p"},"ps"),".\nThat corresponds to the child process.\nThe first one still corresponds to the parent."),(0,o.yg)("p",null,(0,o.yg)("a",{parentName:"p",href:"Questions/child-faults-after-write"},"Quiz 2")),(0,o.yg)("p",null,"Now it should be clear how demand paging differs from copy-on-write.\nShared memory is a similar concept.\nIt's a way of marking certain allocated pages so that copy-on-write is disabled.\nAs you may imagine, changes made by the parent to this memory are visible to the child and vice-versa.\nYou can learn more about it in ",(0,o.yg)("a",{parentName:"p",href:"/operating-systems/75/Compute/lab7#task-shared-memory"},"its dedicated section in the Arena")))}m.isMDXComponent=!0},3092:(e,t,a)=>{a.d(t,{A:()=>n});const n=a.p+"assets/images/copy-on-write-final-2dfe1835636c0b38b11fed42b5b690d2.svg"},4352:(e,t,a)=>{a.d(t,{A:()=>n});const n=a.p+"assets/images/copy-on-write-initial-a3673d26b2087aaacf630bc556e0a6a8.svg"}}]);