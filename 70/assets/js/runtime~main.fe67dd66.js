(()=>{"use strict";var e,c,d,a,b={},f={};function t(e){var c=f[e];if(void 0!==c)return c.exports;var d=f[e]={id:e,loaded:!1,exports:{}};return b[e].call(d.exports,d,d.exports,t),d.loaded=!0,d.exports}t.m=b,t.c=f,e=[],t.O=(c,d,a,b)=>{if(!d){var f=1/0;for(i=0;i<e.length;i++){d=e[i][0],a=e[i][1],b=e[i][2];for(var r=!0,o=0;o<d.length;o++)(!1&b||f>=b)&&Object.keys(t.O).every((e=>t.O[e](d[o])))?d.splice(o--,1):(r=!1,b<f&&(f=b));if(r){e.splice(i--,1);var n=a();void 0!==n&&(c=n)}}return c}b=b||0;for(var i=e.length;i>0&&e[i-1][2]>b;i--)e[i]=e[i-1];e[i]=[d,a,b]},t.n=e=>{var c=e&&e.__esModule?()=>e.default:()=>e;return t.d(c,{a:c}),c},d=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__,t.t=function(e,a){if(1&a&&(e=this(e)),8&a)return e;if("object"==typeof e&&e){if(4&a&&e.__esModule)return e;if(16&a&&"function"==typeof e.then)return e}var b=Object.create(null);t.r(b);var f={};c=c||[null,d({}),d([]),d(d)];for(var r=2&a&&e;"object"==typeof r&&!~c.indexOf(r);r=d(r))Object.getOwnPropertyNames(r).forEach((c=>f[c]=()=>e[c]));return f.default=()=>e,t.d(b,f),b},t.d=(e,c)=>{for(var d in c)t.o(c,d)&&!t.o(e,d)&&Object.defineProperty(e,d,{enumerable:!0,get:c[d]})},t.f={},t.e=e=>Promise.all(Object.keys(t.f).reduce(((c,d)=>(t.f[d](e,c),c)),[])),t.u=e=>"assets/js/"+({22:"b95e0710",37:"c7d5d005",99:"4e29cae1",289:"4d19100c",298:"32839693",333:"ddc3a2ab",342:"e4b3f4c8",414:"1ffc5c5f",446:"45bf5b15",480:"d45c1699",517:"5ebe6805",545:"8c873eb8",584:"d309dd16",651:"ce181f15",662:"2c270c24",675:"a7bc80c4",728:"a210c167",729:"5f61d8dd",748:"0e5263e1",770:"94806a34",805:"b4c6c600",808:"9ed79333",879:"634f10a7",923:"374a2386",941:"ef7ad362",1072:"5b6afb49",1078:"ab4aa734",1085:"6bda9475",1092:"5894dc17",1094:"3c53deb0",1118:"ed8bb14c",1132:"e97468aa",1169:"0275a3b2",1193:"3e3393a3",1209:"0b4c16a1",1269:"6b326dfe",1280:"6523baf0",1297:"884a035c",1349:"ce1cacf4",1370:"1548d5c7",1392:"4c341edc",1410:"007cf997",1419:"d2954435",1498:"6e6d1670",1643:"63c434c4",1693:"de2a6172",1714:"cd9eb992",1727:"8de34314",1759:"6e95b748",1820:"59717f02",1841:"e46ccb2a",1918:"9b172a36",1961:"a2a02518",2026:"fdef1607",2036:"05813244",2122:"144ccec8",2147:"6752448d",2213:"463aadd7",2242:"c4d6228b",2278:"23374ca6",2289:"cbc996c5",2306:"ebbaca72",2334:"b5c587af",2360:"1e0b7734",2429:"b407248a",2442:"4dcbb9e2",2464:"392776e2",2468:"46e15c1d",2608:"009e58e9",2851:"0fa0bebd",3005:"a0d8a9b9",3092:"8d5b82ca",3127:"997e6ee2",3141:"60c99274",3163:"96a31749",3193:"2e030903",3204:"9fb23397",3270:"d5aa9830",3284:"59ad4d8f",3301:"0d65b9df",3305:"fecbe7cc",3383:"c4b5fe4e",3385:"71907c1d",3403:"a8d01eab",3498:"ff6889c3",3501:"c92640ae",3508:"918b3e21",3537:"fbc1cab8",3622:"2c048fa9",3641:"e5394bc7",3686:"97fe4cb3",3700:"7e98c1d8",3706:"747ded37",3745:"f59c56ce",3748:"2bf71d30",3830:"7fcd029b",3904:"a0061be8",3946:"51e6f6aa",3972:"1891e676",3986:"58e12640",4003:"43a62a67",4035:"924f80ad",4060:"15f618ea",4126:"e3a89e97",4134:"393be207",4143:"34e67e00",4144:"ea490624",4201:"0438abee",4222:"a0ac5395",4226:"98c71577",4245:"ce0d7f6c",4256:"ab432f0e",4298:"83d110b2",4338:"c2609098",4467:"ca978206",4512:"34746f8c",4555:"b09f8b85",4639:"18519af9",4641:"be36e4af",4711:"d6fc9938",4757:"d6e5c209",4774:"1598f1cb",4789:"8ec866b0",4836:"65ab3714",4886:"9f99d3fc",4907:"94458749",4932:"70ad9ac2",5004:"fc7881a9",5044:"0f890721",5046:"96f28031",5064:"ade537b6",5150:"18331331",5214:"926d7fb7",5232:"6e8edd23",5347:"2895d02b",5557:"a191e07d",5623:"6e6dee7f",5652:"2bde47d5",5653:"a315d4d8",5824:"81ef98dd",5918:"577dcf4c",5950:"ce0fb4ef",6001:"0b9ed770",6020:"b0d828e0",6061:"1f391b9e",6082:"09e11287",6142:"a3f724e5",6152:"7f023807",6241:"677bfb31",6248:"5d7f8186",6311:"aecc3d85",6423:"e4121aec",6434:"3c30233f",6504:"49cee3f0",6506:"1532e76f",6523:"05566e9d",6627:"60905a9d",6657:"64c54105",6669:"ca6b73ec",6822:"59897f9f",6889:"31a6b50d",6907:"cd9c6ad6",6922:"8e67071a",6969:"14eb3368",6976:"2828cd91",7010:"ac5c3a27",7173:"267b5415",7188:"bc288ac4",7271:"cc8fb1fa",7308:"ce18b468",7341:"9846e945",7354:"0bbd68f9",7360:"95637cbd",7476:"f54b55c1",7600:"53b67169",7657:"fedaf6f6",7742:"10a540c5",7753:"e88d4a6f",7757:"a0991c07",7778:"8f35a413",7824:"3e17b32d",7841:"14580385",7858:"1ef36804",7957:"2641b427",8024:"62d6cabc",8060:"50ed9da3",8065:"35edd654",8134:"14ee73ae",8139:"1ae4d9c9",8334:"d754500f",8338:"2e088525",8361:"ed4e77cc",8365:"a76a4d9b",8393:"5b157b4b",8401:"17896441",8566:"6e77dc18",8581:"935f2afb",8629:"65687b6f",8661:"625a19b4",8665:"092edce8",8697:"1dccb566",8714:"1be78505",8784:"a30371b6",8800:"0c19000f",8815:"71aa02c5",8838:"8209a29d",8864:"d92a3c43",8871:"89d3ad7d",8878:"4e22cab6",8892:"f6eb4965",8899:"bdd18817",9034:"e0921ae2",9078:"b4b556e2",9088:"6c180aec",9111:"bad01ddd",9113:"03dc0c9b",9223:"928d0c11",9278:"e7d4c09c",9332:"21e67fd6",9347:"232c749b",9352:"0277d735",9382:"76fa263d",9446:"4bb7e290",9462:"31b22d21",9482:"dade2520",9544:"c54826dc",9598:"9da4d61d",9599:"115ae520",9612:"f4dcab90",9614:"41c8b4f1",9619:"78095748",9620:"8ca589d3",9647:"4c165629",9704:"91ac0728",9759:"81b85611",9795:"3e478533",9979:"2760b5dd"}[e]||e)+"."+{22:"fbd5a362",37:"427e2f73",99:"159d7508",289:"866356d9",298:"4684957e",333:"49f9b2ee",342:"231dfc27",414:"17efb611",446:"af90cfe9",480:"0970cdc3",517:"6c57f534",545:"ad364347",584:"cd826b54",651:"dbc8fb3a",662:"dfec785c",675:"3aac6c94",728:"38d53413",729:"6d6fb7e0",748:"4d8ff5b4",770:"76951204",805:"3dcdcc10",808:"4696cae4",879:"a5fd60dd",923:"4e8b8de8",941:"c3b5740e",1072:"3a65ed60",1078:"c87c3bbc",1085:"38d77cba",1092:"d20cb6ff",1094:"acf880d3",1118:"c5951955",1132:"0923dbc0",1169:"65fc1d86",1193:"7b3e756c",1209:"fbb9a209",1269:"db3315b4",1280:"6b3d636d",1297:"f78bace0",1349:"68e1659b",1370:"248c4b27",1392:"7ae30bd8",1410:"6f883196",1419:"848ef54a",1498:"86813c23",1643:"5128ee68",1693:"a69b5c4b",1714:"33d3219f",1727:"dae9d5bd",1759:"f728634f",1774:"ffe8feb8",1820:"2878344d",1841:"a4596316",1918:"a383eecb",1961:"2a68d498",2026:"45104e72",2036:"60669cd2",2122:"94885c18",2147:"98c0d423",2213:"f93e0936",2242:"ae67d255",2278:"808a45a9",2289:"dc8affa1",2306:"ca86269c",2334:"aaabeb03",2360:"ef45faaa",2429:"60a9dc89",2442:"045a4a76",2464:"5ab23048",2468:"f0ef67b9",2608:"b46d97f7",2851:"37593888",3005:"229daea7",3092:"79a58449",3127:"a119e808",3141:"2d6bc979",3163:"db3b317f",3193:"2affc3b2",3204:"bb13cab1",3270:"a32608bb",3284:"cad7e7bf",3301:"4326e890",3305:"6bf770e1",3383:"5af8cad8",3385:"50a0d9a1",3403:"c53c7880",3498:"fdcd11c8",3501:"cd8a0d2e",3508:"9dabf180",3537:"28942b37",3622:"4c62b244",3641:"f6b6d1bd",3686:"7b7f8d19",3700:"7a68d6cc",3706:"734b51f4",3745:"629c17fe",3748:"d0ba5c5d",3830:"7b951d76",3904:"a8076b73",3946:"e45fe716",3972:"8a60e300",3986:"dc286260",4003:"d44c40bf",4035:"2d6d83e0",4060:"51c8c60b",4126:"83f69bfe",4134:"8b740993",4143:"cee52feb",4144:"e514d87b",4201:"9a7d2ace",4222:"9cedc458",4226:"415db9f4",4245:"4b5bebe9",4256:"f4ac6147",4298:"4a2754c9",4338:"1f277733",4467:"013074a0",4512:"963e56bd",4555:"c0bee5d9",4567:"79627e09",4639:"b25bbc8d",4641:"af0c9d08",4711:"83256061",4757:"3b4d14a7",4774:"6e1aee58",4789:"790362a3",4836:"3fc6646a",4886:"a80ceafe",4907:"922c9732",4932:"a251639b",5004:"f8133798",5044:"ddeb397b",5046:"00ce14d8",5064:"2fb45253",5150:"7e3e320c",5214:"7ff7ade8",5232:"1a5f8b91",5347:"d1762238",5557:"7c6f9c26",5623:"a9e318b8",5652:"784f6385",5653:"54a9fe21",5824:"73442f24",5918:"8e3ed9ed",5950:"9ba3cf45",6001:"7d22f908",6020:"0890ddf7",6061:"1d436071",6082:"3cc3d7d9",6142:"5ba85818",6152:"3ce37bb4",6241:"6641e084",6248:"17eef585",6311:"ddc98d90",6423:"c01c3c63",6434:"5a426baa",6504:"48a959df",6506:"3f8c1879",6523:"4e1b882c",6627:"5f1e3d75",6657:"ddae9188",6669:"abaf4d5e",6822:"c4530e5b",6889:"48bbc0f8",6907:"557911e1",6922:"cc09f105",6969:"050c38c9",6976:"179db66f",7010:"5436f5ca",7173:"4f7d149e",7188:"db8efc4a",7271:"4104e31a",7308:"5d0f7f66",7341:"39234c5c",7354:"c1fd41e0",7360:"80296923",7476:"57a581f6",7600:"295cbdc3",7657:"23a85cfc",7742:"4cafe2b7",7753:"1a0b2751",7757:"350f629e",7778:"d1cc6d5d",7824:"abe909ca",7841:"aea7ae64",7858:"df415bb5",7957:"f7cf09fc",8024:"efa63565",8060:"b6db9349",8065:"c6cd9ac3",8134:"ffb75e64",8139:"26bf8471",8334:"93beab07",8338:"1f5bee1f",8361:"103ef4a7",8365:"528edc3b",8393:"34091803",8401:"3d4a71db",8566:"7c75f522",8581:"ff5fe63a",8629:"3a78c342",8661:"fd3a39c4",8665:"6ef36760",8697:"79b3dd3e",8714:"92627245",8784:"773278d8",8800:"ba0fc18d",8815:"711a5a9f",8838:"ee069927",8864:"d4f3712f",8871:"b38a88f5",8878:"4b9af96f",8892:"4e552ead",8899:"3ffbb056",9034:"37ede0db",9078:"2de42bf2",9088:"d94265cd",9111:"d628074e",9113:"d07776fe",9223:"c24aab94",9278:"f1d93588",9332:"e69187c7",9347:"15f3e417",9352:"851f5bdd",9382:"608cc5ba",9446:"3a496355",9462:"4a65b4fd",9482:"793b0971",9544:"f0678fac",9598:"4b7042b1",9599:"c75c9981",9612:"ee88016c",9614:"01534b6f",9619:"7c85ac13",9620:"0a1d410e",9647:"ea55fe9f",9704:"eca7db23",9759:"b3bdbefb",9795:"42e9c403",9979:"42783040"}[e]+".js",t.miniCssF=e=>{},t.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),t.o=(e,c)=>Object.prototype.hasOwnProperty.call(e,c),a={},t.l=(e,c,d,b)=>{if(a[e])a[e].push(c);else{var f,r;if(void 0!==d)for(var o=document.getElementsByTagName("script"),n=0;n<o.length;n++){var i=o[n];if(i.getAttribute("src")==e||i.getAttribute("data-webpack")=="so:"+d){f=i;break}}f||(r=!0,(f=document.createElement("script")).charset="utf-8",f.timeout=120,t.nc&&f.setAttribute("nonce",t.nc),f.setAttribute("data-webpack","so:"+d),f.src=e),a[e]=[c];var u=(c,d)=>{f.onerror=f.onload=null,clearTimeout(l);var b=a[e];if(delete a[e],f.parentNode&&f.parentNode.removeChild(f),b&&b.forEach((e=>e(d))),c)return c(d)},l=setTimeout(u.bind(null,void 0,{type:"timeout",target:f}),12e4);f.onerror=u.bind(null,f.onerror),f.onload=u.bind(null,f.onload),r&&document.head.appendChild(f)}},t.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.p="/operating-systems/70/",t.gca=function(e){return e={14580385:"7841",17896441:"8401",18331331:"5150",32839693:"298",78095748:"9619",94458749:"4907",b95e0710:"22",c7d5d005:"37","4e29cae1":"99","4d19100c":"289",ddc3a2ab:"333",e4b3f4c8:"342","1ffc5c5f":"414","45bf5b15":"446",d45c1699:"480","5ebe6805":"517","8c873eb8":"545",d309dd16:"584",ce181f15:"651","2c270c24":"662",a7bc80c4:"675",a210c167:"728","5f61d8dd":"729","0e5263e1":"748","94806a34":"770",b4c6c600:"805","9ed79333":"808","634f10a7":"879","374a2386":"923",ef7ad362:"941","5b6afb49":"1072",ab4aa734:"1078","6bda9475":"1085","5894dc17":"1092","3c53deb0":"1094",ed8bb14c:"1118",e97468aa:"1132","0275a3b2":"1169","3e3393a3":"1193","0b4c16a1":"1209","6b326dfe":"1269","6523baf0":"1280","884a035c":"1297",ce1cacf4:"1349","1548d5c7":"1370","4c341edc":"1392","007cf997":"1410",d2954435:"1419","6e6d1670":"1498","63c434c4":"1643",de2a6172:"1693",cd9eb992:"1714","8de34314":"1727","6e95b748":"1759","59717f02":"1820",e46ccb2a:"1841","9b172a36":"1918",a2a02518:"1961",fdef1607:"2026","05813244":"2036","144ccec8":"2122","6752448d":"2147","463aadd7":"2213",c4d6228b:"2242","23374ca6":"2278",cbc996c5:"2289",ebbaca72:"2306",b5c587af:"2334","1e0b7734":"2360",b407248a:"2429","4dcbb9e2":"2442","392776e2":"2464","46e15c1d":"2468","009e58e9":"2608","0fa0bebd":"2851",a0d8a9b9:"3005","8d5b82ca":"3092","997e6ee2":"3127","60c99274":"3141","96a31749":"3163","2e030903":"3193","9fb23397":"3204",d5aa9830:"3270","59ad4d8f":"3284","0d65b9df":"3301",fecbe7cc:"3305",c4b5fe4e:"3383","71907c1d":"3385",a8d01eab:"3403",ff6889c3:"3498",c92640ae:"3501","918b3e21":"3508",fbc1cab8:"3537","2c048fa9":"3622",e5394bc7:"3641","97fe4cb3":"3686","7e98c1d8":"3700","747ded37":"3706",f59c56ce:"3745","2bf71d30":"3748","7fcd029b":"3830",a0061be8:"3904","51e6f6aa":"3946","1891e676":"3972","58e12640":"3986","43a62a67":"4003","924f80ad":"4035","15f618ea":"4060",e3a89e97:"4126","393be207":"4134","34e67e00":"4143",ea490624:"4144","0438abee":"4201",a0ac5395:"4222","98c71577":"4226",ce0d7f6c:"4245",ab432f0e:"4256","83d110b2":"4298",c2609098:"4338",ca978206:"4467","34746f8c":"4512",b09f8b85:"4555","18519af9":"4639",be36e4af:"4641",d6fc9938:"4711",d6e5c209:"4757","1598f1cb":"4774","8ec866b0":"4789","65ab3714":"4836","9f99d3fc":"4886","70ad9ac2":"4932",fc7881a9:"5004","0f890721":"5044","96f28031":"5046",ade537b6:"5064","926d7fb7":"5214","6e8edd23":"5232","2895d02b":"5347",a191e07d:"5557","6e6dee7f":"5623","2bde47d5":"5652",a315d4d8:"5653","81ef98dd":"5824","577dcf4c":"5918",ce0fb4ef:"5950","0b9ed770":"6001",b0d828e0:"6020","1f391b9e":"6061","09e11287":"6082",a3f724e5:"6142","7f023807":"6152","677bfb31":"6241","5d7f8186":"6248",aecc3d85:"6311",e4121aec:"6423","3c30233f":"6434","49cee3f0":"6504","1532e76f":"6506","05566e9d":"6523","60905a9d":"6627","64c54105":"6657",ca6b73ec:"6669","59897f9f":"6822","31a6b50d":"6889",cd9c6ad6:"6907","8e67071a":"6922","14eb3368":"6969","2828cd91":"6976",ac5c3a27:"7010","267b5415":"7173",bc288ac4:"7188",cc8fb1fa:"7271",ce18b468:"7308","9846e945":"7341","0bbd68f9":"7354","95637cbd":"7360",f54b55c1:"7476","53b67169":"7600",fedaf6f6:"7657","10a540c5":"7742",e88d4a6f:"7753",a0991c07:"7757","8f35a413":"7778","3e17b32d":"7824","1ef36804":"7858","2641b427":"7957","62d6cabc":"8024","50ed9da3":"8060","35edd654":"8065","14ee73ae":"8134","1ae4d9c9":"8139",d754500f:"8334","2e088525":"8338",ed4e77cc:"8361",a76a4d9b:"8365","5b157b4b":"8393","6e77dc18":"8566","935f2afb":"8581","65687b6f":"8629","625a19b4":"8661","092edce8":"8665","1dccb566":"8697","1be78505":"8714",a30371b6:"8784","0c19000f":"8800","71aa02c5":"8815","8209a29d":"8838",d92a3c43:"8864","89d3ad7d":"8871","4e22cab6":"8878",f6eb4965:"8892",bdd18817:"8899",e0921ae2:"9034",b4b556e2:"9078","6c180aec":"9088",bad01ddd:"9111","03dc0c9b":"9113","928d0c11":"9223",e7d4c09c:"9278","21e67fd6":"9332","232c749b":"9347","0277d735":"9352","76fa263d":"9382","4bb7e290":"9446","31b22d21":"9462",dade2520:"9482",c54826dc:"9544","9da4d61d":"9598","115ae520":"9599",f4dcab90:"9612","41c8b4f1":"9614","8ca589d3":"9620","4c165629":"9647","91ac0728":"9704","81b85611":"9759","3e478533":"9795","2760b5dd":"9979"}[e]||e,t.p+t.u(e)},(()=>{var e={5354:0,1869:0};t.f.j=(c,d)=>{var a=t.o(e,c)?e[c]:void 0;if(0!==a)if(a)d.push(a[2]);else if(/^(1869|5354)$/.test(c))e[c]=0;else{var b=new Promise(((d,b)=>a=e[c]=[d,b]));d.push(a[2]=b);var f=t.p+t.u(c),r=new Error;t.l(f,(d=>{if(t.o(e,c)&&(0!==(a=e[c])&&(e[c]=void 0),a)){var b=d&&("load"===d.type?"missing":d.type),f=d&&d.target&&d.target.src;r.message="Loading chunk "+c+" failed.\n("+b+": "+f+")",r.name="ChunkLoadError",r.type=b,r.request=f,a[1](r)}}),"chunk-"+c,c)}},t.O.j=c=>0===e[c];var c=(c,d)=>{var a,b,f=d[0],r=d[1],o=d[2],n=0;if(f.some((c=>0!==e[c]))){for(a in r)t.o(r,a)&&(t.m[a]=r[a]);if(o)var i=o(t)}for(c&&c(d);n<f.length;n++)b=f[n],t.o(e,b)&&e[b]&&e[b][0](),e[b]=0;return t.O(i)},d=self.webpackChunkso=self.webpackChunkso||[];d.forEach(c.bind(null,0)),d.push=c.bind(null,d.push.bind(d))})()})();