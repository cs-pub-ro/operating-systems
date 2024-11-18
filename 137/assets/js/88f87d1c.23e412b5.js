"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[8224],{5680:(e,t,n)=>{n.d(t,{xA:()=>d,yg:()=>h});var a=n(6540);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var o=a.createContext({}),p=function(e){var t=a.useContext(o),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},d=function(e){var t=p(e.components);return a.createElement(o.Provider,{value:t},e.children)},c="mdxType",g={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,o=e.parentName,d=l(e,["components","mdxType","originalType","parentName"]),c=p(n),u=r,h=c["".concat(o,".").concat(u)]||c[u]||g[u]||i;return n?a.createElement(h,s(s({ref:t},d),{},{components:n})):a.createElement(h,s({ref:t},d))}));function h(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,s=new Array(i);s[0]=u;var l={};for(var o in t)hasOwnProperty.call(t,o)&&(l[o]=t[o]);l.originalType=e,l[c]="string"==typeof e?e:r,s[1]=l;for(var p=2;p<i;p++)s[p]=n[p];return a.createElement.apply(null,s)}return a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},8655:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>o,contentTitle:()=>s,default:()=>g,frontMatter:()=>i,metadata:()=>l,toc:()=>p});var a=n(8168),r=(n(6540),n(5680));const i={},s="Parallel Firewall",l={unversionedId:"Assignments/Parallel Firewall/README",id:"Assignments/Parallel Firewall/README",title:"Parallel Firewall",description:"Objectives",source:"@site/docs/Assignments/Parallel Firewall/README.md",sourceDirName:"Assignments/Parallel Firewall",slug:"/Assignments/Parallel Firewall/",permalink:"/operating-systems/137/Assignments/Parallel Firewall/",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"Memory Allocator",permalink:"/operating-systems/137/Assignments/Memory Allocator/"},next:{title:"Minishell",permalink:"/operating-systems/137/Assignments/Mini Shell/"}},o={},p=[{value:"Objectives",id:"objectives",level:2},{value:"Statement",id:"statement",level:2},{value:"Support Code",id:"support-code",level:2},{value:"Implementation",id:"implementation",level:2},{value:"Firewall Threads",id:"firewall-threads",level:3},{value:"Ring Buffers",id:"ring-buffers",level:3},{value:"Log File",id:"log-file",level:3},{value:"Operations",id:"operations",level:2},{value:"Building",id:"building",level:3},{value:"Testing and Grading",id:"testing-and-grading",level:2},{value:"Restrictions",id:"restrictions",level:3},{value:"Grades",id:"grades",level:3},{value:"Running the Checker",id:"running-the-checker",level:3},{value:"Running the Linters",id:"running-the-linters",level:3},{value:"Fine-Grained Testing",id:"fine-grained-testing",level:3}],d={toc:p},c="wrapper";function g(e){let{components:t,...n}=e;return(0,r.yg)(c,(0,a.A)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,r.yg)("h1",{id:"parallel-firewall"},"Parallel Firewall"),(0,r.yg)("h2",{id:"objectives"},"Objectives"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"Learn how to design and implement parallel programs"),(0,r.yg)("li",{parentName:"ul"},"Get experienced at utilizing the POSIX threading API"),(0,r.yg)("li",{parentName:"ul"},"Learn how to convert a serial program into a parallel one")),(0,r.yg)("h2",{id:"statement"},"Statement"),(0,r.yg)("p",null,"A firewall is a program that checks network packets against a series of filters which provide a decision regarding dropping or allowing the packets to continue to their intended destination."),(0,r.yg)("p",null,(0,r.yg)("strong",{parentName:"p"},"In a real setup"),", the network card will receive real packets (e.g. packets having ",(0,r.yg)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/Ethernet_frame"},(0,r.yg)("inlineCode",{parentName:"a"},"Ethernet")),", ",(0,r.yg)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/IPv4"},(0,r.yg)("inlineCode",{parentName:"a"},"IP"))," headers plus payload) from the network and will send them to the firewall for processing.\nThe firewall will decide if the packets are to be dropped or not and, if not, passes them further."),(0,r.yg)("p",null,(0,r.yg)("strong",{parentName:"p"},"In this assignment"),", instead of real network packets, we'll deal with made up packets consisting of a made up source (a number), a made up destination (also a number), a timestamp (also a number) and some payload.\nAnd instead of the network card providing the packets, we'll have a ",(0,r.yg)("strong",{parentName:"p"},"producer thread")," creating these packets."),(0,r.yg)("p",null,"The created packets will be inserted into a ",(0,r.yg)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/Circular_buffer"},(0,r.yg)("inlineCode",{parentName:"a"},"circular buffer")),", out of which ",(0,r.yg)("strong",{parentName:"p"},"consumer threads")," (which implement the firewall logic) will take packets and process them in order to decide whether they advance to the destination."),(0,r.yg)("p",null,"The result of this processing is a log file in which the firewall will record the decision taken (PASS or DROP) for each packet, along with other information such as timestamp."),(0,r.yg)("p",null,"The purpose of this assignment is to:"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},"implement the circular buffer, along with synchronization mechanisms for it to work in a multithreaded program")),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},"implement the consumer threads, which consume packets and process them")),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},"provide the log file containing the result of the packet processing"))),(0,r.yg)("h2",{id:"support-code"},"Support Code"),(0,r.yg)("p",null,"The support code consists of the directories:"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},(0,r.yg)("inlineCode",{parentName:"p"},"src/")," contains the skeleton for the parallelized firewall and the already implemented serial code in ",(0,r.yg)("inlineCode",{parentName:"p"},"src/serial.c"),".\nYou will have to implement the missing parts marked as ",(0,r.yg)("inlineCode",{parentName:"p"},"TODO"))),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},(0,r.yg)("inlineCode",{parentName:"p"},"utils/")," contains utility files used for debugging and logging.")),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},(0,r.yg)("inlineCode",{parentName:"p"},"tests/")," contains tests used to validate and grade the assignment."))),(0,r.yg)("h2",{id:"implementation"},"Implementation"),(0,r.yg)("h3",{id:"firewall-threads"},"Firewall Threads"),(0,r.yg)("p",null,"In order to parallelize the firewall we have to distribute the packets to multiple threads.\nThe packets will be added to a shared data structure (visible to all threads) by a ",(0,r.yg)("inlineCode",{parentName:"p"},"producer")," thread and processed by multiple ",(0,r.yg)("inlineCode",{parentName:"p"},"consumer")," threads.\nEach ",(0,r.yg)("inlineCode",{parentName:"p"},"consumer")," thread picks a packet from the shared data structure, checks it against the filter function and writes the packet hash together with the drop/accept decision to a log file.\n",(0,r.yg)("inlineCode",{parentName:"p"},"consumer")," threads stop waiting for new packets from the ",(0,r.yg)("inlineCode",{parentName:"p"},"producer")," thread and exit when the ",(0,r.yg)("inlineCode",{parentName:"p"},"producer")," thread closes the connection to the shared data structure."),(0,r.yg)("p",null,"The ",(0,r.yg)("inlineCode",{parentName:"p"},"consumer")," threads ",(0,r.yg)("strong",{parentName:"p"},"must not do any form of busy waiting"),".\nWhen there are new packets that need to be handled, the ",(0,r.yg)("inlineCode",{parentName:"p"},"consumer")," threads must be ",(0,r.yg)("strong",{parentName:"p"},"notified"),".\n",(0,r.yg)("strong",{parentName:"p"},"Waiting in a ",(0,r.yg)("inlineCode",{parentName:"strong"},"while()")," loop or sleeping is not considered a valid synchronization mechanism and points will be deducted.")),(0,r.yg)("p",null,"Implement the ",(0,r.yg)("inlineCode",{parentName:"p"},"consumer")," related functions marked with ",(0,r.yg)("inlineCode",{parentName:"p"},"TODO")," in the ",(0,r.yg)("inlineCode",{parentName:"p"},"src/consumer.c")," file.\n",(0,r.yg)("strong",{parentName:"p"},"The number of consumer threads will be passed as the 3rd command-line argument")),(0,r.yg)("h3",{id:"ring-buffers"},"Ring Buffers"),(0,r.yg)("p",null,"A ring buffer (or a circular buffer) is a data structure that stores its elements in a circular fixed size array.\nOne of the advantages of using such a data structure as opposed to an array is that it acts as a FIFO, without the overhead of moving the elements to the left as they are consumed.\nThus, the shared ring buffer offers the following fields:"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("inlineCode",{parentName:"li"},"write_pos")," index in the buffer used by the ",(0,r.yg)("inlineCode",{parentName:"li"},"producer")," thread for appending new packets."),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("inlineCode",{parentName:"li"},"read_pos"),"  index in the buffer used by the ",(0,r.yg)("inlineCode",{parentName:"li"},"consumer")," threads to pick packets."),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("inlineCode",{parentName:"li"},"cap")," the size of the internal buffer."),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("inlineCode",{parentName:"li"},"data")," pointer to the internal buffer.")),(0,r.yg)("p",null,"Apart from these fields you have to add synchronization primitives in order to allow multiple threads to access the ring buffer in a deterministic manner.\nYou can use mutexes, semaphores, conditional variables and other synchronization mechanisms offered by the ",(0,r.yg)("inlineCode",{parentName:"p"},"pthread")," library."),(0,r.yg)("p",null,"You will have to implement the following interface for the ring buffer:"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("inlineCode",{parentName:"li"},"ring_buffer_init()"),": initialize the ring buffer (allocate memory and synchronization primitives)."),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("inlineCode",{parentName:"li"},"ring_buffer_enqueue()"),": add elements to the ring buffer."),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("inlineCode",{parentName:"li"},"ring_buffer_dequeue()"),": remove elements from the ring buffer."),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("inlineCode",{parentName:"li"},"ring_buffer_destroy()"),": free up the memory used by the ring_buffer."),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("inlineCode",{parentName:"li"},"ring_buffer_stop()"),": finish up using the ring buffer for the calling thread.")),(0,r.yg)("h3",{id:"log-file"},"Log File"),(0,r.yg)("p",null,"The output of the firewall will be a log file with the rows containing the firewall's decision, the hash of the packet and its timestamp.\nThe actual format can be found in the serial implementation (at ",(0,r.yg)("inlineCode",{parentName:"p"},"src/serial.c"),")."),(0,r.yg)("p",null,"When processing the packets in parallel the threads will finish up the work in a non deterministic order.\nThe packet processing functions are already implemented in ",(0,r.yg)("inlineCode",{parentName:"p"},"src/packet.c")),(0,r.yg)("p",null,"We would like the logs to be sorted by the packet timestamp, the order that they came in from the producer.\nThus, the ",(0,r.yg)("inlineCode",{parentName:"p"},"consumers")," should insert the packet information to the log file such as the result is ordered by timestamp.\nThe printing format can be found in ",(0,r.yg)("inlineCode",{parentName:"p"},"./src/serial.c")),(0,r.yg)("p",null,"The logs must be written to the file in ascending order during packet processing.\n",(0,r.yg)("strong",{parentName:"p"},"Sorting the log file after the consumer threads have finished processing is not considered a valid synchronization mechanism and points will be deducted.")),(0,r.yg)("h2",{id:"operations"},"Operations"),(0,r.yg)("h3",{id:"building"},"Building"),(0,r.yg)("p",null,"To build both the serial and the parallel versions, run ",(0,r.yg)("inlineCode",{parentName:"p"},"make")," in the ",(0,r.yg)("inlineCode",{parentName:"p"},"src/")," directory:"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-console"},"student@so:~/.../content/assignments/parallel-firewall$ cd src/\n\nstudent@so:~/.../assignments/parallel-firewall/src$ make\n")),(0,r.yg)("p",null,"That will create the ",(0,r.yg)("inlineCode",{parentName:"p"},"serial")," and ",(0,r.yg)("inlineCode",{parentName:"p"},"firewall")," binaries."),(0,r.yg)("h2",{id:"testing-and-grading"},"Testing and Grading"),(0,r.yg)("p",null,"Testing is automated.\nTests are located in the ",(0,r.yg)("inlineCode",{parentName:"p"},"tests/")," directory."),(0,r.yg)("p",null,"To test and grade your assignment solution, enter the ",(0,r.yg)("inlineCode",{parentName:"p"},"tests/")," directory and run ",(0,r.yg)("inlineCode",{parentName:"p"},"grade.sh"),"."),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-console"},"student@so:~/.../content/assignments/parallel-firewall$ cd tests/\n")),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-console"},"student@so:~/.../content/assignments/parallel-firewall/tests$ ./grade.sh\n")),(0,r.yg)("p",null,"Note that this requires linters being available.\nThe easiest way to test the project is to use a Docker-based setup with everything installed and configured (see the ",(0,r.yg)("a",{parentName:"p",href:"README.checker.md"},"README.checker.md")," file for instructions)."),(0,r.yg)("p",null,"To create the tests, run:"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-console"},"student@so:~/.../content/assignments/parallel-firewall/tests$ make check\n")),(0,r.yg)("p",null,"To remove the tests, run:"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-console"},"student@so:~/.../content/assignments/parallel-firewall/tests$ make distclean\n")),(0,r.yg)("p",null,"When using ",(0,r.yg)("inlineCode",{parentName:"p"},"grade.sh")," you will get a maximum of 90/100 points for general correctness and a maximum of 10/100 points for coding style."),(0,r.yg)("h3",{id:"restrictions"},"Restrictions"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"Threads must yield the cpu when waiting for empty/full buffers i.e. not doing ",(0,r.yg)("inlineCode",{parentName:"li"},"busy waiting"),"."),(0,r.yg)("li",{parentName:"ul"},"The logs must be written as they are processed and not after the processing is done, in ascending order by the timestamp."),(0,r.yg)("li",{parentName:"ul"},"The number of running threads must be at least ",(0,r.yg)("inlineCode",{parentName:"li"},"num_consumers + 1"),", where ",(0,r.yg)("inlineCode",{parentName:"li"},"num_consumers")," is the 3rd command-line argument of the ",(0,r.yg)("inlineCode",{parentName:"li"},"firewall")," binary.")),(0,r.yg)("h3",{id:"grades"},"Grades"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"10 points are awarded for a single consumer solution that also implements the ring buffer"),(0,r.yg)("li",{parentName:"ul"},"50 points are awarded for a multi consumer solution"),(0,r.yg)("li",{parentName:"ul"},"30 points are awarded for a multi consumer solution that writes the logs in the sorted manner (bearing in mind the above restrictions)")),(0,r.yg)("h3",{id:"running-the-checker"},"Running the Checker"),(0,r.yg)("p",null,"Each test is worth a number of points.\nThe maximum grade is ",(0,r.yg)("inlineCode",{parentName:"p"},"90"),"."),(0,r.yg)("p",null,"A successful run will show the output:"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-console"},"student@so:~/.../assignments/parallel-firewall/tests$ make check\n[...]\nTest [    10 packets, sort False, 1 thread ] ...................... passed ... 3\nTest [ 1,000 packets, sort False, 1 thread ] ...................... passed ... 3\nTest [20,000 packets, sort False, 1 thread ] ...................... passed ... 4\nTest [    10 packets, sort True , 2 threads] ...................... passed ... 5\nTest [    10 packets, sort True , 4 threads] ...................... passed ... 5\nTest [   100 packets, sort True , 2 threads] ...................... passed ... 5\nTest [   100 packets, sort True , 4 threads] ...................... passed ... 5\nTest [ 1,000 packets, sort True , 2 threads] ...................... passed ... 5\nTest [ 1,000 packets, sort True , 4 threads] ...................... passed ... 5\nTest [10,000 packets, sort True , 2 threads] ...................... passed ... 5\nTest [10,000 packets, sort True , 4 threads] ...................... passed ... 5\nTest [20,000 packets, sort True , 2 threads] ...................... passed ... 5\nTest [20,000 packets, sort True , 4 threads] ...................... passed ... 5\nTest [ 1,000 packets, sort False, 4 threads] ...................... passed ... 5\nTest [ 1,000 packets, sort False, 8 threads] ...................... passed ... 5\nTest [10,000 packets, sort False, 4 threads] ...................... passed ... 5\nTest [10,000 packets, sort False, 8 threads] ...................... passed ... 5\nTest [20,000 packets, sort False, 4 threads] ...................... passed ... 5\nTest [20,000 packets, sort False, 8 threads] ...................... passed ... 5\n\nChecker:                                                                    90/100\n")),(0,r.yg)("h3",{id:"running-the-linters"},"Running the Linters"),(0,r.yg)("p",null,"To run the linters, use the ",(0,r.yg)("inlineCode",{parentName:"p"},"make lint")," command in the ",(0,r.yg)("inlineCode",{parentName:"p"},"tests/")," directory:"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-console"},"student@so:~/.../assignments/parallel-firewall/tests$ make lint\n[...]\ncd .. && checkpatch.pl -f checker/*.sh tests/*.sh\n[...]\ncd .. && cpplint --recursive src/ tests/ checker/\n[...]\ncd .. && shellcheck checker/*.sh tests/*.sh\n")),(0,r.yg)("p",null,"Note that the linters have to be installed on your system: ",(0,r.yg)("a",{parentName:"p",href:"https://.com/torvalds/linux/blob/master/scripts/checkpatch.pl"},(0,r.yg)("inlineCode",{parentName:"a"},"checkpatch.pl")),", ",(0,r.yg)("a",{parentName:"p",href:"https://github.com/cpplint/cpplint"},(0,r.yg)("inlineCode",{parentName:"a"},"cpplint")),", ",(0,r.yg)("a",{parentName:"p",href:"https://www.shellcheck.net/"},(0,r.yg)("inlineCode",{parentName:"a"},"shellcheck")),".\nThey also need to have certain configuration options.\nIt's easiest to run them in a Docker-based setup with everything configured."),(0,r.yg)("h3",{id:"fine-grained-testing"},"Fine-Grained Testing"),(0,r.yg)("p",null,"Input tests cases are located in ",(0,r.yg)("inlineCode",{parentName:"p"},"tests/in/")," and are generated by the checker.\nThe expected results are generated by the checker while running the serial implementation.\nIf you want to run a single test, use the below commands while in the ",(0,r.yg)("inlineCode",{parentName:"p"},"src/")," directory:"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-console"},"student@so:~/.../assignments/parallel-firewall/src$ ./firewall ../tests/in/test_<num_packets>.in <output_file> <number_of_consumers>\n")),(0,r.yg)("p",null,"Results provided by the serial and parallel implementation must be the same for the test to successfully pass."))}g.isMDXComponent=!0}}]);