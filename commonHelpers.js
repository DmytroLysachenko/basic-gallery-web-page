import{a as S,i as y,S as b}from"./assets/vendor-6e0bf343.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(e){if(e.ep)return;e.ep=!0;const o=t(e);fetch(e.href,o)}})();const k="43312748-d2770da7ff63c643db495a6a3",v=async(r,s)=>{try{return(await S.get("https://pixabay.com/api/",{params:{key:k,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:s,per_page:15}})).data}catch(t){console.log(t)}},q=()=>{const r=document.createElement("form");r.classList.add("search-form");const s=document.createElement("input");s.type="text",s.classList.add("search-input"),s.placeholder="Search images...";const t=document.createElement("button");t.type="submit",t.classList.add("search-button"),t.textContent="Search";const n=document.createElement("button");n.textContent="Load more",n.classList.add("search-button"),n.classList.add("next-button"),n.classList.add("is-hidden"),n.type="button";const e=document.createElement("ul");e.classList.add("gallery-list"),r.append(s,t),document.body.prepend(r,e,n)},x=r=>r.map(t=>{const n=document.createElement("li");n.classList.add("gallery-item");const e=document.createElement("a");e.classList.add("gallery-link"),e.href=t.largeImageURL;const o=document.createElement("img");o.classList.add("gallery-image"),o.src=t.webformatURL,o.alt=t.tags,o.width="360";const a={Likes:t.likes,Views:t.views,Comments:t.comments,Downloads:t.downloads},p=document.createElement("ul");p.classList.add("gallery-desc-list");for(let L in a){const g=document.createElement("li");g.classList.add("gallery-desc-item");const h=document.createElement("p");h.classList.add("gallery-desc-ttl"),h.textContent=L;const f=document.createElement("p");f.classList.add("gallery-desc-text"),f.textContent=a[L],g.append(h,f),p.append(g)}return e.append(o),n.append(e,p),n});q();const C=document.querySelector(".search-form"),D=document.querySelector(".search-input"),u=document.querySelector(".gallery-list"),i=document.querySelector(".loader"),l=document.querySelector(".next-button"),E=document.querySelector(".scrollbutton");let d,m,c;C.addEventListener("submit",async r=>{try{if(E.classList.remove("is-open"),u.innerHTML="",l.classList.add("is-hidden"),c=1,r.preventDefault(),d=D.value.trim(),r.target.reset(),d===""){y.show({title:"Error",message:"Invalid search request value",backgroundColor:"red",theme:"dark",color:"red",position:"topRight"});return}i.classList.add("is-loading");const{hits:s,totalHits:t}=await v(d,c);if(m=t,s.length===0){y.show({title:"Error",message:"Unfortunately no pictures found by your request :(",backgroundColor:"red",theme:"dark",color:"red",position:"topRight"}),i.classList.remove("is-loading");return}const n=x(s);u.append(...n),i.classList.remove("is-loading"),m/15>1&&(l.classList.remove("is-hidden"),l.addEventListener("click",w)),new b(".gallery-link",{captionDelay:250,captionsData:"alt"}).refresh()}catch(s){console.log(s)}});const w=async r=>{try{l.classList.add("is-hidden"),i.classList.add("is-loading"),c+=1;const{hits:s}=await v(d,c),t=x(s);u.append(...t),c<Math.ceil(m/15)&&l.classList.remove("is-hidden"),i.classList.remove("is-loading"),new b(".gallery-link",{captionDelay:250,captionsData:"alt"}).refresh(),c===Math.ceil(m/15)&&(l.removeEventListener("click",w),y.info({title:"Unfortunately",message:"All pictures are shown already."}),E.classList.add("is-open"))}catch(s){console.log(s)}};u.addEventListener("click",r=>{r.preventDefault()});
//# sourceMappingURL=commonHelpers.js.map
