(()=>{"use strict";var e,c,d,a,b={},f={};function t(e){var c=f[e];if(void 0!==c)return c.exports;var d=f[e]={id:e,loaded:!1,exports:{}};return b[e].call(d.exports,d,d.exports,t),d.loaded=!0,d.exports}t.m=b,t.c=f,e=[],t.O=(c,d,a,b)=>{if(!d){var f=1/0;for(i=0;i<e.length;i++){d=e[i][0],a=e[i][1],b=e[i][2];for(var r=!0,o=0;o<d.length;o++)(!1&b||f>=b)&&Object.keys(t.O).every((e=>t.O[e](d[o])))?d.splice(o--,1):(r=!1,b<f&&(f=b));if(r){e.splice(i--,1);var n=a();void 0!==n&&(c=n)}}return c}b=b||0;for(var i=e.length;i>0&&e[i-1][2]>b;i--)e[i]=e[i-1];e[i]=[d,a,b]},t.n=e=>{var c=e&&e.__esModule?()=>e.default:()=>e;return t.d(c,{a:c}),c},d=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__,t.t=function(e,a){if(1&a&&(e=this(e)),8&a)return e;if("object"==typeof e&&e){if(4&a&&e.__esModule)return e;if(16&a&&"function"==typeof e.then)return e}var b=Object.create(null);t.r(b);var f={};c=c||[null,d({}),d([]),d(d)];for(var r=2&a&&e;"object"==typeof r&&!~c.indexOf(r);r=d(r))Object.getOwnPropertyNames(r).forEach((c=>f[c]=()=>e[c]));return f.default=()=>e,t.d(b,f),b},t.d=(e,c)=>{for(var d in c)t.o(c,d)&&!t.o(e,d)&&Object.defineProperty(e,d,{enumerable:!0,get:c[d]})},t.f={},t.e=e=>Promise.all(Object.keys(t.f).reduce(((c,d)=>(t.f[d](e,c),c)),[])),t.u=e=>"assets/js/"+({22:"b95e0710",37:"c7d5d005",99:"4e29cae1",289:"4d19100c",298:"32839693",333:"ddc3a2ab",342:"e4b3f4c8",414:"1ffc5c5f",429:"6d6bd992",446:"45bf5b15",480:"d45c1699",517:"5ebe6805",545:"8c873eb8",584:"d309dd16",639:"cb87f1fe",651:"ce181f15",662:"2c270c24",675:"a7bc80c4",728:"a210c167",729:"5f61d8dd",746:"88bdb643",747:"f9bb2c6d",748:"0e5263e1",770:"94806a34",805:"b4c6c600",840:"e12c2f9c",879:"634f10a7",923:"374a2386",924:"713874cf",941:"ef7ad362",1045:"16423f1e",1078:"ab4aa734",1085:"6bda9475",1092:"5894dc17",1118:"ed8bb14c",1169:"0275a3b2",1193:"3e3393a3",1209:"0b4c16a1",1269:"6b326dfe",1280:"6523baf0",1349:"ce1cacf4",1370:"1548d5c7",1392:"4c341edc",1410:"007cf997",1419:"d2954435",1643:"63c434c4",1663:"a0634f7a",1693:"de2a6172",1714:"cd9eb992",1727:"8de34314",1759:"6e95b748",1841:"e46ccb2a",1850:"27b8e71e",1918:"9b172a36",1961:"a2a02518",2009:"500c8b44",2026:"fdef1607",2036:"05813244",2122:"144ccec8",2166:"bdb7b057",2213:"463aadd7",2242:"c4d6228b",2278:"23374ca6",2289:"cbc996c5",2306:"ebbaca72",2334:"b5c587af",2360:"1e0b7734",2382:"31570f9d",2429:"b407248a",2464:"392776e2",2505:"9f99d3fc",2608:"009e58e9",2851:"0fa0bebd",3005:"a0d8a9b9",3019:"01b608bc",3092:"8d5b82ca",3127:"997e6ee2",3163:"96a31749",3193:"2e030903",3204:"9fb23397",3270:"d5aa9830",3276:"ac36c07d",3284:"59ad4d8f",3301:"0d65b9df",3305:"fecbe7cc",3383:"c4b5fe4e",3385:"71907c1d",3403:"a8d01eab",3445:"6321ecbb",3501:"c92640ae",3508:"918b3e21",3537:"fbc1cab8",3686:"97fe4cb3",3700:"7e98c1d8",3706:"747ded37",3748:"2bf71d30",3899:"b14e8f3e",3946:"51e6f6aa",3972:"1891e676",3986:"58e12640",4035:"924f80ad",4060:"15f618ea",4108:"b0285bd9",4126:"e3a89e97",4134:"393be207",4144:"ea490624",4201:"0438abee",4205:"40c67df2",4222:"a0ac5395",4226:"98c71577",4245:"ce0d7f6c",4298:"83d110b2",4338:"c2609098",4420:"cf57ac2f",4467:"ca978206",4512:"34746f8c",4639:"18519af9",4641:"be36e4af",4711:"d6fc9938",4734:"a92f7dfd",4757:"d6e5c209",4789:"8ec866b0",4836:"65ab3714",4837:"05c3ebc5",4886:"014e9e61",4907:"94458749",4932:"70ad9ac2",5004:"fc7881a9",5044:"0f890721",5046:"96f28031",5050:"fdc3d867",5064:"ade537b6",5150:"18331331",5172:"d526455d",5214:"926d7fb7",5232:"6e8edd23",5319:"5287e4b3",5347:"2895d02b",5356:"659eea6f",5456:"61e8e329",5528:"506aef51",5557:"a191e07d",5623:"6e6dee7f",5652:"2bde47d5",5653:"a315d4d8",5676:"b29235e9",5821:"d3a06000",5824:"81ef98dd",5918:"577dcf4c",5997:"7e59bc30",6001:"0b9ed770",6020:"b0d828e0",6061:"1f391b9e",6082:"09e11287",6142:"a3f724e5",6152:"7f023807",6241:"677bfb31",6248:"5d7f8186",6311:"aecc3d85",6347:"8c8c1be6",6434:"3c30233f",6504:"49cee3f0",6506:"1532e76f",6627:"60905a9d",6669:"ca6b73ec",6822:"59897f9f",6824:"46758dd5",6889:"31a6b50d",6969:"14eb3368",6976:"2828cd91",7010:"ac5c3a27",7173:"267b5415",7188:"bc288ac4",7271:"cc8fb1fa",7341:"9846e945",7354:"0bbd68f9",7360:"95637cbd",7476:"f54b55c1",7657:"fedaf6f6",7742:"10a540c5",7753:"e88d4a6f",7778:"8f35a413",7824:"3e17b32d",7841:"14580385",7858:"1ef36804",7957:"2641b427",8033:"cfecf120",8060:"50ed9da3",8065:"35edd654",8066:"81244046",8134:"14ee73ae",8139:"1ae4d9c9",8334:"d754500f",8338:"2e088525",8361:"ed4e77cc",8365:"a76a4d9b",8393:"5b157b4b",8401:"17896441",8405:"601205bf",8501:"7255df12",8566:"6e77dc18",8581:"935f2afb",8629:"65687b6f",8661:"625a19b4",8665:"092edce8",8697:"1dccb566",8714:"1be78505",8800:"0c19000f",8815:"71aa02c5",8838:"8209a29d",8864:"d92a3c43",8871:"89d3ad7d",8892:"f6eb4965",8899:"bdd18817",9034:"e0921ae2",9088:"6c180aec",9113:"03dc0c9b",9159:"0e26d3b8",9223:"928d0c11",9278:"e7d4c09c",9332:"21e67fd6",9347:"232c749b",9352:"0277d735",9378:"275698a5",9446:"4bb7e290",9462:"31b22d21",9466:"faef2eac",9482:"dade2520",9544:"c54826dc",9612:"f4dcab90",9613:"16929236",9614:"41c8b4f1",9619:"78095748",9620:"8ca589d3",9647:"4c165629",9704:"91ac0728",9759:"81b85611",9795:"3e478533",9880:"45c914d5",9979:"2760b5dd"}[e]||e)+"."+{22:"07e862ff",37:"e597b89d",99:"41138446",289:"1dd2af99",298:"70b3bdf7",333:"2d9e5a42",342:"35b826ed",414:"65547d9e",429:"e8f665d2",446:"ac3d6f80",480:"13091e37",517:"3123d745",545:"4fab572f",584:"be55c07d",639:"46ce9523",651:"be5ec4eb",662:"9fa3b005",675:"2b5dbfea",728:"cd7f8236",729:"c01a4906",746:"51b5e352",747:"f66d86a4",748:"885eb6c5",770:"3ad12122",805:"c9e1c6e9",840:"ab930309",879:"411dc37c",923:"c8a2b905",924:"9b90498f",941:"d3f17af5",1045:"44bbc2e3",1078:"7048f2ac",1085:"4eedfaa0",1092:"d5f21a77",1118:"0f5e1c25",1169:"6e9444a7",1193:"d97abf85",1209:"bb8f5144",1269:"db3315b4",1280:"1918fcf4",1349:"26ff9b60",1370:"87e27e6c",1392:"77fa8849",1410:"9393eb49",1419:"59c339b7",1643:"2f27e0d6",1663:"a3778c1d",1693:"727096fe",1714:"6fa2069f",1727:"08890637",1759:"bd6c996f",1774:"ffe8feb8",1841:"17d09f1b",1850:"325e34f2",1918:"df1b269a",1961:"3b778685",2009:"7bdd87fe",2026:"9c5ff5f6",2036:"a219ac42",2122:"8e9586ae",2166:"795f46b7",2213:"78807266",2242:"b53e149c",2278:"f4769d54",2289:"7c81f233",2306:"c04ab6d0",2334:"0c0a99f1",2360:"480c34f4",2382:"64e70549",2429:"0b7ee9e9",2464:"c614fe05",2505:"85a28f5a",2608:"61912752",2851:"6d1280dd",3005:"694cfe93",3019:"1629af33",3092:"92530c57",3127:"08f788e0",3163:"847477a2",3193:"88029066",3204:"d201428f",3270:"7d43df62",3276:"14cecb04",3284:"c7712b89",3301:"9b644e22",3305:"a4ee6d7b",3383:"bb3087d5",3385:"1eb2c8de",3403:"d0f3ba7d",3445:"d33986ef",3501:"cfd49bae",3508:"385b004a",3537:"7f0ca017",3686:"be8de25c",3700:"99ce7f7b",3706:"3ee2c2c1",3748:"c7054350",3899:"ec2dc1b0",3946:"194e0213",3972:"a1b74c37",3986:"6d8ab863",4035:"58c99ae7",4060:"0c4f4a80",4108:"e749ca78",4126:"d234762b",4134:"01e9985e",4144:"201f1fec",4201:"39cf4b9f",4205:"b81164ea",4222:"83d194d8",4226:"b2c42b92",4245:"4db5fd97",4298:"64461b31",4338:"b1b1824a",4420:"9a4a4e7c",4467:"16a5bc25",4512:"0f0cde85",4567:"ec7a4b29",4639:"5fc47a68",4641:"c02a0740",4711:"f2118184",4734:"ec570140",4757:"11733372",4789:"575b13c0",4836:"fa79ccc8",4837:"c35d4a03",4886:"17b47daf",4907:"71ad6b63",4932:"a3664d07",5004:"373f9b0b",5044:"1e4ef87b",5046:"7da46940",5050:"da6b5ef6",5064:"ad4d0515",5150:"7e3e320c",5172:"0948e4e8",5214:"4dcab135",5232:"7e66eff3",5319:"0ac5b639",5347:"e883e7b8",5356:"e9d6f06b",5456:"dfec717e",5528:"3d772684",5557:"5c61ce18",5623:"d04a9795",5652:"a6ebb1d4",5653:"14b1b72f",5676:"7a992fde",5821:"b24fdc18",5824:"8c4ae73f",5918:"d4ff52e7",5997:"45c79587",6001:"283ff304",6020:"5223012c",6061:"1d436071",6082:"84155ab7",6142:"96d6aff5",6152:"fd2586f5",6241:"ad1b02fa",6248:"3a634c14",6311:"aeb23171",6347:"9a69b630",6434:"bbeecef1",6504:"173bda30",6506:"aec8c56c",6627:"6b34853f",6669:"065c6a3d",6822:"91cb970e",6824:"09650e1f",6889:"02c1b013",6969:"050c38c9",6976:"3363c094",7010:"f66e4381",7173:"50d6693b",7188:"68332047",7271:"114f3b7b",7341:"3754d384",7354:"4e3477da",7360:"a4a271ff",7476:"9e2fad9f",7657:"fed706d3",7742:"6703c3a5",7753:"e86b525b",7778:"7625bee2",7824:"0c8cfd2d",7841:"48df22d7",7858:"c4420bf4",7957:"f9cdf36b",8033:"322e68f5",8060:"989ab969",8065:"4283b1d9",8066:"603ada14",8134:"b4963b63",8139:"5bbf37f4",8334:"33ee15df",8338:"1279de7e",8361:"8a1adc09",8365:"3313dd58",8393:"7fac3398",8401:"3d4a71db",8405:"d6599c68",8501:"8939659d",8566:"b1455f40",8581:"b01d2f17",8629:"5674fd9c",8661:"0209dc13",8665:"50a8f408",8697:"a81e97ba",8714:"fe706c1c",8800:"0cd8e82b",8815:"dbb52f26",8838:"2d4cd2c7",8864:"053c3e63",8871:"81ab2fd8",8892:"f5bca20d",8899:"e434ab5f",9034:"79129ea3",9088:"e70f1c4d",9113:"aa4faf40",9159:"707ad409",9223:"40482200",9278:"69d3e5d4",9332:"403f2f5e",9347:"3c307469",9352:"31bd72ce",9378:"1954de57",9446:"223daa51",9462:"1c04c481",9466:"d133ce81",9482:"5e671bb8",9544:"931195ed",9612:"c968ebdf",9613:"798478cf",9614:"38ed6b40",9619:"a51e8636",9620:"8230f96b",9647:"326e22d8",9704:"7276f87c",9759:"84f2868e",9795:"b31db681",9880:"3895374d",9979:"0b99e205"}[e]+".js",t.miniCssF=e=>{},t.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),t.o=(e,c)=>Object.prototype.hasOwnProperty.call(e,c),a={},t.l=(e,c,d,b)=>{if(a[e])a[e].push(c);else{var f,r;if(void 0!==d)for(var o=document.getElementsByTagName("script"),n=0;n<o.length;n++){var i=o[n];if(i.getAttribute("src")==e||i.getAttribute("data-webpack")=="so:"+d){f=i;break}}f||(r=!0,(f=document.createElement("script")).charset="utf-8",f.timeout=120,t.nc&&f.setAttribute("nonce",t.nc),f.setAttribute("data-webpack","so:"+d),f.src=e),a[e]=[c];var u=(c,d)=>{f.onerror=f.onload=null,clearTimeout(l);var b=a[e];if(delete a[e],f.parentNode&&f.parentNode.removeChild(f),b&&b.forEach((e=>e(d))),c)return c(d)},l=setTimeout(u.bind(null,void 0,{type:"timeout",target:f}),12e4);f.onerror=u.bind(null,f.onerror),f.onload=u.bind(null,f.onload),r&&document.head.appendChild(f)}},t.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.p="/operating-systems/73/",t.gca=function(e){return e={14580385:"7841",16929236:"9613",17896441:"8401",18331331:"5150",32839693:"298",78095748:"9619",81244046:"8066",94458749:"4907",b95e0710:"22",c7d5d005:"37","4e29cae1":"99","4d19100c":"289",ddc3a2ab:"333",e4b3f4c8:"342","1ffc5c5f":"414","6d6bd992":"429","45bf5b15":"446",d45c1699:"480","5ebe6805":"517","8c873eb8":"545",d309dd16:"584",cb87f1fe:"639",ce181f15:"651","2c270c24":"662",a7bc80c4:"675",a210c167:"728","5f61d8dd":"729","88bdb643":"746",f9bb2c6d:"747","0e5263e1":"748","94806a34":"770",b4c6c600:"805",e12c2f9c:"840","634f10a7":"879","374a2386":"923","713874cf":"924",ef7ad362:"941","16423f1e":"1045",ab4aa734:"1078","6bda9475":"1085","5894dc17":"1092",ed8bb14c:"1118","0275a3b2":"1169","3e3393a3":"1193","0b4c16a1":"1209","6b326dfe":"1269","6523baf0":"1280",ce1cacf4:"1349","1548d5c7":"1370","4c341edc":"1392","007cf997":"1410",d2954435:"1419","63c434c4":"1643",a0634f7a:"1663",de2a6172:"1693",cd9eb992:"1714","8de34314":"1727","6e95b748":"1759",e46ccb2a:"1841","27b8e71e":"1850","9b172a36":"1918",a2a02518:"1961","500c8b44":"2009",fdef1607:"2026","05813244":"2036","144ccec8":"2122",bdb7b057:"2166","463aadd7":"2213",c4d6228b:"2242","23374ca6":"2278",cbc996c5:"2289",ebbaca72:"2306",b5c587af:"2334","1e0b7734":"2360","31570f9d":"2382",b407248a:"2429","392776e2":"2464","9f99d3fc":"2505","009e58e9":"2608","0fa0bebd":"2851",a0d8a9b9:"3005","01b608bc":"3019","8d5b82ca":"3092","997e6ee2":"3127","96a31749":"3163","2e030903":"3193","9fb23397":"3204",d5aa9830:"3270",ac36c07d:"3276","59ad4d8f":"3284","0d65b9df":"3301",fecbe7cc:"3305",c4b5fe4e:"3383","71907c1d":"3385",a8d01eab:"3403","6321ecbb":"3445",c92640ae:"3501","918b3e21":"3508",fbc1cab8:"3537","97fe4cb3":"3686","7e98c1d8":"3700","747ded37":"3706","2bf71d30":"3748",b14e8f3e:"3899","51e6f6aa":"3946","1891e676":"3972","58e12640":"3986","924f80ad":"4035","15f618ea":"4060",b0285bd9:"4108",e3a89e97:"4126","393be207":"4134",ea490624:"4144","0438abee":"4201","40c67df2":"4205",a0ac5395:"4222","98c71577":"4226",ce0d7f6c:"4245","83d110b2":"4298",c2609098:"4338",cf57ac2f:"4420",ca978206:"4467","34746f8c":"4512","18519af9":"4639",be36e4af:"4641",d6fc9938:"4711",a92f7dfd:"4734",d6e5c209:"4757","8ec866b0":"4789","65ab3714":"4836","05c3ebc5":"4837","014e9e61":"4886","70ad9ac2":"4932",fc7881a9:"5004","0f890721":"5044","96f28031":"5046",fdc3d867:"5050",ade537b6:"5064",d526455d:"5172","926d7fb7":"5214","6e8edd23":"5232","5287e4b3":"5319","2895d02b":"5347","659eea6f":"5356","61e8e329":"5456","506aef51":"5528",a191e07d:"5557","6e6dee7f":"5623","2bde47d5":"5652",a315d4d8:"5653",b29235e9:"5676",d3a06000:"5821","81ef98dd":"5824","577dcf4c":"5918","7e59bc30":"5997","0b9ed770":"6001",b0d828e0:"6020","1f391b9e":"6061","09e11287":"6082",a3f724e5:"6142","7f023807":"6152","677bfb31":"6241","5d7f8186":"6248",aecc3d85:"6311","8c8c1be6":"6347","3c30233f":"6434","49cee3f0":"6504","1532e76f":"6506","60905a9d":"6627",ca6b73ec:"6669","59897f9f":"6822","46758dd5":"6824","31a6b50d":"6889","14eb3368":"6969","2828cd91":"6976",ac5c3a27:"7010","267b5415":"7173",bc288ac4:"7188",cc8fb1fa:"7271","9846e945":"7341","0bbd68f9":"7354","95637cbd":"7360",f54b55c1:"7476",fedaf6f6:"7657","10a540c5":"7742",e88d4a6f:"7753","8f35a413":"7778","3e17b32d":"7824","1ef36804":"7858","2641b427":"7957",cfecf120:"8033","50ed9da3":"8060","35edd654":"8065","14ee73ae":"8134","1ae4d9c9":"8139",d754500f:"8334","2e088525":"8338",ed4e77cc:"8361",a76a4d9b:"8365","5b157b4b":"8393","601205bf":"8405","7255df12":"8501","6e77dc18":"8566","935f2afb":"8581","65687b6f":"8629","625a19b4":"8661","092edce8":"8665","1dccb566":"8697","1be78505":"8714","0c19000f":"8800","71aa02c5":"8815","8209a29d":"8838",d92a3c43:"8864","89d3ad7d":"8871",f6eb4965:"8892",bdd18817:"8899",e0921ae2:"9034","6c180aec":"9088","03dc0c9b":"9113","0e26d3b8":"9159","928d0c11":"9223",e7d4c09c:"9278","21e67fd6":"9332","232c749b":"9347","0277d735":"9352","275698a5":"9378","4bb7e290":"9446","31b22d21":"9462",faef2eac:"9466",dade2520:"9482",c54826dc:"9544",f4dcab90:"9612","41c8b4f1":"9614","8ca589d3":"9620","4c165629":"9647","91ac0728":"9704","81b85611":"9759","3e478533":"9795","45c914d5":"9880","2760b5dd":"9979"}[e]||e,t.p+t.u(e)},(()=>{var e={5354:0,1869:0};t.f.j=(c,d)=>{var a=t.o(e,c)?e[c]:void 0;if(0!==a)if(a)d.push(a[2]);else if(/^(1869|5354)$/.test(c))e[c]=0;else{var b=new Promise(((d,b)=>a=e[c]=[d,b]));d.push(a[2]=b);var f=t.p+t.u(c),r=new Error;t.l(f,(d=>{if(t.o(e,c)&&(0!==(a=e[c])&&(e[c]=void 0),a)){var b=d&&("load"===d.type?"missing":d.type),f=d&&d.target&&d.target.src;r.message="Loading chunk "+c+" failed.\n("+b+": "+f+")",r.name="ChunkLoadError",r.type=b,r.request=f,a[1](r)}}),"chunk-"+c,c)}},t.O.j=c=>0===e[c];var c=(c,d)=>{var a,b,f=d[0],r=d[1],o=d[2],n=0;if(f.some((c=>0!==e[c]))){for(a in r)t.o(r,a)&&(t.m[a]=r[a]);if(o)var i=o(t)}for(c&&c(d);n<f.length;n++)b=f[n],t.o(e,b)&&e[b]&&e[b][0](),e[b]=0;return t.O(i)},d=self.webpackChunkso=self.webpackChunkso||[];d.forEach(c.bind(null,0)),d.push=c.bind(null,d.push.bind(d))})()})();