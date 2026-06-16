import { supabase } from '../../../lib/supabase'

export default async function handler(req, res) {
  const { id } = req.query

  // PATCH — mettre à jour le statut
  if (req.method === 'PATCH') {
    const { statut } = req.body
    try {
      const { data, error } = await supabase
        .from('commandes')
        .update({ statut, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single()

      if (error) return res.status(400).json({ error: error.message })
      return res.json({ commande: data })
    } catch(e) {
      return res.status(500).json({ error: e.message })
    }
  }

  // GET — récupérer une commande
  if (req.method === 'GET') {
    try {
      const { data, error } = await supabase
        .from('commandes')
        .select('*')
        .eq('id', id)
        .single()

      if (error) return res.status(404).json({ error: error.message })
      return res.json({ commande: data })
    } catch(e) {
      return res.status(500).json({ error: e.message })
    }
  }

  return res.status(405).end()
}
