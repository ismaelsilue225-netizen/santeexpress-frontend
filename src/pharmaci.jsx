import { useState, useEffect } from "react";

/* ══════════════════════════════════════════
   TOKENS — palette originale conservée
══════════════════════════════════════════ */
const G="#00A859",GL="#C8FFDF",GD="#007A42",GBG="#E8F5EE";
const W="#FFFFFF",BG="#F4F6F5",TXT="#0E1A13",TXTS="#6B7D70";
const RED="#E63946",AMBER="#F4A261",PURPLE="#6B48FF";
const WAVE_C="#1A56DB", OM_C="#FF6600", CP_C="#004B9D", YG_C="#E31E2D";
const DELIV_STD=500, DELIV_YANGO=800, COM=0.03;
const fmt=n=>n.toLocaleString("fr-FR")+" FCFA";

/* ── Configuration API ───────────────────────────────
   Développement : http://localhost:5000/api
   Production    : https://ton-domaine.com/api        */
const API_URL="http://localhost:5000/api";
const api=async(endpoint,opts={},token=null)=>{
  try{
    const r=await fetch(API_URL+endpoint,{
      headers:{"Content-Type":"application/json",...(token?{Authorization:`Bearer ${token}`}:{})},
      ...opts,
    });
    return await r.json();
  }catch{ return null; }  // Fallback silencieux si hors ligne
};

/* ══════════════════════════════════════════
   LOGOS — Wave CI & Orange Money (fidèles)
   NB production: remplacer par les PNG
   officiels obtenus via Wave Partners
   et Orange Money CI Business
══════════════════════════════════════════ */

