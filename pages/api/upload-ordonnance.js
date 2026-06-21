import { supabase } from '../../lib/supabase'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  try {
    // Lire le fichier depuis le multipart/form-data
    const chunks = []
    for await (const chunk of req) chunks.push(chunk)
    const buffer = Buffer.concat(chunks)

    const contentType = req.headers['content-type'] || ''
    const boundaryMatch = contentType.match(/boundary=(.+)$/)
    if (!boundaryMatch) return res.status(400).json({ error: 'No boundary found' })

    const boundary = '--' + boundaryMatch[1]
    const parts = buffer.toString('binary').split(boundary)

    let fileBuffer = null
    let fileName = 'ordonnance.jpg'
    let mimeType = 'image/jpeg'

    for (const part of parts) {
      if (part.includes('filename=')) {
        const nameMatch = part.match(/filename="(.+?)"/)
        const typeMatch = part.match(/Content-Type: (.+)/)
        if (nameMatch) fileName = nameMatch[1]
        if (typeMatch) mimeType = typeMatch[1].trim()

        const headerEnd = part.indexOf('\r\n\r\n')
        if (headerEnd === -1) continue
        const dataStart = headerEnd + 4
        const dataEnd = part.lastIndexOf('\r\n')
        const binaryData = part.substring(dataStart, dataEnd)
        fileBuffer = Buffer.from(binaryData, 'binary')
      }
    }

    if (!fileBuffer) return res.status(400).json({ error: 'No file found' })

    const ext = fileName.split('.').pop() || 'jpg'
    const uniqueName = `ordonnance_${Date.now()}_${Math.random().toString(36).slice(2, 8)}.${ext}`

    const { data, error } = await supabase.storage
      .from('ordonnances')
      .upload(uniqueName, fileBuffer, {
        contentType: mimeType,
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
