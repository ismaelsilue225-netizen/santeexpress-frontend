/* ════════════════════════════════════════════════════
   PharmaCi — Service API
   Importer dans pharmaci.jsx ou dans l'app React
   
   ⚙️ Configuration :
   Développement : http://localhost:5000/api
   Production    : https://ton-domaine.com/api
════════════════════════════════════════════════════ */

export const API_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000/api";

// ─── Fonction requête centrale ────────────────────
const req = async (endpoint, options = {}, token = null) => {
  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...options,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Erreur serveur");
  return data;
};

/* ═══════════════════════════════════════════════════
   AUTH — Inscription / Connexion
═══════════════════════════════════════════════════ */
export const authAPI = {
  // Créer un compte client
  inscription: (nom, telephone, mot_de_passe, adresse) =>
    req("/auth/inscription", {
      method: "POST",
      body: JSON.stringify({ nom, telephone, mot_de_passe, adresse }),
    }),

  // Se connecter
  connexion: (telephone, mot_de_passe) =>
    req("/auth/connexion", {
      method: "POST",
      body: JSON.stringify({ telephone, mot_de_passe }),
    }),

  // Récupérer mon profil
  moi: (token) => req("/auth/moi", {}, token),

  // Modifier mon profil
  majProfil: (data, token) =>
    req("/auth/profil", {
      method: "PUT",
      body: JSON.stringify(data),
    }, token),
};

/* ═══════════════════════════════════════════════════
   PHARMACIES
═══════════════════════════════════════════════════ */
export const pharmaciesAPI = {
  // Toutes les pharmacies (optionnel: ?district=Cocody&garde=true)
  liste: (params = {}) => {
    const q = new URLSearchParams(params).toString();
    return req(`/pharmacies${q ? `?${q}` : ""}`);
  },

  // Pharmacies de garde uniquement
  garde: () => req("/pharmacies/garde"),

  // Détail d'une pharmacie + ses produits
  detail: (id) => req(`/pharmacies/${id}`),

  // Auto-inscription d'une pharmacie partenaire
  inscription: (data) =>
    req("/pharmacies/inscription", {
      method: "POST",
      body: JSON.stringify(data),
    }),
};

/* ═══════════════════════════════════════════════════
   PRODUITS / CATALOGUE
═══════════════════════════════════════════════════ */
export const produitsAPI = {
  // Liste avec filtres optionnels (?cat=vitamines&search=para)
  liste: (params = {}) => {
    const q = new URLSearchParams(params).toString();
    return req(`/produits${q ? `?${q}` : ""}`);
  },

  // Détail d'un produit
  detail: (id) => req(`/produits/${id}`),

  // Catégories disponibles
  categories: () => req("/produits/categories"),
};

/* ═══════════════════════════════════════════════════
   COMMANDES
═══════════════════════════════════════════════════ */
export const commandesAPI = {
  // Créer une commande
  creer: (data, token = null) =>
    req("/commandes", {
      method: "POST",
      body: JSON.stringify(data),
    }, token),

  // Mes commandes (client connecté)
  mesCommandes: (token) => req("/commandes/mes-commandes", {}, token),

  // Suivi par référence (public)
  suivre: (reference) => req(`/commandes/${reference}`),

  // Mettre à jour le statut (livreur/admin/pharmacie)
  majStatut: (id, statut, token) =>
    req(`/commandes/${id}/statut`, {
      method: "PUT",
      body: JSON.stringify({ statut }),
    }, token),

  // Laisser un avis après livraison
  noter: (id, note_pharmacie, note_livreur, commentaire, token) =>
    req(`/commandes/${id}/avis`, {
      method: "POST",
      body: JSON.stringify({ note_pharmacie, note_livreur, commentaire }),
    }, token),
};

/* ═══════════════════════════════════════════════════
   PAIEMENTS
═══════════════════════════════════════════════════ */
export const paiementsAPI = {
  // Initier un paiement CinetPay → retourne un lien de paiement
  cinetpay: (commande_id, montant) =>
    req("/paiements/cinetpay/initier", {
      method: "POST",
      body: JSON.stringify({ commande_id, montant }),
    }),

  // Initier un paiement Wave CI
  wave: (montant, commande_id) =>
    req("/paiements/wave/initier", {
      method: "POST",
      body: JSON.stringify({ montant, commande_id }),
    }),

  // Initier Orange Money CI
  orange: (montant, telephone, commande_id) =>
    req("/paiements/orange/initier", {
      method: "POST",
      body: JSON.stringify({ montant, telephone, commande_id }),
    }),
};

/* ═══════════════════════════════════════════════════
   LIVREUR
═══════════════════════════════════════════════════ */
export const livreurAPI = {
  commandesDisponibles: (token) =>
    req("/livreurs/commandes-disponibles", {}, token),

  mesLivraisons:  (token) => req("/livreurs/mes-livraisons", {}, token),
  prendreCmd:     (id, token) => req(`/livreurs/commandes/${id}/prendre`, { method: "PUT" }, token),
  marquerLivre:   (id, token) => req(`/livreurs/commandes/${id}/livrer`,  { method: "PUT" }, token),
  mesGains:       (token) => req("/livreurs/gains", {}, token),
};

/* ═══════════════════════════════════════════════════
   ADMIN
═══════════════════════════════════════════════════ */
export const adminAPI = {
  stats:             (token)         => req("/admin/stats", {}, token),
  commandes:         (token, params) => {
    const q = new URLSearchParams(params || {}).toString();
    return req(`/admin/commandes${q ? `?${q}` : ""}`, {}, token);
  },
  pharmacies:        (token)         => req("/admin/pharmacies", {}, token),
  validerPharmacie:  (id, statut, token) =>
    req(`/admin/pharmacies/${id}/valider`, {
      method: "PUT",
      body: JSON.stringify({ statut }),
    }, token),
  livreurs:          (token)         => req("/admin/livreurs", {}, token),
  commissions:       (token)         => req("/admin/commissions", {}, token),
};
