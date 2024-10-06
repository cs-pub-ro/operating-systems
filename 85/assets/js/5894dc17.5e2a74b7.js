"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[1092],{5680:(e,n,t)=>{t.d(n,{xA:()=>c,yg:()=>h});var a=t(6540);function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function r(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){o(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function s(e,n){if(null==e)return{};var t,a,o=function(e,n){if(null==e)return{};var t,a,o={},i=Object.keys(e);for(a=0;a<i.length;a++)t=i[a],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)t=i[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var l=a.createContext({}),p=function(e){var n=a.useContext(l),t=n;return e&&(t="function"==typeof e?e(n):r(r({},n),e)),t},c=function(e){var n=p(e.components);return a.createElement(l.Provider,{value:n},e.children)},d="mdxType",u={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},m=a.forwardRef((function(e,n){var t=e.components,o=e.mdxType,i=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),d=p(t),m=o,h=d["".concat(l,".").concat(m)]||d[m]||u[m]||i;return t?a.createElement(h,r(r({ref:n},c),{},{components:t})):a.createElement(h,r({ref:n},c))}));function h(e,n){var t=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var i=t.length,r=new Array(i);r[0]=m;var s={};for(var l in n)hasOwnProperty.call(n,l)&&(s[l]=n[l]);s.originalType=e,s[d]="string"==typeof e?e:o,r[1]=s;for(var p=2;p<i;p++)r[p]=t[p];return a.createElement.apply(null,r)}return a.createElement.apply(null,t)}m.displayName="MDXCreateElement"},5440:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>r,default:()=>u,frontMatter:()=>i,metadata:()=>s,toc:()=>p});var a=t(8168),o=(t(6540),t(5680));const i={},r="Arena",s={unversionedId:"Lab/Application Interaction/arena",id:"Lab/Application Interaction/arena",title:"Arena",description:"Oneko",source:"@site/docs/Lab/Application Interaction/arena.md",sourceDirName:"Lab/Application Interaction",slug:"/Lab/Application Interaction/arena",permalink:"/operating-systems/85/Lab/Application Interaction/arena",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"OS Cloud",permalink:"/operating-systems/85/Lab/Application Interaction/os-cloud"},next:{title:"Assignments",permalink:"/operating-systems/85/Assignments/"}},l={},p=[{value:"Oneko",id:"oneko",level:2},{value:"D-Bus",id:"d-bus",level:2},{value:"OS-Cloud: More Disk Customization",id:"os-cloud-more-disk-customization",level:2},{value:"Copy Additional Files to the Newly Created Disk",id:"copy-additional-files-to-the-newly-created-disk",level:3},{value:"SSH Key Setup",id:"ssh-key-setup",level:3},{value:"OS-Cloud: Internet Access",id:"os-cloud-internet-access",level:2}],c={toc:p},d="wrapper";function u(e){let{components:n,...i}=e;return(0,o.yg)(d,(0,a.A)({},c,i,{components:n,mdxType:"MDXLayout"}),(0,o.yg)("h1",{id:"arena"},"Arena"),(0,o.yg)("h2",{id:"oneko"},"Oneko"),(0,o.yg)("p",null,"An alternative to ",(0,o.yg)("inlineCode",{parentName:"p"},"xeyes")," which allows us to observe Unix sockets is ",(0,o.yg)("inlineCode",{parentName:"p"},"oneko"),".\nGoing through the same steps, we see that the application also create a Unix socket, then connects to the path ",(0,o.yg)("inlineCode",{parentName:"p"},'@"/tmp/.X11-unix/X0"'),"."),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-console"},'student@os:~$ strace -e trace=socket,connect oneko\nsocket(AF_UNIX, SOCK_STREAM|SOCK_CLOEXEC, 0) = 3\nconnect(3, {sa_family=AF_UNIX, sun_path=@"/tmp/.X11-unix/X1"}, 20) = 0\n--- SIGALRM {si_signo=SIGALRM, si_code=SI_KERNEL} ---\n')),(0,o.yg)("p",null,"When running ",(0,o.yg)("inlineCode",{parentName:"p"},"oneko"),", what differs from ",(0,o.yg)("inlineCode",{parentName:"p"},"xeyes")," is the ",(0,o.yg)("inlineCode",{parentName:"p"},"SIGALRM")," signal.\nThis means that ",(0,o.yg)("inlineCode",{parentName:"p"},"oneko")," uses a timer, which is periodically set, and then it expires only to be reset again.\nThe purpose of this timer is to slow down the cat."),(0,o.yg)("p",null,"Verifying the communication between the X server and ",(0,o.yg)("inlineCode",{parentName:"p"},"oneko")," is easy.\nWe see that the cat follows our mouse cursor, behaving similarly to ",(0,o.yg)("inlineCode",{parentName:"p"},"xeyes"),".\nAfter running ",(0,o.yg)("inlineCode",{parentName:"p"},"oneko")," under ",(0,o.yg)("inlineCode",{parentName:"p"},"strace"),", we see the communication uses the UNIX socket created at the beginning:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-console"},"strace -e 'trace=!poll' -e trace='socket,connect,recvmsg' oneko |& grep -v '\\-1 EAGAIN'\n")),(0,o.yg)("p",null,(0,o.yg)("a",{parentName:"p",href:"/operating-systems/85/Lab/Application%20Interaction/quiz/timer"},"Quiz")),(0,o.yg)("h2",{id:"d-bus"},"D-Bus"),(0,o.yg)("p",null,"Use the ",(0,o.yg)("inlineCode",{parentName:"p"},"dbus")," python bindings to get the computer's battery level using a python script.\nYou can start from the documentation ",(0,o.yg)("a",{parentName:"p",href:"https://dbus.freedesktop.org/doc/dbus-python/tutorial.html#"},"here"),".\nYou need to read the sections ",(0,o.yg)("inlineCode",{parentName:"p"},"Connecting to the Bus"),", ",(0,o.yg)("inlineCode",{parentName:"p"},"Proxy objects"),", and ",(0,o.yg)("inlineCode",{parentName:"p"},"Interfaces and methods"),"."),(0,o.yg)("p",null,"There's also a skeleton you can use in ",(0,o.yg)("inlineCode",{parentName:"p"},"support/dbus/get_battery_level.py"),"."),(0,o.yg)("p",null,"In summary, your script will start by connecting to the ",(0,o.yg)("inlineCode",{parentName:"p"},"System Bus"),".\nThen you'll use the ",(0,o.yg)("inlineCode",{parentName:"p"},"get_object")," method to obtain a proxy object.\nOn this proxy object, you can actually do the method call as explained ",(0,o.yg)("a",{parentName:"p",href:"https://dbus.freedesktop.org/doc/dbus-python/tutorial.html#interfaces-and-methods"},"here"),":"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-text"},"To call a method, call the method of the same name on the proxy object, passing in the interface name via the dbus_interface keyword argument\n")),(0,o.yg)("p",null,"So, if you want to call the method ",(0,o.yg)("inlineCode",{parentName:"p"},"this.is.an.interface.method")," with the arguments ",(0,o.yg)("inlineCode",{parentName:"p"},"A")," and ",(0,o.yg)("inlineCode",{parentName:"p"},"B")," you can do it like this:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-python"},'result = proxy.method(A, B, dbus_interface = "this.is.an.interface")\n')),(0,o.yg)("h2",{id:"os-cloud-more-disk-customization"},"OS-Cloud: More Disk Customization"),(0,o.yg)("p",null,"You might have probably noticed that there are 2 types of disk customizations:"),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("p",{parentName:"li"},"One type is for things that can be done without running the virtual machine.\nIf we only want to modify some files inside the disk filesystem, we can do so by mounting the disk.\nThis is done, for example, in the ",(0,o.yg)("inlineCode",{parentName:"p"},"disk-templates/ubuntu_22.04/setup_root_password.sh")," script.\nThere we use ",(0,o.yg)("inlineCode",{parentName:"p"},"nbd_connect_qcow2")," + ",(0,o.yg)("inlineCode",{parentName:"p"},"mount")," to mount the disk, then we modify the ",(0,o.yg)("inlineCode",{parentName:"p"},"/etc/shadow")," file to change the root password.")),(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("p",{parentName:"li"},"The second case is for operations that must be done with the virtual machine running.\nThese are handled in the ",(0,o.yg)("inlineCode",{parentName:"p"},"ubuntu_22_04_vm_prepare")," function: the virtual machine is first started (",(0,o.yg)("inlineCode",{parentName:"p"},"start_qemu_for_vm"),"), then ",(0,o.yg)("inlineCode",{parentName:"p"},"pexpect")," is used to interact with the virtual machine via the ",(0,o.yg)("inlineCode",{parentName:"p"},"qemu")," serial console.\nHere we do things like running ",(0,o.yg)("inlineCode",{parentName:"p"},"ssh-keygen")," - a binary that is part of the disk filesystem, which depends on other parts of the operating system from the disk to be running.\nNote that in ",(0,o.yg)("inlineCode",{parentName:"p"},"ubuntu_22_04_vm_prepare"),", for convenience, we also do some customizations that fall into the first category (like modifying ",(0,o.yg)("inlineCode",{parentName:"p"},"/etc/ssh/sshd_config"),")."))),(0,o.yg)("h3",{id:"copy-additional-files-to-the-newly-created-disk"},"Copy Additional Files to the Newly Created Disk"),(0,o.yg)("p",null,"This is a customization from the first category.\nIn ",(0,o.yg)("inlineCode",{parentName:"p"},"disk-templates/ubuntu_22.04/files")," there is a file called ",(0,o.yg)("inlineCode",{parentName:"p"},"99-os-cloud-welcome")," (a script that prints a greeting message).\nWe want to copy this file to ",(0,o.yg)("inlineCode",{parentName:"p"},"/etc/update-motd.d")," in our newly created disk, so that it will run whenever a user logs in."),(0,o.yg)("p",null,"To do this, you will create a script called ",(0,o.yg)("inlineCode",{parentName:"p"},"copy_files.sh")," in ",(0,o.yg)("inlineCode",{parentName:"p"},"disk-templates/ubuntu_22.04"),".\nThis script will receive a path to a ",(0,o.yg)("inlineCode",{parentName:"p"},"qcow2")," disk file as an argument, it will mount the disk, and then copy the file to the necessary location.\nThen, in the ",(0,o.yg)("inlineCode",{parentName:"p"},"create_disk_from_template")," function in ",(0,o.yg)("inlineCode",{parentName:"p"},"disk.py")," you will call this script, similar with how the other scripts are called."),(0,o.yg)("p",null,"You can use ",(0,o.yg)("inlineCode",{parentName:"p"},"disk-templates/ubuntu_22.04/setup_root_password.sh")," as an example."),(0,o.yg)("h3",{id:"ssh-key-setup"},"SSH Key Setup"),(0,o.yg)("p",null,"We want to be able to log into the virtual machine using an ssh key, instead of the password ",(0,o.yg)("inlineCode",{parentName:"p"},"123456"),".\nNotice that the ",(0,o.yg)("inlineCode",{parentName:"p"},"vm_create")," API also accepts an ",(0,o.yg)("inlineCode",{parentName:"p"},"ssh_key")," parameter.\nHere, the user can provide an ssh public key, which the system will install in ",(0,o.yg)("inlineCode",{parentName:"p"},"/root/.ssh/authorized_keys")," in the newly created virtual machine."),(0,o.yg)("p",null,"Your task is to implement this feature, as a customization from the second category (that is, implemented in the ",(0,o.yg)("inlineCode",{parentName:"p"},"ubuntu_22_04_vm_prepare")," function).\nThe key will be accessible to the function as the ",(0,o.yg)("inlineCode",{parentName:"p"},"ssh_pub_key")," parameter.\nThen it's only a matter of writing the key to the appropriate place, using a command like ",(0,o.yg)("inlineCode",{parentName:"p"},"echo key > /root/.ssh/authorized_keys"),".\nNote that the ",(0,o.yg)("inlineCode",{parentName:"p"},"/root/.ssh")," directory might not exist, so you need to create it as well."),(0,o.yg)("p",null,"After the feature is complete, you can test it using the keys in the ",(0,o.yg)("inlineCode",{parentName:"p"},"support/os-cloud/keys")," directory.\nThis directory contains a pair of public-private keys.\nThe directory will also be mounted inside the ",(0,o.yg)("inlineCode",{parentName:"p"},"os-cloud")," container in ",(0,o.yg)("inlineCode",{parentName:"p"},"/keys"),"."),(0,o.yg)("p",null,"You will create another virtual machine, passing the public key to ",(0,o.yg)("inlineCode",{parentName:"p"},"vm_create"),":"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-console"},'student@os:~/.../support/os-cloud$ curl -H "Content-Type: application/json" \\\n    -d \'{ "name": "my_vm2", "image": "ubuntu_22.04", "network": "default", "mem_size": "2G", "disk_size": "10G", "ssh_key": "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC8CDHgeE4NIIIih3wSz58GDkfPLUk2m9gmbZB1f6o8Lzawzb3HVFpslAUWK0f/Ymw9cloInpMo50gWMYFSyJ7ZrOWWak54BedpHDkFAxxy+JCE9b+pkKsrAT7wiir7gn2LHlhj55FLZkC9PpM9cBcrMfzlcP9Bf+2cnpDdINybSLmOUmrI23ANteM4lEVaa2yEbCaJk6dFB8+atz5zPjvVI0Hd+kJK7yJ0xV6Zc2ADle7TKW3dyiXOE9qFKe9933Rj7ocqNXCAO1cxUoJCVuVS7lh+1pSSPXLWLTOhVp/XiLGWVP6KRYmmn710MWKm9Kj1tPiGUphUraL20SJiRT6/ os-cloud-user"}\' \\\n    localhost:5000/vm_create\n{"id":2,"status":"ok"}\n')),(0,o.yg)("p",null,"Obtain the IP address that was allocated to the new vm:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-console"},'student@os:~/.../support/os-cloud$ curl -s -H "Content-Type: application/json" -d \'{ "id": 2 }\' localhost:5000/vm_info | jq .\n{\n  "disk_size": 10737418240,\n  "id": 2,\n  "ip": "192.168.0.3",\n  "mem_size": 2147483648,\n  "name": "my_vm2",\n  "network": "default",\n  "os": "ubuntu_22.04",\n  "state": "RUNNING"\n}\n')),(0,o.yg)("p",null,"Then go inside the ",(0,o.yg)("inlineCode",{parentName:"p"},"os-cloud")," container and ssh to the vm using the private key in ",(0,o.yg)("inlineCode",{parentName:"p"},"/keys"),".\nIt should work without prompting for the password:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-console"},"student@os:~/.../support/os-cloud$ docker-compose exec os-cloud bash\nroot@ac93d3d6cab2:/app# ssh -i /keys/ssh_key root@192.168.0.3\nWelcome to Ubuntu 22.04.1 LTS (GNU/Linux 5.15.0-56-generic x86_64)\n[...]\nPowered by OS Cloud\nLast login: Mon Jan  2 19:34:53 2023 from 192.168.0.1\nroot@ubuntu:~#\n")),(0,o.yg)("h2",{id:"os-cloud-internet-access"},"OS-Cloud: Internet Access"),(0,o.yg)("p",null,"Notice that our virtual machines don't have internet access:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-console"},"Powered by OS Cloud\nLast login: Mon Jan  2 19:52:47 UTC 2023 on ttyS0\nroot@ubuntu:~# curl google.com\ncurl: (6) Could not resolve host: google.com\n")),(0,o.yg)("p",null,"In this task, we want to fix this problem.\nTo do this, we must first understand how the networking for the virtual machines is done."),(0,o.yg)("p",null,"First, there is the concept of a ",(0,o.yg)("inlineCode",{parentName:"p"},"network"),", which you saw in the previous section.\nThere is a network called ",(0,o.yg)("inlineCode",{parentName:"p"},"default"),", with the address of ",(0,o.yg)("inlineCode",{parentName:"p"},"192.168.0.0/24"),".\nAll virtual machines are part of this network, that's why they were allocated ip addresses like ",(0,o.yg)("inlineCode",{parentName:"p"},"192.168.0.2"),"."),(0,o.yg)("p",null,"Let's go inside the ",(0,o.yg)("inlineCode",{parentName:"p"},"os-cloud")," container and take a look at the network interfaces:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-console"},"$ docker-compose exec os-cloud bash\nroot@8333e5cefb0d:/app# ip a\n1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000\n    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00\n    inet 127.0.0.1/8 scope host lo\n       valid_lft forever preferred_lft forever\n2: br0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default qlen 1000\n    link/ether 8a:68:b7:5b:6b:45 brd ff:ff:ff:ff:ff:ff\n    inet 192.168.0.1/16 scope global br0\n       valid_lft forever preferred_lft forever\n3: tap0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast master br0 state UP group default qlen 1000\n    link/ether 8a:68:b7:5b:6b:45 brd ff:ff:ff:ff:ff:ff\n4: tap1: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast master br0 state UP group default qlen 1000\n    link/ether fa:f8:7f:83:50:8f brd ff:ff:ff:ff:ff:ff\n77: eth0@if78: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default\n    link/ether 02:42:ac:16:00:03 brd ff:ff:ff:ff:ff:ff link-netnsid 0\n    inet 172.22.0.3/16 brd 172.22.255.255 scope global eth0\n       valid_lft forever preferred_lft forever\n\nroot@8333e5cefb0d:/app# ps -ef | grep qemu\nroot          19       8 29 09:15 ?        00:01:26 qemu-system-x86_64 -m 2048 -hda /vm-disks/1/disk.qcow2 -net nic,macaddr=52:54:00:12:34:00 -net tap,ifname=tap0,script=no -monitor telnet::10001,server,nowait -serial telnet::10002,server,nowait -nographic -enable-kvm\nroot          29       8 28 09:15 ?        00:01:24 qemu-system-x86_64 -m 2048 -hda /vm-disks/2/disk.qcow2 -net nic,macaddr=52:54:00:12:34:01 -net tap,ifname=tap1,script=no -monitor telnet::10003,server,nowait -serial telnet::10004,server,nowait -nographic -enable-kvm\n")),(0,o.yg)("p",null,"Here we have 2 virtual machines running.\nEach virtual machine uses a ",(0,o.yg)("inlineCode",{parentName:"p"},"tap")," interface (the ",(0,o.yg)("inlineCode",{parentName:"p"},"-net tap,ifname=tap0,script=no")," parameter for ",(0,o.yg)("inlineCode",{parentName:"p"},"qemu"),").\nThis means that the ",(0,o.yg)("inlineCode",{parentName:"p"},"ens0")," interface inside the virtual machine corresponds to the ",(0,o.yg)("inlineCode",{parentName:"p"},"tap0")," interface outside the virtual machine.\nAll the tap interfaces are bridged together into the ",(0,o.yg)("inlineCode",{parentName:"p"},"br0")," bridge, which has the ip address ",(0,o.yg)("inlineCode",{parentName:"p"},"192.168.0.1"),".\nAlso, each virtual machine has the default gateway configured to be ",(0,o.yg)("inlineCode",{parentName:"p"},"192.168.0.1"),"."),(0,o.yg)("p",null,"In summary, it looks something like this:"),(0,o.yg)("p",null,(0,o.yg)("img",{alt:"os-cloud",src:t(1582).A})),(0,o.yg)("p",null,"All the traffic coming from the virtual machines passes through the ",(0,o.yg)("inlineCode",{parentName:"p"},"br0")," interface.\nSo, in order to make the internet work, all we have to do is a simple ",(0,o.yg)("inlineCode",{parentName:"p"},"NAT"),", with a command like:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-console"},"root@8333e5cefb0d:/app# iptables -t nat -A POSTROUTING -s 192.168.0.0/24 -j MASQUERADE\n")),(0,o.yg)("p",null,"Now, the virtual machines should have internet access:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-console"},'root@8333e5cefb0d:/app# ssh root@192.168.0.2\n[...]\nroot@ubuntu:~# curl google.com\n<HTML><HEAD><meta http-equiv="content-type" content="text/html;charset=utf-8">\n<TITLE>301 Moved</TITLE></HEAD><BODY>\n<H1>301 Moved</H1>\nThe document has moved\n<A HREF="http://www.google.com/">here</A>.\n</BODY></HTML>\n')),(0,o.yg)("p",null,"Now your task is to run the ",(0,o.yg)("inlineCode",{parentName:"p"},"iptables")," command above automatically when the system starts, so that it's not necessary to run it manually like we did in the above example."),(0,o.yg)("p",null,"A good place to do this is in the ",(0,o.yg)("inlineCode",{parentName:"p"},"create_one_network")," function in ",(0,o.yg)("inlineCode",{parentName:"p"},"network.py"),".\nThere you can add another ",(0,o.yg)("inlineCode",{parentName:"p"},"subprocess.run")," call to run ",(0,o.yg)("inlineCode",{parentName:"p"},"iptables"),".\nThe ",(0,o.yg)("inlineCode",{parentName:"p"},"192.168.0.0/24")," value should not be hardcoded, but you can take it from the ",(0,o.yg)("inlineCode",{parentName:"p"},"ip_with_prefixlen")," member of the ",(0,o.yg)("inlineCode",{parentName:"p"},"Net")," object."))}u.isMDXComponent=!0},1582:(e,n,t)=>{t.d(n,{A:()=>a});const a=t.p+"assets/images/os_cloud_networking-c27fac0c5e0a3100a184bf283728b467.svg"}}]);