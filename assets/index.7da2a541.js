import{C as U,_ as V,I as w,r,a as F,Q as M,R as x,e as s,f as P,g as C,j as i,k as b,l as m,F as L,v as E,p as d,y as h,i as f,J as R,x as S,z as j,S as q,P as D,q as J}from"./index.fc3f095a.js";/* empty css             *//* empty css                   */const B=U("playList",{state:()=>({limit:18,offset:0,cat:"\u5168\u90E8",playList:[]}),getters:{},actions:{}});const Q={class:"text-xl font-semibold"},A={__name:"Header",setup(z){const e=B();w(e);let g=r({}),y=r([]);F(async()=>{const t=await M();g.value=t.categories;for(let o=0;o<5;o++){let c=[];t.sub.forEach(p=>{p.category==o&&c.push(p)}),y.value.push(c),c=[]}const _=await x({limit:18});e.playList=_});const u=async t=>{const _=await x({limit:e.limit,offset:e.offset,cat:t});e.cat=t,e.playList=_};return(t,_)=>{const o=j,c=E;return s(),P(c,{class:""},{default:C(()=>[(s(!0),i(L,null,b(m(g),(p,k)=>(s(),i("ul",{key:k,class:"flex"},[d("span",Q,h(p),1),(s(!0),i(L,null,b(m(y)[k],v=>(s(),i("li",null,[f(o,{link:"",class:R([{"active-rank":v.name===m(e).cat},"ml-5"]),onClick:a=>u(v.name)},{default:C(()=>[S(h(v.name),1)]),_:2},1032,["class","onClick"])]))),256))]))),128))]),_:1})}}};var G=V(A,[["__scopeId","data-v-3d77e27b"]]);const K=["title"],O={class:"mt-1"},W=d("span",{class:"text-black text-opacity-50"},"by",-1),X={class:"translate-x-2 inline-block cursor-pointer hover:underline"},Y={__name:"Main",setup(z){const e=B(),{cat:g,playList:y}=w(e),u=r(1),t=r(18),_=r(!1),o=r(!1),c=r(!1),p=async a=>{const n=await x({limit:a,offset:(u.value-1)*a,cat:e.cat});e.limit=a,e.offset=(u.value-1)*a,e.playList=n},k=async a=>{const n=await x({limit:t.value,offset:(a-1)*t.value,cat:e.cat});e.limit=t.value,e.offset=(a-1)*t.value,e.playList=n},v=async()=>{if(e.cat=="\u5168\u90E8")return!0;{e.cat="\u5168\u90E8";const a=await x({limit:e.limit,offset:e.offset,cat:e.cat});e.playList=a}};return(a,n)=>{const $=q,I=J,T=D,H=E;return s(),P(H,null,{default:C(()=>[d("div",null,[f($,{type:"success",size:"large",closable:"","disable-transitions":!1,onClose:v},{default:C(()=>[S(h(m(g)),1)]),_:1})]),(s(!0),i(L,null,b(m(y).playlists,(l,N)=>(s(),i("div",{class:"inline-block mt-5 mr-8 h-280px",key:N},[f(I,{src:l.coverImgUrl,style:{width:"220px",height:"220px"},class:"rounded-md"},null,8,["src"]),d("span",{class:"block truncate cursor-pointer w-220px text-lg hover:underline",title:l.name},h(l.name),9,K),d("div",O,[W,d("span",X,h(l.creator.nickname),1)])]))),128)),f(T,{currentPage:u.value,"onUpdate:currentPage":n[0]||(n[0]=l=>u.value=l),"page-size":t.value,"onUpdate:page-size":n[1]||(n[1]=l=>t.value=l),"page-sizes":[18,30,60,90],small:_.value,disabled:c.value,background:o.value,layout:"total,sizes, prev, pager, next",total:m(y).total||100,onSizeChange:p,onCurrentChange:k},null,8,["currentPage","page-size","small","disabled","background","total"])]),_:1})}}},Z={class:"mt-10"},se={__name:"index",setup(z){return(e,g)=>(s(),i("div",Z,[f(G),f(Y)]))}};export{se as default};
