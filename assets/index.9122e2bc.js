import{C as B,U as E,_ as $,a as U,r as c,e as a,f as A,g as x,j as r,k as C,F as k,v as D,p as d,y as z,i as _,J as I,l as p,x as M,z as N,I as V,M as F,P as R,q as T}from"./index.fc3f095a.js";/* empty css             *//* empty css                   */const b=B("artist",{state:()=>({currentPage:1,count:0,pageData:{type:-1,area:-1,initial:"-1",page:1,limit:18},artists:[]}),getters:{},actions:{async getArtistList(){let g=await E(this.pageData);this.artists=g}}});const j={class:"text-xl font-semibold"},q={__name:"Aside",setup(g){const e=b();U(()=>{e.getArtistList()});const n=c({0:"\u7C7B\u578B",1:"\u533A\u57DF"}),v=c([[{type:-1,value:"\u5168\u90E8"},{type:1,value:"\u7537\u6B4C\u624B"},{type:2,value:"\u5973\u6B4C\u624B"},{type:3,value:"\u4E50\u961F"}],[{type:-1,value:"\u5168\u90E8"},{type:7,value:"\u534E\u8BED"},{type:96,value:"\u6B27\u7F8E"},{type:8,value:"\u65E5\u672C"},{type:16,value:"\u97E9\u56FD"},{type:0,value:"\u5176\u4ED6"}]]),m=(s,i)=>{console.log(s,i),i==0?(e.pageData.type=s.type,e.getArtistList()):i==1&&(e.pageData.area=s.type,e.getArtistList())};return(s,i)=>{const y=N,f=D;return a(),A(f,null,{default:x(()=>[(a(!0),r(k,null,C(n.value,(h,l)=>(a(),r("ul",{key:l,class:"flex"},[d("span",j,z(h),1),(a(!0),r(k,null,C(v.value[l],t=>(a(),r("li",null,[_(y,{class:I([{"active-rank":p(e).pageData.type===t.type&&l==="0"||p(e).pageData.area===t.type&&l==="1"},"ml-5"]),link:"",onClick:u=>m(t,l)},{default:x(()=>[M(z(t.value),1)]),_:2},1032,["class","onClick"])]))),256))]))),128))]),_:1})}}};var J=$(q,[["__scopeId","data-v-5aff78e3"]]);const G=["title"],H={__name:"Main",setup(g){const e=b(),{currentPage:n,count:v,artists:m}=V(e),s=c(18),i=c(!1),y=c(!1),f=c(!1),h=t=>{console.log(t,"handleSizeChange"),e.pageData.limit=t,e.pageData.page=n.value,e.getArtistList()},l=t=>{console.log(t,"handleCurrentChange"),e.pageData.limit=s.value,e.pageData.page=t,e.getArtistList()};return(t,u)=>{const L=T,P=R,S=D;return a(),A(S,null,{default:x(()=>[(a(!0),r(k,null,C(p(m),(o,w)=>(a(),r("div",{class:"inline-block my-5",key:w},[_(L,{src:o.picUrl,style:{width:"300px",height:"20%"},class:"mr-8 rounded-md"},null,8,["src"]),d("span",{class:"block text-lg truncate cursor-pointer w-280px hover:underline",title:o.name},z(o.name),9,G)]))),128)),_(P,{currentPage:p(n),"onUpdate:currentPage":u[0]||(u[0]=o=>F(n)?n.value=o:null),"page-size":s.value,"onUpdate:page-size":u[1]||(u[1]=o=>s.value=o),"page-sizes":[18,30,60,90],small:i.value,disabled:f.value,background:y.value,layout:"total,sizes, prev, pager, next",total:p(v)||100,onSizeChange:h,onCurrentChange:l},null,8,["currentPage","page-size","small","disabled","background","total"])]),_:1})}}},K={class:"flex mt-10 space-x-4"},O={class:"w-70%"},Q={class:"w-30%"},Z={__name:"index",setup(g){return(e,n)=>(a(),r("div",K,[d("div",O,[_(H)]),d("div",Q,[_(J)])]))}};export{Z as default};
