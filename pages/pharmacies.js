import { supabase } from '../../lib/supabase'

const FALLBACK = [

  // ══════════════════════════════════════════
  // PLATEAU
  // ══════════════════════════════════════════
  {id:1,  nom:"Pharmacie du Plateau",           district:"Plateau", adresse:"Av. Botreau-Roussel, Plateau",                      telephone:"+225 20 21 24 78", est_ouvert:true,  est_garde:false, note:4.8},
  {id:2,  nom:"Pharmacie de la Paix",           district:"Plateau", adresse:"Rue du Commerce, Plateau",                          telephone:"+225 20 21 30 15", est_ouvert:true,  est_garde:false, note:4.6},
  {id:3,  nom:"Pharmacie Centrale",             district:"Plateau", adresse:"Av. Lamblin, Plateau",                              telephone:"+225 20 21 18 42", est_ouvert:true,  est_garde:true,  note:4.7},
  {id:4,  nom:"Pharmacie du Port",              district:"Plateau", adresse:"Bd de la République, Plateau",                     telephone:"+225 20 21 55 90", est_ouvert:true,  est_garde:false, note:4.5},

  // ══════════════════════════════════════════
  // COCODY — 65 pharmacies réelles
  // ══════════════════════════════════════════
  {id:5,  nom:"Pharmacie Comoé",                district:"Cocody",  adresse:"Cocody, Cité des Arts, à côté École de Gendarmerie",telephone:"+225 22 44 28 81", est_ouvert:true,  est_garde:false, note:4.5},
  {id:6,  nom:"Pharmacie de Blockhauss",        district:"Cocody",  adresse:"Cocody, Blockhauss",                               telephone:"+225 22 48 68 91", est_ouvert:true,  est_garde:false, note:4.3},
  {id:7,  nom:"Pharmacie de Cocody",            district:"Cocody",  adresse:"Cocody, petit marché de Cocody",                   telephone:"+225 22 44 24 95", est_ouvert:true,  est_garde:false, note:4.4},
  {id:8,  nom:"Pharmacie de la Cité",           district:"Cocody",  adresse:"Cocody Danga, à côté Cité Rouge",                  telephone:"+225 22 44 63 68", est_ouvert:true,  est_garde:false, note:4.3},
  {id:9,  nom:"Pharmacie de l'Ivoire",          district:"Cocody",  adresse:"Cocody, parking Hôtel Ivoire",                     telephone:"+225 22 44 63 12", est_ouvert:true,  est_garde:false, note:4.6},
  {id:10, nom:"Pharmacie Notre Dame de Fatima", district:"Cocody",  adresse:"Plateau Dokui, face Paroisse Ste Monique",         telephone:"+225 24 00 19 08", est_ouvert:true,  est_garde:false, note:4.4},
  {id:11, nom:"Pharmacie des Arts",             district:"Cocody",  adresse:"Cocody, centre commercial Cité des Arts",          telephone:"+225 22 44 95 67", est_ouvert:true,  est_garde:false, note:4.4},
  {id:12, nom:"Pharmacie Les 7 Colonnes",       district:"Cocody",  adresse:"Cocody, Blvd des Martyrs, face SODEMI",            telephone:"+225 22 44 02 96", est_ouvert:true,  est_garde:false, note:4.3},
  {id:13, nom:"Pharmacie Les Mimosas",          district:"Cocody",  adresse:"Cocody, Blvd Mitterrand, face SODEFOR",            telephone:"+225 22 44 32 28", est_ouvert:true,  est_garde:false, note:4.3},
  {id:14, nom:"Pharmacie Saint Dominique",      district:"Cocody",  adresse:"Cocody, angle face Lycée Mermoz",                  telephone:"+225 22 48 79 89", est_ouvert:true,  est_garde:false, note:4.4},
  {id:15, nom:"Pharmacie Saint François Danga", district:"Cocody",  adresse:"Cocody, Danga, à côté Nid de Cocody",              telephone:"+225 22 48 54 08", est_ouvert:true,  est_garde:false, note:4.2},
  {id:16, nom:"Pharmacie Saint Jean",           district:"Cocody",  adresse:"Cocody, Blvd des Martyrs, face Cité Rouge",        telephone:"+225 22 44 62 49", est_ouvert:true,  est_garde:true,  note:4.6},
  {id:17, nom:"Pharmacie Sainte Marie",         district:"Cocody",  adresse:"Cocody, à côté maison PDCI",                      telephone:"+225 22 48 69 20", est_ouvert:true,  est_garde:false, note:4.5},
  {id:18, nom:"Pharmacie de la Corniche",       district:"Cocody",  adresse:"Cocody",                                           telephone:"+225 22 48 73 40", est_ouvert:true,  est_garde:false, note:4.3},
  {id:19, nom:"Pharmacie du Lycée Technique",   district:"Cocody",  adresse:"Cocody, direction Lycée technique",                telephone:"+225 22 44 60 77", est_ouvert:true,  est_garde:false, note:4.2},
  {id:20, nom:"Pharmacie du Palm Club",         district:"Cocody",  adresse:"Cocody, route du Lycée technique",                 telephone:"+225 22 44 20 90", est_ouvert:true,  est_garde:false, note:4.3},
  {id:21, nom:"Pharmacie Andy",                 district:"Cocody",  adresse:"Cocody, Riviera Golf, carrefour Leader Price",     telephone:"+225 22 43 25 80", est_ouvert:true,  est_garde:false, note:4.5},
  {id:22, nom:"Pharmacie Bel Epine",            district:"Cocody",  adresse:"Cocody, Jardins de la Riviera, face petite mosquée",telephone:"+225 22 43 34 31",est_ouvert:true,  est_garde:false, note:4.3},
  {id:23, nom:"Pharmacie de la Riviera",        district:"Cocody",  adresse:"Cocody, grand carrefour Riviera II",               telephone:"+225 22 43 28 44", est_ouvert:true,  est_garde:true,  note:4.8},
  {id:24, nom:"Pharmacie de la Riviera III",    district:"Cocody",  adresse:"Cocody, Riviera III, face Lycée américain",        telephone:"+225 22 47 60 06", est_ouvert:true,  est_garde:false, note:4.6},
  {id:25, nom:"Pharmacie de l'Oasis de Paix",   district:"Cocody",  adresse:"Cocody, Blvd Mitterrand, dépôt SOTRA, Campus",    telephone:"+225 22 48 92 08", est_ouvert:true,  est_garde:false, note:4.3},
  {id:26, nom:"Pharmacie de M'Pouto",           district:"Cocody",  adresse:"Cocody, Riviera M'Pouto, CIAD PROMO",              telephone:"+225 22 43 12 73", est_ouvert:true,  est_garde:false, note:4.2},
  {id:27, nom:"Pharmacie du Golf",              district:"Cocody",  adresse:"Cocody, centre commercial du Golf",                telephone:"+225 22 43 14 31", est_ouvert:true,  est_garde:false, note:4.5},
  {id:28, nom:"Pharmacie Les Elias",            district:"Cocody",  adresse:"Cocody, Riviera Golf, face terrain de sport",      telephone:"+225 22 43 28 85", est_ouvert:true,  est_garde:false, note:4.4},
  {id:29, nom:"Pharmacie Notre Dame des Grâces",district:"Cocody",  adresse:"Cocody, à côté petite mosquée de la Riviera",     telephone:"+225 22 43 61 96", est_ouvert:true,  est_garde:false, note:4.3},
  {id:30, nom:"Pharmacie Saint Ange",           district:"Cocody",  adresse:"Cocody, Riviera II, route d'Attoban",              telephone:"+225 22 43 45 04", est_ouvert:true,  est_garde:true,  note:4.7},
  {id:31, nom:"Pharmacie Saint Athanase",       district:"Cocody",  adresse:"Cocody, Riviera Anono",                            telephone:"+225 22 43 55 87", est_ouvert:true,  est_garde:false, note:4.2},
  {id:32, nom:"Pharmacie Saint Bernard",        district:"Cocody",  adresse:"Cocody, Riviera Attoban, à côté Cipharm",         telephone:"+225 22 43 65 46", est_ouvert:true,  est_garde:false, note:4.3},
  {id:33, nom:"Pharmacie Saint Pierre d'Anono", district:"Cocody",  adresse:"Cocody, Riviera Anono",                            telephone:"+225 22 43 90 56", est_ouvert:true,  est_garde:false, note:4.2},
  {id:34, nom:"Pharmacie Saint Pierre des Rosées",district:"Cocody",adresse:"Cocody, Riviera Allabra, face Clinique Panthéon",  telephone:"+225 22 47 42 17", est_ouvert:true,  est_garde:false, note:4.3},
  {id:35, nom:"Pharmacie Sainte Famille",       district:"Cocody",  adresse:"Cocody, Riviera Allabra, à côté église Ste Famille",telephone:"+225 22 47 76 76",est_ouvert:true,  est_garde:false, note:4.4},
  {id:36, nom:"Pharmacie 2 Plateaux Agban",     district:"Cocody",  adresse:"Cocody, à côté hôpital des impôts",               telephone:"+225 22 41 39 90", est_ouvert:true,  est_garde:false, note:4.3},
  {id:37, nom:"Pharmacie Arc en Ciel",          district:"Cocody",  adresse:"Cocody, II Plateaux, Rue des Jardins",             telephone:"+225 22 41 20 67", est_ouvert:true,  est_garde:false, note:4.2},
  {id:38, nom:"Pharmacie Aurore",               district:"Cocody",  adresse:"Cocody, Vallons, à côté Clinique AMI",             telephone:"+225 22 41 18 08", est_ouvert:true,  est_garde:false, note:4.3},
  {id:39, nom:"Pharmacie de la 7e Tranche",     district:"Cocody",  adresse:"Cocody, II Plateaux, 7e tranche",                  telephone:"+225 22 52 56 83", est_ouvert:true,  est_garde:false, note:4.4},
  {id:40, nom:"Pharmacie des Deux Plateaux",    district:"Cocody",  adresse:"Cocody, Blvd des Martyrs, entre Oil Libya et SOCOCE",telephone:"+225 22 41 36 04",est_ouvert:true, est_garde:false, note:4.5},
  {id:41, nom:"Pharmacie des 7 Lys",            district:"Cocody",  adresse:"Cocody, II Plateaux 7e tranche, feu Lubafrique",   telephone:"+225 22 42 27 20", est_ouvert:true,  est_garde:false, note:4.3},
  {id:42, nom:"Pharmacie des Grâces",           district:"Cocody",  adresse:"Cocody, derrière Gendarmerie Agban, vers II Plateaux",telephone:"+225 22 41 24 27",est_ouvert:true,est_garde:false, note:4.2},
  {id:43, nom:"Pharmacie des Jardins",          district:"Cocody",  adresse:"Cocody, II Plateaux, Rue des Jardins",             telephone:"+225 22 41 17 70", est_ouvert:true,  est_garde:false, note:4.3},
  {id:44, nom:"Pharmacie des Lauréades",        district:"Cocody",  adresse:"Cocody, II Plateaux, 7e tranche",                  telephone:"+225 22 42 48 10", est_ouvert:true,  est_garde:false, note:4.2},
  {id:45, nom:"Pharmacie Divin Amour",          district:"Cocody",  adresse:"Cocody, Blvd des Martyrs, carrefour Macaci",       telephone:"+225 22 41 93 38", est_ouvert:true,  est_garde:false, note:4.3},
  {id:46, nom:"Pharmacie du Vallon",            district:"Cocody",  adresse:"Cocody, centre commercial Vallon",                 telephone:"+225 22 41 35 14", est_ouvert:true,  est_garde:false, note:4.4},
  {id:47, nom:"Pharmacie Dunia",                district:"Cocody",  adresse:"Cocody, carrefour rue L30 et L23, près commissariat",telephone:"+225 22 52 99 99",est_ouvert:true, est_garde:false, note:4.3},
  {id:48, nom:"Pharmacie Espace Santé",         district:"Cocody",  adresse:"Cocody, Blvd des Martyrs, carrefour Duncan",       telephone:"+225 22 41 21 03", est_ouvert:true,  est_garde:false, note:4.4},
  {id:49, nom:"Pharmacie Las Palmas",           district:"Cocody",  adresse:"Cocody, carrefour Las Palmas et Aghien",           telephone:"+225 22 42 14 79", est_ouvert:true,  est_garde:false, note:4.2},
  {id:50, nom:"Pharmacie Latrille",             district:"Cocody",  adresse:"Cocody, Blvd des Martyrs, face ENA",               telephone:"+225 22 41 03 68", est_ouvert:true,  est_garde:false, note:4.3},
  {id:51, nom:"Pharmacie Les Halles",           district:"Cocody",  adresse:"Cocody, Blvd des Martyrs, espace Latrille, SOCOCE",telephone:"+225 22 41 92 94", est_ouvert:true,  est_garde:false, note:4.4},
  {id:52, nom:"Pharmacie Les Tulipes",          district:"Cocody",  adresse:"Cocody, Blvd des Martyrs, face mosquée Aghien",    telephone:"+225 22 42 50 17", est_ouvert:true,  est_garde:false, note:4.3},
  {id:53, nom:"Pharmacie Notre Dame de la Visitation",district:"Cocody",adresse:"Cocody, face commissariat 12e arr.",           telephone:"+225 22 41 26 08", est_ouvert:true,  est_garde:false, note:4.2},
  {id:54, nom:"Pharmacie Saint Joseph",         district:"Cocody",  adresse:"Cocody, Rue des Jardins, face Clinique Les Bleuets",telephone:"+225 22 41 10 20",est_ouvert:true,  est_garde:false, note:4.4},
  {id:55, nom:"Pharmacie Sainte Trinité",       district:"Cocody",  adresse:"Cocody, II Plateaux, route AGBAN, 200m Oil Libya", telephone:"+225 22 41 68 88", est_ouvert:true,  est_garde:false, note:4.3},
  {id:56, nom:"Pharmacie Santé de Vie",         district:"Cocody",  adresse:"Cocody, II Plateaux, les Perles, Cité Sanon",      telephone:"+225 22 42 05 22", est_ouvert:true,  est_garde:false, note:4.2},
  {id:57, nom:"Pharmacie Bel Horizon",          district:"Cocody",  adresse:"Cocody, Angré, après station Pétro Ivoire",        telephone:"+225 22 52 24 19", est_ouvert:true,  est_garde:false, note:4.5},
  {id:58, nom:"Pharmacie de la 8e Tranche",     district:"Cocody",  adresse:"Cocody, Angré 8e tranche, Résidence Soleil I",     telephone:"+225 22 52 34 90", est_ouvert:true,  est_garde:false, note:4.3},
  {id:59, nom:"Pharmacie de la Djibi",          district:"Cocody",  adresse:"Cocody, La Djibi, face marché",                    telephone:"+225 22 52 23 76", est_ouvert:true,  est_garde:false, note:4.2},
  {id:60, nom:"Pharmacie des Allées",           district:"Cocody",  adresse:"Cocody Angré, Caféiers 7",                         telephone:"+225 22 42 14 58", est_ouvert:true,  est_garde:false, note:4.3},
  {id:61, nom:"Pharmacie du Bien-Être",         district:"Cocody",  adresse:"Cocody, Angré 8e tranche, Résidence Soleil III",   telephone:"+225 22 50 25 34", est_ouvert:true,  est_garde:false, note:4.2},
  {id:62, nom:"Pharmacie Fandasso",             district:"Cocody",  adresse:"Cocody, Cité Fandasso",                            telephone:"+225 21 00 18 16", est_ouvert:true,  est_garde:false, note:4.1},
  {id:63, nom:"Pharmacie Hermès",               district:"Cocody",  adresse:"Cocody, 9e tranche, Star 12, à côté CNPS",         telephone:"+225 22 50 10 32", est_ouvert:true,  est_garde:false, note:4.3},
  {id:64, nom:"Pharmacie Les Arcades",          district:"Cocody",  adresse:"Cocody, La Djibi, Les Arcades, terminus bus 305",  telephone:"+225 22 50 62 25", est_ouvert:true,  est_garde:false, note:4.4},
  {id:65, nom:"Pharmacie Les Arums",            district:"Cocody",  adresse:"Cocody, 9e tranche, route Riviera Palmeraie",      telephone:"+225 22 52 74 08", est_ouvert:true,  est_garde:false, note:4.2},
  {id:66, nom:"Pharmacie Luminance K",          district:"Cocody",  adresse:"Cocody, 500m marché Angré et centre communautaire",telephone:"+225 22 50 49 26", est_ouvert:true,  est_garde:false, note:4.3},
  {id:67, nom:"Pharmacie Sainte Harmony",       district:"Cocody",  adresse:"Cocody, Angré, La Djibi",                          telephone:"+225 22 52 39 97", est_ouvert:true,  est_garde:true,  note:4.6},
  {id:68, nom:"Pharmacie du Boulevard de France",district:"Cocody", adresse:"Cocody Saint Jean, Boulevard de France",           telephone:"+225 22 44 74 08", est_ouvert:true,  est_garde:false, note:4.5},
  {id:69, nom:"Pharmacie Le Bonheur",           district:"Cocody",  adresse:"Riviera Palmeraie, Marché Cocody",                 telephone:"+225 22 47 02 88", est_ouvert:true,  est_garde:false, note:4.4},

  // ══════════════════════════════════════════
  // YOPOUGON — 84 pharmacies réelles
  // ══════════════════════════════════════════
  {id:70, nom:"Pharmacie Assonvon",             district:"Yopougon",adresse:"Yopougon, à côté Hôtel Assonvon",                  telephone:"+225 23 45 44 55", est_ouvert:true,  est_garde:false, note:4.3},
  {id:71, nom:"Pharmacie Baïty",                district:"Yopougon",adresse:"Yopougon, entre BAE et escadron de gendarmerie",   telephone:"+225 23 51 77 98", est_ouvert:true,  est_garde:false, note:4.2},
  {id:72, nom:"Pharmacie Belle Fontaine",       district:"Yopougon",adresse:"Yopougon, SICOGI, prolongement rue pâtisserie",    telephone:"+225 23 51 50 55", est_ouvert:true,  est_garde:false, note:4.3},
  {id:73, nom:"Pharmacie Beraca",               district:"Yopougon",adresse:"Yopougon, Petit Toits Rouges, carrefour Chapou",   telephone:"+225 23 45 06 52", est_ouvert:true,  est_garde:false, note:4.1},
  {id:74, nom:"Pharmacie Camp Militaire",       district:"Yopougon",adresse:"Yopougon, Petit Toits Rouges, face CNPS",          telephone:"+225 23 51 65 10", est_ouvert:true,  est_garde:false, note:4.2},
  {id:75, nom:"Pharmacie Carrefour Koweit",     district:"Yopougon",adresse:"Yopougon, Koweit",                                 telephone:"+225 23 45 84 07", est_ouvert:true,  est_garde:false, note:4.1},
  {id:76, nom:"Pharmacie de la Cité",           district:"Yopougon",adresse:"Yopougon, face sapeurs pompiers, direction BAE",   telephone:"+225 23 45 87 32", est_ouvert:true,  est_garde:false, note:4.2},
  {id:77, nom:"Pharmacie de la Mairie",         district:"Yopougon",adresse:"Yopougon, Selmer, face maquis Tantie Margot",     telephone:"+225 23 52 43 06", est_ouvert:true,  est_garde:true,  note:4.4},
  {id:78, nom:"Pharmacie du Carmel",            district:"Yopougon",adresse:"Yopougon, carrefour Kouté, église Saint Laurent",  telephone:"+225 23 53 16 32", est_ouvert:true,  est_garde:false, note:4.3},
  {id:79, nom:"Pharmacie du Cinéma Boissy",     district:"Yopougon",adresse:"Yopougon, Toits Rouges, côté commissariat 19e",   telephone:"+225 23 45 65 59", est_ouvert:true,  est_garde:false, note:4.1},
  {id:80, nom:"Pharmacie du Lavage",            district:"Yopougon",adresse:"Yopougon, route de Selmer, à côté bloc célibataire",telephone:"+225 23 50 25 40",est_ouvert:true,  est_garde:false, note:4.0},
  {id:81, nom:"Pharmacie Eden",                 district:"Yopougon",adresse:"Yopougon, Toits Rouges, carrefour AWA",            telephone:"+225 23 53 12 15", est_ouvert:true,  est_garde:true,  note:4.5},
  {id:82, nom:"Pharmacie Keneya",               district:"Yopougon",adresse:"Yopougon, carrefour Keneya",                       telephone:"+225 23 45 44 65", est_ouvert:true,  est_garde:false, note:4.2},
  {id:83, nom:"Pharmacie Kouté",                district:"Yopougon",adresse:"Yopougon, Kouté",                                  telephone:"+225 23 45 39 39", est_ouvert:true,  est_garde:false, note:4.3},
  {id:84, nom:"Pharmacie Laoulo",               district:"Yopougon",adresse:"Yopougon, Nouveau Quartier, voie express, SODECI", telephone:"+225 23 46 57 98", est_ouvert:true,  est_garde:false, note:4.1},
  {id:85, nom:"Pharmacie Les Béatitudes",       district:"Yopougon",adresse:"Yopougon, Nouveau Quartier",                       telephone:"+225 23 52 27 47", est_ouvert:true,  est_garde:false, note:4.2},
  {id:86, nom:"Pharmacie Les Oliviers",         district:"Yopougon",adresse:"Yopougon, carrefour Institut des Aveugles",        telephone:"+225 23 45 09 62", est_ouvert:true,  est_garde:false, note:4.1},
  {id:87, nom:"Pharmacie Nankoko",              district:"Yopougon",adresse:"Yopougon, Camp Militaire",                         telephone:"+225 23 45 24 80", est_ouvert:true,  est_garde:false, note:4.0},
  {id:88, nom:"Pharmacie Nouveau Quartier",     district:"Yopougon",adresse:"Yopougon, Nouveau Quartier, 50m du stade",         telephone:"+225 23 45 00 85", est_ouvert:true,  est_garde:false, note:4.2},
  {id:89, nom:"Pharmacie Nouvelle Gabriel Gare",district:"Yopougon",adresse:"Yopougon, à côté gare Gabriel",                   telephone:"+225 23 50 50 23", est_ouvert:true,  est_garde:false, note:4.1},
  {id:90, nom:"Pharmacie Saint André",          district:"Yopougon",adresse:"Yopougon, carrefour Saint André, direction PMI",   telephone:"+225 23 46 58 77", est_ouvert:true,  est_garde:false, note:4.2},
  {id:91, nom:"Pharmacie Saint Laurent",        district:"Yopougon",adresse:"Yopougon, Camp Militaire, Chapouli Center",       telephone:"+225 23 50 48 79", est_ouvert:true,  est_garde:false, note:4.3},
  {id:92, nom:"Pharmacie Sainte Rita",          district:"Yopougon",adresse:"Yopougon, carrefour Sables",                      telephone:"+225 23 45 28 77", est_ouvert:true,  est_garde:true,  note:4.5},
  {id:93, nom:"Pharmacie Segaï",                district:"Yopougon",adresse:"Yopougon, à côté FSU Wassakara",                  telephone:"+225 23 52 21 10", est_ouvert:true,  est_garde:false, note:4.2},
  {id:94, nom:"Pharmacie Selmer",               district:"Yopougon",adresse:"Yopougon, Selmer, carrefour Baron, 100m mairie",  telephone:"+225 23 46 11 63", est_ouvert:true,  est_garde:false, note:4.3},
  {id:95, nom:"Pharmacie Tizra",                district:"Yopougon",adresse:"Yopougon, Toits Rouges",                          telephone:"+225 23 50 04 07", est_ouvert:true,  est_garde:false, note:4.1},
  {id:96, nom:"Pharmacie Toits Rouges",         district:"Yopougon",adresse:"Yopougon, Toits Rouges",                          telephone:"+225 23 45 16 93", est_ouvert:true,  est_garde:false, note:4.3},
  {id:97, nom:"Pharmacie Wassakara",            district:"Yopougon",adresse:"Yopougon, Rue Princesse, à côté Cité SIB",        telephone:"+225 23 45 08 14", est_ouvert:true,  est_garde:false, note:4.2},
  {id:98, nom:"Pharmacie William Ponty",        district:"Yopougon",adresse:"Yopougon, carrefour Collège William Ponty",        telephone:"+225 23 50 86 11", est_ouvert:true,  est_garde:false, note:4.3},
  {id:99, nom:"Pharmacie des 3 Ponts",          district:"Yopougon",adresse:"Yopougon, Sogefia, face PMI Yopougon Attié",      telephone:"+225 23 45 43 70", est_ouvert:true,  est_garde:false, note:4.2},
  {id:100,nom:"Pharmacie Artemia",              district:"Yopougon",adresse:"Yopougon, face Palais de Justice",                telephone:"+225 23 52 38 54", est_ouvert:true,  est_garde:false, note:4.3},
  {id:101,nom:"Pharmacie Celia",                district:"Yopougon",adresse:"Yopougon, Banco, route CHU Yopougon",             telephone:"+225 23 45 92 34", est_ouvert:true,  est_garde:false, note:4.1},
  {id:102,nom:"Pharmacie de l'Antenne",         district:"Yopougon",adresse:"Yopougon, face Côte d'Ivoire Télécom",            telephone:"+225 23 50 15 27", est_ouvert:true,  est_garde:false, note:4.2},
  {id:103,nom:"Pharmacie Divine Grâce",         district:"Yopougon",adresse:"Yopougon, CHU, entrée Port-Bouët II",             telephone:"+225 23 46 79 17", est_ouvert:true,  est_garde:false, note:4.3},
  {id:104,nom:"Pharmacie du Cénacle",           district:"Yopougon",adresse:"Yopougon, sortie 3e Pont, à côté CHU Yopougon",  telephone:"+225 23 52 23 23", est_ouvert:true,  est_garde:true,  note:4.6},
  {id:105,nom:"Pharmacie La Maison Blanche",    district:"Yopougon",adresse:"Yopougon, Attié, rue P60, face station Royal",    telephone:"+225 23 51 47 46", est_ouvert:true,  est_garde:false, note:4.2},
  {id:106,nom:"Pharmacie Nissi",                district:"Yopougon",adresse:"Yopougon, Sopim, à côté marché Groupement Foncier",telephone:"+225 23 53 02 06",est_ouvert:true,  est_garde:false, note:4.1},
  {id:107,nom:"Pharmacie Phénix",               district:"Yopougon",adresse:"Yopougon, Port-Bouët II, carrefour Allocodrome",  telephone:"+225 23 45 22 00", est_ouvert:true,  est_garde:false, note:4.2},
  {id:108,nom:"Pharmacie Port-Bouët II",        district:"Yopougon",adresse:"Yopougon, carrefour Port-Bouët II",               telephone:"+225 23 46 69 53", est_ouvert:true,  est_garde:false, note:4.1},
  {id:109,nom:"Pharmacie Roxanne",              district:"Yopougon",adresse:"Yopougon, quartier CIE, derrière Clinique Grand Centre",telephone:"+225 23 45 70 75",est_ouvert:true,est_garde:false,note:4.2},
  {id:110,nom:"Pharmacie Saint Christophe",     district:"Yopougon",adresse:"Yopougon, à gauche station Petro Ivoire",         telephone:"+225 22 42 55 62", est_ouvert:true,  est_garde:false, note:4.3},
  {id:111,nom:"Pharmacie Saint Clément",        district:"Yopougon",adresse:"Yopougon, face CHU Yopougon",                     telephone:"+225 23 46 62 36", est_ouvert:true,  est_garde:true,  note:4.5},
  {id:112,nom:"Pharmacie Saint Martin",         district:"Yopougon",adresse:"Yopougon, SIDECI",                                telephone:"+225 23 51 96 46", est_ouvert:true,  est_garde:false, note:4.2},
  {id:113,nom:"Pharmacie Saint Raphaël",        district:"Yopougon",adresse:"Yopougon, à côté Clinique Sainte Rita",           telephone:"+225 02 03 65 84", est_ouvert:true,  est_garde:false, note:4.3},
  {id:114,nom:"Pharmacie Sainte Aude",          district:"Yopougon",adresse:"Yopougon, Banco 2, Nouveau Goudron, face marché gouro",telephone:"+225 23 52 28 87",est_ouvert:true,est_garde:false,note:4.1},
  {id:115,nom:"Pharmacie Shalom",               district:"Yopougon",adresse:"Yopougon, SOGEPHIA, pont vagabond, derrière PMI", telephone:"+225 23 53 08 73", est_ouvert:true,  est_garde:false, note:4.0},
  {id:116,nom:"Pharmacie Tereza",               district:"Yopougon",adresse:"Yopougon, SICOGI",                                telephone:"+225 23 50 88 56", est_ouvert:true,  est_garde:false, note:4.2},
  {id:117,nom:"Pharmacie Valors",               district:"Yopougon",adresse:"Yopougon, Nouveau Marché Port-Bouët II",          telephone:"+225 23 51 80 41", est_ouvert:true,  est_garde:false, note:4.1},
  {id:118,nom:"Pharmacie Alicia",               district:"Yopougon",adresse:"Yopougon, Ananeraie, route de Dabou",             telephone:"+225 23 45 11 52", est_ouvert:true,  est_garde:false, note:4.2},
  {id:119,nom:"Pharmacie Ananeraie",            district:"Yopougon",adresse:"Yopougon, Ananeraie",                             telephone:"+225 23 50 87 32", est_ouvert:true,  est_garde:false, note:4.1},
  {id:120,nom:"Pharmacie Beyniouah",            district:"Yopougon",adresse:"Yopougon, Niangon Sud",                           telephone:"+225 23 46 01 02", est_ouvert:true,  est_garde:false, note:4.2},
  {id:121,nom:"Pharmacie Che N'Tale",           district:"Yopougon",adresse:"Yopougon, Ananeraie, carrefour Guichanrolain",    telephone:"+225 23 52 62 03", est_ouvert:true,  est_garde:false, note:4.1},
  {id:122,nom:"Pharmacie Cité Maroc",           district:"Yopougon",adresse:"Yopougon, Maroc",                                 telephone:"+225 23 51 87 58", est_ouvert:true,  est_garde:false, note:4.3},
  {id:123,nom:"Pharmacie d'Andokoi",            district:"Yopougon",adresse:"Yopougon Andokoi, face Lycée municipal",          telephone:"+225 23 50 95 02", est_ouvert:true,  est_garde:false, note:4.2},
  {id:124,nom:"Pharmacie de Gesco",             district:"Yopougon",adresse:"Yopougon, route de Dabou, face marché GESCO",     telephone:"+225 23 46 99 58", est_ouvert:true,  est_garde:false, note:4.2},
  {id:125,nom:"Pharmacie de l'Autoroute",       district:"Yopougon",adresse:"Yopougon, Gesco, terminus bus 34, Brigade auto.", telephone:"+225 23 52 61 75", est_ouvert:true,  est_garde:false, note:4.3},
  {id:126,nom:"Pharmacie de l'Horeb",           district:"Yopougon",adresse:"Yopougon, Sideci Lem, carrefour SGBCI",           telephone:"+225 23 51 88 89", est_ouvert:true,  est_garde:false, note:4.1},
  {id:127,nom:"Pharmacie du Carrefour Boby",    district:"Yopougon",adresse:"Yopougon, Niangon, base CIE",                     telephone:"+225 23 52 16 39", est_ouvert:true,  est_garde:false, note:4.2},
  {id:128,nom:"Pharmacie du Jubilé",            district:"Yopougon",adresse:"Yopougon, route de Dabou, face marché Bagnon",    telephone:"+225 01 05 26 10", est_ouvert:true,  est_garde:false, note:4.1},
  {id:129,nom:"Pharmacie du Progrès",           district:"Yopougon",adresse:"Yopougon, Maroc, 50m station Ivoire Oil",         telephone:"+225 23 46 59 02", est_ouvert:true,  est_garde:false, note:4.2},
  {id:130,nom:"Pharmacie Esther",               district:"Yopougon",adresse:"Yopougon, Niangon Sud à Droite, clinique La Rose",telephone:"+225 23 46 39 36", est_ouvert:true,  est_garde:false, note:4.3},
  {id:131,nom:"Pharmacie Gnimah",               district:"Yopougon",adresse:"Yopougon, Port-Bouët II, à côté ancienne station",telephone:"+225 23 46 54 89", est_ouvert:true,  est_garde:false, note:4.1},
  {id:132,nom:"Pharmacie Jean-Pierre",          district:"Yopougon",adresse:"Yopougon, Niangon Sud à Droite, terminus bus 39", telephone:"+225 23 46 30 03", est_ouvert:true,  est_garde:false, note:4.2},
  {id:133,nom:"Pharmacie La Délivrance",        district:"Yopougon",adresse:"Yopougon, Zone Industrielle",                     telephone:"+225 23 51 13 79", est_ouvert:true,  est_garde:false, note:4.1},
  {id:134,nom:"Pharmacie Lagoma",               district:"Yopougon",adresse:"Yopougon, Niangon Académie",                      telephone:"+225 23 52 70 70", est_ouvert:true,  est_garde:false, note:4.3},
  {id:135,nom:"Pharmacie Le Jourdain",          district:"Yopougon",adresse:"Yopougon, Niangon Nord, route Cité Verte",        telephone:"+225 23 46 06 33", est_ouvert:true,  est_garde:false, note:4.2},
  {id:136,nom:"Pharmacie Le Lotus",             district:"Yopougon",adresse:"Yopougon, Niangon Sud à Gauche, terminus bus 27", telephone:"+225 23 45 06 66", est_ouvert:true,  est_garde:false, note:4.1},
  {id:137,nom:"Pharmacie Léa",                  district:"Yopougon",adresse:"Yopougon, Niangon",                               telephone:"+225 23 46 02 15", est_ouvert:true,  est_garde:false, note:4.2},
  {id:138,nom:"Pharmacie Les Elysées",          district:"Yopougon",adresse:"Yopougon, Maroc",                                 telephone:"+225 23 46 84 85", est_ouvert:true,  est_garde:false, note:4.3},
  {id:139,nom:"Pharmacie Les Phalènes",         district:"Yopougon",adresse:"Yopougon, Niangon Sud, paroisse Saint Pierre",    telephone:"+225 23 46 01 71", est_ouvert:true,  est_garde:false, note:4.1},
  {id:140,nom:"Pharmacie Maty",                 district:"Yopougon",adresse:"Yopougon, à côté station Lubafrique Maroc",       telephone:"+225 23 46 27 15", est_ouvert:true,  est_garde:false, note:4.2},
  {id:141,nom:"Pharmacie Niangon Lokoa",        district:"Yopougon",adresse:"Yopougon, entrée village Niangon Lokoa",          telephone:"+225 23 45 07 80", est_ouvert:true,  est_garde:false, note:4.0},
  {id:142,nom:"Pharmacie Niangon Nord",         district:"Yopougon",adresse:"Yopougon, Cité Verte",                            telephone:"+225 23 46 32 99", est_ouvert:true,  est_garde:false, note:4.2},
  {id:143,nom:"Pharmacie Peniel",               district:"Yopougon",adresse:"Yopougon, Ananeraie, carrefour GESCO",            telephone:"+225 23 45 42 82", est_ouvert:true,  est_garde:false, note:4.3},
  {id:144,nom:"Pharmacie Sainte Hermann",       district:"Yopougon",adresse:"Yopougon, Niangon Sud, carrefour Petro Ivoire",   telephone:"+225 23 50 72 77", est_ouvert:true,  est_garde:false, note:4.2},
  {id:145,nom:"Pharmacie Sandrina",             district:"Yopougon",adresse:"Yopougon, Ananeraie, carrefour Libanais",         telephone:"+225 23 46 47 64", est_ouvert:true,  est_garde:false, note:4.1},
  {id:146,nom:"Pharmacie Santé Plus",           district:"Yopougon",adresse:"Yopougon, Autoroute Nord, avant station Shell",   telephone:"+225 23 52 58 66", est_ouvert:true,  est_garde:false, note:4.3},
  {id:147,nom:"Pharmacie Siloé",                district:"Yopougon",adresse:"Yopougon, Ananeraie, 200m carrefour CHU",         telephone:"+225 23 52 03 40", est_ouvert:true,  est_garde:false, note:4.2},
  {id:148,nom:"Pharmacie Zeulayet",             district:"Yopougon",adresse:"Yopougon, face Mosquée de Maroc",                 telephone:"+225 23 45 20 39", est_ouvert:true,  est_garde:false, note:4.1},
  {id:149,nom:"Pharmacie Zone Industrielle",    district:"Yopougon",adresse:"Yopougon, entrée Zone Industrielle, carrefour Oil Libya",telephone:"",           est_ouvert:true,  est_garde:false, note:4.2},

  // ══════════════════════════════════════════
  // ABOBO — 44 pharmacies réelles
  // ══════════════════════════════════════════
  {id:150,nom:"Pharmacie Abobo Belle Ville",    district:"Abobo",   adresse:"Abobo, route d'Alépé",                            telephone:"+225 24 39 91 96", est_ouvert:true,  est_garde:false, note:4.2},
  {id:151,nom:"Pharmacie d'Abobo Santé",        district:"Abobo",   adresse:"Derrière Centre de Santé PMI et Maternité",        telephone:"+225 49 21 83 12", est_ouvert:true,  est_garde:false, note:4.1},
  {id:152,nom:"Pharmacie Azur",                 district:"Abobo",   adresse:"Route du Zoo Plateau Dokui, carrefour Policier",   telephone:"+225 40 27 50 02", est_ouvert:true,  est_garde:false, note:4.0},
  {id:153,nom:"Pharmacie Actuelle",             district:"Abobo",   adresse:"Abobo, face FSU Com Abobo Té, 200m Collège Loba'D",telephone:"+225 01 22 20 32", est_ouvert:true,  est_garde:false, note:4.1},
  {id:154,nom:"Pharmacie Abobo Sogephia",       district:"Abobo",   adresse:"Abobo Sogephia, derrière résidence universitaire", telephone:"+225 24 39 00 51", est_ouvert:true,  est_garde:false, note:4.0},
  {id:155,nom:"Pharmacie Carrefour Anador",     district:"Abobo",   adresse:"Abobo, Rond Point Carrefour Anador, Route des Rails",telephone:"+225 24 48 02 39",est_ouvert:true, est_garde:true,  note:4.3},
  {id:156,nom:"Pharmacie Amina",                district:"Abobo",   adresse:"Abobo, Avocatier, à côté maternité Henri K. Bédié",telephone:"+225 24 39 95 65", est_ouvert:true,  est_garde:false, note:4.2},
  {id:157,nom:"Pharmacie Carrefour Diallo",     district:"Abobo",   adresse:"Abobo PK 18, Ndotré, Carrefour Diallo",            telephone:"+225 40 30 24 31", est_ouvert:true,  est_garde:false, note:4.1},
  {id:158,nom:"Pharmacie du Centre",            district:"Abobo",   adresse:"Abobo Avocatier, Voie Express Anyama, Hôtel du Centre",telephone:"+225 47 85 90 09",est_ouvert:true,est_garde:false,note:4.2},
  {id:159,nom:"Pharmacie Avocatier Marché",     district:"Abobo",   adresse:"Abobo, carrefour Château, à côté Marché Avocatier",telephone:"+225 24 49 70 19", est_ouvert:true,  est_garde:false, note:4.1},
  {id:160,nom:"Pharmacie Belle Cité",           district:"Abobo",   adresse:"Abobo, Belle Cité",                                telephone:"+225 24 48 31 52", est_ouvert:true,  est_garde:false, note:4.0},
  {id:161,nom:"Pharmacie de Abobo Baoulé",      district:"Abobo",   adresse:"Abobo, route d'Alépé, face commissariat 34e arr.", telephone:"+225 24 48 27 54", est_ouvert:true,  est_garde:false, note:4.2},
  {id:162,nom:"Pharmacie de la Cité",           district:"Abobo",   adresse:"Abobo, face résidence universitaire, dans le marché",telephone:"+225 24 39 03 33",est_ouvert:true, est_garde:false, note:4.0},
  {id:163,nom:"Pharmacie de la Me",             district:"Abobo",   adresse:"Abobo, voie principale, carrefour mairie",         telephone:"+225 24 39 01 18", est_ouvert:true,  est_garde:false, note:4.1},
  {id:164,nom:"Pharmacie de la Mairie d'Abobo", district:"Abobo",   adresse:"Abobo, carrefour Centre Culturel",                 telephone:"+225 24 39 32 48", est_ouvert:true,  est_garde:false, note:4.2},
  {id:165,nom:"Pharmacie du Monastère",         district:"Abobo",   adresse:"Route d'Abobo Baoulé",                             telephone:"+225 24 39 67 01", est_ouvert:true,  est_garde:false, note:4.1},
  {id:166,nom:"Pharmacie des Quatre Étages",    district:"Abobo",   adresse:"Abobo, 4 étages, carrefour Hôpital Général",       telephone:"+225 24 39 06 62", est_ouvert:true,  est_garde:true,  note:4.4},
  {id:167,nom:"Pharmacie d'Akekoi",             district:"Abobo",   adresse:"Abobo Colatier, route d'Akeikoi",                  telephone:"+225 24 39 97 22", est_ouvert:true,  est_garde:false, note:4.0},
  {id:168,nom:"Pharmacie Les 4 Saisons",        district:"Abobo",   adresse:"Abobo, Dokui extension, de SODECI vers Lycée Adama Sanogo",telephone:"+225 21 01 11 10",est_ouvert:true,est_garde:false,note:4.1},
  {id:169,nom:"Pharmacie de La Plaque II",      district:"Abobo",   adresse:"Abobo, Sogephia, Cité des cadres, rue Plaque II",  telephone:"+225 24 48 09 90", est_ouvert:true,  est_garde:false, note:4.0},
  {id:170,nom:"Pharmacie du Rail",              district:"Abobo",   adresse:"Abobo Sagbè",                                      telephone:"+225 24 39 01 82", est_ouvert:true,  est_garde:false, note:4.0},
  {id:171,nom:"Pharmacie de l'Étoile",          district:"Abobo",   adresse:"Abobo, carrefour de l'Étoile, face Gendarmerie",   telephone:"+225 24 39 11 54", est_ouvert:true,  est_garde:false, note:4.1},
  {id:172,nom:"Pharmacie Divine Espérance",     district:"Abobo",   adresse:"Abobo, Sagbè, après les rails",                    telephone:"+225 24 39 78 92", est_ouvert:true,  est_garde:false, note:4.0},
  {id:173,nom:"Pharmacie Kann'sy",              district:"Abobo",   adresse:"Abobo, Kennedy, face mosquée",                     telephone:"+225 24 39 12 51", est_ouvert:true,  est_garde:false, note:4.1},
  {id:174,nom:"Pharmacie Kennedy",              district:"Abobo",   adresse:"Abobo, entrée Quartier Kennedy, Clouetcha",        telephone:"+225 24 39 43 73", est_ouvert:true,  est_garde:false, note:4.0},
  {id:175,nom:"Pharmacie Irys",                 district:"Abobo",   adresse:"Abobo Anonkoua Kouté, entrée du village",          telephone:"+225 24 48 48 05", est_ouvert:true,  est_garde:false, note:4.1},
  {id:176,nom:"Pharmacie la Paix",              district:"Abobo",   adresse:"Abobo, ANADOR, carrefour SODECI, face Gs NANTI",   telephone:"+225 24 39 83 31", est_ouvert:true,  est_garde:false, note:4.2},
  {id:177,nom:"Pharmacie Leon Ange",            district:"Abobo",   adresse:"Abobo, face Cité Policière, terminus bus 15 et 49",telephone:"+225 01 35 08 12", est_ouvert:true,  est_garde:false, note:4.1},
  {id:178,nom:"Grande Pharmacie du Dokui",      district:"Abobo",   adresse:"Abobo, près agence CIE et station TOTAL",          telephone:"+225 24 39 59 12", est_ouvert:true,  est_garde:false, note:4.3},
  {id:179,nom:"Pharmacie La Providence",        district:"Abobo",   adresse:"Abobo, Autoroute Abobo-Adjamé, après 1er arrêt SOTRA",telephone:"+225 24 49 39 62",est_ouvert:true,est_garde:false,note:4.2},
  {id:180,nom:"Pharmacie Route d'Anyama",       district:"Abobo",   adresse:"Abobo PK 18, route d'Anyama, face ex UNICAFE",     telephone:"+225 04 80 73 97", est_ouvert:true,  est_garde:false, note:4.0},
  {id:181,nom:"Pharmacie Magnificat",           district:"Abobo",   adresse:"Abobo, Avocatier, face station Petro Ivoire",      telephone:"+225 24 39 51 67", est_ouvert:true,  est_garde:false, note:4.2},
  {id:182,nom:"Pharmacie Miria",                district:"Abobo",   adresse:"Route du Zoo, carrefour Jean Tailly, face marché grossistes",telephone:"+225 24 39 55 07",est_ouvert:true,est_garde:false,note:4.0},
  {id:183,nom:"Pharmacie Manzan",               district:"Abobo",   adresse:"Abobo, Rond-Point SAMAKE",                         telephone:"+225 24 39 14 96", est_ouvert:true,  est_garde:false, note:4.1},
  {id:184,nom:"Pharmacie Matene",               district:"Abobo",   adresse:"Abobo, Avocatier, 400m Clinique Étoile",           telephone:"+225 24 39 20 32", est_ouvert:true,  est_garde:false, note:4.1},
  {id:185,nom:"Pharmacie Notre Dame de Fatima", district:"Abobo",   adresse:"Abobo Plateau Dokui, face Paroisse Ste Monique",   telephone:"+225 07 77 21 49", est_ouvert:true,  est_garde:false, note:4.2},
  {id:186,nom:"Pharmacie N'gohessé",            district:"Abobo",   adresse:"Abobo, Plaque I, entre Foyer Féminin et marché de nuit",telephone:"+225 24 39 94 67",est_ouvert:true,est_garde:false,note:4.0},
  {id:187,nom:"Pharmacie Olympique",            district:"Abobo",   adresse:"Abobo Ndotré, 300m carrefour Ndotré route Yopougon",telephone:"+225 07 89 99 44", est_ouvert:true,  est_garde:false, note:4.1},
  {id:188,nom:"Pharmacie Principale Abobo Té",  district:"Abobo",   adresse:"Abobo, carrefour Clinique Centrale d'Abobo",       telephone:"+225 24 49 48 19", est_ouvert:true,  est_garde:true,  note:4.4},
  {id:189,nom:"Pharmacie Saint François Xavier", district:"Abobo",  adresse:"Abobo, virage commissariat 15e arrondissement",    telephone:"+225 24 39 85 02", est_ouvert:true,  est_garde:false, note:4.2},
  {id:190,nom:"Pharmacie Saint Sauveur",        district:"Abobo",   adresse:"Abobo, Kennedy Klouetcha, à côté marché",          telephone:"+225 24 48 47 41", est_ouvert:true,  est_garde:false, note:4.1},
  {id:191,nom:"Pharmacie Sainte Croix",         district:"Abobo",   adresse:"Abobo, derrière Polyclinique Les Étoiles",         telephone:"+225 24 39 36 73", est_ouvert:true,  est_garde:false, note:4.2},
  {id:192,nom:"Pharmacie Sainte Odile",         district:"Abobo",   adresse:"Abobo, direction Allocodrome du Dokui",             telephone:"+225 24 39 29 97", est_ouvert:true,  est_garde:false, note:4.0},
  {id:193,nom:"Pharmacie Yarapha",              district:"Abobo",   adresse:"Abobo, carrefour AKEKOI",                          telephone:"+225 24 49 12 63", est_ouvert:true,  est_garde:false, note:4.1},
  {id:194,nom:"Pharmacie Milie Hevié",          district:"Abobo",   adresse:"Route d'Anyama, PK 18, terminus bus 76",            telephone:"+225 24 39 04 00", est_ouvert:true,  est_garde:false, note:4.0},

  // ══════════════════════════════════════════
  // ADJAMÉ — 29 pharmacies réelles
  // ══════════════════════════════════════════
  {id:195,nom:"Pharmacie Adjamé Bracodi",       district:"Adjamé",  adresse:"Adjamé Bracodi Bar",                               telephone:"+225 20 37 54 33", est_ouvert:true,  est_garde:false, note:4.2},
  {id:196,nom:"Pharmacie Adjamé Santé",         district:"Adjamé",  adresse:"Adjamé, Institut de Santé, Blvd Nangui Abrogoua",  telephone:"+225 20 22 85 44", est_ouvert:true,  est_garde:false, note:4.3},
  {id:197,nom:"Pharmacie Aimess",               district:"Adjamé",  adresse:"Adjamé Williamsville II, Route Macaci",             telephone:"+225 20 37 21 24", est_ouvert:true,  est_garde:false, note:4.1},
  {id:198,nom:"Pharmacie Adjamé Latin",         district:"Adjamé",  adresse:"Adjamé, à côté marché Habitat",                    telephone:"+225 20 37 22 39", est_ouvert:true,  est_garde:false, note:4.2},
  {id:199,nom:"Pharmacie de la Mairie",         district:"Adjamé",  adresse:"Adjamé, à côté Mairie d'Adjamé",                   telephone:"+225 20 37 99 99", est_ouvert:true,  est_garde:false, note:4.3},
  {id:200,nom:"Pharmacie du Château d'eau",     district:"Adjamé",  adresse:"Adjamé, av. William Jacob, à côté SODECI",         telephone:"+225 20 37 11 68", est_ouvert:true,  est_garde:false, note:4.2},
  {id:201,nom:"Pharmacie du Forum",             district:"Adjamé",  adresse:"Adjamé, Forum des marchés",                        telephone:"+225 20 38 13 64", est_ouvert:true,  est_garde:false, note:4.1},
  {id:202,nom:"Pharmacie du Marché Gouro",      district:"Adjamé",  adresse:"Adjamé, marché Gouro, à côté Banque Atlantique",   telephone:"+225 20 39 03 03", est_ouvert:true,  est_garde:true,  note:4.5},
  {id:203,nom:"Pharmacie du Progrès",           district:"Adjamé",  adresse:"Adjamé, Williamsville, avant commissariat",        telephone:"+225 20 37 15 25", est_ouvert:true,  est_garde:false, note:4.2},
  {id:204,nom:"Pharmacie Gbede",                district:"Adjamé",  adresse:"Adjamé, Blvd Nangui Abrogoua, à côté Grand Marché",telephone:"+225 20 37 71 58", est_ouvert:true,  est_garde:false, note:4.3},
  {id:205,nom:"Pharmacie Kana",                 district:"Adjamé",  adresse:"Adjamé Extension",                                 telephone:"+225 20 37 96 49", est_ouvert:true,  est_garde:false, note:4.1},
  {id:206,nom:"Pharmacie Koro",                 district:"Adjamé",  adresse:"Adjamé, à côté Collège Monterland",                telephone:"+225 07 81 47 18", est_ouvert:true,  est_garde:false, note:4.0},
  {id:207,nom:"Pharmacie Le Bélier",            district:"Adjamé",  adresse:"Adjamé, 220 logements, rue C37",                   telephone:"+225 20 37 12 16", est_ouvert:true,  est_garde:false, note:4.2},
  {id:208,nom:"Pharmacie de la Mosquée",        district:"Adjamé",  adresse:"Adjamé, Blvd William Jacob, derrière Rails Grande Mosquée",telephone:"+225 20 37 17 70",est_ouvert:true,est_garde:false,note:4.1},
  {id:209,nom:"Pharmacie Makissi",              district:"Adjamé",  adresse:"Adjamé, à côté supermarché Cash Ivoire",           telephone:"+225 20 37 70 39", est_ouvert:true,  est_garde:false, note:4.2},
  {id:210,nom:"Pharmacie Nouvelle des 220 Lgts",district:"Adjamé",  adresse:"Adjamé, carrefour Liberté, face station Corlay",   telephone:"+225 20 37 58 26", est_ouvert:true,  est_garde:false, note:4.3},
  {id:211,nom:"Pharmacie de la Province",       district:"Adjamé",  adresse:"Adjamé, Petit Marché 220 Lgts, face Edipresse",    telephone:"+225 20 37 55 81", est_ouvert:true,  est_garde:false, note:4.1},
  {id:212,nom:"Pharmacie Quartier Ébrié",       district:"Adjamé",  adresse:"Adjamé, feu Renault, face gare STIF",              telephone:"+225 20 37 12 56", est_ouvert:true,  est_garde:false, note:4.0},
  {id:213,nom:"Pharmacie de l'Espoir",          district:"Adjamé",  adresse:"Adjamé 220 Lgts, 200m Marché Gouro, Maternité Thérèse",telephone:"+225 20 39 08 31",est_ouvert:true,est_garde:false,note:4.1},
  {id:214,nom:"Pharmacie Rapha",                district:"Adjamé",  adresse:"Adjamé, Williamsville, face Boulangerie BMW",      telephone:"+225 20 37 96 88", est_ouvert:true,  est_garde:false, note:4.2},
  {id:215,nom:"Pharmacie Reboul",               district:"Adjamé",  adresse:"Adjamé, av. Reboul, à côté CNPS",                  telephone:"+225 20 37 99 98", est_ouvert:true,  est_garde:false, note:4.3},
  {id:216,nom:"Pharmacie Roeddent",             district:"Adjamé",  adresse:"Adjamé, face Centre Antituberculeux",               telephone:"+225 20 37 98 33", est_ouvert:true,  est_garde:false, note:4.1},
  {id:217,nom:"Pharmacie Saint Emmanuel",       district:"Adjamé",  adresse:"Adjamé, face immeuble MIRADOR",                    telephone:"+225 20 37 98 27", est_ouvert:true,  est_garde:false, note:4.2},
  {id:218,nom:"Pharmacie de l'Indenié",         district:"Adjamé",  adresse:"Adjamé, Av. Toussaint Louverture, face Cité Policière",telephone:"+225 20 21 17 90",est_ouvert:true,est_garde:false,note:4.1},
  {id:219,nom:"Pharmacie Saint Michel",         district:"Adjamé",  adresse:"Adjamé, à côté église Saint Michel",               telephone:"+225 20 37 09 06", est_ouvert:true,  est_garde:false, note:4.2},
  {id:220,nom:"Pharmacie Saint Uriel",          district:"Adjamé",  adresse:"Adjamé, Païer, derrière le cimetière",             telephone:"+225 20 37 23 75", est_ouvert:true,  est_garde:false, note:4.0},
  {id:221,nom:"Pharmacie Sainte Marie d'Adjamé",district:"Adjamé",  adresse:"Adjamé, Rue Harris, commissariat 3e arr.",         telephone:"+225 05 08 76 77", est_ouvert:true,  est_garde:false, note:4.2},
  {id:222,nom:"Pharmacie Sarah",                district:"Adjamé",  adresse:"Adjamé, centre commercial Karine'N couture",        telephone:"+225 20 39 03 57", est_ouvert:true,  est_garde:false, note:4.1},
  {id:223,nom:"Pharmacie Seneve",               district:"Adjamé",  adresse:"Adjamé, à côté gare UTB",                          telephone:"+225 20 37 11 04", est_ouvert:true,  est_garde:false, note:4.2},

  // ══════════════════════════════════════════
  // MARCORY — 21 pharmacies réelles
  // ══════════════════════════════════════════
  {id:224,nom:"Pharmacie de la Paix",           district:"Marcory", adresse:"Marcory Résidentiel, face SIB et station Corlay",   telephone:"+225 21 26 30 19", est_ouvert:true,  est_garde:false, note:4.5},
  {id:225,nom:"Pharmacie Sainte Ruth-Prima",    district:"Marcory", adresse:"Galerie Prima Center, rue Pierre et Marie Curie Zone 4",telephone:"+225 21 35 35 15",est_ouvert:true,est_garde:false,note:4.4},
  {id:226,nom:"Pharmacie de la Vie",            district:"Marcory", adresse:"Marcory Résidentiel, Blvd Achalme, après SIB",      telephone:"+225 21 28 18 68", est_ouvert:true,  est_garde:false, note:4.3},
  {id:227,nom:"Pharmacie de l'Amitié",          district:"Marcory", adresse:"Marcory, carrefour nouveau marché de Marcory",      telephone:"+225 21 26 85 06", est_ouvert:true,  est_garde:false, note:4.2},
  {id:228,nom:"Pharmacie de l'INJS",            district:"Marcory", adresse:"Marcory, face entrée principale INJS",              telephone:"+225 21 28 10 10", est_ouvert:true,  est_garde:false, note:4.3},
  {id:229,nom:"Pharmacie des Lagunes",          district:"Marcory", adresse:"Marcory résidentiel, rue la Paix",                  telephone:"+225 21 26 12 40", est_ouvert:true,  est_garde:false, note:4.2},
  {id:230,nom:"Pharmacie du Petit Marché",      district:"Marcory", adresse:"Marcory, petit marché, carrefour maquis Vatican",   telephone:"+225 21 26 24 32", est_ouvert:true,  est_garde:false, note:4.1},
  {id:231,nom:"Pharmacie Ebathe",               district:"Marcory", adresse:"Marcory, prolongement route hôtel Massarana",       telephone:"+225 21 56 77 15", est_ouvert:true,  est_garde:false, note:4.2},
  {id:232,nom:"Pharmacie Grand Marché Marcory", district:"Marcory", adresse:"Marcory, face Grand Marché de Marcory",             telephone:"+225 21 56 90 96", est_ouvert:true,  est_garde:true,  note:4.6},
  {id:233,nom:"Pharmacie Massarana",            district:"Marcory", adresse:"Marcory, à côté Hôtel Massarana",                   telephone:"+225 21 28 35 43", est_ouvert:true,  est_garde:false, note:4.3},
  {id:234,nom:"Pharmacie Méridien",             district:"Marcory", adresse:"Marcory, Blvd du Cameroun, Marcory GFCI",           telephone:"+225 21 28 27 00", est_ouvert:true,  est_garde:false, note:4.4},
  {id:235,nom:"Pharmacie Leïla",                district:"Marcory", adresse:"Marcory Alliodan",                                  telephone:"+225 21 26 72 94", est_ouvert:true,  est_garde:false, note:4.2},
  {id:236,nom:"Pharmacie Les Remblais",         district:"Marcory", adresse:"Marcory Alliodan, face commissariat 26e arr.",      telephone:"+225 21 26 25 40", est_ouvert:true,  est_garde:false, note:4.1},
  {id:237,nom:"Pharmacie Boulevard de Marseille",district:"Marcory",adresse:"Marcory, station Shell, Blvd de Marseille, face LONACI",telephone:"+225 21 25 76 25",est_ouvert:true,est_garde:false,note:4.5},
  {id:238,nom:"Pharmacie Canaan",               district:"Marcory", adresse:"Marcory, 36 rue Paul Langevin",                     telephone:"+225 21 25 96 76", est_ouvert:true,  est_garde:false, note:4.2},
  {id:239,nom:"Pharmacie Crossroads",           district:"Marcory", adresse:"Marcory, grand carrefour de Marcory, face BICICI",  telephone:"+225 21 35 29 70", est_ouvert:true,  est_garde:false, note:4.3},
  {id:240,nom:"Pharmacie de la Galerie",        district:"Marcory", adresse:"Marcory, centre commercial CAP SUD",                telephone:"+225 21 24 28 41", est_ouvert:true,  est_garde:false, note:4.4},
  {id:241,nom:"Pharmacie de la Zone 3",         district:"Marcory", adresse:"Marcory, carrefour Pâtisserie abidjanaise",         telephone:"+225 21 35 13 15", est_ouvert:true,  est_garde:false, note:4.2},
  {id:242,nom:"Pharmacie Elite",                district:"Marcory", adresse:"Marcory, Blvd Giscard d'Estaing, à côté DHL",      telephone:"+225 21 35 11 19", est_ouvert:true,  est_garde:false, note:4.4},
  {id:243,nom:"Pharmacie Lanvia",               district:"Marcory", adresse:"Marcory, Rue Pierre et Marie Curie, 100m STAR AUTO",telephone:"+225 21 21 24 00", est_ouvert:true,  est_garde:false, note:4.3},
  {id:244,nom:"Pharmacie Perusia",              district:"Marcory", adresse:"Marcory, Zone 4C, rue du canal",                    telephone:"+225 21 35 78 86", est_ouvert:true,  est_garde:false, note:4.2},

  // ══════════════════════════════════════════
  // TREICHVILLE
  // ══════════════════════════════════════════
  {id:245,nom:"Pharmacie Treichville",          district:"Treichville",adresse:"Treichville, Blvd Giscard d'Estaing",           telephone:"+225 21 24 12 34", est_ouvert:true,  est_garde:true,  note:4.5},
  {id:246,nom:"Pharmacie du Marché Treichville",district:"Treichville",adresse:"Treichville, av. 16, à côté Treichotel",        telephone:"+225 21 25 45 67", est_ouvert:true,  est_garde:false, note:4.3},
  {id:247,nom:"Pharmacie Gabriel Dadié",        district:"Treichville",adresse:"Treichville, av. 13",                           telephone:"+225 21 23 78 90", est_ouvert:true,  est_garde:false, note:4.4},

  // ══════════════════════════════════════════
  // KOUMASSI
  // ══════════════════════════════════════════
  {id:248,nom:"Pharmacie Koumassi Centre",      district:"Koumassi",adresse:"Centre Commercial Koumassi",                       telephone:"+225 21 26 23 45", est_ouvert:true,  est_garde:false, note:4.5},
  {id:249,nom:"Pharmacie Remblai",              district:"Koumassi",adresse:"Remblai, Koumassi",                                telephone:"+225 21 27 56 78", est_ouvert:true,  est_garde:true,  note:4.4},
  {id:250,nom:"Pharmacie Grand Campement",      district:"Koumassi",adresse:"Grand Campement, Koumassi",                       telephone:"+225 21 28 89 01", est_ouvert:true,  est_garde:false, note:4.3},

  // ══════════════════════════════════════════
  // PORT-BOUËT
  // ══════════════════════════════════════════
  {id:251,nom:"Pharmacie Port-Bouët",           district:"Port-Bouët",adresse:"Zone Aéroportuaire, Port-Bouët",                 telephone:"+225 21 32 12 34", est_ouvert:true,  est_garde:true,  note:4.6},
  {id:252,nom:"Pharmacie Vridi",                district:"Port-Bouët",adresse:"Vridi, Port-Bouët",                              telephone:"+225 21 30 45 67", est_ouvert:true,  est_garde:false, note:4.3},
  {id:253,nom:"Pharmacie Port-Bouët Village",   district:"Port-Bouët",adresse:"Village, Port-Bouët",                            telephone:"+225 21 31 78 90", est_ouvert:false, est_garde:false, note:4.1},

  // ══════════════════════════════════════════
  // ATTÉCOUBÉ
  // ══════════════════════════════════════════
  {id:254,nom:"Pharmacie Attécoubé",            district:"Attécoubé",adresse:"Rue Principale, Attécoubé",                       telephone:"+225 20 45 12 34", est_ouvert:true,  est_garde:false, note:4.2},
  {id:255,nom:"Pharmacie New Bell",             district:"Attécoubé",adresse:"New Bell, Attécoubé",                             telephone:"+225 20 46 45 67", est_ouvert:true,  est_garde:true,  note:4.3},
  {id:256,nom:"Pharmacie Blvd de la Paix",      district:"Attécoubé",adresse:"Route de CARENA, face Sebroko, à côté TOTAL",     telephone:"+225 20 22 20 34", est_ouvert:true,  est_garde:false, note:4.1},

  // ══════════════════════════════════════════
  // BINGERVILLE
  // ══════════════════════════════════════════
  {id:257,nom:"Pharmacie Bingerville",          district:"Bingerville",adresse:"Route de Bingerville, centre-ville",            telephone:"+225 22 40 12 34", est_ouvert:true,  est_garde:false, note:4.2},
  {id:258,nom:"Pharmacie Sainte Famille",       district:"Bingerville",adresse:"Bingerville, Abidjan Est",                      telephone:"+225 22 40 56 78", est_ouvert:false, est_garde:false, note:4.0},

  // ══════════════════════════════════════════
  // ANYAMA
  // ══════════════════════════════════════════
  {id:259,nom:"Pharmacie Anyama Centre",        district:"Anyama",  adresse:"Centre-ville Anyama",                              telephone:"+225 22 34 45 67", est_ouvert:true,  est_garde:true,  note:4.1},
  {id:260,nom:"Pharmacie Anyama Adjamé",        district:"Anyama",  adresse:"Anyama Adjamé, route d'Anyama",                    telephone:"+225 22 33 78 90", est_ouvert:true,  est_garde:false, note:4.0},

  // ══════════════════════════════════════════
  // SONGON
  // ══════════════════════════════════════════
  {id:261,nom:"Pharmacie Songon",               district:"Songon",  adresse:"Songon Agban, route principale",                   telephone:"+225 23 60 12 34", est_ouvert:true,  est_garde:false, note:4.0},
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
