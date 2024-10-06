"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[6311],{5680:(e,t,n)=>{n.d(t,{xA:()=>p,yg:()=>g});var a=n(6540);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=a.createContext({}),c=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=c(e.components);return a.createElement(l.Provider,{value:t},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,l=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),u=c(n),m=r,g=u["".concat(l,".").concat(m)]||u[m]||d[m]||o;return n?a.createElement(g,i(i({ref:t},p),{},{components:n})):a.createElement(g,i({ref:t},p))}));function g(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,i=new Array(o);i[0]=m;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[u]="string"==typeof e?e:r,i[1]=s;for(var c=2;c<o;c++)i[c]=n[c];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},2368:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>d,frontMatter:()=>o,metadata:()=>s,toc:()=>c});var a=n(8168),r=(n(6540),n(5680));const o={},i="Arena",s={unversionedId:"Lab/Data/arena",id:"Lab/Data/arena",title:"Arena",description:"Go through the practice items below to hone your skills in working with data and memory.",source:"@site/docs/Lab/Data/arena.md",sourceDirName:"Lab/Data",slug:"/Lab/Data/arena",permalink:"/operating-systems/86/Lab/Data/arena",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"Memory Security",permalink:"/operating-systems/86/Lab/Data/memory-security"},next:{title:"Compute",permalink:"/operating-systems/86/Lab/Compute/"}},l={},c=[{value:"Page Mapper",id:"page-mapper",level:2},{value:"Shellcode Executor",id:"shellcode-executor",level:2},{value:"Access Counter",id:"access-counter",level:2},{value:"Memory Support",id:"memory-support",level:2},{value:"Reference Counting",id:"reference-counting",level:3},{value:"Operator overloading",id:"operator-overloading",level:3},{value:"Practice",id:"practice",level:4}],p={toc:c},u="wrapper";function d(e){let{components:t,...n}=e;return(0,r.yg)(u,(0,a.A)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,r.yg)("h1",{id:"arena"},"Arena"),(0,r.yg)("p",null,"Go through the practice items below to hone your skills in working with data and memory."),(0,r.yg)("h2",{id:"page-mapper"},"Page Mapper"),(0,r.yg)("p",null,"Navigate to the ",(0,r.yg)("inlineCode",{parentName:"p"},"support/page-mapper/")," directory."),(0,r.yg)("p",null,"Your goal is to update the ",(0,r.yg)("inlineCode",{parentName:"p"},"src/page_mapper.c")," source code file to reserve virtual pages in the address space of the current process.\nUse ",(0,r.yg)("inlineCode",{parentName:"p"},"mmap()")," to reserve virtual pages.\nUse anonymous mapping (i.e. the ",(0,r.yg)("inlineCode",{parentName:"p"},"MAP_ANONYMOUS"),") flag.\nUse any permissions required."),(0,r.yg)("p",null,"Inside the ",(0,r.yg)("inlineCode",{parentName:"p"},"src/")," directory, use ",(0,r.yg)("inlineCode",{parentName:"p"},"make")," to do a quick check of the implementation.\nTo test it, enter the ",(0,r.yg)("inlineCode",{parentName:"p"},"tests/")," directory and run:"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-console"},"make check\n")),(0,r.yg)("p",null,"In case of a correct solution, you will get an output such as:"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-text"},"./run_all_tests.sh\ntest_res_1                       ........................ passed ...  25\ntest_res_2                       ........................ passed ...  25\ntest_res_10                      ........................ passed ...  25\ntest_res_10_res_20               ........................ passed ...  25\n\nTotal:                                                           100/100\n")),(0,r.yg)("h2",{id:"shellcode-executor"},"Shellcode Executor"),(0,r.yg)("p",null,"Navigate to the ",(0,r.yg)("inlineCode",{parentName:"p"},"support/exec-shellcode/")," directory."),(0,r.yg)("p",null,"Your goal is to update the ",(0,r.yg)("inlineCode",{parentName:"p"},"src/exec-shellcode.s")," source code file to be able to read and execute shellcodes from a given binary files.\nThe program thus acts as a shellcode tester."),(0,r.yg)("p",null,"A ",(0,r.yg)("a",{parentName:"p",href:"https://cocomelonc.github.io/tutorial/2021/10/09/linux-shellcoding-1.html"},"shellcode")," is a small program that is commonly used in memory-related security exploits as a form of arbitrary code execution.\nIt's a binary string consisting of instructions / code to be directly interpreted by the CPU during the execution of the targeted vulnerable program."),(0,r.yg)("p",null,"Shellcodes end up in an ",(0,r.yg)("inlineCode",{parentName:"p"},"exit()")," system call to ensure a graceful exit of the program after running the shellcode.\nUse ",(0,r.yg)("inlineCode",{parentName:"p"},"mmap()")," to reserve a virtual page.\nUse anonymous mapping (i.e. the ",(0,r.yg)("inlineCode",{parentName:"p"},"MAP_ANONYMOUS"),") flag.\nUse the proper permissions required to enable the shellcode to be read from the file into memory and then executed."),(0,r.yg)("p",null,"To test the implementation, enter the ",(0,r.yg)("inlineCode",{parentName:"p"},"tests/")," directory and run:"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-console"},"make check\n")),(0,r.yg)("p",null,"As an extra item, add a shellcode for the ",(0,r.yg)("inlineCode",{parentName:"p"},"brk()")," system call in the ",(0,r.yg)("inlineCode",{parentName:"p"},"tests/brk.asm")," file.\nIt should be a simple shellcode that calls ",(0,r.yg)("inlineCode",{parentName:"p"},"brk(NULL)"),", i.e. with the purpose of getting the current program break."),(0,r.yg)("p",null,"In case of a correct solution, you will get an output such as:"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-text"},"./run_all_tests.sh\ntest_helloworld                  ........................ passed ...  25\ntest_getpid                      ........................ passed ...  25\ntest_openfile                    ........................ passed ...  25\ntest_brk                         ........................ passed ...  25\n\nTotal:                                                           100/100\n")),(0,r.yg)("h2",{id:"access-counter"},"Access Counter"),(0,r.yg)("p",null,"Navigate to the ",(0,r.yg)("inlineCode",{parentName:"p"},"support/access-counter/")," directory."),(0,r.yg)("p",null,"Your goal is to update the ",(0,r.yg)("inlineCode",{parentName:"p"},"src/access_counter.c")," source code file to capture memory access exceptions (i.e. the ",(0,r.yg)("inlineCode",{parentName:"p"},"SIGSEGV")," signal) and to update page permissions in order for the access to eventually succeed.\nUse ",(0,r.yg)("inlineCode",{parentName:"p"},"mprotect")," to update the protection of the pages in stages: read, write and then exec.\nEach time an update is made, the ",(0,r.yg)("inlineCode",{parentName:"p"},"counter")," variable is increased;\nthis is used for testing."),(0,r.yg)("p",null,"The signal handler is already in place as the ",(0,r.yg)("inlineCode",{parentName:"p"},"access_handler()")," function.\nIt is called any time a ",(0,r.yg)("inlineCode",{parentName:"p"},"SIGSEGV")," signal is being sent out to the current process.\nYou will update the handler by following the ",(0,r.yg)("inlineCode",{parentName:"p"},"TODO")," comments and instructions here."),(0,r.yg)("p",null,"The ",(0,r.yg)("inlineCode",{parentName:"p"},"pages")," array stores information about accessed pages.\nAssume the ",(0,r.yg)("inlineCode",{parentName:"p"},"MAX_PAGES")," size of the array is enough to store information.\nWhen an existing page is accessed and causes a memory exception, the permission is update, in the stages mentioned above: read, write, and then exec.\nWhen a new page is accessed, a new entry is filled in the ",(0,r.yg)("inlineCode",{parentName:"p"},"pages")," array, initialized with read protection.\nUse ",(0,r.yg)("inlineCode",{parentName:"p"},"mmap()")," to reserve virtual pages.\nUse anonymous mapping (i.e. the ",(0,r.yg)("inlineCode",{parentName:"p"},"MAP_ANONYMOUS"),") flag.\nUse any permissions required."),(0,r.yg)("p",null,"To test it, enter the ",(0,r.yg)("inlineCode",{parentName:"p"},"tests/")," directory and run:"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-console"},"make check\n")),(0,r.yg)("p",null,"In case of a correct solution, you will get an output such as:"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-text"},"./run_all_tests.sh\ntest_acess_read                  ........................ passed ...   9\ntest_acess_write                 ........................ passed ...   9\ntest_acess_exec                  ........................ passed ...  10\ntest_acess_read_write            ........................ passed ...  12\ntest_acess_read_exec             ........................ passed ...  12\ntest_acess_write_exec            ........................ passed ...  12\ntest_acess_exec_read             ........................ passed ...  12\ntest_acess_exec_write            ........................ passed ...  12\ntest_acess_write_read            ........................ passed ...  12\n\nTotal:                                                           100/100\n")),(0,r.yg)("h2",{id:"memory-support"},"Memory Support"),(0,r.yg)("p",null,(0,r.yg)("strong",{parentName:"p"},"Manual memory management")," (MMM) is one of the most difficult tasks.\nEven experienced programmers make mistakes when tackling such a complicated endeavor.\nAs a consequence, the programming world has been migrating towards languages that offer automatic memory management (AMM).\nAMM programming languages typically offer a garbage collector that tracks down the usage of objects and frees memory once no references exist to a given object.\nAs a consequence, garbage collected programming languages are easier to use and safer.\nHowever, this comes with a cost: the garbage collector, in most cases, requires a significant amount of resources to run.\nTherefore, for performance-critical systems, MMM is still the preferred solution."),(0,r.yg)("p",null,"A middle-ground between programming languages that have AMM (Java, Python, Swift, D) and those that do not (C, C++) is represented by those languages that do not have built-in AMM but offer the possibility to implement it as a library solution (C++, D).\nConcretely, these languages offer lightweight library solutions to optimally track down the lifetime of an object.\nThis is done by using reference counted objects."),(0,r.yg)("h3",{id:"reference-counting"},"Reference Counting"),(0,r.yg)("p",null,"Reference counting is a technique of tracking the lifetime of an object by counting how many references to an object exist.\nAs long as at least one reference exists, the object cannot be destroyed.\nOnce no reference to a given object exists, it can be safely destroyed.\nReference counted is typically implemented by storing a count with the actual payload of the object.\nEvery time a new reference to the object is created, the reference count is incremented.\nEvery time a reference expires, the reference is decremented."),(0,r.yg)("p",null,"The operations that trigger a reference increment are:"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"initializing an object from another object."),(0,r.yg)("li",{parentName:"ul"},"assigning an object to another object.")),(0,r.yg)("p",null,"The operations that trigger a reference decrement are:"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"the lifetime of an object expires")),(0,r.yg)("p",null,"Modern programming languages offer the possibility to specify what code should be run in each of these situations, therefore enabling the implementation of referenced counted data structures.\nAs such, copy constructors may be used to automatically initialize an object from another object, assignment operators may be used to assign an object to another object and destructors may be used to destroy objects."),(0,r.yg)("h3",{id:"operator-overloading"},"Operator overloading"),(0,r.yg)("p",null,"Navigate to the ",(0,r.yg)("inlineCode",{parentName:"p"},"support/reference-counting")," directory.\nAnalyze the ",(0,r.yg)("inlineCode",{parentName:"p"},"operators.d")," file.\nA ",(0,r.yg)("inlineCode",{parentName:"p"},"struct")," is defined that also implements 4 special functions: a constructor, a copy constructor, an assignment operator and a destructor.\nEach of these special functions may be called automatically by the compiler:"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"the constructor is called automatically whenever an object is initialized with a field of a type that corresponds to the constructor parameter type."),(0,r.yg)("li",{parentName:"ul"},"the copy constructor is called automatically when an object is initialized from an object of the same type."),(0,r.yg)("li",{parentName:"ul"},"the assignment operator is called automatically when an object is assigned an object of the same type."),(0,r.yg)("li",{parentName:"ul"},"the destructor is called automatically whenever an object goes out of scope.")),(0,r.yg)("p",null,(0,r.yg)("strong",{parentName:"p"},"Note: the difference between initialization and assignment is that the initialization occurs when an object is being declared and occurs a single time (",(0,r.yg)("inlineCode",{parentName:"strong"},"Obj o1 = 1"),"), whereas assignment is decoupled from the declaration site and may occur multiple times (provided that the variable is mutable).")),(0,r.yg)("p",null,"Compile and run the program in ",(0,r.yg)("inlineCode",{parentName:"p"},"operators.d"),".\nNotice how the different special functions are automatically called.\nConsidering the definition of ",(0,r.yg)("inlineCode",{parentName:"p"},"Obj")," from the file ",(0,r.yg)("inlineCode",{parentName:"p"},"operators.d"),", answer the following ",(0,r.yg)("a",{parentName:"p",href:"/operating-systems/86/Lab/Data/quiz/operators"},"Quiz"),"."),(0,r.yg)("h4",{id:"practice"},"Practice"),(0,r.yg)("p",null,"Navigate to the ",(0,r.yg)("inlineCode",{parentName:"p"},"support/reference-counting")," directory.\nAnalyze the ",(0,r.yg)("inlineCode",{parentName:"p"},"refcount_skel.d"),".\nA reference counted ",(0,r.yg)("inlineCode",{parentName:"p"},"int")," array is implemented, however, some bits are missing.\nRun the code, try to understand what happens."),(0,r.yg)("p",null,"The constructor allocates memory for the array, whereas the destructor deallocates it.\nCompile and run the code.\nNotice how the array's memory  is automatically managed."),(0,r.yg)("ol",null,(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},"Uncomment the following line in the ",(0,r.yg)("inlineCode",{parentName:"p"},"main")," function (",(0,r.yg)("inlineCode",{parentName:"p"},"//test1()"),").\nRun the code.\nWhat happens?\nWhy?")),(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},"The reference counted array does not implement the copy constructor.\nComment the ",(0,r.yg)("inlineCode",{parentName:"p"},"version(none)")," annotation for the copy constructor and implement the logic so that the reference counted array is correct.\nWhen an object is initialized from another object, we need to appropriately set the fields and then increment the reference count.\nOnce you have completed this exercise, make sure the output is correct and that the reference counted array is not freed too early.")),(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},"Uncomment the following line in the ",(0,r.yg)("inlineCode",{parentName:"p"},"main")," function (",(0,r.yg)("inlineCode",{parentName:"p"},"//test2()"),").\nRun the code.\nWhat happens?\nWhy?\nUse GDB to find out.")),(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},"The reference counted array does not implement the assignment operator.\nComment the ",(0,r.yg)("inlineCode",{parentName:"p"},"version(none)")," annotation for the assignment operator and implement the logic so that the reference counted array is correct.\nWhen an object is assigned to another object, we need to first decrement the count for the object that is being assigned to, then fill the fields similarly to the copy constructor case and lastly increment the count for the assigned object.\nAfter completing the exercise, make sure that the memory is properly managed.")),(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},"Play with your reference counted array and create different scenarios to test its limits."))))}d.isMDXComponent=!0}}]);