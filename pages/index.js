import { useState, useEffect } from "react";

// ══════════════════════════════════════════
// TOKENS
// ══════════════════════════════════════════
const G="#00A859",GL="#C8FFDF",GD="#007A42",GBG="#E8F5EE";
const W="#FFFFFF",BG="#F4F6F5",TXT="#0E1A13",TXTS="#6B7D73";
const ERR="#E53935",WARN="#FF8F00",INFO="#1976D2";

// ══════════════════════════════════════════
// DONNÉES INITIALES
// ══════════════════════════════════════════
const PHARMACIES_GARDE = [
  {id:1,nom:"Pharmacie Centrale",commune:"Plateau",adresse:"Av. Lamblin, Plateau",tel:"+225 20 21 18 42",note:4.7,garde:true},
  {id:2,nom:"Pharmacie Sainte Marie",commune:"Cocody",adresse:"Cocody, Blvd de France",tel:"+225 22 44 55 66",note:4.6,garde:true},
  {id:3,nom:"Pharmacie de la Paix",commune:"Yopougon",adresse:"Yopougon, Maroc",tel:"+225 23 45 67 89",note:4.5,garde:true},
];

const MEDICAMENTS = [
  {id:1,nom:"Paracétamol 500mg",categorie:"Antidouleurs",description:"Boîte 16 cp",prix:500,emoji:"💊",stock:150,ordonnance:false},
  {id:2,nom:"Ibuprofène 400mg",categorie:"Antidouleurs",description:"Boîte 14 cp",prix:850,emoji:"💊",stock:80,ordonnance:false},
  {id:3,nom:"Doliprane 1000mg",categorie:"Antidouleurs",description:"Boîte 8 cp",prix:950,emoji:"💊",stock:60,ordonnance:false},
  {id:4,nom:"Vitamine C 1000mg",categorie:"Vitamines",description:"Boîte 30 cp",prix:1200,emoji:"🍊",stock:200,ordonnance:false},
  {id:5,nom:"Zinc + Vitamine D3",categorie:"Vitamines",description:"Flacon 60 gél.",prix:2500,emoji:"🌿",stock:90,ordonnance:false},
  {id:6,nom:"Amoxicilline 500mg",categorie:"Antibiotiques",description:"Boîte 16 gél.",prix:1800,emoji:"💉",stock:45,ordonnance:true},
  {id:7,nom:"Metronidazole 500mg",categorie:"Antibiotiques",description:"Boîte 14 cp",prix:1200,emoji:"💉",stock:55,ordonnance:true},
  {id:8,nom:"Sérum physiologique",categorie:"Soins",description:"Flacon 100ml",prix:600,emoji:"🧴",stock:120,ordonnance:false},
  {id:9,nom:"Thermomètre digital",categorie:"Matériel",description:"Frontal infrarouge",prix:8500,emoji:"🌡️",stock:25,ordonnance:false},
  {id:10,nom:"Couches bébé Taille 2",categorie:"Bébé",description:"Paquet 40 pièces",prix:4500,emoji:"👶",stock:70,ordonnance:false},
  {id:11,nom:"Sirop toux enfant",categorie:"Bébé",description:"Flacon 125ml",prix:1500,emoji:"🍼",stock:40,ordonnance:false},
  {id:12,nom:"Tensio-mètre",categorie:"Matériel",description:"Bras automatique",prix:18000,emoji:"🩺",stock:10,ordonnance:false},
  {id:13,nom:"Chloroquine 100mg",categorie:"Antidouleurs",description:"Boîte 30 cp",prix:750,emoji:"💊",stock:100,ordonnance:true},
  {id:14,nom:"Fer + Acide folique",categorie:"Vitamines",description:"Boîte 60 cp",prix:1100,emoji:"🌿",stock:85,ordonnance:false},
  {id:15,nom:"Gel hydroalcoolique",categorie:"Soins",description:"Flacon 500ml",prix:1800,emoji:"🧴",stock:200,ordonnance:false},
];

const CATEGORIES = ["Tout","Antidouleurs","Vitamines","Antibiotiques","Soins","Bébé","Matériel"];

const COMMANDES_DEMO = [
  {id:"SE-0001",date:"2026-06-10",statut:"livree",total:2500,pharmacie:"Pharmacie Centrale",items:[{nom:"Paracétamol 500mg",qte:2,prix:500},{nom:"Vitamine C",qte:1,prix:1200}]},
  {id:"SE-0002",date:"2026-06-11",statut:"en_cours",total:1800,pharmacie:"Pharmacie de la Paix",items:[{nom:"Ibuprofène 400mg",qte:2,prix:850}]},
];

