import { supabase } from '../../lib/supabase'

function genRef() {
  return 'PC-' + String(Math.floor(Math.random() * 9000) + 1000)
}

function genWhatsAppMessage(commande, items) {
  const PAY = {
    wave: 'Wave CI 📲',
    orange: 'Orange Money 📲',
    cinetpay: 'CinetPay 💳',
    cash: 'Cash à la livraison 💵',
    assurance: 'Assurance maladie 🛡️'
  }
  const LIVRAISON = {
    std: 'SantéExpress 🛵 (30-45 min)',
    yango: 'Yango Delivery 🚗 (45-60 min)'
  }

  const itemsList = items.map(i => `  💊 ${i.nom_produit} ×${i.quantite} — ${(i.prix_unitaire * i.quantite).toLocaleString('fr-FR')} FCFA`).join('\n')

  return `🏥 *Nouvelle commande SantéExpress !*
─────────────────────────────
🔖 Réf : *${commande.reference}*
👤 Client : ${commande.nom_client}
📱 Tél : ${commande.telephone_client}
📍 Adresse : ${commande.adresse_livraison}
─────────────────────────────
${itemsList}
─────────────────────────────
💰 Sous-total : ${commande.sous_total.toLocaleString('fr-FR')} FCFA
🛵 Livraison : ${commande.frais_livraison.toLocaleString('fr-FR')} FCFA
💳 *Total : ${commande.total.toLocaleString('fr-FR')} FCFA*
💰 Paiement : ${PAY[commande.mode_paiement] || commande.mode_paiement}
🚚 Livraison : ${LIVRAISON[commande.mode_livraison] || commande.mode_livraison}
─────────────────────────────
✅ Répondez *OUI* pour confirmer
❌ Répondez *NON* pour refuser`
}

export default async function handler(req, res) {
  // GET — récupérer les commandes (filtrable par pharmacie_id ou statut)
  if (req.method === 'GET') {
    const { pharmacie_id, statut, telephone_client } = req.query
    try {
      let query = supabase.from('commandes').select('*').order('created_at', { ascending: false })
      if (pharmacie_id) query = query.eq('pharmacie_id', pharmacie_id)
      if (statut) query = query.eq('statut', statut)
      if (telephone_client) query = query.eq('telephone_client', telephone_client)

      const { data, error } = await query

      if (error) {
        console.error('Supabase error:', error.message)
        return res.json({ commandes: [] })
      }
      return res.json({ commandes: data ||
