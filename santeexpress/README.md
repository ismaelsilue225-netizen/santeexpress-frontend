# SantéExpress 🏥
**Médicaments livrés à Abidjan · Next.js + Supabase + Vercel**

---

## 🚀 Déploiement en 4 étapes (30 minutes)

### Étape 1 — Mettre sur GitHub

```bash
git init
git add .
git commit -m "SantéExpress v1 — initial deploy"
```

Créer un dépôt sur [github.com](https://github.com/new) puis :

```bash
git remote add origin https://github.com/TON_USERNAME/santeexpress.git
git push -u origin main
```

---

### Étape 2 — Configurer Supabase

1. Créer un compte sur [supabase.com](https://supabase.com)
2. **New Project** → nom : `santeexpress` → choisir une région Europe West
3. Aller dans **SQL Editor** → coller et exécuter le fichier `supabase-setup.sql`
4. Récupérer dans **Settings → API** :
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

### Étape 3 — Déployer sur Vercel

1. Créer un compte sur [vercel.com](https://vercel.com)
2. **New Project** → importer le repo GitHub `santeexpress`
3. Dans **Environment Variables**, ajouter :

| Variable | Valeur |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | L'URL Supabase (ex: https://xxxx.supabase.co) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | La clé anon Supabase |
| `NEXT_PUBLIC_BASE_URL` | L'URL Vercel générée (ex: https://santeexpress.vercel.app) |

4. Cliquer **Deploy** → votre app est en ligne en 2 minutes !

---

### Étape 4 — Tester

Ouvrir l'URL Vercel et vérifier :
- [ ] La page d'accueil s'affiche
- [ ] Le catalogue charge les produits depuis Supabase
- [ ] Les santeexpresses de garde s'affichent
- [ ] Une commande test passe sans erreur

---

## 💳 Activer CinetPay (paiements)

1. Créer un compte sur [cinetpay.com](https://cinetpay.com)
2. Récupérer `Site ID` et `API Key` dans le tableau de bord
3. Ajouter dans Vercel (Settings → Environment Variables) :
   - `CINETPAY_SITE_ID`
   - `CINETPAY_API_KEY`

---

## 🗂 Structure du projet

```
santeexpress/
├── pages/
│   ├── index.js              # App complète (frontend)
│   └── api/
│       ├── produits.js       # GET /api/produits
│       ├── santeexpresses.js     # GET /api/santeexpresses
│       ├── commandes.js      # POST /api/commandes
│       ├── commandes/
│       │   └── mes-commandes.js
│       └── paiements/
│           └── cinetpay/
│               └── initier.js
├── lib/
│   └── supabase.js           # Client Supabase
├── supabase-setup.sql        # Tables + données initiales
├── .env.example              # Variables à configurer
└── package.json
```

---

## 💰 Modèle économique

- Commission : **3%** par commande
- Livraison standard : **500 FCFA**
- Livraison Yango : **800 FCFA**

---

## 🇨🇮 Contact

SantéExpress · Abidjan, Côte d'Ivoire