// Wave CI — bleu #1A56DB, onde blanche caractéristique
function LogoWave(){
  return(
    <div style={{width:52,height:52,borderRadius:13,background:"#1A56DB",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",flexShrink:0,overflow:"hidden",padding:0}}>
      <span style={{color:"rgba(255,255,255,0.6)",fontSize:7,fontWeight:700,letterSpacing:2,marginBottom:2,fontFamily:"Arial"}}>wave</span>
      <svg width="36" height="16" viewBox="0 0 36 16">
        <path d="M2 10 C5 3, 8 14, 11 8 C14 2, 17 14, 20 8 C23 2, 26 14, 29 8 C31 4, 33 7, 35 6"
          stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}

// Orange Money CI — orange #FF6600, cercle blanc + OM
function LogoOrange(){
  return(
    <div style={{width:52,height:52,borderRadius:13,background:"#FF6600",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",flexShrink:0}}>
      <div style={{width:28,height:28,borderRadius:"50%",background:"white",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:3}}>
        <span style={{color:"#FF6600",fontWeight:900,fontSize:10,fontFamily:"Arial"}}>OM</span>
      </div>
      <span style={{color:"rgba(255,255,255,0.9)",fontSize:7,fontWeight:700,letterSpacing:0.5,fontFamily:"Arial"}}>ORANGE</span>
    </div>
  );
}

// CinetPay — bleu #004B9D, carte bancaire
function LogoCinetPay(){
  return(
    <div style={{width:52,height:52,borderRadius:13,background:"#004B9D",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",flexShrink:0}}>
      <div style={{border:"1.5px solid rgba(255,255,255,0.4)",borderRadius:4,padding:"3px 7px",marginBottom:3}}>
        <span style={{color:"white",fontWeight:700,fontSize:8,fontFamily:"Arial",letterSpacing:0.5}}>CINET</span>
      </div>
      <span style={{color:"#FFD700",fontWeight:900,fontSize:11,fontFamily:"Arial"}}>PAY</span>
    </div>
  );
}

// Yango — rouge #E31E2D, Y blanc
function LogoYango(){
  return(
    <div style={{width:44,height:44,borderRadius:11,background:"#E31E2D",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
      <span style={{color:"white",fontWeight:900,fontSize:26,lineHeight:1,fontFamily:"Arial Black, Arial"}}>Y</span>
    </div>
  );
}

// Cash
function LogoCash(){
  return(
    <div style={{width:52,height:52,borderRadius:13,background:"#27AE60",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:26}}>
      💵
    </div>
  );
}

// Assurance
function LogoInsurance(){
  return(
    <div style={{width:52,height:52,borderRadius:13,background:PURPLE,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:24}}>
      🛡️
    </div>
  );
}

/* ══════════════════════════════════════════
   DONNÉES
══════════════════════════════════════════ */
const CATS=[
  {id:"all",label:"Tout",icon:"🏪"},
  {id:"antidouleur",label:"Antidouleurs",icon:"💊"},
  {id:"vitamines",label:"Vitamines",icon:"🌿"},
  {id:"antibio",label:"Antibiotiques",icon:"🧬"},
  {id:"soin",label:"Soins",icon:"🧴"},
  {id:"bebe",label:"Bébé",icon:"👶"},
  {id:"materiel",label:"Matériel",icon:"🩺"},
];

const ITEMS=[
  {id:1, name:"Paracétamol 500mg",       cat:"antidouleur",price:500, unit:"Boîte 16 cp",   emoji:"💊",rx:false,desc:"Antalgique et antipyrétique. Soulage la douleur et fait baisser la fièvre.",stock:true },
  {id:2, name:"Ibuprofène 400mg",         cat:"antidouleur",price:850, unit:"Boîte 14 cp",   emoji:"💊",rx:false,desc:"Anti-inflammatoire non stéroïdien. Réduit la douleur et l'inflammation.",  stock:true },
  {id:3, name:"Doliprane 1000mg",         cat:"antidouleur",price:950, unit:"Boîte 8 cp",    emoji:"💊",rx:false,desc:"Paracétamol fort dosage pour adultes. Max 4 comprimés par jour.",          stock:true },
  {id:4, name:"Vitamine C 1000mg",        cat:"vitamines",  price:1200,unit:"Boîte 30 cp",   emoji:"🍊",rx:false,desc:"Renforce le système immunitaire. Effervescent, goût orange.",              stock:true },
  {id:5, name:"Zinc + Vitamine D3",       cat:"vitamines",  price:2500,unit:"Flacon 60 gél.",emoji:"🌿",rx:false,desc:"Complexe vitamino-minéral pour l'immunité et la santé osseuse.",           stock:true },
  {id:6, name:"Magnésium B6",             cat:"vitamines",  price:1800,unit:"Boîte 45 cp",   emoji:"⚡",rx:false,desc:"Réduit la fatigue, contribue au fonctionnement musculaire normal.",        stock:true },
  {id:7, name:"Amoxicilline 500mg",       cat:"antibio",    price:3500,unit:"Boîte 21 gél.", emoji:"🧬",rx:true, desc:"Antibiotique à large spectre. Ordonnance médicale obligatoire.",           stock:true },
  {id:8, name:"Gel hydroalcoolique",      cat:"soin",       price:1000,unit:"Flacon 250ml",  emoji:"🧴",rx:false,desc:"Désinfectant mains. 70% d'alcool isopropylique. Action rapide.",           stock:true },
  {id:9, name:"Sérum physiologique",      cat:"soin",       price:750, unit:"Boîte 30 unid.",emoji:"🩹",rx:false,desc:"Solution isotonique stérile, nettoyage nasal et oculaire.",               stock:true },
  {id:10,name:"Alcool médical 70°",       cat:"soin",       price:600, unit:"Flacon 250ml",  emoji:"🧪",rx:false,desc:"Désinfection cutanée avant injection. Usage externe uniquement.",          stock:true },
  {id:11,name:"Masques chirurgicaux",     cat:"soin",       price:2000,unit:"Boîte 50 pcs",  emoji:"😷",rx:false,desc:"Type IIR, norme EN 14683. Protection efficace contre les projections.",   stock:true },
  {id:12,name:"SRO Sachet réhydratation", cat:"soin",       price:300, unit:"Sachet x5",     emoji:"💧",rx:false,desc:"Sels de réhydratation orale. Traitement diarrhée et déshydratation.",     stock:true },
  {id:13,name:"Couches bébé T3 (4-9kg)", cat:"bebe",       price:5500,unit:"Paquet 44 pcs", emoji:"👶",rx:false,desc:"Couches ultra-absorbantes et douces pour bébés de 4 à 9 kg.",             stock:false},
  {id:14,name:"Thermomètre digital",      cat:"materiel",   price:3000,unit:"1 pièce",       emoji:"🌡️",rx:false,desc:"Résultat en 60 secondes. Alarme fièvre, mémoire 10 mesures.",            stock:true },
];

const PHARMACIES=[
  {id:1, name:"Pharmacie du Plateau",      district:"Plateau",    addr:"Av. Botreau-Roussel",         open:true, garde:false,rating:4.8,orders:142},
  {id:2, name:"Pharmacie Sainte Marie",    district:"Cocody",     addr:"Rue des Jardins, Cocody",     open:true, garde:false,rating:4.6,orders:98 },
  {id:3, name:"Pharmacie de la Riviera",   district:"Cocody",     addr:"Riviera 2, Abidjan",          open:true, garde:true, rating:4.9,orders:210},
  {id:4, name:"Pharmacie du Bonheur",      district:"Yopougon",   addr:"Yopougon-Attié",              open:true, garde:false,rating:4.5,orders:87 },
  {id:5, name:"Pharmacie Abobo Centre",    district:"Abobo",      addr:"Marché d'Abobo Centre",       open:false,garde:true, rating:4.3,orders:63 },
  {id:6, name:"Pharmacie Marcory Réel",    district:"Marcory",    addr:"Bd de Marseille, Marcory",    open:true, garde:false,rating:4.7,orders:115},
  {id:7, name:"Pharmacie Adjamé 220",      district:"Adjamé",     addr:"Marché Adjamé 220",           open:true, garde:false,rating:4.4,orders:76 },
  {id:8, name:"Pharmacie Port-Bouët",      district:"Port-Bouët", addr:"Zone Aéroportuaire",          open:true, garde:true, rating:4.6,orders:54 },
  {id:9, name:"Pharmacie Koumassi Centre", district:"Koumassi",   addr:"Centre Commercial Koumassi",  open:true, garde:false,rating:4.5,orders:89 },
  {id:10,name:"Pharmacie Angré 7e Tr.",    district:"Cocody",     addr:"Angré 7e Tranche",            open:true, garde:false,rating:4.7,orders:103},
  {id:11,name:"Pharmacie Treichville",     district:"Treichville",addr:"Bd Giscard d'Estaing",        open:true, garde:true, rating:4.5,orders:71 },
  {id:12,name:"Pharmacie Bingerville",     district:"Bingerville",addr:"Route de Bingerville",        open:false,garde:false,rating:4.2,orders:31 },
];

const ASSURANCES=[
  {id:"cnam",  name:"CNAM",     full:"Caisse Nationale d'Assurance Maladie",  cover:70, clr:"#0055A4"},
  {id:"mugef", name:"MUGEF-CI", full:"Mutuelle Générale des Fonctionnaires",  cover:80, clr:"#006633"},
  {id:"amu",   name:"AMU",      full:"Assurance Maladie Universelle",         cover:60, clr:"#CC0000"},
  {id:"nsia",  name:"NSIA",     full:"NSIA Assurances CI",                    cover:50, clr:"#E87722"},
  {id:"axa",   name:"AXA",      full:"AXA Assurance CI",                      cover:65, clr:"#00008F"},
  {id:"sanlam",name:"Sanlam",   full:"Sanlam Vie CI",                         cover:55, clr:"#003057"},
];

const INIT_ORDERS=[
  {id:"PC-0001",date:"08/06/2026",items:[{name:"Paracétamol 500mg",qty:2,price:500}],          subtotal:1000,delivFee:500,total:1500,status:"delivered",pharmacy:"Pharmacie du Plateau",   payment:"wave",  delivMode:"std",address:"Cocody, Abidjan",phone:"+225 07 XX",rating:5 },
  {id:"PC-0002",date:"04/06/2026",items:[{name:"Vitamine C",qty:1,price:1200},{name:"Zinc+D3",qty:1,price:2500}],subtotal:3700,delivFee:500,total:4200,status:"delivered",pharmacy:"Pharmacie Sainte Marie",payment:"orange",delivMode:"std",address:"Plateau, Abidjan",phone:"+225 05 XX",rating:null},
  {id:"PC-0003",date:"01/06/2026",items:[{name:"Gel hydroalcoolique",qty:3,price:1000}],        subtotal:3000,delivFee:800,total:3800,status:"delivered",pharmacy:"Pharmacie Riviera",       payment:"yango", delivMode:"yango",address:"Yopougon, Abidjan",phone:"+225 01 XX",rating:4 },
];

/* ══════════════════════════════════════════
   COMPOSANT RACINE
══════════════════════════════════════════ */
export default function App(){
  const [mode,setMode]=useState("landing");
  const [cart,setCart]=useState([]);
  const [product,setProduct]=useState(null);
  const [search,setSearch]=useState("");
  const [cat,setCat]=useState("all");
  const [form,setForm]=useState({name:"",phone:"",address:"",note:"",payment:"wave",delivMode:"std",insurer:"",insurerCard:"",promo:"",ordonnance:null});
  const [orders,setOrders]=useState(INIT_ORDERS);
  const [curOrder,setCurOrder]=useState(null);
  const [rateTarget,setRateTarget]=useState(null);

  // ── Auth & API ──────────────────────────────────
  const [token,setToken]=useState(null);
  const [user,setUser]=useState(null);
  const [showLogin,setShowLogin]=useState(false);
  const [itemsData,setItemsData]=useState(ITEMS);
  const [pharmaciesData,setPharmaciesData]=useState(PHARMACIES);
  const [apiOk,setApiOk]=useState(false);
  const [searching,setSearching]=useState(false);

  // Charger produits + pharmacies depuis l'API au démarrage
  useEffect(()=>{
    Promise.all([
      api("/produits").then(d=>{if(d?.produits?.length)setItemsData(d.produits);}),
      api("/pharmacies").then(d=>{if(d?.pharmacies?.length)setPharmaciesData(d.pharmacies);}),
    ]).then(()=>setApiOk(true)).catch(()=>setApiOk(false));
  },[]);

  // Recharger les commandes quand l'utilisateur se connecte
  useEffect(()=>{
    if(token){
      api("/commandes/mes-commandes",{},token).then(d=>{
        if(d?.commandes?.length){
          setOrders(d.commandes.map(c=>({
            id:c.reference||c.id,date:c.created_at?.slice(0,10)||c.date,
            items:c.items||[],subtotal:c.sous_total||c.subtotal,
            delivFee:c.frais_livraison||500,total:c.total,
            status:c.statut||"confirmed",pharmacy:c.pharmacie_nom||"Pharmacie partenaire",
            payment:c.mode_paiement||"wave",address:c.adresse_livraison||"",
            phone:c.telephone_client||"",rating:c.note_client||null,
          })));
        }
      });
    }
  },[token]);

  const subtotal=cart.reduce((s,i)=>s+i.price*i.qty,0);
  const delivFee=form.delivMode==="yango"?DELIV_YANGO:DELIV_STD;
  const count=cart.reduce((s,i)=>s+i.qty,0);

  const addToCart=item=>setCart(prev=>{
    const ex=prev.find(i=>i.id===item.id);
    if(ex) return prev.map(i=>i.id===item.id?{...i,qty:i.qty+1}:i);
    return [...prev,{...item,qty:1}];
  });
  const removeItem=id=>setCart(prev=>prev.filter(i=>i.id!==id));
  const updateQty=(id,qty)=>qty<1?removeItem(id):setCart(prev=>prev.map(i=>i.id===id?{...i,qty}:i));

  const navBack=()=>{
    const map={product:"catalog",checkout:"cart",tracking:"history",history:"landing",rating:"history",livreur:"landing",admin:"landing",pharmacie:"landing"};
    setMode(map[mode]||"landing");
  };

  const filtered=itemsData.filter(p=>(cat==="all"||p.cat===cat||p.categorie===cat)&&(p.name||p.nom||"").toLowerCase().includes(search.toLowerCase()));

  const placeOrder=async()=>{
    const insurer=ASSURANCES.find(a=>a.id===form.insurer);
    const insAmt=form.payment==="assurance"&&insurer?Math.round(subtotal*insurer.cover/100):0;

    // ── Appel API ──
    const body={
      items:cart.map(i=>({produit_id:i.id,nom_produit:i.name||i.nom,prix_unitaire:i.price||i.prix,quantite:i.qty})),
      pharmacie_id:pharmaciesData[0]?.id||1,
      adresse_livraison:form.address, telephone_client:form.phone, nom_client:form.name,
      mode_paiement:form.payment, mode_livraison:form.delivMode,
      frais_livraison:delivFee, couverture_assurance:insAmt,
      note_pharmacien:form.note||null,
    };
    const res=await api("/commandes",{method:"POST",body:JSON.stringify(body)},token);

    // Si paiement mobile money → rediriger vers la page de paiement
    if(res?.commande&&["wave","orange","cinetpay"].includes(form.payment)){
      const pRes=await api("/paiements/cinetpay/initier",{method:"POST",body:JSON.stringify({commande_id:res.commande.id,montant:subtotal+delivFee-insAmt})});
      if(pRes?.payment_url) window.open(pRes.payment_url,"_blank");
    }

    // Créer l'objet commande local (API ou fallback)
    const o={
      id:res?.commande?.reference||`PC-${String(orders.length+4).padStart(4,"0")}`,
      date:new Date().toLocaleDateString("fr-FR"),
      items:[...cart], subtotal, delivFee,
      total:subtotal+delivFee-insAmt, insuranceCover:insAmt,
      status:"confirmed",
      pharmacy:pharmaciesData[0]?.nom||PHARMACIES[0].name,
      payment:form.payment, delivMode:form.delivMode,
      address:form.address, phone:form.phone, name:form.name, rating:null,
    };
    setOrders(prev=>[o,...prev]);
    setCurOrder(o);
    setCart([]);
    setSearching(true); // ← déclenche l'animation de recherche
  };

  if(mode==="confirmed") return <Confirmed setMode={setMode}/>;

  return(
    <div style={{fontFamily:"'Segoe UI',sans-serif",background:BG,minHeight:"100vh",maxWidth:480,margin:"0 auto",paddingBottom:["livreur","admin","pharmacie"].includes(mode)?0:64}}>
      <Header mode={mode} navBack={navBack} count={count} setMode={setMode} user={user} onLogin={()=>setShowLogin(true)}/>

      {/* Indicateur API connectée */}
      {apiOk&&mode==="landing"&&(
        <div style={{background:"#E8F5EE",padding:"5px 16px",display:"flex",alignItems:"center",gap:6}}>
          <div style={{width:7,height:7,borderRadius:"50%",background:G}}/><span style={{color:GD,fontSize:11,fontWeight:600}}>API connectée — données en temps réel</span>
        </div>
      )}

      {showLogin&&<LoginModal onClose={()=>setShowLogin(false)} onSuccess={(tok,usr)=>{setToken(tok);setUser(usr);setShowLogin(false);}}/>}

      {/* Animation recherche pharmacie automatique */}
      {searching&&<SearchingPharmacy commune={form.address.split(",")[0]||"Abidjan"} onFound={()=>{setSearching(false);setMode("tracking");}}/>}

      {mode==="landing"  &&<Landing   setMode={setMode} setCat={setCat} setSearch={setSearch} addToCart={addToCart} setProduct={setProduct} pharmacies={pharmaciesData}/>}
      {mode==="catalog"  &&<Catalog   items={filtered} cats={CATS} cat={cat} setCat={setCat} search={search} setSearch={setSearch} onSelect={p=>{setProduct(p);setMode("product");}} onAdd={addToCart}/>}
      {mode==="product"  &&product&&  <Product product={product} onAdd={addToCart} inCart={cart.some(i=>i.id===product.id)}/>}
      {mode==="cart"     &&<Cart      cart={cart} subtotal={subtotal} delivFee={delivFee} onRemove={removeItem} onQty={updateQty} onCheckout={()=>setMode("checkout")} setMode={setMode}/>}
      {mode==="checkout" &&<Checkout  cart={cart} subtotal={subtotal} delivFee={delivFee} form={form} setForm={setForm} onConfirm={placeOrder}/>}
      {mode==="tracking" &&curOrder&&  <Tracking order={curOrder} onRate={()=>{setRateTarget(curOrder);setMode("rating");}}/>}
      {mode==="history"  &&<History   orders={orders} onOpen={o=>{setCurOrder(o);setMode("tracking");}} onRate={o=>{setRateTarget(o);setMode("rating");}}/>}
      {mode==="rating"   &&rateTarget&&<Rating order={rateTarget} onDone={r=>{setOrders(prev=>prev.map(o=>o.id===rateTarget.id?{...o,rating:r}:o));setMode("history");}}/>}
      {mode==="livreur"  &&<Livreur   orders={orders}/>}
      {mode==="admin"    &&<Admin     orders={orders} pharmacies={pharmaciesData}/>}
      {mode==="pharmacie"&&<Pharmacie/>}

      {!["livreur","admin","pharmacie"].includes(mode)&&<BottomNav mode={mode} setMode={setMode} count={count}/>}
    </div>
  );
}

/* ══ HEADER ══════════════════════════════ */
function Header({mode,navBack,count,setMode,user,onLogin}){
  const T={catalog:"Catalogue",product:"Détails",cart:"Mon panier",checkout:"Paiement",tracking:"Suivi commande",history:"Mes commandes",rating:"Laisser un avis",livreur:"Espace Livreur 🛵",admin:"Administration ⚙️",pharmacie:"Espace Pharmacie 🏥"};
  return(
    <div style={{background:G,padding:"15px 18px",display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:100,boxShadow:"0 2px 14px rgba(0,0,0,0.18)"}}>
      <div style={{display:"flex",alignItems:"center",gap:10}}>
        {mode!=="landing"&&<button onClick={navBack} style={{background:"rgba(255,255,255,0.22)",border:"none",borderRadius:8,width:34,height:34,color:W,fontSize:18,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>←</button>}
        {mode==="landing"
          ?<h1 style={{color:W,fontSize:22,fontWeight:900,margin:0,letterSpacing:-0.5}}>SANTÉ<span style={{color:GL}}>EXPRESS</span></h1>
          :<span style={{color:W,fontWeight:700,fontSize:16}}>{T[mode]}</span>}
      </div>
      <div style={{display:"flex",alignItems:"center",gap:8}}>
        {!["checkout","rating","livreur","admin","pharmacie"].includes(mode)&&(
          <button onClick={()=>setMode("cart")} style={{background:"rgba(255,255,255,0.2)",border:"none",borderRadius:20,padding:"6px 14px",color:W,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",gap:6}}>
            🛒{count>0&&<span style={{background:RED,borderRadius:"50%",width:20,height:20,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:800}}>{count}</span>}
          </button>
        )}
        {mode==="landing"&&(
          user
            ?<span style={{color:GL,fontSize:12,fontWeight:600}}>👤 {user.nom?.split(" ")[0]}</span>
            :<button onClick={onLogin} style={{background:"rgba(255,255,255,0.22)",border:"none",borderRadius:20,padding:"7px 14px",color:W,fontWeight:700,cursor:"pointer",fontSize:12}}>Connexion</button>
        )}
      </div>
    </div>
  );
}

/* ══ BOTTOM NAV ══════════════════════════ */
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

/* ══ LANDING ══════════════════════════════ */
function Landing({setMode,setCat,setSearch,addToCart,setProduct,pharmacies}){
  const [q,setQ]=useState("");
  const go=()=>{if(q.trim())setSearch(q);setCat("all");setMode("catalog");};
  const gardeList=(pharmacies||PHARMACIES).filter(p=>p.garde||p.est_garde);

  // Images Unsplash — pharmaciens, médicaments, livraison
  const IMG={
    hero:    "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=800&q=85&fit=crop",
    pharma:  "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&q=80&fit=crop",
    livraison:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80&fit=crop",
    soins:   "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80&fit=crop",
    pills:   "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&q=80&fit=crop",
  };

  return(
    <div style={{paddingBottom:16}}>

      {/* ══ HERO — style Yango ══════════════════════ */}
      <div style={{position:"relative",minHeight:520,background:`linear-gradient(160deg,${GD} 0%,#002918 100%)`,overflow:"hidden"}}>
        {/* Image de fond — pharmacien */}
        <img src={IMG.hero} alt="Pharmacien"
          style={{position:"absolute",right:0,top:0,height:"100%",width:"55%",objectFit:"cover",objectPosition:"center top",opacity:0.35,mixBlendMode:"luminosity"}}
          onError={e=>e.target.style.display="none"}/>
        {/* Dégradé sur l'image */}
        <div style={{position:"absolute",inset:0,background:"linear-gradient(90deg,rgba(0,40,20,0.95) 40%,rgba(0,40,20,0.3) 100%)"}}/>

        <div style={{position:"relative",zIndex:2,padding:"32px 22px 40px"}}>
          {/* Badges */}
          <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:24}}>
            {[["🌙","Garde 24h/24"],["🛵","Livraison rapide"],["📱","Mobile Money"]].map(([ic,lb])=>(
              <span key={lb} style={{background:"rgba(255,255,255,0.12)",backdropFilter:"blur(8px)",border:"1px solid rgba(255,255,255,0.18)",borderRadius:30,padding:"7px 14px",color:W,fontSize:13,fontWeight:600,display:"flex",alignItems:"center",gap:6}}>
                {ic} {lb}
              </span>
            ))}
          </div>

          {/* Titre principal — gros et bold */}
          <h1 style={{color:W,fontSize:38,fontWeight:900,lineHeight:1.1,margin:"0 0 16px",letterSpacing:-1}}>
            Vos médicaments<br/>
            <span style={{color:"#7EFFC5"}}>livrés chez vous.</span>
          </h1>
          <p style={{color:"rgba(255,255,255,0.65)",fontSize:15,lineHeight:1.7,marginBottom:28,maxWidth:300}}>
            Trouvez une pharmacie de garde à Abidjan et commandez en quelques secondes.
          </p>

          {/* CTA principal */}
          <button onClick={()=>setMode("catalog")}
            style={{width:"100%",background:G,color:W,border:"none",borderRadius:50,padding:"17px 24px",fontWeight:900,fontSize:16,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:10,boxShadow:"0 8px 30px rgba(0,168,89,0.4)",marginBottom:12}}>
            Commander mes médicaments <span style={{fontSize:18}}>→</span>
          </button>

          {/* CTA secondaire */}
          <button onClick={()=>setMode("pharmacie")}
            style={{width:"100%",background:"rgba(255,255,255,0.1)",color:W,border:"1.5px solid rgba(255,255,255,0.25)",borderRadius:50,padding:"14px 24px",fontWeight:700,fontSize:14,cursor:"pointer",backdropFilter:"blur(8px)"}}>
            🏥 Espace Pharmacie
          </button>
        </div>
      </div>

      {/* ══ STATS ═══════════════════════════════════ */}
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

      {/* ══ COMMENT ÇA MARCHE ════════════════════════ */}
      <div style={{padding:"28px 22px",background:BG}}>
        <p style={{color:G,fontWeight:700,fontSize:11,letterSpacing:2,marginBottom:6}}>COMMENT ÇA MARCHE</p>
        <h2 style={{color:TXT,fontWeight:900,fontSize:24,lineHeight:1.2,margin:"0 0 24px"}}>
          Simple comme<br/>envoyer un message
        </h2>
        {[
          {n:"01",ic:"🔍",t:"Recherchez",s:"Tapez le nom du médicament ou parcourez le catalogue"},
          {n:"02",ic:"💊",t:"Pharmacien prépare",s:"La meilleure pharmacie de votre zone reçoit votre commande"},
          {n:"03",ic:"🛵",t:"Livreur livre",s:"Votre commande arrive chez vous en 30 minutes"},
        ].map(({n,ic,t,s})=>(
          <div key={n} style={{display:"flex",gap:14,marginBottom:20,alignItems:"flex-start"}}>
            <div style={{width:44,height:44,borderRadius:12,background:GBG,border:`2px solid ${G}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>{ic}</div>
            <div style={{flex:1}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:3}}>
                <span style={{color:G,fontWeight:800,fontSize:11}}>{n}</span>
                <p style={{color:TXT,fontWeight:800,fontSize:14,margin:0}}>{t}</p>
              </div>
              <p style={{color:TXTS,fontSize:13,margin:0,lineHeight:1.5}}>{s}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ══ IMAGE SECTION — Pharmacien ═══════════════ */}
      <div style={{margin:"0 16px 16px",borderRadius:20,overflow:"hidden",position:"relative",height:220,background:`linear-gradient(135deg,${G},${GD})`}}>
        <img src={IMG.soins} alt="Pharmacien professionnel"
          style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center",opacity:0.45}}
          onError={e=>e.target.style.display="none"}/>
        <div style={{position:"absolute",inset:0,background:"linear-gradient(0deg,rgba(0,40,20,0.9) 0%,rgba(0,100,50,0.3) 100%)",display:"flex",flexDirection:"column",justifyContent:"flex-end",padding:18}}>
          <p style={{color:GL,fontSize:10,fontWeight:700,letterSpacing:2,margin:"0 0 4px"}}>PHARMACIENS CERTIFIÉS</p>
          <h3 style={{color:W,fontWeight:900,fontSize:20,margin:"0 0 5px",lineHeight:1.2}}>Des professionnels de santé à votre service</h3>
          <p style={{color:"rgba(255,255,255,0.7)",fontSize:12,margin:0}}>Chaque commande vérifiée par un pharmacien diplômé</p>
        </div>
      </div>

      {/* ══ PAIEMENTS ════════════════════════════════ */}
      <div style={{margin:"0 16px 16px",background:W,borderRadius:20,padding:20,boxShadow:"0 2px 16px rgba(0,0,0,0.06)"}}>
        <p style={{color:G,fontWeight:700,fontSize:11,letterSpacing:2,marginBottom:6}}>PAIEMENT</p>
        <h3 style={{color:TXT,fontWeight:900,fontSize:18,margin:"0 0 16px"}}>Payez comme vous voulez</h3>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          {[
            {logo:<LogoWave/>,   lb:"Wave CI",      desc:"Instantané"},
            {logo:<LogoOrange/>, lb:"Orange Money", desc:"Mobile Money"},
            {logo:<LogoCinetPay/>,lb:"Visa/Mastercard",desc:"CinetPay"},
            {logo:<LogoCash/>,   lb:"Cash",          desc:"À la livraison"},
          ].map(({logo,lb,desc})=>(
            <div key={lb} style={{display:"flex",alignItems:"center",gap:10,background:BG,borderRadius:12,padding:10}}>
              <div style={{flexShrink:0}}>{logo}</div>
              <div><p style={{color:TXT,fontWeight:700,fontSize:12,margin:"0 0 1px"}}>{lb}</p><p style={{color:TXTS,fontSize:10,margin:0}}>{desc}</p></div>
            </div>
          ))}
        </div>
      </div>

      {/* ══ IMAGE — Livraison ════════════════════════ */}
      <div style={{margin:"0 16px 16px",borderRadius:20,overflow:"hidden",position:"relative",height:200,background:"#1A1A2E"}}>
        <img src={IMG.livraison} alt="Livraison rapide"
          style={{width:"100%",height:"100%",objectFit:"cover",opacity:0.5}}
          onError={e=>e.target.style.display="none"}/>
        <div style={{position:"absolute",inset:0,padding:18,display:"flex",flexDirection:"column",justifyContent:"flex-end"}}>
          <h3 style={{color:W,fontWeight:900,fontSize:20,margin:"0 0 5px"}}>Livraison en 30 min 🛵</h3>
          <p style={{color:"rgba(255,255,255,0.7)",fontSize:12,margin:0}}>Des livreurs professionnels dans toute Abidjan</p>
        </div>
      </div>

      {/* ══ PHARMACIES DE GARDE ══════════════════════ */}
      <div style={{padding:"16px 16px 0"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
          <h3 style={{color:TXT,fontWeight:900,margin:0,fontSize:17}}>🏥 Pharmacies de garde</h3>
          <button onClick={()=>setMode("catalog")} style={{background:"none",border:"none",color:G,fontWeight:700,cursor:"pointer",fontSize:12}}>Voir tout →</button>
        </div>
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

      {/* ══ CATÉGORIES ═══════════════════════════════ */}
      <div style={{padding:"16px 16px 0"}}>
        <h3 style={{color:TXT,fontWeight:900,margin:"0 0 12px",fontSize:17}}>Catégories</h3>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10}}>
          {CATS.filter(c=>c.id!=="all").map(c=>(
            <button key={c.id} onClick={()=>{setCat(c.id);setMode("catalog");}}
              style={{background:W,border:"none",borderRadius:14,padding:"14px 5px",textAlign:"center",cursor:"pointer",boxShadow:"0 2px 10px rgba(0,0,0,0.06)"}}>
              <div style={{fontSize:24,marginBottom:5}}>{c.icon}</div>
              <p style={{color:TXT,fontSize:11,fontWeight:700,margin:0}}>{c.label}</p>
            </button>
          ))}
        </div>
      </div>

      {/* ══ IMAGE — Médicaments ══════════════════════ */}
      <div style={{margin:"16px 16px 0",borderRadius:20,overflow:"hidden",position:"relative",height:180,background:`linear-gradient(135deg,#1a1a2e,#16213e)`}}>
        <img src={IMG.pills} alt="Médicaments"
          style={{width:"100%",height:"100%",objectFit:"cover",opacity:0.4}}
          onError={e=>e.target.style.display="none"}/>
        <div style={{position:"absolute",inset:0,padding:20,display:"flex",flexDirection:"column",justifyContent:"center"}}>
          <p style={{color:GL,fontWeight:700,fontSize:11,letterSpacing:2,margin:"0 0 5px"}}>+200 MÉDICAMENTS</p>
          <h3 style={{color:W,fontWeight:900,fontSize:20,margin:"0 0 10px",lineHeight:1.2}}>Tout ce dont vous avez besoin</h3>
          <button onClick={()=>setMode("catalog")}
            style={{background:G,color:W,border:"none",borderRadius:30,padding:"10px 18px",fontWeight:700,cursor:"pointer",fontSize:13,width:"fit-content"}}>
            Voir le catalogue →
          </button>
        </div>
      </div>

      {/* ══ ACCÈS RAPIDE ═════════════════════════════ */}
      <div style={{padding:"16px 16px 0"}}>
        <div style={{display:"flex",gap:10}}>
          <button onClick={()=>setMode("livreur")} style={{flex:1,background:W,border:`1.5px solid ${G}`,borderRadius:14,padding:"13px 8px",display:"flex",alignItems:"center",justifyContent:"center",gap:7,cursor:"pointer",boxShadow:"0 2px 10px rgba(0,0,0,0.06)"}}>
            <span style={{fontSize:18}}>🛵</span><span style={{color:GD,fontWeight:700,fontSize:12}}>Livreur</span>
          </button>
          <button onClick={()=>setMode("pharmacie")} style={{flex:1,background:W,border:`1.5px solid ${G}`,borderRadius:14,padding:"13px 8px",display:"flex",alignItems:"center",justifyContent:"center",gap:7,cursor:"pointer",boxShadow:"0 2px 10px rgba(0,0,0,0.06)"}}>
            <span style={{fontSize:18}}>🏥</span><span style={{color:GD,fontWeight:700,fontSize:12}}>Pharmacie</span>
          </button>
          <button onClick={()=>setMode("admin")} style={{flex:1,background:W,border:`1.5px solid ${G}`,borderRadius:14,padding:"13px 8px",display:"flex",alignItems:"center",justifyContent:"center",gap:7,cursor:"pointer",boxShadow:"0 2px 10px rgba(0,0,0,0.06)"}}>
            <span style={{fontSize:18}}>⚙️</span><span style={{color:GD,fontWeight:700,fontSize:12}}>Admin</span>
          </button>
        </div>
      </div>

      {/* ══ BARRE RECHERCHE FLOTTANTE ════════════════ */}
      <div style={{margin:"16px 16px 0",background:W,borderRadius:50,display:"flex",overflow:"hidden",boxShadow:"0 4px 20px rgba(0,0,0,0.12)",border:`2px solid ${G}`}}>
        <input value={q} onChange={e=>setQ(e.target.value)} onKeyDown={e=>e.key==="Enter"&&go()}
          placeholder="🔍 Rechercher un médicament..."
          style={{flex:1,border:"none",padding:"14px 18px",fontSize:14,outline:"none",color:TXT,background:"transparent"}}/>
        <button onClick={go} style={{background:G,border:"none",padding:"0 20px",color:W,fontWeight:800,cursor:"pointer",fontSize:14}}>Chercher</button>
      </div>

      {/* ══ FOOTER ══════════════════════════════════ */}
      <div style={{margin:"16px 16px 0",padding:"16px",textAlign:"center"}}>
        <p style={{color:TXTS,fontSize:11,margin:0}}>🇨🇮 SantéExpress · Abidjan, Côte d'Ivoire</p>
        <p style={{color:TXTS,fontSize:10,margin:"4px 0 0"}}>Pharmaciens certifiés · Paiements sécurisés</p>
      </div>
    </div>
  );
}

/* ══ CATALOG ══════════════════════════════ */
function Catalog({items,cats,cat,setCat,search,setSearch,onSelect,onAdd}){
  return(
    <div>
      <div style={{padding:"12px 14px 6px"}}>
        <div style={{display:"flex",background:W,borderRadius:11,overflow:"hidden",border:`2px solid ${G}`}}>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Rechercher un médicament..."
            style={{flex:1,border:"none",padding:"11px 13px",fontSize:14,outline:"none",color:TXT}}/>
          {search&&<button onClick={()=>setSearch("")} style={{background:"none",border:"none",padding:"0 13px",color:TXTS,cursor:"pointer",fontSize:17}}>✕</button>}
        </div>
      </div>
      <div style={{overflowX:"auto",padding:"6px 14px",display:"flex",gap:7,scrollbarWidth:"none"}}>
        {cats.map(c=>(
          <button key={c.id} onClick={()=>setCat(c.id)}
            style={{background:cat===c.id?G:W,color:cat===c.id?W:TXT,border:"none",borderRadius:20,padding:"7px 13px",fontWeight:600,cursor:"pointer",whiteSpace:"nowrap",fontSize:12,boxShadow:"0 2px 6px rgba(0,0,0,0.08)",flexShrink:0}}>
            {c.icon} {c.label}
          </button>
        ))}
      </div>
      <div style={{padding:"6px 14px 80px"}}>
        {items.length===0?(
          <div style={{textAlign:"center",padding:"60px 0",color:TXTS}}><div style={{fontSize:48}}>🔍</div><p style={{fontWeight:600,marginTop:12}}>Aucun produit trouvé</p></div>
        ):items.map(p=>(
          <div key={p.id} onClick={()=>onSelect(p)}
            style={{background:W,borderRadius:13,padding:13,marginBottom:9,display:"flex",alignItems:"center",gap:11,boxShadow:"0 2px 8px rgba(0,0,0,0.06)",cursor:"pointer"}}>
            <div style={{width:50,height:50,borderRadius:11,background:GBG,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,flexShrink:0}}>{p.emoji}</div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{display:"flex",alignItems:"center",gap:5,marginBottom:2}}>
                <p style={{color:TXT,fontWeight:700,fontSize:13,margin:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{p.name}</p>
                {p.rx&&<span style={{background:"#FFF3CD",color:"#7A5A00",fontSize:9,fontWeight:700,padding:"2px 5px",borderRadius:4,flexShrink:0}}>ORDO</span>}
              </div>
              <p style={{color:TXTS,fontSize:11,margin:"0 0 5px"}}>{p.unit}</p>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <p style={{color:GD,fontWeight:800,fontSize:13,margin:0}}>{fmt(p.price)}</p>
                <button onClick={e=>{e.stopPropagation();if(p.stock)onAdd(p);}} disabled={!p.stock}
                  style={{background:p.stock?G:"#DDD",color:W,border:"none",borderRadius:8,padding:"5px 12px",fontWeight:700,cursor:p.stock?"pointer":"not-allowed",fontSize:12}}>
                  {p.stock?"+ Ajouter":"Rupture"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══ PRODUIT ══════════════════════════════ */
function Product({product,onAdd,inCart}){
  return(
    <div style={{paddingBottom:90}}>
      <div style={{background:GBG,padding:"40px 18px",textAlign:"center"}}>
        <div style={{fontSize:76}}>{product.emoji}</div>
        {product.rx&&<div style={{display:"inline-flex",alignItems:"center",gap:6,background:AMBER,color:W,borderRadius:20,padding:"6px 15px",marginTop:12,fontWeight:700,fontSize:12}}>⚠️ Ordonnance requise</div>}
      </div>
      <div style={{padding:"18px 18px 0"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:4}}>
          <h2 style={{color:TXT,fontWeight:900,fontSize:20,margin:0,flex:1,lineHeight:1.3}}>{product.name}</h2>
          <span style={{color:product.stock?G:RED,fontWeight:700,fontSize:12,marginLeft:8,flexShrink:0}}>{product.stock?"✓ En stock":"✗ Rupture"}</span>
        </div>
        <p style={{color:TXTS,fontSize:13,marginBottom:14}}>{product.unit}</p>
        <div style={{background:GBG,borderRadius:11,padding:14,marginBottom:16}}>
          <p style={{color:TXTS,fontSize:10,fontWeight:700,margin:"0 0 3px",letterSpacing:1}}>PRIX</p>
          <p style={{color:GD,fontWeight:900,fontSize:28,margin:0}}>{fmt(product.price)}</p>
          <p style={{color:TXTS,fontSize:11,margin:"3px 0 0"}}>+ Livraison à partir de {fmt(DELIV_STD)}</p>
        </div>
        <h3 style={{color:TXT,fontWeight:700,fontSize:14,marginBottom:7}}>Description</h3>
        <p style={{color:TXTS,lineHeight:1.75,fontSize:13,marginBottom:14}}>{product.desc}</p>
        <div style={{background:"#EEF4FF",border:"1px solid #C5D8FF",borderRadius:10,padding:12,marginBottom:12}}>
          <p style={{color:WAVE_C,fontSize:12,margin:0,fontWeight:600}}>🛡️ Prise en charge possible par CNAM, MUGEF-CI, AMU selon votre couverture.</p>
        </div>
        <div style={{background:"#FFF9E6",border:`1px solid ${AMBER}`,borderRadius:10,padding:12}}>
          <p style={{color:"#7A5A00",fontSize:12,margin:0,lineHeight:1.5}}>⚠️ Consultez votre pharmacien avant toute prise. Tenir hors de portée des enfants.</p>
        </div>
      </div>
      <div style={{position:"fixed",bottom:64,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:480,padding:"13px 18px",background:W,borderTop:"1px solid #E8EDE9"}}>
        <button onClick={()=>{if(product.stock&&!inCart)onAdd(product);}} disabled={!product.stock||inCart}
          style={{width:"100%",background:inCart?"#4CAF50":(product.stock?G:"#CCC"),color:W,border:"none",borderRadius:13,padding:14,fontWeight:800,cursor:(product.stock&&!inCart)?"pointer":"default",fontSize:15}}>
          {inCart?"✓ Ajouté au panier":(product.stock?"🛒 Ajouter au panier":"Rupture de stock")}
        </button>
      </div>
    </div>
  );
}

/* ══ PANIER ══════════════════════════════ */
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
        {/* Avertissement ORDO */}
        {hasOrdo&&(
          <div style={{background:"#FFF9E6",border:`2px solid ${AMBER}`,borderRadius:12,padding:13,marginBottom:10,display:"flex",gap:10,alignItems:"flex-start"}}>
            <span style={{fontSize:22,flexShrink:0}}>📋</span>
            <div>
              <p style={{color:"#7A5A00",fontWeight:700,fontSize:13,margin:"0 0 3px"}}>Ordonnance requise</p>
              <p style={{color:"#7A5A00",fontSize:12,margin:0,lineHeight:1.5}}>
                {cart.filter(i=>i.rx||i.necessite_ordonnance).map(i=>i.name||i.nom).join(", ")} nécessite une ordonnance médicale. Préparez-la — vous l'uploaderez à l'étape suivante.
              </p>
            </div>
          </div>
        )}
        {cart.map(item=>(
          <div key={item.id} style={{background:W,borderRadius:13,padding:13,marginBottom:9,display:"flex",gap:11,boxShadow:"0 2px 8px rgba(0,0,0,0.06)"}}>
            <div style={{width:46,height:46,borderRadius:10,background:GBG,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>{item.emoji}</div>
            <div style={{flex:1}}>
              <p style={{color:TXT,fontWeight:700,fontSize:13,margin:"0 0 2px"}}>{item.name}</p>
              <p style={{color:GD,fontWeight:800,fontSize:13,margin:"0 0 9px"}}>{fmt(item.price)}</p>
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

/* ══ CHECKOUT ═════════════════════════════ */
function Checkout({cart,subtotal,delivFee,form,setForm,onConfirm}){
  const set=(k,v)=>setForm(p=>({...p,[k]:v}));
  const insurer=ASSURANCES.find(a=>a.id===form.insurer);
  const insAmt=form.payment==="assurance"&&insurer?Math.round(subtotal*insurer.cover/100):0;
  const toPay=subtotal+delivFee-insAmt;
  const hasOrdo=cart.some(i=>i.rx||i.necessite_ordonnance);
  const ordoItems=cart.filter(i=>i.rx||i.necessite_ordonnance).map(i=>i.name||i.nom);
  const valid=form.name.trim()&&form.phone.trim().length>=8&&form.address.trim()&&
    (form.payment!=="assurance"||(form.insurer&&form.insurerCard.trim().length>4))&&
    (!hasOrdo||form.ordonnance); // ← ordonnance obligatoire si ORDO dans panier

  const PMODES=[
    {id:"wave",    lb:"Wave CI",            logo:<LogoWave/>,       desc:"Paiement mobile instantané"},
    {id:"orange",  lb:"Orange Money",       logo:<LogoOrange/>,     desc:"Avec votre numéro Orange CI"},
    {id:"cinetpay",lb:"CinetPay / Carte",   logo:<LogoCinetPay/>,   desc:"Visa, Mastercard, Maestro"},
    {id:"cash",    lb:"Cash à la livraison",logo:<LogoCash/>,       desc:"Payer directement le livreur"},
    {id:"assurance",lb:"Assurance maladie", logo:<LogoInsurance/>,  desc:"CNAM, MUGEF-CI, AMU, Sanlam..."},
  ];

  return(
    <div style={{padding:"14px 14px 200px"}}>

      {/* Mode de livraison */}
      <h3 style={{color:TXT,fontWeight:800,fontSize:14,marginBottom:11}}>Mode de livraison</h3>
      <div style={{display:"flex",gap:10,marginBottom:20}}>
        {[
          {id:"std",  icon:<span style={{fontSize:26}}>🛵</span>,       lb:"SantéExpress", fee:DELIV_STD,  sub:"30–45 min"},
          {id:"yango",icon:<LogoYango/>,                                 lb:"Yango Delivery",   fee:DELIV_YANGO,sub:"45–60 min"},
        ].map(({id,icon,lb,fee,sub})=>(
          <button key={id} onClick={()=>set("delivMode",id)}
            style={{flex:1,background:W,border:`2px solid ${form.delivMode===id?G:"#E0E8E3"}`,borderRadius:13,padding:"13px 8px",textAlign:"center",cursor:"pointer",boxShadow:"0 2px 8px rgba(0,0,0,0.06)"}}>
            <div style={{marginBottom:6}}>{icon}</div>
            <p style={{color:TXT,fontWeight:700,fontSize:12,margin:"0 0 2px"}}>{lb}</p>
            <p style={{color:G,fontWeight:800,fontSize:12,margin:"0 0 2px"}}>{fmt(fee)}</p>
            <p style={{color:TXTS,fontSize:10,margin:0}}>{sub}</p>
          </button>
        ))}
      </div>

      {/* Mode de paiement */}
      <h3 style={{color:TXT,fontWeight:800,fontSize:14,marginBottom:11}}>Mode de paiement</h3>
      <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:18}}>
        {PMODES.map(({id,lb,logo,desc})=>(
          <button key={id} onClick={()=>set("payment",id)}
            style={{background:W,border:`2px solid ${form.payment===id?G:"#E8EDE9"}`,borderRadius:13,padding:"11px 13px",display:"flex",alignItems:"center",gap:12,cursor:"pointer",textAlign:"left"}}>
            <div style={{flexShrink:0}}>{logo}</div>
            <div style={{flex:1}}>
              <p style={{color:TXT,fontWeight:700,fontSize:13,margin:"0 0 2px"}}>{lb}</p>
              <p style={{color:TXTS,fontSize:11,margin:0}}>{desc}</p>
            </div>
            <div style={{width:20,height:20,borderRadius:"50%",border:`2px solid ${form.payment===id?G:"#DDD"}`,background:form.payment===id?G:"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
              {form.payment===id&&<div style={{width:8,height:8,background:W,borderRadius:"50%"}}/>}
            </div>
          </button>
        ))}
      </div>

      {/* Détails assurance */}
      {form.payment==="assurance"&&(
        <div style={{background:"#F0EEFF",border:"1px solid #C5BAF5",borderRadius:13,padding:15,marginBottom:18}}>
          <p style={{color:PURPLE,fontWeight:700,fontSize:13,marginBottom:11}}>🛡️ Sélectionnez votre assurance</p>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:13}}>
            {ASSURANCES.map(a=>(
              <button key={a.id} onClick={()=>set("insurer",a.id)}
                style={{background:form.insurer===a.id?a.clr:W,color:form.insurer===a.id?W:TXT,border:`2px solid ${form.insurer===a.id?a.clr:"#E8EDE9"}`,borderRadius:10,padding:"10px 7px",cursor:"pointer",fontWeight:700,fontSize:12,textAlign:"center"}}>
                <p style={{margin:"0 0 2px"}}>{a.name}</p>
                <p style={{margin:0,fontSize:10,fontWeight:400,opacity:0.85}}>{a.cover}% couvert</p>
              </button>
            ))}
          </div>
          <label style={{color:TXTS,fontSize:12,fontWeight:600,marginBottom:5,display:"block"}}>N° immatriculation / carte assurance</label>
          <input value={form.insurerCard} onChange={e=>set("insurerCard",e.target.value)} placeholder="Ex: CNAM-CI-XXXXXXXX"
            style={{width:"100%",border:`2px solid ${form.insurerCard?"#9B8FE0":"#C5BAF5"}`,borderRadius:9,padding:"11px 12px",fontSize:14,outline:"none",color:TXT,background:W,boxSizing:"border-box"}}/>
          {insurer&&insAmt>0&&(
            <div style={{marginTop:11,background:W,borderRadius:9,padding:11}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                <span style={{color:TXTS,fontSize:12}}>Médicaments</span><span style={{color:TXT,fontWeight:600,fontSize:12}}>{fmt(subtotal)}</span>
              </div>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                <span style={{color:G,fontSize:12}}>Pris en charge ({insurer.cover}%)</span><span style={{color:G,fontWeight:700,fontSize:12}}>−{fmt(insAmt)}</span>
              </div>
              <div style={{display:"flex",justifyContent:"space-between",paddingTop:8,borderTop:"1px solid #EEE"}}>
                <span style={{color:TXT,fontWeight:700,fontSize:13}}>Votre ticket modérateur</span>
                <span style={{color:RED,fontWeight:800,fontSize:14}}>{fmt(subtotal-insAmt)}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── Section Ordonnance ── */}
      {hasOrdo&&(
        <div style={{background:"#FFF9E6",border:`2px solid ${form.ordonnance?"#00A859":AMBER}`,borderRadius:13,padding:15,marginBottom:18,transition:"border 0.3s"}}>
          <div style={{display:"flex",alignItems:"center",gap:9,marginBottom:10}}>
            <span style={{fontSize:22}}>📋</span>
            <div>
              <p style={{color:TXT,fontWeight:700,fontSize:13,margin:"0 0 2px"}}>Ordonnance médicale requise</p>
              <p style={{color:TXTS,fontSize:11,margin:0}}>{ordoItems.join(", ")}</p>
            </div>
          </div>

          {!form.ordonnance?(
            /* Bouton upload visible */
            <div>
              <p style={{color:"#7A5A00",fontSize:12,lineHeight:1.6,marginBottom:12}}>
                Prenez en photo votre ordonnance avec votre téléphone ou importez une image.
              </p>
              <div style={{display:"flex",gap:10}}>
                {/* Bouton Appareil photo */}
                <label style={{flex:1,cursor:"pointer"}}>
                  <input type="file" accept="image/*" capture="environment" style={{position:"absolute",opacity:0,width:1,height:1,overflow:"hidden"}}
                    onChange={e=>{
                      const file=e.target.files[0];
                      if(file){
                        const reader=new FileReader();
                        reader.onload=ev=>setForm(p=>({...p,ordonnance:{name:file.name,size:Math.round(file.size/1024),preview:ev.target.result}}));
                        reader.readAsDataURL(file);
                      }
                    }}/>
                  <div style={{background:AMBER,borderRadius:11,padding:"14px 10px",textAlign:"center",color:W,fontWeight:700,fontSize:13}}>
                    <div style={{fontSize:26,marginBottom:4}}>📷</div>
                    Appareil photo
                  </div>
                </label>
                {/* Bouton Galerie */}
                <label style={{flex:1,cursor:"pointer"}}>
                  <input type="file" accept="image/*,application/pdf" style={{position:"absolute",opacity:0,width:1,height:1,overflow:"hidden"}}
                    onChange={e=>{
                      const file=e.target.files[0];
                      if(file){
                        const reader=new FileReader();
                        reader.onload=ev=>setForm(p=>({...p,ordonnance:{name:file.name,size:Math.round(file.size/1024),preview:ev.target.result}}));
                        reader.readAsDataURL(file);
                      }
                    }}/>
                  <div style={{background:W,border:`2px solid ${AMBER}`,borderRadius:11,padding:"14px 10px",textAlign:"center",color:"#7A5A00",fontWeight:700,fontSize:13}}>
                    <div style={{fontSize:26,marginBottom:4}}>🖼️</div>
                    Ma galerie
                  </div>
                </label>
              </div>
              {/* Bouton simulation pour tester dans l'aperçu */}
              <button onClick={()=>setForm(p=>({...p,ordonnance:{name:"ordonnance_demo.jpg",size:124,preview:null}}))}
                style={{width:"100%",marginTop:10,background:"none",border:`1px dashed ${AMBER}`,borderRadius:9,padding:"9px",color:"#7A5A00",fontSize:12,fontWeight:600,cursor:"pointer"}}>
                ✏️ Simuler un upload (démo)
              </button>
            </div>
          ):(
            /* Preview ordonnance uploadée */
            <div style={{background:GBG,borderRadius:10,padding:12}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <div style={{display:"flex",alignItems:"center",gap:9}}>
                  <div style={{width:42,height:42,borderRadius:8,background:G,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>📄</div>
                  <div>
                    <p style={{color:TXT,fontWeight:700,fontSize:12,margin:"0 0 2px"}}>{form.ordonnance.name}</p>
                    <p style={{color:G,fontSize:11,fontWeight:600,margin:0}}>✅ Ordonnance uploadée · {form.ordonnance.size} Ko</p>
                  </div>
                </div>
                <button onClick={()=>setForm(p=>({...p,ordonnance:null}))} style={{background:"none",border:"none",color:RED,cursor:"pointer",fontSize:18,padding:4}}>✕</button>
              </div>
              {form.ordonnance.preview&&form.ordonnance.preview.startsWith("data:image")&&(
                <img src={form.ordonnance.preview} alt="Ordonnance" style={{width:"100%",borderRadius:8,marginTop:10,maxHeight:140,objectFit:"cover"}}/>
              )}
              <p style={{color:TXTS,fontSize:10,marginTop:8,textAlign:"center"}}>
                🛵 Le livreur récupérera l'original à la livraison
              </p>
            </div>
          )}
        </div>
      )}

      {/* Infos livraison */}
      <h3 style={{color:TXT,fontWeight:800,fontSize:14,marginBottom:11}}>Informations de livraison</h3>
      <div style={{display:"flex",flexDirection:"column",gap:12}}>
        {[
          {k:"name",   lb:"👤 Nom complet",           ph:"Koné Amadou",             t:"text"},
          {k:"phone",  lb:"📱 Téléphone",             ph:"+225 07 XX XX XX XX",     t:"tel" },
          {k:"address",lb:"📍 Adresse de livraison",  ph:"Quartier, rue, repère...",t:"text"},
        ].map(({k,lb,ph,t})=>(
          <div key={k}>
            <label style={{color:TXTS,fontSize:12,fontWeight:600,marginBottom:5,display:"block"}}>{lb}</label>
            <input type={t} value={form[k]} onChange={e=>set(k,e.target.value)} placeholder={ph}
              style={{width:"100%",border:`2px solid ${form[k]?G:"#E0E8E3"}`,borderRadius:10,padding:"11px 13px",fontSize:14,outline:"none",color:TXT,background:W,boxSizing:"border-box"}}/>
          </div>
        ))}
        <div>
          <label style={{color:TXTS,fontSize:12,fontWeight:600,marginBottom:5,display:"block"}}>📝 Note au pharmacien <span style={{fontWeight:400}}>(optionnel)</span></label>
          <textarea value={form.note} onChange={e=>set("note",e.target.value)} placeholder="Allergies, grossesse, difficultés de déglutition..." rows={2}
            style={{width:"100%",border:"2px solid #E0E8E3",borderRadius:10,padding:"11px 13px",fontSize:13,outline:"none",color:TXT,background:W,boxSizing:"border-box",resize:"none"}}/>
        </div>
        <div>
          <label style={{color:TXTS,fontSize:12,fontWeight:600,marginBottom:5,display:"block"}}>🎟️ Code promo <span style={{fontWeight:400}}>(optionnel)</span></label>
          <div style={{display:"flex",gap:8}}>
            <input value={form.promo} onChange={e=>set("promo",e.target.value.toUpperCase())} placeholder="PHARMA2024"
              style={{flex:1,border:"2px solid #E0E8E3",borderRadius:10,padding:"11px 13px",fontSize:14,outline:"none",color:TXT,background:W}}/>
            <button style={{background:GBG,border:"none",borderRadius:10,padding:"0 15px",color:GD,fontWeight:700,cursor:"pointer",fontSize:13,whiteSpace:"nowrap"}}>Appliquer</button>
          </div>
        </div>
      </div>

      {/* Récapitulatif */}
      <div style={{background:W,borderRadius:13,padding:13,marginTop:16,boxShadow:"0 2px 8px rgba(0,0,0,0.06)"}}>
        {cart.map(i=>(
          <div key={i.id} style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
            <span style={{color:TXTS,fontSize:12}}>{i.name} ×{i.qty}</span>
            <span style={{color:TXT,fontWeight:600,fontSize:12}}>{fmt(i.price*i.qty)}</span>
          </div>
        ))}
        {insAmt>0&&<div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}><span style={{color:G,fontSize:12}}>Assurance</span><span style={{color:G,fontWeight:700,fontSize:12}}>−{fmt(insAmt)}</span></div>}
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}><span style={{color:TXTS,fontSize:12}}>Livraison</span><span style={{color:TXT,fontWeight:600,fontSize:12}}>{fmt(delivFee)}</span></div>
        <div style={{borderTop:"1px solid #E8EDE9",paddingTop:8,marginTop:6,display:"flex",justifyContent:"space-between"}}>
          <span style={{color:TXT,fontWeight:800,fontSize:14}}>Total à payer</span>
          <span style={{color:GD,fontWeight:900,fontSize:16}}>{fmt(toPay)}</span>
        </div>
      </div>

      {/* CTA fixe */}
      <div style={{position:"fixed",bottom:64,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:480,padding:"13px 18px",background:W,borderTop:"1px solid #E8EDE9",boxShadow:"0 -4px 20px rgba(0,0,0,0.08)"}}>
        <button onClick={onConfirm} disabled={!valid}
          style={{width:"100%",background:valid?G:"#C5D9CC",color:W,border:"none",borderRadius:13,padding:14,fontWeight:800,cursor:valid?"pointer":"not-allowed",fontSize:15}}>
          {valid?`✓ Commander · ${fmt(toPay)}`:(hasOrdo&&!form.ordonnance?"📋 Uploadez votre ordonnance":"Remplissez les champs requis")}
        </button>
      </div>
    </div>
  );
}

/* ══ SUIVI COMMANDE ══════════════════════ */
function Tracking({order,onRate}){
  const isDelivered=order.status==="delivered";
  const [step,setStep]=useState(isDelivered?4:1);

  useEffect(()=>{
    if(step<4){const t=setTimeout(()=>setStep(s=>s+1),3500);return()=>clearTimeout(t);}
  },[step]);

  const STEPS=[
    {ic:"✅",lb:"Commande confirmée",  sub:"Reçue par la pharmacie"},
    {ic:"💊",lb:"Préparation en cours",sub:"Le pharmacien prépare votre sac"},
    {ic:"🛵",lb:"Livreur en route",    sub:"Votre commande est en chemin"},
    {ic:"🏠",lb:"Livraison effectuée", sub:"Votre commande est arrivée !"},
  ];
  const PAY_LBL={wave:"Wave CI",orange:"Orange Money",cinetpay:"CinetPay",cash:"Cash",assurance:"Assurance"};

  return(
    <div style={{padding:"16px 16px",paddingBottom:80}}>
      {/* ID + total */}
      <div style={{background:W,borderRadius:13,padding:13,marginBottom:14,display:"flex",justifyContent:"space-between",alignItems:"center",boxShadow:"0 2px 8px rgba(0,0,0,0.06)"}}>
        <div><p style={{color:TXTS,fontSize:10,fontWeight:700,margin:"0 0 3px",letterSpacing:1}}>COMMANDE</p><p style={{color:TXT,fontWeight:800,fontSize:16,margin:0}}>#{order.id}</p></div>
        <div style={{textAlign:"right"}}><p style={{color:TXTS,fontSize:11,margin:"0 0 3px"}}>{order.date}</p><p style={{color:GD,fontWeight:800,fontSize:14,margin:0}}>{fmt(order.total)}</p></div>
      </div>

      {/* Stepper */}
      <div style={{background:W,borderRadius:13,padding:"16px 16px",marginBottom:14,boxShadow:"0 2px 8px rgba(0,0,0,0.06)"}}>
        {STEPS.map((s,i)=>{
          const done=step>i;
          const active=step===i+1;
          return(
            <div key={i} style={{display:"flex",gap:14,marginBottom:i<3?18:0}}>
              <div style={{display:"flex",flexDirection:"column",alignItems:"center",flexShrink:0}}>
                <div style={{width:38,height:38,borderRadius:"50%",background:done?G:(active?"#FFF9E6":BG),border:active?`2px solid ${AMBER}`:done?`2px solid ${G}`:"2px solid #E0E8E3",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,transition:"all 0.4s"}}>
                  <span style={{opacity:done||active?1:0.35}}>{s.ic}</span>
                </div>
                {i<3&&<div style={{width:2,height:24,background:done?G:"#E0E8E3",marginTop:3,transition:"background 0.4s"}}/>}
              </div>
              <div style={{paddingTop:7}}>
                <p style={{color:done?TXT:(active?AMBER:TXTS),fontWeight:done||active?700:400,fontSize:13,margin:"0 0 2px",transition:"color 0.4s"}}>{s.lb}</p>
                <p style={{color:done?G:(active?AMBER:TXTS),fontSize:11,margin:0}}>{s.sub}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Infos */}
      <div style={{background:W,borderRadius:13,padding:13,marginBottom:12,boxShadow:"0 2px 8px rgba(0,0,0,0.06)"}}>
        {[["📍",order.address||"Adresse de livraison"],["🏪",order.pharmacy||"Pharmacie partenaire"],["💳",PAY_LBL[order.payment]||"Cash"]].map(([ic,v])=>(
          <div key={v} style={{display:"flex",gap:9,marginBottom:7}}><span style={{fontSize:14}}>{ic}</span><span style={{color:TXT,fontSize:13,fontWeight:600}}>{v}</span></div>
        ))}
      </div>

      {/* Avis */}
      {(step===4||isDelivered)&&!order.rating&&(
        <div style={{background:`linear-gradient(135deg,${G},${GD})`,borderRadius:13,padding:16,textAlign:"center"}}>
          <p style={{color:W,fontWeight:700,fontSize:14,marginBottom:8}}>🌟 Commande livrée ! Merci</p>
          <p style={{color:GL,fontSize:12,marginBottom:14}}>Notez votre pharmacien et votre livreur</p>
          <button onClick={onRate} style={{background:W,color:G,border:"none",borderRadius:10,padding:"10px 24px",fontWeight:800,cursor:"pointer",fontSize:14}}>Laisser un avis ⭐</button>
        </div>
      )}
      {order.rating&&(
        <div style={{background:GBG,borderRadius:13,padding:13,textAlign:"center"}}>
          <p style={{color:GD,fontWeight:700,fontSize:13}}>Merci pour votre avis · {"⭐".repeat(order.rating)}</p>
        </div>
      )}
    </div>
  );
}

/* ══ HISTORIQUE ══════════════════════════ */
function History({orders,onOpen,onRate}){
  const STA={confirmed:"En cours 🔄",delivering:"En livraison 🛵",delivered:"Livré ✅",cancelled:"Annulé ❌"};
  const STAC={confirmed:AMBER,delivering:WAVE_C,delivered:G,cancelled:RED};
  if(!orders.length) return(
    <div style={{textAlign:"center",padding:"70px 22px"}}>
      <div style={{fontSize:68}}>📋</div>
      <h3 style={{color:TXT,fontWeight:800,marginTop:14,marginBottom:8}}>Aucune commande</h3>
      <p style={{color:TXTS,fontSize:13}}>Vos commandes passées apparaîtront ici</p>
    </div>
  );
  return(
    <div style={{padding:"13px 14px 80px"}}>
      {orders.map(o=>(
        <div key={o.id} style={{background:W,borderRadius:13,padding:13,marginBottom:10,boxShadow:"0 2px 8px rgba(0,0,0,0.06)"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:7}}>
            <div><p style={{color:TXT,fontWeight:800,fontSize:14,margin:"0 0 2px"}}>#{o.id}</p><p style={{color:TXTS,fontSize:11,margin:0}}>{o.date} · {o.pharmacy}</p></div>
            <span style={{background:(STAC[o.status]||TXTS)+"22",color:STAC[o.status]||TXTS,fontSize:11,fontWeight:700,padding:"4px 8px",borderRadius:20}}>{STA[o.status]||o.status}</span>
          </div>
          <p style={{color:TXTS,fontSize:12,margin:"0 0 8px"}}>{o.items.map(i=>`${i.name} ×${i.qty}`).join(", ")}</p>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <span style={{color:GD,fontWeight:800,fontSize:14}}>{fmt(o.total)}</span>
            <div style={{display:"flex",gap:7}}>
              {o.status==="delivered"&&!o.rating&&<button onClick={()=>onRate(o)} style={{background:GBG,border:"none",borderRadius:8,padding:"6px 11px",color:GD,fontWeight:700,cursor:"pointer",fontSize:12}}>⭐ Noter</button>}
              <button onClick={()=>onOpen(o)} style={{background:G,border:"none",borderRadius:8,padding:"6px 11px",color:W,fontWeight:700,cursor:"pointer",fontSize:12}}>Voir →</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ══ NOTES / AVIS ════════════════════════ */
function Rating({order,onDone}){
  const [pr,setPr]=useState(0);
  const [dr,setDr]=useState(0);
  const [cm,setCm]=useState("");
  const LABELS=["","Mauvais 😞","Passable 😐","Bien 🙂","Très bien 😊","Excellent ! 🌟"];
  return(
    <div style={{padding:"20px 16px 110px"}}>
      <div style={{textAlign:"center",marginBottom:22}}>
        <div style={{fontSize:52,marginBottom:8}}>⭐</div>
        <h3 style={{color:TXT,fontWeight:900,fontSize:19,marginBottom:5}}>Votre avis compte !</h3>
        <p style={{color:TXTS,fontSize:12}}>Commande #{order.id}</p>
      </div>
      {[
        {icon:"🏪",title:order.pharmacy||"Pharmacie partenaire",sub:"Préparation, rapidité, service",val:pr,set:setPr},
        {icon:"🛵",title:"Livreur SantéExpress",                   sub:"Ponctualité, amabilité",       val:dr,set:setDr},
      ].map(({icon,title,sub,val,set})=>(
        <div key={title} style={{background:W,borderRadius:13,padding:15,marginBottom:11,boxShadow:"0 2px 8px rgba(0,0,0,0.06)"}}>
          <p style={{color:TXT,fontWeight:700,fontSize:14,marginBottom:3}}>{icon} {title}</p>
          <p style={{color:TXTS,fontSize:11,marginBottom:11}}>{sub}</p>
          <div style={{display:"flex",gap:7,justifyContent:"center"}}>
            {[1,2,3,4,5].map(n=>(
              <button key={n} onClick={()=>set(n)} style={{background:"none",border:"none",fontSize:30,cursor:"pointer",opacity:n<=val?1:0.3,transition:"opacity 0.15s"}}>⭐</button>
            ))}
          </div>
          {val>0&&<p style={{textAlign:"center",color:G,fontWeight:700,fontSize:12,marginTop:7}}>{LABELS[val]}</p>}
        </div>
      ))}
      <div style={{marginBottom:16}}>
        <label style={{color:TXTS,fontSize:12,fontWeight:600,marginBottom:5,display:"block"}}>💬 Commentaire (optionnel)</label>
        <textarea value={cm} onChange={e=>setCm(e.target.value)} rows={3} placeholder="Partagez votre expérience..."
          style={{width:"100%",border:"2px solid #E0E8E3",borderRadius:10,padding:"11px 12px",fontSize:13,outline:"none",color:TXT,background:W,boxSizing:"border-box",resize:"none"}}/>
      </div>
      <div style={{position:"fixed",bottom:64,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:480,padding:"13px 18px",background:W,borderTop:"1px solid #E8EDE9",boxShadow:"0 -4px 20px rgba(0,0,0,0.08)"}}>
        <button onClick={()=>onDone(Math.round((pr+dr)/2))} disabled={!pr||!dr}
          style={{width:"100%",background:pr&&dr?G:"#C5D9CC",color:W,border:"none",borderRadius:13,padding:14,fontWeight:800,cursor:pr&&dr?"pointer":"not-allowed",fontSize:15}}>
          {pr&&dr?"Envoyer mon avis ✓":"Notez la pharmacie et le livreur"}
        </button>
      </div>
    </div>
  );
}

/* ══ ESPACE LIVREUR ══════════════════════ */
function Livreur({orders}){
  const [tab,setTab]=useState("active");
  const active=orders.filter(o=>o.status!=="delivered").slice(0,2).map(o=>({...o,status:"delivering"}));
  const done=orders.filter(o=>o.status==="delivered");
  const gains=done.slice(0,5).reduce((s,o)=>s+(o.delivFee||DELIV_STD),0);

  return(
    <div style={{paddingBottom:24}}>
      {/* Profil livreur */}
      <div style={{background:`linear-gradient(135deg,${G},${GD})`,padding:"24px 18px 20px"}}>
        <div style={{display:"flex",alignItems:"center",gap:14}}>
          <div style={{width:54,height:54,borderRadius:"50%",background:"rgba(255,255,255,0.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24}}>🛵</div>
          <div style={{flex:1}}>
            <p style={{color:GL,fontSize:10,fontWeight:700,margin:"0 0 3px",letterSpacing:1}}>LIVREUR ACTIF</p>
            <p style={{color:W,fontSize:17,fontWeight:800,margin:"0 0 2px"}}>Kouamé Didier</p>
            <p style={{color:"rgba(255,255,255,0.72)",fontSize:12,margin:0}}>⭐ 4.9 · 312 livraisons</p>
          </div>
          <div style={{textAlign:"right"}}>
            <p style={{color:GL,fontSize:10,margin:"0 0 2px"}}>Gains du jour</p>
            <p style={{color:W,fontSize:18,fontWeight:900,margin:0}}>{fmt(gains)}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{display:"flex",background:W,borderBottom:"2px solid #E8EDE9"}}>
        {[["active","🚴 Actives"],["done","✅ Effectuées"]].map(([t,l])=>(
          <button key={t} onClick={()=>setTab(t)} style={{flex:1,background:"none",border:"none",padding:"13px",fontWeight:700,fontSize:13,color:tab===t?G:TXTS,cursor:"pointer",borderBottom:tab===t?`2.5px solid ${G}`:"2.5px solid transparent"}}>
            {l}
          </button>
        ))}
      </div>

      <div style={{padding:"13px 14px"}}>
        {tab==="active"&&(
          active.length===0
            ?<div style={{textAlign:"center",padding:"50px 0",color:TXTS}}><div style={{fontSize:48}}>🎉</div><p style={{fontWeight:600,marginTop:12}}>Aucune livraison en cours</p></div>
            :active.map(o=>(
              <div key={o.id} style={{background:W,borderRadius:13,padding:14,marginBottom:11,boxShadow:"0 2px 8px rgba(0,0,0,0.06)",border:`1px solid ${GBG}`}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:9}}>
                  <p style={{color:TXT,fontWeight:800,fontSize:14,margin:0}}>#{o.id}</p>
                  <span style={{background:AMBER+"22",color:AMBER,fontSize:11,fontWeight:700,padding:"3px 8px",borderRadius:20}}>En route 🛵</span>
                </div>
                {[["📍",o.address||"Cocody, Abidjan"],["📱",o.phone||"+225 07 XX XX XX XX"],["💰",fmt(o.delivFee||DELIV_STD)+" (votre part)"]].map(([ic,v])=>(
                  <div key={v} style={{display:"flex",gap:8,marginBottom:6}}><span style={{fontSize:13}}>{ic}</span><span style={{color:TXT,fontSize:12,fontWeight:600}}>{v}</span></div>
                ))}
                <div style={{display:"flex",gap:8,marginTop:11}}>
                  <button style={{flex:1,background:GBG,border:"none",borderRadius:10,padding:10,color:GD,fontWeight:700,cursor:"pointer",fontSize:13}}>📞 Appeler client</button>
                  <button style={{flex:1,background:G,border:"none",borderRadius:10,padding:10,color:W,fontWeight:700,cursor:"pointer",fontSize:13}}>✅ Marquer livré</button>
                </div>
              </div>
            ))
        )}
        {tab==="done"&&done.slice(0,8).map(o=>(
          <div key={o.id} style={{background:W,borderRadius:13,padding:13,marginBottom:9,display:"flex",justifyContent:"space-between",alignItems:"center",boxShadow:"0 2px 8px rgba(0,0,0,0.06)"}}>
            <div><p style={{color:TXT,fontWeight:700,fontSize:13,margin:"0 0 2px"}}>#{o.id}</p><p style={{color:TXTS,fontSize:11,margin:0}}>{o.date}</p></div>
            <div style={{textAlign:"right"}}><p style={{color:G,fontWeight:800,fontSize:14,margin:"0 0 2px"}}>{fmt(o.delivFee||DELIV_STD)}</p><p style={{color:TXTS,fontSize:10}}>✅ Livré</p></div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══ ADMIN DASHBOARD ══════════════════════ */
function Admin({orders,pharmacies}){
  const [tab,setTab]=useState("orders");
  const totalRev=orders.reduce((s,o)=>s+o.total,0);
  const commission=Math.round(totalRev*COM);
  const versé=totalRev-commission;

  const KPIS=[
    {lb:"Commandes",    v:orders.length,  ic:"📦", cl:WAVE_C},
    {lb:"Revenus total",v:fmt(totalRev),  ic:"💰", cl:G     },
    {lb:"Commission CI",v:fmt(commission),ic:"🏦", cl:AMBER  },
    {lb:"Pharmacies",   v:pharmacies.filter(p=>p.open).length, ic:"🏥", cl:PURPLE},
  ];

  return(
    <div style={{paddingBottom:24}}>
      {/* Header admin */}
      <div style={{background:`linear-gradient(135deg,${GD},#003022)`,padding:"22px 18px"}}>
        <p style={{color:GL,fontSize:10,fontWeight:700,margin:"0 0 3px",letterSpacing:1}}>TABLEAU DE BORD</p>
        <h2 style={{color:W,fontSize:20,fontWeight:900,margin:"0 0 3px"}}>Administration SantéExpress</h2>
        <p style={{color:"rgba(255,255,255,0.55)",fontSize:11,margin:0}}>{new Date().toLocaleDateString("fr-FR","long")}</p>
      </div>

      {/* KPIs */}
      <div style={{padding:"13px 14px 0",display:"grid",gridTemplateColumns:"1fr 1fr",gap:9}}>
        {KPIS.map(({lb,v,ic,cl})=>(
          <div key={lb} style={{background:W,borderRadius:13,padding:13,boxShadow:"0 2px 8px rgba(0,0,0,0.06)"}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:7}}><span style={{fontSize:19}}>{ic}</span><div style={{width:8,height:8,borderRadius:"50%",background:cl}}/></div>
            <p style={{color:TXT,fontWeight:900,fontSize:15,margin:"0 0 2px"}}>{v}</p>
            <p style={{color:TXTS,fontSize:11,fontWeight:600,margin:0}}>{lb}</p>
          </div>
        ))}
      </div>

      {/* Commission card */}
      <div style={{margin:"11px 14px 0",background:`linear-gradient(135deg,${G},${GD})`,borderRadius:13,padding:14}}>
        <p style={{color:GL,fontSize:10,fontWeight:700,margin:"0 0 6px",letterSpacing:1}}>COMMISSION SANTÉEXPRESS (3%)</p>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div><p style={{color:W,fontWeight:900,fontSize:22,margin:0}}>{fmt(commission)}</p><p style={{color:GL,fontSize:11,margin:"3px 0 0"}}>Revenus SantéExpress</p></div>
          <div style={{textAlign:"right"}}><p style={{color:W,fontWeight:800,fontSize:16,margin:0}}>{fmt(versé)}</p><p style={{color:GL,fontSize:11,margin:"3px 0 0"}}>Versé aux pharmacies</p></div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{display:"flex",background:W,borderBottom:"2px solid #E8EDE9",margin:"11px 0 0"}}>
        {[["orders","📦 Commandes"],["pharm","🏥 Pharmacies"],["pending","⏳ En attente"]].map(([t,l])=>(
          <button key={t} onClick={()=>setTab(t)} style={{flex:1,background:"none",border:"none",padding:"11px 4px",fontWeight:700,fontSize:11,color:tab===t?G:TXTS,cursor:"pointer",borderBottom:tab===t?`2.5px solid ${G}`:"2.5px solid transparent"}}>
            {l}
          </button>
        ))}
      </div>

      <div style={{padding:"11px 14px"}}>
        {tab==="orders"&&(
          <>
            <h4 style={{color:TXT,fontWeight:700,fontSize:13,marginBottom:10}}>Commandes récentes</h4>
            {orders.slice(0,8).map(o=>(
              <div key={o.id} style={{background:W,borderRadius:13,padding:12,marginBottom:8,display:"flex",justifyContent:"space-between",alignItems:"center",boxShadow:"0 2px 8px rgba(0,0,0,0.06)"}}>
                <div><p style={{color:TXT,fontWeight:700,fontSize:13,margin:"0 0 2px"}}>#{o.id}</p><p style={{color:TXTS,fontSize:11,margin:0}}>{o.date} · {o.pharmacy||"Pharmacie partenaire"}</p></div>
                <div style={{textAlign:"right"}}>
                  <p style={{color:GD,fontWeight:800,fontSize:13,margin:"0 0 2px"}}>{fmt(o.total)}</p>
                  <p style={{color:G,fontSize:11,fontWeight:600,margin:0}}>{fmt(Math.round(o.total*COM))} comm.</p>
                </div>
              </div>
            ))}
          </>
        )}
        {tab==="pharm"&&(
          <>
            <h4 style={{color:TXT,fontWeight:700,fontSize:13,marginBottom:10}}>Pharmacies partenaires ({pharmacies.filter(p=>p.open).length} actives)</h4>
            {pharmacies.map(ph=>(
              <div key={ph.id} style={{background:W,borderRadius:13,padding:12,marginBottom:8,display:"flex",justifyContent:"space-between",alignItems:"center",boxShadow:"0 2px 8px rgba(0,0,0,0.06)"}}>
                <div>
                  <p style={{color:TXT,fontWeight:700,fontSize:13,margin:"0 0 2px"}}>{ph.name}</p>
                  <p style={{color:TXTS,fontSize:11,margin:"0 0 2px"}}>{ph.district} · ⭐ {ph.rating}</p>
                  <p style={{color:GD,fontSize:11,fontWeight:600,margin:0}}>{ph.orders} cmd · {fmt(Math.round(ph.orders*2200*(1-COM)))} versé</p>
                </div>
                <div style={{display:"flex",flexDirection:"column",gap:5,alignItems:"flex-end"}}>
                  <span style={{background:ph.open?GBG:"#FFE5E5",color:ph.open?GD:RED,fontSize:10,fontWeight:700,padding:"3px 8px",borderRadius:20}}>{ph.open?"Actif":"Inactif"}</span>
                  {ph.garde&&<span style={{background:"#FFF3CD",color:"#7A5A00",fontSize:10,fontWeight:700,padding:"3px 8px",borderRadius:20}}>Garde</span>}
                </div>
              </div>
            ))}
          </>
        )}
        {tab==="pending"&&(
          <>
            <h4 style={{color:TXT,fontWeight:700,fontSize:13,marginBottom:10}}>Nouvelles inscriptions à valider</h4>
            {[
              {name:"Pharmacie Treichville Nord", district:"Treichville",date:"09/06/2026"},
              {name:"Pharmacie Angré 7e Tranche", district:"Cocody",     date:"09/06/2026"},
            ].map((ph,i)=>(
              <div key={i} style={{background:W,borderRadius:13,padding:13,marginBottom:10,boxShadow:"0 2px 8px rgba(0,0,0,0.06)"}}>
                <p style={{color:TXT,fontWeight:700,fontSize:13,margin:"0 0 2px"}}>{ph.name}</p>
                <p style={{color:TXTS,fontSize:11,margin:"0 0 12px"}}>{ph.district} · Demande du {ph.date}</p>
                <div style={{display:"flex",gap:8}}>
                  <button style={{flex:1,background:"#FFE5E5",border:"none",borderRadius:9,padding:"9px",color:RED,fontWeight:700,cursor:"pointer",fontSize:13}}>✕ Refuser</button>
                  <button style={{flex:1,background:GBG,border:"none",borderRadius:9,padding:"9px",color:GD,fontWeight:700,cursor:"pointer",fontSize:13}}>✓ Valider</button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

/* ══ CONFIRMATION ════════════════════════ */
function Confirmed({setMode}){
  return(
    <div style={{fontFamily:"'Segoe UI',sans-serif",background:BG,minHeight:"100vh",maxWidth:480,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"center",padding:22}}>
      <div style={{background:W,borderRadius:20,padding:36,textAlign:"center",maxWidth:380,width:"100%",boxShadow:"0 4px 24px rgba(0,168,89,0.14)"}}>
        <div style={{fontSize:60,marginBottom:13}}>✅</div>
        <h2 style={{color:GD,fontSize:20,fontWeight:900,marginBottom:8}}>Commande confirmée !</h2>
        <p style={{color:TXTS,lineHeight:1.6,marginBottom:22,fontSize:13}}>Votre pharmacien prépare les médicaments. Livraison sous <strong>30–60 minutes</strong>.</p>
        <div style={{background:GBG,borderRadius:11,padding:18,marginBottom:20}}><div style={{fontSize:38}}>🛵</div><p style={{color:GD,fontWeight:700,marginTop:8,fontSize:13}}>Livraison en cours...</p></div>
        <button onClick={()=>setMode("landing")} style={{background:G,color:W,border:"none",borderRadius:11,padding:"13px",fontWeight:700,cursor:"pointer",width:"100%",fontSize:14}}>Retour à l'accueil</button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   ESPACE PHARMACIE — Dashboard complet
══════════════════════════════════════════════════════ */

// Données de démonstration — pharmacie connectée
const PH_INFO={nom:"Pharmacie de la Riviera",district:"Cocody",note:4.9,est_garde:true,telephone:"+225 27 22 43 00 00",adresse:"Riviera 2, Abidjan"};
const PH_STOCK=ITEMS.map(i=>({...i,stock:i.stock!==false}));
const PH_NOUVELLES=[
  {id:"PC-0010",client:"Koné Amadou",   tel:"+225 07 11 22 33",items:[{name:"Paracétamol 500mg",qty:2,price:500},{name:"Vitamine C 1000mg",qty:1,price:1200}],total:2700, adresse:"Cocody Riviera 2",payment:"wave",  time:"2 min", ordo:false},
  {id:"PC-0011",client:"Diallo Fatoumata",tel:"+225 05 44 55 66",items:[{name:"Amoxicilline 500mg",qty:1,price:3500}],                                         total:4000, adresse:"Angré 7e Tranche",payment:"orange",time:"8 min", ordo:true},
];
const PH_EN_COURS=[
  {id:"PC-0008",client:"Traoré Ibrahim", tel:"+225 07 88 99 00",items:[{name:"Doliprane 1000mg",qty:1,price:950},{name:"Magnésium B6",qty:1,price:1800}],       total:3250, adresse:"Cocody Akouédo",  payment:"cash",  time:"15 min"},
];
const PH_TERMINEES=[
  {id:"PC-0005",client:"Séka Marcellin", tel:"+225 01 22 33 44",items:[{name:"Thermomètre digital",qty:1,price:3000}],                                          total:3500, adresse:"Plateau, Abidjan",payment:"wave",  time:"1h",  note:5},
  {id:"PC-0004",client:"Bamba Aïssata",  tel:"+225 05 66 77 88",items:[{name:"Gel hydroalcoolique",qty:2,price:1000},{name:"Masques chirurgicaux",qty:1,price:2000}],total:4500,adresse:"Marcory",     payment:"cinetpay",time:"2h",note:4},
  {id:"PC-0003",client:"Coulibaly Eric", tel:"+225 07 99 00 11",items:[{name:"Zinc + Vitamine D3",qty:1,price:2500},{name:"SRO Sachet",qty:2,price:300}],         total:3800, adresse:"Yopougon-Attié",payment:"orange",time:"3h",  note:5},
];

const PAY_LBL={wave:"Wave CI",orange:"Orange Money",cinetpay:"CinetPay",cash:"Cash",assurance:"Assurance"};
const PAY_CLR={wave:WAVE_C,orange:OM_C,cinetpay:CP_C,cash:"#27AE60",assurance:PURPLE};

function Pharmacie(){
  const [tab,setTab]=useState("dashboard");
  const [cmTab,setCmTab]=useState("nouvelles");
  const [nouvelles,setNouvelles]=useState(PH_NOUVELLES);
  const [enCours,setEnCours]=useState(PH_EN_COURS);
  const [terminees,setTerminees]=useState(PH_TERMINEES);
  const [stock,setStock]=useState(PH_STOCK);
  const [editPrix,setEditPrix]=useState(null);
  const [tmpPrix,setTmpPrix]=useState("");
  const [profil,setProfil]=useState({...PH_INFO,garde:PH_INFO.est_garde});

  const accepter=id=>{
    const cmd=nouvelles.find(c=>c.id===id);
    if(cmd){setEnCours(p=>[cmd,...p]);setNouvelles(p=>p.filter(c=>c.id!==id));}
  };
  const refuser=id=>setNouvelles(p=>p.filter(c=>c.id!==id));
  const pret=id=>{
    const cmd=enCours.find(c=>c.id===id);
    if(cmd){setTerminees(p=>[{...cmd,time:"Maintenant",note:null},...p]);setEnCours(p=>p.filter(c=>c.id!==id));}
  };

  const toggleStock=id=>setStock(p=>p.map(i=>i.id===id?{...i,stock:!i.stock}:i));
  const savePrix=id=>{
    const v=parseInt(tmpPrix);
    if(v>0)setStock(p=>p.map(i=>i.id===id?{...i,price:v}:i));
    setEditPrix(null);setTmpPrix("");
  };

  const revMois=47800;const revAujourd=8750;
  const commMois=Math.round(revMois*COM);const commAuj=Math.round(revAujourd*COM);

  return(
    <div style={{paddingBottom:60}}>

      {/* Carte profil pharmacie */}
      <div style={{background:`linear-gradient(135deg,${G},${GD})`,padding:"18px 18px 16px"}}>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <div style={{width:50,height:50,borderRadius:14,background:"rgba(255,255,255,0.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>🏥</div>
          <div style={{flex:1}}>
            <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:2}}>
              <p style={{color:W,fontSize:15,fontWeight:800,margin:0}}>{profil.nom}</p>
              {profil.garde&&<span style={{background:"rgba(255,255,255,0.25)",color:W,fontSize:9,fontWeight:700,padding:"2px 7px",borderRadius:10}}>GARDE</span>}
            </div>
            <p style={{color:GL,fontSize:11,margin:0}}>{profil.district} · ⭐ {PH_INFO.note} · {terminees.length+3} commandes</p>
          </div>
          <div style={{textAlign:"right"}}>
            <p style={{color:GL,fontSize:10,margin:"0 0 2px"}}>Aujourd'hui</p>
            <p style={{color:W,fontWeight:900,fontSize:16,margin:0}}>{fmt(revAujourd)}</p>
          </div>
        </div>
        {nouvelles.length>0&&(
          <div style={{marginTop:12,background:"rgba(255,255,255,0.18)",borderRadius:10,padding:"9px 13px",display:"flex",alignItems:"center",justifyContent:"space-between"}} onClick={()=>{setTab("commandes");setCmTab("nouvelles");}}>
            <span style={{color:W,fontWeight:700,fontSize:13}}>🔔 {nouvelles.length} nouvelle{nouvelles.length>1?"s":""} commande{nouvelles.length>1?"s":""} !</span>
            <span style={{color:GL,fontSize:12}}>Voir →</span>
          </div>
        )}
      </div>

      {/* Contenu par tab */}
      {tab==="dashboard"&&(
        <div style={{padding:"13px 14px"}}>
          {/* KPIs */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:9,marginBottom:14}}>
            {[
              {ic:"📦",lb:"Commandes aujourd'hui", v:nouvelles.length+enCours.length+3,     cl:WAVE_C},
              {ic:"💰",lb:"Revenus aujourd'hui",    v:fmt(revAujourd),                       cl:G    },
              {ic:"⏳",lb:"En attente",             v:nouvelles.length,                      cl:AMBER},
              {ic:"⭐",lb:"Note clients",           v:`${PH_INFO.note}/5`,                  cl:AMBER},
            ].map(({ic,lb,v,cl})=>(
              <div key={lb} style={{background:W,borderRadius:13,padding:13,boxShadow:"0 2px 8px rgba(0,0,0,0.06)"}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}><span style={{fontSize:18}}>{ic}</span><div style={{width:7,height:7,borderRadius:"50%",background:cl}}/></div>
                <p style={{color:TXT,fontWeight:900,fontSize:15,margin:"0 0 2px"}}>{v}</p>
                <p style={{color:TXTS,fontSize:10,fontWeight:600,margin:0}}>{lb}</p>
              </div>
            ))}
          </div>

          {/* Alertes nouvelles commandes */}
          {nouvelles.length>0&&(
            <div style={{marginBottom:14}}>
              <h4 style={{color:TXT,fontWeight:700,fontSize:13,marginBottom:9}}>🔔 Nouvelles commandes à traiter</h4>
              {nouvelles.slice(0,2).map(c=>(
                <div key={c.id} style={{background:W,borderRadius:13,padding:13,marginBottom:8,border:`2px solid ${AMBER}`,boxShadow:"0 2px 8px rgba(0,0,0,0.06)"}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
                    <p style={{color:TXT,fontWeight:700,fontSize:13,margin:0}}>{c.client}</p>
                    <span style={{color:TXTS,fontSize:11}}>Il y a {c.time}</span>
                  </div>
                  <p style={{color:TXTS,fontSize:12,margin:"0 0 8px"}}>{c.items.map(i=>`${i.name} ×${i.qty}`).join(", ")}</p>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <span style={{color:GD,fontWeight:800,fontSize:13}}>{fmt(c.total)}</span>
                    <div style={{display:"flex",gap:7}}>
                      <button onClick={()=>refuser(c.id)} style={{background:"#FFE5E5",border:"none",borderRadius:8,padding:"7px 12px",color:RED,fontWeight:700,cursor:"pointer",fontSize:12}}>Refuser</button>
                      <button onClick={()=>accepter(c.id)} style={{background:G,border:"none",borderRadius:8,padding:"7px 12px",color:W,fontWeight:700,cursor:"pointer",fontSize:12}}>Accepter ✓</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Commandes en cours */}
          {enCours.length>0&&(
            <div style={{marginBottom:14}}>
              <h4 style={{color:TXT,fontWeight:700,fontSize:13,marginBottom:9}}>💊 En préparation</h4>
              {enCours.map(c=>(
                <div key={c.id} style={{background:W,borderRadius:13,padding:13,marginBottom:8,boxShadow:"0 2px 8px rgba(0,0,0,0.06)"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <div><p style={{color:TXT,fontWeight:700,fontSize:13,margin:"0 0 2px"}}>{c.client}</p><p style={{color:TXTS,fontSize:11,margin:0}}>{c.items.map(i=>i.name).join(", ")}</p></div>
                    <button onClick={()=>pret(c.id)} style={{background:GBG,border:"none",borderRadius:9,padding:"8px 12px",color:GD,fontWeight:700,cursor:"pointer",fontSize:12,whiteSpace:"nowrap"}}>Prêt 📦</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Stats rapides */}
          <div style={{background:W,borderRadius:13,padding:13,boxShadow:"0 2px 8px rgba(0,0,0,0.06)"}}>
            <h4 style={{color:TXT,fontWeight:700,fontSize:13,margin:"0 0 10px"}}>📊 Ce mois</h4>
            {[["Revenus bruts",fmt(revMois),""],["Commission SantéExpress (3%)",fmt(commMois),RED],["Net à percevoir",fmt(revMois-commMois),G]].map(([lb,v,cl])=>(
              <div key={lb} style={{display:"flex",justifyContent:"space-between",paddingBottom:7,marginBottom:7,borderBottom:"1px solid #F0F4F1"}}>
                <span style={{color:TXTS,fontSize:12}}>{lb}</span>
                <span style={{color:cl||TXT,fontWeight:700,fontSize:13}}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab==="commandes"&&(
        <div>
          {/* Sous-onglets */}
          <div style={{display:"flex",background:W,borderBottom:"2px solid #E8EDE9"}}>
            {[["nouvelles",`Nouvelles${nouvelles.length?` (${nouvelles.length})`:""}`,AMBER],["encours",`En cours${enCours.length?` (${enCours.length})`:""}`,WAVE_C],["terminees","Terminées",G]].map(([t,l,cl])=>(
              <button key={t} onClick={()=>setCmTab(t)} style={{flex:1,background:"none",border:"none",padding:"11px 4px",fontWeight:700,fontSize:11,color:cmTab===t?cl:TXTS,cursor:"pointer",borderBottom:cmTab===t?`2.5px solid ${cl}`:"2.5px solid transparent"}}>
                {l}
              </button>
            ))}
          </div>

          <div style={{padding:"11px 14px 80px"}}>
            {cmTab==="nouvelles"&&(
              nouvelles.length===0
                ?<div style={{textAlign:"center",padding:"50px 0",color:TXTS}}><div style={{fontSize:44}}>✅</div><p style={{fontWeight:600,marginTop:10}}>Aucune commande en attente</p></div>
                :nouvelles.map(c=>(
                  <div key={c.id} style={{background:W,borderRadius:13,padding:13,marginBottom:10,border:`2px solid ${AMBER}22`,boxShadow:"0 2px 8px rgba(0,0,0,0.06)"}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                      <div><p style={{color:TXT,fontWeight:800,fontSize:13,margin:"0 0 1px"}}>#{c.id} — {c.client}</p><p style={{color:TXTS,fontSize:11,margin:0}}>📱 {c.tel} · Il y a {c.time}</p></div>
                      <div style={{display:"flex",flexDirection:"column",gap:4,alignItems:"flex-end"}}>
                        <span style={{background:PAY_CLR[c.payment]+"22",color:PAY_CLR[c.payment],fontSize:10,fontWeight:700,padding:"3px 7px",borderRadius:10}}>{PAY_LBL[c.payment]}</span>
                        {c.ordo&&<span style={{background:"#FFF9E6",color:"#7A5A00",fontSize:10,fontWeight:700,padding:"3px 7px",borderRadius:10}}>📋 Avec ordo</span>}
                      </div>
                    </div>
                    {/* Compte à rebours 5 minutes */}
                    <div style={{background:"#FFF9E6",borderRadius:9,padding:"8px 11px",marginBottom:8}}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:5}}>
                        <span style={{color:"#7A5A00",fontSize:11,fontWeight:700}}>⏱️ Temps pour accepter</span>
                        <span style={{color:TXTS,fontSize:10}}>Sinon → pharmacie suivante</span>
                      </div>
                      <Countdown seconds={300} onExpire={()=>refuser(c.id)}/>
                    </div>
                    <div style={{background:GBG,borderRadius:8,padding:"8px 10px",marginBottom:8}}>
                      {c.items.map((i,idx)=>(
                        <div key={idx} style={{display:"flex",justifyContent:"space-between"}}><span style={{color:TXT,fontSize:12}}>{i.name} ×{i.qty}</span><span style={{color:GD,fontWeight:600,fontSize:12}}>{fmt(i.price*i.qty)}</span></div>
                      ))}
                    </div>
                    {c.ordo&&(
                      <div style={{background:"#FFF9E6",border:`1px solid ${AMBER}`,borderRadius:9,padding:"9px 12px",marginBottom:8,display:"flex",alignItems:"center",gap:8}}>
                        <span style={{fontSize:18}}>📋</span>
                        <div style={{flex:1}}>
                          <p style={{color:"#7A5A00",fontWeight:700,fontSize:12,margin:"0 0 1px"}}>Ordonnance fournie par le client</p>
                          <p style={{color:"#7A5A00",fontSize:11,margin:0}}>Vérifiez avant de préparer · Récupérer l'original à la livraison</p>
                        </div>
                        <span style={{color:G,fontWeight:700,fontSize:11,whiteSpace:"nowrap"}}>✅ Reçue</span>
                      </div>
                    )}
                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:9}}>
                      <span style={{color:TXTS,fontSize:11}}>📍 {c.adresse}</span>
                      <span style={{color:GD,fontWeight:800,fontSize:14}}>{fmt(c.total)}</span>
                    </div>
                    <div style={{display:"flex",gap:8}}>
                      <button onClick={()=>refuser(c.id)} style={{flex:1,background:"#FFE5E5",border:"none",borderRadius:9,padding:10,color:RED,fontWeight:700,cursor:"pointer",fontSize:13}}>✕ Refuser</button>
                      <button onClick={()=>accepter(c.id)} style={{flex:1,background:G,border:"none",borderRadius:9,padding:10,color:W,fontWeight:700,cursor:"pointer",fontSize:13}}>✓ Accepter</button>
                    </div>
                  </div>
                ))
            )}
            {cmTab==="encours"&&(
              enCours.length===0
                ?<div style={{textAlign:"center",padding:"50px 0",color:TXTS}}><div style={{fontSize:44}}>📦</div><p style={{fontWeight:600,marginTop:10}}>Aucune commande en préparation</p></div>
                :enCours.map(c=>(
                  <div key={c.id} style={{background:W,borderRadius:13,padding:13,marginBottom:10,border:`2px solid ${WAVE_C}22`,boxShadow:"0 2px 8px rgba(0,0,0,0.06)"}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
                      <div><p style={{color:TXT,fontWeight:800,fontSize:13,margin:"0 0 1px"}}>#{c.id} — {c.client}</p><p style={{color:TXTS,fontSize:11,margin:0}}>📱 {c.tel}</p></div>
                      <span style={{background:WAVE_C+"22",color:WAVE_C,fontSize:10,fontWeight:700,padding:"3px 7px",borderRadius:10,height:"fit-content"}}>En préparation</span>
                    </div>
                    <p style={{color:TXTS,fontSize:12,margin:"0 0 9px"}}>{c.items.map(i=>`${i.name} ×${i.qty}`).join(" · ")}</p>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                      <span style={{color:GD,fontWeight:800,fontSize:14}}>{fmt(c.total)}</span>
                      <button onClick={()=>pret(c.id)} style={{background:G,border:"none",borderRadius:9,padding:"9px 16px",color:W,fontWeight:700,cursor:"pointer",fontSize:13}}>📦 Prêt pour livraison</button>
                    </div>
                  </div>
                ))
            )}
            {cmTab==="terminees"&&(
              terminees.map(c=>(
                <div key={c.id} style={{background:W,borderRadius:13,padding:13,marginBottom:9,boxShadow:"0 2px 8px rgba(0,0,0,0.06)"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:5}}>
                    <div><p style={{color:TXT,fontWeight:700,fontSize:13,margin:"0 0 2px"}}>#{c.id} — {c.client}</p><p style={{color:TXTS,fontSize:11,margin:0}}>{c.time} · {PAY_LBL[c.payment]}</p></div>
                    <span style={{background:G+"22",color:GD,fontSize:10,fontWeight:700,padding:"3px 7px",borderRadius:10}}>Livré ✅</span>
                  </div>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <span style={{color:TXTS,fontSize:12}}>{c.items.map(i=>i.name).join(", ")}</span>
                    <span style={{color:GD,fontWeight:800,fontSize:13}}>{fmt(c.total)}</span>
                  </div>
                  {c.note&&<p style={{color:AMBER,fontSize:12,margin:"5px 0 0"}}>{"⭐".repeat(c.note)} Note client</p>}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {tab==="stock"&&(
        <div style={{padding:"11px 14px 80px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
            <h4 style={{color:TXT,fontWeight:700,fontSize:14,margin:0}}>💊 {stock.length} médicaments</h4>
            <span style={{color:G,fontSize:12,fontWeight:600}}>{stock.filter(i=>i.stock).length} en stock</span>
          </div>
          {stock.map(item=>(
            <div key={item.id} style={{background:W,borderRadius:13,padding:12,marginBottom:8,display:"flex",alignItems:"center",gap:11,boxShadow:"0 2px 8px rgba(0,0,0,0.06)"}}>
              <div style={{width:42,height:42,borderRadius:10,background:GBG,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>{item.emoji}</div>
              <div style={{flex:1,minWidth:0}}>
                <p style={{color:TXT,fontWeight:700,fontSize:12,margin:"0 0 2px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{item.name}</p>
                {editPrix===item.id
                  ?<div style={{display:"flex",gap:6,alignItems:"center",marginTop:3}}>
                    <input type="number" value={tmpPrix} onChange={e=>setTmpPrix(e.target.value)} style={{width:90,border:`2px solid ${G}`,borderRadius:7,padding:"4px 8px",fontSize:13,outline:"none"}}/>
                    <button onClick={()=>savePrix(item.id)} style={{background:G,color:W,border:"none",borderRadius:7,padding:"4px 10px",fontSize:12,fontWeight:700,cursor:"pointer"}}>OK</button>
                    <button onClick={()=>setEditPrix(null)} style={{background:"#EEE",color:TXT,border:"none",borderRadius:7,padding:"4px 10px",fontSize:12,cursor:"pointer"}}>✕</button>
                  </div>
                  :<div style={{display:"flex",alignItems:"center",gap:7}}>
                    <span style={{color:GD,fontWeight:800,fontSize:12}}>{fmt(item.price)}</span>
                    <button onClick={()=>{setEditPrix(item.id);setTmpPrix(String(item.price));}} style={{background:"none",border:"none",color:TXTS,cursor:"pointer",fontSize:13,padding:0}}>✏️</button>
                  </div>
                }
              </div>
              {/* Toggle stock */}
              <button onClick={()=>toggleStock(item.id)}
                style={{background:item.stock?G:RED,color:W,border:"none",borderRadius:20,padding:"5px 11px",fontSize:11,fontWeight:700,cursor:"pointer",flexShrink:0,whiteSpace:"nowrap"}}>
                {item.stock?"En stock":"Rupture"}
              </button>
            </div>
          ))}
        </div>
      )}

      {tab==="revenus"&&(
        <div style={{padding:"13px 14px 80px"}}>
          {/* Résumé du mois */}
          <div style={{background:`linear-gradient(135deg,${G},${GD})`,borderRadius:13,padding:16,marginBottom:13}}>
            <p style={{color:GL,fontSize:10,fontWeight:700,margin:"0 0 4px",letterSpacing:1}}>REVENUS CE MOIS</p>
            <p style={{color:W,fontWeight:900,fontSize:26,margin:"0 0 12px"}}>{fmt(revMois)}</p>
            <div style={{display:"flex",gap:10}}>
              <div style={{flex:1,background:"rgba(255,255,255,0.15)",borderRadius:9,padding:10,textAlign:"center"}}>
                <p style={{color:GL,fontSize:10,margin:"0 0 3px"}}>Net pharmacie (90%)</p>
                <p style={{color:W,fontWeight:800,fontSize:14,margin:0}}>{fmt(revMois-commMois)}</p>
              </div>
              <div style={{flex:1,background:"rgba(255,255,255,0.15)",borderRadius:9,padding:10,textAlign:"center"}}>
                <p style={{color:GL,fontSize:10,margin:"0 0 3px"}}>Commission SantéExpress</p>
                <p style={{color:W,fontWeight:800,fontSize:14,margin:0}}>{fmt(commMois)}</p>
              </div>
            </div>
          </div>

          {/* Aujourd'hui */}
          <div style={{background:W,borderRadius:13,padding:13,marginBottom:12,boxShadow:"0 2px 8px rgba(0,0,0,0.06)"}}>
            <h4 style={{color:TXT,fontWeight:700,fontSize:13,margin:"0 0 10px"}}>Aujourd'hui</h4>
            {[["Revenus bruts",fmt(revAujourd),""],["Commission (3%)",fmt(commAuj),RED],["Votre net",fmt(revAujourd-commAuj),G]].map(([lb,v,cl])=>(
              <div key={lb} style={{display:"flex",justifyContent:"space-between",paddingBottom:8,marginBottom:8,borderBottom:"1px solid #F0F4F1"}}>
                <span style={{color:TXTS,fontSize:13}}>{lb}</span>
                <span style={{color:cl||TXT,fontWeight:700,fontSize:13}}>{v}</span>
              </div>
            ))}
          </div>

          {/* Dernières commandes avec montants */}
          <h4 style={{color:TXT,fontWeight:700,fontSize:13,marginBottom:9}}>Dernières commandes</h4>
          {terminees.slice(0,5).map(c=>(
            <div key={c.id} style={{background:W,borderRadius:13,padding:12,marginBottom:8,display:"flex",justifyContent:"space-between",alignItems:"center",boxShadow:"0 2px 8px rgba(0,0,0,0.06)"}}>
              <div>
                <p style={{color:TXT,fontWeight:600,fontSize:12,margin:"0 0 2px"}}>{c.client} · #{c.id}</p>
                <p style={{color:TXTS,fontSize:11,margin:0}}>{c.time} · {PAY_LBL[c.payment]}</p>
              </div>
              <div style={{textAlign:"right"}}>
                <p style={{color:GD,fontWeight:800,fontSize:13,margin:"0 0 1px"}}>{fmt(c.total)}</p>
                <p style={{color:G,fontSize:11,margin:0}}>Net: {fmt(Math.round(c.total*0.9))}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab==="profil"&&(
        <div style={{padding:"13px 14px 80px"}}>
          <div style={{background:W,borderRadius:13,padding:14,marginBottom:12,boxShadow:"0 2px 8px rgba(0,0,0,0.06)"}}>
            <h4 style={{color:TXT,fontWeight:700,fontSize:13,margin:"0 0 13px"}}>⚙️ Informations</h4>
            {[
              {lb:"Nom de la pharmacie",k:"nom",     ph:"Nom officiel"},
              {lb:"Adresse",            k:"adresse", ph:"Adresse complète"},
              {lb:"Téléphone",          k:"telephone",ph:"+225 XX XX XX XX"},
            ].map(({lb,k,ph})=>(
              <div key={k} style={{marginBottom:12}}>
                <label style={{color:TXTS,fontSize:11,fontWeight:600,marginBottom:4,display:"block"}}>{lb}</label>
                <input value={profil[k]} onChange={e=>setProfil(p=>({...p,[k]:e.target.value}))} placeholder={ph}
                  style={{width:"100%",border:`2px solid ${profil[k]?G:"#E0E8E3"}`,borderRadius:9,padding:"10px 12px",fontSize:13,outline:"none",color:TXT,background:"#FAFCFA",boxSizing:"border-box"}}/>
              </div>
            ))}
          </div>

          {/* Mode garde */}
          <div style={{background:W,borderRadius:13,padding:14,marginBottom:12,boxShadow:"0 2px 8px rgba(0,0,0,0.06)"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div>
                <p style={{color:TXT,fontWeight:700,fontSize:13,margin:"0 0 3px"}}>🌙 Mode pharmacie de garde</p>
                <p style={{color:TXTS,fontSize:11,margin:0}}>Visible en priorité pour les clients la nuit</p>
              </div>
              <button onClick={()=>setProfil(p=>({...p,garde:!p.garde}))}
                style={{width:50,height:26,borderRadius:13,background:profil.garde?G:"#DDD",border:"none",cursor:"pointer",position:"relative",transition:"background 0.25s"}}>
                <div style={{width:20,height:20,borderRadius:"50%",background:W,position:"absolute",top:3,left:profil.garde?27:3,transition:"left 0.25s",boxShadow:"0 1px 3px rgba(0,0,0,0.2)"}}/>
              </button>
            </div>
          </div>

          {/* Abonnement */}
          <div style={{background:`linear-gradient(135deg,${G},${GD})`,borderRadius:13,padding:14,marginBottom:12}}>
            <p style={{color:GL,fontSize:10,fontWeight:700,margin:"0 0 3px",letterSpacing:1}}>ABONNEMENT ACTIF</p>
            <p style={{color:W,fontWeight:800,fontSize:15,margin:"0 0 5px"}}>Plan Standard — 15 000 FCFA/mois</p>
            <p style={{color:GL,fontSize:11,margin:"0 0 11px"}}>Renouvellement : 10 juillet 2026</p>
            <div style={{display:"flex",gap:8}}>
              <div style={{flex:1,background:"rgba(255,255,255,0.18)",borderRadius:8,padding:"8px 10px",textAlign:"center"}}>
                <p style={{color:W,fontWeight:700,fontSize:11,margin:0}}>✅ Commandes illimitées</p>
              </div>
              <div style={{flex:1,background:"rgba(255,255,255,0.18)",borderRadius:8,padding:"8px 10px",textAlign:"center"}}>
                <p style={{color:W,fontWeight:700,fontSize:11,margin:0}}>✅ Support 24h/24</p>
              </div>
            </div>
          </div>

          <button style={{width:"100%",background:W,border:`2px solid ${RED}`,borderRadius:13,padding:13,color:RED,fontWeight:700,cursor:"pointer",fontSize:13}}>
            Se déconnecter
          </button>
        </div>
      )}

      {/* Bottom nav pharmacie */}
      <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:480,background:W,borderTop:"1px solid #E8EDE9",display:"flex",zIndex:99}}>
        {[
          {t:"dashboard",ic:"📊",lb:"Tableau de bord"},
          {t:"commandes",ic:"📦",lb:"Commandes",badge:nouvelles.length},
          {t:"stock",    ic:"💊",lb:"Stock"},
          {t:"revenus",  ic:"💰",lb:"Revenus"},
          {t:"profil",   ic:"⚙️",lb:"Profil"},
        ].map(({t,ic,lb,badge})=>(
          <button key={t} onClick={()=>setTab(t)} style={{flex:1,background:"none",border:"none",padding:"9px 2px 7px",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:1,position:"relative"}}>
            <span style={{fontSize:17}}>{ic}</span>
            {badge>0&&<span style={{position:"absolute",top:5,right:"50%",transform:"translateX(130%)",background:RED,color:W,fontSize:9,fontWeight:800,width:16,height:16,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center"}}>{badge}</span>}
            <span style={{fontSize:9,fontWeight:tab===t?700:400,color:tab===t?G:TXTS}}>{lb}</span>
            {tab===t&&<div style={{width:16,height:2.5,background:G,borderRadius:2}}/>}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   LOGIN MODAL — Connexion / Inscription
══════════════════════════════════════════════════════ */
function LoginModal({onClose,onSuccess}){
  const [tab,setTab]=useState("connexion");
  const [form,setForm]=useState({nom:"",telephone:"",mot_de_passe:"",adresse:""});
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState("");
  const set=(k,v)=>setForm(p=>({...p,[k]:v}));

  const submit=async()=>{
    setError(""); setLoading(true);
    try{
      const endpoint=tab==="connexion"?"/auth/connexion":"/auth/inscription";
      const body=tab==="connexion"
        ?{telephone:form.telephone,mot_de_passe:form.mot_de_passe}
        :{nom:form.nom,telephone:form.telephone,mot_de_passe:form.mot_de_passe,adresse:form.adresse};

      const res=await fetch(API_URL+endpoint,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(body),
      });
      const data=await res.json();

      if(!res.ok) throw new Error(data.message||"Erreur");
      onSuccess(data.token, data.user);
    }catch(e){
      // Fallback démo si API hors ligne
      if(e.message.includes("fetch")||e.message.includes("network")){
        onSuccess("demo-token", {nom:form.nom||"Utilisateur",telephone:form.telephone,role:"client"});
      } else {
        setError(e.message);
      }
    }finally{ setLoading(false); }
  };

  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.55)",zIndex:200,display:"flex",alignItems:"flex-end",justifyContent:"center"}} onClick={onClose}>
      <div style={{background:W,borderRadius:"20px 20px 0 0",padding:"24px 20px 36px",width:"100%",maxWidth:480,boxShadow:"0 -4px 30px rgba(0,0,0,0.15)"}} onClick={e=>e.stopPropagation()}>

        {/* Poignée */}
        <div style={{width:40,height:4,background:"#DDD",borderRadius:2,margin:"0 auto 18px"}}/>

        {/* Tabs */}
        <div style={{display:"flex",background:BG,borderRadius:11,padding:3,marginBottom:20}}>
          {[["connexion","Se connecter"],["inscription","Créer un compte"]].map(([t,l])=>(
            <button key={t} onClick={()=>{setTab(t);setError("");}}
              style={{flex:1,background:tab===t?W:"transparent",border:"none",borderRadius:9,padding:"9px",fontWeight:700,fontSize:13,color:tab===t?G:TXTS,cursor:"pointer",boxShadow:tab===t?"0 1px 6px rgba(0,0,0,0.1)":"none",transition:"all 0.2s"}}>
              {l}
            </button>
          ))}
        </div>

        {/* Champs */}
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          {tab==="inscription"&&(
            <div>
              <label style={{color:TXTS,fontSize:12,fontWeight:600,marginBottom:4,display:"block"}}>👤 Nom complet</label>
              <input value={form.nom} onChange={e=>set("nom",e.target.value)} placeholder="Koné Amadou"
                style={{width:"100%",border:`2px solid ${form.nom?G:"#E0E8E3"}`,borderRadius:10,padding:"12px 13px",fontSize:14,outline:"none",color:TXT,boxSizing:"border-box"}}/>
            </div>
          )}
          <div>
            <label style={{color:TXTS,fontSize:12,fontWeight:600,marginBottom:4,display:"block"}}>📱 Téléphone</label>
            <input type="tel" value={form.telephone} onChange={e=>set("telephone",e.target.value)} placeholder="+225 07 XX XX XX XX"
              style={{width:"100%",border:`2px solid ${form.telephone?G:"#E0E8E3"}`,borderRadius:10,padding:"12px 13px",fontSize:14,outline:"none",color:TXT,boxSizing:"border-box"}}/>
          </div>
          <div>
            <label style={{color:TXTS,fontSize:12,fontWeight:600,marginBottom:4,display:"block"}}>🔒 Mot de passe</label>
            <input type="password" value={form.mot_de_passe} onChange={e=>set("mot_de_passe",e.target.value)} placeholder="••••••••"
              style={{width:"100%",border:`2px solid ${form.mot_de_passe?G:"#E0E8E3"}`,borderRadius:10,padding:"12px 13px",fontSize:14,outline:"none",color:TXT,boxSizing:"border-box"}}/>
          </div>
          {tab==="inscription"&&(
            <div>
              <label style={{color:TXTS,fontSize:12,fontWeight:600,marginBottom:4,display:"block"}}>📍 Adresse <span style={{fontWeight:400}}>(optionnel)</span></label>
              <input value={form.adresse} onChange={e=>set("adresse",e.target.value)} placeholder="Cocody, Riviera 2..."
                style={{width:"100%",border:"2px solid #E0E8E3",borderRadius:10,padding:"12px 13px",fontSize:14,outline:"none",color:TXT,boxSizing:"border-box"}}/>
            </div>
          )}
        </div>

        {/* Erreur */}
        {error&&<div style={{background:"#FFE5E5",border:`1px solid ${RED}`,borderRadius:9,padding:"10px 13px",marginTop:12}}>
          <p style={{color:RED,fontSize:12,fontWeight:600,margin:0}}>⚠️ {error}</p>
        </div>}

        {/* CTA */}
        <button onClick={submit} disabled={loading||!form.telephone||!form.mot_de_passe||(tab==="inscription"&&!form.nom)}
          style={{width:"100%",background:loading||!form.telephone||!form.mot_de_passe?GBG:G,color:loading||!form.telephone||!form.mot_de_passe?TXTS:W,border:"none",borderRadius:13,padding:14,fontWeight:800,cursor:"pointer",fontSize:15,marginTop:16,transition:"background 0.2s"}}>
          {loading?"Connexion en cours...":tab==="connexion"?"Se connecter →":"Créer mon compte →"}
        </button>

        <p style={{textAlign:"center",color:TXTS,fontSize:11,marginTop:12}}>
          Vos données sont sécurisées 🔒 · SantéExpress CI
        </p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   COMPTE À REBOURS — Timer pharmacie (5 min)
══════════════════════════════════════════════════════ */
function Countdown({seconds=300, onExpire}){
  const [left,setLeft]=useState(seconds);
  useEffect(()=>{
    if(left<=0){onExpire&&onExpire();return;}
    const t=setTimeout(()=>setLeft(s=>s-1),1000);
    return()=>clearTimeout(t);
  },[left]);
  const m=Math.floor(left/60);
  const s=left%60;
  const urgent=left<60;
  const pct=(left/seconds)*100;
  return(
    <div style={{display:"flex",alignItems:"center",gap:8}}>
      {/* Barre de progression */}
      <div style={{flex:1,height:5,background:"#EEE",borderRadius:3,overflow:"hidden"}}>
        <div style={{width:`${pct}%`,height:"100%",background:urgent?RED:AMBER,borderRadius:3,transition:"width 1s linear"}}/>
      </div>
      <span style={{color:urgent?RED:AMBER,fontWeight:800,fontSize:13,minWidth:42,textAlign:"right"}}>
        {m}:{String(s).padStart(2,"0")}
      </span>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   ANIMATION RECHERCHE PHARMACIE
══════════════════════════════════════════════════════ */
function SearchingPharmacy({onFound, commune="Abidjan"}){
  const [step,setStep]=useState(0);
  const STEPS=[
    {ic:"🔍",txt:"Recherche d'une pharmacie disponible...",sub:`Dans votre zone — ${commune}`},
    {ic:"📍",txt:"Vérification des stocks...",             sub:"Médicaments disponibles"},
    {ic:"⭐",txt:"Sélection de la meilleure pharmacie...", sub:"Note et délai de réponse"},
    {ic:"✅",txt:"Pharmacie trouvée !",                    sub:"Pharmacie de la Riviera · Cocody"},
  ];
  useEffect(()=>{
    if(step<3){const t=setTimeout(()=>setStep(s=>s+1),1400);return()=>clearTimeout(t);}
    else{const t=setTimeout(onFound,1000);return()=>clearTimeout(t);}
  },[step]);
  const cur=STEPS[step];
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.6)",zIndex:150,display:"flex",alignItems:"center",justifyContent:"center",padding:24}}>
      <div style={{background:W,borderRadius:20,padding:36,width:"100%",maxWidth:340,textAlign:"center",boxShadow:"0 8px 40px rgba(0,0,0,0.2)"}}>
        {/* Icône animée */}
        <div style={{width:72,height:72,borderRadius:"50%",background:step===3?GBG:"#FFF9E6",border:`3px solid ${step===3?G:AMBER}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:34,margin:"0 auto 18px",transition:"all 0.4s"}}>
          {cur.ic}
        </div>
        <p style={{color:TXT,fontWeight:800,fontSize:16,marginBottom:6,transition:"all 0.3s"}}>{cur.txt}</p>
        <p style={{color:TXTS,fontSize:12,marginBottom:24}}>{cur.sub}</p>

        {/* Étapes */}
        <div style={{display:"flex",justifyContent:"center",gap:8,marginBottom:step===3?20:0}}>
          {STEPS.map((_,i)=>(
            <div key={i} style={{width:i===step?24:8,height:8,borderRadius:4,background:i<=step?G:"#EEE",transition:"all 0.4s"}}/>
          ))}
        </div>

        {step===3&&(
          <div style={{background:GBG,borderRadius:12,padding:14,marginTop:8}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <div style={{width:40,height:40,borderRadius:10,background:G,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>🏥</div>
              <div style={{textAlign:"left"}}>
                <p style={{color:TXT,fontWeight:700,fontSize:13,margin:"0 0 2px"}}>Pharmacie de la Riviera</p>
                <p style={{color:G,fontSize:11,margin:0}}>⭐ 4.9 · Cocody · ~25 min</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
