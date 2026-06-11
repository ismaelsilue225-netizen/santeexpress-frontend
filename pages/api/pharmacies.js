import { supabase } from '../../lib/supabase'

const FALLBACK = [
  {id:1, nom:"Pharmacie du Plateau", district:"Plateau", adresse:"Av. Botreau-Roussel", telephone:"", est_ouvert:true, est_garde:false, note:4.8},
  {id:2, nom:"Pharmacie Sainte Marie", district:"Cocody", adresse:"Rue des Jardins, Cocody", telephone:"", est_ouvert:true, est_garde:false, note:4.6},
  {id:3, nom:"Pharmacie de la Riviera", district:"Cocody", adresse:"Riviera 2, Abidjan", telephone:"", est_ouvert:true, est_garde:true, note:4.9},
  {id:4, nom:"Pharmacie du Bonheur", district:"Yopougon", adresse:"Yopougon-Attié", telephone:"", est_ouvert:true, est_garde:false, note:4.5},
  {id:5, nom:"Pharmacie Abobo Centre", district:"Abobo", adresse:"Marché d'Abobo Centre", telephone:"", est_ouvert:false, est_garde:true, note:4.3},
  {id:6, nom:"Pharmacie Marcory Réel", district:"Marcory", adresse:"Bd de Marseille, Marcory", telephone:"", est_ouvert:true, est_garde:false, note:4.7},
  {id:7, nom:"Pharmacie Adjamé 220", district:"Adjamé", adresse:"Marché Adjamé 220", telephone:"", est_ouvert:true, est_garde:false, note:4.4},
  {id:8, nom:"Pharmacie Port-Bouët", district:"Port-Bouët", adresse:"Zone Aéroportuaire", telephone:"", est_ouvert:true, est_garde:true, note:4.6},
  {id:9, nom:"Pharmacie Koumassi Centre", district:"Koumassi", adresse:"Centre Commercial Koumassi", telephone:"", est_ouvert:true, est_garde:false, note:4.5},
  {id:10, nom:"Pharmacie Angré 7e Tr.", district:"Cocody", adresse:"Angré 7e Tranche", telephone:"", est_ouvert:true, est_garde:false, note:4.7},
  {id:11, nom:"Pharmacie Treichville", district:"Treichville", adresse:"Bd Giscard d'Estaing", telephone:"", est_ouvert:true, est_garde:true, note:4.5},
  {id:12, nom:"Pharmacie Bingerville", district:"Bingerville", adresse:"Route de Bingerville", telephone:"", est_ouvert:false, est_garde:false, note:4.2},
]

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end()

  try {
    const { data, error } = await supabase.from('pharmacies').select('*').order('id')
    if (error || !data?.length) return res.json({ pharmacies: FALLBACK })
    return res.json({ pharmacies: data })
  } catch {
    return res.json({ pharmacies: FALLBACK })
  }
}
