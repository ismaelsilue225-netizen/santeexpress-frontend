import { supabase } from '../../../lib/supabase'

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end()

  // Auth basique via Bearer token (phone stocké en token pour MVP)
  const auth = req.headers.authorization
  const phone = auth?.replace('Bearer ', '') || null

  try {
    let query = supabase.from('commandes').select('*').order('created_at', { ascending: false })
    if (phone) query = query.eq('telephone_client', phone)

    const { data, error } = await query.limit(20)
    if (error) return res.json({ commandes: [] })
    return res.json({ commandes: data || [] })
  } catch {
    return res.json({ commandes: [] })
  }
}
