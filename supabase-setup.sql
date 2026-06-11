-- ══════════════════════════════════════════
-- SANTEEXPRESS — Script SQL Supabase
-- Coller dans : Supabase > SQL Editor > New query
-- ══════════════════════════════════════════

-- 1. Pharmacies
create table if not exists pharmacies (
  id serial primary key,
  nom text not null,
  district text,
  adresse text,
  telephone text,
  est_garde boolean default false,
  est_ouvert boolean default true,
  note numeric(2,1) default 4.5,
  created_at timestamp with time zone default now()
);

-- 2. Produits
create table if not exists produits (
  id serial primary key,
  nom text not null,
  categorie text,
  prix integer not null,
  unite text,
  emoji text default '💊',
  description text,
  necessite_ordonnance boolean default false,
  en_stock boolean default true,
  created_at timestamp with time zone default now()
);

-- 3. Commandes
create table if not exists commandes (
  id serial primary key,
  reference text unique,
  pharmacie_id integer references pharmacies(id),
  nom_client text,
  telephone_client text,
  adresse_livraison text,
  items jsonb default '[]',
  sous_total integer default 0,
  frais_livraison integer default 500,
  total integer default 0,
  couverture_assurance integer default 0,
  mode_paiement text default 'cash',
  mode_livraison text default 'std',
  statut text default 'confirmed',
  note_pharmacien text,
  note_client integer,
  created_at timestamp with time zone default now()
);

-- ══ DONNÉES INITIALES ══════════════════════

-- Pharmacies
insert into pharmacies (nom, district, adresse, est_ouvert, est_garde, note) values
  ('Pharmacie du Plateau',      'Plateau',     'Av. Botreau-Roussel',        true,  false, 4.8),
  ('Pharmacie Sainte Marie',    'Cocody',      'Rue des Jardins, Cocody',    true,  false, 4.6),
  ('Pharmacie de la Riviera',   'Cocody',      'Riviera 2, Abidjan',         true,  true,  4.9),
  ('Pharmacie du Bonheur',      'Yopougon',    'Yopougon-Attié',             true,  false, 4.5),
  ('Pharmacie Abobo Centre',    'Abobo',       'Marché d''Abobo Centre',     false, true,  4.3),
  ('Pharmacie Marcory Réel',    'Marcory',     'Bd de Marseille, Marcory',   true,  false, 4.7),
  ('Pharmacie Adjamé 220',      'Adjamé',      'Marché Adjamé 220',          true,  false, 4.4),
  ('Pharmacie Port-Bouët',      'Port-Bouët',  'Zone Aéroportuaire',         true,  true,  4.6),
  ('Pharmacie Koumassi Centre', 'Koumassi',    'Centre Commercial Koumassi', true,  false, 4.5),
  ('Pharmacie Angré 7e Tr.',    'Cocody',      'Angré 7e Tranche',           true,  false, 4.7),
  ('Pharmacie Treichville',     'Treichville', 'Bd Giscard d''Estaing',      true,  true,  4.5),
  ('Pharmacie Bingerville',     'Bingerville', 'Route de Bingerville',       false, false, 4.2);

-- Produits
insert into produits (nom, categorie, prix, unite, emoji, description, necessite_ordonnance, en_stock) values
  ('Paracétamol 500mg',      'antidouleur', 500,  'Boîte 16 cp',    '💊', 'Antalgique et antipyrétique. Soulage la douleur et fait baisser la fièvre.',          false, true),
  ('Ibuprofène 400mg',       'antidouleur', 850,  'Boîte 14 cp',    '💊', 'Anti-inflammatoire non stéroïdien. Réduit la douleur et l''inflammation.',             false, true),
  ('Doliprane 1000mg',       'antidouleur', 950,  'Boîte 8 cp',     '💊', 'Paracétamol fort dosage pour adultes. Max 4 comprimés par jour.',                     false, true),
  ('Vitamine C 1000mg',      'vitamines',   1200, 'Boîte 30 cp',    '🍊', 'Renforce le système immunitaire. Effervescent, goût orange.',                         false, true),
  ('Zinc + Vitamine D3',     'vitamines',   2500, 'Flacon 60 gél.', '🌿', 'Complexe vitamino-minéral pour l''immunité et la santé osseuse.',                     false, true),
  ('Magnésium B6',           'vitamines',   1800, 'Boîte 45 cp',    '⚡', 'Réduit la fatigue, contribue au fonctionnement musculaire normal.',                   false, true),
  ('Amoxicilline 500mg',     'antibio',     3500, 'Boîte 21 gél.', '🧬', 'Antibiotique à large spectre. Ordonnance médicale obligatoire.',                      true,  true),
  ('Gel hydroalcoolique',    'soin',        1000, 'Flacon 250ml',   '🧴', 'Désinfectant mains. 70% d''alcool isopropylique. Action rapide.',                     false, true),
  ('Sérum physiologique',    'soin',        750,  'Boîte 30 unid.', '🩹', 'Solution isotonique stérile, nettoyage nasal et oculaire.',                          false, true),
  ('Alcool médical 70°',     'soin',        600,  'Flacon 250ml',   '🧪', 'Désinfection cutanée avant injection. Usage externe uniquement.',                     false, true),
  ('Masques chirurgicaux',   'soin',        2000, 'Boîte 50 pcs',   '😷', 'Type IIR, norme EN 14683. Protection efficace contre les projections.',               false, true),
  ('SRO Réhydratation',      'soin',        300,  'Sachet x5',      '💧', 'Sels de réhydratation orale. Traitement diarrhée et déshydratation.',                 false, true),
  ('Couches bébé T3 (4-9kg)','bebe',        5500, 'Paquet 44 pcs',  '👶', 'Couches ultra-absorbantes et douces pour bébés de 4 à 9 kg.',                        false, false),
  ('Thermomètre digital',    'materiel',    3000, '1 pièce',        '🌡️','Résultat en 60 secondes. Alarme fièvre, mémoire 10 mesures.',                         false, true);

-- Activer RLS (Row Level Security) — lecture publique
alter table pharmacies enable row level security;
alter table produits enable row level security;
alter table commandes enable row level security;

create policy "lecture publique pharmacies" on pharmacies for select using (true);
create policy "lecture publique produits"   on produits   for select using (true);
create policy "insertion commandes"         on commandes  for insert with check (true);
create policy "lecture commandes"           on commandes  for select using (true);
