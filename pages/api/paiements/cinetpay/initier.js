// Stub CinetPay — à connecter avec les vraies clés API CinetPay CI
// Doc officielle : https://developer.cinetpay.com/

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { commande_id, montant } = req.body

  // TODO: Remplacer par l'intégration CinetPay réelle
  // Clés à ajouter dans .env : CINETPAY_SITE_ID, CINETPAY_API_KEY
  const CINETPAY_SITE_ID = process.env.CINETPAY_SITE_ID || 'DEMO'
  const CINETPAY_API_KEY = process.env.CINETPAY_API_KEY || 'DEMO'

  if (CINETPAY_SITE_ID === 'DEMO') {
    // Mode démo — rediriger vers une page de confirmation fictive
    return res.json({
      payment_url: null,
      message: 'Mode démo — configurez CINETPAY_SITE_ID et CINETPAY_API_KEY dans Vercel',
      commande_id,
      montant,
    })
  }

  // Appel réel CinetPay
  try {
    const r = await fetch('https://api-checkout.cinetpay.com/v2/payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        apikey: CINETPAY_API_KEY,
        site_id: CINETPAY_SITE_ID,
        transaction_id: `PC-${commande_id}-${Date.now()}`,
        amount: montant,
        currency: 'XOF',
        description: `Commande SantéExpress #${commande_id}`,
        notify_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/paiements/webhook`,
        return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/confirmation`,
        channels: 'ALL',
        lang: 'fr',
      }),
    })
    const data = await r.json()
    return res.json({ payment_url: data?.data?.payment_url || null, raw: data })
  } catch (e) {
    return res.status(500).json({ error: 'Erreur CinetPay', detail: e.message })
  }
}
