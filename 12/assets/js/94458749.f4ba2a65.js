"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[4907],{260:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>s,default:()=>u,frontMatter:()=>a,metadata:()=>i,toc:()=>p});var r=n(8168),o=(n(6540),n(5680));const a={},s="Networking 101",i={unversionedId:"Lab/IO/networking-101",id:"Lab/IO/networking-101",title:"Networking 101",description:"In this section, we will briefly explore how networking works in general, from the perspective of the application.",source:"@site/docs/Lab/IO/networking-101.md",sourceDirName:"Lab/IO",slug:"/Lab/IO/networking-101",permalink:"/operating-systems/12/Lab/IO/networking-101",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"Remote I/O",permalink:"/operating-systems/12/Lab/IO/remote-io"},next:{title:"Client-Server Model",permalink:"/operating-systems/12/Lab/IO/client-server-model"}},l={},p=[{value:"UDP",id:"udp",level:2},{value:"TCP",id:"tcp",level:2},{value:"Practice: Encapsulation Example: Deluge Revived",id:"practice-encapsulation-example-deluge-revived",level:3},{value:"Local TCP and UDP Services",id:"local-tcp-and-udp-services",level:2},{value:"Practice: Run <code>netstat</code> Yourself",id:"practice-run-netstat-yourself",level:3},{value:"Conclusion",id:"conclusion",level:3}],c={toc:p},d="wrapper";function u(e){let{components:t,...a}=e;return(0,o.yg)(d,(0,r.A)({},c,a,{components:t,mdxType:"MDXLayout"}),(0,o.yg)("h1",{id:"networking-101"},"Networking 101"),(0,o.yg)("p",null,"In this section, we will ",(0,o.yg)("strong",{parentName:"p"},"briefly")," explore how networking works in general, from the perspective of the application.\nUnderstanding the details of it, however, is beyond the scope of this course."),(0,o.yg)("p",null,"The main ",(0,o.yg)("strong",{parentName:"p"},"protocols")," used by applications are ",(0,o.yg)("strong",{parentName:"p"},"User Datagram Protocol (UDP)")," and ",(0,o.yg)("strong",{parentName:"p"},"Transmission Control Protocol (TCP)"),".\nWe can specify this protocol when creating a socket."),(0,o.yg)("h2",{id:"udp"},"UDP"),(0,o.yg)("p",null,"UDP is the simpler of the two protocols above.\nIt simply states that the sender should pass the data over to the receiver specified by an IP and a port.\nThe scripts in ",(0,o.yg)("inlineCode",{parentName:"p"},"support/send-receive/")," both used UDP.\nYou can tell by the fact they both created their sockets like so:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-Python"},"sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)\n")),(0,o.yg)("p",null,"The ",(0,o.yg)("inlineCode",{parentName:"p"},"socket.SOCK_DGRAM"),' argument stands for "datagram" and specifies UDP.'),(0,o.yg)("p",null,"It doesn't care whether the receiver has got all the data, whether it was corrupted or dropped altogether by some router along the way."),(0,o.yg)("p",null,"To prove this, rerun ",(0,o.yg)("inlineCode",{parentName:"p"},"support/send-receive/receiver.py"),", then run ",(0,o.yg)("inlineCode",{parentName:"p"},"support/send-receive/sender.py"),", type ",(0,o.yg)("inlineCode",{parentName:"p"},'"exit"')," and then run ",(0,o.yg)("inlineCode",{parentName:"p"},"sender.py")," again.\nYou'll see no error from the sender because whether the message reaches its destination or not is not important for UDP."),(0,o.yg)("p",null,"So far UDP might seem rather useless.\nIt doesn't confirm whether a message was received correctly or not, so why use it?\nWell, exactly because its mechanism is so simple, UDP is ",(0,o.yg)("strong",{parentName:"p"},"fast"),".\nTherefore, it is used by many ",(0,o.yg)("strong",{parentName:"p"},"real-time services"),", such as for streaming or video calls where if a frame drops or is incorrect, it doesn't really matter that much since it will immediately be replaced with the next frame, thus masking the error."),(0,o.yg)("h2",{id:"tcp"},"TCP"),(0,o.yg)("p",null,"TCP is the polar opposite of UDP.\nTCP makes sure the data is given to the application correctly by performing error checks on the receiving end and then retransmitting any incorrect or missing messages.\nFor this reason, TCP is good for applications that require precise data, such as banking applications, static images or text.\nThe cost of correctness, however, is transmission speed."),(0,o.yg)("h3",{id:"practice-encapsulation-example-deluge-revived"},"Practice: Encapsulation Example: Deluge Revived"),(0,o.yg)("p",null,(0,o.yg)("a",{parentName:"p",href:"/operating-systems/12/Lab/IO/quiz/deluge-tcp-udp"},"Quiz")),(0,o.yg)("p",null,"You haven't forgotten about our favourite Bittorrent clint, ",(0,o.yg)("a",{parentName:"p",href:"https://deluge-torrent.org/"},"Deluge"),", have you?\nIt implements its own protocol for transferring data.\nIt is built on top of TCP using the ",(0,o.yg)("a",{parentName:"p",href:"https://twisted.org/documents/18.7.0/api/twisted.internet.interfaces.ITCPTransport.html"},(0,o.yg)("inlineCode",{parentName:"a"},"ITCPTransport")," interface"),"."),(0,o.yg)("ol",null,(0,o.yg)("li",{parentName:"ol"},(0,o.yg)("p",{parentName:"li"},"In the Deluge codebase, find the class ",(0,o.yg)("inlineCode",{parentName:"p"},"DelugeTransferProtocol")," and read the docstring comment about the format of its messages.")),(0,o.yg)("li",{parentName:"ol"},(0,o.yg)("p",{parentName:"li"},"Follow the code in the ",(0,o.yg)("inlineCode",{parentName:"p"},"transfer_message()")," method of the ",(0,o.yg)("inlineCode",{parentName:"p"},"DelugeTransferProtocol")," class and see the ",(0,o.yg)("inlineCode",{parentName:"p"},"message")," variable conform to the message format you've just read about.\n",(0,o.yg)("inlineCode",{parentName:"p"},"self.transport")," simply refers to the underlying TCP interface.\nSo ",(0,o.yg)("inlineCode",{parentName:"p"},"self.transport.write()")," invokes the whole socket creation boilerplate necessary to send data via TCP.\nWe'll discuss it in the ",(0,o.yg)("a",{parentName:"p",href:"/operating-systems/12/Lab/IO/client-server-model#establishing-the-connection"},"next section"),"."))),(0,o.yg)("p",null,"This is what protocols are mostly about.\nThey describe which fields go where within a message and how they should be interpreted.\nFor example, this protocol says that the ",(0,o.yg)("inlineCode",{parentName:"p"},"body")," (the data itself) should be compressed before being sent.\nThis makes a lot of sense, as sending less data over the network results in lower latencies.\nHowever, if encryption is too time-consuming, it may not be worth it.\nThere are compromises to be made everywhere."),(0,o.yg)("h2",{id:"local-tcp-and-udp-services"},"Local TCP and UDP Services"),(0,o.yg)("p",null,"To get a full list of all network-handling processes in your system together with the protocols they're using, we can use the ",(0,o.yg)("inlineCode",{parentName:"p"},"netstat")," with the ",(0,o.yg)("inlineCode",{parentName:"p"},"-tuanp")," arguments.\n",(0,o.yg)("inlineCode",{parentName:"p"},"-tuanp")," is short for ",(0,o.yg)("inlineCode",{parentName:"p"},"-t -u -a -n -p"),", which stand for:"),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("inlineCode",{parentName:"li"},"-t"),": list processes using the TCP protocol"),(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("inlineCode",{parentName:"li"},"-u"),": list processes using the UDP protocol"),(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("inlineCode",{parentName:"li"},"-a"),": list both servers and clients"),(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("inlineCode",{parentName:"li"},"-n"),": list IPs in numeric format"),(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("inlineCode",{parentName:"li"},"-p"),": show the PID and name of each program")),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-console"},"student@os:~$ sudo netstat -tunp\nActive Internet connections (w/o servers)\nProto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name\ntcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN      1057/sshd: /usr/sbi\ntcp        0      0 127.0.0.1:6463          0.0.0.0:*               LISTEN      3261/Discord --type\ntcp        0      0 192.168.100.2:51738     162.159.128.235:443     ESTABLISHED 3110/Discord --type\ntcp        0      0 192.168.100.2:43694     162.159.129.235:443     ESTABLISHED 3110/Discord --type\ntcp        0      0 192.168.100.2:56230     54.230.159.113:443      ESTABLISHED 9154/firefox\ntcp        0      0 192.168.100.2:38096     34.107.141.31:443       ESTABLISHED 9154/firefox\ntcp        0      0 192.168.100.2:42462     34.117.237.239:443      ESTABLISHED 9154/firefox\ntcp        0      0 192.168.100.2:41128     162.159.135.234:443     ESTABLISHED 3110/Discord --type\ntcp6       0      0 :::80                   :::*                    LISTEN      1114/apache2\ntcp6       0      0 :::22                   :::*                    LISTEN      1057/sshd: /usr/sbi\ntcp6       0      0 2a02:2f0a:c10f:97:55754 2a02:2f0c:dff0:b::1:443 ESTABLISHED 9154/firefox\ntcp6       0      0 2a02:2f0a:c10f:97:55750 2a02:2f0c:dff0:b::1:443 ESTABLISHED 9154/firefox\nudp        0      0 0.0.0.0:56585           0.0.0.0:*                           3261/Discord --type\nudp        0      0 0.0.0.0:42629           0.0.0.0:*                           3261/Discord --type\nudp6       0      0 :::52070                :::*                                9154/firefox\nudp6       0      0 :::38542                :::*                                9154/firefox\n")),(0,o.yg)("p",null,"Obviously, your output will differ from the one above.\nFirst look at the fourth column.\nIt shows the local address and port used by the process.\nAs we've already established, SSH uses port 22.\nApache2 uses port 80 for both IPv4 and IPv6 addresses (look for rows starting with ",(0,o.yg)("inlineCode",{parentName:"p"},"tcp")," for IPv4 and ",(0,o.yg)("inlineCode",{parentName:"p"},"tcp6")," for IPv6).\nPort 80 is used for the HTTP protocol."),(0,o.yg)("p",null,"Moving on to some user programs, Firefox runs multiple connections using both IPv4 and IPv6 and a different port for each connection."),(0,o.yg)("p",null,(0,o.yg)("a",{parentName:"p",href:"/operating-systems/12/Lab/IO/quiz/firefox-tcp-udp"},"Quiz")),(0,o.yg)("p",null,"Discord does the same things as Firefox.\nIt uses TCP to send text messages, memes, videos and static content in general.\nAnd at the same time, it uses UDP to exchange voice and video data during calls."),(0,o.yg)("h3",{id:"practice-run-netstat-yourself"},"Practice: Run ",(0,o.yg)("inlineCode",{parentName:"h3"},"netstat")," Yourself"),(0,o.yg)("ol",null,(0,o.yg)("li",{parentName:"ol"},(0,o.yg)("p",{parentName:"li"},"Run ",(0,o.yg)("inlineCode",{parentName:"p"},"netstat")," on your own host machine.\nIdentify processes that use TCP and UDP and try to figure out what they might be using these protocols for.\nLook for browsers (different sites and types of content), servers such as Apache2 or Nginx, online games etc.\nDiscuss your findings with your classmates and teacher(s).")),(0,o.yg)("li",{parentName:"ol"},(0,o.yg)("p",{parentName:"li"},"Now run ",(0,o.yg)("inlineCode",{parentName:"p"},"receiver.py")," and then run ",(0,o.yg)("inlineCode",{parentName:"p"},"netstat")," in another terminal to see your receiver process.\nWhat arguments do you need to pass to ",(0,o.yg)("inlineCode",{parentName:"p"},"netstat")," to see ",(0,o.yg)("inlineCode",{parentName:"p"},"receiver.py"),"?\nDo you need the whole ",(0,o.yg)("inlineCode",{parentName:"p"},"-tuapn"),"?\nNo."))),(0,o.yg)("h3",{id:"conclusion"},"Conclusion"),(0,o.yg)("p",null,"The difference between TCP and UDP can be summarised as follows:"),(0,o.yg)("p",null,(0,o.yg)("img",{alt:"TCP vs UDP",src:n(9808).A,width:"460",height:"386"})))}u.isMDXComponent=!0},5680:(e,t,n)=>{n.d(t,{xA:()=>c,yg:()=>m});var r=n(6540);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=r.createContext({}),p=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},c=function(e){var t=p(e.components);return r.createElement(l.Provider,{value:t},e.children)},d="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},g=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,l=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),d=p(n),g=o,m=d["".concat(l,".").concat(g)]||d[g]||u[g]||a;return n?r.createElement(m,s(s({ref:t},c),{},{components:n})):r.createElement(m,s({ref:t},c))}));function m(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,s=new Array(a);s[0]=g;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i[d]="string"==typeof e?e:o,s[1]=i;for(var p=2;p<a;p++)s[p]=n[p];return r.createElement.apply(null,s)}return r.createElement.apply(null,n)}g.displayName="MDXCreateElement"},9808:(e,t,n)=>{n.d(t,{A:()=>r});const r=n.p+"assets/images/tcp-udp-simplified-7bb728409d8a83b05d5d574df21d9ec4.png"}}]);