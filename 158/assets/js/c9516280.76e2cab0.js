"use strict";(self.webpackChunkso=self.webpackChunkso||[]).push([[313],{5680:(e,t,n)=>{n.d(t,{xA:()=>g,yg:()=>m});var r=n(6540);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=r.createContext({}),p=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},g=function(e){var t=p(e.components);return r.createElement(l.Provider,{value:t},e.children)},c="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},y=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,g=i(e,["components","mdxType","originalType","parentName"]),c=p(n),y=a,m=c["".concat(l,".").concat(y)]||c[y]||u[y]||o;return n?r.createElement(m,s(s({ref:t},g),{},{components:n})):r.createElement(m,s({ref:t},g))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,s=new Array(o);s[0]=y;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i[c]="string"==typeof e?e:a,s[1]=i;for(var p=2;p<o;p++)s[p]=n[p];return r.createElement.apply(null,s)}return r.createElement.apply(null,n)}y.displayName="MDXCreateElement"},8917:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>s,default:()=>u,frontMatter:()=>o,metadata:()=>i,toc:()=>p});var r=n(8168),a=(n(6540),n(5680));const o={},s="Setting up the Lab Environment",i={unversionedId:"lab-setup",id:"lab-setup",title:"Setting up the Lab Environment",description:"Prerequisites",source:"@site/docs/lab-setup.md",sourceDirName:".",slug:"/lab-setup",permalink:"/operating-systems/158/lab-setup",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"Operating Systems",permalink:"/operating-systems/158/"},next:{title:"Software Stack",permalink:"/operating-systems/158/Software Stack/"}},l={},p=[{value:"Prerequisites",id:"prerequisites",level:2},{value:"Cloning the repository",id:"cloning-the-repository",level:2},{value:"Getting the latest changes",id:"getting-the-latest-changes",level:2},{value:"Save Progress and Prepare next lab",id:"save-progress-and-prepare-next-lab",level:2}],g={toc:p},c="wrapper";function u(e){let{components:t,...n}=e;return(0,a.yg)(c,(0,r.A)({},g,n,{components:t,mdxType:"MDXLayout"}),(0,a.yg)("h1",{id:"setting-up-the-lab-environment"},"Setting up the Lab Environment"),(0,a.yg)("h2",{id:"prerequisites"},"Prerequisites"),(0,a.yg)("p",null,"You can work on any Linux setup (native install, ",(0,a.yg)("inlineCode",{parentName:"p"},"WSL"),", ",(0,a.yg)("inlineCode",{parentName:"p"},"VM"),"), but we strongly recommend you use the ",(0,a.yg)("a",{parentName:"p",href:"https://cs-pub-ro.github.io/operating-systems/resources#virtual-machine"},(0,a.yg)("inlineCode",{parentName:"a"},"operating-systems")," class VMs"),"."),(0,a.yg)("h2",{id:"cloning-the-repository"},"Cloning the repository"),(0,a.yg)("p",null,"If you haven't already cloned the repository, do so and you are ready to go:"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-console"},"student@os:~$ git clone https://github.com/cs-pub-ro/operating-systems.git\nstudent@os:~$ cd operating-systems\n")),(0,a.yg)("h2",{id:"getting-the-latest-changes"},"Getting the latest changes"),(0,a.yg)("p",null,"Each time you start a new laboratory, you should ensure you have the latest changes.\nIf you have no local changes, you can simply run ",(0,a.yg)("inlineCode",{parentName:"p"},"git pull")," and you are ready to go:"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-console"},'student@os:~$ cd operating-systems\nstudent@os:~/operating-systems$ git status  # Check if you have unstaged changes\nOn branch <not-important>\nnothing to commit, working tree clean\n\n# "working tree clean" means that you have no changes\nstudent@os:~/operating-systems$ git pull --rebase\n')),(0,a.yg)("p",null,"If the ",(0,a.yg)("inlineCode",{parentName:"p"},"git status")," output differs, follow the ",(0,a.yg)("a",{parentName:"p",href:"#save-progress-and-prepare-next-lab"},"instructions to save your progress"),"."),(0,a.yg)("h2",{id:"save-progress-and-prepare-next-lab"},"Save Progress and Prepare next lab"),(0,a.yg)("ol",null,(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"Check if you have unstaged changes that might be lost:"),(0,a.yg)("pre",{parentName:"li"},(0,a.yg)("code",{parentName:"pre",className:"language-console"},'student@os:~$ cd operating-systems\nstudent@os:~/operating-systems$ git status\nOn branch <not-important>\nChanges not staged for commit:\n(use "git add <file>..." to update what will be committed)\n(use "git restore <file>..." to discard changes in working directory)\n        modified:   main.c\n')),(0,a.yg)("p",{parentName:"li"},"If ",(0,a.yg)("inlineCode",{parentName:"p"},"git status"),' states "work tree clean", you should follow the ',(0,a.yg)("a",{parentName:"p",href:"#getting-the-latest-changes"},"instructions to pull latest changes")," instead.")),(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"Create a commit to store your changes:"),(0,a.yg)("pre",{parentName:"li"},(0,a.yg)("code",{parentName:"pre",className:"language-console"},'student@os:~/operating-systems$ git add -f .  # Use -f as `support/` directories are ignored\nstudent@os:~/operating-systems$ git commit -m "Store progress for lab X"\nstudent@os:~/operating-systems$ git status    # double check that everything was committed\nOn branch <not-important>\nnothing to commit, working tree clean\n'))),(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"Create a new branch for lab Y:"),(0,a.yg)("pre",{parentName:"li"},(0,a.yg)("code",{parentName:"pre",className:"language-console"},"student@os:~/operating-systems$ git checkout -b lab-Y main  # Replace Y with lab number\nstudent@os:~/operating-systems$ git pull origin main        # Get latest changes from origin/main\n"))),(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"(Optional) Finding previous labs"),(0,a.yg)("p",{parentName:"li"},"Assuming you followed the instructions in this section, you can find your previous work on other branches:"),(0,a.yg)("pre",{parentName:"li"},(0,a.yg)("code",{parentName:"pre",className:"language-console"},"student@os:~/operating-systems$ git branch\nmain\nlab-1\nlab-2\n* lab-3\nstudent@os:~/operating-systems$ git checkout lab-2\nSwitched to branch 'lab-2'\n")))))}u.isMDXComponent=!0}}]);