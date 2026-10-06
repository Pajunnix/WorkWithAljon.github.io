const menuToggle=document.getElementById("menuToggle");
const nav=document.getElementById("nav");
menuToggle?.addEventListener("click",()=>nav.classList.toggle("nav-open"));
document.querySelectorAll("nav a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("nav-open")));

const observer=new IntersectionObserver((entries)=>{
  entries.forEach((entry)=>{
    if(entry.isIntersecting){
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

const counters=document.querySelectorAll("[data-count]");
const counterObserver=new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(!entry.isIntersecting)return;
    const el=entry.target;
    const target=Number(el.dataset.count||0);
    const suffix=el.dataset.suffix||"";
    const duration=1150;
    const start=performance.now();
    function tick(now){
      const p=Math.min((now-start)/duration,1);
      const eased=1-Math.pow(1-p,3);
      el.textContent=Math.floor(target*eased).toLocaleString()+suffix;
      if(p<1)requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
    counterObserver.unobserve(el);
  });
},{threshold:.8});
counters.forEach(el=>counterObserver.observe(el));

const tools=[
["amazon","Amazon","amazon.com","https://www.amazon.com/"],
["shopify","Shopify","shopify.com","https://www.shopify.com/"],
["etsy","Etsy","etsy.com","https://www.etsy.com/"],
["tiktok","TikTok","tiktok.com","https://www.tiktok.com/"],
["facebook","Facebook","facebook.com","https://www.facebook.com/"],
["zillow","Zillow","platform reference","https://www.zillow.com/"],
["apollo","Apollo.io","apollo.io","https://www.apollo.io/"],
["rocketreach","RocketReach","rocketreach.co","https://rocketreach.co/"],
["hunter","Hunter.io","hunter.io","https://hunter.io/"],
["snovio","Snov.io","snov.io","https://snov.io/"],
["linkedin","LinkedIn","linkedin.com","https://www.linkedin.com/"],
["verifalia","Verifalia","verifalia.com","https://verifalia.com/"],
["slack","Slack","slack.com","https://slack.com/"],
["hubspot","HubSpot","hubspot.com","https://www.hubspot.com/"],
["whatsapp","WhatsApp","whatsapp.com","https://www.whatsapp.com/"],
["gmail","Gmail","mail.google.com","https://mail.google.com/"],
["telegram","Telegram","telegram.org","https://telegram.org/"],
["discord","Discord","discord.com","https://discord.com/"],
["microsoftoffice","Microsoft Office","Microsoft 365","https://www.microsoft.com/microsoft-365"],
["google","Google Workspace","workspace.google.com","https://workspace.google.com/"],
["airtable","Airtable","airtable.com","https://www.airtable.com/"],
["gamma","Gamma","gamma.app","https://gamma.app/"],
["veeqo","Veeqo","veeqo.com","https://www.veeqo.com/"],
["teapplix","Teapplix","teapplix.com","https://teapplix.com/"],
["easyship","Easyship","easyship.com","https://www.easyship.com/"],
["wise","Wise","wise.com","https://wise.com/"],
["paypal","PayPal","paypal.com","https://www.paypal.com/"],
["payoneer","Payoneer","payoneer.com","https://www.payoneer.com/"],
["applepay","Apple Pay","apple.com/pay","https://www.apple.com/apple-pay/"],
["gcash","GCash","gcash.com","https://gcash.com/"],
["openai","ChatGPT","chatgpt.com","https://chatgpt.com/"],
["gemini","Gemini","gemini.google.com","https://gemini.google.com/"],
["zapier","Zapier","zapier.com","https://zapier.com/"],
["octoparse","Octoparse","octoparse.com","https://www.octoparse.com/"],
["claude","Claude","claude.ai","https://claude.ai/"],
["adobe","Adobe","adobe.com","https://www.adobe.com/"],
["grok","Grok","x.com/grok","https://x.com/grok"]
];

const grid=document.getElementById("toolsGrid");
const simpleIconBase="https://cdn.simpleicons.org/";
for(const [slug,name,note,href] of tools){
  const a=document.createElement("a");
  a.className="tool";
  a.href=href;
  a.target="_blank";
  a.rel="noopener";
  const img=document.createElement("img");
  img.src=simpleIconBase+slug;
  img.alt=name+" logo";
  const fallback=document.createElement("span");
  fallback.className="fallback";
  fallback.textContent=name.slice(0,2).toUpperCase();
  fallback.style.display="none";
  img.addEventListener("error",()=>{img.style.display="none";fallback.style.display="grid"});
  const b=document.createElement("b"); b.textContent=name;
  const small=document.createElement("small"); small.textContent=note;
  a.append(img,fallback,b,small);
  grid.appendChild(a);
}

const toolsScroll = document.getElementById("toolsScroll");
const toolsLeft = document.getElementById("toolsLeft");
const toolsRight = document.getElementById("toolsRight");
const scrollAmount = 720;
toolsLeft?.addEventListener("click",()=>toolsScroll.scrollBy({left:-scrollAmount,behavior:"smooth"}));
toolsRight?.addEventListener("click",()=>toolsScroll.scrollBy({left:scrollAmount,behavior:"smooth"}));

let isDown=false,startX=0,scrollStart=0;
toolsScroll?.addEventListener("mousedown",e=>{isDown=true;startX=e.pageX-toolsScroll.offsetLeft;scrollStart=toolsScroll.scrollLeft});
window.addEventListener("mouseup",()=>isDown=false);
toolsScroll?.addEventListener("mousemove",e=>{
  if(!isDown)return;
  e.preventDefault();
  const x=e.pageX-toolsScroll.offsetLeft;
  toolsScroll.scrollLeft=scrollStart-(x-startX)*1.1;
});
