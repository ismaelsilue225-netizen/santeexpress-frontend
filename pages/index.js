import { useState, useEffect } from "react";
import Head from "next/head";

/* ══ TOKENS ══════════════════════════════════════════ */
const G="#00A859",GL="#C8FFDF",GD="#007A42",GBG="#E8F5EE";
const W="#FFFFFF",BG="#F4F6F5",TXT="#0E1A13",TXTS="#6B7D70";
const RED="#E63946",AMBER="#F4A261",PURPLE="#6B48FF";
const WAVE_C="#1A56DB",CP_C="#004B9D";
const DELIV_STD=500,DELIV_YANGO=800;
const fmt=n=>n.toLocaleString("fr-FR")+" FCFA";

/* ══ LOGOS ═══════════════════════════════════════════ */
function LogoWave(){
  return(
    <div style={{width:52,height:52,borderRadius:13,background:"#1A56DB",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",flexShrink:0,overflow:"hidden"}}>
      <span style={{color:"rgba(255,255,255,0.6)",fontSize:7,fontWeight:700,letterSpacing:2,marginBottom:2,fontFamily:"Arial"}}>wave</span>
      <svg width="36" height="16" viewBox="0 0 36 16">
        <path d="M2 10 C5 3, 8 14, 11 8 C14 2, 17 14, 20 8 C23 2, 26 14, 29 8 C31 4, 33 7, 35 6" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}
function LogoOrange(){
  return(
    <div style={{width:52,height:52,borderRadius:13,background:"#FF6600",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",flexShrink:0}}>
      <div style={{width:28,height:28,borderRadius:"50%",background:"white",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:3}}>
        <span style={{color:"#FF6600",fontWeight:900,fontSize:10,fontFamily:"Arial"}}>OM</span>
      </div>
      <span style={{color:"rgba(255,255,255,0.9)",fontSize:7,fontWeight:700,fontFamily:"Arial"}}>ORANGE</span>
    </div>
  );
}
function LogoCinetPay(){
  return(
    <div style={{width:52,height:52,borderRadius:13,background:"#004B9D",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",flexShrink:0}}>
      <div style={{border:"1.5px solid rgba(255,255,255,0.4)",borderRadius:4,padding:"3px 7px",marginBottom:3}}>
        <span style={{color:"white",fontWeight:700,fontSize:8,fontFamily:"Arial"}}>CINET</span>
      </div>
      <span style={{color:"#FFD700",fontWeight:900,fontSize:11,fontFamily:"Arial"}}>PAY</span>
    </div>
  );
}
function LogoYango(){
  return(
    <div style={{width:44,height:44,borderRadius:11,background:"#E31E2D",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
      <span style={{color:"white",fontWeight:900,fontSize:26,lineHeight:1,fontFamily:"Arial Black, Arial"}}>Y</span>
    </div>
  );
}
function LogoCash(){
  return <div style={{width:52,height:52,borderRadius:13,background:"#27AE60",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:26}}>💵</div>;
}
function LogoInsurance(){
  return <div style={{width:52,height:52,borderRadius:13,background:PURPLE,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:24}}>🛡️</div>;
}

/* ══ DONNÉES STATIQUES ═══════════════════════════════ */
const CATS=[
  {id:"all",label:"Tout",icon:"🏪"},
  {id:"antidouleur",label:"Antidouleurs",icon:"💊"},
  {id:"vitamines",label:"Vitamines",icon:"🌿"},
  {id:"antibio",label:"Antibiotiques",icon:"🧬"},
  {id:"soin",label:"Soins",icon:"🧴"},
  {id:"bebe",label:"Bébé",icon:"👶"},
  {id:"materiel",label:"Matériel",icon:"🩺"},
];

const ASSURANCES=[
  {id:"cnam",  name:"CNAM",     full:"Caisse Nationale d'Assurance Maladie", cover:70,clr:"#0055A4"},
  {id:"mugef", name:"MUGEF-CI", full:"Mutuelle Générale des Fonctionnaires", cover:80,clr:"#006633"},
  {id:"amu",   name:"AMU",      full:"Assurance Maladie Universelle",        cover:60,clr:"#CC0000"},
  {id:"nsia",  name:"NSIA",     full:"NSIA Assurances CI",                   cover:50,clr:"#E87722"},
  {id:"axa",   name:"AXA",      full:"AXA Assurance CI",                     cover:65,clr:"#00008F"},
  {id:"sanlam",name:"Sanlam",   full:"Sanlam Vie CI",                        cover:55,clr:"#003057"},
];

const INIT_ORDERS=[
  {id:"PC-0001",date:"08/06/2026",items:[{name:"Paracétamol 500mg",qty:2,price:500}],subtotal:1000,delivFee:500,total:1500,status:"delivered",pharmacy:"Pharmacie du Plateau",payment:"wave",delivMode:"std",address:"Cocody, Abidjan",phone:"",rating:5},
  {id:"PC-0002",date:"04/06/2026",items:[{name:"Vitamine C",qty:1,price:1200},{name:"Zinc+D3",qty:1,price:2500}],subtotal:3700,delivFee:500,total:4200,status:"delivered",pharmacy:"Pharmacie Sainte Marie",payment:"orange",delivMode:"std",address:"Plateau, Abidjan",phone:"",rating:null},
];

/* ══ COMPOSANTS ══════════════════════════════════════ */

function Header({mode,navBack,count,setMode,user,onLogin}){
  const T={catalog:"Catalogue",product:"Détails",cart:"Mon panier",checkout:"Paiement",tracking:"Suivi commande",history:"Mes commandes",rating:"Laisser un avis",livreur:"Espace Livreur 🛵",admin:"Administration ⚙️",pharmacie:"Espace Pharmacie 🏥"};
  return(
    <div style={{background:G,padding:"15px 18px",display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:100,boxShadow:"0 2px 14px rgba(0,0,0,0.18)"}}>
      <div style={{display:"flex",alignItems:"center",gap:10}}>
        {mode!=="landing"&&<button onClick={navBack} style={{background:"rgba(255,255,255,0.22)",border:"none",borderRadius:8,width:34,height:34,color:W,fontSize:18,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>←</button>}
        {mode==="landing"
          ?<h1 style={{color:W,fontSize:22,fontWeight:900,margin:0,letterSpacing:-0.5}}>SANTÉ<span style={{color:GL}}>EXPRESS</span></h1>
          :<span style={{color:W,fontWeight:700,fontSize:16}}>{T[mode]||mode}</span>}
      </div>
      <div style={{display:"flex",alignItems:"center",gap:8}}>
        {!["checkout","rating","livreur","admin","pharmacie"].includes(mode)&&(
          <button onClick={()=>setMode("cart")} style={{background:"rgba(255,255,255,0.2)",border:"none",borderRadius:20,padding:"6px 14px",color:W,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",gap:6}}>
            🛒{count>0&&<span style={{background:RED,borderRadius:"50%",width:20,height:20,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:800}}>{count}</span>}
          </button>
        )}
        {mode==="landing"&&(user
          ?<span style={{color:GL,fontSize:12,fontWeight:600}}>👤 {user.nom?.split(" ")[0]||"Moi"}</span>
          :<button onClick={onLogin} style={{background:"rgba(255,255,255,0.22)",border:"none",borderRadius:20,padding:"7px 14px",color:W,fontWeight:700,cursor:"pointer",fontSize:12}}>Connexion</button>
        )}
      </div>
    </div>
  );
}

function BottomNav({mode,setMode,count}){
  const items=[{m:"landing",ic:"🏠",lb:"Accueil"},{m:"catalog",ic:"🛍️",lb:"Catalogue"},{m:"history",ic:"📋",lb:"Commandes"},{m:"admin",ic:"⚙️",lb:"Admin"}];
  return(
    <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:480,background:W,borderTop:"1px solid #E8EDE9",display:"flex",zIndex:99}}>
      {items.map(({m,ic,lb})=>(
        <button key={m} onClick={()=>setMode(m)} style={{flex:1,background:"none",border:"none",padding:"9px 4px 7px",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:2}}>
          <span style={{fontSize:19}}>{ic}</span>
          <span style={{fontSize:10,fontWeight:mode===m?700:400,color:mode===m?G:TXTS}}>{lb}</span>
          {mode===m&&<div style={{width:18,height:2.5,background:G,borderRadius:2}}/>}
        </button>
      ))}
    </div>
  );
}

function SearchingPharmacy({commune,onFound}){
  const [step,setStep]=useState(0);
  const steps=["📡 Localisation en cours...","🔍 Recherche des pharmacies ouvertes...","💊 Vérification des stocks...","✅ Pharmacie trouvée !"];
  useEffect(()=>{
    if(step<3){const t=setTimeout(()=>setStep(s=>s+1),1200);return()=>clearTimeout(t);}
    else{const t=setTimeout(onFound,1000);return()=>clearTimeout(t);}
  },[step]);
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.7)",zIndex:200,display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div style={{background:W,borderRadius:20,padding:30,width:300,textAlign:"center"}}>
        <div style={{fontSize:52,marginBottom:16}}>🏥</div>
        <h3 style={{color:TXT,fontWeight:800,marginBottom:16}}>Affectation en cours</h3>
        {steps.map((s,i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",gap:10,marginBottom:10,opacity:i<=step?1:0.3,transition:"opacity 0.5s"}}>
            <span style={{fontSize:16}}>{i<step?"✅":i===step?"⏳":"⬜"}</span>
            <span style={{color:TXT,fontSize:13,fontWeight:i===step?700:400}}>{s}</span>
          </div>
        ))}
        {step===3&&<div style={{marginTop:16,background:GBG,borderRadius:12,padding:12}}>
          <p style={{color:GD,fontWeight:700,fontSize:13,margin:0}}>🎉 Commande confirmée !</p>
          <p style={{color:TXTS,fontSize:12,margin:"4px 0 0"}}>Pharmacie proche assignée</p>
        </div>}
      </div>
    </div>
  );
}

function Landing({setMode,setCat,pharmacies}){
  const [q,setQ]=useState("");
  const go=()=>{setMode("catalog");};
  const gardeList=(pharmacies||[]).filter(p=>p.est_garde||p.garde);
  return(
    <div style={{paddingBottom:16}}>
      {/* HERO */}
      <div style={{position:"relative",minHeight:480,background:`linear-gradient(160deg,${GD} 0%,#002918 100%)`,overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,background:"linear-gradient(90deg,rgba(0,40,20,0.95) 40%,rgba(0,40,20,0.3) 100%)"}}/>
        <div style={{position:"relative",zIndex:2,padding:"32px 22px 40px"}}>
          <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:24}}>
            {[["🌙","Garde 24h/24"],["🛵","Livraison rapide"],["📱","Mobile Money"]].map(([ic,lb])=>(
              <span key={lb} style={{background:"rgba(255,255,255,0.12)",backdropFilter:"blur(8px)",border:"1px solid rgba(255,255,255,0.18)",borderRadius:30,padding:"7px 14px",color:W,fontSize:13,fontWeight:600,display:"flex",alignItems:"center",gap:6}}>{ic} {lb}</span>
            ))}
          </div>
          <h1 style={{color:W,fontSize:36,fontWeight:900,lineHeight:1.1,margin:"0 0 16px",letterSpacing:-1}}>
            Vos médicaments<br/><span style={{color:"#7EFFC5"}}>livrés chez vous.</span>
          </h1>
          <p style={{color:"rgba(255,255,255,0.65)",fontSize:15,lineHeight:1.7,marginBottom:28,maxWidth:300}}>Trouvez une pharmacie de garde à Abidjan et commandez en quelques secondes.</p>
          <button onClick={()=>setMode("catalog")} style={{width:"100%",background:G,color:W,border:"none",borderRadius:50,padding:"17px 24px",fontWeight:900,fontSize:16,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:10,boxShadow:"0 8px 30px rgba(0,168,89,0.4)",marginBottom:12}}>
            Commander mes médicaments <span style={{fontSize:18}}>→</span>
          </button>
          <button onClick={()=>setMode("pharmacie")} style={{width:"100%",background:"rgba(255,255,255,0.1)",color:W,border:"1.5px solid rgba(255,255,255,0.25)",borderRadius:50,padding:"14px 24px",fontWeight:700,fontSize:14,cursor:"pointer"}}>
            🏥 Espace Pharmacie
          </button>
        </div>
      </div>

      {/* STATS */}
      <div style={{background:TXT,padding:"22px 22px"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:4}}>
          {[["200+","Médicaments"],["30 min","Livraison"],["12","Pharmacies"]].map(([v,l])=>(
            <div key={l} style={{textAlign:"center"}}>
              <p style={{color:GL,fontWeight:900,fontSize:22,margin:"0 0 3px"}}>{v}</p>
              <p style={{color:"rgba(255,255,255,0.5)",fontSize:11,margin:0}}>{l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* PAIEMENTS */}
      <div style={{margin:"16px 16px 0",background:W,borderRadius:20,padding:20,boxShadow:"0 2px 16px rgba(0,0,0,0.06)"}}>
        <p style={{color:G,fontWeight:700,fontSize:11,letterSpacing:2,marginBottom:6}}>PAIEMENT</p>
        <h3 style={{color:TXT,fontWeight:900,fontSize:18,margin:"0 0 16px"}}>Payez comme vous voulez</h3>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          {[{logo:<LogoWave/>,lb:"Wave CI",desc:"Instantané"},{logo:<LogoOrange/>,lb:"Orange Money",desc:"Mobile Money"},{logo:<LogoCinetPay/>,lb:"Visa/Mastercard",desc:"CinetPay"},{logo:<LogoCash/>,lb:"Cash",desc:"À la livraison"}].map(({logo,lb,desc})=>(
            <div key={lb} style={{display:"flex",alignItems:"center",gap:10,background:BG,borderRadius:12,padding:10}}>
              <div style={{flexShrink:0}}>{logo}</div>
              <div><p style={{color:TXT,fontWeight:700,fontSize:12,margin:"0 0 1px"}}>{lb}</p><p style={{color:TXTS,fontSize:10,margin:0}}>{desc}</p></div>
            </div>
          ))}
        </div>
      </div>

      {/* PHARMACIES DE GARDE */}
      {gardeList.length>0&&(
        <div style={{padding:"16px 16px 0"}}>
          <h3 style={{color:TXT,fontWeight:900,margin:"0 0 12px",fontSize:17}}>🏥 Pharmacies de garde</h3>
          <div style={{overflowX:"auto",display:"flex",gap:12,scrollbarWidth:"none",paddingBottom:4}}>
            {gardeList.map(ph=>(
              <div key={ph.id} style={{background:W,borderRadius:16,padding:14,minWidth:180,flexShrink:0,boxShadow:"0 2px 12px rgba(0,0,0,0.08)"}}>
                <div style={{width:40,height:40,borderRadius:10,background:GBG,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,marginBottom:8}}>🏥</div>
                <p style={{color:TXT,fontWeight:700,fontSize:13,margin:"0 0 3px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{ph.nom||ph.name}</p>
                <p style={{color:TXTS,fontSize:11,margin:"0 0 8px"}}>{ph.district} · ⭐ {ph.note||ph.rating}</p>
                <span style={{background:GBG,color:GD,fontSize:10,fontWeight:700,padding:"4px 8px",borderRadius:8}}>GARDE ✓</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CATEGORIES */}
      <div style={{padding:"16px 16px 0"}}>
        <h3 style={{color:TXT,fontWeight:900,margin:"0 0 12px",fontSize:17}}>Catégories</h3>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10}}>
          {CATS.filter(c=>c.id!=="all").map(c=>(
            <button key={c.id} onClick={()=>{setCat(c.id);setMode("catalog");}} style={{background:W,border:"none",borderRadius:14,padding:"14px 5px",textAlign:"center",cursor:"pointer",boxShadow:"0 2px 10px rgba(0,0,0,0.06)"}}>
              <div style={{fontSize:24,marginBottom:5}}>{c.icon}</div>
              <p style={{color:TXT,fontSize:11,fontWeight:700,margin:0}}>{c.label}</p>
            </button>
          ))}
        </div>
      </div>

      {/* ACCES RAPIDE */}
      <div style={{padding:"16px 16px 0"}}>
        <div style={{display:"flex",gap:10}}>
          {[["🛵","Livreur","livreur"],["🏥","Pharmacie","pharmacie"],["⚙️","Admin","admin"]].map(([ic,lb,m])=>(
            <button key={m} onClick={()=>setMode(m)} style={{flex:1,background:W,border:`1.5px solid ${G}`,borderRadius:14,padding:"13px 8px",display:"flex",alignItems:"center",justifyContent:"center",gap:7,cursor:"pointer",boxShadow:"0 2px 10px rgba(0,0,0,0.06)"}}>
              <span style={{fontSize:18}}>{ic}</span><span style={{color:GD,fontWeight:700,fontSize:12}}>{lb}</span>
            </button>
          ))}
        </div>
      </div>

      {/* RECHERCHE */}
      <div style={{margin:"16px 16px 0",background:W,borderRadius:50,display:"flex",overflow:"hidden",boxShadow:"0 4px 20px rgba(0,0,0,0.12)",border:`2px solid ${G}`}}>
        <input value={q} onChange={e=>setQ(e.target.value)} onKeyDown={e=>e.key==="Enter"&&go()} placeholder="🔍 Rechercher un médicament..." style={{flex:1,border:"none",padding:"14px 18px",fontSize:14,outline:"none",color:TXT,background:"transparent"}}/>
        <button onClick={go} style={{background:G,border:"none",padding:"0 20px",color:W,fontWeight:800,cursor:"pointer",fontSize:14}}>Chercher</button>
      </div>

      <div style={{margin:"16px 16px 0",padding:"16px",textAlign:"center"}}>
        <p style={{color:TXTS,fontSize:11,margin:0}}>🇨🇮 SantéExpress · Abidjan, Côte d'Ivoire</p>
        <p style={{color:TXTS,fontSize:10,margin:"4px 0 0"}}>Pharmaciens certifiés · Paiements sécurisés</p>
      </div>
    </div>
  );
}

function Catalog({items,cats,cat,setCat,search,setSearch,onSelect,onAdd}){
  return(
    <div>
      <div style={{padding:"12px 14px 6px"}}>
        <div style={{display:"flex",background:W,borderRadius:11,overflow:"hidden",border:`2px solid ${G}`}}>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Rechercher un médicament..." style={{flex:1,border:"none",padding:"11px 13px",fontSize:14,outline:"none",color:TXT}}/>
          {search&&<button onClick={()=>setSearch("")} style={{background:"none",border:"none",padding:"0 13px",color:TXTS,cursor:"pointer",fontSize:17}}>✕</button>}
        </div>
      </div>
      <div style={{overflowX:"auto",padding:"6px 14px",display:"flex",gap:7,scrollbarWidth:"none"}}>
        {cats.map(c=>(
          <button key={c.id} onClick={()=>setCat(c.id)} style={{background:cat===c.id?G:W,color:cat===c.id?W:TXT,border:"none",borderRadius:20,padding:"7px 13px",fontWeight:600,cursor:"pointer",whiteSpace:"nowrap",fontSize:12,boxShadow:"0 2px 6px rgba(0,0,0,0.08)",flexShrink:0}}>
            {c.icon} {c.label}
          </button>
        ))}
      </div>
      <div style={{padding:"6px 14px 80px"}}>
        {items.length===0
          ?<div style={{textAlign:"center",padding:"60px 0",color:TXTS}}><div style={{fontSize:48}}>🔍</div><p style={{fontWeight:600,marginTop:12}}>Aucun produit trouvé</p></div>
          :items.map(p=>(
            <div key={p.id} onClick={()=>onSelect(p)} style={{background:W,borderRadius:13,padding:13,marginBottom:9,display:"flex",alignItems:"center",gap:11,boxShadow:"0 2px 8px rgba(0,0,0,0.06)",cursor:"pointer"}}>
              <div style={{width:50,height:50,borderRadius:11,background:GBG,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,flexShrink:0}}>{p.emoji}</div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:"flex",alignItems:"center",gap:5,marginBottom:2}}>
                  <p style={{color:TXT,fontWeight:700,fontSize:13,margin:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{p.nom||p.name}</p>
                  {(p.necessite_ordonnance||p.rx)&&<span style={{background:"#FFF3CD",color:"#7A5A00",fontSize:9,fontWeight:700,padding:"2px 5px",borderRadius:4,flexShrink:0}}>ORDO</span>}
                </div>
                <p style={{color:TXTS,fontSize:11,margin:"0 0 5px"}}>{p.unite||p.unit}</p>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                  <p style={{color:GD,fontWeight:800,fontSize:13,margin:0}}>{fmt(p.prix||p.price)}</p>
                  <button onClick={e=>{e.stopPropagation();if(p.en_stock||p.stock)onAdd(p);}} disabled={!(p.en_stock||p.stock)}
                    style={{background:(p.en_stock||p.stock)?G:"#DDD",color:W,border:"none",borderRadius:8,padding:"5px 12px",fontWeight:700,cursor:(p.en_stock||p.stock)?"pointer":"not-allowed",fontSize:12}}>
                    {(p.en_stock||p.stock)?"+ Ajouter":"Rupture"}
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

function Product({product,onAdd,inCart}){
  const price=product.prix||product.price;
  const stock=product.en_stock||product.stock;
  const rx=product.necessite_ordonnance||product.rx;
  return(
    <div style={{paddingBottom:90}}>
      <div style={{background:GBG,padding:"40px 18px",textAlign:"center"}}>
        <div style={{fontSize:76}}>{product.emoji}</div>
        {rx&&<div style={{display:"inline-flex",alignItems:"center",gap:6,background:AMBER,color:W,borderRadius:20,padding:"6px 15px",marginTop:12,fontWeight:700,fontSize:12}}>⚠️ Ordonnance requise</div>}
      </div>
      <div style={{padding:"18px 18px 0"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:4}}>
          <h2 style={{color:TXT,fontWeight:900,fontSize:20,margin:0,flex:1,lineHeight:1.3}}>{product.nom||product.name}</h2>
          <span style={{color:stock?G:RED,fontWeight:700,fontSize:12,marginLeft:8,flexShrink:0}}>{stock?"✓ En stock":"✗ Rupture"}</span>
        </div>
        <p style={{color:TXTS,fontSize:13,marginBottom:14}}>{product.unite||product.unit}</p>
        <div style={{background:GBG,borderRadius:11,padding:14,marginBottom:16}}>
          <p style={{color:TXTS,fontSize:10,fontWeight:700,margin:"0 0 3px",letterSpacing:1}}>PRIX</p>
          <p style={{color:GD,fontWeight:900,fontSize:28,margin:0}}>{fmt(price)}</p>
          <p style={{color:TXTS,fontSize:11,margin:"3px 0 0"}}>+ Livraison à partir de {fmt(DELIV_STD)}</p>
        </div>
        <h3 style={{color:TXT,fontWeight:700,fontSize:14,marginBottom:7}}>Description</h3>
        <p style={{color:TXTS,lineHeight:1.75,fontSize:13,marginBottom:14}}>{product.description||product.desc}</p>
        <div style={{background:"#EEF4FF",border:"1px solid #C5D8FF",borderRadius:10,padding:12,marginBottom:12}}>
          <p style={{color:WAVE_C,fontSize:12,margin:0,fontWeight:600}}>🛡️ Prise en charge possible par CNAM, MUGEF-CI, AMU.</p>
        </div>
      </div>
      <div style={{position:"fixed",bottom:64,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:480,padding:"13px 18px",background:W,borderTop:"1px solid #E8EDE9"}}>
        <button onClick={()=>{if(stock&&!inCart)onAdd(product);}} disabled={!stock||inCart}
          style={{width:"100%",background:inCart?"#4CAF50":(stock?G:"#CCC"),color:W,border:"none",borderRadius:13,padding:14,fontWeight:800,cursor:(stock&&!inCart)?"pointer":"default",fontSize:15}}>
          {inCart?"✓ Ajouté au panier":(stock?"🛒 Ajouter au panier":"Rupture de stock")}
        </button>
      </div>
    </div>
  );
}

function Cart({cart,subtotal,delivFee,onRemove,onQty,onCheckout,setMode}){
  const hasOrdo=cart.some(i=>i.rx||i.necessite_ordonnance);
  if(!cart.length) return(
    <div style={{textAlign:"center",padding:"70px 22px"}}>
      <div style={{fontSize:68}}>🛒</div>
      <h3 style={{color:TXT,fontWeight:800,marginTop:14,marginBottom:8}}>Panier vide</h3>
      <p style={{color:TXTS,marginBottom:24,fontSize:13}}>Parcourez notre catalogue et ajoutez des médicaments</p>
      <button onClick={()=>setMode("catalog")} style={{background:G,color:W,border:"none",borderRadius:11,padding:"13px 26px",fontWeight:700,cursor:"pointer",fontSize:14}}>Voir le catalogue</button>
    </div>
  );
  return(
    <div style={{paddingBottom:155}}>
      <div style={{padding:"13px 14px 6px"}}>
        {hasOrdo&&(
          <div style={{background:"#FFF9E6",border:`2px solid ${AMBER}`,borderRadius:12,padding:13,marginBottom:10,display:"flex",gap:10,alignItems:"flex-start"}}>
            <span style={{fontSize:22,flexShrink:0}}>📋</span>
            <div>
              <p style={{color:"#7A5A00",fontWeight:700,fontSize:13,margin:"0 0 3px"}}>Ordonnance requise</p>
              <p style={{color:"#7A5A00",fontSize:12,margin:0,lineHeight:1.5}}>Certains articles nécessitent une ordonnance médicale.</p>
            </div>
          </div>
        )}
        {cart.map(item=>(
          <div key={item.id} style={{background:W,borderRadius:13,padding:13,marginBottom:9,display:"flex",gap:11,boxShadow:"0 2px 8px rgba(0,0,0,0.06)"}}>
            <div style={{width:46,height:46,borderRadius:10,background:GBG,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>{item.emoji}</div>
            <div style={{flex:1}}>
              <p style={{color:TXT,fontWeight:700,fontSize:13,margin:"0 0 2px"}}>{item.nom||item.name}</p>
              <p style={{color:GD,fontWeight:800,fontSize:13,margin:"0 0 9px"}}>{fmt(item.prix||item.price)}</p>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <div style={{display:"flex",alignItems:"center",background:BG,borderRadius:7,overflow:"hidden"}}>
                  <button onClick={()=>onQty(item.id,item.qty-1)} style={{background:"none",border:"none",width:32,height:32,cursor:"pointer",fontWeight:700,fontSize:16,color:TXT}}>−</button>
                  <span style={{width:28,textAlign:"center",fontWeight:700,color:TXT,fontSize:14}}>{item.qty}</span>
                  <button onClick={()=>onQty(item.id,item.qty+1)} style={{background:"none",border:"none",width:32,height:32,cursor:"pointer",fontWeight:700,fontSize:16,color:G}}>+</button>
                </div>
                <button onClick={()=>onRemove(item.id)} style={{background:"none",border:"none",color:RED,cursor:"pointer",fontSize:19,padding:4}}>🗑️</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{position:"fixed",bottom:64,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:480,padding:"13px 18px",background:W,borderTop:"1px solid #E8EDE9"}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}><span style={{color:TXTS,fontSize:13}}>Sous-total</span><span style={{color:TXT,fontWeight:700,fontSize:13}}>{fmt(subtotal)}</span></div>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:10,paddingBottom:10,borderBottom:"1px solid #E8EDE9"}}><span style={{color:TXTS,fontSize:13}}>Livraison</span><span style={{color:G,fontWeight:700,fontSize:13}}>{fmt(delivFee)}</span></div>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:12}}><span style={{color:TXT,fontWeight:800,fontSize:15}}>Total</span><span style={{color:GD,fontWeight:900,fontSize:17}}>{fmt(subtotal+delivFee)}</span></div>
        <button onClick={onCheckout} style={{width:"100%",background:G,color:W,border:"none",borderRadius:13,padding:14,fontWeight:800,cursor:"pointer",fontSize:15}}>Commander · {fmt(subtotal+delivFee)}</button>
      </div>
    </div>
  );
}

function Checkout({cart,subtotal,delivFee,form,setForm,onConfirm}){
  const set=(k,v)=>setForm(p=>({...p,[k]:v}));
  const insurer=ASSURANCES.find(a=>a.id===form.insurer);
  const insAmt=form.payment==="assurance"&&insurer?Math.round(subtotal*insurer.cover/100):0;
  const toPay=subtotal+delivFee-insAmt;
  const valid=form.name.trim()&&form.phone.trim().length>=8&&form.address.trim();
  const PMODES=[
    {id:"wave",lb:"Wave CI",logo:<LogoWave/>,desc:"Paiement mobile instantané"},
    {id:"orange",lb:"Orange Money",logo:<LogoOrange/>,desc:"Avec votre numéro Orange CI"},
    {id:"cinetpay",lb:"CinetPay / Carte",logo:<LogoCinetPay/>,desc:"Visa, Mastercard, Maestro"},
    {id:"cash",lb:"Cash à la livraison",logo:<LogoCash/>,desc:"Payer directement le livreur"},
    {id:"assurance",lb:"Assurance maladie",logo:<LogoInsurance/>,desc:"CNAM, MUGEF-CI, AMU..."},
  ];
  return(
    <div style={{padding:"14px 14px 200px"}}>
      <h3 style={{color:TXT,fontWeight:800,fontSize:14,marginBottom:11}}>Mode de livraison</h3>
      <div style={{display:"flex",gap:10,marginBottom:20}}>
        {[{id:"std",icon:<span style={{fontSize:26}}>🛵</span>,lb:"SantéExpress",fee:DELIV_STD,sub:"30–45 min"},{id:"yango",icon:<LogoYango/>,lb:"Yango Delivery",fee:DELIV_YANGO,sub:"45–60 min"}].map(({id,icon,lb,fee,sub})=>(
          <button key={id} onClick={()=>set("delivMode",id)} style={{flex:1,background:W,border:`2px solid ${form.delivMode===id?G:"#E0E8E3"}`,borderRadius:13,padding:"13px 8px",textAlign:"center",cursor:"pointer",boxShadow:"0 2px 8px rgba(0,0,0,0.06)"}}>
            <div style={{marginBottom:6}}>{icon}</div>
            <p style={{color:TXT,fontWeight:700,fontSize:12,margin:"0 0 2px"}}>{lb}</p>
            <p style={{color:G,fontWeight:800,fontSize:12,margin:"0 0 2px"}}>{fmt(fee)}</p>
            <p style={{color:TXTS,fontSize:10,margin:0}}>{sub}</p>
          </button>
        ))}
      </div>
      <h3 style={{color:TXT,fontWeight:800,fontSize:14,marginBottom:11}}>Mode de paiement</h3>
      <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:18}}>
        {PMODES.map(({id,lb,logo,desc})=>(
          <button key={id} onClick={()=>set("payment",id)} style={{background:W,border:`2px solid ${form.payment===id?G:"#E8EDE9"}`,borderRadius:13,padding:"11px 13px",display:"flex",alignItems:"center",gap:12,cursor:"pointer",textAlign:"left"}}>
            <div style={{flexShrink:0}}>{logo}</div>
            <div style={{flex:1}}><p style={{color:TXT,fontWeight:700,fontSize:13,margin:"0 0 2px"}}>{lb}</p><p style={{color:TXTS,fontSize:11,margin:0}}>{desc}</p></div>
            <div style={{width:20,height:20,borderRadius:"50%",border:`2px solid ${form.payment===id?G:"#DDD"}`,background:form.payment===id?G:"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
              {form.payment===id&&<div style={{width:8,height:8,background:W,borderRadius:"50%"}}/>}
            </div>
          </button>
        ))}
      </div>
      {form.payment==="assurance"&&(
        <div style={{background:"#F0EEFF",border:"1px solid #C5BAF5",borderRadius:13,padding:15,marginBottom:18}}>
          <p style={{color:PURPLE,fontWeight:700,fontSize:13,marginBottom:11}}>🛡️ Sélectionnez votre assurance</p>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:13}}>
            {ASSURANCES.map(a=>(
              <button key={a.id} onClick={()=>set("insurer",a.id)} style={{background:form.insurer===a.id?a.clr:W,color:form.insurer===a.id?W:TXT,border:`2px solid ${form.insurer===a.id?a.clr:"#E8EDE9"}`,borderRadius:10,padding:"10px 7px",cursor:"pointer",fontWeight:700,fontSize:12,textAlign:"center"}}>
                <p style={{margin:"0 0 2px"}}>{a.name}</p><p style={{margin:0,fontSize:10,fontWeight:400,opacity:0.85}}>{a.cover}% couvert</p>
              </button>
            ))}
          </div>
          <label style={{color:TXTS,fontSize:12,fontWeight:600,marginBottom:5,display:"block"}}>N° immatriculation</label>
          <input value={form.insurerCard||""} onChange={e=>set("insurerCard",e.target.value)} placeholder="Ex: CNAM-CI-XXXXXXXX"
            style={{width:"100%",border:`2px solid ${form.insurerCard?"#9B8FE0":"#C5BAF5"}`,borderRadius:9,padding:"11px 12px",fontSize:14,outline:"none",color:TXT,background:W,boxSizing:"border-box"}}/>
          {insurer&&insAmt>0&&(
            <div style={{marginTop:11,background:W,borderRadius:9,padding:11}}>
              <div style={{display:"flex",justifyContent:"space-between",paddingTop:8,borderTop:"1px solid #EEE"}}>
                <span style={{color:TXT,fontWeight:700,fontSize:13}}>Votre ticket modérateur</span>
                <span style={{color:RED,fontWeight:800,fontSize:14}}>{fmt(subtotal-insAmt)}</span>
              </div>
            </div>
          )}
        </div>
      )}
      <h3 style={{color:TXT,fontWeight:800,fontSize:14,marginBottom:11}}>Informations de livraison</h3>
      <div style={{display:"flex",flexDirection:"column",gap:12}}>
        {[{k:"name",lb:"👤 Nom complet",ph:"Koné Amadou",t:"text"},{k:"phone",lb:"📱 Téléphone",ph:"+225 07 XX XX XX XX",t:"tel"},{k:"address",lb:"📍 Adresse de livraison",ph:"Quartier, rue, repère...",t:"text"}].map(({k,lb,ph,t})=>(
          <div key={k}>
            <label style={{color:TXTS,fontSize:12,fontWeight:600,marginBottom:5,display:"block"}}>{lb}</label>
            <input type={t} value={form[k]||""} onChange={e=>set(k,e.target.value)} placeholder={ph}
              style={{width:"100%",border:`2px solid ${form[k]?G:"#E0E8E3"}`,borderRadius:10,padding:"11px 13px",fontSize:14,outline:"none",color:TXT,background:W,boxSizing:"border-box"}}/>
          </div>
        ))}
        <div>
          <label style={{color:TXTS,fontSize:12,fontWeight:600,marginBottom:5,display:"block"}}>📝 Note au pharmacien <span style={{fontWeight:400}}>(optionnel)</span></label>
          <textarea value={form.note||""} onChange={e=>set("note",e.target.value)} placeholder="Allergies, grossesse..." rows={2}
            style={{width:"100%",border:"2px solid #E0E8E3",borderRadius:10,padding:"11px 13px",fontSize:13,outline:"none",color:TXT,background:W,boxSizing:"border-box",resize:"none"}}/>
        </div>
      </div>
      <div style={{background:W,borderRadius:13,padding:13,marginTop:16,boxShadow:"0 2px 8px rgba(0,0,0,0.06)"}}>
        {cart.map(i=>(
          <div key={i.id} style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
            <span style={{color:TXTS,fontSize:12}}>{i.nom||i.name} ×{i.qty}</span>
            <span style={{color:TXT,fontWeight:600,fontSize:12}}>{fmt((i.prix||i.price)*i.qty)}</span>
          </div>
        ))}
        {insAmt>0&&<div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}><span style={{color:G,fontSize:12}}>Assurance</span><span style={{color:G,fontWeight:700,fontSize:12}}>−{fmt(insAmt)}</span></div>}
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}><span style={{color:TXTS,fontSize:12}}>Livraison</span><span style={{color:TXT,fontWeight:600,fontSize:12}}>{fmt(delivFee)}</span></div>
        <div style={{borderTop:"1px solid #E8EDE9",paddingTop:8,marginTop:6,display:"flex",justifyContent:"space-between"}}>
          <span style={{color:TXT,fontWeight:800,fontSize:14}}>Total à payer</span>
          <span style={{color:GD,fontWeight:900,fontSize:16}}>{fmt(toPay)}</span>
        </div>
      </div>
      <div style={{position:"fixed",bottom:64,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:480,padding:"13px 18px",background:W,borderTop:"1px solid #E8EDE9",boxShadow:"0 -4px 20px rgba(0,0,0,0.08)"}}>
        <button onClick={onConfirm} disabled={!valid}
          style={{width:"100%",background:valid?G:"#C5D9CC",color:W,border:"none",borderRadius:13,padding:14,fontWeight:800,cursor:valid?"pointer":"not-allowed",fontSize:15}}>
          {valid?`✓ Commander · ${fmt(toPay)}`:"Remplissez les champs requis"}
        </button>
      </div>
    </div>
  );
}

function Tracking({order,onRate}){
  const isDelivered=order.status==="delivered";
  const [step,setStep]=useState(isDelivered?4:1);
  useEffect(()=>{
    if(step<4){const t=setTimeout(()=>setStep(s=>s+1),3500);return()=>clearTimeout(t);}
  },[step]);
  const STEPS=[{ic:"✅",lb:"Commande confirmée",sub:"Reçue par la pharmacie"},{ic:"💊",lb:"Préparation en cours",sub:"Le pharmacien prépare votre sac"},{ic:"🛵",lb:"Livreur en route",sub:"Votre commande est en chemin"},{ic:"🏠",lb:"Livraison effectuée",sub:"Votre commande est arrivée !"}];
  const PAY_LBL={wave:"Wave CI",orange:"Orange Money",cinetpay:"CinetPay",cash:"Cash",assurance:"Assurance"};
  return(
    <div style={{padding:"16px 16px",paddingBottom:80}}>
      <div style={{background:W,borderRadius:13,padding:13,marginBottom:14,display:"flex",justifyContent:"space-between",alignItems:"center",boxShadow:"0 2px 8px rgba(0,0,0,0.06)"}}>
        <div><p style={{color:TXTS,fontSize:10,fontWeight:700,margin:"0 0 3px",letterSpacing:1}}>COMMANDE</p><p style={{color:TXT,fontWeight:800,fontSize:16,margin:0}}>#{order.id}</p></div>
        <div style={{textAlign:"right"}}><p style={{color:TXTS,fontSize:11,margin:"0 0 3px"}}>{order.date}</p><p style={{color:GD,fontWeight:800,fontSize:14,margin:0}}>{fmt(order.total)}</p></div>
      </div>
      <div style={{background:W,borderRadius:13,padding:"16px 16px",marginBottom:14,boxShadow:"0 2px 8px rgba(0,0,0,0.06)"}}>
        {STEPS.map((s,i)=>{
          const done=step>i,active=step===i+1;
          return(
            <div key={i} style={{display:"flex",gap:14,marginBottom:i<3?18:0}}>
              <div style={{display:"flex",flexDirection:"column",alignItems:"center",flexShrink:0}}>
                <div style={{width:38,height:38,borderRadius:"50%",background:done?G:(active?"#FFF9E6":BG),border:active?`2px solid ${AMBER}`:done?`2px solid ${G}`:"2px solid #E0E8E3",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,transition:"all 0.4s"}}>
                  <span style={{opacity:done||active?1:0.35}}>{s.ic}</span>
                </div>
                {i<3&&<div style={{width:2,height:24,background:done?G:"#E0E8E3",marginTop:3,transition:"background 0.4s"}}/>}
              </div>
              <div style={{paddingTop:7}}>
                <p style={{color:done?TXT:(active?AMBER:TXTS),fontWeight:done||active?700:400,fontSize:13,margin:"0 0 2px"}}>{s.lb}</p>
                <p style={{color:done?G:(active?AMBER:TXTS),fontSize:11,margin:0}}>{s.sub}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div style={{background:W,borderRadius:13,padding:13,marginBottom:12,boxShadow:"0 2px 8px rgba(0,0,0,0.06)"}}>
        {[["📍",order.address||"Adresse de livraison"],["🏪",order.pharmacy||"Pharmacie partenaire"],["💳",PAY_LBL[order.payment]||"Cash"]].map(([ic,v])=>(
          <div key={v} style={{display:"flex",gap:9,marginBottom:7}}><span style={{fontSize:14}}>{ic}</span><span style={{color:TXT,fontSize:13,fontWeight:600}}>{v}</span></div>
        ))}
      </div>
      {(step===4||isDelivered)&&!order.rating&&(
        <div style={{background:`linear-gradient(135deg,${G},${GD})`,borderRadius:13,padding:16,textAlign:"center"}}>
          <p style={{color:W,fontWeight:700,fontSize:14,marginBottom:8}}>🌟 Commande livrée ! Merci</p>
          <p style={{color:GL,fontSize:12,marginBottom:14}}>Notez votre pharmacien et votre livreur</p>
          <button onClick={onRate} style={{background:W,color:G,border:"none",borderRadius:10,padding:"10px 24px",fontWeight:800,cursor:"pointer",fontSize:14}}>Laisser un avis ⭐</button>
        </div>
      )}
      {order.rating&&<div style={{background:GBG,borderRadius:13,padding:13,textAlign:"center"}}><p style={{color:GD,fontWeight:700,fontSize:13}}>Merci pour votre avis · {"⭐".repeat(order.rating)}</p></div>}
    </div>
  );
}

function History({orders,onOpen,onRate}){
  const STA={confirmed:"En cours 🔄",delivering:"En livraison 🛵",delivered:"Livré ✅",cancelled:"Annulé ❌"};
  const STAC={confirmed:AMBER,delivering:WAVE_C,delivered:G,cancelled:RED};
  if(!orders.length) return(
    <div style={{textAlign:"center",padding:"70px 22px"}}>
      <div style={{fontSize:68}}>📋</div>
      <h3 style={{color:TXT,fontWeight:800,marginTop:14,marginBottom:8}}>Aucune commande</h3>
      <p style={{color:TXTS,fontSize:13}}>Vos commandes apparaîtront ici</p>
    </div>
  );
  return(
    <div style={{padding:"13px 14px 80px"}}>
      {orders.map(o=>(
        <div key={o.id} onClick={()=>onOpen(o)} style={{background:W,borderRadius:13,padding:14,marginBottom:10,boxShadow:"0 2px 8px rgba(0,0,0,0.06)",cursor:"pointer"}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
            <span style={{color:TXT,fontWeight:800,fontSize:14}}>#{o.id}</span>
            <span style={{color:STAC[o.status]||AMBER,fontWeight:700,fontSize:12}}>{STA[o.status]||o.status}</span>
          </div>
          <p style={{color:TXTS,fontSize:12,margin:"0 0 6px"}}>{o.date} · {o.pharmacy||"Pharmacie"}</p>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <span style={{color:GD,fontWeight:800,fontSize:14}}>{fmt(o.total)}</span>
            {o.status==="delivered"&&!o.rating&&(
              <button onClick={e=>{e.stopPropagation();onRate(o);}} style={{background:GBG,border:"none",borderRadius:8,padding:"5px 10px",color:GD,fontWeight:700,cursor:"pointer",fontSize:11}}>⭐ Noter</button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function Rating({order,onDone}){
  const [stars,setStars]=useState(0);
  const [hover,setHover]=useState(0);
  return(
    <div style={{padding:"30px 22px"}}>
      <div style={{textAlign:"center",marginBottom:30}}>
        <div style={{fontSize:56,marginBottom:12}}>⭐</div>
        <h2 style={{color:TXT,fontWeight:900,marginBottom:6}}>Votre avis</h2>
        <p style={{color:TXTS,fontSize:13}}>Commande #{order.id}</p>
      </div>
      <div style={{display:"flex",justifyContent:"center",gap:12,marginBottom:30}}>
        {[1,2,3,4,5].map(i=>(
          <button key={i} onClick={()=>setStars(i)} onMouseEnter={()=>setHover(i)} onMouseLeave={()=>setHover(0)}
            style={{background:"none",border:"none",fontSize:42,cursor:"pointer",transition:"transform 0.1s",transform:(hover||stars)>=i?"scale(1.15)":"scale(1)"}}>
            {(hover||stars)>=i?"⭐":"☆"}
          </button>
        ))}
      </div>
      <button onClick={()=>stars>0&&onDone(stars)} disabled={stars===0}
        style={{width:"100%",background:stars>0?G:"#CCC",color:W,border:"none",borderRadius:13,padding:15,fontWeight:800,cursor:stars>0?"pointer":"not-allowed",fontSize:15}}>
        {stars>0?`Envoyer mon avis (${stars} étoile${stars>1?"s":""})`:"Sélectionnez une note"}
      </button>
    </div>
  );
}

function Livreur({orders}){
  const active=orders.filter(o=>o.status==="confirmed"||o.status==="delivering");
  return(
    <div style={{padding:"16px 16px 40px"}}>
      <div style={{background:`linear-gradient(135deg,${G},${GD})`,borderRadius:16,padding:18,marginBottom:16,color:W}}>
        <h2 style={{fontWeight:900,fontSize:20,margin:"0 0 5px"}}>🛵 Espace Livreur</h2>
        <p style={{fontSize:13,opacity:0.8,margin:0}}>{active.length} livraison{active.length!==1?"s":""} en attente</p>
      </div>
      {active.length===0
        ?<div style={{textAlign:"center",padding:"40px 0",color:TXTS}}><div style={{fontSize:48}}>✅</div><p style={{fontWeight:600,marginTop:12}}>Aucune livraison en attente</p></div>
        :active.map(o=>(
          <div key={o.id} style={{background:W,borderRadius:13,padding:14,marginBottom:10,boxShadow:"0 2px 8px rgba(0,0,0,0.06)"}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
              <span style={{color:TXT,fontWeight:800}}>#{o.id}</span>
              <span style={{color:GD,fontWeight:700}}>{fmt(o.total)}</span>
            </div>
            <p style={{color:TXTS,fontSize:12,margin:"0 0 8px"}}>📍 {o.address||"Adresse non renseignée"}</p>
            <button style={{background:G,color:W,border:"none",borderRadius:9,padding:"8px 16px",fontWeight:700,cursor:"pointer",fontSize:13}}>Accepter la livraison</button>
          </div>
        ))
      }
    </div>
  );
}

function Admin({orders,pharmacies}){
  const total=orders.reduce((s,o)=>s+o.total,0);
  const commission=Math.round(total*0.03);
  return(
    <div style={{padding:"16px 16px 40px"}}>
      <div style={{background:`linear-gradient(135deg,#1a1a2e,#16213e)`,borderRadius:16,padding:18,marginBottom:16,color:W}}>
        <h2 style={{fontWeight:900,fontSize:20,margin:"0 0 5px"}}>⚙️ Administration</h2>
        <p style={{fontSize:13,opacity:0.7,margin:0}}>Vue d'ensemble SantéExpress</p>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>
        {[[orders.length,"Commandes","📋"],[pharmacies?.length||12,"Pharmacies","🏥"],[fmt(total),"Chiffre d'affaires","💰"],[fmt(commission),"Commission (3%)","📊"]].map(([v,l,ic])=>(
          <div key={l} style={{background:W,borderRadius:13,padding:14,boxShadow:"0 2px 8px rgba(0,0,0,0.06)"}}>
            <div style={{fontSize:24,marginBottom:6}}>{ic}</div>
            <p style={{color:TXT,fontWeight:900,fontSize:16,margin:"0 0 2px"}}>{v}</p>
            <p style={{color:TXTS,fontSize:11,margin:0}}>{l}</p>
          </div>
        ))}
      </div>
      <h3 style={{color:TXT,fontWeight:800,marginBottom:10}}>Dernières commandes</h3>
      {orders.slice(0,5).map(o=>(
        <div key={o.id} style={{background:W,borderRadius:11,padding:12,marginBottom:8,display:"flex",justifyContent:"space-between",alignItems:"center",boxShadow:"0 2px 6px rgba(0,0,0,0.05)"}}>
          <div><p style={{color:TXT,fontWeight:700,fontSize:13,margin:"0 0 2px"}}>#{o.id}</p><p style={{color:TXTS,fontSize:11,margin:0}}>{o.date}</p></div>
          <span style={{color:GD,fontWeight:800,fontSize:13}}>{fmt(o.total)}</span>
        </div>
      ))}
    </div>
  );
}

function Pharmacie(){
  return(
    <div style={{padding:"16px 16px 40px"}}>
      <div style={{background:`linear-gradient(135deg,${G},${GD})`,borderRadius:16,padding:24,marginBottom:20,color:W,textAlign:"center"}}>
        <div style={{fontSize:48,marginBottom:10}}>🏥</div>
        <h2 style={{fontWeight:900,fontSize:22,margin:"0 0 8px"}}>Espace Pharmacie</h2>
        <p style={{fontSize:14,opacity:0.85,margin:"0 0 16px"}}>Rejoignez le réseau SantéExpress</p>
        <button style={{background:W,color:G,border:"none",borderRadius:30,padding:"12px 24px",fontWeight:800,cursor:"pointer",fontSize:14}}>Demander à rejoindre</button>
      </div>
      {[["💊","Gestion des stocks","Gérez vos produits en temps réel"],["📦","Réception des commandes","Recevez et préparez les commandes clients"],["📊","Tableau de bord","Suivez vos ventes et performances"],["💳","Paiements sécurisés","Commission de 3% seulement"]].map(([ic,t,s])=>(
        <div key={t} style={{background:W,borderRadius:13,padding:14,marginBottom:10,display:"flex",gap:12,alignItems:"center",boxShadow:"0 2px 8px rgba(0,0,0,0.06)"}}>
          <div style={{width:44,height:44,borderRadius:11,background:GBG,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>{ic}</div>
          <div><p style={{color:TXT,fontWeight:700,fontSize:14,margin:"0 0 2px"}}>{t}</p><p style={{color:TXTS,fontSize:12,margin:0}}>{s}</p></div>
        </div>
      ))}
    </div>
  );
}

function LoginModal({onClose,onSuccess}){
  const [phone,setPhone]=useState("");
  const [loading,setLoading]=useState(false);
  const submit=async()=>{
    if(!phone.trim())return;
    setLoading(true);
    await new Promise(r=>setTimeout(r,800));
    onSuccess(phone,{nom:"Utilisateur",phone});
    setLoading(false);
  };
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",zIndex:300,display:"flex",alignItems:"flex-end",justifyContent:"center"}}>
      <div style={{background:W,borderRadius:"20px 20px 0 0",padding:24,width:"100%",maxWidth:480}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
          <h3 style={{color:TXT,fontWeight:800,margin:0}}>Connexion</h3>
          <button onClick={onClose} style={{background:"none",border:"none",fontSize:22,cursor:"pointer",color:TXTS}}>✕</button>
        </div>
        <label style={{color:TXTS,fontSize:12,fontWeight:600,marginBottom:6,display:"block"}}>📱 Numéro de téléphone</label>
        <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="+225 07 XX XX XX XX"
          style={{width:"100%",border:`2px solid ${phone?G:"#E0E8E3"}`,borderRadius:11,padding:"13px 14px",fontSize:15,outline:"none",color:TXT,boxSizing:"border-box",marginBottom:14}}/>
        <button onClick={submit} disabled={!phone.trim()||loading}
          style={{width:"100%",background:phone.trim()?G:"#CCC",color:W,border:"none",borderRadius:11,padding:14,fontWeight:800,cursor:phone.trim()?"pointer":"not-allowed",fontSize:15}}>
          {loading?"Connexion...":"Se connecter"}
        </button>
      </div>
    </div>
  );
}

/* ══ COMPOSANT RACINE ═══════════════════════════════════ */
export default function SantéExpress(){
  const [mode,setMode]=useState("landing");
  const [cart,setCart]=useState([]);
  const [product,setProduct]=useState(null);
  const [search,setSearch]=useState("");
  const [cat,setCat]=useState("all");
  const [form,setForm]=useState({name:"",phone:"",address:"",note:"",payment:"wave",delivMode:"std",insurer:"",insurerCard:""});
  const [orders,setOrders]=useState(INIT_ORDERS);
  const [curOrder,setCurOrder]=useState(null);
  const [rateTarget,setRateTarget]=useState(null);
  const [token,setToken]=useState(null);
  const [user,setUser]=useState(null);
  const [showLogin,setShowLogin]=useState(false);
  const [itemsData,setItemsData]=useState([]);
  const [pharmaciesData,setPharmaciesData]=useState([]);
  const [searching,setSearching]=useState(false);

  useEffect(()=>{
    fetch("/api/produits").then(r=>r.json()).then(d=>{if(d?.produits?.length)setItemsData(d.produits);}).catch(()=>{});
    fetch("/api/pharmacies").then(r=>r.json()).then(d=>{if(d?.pharmacies?.length)setPharmaciesData(d.pharmacies);}).catch(()=>{});
  },[]);

  const subtotal=cart.reduce((s,i)=>s+((i.prix||i.price)||0)*i.qty,0);
  const delivFee=form.delivMode==="yango"?DELIV_YANGO:DELIV_STD;
  const count=cart.reduce((s,i)=>s+i.qty,0);

  const addToCart=item=>setCart(prev=>{
    const ex=prev.find(i=>i.id===item.id);
    if(ex)return prev.map(i=>i.id===item.id?{...i,qty:i.qty+1}:i);
    return [...prev,{...item,qty:1}];
  });
  const removeItem=id=>setCart(prev=>prev.filter(i=>i.id!==id));
  const updateQty=(id,qty)=>qty<1?removeItem(id):setCart(prev=>prev.map(i=>i.id===id?{...i,qty}:i));

  const navBack=()=>{
    const map={product:"catalog",checkout:"cart",tracking:"history",history:"landing",rating:"history",livreur:"landing",admin:"landing",pharmacie:"landing"};
    setMode(map[mode]||"landing");
  };

  const filtered=itemsData.filter(p=>(cat==="all"||p.categorie===cat||p.cat===cat)&&((p.nom||p.name)||"").toLowerCase().includes(search.toLowerCase()));

  const placeOrder=async()=>{
    const insurer=ASSURANCES.find(a=>a.id===form.insurer);
    const insAmt=form.payment==="assurance"&&insurer?Math.round(subtotal*insurer.cover/100):0;
    const body={
      items:cart.map(i=>({produit_id:i.id,nom_produit:i.nom||i.name,prix_unitaire:i.prix||i.price,quantite:i.qty})),
      pharmacie_id:pharmaciesData[0]?.id||1,
      adresse_livraison:form.address,telephone_client:form.phone,nom_client:form.name,
      mode_paiement:form.payment,mode_livraison:form.delivMode,
      frais_livraison:delivFee,couverture_assurance:insAmt,
      sous_total:subtotal,note_pharmacien:form.note||null,
    };
    let ref=`PC-${String(orders.length+4).padStart(4,"0")}`;
    try{
      const r=await fetch("/api/commandes",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(body)});
      const d=await r.json();
      if(d?.commande?.reference)ref=d.commande.reference;
    }catch{}
    const o={id:ref,date:new Date().toLocaleDateString("fr-FR"),items:[...cart],subtotal,delivFee,total:subtotal+delivFee-insAmt,status:"confirmed",pharmacy:(pharmaciesData[0]?.nom||"Pharmacie partenaire"),payment:form.payment,delivMode:form.delivMode,address:form.address,phone:form.phone,name:form.name,rating:null};
    setOrders(prev=>[o,...prev]);
    setCurOrder(o);
    setCart([]);
    setSearching(true);
  };

  return(
    <>
      <Head>
        <title>SantéExpress — Médicaments livrés à Abidjan</title>
        <meta name="description" content="Commandez vos médicaments en ligne et faites-les livrer chez vous à Abidjan. Pharmacies de garde, paiement Mobile Money."/>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <div style={{fontFamily:"'Segoe UI',sans-serif",background:BG,minHeight:"100vh",maxWidth:480,margin:"0 auto",paddingBottom:["livreur","admin","pharmacie"].includes(mode)?0:64}}>
        <Header mode={mode} navBack={navBack} count={count} setMode={setMode} user={user} onLogin={()=>setShowLogin(true)}/>
        {showLogin&&<LoginModal onClose={()=>setShowLogin(false)} onSuccess={(tok,usr)=>{setToken(tok);setUser(usr);setShowLogin(false);}}/>}
        {searching&&<SearchingPharmacy commune={form.address.split(",")[0]||"Abidjan"} onFound={()=>{setSearching(false);setMode("tracking");}}/>}
        {mode==="landing"&&<Landing setMode={setMode} setCat={setCat} pharmacies={pharmaciesData}/>}
        {mode==="catalog"&&<Catalog items={filtered} cats={CATS} cat={cat} setCat={setCat} search={search} setSearch={setSearch} onSelect={p=>{setProduct(p);setMode("product");}} onAdd={addToCart}/>}
        {mode==="product"&&product&&<Product product={product} onAdd={addToCart} inCart={cart.some(i=>i.id===product.id)}/>}
        {mode==="cart"&&<Cart cart={cart} subtotal={subtotal} delivFee={delivFee} onRemove={removeItem} onQty={updateQty} onCheckout={()=>setMode("checkout")} setMode={setMode}/>}
        {mode==="checkout"&&<Checkout cart={cart} subtotal={subtotal} delivFee={delivFee} form={form} setForm={setForm} onConfirm={placeOrder}/>}
        {mode==="tracking"&&curOrder&&<Tracking order={curOrder} onRate={()=>{setRateTarget(curOrder);setMode("rating");}}/>}
        {mode==="history"&&<History orders={orders} onOpen={o=>{setCurOrder(o);setMode("tracking");}} onRate={o=>{setRateTarget(o);setMode("rating");}}/>}
        {mode==="rating"&&rateTarget&&<Rating order={rateTarget} onDone={r=>{setOrders(prev=>prev.map(o=>o.id===rateTarget.id?{...o,rating:r}:o));setMode("history");}}/>}
        {mode==="livreur"&&<Livreur orders={orders}/>}
        {mode==="admin"&&<Admin orders={orders} pharmacies={pharmaciesData}/>}
        {mode==="pharmacie"&&<Pharmacie/>}
        {!["livreur","admin","pharmacie"].includes(mode)&&<BottomNav mode={mode} setMode={setMode} count={count}/>}
      </div>
    </>
  );
}
