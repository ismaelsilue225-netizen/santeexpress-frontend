import { supabase } from '../../lib/supabase'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const body = req.body

  try {
    const { data, error } = await supabase.from('demandes_pharmacies').insert([{
      nom_pharmacie: body.nom_pharmacie,
      responsable: body.responsable,
      telephone: body.telephone,
      email: body.email || null,
      adresse: body.adresse,
      commune: body.commune,
      numero_wave: body.numero_wave || null,
      statut: 'en_attente',
    }]).select().single()

    if (error) {
      console.error('Supabase error:', error.message)
      return res.status(200).json({ success: true, fallback: true })
    }

    return res.json({ success: true, demande: data })
  } catch(e) {
    console.error('Catch error:', e.message)
    return res.status(200).json({ success: true, fallback: true })
  }
}
