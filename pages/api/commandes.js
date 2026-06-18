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
      return res.json({ commandes: data || [] })
    } catch(e) {
      console.error('Catch error:', e.message)
      return res.json({ commandes: [] })
    }
  }

  if (req.method !== 'POST') return res.status(405).end()

  const body = req.body
  const reference = genRef()
  const total = (body.sous_total || 0) + (body.frais_livraison || 500) - (body.couverture_assurance || 0)

  try {
    const commission = Math.round(total * 0.01)
    const montant_pharmacie = total - commission

    const insertData = {
      reference,
      nom_client: body.nom_client || '',
      telephone_client: body.telephone_client || '',
      adresse_livraison: body.adresse_livraison || '',
      items: body.items || [],
      sous_total: body.sous_total || 0,
      frais_livraison: body.frais_livraison || 500,
      commission,
      total,
      montant_pharmacie,
      mode_paiement: body.mode_paiement || 'cash',
      mode_livraison: body.mode_livraison || 'std',
      statut: 'confirmed',
      statut_paiement: 'pending',
      note_pharmacien: body.note_pharmacien || null,
    }

    const { data, error } = await supabase.from('commandes').insert([insertData]).select().single()

    if (error) {
      console.error('Supabase error:', JSON.stringify(error))
      return res.status(201).json({ commande: { id: Date.now(), reference, total, statut: 'confirmed' }, error: error.message })
    }

    // ── Générer le lien WhatsApp ──
    const message = genWhatsAppMessage(insertData, body.items || [])
    const encodedMsg = encodeURIComponent(message)

    // Numéro admin SantéExpress (reçoit toutes les commandes)
    const ADMIN_WHATSAPP = '2250777926219'
    const whatsappUrl = `https://wa.me/${ADMIN_WHATSAPP}?text=${encodedMsg}`

    return res.status(201).json({
      commande: data,
      whatsapp_url: whatsappUrl,
      reference
    })

  } catch(e) {
    console.error('Catch error:', e.message)
    return res.status(201).json({ commande: { id: Date.now(), reference, total, statut: 'confirmed' }, error: e.message })
  }
}
