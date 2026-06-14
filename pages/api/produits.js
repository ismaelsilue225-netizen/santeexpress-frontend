import { supabase } from '../../lib/supabase'

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end()

  try {
    const { data, error } = await supabase
      .from('produits')
      .select('*')
      .order('nom')

    if (error) {
      console.error('Supabase error:', error.message)
      return res.status(500).json({ error: error.message })
    }

    return res.json({ produits: data || [] })
  } catch(e) {
    console.error('Catch error:', e.message)
    return res.status(500).json({ error: e.message })
  }
}
