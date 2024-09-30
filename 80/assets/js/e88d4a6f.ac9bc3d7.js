"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[7753],{5680:(e,n,t)=>{t.d(n,{xA:()=>m,yg:()=>u});var a=t(6540);function i(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function r(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function o(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?r(Object(t),!0).forEach((function(n){i(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):r(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function s(e,n){if(null==e)return{};var t,a,i=function(e,n){if(null==e)return{};var t,a,i={},r=Object.keys(e);for(a=0;a<r.length;a++)t=r[a],n.indexOf(t)>=0||(i[t]=e[t]);return i}(e,n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)t=r[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}var p=a.createContext({}),l=function(e){var n=a.useContext(p),t=n;return e&&(t="function"==typeof e?e(n):o(o({},n),e)),t},m=function(e){var n=l(e.components);return a.createElement(p.Provider,{value:n},e.children)},c="mdxType",d={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},f=a.forwardRef((function(e,n){var t=e.components,i=e.mdxType,r=e.originalType,p=e.parentName,m=s(e,["components","mdxType","originalType","parentName"]),c=l(t),f=i,u=c["".concat(p,".").concat(f)]||c[f]||d[f]||r;return t?a.createElement(u,o(o({ref:n},m),{},{components:t})):a.createElement(u,o({ref:n},m))}));function u(e,n){var t=arguments,i=n&&n.mdxType;if("string"==typeof e||i){var r=t.length,o=new Array(r);o[0]=f;var s={};for(var p in n)hasOwnProperty.call(n,p)&&(s[p]=n[p]);s.originalType=e,s[c]="string"==typeof e?e:i,o[1]=s;for(var l=2;l<r;l++)o[l]=t[l];return a.createElement.apply(null,o)}return a.createElement.apply(null,t)}f.displayName="MDXCreateElement"},5057:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>p,contentTitle:()=>o,default:()=>d,frontMatter:()=>r,metadata:()=>s,toc:()=>l});var a=t(8168),i=(t(6540),t(5680));const r={},o="File Mappings",s={unversionedId:"Lab/IO/file-mappings",id:"Lab/IO/file-mappings",title:"File Mappings",description:"Mapping a file to the VAS of a process is similar to how shared libraries are loaded into the same VAS.",source:"@site/docs/Lab/IO/file-mappings.md",sourceDirName:"Lab/IO",slug:"/Lab/IO/file-mappings",permalink:"/operating-systems/80/Lab/IO/file-mappings",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"Beyond Network Sockets",permalink:"/operating-systems/80/Lab/IO/beyond-network-sockets"},next:{title:"I/O Internals",permalink:"/operating-systems/80/Lab/IO/io-internals"}},p={},l=[{value:"The Return of <code>mmap()</code>",id:"the-return-of-mmap",level:2},{value:"What About <code>read()</code>?",id:"what-about-read",level:3},{value:"Practice: Copy a File",id:"practice-copy-a-file",level:3},{value:"Practice: I Am Speed",id:"practice-i-am-speed",level:3},{value:"Conclusion",id:"conclusion",level:2}],m={toc:l},c="wrapper";function d(e){let{components:n,...t}=e;return(0,i.yg)(c,(0,a.A)({},m,t,{components:n,mdxType:"MDXLayout"}),(0,i.yg)("h1",{id:"file-mappings"},"File Mappings"),(0,i.yg)("p",null,"Mapping a file to the VAS of a process is similar to how shared libraries are loaded into the same VAS.\nIt's a fancier way of saying that the contents of a file are copied from a given offset within that file to a given address.\nWhat's nice about this is that the OS handles all offsets, addresses and memory allocations on its own, with a single highly versatile syscall: ",(0,i.yg)("inlineCode",{parentName:"p"},"mmap()"),"."),(0,i.yg)("h2",{id:"the-return-of-mmap"},"The Return of ",(0,i.yg)("inlineCode",{parentName:"h2"},"mmap()")),(0,i.yg)("p",null,"Remember that the ",(0,i.yg)("inlineCode",{parentName:"p"},".text"),", ",(0,i.yg)("inlineCode",{parentName:"p"},".rodata")," and ",(0,i.yg)("inlineCode",{parentName:"p"},".data")," sections of libraries are present in the VAS of any Linux process:"),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-console"},"student@os:~$ sleep 1000 &  # start a `sleep` process in the background\n[1] 17579\n\nstudent@os:~$ cat /proc/$(pidof sleep)/maps\n55b7b646f000-55b7b6471000 r--p 00000000 103:07 6423964                   /usr/bin/sleep\n55b7b6471000-55b7b6475000 r-xp 00002000 103:07 6423964                   /usr/bin/sleep\n55b7b6475000-55b7b6477000 r--p 00006000 103:07 6423964                   /usr/bin/sleep\n55b7b6478000-55b7b6479000 r--p 00008000 103:07 6423964                   /usr/bin/sleep\n55b7b6479000-55b7b647a000 rw-p 00009000 103:07 6423964                   /usr/bin/sleep\n55b7b677c000-55b7b679d000 rw-p 00000000 00:00 0                          [heap]\n7fe442f61000-7fe44379d000 r--p 00000000 103:07 6423902                   /usr/lib/locale/locale-archive\n7fe44379d000-7fe4437bf000 r--p 00000000 103:07 6432810                   /usr/lib/x86_64-linux-gnu/libc-2.31.so\n7fe4437bf000-7fe443937000 r-xp 00022000 103:07 6432810                   /usr/lib/x86_64-linux-gnu/libc-2.31.so\n7fe443937000-7fe443985000 r--p 0019a000 103:07 6432810                   /usr/lib/x86_64-linux-gnu/libc-2.31.so\n7fe443985000-7fe443989000 r--p 001e7000 103:07 6432810                   /usr/lib/x86_64-linux-gnu/libc-2.31.so\n7fe443989000-7fe44398b000 rw-p 001eb000 103:07 6432810                   /usr/lib/x86_64-linux-gnu/libc-2.31.so\n7fe44398b000-7fe443991000 rw-p 00000000 00:00 0\n7fe4439ad000-7fe4439ae000 r--p 00000000 103:07 6429709                   /usr/lib/x86_64-linux-gnu/ld-2.31.so\n7fe4439ae000-7fe4439d1000 r-xp 00001000 103:07 6429709                   /usr/lib/x86_64-linux-gnu/ld-2.31.so\n7fe4439d1000-7fe4439d9000 r--p 00024000 103:07 6429709                   /usr/lib/x86_64-linux-gnu/ld-2.31.so\n7fe4439da000-7fe4439db000 r--p 0002c000 103:07 6429709                   /usr/lib/x86_64-linux-gnu/ld-2.31.so\n7fe4439db000-7fe4439dc000 rw-p 0002d000 103:07 6429709                   /usr/lib/x86_64-linux-gnu/ld-2.31.so\n7fe4439dc000-7fe4439dd000 rw-p 00000000 00:00 0\n7ffd07aeb000-7ffd07b0c000 rw-p 00000000 00:00 0                          [stack]\n7ffd07b8b000-7ffd07b8e000 r--p 00000000 00:00 0                          [vvar]\n7ffd07b8e000-7ffd07b8f000 r-xp 00000000 00:00 0                          [vdso]\nffffffffff600000-ffffffffff601000 --xp 00000000 00:00 0                  [vsyscall]\n")),(0,i.yg)("p",null,"How does the content of those files get there?\nBelow you can see how libc is loaded, i.e. mapped into the VAS of an ",(0,i.yg)("inlineCode",{parentName:"p"},"ls")," process."),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-console"},'student@os:~$ strace ls\nopenat(AT_FDCWD, "/lib/x86_64-linux-gnu/libc.so.6", O_RDONLY|O_CLOEXEC) = 3\n[...]\nmmap(NULL, 2037344, PROT_READ, MAP_PRIVATE|MAP_DENYWRITE, 3, 0) = 0x7fb313c9c000\nmmap(0x7fb313cbe000, 1540096, PROT_READ|PROT_EXEC, MAP_PRIVATE|MAP_FIXED|MAP_DENYWRITE, 3, 0x22000) = 0x7fb313cbe000\nmmap(0x7fb313e36000, 319488, PROT_READ, MAP_PRIVATE|MAP_FIXED|MAP_DENYWRITE, 3, 0x19a000) = 0x7fb313e36000\nmmap(0x7fb313e84000, 24576, PROT_READ|PROT_WRITE, MAP_PRIVATE|MAP_FIXED|MAP_DENYWRITE, 3, 0x1e7000) = 0x7fb313e84000\n')),(0,i.yg)("p",null,"For a quick reminder about ",(0,i.yg)("inlineCode",{parentName:"p"},"mmap()"),", its 5th argument is the file descriptor from where we want to copy the data to the RAM.\nThe 6th argument is the offset within the file from where to start copying."),(0,i.yg)("h3",{id:"what-about-read"},"What About ",(0,i.yg)("inlineCode",{parentName:"h3"},"read()"),"?"),(0,i.yg)("p",null,"Let's get the elephant out of the room: why use ",(0,i.yg)("inlineCode",{parentName:"p"},"mmap()")," instead of ",(0,i.yg)("inlineCode",{parentName:"p"},"read()")," for dynamic libraries?"),(0,i.yg)("p",null,"The short answer: for efficiency and convenience."),(0,i.yg)("p",null,(0,i.yg)("inlineCode",{parentName:"p"},"read()")," is a rather blunt approach for loading libraries into memory, as it does not take advantage of their particularities.\nThere are two main points to consider: how is memory accessed and when is it modified.\nDynamic libraries are mostly ",(0,i.yg)("strong",{parentName:"p"},"non-writable")," (",(0,i.yg)("inlineCode",{parentName:"p"},".data")," section being the exception) and ",(0,i.yg)("strong",{parentName:"p"},"arbitrarily accessed"),".\nReading and storing a library whose content might end up mostly unused does not sound like the right thing to do."),(0,i.yg)("p",null,"On the other hand, ",(0,i.yg)("inlineCode",{parentName:"p"},"mmap()")," makes use of ",(0,i.yg)("inlineCode",{parentName:"p"},"demand paging"),".\nAs a reminder, ",(0,i.yg)("inlineCode",{parentName:"p"},"demand paging")," is a technique where memory is allocated, but each memory page is loaded when needed.\nFurthermore, ",(0,i.yg)("inlineCode",{parentName:"p"},"mmap()")," will check if the library was already loaded into memory, and if so, it will not use additional memory, thus reducing the startup time.\nAs you remember from the Compute chapter, processes sharing memory will lead to ",(0,i.yg)("a",{parentName:"p",href:"https://open-education-hub.github.io/operating-systems/Lab/Compute/copy-on-write"},(0,i.yg)("inlineCode",{parentName:"a"},"copy-on-write")),", but this is far better than creating copies of the non-writable sections as ",(0,i.yg)("inlineCode",{parentName:"p"},"read()")," does."),(0,i.yg)("p",null,"Even without considering any OS tweaks, using ",(0,i.yg)("inlineCode",{parentName:"p"},"read()")," to load dynamic libraries would require extra work.\nThis is because allocating memory at the correct address would still require the use of ",(0,i.yg)("inlineCode",{parentName:"p"},"mmap()"),".\nAdditionally, setting the appropriate permissions to avoid security issues would require the use of ",(0,i.yg)("inlineCode",{parentName:"p"},"mprotect()"),".\nTherefore, using ",(0,i.yg)("inlineCode",{parentName:"p"},"mmap()")," alone is a more convenient way for loading dynamic libraries."),(0,i.yg)("h3",{id:"practice-copy-a-file"},"Practice: Copy a File"),(0,i.yg)("p",null,"If ",(0,i.yg)("inlineCode",{parentName:"p"},"mmap()")," is good for copying files, let's use it like this.\nNavigate to ",(0,i.yg)("inlineCode",{parentName:"p"},"support/file-mappings/mmap_cp.c"),".\nIt copies the contents of a file to another by ",(0,i.yg)("inlineCode",{parentName:"p"},"mmap()"),"-ing each of them to its VAS and then simply copying the bytes from one mapping to another as if copying the contents of 2 arrays."),(0,i.yg)("ol",null,(0,i.yg)("li",{parentName:"ol"},"Fill in the ",(0,i.yg)("inlineCode",{parentName:"li"},"TODO"),"s so that the program correctly copies the contents of the input file to the output file.\nUse ",(0,i.yg)("inlineCode",{parentName:"li"},"make test-file")," to generate a 1MB file with random data.\nYou can use this for debugging and ",(0,i.yg)("inlineCode",{parentName:"li"},"diff")," to test whether the input and output files differ (they shouldn't):")),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-console"},"student@os:/.../support/file-mappings$ ./mmap_cp test-file.txt output.txt\n\nstudent@os:/.../support/file-mappings$ diff test-file.txt output.txt\n\nstudent@os:/.../support/file-mappings$\n")),(0,i.yg)("ol",{start:2},(0,i.yg)("li",{parentName:"ol"},"Uncomment the calls to ",(0,i.yg)("inlineCode",{parentName:"li"},"wait_for_input()")," and rerun the program.\nWhile the program is waiting, open another terminal and run ",(0,i.yg)("inlineCode",{parentName:"li"},"cat /proc/$(pidof mmap_cp)/maps")," and see the mapped files.")),(0,i.yg)("h3",{id:"practice-i-am-speed"},"Practice: I Am Speed"),(0,i.yg)("p",null,"Now we can copy files using ",(0,i.yg)("inlineCode",{parentName:"p"},"mmap()"),".\nThe code is rather short and convenient to write.\nIts disadvantage is that we have to ",(0,i.yg)("inlineCode",{parentName:"p"},"mmap()")," the 2 files entirely of the VAS of the process.\nWhile this may be alright for small files, for larger ones we simply may not have enough RAM.\nWhat if we had to copy a 500GB file?"),(0,i.yg)("p",null,"Let's look at what the ",(0,i.yg)("inlineCode",{parentName:"p"},"cp")," tool uses for copying."),(0,i.yg)("p",null,(0,i.yg)("a",{parentName:"p",href:"/operating-systems/80/Lab/IO/quiz/syscalls-cp"},"Quiz 1")),(0,i.yg)("p",null,"OK, so we have a competition: our ",(0,i.yg)("inlineCode",{parentName:"p"},"mmap_cp")," versus ",(0,i.yg)("inlineCode",{parentName:"p"},"cp"),".\nRun the script ",(0,i.yg)("inlineCode",{parentName:"p"},"benchmark_cp.sh")," to measure which of the 2 implementations is faster."),(0,i.yg)("p",null,(0,i.yg)("a",{parentName:"p",href:"/operating-systems/80/Lab/IO/quiz/mmap-read-write-benchmark"},"Quiz 2")),(0,i.yg)("p",null,"Now take a look at the ",(0,i.yg)("inlineCode",{parentName:"p"},"benchmark_cp.sh")," script.\nYou might get a little confused about the following command: ",(0,i.yg)("inlineCode",{parentName:"p"},"echo 3 > /proc/sys/vm/drop_caches"),".\nHead over to ",(0,i.yg)("a",{parentName:"p",href:"/operating-systems/80/Lab/IO/arena#to-drop-or-not-to-drop"},"this section in the Arena")," to find out what it's about."),(0,i.yg)("h2",{id:"conclusion"},"Conclusion"),(0,i.yg)("p",null,"So by using ",(0,i.yg)("inlineCode",{parentName:"p"},"mmap()"),", we pay the price for loading the file into memory ",(0,i.yg)("strong",{parentName:"p"},"once"),", but then all ",(0,i.yg)("inlineCode",{parentName:"p"},"read()"),"s, ",(0,i.yg)("inlineCode",{parentName:"p"},"write()"),"s and especially ",(0,i.yg)("inlineCode",{parentName:"p"},"seek()"),"s will be faster.\nThis is akin to treating the file as a regular byte array.\nSo file mappings are especially useful for randomly accessing file data.\nAccessing the i-th byte in a file becomes the same as ",(0,i.yg)("inlineCode",{parentName:"p"},"mapping[i]"),", which is obviously more efficient than calling ",(0,i.yg)("inlineCode",{parentName:"p"},"lseek()"),".\nFile mappings are also useful when we have to overwrite existing data multiple times or when we read certain chunks multiple times."))}d.isMDXComponent=!0}}]);