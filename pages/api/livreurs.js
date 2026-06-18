import { supabase } from '../../lib/supabase'

export default async function handler(req, res) {
  // GET — rechercher un livreur par téléphone, ou lister tous
  if (req.method === 'GET') {
    const { telephone } = req.query
    try {
      let query = supabase.from('livreurs').select('*').order('nom')
      if (telephone) query = query.eq('telephone', telephone)

      const { data, error } = await query

      if (error) {
        console.error('Supabase error:', error.message)
        return res.json({ livreurs: [] })
      }
      return res.json({ livreurs: data || [] })
    } catch(e) {
      console.error('Catch error:', e.message)
      return res.json({ livreurs: [] })
    }
  }

  // POST — inscription d'un nouveau livreur
  if (req.method === 'POST') {
    const body = req.body
    try {
      const { data, error } = await supabase.from('livreurs').insert([{
        nom: body.nom,
        telephone: body.telephone,
        email: body.email || null,
        transport: body.transport || 'moto',
        zone: body.zone || null,
        est_disponible: true,
        est_actif: true,
      }]).select().single()

      if (error) {
        console.error('Supabase error:', error.message)
        return res.status(200).json({ success: true, fallback: true })
      }
      return res.json({ success: true, livreur: data })
    } catch(e) {
      console.error('Catch error:', e.message)
      return res.status(200).json({ success: true, fallback: true })
    }
  }

  return res.status(405).end()
}
