"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[4245],{5680:(e,n,t)=>{t.d(n,{xA:()=>c,yg:()=>h});var a=t(6540);function i(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function s(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){i(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function r(e,n){if(null==e)return{};var t,a,i=function(e,n){if(null==e)return{};var t,a,i={},o=Object.keys(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||(i[t]=e[t]);return i}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}var l=a.createContext({}),p=function(e){var n=a.useContext(l),t=n;return e&&(t="function"==typeof e?e(n):s(s({},n),e)),t},c=function(e){var n=p(e.components);return a.createElement(l.Provider,{value:n},e.children)},g="mdxType",d={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},m=a.forwardRef((function(e,n){var t=e.components,i=e.mdxType,o=e.originalType,l=e.parentName,c=r(e,["components","mdxType","originalType","parentName"]),g=p(t),m=i,h=g["".concat(l,".").concat(m)]||g[m]||d[m]||o;return t?a.createElement(h,s(s({ref:n},c),{},{components:t})):a.createElement(h,s({ref:n},c))}));function h(e,n){var t=arguments,i=n&&n.mdxType;if("string"==typeof e||i){var o=t.length,s=new Array(o);s[0]=m;var r={};for(var l in n)hasOwnProperty.call(n,l)&&(r[l]=n[l]);r.originalType=e,r[g]="string"==typeof e?e:i,s[1]=r;for(var p=2;p<o;p++)s[p]=t[p];return a.createElement.apply(null,s)}return a.createElement.apply(null,t)}m.displayName="MDXCreateElement"},8421:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>s,default:()=>d,frontMatter:()=>o,metadata:()=>r,toc:()=>p});var a=t(8168),i=(t(6540),t(5680));const o={},s="D-Bus",r={unversionedId:"Lab/Application Interaction/dbus",id:"Lab/Application Interaction/dbus",title:"D-Bus",description:"D-Bus is an Inter-Process Communication (IPC) mechanism that is commonly present on Linux.",source:"@site/docs/Lab/Application Interaction/dbus.md",sourceDirName:"Lab/Application Interaction",slug:"/Lab/Application Interaction/dbus",permalink:"/operating-systems/62/Lab/Application Interaction/dbus",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"The X Window System",permalink:"/operating-systems/62/Lab/Application Interaction/x-window-system"},next:{title:"OS Cloud",permalink:"/operating-systems/62/Lab/Application Interaction/os-cloud"}},l={},p=[{value:"D-Bus Inspection with D-Feet",id:"d-bus-inspection-with-d-feet",level:2},{value:"Calling D-Bus Methods",id:"calling-d-bus-methods",level:2},{value:"Inspecting the Low-level Communication",id:"inspecting-the-low-level-communication",level:2},{value:"Practice",id:"practice",level:3},{value:"Firefox",id:"firefox",level:2}],c={toc:p},g="wrapper";function d(e){let{components:n,...o}=e;return(0,i.yg)(g,(0,a.A)({},c,o,{components:n,mdxType:"MDXLayout"}),(0,i.yg)("h1",{id:"d-bus"},"D-Bus"),(0,i.yg)("p",null,"D-Bus is an Inter-Process Communication (IPC) mechanism that is commonly present on Linux.\nIt is particularly used by various components of the desktop environment (like GNOME) to communicate between one another, although the system itself is general-purpose and can be used in any other situations."),(0,i.yg)("p",null,"As the name suggests, the communication model is that of a bus: processes connect to the bus, then exchange messages with other processes through the bus.\nThe bus itself is implemented by the dbus-daemon, and there are in fact multiple buses: one system bus, accessible system-wide, and one or more session buses, each one corresponding to one user login session."),(0,i.yg)("p",null,"Every process that connects to D-Bus receives a unique connection name.\nThis name can be something human-readable, like ",(0,i.yg)("inlineCode",{parentName:"p"},"org.freedesktop.Notifications"),", or some generated ID, like ",(0,i.yg)("inlineCode",{parentName:"p"},":1.63"),".\nOnce a process is connected, it can expose one or multiple ",(0,i.yg)("inlineCode",{parentName:"p"},"objects"),".\nAn object has a path-like name, consisting of strings separated by a slash character (for example, ",(0,i.yg)("inlineCode",{parentName:"p"},"/org/freedesktop/Notifications"),").\nEach object contains one or more ",(0,i.yg)("inlineCode",{parentName:"p"},"interfaces"),", which have the methods that can be called on that object."),(0,i.yg)("h2",{id:"d-bus-inspection-with-d-feet"},"D-Bus Inspection with D-Feet"),(0,i.yg)("p",null,"In order to better understand these concepts, we'll use a graphical tool (",(0,i.yg)("inlineCode",{parentName:"p"},"D-Feet"),") to inspect all the available D-Bus objects on our system."),(0,i.yg)("p",null,"Run D-Feet and select ",(0,i.yg)("inlineCode",{parentName:"p"},"Session Bus")," from the top button:"),(0,i.yg)("p",null,(0,i.yg)("img",{alt:"dfeet-session-bus",src:t(9174).A,width:"1631",height:"845"})),(0,i.yg)("p",null,"On the left panel, we can see all the processes connected to D-Bus with their associated ",(0,i.yg)("inlineCode",{parentName:"p"},"connection names"),".\nScroll down and find ",(0,i.yg)("inlineCode",{parentName:"p"},"org.freedesktop.Notifications"),".\nOn the right side, expand ",(0,i.yg)("inlineCode",{parentName:"p"},"/org/freedesktop/Notifications")," and then expand the ",(0,i.yg)("inlineCode",{parentName:"p"},"org.freedesktop.Notifications")," interface.\nThe window should look like this:"),(0,i.yg)("p",null,(0,i.yg)("img",{alt:"dfeet-notifications",src:t(373).A,width:"1623",height:"834"})),(0,i.yg)("p",null,"Some observations:"),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("p",{parentName:"li"},"The bus communication happens over a Unix socket, with the path ",(0,i.yg)("inlineCode",{parentName:"p"},"/run/user/1000/bus"),".")),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("p",{parentName:"li"},(0,i.yg)("inlineCode",{parentName:"p"},"org.freedesktop.Notifications")," on the left panel is the ",(0,i.yg)("inlineCode",{parentName:"p"},"connection name"),".")),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("p",{parentName:"li"},"The process that has connected with this name is ",(0,i.yg)("inlineCode",{parentName:"p"},"/usr/bin/gjs /usr/share/gnome-shell/org.gnome.Shell.Notifications")," and has the pid of ",(0,i.yg)("inlineCode",{parentName:"p"},"4373"),".")),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("p",{parentName:"li"},"This process exposes one object: ",(0,i.yg)("inlineCode",{parentName:"p"},"/org/freedesktop/Notifications"),".\nNote that the object name is the same as the connection name, where the dots have been replaced with slashes.\nThis is not a requirement, as the objects exposed by a process can have any name."))),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("p",{parentName:"li"},"The object has 4 interfaces: ",(0,i.yg)("inlineCode",{parentName:"p"},"org.freedesktop.DBus.Introspectable"),", ",(0,i.yg)("inlineCode",{parentName:"p"},"org.freedesktop.DBus.Peer"),", ",(0,i.yg)("inlineCode",{parentName:"p"},"org.freedesktop.DBus.Properties")," and ",(0,i.yg)("inlineCode",{parentName:"p"},"org.freedesktop.Notifications"),".\nNote that the last one (",(0,i.yg)("inlineCode",{parentName:"p"},"org.freedesktop.Notifications"),") is the same as the connection name, but this again is just a coincidence, not a requirement.")),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("p",{parentName:"li"},"The interface ",(0,i.yg)("inlineCode",{parentName:"p"},"org.freedesktop.Notifications")," has some methods that can be called, such as ",(0,i.yg)("inlineCode",{parentName:"p"},"Notify"),"."))),(0,i.yg)("h2",{id:"calling-d-bus-methods"},"Calling D-Bus Methods"),(0,i.yg)("p",null,"The application behind ",(0,i.yg)("inlineCode",{parentName:"p"},"org.freedesktop.Notifications")," is responsible with desktop notifications (the small bubbles of text that appear at the top of the screen when some event happens).\nWhen an application wants to send a notification it needs to connect to D-Bus and call the ",(0,i.yg)("inlineCode",{parentName:"p"},"Notify")," method from the ",(0,i.yg)("inlineCode",{parentName:"p"},"org.freedesktop.Notifications")," interface."),(0,i.yg)("p",null,"In this example, we want to call the ",(0,i.yg)("inlineCode",{parentName:"p"},"Notify")," method ourselves.\nTo do this, we must first understand the signature of this method:"),(0,i.yg)("p",null,(0,i.yg)("inlineCode",{parentName:"p"},"Notify (String arg_0, UInt32 arg_1, String arg_2, String arg_3, String arg_4, Array of [String] arg_5, Dict of {String, Variant} arg_6, Int32 arg_7) \u21a6 (UInt32 arg_8)")),(0,i.yg)("p",null,"This doesn't tell us much, but we can find more documentation ",(0,i.yg)("a",{parentName:"p",href:"https://specifications.freedesktop.org/notification-spec/notification-spec-latest.html#basic-design"},"here"),", since ",(0,i.yg)("inlineCode",{parentName:"p"},"freedesktop")," is an open standard."),(0,i.yg)("p",null,"We'll set the arguments to the following (for our simple case, most of them will be unused):"),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("p",{parentName:"li"},(0,i.yg)("inlineCode",{parentName:"p"},"app_name"),": ",(0,i.yg)("inlineCode",{parentName:"p"},'""'))),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("p",{parentName:"li"},(0,i.yg)("inlineCode",{parentName:"p"},"replaces_id"),": ",(0,i.yg)("inlineCode",{parentName:"p"},"0"))),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("p",{parentName:"li"},(0,i.yg)("inlineCode",{parentName:"p"},"app_icon"),": ",(0,i.yg)("inlineCode",{parentName:"p"},'""'))),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("p",{parentName:"li"},(0,i.yg)("inlineCode",{parentName:"p"},"summary"),": ",(0,i.yg)("inlineCode",{parentName:"p"},'"This is the title"'))),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("p",{parentName:"li"},(0,i.yg)("inlineCode",{parentName:"p"},"body"),": ",(0,i.yg)("inlineCode",{parentName:"p"},'"This is the content"'))),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("p",{parentName:"li"},(0,i.yg)("inlineCode",{parentName:"p"},"actions"),": ",(0,i.yg)("inlineCode",{parentName:"p"},"[]"))),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("p",{parentName:"li"},(0,i.yg)("inlineCode",{parentName:"p"},"hints"),": ",(0,i.yg)("inlineCode",{parentName:"p"},"{}"))),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("p",{parentName:"li"},(0,i.yg)("inlineCode",{parentName:"p"},"expire_timeout"),": ",(0,i.yg)("inlineCode",{parentName:"p"},"-1")))),(0,i.yg)("p",null,"Now the question is how to actually call the method.\nNormally, we would have to write an application that connects to D-Bus and executes the call.\nBut for demonstrative purposes there are easier ways."),(0,i.yg)("p",null,"One way is directly from d-feet.\nIf we double-click on the ",(0,i.yg)("inlineCode",{parentName:"p"},"Notify")," method in the right-side pane of d-feet, a window will open that allows us to call the method with any arguments that we want:"),(0,i.yg)("p",null,(0,i.yg)("img",{alt:"dfeet-execute-dialog",src:t(4820).A,width:"1821",height:"868"})),(0,i.yg)("p",null,"Then we click the ",(0,i.yg)("inlineCode",{parentName:"p"},"Execute")," button and the notification will appear:"),(0,i.yg)("p",null,(0,i.yg)("img",{alt:"dfeet-execute-",src:t(7747).A,width:"1920",height:"1080"})),(0,i.yg)("p",null,"Another way is from the command-line. There's the ",(0,i.yg)("inlineCode",{parentName:"p"},"gdbus")," tool that can do this:"),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-console"},'student@os:~$ gdbus call \\\n      --session \\\n      --dest org.freedesktop.Notifications \\\n      --object-path /org/freedesktop/Notifications \\\n      --method org.freedesktop.Notifications.Notify \\\n      -- \\\n      \'""\' \\\n      0 \\\n      \'""\' \\\n      "This is the title" \\\n      "This is the content" \\\n      [] \\\n      {} \\\n      -1\n')),(0,i.yg)("p",null,"Let's see how it works:"),(0,i.yg)("p",null,(0,i.yg)("img",{alt:"gdbus-notify",src:t(2150).A,width:"1920",height:"1080"})),(0,i.yg)("p",null,"You can also find this ",(0,i.yg)("inlineCode",{parentName:"p"},"gdbus")," call in the ",(0,i.yg)("inlineCode",{parentName:"p"},"support/dbus/send_notification.sh")," script."),(0,i.yg)("h2",{id:"inspecting-the-low-level-communication"},"Inspecting the Low-level Communication"),(0,i.yg)("p",null,"Let's run ",(0,i.yg)("inlineCode",{parentName:"p"},"gdbus")," under ",(0,i.yg)("inlineCode",{parentName:"p"},"strace")," to see what's happening behind the scenes.\nRun the script in ",(0,i.yg)("inlineCode",{parentName:"p"},"support/dbus/send_notification_strace.sh"),":"),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-console"},'strace: Process 61888 attached\n[pid 61887] socket(AF_UNIX, SOCK_STREAM|SOCK_CLOEXEC, 0) = 5\n[pid 61887] connect(5, {sa_family=AF_UNIX, sun_path="/run/user/1000/bus"}, 110) = 0\n[pid 61887] sendmsg(5, {msg_name=NULL, msg_namelen=0, msg_iov=[{iov_base="\\0", iov_len=1}], msg_iovlen=1,\nmsg_control=[{cmsg_len=28, cmsg_level=SOL_SOCKET, cmsg_type=SCM_CREDENTIALS, cmsg_data={pid=61887,\nuid=1000, gid=1000}}],\nmsg_controllen=32, msg_flags=0}, MSG_NOSIGNAL) = 1\nstrace: Process 61889 attached\n\n[...]\n\n[pid 61889] sendmsg(5, {msg_name=NULL, msg_namelen=0, msg_iov=[{iov_base="l\\1\\0\\1T\\0\\0\\0\\3\\0\\0\\0\\237\\0\\0\\0\\1\n\\1o\\0\\36\\0\\0\\0/org/freedesktop/Notifications\\0\\0\\2\\1s\\0\\35\\0\\0\\0org.freedesktop.Notifications\\0\\0\\0\\6\\1s\\0\\35\n\\0\\0\\0org.freedesktop.Notifications\\0\\0\\0\\10\\1g\\0\\rsusssasa{sv}i\\0\\0\\0\\0\\0\\0\\3\\1s\\0\\6\\0\\0\\0Notify\\0\\0\\0\\0\\0\\0\n\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\21\\0\\0\\0This is the title\\0\\0\\0\\23\\0\\0\\0This is the content\\0\\0\\0\\0\\0\\0\\0\\0\\0\n\\0\\0\\0\\0\\377\\377\\377\\377", iov_len=260}], msg_iovlen=1, msg_controllen=0,\n msg_flags=0}, MSG_NOSIGNAL) = 260\n[pid 61889] recvmsg(5, {msg_name=NULL, msg_namelen=0, msg_iov=[{iov_base="l\\2\\1\\1\\4\\0\\0\\0\\312\\0\\0\\0.\\0\\0\\0", iov_len=16}],\nmsg_iovlen=1, msg_controllen=0, msg_flags=MSG_CMSG_CLOEXEC}, MSG_CMSG_CLOEXEC) = 16\n[pid 61889] recvmsg(5, {msg_name=NULL, msg_namelen=0, msg_iov=[{iov_base="\\6\\1s\\0\\6\\0\\0\\0:1.497\\0\\0\\10\\1g\\0\\1u\\0\\0\\5\\1u\\0\n\\3\\0\\0\\0\\7\\1s\\0\\5\\0\\0\\0:1.49\\0\\0\\0\\36\\0\\0\\0", iov_len=52}], msg_iovlen=1, msg_controllen=0, msg_flags=MSG_CMSG_CLOEXEC}, MSG_CMSG_CLOEXEC) = 52\n(uint32 30,)\n[pid 61889] +++ exited with 0 +++\n[pid 61888] +++ exited with 0 +++\n+++ exited with 0 +++\n')),(0,i.yg)("p",null,"We see a Unix socket being created and a connection made to ",(0,i.yg)("inlineCode",{parentName:"p"},"/run/user/1000/bus"),", as expected.\nThen a series of messages are exchanged on the socket, which are part of the D-Bus protocol.\nOn a closer look, we can even identify some strings from our notification, like ",(0,i.yg)("inlineCode",{parentName:"p"},"This is the title")," or ",(0,i.yg)("inlineCode",{parentName:"p"},"This is the content"),":"),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-console"},'[pid 61889] sendmsg(5, {msg_name=NULL, msg_namelen=0, msg_iov=[{iov_base="l\\1\\0\\1T\\0\\0\\0\\3\\0\\0\\0\\237\\0\\0\\0\\1\n\\1o\\0\\36\\0\\0\\0/org/freedesktop/Notifications\\0\\0\\2\\1s\\0\\35\\0\\0\\0org.freedesktop.Notifications\\0\\0\\0\\6\\1s\\0\\35\n\\0\\0\\0org.freedesktop.Notifications\\0\\0\\0\\10\\1g\\0\\rsusssasa{sv}i\\0\\0\\0\\0\\0\\0\\3\\1s\\0\\6\\0\\0\\0Notify\\0\\0\\0\\0\\0\\0\n\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\0\\21\\0\\0\\0This is the title\\0\\0\\0\\23\\0\\0\\0This is the content\\0\\0\\0\\0\\0\\0\\0\\0\\0\n\\0\\0\\0\\0\\377\\377\\377\\377", iov_len=260}], msg_iovlen=1, msg_controllen=0,\n')),(0,i.yg)("h3",{id:"practice"},"Practice"),(0,i.yg)("p",null,"Use D-Bus to find out the computer's battery level.\nThere is the ",(0,i.yg)("inlineCode",{parentName:"p"},"org.freedesktop.UPower")," interface on the system bus that can provide this information."),(0,i.yg)("p",null,"The method you need to call is ",(0,i.yg)("inlineCode",{parentName:"p"},"org.freedesktop.DBus.Properties.Get")," from the ",(0,i.yg)("inlineCode",{parentName:"p"},"/org/freedesktop/UPower/devices/DisplayDevice")," object."),(0,i.yg)("p",null,"This method needs 2 arguments: an interface name and a property name."),(0,i.yg)("p",null,"Those should be ",(0,i.yg)("inlineCode",{parentName:"p"},"org.freedesktop.UPower.Device")," and ",(0,i.yg)("inlineCode",{parentName:"p"},"Percentage")," respectively."),(0,i.yg)("p",null,"Then input all of the above into a ",(0,i.yg)("inlineCode",{parentName:"p"},"gdbus")," call, which, if everything is correct, should output the battery percentage level as a number between 0 and 100."),(0,i.yg)("p",null,"Note: if you are running on a desktop computer or inside a virtual machine, you will get the value ",(0,i.yg)("inlineCode",{parentName:"p"},"0.0"),", because those systems don't have a battery."),(0,i.yg)("p",null,"This task can also be solved in a python script.\nCheck out the details in the ",(0,i.yg)("a",{parentName:"p",href:"/operating-systems/62/Lab/Application%20Interaction/arena#d-bus"},"arena section"),"."),(0,i.yg)("h2",{id:"firefox"},"Firefox"),(0,i.yg)("p",null,"Let's do the following experiment:"),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("p",{parentName:"li"},"Open the Firefox browser")),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("p",{parentName:"li"},"From a terminal run ",(0,i.yg)("inlineCode",{parentName:"p"},"firefox www.google.com")))),(0,i.yg)("p",null,(0,i.yg)("img",{alt:"firefox-url-open",src:t(4105).A,width:"1920",height:"1080"})),(0,i.yg)("p",null,"Notice that the URL we passed in the command-line was opened in the existing Firefox window as a new tab.\nEven though we started a separate Firefox process, which should have created a separate new window, this didn't actually happen.\nInstead, the process that we started from the command-line exited immediately and the site was opened in the already running Firefox instance."),(0,i.yg)("p",null,"Without any precise knowledge about Firefox internals, we can guess that something like this happened:"),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("p",{parentName:"li"},"The newly started Firefox process detected that another instance of Firefox is already running")),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("p",{parentName:"li"},"The newly started Firefox process sent a message to the existing running process, requesting it to open a URL in a new tab"))),(0,i.yg)("p",null,"Since we're talking about message passing between 2 processes, there's a chance that maybe D-Bus was involved.\nLet's check: we'll use a tool called ",(0,i.yg)("inlineCode",{parentName:"p"},"dbus-monitor")," that will print all messages passed through D-Bus."),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-console"},"student@os:~$ dbus-monitor\n")),(0,i.yg)("p",null,"Then, in another terminal, we'll run ",(0,i.yg)("inlineCode",{parentName:"p"},"firefox www.google.com")," again."),(0,i.yg)("p",null,"Going back to the ",(0,i.yg)("inlineCode",{parentName:"p"},"dbus-monitor")," output, we find the following:"),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-console"},"...\nmethod call time=1655809062.813923 sender=:1.757 -> destination=org.mozilla.firefox.ZGVmYXVsdC1yZWxlYXNl serial=2 path=/org/mozilla/firefox/Remote; interface=org.mozilla.firefox; member=OpenURL\n   array of bytes [\n      02 00 00 00 1a 00 00 00 2f 00 00 00 2f 68 6f 6d 65 2f 61 64 72 69 61 6e\n      73 00 2f 6f 70 74 2f 66 69 72 65 66 6f 78 2f 66 69 72 65 66 6f 78 00 77\n      77 77 2e 67 6f 6f 67 6c 65 2e 63 6f 6d 00\n   ]\n")),(0,i.yg)("p",null,"There was a D-Bus call to ",(0,i.yg)("inlineCode",{parentName:"p"},"org.mozilla.firefox.ZGVmYXVsdC1yZWxlYXNl"),", on the object ",(0,i.yg)("inlineCode",{parentName:"p"},"/org/mozilla/firefox/Remote"),", method ",(0,i.yg)("inlineCode",{parentName:"p"},"OpenURL")," from the ",(0,i.yg)("inlineCode",{parentName:"p"},"org.mozilla.firefox")," interface.\nIndeed, we see that this object exists in d-feet as well:"),(0,i.yg)("p",null,(0,i.yg)("img",{alt:"dfeet-firefox",src:t(6538).A,width:"1820",height:"868"})),(0,i.yg)("p",null,"We can try to call the ",(0,i.yg)("inlineCode",{parentName:"p"},"OpenURL")," method ourselves, directly from d-feet.\nThe method has only one argument of the type ",(0,i.yg)("inlineCode",{parentName:"p"},"Array of [Byte]"),".\nAlthough there's no documentation for it, we can use the same byte array that we saw in ",(0,i.yg)("inlineCode",{parentName:"p"},"dbus-monitor"),":"),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-console"},"   array of bytes [\n      02 00 00 00 1a 00 00 00 2f 00 00 00 2f 68 6f 6d 65 2f 61 64 72 69 61 6e\n      73 00 2f 6f 70 74 2f 66 69 72 65 66 6f 78 2f 66 69 72 65 66 6f 78 00 77\n      77 77 2e 67 6f 6f 67 6c 65 2e 63 6f 6d 00\n   ]\n")),(0,i.yg)("p",null,"(Note that ",(0,i.yg)("inlineCode",{parentName:"p"},"77 77 77 2e 67 6f 6f 67 6c 65 2e 63 6f 6d")," at the end is the string ",(0,i.yg)("inlineCode",{parentName:"p"},"www.google.com"),", so that's another confirmation that we're on the right track)."),(0,i.yg)("p",null,(0,i.yg)("img",{alt:"dfeet-url-open",src:t(5360).A,width:"1920",height:"1080"})))}d.isMDXComponent=!0},7747:(e,n,t)=>{t.d(n,{A:()=>a});const a=t.p+"assets/images/dfeet_execute-e3d7472f8f70d73deabbaa7d217c10bb.gif"},4820:(e,n,t)=>{t.d(n,{A:()=>a});const a=t.p+"assets/images/dfeet_execute-0e80376026099d72795e2e52e08d754b.png"},6538:(e,n,t)=>{t.d(n,{A:()=>a});const a=t.p+"assets/images/dfeet_firefox-f29826be8e314acb7f0047d5b5b86431.png"},373:(e,n,t)=>{t.d(n,{A:()=>a});const a=t.p+"assets/images/dfeet_notifications-80931f45466247c5cd1d6164d83f97d8.png"},9174:(e,n,t)=>{t.d(n,{A:()=>a});const a=t.p+"assets/images/dfeet_session_bus-1772a989fbb5f4e3c0f5d0569771e54b.png"},5360:(e,n,t)=>{t.d(n,{A:()=>a});const a=t.p+"assets/images/dfeet_url_open-99b78cbaf472fad6a0c5dd4d550b4a55.gif"},4105:(e,n,t)=>{t.d(n,{A:()=>a});const a=t.p+"assets/images/firefox_url_open-85c4cc365a96e2d43b66891dc60c0911.gif"},2150:(e,n,t)=>{t.d(n,{A:()=>a});const a=t.p+"assets/images/gdbus_notify-ea95f7a06a7878b31ad48bbdfaba30bb.gif"}}]);