import { supabase } from '../../lib/supabase'

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '8mb',
    },
  },
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  try {
    const { file, filename, contentType } = req.body
    if (!file) return res.status(400).json({ error: 'No file provided' })

    // file est une data URL: "data:image/jpeg;base64,/9j/4AAQ..."
    const matches = file.match(/^data:(.+);base64,(.+)$/)
    if (!matches) return res.status(400).json({ error: 'Invalid file format' })

    const mimeType = matches[1]
    const base64Data = matches[2]
    const buffer = Buffer.from(base64Data, 'base64')

    const ext = (filename || 'photo.jpg').split('.').pop() || 'jpg'
    const uniqueName = `ordonnance_${Date.now()}_${Math.random().toString(36).slice(2, 8)}.${ext}`

    const { data, error } = await supabase.storage
      .from('ordonnances')
      .upload(uniqueName, buffer, {
        contentType: contentType || mimeType,
        upsert: false,
      })

    if (error) {
      console.error('Upload error:', error.message)
      return res.status(500).json({ error: error.message })
    }

    const { data: urlData } = supabase.storage.from('ordonnances').getPublicUrl(uniqueName)

    return res.json({ url: urlData.publicUrl })
  } catch (e) {
    console.error('Catch error:', e.message)
    return res.status(500).json({ error: e.message })
  }
}
