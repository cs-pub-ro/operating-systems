"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[1522],{5680:(e,t,a)=>{a.d(t,{xA:()=>p,yg:()=>d});var n=a(6540);function o(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function r(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?r(Object(a),!0).forEach((function(t){o(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):r(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function l(e,t){if(null==e)return{};var a,n,o=function(e,t){if(null==e)return{};var a,n,o={},r=Object.keys(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||(o[a]=e[a]);return o}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(o[a]=e[a])}return o}var c=n.createContext({}),s=function(e){var t=n.useContext(c),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},p=function(e){var t=s(e.components);return n.createElement(c.Provider,{value:t},e.children)},m="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},g=n.forwardRef((function(e,t){var a=e.components,o=e.mdxType,r=e.originalType,c=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),m=s(a),g=o,d=m["".concat(c,".").concat(g)]||m[g]||u[g]||r;return a?n.createElement(d,i(i({ref:t},p),{},{components:a})):n.createElement(d,i({ref:t},p))}));function d(e,t){var a=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var r=a.length,i=new Array(r);i[0]=g;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l[m]="string"==typeof e?e:o,i[1]=l;for(var s=2;s<r;s++)i[s]=a[s];return n.createElement.apply(null,i)}return n.createElement.apply(null,a)}g.displayName="MDXCreateElement"},6187:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>u,frontMatter:()=>r,metadata:()=>l,toc:()=>s});var n=a(8168),o=(a(6540),a(5680));const r={},i="App Investigation: Git",l={unversionedId:"Data/Lab 4 - Investigate Memory/guides/git/README",id:"Data/Lab 4 - Investigate Memory/guides/git/README",title:"App Investigation: Git",description:"Git is among the most used source code management system, powering development infrastructures such as GitHub, GitLab and Bitbucket.",source:"@site/docs/Data/Lab 4 - Investigate Memory/guides/git/README.md",sourceDirName:"Data/Lab 4 - Investigate Memory/guides/git",slug:"/Data/Lab 4 - Investigate Memory/guides/git/",permalink:"/operating-systems/77/Data/Lab 4 - Investigate Memory/guides/git/",draft:!1,tags:[],version:"current",frontMatter:{}},c={},s=[{value:"Practice",id:"practice",level:3}],p={toc:s},m="wrapper";function u(e){let{components:t,...a}=e;return(0,o.yg)(m,(0,n.A)({},p,a,{components:t,mdxType:"MDXLayout"}),(0,o.yg)("h1",{id:"app-investigation-git"},"App Investigation: Git"),(0,o.yg)("p",null,(0,o.yg)("a",{parentName:"p",href:"https://git-scm.com/"},"Git")," is among the most used source code management system, powering development infrastructures such as ",(0,o.yg)("a",{parentName:"p",href:"https://github.com/"},"GitHub"),", ",(0,o.yg)("a",{parentName:"p",href:"https://about.gitlab.com/"},"GitLab")," and ",(0,o.yg)("a",{parentName:"p",href:"https://bitbucket.org/"},"Bitbucket"),"."),(0,o.yg)("p",null,"Let's clone ",(0,o.yg)("a",{parentName:"p",href:"https://github.com/git/git"},"the repository"),".\nNote that it is about 200MB large:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-console"},"student@os:~/.../data/lab/support$ git clone https://github.com/git/git\n[...]\n\nstudent@os:~/.../data/lab/support$ cd git/\n")),(0,o.yg)("p",null,"We look of uses of ",(0,o.yg)("inlineCode",{parentName:"p"},"malloc()"),":"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-console"},"student@os:~/.../lab/support/git$ grep -r 'malloc(' .\n")),(0,o.yg)("p",null,"We see there are multiple calls to the ",(0,o.yg)("inlineCode",{parentName:"p"},"xmalloc()")," function, which is likely a wrapper for ",(0,o.yg)("inlineCode",{parentName:"p"},"malloc()"),".\nWe search for the definition of ",(0,o.yg)("inlineCode",{parentName:"p"},"xmalloc()"),":"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-console"},"student@os:~/.../lab/support/git$ grep -rn 'xmalloc(' . | grep -v ';'\n./commit.c:188:                 graft = xmalloc(st_add(sizeof(*graft),\n./add-interactive.c:157:        list->sorted.items = xmalloc(st_mult(sizeof(*list->sorted.items),\n./Documentation/RelNotes/2.24.0.txt:91: * xmalloc() used to have a mechanism to ditch memory and address\n./Documentation/RelNotes/2.24.0.txt:210:   xmalloc() wrapper, as the rest of the system, for consistency.\n./Documentation/RelNotes/2.34.0.txt:230: * mmap() imitation used to call xmalloc() that dies upon malloc()\n./Documentation/RelNotes/2.33.1.txt:44: * mmap() imitation used to call xmalloc() that dies upon malloc()\n./diffcore-delta.c:56:  new_spanhash = xmalloc(st_add(sizeof(*orig),\n./diffcore-delta.c:135: hash = xmalloc(st_add(sizeof(*hash),\n./kwset.c:41:/* adapter for `xmalloc()`, which takes `size_t`, not `long` */\n./builtin/fast-import.c:461:    b = xmalloc(sizeof(struct object_entry_pool)\n./hashmap.h:311: * your structure was allocated with xmalloc(), you can just free(3) it,\n./xdiff/xdiff.h:122:#define xdl_malloc(x) xmalloc(x)\n./wrapper.c:45:static void *do_xmalloc(size_t size, int gentle)\n./wrapper.c:70:void *xmalloc(size_t size)\n./contrib/credential/wincred/git-credential-wincred.c:26:static void *xmalloc(size_t size)\nBinary file ./.git/objects/pack/pack-c587b9f11a82bc4d49848d74132e60ea4dbeb177.pack matches\n./git-compat-util.h:1046:# define xalloca(size)      (xmalloc(size))\n./git-compat-util.h:1086:#define ALLOC_ARRAY(x, alloc) (x) = xmalloc(st_mult(sizeof(*(x)), (alloc)))\n./read-cache.c:3768:    ieot = xmalloc(sizeof(struct index_entry_offset_table)\n")),(0,o.yg)("p",null,"Line ",(0,o.yg)("inlineCode",{parentName:"p"},"./wrapper.c:70")," is the one with the definition of the ",(0,o.yg)("inlineCode",{parentName:"p"},"xmalloc()")," function.\nIt makes a call of the ",(0,o.yg)("a",{parentName:"p",href:"https://github.com/git/git/blob/master/wrapper.c#L45"},(0,o.yg)("inlineCode",{parentName:"a"},"do_xmalloc()")," function"),", that makes extra checks.\nAlso, if the ",(0,o.yg)("inlineCode",{parentName:"p"},"XMALLOC_POISON"),' macro is defined, all the allocated data is overwritten with a "poison" value (',(0,o.yg)("inlineCode",{parentName:"p"},"0xA5"),").\nThis is useful for early detection of memory-related issues, although, evidently, it adds overhead."),(0,o.yg)("p",null,"We can look for parts of the source code with the largest number of uses of ",(0,o.yg)("inlineCode",{parentName:"p"},"xmalloc()"),":"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-console"},"student@os:~/.../lab/support/git$ grep -rc 'xmalloc(' . | grep -v ':0' | sort -n -t ':' -k 20\n[...]\n./compat/mingw.c:6\n./submodule-config.c:6\n./merge-recursive.c:7\n")),(0,o.yg)("p",null,"We can look into the ",(0,o.yg)("a",{parentName:"p",href:"https://github.com/git/git/blob/master/merge-recursive.c"},(0,o.yg)("inlineCode",{parentName:"a"},"merge-recursive.c")," file")," for uses of the ",(0,o.yg)("inlineCode",{parentName:"p"},"xmalloc()")," function."),(0,o.yg)("h3",{id:"practice"},"Practice"),(0,o.yg)("p",null,"Do the same actions as above for the ",(0,o.yg)("inlineCode",{parentName:"p"},"mmap()")," and ",(0,o.yg)("inlineCode",{parentName:"p"},"xmmap()")," function calls."),(0,o.yg)("p",null,"Note that these are not memory allocation calls, since a valid ",(0,o.yg)("inlineCode",{parentName:"p"},"fd")," file argument is passed.\nThese are file mapping calls, that we will talk more as part of the I/O chapter."))}u.isMDXComponent=!0}}]);