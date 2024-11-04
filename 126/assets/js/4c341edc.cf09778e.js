"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[1392],{5680:(e,n,t)=>{t.d(n,{xA:()=>u,yg:()=>y});var r=t(6540);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function s(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var o=r.createContext({}),p=function(e){var n=r.useContext(o),t=n;return e&&(t="function"==typeof e?e(n):s(s({},n),e)),t},u=function(e){var n=p(e.components);return r.createElement(o.Provider,{value:n},e.children)},m="mdxType",c={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},d=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,i=e.originalType,o=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),m=p(t),d=a,y=m["".concat(o,".").concat(d)]||m[d]||c[d]||i;return t?r.createElement(y,s(s({ref:n},u),{},{components:t})):r.createElement(y,s({ref:n},u))}));function y(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var i=t.length,s=new Array(i);s[0]=d;var l={};for(var o in n)hasOwnProperty.call(n,o)&&(l[o]=n[o]);l.originalType=e,l[m]="string"==typeof e?e:a,s[1]=l;for(var p=2;p<i;p++)s[p]=t[p];return r.createElement.apply(null,s)}return r.createElement.apply(null,t)}d.displayName="MDXCreateElement"},7992:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>o,contentTitle:()=>s,default:()=>c,frontMatter:()=>i,metadata:()=>l,toc:()=>p});var r=t(8168),a=(t(6540),t(5680));const i={},s="Parser",l={unversionedId:"Assignments/Mini Shell/util/parser/README",id:"Assignments/Mini Shell/util/parser/README",title:"Parser",description:"The parser is made using Bison and Flex.",source:"@site/docs/Assignments/Mini Shell/util/parser/README.md",sourceDirName:"Assignments/Mini Shell/util/parser",slug:"/Assignments/Mini Shell/util/parser/",permalink:"/operating-systems/126/Assignments/Mini Shell/util/parser/",draft:!1,tags:[],version:"current",frontMatter:{}},o={},p=[{value:"Compile",id:"compile",level:2},{value:"Usage",id:"usage",level:2},{value:"Build process",id:"build-process",level:3},{value:"Example",id:"example",level:3},{value:"Tests",id:"tests",level:3},{value:"Note",id:"note",level:4},{value:"Other information",id:"other-information",level:3}],u={toc:p},m="wrapper";function c(e){let{components:n,...t}=e;return(0,a.yg)(m,(0,r.A)({},u,t,{components:n,mdxType:"MDXLayout"}),(0,a.yg)("h1",{id:"parser"},"Parser"),(0,a.yg)("p",null,"The parser is made using ",(0,a.yg)("a",{parentName:"p",href:"http://www.gnu.org/software/bison/"},"Bison")," and ",(0,a.yg)("a",{parentName:"p",href:"http://flex.sourceforge.net/"},"Flex"),"."),(0,a.yg)("p",null,"The parser is used to parse the commands entered by the user, stored in structure ",(0,a.yg)("inlineCode",{parentName:"p"},"command_t"),"."),(0,a.yg)("p",null,"This structure is defined in the file ",(0,a.yg)("inlineCode",{parentName:"p"},"parser.h")," and encapsulates a tree representation of the command."),(0,a.yg)("p",null,"You can use ",(0,a.yg)("inlineCode",{parentName:"p"},"DisplayStructure.cpp")," to display the structure using various ",(0,a.yg)("a",{parentName:"p",href:"#tests"},"tests"),"."),(0,a.yg)("p",null,"Also you can use ",(0,a.yg)("inlineCode",{parentName:"p"},"CUseParser.c")," or ",(0,a.yg)("inlineCode",{parentName:"p"},"UseParser.cpp")," to see how to use the parser in C or C++ and print the structure of the command."),(0,a.yg)("h2",{id:"compile"},"Compile"),(0,a.yg)("p",null,"Run the following commands in the root of parser directory:"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-console"},"student@os:/.../minishell/util/parser$ make\n")),(0,a.yg)("h2",{id:"usage"},"Usage"),(0,a.yg)("p",null,"The parser is represented by two files:"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("inlineCode",{parentName:"li"},"parser.y")," - implementation of the parser"),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("inlineCode",{parentName:"li"},"parser.l")," - implementation of the lexer")),(0,a.yg)("h3",{id:"build-process"},"Build process"),(0,a.yg)("p",null,"The Makefile first generates the files ",(0,a.yg)("inlineCode",{parentName:"p"},"parser.yy.c")," and ",(0,a.yg)("inlineCode",{parentName:"p"},"parser.tab.c")," from ",(0,a.yg)("inlineCode",{parentName:"p"},"parser.y")," and ",(0,a.yg)("inlineCode",{parentName:"p"},"parser.l"),".\nAfter that, it compiles the files ",(0,a.yg)("inlineCode",{parentName:"p"},"parser.yy.c")," and ",(0,a.yg)("inlineCode",{parentName:"p"},"parser.tab.c")," to generate the object files ",(0,a.yg)("inlineCode",{parentName:"p"},"parser.yy.o")," and ",(0,a.yg)("inlineCode",{parentName:"p"},"parser.tab.o"),".\nTo use the parser, you need to link the object files ",(0,a.yg)("inlineCode",{parentName:"p"},"parser.yy.o")," and ",(0,a.yg)("inlineCode",{parentName:"p"},"parser.tab.o")," with your program."),(0,a.yg)("h3",{id:"example"},"Example"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("inlineCode",{parentName:"li"},"CUseParser.c")," - example of using the parser in C"),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("inlineCode",{parentName:"li"},"UseParser.cpp")," - example of using the parser in C++"),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("inlineCode",{parentName:"li"},"DisplayStructure.cpp")," - reads multiple commands and displays the structure of the resulting tree")),(0,a.yg)("h3",{id:"tests"},"Tests"),(0,a.yg)("p",null,"More tests can be found in the ",(0,a.yg)("inlineCode",{parentName:"p"},"tests")," directory:"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-console"},"student@os:/.../minishell/util/parser$ cd tests\n\nstudent@os:/.../minishell/util/parser/tests$ ../DisplayStructure &>small_tests.out <small_tests.txt\n\nstudent@os:/.../minishell/util/parser/tests$ cat small_tests.out\n> mkdir tmp\nCommand successfully read!\ncommand_t (\n    scmd (\n        simple_command_t (\n            verb (\n                'mkdir'\n            )\n            params (\n                'tmp'\n            )\n        )\n    )\n)\n\n> cd tmp\nCommand successfully read!\ncommand_t (\n    scmd (\n\n...\nstudent@os:/.../minishell/util/parser/tests$ ../DisplayStructure &>ugly_tests.out <ugly_tests.txt\n\nstudent@os:/.../minishell/util/parser/tests$ ../DisplayStructure &>negative_tests.out <negative_tests.txt\n")),(0,a.yg)("h4",{id:"note"},"Note"),(0,a.yg)("p",null,"The parser will fail with an error of unknown character if you use the Linux parser (which considers the end of line as ",(0,a.yg)("inlineCode",{parentName:"p"},"\\n"),") on Windows files (end of line as ",(0,a.yg)("inlineCode",{parentName:"p"},"\\r\\n"),") because at the end of the lines (returned by ",(0,a.yg)("inlineCode",{parentName:"p"},"getline()"),") there will be a ",(0,a.yg)("inlineCode",{parentName:"p"},"\\r")," followed by ",(0,a.yg)("inlineCode",{parentName:"p"},"\\n"),".\nThe opposite works (Windows parser with Linux files).\nThe test files use the Linux convention (",(0,a.yg)("inlineCode",{parentName:"p"},"\\n"),")."),(0,a.yg)("h3",{id:"other-information"},"Other information"),(0,a.yg)("p",null,"More information about the parser can be found in the file ",(0,a.yg)("inlineCode",{parentName:"p"},"parser.h"),"."))}c.isMDXComponent=!0}}]);