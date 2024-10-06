"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[728],{5680:(e,t,n)=>{n.d(t,{xA:()=>c,yg:()=>g});var a=n(6540);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var i=a.createContext({}),p=function(e){var t=a.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},c=function(e){var t=p(e.components);return a.createElement(i.Provider,{value:t},e.children)},d="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},h=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,i=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),d=p(n),h=r,g=d["".concat(i,".").concat(h)]||d[h]||u[h]||o;return n?a.createElement(g,s(s({ref:t},c),{},{components:n})):a.createElement(g,s({ref:t},c))}));function g(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,s=new Array(o);s[0]=h;var l={};for(var i in t)hasOwnProperty.call(t,i)&&(l[i]=t[i]);l.originalType=e,l[d]="string"==typeof e?e:r,s[1]=l;for(var p=2;p<o;p++)s[p]=n[p];return a.createElement.apply(null,s)}return a.createElement.apply(null,n)}h.displayName="MDXCreateElement"},7377:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>i,contentTitle:()=>s,default:()=>u,frontMatter:()=>o,metadata:()=>l,toc:()=>p});var a=n(8168),r=(n(6540),n(5680));const o={},s="HTTP Parser",l={unversionedId:"Assignments/Asynchronous Web Server/src/http-parser/README",id:"Assignments/Asynchronous Web Server/src/http-parser/README",title:"HTTP Parser",description:"This is a parser for HTTP messages written in C. It parses both requests and",source:"@site/docs/Assignments/Asynchronous Web Server/src/http-parser/README.md",sourceDirName:"Assignments/Asynchronous Web Server/src/http-parser",slug:"/Assignments/Asynchronous Web Server/src/http-parser/",permalink:"/operating-systems/78/Assignments/Asynchronous Web Server/src/http-parser/",draft:!1,tags:[],version:"current",frontMatter:{}},i={},p=[{value:"Usage",id:"usage",level:2},{value:"The Special Problem of Upgrade",id:"the-special-problem-of-upgrade",level:2},{value:"Callbacks",id:"callbacks",level:2}],c={toc:p},d="wrapper";function u(e){let{components:t,...n}=e;return(0,r.yg)(d,(0,a.A)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,r.yg)("h1",{id:"http-parser"},"HTTP Parser"),(0,r.yg)("p",null,"This is a parser for HTTP messages written in C. It parses both requests and\nresponses. The parser is designed to be used in performance HTTP\napplications. It does not make any syscalls nor allocations, it does not\nbuffer data, it can be interrupted at anytime. Depending on your\narchitecture, it only requires about 40 bytes of data per message\nstream (in a web server that is per connection)."),(0,r.yg)("p",null,"Features:"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"No dependencies"),(0,r.yg)("li",{parentName:"ul"},"Handles persistent streams (keep-alive)."),(0,r.yg)("li",{parentName:"ul"},"Decodes chunked encoding."),(0,r.yg)("li",{parentName:"ul"},"Upgrade support"),(0,r.yg)("li",{parentName:"ul"},"Defends against buffer overflow attacks.")),(0,r.yg)("p",null,"The parser extracts the following information from HTTP messages:"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"Header fields and values"),(0,r.yg)("li",{parentName:"ul"},"Content-Length"),(0,r.yg)("li",{parentName:"ul"},"Request method"),(0,r.yg)("li",{parentName:"ul"},"Response status code"),(0,r.yg)("li",{parentName:"ul"},"Transfer-Encoding"),(0,r.yg)("li",{parentName:"ul"},"HTTP version"),(0,r.yg)("li",{parentName:"ul"},"Request path, query string, fragment"),(0,r.yg)("li",{parentName:"ul"},"Message body")),(0,r.yg)("h2",{id:"usage"},"Usage"),(0,r.yg)("p",null,"One ",(0,r.yg)("inlineCode",{parentName:"p"},"http_parser")," object is used per TCP connection. Initialize the struct\nusing ",(0,r.yg)("inlineCode",{parentName:"p"},"http_parser_init()")," and set the callbacks. That might look something\nlike this for a request parser:"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre"},"http_parser_settings settings;\nsettings.on_path = my_path_callback;\nsettings.on_header_field = my_header_field_callback;\n/* ... */\n\nhttp_parser *parser = malloc(sizeof(http_parser));\nhttp_parser_init(parser, HTTP_REQUEST);\nparser->data = my_socket;\n")),(0,r.yg)("p",null,"When data is received on the socket execute the parser and check for errors."),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre"},"size_t len = 80*1024, nparsed;\nchar buf[len];\nssize_t recved;\n\nrecved = recv(fd, buf, len, 0);\n\nif (recved < 0) {\n  /* Handle error. */\n}\n\n/* Start up / continue the parser.\n * Note we pass recved==0 to signal that EOF has been recieved.\n */\nnparsed = http_parser_execute(parser, &settings, buf, recved);\n\nif (parser->upgrade) {\n  /* handle new protocol */\n} else if (nparsed != recved) {\n  /* Handle error. Usually just close the connection. */\n}\n")),(0,r.yg)("p",null,"HTTP needs to know where the end of the stream is. For example, sometimes\nservers send responses without Content-Length and expect the client to\nconsume input (for the body) until EOF. To tell http_parser about EOF, give\n",(0,r.yg)("inlineCode",{parentName:"p"},"0")," as the forth parameter to ",(0,r.yg)("inlineCode",{parentName:"p"},"http_parser_execute()"),". Callbacks and errors\ncan still be encountered during an EOF, so one must still be prepared\nto receive them."),(0,r.yg)("p",null,"Scalar valued message information such as ",(0,r.yg)("inlineCode",{parentName:"p"},"status_code"),", ",(0,r.yg)("inlineCode",{parentName:"p"},"method"),", and the\nHTTP version are stored in the parser structure. This data is only\ntemporally stored in ",(0,r.yg)("inlineCode",{parentName:"p"},"http_parser")," and gets reset on each new message. If\nthis information is needed later, copy it out of the structure during the\n",(0,r.yg)("inlineCode",{parentName:"p"},"headers_complete")," callback."),(0,r.yg)("p",null,"The parser decodes the transfer-encoding for both requests and responses\ntransparently. That is, a chunked encoding is decoded before being sent to\nthe on_body callback."),(0,r.yg)("h2",{id:"the-special-problem-of-upgrade"},"The Special Problem of Upgrade"),(0,r.yg)("p",null,"HTTP supports upgrading the connection to a different protocol. An\nincreasingly common example of this is the Web Socket protocol which sends\na request like"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre"},"    GET /demo HTTP/1.1\n    Upgrade: WebSocket\n    Connection: Upgrade\n    Host: example.com\n    Origin: http://example.com\n    WebSocket-Protocol: sample\n")),(0,r.yg)("p",null,"followed by non-HTTP data."),(0,r.yg)("p",null,"(See ",(0,r.yg)("a",{parentName:"p",href:"http://tools.ietf.org/html/draft-hixie-thewebsocketprotocol-75"},"http://tools.ietf.org/html/draft-hixie-thewebsocketprotocol-75")," for more\ninformation the Web Socket protocol.)"),(0,r.yg)("p",null,"To support this, the parser will treat this as a normal HTTP message without a\nbody. Issuing both on_headers_complete and on_message_complete callbacks. However\nhttp_parser_execute() will stop parsing at the end of the headers and return."),(0,r.yg)("p",null,"The user is expected to check if ",(0,r.yg)("inlineCode",{parentName:"p"},"parser->upgrade")," has been set to 1 after\n",(0,r.yg)("inlineCode",{parentName:"p"},"http_parser_execute()")," returns. Non-HTTP data begins at the buffer supplied\noffset by the return value of ",(0,r.yg)("inlineCode",{parentName:"p"},"http_parser_execute()"),"."),(0,r.yg)("h2",{id:"callbacks"},"Callbacks"),(0,r.yg)("p",null,"During the ",(0,r.yg)("inlineCode",{parentName:"p"},"http_parser_execute()")," call, the callbacks set in\n",(0,r.yg)("inlineCode",{parentName:"p"},"http_parser_settings")," will be executed. The parser maintains state and\nnever looks behind, so buffering the data is not necessary. If you need to\nsave certain data for later usage, you can do that from the callbacks."),(0,r.yg)("p",null,"There are two types of callbacks:"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"notification ",(0,r.yg)("inlineCode",{parentName:"li"},"typedef int (*http_cb) (http_parser*);"),"\nCallbacks: on_message_begin, on_headers_complete, on_message_complete."),(0,r.yg)("li",{parentName:"ul"},"data ",(0,r.yg)("inlineCode",{parentName:"li"},"typedef int (*http_data_cb) (http_parser*, const char *at, size_t length);"),"\nCallbacks: (requests only) on_path, on_query_string, on_uri, on_fragment,\n(common) on_header_field, on_header_value, on_body;")),(0,r.yg)("p",null,"Callbacks must return 0 on success. Returning a non-zero value indicates\nerror to the parser, making it exit immediately."),(0,r.yg)("p",null,"In case you parse HTTP message in chunks (i.e. ",(0,r.yg)("inlineCode",{parentName:"p"},"read()")," request line\nfrom socket, parse, read half headers, parse, etc) your data callbacks\nmay be called more than once. Http-parser guarantees that data pointer is only\nvalid for the lifetime of callback. You can also ",(0,r.yg)("inlineCode",{parentName:"p"},"read()")," into a heap allocated\nbuffer to avoid copying memory around if this fits your application."),(0,r.yg)("p",null,"Reading headers may be a tricky task if you read/parse headers partially.\nBasically, you need to remember whether last header callback was field or value\nand apply following logic:"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre"},"(on_header_field and on_header_value shortened to on_h_*)\n ------------------------ ------------ --------------------------------------------\n| State (prev. callback) | Callback   | Description/action                         |\n ------------------------ ------------ --------------------------------------------\n| nothing (first call)   | on_h_field | Allocate new buffer and copy callback data |\n|                        |            | into it                                    |\n ------------------------ ------------ --------------------------------------------\n| value                  | on_h_field | New header started.                        |\n|                        |            | Copy current name,value buffers to headers |\n|                        |            | list and allocate new buffer for new name  |\n ------------------------ ------------ --------------------------------------------\n| field                  | on_h_field | Previous name continues. Reallocate name   |\n|                        |            | buffer and append callback data to it      |\n ------------------------ ------------ --------------------------------------------\n| field                  | on_h_value | Value for current header started. Allocate |\n|                        |            | new buffer and copy callback data to it    |\n ------------------------ ------------ --------------------------------------------\n| value                  | on_h_value | Value continues. Reallocate value buffer   |\n|                        |            | and append callback data to it             |\n ------------------------ ------------ --------------------------------------------\n")),(0,r.yg)("p",null,"See examples of reading in headers:"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("a",{parentName:"li",href:"http://gist.github.com/155877"},"partial example")," in C"),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("a",{parentName:"li",href:"http://github.com/ry/http-parser/blob/37a0ff8928fb0d83cec0d0d8909c5a4abcd221af/test.c#L403"},"from http-parser tests")," in C"),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("a",{parentName:"li",href:"http://github.com/ry/node/blob/842eaf446d2fdcb33b296c67c911c32a0dabc747/src/http.js#L284"},"from Node library")," in Javascript")))}u.isMDXComponent=!0}}]);