import { supabase } from '../../../lib/supabase'

export default async function handler(req, res) {
  const { id } = req.query

  if (req.method === 'PATCH') {
    const { statut, pharmacie_id } = req.body
    const STATUTS_VALIDES = ['confirmed', 'preparing', 'delivering', 'delivered', 'cancelled']
    if (!STATUTS_VALIDES.includes(statut)) {
      return res.status(400).json({ error: 'Statut invalide' })
    }
    const updateData = { statut }
    if (pharmacie_id) updateData.pharmacie_id = pharmacie_id
    const { data, error } = await supabase
      .from('commandes')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()
    if (error) return res.status(500).json({ error: error.message })
    return res.status(200).json({ commande: data })
  }

  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('commandes')
      .select('*')
      .eq('id', id)
      .single()
    if (error) return res.status(404).json({ error: 'Commande introuvable' })
    return res.status(200).json({ commande: data })
  }

  return res.status(405).end()
}
