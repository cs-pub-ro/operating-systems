"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[4789],{5680:(e,t,n)=>{n.d(t,{xA:()=>c,yg:()=>u});var s=n(6540);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);t&&(s=s.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,s)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,s,a=function(e,t){if(null==e)return{};var n,s,a={},i=Object.keys(e);for(s=0;s<i.length;s++)n=i[s],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(s=0;s<i.length;s++)n=i[s],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var o=s.createContext({}),p=function(e){var t=s.useContext(o),n=t;return e&&(n="function"==typeof e?e(t):r(r({},t),e)),n},c=function(e){var t=p(e.components);return s.createElement(o.Provider,{value:t},e.children)},m="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return s.createElement(s.Fragment,{},t)}},g=s.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,o=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),m=p(n),g=a,u=m["".concat(o,".").concat(g)]||m[g]||d[g]||i;return n?s.createElement(u,r(r({ref:t},c),{},{components:n})):s.createElement(u,r({ref:t},c))}));function u(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,r=new Array(i);r[0]=g;var l={};for(var o in t)hasOwnProperty.call(t,o)&&(l[o]=t[o]);l.originalType=e,l[m]="string"==typeof e?e:a,r[1]=l;for(var p=2;p<i;p++)r[p]=n[p];return s.createElement.apply(null,r)}return s.createElement.apply(null,n)}g.displayName="MDXCreateElement"},8131:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>o,contentTitle:()=>r,default:()=>d,frontMatter:()=>i,metadata:()=>l,toc:()=>p});var s=n(8168),a=(n(6540),n(5680));const i={},r="Asynchronous Web Server",l={unversionedId:"Assignments/Asynchronous Web Server/README",id:"Assignments/Asynchronous Web Server/README",title:"Asynchronous Web Server",description:"Objectives",source:"@site/docs/Assignments/Asynchronous Web Server/README.md",sourceDirName:"Assignments/Asynchronous Web Server",slug:"/Assignments/Asynchronous Web Server/",permalink:"/operating-systems/112/Assignments/Asynchronous Web Server/",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"Minishell",permalink:"/operating-systems/112/Assignments/Mini Shell/"},next:{title:"Exams",permalink:"/operating-systems/112/Exams/"}},o={},p=[{value:"Objectives",id:"objectives",level:2},{value:"Statement",id:"statement",level:2},{value:"Details and recommendations for the implementation",id:"details-and-recommendations-for-the-implementation",level:3},{value:"Support Code",id:"support-code",level:2},{value:"HTTP Parser",id:"http-parser",level:3},{value:"API and Implementation Tasks",id:"api-and-implementation-tasks",level:3},{value:"Testing and Grading",id:"testing-and-grading",level:2},{value:"Behind the Scenes",id:"behind-the-scenes",level:3},{value:"Debugging",id:"debugging",level:3},{value:"Resources",id:"resources",level:2}],c={toc:p},m="wrapper";function d(e){let{components:t,...n}=e;return(0,a.yg)(m,(0,s.A)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,a.yg)("h1",{id:"asynchronous-web-server"},"Asynchronous Web Server"),(0,a.yg)("h2",{id:"objectives"},"Objectives"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"Deepening the concepts related to working with sockets."),(0,a.yg)("li",{parentName:"ul"},"Developing skills in implementing and designing applications that use asynchronous operations and other advanced I/O operations."),(0,a.yg)("li",{parentName:"ul"},"Deepening the use of the API for advanced I/O operations in the Linux operating system.")),(0,a.yg)("h2",{id:"statement"},"Statement"),(0,a.yg)("p",null,"Implement a web server that uses the following advanced I/O operations:"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"Asynchronous operations on files"),(0,a.yg)("li",{parentName:"ul"},"Non-blocking operations on sockets"),(0,a.yg)("li",{parentName:"ul"},"Zero-copying"),(0,a.yg)("li",{parentName:"ul"},"Multiplexing I/O operations")),(0,a.yg)("p",null,"The server implements a limited functionality of the HTTP protocol: passing files to clients."),(0,a.yg)("p",null,"The web server will use the multiplexing API to wait for connections from clients - ",(0,a.yg)("a",{parentName:"p",href:"https://man7.org/linux/man-pages/man7/epoll.7.html"},"epoll"),".\nOn the established connections, requests from clients will be received and then responses will be distributed to them."),(0,a.yg)("p",null,"The server will serve files from the ",(0,a.yg)("inlineCode",{parentName:"p"},"AWS_DOCUMENT_ROOT")," directory, defined within the assignments' ",(0,a.yg)("a",{parentName:"p",href:"skel/aws.h"},"header"),".\nFiles are only found in subdirectories ",(0,a.yg)("inlineCode",{parentName:"p"},"AWS_DOCUMENT_ROOT/static/")," and ",(0,a.yg)("inlineCode",{parentName:"p"},"AWS_DOCUMENT_ROOT/dynamic/"),".\nThe corresponding request paths will be, for example, ",(0,a.yg)("inlineCode",{parentName:"p"},"AWS_DOCUMENT_ROOT/static/test.dat")," and ",(0,a.yg)("inlineCode",{parentName:"p"},"AWS_DOCUMENT_ROOT/dynamic/test.dat"),".\nThe file processing will be:"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"The files in the ",(0,a.yg)("inlineCode",{parentName:"li"},"AWS_DOCUMENT_ROOT/static/")," directory are static files that will be transmitted to clients using the zero-copying API - ",(0,a.yg)("a",{parentName:"li",href:"https://man7.org/linux/man-pages/man2/sendfile.2.html"},"sendfile"),"]"),(0,a.yg)("li",{parentName:"ul"},"Files in the ",(0,a.yg)("inlineCode",{parentName:"li"},"AWS_DOCUMENT_ROOT/dynamic/")," directory are files that are supposed to require a server-side post-processing phase. These files will be read from disk using the asynchronous API and then pushed to the clients. Streaming will use non-blocking sockets (Linux)"),(0,a.yg)("li",{parentName:"ul"},"An ",(0,a.yg)("a",{parentName:"li",href:"https://en.wikipedia.org/wiki/HTTP_404"},"HTTP 404")," message will be sent for invalid request paths")),(0,a.yg)("p",null,"After transmitting a file, according to the HTTP protocol, the connection is closed."),(0,a.yg)("h3",{id:"details-and-recommendations-for-the-implementation"},"Details and recommendations for the implementation"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"Implementing the assignment requires having a state machine for each connection, which you periodically query and update as the transfer proceeds.\nCheck the ",(0,a.yg)("inlineCode",{parentName:"li"},"connection_state")," data structure defined in the ",(0,a.yg)("a",{parentName:"li",href:"skel/awh.h"},"assignment header"),"."),(0,a.yg)("li",{parentName:"ul"},"Find the ",(0,a.yg)("inlineCode",{parentName:"li"},"connection")," data structure defined in the ",(0,a.yg)("a",{parentName:"li",href:"skel/awh.h"},"assignment header"),".\nThis can be used to keep track of an open connection."),(0,a.yg)("li",{parentName:"ul"},"Definitions of other useful macros and data structures can be found in the assignment header."),(0,a.yg)("li",{parentName:"ul"},"HTTP responses will have the code ",(0,a.yg)("inlineCode",{parentName:"li"},"200")," for existing files and ",(0,a.yg)("inlineCode",{parentName:"li"},"404")," for not existing files.",(0,a.yg)("ul",{parentName:"li"},(0,a.yg)("li",{parentName:"ul"},"A valid response consists of the HTTP header, containing the related directives, two newlines (",(0,a.yg)("inlineCode",{parentName:"li"},"\\r\\n\\r\\n"),"), followed by the actual content (the file)."),(0,a.yg)("li",{parentName:"ul"},"Sample answers can be found in the parser test file or in the provided sample."),(0,a.yg)("li",{parentName:"ul"},"You can use predefined request directives such as ",(0,a.yg)("inlineCode",{parentName:"li"},"Date"),", ",(0,a.yg)("inlineCode",{parentName:"li"},"Last-Modified"),", etc.",(0,a.yg)("ul",{parentName:"li"},(0,a.yg)("li",{parentName:"ul"},"The ",(0,a.yg)("inlineCode",{parentName:"li"},"Content-Length")," directive ",(0,a.yg)("strong",{parentName:"li"},"must")," specify the size of the HTTP content (actual data) in bytes."),(0,a.yg)("li",{parentName:"ul"},"The ",(0,a.yg)("inlineCode",{parentName:"li"},"Connection")," directive ",(0,a.yg)("strong",{parentName:"li"},"must")," be initialized to ",(0,a.yg)("inlineCode",{parentName:"li"},"close"),"."))))),(0,a.yg)("li",{parentName:"ul"},"The port on which the web server listens for connections is defined within the assignment header: the ",(0,a.yg)("inlineCode",{parentName:"li"},"AWS_LISTEN_PORT")," macro."),(0,a.yg)("li",{parentName:"ul"},"The root directory relative to which the resources/files are searched is defined within the assignment header as the ",(0,a.yg)("inlineCode",{parentName:"li"},"AWS_DOCUMENT_ROOT")," macro.")),(0,a.yg)("h2",{id:"support-code"},"Support Code"),(0,a.yg)("h3",{id:"http-parser"},"HTTP Parser"),(0,a.yg)("p",null,"The clients and server will communicate using the HTTP protocol.\nFor parsing HTTP requests from clients we recommend using ",(0,a.yg)("a",{parentName:"p",href:"https://github.com/nodejs/http-parser"},"this HTTP parser"),", also available in the assignments' ",(0,a.yg)("a",{parentName:"p",href:"skel/http-parser"},"http-parser"),".\nYou will need to use a callback to get the path to the local resource requested by the client.\nFind a simplified example of using the parser in the ",(0,a.yg)("a",{parentName:"p",href:"skel/http-parser/samples/"},"samples directory"),"."),(0,a.yg)("h3",{id:"api-and-implementation-tasks"},"API and Implementation Tasks"),(0,a.yg)("p",null,"The ",(0,a.yg)("a",{parentName:"p",href:"skel/aws.c"},"skel/aws.c")," file contains the code skelethon with several functions that have to be implemented.\nFollow the ",(0,a.yg)("inlineCode",{parentName:"p"},"TODO")," areas in the file to start your implementation."),(0,a.yg)("blockquote",null,(0,a.yg)("p",{parentName:"blockquote"},"It can be reorganized as desired, as long as all the requirements of the assignment are implemented.")),(0,a.yg)("h2",{id:"testing-and-grading"},"Testing and Grading"),(0,a.yg)("p",null,"The testing is automated.\nTests are located in the ",(0,a.yg)("inlineCode",{parentName:"p"},"tests/")," directory."),(0,a.yg)("p",null,"To test your implementation, do the following steps:"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"Run the ",(0,a.yg)("inlineCode",{parentName:"li"},"make")," command inside the ",(0,a.yg)("inlineCode",{parentName:"li"},"skel/")," directory and make sure it compiles with no errors and that the ",(0,a.yg)("inlineCode",{parentName:"li"},"aws")," executable is generated."),(0,a.yg)("li",{parentName:"ul"},"Run the ",(0,a.yg)("inlineCode",{parentName:"li"},"make check")," command in the ",(0,a.yg)("inlineCode",{parentName:"li"},"tests/")," directory.")),(0,a.yg)("p",null,"There are 35 tests for this assignment, of which 13 are doubled by a memory leak check test.\nA successful run looks as the following:"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre"},"student@so:~/operating-systems/content/assignments/async-web-server/tests$ make check\nmake -C _test\nmake[1]: Entering directory '/home/student/operating-systems/content/assignments/async-web-server/tests/_test'\nmake[1]: Nothing to be done for 'all'.\nmake[1]: Leaving directory '/home/student/operating-systems/content/assignments/async-web-server/tests/_test'\n\n                        = Testing - Asynchronous Web Server =\n\n01) Test executable exists.............................................passed  [01/90]\n02) Test executable runs...............................................passed  [01/90]\n03) Test listening.....................................................passed  [01/90]\n04) Test listening on port.............................................passed  [01/90]\n05) Test accepts connections...........................................passed  [01/90]\n06) Test accepts multiple connections..................................passed  [01/90]\n07) Test epoll usage...................................................passed  [01/90]\n08) Test disconnect....................................................passed  [01/90]\n09) Test multiple disconnect...........................................passed  [01/90]\n10) Test connect disconnect connect....................................passed  [01/90]\n11) Test multiple connect disconnect connect...........................passed  [01/90]\n12) Test unordered connect disconnect connect..........................passed  [01/90]\n13) Test replies http request..........................................passed  [02/90]\n13) Test replies http request - memcheck...............................passed  [01/90]\n14) Test second replies http request...................................passed  [01/90]\n15) Test sendfile usage................................................passed  [02/90]\n16) Test small static file wget........................................passed  [02/90]\n17) Test small static file wget cmp....................................passed  [04/90]\n17) Test small static file wget cmp - memcheck.........................passed  [01/90]\n18) Test large static file wget........................................passed  [02/90]\n19) Test large static file wget cmp....................................passed  [04/90]\n19) Test large static file wget cmp - memcheck.........................passed  [01/90]\n20) Test bad static file 404...........................................passed  [02/90]\n21) Test bad path 404..................................................passed  [02/90]\n22) Test get one static file then another..............................passed  [02/90]\n22) Test get one static file then another - memcheck...................passed  [01/90]\n23) Test get two simultaneous static files.............................passed  [03/90]\n23) Test get two simultaneous static files - memcheck..................passed  [01/90]\n24) Test get multiple simultaneous static files........................passed  [04/90]\n24) Test get multiple simultaneous static files - memcheck.............passed  [01/90]\n25) Test io submit uses................................................passed  [02/90]\n26) Test small dynamic file wget.......................................passed  [02/90]\n27) Test small dynamic file wget cmp...................................passed  [04/90]\n27) Test small dynamic file wget cmp - memcheck........................passed  [01/90]\n28) Test large dynamic file wget.......................................passed  [02/90]\n29) Test large dynamic file wget cmp...................................passed  [04/90]\n29) Test large dynamic file wget cmp - memcheck........................passed  [01/90]\n30) Test bad dynamic file 404..........................................passed  [02/90]\n31) Test get one dynamic file then another.............................passed  [03/90]\n31) Test get one dynamic file then another - memcheck..................passed  [01/90]\n32) Test get two simultaneous dynamic files............................passed  [04/90]\n32) Test get two simultaneous dynamic files - memcheck.................passed  [01/90]\n33) Test get multiple simultaneous dynamic files.......................passed  [05/90]\n33) Test get multiple simultaneous dynamic files - memcheck............passed  [01/90]\n34) Test get two simultaneous static and dynamic files.................passed  [03/90]\n34) Test get two simultaneous static and dynamic files - memcheck......passed  [01/90]\n35) Test get multiple simultaneous static and dynamic files............passed  [04/90]\n35) Test get multiple simultaneous static and dynamic files - memcheck.passed  [01/90]\n\n                                                                       Total:  [90/100]\n")),(0,a.yg)("p",null,"Individual tests can be run using the ",(0,a.yg)("inlineCode",{parentName:"p"},"./run_test.sh")," bash script as the following:"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre"},"student@so:~/operating-systems/content/assignments/async-web-server/tests$ ./_test/run_test.sh 3\n03) Test listening.....................................................passed  [01/90]\n\n")),(0,a.yg)("p",null,"Where ",(0,a.yg)("inlineCode",{parentName:"p"},"3")," is the test you want to run."),(0,a.yg)("p",null,"Some tests are doubled by a memory check test.\nThis will only run if the regular test passed.\nFor example, test 31 will output the following in case of success:"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre"},"student@so:~/operating-systems/content/assignments/async-web-server/tests$ ./_test/run_test.sh 31\n31) Test get one dynamic file then another.............................passed  [03/90]\n31) Test get one dynamic file then another - memcheck..................passed  [01/90]\n")),(0,a.yg)("p",null,"and one of the following in case of error:"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre"},"# if the regular tests failed, the memory check tests is not performed\nstudent@so:~/operating-systems/content/assignments/async-web-server/tests$ ./_test/run_test.sh 31\n31) Test get one dynamic file then another.............................failed  [ 0/90]\n31) Test get one dynamic file then another - memcheck..................passed  [01/90]\n")),(0,a.yg)("blockquote",null,(0,a.yg)("p",{parentName:"blockquote"},"Note: The memcheck test for failed regular tests will not be taken into consideration for the final score.\nThis output will be fixed in the next commit.")),(0,a.yg)("p",null,"Tests use the ",(0,a.yg)("inlineCode",{parentName:"p"},"static/")," and ",(0,a.yg)("inlineCode",{parentName:"p"},"dynamic/")," folders.\nThese folders are created and removed using the ",(0,a.yg)("inlineCode",{parentName:"p"},"init")," and ",(0,a.yg)("inlineCode",{parentName:"p"},"cleanup")," arguments to ",(0,a.yg)("inlineCode",{parentName:"p"},"_test/run_test.sh"),"."),(0,a.yg)("h3",{id:"behind-the-scenes"},"Behind the Scenes"),(0,a.yg)("p",null,"Tests are basically unit tests."),(0,a.yg)("p",null,"Each test function follows the unit test patter: initialization, action,\nevaluation."),(0,a.yg)("p",null,"Each test starts the server, creates a given context, checks for validity and\nthen terminates the server process."),(0,a.yg)("h3",{id:"debugging"},"Debugging"),(0,a.yg)("p",null,"Logs are collected in ",(0,a.yg)("inlineCode",{parentName:"p"},"test.log")," and ",(0,a.yg)("inlineCode",{parentName:"p"},"wget.log")," files."),(0,a.yg)("h2",{id:"resources"},"Resources"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},(0,a.yg)("a",{parentName:"p",href:"https://man7.org/linux/man-pages/man2/sendfile.2.html"},"sendfile"))),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},(0,a.yg)("a",{parentName:"p",href:"https://man7.org/linux/man-pages/man2/io_setup.2.html"},"io_setup & friends"))),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},(0,a.yg)("a",{parentName:"p",href:"https://man7.org/linux/man-pages/man7/epoll.7.html"},"epoll")))))}d.isMDXComponent=!0}}]);