// ══════════════════════════════════════════
// STYLES GLOBAUX
// ══════════════════════════════════════════
const S = {
  app:{minHeight:"100vh",background:BG,fontFamily:"'Segoe UI',system-ui,sans-serif",maxWidth:480,margin:"0 auto",position:"relative"},
  header:{background:`linear-gradient(135deg,${GD},${G})`,padding:"14px 16px",display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:100,boxShadow:"0 2px 12px rgba(0,168,89,0.3)"},
  logo:{color:W,fontWeight:900,fontSize:20,letterSpacing:-0.5},
  btn:{background:G,color:W,border:"none",borderRadius:12,padding:"12px 20px",fontWeight:700,fontSize:15,cursor:"pointer",display:"flex",alignItems:"center",gap:8,justifyContent:"center"},
  btnOutline:{background:"transparent",color:G,border:`2px solid ${G}`,borderRadius:12,padding:"11px 20px",fontWeight:700,fontSize:15,cursor:"pointer"},
  btnGray:{background:"#E8ECE9",color:TXT,border:"none",borderRadius:12,padding:"12px 20px",fontWeight:600,fontSize:15,cursor:"pointer"},
  card:{background:W,borderRadius:16,padding:16,boxShadow:"0 2px 8px rgba(0,0,0,0.06)",marginBottom:12},
  input:{width:"100%",border:`1.5px solid #D4E8DC`,borderRadius:12,padding:"13px 16px",fontSize:15,color:TXT,outline:"none",boxSizing:"border-box",background:W},
  label:{fontSize:13,fontWeight:600,color:TXTS,marginBottom:6,display:"block"},
  section:{padding:"0 16px",marginBottom:24},
  h2:{fontSize:18,fontWeight:800,color:TXT,margin:"0 0 16px"},
  badge:{display:"inline-flex",alignItems:"center",gap:4,padding:"4px 10px",borderRadius:20,fontSize:12,fontWeight:700},
  tabs:{display:"flex",background:W,borderBottom:`2px solid #E8ECE9`,position:"sticky",top:56,zIndex:90},
  tab:{flex:1,padding:"13px 8px",border:"none",background:"transparent",fontWeight:600,fontSize:13,cursor:"pointer",color:TXTS,borderBottom:"3px solid transparent"},
  tabActive:{color:G,borderBottom:`3px solid ${G}`},
  bottomNav:{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:480,background:W,borderTop:"1.5px solid #E8ECE9",display:"flex",zIndex:200,boxShadow:"0 -2px 12px rgba(0,0,0,0.08)"},
  navItem:{flex:1,padding:"10px 4px",border:"none",background:"transparent",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:3,fontSize:11,fontWeight:600,color:TXTS},
  navItemActive:{color:G},
  overlay:{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",zIndex:300,display:"flex",alignItems:"flex-end",justifyContent:"center"},
  modal:{background:W,borderRadius:"20px 20px 0 0",padding:24,width:"100%",maxWidth:480,maxHeight:"90vh",overflowY:"auto"},
  chip:{padding:"8px 16px",borderRadius:20,border:`1.5px solid #D4E8DC`,background:W,fontSize:13,fontWeight:600,cursor:"pointer",whiteSpace:"nowrap"},
  chipActive:{background:G,color:W,border:`1.5px solid ${G}`},
  statCard:{background:W,borderRadius:14,padding:16,textAlign:"center",flex:1,boxShadow:"0 2px 8px rgba(0,0,0,0.06)"},
};

// ══════════════════════════════════════════
// COMPOSANTS UTILITAIRES
// ══════════════════════════════════════════
function Badge({color,bg,children}){
  return <span style={{...S.badge,background:bg||GL,color:color||GD}}>{children}</span>;
}

function Toast({msg,type,onClose}){
  useEffect(()=>{const t=setTimeout(onClose,3000);return()=>clearTimeout(t);},[]);
  const bg=type==="success"?G:type==="error"?ERR:INFO;
  return(
    <div style={{position:"fixed",top:70,left:"50%",transform:"translateX(-50%)",background:bg,color:W,padding:"12px 20px",borderRadius:12,fontWeight:700,fontSize:14,zIndex:999,boxShadow:"0 4px 20px rgba(0,0,0,0.2)",maxWidth:360,textAlign:"center"}}>
      {msg}
    </div>
  );
}

function Spinner(){
  return <div style={{width:24,height:24,border:`3px solid ${GL}`,borderTop:`3px solid ${G}`,borderRadius:"50%",animation:"spin 0.8s linear infinite",margin:"20px auto"}} />;
}

// ══════════════════════════════════════════
// PAGE ACCUEIL
// ══════════════════════════════════════════
function PageAccueil({setPage,panier,setPanier,user}){
  const [commune,setCommune]=useState("Toutes");
  const [searchQ,setSearchQ]=useState("");
  const communes=["Toutes","Plateau","Cocody","Yopougon","Abobo","Adjamé","Marcory","Treichville","Koumassi","Port-Bouët"];

  return(
    <div style={{paddingBottom:80}}>
      {/* HERO */}
      <div style={{background:`linear-gradient(160deg,${GD} 0%,${G} 100%)`,padding:"28px 20px 32px",color:W}}>
        <div style={{display:"flex",gap:8,marginBottom:16,flexWrap:"wrap"}}>
          {["🌙 Garde 24h/24","🛵 Livraison rapide","📱 Mobile Money"].map(t=>(
            <span key={t} style={{background:"rgba(255,255,255,0.15)",borderRadius:20,padding:"5px 12px",fontSize:12,fontWeight:600,color:W}}>{t}</span>
          ))}
        </div>
        <h1 style={{fontSize:28,fontWeight:900,margin:"0 0 8px",lineHeight:1.2}}>
          Vos médicaments<br/><span style={{color:GL}}>livrés chez vous.</span>
        </h1>
        <p style={{fontSize:14,opacity:0.85,margin:"0 0 20px"}}>Trouvez une pharmacie de garde à Abidjan et commandez en quelques secondes.</p>
        <button style={{...S.btn,background:W,color:G,fontSize:16,padding:"15px 24px",borderRadius:14,width:"100%",marginBottom:10}} onClick={()=>setPage("catalogue")}>
          Commander mes médicaments →
        </button>
        <button style={{...S.btn,background:"rgba(255,255,255,0.15)",color:W,fontSize:14,padding:"12px 24px",borderRadius:14,width:"100%"}} onClick={()=>setPage("pharmacie")}>
          🏥 Espace Pharmacie
        </button>
        <div style={{display:"flex",gap:24,marginTop:20,justifyContent:"center"}}>
          {[["200+","Médicaments"],["30 min","Livraison"],["316","Pharmacies"]].map(([v,l])=>(
            <div key={l} style={{textAlign:"center"}}>
              <div style={{fontSize:22,fontWeight:900,color:GL}}>{v}</div>
              <div style={{fontSize:11,opacity:0.75}}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* SEARCH */}
      <div style={{padding:"16px 16px 0"}}>
        <div style={{position:"relative"}}>
          <input placeholder="Rechercher un médicament..." value={searchQ} onChange={e=>{setSearchQ(e.target.value);if(e.target.value.length>0)setPage("catalogue");}}
            style={{...S.input,paddingLeft:44,paddingRight:100}} />
          <span style={{position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",fontSize:18}}>🔍</span>
          {searchQ&&<button style={{...S.btn,position:"absolute",right:4,top:"50%",transform:"translateY(-50%)",padding:"8px 14px",borderRadius:10,fontSize:13}} onClick={()=>setPage("catalogue")}>Chercher</button>}
        </div>
      </div>

      {/* PAIEMENTS */}
      <div style={{...S.section,marginTop:20}}>
        <p style={{fontSize:11,fontWeight:700,color:G,letterSpacing:1,margin:"0 0 8px"}}>PAIEMENT</p>
        <h2 style={S.h2}>Payez comme vous voulez</h2>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          {[["wave","Wave CI","Instantané","#1a73e8"],["om","Orange Money","Mobile Money","#ff6600"],["cinet","Visa/Mastercard","CinetPay","#6c3bc2"],["cash","Cash","À la livraison","#2e7d32"]].map(([id,nom,sub,color])=>(
            <div key={id} style={{...S.card,display:"flex",alignItems:"center",gap:10,padding:12,marginBottom:0}}>
              <div style={{width:44,height:44,borderRadius:10,background:color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,color:W,fontWeight:900,flexShrink:0}}>
                {id==="wave"?"W":id==="om"?"OM":id==="cinet"?"CP":"$"}
              </div>
              <div><div style={{fontWeight:700,fontSize:13}}>{nom}</div><div style={{fontSize:11,color:TXTS}}>{sub}</div></div>
            </div>
          ))}
        </div>
      </div>

      {/* PHARMACIES DE GARDE */}
      <div style={S.section}>
        <h2 style={S.h2}>🌙 Pharmacies de garde ce soir</h2>
        <div style={{display:"flex",gap:12,overflowX:"auto",paddingBottom:8}}>
          {PHARMACIES_GARDE.map(p=>(
            <div key={p.id} style={{...S.card,minWidth:200,marginBottom:0,flexShrink:0}}>
              <Badge>GARDE 24h</Badge>
              <div style={{fontWeight:700,margin:"8px 0 2px"}}>{p.nom}</div>
              <div style={{fontSize:12,color:TXTS}}>{p.commune}</div>
              <div style={{fontSize:12,color:TXTS,marginBottom:8}}>{p.adresse}</div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <span style={{fontSize:13,color:WARN}}>⭐ {p.note}</span>
                <a href={`tel:${p.tel}`} style={{color:G,fontSize:12,fontWeight:700,textDecoration:"none"}}>📞 {p.tel}</a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TOUTES LES PHARMACIES */}
      <div style={S.section}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
          <h2 style={{...S.h2,margin:0}}>🏥 Toutes les pharmacies</h2>
          <span style={{fontSize:12,color:TXTS}}>316 pharmacies</span>
        </div>
        <div style={{display:"flex",gap:8,overflowX:"auto",paddingBottom:10}}>
          {communes.map(c=>(
            <button key={c} style={{...S.chip,...(commune===c?S.chipActive:{})}} onClick={()=>setCommune(c)}>{c}</button>
          ))}
        </div>
        {PHARMACIES_GARDE.filter(p=>commune==="Toutes"||p.commune===commune).map(p=>(
          <div key={p.id} style={{...S.card,display:"flex",alignItems:"center",gap:12}}>
            <div style={{width:44,height:44,borderRadius:12,background:GBG,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>🏥</div>
            <div style={{flex:1}}>
              <div style={{fontWeight:700,fontSize:14}}>{p.nom}</div>
              <div style={{fontSize:12,color:TXTS}}>{p.commune} · {p.adresse}</div>
              <div style={{display:"flex",gap:12,marginTop:4}}>
                <span style={{fontSize:12,color:WARN}}>⭐ {p.note}</span>
                <a href={`tel:${p.tel}`} style={{fontSize:12,color:G,fontWeight:600,textDecoration:"none"}}>📞 {p.tel}</a>
              </div>
            </div>
            <span style={{fontSize:11,color:G,fontWeight:700}}>● Ouvert</span>
          </div>
        ))}
      </div>

      {/* CATÉGORIES */}
      <div style={S.section}>
        <h2 style={S.h2}>Catégories</h2>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
          {[["💊","Antidouleurs"],["🌿","Vitamines"],["🧬","Antibiotiques"],["🧴","Soins"],["👶","Bébé"],["🩺","Matériel"]].map(([e,n])=>(
            <div key={n} style={{...S.card,textAlign:"center",padding:"16px 8px",cursor:"pointer",marginBottom:0}} onClick={()=>setPage("catalogue")}>
              <div style={{fontSize:28,marginBottom:6}}>{e}</div>
              <div style={{fontSize:12,fontWeight:700,color:TXT}}>{n}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ESPACES */}
      <div style={S.section}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
          {[["🛵","Livreur","livreur"],["🏥","Pharmacie","pharmacie"],["⚙️","Admin","admin"]].map(([e,n,p])=>(
            <button key={p} style={{...S.btnOutline,display:"flex",flexDirection:"column",alignItems:"center",gap:6,padding:"14px 8px",borderRadius:14}} onClick={()=>setPage(p)}>
              <span style={{fontSize:24}}>{e}</span><span style={{fontSize:12}}>{n}</span>
            </button>
          ))}
        </div>
      </div>

      <div style={{textAlign:"center",padding:"8px 16px 0",color:TXTS,fontSize:12}}>
        🇨🇮 SantéExpress · Abidjan, Côte d'Ivoire<br/>
        Pharmaciens certifiés · Paiements sécurisés
      </div>
    </div>
  );
}

// ══════════════════════════════════════════
// PAGE CATALOGUE
// ══════════════════════════════════════════
function PageCatalogue({panier,setPanier,setPage}){
  const [cat,setCat]=useState("Tout");
  const [search,setSearch]=useState("");
  const [toast,setToast]=useState(null);

  const filtered=MEDICAMENTS.filter(m=>{
    const matchCat=cat==="Tout"||m.categorie===cat;
    const matchSearch=search===""||m.nom.toLowerCase().includes(search.toLowerCase());
    return matchCat&&matchSearch;
  });

  function ajouterAuPanier(med){
    setPanier(prev=>{
      const ex=prev.find(i=>i.id===med.id);
      if(ex)return prev.map(i=>i.id===med.id?{...i,qte:i.qte+1}:i);
      return [...prev,{...med,qte:1}];
    });
    setToast({msg:`${med.nom} ajouté au panier ✓`,type:"success"});
  }

  const totalPanier=panier.reduce((s,i)=>s+i.qte,0);

  return(
    <div style={{paddingBottom:80}}>
      {toast&&<Toast msg={toast.msg} type={toast.type} onClose={()=>setToast(null)}/>}
      <div style={{padding:"12px 16px",background:W,position:"sticky",top:56,zIndex:90,boxShadow:"0 2px 8px rgba(0,0,0,0.04)"}}>
        <input placeholder="Rechercher un médicament..." value={search} onChange={e=>setSearch(e.target.value)}
          style={{...S.input,marginBottom:10}} />
        <div style={{display:"flex",gap:8,overflowX:"auto",paddingBottom:4}}>
          {CATEGORIES.map(c=>(
            <button key={c} style={{...S.chip,...(cat===c?S.chipActive:{})}} onClick={()=>setCat(c)}>{c}</button>
          ))}
        </div>
      </div>

      <div style={{padding:"12px 16px"}}>
        {filtered.length===0&&<div style={{textAlign:"center",padding:40,color:TXTS}}>Aucun médicament trouvé</div>}
        {filtered.map(med=>(
          <div key={med.id} style={{...S.card,display:"flex",alignItems:"center",gap:12}}>
            <div style={{width:48,height:48,borderRadius:12,background:GBG,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,flexShrink:0}}>{med.emoji}</div>
            <div style={{flex:1}}>
              <div style={{fontWeight:700,fontSize:14}}>{med.nom}</div>
              <div style={{fontSize:12,color:TXTS}}>{med.description}</div>
              {med.ordonnance&&<Badge color={ERR} bg="#FFEBEE">Sur ordonnance</Badge>}
              <div style={{fontWeight:800,color:G,fontSize:15,marginTop:4}}>{med.prix.toLocaleString()} FCFA</div>
            </div>
            <button style={{...S.btn,padding:"9px 14px",borderRadius:10,fontSize:13,flexShrink:0}} onClick={()=>ajouterAuPanier(med)}>
              + Ajouter
            </button>
          </div>
        ))}
      </div>

      {totalPanier>0&&(
        <div style={{position:"fixed",bottom:70,left:"50%",transform:"translateX(-50%)",width:"calc(100% - 32px)",maxWidth:448,zIndex:150}}>
          <button style={{...S.btn,width:"100%",padding:"16px",borderRadius:14,fontSize:16,boxShadow:"0 4px 20px rgba(0,168,89,0.4)"}} onClick={()=>setPage("panier")}>
            🛒 Voir mon panier ({totalPanier} article{totalPanier>1?"s":""})
          </button>
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════
// PAGE PANIER
// ══════════════════════════════════════════
function PagePanier({panier,setPanier,setPage}){
  function updateQte(id,delta){
    setPanier(prev=>prev.map(i=>i.id===id?{...i,qte:Math.max(0,i.qte+delta)}:i).filter(i=>i.qte>0));
  }
  function supprimer(id){setPanier(prev=>prev.filter(i=>i.id!==id));}
  const sous_total=panier.reduce((s,i)=>s+i.prix*i.qte,0);
  const livraison=500;
  const total=sous_total+livraison;

  if(panier.length===0)return(
    <div style={{padding:40,textAlign:"center"}}>
      <div style={{fontSize:60,marginBottom:16}}>🛒</div>
      <p style={{color:TXTS,marginBottom:20}}>Votre panier est vide</p>
      <button style={S.btn} onClick={()=>setPage("catalogue")}>Voir le catalogue</button>
    </div>
  );

  return(
    <div style={{paddingBottom:160}}>
      <div style={{padding:"16px 16px 0"}}>
        {panier.map(item=>(
          <div key={item.id} style={{...S.card,display:"flex",alignItems:"center",gap:12}}>
            <div style={{fontSize:28}}>{item.emoji}</div>
            <div style={{flex:1}}>
              <div style={{fontWeight:700,fontSize:14}}>{item.nom}</div>
              <div style={{fontWeight:800,color:G}}>{(item.prix*item.qte).toLocaleString()} FCFA</div>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <button onClick={()=>updateQte(item.id,-1)} style={{width:30,height:30,borderRadius:8,border:`1.5px solid ${G}`,background:W,color:G,fontWeight:800,cursor:"pointer",fontSize:16}}>−</button>
              <span style={{fontWeight:700,minWidth:20,textAlign:"center"}}>{item.qte}</span>
              <button onClick={()=>updateQte(item.id,1)} style={{width:30,height:30,borderRadius:8,background:G,border:"none",color:W,fontWeight:800,cursor:"pointer",fontSize:16}}>+</button>
              <button onClick={()=>supprimer(item.id)} style={{background:"none",border:"none",cursor:"pointer",fontSize:18,marginLeft:4}}>🗑️</button>
            </div>
          </div>
        ))}
      </div>

      <div style={{position:"fixed",bottom:70,left:"50%",transform:"translateX(-50%)",width:"calc(100% - 32px)",maxWidth:448,background:W,borderRadius:"16px 16px 0 0",padding:16,boxShadow:"0 -4px 20px rgba(0,0,0,0.1)"}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
          <span style={{color:TXTS}}>Sous-total</span><span style={{fontWeight:700}}>{sous_total.toLocaleString()} FCFA</span>
        </div>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:12}}>
          <span style={{color:TXTS}}>Livraison</span><span style={{fontWeight:700,color:G}}>{livraison} FCFA</span>
        </div>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:16,fontSize:18,fontWeight:800}}>
          <span>Total</span><span style={{color:G}}>{total.toLocaleString()} FCFA</span>
        </div>
        <button style={{...S.btn,width:"100%",padding:16,fontSize:16,borderRadius:12}} onClick={()=>setPage("checkout")}>
          Commander · {total.toLocaleString()} FCFA
        </button>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════
// PAGE CHECKOUT
// ══════════════════════════════════════════
function PageCheckout({panier,setPanier,setPage,setCommandeActive}){
  const [form,setForm]=useState({nom:"",tel:"",adresse:"",note:""});
  const [paiement,setPaiement]=useState("");
  const [livraison,setLivraison]=useState("std");
  const [loading,setLoading]=useState(false);
  const [etape,setEtape]=useState(0);

  const sous_total=panier.reduce((s,i)=>s+i.prix*i.qte,0);
  const frais=livraison==="yango"?800:500;
  const total=sous_total+frais;
  const valide=form.nom&&form.tel&&form.adresse&&paiement;

  const ETAPES=["🛰️ Localisation en cours...","🔍 Recherche des pharmacies ouvertes...","📦 Vérification des stocks...","✅ Pharmacie trouvée !"];

  async function commander(){
    if(!valide)return;
    setLoading(true);
    for(let i=0;i<ETAPES.length;i++){
      await new Promise(r=>setTimeout(r,900));
      setEtape(i+1);
    }
    await new Promise(r=>setTimeout(r,600));
    const ref="SE-"+String(Math.floor(Math.random()*9000)+1000);
    const cmd={id:ref,date:new Date().toISOString().split("T")[0],statut:"confirmee",total,pharmacie:"Pharmacie Centrale du Plateau",items:panier.map(i=>({nom:i.nom,qte:i.qte,prix:i.prix})),nom:form.nom,tel:form.tel,adresse:form.adresse,paiement,livraison};
    setCommandeActive(cmd);
    setPanier([]);
    setPage("suivi");
  }

  if(loading)return(
    <div style={{padding:40,textAlign:"center"}}>
      <div style={{fontSize:64,marginBottom:16}}>🏥</div>
      <h2 style={{color:TXT,marginBottom:24}}>Affectation en cours</h2>
      {ETAPES.map((e,i)=>(
        <div key={i} style={{display:"flex",alignItems:"center",gap:12,marginBottom:12,opacity:etape>i?1:0.3}}>
          <span style={{fontSize:20}}>{etape>i?"✅":"⏳"}</span>
          <span style={{fontWeight:etape===i+1?700:400,color:etape>i?TXT:TXTS}}>{e}</span>
        </div>
      ))}
      <button style={{...S.btn,width:"100%",marginTop:24,opacity:0.5}} disabled>Commander · {total.toLocaleString()} FCFA</button>
    </div>
  );

  return(
    <div style={{padding:"16px 16px 160px"}}>
      <h2 style={{...S.h2,marginBottom:20}}>Paiement</h2>

      <div style={{...S.card,marginBottom:16}}>
        <p style={{fontWeight:700,marginBottom:12,margin:"0 0 12px"}}>Mode de paiement</p>
        {[["wave","Wave CI","Instantané","#1a73e8"],["om","Orange Money","Mobile Money","#ff6600"],["cinetpay","Visa/Mastercard","CinetPay","#6c3bc2"],["cash","Cash à la livraison","Payer le livreur","#2e7d32"],["assurance","Assurance maladie","CNAM, MUGEF-CI, AMU...","#1565c0"]].map(([id,nom,sub,color])=>(
          <div key={id} onClick={()=>setPaiement(id)} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 0",borderBottom:"1px solid #F0F4F1",cursor:"pointer"}}>
            <div style={{width:40,height:40,borderRadius:10,background:color,display:"flex",alignItems:"center",justifyContent:"center",color:W,fontWeight:900,fontSize:12,flexShrink:0}}>
              {id==="wave"?"W":id==="om"?"OM":id==="cinetpay"?"CP":id==="cash"?"$":"🛡️"}
            </div>
            <div style={{flex:1}}><div style={{fontWeight:700}}>{nom}</div><div style={{fontSize:12,color:TXTS}}>{sub}</div></div>
            <div style={{width:20,height:20,borderRadius:"50%",border:`2px solid ${paiement===id?G:"#D4E8DC"}`,background:paiement===id?G:"transparent",display:"flex",alignItems:"center",justifyContent:"center"}}>
              {paiement===id&&<div style={{width:8,height:8,borderRadius:"50%",background:W}}/>}
            </div>
          </div>
        ))}
      </div>

      <div style={{...S.card,marginBottom:16}}>
        <p style={{fontWeight:700,margin:"0 0 12px"}}>Mode de livraison</p>
        {[["std","SantéExpress","Livraison standard","500 FCFA"],["yango","Yango","Via l'app Yango","800 FCFA"]].map(([id,nom,sub,prix])=>(
          <div key={id} onClick={()=>setLivraison(id)} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 0",borderBottom:"1px solid #F0F4F1",cursor:"pointer"}}>
            <span style={{fontSize:24}}>{id==="std"?"🛵":"🚗"}</span>
            <div style={{flex:1}}><div style={{fontWeight:700}}>{nom}</div><div style={{fontSize:12,color:TXTS}}>{sub}</div></div>
            <div style={{fontWeight:700,color:G,marginRight:10}}>{prix}</div>
            <div style={{width:20,height:20,borderRadius:"50%",border:`2px solid ${livraison===id?G:"#D4E8DC"}`,background:livraison===id?G:"transparent",display:"flex",alignItems:"center",justifyContent:"center"}}>
              {livraison===id&&<div style={{width:8,height:8,borderRadius:"50%",background:W}}/>}
            </div>
          </div>
        ))}
      </div>

      <div style={S.card}>
        <p style={{fontWeight:700,margin:"0 0 16px"}}>Informations de livraison</p>
        {[["nom","👤 Nom complet","Koné Amadou"],["tel","📱 Téléphone","+225 07 XX XX XX XX"],["adresse","📍 Adresse de livraison","Quartier, rue, repère..."],["note","📝 Note au pharmacien (optionnel)","Allergies, grossesse..."]].map(([k,label,ph])=>(
          <div key={k} style={{marginBottom:14}}>
            <label style={S.label}>{label}</label>
            {k==="note"
              ?<textarea value={form[k]} onChange={e=>setForm(f=>({...f,[k]:e.target.value}))} placeholder={ph} style={{...S.input,height:70,resize:"none"}}/>
              :<input value={form[k]} onChange={e=>setForm(f=>({...f,[k]:e.target.value}))} placeholder={ph} style={S.input} type={k==="tel"?"tel":"text"}/>
            }
          </div>
        ))}
      </div>

      <div style={{position:"fixed",bottom:70,left:"50%",transform:"translateX(-50%)",width:"calc(100% - 32px)",maxWidth:448,padding:"12px 0"}}>
        <button style={{...S.btn,width:"100%",padding:16,fontSize:16,borderRadius:12,opacity:valide?1:0.5}} onClick={commander} disabled={!valide}>
          {valide?"✓ Commander · "+total.toLocaleString()+" FCFA":"Remplissez les champs requis"}
        </button>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════
// PAGE SUIVI COMMANDE
// ══════════════════════════════════════════
function PageSuivi({commande,setPage}){
  const [statut,setStatut]=useState(1);
  useEffect(()=>{
    const t=setInterval(()=>setStatut(s=>s<3?s+1:s),4000);
    return()=>clearInterval(t);
  },[]);

  if(!commande)return(
    <div style={{padding:40,textAlign:"center"}}>
      <p style={{color:TXTS}}>Aucune commande en cours</p>
      <button style={{...S.btn,marginTop:16}} onClick={()=>setPage("accueil")}>Retour</button>
    </div>
  );

  const ETAPES=[
    {icon:"✅",titre:"Commande confirmée",desc:"Reçue par la pharmacie"},
    {icon:"💊",titre:"Préparation en cours",desc:"Le pharmacien prépare votre sac"},
    {icon:"🛵",titre:"Livreur en route",desc:"Votre commande est en chemin"},
    {icon:"🏠",titre:"Livraison effectuée",desc:"Votre commande est arrivée !"},
  ];

  return(
    <div style={{padding:"16px 16px 100px"}}>
      <div style={{...S.card,background:`linear-gradient(135deg,${GD},${G})`,padding:20,marginBottom:16}}>
        <div style={{color:GL,fontSize:13,marginBottom:4}}>Référence commande</div>
        <div style={{color:W,fontWeight:900,fontSize:20}}>{commande.id}</div>
        <div style={{color:GL,fontSize:13,marginTop:8}}>Total : {commande.total?.toLocaleString()} FCFA</div>
      </div>

      <div style={S.card}>
        {ETAPES.map((e,i)=>(
          <div key={i} style={{display:"flex",gap:14,marginBottom:i<ETAPES.length-1?16:0}}>
            <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
              <div style={{width:40,height:40,borderRadius:"50%",background:statut>i?G:statut===i?"#FFF3E0":"#F0F4F1",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,border:`2px solid ${statut>i?G:statut===i?WARN:"#D4E8DC"}`}}>
                {statut>i?e.icon:statut===i?"⏳":"⬜"}
              </div>
              {i<ETAPES.length-1&&<div style={{width:2,height:20,background:statut>i?G:"#E8ECE9",margin:"4px 0"}}/>}
            </div>
            <div style={{paddingTop:8}}>
              <div style={{fontWeight:700,color:statut>i?TXT:TXTS}}>{e.titre}</div>
              <div style={{fontSize:13,color:TXTS}}>{e.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={S.card}>
        {[["📍",commande.adresse||"Yopougon"],["🏥",commande.pharmacie||"Pharmacie Centrale"],["💳",commande.paiement||"Wave CI"]].map(([icon,val])=>(
          <div key={val} style={{display:"flex",gap:10,alignItems:"center",marginBottom:10}}>
            <span style={{fontSize:18}}>{icon}</span><span style={{fontWeight:600}}>{val}</span>
          </div>
        ))}
      </div>

      <button style={{...S.btn,width:"100%",marginTop:8}} onClick={()=>setPage("commandes")}>
        Voir mes commandes
      </button>
    </div>
  );
}

// ══════════════════════════════════════════
// PAGE COMMANDES
// ══════════════════════════════════════════
function PageCommandes({commandeActive}){
  const [cmds]=useState([...(commandeActive?[commandeActive]:[]),...COMMANDES_DEMO]);
  const STATUTS={confirmee:{label:"Confirmée",color:INFO,bg:"#E3F2FD"},en_cours:{label:"En cours",color:WARN,bg:"#FFF3E0"},livree:{label:"Livrée",color:G,bg:GL},annulee:{label:"Annulée",color:ERR,bg:"#FFEBEE"}};

  return(
    <div style={{padding:"16px 16px 80px"}}>
      <h2 style={S.h2}>Mes commandes</h2>
      {cmds.length===0&&<div style={{textAlign:"center",padding:40,color:TXTS}}>Aucune commande</div>}
      {cmds.map(cmd=>{
        const st=STATUTS[cmd.statut]||STATUTS.confirmee;
        return(
          <div key={cmd.id} style={S.card}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
              <span style={{fontWeight:800,color:G}}>{cmd.id}</span>
              <Badge color={st.color} bg={st.bg}>{st.label}</Badge>
            </div>
            <div style={{fontSize:13,color:TXTS,marginBottom:8}}>📅 {cmd.date} · 🏥 {cmd.pharmacie}</div>
            {cmd.items?.map((it,i)=>(
              <div key={i} style={{fontSize:13,color:TXT,marginBottom:2}}>· {it.nom} ×{it.qte} — {(it.prix*it.qte).toLocaleString()} FCFA</div>
            ))}
            <div style={{fontWeight:800,color:G,marginTop:8,fontSize:16}}>Total : {cmd.total?.toLocaleString()} FCFA</div>
          </div>
        );
      })}
    </div>
  );
}

// ══════════════════════════════════════════
// ESPACE PHARMACIE
// ══════════════════════════════════════════
function PagePharmacie(){
  const [sousPage,setSousPage]=useState("accueil");
  const [form,setForm]=useState({nom:"",responsable:"",tel:"",email:"",adresse:"",commune:""});
  const [connecte,setConnecte]=useState(false);
  const [loginForm,setLoginForm]=useState({email:"",pwd:""});
  const [stocks,setStocks]=useState(MEDICAMENTS.slice(0,8).map(m=>({...m,stock:Math.floor(Math.random()*100)+10})));
  const [toast,setToast]=useState(null);

  const CMDS_PHARMACIE=[
    {id:"SE-0042",client:"Koné Amadou",items:"Paracétamol x2, Vitamine C x1",total:2200,statut:"en_attente",tel:"+225 07 12 34 56"},
    {id:"SE-0041",client:"Traoré Fatou",items:"Ibuprofène x1",total:850,statut:"en_cours",tel:"+225 05 98 76 54"},
    {id:"SE-0040",client:"Coulibaly Jean",items:"Doliprane x3, Zinc x1",total:5350,statut:"livree",tel:"+225 01 23 45 67"},
  ];

  if(!connecte){
    if(sousPage==="rejoindre")return(
      <div style={{padding:"16px 16px 80px"}}>
        {toast&&<Toast msg={toast.msg} type={toast.type} onClose={()=>setToast(null)}/>}
        <button style={{...S.btnGray,marginBottom:16}} onClick={()=>setSousPage("accueil")}>← Retour</button>
        <h2 style={S.h2}>Rejoindre SantéExpress</h2>
        <div style={S.card}>
          {[["nom","Nom de la pharmacie","Pharmacie Centrale"],["responsable","Responsable","Dr. Koné"],["tel","Téléphone","+225 27 XX XX XX XX"],["email","Email","contact@pharmacie.ci"],["adresse","Adresse","Quartier, rue, commune"],["commune","Commune","Cocody"]].map(([k,label,ph])=>(
            <div key={k} style={{marginBottom:14}}>
              <label style={S.label}>{label}</label>
              <input value={form[k]} onChange={e=>setForm(f=>({...f,[k]:e.target.value}))} placeholder={ph} style={S.input}/>
            </div>
          ))}
          <button style={{...S.btn,width:"100%",marginTop:8}} onClick={()=>{setToast({msg:"Demande envoyée ! Nous vous contacterons sous 24h.",type:"success"});setTimeout(()=>setSousPage("accueil"),2000);}}>
            Envoyer ma demande
          </button>
        </div>
      </div>
    );

    if(sousPage==="login")return(
      <div style={{padding:"16px 16px 80px"}}>
        <button style={{...S.btnGray,marginBottom:16}} onClick={()=>setSousPage("accueil")}>← Retour</button>
        <h2 style={S.h2}>Connexion Pharmacie</h2>
        <div style={S.card}>
          <div style={{marginBottom:14}}>
            <label style={S.label}>Email</label>
            <input value={loginForm.email} onChange={e=>setLoginForm(f=>({...f,email:e.target.value}))} placeholder="contact@pharmacie.ci" style={S.input}/>
          </div>
          <div style={{marginBottom:20}}>
            <label style={S.label}>Mot de passe</label>
            <input value={loginForm.pwd} onChange={e=>setLoginForm(f=>({...f,pwd:e.target.value}))} placeholder="••••••••" style={S.input} type="password"/>
          </div>
          <button style={{...S.btn,width:"100%"}} onClick={()=>setConnecte(true)}>Se connecter</button>
          <p style={{textAlign:"center",fontSize:12,color:TXTS,marginTop:12}}>Démo : cliquez directement sur Se connecter</p>
        </div>
      </div>
    );

    return(
      <div style={{padding:"16px 16px 80px"}}>
        <div style={{...S.card,background:`linear-gradient(135deg,${GD},${G})`,padding:24,textAlign:"center",marginBottom:20}}>
          <div style={{fontSize:48,marginBottom:12}}>🏥</div>
          <h2 style={{color:W,margin:"0 0 8px"}}>Espace Pharmacie</h2>
          <p style={{color:GL,fontSize:14,margin:"0 0 20px"}}>Rejoignez le réseau SantéExpress</p>
          <button style={{...S.btn,background:W,color:G,width:"100%",marginBottom:10}} onClick={()=>setSousPage("rejoindre")}>Demander à rejoindre</button>
          <button style={{...S.btn,background:"rgba(255,255,255,0.2)",color:W,width:"100%"}} onClick={()=>setSousPage("login")}>Déjà partenaire ? Se connecter</button>
        </div>
        {[["💊","Gestion des stocks","Gérez vos produits en temps réel"],["📦","Réception des commandes","Recevez et préparez les commandes clients"],["📊","Tableau de bord","Suivez vos ventes et performances"],["💳","Paiements sécurisés","Commission de 3% seulement"]].map(([e,t,d])=>(
          <div key={t} style={{...S.card,display:"flex",gap:14,alignItems:"center"}}>
            <span style={{fontSize:28}}>{e}</span>
            <div><div style={{fontWeight:700}}>{t}</div><div style={{fontSize:13,color:TXTS}}>{d}</div></div>
          </div>
        ))}
      </div>
    );
  }

  // DASHBOARD PHARMACIE CONNECTÉE
  return(
    <div style={{paddingBottom:80}}>
      {toast&&<Toast msg={toast.msg} type={toast.type} onClose={()=>setToast(null)}/>}
      <div style={{background:`linear-gradient(135deg,${GD},${G})`,padding:"16px",color:W,marginBottom:0}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div><div style={{fontSize:12,opacity:0.8}}>Connecté</div><div style={{fontWeight:800,fontSize:16}}>Pharmacie Centrale du Plateau</div></div>
          <button style={{background:"rgba(255,255,255,0.2)",border:"none",color:W,padding:"6px 12px",borderRadius:8,cursor:"pointer",fontSize:12}} onClick={()=>setConnecte(false)}>Déconnexion</button>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:8,marginTop:16}}>
          {[["12","Commandes\naujourd'hui"],["247","Produits\nen stock"],["84500","CA\nFCFA"],["3","En\nattente"]].map(([v,l])=>(
            <div key={l} style={{background:"rgba(255,255,255,0.15)",borderRadius:10,padding:"10px 6px",textAlign:"center"}}>
              <div style={{fontWeight:900,fontSize:16,color:GL}}>{v}</div>
              <div style={{fontSize:10,opacity:0.8,whiteSpace:"pre-line",lineHeight:1.3}}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{...S.tabs}}>
        {[["commandes","📦 Commandes"],["stocks","💊 Stocks"],["stats","📊 Stats"]].map(([id,label])=>(
          <button key={id} style={{...S.tab,...(sousPage===id||(!["commandes","stocks","stats"].includes(sousPage)&&id==="commandes")?S.tabActive:{})}} onClick={()=>setSousPage(id)}>{label}</button>
        ))}
      </div>

      {(sousPage==="commandes"||!["commandes","stocks","stats"].includes(sousPage))&&(
        <div style={{padding:"16px 16px 80px"}}>
          <h3 style={{fontWeight:800,marginBottom:12}}>Commandes reçues</h3>
          {CMDS_PHARMACIE.map(cmd=>{
            const COLS={en_attente:{c:WARN,bg:"#FFF3E0",l:"En attente"},en_cours:{c:INFO,bg:"#E3F2FD",l:"En cours"},livree:{c:G,bg:GL,l:"Livrée"}};
            const col=COLS[cmd.statut];
            return(
              <div key={cmd.id} style={S.card}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                  <span style={{fontWeight:800,color:G}}>{cmd.id}</span>
                  <Badge color={col.c} bg={col.bg}>{col.l}</Badge>
                </div>
                <div style={{fontWeight:600,marginBottom:4}}>👤 {cmd.client}</div>
                <div style={{fontSize:13,color:TXTS,marginBottom:8}}>💊 {cmd.items}</div>
                <div style={{fontWeight:800,color:G,marginBottom:10}}>{cmd.total.toLocaleString()} FCFA</div>
                {cmd.statut==="en_attente"&&(
                  <div style={{display:"flex",gap:8}}>
                    <button style={{...S.btn,flex:1,padding:"10px"}} onClick={()=>setToast({msg:"Commande acceptée !",type:"success"})}>✅ Accepter</button>
                    <button style={{...S.btnGray,flex:1,padding:"10px"}} onClick={()=>setToast({msg:"Commande refusée",type:"error"})}>❌ Refuser</button>
                  </div>
                )}
                {cmd.statut==="en_cours"&&(
                  <button style={{...S.btn,width:"100%",padding:"10px"}} onClick={()=>setToast({msg:"Commande remise au livreur !",type:"success"})}>🛵 Remettre au livreur</button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {sousPage==="stocks"&&(
        <div style={{padding:"16px 16px 80px"}}>
          <h3 style={{fontWeight:800,marginBottom:12}}>Gestion des stocks</h3>
          {stocks.map(med=>(
            <div key={med.id} style={{...S.card,display:"flex",alignItems:"center",gap:12}}>
              <span style={{fontSize:24}}>{med.emoji}</span>
              <div style={{flex:1}}>
                <div style={{fontWeight:700,fontSize:13}}>{med.nom}</div>
                <div style={{fontSize:12,color:TXTS}}>{med.prix.toLocaleString()} FCFA</div>
              </div>
              <div style={{textAlign:"right"}}>
                <div style={{fontWeight:800,color:med.stock<10?ERR:med.stock<30?WARN:G,fontSize:16}}>{med.stock}</div>
                <div style={{fontSize:11,color:TXTS}}>en stock</div>
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:4}}>
                <button onClick={()=>setStocks(s=>s.map(m=>m.id===med.id?{...m,stock:m.stock+10}:m))} style={{width:28,height:28,background:G,border:"none",borderRadius:6,color:W,cursor:"pointer",fontWeight:800}}>+</button>
                <button onClick={()=>setStocks(s=>s.map(m=>m.id===med.id?{...m,stock:Math.max(0,m.stock-10)}:m))} style={{width:28,height:28,background:"#F0F4F1",border:"none",borderRadius:6,cursor:"pointer",fontWeight:800}}>−</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {sousPage==="stats"&&(
        <div style={{padding:"16px 16px 80px"}}>
          <h3 style={{fontWeight:800,marginBottom:12}}>Statistiques du mois</h3>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>
            {[["💰","Chiffre d'affaires","84 500 FCFA"],["📦","Commandes total","47"],["⭐","Note clients","4.7/5"],["🏅","Classement","#3 sur Abidjan"]].map(([e,l,v])=>(
              <div key={l} style={{...S.statCard}}>
                <div style={{fontSize:28,marginBottom:8}}>{e}</div>
                <div style={{fontWeight:800,color:G,fontSize:15}}>{v}</div>
                <div style={{fontSize:12,color:TXTS}}>{l}</div>
              </div>
            ))}
          </div>
          <div style={S.card}>
            <p style={{fontWeight:700,margin:"0 0 12px"}}>Top médicaments vendus</p>
            {[["Paracétamol 500mg",34],["Ibuprofène 400mg",28],["Vitamine C",22],["Doliprane",18]].map(([nom,nb])=>(
              <div key={nom} style={{marginBottom:10}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                  <span style={{fontSize:13,fontWeight:600}}>{nom}</span>
                  <span style={{fontSize:13,color:G,fontWeight:700}}>{nb} ventes</span>
                </div>
                <div style={{height:6,background:"#E8ECE9",borderRadius:3}}>
                  <div style={{height:"100%",background:G,borderRadius:3,width:`${(nb/34)*100}%`}}/>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════
// ESPACE LIVREUR
// ══════════════════════════════════════════
function PageLivreur(){
  const [sousPage,setSousPage]=useState("accueil");
  const [connecte,setConnecte]=useState(false);
  const [livraisons,setLivraisons]=useState([
    {id:"SE-0042",client:"Koné Amadou",tel:"+225 07 12 34 56",pharmacie:"Pharmacie Centrale, Plateau",adresse:"Yopougon, Maroc, Rue 12",distance:"8.4 km",montant:2200,frais:800,statut:"disponible"},
    {id:"SE-0041",client:"Traoré Fatou",tel:"+225 05 98 76 54",pharmacie:"Pharmacie de la Paix, Yopougon",adresse:"Cocody, Riviera 2, Lot 45",distance:"5.1 km",montant:850,frais:500,statut:"disponible"},
  ]);
  const [toast,setToast]=useState(null);

  if(!connecte){
    if(sousPage==="inscription")return(
      <div style={{padding:"16px 16px 80px"}}>
        <button style={{...S.btnGray,marginBottom:16}} onClick={()=>setSousPage("accueil")}>← Retour</button>
        <h2 style={S.h2}>Devenir livreur</h2>
        <div style={S.card}>
          {[["nom","Nom complet","Koné Mamadou"],["tel","Téléphone","+225 07 XX XX XX XX"],["email","Email","kone@email.com"],["transport","Moyen de transport","Moto / Voiture / Vélo"]].map(([k,label,ph])=>(
            <div key={k} style={{marginBottom:14}}>
              <label style={S.label}>{label}</label>
              <input placeholder={ph} style={S.input}/>
            </div>
          ))}
          <button style={{...S.btn,width:"100%",marginTop:8}} onClick={()=>{setToast({msg:"Demande envoyée ! Validation sous 24h.",type:"success"});setTimeout(()=>setSousPage("accueil"),2000);}}>
            Envoyer ma candidature
          </button>
        </div>
      </div>
    );

    return(
      <div style={{padding:"16px 16px 80px"}}>
        {toast&&<Toast msg={toast.msg} type={toast.type} onClose={()=>setToast(null)}/>}
        <div style={{...S.card,background:`linear-gradient(135deg,#E65100,#FF6D00)`,padding:24,textAlign:"center",marginBottom:20}}>
          <div style={{fontSize:48,marginBottom:12}}>🛵</div>
          <h2 style={{color:W,margin:"0 0 8px"}}>Espace Livreur</h2>
          <p style={{color:"#FFE0B2",fontSize:14,margin:"0 0 20px"}}>Gagnez de l'argent en livrant des médicaments</p>
          <button style={{...S.btn,background:W,color:"#E65100",width:"100%",marginBottom:10}} onClick={()=>setSousPage("inscription")}>Devenir livreur</button>
          <button style={{...S.btn,background:"rgba(255,255,255,0.2)",color:W,width:"100%"}} onClick={()=>setConnecte(true)}>Déjà livreur ? Se connecter</button>
        </div>
        {[["💰","Revenus attractifs","500 à 800 FCFA par livraison"],["📱","App simple","Accepte et gère tes livraisons"],["🗺️","Navigation GPS","Itinéraire optimisé automatiquement"],["⏰","Horaires flexibles","Travaille quand tu veux"]].map(([e,t,d])=>(
          <div key={t} style={{...S.card,display:"flex",gap:14,alignItems:"center"}}>
            <span style={{fontSize:28}}>{e}</span>
            <div><div style={{fontWeight:700}}>{t}</div><div style={{fontSize:13,color:TXTS}}>{d}</div></div>
          </div>
        ))}
      </div>
    );
  }

  return(
    <div style={{paddingBottom:80}}>
      {toast&&<Toast msg={toast.msg} type={toast.type} onClose={()=>setToast(null)}/>}
      <div style={{background:"linear-gradient(135deg,#E65100,#FF6D00)",padding:"16px",color:W}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div><div style={{fontSize:12,opacity:0.8}}>Connecté</div><div style={{fontWeight:800,fontSize:16}}>Koné Mamadou · 🛵 Moto</div></div>
          <button style={{background:"rgba(255,255,255,0.2)",border:"none",color:W,padding:"6px 12px",borderRadius:8,cursor:"pointer",fontSize:12}} onClick={()=>setConnecte(false)}>Déco.</button>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginTop:14}}>
          {[["3","Livraisons\naujourd'hui"],["2 400","Revenus\nFCFA"],["4.9","Note\n/5"]].map(([v,l])=>(
            <div key={l} style={{background:"rgba(255,255,255,0.2)",borderRadius:10,padding:"10px 6px",textAlign:"center"}}>
              <div style={{fontWeight:900,fontSize:18,color:"#FFE0B2"}}>{v}</div>
              <div style={{fontSize:10,opacity:0.8,whiteSpace:"pre-line",lineHeight:1.3}}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{padding:"16px 16px 80px"}}>
        <h3 style={{fontWeight:800,marginBottom:12}}>Livraisons disponibles</h3>
        {livraisons.filter(l=>l.statut==="disponible").map(liv=>(
          <div key={liv.id} style={S.card}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
              <span style={{fontWeight:800,color:"#E65100"}}>{liv.id}</span>
              <Badge color="#E65100" bg="#FFF3E0">Disponible</Badge>
            </div>
            <div style={{fontSize:13,marginBottom:4}}>👤 {liv.client} · 📞 {liv.tel}</div>
            <div style={{fontSize:13,color:TXTS,marginBottom:4}}>📍 {liv.pharmacie}</div>
            <div style={{fontSize:13,color:TXTS,marginBottom:8}}>🏠 {liv.adresse}</div>
            <div style={{display:"flex",gap:12,marginBottom:10}}>
              <Badge color={INFO} bg="#E3F2FD">📏 {liv.distance}</Badge>
              <Badge color={G} bg={GL}>💰 +{liv.frais} FCFA</Badge>
            </div>
            <button style={{...S.btn,width:"100%",background:"#E65100"}} onClick={()=>{setLivraisons(ls=>ls.map(l=>l.id===liv.id?{...l,statut:"acceptee"}:l));setToast({msg:"Livraison acceptée ! Rendez-vous à la pharmacie.",type:"success"});}}>
              🛵 Accepter cette livraison
            </button>
          </div>
        ))}
        {livraisons.filter(l=>l.statut==="acceptee").map(liv=>(
          <div key={liv.id} style={{...S.card,border:`2px solid #E65100`}}>
            <Badge color="#E65100" bg="#FFF3E0">En cours</Badge>
            <div style={{fontWeight:700,margin:"8px 0"}}>📦 {liv.id} — {liv.client}</div>
            <div style={{fontSize:13,marginBottom:12}}>🏥 Aller à : {liv.pharmacie}</div>
            <div style={{display:"flex",gap:8}}>
              <button style={{...S.btn,flex:1,background:"#E65100",padding:"10px"}} onClick={()=>setToast({msg:"Commande récupérée ! En route vers le client.",type:"success"})}>
                📦 Récupéré
              </button>
              <button style={{...S.btn,flex:1,padding:"10px"}} onClick={()=>{setLivraisons(ls=>ls.map(l=>l.id===liv.id?{...l,statut:"livree"}:l));setToast({msg:"Livraison effectuée ! +"+liv.frais+" FCFA crédité.",type:"success"});}}>
                ✅ Livré
              </button>
            </div>
          </div>
        ))}
        {livraisons.every(l=>l.statut==="livree")&&(
          <div style={{textAlign:"center",padding:40,color:TXTS}}>
            <div style={{fontSize:48}}>✅</div>
            <p>Toutes les livraisons sont effectuées !</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════
// ESPACE ADMIN
// ══════════════════════════════════════════
function PageAdmin(){
  const [sousPage,setSousPage]=useState("dashboard");
  const [connecte,setConnecte]=useState(false);
  const [loginPwd,setLoginPwd]=useState("");
  const [toast,setToast]=useState(null);

  const PHARMACIES_ADMIN=[
    {id:1,nom:"Pharmacie Centrale du Plateau",commune:"Plateau",statut:"active",cmds:47,ca:84500},
    {id:2,nom:"Pharmacie Sainte Marie",commune:"Cocody",statut:"active",cmds:32,ca:58200},
    {id:3,nom:"Pharmacie de la Paix",commune:"Yopougon",statut:"en_attente",cmds:0,ca:0},
    {id:4,nom:"Pharmacie Abobo Centre",commune:"Abobo",statut:"suspendue",cmds:12,ca:21000},
  ];
  const [pharmas,setPharmas]=useState(PHARMACIES_ADMIN);

  if(!connecte)return(
    <div style={{padding:"40px 16px",textAlign:"center"}}>
      <div style={{fontSize:48,marginBottom:16}}>⚙️</div>
      <h2 style={{marginBottom:24}}>Espace Administrateur</h2>
      <div style={{...S.card,maxWidth:320,margin:"0 auto"}}>
        <label style={S.label}>Mot de passe admin</label>
        <input value={loginPwd} onChange={e=>setLoginPwd(e.target.value)} type="password" placeholder="••••••••" style={{...S.input,marginBottom:16}}/>
        <button style={{...S.btn,width:"100%"}} onClick={()=>setConnecte(true)}>Accéder</button>
        <p style={{fontSize:11,color:TXTS,marginTop:8}}>Démo : cliquez sur Accéder directement</p>
      </div>
    </div>
  );

  return(
    <div style={{paddingBottom:80}}>
      {toast&&<Toast msg={toast.msg} type={toast.type} onClose={()=>setToast(null)}/>}
      <div style={{background:`linear-gradient(135deg,#1A237E,#283593)`,padding:"16px",color:W}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{fontWeight:800,fontSize:16}}>⚙️ Administration SantéExpress</div>
          <button style={{background:"rgba(255,255,255,0.2)",border:"none",color:W,padding:"6px 12px",borderRadius:8,cursor:"pointer",fontSize:12}} onClick={()=>setConnecte(false)}>Déco.</button>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:8,marginTop:14}}>
          {[["316","Pharmacies"],["12","Livreurs"],["1 247","Commandes"],["2.1M","CA FCFA"]].map(([v,l])=>(
            <div key={l} style={{background:"rgba(255,255,255,0.15)",borderRadius:10,padding:"10px 6px",textAlign:"center"}}>
              <div style={{fontWeight:900,fontSize:15,color:"#C5CAE9"}}>{v}</div>
              <div style={{fontSize:10,opacity:0.8}}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={S.tabs}>
        {[["dashboard","📊 Dashboard"],["pharmacies","🏥 Pharmacies"],["commandes","📦 Commandes"],["livreurs","🛵 Livreurs"]].map(([id,label])=>(
          <button key={id} style={{...S.tab,...(sousPage===id?S.tabActive:{})}} onClick={()=>setSousPage(id)}>{label}</button>
        ))}
      </div>

      {sousPage==="dashboard"&&(
        <div style={{padding:"16px 16px 80px"}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>
            {[["📦","Commandes aujourd'hui","47","+12%"],["💰","Revenus du jour","84 500 FCFA","+8%"],["🏥","Pharmacies actives","8/316","En ligne"],["⭐","Satisfaction","4.8/5","Note moy."]].map(([e,l,v,sub])=>(
              <div key={l} style={{...S.statCard}}>
                <div style={{fontSize:24,marginBottom:6}}>{e}</div>
                <div style={{fontWeight:800,color:G,fontSize:16}}>{v}</div>
                <div style={{fontSize:11,color:TXTS}}>{l}</div>
                <div style={{fontSize:11,color:G,fontWeight:700,marginTop:2}}>{sub}</div>
              </div>
            ))}
          </div>
          <div style={S.card}>
            <p style={{fontWeight:700,margin:"0 0 12px"}}>Commandes récentes</p>
            {COMMANDES_DEMO.map(cmd=>(
              <div key={cmd.id} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid #F0F4F1"}}>
                <div>
                  <div style={{fontWeight:700,fontSize:13}}>{cmd.id}</div>
                  <div style={{fontSize:11,color:TXTS}}>{cmd.pharmacie}</div>
                </div>
                <div style={{textAlign:"right"}}>
                  <div style={{fontWeight:700,color:G}}>{cmd.total.toLocaleString()} FCFA</div>
                  <div style={{fontSize:11,color:TXTS}}>{cmd.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {sousPage==="pharmacies"&&(
        <div style={{padding:"16px 16px 80px"}}>
          <h3 style={{fontWeight:800,marginBottom:12}}>Gestion des pharmacies</h3>
          {pharmas.map(p=>{
            const COLS={active:{c:G,bg:GL,l:"Active"},en_attente:{c:WARN,bg:"#FFF3E0",l:"En attente"},suspendue:{c:ERR,bg:"#FFEBEE",l:"Suspendue"}};
            const col=COLS[p.statut];
            return(
              <div key={p.id} style={S.card}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                  <span style={{fontWeight:700}}>{p.nom}</span>
                  <Badge color={col.c} bg={col.bg}>{col.l}</Badge>
                </div>
                <div style={{fontSize:13,color:TXTS,marginBottom:8}}>📍 {p.commune} · 📦 {p.cmds} cmds · 💰 {p.ca.toLocaleString()} FCFA</div>
                <div style={{display:"flex",gap:8}}>
                  {p.statut==="en_attente"&&<button style={{...S.btn,flex:1,padding:"9px",fontSize:13}} onClick={()=>{setPharmas(ps=>ps.map(x=>x.id===p.id?{...x,statut:"active"}:x));setToast({msg:p.nom+" validée !",type:"success"});}}>✅ Valider</button>}
                  {p.statut==="active"&&<button style={{...S.btnGray,flex:1,padding:"9px",fontSize:13}} onClick={()=>{setPharmas(ps=>ps.map(x=>x.id===p.id?{...x,statut:"suspendue"}:x));setToast({msg:p.nom+" suspendue",type:"error"});}}>⏸ Suspendre</button>}
                  {p.statut==="suspendue"&&<button style={{...S.btn,flex:1,padding:"9px",fontSize:13}} onClick={()=>{setPharmas(ps=>ps.map(x=>x.id===p.id?{...x,statut:"active"}:x));setToast({msg:p.nom+" réactivée !",type:"success"});}}>▶️ Réactiver</button>}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {sousPage==="commandes"&&(
        <div style={{padding:"16px 16px 80px"}}>
          <h3 style={{fontWeight:800,marginBottom:12}}>Toutes les commandes</h3>
          {[...COMMANDES_DEMO,{id:"SE-0043",date:"2026-06-12",statut:"confirmee",total:5350,pharmacie:"Pharmacie Sainte Marie",items:[{nom:"Doliprane 1000mg",qte:3,prix:950},{nom:"Zinc",qte:1,prix:2500}]}].map(cmd=>{
            const COLS={confirmee:{c:INFO,bg:"#E3F2FD",l:"Confirmée"},en_cours:{c:WARN,bg:"#FFF3E0",l:"En cours"},livree:{c:G,bg:GL,l:"Livrée"}};
            const col=COLS[cmd.statut]||COLS.confirmee;
            return(
              <div key={cmd.id} style={S.card}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                  <span style={{fontWeight:800,color:G}}>{cmd.id}</span>
                  <Badge color={col.c} bg={col.bg}>{col.l}</Badge>
                </div>
                <div style={{fontSize:13,color:TXTS,marginBottom:4}}>📅 {cmd.date} · 🏥 {cmd.pharmacie}</div>
                <div style={{fontWeight:800,color:G}}>{cmd.total.toLocaleString()} FCFA</div>
              </div>
            );
          })}
        </div>
      )}

      {sousPage==="livreurs"&&(
        <div style={{padding:"16px 16px 80px"}}>
          <h3 style={{fontWeight:800,marginBottom:12}}>Gestion des livreurs</h3>
          {[{id:1,nom:"Koné Mamadou",transport:"🛵 Moto",livraisons:47,note:4.9,statut:"actif"},{id:2,nom:"Diallo Ibrahim",transport:"🚗 Voiture",livraisons:32,note:4.7,statut:"actif"},{id:3,nom:"Ouattara Seydou",transport:"🛵 Moto",livraisons:5,note:4.2,statut:"en_attente"}].map(l=>(
            <div key={l.id} style={S.card}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                <span style={{fontWeight:700}}>{l.nom}</span>
                <Badge color={l.statut==="actif"?G:WARN} bg={l.statut==="actif"?GL:"#FFF3E0"}>{l.statut==="actif"?"Actif":"En attente"}</Badge>
              </div>
              <div style={{fontSize:13,color:TXTS,marginBottom:8}}>{l.transport} · {l.livraisons} livraisons · ⭐ {l.note}</div>
              {l.statut==="en_attente"&&(
                <button style={{...S.btn,width:"100%",padding:"9px",fontSize:13}} onClick={()=>setToast({msg:l.nom+" validé comme livreur !",type:"success"})}>✅ Valider</button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════
// APP PRINCIPALE
// ══════════════════════════════════════════
export default function App(){
  const [page,setPage]=useState("accueil");
  const [panier,setPanier]=useState([]);
  const [commandeActive,setCommandeActive]=useState(null);
  const [user,setUser]=useState(null);

  const totalPanier=panier.reduce((s,i)=>s+i.qte,0);

  const PAGES={
    accueil:<PageAccueil setPage={setPage} panier={panier} setPanier={setPanier} user={user}/>,
    catalogue:<PageCatalogue panier={panier} setPanier={setPanier} setPage={setPage}/>,
    panier:<PagePanier panier={panier} setPanier={setPanier} setPage={setPage}/>,
    checkout:<PageCheckout panier={panier} setPanier={setPanier} setPage={setPage} setCommandeActive={setCommandeActive}/>,
    suivi:<PageSuivi commande={commandeActive} setPage={setPage}/>,
    commandes:<PageCommandes commandeActive={commandeActive}/>,
    pharmacie:<PagePharmacie/>,
    livreur:<PageLivreur/>,
    admin:<PageAdmin/>,
  };

  const PAGE_TITLES={
    accueil:"SANTÉEXPRESS",catalogue:"Catalogue",panier:"Mon panier",
    checkout:"Paiement",suivi:"Suivi commande",commandes:"Mes commandes",
    pharmacie:"Espace Pharmacie 🏥",livreur:"Espace Livreur 🛵",admin:"Administration ⚙️",
  };

  return(
    <>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0;}
        body{background:#E8ECE9;}
        @keyframes spin{to{transform:rotate(360deg)}}
        ::-webkit-scrollbar{display:none}
        input:focus,textarea:focus{border-color:${G}!important;box-shadow:0 0 0 3px ${GL};}
      `}</style>
      <div style={S.app}>
        {/* HEADER */}
        <div style={S.header}>
          <button onClick={()=>setPage("accueil")} style={{background:"none",border:"none",cursor:"pointer"}}>
            <span style={S.logo}>SANTÉ<span style={{color:GL}}>EXPRESS</span></span>
          </button>
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            <button onClick={()=>setPage("panier")} style={{background:"rgba(255,255,255,0.15)",border:"none",borderRadius:10,padding:"8px 12px",cursor:"pointer",position:"relative",fontSize:18}}>
              🛒{totalPanier>0&&<span style={{position:"absolute",top:-4,right:-4,background:ERR,color:W,borderRadius:"50%",width:18,height:18,fontSize:11,fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center"}}>{totalPanier}</span>}
            </button>
            <button onClick={()=>setPage("commandes")} style={{background:"rgba(255,255,255,0.15)",border:`1.5px solid rgba(255,255,255,0.4)`,borderRadius:10,padding:"7px 14px",cursor:"pointer",color:W,fontSize:13,fontWeight:700}}>
              Connexion
            </button>
          </div>
        </div>

        {/* SOUS-HEADER pour pages intérieures */}
        {page!=="accueil"&&(
          <div style={{background:W,padding:"12px 16px",display:"flex",alignItems:"center",gap:10,borderBottom:"1.5px solid #E8ECE9",position:"sticky",top:56,zIndex:95}}>
            <button onClick={()=>setPage("accueil")} style={{background:GBG,border:"none",borderRadius:10,width:34,height:34,cursor:"pointer",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center"}}>←</button>
            <span style={{fontWeight:800,fontSize:16}}>{PAGE_TITLES[page]||"SantéExpress"}</span>
          </div>
        )}

        {/* CONTENU */}
        <div>{PAGES[page]||PAGES.accueil}</div>

        {/* BOTTOM NAV */}
        <div style={S.bottomNav}>
          {[["accueil","🏠","Accueil"],["catalogue","🛍️","Catalogue"],["commandes","📋","Commandes"],["admin","⚙️","Admin"]].map(([p,e,l])=>(
            <button key={p} style={{...S.navItem,...(page===p?S.navItemActive:{})}} onClick={()=>setPage(p)}>
              <span style={{fontSize:22}}>{e}</span>{l}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
