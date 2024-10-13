"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[4324],{5680:(e,t,a)=>{a.d(t,{xA:()=>c,yg:()=>m});var r=a(6540);function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){n(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function s(e,t){if(null==e)return{};var a,r,n=function(e,t){if(null==e)return{};var a,r,n={},o=Object.keys(e);for(r=0;r<o.length;r++)a=o[r],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)a=o[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var l=r.createContext({}),p=function(e){var t=r.useContext(l),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},c=function(e){var t=p(e.components);return r.createElement(l.Provider,{value:t},e.children)},d="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},y=r.forwardRef((function(e,t){var a=e.components,n=e.mdxType,o=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),d=p(a),y=n,m=d["".concat(l,".").concat(y)]||d[y]||u[y]||o;return a?r.createElement(m,i(i({ref:t},c),{},{components:a})):r.createElement(m,i({ref:t},c))}));function m(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=a.length,i=new Array(o);i[0]=y;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[d]="string"==typeof e?e:n,i[1]=s;for(var p=2;p<o;p++)i[p]=a[p];return r.createElement.apply(null,i)}return r.createElement.apply(null,a)}y.displayName="MDXCreateElement"},9489:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>u,frontMatter:()=>o,metadata:()=>s,toc:()=>p});var r=a(8168),n=(a(6540),a(5680));const o={},i="Lab 5 - Memory Security",s={unversionedId:"Data/lab5",id:"Data/lab5",title:"Lab 5 - Memory Security",description:"Memory Security",source:"@site/docs/Data/lab5.md",sourceDirName:"Data",slug:"/Data/lab5",permalink:"/operating-systems/77/Data/lab5",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"Lab 4 - Investigate Memory",permalink:"/operating-systems/77/Data/lab4"},next:{title:"Lecture",permalink:"/operating-systems/77/Lecture/"}},l={},p=[{value:"Memory Security",id:"memory-security",level:2},{value:"Wild Pointer Arithmetic Info Leak",id:"wild-pointer-arithmetic-info-leak",level:3},{value:"ASLR",id:"aslr",level:3},{value:"Stack Protector",id:"stack-protector",level:3},{value:"Bypassing the Stack Protector",id:"bypassing-the-stack-protector",level:3},{value:"Guides",id:"guides",level:2},{value:"Buffer Overflow Info Leak",id:"buffer-overflow-info-leak",level:3},{value:"Practice",id:"practice",level:4},{value:"Buffer Overflow Overwrite",id:"buffer-overflow-overwrite",level:3},{value:"Practice",id:"practice-1",level:4},{value:"Tasks",id:"tasks",level:2},{value:"Wild Pointer Arithmetic Info Leak",id:"wild-pointer-arithmetic-info-leak-1",level:3},{value:"ASLR",id:"aslr-1",level:3},{value:"Stack Protector",id:"stack-protector-1",level:3},{value:"Bypassing the Stack Protector",id:"bypassing-the-stack-protector-1",level:3},{value:"Shellcode Executor",id:"shellcode-executor",level:4}],c={toc:p},d="wrapper";function u(e){let{components:t,...a}=e;return(0,n.yg)(d,(0,r.A)({},c,a,{components:t,mdxType:"MDXLayout"}),(0,n.yg)("h1",{id:"lab-5---memory-security"},"Lab 5 - Memory Security"),(0,n.yg)("h2",{id:"memory-security"},"Memory Security"),(0,n.yg)("p",null,"Memory security is one of the most important aspects in today's computer systems.\nIts main objectives are to avoid the development of vulnerable code and prevent attackers from exploiting existing memory vulnerabilities.\nMemory protection techniques are implemented at all levels of memory abstraction: hardware, operating system and programming language.\nIn addition, third-party software tools may be used to statically and dynamically examine a program to identify vulnerabilities when working with memory."),(0,n.yg)("p",null,"In this section, we will focus on the main memory vulnerabilities and how to exploit them.\nWe will use the C programming language for presentation purposes, however, these examples may be reproduced in any language that implements arrays as pointers without bounds and allows the liberal use of pointers."),(0,n.yg)("h3",{id:"wild-pointer-arithmetic-info-leak"},"Wild Pointer Arithmetic Info Leak"),(0,n.yg)("p",null,"In C, once a pointer has been initialized with a valid address it can potentially access any location of the process address space.\nThis is problematic for situations where the binary contains sensitive information.\nTake for example a server that authenticates users: if the password is stored in some buffer, then if a pointer is wrongfully used, it can end up leaking the password."),(0,n.yg)("h3",{id:"aslr"},"ASLR"),(0,n.yg)("p",null,"Address Space Layout Randomization (ASLR) is a protection technique employed by operating systems to make it harder for attackers to identify code locations to jump to.\nEssentially, every program section (including shared library code) is mapped at a random virtual address every time the program is run.\nThat way, it is harder for the attacker to exploit a buffer overflow: the address of a potential code target is different with each run."),(0,n.yg)("p",null,"To enable randomization, there are 2 steps that need to be taken:"),(0,n.yg)("ol",null,(0,n.yg)("li",{parentName:"ol"},(0,n.yg)("p",{parentName:"li"},"Enable ASLR on the operating system.\nThis enables the operating system to map library code at different virtual addresses in a program.")),(0,n.yg)("li",{parentName:"ol"},(0,n.yg)("p",{parentName:"li"},"Compile our code as Position Independent Code (PIC).\nThis instructs the compiler to generate code such that it does not use absolute addresses when calling functions or accessing variables.\nAs a consequence, the code may be loaded at any given address in memory."))),(0,n.yg)("p",null,"On most Linux systems, ASLR is enabled by default.\nModern compilers generate position independent code by default."),(0,n.yg)("h3",{id:"stack-protector"},"Stack Protector"),(0,n.yg)("p",null,"As observed in the previous quiz, ASLR prevents an attacker (most of the times) from discovering a reliable address where to jump to, however, it does not prevent the occurrence of a buffer overflow.\nAn effective strategy to protect against buffer overflow is represented by the stack protector (or stack canary).\nBetween the end of the buffer and the return address (below the saved base pointer ",(0,n.yg)("inlineCode",{parentName:"p"},"rbp"),"), a random value is placed on the stack.\nBefore the function returns, the value is checked: if the initial value was modified, then an exception is issued and the program is aborted."),(0,n.yg)("p",null,"Stack canaries are enabled by default, however, for learning purposes we have disabled it by passing ",(0,n.yg)("inlineCode",{parentName:"p"},"-fno-stack-protector")," to the compiler."),(0,n.yg)("h3",{id:"bypassing-the-stack-protector"},"Bypassing the Stack Protector"),(0,n.yg)("p",null,"The stack protector is generally placed immediately after the old ",(0,n.yg)("inlineCode",{parentName:"p"},"rbp"),".\nWith this information we can craft various exploits to bypass it:"),(0,n.yg)("ul",null,(0,n.yg)("li",{parentName:"ul"},(0,n.yg)("p",{parentName:"li"},"Leak the canary and do not modify it.\nReading the canary, as long as we do not modify it is not going to cause any disturbances.\nIf we have the canary, we can just include it in our payload and happily overwrite the return address.")),(0,n.yg)("li",{parentName:"ul"},(0,n.yg)("p",{parentName:"li"},"If we have access to a pointer that we can modify appropriately, we can just jump over the canary and directly modify the return address.")),(0,n.yg)("li",{parentName:"ul"},(0,n.yg)("p",{parentName:"li"},"In case we have multiple buffers defined in the same stack frame, we can simply overwrite data in a buffer that is placed above the buffer we are exploiting without the stack protector intervention."))),(0,n.yg)("h2",{id:"guides"},"Guides"),(0,n.yg)("h3",{id:"buffer-overflow-info-leak"},"Buffer Overflow Info Leak"),(0,n.yg)("p",null,"Since arrays decay to pointers in C, the same effect may be obtained by using them."),(0,n.yg)("p",null,"Navigate to the ",(0,n.yg)("inlineCode",{parentName:"p"},"chapters/data/memory-security/guides/buffer-overflow-leak/support/")," directory.\nOpen and analyze the ",(0,n.yg)("inlineCode",{parentName:"p"},"array_leak.c")," file."),(0,n.yg)("p",null,"Compile and run the program.\nCan you extract any information from the output?\nCan you identify the return address of the main function?"),(0,n.yg)("p",null,(0,n.yg)("strong",{parentName:"p"},"Note:")," You can use ",(0,n.yg)("inlineCode",{parentName:"p"},"objdump -d -M intel array_leak")," to check the stack layout.\n",(0,n.yg)("strong",{parentName:"p"},"Note:")," Depending on the environment the layout may differ."),(0,n.yg)("p",null,"Next, open and analyze the ",(0,n.yg)("inlineCode",{parentName:"p"},"string_leak.c")," file.\nCompile and run the program.\nTo better understand the output, use ",(0,n.yg)("inlineCode",{parentName:"p"},"xxd")," to interpret the output as hexadecimal bytes:"),(0,n.yg)("pre",null,(0,n.yg)("code",{parentName:"pre",className:"language-console"},"student@os:~/.../guides/buffer-overflow-leak/support/$ ./string_leak | xxd\n")),(0,n.yg)("p",null,(0,n.yg)("strong",{parentName:"p"},"Note:")," ",(0,n.yg)("inlineCode",{parentName:"p"},"73")," and ",(0,n.yg)("inlineCode",{parentName:"p"},"6f")," are the ascii values of ",(0,n.yg)("inlineCode",{parentName:"p"},"s")," and ",(0,n.yg)("inlineCode",{parentName:"p"},"o")),(0,n.yg)("h4",{id:"practice"},"Practice"),(0,n.yg)("p",null,"In file ",(0,n.yg)("inlineCode",{parentName:"p"},"string_leak.c")," replace the usage of ",(0,n.yg)("inlineCode",{parentName:"p"},"memcpy")," with ",(0,n.yg)("inlineCode",{parentName:"p"},"strcpy"),".\nDo not modify anything else (including the size of the buffer).\nAs the name suggests, ",(0,n.yg)("inlineCode",{parentName:"p"},"strcpy()")," is specialized for string copies, therefore we don need to specify how much we want to copy.\nWhat is the result?\nIs the result correct?\nExplain the result."),(0,n.yg)("h3",{id:"buffer-overflow-overwrite"},"Buffer Overflow Overwrite"),(0,n.yg)("p",null,"Up until this point we have seen how we can exploit a buffer to leak information.\nHowever, this vulnerability may be used most of the time to overwrite data."),(0,n.yg)("p",null,"Take for example the code in ",(0,n.yg)("inlineCode",{parentName:"p"},"chapters/data/memory-security/guides/buffer-overflow-overwrite/support/bo_write.c"),".\nCompile and run the code.\nWhat happens?\nWhy?"),(0,n.yg)("h4",{id:"practice-1"},"Practice"),(0,n.yg)("p",null,"Open the ",(0,n.yg)("inlineCode",{parentName:"p"},"guides/buffer-overflow-overwrite/support/bo_write_practice.c")," file.\nAnalyze the code, then compile it and run it."),(0,n.yg)("ol",null,(0,n.yg)("li",{parentName:"ol"},(0,n.yg)("p",{parentName:"li"},'Try to find an input that alters the control flow of the program so that "Comm-link online" is printed.\nYou are not allowed to modify the source file.')),(0,n.yg)("li",{parentName:"ol"},(0,n.yg)("p",{parentName:"li"},'Try to find an input that alters the control flow of the program so that "Channel open." is printed.\nYou are not allowed to modify the source file.'))),(0,n.yg)("p",null,(0,n.yg)("strong",{parentName:"p"},"Note:")," Addresses are 8 bytes long on 64 bit machines."),(0,n.yg)("ol",null,(0,n.yg)("li",{parentName:"ol"},'Can you think of a different input that results in printing "Comm-link online"?')),(0,n.yg)("h2",{id:"tasks"},"Tasks"),(0,n.yg)("h3",{id:"wild-pointer-arithmetic-info-leak-1"},"Wild Pointer Arithmetic Info Leak"),(0,n.yg)("p",null,"Navigate to the ",(0,n.yg)("inlineCode",{parentName:"p"},"chapters/data/memory-security/drills/tasks/bypassing-stack-protector/support/")," directory.",(0,n.yg)("br",{parentName:"p"}),"\n","Open and analyze the ",(0,n.yg)("inlineCode",{parentName:"p"},"buff_leak.c")," file.",(0,n.yg)("br",{parentName:"p"}),"\n","The pointer ",(0,n.yg)("inlineCode",{parentName:"p"},"p")," points to the stack.",(0,n.yg)("br",{parentName:"p"}),"\n","However, we can modify any variable that is declared in the program through ",(0,n.yg)("inlineCode",{parentName:"p"},"p"),".",(0,n.yg)("br",{parentName:"p"}),"\n","All we need to know is the offset of the other memory locations that we wish to access.",(0,n.yg)("br",{parentName:"p"}),"\n","Run the program and try to input the correct offsets to modify variables from different regions of our program.",(0,n.yg)("br",{parentName:"p"}),"\n","Once a correct offset is given as input, the program will output a validation message.",(0,n.yg)("br",{parentName:"p"}),"\n","Note that adding or subtracting user-provided values to pointers enables an attacker to observe a program's entire memory!",(0,n.yg)("br",{parentName:"p"}),"\n","If you're having difficulties solving this exercise, go through ",(0,n.yg)("a",{parentName:"p",href:"/operating-systems/77/Data/lab5#memory-security"},"this")," reading material.  "),(0,n.yg)("h3",{id:"aslr-1"},"ASLR"),(0,n.yg)("p",null,"Use the ",(0,n.yg)("inlineCode",{parentName:"p"},"Makefile.aslr")," file to compile the ",(0,n.yg)("inlineCode",{parentName:"p"},"chapters/data/memory-security/drills/tasks/aslr/support/aslr.c")," file:"),(0,n.yg)("pre",null,(0,n.yg)("code",{parentName:"pre",className:"language-console"},"student@os:~/.../drills/tasks/aslr/support/$ make -f Makefile.aslr\n")),(0,n.yg)("p",null,"By default, ASLR and PIC are enabled.\nObserve the results.\nNext, we disable ASLR:"),(0,n.yg)("pre",null,(0,n.yg)("code",{parentName:"pre",className:"language-console"},"student@os:~/.../drills/tasks/aslr/support/$ echo 0 | sudo tee /proc/sys/kernel/randomize_va_space\n")),(0,n.yg)("p",null,"Even though the code is compiled with PIC, both library and user functions have the same address between runs.\nRe-enable ASLR:"),(0,n.yg)("pre",null,(0,n.yg)("code",{parentName:"pre",className:"language-console"},"student@os:~/.../drills/tasks/aslr/support/$ echo 2 | sudo tee /proc/sys/kernel/randomize_va_space\n")),(0,n.yg)("p",null,"Disable PIC by uncommenting the ",(0,n.yg)("inlineCode",{parentName:"p"},"-fno-PIC")," and ",(0,n.yg)("inlineCode",{parentName:"p"},"LDFLAGS")," lines."),(0,n.yg)("p",null,"We observe that for randomization to work, we need to instruct the OS to randomize the program sections and the compiler to generate code that is position independent."),(0,n.yg)("p",null,"If you're having difficulties solving this exercise, go through ",(0,n.yg)("a",{parentName:"p",href:"/operating-systems/77/Data/lab5#memory-security"},"this")," reading material."),(0,n.yg)("h3",{id:"stack-protector-1"},"Stack Protector"),(0,n.yg)("p",null,"Comment the ",(0,n.yg)("inlineCode",{parentName:"p"},"-fno-stack-protector")," switch from the ",(0,n.yg)("inlineCode",{parentName:"p"},"chapters/data/memory-security/drills/tasks/stack-protector/support/Makefile"),", recompile and run the ",(0,n.yg)("inlineCode",{parentName:"p"},"bo_practice_write")," executable.\nExamine the binary with ",(0,n.yg)("inlineCode",{parentName:"p"},"objdump")," and identify the instructions that set and test the canary.\nObserve what happens when a buffer overflow occurs."),(0,n.yg)("p",null,"If you're having difficulties solving this exercise, go through ",(0,n.yg)("a",{parentName:"p",href:"/operating-systems/77/Data/lab5#memory-security"},"this")," reading material."),(0,n.yg)("h3",{id:"bypassing-the-stack-protector-1"},"Bypassing the Stack Protector"),(0,n.yg)("p",null,"Inspect the ",(0,n.yg)("inlineCode",{parentName:"p"},"chapters/data/memory-security/drills/tasks/bypassing-stack-protector/support/stack_protector.c")," source file.\nCompile the program and examine the object code.\nTry to identify the canary value.\nUsing the ",(0,n.yg)("inlineCode",{parentName:"p"},"addr")," variable, write 2 ",(0,n.yg)("inlineCode",{parentName:"p"},"scanf")," instructions: one that overwrites the canary with the correct value and one that overwrites the return address with the address of function ",(0,n.yg)("inlineCode",{parentName:"p"},"pawned"),".\nIn case of a successful exploit a video will be offered as reward."),(0,n.yg)("p",null,"If you're having difficulties solving this exercise, go through ",(0,n.yg)("a",{parentName:"p",href:"/operating-systems/77/Data/lab5#memory-security"},"this")," reading material."),(0,n.yg)("h4",{id:"shellcode-executor"},"Shellcode Executor"),(0,n.yg)("p",null,"Navigate to the ",(0,n.yg)("inlineCode",{parentName:"p"},"chapters/data/memory-security/drills/tasks/exec-shellcode/support/")," directory."),(0,n.yg)("p",null,"Your goal is to update the ",(0,n.yg)("inlineCode",{parentName:"p"},"src/exec-shellcode.s")," source code file to be able to read and execute shellcodes from a given binary files.\nThe program thus acts as a shellcode tester."),(0,n.yg)("p",null,"A ",(0,n.yg)("a",{parentName:"p",href:"https://cocomelonc.github.io/tutorial/2021/10/09/linux-shellcoding-1.html"},"shellcode")," is a small program that is commonly used in memory-related security exploits as a form of arbitrary code execution.\nIt's a binary string consisting of instructions / code to be directly interpreted by the CPU during the execution of the targeted vulnerable program."),(0,n.yg)("p",null,"Shellcodes end up in an ",(0,n.yg)("inlineCode",{parentName:"p"},"exit()")," system call to ensure a graceful exit of the program after running the shellcode.\nUse ",(0,n.yg)("inlineCode",{parentName:"p"},"mmap()")," to reserve a virtual page.\nUse anonymous mapping (i.e. the ",(0,n.yg)("inlineCode",{parentName:"p"},"MAP_ANONYMOUS"),") flag.\nUse the proper permissions required to enable the shellcode to be read from the file into memory and then executed."),(0,n.yg)("p",null,"To test the implementation, enter the ",(0,n.yg)("inlineCode",{parentName:"p"},"tests/")," directory and run:"),(0,n.yg)("pre",null,(0,n.yg)("code",{parentName:"pre",className:"language-console"},"make check\n")),(0,n.yg)("p",null,"As an extra item, add a shellcode for the ",(0,n.yg)("inlineCode",{parentName:"p"},"brk()")," system call in the ",(0,n.yg)("inlineCode",{parentName:"p"},"tests/brk.asm")," file.\nIt should be a simple shellcode that calls ",(0,n.yg)("inlineCode",{parentName:"p"},"brk(NULL)"),", i.e. with the purpose of getting the current program break."),(0,n.yg)("p",null,"In case of a correct solution, you will get an output such as:"),(0,n.yg)("pre",null,(0,n.yg)("code",{parentName:"pre",className:"language-text"},"./run_all_tests.sh\ntest_helloworld                  ........................ passed ...  25\ntest_getpid                      ........................ passed ...  25\ntest_openfile                    ........................ passed ...  25\ntest_brk                         ........................ passed ...  25\n\nTotal:                                                           100/100\n")),(0,n.yg)("p",null,"If you're having difficulties solving this exercise, go through ",(0,n.yg)("a",{parentName:"p",href:"/operating-systems/77/Data/lab5#memory-security"},"this")," reading material."))}u.isMDXComponent=!0}}]);