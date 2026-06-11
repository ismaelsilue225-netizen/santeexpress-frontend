import { supabase } from '../../lib/supabase'

// Données de secours si Supabase pas encore configuré
const FALLBACK = [
  {id:1, nom:"Paracétamol 500mg", categorie:"antidouleur", prix:500, unite:"Boîte 16 cp", emoji:"💊", description:"Antalgique et antipyrétique.", necessite_ordonnance:false, en_stock:true},
  {id:2, nom:"Ibuprofène 400mg", categorie:"antidouleur", prix:850, unite:"Boîte 14 cp", emoji:"💊", description:"Anti-inflammatoire non stéroïdien.", necessite_ordonnance:false, en_stock:true},
  {id:3, nom:"Doliprane 1000mg", categorie:"antidouleur", prix:950, unite:"Boîte 8 cp", emoji:"💊", description:"Paracétamol fort dosage pour adultes.", necessite_ordonnance:false, en_stock:true},
  {id:4, nom:"Vitamine C 1000mg", categorie:"vitamines", prix:1200, unite:"Boîte 30 cp", emoji:"🍊", description:"Renforce le système immunitaire.", necessite_ordonnance:false, en_stock:true},
  {id:5, nom:"Zinc + Vitamine D3", categorie:"vitamines", prix:2500, unite:"Flacon 60 gél.", emoji:"🌿", description:"Complexe vitamino-minéral.", necessite_ordonnance:false, en_stock:true},
  {id:6, nom:"Magnésium B6", categorie:"vitamines", prix:1800, unite:"Boîte 45 cp", emoji:"⚡", description:"Réduit la fatigue musculaire.", necessite_ordonnance:false, en_stock:true},
  {id:7, nom:"Amoxicilline 500mg", categorie:"antibio", prix:3500, unite:"Boîte 21 gél.", emoji:"🧬", description:"Antibiotique à large spectre.", necessite_ordonnance:true, en_stock:true},
  {id:8, nom:"Gel hydroalcoolique", categorie:"soin", prix:1000, unite:"Flacon 250ml", emoji:"🧴", description:"Désinfectant mains 70% alcool.", necessite_ordonnance:false, en_stock:true},
  {id:9, nom:"Sérum physiologique", categorie:"soin", prix:750, unite:"Boîte 30 unid.", emoji:"🩹", description:"Solution isotonique stérile.", necessite_ordonnance:false, en_stock:true},
  {id:10, nom:"Alcool médical 70°", categorie:"soin", prix:600, unite:"Flacon 250ml", emoji:"🧪", description:"Désinfection cutanée.", necessite_ordonnance:false, en_stock:true},
  {id:11, nom:"Masques chirurgicaux", categorie:"soin", prix:2000, unite:"Boîte 50 pcs", emoji:"😷", description:"Type IIR, norme EN 14683.", necessite_ordonnance:false, en_stock:true},
  {id:12, nom:"SRO Réhydratation", categorie:"soin", prix:300, unite:"Sachet x5", emoji:"💧", description:"Sels de réhydratation orale.", necessite_ordonnance:false, en_stock:true},
  {id:13, nom:"Couches bébé T3", categorie:"bebe", prix:5500, unite:"Paquet 44 pcs", emoji:"👶", description:"Ultra-absorbantes 4-9 kg.", necessite_ordonnance:false, en_stock:false},
  {id:14, nom:"Thermomètre digital", categorie:"materiel", prix:3000, unite:"1 pièce", emoji:"🌡️", description:"Résultat en 60 secondes.", necessite_ordonnance:false, en_stock:true},
]

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end()

  try {
    const { data, error } = await supabase.from('produits').select('*').order('id')
    if (error || !data?.length) return res.json({ produits: FALLBACK })
    return res.json({ produits: data })
  } catch {
    return res.json({ produits: FALLBACK })
  }
}
