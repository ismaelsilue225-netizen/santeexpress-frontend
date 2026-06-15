// ══════════════════════════════════════════════════════
// REMPLACER LA FONCTION Pharmacie() EXISTANTE PAR CELLE-CI
// ══════════════════════════════════════════════════════

function Pharmacie() {
  const G="#00A859",GL="#C8FFDF",GD="#007A42",GBG="#E8F5EE";
  const W="#FFFFFF",BG="#F4F6F5",TXT="#0E1A13",TXTS="#6B7D70";
  const RED="#E63946",AMBER="#F4A261";
  const fmt=n=>n.toLocaleString("fr-FR")+" FCFA";

  const [view, setView] = useState("accueil"); // accueil | commandes
  const [commandes, setCommandes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionId, setActionId] = useState(null);

  const STA = {
    confirmed:  { lb:"En attente ⏳",  clr:AMBER },
    preparing:  { lb:"En préparation 💊", clr:"#1A56DB" },
    delivering: { lb:"En livraison 🛵", clr:"#7C3AED" },
    delivered:  { lb:"Livré ✅",        clr:G },
    cancelled:  { lb:"Refusé ❌",       clr:RED },
  };

  // Charger les commandes en attente depuis Supabase
  const fetchCommandes = async () => {
    setLoading(true);
    try {
      const r = await fetch("/api/commandes?statut=confirmed");
      const d = await r.json();
      setCommandes(d.commandes || []);
    } catch(e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (view === "commandes") fetchCommandes();
  }, [view]);

  // Confirmer ou refuser une commande
  const updateStatut = async (id, statut) => {
    setActionId(id);
    try {
      await fetch(`/api/commandes/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ statut }),
      });
      // Retirer la commande de la liste après action
      setCommandes(prev => prev.filter(c => c.id !== id));
    } catch(e) {
      console.error(e);
    }
    setActionId(null);
  };

  // ── VUE ACCUEIL ──
  if (view === "accueil") return (
    <div style={{padding:"16px 16px 40px"}}>
      <div style={{background:`linear-gradient(135deg,${G},${GD})`,borderRadius:16,padding:24,marginBottom:20,color:W,textAlign:"center"}}>
        <div style={{fontSize:48,marginBottom:10}}>🏥</div>
        <h2 style={{fontWeight:900,fontSize:22,margin:"0 0 8px"}}>Espace Pharmacie</h2>
        <p style={{fontSize:14,opacity:0.85,margin:"0 0 16px"}}>Gérez vos commandes SantéExpress</p>
        {/* BOUTON PRINCIPAL — Voir les commandes */}
        <button
          onClick={() => setView("commandes")}
          style={{background:W,color:G,border:"none",borderRadius:30,padding:"14px 28px",fontWeight:800,cursor:"pointer",fontSize:15,width:"100%",marginBottom:10}}>
          📋 Voir les commandes en attente
        </button>
        <button style={{background:"rgba(255,255,255,0.15)",color:W,border:"1.5px solid rgba(255,255,255,0.4)",borderRadius:30,padding:"12px 24px",fontWeight:700,cursor:"pointer",fontSize:14,width:"100%"}}>
          Demander à rejoindre
        </button>
      </div>
      {[
        ["💊","Gestion des stocks","Gérez vos produits en temps réel"],
        ["📦","Réception des commandes","Recevez et préparez les commandes clients"],
        ["📊","Tableau de bord","Suivez vos ventes et performances"],
        ["💳","Paiements sécurisés","Commission de 3% seulement"],
      ].map(([ic,t,s])=>(
        <div key={t} style={{background:W,borderRadius:13,padding:14,marginBottom:10,display:"flex",gap:12,alignItems:"center",boxShadow:"0 2px 8px rgba(0,0,0,0.06)"}}>
          <div style={{width:44,height:44,borderRadius:11,background:GBG,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>{ic}</div>
          <div><p style={{color:TXT,fontWeight:700,fontSize:14,margin:"0 0 2px"}}>{t}</p><p style={{color:TXTS,fontSize:12,margin:0}}>{s}</p></div>
        </div>
      ))}
    </div>
  );

  // ── VUE COMMANDES EN ATTENTE ──
  return (
    <div style={{padding:"16px 16px 80px"}}>
      {/* Header */}
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
        <button onClick={() => setView("accueil")}
          style={{background:GBG,border:"none",borderRadius:10,width:36,height:36,cursor:"pointer",fontSize:18,display:"flex",alignItems:"center",justifyContent:"center"}}>
          ←
        </button>
        <h2 style={{color:TXT,fontWeight:900,fontSize:18,margin:0}}>Commandes en attente</h2>
        <button onClick={fetchCommandes}
          style={{marginLeft:"auto",background:GBG,border:"none",borderRadius:10,padding:"7px 12px",color:GD,fontWeight:700,cursor:"pointer",fontSize:12}}>
          🔄 Actualiser
        </button>
      </div>

      {loading ? (
        <div style={{textAlign:"center",padding:"60px 0",color:TXTS}}>
          <div style={{fontSize:40,marginBottom:12}}>⏳</div>
          <p style={{fontWeight:600}}>Chargement...</p>
        </div>
      ) : commandes.length === 0 ? (
        <div style={{textAlign:"center",padding:"60px 0",color:TXTS,background:W,borderRadius:16,boxShadow:"0 2px 12px rgba(0,0,0,0.06)"}}>
          <div style={{fontSize:52,marginBottom:12}}>✅</div>
          <p style={{fontWeight:700,fontSize:16,color:TXT,marginBottom:6}}>Aucune commande en attente</p>
          <p style={{fontSize:13}}>Toutes les commandes ont été traitées</p>
        </div>
      ) : (
        commandes.map(cmd => (
          <div key={cmd.id} style={{background:W,borderRadius:16,padding:16,marginBottom:14,boxShadow:"0 2px 12px rgba(0,0,0,0.08)"}}>
            {/* Référence + statut */}
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
              <span style={{color:TXT,fontWeight:900,fontSize:16}}>#{cmd.reference}</span>
              <span style={{background:GBG,color:GD,fontWeight:700,fontSize:11,padding:"4px 10px",borderRadius:20}}>
                {STA[cmd.statut]?.lb || cmd.statut}
              </span>
            </div>

            {/* Infos client */}
            <div style={{background:BG,borderRadius:10,padding:11,marginBottom:12}}>
              {[
                ["👤", cmd.nom_client],
                ["📱", cmd.telephone_client],
                ["📍", cmd.adresse_livraison],
                ["💳", cmd.mode_paiement?.toUpperCase()],
              ].map(([ic,v])=> v ? (
                <div key={ic} style={{display:"flex",gap:8,marginBottom:5}}>
                  <span style={{fontSize:13}}>{ic}</span>
                  <span style={{color:TXT,fontSize:13,fontWeight:600}}>{v}</span>
                </div>
              ) : null)}
            </div>

            {/* Articles */}
            <div style={{marginBottom:12}}>
              <p style={{color:TXTS,fontSize:11,fontWeight:700,margin:"0 0 6px",letterSpacing:1}}>ARTICLES</p>
              {(cmd.items||[]).map((it,i)=>(
                <div key={i} style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                  <span style={{color:TXT,fontSize:13}}>💊 {it.nom_produit} ×{it.quantite}</span>
                  <span style={{color:GD,fontWeight:700,fontSize:13}}>{((it.prix_unitaire||0)*it.quantite).toLocaleString("fr-FR")} F</span>
                </div>
              ))}
            </div>

            {/* Total */}
            <div style={{display:"flex",justifyContent:"space-between",borderTop:"1.5px solid #E8EDE9",paddingTop:10,marginBottom:14}}>
              <span style={{color:TXT,fontWeight:800,fontSize:15}}>Total</span>
              <span style={{color:GD,fontWeight:900,fontSize:16}}>{fmt(cmd.total||0)}</span>
            </div>

            {/* BOUTONS CONFIRMER / REFUSER */}
            {cmd.statut === "confirmed" && (
              <div style={{display:"flex",gap:10}}>
                <button
                  onClick={() => updateStatut(cmd.id, "preparing")}
                  disabled={actionId === cmd.id}
                  style={{flex:1,background:actionId===cmd.id?"#CCC":G,color:W,border:"none",borderRadius:11,padding:"13px 0",fontWeight:800,cursor:"pointer",fontSize:14}}>
                  {actionId===cmd.id ? "..." : "✅ Confirmer"}
                </button>
                <button
                  onClick={() => updateStatut(cmd.id, "cancelled")}
                  disabled={actionId === cmd.id}
                  style={{flex:1,background:actionId===cmd.id?"#CCC":RED,color:W,border:"none",borderRadius:11,padding:"13px 0",fontWeight:800,cursor:"pointer",fontSize:14}}>
                  {actionId===cmd.id ? "..." : "❌ Refuser"}
                </button>
              </div>
            )}

            {/* Si déjà en préparation → bouton Envoyer livreur */}
            {cmd.statut === "preparing" && (
              <button
                onClick={() => updateStatut(cmd.id, "delivering")}
                disabled={actionId === cmd.id}
                style={{width:"100%",background:"#7C3AED",color:W,border:"none",borderRadius:11,padding:"13px 0",fontWeight:800,cursor:"pointer",fontSize:14}}>
                {actionId===cmd.id ? "..." : "🛵 Envoyer le livreur"}
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
}
