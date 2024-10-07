"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[7341],{5680:(e,n,t)=>{t.d(n,{xA:()=>d,yg:()=>b});var a=t(6540);function i(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function r(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function l(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?r(Object(t),!0).forEach((function(n){i(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):r(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function s(e,n){if(null==e)return{};var t,a,i=function(e,n){if(null==e)return{};var t,a,i={},r=Object.keys(e);for(a=0;a<r.length;a++)t=r[a],n.indexOf(t)>=0||(i[t]=e[t]);return i}(e,n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)t=r[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}var o=a.createContext({}),c=function(e){var n=a.useContext(o),t=n;return e&&(t="function"==typeof e?e(n):l(l({},n),e)),t},d=function(e){var n=c(e.components);return a.createElement(o.Provider,{value:n},e.children)},p="mdxType",u={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},y=a.forwardRef((function(e,n){var t=e.components,i=e.mdxType,r=e.originalType,o=e.parentName,d=s(e,["components","mdxType","originalType","parentName"]),p=c(t),y=i,b=p["".concat(o,".").concat(y)]||p[y]||u[y]||r;return t?a.createElement(b,l(l({ref:n},d),{},{components:t})):a.createElement(b,l({ref:n},d))}));function b(e,n){var t=arguments,i=n&&n.mdxType;if("string"==typeof e||i){var r=t.length,l=new Array(r);l[0]=y;var s={};for(var o in n)hasOwnProperty.call(n,o)&&(s[o]=n[o]);s.originalType=e,s[p]="string"==typeof e?e:i,l[1]=s;for(var c=2;c<r;c++)l[c]=t[c];return a.createElement.apply(null,l)}return a.createElement.apply(null,t)}y.displayName="MDXCreateElement"},5579:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>o,contentTitle:()=>l,default:()=>u,frontMatter:()=>r,metadata:()=>s,toc:()=>c});var a=t(8168),i=(t(6540),t(5680));const r={},l="Statically-linked and Dynamically-linked Libraries",s={unversionedId:"Software Stack/Lab 2 - Library Perspective/Libraries/Guides/Static-Dynamic/README",id:"Software Stack/Lab 2 - Library Perspective/Libraries/Guides/Static-Dynamic/README",title:"Statically-linked and Dynamically-linked Libraries",description:"Libraries can be statically-linked or dynamically-linked, creating statically-linked executables and dynamically-linked executables.",source:"@site/docs/Software Stack/Lab 2 - Library Perspective/Libraries/Guides/Static-Dynamic/README.md",sourceDirName:"Software Stack/Lab 2 - Library Perspective/Libraries/Guides/Static-Dynamic",slug:"/Software Stack/Lab 2 - Library Perspective/Libraries/Guides/Static-Dynamic/",permalink:"/operating-systems/Software Stack/Lab 2 - Library Perspective/Libraries/Guides/Static-Dynamic/",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"Guides",permalink:"/operating-systems/Software Stack/Lab 2 - Library Perspective/Libraries/Guides/"},next:{title:"Drills",permalink:"/operating-systems/Software Stack/Lab 2 - Library Perspective/Libraries/Drills/"}},o={},c=[],d={toc:c},p="wrapper";function u(e){let{components:n,...t}=e;return(0,i.yg)(p,(0,a.A)({},d,t,{components:n,mdxType:"MDXLayout"}),(0,i.yg)("h1",{id:"statically-linked-and-dynamically-linked-libraries"},"Statically-linked and Dynamically-linked Libraries"),(0,i.yg)("p",null,"Libraries can be statically-linked or dynamically-linked, creating statically-linked executables and dynamically-linked executables.\nTypically, the executables found in modern operating systems are dynamically-linked, given their reduced size and ability to share libraries at runtime."),(0,i.yg)("p",null,"The ",(0,i.yg)("inlineCode",{parentName:"p"},"chapters/software-stack/libraries/guides/static-dynamic/support/"),' folder stores the implementation of a simple "Hello, World!"-printing program that uses both static and dynamic linking of libraries.\nLet\'s build and run the two executables:'),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-console"},"student@os:~/.../static-dynamic/support$ ls\nhello.c  Makefile\n\nstudent@os:~/.../static-dynamic/support$ make\ncc -Wall   -c -o hello.o hello.c\ncc   hello.o   -o hello\ncc -static -o hello_static hello.o\n\nstudent@os:~/.../static-dynamic/support$ ls -lh\ntotal 852K\n-rwxrwxr-x 1 razvan razvan 8.2K Aug  2 15:53 hello\n-rw-rw-r-- 1 razvan razvan   76 Aug  2 15:51 hello.c\n-rw-rw-r-- 1 razvan razvan 1.6K Aug  2 15:53 hello.o\n-rwxrwxr-x 1 razvan razvan 827K Aug  2 15:53 hello_static\n-rw-rw-r-- 1 razvan razvan  237 Aug  2 15:53 Makefile\n\nstudent@os:~/.../static-dynamic/support$ ./hello\nHello, World!\n\nstudent@os:~/.../static-dynamic/support$ ./hello_static\nHello, World!\n")),(0,i.yg)("p",null,"The two executables (",(0,i.yg)("inlineCode",{parentName:"p"},"hello")," and ",(0,i.yg)("inlineCode",{parentName:"p"},"hello_static"),") behave similarly, despite having vastly different sizes (",(0,i.yg)("inlineCode",{parentName:"p"},"8.2K")," vs. ",(0,i.yg)("inlineCode",{parentName:"p"},"827K")," - 100 times larger)."),(0,i.yg)("p",null,"We use ",(0,i.yg)("inlineCode",{parentName:"p"},"nm")," and ",(0,i.yg)("inlineCode",{parentName:"p"},"ldd")," to catch differences between the two types of resulting executables:"),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-console"},"student@os:~/.../static-dynamic/support$ ldd hello\n        linux-vdso.so.1 (0x00007ffc8d9b2000)\n        libc.so.6 => /lib/x86_64-linux-gnu/libc.so.6 (0x00007f10d1d88000)\n        /lib64/ld-linux-x86-64.so.2 (0x00007f10d237b000)\n\nstudent@os:~/.../static-dynamic/support$ ldd hello_static\n        not a dynamic executable\n\nstudent@os:~/.../static-dynamic/support$ nm hello | wc -l\n33\n\nstudent@os:~/.../static-dynamic/support$ nm hello_static | wc -l\n1674\n")),(0,i.yg)("p",null,"The dynamic executable references the dynamically-linked libc library (",(0,i.yg)("inlineCode",{parentName:"p"},"/lib/x86_64-linux-gnu/libc.so.6"),"), while the statically-linked executable has no references.\nAlso, given the statically-linked executable integrated entire parts of statically-linked libraries, there are many more symbols than in the case of a dynamically-linked executable (",(0,i.yg)("inlineCode",{parentName:"p"},"1674")," vs. ",(0,i.yg)("inlineCode",{parentName:"p"},"33"),")."),(0,i.yg)("p",null,"We can use ",(0,i.yg)("inlineCode",{parentName:"p"},"strace")," to see that there are differences in the preparatory system calls for each type of executables.\nFor the dynamically-linked executable, the dynamically-linked library (",(0,i.yg)("inlineCode",{parentName:"p"},"/lib/x86_64-linux-gnu/libc.so.6"),") is opened during runtime:"),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-console"},'student@os:~/.../static-dynamic/support$ strace ./hello\nexecve("./hello", ["./hello"], 0x7ffc409c6640 /- 66 vars */) = 0\nbrk(NULL)                               = 0x55a72eda6000\naccess("/etc/ld.so.nohwcap", F_OK)      = -1 ENOENT (No such file or directory)\naccess("/etc/ld.so.preload", R_OK)      = -1 ENOENT (No such file or directory)\nopenat(AT_FDCWD, "/etc/ld.so.cache", O_RDONLY|O_CLOEXEC) = 3\nfstat(3, {st_mode=S_IFREG|0644, st_size=198014, ...}) = 0\nmmap(NULL, 198014, PROT_READ, MAP_PRIVATE, 3, 0) = 0x7f3136a41000\nclose(3)                                = 0\naccess("/etc/ld.so.nohwcap", F_OK)      = -1 ENOENT (No such file or directory)\nopenat(AT_FDCWD, "/lib/x86_64-linux-gnu/libc.so.6", O_RDONLY|O_CLOEXEC) = 3\nread(3, "\\177ELF\\2\\1\\1\\3\\0\\0\\0\\0\\0\\0\\0\\0\\3\\0>\\0\\1\\0\\0\\0\\240\\35\\2\\0\\0\\0\\0\\0"..., 832) = 832\nfstat(3, {st_mode=S_IFREG|0755, st_size=2030928, ...}) = 0\nmmap(NULL, 8192, PROT_READ|PROT_WRITE, MAP_PRIVATE|MAP_ANONYMOUS, -1, 0) = 0x7f3136a3f000\nmmap(NULL, 4131552, PROT_READ|PROT_EXEC, MAP_PRIVATE|MAP_DENYWRITE, 3, 0) = 0x7f3136458000\nmprotect(0x7f313663f000, 2097152, PROT_NONE) = 0\nmmap(0x7f313683f000, 24576, PROT_READ|PROT_WRITE, MAP_PRIVATE|MAP_FIXED|MAP_DENYWRITE, 3, 0x1e7000) = 0x7f313683f000\nmmap(0x7f3136845000, 15072, PROT_READ|PROT_WRITE, MAP_PRIVATE|MAP_FIXED|MAP_ANONYMOUS, -1, 0) = 0x7f3136845000\nclose(3)                                = 0\narch_prctl(ARCH_SET_FS, 0x7f3136a404c0) = 0\nmprotect(0x7f313683f000, 16384, PROT_READ) = 0\nmprotect(0x55a72d1bb000, 4096, PROT_READ) = 0\nmprotect(0x7f3136a72000, 4096, PROT_READ) = 0\nmunmap(0x7f3136a41000, 198014)          = 0\nfstat(1, {st_mode=S_IFCHR|0620, st_rdev=makedev(136, 18), ...}) = 0\nbrk(NULL)                               = 0x55a72eda6000\nbrk(0x55a72edc7000)                     = 0x55a72edc7000\nwrite(1, "Hello, World!\\n", 14Hello, World!\n)         = 14\nexit_group(0)                           = ?\n+++ exited with 0 +++\n\nstudent@os:~/.../static-dynamic/support$ strace ./hello_static\nexecve("./hello_static", ["./hello_static"], 0x7ffc9fd45400 /- 66 vars */) = 0\nbrk(NULL)                               = 0xff8000\nbrk(0xff91c0)                           = 0xff91c0\narch_prctl(ARCH_SET_FS, 0xff8880)       = 0\nuname({sysname="Linux", nodename="yggdrasil", ...}) = 0\nreadlink("/proc/self/exe", "/home/razvan/school/so/operating"..., 4096) = 116\nbrk(0x101a1c0)                          = 0x101a1c0\nbrk(0x101b000)                          = 0x101b000\naccess("/etc/ld.so.nohwcap", F_OK)      = -1 ENOENT (No such file or directory)\nfstat(1, {st_mode=S_IFCHR|0620, st_rdev=makedev(136, 18), ...}) = 0\nwrite(1, "Hello, World!\\n", 14Hello, World!\n)         = 14\nexit_group(0)                           = ?\n+++ exited with 0 +++\n')),(0,i.yg)("p",null,"Similarly, we can investigate a system executable (",(0,i.yg)("inlineCode",{parentName:"p"},"/bin/ls"),") to see that indeed all referenced dynamically-linked libraries are opened (via the ",(0,i.yg)("inlineCode",{parentName:"p"},"openat")," system call) at runtime:"),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-console"},'student@os:~/.../static-dynamic/support$ ldd $(which ls)\n    linux-vdso.so.1 (0x00007ffc3bdf3000)\n    libselinux.so.1 => /lib/x86_64-linux-gnu/libselinux.so.1 (0x00007f092bd88000)\n    libc.so.6 => /lib/x86_64-linux-gnu/libc.so.6 (0x00007f092b997000)\n    libpcre.so.3 => /lib/x86_64-linux-gnu/libpcre.so.3 (0x00007f092b726000)\n    libdl.so.2 => /lib/x86_64-linux-gnu/libdl.so.2 (0x00007f092b522000)\n    /lib64/ld-linux-x86-64.so.2 (0x00007f092c1d2000)\n    libpthread.so.0 => /lib/x86_64-linux-gnu/libpthread.so.0 (0x00007f092b303000)\n\nstudent@os:~/.../static-dynamic/support$ strace -e openat ls\nopenat(AT_FDCWD, "/etc/ld.so.cache", O_RDONLY|O_CLOEXEC) = 3\nopenat(AT_FDCWD, "/lib/x86_64-linux-gnu/libselinux.so.1", O_RDONLY|O_CLOEXEC) = 3\nopenat(AT_FDCWD, "/lib/x86_64-linux-gnu/libc.so.6", O_RDONLY|O_CLOEXEC) = 3\nopenat(AT_FDCWD, "/lib/x86_64-linux-gnu/libpcre.so.3", O_RDONLY|O_CLOEXEC) = 3\nopenat(AT_FDCWD, "/lib/x86_64-linux-gnu/libdl.so.2", O_RDONLY|O_CLOEXEC) = 3\nopenat(AT_FDCWD, "/lib/x86_64-linux-gnu/libpthread.so.0", O_RDONLY|O_CLOEXEC) = 3\nopenat(AT_FDCWD, "/proc/filesystems", O_RDONLY|O_CLOEXEC) = 3\nopenat(AT_FDCWD, "/usr/lib/locale/locale-archive", O_RDONLY|O_CLOEXEC) = 3\nopenat(AT_FDCWD, ".", O_RDONLY|O_NONBLOCK|O_CLOEXEC|O_DIRECTORY) = 3\ncommunity  docs  _index.html  search.md\n+++ exited with 0 +++\n')),(0,i.yg)("p",null,(0,i.yg)("a",{parentName:"p",href:"/operating-systems/Software%20Stack/Lab%202%20-%20Library%20Perspective/Libraries/Drills/Questions/dynamic-libraries"},"Quiz 1")),(0,i.yg)("p",null,(0,i.yg)("a",{parentName:"p",href:"/operating-systems/Software%20Stack/Lab%202%20-%20Library%20Perspective/Libraries/Drills/Questions/static-executables"},"Quiz 2")))}u.isMDXComponent=!0}}]);