import { supabase } from '../../lib/supabase'

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end()

  const { commune } = req.query

  try {
    let query = supabase.from('pharmacies').select('*').order('nom')
    if (commune) query = query.eq('district', commune)

    const { data, error } = await query

    if (error) {
      console.error('Supabase error:', error.message)
      return res.status(500).json({ error: error.message })
    }

    return res.json({ pharmacies: data || [] })
  } catch(e) {
    console.error('Catch error:', e.message)
    return res.status(500).json({ error: e.message })
