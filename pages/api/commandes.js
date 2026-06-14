import { supabase } from '../../lib/supabase'

function genRef() {
  return 'PC-' + String(Math.floor(Math.random() * 9000) + 1000)
}

export default async function handler(req, res) {
  // POST — créer une commande
  if (req.method === 'POST') {
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
      return res.status(201).json({ commande: data })
    } catch(e) {
      console.error('Catch error:', e.message)
      return res.status(201).json({ commande: { id: Date.now(), reference, total, statut: 'confirmed' }, error: e.message })
    }
  }

  return res.status(405).end()
}
