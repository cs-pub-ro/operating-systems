"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[1727],{5680:(e,t,n)=>{n.d(t,{xA:()=>d,yg:()=>c});var a=n(6540);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=a.createContext({}),p=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},d=function(e){var t=p(e.components);return a.createElement(s.Provider,{value:t},e.children)},g="mdxType",y={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,s=e.parentName,d=l(e,["components","mdxType","originalType","parentName"]),g=p(n),m=r,c=g["".concat(s,".").concat(m)]||g[m]||y[m]||i;return n?a.createElement(c,o(o({ref:t},d),{},{components:n})):a.createElement(c,o({ref:t},d))}));function c(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,o=new Array(i);o[0]=m;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[g]="string"==typeof e?e:r,o[1]=l;for(var p=2;p<i;p++)o[p]=n[p];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},8382:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>o,default:()=>y,frontMatter:()=>i,metadata:()=>l,toc:()=>p});var a=n(8168),r=(n(6540),n(5680));const i={},o="File Descriptors",l={unversionedId:"Lab/IO/file-descriptors",id:"Lab/IO/file-descriptors",title:"File Descriptors",description:'After running the code in the "File Handlers" section, you saw that open() returns a number.',source:"@site/docs/Lab/IO/file-descriptors.md",sourceDirName:"Lab/IO",slug:"/Lab/IO/file-descriptors",permalink:"/operating-systems/65/Lab/IO/file-descriptors",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"File Handling",permalink:"/operating-systems/65/Lab/IO/file-handlers"},next:{title:"Redirections",permalink:"/operating-systems/65/Lab/IO/redirections"}},s={},p=[{value:"Creating New File Descriptors",id:"creating-new-file-descriptors",level:2},{value:"Practice: Open a File for Writing",id:"practice-open-a-file-for-writing",level:3},{value:"Practice: Write to the File",id:"practice-write-to-the-file",level:3},{value:"Replace or Truncate?",id:"replace-or-truncate",level:2},{value:"Practice: Write Once More",id:"practice-write-once-more",level:3},{value:"Practice: Close&#39;em All",id:"practice-closeem-all",level:3},{value:"File Handling Conclusion: libc vs syscalls",id:"file-handling-conclusion-libc-vs-syscalls",level:2}],d={toc:p},g="wrapper";function y(e){let{components:t,...i}=e;return(0,r.yg)(g,(0,a.A)({},d,i,{components:t,mdxType:"MDXLayout"}),(0,r.yg)("h1",{id:"file-descriptors"},"File Descriptors"),(0,r.yg)("p",null,"After running the code in the ",(0,r.yg)("a",{parentName:"p",href:"/operating-systems/65/Lab/IO/file-handlers"},'"File Handlers" section'),", you saw that ",(0,r.yg)("inlineCode",{parentName:"p"},"open()")," returns a ",(0,r.yg)("strong",{parentName:"p"},"number"),".\nThis number is a ",(0,r.yg)("strong",{parentName:"p"},"file descriptor"),".\nRun the code above multiple times.\nYou'll always get file descriptor 3.\nWe can already tell these numbers have some meaning and aren't just some seemingly random numbers, like PIDs were."),(0,r.yg)("p",null,"You've most likely used file descriptors before without knowing.\nRemember the following concepts:"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("inlineCode",{parentName:"li"},"stdin")," (standard input)"),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("inlineCode",{parentName:"li"},"stdout")," (standard output)"),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("inlineCode",{parentName:"li"},"stderr")," (standard error)")),(0,r.yg)("p",null,"When you wanted to run a shell command and ignore its errors, you wrote something like:"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-console"},"student@os:~$ ls 2> /dev/null\n")),(0,r.yg)("p",null,"The command above uses ",(0,r.yg)("inlineCode",{parentName:"p"},"2> /dev/null")," to ",(0,r.yg)("strong",{parentName:"p"},"redirect")," ",(0,r.yg)("inlineCode",{parentName:"p"},"stderr")," to /dev/null."),(0,r.yg)("p",null,(0,r.yg)("a",{parentName:"p",href:"/operating-systems/65/Lab/IO/quiz/stderr-fd"},"Quiz")),(0,r.yg)("p",null,"Good, so we know that ",(0,r.yg)("inlineCode",{parentName:"p"},"stderr")," is file descriptor 2.\nThe code in ",(0,r.yg)("inlineCode",{parentName:"p"},"support/file-descriptors/open_directory.c")," opened the directory as file descriptor 3.\nSo what are file descriptors 0 and 1?\nThey are ",(0,r.yg)("inlineCode",{parentName:"p"},"stdin")," and ",(0,r.yg)("inlineCode",{parentName:"p"},"stdout"),", respectively."),(0,r.yg)("p",null,"Now we know that the basic I/O streams of a process correspond to specific file descriptors.\nBut what is a file descriptor exactly?\nFrom the application's point of view, it is a positive integer acting as a unique identifier for an I/O channel, such as a file.\nTo the operating system, a file descriptor is an index.\nEach process has what's called a ",(0,r.yg)("strong",{parentName:"p"},"file descriptor table"),", which is just a fancy name for an array of pointers.\nA file descriptor is an index in this array.\nEach element in this array points towards a structure in the kernel's memory that represents an I/O resource.\nThis structure is called the ",(0,r.yg)("strong",{parentName:"p"},"open file structure"),"."),(0,r.yg)("p",null,"To illustrate all this information, look at the image below.\nAll data structures shown below are stored in the Kernel's memory area and are transparent to the user space.\nAnd remember that the file descriptor table is bound to the process, so all its threads share the same file descriptors."),(0,r.yg)("p",null,(0,r.yg)("img",{alt:"File Descriptors",src:n(1314).A})),(0,r.yg)("p",null,"To find out more about the contents of these structures, check out ",(0,r.yg)("a",{parentName:"p",href:"/operating-systems/65/Lab/IO/arena#open-file-structure-in-the-kernel"},"this section in the Arena")),(0,r.yg)("h2",{id:"creating-new-file-descriptors"},"Creating New File Descriptors"),(0,r.yg)("p",null,'We already know that each process gets 3 file descriptors "by default":'),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("inlineCode",{parentName:"li"},"stdin")," (standard input): 0"),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("inlineCode",{parentName:"li"},"stdout")," (standard output): 1"),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("inlineCode",{parentName:"li"},"stderr")," (standard error): 2")),(0,r.yg)("p",null,"To create new file descriptors (i.e. open new files), a process can use the ",(0,r.yg)("a",{parentName:"p",href:"https://man7.org/linux/man-pages/man2/open.2.html"},(0,r.yg)("inlineCode",{parentName:"a"},"open()"))," system call.\nIt receives the path to the file, some flags which are akin to the ",(0,r.yg)("inlineCode",{parentName:"p"},"mode")," string passed to ",(0,r.yg)("inlineCode",{parentName:"p"},"fopen()"),".\nAn optional ",(0,r.yg)("inlineCode",{parentName:"p"},"mode")," parameter that denotes the file's permissions if the ",(0,r.yg)("inlineCode",{parentName:"p"},"open")," must create it can also be provided.\nWe'll revisit ",(0,r.yg)("inlineCode",{parentName:"p"},"open()"),"'s ",(0,r.yg)("inlineCode",{parentName:"p"},"mode")," parameter in the future."),(0,r.yg)("p",null,"From now, you should consult ",(0,r.yg)("a",{parentName:"p",href:"https://man7.org/linux/man-pages/man2/open.2.html"},(0,r.yg)("inlineCode",{parentName:"a"},"open()"),"'s man page")," whenever you encounter a new argument to this syscall.\nNavigate to ",(0,r.yg)("inlineCode",{parentName:"p"},"support/file-descriptors/open_read_write.c"),".\nThe function ",(0,r.yg)("inlineCode",{parentName:"p"},"open_file_for_reading()")," calls ",(0,r.yg)("inlineCode",{parentName:"p"},"open()")," with the ",(0,r.yg)("inlineCode",{parentName:"p"},"O_RDONLY")," flag, which is equivalent to opening the file with ",(0,r.yg)("inlineCode",{parentName:"p"},"fopen()")," and setting ",(0,r.yg)("inlineCode",{parentName:"p"},'"r"')," as the ",(0,r.yg)("inlineCode",{parentName:"p"},"mode"),".\nThis means read-only.\nNote that the file descriptor we get is 3, just like before."),(0,r.yg)("p",null,"Then ",(0,r.yg)("inlineCode",{parentName:"p"},"read_from_file()")," reads ",(0,r.yg)("inlineCode",{parentName:"p"},"bytes_to_read")," bytes from this file.\nFor this, it uses the ",(0,r.yg)("inlineCode",{parentName:"p"},"read()")," syscall.\nIt returns the number of bytes that were read from the file."),(0,r.yg)("p",null,"Notice that the code doesn't simply call ",(0,r.yg)("inlineCode",{parentName:"p"},"read(fd, buff, bytes_to_read)"),".\nInstead, it uses a ",(0,r.yg)("inlineCode",{parentName:"p"},"while")," loop to read data from the file."),(0,r.yg)("p",null,"The ",(0,r.yg)("a",{parentName:"p",href:"https://man7.org/linux/man-pages/man2/read.2.html#RETURN_VALUE"},"return value of ",(0,r.yg)("inlineCode",{parentName:"a"},"read()"))," may be less than ",(0,r.yg)("inlineCode",{parentName:"p"},"bytes_to_read")," if there are not enough bytes available or if the operation is interrupted by a signal.\nA return value between ",(0,r.yg)("strong",{parentName:"p"},"0")," and ",(0,r.yg)("inlineCode",{parentName:"p"},"bytes_to_read")," is not enough to decide whether we should stop reading.\nTo determine this, we make another ",(0,r.yg)("inlineCode",{parentName:"p"},"read()")," call, which will return ",(0,r.yg)("strong",{parentName:"p"},"0")," if the cursor is already at ",(0,r.yg)("strong",{parentName:"p"},"EOF")," (end of file)."),(0,r.yg)("p",null,"The same goes for ",(0,r.yg)("inlineCode",{parentName:"p"},"write()"),": its return value may differ from the intended number of bytes to write.\nPartial writes should also be handled at the application level, and the way to do this is by using loops."),(0,r.yg)("p",null,(0,r.yg)("strong",{parentName:"p"},"Remember:"),"\n",(0,r.yg)("strong",{parentName:"p"},"It is mandatory that we always use ",(0,r.yg)("inlineCode",{parentName:"strong"},"read()")," and ",(0,r.yg)("inlineCode",{parentName:"strong"},"write()")," inside ",(0,r.yg)("inlineCode",{parentName:"strong"},"while")," loops."),"\nHigher-level functions like ",(0,r.yg)("inlineCode",{parentName:"p"},"fread()")," and ",(0,r.yg)("inlineCode",{parentName:"p"},"fwrite()")," also use ",(0,r.yg)("inlineCode",{parentName:"p"},"while")," loops when calling ",(0,r.yg)("inlineCode",{parentName:"p"},"read()")," and ",(0,r.yg)("inlineCode",{parentName:"p"},"write()")," respectively."),(0,r.yg)("h3",{id:"practice-open-a-file-for-writing"},"Practice: Open a File for Writing"),(0,r.yg)("p",null,"Follow the code in ",(0,r.yg)("inlineCode",{parentName:"p"},"open_file_for_reading()")," and fill in the function ",(0,r.yg)("inlineCode",{parentName:"p"},"open_file_for_writing()"),".\nThe file ",(0,r.yg)("inlineCode",{parentName:"p"},"write_file.txt")," doesn't exist.\n",(0,r.yg)("inlineCode",{parentName:"p"},"open()")," should create it.\nUse the ",(0,r.yg)("inlineCode",{parentName:"p"},"open()"),"'s man page to find the flags you require.\nDo you require anything ",(0,r.yg)("em",{parentName:"p"},"else"),"?"),(0,r.yg)("p",null,"At this point, depending on what flags you passed to ",(0,r.yg)("inlineCode",{parentName:"p"},"open()"),", a few things might happen.\nWork your way through the errors until successfully create and open the file.\nThe ",(0,r.yg)("inlineCode",{parentName:"p"},"open()")," syscall should return file descriptor 4."),(0,r.yg)("p",null,"Now verify the file.\nThis part may be different on your system.\nDelete ",(0,r.yg)("inlineCode",{parentName:"p"},"write_file.txt")," and rerun ",(0,r.yg)("inlineCode",{parentName:"p"},"open_read_write")," a few times.\nEach time, check the permissions of ",(0,r.yg)("inlineCode",{parentName:"p"},"write_file.txt"),".\nThey may be different between runs, or they may always be the same.\nAnyway, they are likely not the default permissions for a regular file (",(0,r.yg)("inlineCode",{parentName:"p"},"rw-r--r--"),").\nIt is not mandatory that you get the same output as below."),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-console"},"student@os:~/.../lab/support/file-descriptors$ ls -l\ntotal 11\ndrwxrwxr-x 1 student student 4096 Nov 20 18:26 ./\ndrwxrwxr-x 1 student student    0 Nov 20 14:11 ../\n-rw-rw-r-- 1 student student   46 Nov 20 17:27 .gitignore\n-rw-rw-r-- 1 student student  125 Nov 20 18:26 Makefile\n-rw-rw-r-- 1 student student  396 Nov 20 11:27 open_directory.c\n-rw-rw-r-- 1 student student 2210 Nov 20 17:24 open_read_write.c\n-rw-rw-r-- 1 student student  34 Nov 20 18:26 read_file.txt\n---------- 1 student student  45 Nov 20 18:26 write_file.txt\n")),(0,r.yg)("p",null,(0,r.yg)("a",{parentName:"p",href:"/operating-systems/65/Lab/IO/quiz/write-file-permissions"},"Quiz")),(0,r.yg)("p",null,(0,r.yg)("strong",{parentName:"p"},"Remember:"),"\n",(0,r.yg)("strong",{parentName:"p"},"It is mandatory that we pass a ",(0,r.yg)("inlineCode",{parentName:"strong"},"mode")," argument to ",(0,r.yg)("inlineCode",{parentName:"strong"},"open()")," when using the ",(0,r.yg)("inlineCode",{parentName:"strong"},"O_CREAT")," flag.")),(0,r.yg)("p",null,"Now pass some sensible ",(0,r.yg)("inlineCode",{parentName:"p"},"mode")," argument to ",(0,r.yg)("inlineCode",{parentName:"p"},"open()"),", such as ",(0,r.yg)("inlineCode",{parentName:"p"},"0644")," (for ",(0,r.yg)("inlineCode",{parentName:"p"},"rw-r--r--")," permissions)."),(0,r.yg)("h3",{id:"practice-write-to-the-file"},"Practice: Write to the File"),(0,r.yg)("p",null,"Follow the example in ",(0,r.yg)("inlineCode",{parentName:"p"},"read_from_file()")," to fill in ",(0,r.yg)("inlineCode",{parentName:"p"},"write_to_file()"),".\nRemember to use a loop to make sure your data is fully written to the file."),(0,r.yg)("ol",null,(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},"Use ",(0,r.yg)("inlineCode",{parentName:"p"},"cat write_file.txt")," to check if the file contains the right data.")),(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},"Use ",(0,r.yg)("inlineCode",{parentName:"p"},"open_file_for_reading()")," and ",(0,r.yg)("inlineCode",{parentName:"p"},"read_from_file()")," to reopen ",(0,r.yg)("inlineCode",{parentName:"p"},"write_file.txt")," for reading and read the bytes you've just written to it."))),(0,r.yg)("h2",{id:"replace-or-truncate"},"Replace or Truncate?"),(0,r.yg)("h3",{id:"practice-write-once-more"},"Practice: Write Once More"),(0,r.yg)("p",null,"Change the message written to ",(0,r.yg)("inlineCode",{parentName:"p"},"write_file.txt")," by ",(0,r.yg)("inlineCode",{parentName:"p"},"support/file-descriptors/open_read_write.c")," ",(0,r.yg)("strong",{parentName:"p"},"to a shorter one"),".\nIt is important that the new message be shorter than the first one.\nNow recompile the code, then run it, and then inspect the contents of the ",(0,r.yg)("inlineCode",{parentName:"p"},"write_file.txt")," file."),(0,r.yg)("p",null,"If the new message were ",(0,r.yg)("inlineCode",{parentName:"p"},'"Something short"'),", the contents of ",(0,r.yg)("inlineCode",{parentName:"p"},"write_file.txt")," should be:"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-console"},"student@os:~/.../lab/support/file-descriptors$ cat ../../support/file-descriptors/write_file.txt\nSomething shorte_file.txt: What's up, Doc?\n")),(0,r.yg)("p",null,"Note that the final bytes of the previous text remain unchanged.\nThe new message was simply written ",(0,r.yg)("strong",{parentName:"p"},"on top")," of the old one."),(0,r.yg)("p",null,"Now let's do a quick test.\nWe haven't talked about how redirections work in the terminal (we'll get there, step by step), but you can imagine that if you type ",(0,r.yg)("inlineCode",{parentName:"p"},"ls > file.txt"),", ",(0,r.yg)("inlineCode",{parentName:"p"},"file.txt")," has to be opened at some point.\nLet's write data to a file twice and observe the behaviour:"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-console"},"student@os:~/.../lab/support/file-descriptors$ ls -l > file.txt\n\nstudent@os:~/.../lab/support/file-descriptors$ cat file.txt\ntotal 6\n-rw-rw-r-- 1 student student    0 Nov 20 21:11 file.txt\n-rw-rw-r-- 1 student student  125 Nov 20 18:26 Makefile\n-rw-rw-r-- 1 student student  396 Nov 20 21:10 open_directory.c\n-rw-rw-r-- 1 student student 2300 Nov 20 20:51 open_read_write.c\n-rw-rw-r-- 1 student student   34 Nov 20 18:26 read_file.txt\n-rw-r--r-- 1 student student   45 Nov 20 20:56 write_file.txt\n\nstudent@os:~/.../lab/support/file-descriptors$ ls > file.txt\n\nstudent@os:~/.../lab/support/file-descriptors$ cat file.txt\nfile.txt\nMakefile\nopen_directory.c\nopen_read_write.c\nread_file.txt\nwrite_file.txt\n")),(0,r.yg)("p",null,"The second output is shorter than the first, yet the first output is no longer present in the file after the second ",(0,r.yg)("inlineCode",{parentName:"p"},"ls"),".\nHow come?\nWell, the reason is another flag being passed to ",(0,r.yg)("inlineCode",{parentName:"p"},"open()"),": ",(0,r.yg)("inlineCode",{parentName:"p"},"O_TRUNC"),".\nAt this point, you should be accustomed to looking for this flag in ",(0,r.yg)("inlineCode",{parentName:"p"},"open()"),"'s man page.\nGo ahead and do it."),(0,r.yg)("p",null,(0,r.yg)("a",{parentName:"p",href:"/operating-systems/65/Lab/IO/quiz/o-trunc"},"Quiz 1")),(0,r.yg)("p",null,(0,r.yg)("a",{parentName:"p",href:"/operating-systems/65/Lab/IO/quiz/fopen-w"},"Quiz 2")),(0,r.yg)("h3",{id:"practice-closeem-all"},"Practice: Close'em All"),(0,r.yg)("p",null,"Just like you use ",(0,r.yg)("inlineCode",{parentName:"p"},"open()")," to create new file descriptors, you can use ",(0,r.yg)("a",{parentName:"p",href:"https://man7.org/linux/man-pages/man2/close.2.html"},(0,r.yg)("inlineCode",{parentName:"a"},"close()"))," to destroy them.\nThis clears and frees the open file structure to which that entry in the file descriptor table is pointing.\nUse ",(0,r.yg)("inlineCode",{parentName:"p"},"close()")," on the file descriptors you've opened so far in ",(0,r.yg)("inlineCode",{parentName:"p"},"support/file-descriptors/open_read_write.c"),"."),(0,r.yg)("p",null,"Note that you don't have to close file descriptors 0, 1 and 2 manually.\nThe standard streams are meant to stay alive throughout the lifetime of the process.\nJust like calling ",(0,r.yg)("inlineCode",{parentName:"p"},"free()")," on a ",(0,r.yg)("inlineCode",{parentName:"p"},"malloc()"),"-ed pointer, calling ",(0,r.yg)("inlineCode",{parentName:"p"},"close()")," is not really necessary.\nWhen a process terminates, the OS closes all its file descriptors the same way it frees all its memory."),(0,r.yg)("p",null,"And keeping this comparison with ",(0,r.yg)("inlineCode",{parentName:"p"},"malloc()")," and ",(0,r.yg)("inlineCode",{parentName:"p"},"free()"),", closing file descriptors is important when they are created inside a loop, as the file descriptor table's size is limited."),(0,r.yg)("h2",{id:"file-handling-conclusion-libc-vs-syscalls"},"File Handling Conclusion: libc vs syscalls"),(0,r.yg)("p",null,"Up to now, we can draw some parallels between ",(0,r.yg)("inlineCode",{parentName:"p"},"fopen()")," and ",(0,r.yg)("inlineCode",{parentName:"p"},"open()"),".\nWhile ",(0,r.yg)("inlineCode",{parentName:"p"},"fopen()")," allows the usage of high-level functions such as ",(0,r.yg)("inlineCode",{parentName:"p"},"fread()")," and ",(0,r.yg)("inlineCode",{parentName:"p"},"fwrite()"),", which, among other things, use ",(0,r.yg)("inlineCode",{parentName:"p"},"while")," loops to ensure they always read the required number of bytes, the libc-specific API is not generic enough."),(0,r.yg)("p",null,"In the following sections, we'll use file descriptors and ",(0,r.yg)("inlineCode",{parentName:"p"},"read()")," and ",(0,r.yg)("inlineCode",{parentName:"p"},"write()")," to interact with some inter-process-communication mechanisms, such as pipes."),(0,r.yg)("p",null,"The table below shows the higher level API provided by libc and the syscalls it relies on.\nAs usual, use the ",(0,r.yg)("inlineCode",{parentName:"p"},"man")," pages when in doubt about either of them."),(0,r.yg)("table",null,(0,r.yg)("thead",{parentName:"table"},(0,r.yg)("tr",{parentName:"thead"},(0,r.yg)("th",{parentName:"tr",align:"center"},"libc"),(0,r.yg)("th",{parentName:"tr",align:"center"},"syscall"))),(0,r.yg)("tbody",{parentName:"table"},(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"center"},(0,r.yg)("inlineCode",{parentName:"td"},"fopen()")),(0,r.yg)("td",{parentName:"tr",align:"center"},(0,r.yg)("inlineCode",{parentName:"td"},"open()"))),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"center"},(0,r.yg)("inlineCode",{parentName:"td"},"fread()")),(0,r.yg)("td",{parentName:"tr",align:"center"},(0,r.yg)("inlineCode",{parentName:"td"},"read()"))),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"center"},(0,r.yg)("inlineCode",{parentName:"td"},"fwrite()")),(0,r.yg)("td",{parentName:"tr",align:"center"},(0,r.yg)("inlineCode",{parentName:"td"},"write()"))),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"center"},(0,r.yg)("inlineCode",{parentName:"td"},"fseek()")),(0,r.yg)("td",{parentName:"tr",align:"center"},(0,r.yg)("inlineCode",{parentName:"td"},"lseek()"))),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"center"},(0,r.yg)("inlineCode",{parentName:"td"},"fclose()")),(0,r.yg)("td",{parentName:"tr",align:"center"},(0,r.yg)("inlineCode",{parentName:"td"},"close()"))))),(0,r.yg)("p",null,"So for most equivalents, just remove the leading ",(0,r.yg)("inlineCode",{parentName:"p"},"f")," when moving from the libc function to the underlying syscall."),(0,r.yg)("p",null,"For a quick recap of the flags we've discussed so far, take a look at the following table.\nBut don't bother memorising it.\nYou can find it any time in by typing ",(0,r.yg)("a",{parentName:"p",href:"https://man7.org/linux/man-pages/man3/fopen.3.html"},(0,r.yg)("inlineCode",{parentName:"a"},"man fopen"))," in your terminal."),(0,r.yg)("table",null,(0,r.yg)("thead",{parentName:"table"},(0,r.yg)("tr",{parentName:"thead"},(0,r.yg)("th",{parentName:"tr",align:"center"},(0,r.yg)("inlineCode",{parentName:"th"},"fopen()")," mode"),(0,r.yg)("th",{parentName:"tr",align:"center"},(0,r.yg)("inlineCode",{parentName:"th"},"open()")," flag"))),(0,r.yg)("tbody",{parentName:"table"},(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"center"},(0,r.yg)("inlineCode",{parentName:"td"},'"r"')),(0,r.yg)("td",{parentName:"tr",align:"center"},(0,r.yg)("inlineCode",{parentName:"td"},"O_RDONLY"))),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"center"},(0,r.yg)("inlineCode",{parentName:"td"},'"w"')),(0,r.yg)("td",{parentName:"tr",align:"center"},(0,r.yg)("inlineCode",{parentName:"td"},"O_WRONLY \u2502 O_CREAT \u2502 O_TRUNC"))),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"center"},(0,r.yg)("inlineCode",{parentName:"td"},'"a"')),(0,r.yg)("td",{parentName:"tr",align:"center"},(0,r.yg)("inlineCode",{parentName:"td"},"O_WRONLY \u2502 O_CREAT \u2502 O_APPEND"))),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"center"},(0,r.yg)("inlineCode",{parentName:"td"},'"r+"')),(0,r.yg)("td",{parentName:"tr",align:"center"},(0,r.yg)("inlineCode",{parentName:"td"},"O_RDWR"))),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"center"},(0,r.yg)("inlineCode",{parentName:"td"},'"w+"')),(0,r.yg)("td",{parentName:"tr",align:"center"},(0,r.yg)("inlineCode",{parentName:"td"},"O_RDWR \u2502 O_CREAT \u2502 O_TRUNC"))),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:"center"},(0,r.yg)("inlineCode",{parentName:"td"},'"a+"')),(0,r.yg)("td",{parentName:"tr",align:"center"},(0,r.yg)("inlineCode",{parentName:"td"},"O_RDWR \u2502 O_CREAT \u2502 O_APPEND"))))))}y.isMDXComponent=!0},1314:(e,t,n)=>{n.d(t,{A:()=>a});const a=n.p+"assets/images/file-descriptors-d19424f0a417ecd1c032f98a1969ad75.svg"}}]);