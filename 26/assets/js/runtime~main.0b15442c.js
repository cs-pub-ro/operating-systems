(()=>{"use strict";var e,c,d,a,b={},f={};function t(e){var c=f[e];if(void 0!==c)return c.exports;var d=f[e]={id:e,loaded:!1,exports:{}};return b[e].call(d.exports,d,d.exports,t),d.loaded=!0,d.exports}t.m=b,t.c=f,e=[],t.O=(c,d,a,b)=>{if(!d){var f=1/0;for(i=0;i<e.length;i++){d=e[i][0],a=e[i][1],b=e[i][2];for(var r=!0,o=0;o<d.length;o++)(!1&b||f>=b)&&Object.keys(t.O).every((e=>t.O[e](d[o])))?d.splice(o--,1):(r=!1,b<f&&(f=b));if(r){e.splice(i--,1);var n=a();void 0!==n&&(c=n)}}return c}b=b||0;for(var i=e.length;i>0&&e[i-1][2]>b;i--)e[i]=e[i-1];e[i]=[d,a,b]},t.n=e=>{var c=e&&e.__esModule?()=>e.default:()=>e;return t.d(c,{a:c}),c},d=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__,t.t=function(e,a){if(1&a&&(e=this(e)),8&a)return e;if("object"==typeof e&&e){if(4&a&&e.__esModule)return e;if(16&a&&"function"==typeof e.then)return e}var b=Object.create(null);t.r(b);var f={};c=c||[null,d({}),d([]),d(d)];for(var r=2&a&&e;"object"==typeof r&&!~c.indexOf(r);r=d(r))Object.getOwnPropertyNames(r).forEach((c=>f[c]=()=>e[c]));return f.default=()=>e,t.d(b,f),b},t.d=(e,c)=>{for(var d in c)t.o(c,d)&&!t.o(e,d)&&Object.defineProperty(e,d,{enumerable:!0,get:c[d]})},t.f={},t.e=e=>Promise.all(Object.keys(t.f).reduce(((c,d)=>(t.f[d](e,c),c)),[])),t.u=e=>"assets/js/"+({13:"463aadd7",24:"6b326dfe",53:"935f2afb",180:"c7d5d005",213:"c92640ae",214:"03dc0c9b",373:"f808e6c0",488:"96a31749",556:"577dcf4c",675:"98c71577",820:"7f023807",842:"95637cbd",937:"4e29cae1",983:"04d8a21d",1018:"0277d735",1101:"b407248a",1118:"fbc1cab8",1157:"91ac0728",1265:"f54b55c1",1266:"d9891e72",1329:"997e6ee2",1482:"c4d6228b",1487:"2330fd66",1625:"fbacb3d5",1746:"60905a9d",1758:"8de34314",1765:"374a2386",1771:"d2f41667",1786:"918b3e21",1901:"3c30233f",1967:"0fa0bebd",2055:"18331331",2202:"14ee73ae",2232:"e4b3f4c8",2279:"1dccb566",2417:"c2609098",2456:"ac5c3a27",2472:"d309dd16",2590:"bd909c58",2648:"ddbb5268",2661:"2e030903",2713:"8f35a413",2736:"d2954435",2764:"1ef36804",2798:"d92a3c43",2815:"0438abee",2827:"8ca589d3",2838:"6e6dee7f",2845:"2828cd91",3004:"f6eb4965",3063:"32839693",3068:"0c19000f",3085:"1f391b9e",3126:"e46ccb2a",3221:"1fdb5e95",3320:"a7bc80c4",3334:"eae0e5d1",3425:"a315d4d8",3470:"6e95b748",3540:"2c270c24",3675:"31a6b50d",3711:"a8d01eab",3742:"68eeb637",3788:"a0ac5395",3807:"b95e0710",3851:"ab4aa734",3866:"fdef1607",3867:"4931bb70",3920:"d509b9f5",4006:"2bde47d5",4126:"487d1817",4148:"89d3ad7d",4207:"59897f9f",4222:"81b85611",4272:"1548d5c7",4346:"cc8fb1fa",4350:"692011d4",4379:"1ffc5c5f",4426:"5d7f8186",4461:"59ad4d8f",4470:"ade537b6",4471:"a210c167",4823:"d754500f",4881:"3e3393a3",4969:"2ae1129c",4980:"56fa2c9d",5139:"15f618ea",5220:"6e77dc18",5330:"34746f8c",5430:"625a19b4",5475:"7e98c1d8",5616:"1b1148a8",5737:"144ccec8",5782:"0275a3b2",5899:"232c749b",6074:"8209a29d",6078:"5ebe6805",6387:"ed8bb14c",6397:"65ab3714",6429:"62a2c47b",6492:"aecc3d85",6512:"94458749",6632:"14580385",6723:"8ec866b0",6779:"ee8e8c34",6901:"5e10bb01",6912:"2df0b9c7",7089:"924f80ad",7156:"65687b6f",7181:"1d52275e",7327:"3e478533",7383:"ca6b73ec",7387:"d6e5c209",7414:"393be207",7674:"8d5b82ca",7841:"a191e07d",7914:"09e11287",7915:"1891e676",7918:"17896441",7986:"87bfa638",8028:"b5c587af",8051:"926d7fb7",8211:"0f890721",8245:"4c341edc",8322:"5894dc17",8351:"392776e2",8411:"267b5415",8421:"23374ca6",8446:"e0921ae2",8448:"50ed9da3",8459:"5c4ba3bf",8482:"cbc996c5",8631:"007cf997",8650:"3e17b32d",8684:"f4dcab90",8788:"9f99d3fc",8986:"2641b427",9041:"0bbd68f9",9052:"ddc3a2ab",9085:"ce181f15",9095:"ce0d7f6c",9152:"1e0b7734",9173:"70ad9ac2",9197:"e88d4a6f",9386:"fecbe7cc",9514:"1be78505",9667:"fc7881a9",9671:"35edd654",9701:"5b157b4b",9724:"4c165629",9735:"c54826dc",9817:"14eb3368",9836:"9dd394c3",9837:"092edce8",9856:"49cee3f0",9859:"432299a8",9898:"b3a87cae",9944:"928d0c11",9984:"6bda9475",9995:"97fe4cb3"}[e]||e)+"."+{13:"fc697b36",24:"a9207055",53:"6d8e2d7c",180:"1c9c07be",213:"15ba64cf",214:"ca869408",373:"65e64f89",488:"3cc3cbc5",556:"517deee2",675:"d0166c91",820:"21c454da",842:"14762a9a",937:"92deb86d",983:"4969fbd2",1018:"cd2239f0",1101:"ec8d42d9",1118:"5d4152e9",1157:"6471d622",1265:"f772f908",1266:"aae3c972",1329:"527b7640",1482:"dac884cc",1487:"a64573a7",1625:"2366b76c",1746:"f0c8fa73",1758:"1992e6b3",1765:"ecac5d67",1771:"afa18aa9",1786:"fb8807d7",1901:"d21616f4",1967:"86169e80",2055:"91bdb813",2202:"29ab7ffe",2232:"e1cf8938",2279:"59976784",2417:"151e056d",2456:"ec70671b",2472:"93adca53",2590:"dce3c387",2648:"708df15e",2661:"b8e453d0",2666:"5efb0c03",2713:"5bd494fd",2736:"17eb4452",2764:"b5d883c9",2798:"a05a65b5",2815:"c844cae9",2827:"2e53d18e",2838:"f9ffae6e",2845:"95280f6e",3004:"32481cd7",3063:"7ae269b8",3068:"236d53db",3085:"b2d53f92",3126:"daebe8a6",3221:"ee91b167",3320:"47e9c832",3334:"af1c0d26",3425:"c69b0d43",3470:"c5fc5eed",3540:"3c0dfc2b",3675:"30566f7b",3711:"c9bda0da",3742:"7bdcb5cf",3788:"9c44b80f",3807:"f43461b6",3851:"02d4d497",3866:"0a5dec49",3867:"bda9bfb5",3920:"e6213fd7",4006:"701a7b97",4126:"89e42cbb",4148:"b503a426",4207:"fe21c853",4222:"da65bd6a",4272:"5b8f465a",4346:"76b7cadf",4350:"8e213013",4379:"783c8ca4",4426:"3f7c4001",4461:"53211aa8",4470:"b72ca7d7",4471:"e3a590f5",4823:"8de805a3",4881:"0a4cb3b0",4969:"0c070ec1",4972:"d4c24351",4980:"9bcc877e",5139:"a52a8d6c",5220:"93972d73",5330:"d854ded9",5430:"0e11d86e",5475:"79983ccf",5616:"1d62a037",5737:"5657ce1d",5782:"01b34df1",5899:"4467f7bc",6074:"1b0cdfec",6078:"8f7633c5",6387:"24effa90",6397:"1cd929a5",6429:"c3b4619b",6492:"1da3f5e4",6512:"448797f7",6632:"5108bc87",6723:"9e299384",6779:"70d5d2a6",6901:"f4a6dbd7",6912:"5f3175a4",7089:"0922fc73",7156:"d272cd09",7181:"d208c6ee",7327:"1584aaca",7383:"d1cdd0c3",7387:"36cab647",7414:"5f3cd735",7674:"1c0e4faa",7841:"c441c6a1",7914:"a33dc7c0",7915:"0c84cb3b",7918:"4e93f2ea",7986:"c1d307e7",8028:"7c24b027",8051:"66f8181b",8211:"ff8f766d",8245:"d1d1f378",8322:"09910098",8351:"86a51088",8411:"536c1b1a",8421:"6ee30587",8446:"2b2f07a1",8448:"78b4a150",8459:"98a97463",8482:"4fd8ccae",8631:"3e3ad341",8650:"b8d267e2",8684:"88c8e048",8788:"5faa6543",8986:"abda3a20",9041:"9e9e6638",9052:"8d6f0d02",9085:"26870e95",9095:"0f52485e",9152:"10e6aba6",9173:"6c87d14d",9197:"99c74020",9386:"8fd3ab97",9514:"f8b9d3b1",9667:"99e5e067",9671:"87b05de1",9701:"07335a27",9724:"bd69e9dc",9735:"9bdecc54",9817:"f8efd3cc",9836:"17a025cd",9837:"eee4adce",9856:"8b4e7b61",9859:"a70f00f3",9898:"8571dbc2",9944:"c18b7829",9984:"394cc31b",9995:"73e879e5"}[e]+".js",t.miniCssF=e=>{},t.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),t.o=(e,c)=>Object.prototype.hasOwnProperty.call(e,c),a={},t.l=(e,c,d,b)=>{if(a[e])a[e].push(c);else{var f,r;if(void 0!==d)for(var o=document.getElementsByTagName("script"),n=0;n<o.length;n++){var i=o[n];if(i.getAttribute("src")==e||i.getAttribute("data-webpack")=="so:"+d){f=i;break}}f||(r=!0,(f=document.createElement("script")).charset="utf-8",f.timeout=120,t.nc&&f.setAttribute("nonce",t.nc),f.setAttribute("data-webpack","so:"+d),f.src=e),a[e]=[c];var u=(c,d)=>{f.onerror=f.onload=null,clearTimeout(l);var b=a[e];if(delete a[e],f.parentNode&&f.parentNode.removeChild(f),b&&b.forEach((e=>e(d))),c)return c(d)},l=setTimeout(u.bind(null,void 0,{type:"timeout",target:f}),12e4);f.onerror=u.bind(null,f.onerror),f.onload=u.bind(null,f.onload),r&&document.head.appendChild(f)}},t.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.p="/operating-systems/26/",t.gca=function(e){return e={14580385:"6632",17896441:"7918",18331331:"2055",32839693:"3063",94458749:"6512","463aadd7":"13","6b326dfe":"24","935f2afb":"53",c7d5d005:"180",c92640ae:"213","03dc0c9b":"214",f808e6c0:"373","96a31749":"488","577dcf4c":"556","98c71577":"675","7f023807":"820","95637cbd":"842","4e29cae1":"937","04d8a21d":"983","0277d735":"1018",b407248a:"1101",fbc1cab8:"1118","91ac0728":"1157",f54b55c1:"1265",d9891e72:"1266","997e6ee2":"1329",c4d6228b:"1482","2330fd66":"1487",fbacb3d5:"1625","60905a9d":"1746","8de34314":"1758","374a2386":"1765",d2f41667:"1771","918b3e21":"1786","3c30233f":"1901","0fa0bebd":"1967","14ee73ae":"2202",e4b3f4c8:"2232","1dccb566":"2279",c2609098:"2417",ac5c3a27:"2456",d309dd16:"2472",bd909c58:"2590",ddbb5268:"2648","2e030903":"2661","8f35a413":"2713",d2954435:"2736","1ef36804":"2764",d92a3c43:"2798","0438abee":"2815","8ca589d3":"2827","6e6dee7f":"2838","2828cd91":"2845",f6eb4965:"3004","0c19000f":"3068","1f391b9e":"3085",e46ccb2a:"3126","1fdb5e95":"3221",a7bc80c4:"3320",eae0e5d1:"3334",a315d4d8:"3425","6e95b748":"3470","2c270c24":"3540","31a6b50d":"3675",a8d01eab:"3711","68eeb637":"3742",a0ac5395:"3788",b95e0710:"3807",ab4aa734:"3851",fdef1607:"3866","4931bb70":"3867",d509b9f5:"3920","2bde47d5":"4006","487d1817":"4126","89d3ad7d":"4148","59897f9f":"4207","81b85611":"4222","1548d5c7":"4272",cc8fb1fa:"4346","692011d4":"4350","1ffc5c5f":"4379","5d7f8186":"4426","59ad4d8f":"4461",ade537b6:"4470",a210c167:"4471",d754500f:"4823","3e3393a3":"4881","2ae1129c":"4969","56fa2c9d":"4980","15f618ea":"5139","6e77dc18":"5220","34746f8c":"5330","625a19b4":"5430","7e98c1d8":"5475","1b1148a8":"5616","144ccec8":"5737","0275a3b2":"5782","232c749b":"5899","8209a29d":"6074","5ebe6805":"6078",ed8bb14c:"6387","65ab3714":"6397","62a2c47b":"6429",aecc3d85:"6492","8ec866b0":"6723",ee8e8c34:"6779","5e10bb01":"6901","2df0b9c7":"6912","924f80ad":"7089","65687b6f":"7156","1d52275e":"7181","3e478533":"7327",ca6b73ec:"7383",d6e5c209:"7387","393be207":"7414","8d5b82ca":"7674",a191e07d:"7841","09e11287":"7914","1891e676":"7915","87bfa638":"7986",b5c587af:"8028","926d7fb7":"8051","0f890721":"8211","4c341edc":"8245","5894dc17":"8322","392776e2":"8351","267b5415":"8411","23374ca6":"8421",e0921ae2:"8446","50ed9da3":"8448","5c4ba3bf":"8459",cbc996c5:"8482","007cf997":"8631","3e17b32d":"8650",f4dcab90:"8684","9f99d3fc":"8788","2641b427":"8986","0bbd68f9":"9041",ddc3a2ab:"9052",ce181f15:"9085",ce0d7f6c:"9095","1e0b7734":"9152","70ad9ac2":"9173",e88d4a6f:"9197",fecbe7cc:"9386","1be78505":"9514",fc7881a9:"9667","35edd654":"9671","5b157b4b":"9701","4c165629":"9724",c54826dc:"9735","14eb3368":"9817","9dd394c3":"9836","092edce8":"9837","49cee3f0":"9856","432299a8":"9859",b3a87cae:"9898","928d0c11":"9944","6bda9475":"9984","97fe4cb3":"9995"}[e]||e,t.p+t.u(e)},(()=>{var e={1303:0,532:0};t.f.j=(c,d)=>{var a=t.o(e,c)?e[c]:void 0;if(0!==a)if(a)d.push(a[2]);else if(/^(1303|532)$/.test(c))e[c]=0;else{var b=new Promise(((d,b)=>a=e[c]=[d,b]));d.push(a[2]=b);var f=t.p+t.u(c),r=new Error;t.l(f,(d=>{if(t.o(e,c)&&(0!==(a=e[c])&&(e[c]=void 0),a)){var b=d&&("load"===d.type?"missing":d.type),f=d&&d.target&&d.target.src;r.message="Loading chunk "+c+" failed.\n("+b+": "+f+")",r.name="ChunkLoadError",r.type=b,r.request=f,a[1](r)}}),"chunk-"+c,c)}},t.O.j=c=>0===e[c];var c=(c,d)=>{var a,b,f=d[0],r=d[1],o=d[2],n=0;if(f.some((c=>0!==e[c]))){for(a in r)t.o(r,a)&&(t.m[a]=r[a]);if(o)var i=o(t)}for(c&&c(d);n<f.length;n++)b=f[n],t.o(e,b)&&e[b]&&e[b][0](),e[b]=0;return t.O(i)},d=self.webpackChunkso=self.webpackChunkso||[];d.forEach(c.bind(null,0)),d.push=c.bind(null,d.push.bind(d))})()})();