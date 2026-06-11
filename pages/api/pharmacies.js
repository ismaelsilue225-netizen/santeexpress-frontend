import { supabase } from '../../lib/supabase'

const FALLBACK = [
  // ── PLATEAU ──────────────────────────────────────
  {id:1,  nom:"Pharmacie du Plateau",           district:"Plateau",     adresse:"Av. Botreau-Roussel, Plateau",              telephone:"27 20 21 24 78", est_ouvert:true,  est_garde:false, note:4.8},
  {id:2,  nom:"Pharmacie de la Paix",           district:"Plateau",     adresse:"Rue du Commerce, Plateau",                  telephone:"27 20 21 30 15", est_ouvert:true,  est_garde:false, note:4.6},
  {id:3,  nom:"Pharmacie Centrale",             district:"Plateau",     adresse:"Av. Lamblin, Plateau",                      telephone:"27 20 21 18 42", est_ouvert:true,  est_garde:true,  note:4.7},
  {id:4,  nom:"Pharmacie du Port",              district:"Plateau",     adresse:"Bd de la République, Plateau",              telephone:"27 20 21 55 90", est_ouvert:true,  est_garde:false, note:4.5},

  // ── COCODY ───────────────────────────────────────
  {id:5,  nom:"Pharmacie de la Riviera",        district:"Cocody",      adresse:"Riviera 2, face Station Total",             telephone:"27 22 43 12 34", est_ouvert:true,  est_garde:true,  note:4.9},
  {id:6,  nom:"Pharmacie Sainte Marie",         district:"Cocody",      adresse:"Rue des Jardins, Cocody",                   telephone:"27 22 44 20 10", est_ouvert:true,  est_garde:false, note:4.6},
  {id:7,  nom:"Pharmacie Angré 7e Tranche",     district:"Cocody",      adresse:"Angré 7e Tranche, près du château",         telephone:"27 22 52 18 76", est_ouvert:true,  est_garde:false, note:4.7},
  {id:8,  nom:"Pharmacie de Cocody",            district:"Cocody",      adresse:"Av. de l'Université, Cocody",               telephone:"27 22 44 35 67", est_ouvert:true,  est_garde:false, note:4.5},
  {id:9,  nom:"Pharmacie Bonoumin",             district:"Cocody",      adresse:"Bonoumin, Cocody",                          telephone:"27 22 51 44 23", est_ouvert:true,  est_garde:false, note:4.4},
  {id:10, nom:"Pharmacie Riviera Golf",         district:"Cocody",      adresse:"Riviera Golf, Cocody",                      telephone:"27 22 43 88 90", est_ouvert:true,  est_garde:true,  note:4.8},
  {id:11, nom:"Pharmacie II Plateaux Vallon",   district:"Cocody",      adresse:"Les 2 Plateaux Vallon, Cocody",             telephone:"27 22 41 77 55", est_ouvert:true,  est_garde:false, note:4.6},

  // ── YOPOUGON ─────────────────────────────────────
  {id:12, nom:"Pharmacie du Bonheur",           district:"Yopougon",    adresse:"Yopougon Attié, face mairie",               telephone:"27 23 50 12 45", est_ouvert:true,  est_garde:false, note:4.5},
  {id:13, nom:"Pharmacie Yopougon Maroc",       district:"Yopougon",    adresse:"Yopougon Maroc, rue principale",            telephone:"27 23 51 34 67", est_ouvert:true,  est_garde:true,  note:4.4},
  {id:14, nom:"Pharmacie Niangon Nord",         district:"Yopougon",    adresse:"Niangon Nord, Yopougon",                    telephone:"27 23 47 22 89", est_ouvert:true,  est_garde:false, note:4.3},
  {id:15, nom:"Pharmacie Sicogi",               district:"Yopougon",    adresse:"Cité Sicogi, Yopougon",                     telephone:"27 23 48 90 12", est_ouvert:true,  est_garde:false, note:4.4},
  {id:16, nom:"Pharmacie Selmer",               district:"Yopougon",    adresse:"Yopougon Selmer, Abidjan",                  telephone:"27 23 46 55 78", est_ouvert:false, est_garde:true,  note:4.2},
  {id:17, nom:"Pharmacie Wassakara",            district:"Yopougon",    adresse:"Wassakara, Yopougon",                       telephone:"27 23 53 11 34", est_ouvert:true,  est_garde:false, note:4.3},

  // ── ABOBO ────────────────────────────────────────
  {id:18, nom:"Pharmacie Abobo Centre",         district:"Abobo",       adresse:"Marché d'Abobo Centre",                     telephone:"27 22 37 14 56", est_ouvert:true,  est_garde:true,  note:4.3},
  {id:19, nom:"Pharmacie Avocatier",            district:"Abobo",       adresse:"Abobo Avocatier, Abidjan",                  telephone:"27 22 36 78 90", est_ouvert:true,  est_garde:false, note:4.2},
  {id:20, nom:"Pharmacie Abobo Baoulé",         district:"Abobo",       adresse:"Abobo Baoulé, rue du marché",               telephone:"27 22 38 23 45", est_ouvert:true,  est_garde:false, note:4.1},
  {id:21, nom:"Pharmacie Sogefiha",             district:"Abobo",       adresse:"Cité Sogefiha, Abobo",                      telephone:"27 22 35 67 89", est_ouvert:false, est_garde:false, note:4.0},
  {id:22, nom:"Pharmacie N'Dotré",              district:"Abobo",       adresse:"N'Dotré, Abobo",                            telephone:"27 22 39 44 12", est_ouvert:true,  est_garde:false, note:4.2},

  // ── ADJAMÉ ───────────────────────────────────────
  {id:23, nom:"Pharmacie Adjamé 220",           district:"Adjamé",      adresse:"Marché Adjamé 220",                         telephone:"27 20 37 45 67", est_ouvert:true,  est_garde:false, note:4.4},
  {id:24, nom:"Pharmacie du Marché",            district:"Adjamé",      adresse:"Grand Marché Adjamé",                       telephone:"27 20 38 12 34", est_ouvert:true,  est_garde:true,  note:4.3},
  {id:25, nom:"Pharmacie Williamsville",        district:"Adjamé",      adresse:"Williamsville, Adjamé",                     telephone:"27 20 36 89 01", est_ouvert:true,  est_garde:false, note:4.2},
  {id:26, nom:"Pharmacie Liberté",              district:"Adjamé",      adresse:"Bd de la Liberté, Adjamé",                  telephone:"27 20 37 56 78", est_ouvert:true,  est_garde:false, note:4.3},

  // ── MARCORY ──────────────────────────────────────
  {id:27, nom:"Pharmacie Marcory Réel",         district:"Marcory",     adresse:"Bd de Marseille, Zone 4",                   telephone:"27 21 35 23 45", est_ouvert:true,  est_garde:false, note:4.7},
  {id:28, nom:"Pharmacie Zone 4",               district:"Marcory",     adresse:"Zone 4, Marcory",                           telephone:"27 21 36 67 89", est_ouvert:true,  est_garde:true,  note:4.6},
  {id:29, nom:"Pharmacie Anoumabo",             district:"Marcory",     adresse:"Anoumabo, Marcory",                         telephone:"27 21 34 90 12", est_ouvert:true,  est_garde:false, note:4.4},
  {id:30, nom:"Pharmacie Kouté",                district:"Marcory",     adresse:"Rue des Jardins, Marcory",                  telephone:"27 21 33 34 56", est_ouvert:false, est_garde:false, note:4.3},

  // ── TREICHVILLE ──────────────────────────────────
  {id:31, nom:"Pharmacie Treichville",          district:"Treichville", adresse:"Bd Giscard d'Estaing, Treichville",         telephone:"27 21 24 12 34", est_ouvert:true,  est_garde:true,  note:4.5},
  {id:32, nom:"Pharmacie du Marché de Treich.", district:"Treichville", adresse:"Marché de Treichville",                     telephone:"27 21 25 45 67", est_ouvert:true,  est_garde:false, note:4.3},
  {id:33, nom:"Pharmacie Gabriel Dadié",        district:"Treichville", adresse:"Av. 13, Treichville",                       telephone:"27 21 23 78 90", est_ouvert:true,  est_garde:false, note:4.4},

  // ── KOUMASSI ─────────────────────────────────────
  {id:34, nom:"Pharmacie Koumassi Centre",      district:"Koumassi",    adresse:"Centre Commercial Koumassi",                telephone:"27 21 26 23 45", est_ouvert:true,  est_garde:false, note:4.5},
  {id:35, nom:"Pharmacie Remblai",              district:"Koumassi",    adresse:"Remblai, Koumassi",                         telephone:"27 21 27 56 78", est_ouvert:true,  est_garde:true,  note:4.4},
  {id:36, nom:"Pharmacie Grand Campement",      district:"Koumassi",    adresse:"Grand Campement, Koumassi",                 telephone:"27 21 28 89 01", est_ouvert:true,  est_garde:false, note:4.3},

  // ── PORT-BOUËT ───────────────────────────────────
  {id:37, nom:"Pharmacie Port-Bouët",           district:"Port-Bouët",  adresse:"Zone Aéroportuaire, Port-Bouët",            telephone:"27 21 32 12 34", est_ouvert:true,  est_garde:true,  note:4.6},
  {id:38, nom:"Pharmacie Vridi",                district:"Port-Bouët",  adresse:"Vridi, Port-Bouët",                         telephone:"27 21 30 45 67", est_ouvert:true,  est_garde:false, note:4.3},
  {id:39, nom:"Pharmacie Port-Bouët Village",   district:"Port-Bouët",  adresse:"Village, Port-Bouët",                       telephone:"27 21 31 78 90", est_ouvert:false, est_garde:false, note:4.1},

  // ── ATTÉCOUBÉ ────────────────────────────────────
  {id:40, nom:"Pharmacie Attécoubé",            district:"Attécoubé",   adresse:"Rue Princiale, Attécoubé",                  telephone:"27 20 45 12 34", est_ouvert:true,  est_garde:false, note:4.2},
  {id:41, nom:"Pharmacie New Bell",             district:"Attécoubé",   adresse:"New Bell, Attécoubé",                       telephone:"27 20 46 45 67", est_ouvert:true,  est_garde:true,  note:4.3},

  // ── BINGERVILLE ──────────────────────────────────
  {id:42, nom:"Pharmacie Bingerville",          district:"Bingerville", adresse:"Route de Bingerville, centre-ville",        telephone:"27 22 40 12 34", est_ouvert:true,  est_garde:false, note:4.2},
  {id:43, nom:"Pharmacie Sainte Famille",       district:"Bingerville", adresse:"Bingerville, Abidjan Est",                  telephone:"27 22 40 56 78", est_ouvert:false, est_garde:false, note:4.0},

  // ── SONGON ───────────────────────────────────────
  {id:44, nom:"Pharmacie Songon",               district:"Songon",      adresse:"Songon Agban, route principale",            telephone:"27 23 60 12 34", est_ouvert:true,  est_garde:false, note:4.0},

  // ── ANYAMA ───────────────────────────────────────
  {id:45, nom:"Pharmacie Anyama Centre",        district:"Anyama",      adresse:"Centre-ville Anyama",                       telephone:"27 22 34 45 67", est_ouvert:true,  est_garde:true,  note:4.1},
  {id:46, nom:"Pharmacie Anyama Adjamé",        district:"Anyama",      adresse:"Anyama Adjamé, route d'Anyama",             telephone:"27 22 33 78 90", est_ouvert:true,  est_garde:false, note:4.0},
]

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end()

  const { commune } = req.query

  try {
    let query = supabase.from('pharmacies').select('*').order('nom')
    if (commune) query = query.eq('district', commune)

    const { data, error } = await query
    if (error || !data?.length) {
      const result = commune ? FALLBACK.filter(p => p.district.toLowerCase() === commune.toLowerCase()) : FALLBACK
      return res.json({ pharmacies: result })
    }
    return res.json({ pharmacies: data })
  } catch {
    const result = commune ? FALLBACK.filter(p => p.district.toLowerCase() === commune.toLowerCase()) : FALLBACK
    return res.json({ pharmacies: result })
  }
}
