# Plateforme numérique — Institution Louis Chauvet (ILCH)

## Structure des fichiers

```
ILCH_plateforme/
├── index.html            ← Site principal de l'école
├── login.html            ← Page de connexion (élève / professeur)
├── dashboard-eleve.html  ← Tableau de bord élève
├── dashboard-prof.html   ← Tableau de bord professeur
└── README.md             ← Ce fichier
```

## Comment utiliser ces fichiers

1. Placez tous les fichiers dans le même dossier sur votre serveur.
2. Conservez votre dossier `ILCH4/` (photos) à côté des fichiers HTML.
3. Ouvrez `index.html` dans un navigateur — c'est la page d'accueil.
4. Le bouton « Se connecter » redirige vers `login.html`.
5. Depuis `login.html`, choisissez Élève ou Professeur pour accéder au bon tableau de bord.

## Navigation de la plateforme

### Espace Élève
- Tableau de bord (stats, activité récente)
- Cours vidéo (filtres par matière)
- Notes & bulletins
- Messagerie (contact direct avec les professeurs)
- Profil

### Espace Professeur
- Tableau de bord (stats, activité récente)
- Cours vidéo (ajout, suppression, brouillon/publié)
- Saisie des notes (par classe, enregistrement)
- Messagerie (réponses aux élèves)
- Profil

## Pour passer en production

### Hébergement recommandé
- **cPanel** (hébergeur haïtien ou international) : glisser-déposer les fichiers dans `public_html/`
- **Netlify** (gratuit, simple) : drag & drop du dossier sur netlify.com
- **Infomaniak** ou **OVH** : hébergeurs francophones fiables

### Base de données (pour les vraies données)
Connectez une base de données pour stocker les vrais comptes, notes et messages :
- **Firebase** (Google) — gratuit jusqu'à une certaine limite, facile à configurer
- **Supabase** — alternative open-source à Firebase
- **MySQL + PHP** — si votre hébergeur le propose (cPanel inclut souvent phpMyAdmin)

### Hébergement vidéo
Les vidéos de cours ne doivent pas être hébergées sur votre serveur web (trop lourdes).
Utilisez l'un de ces services :
- **Vimeo** (payant, pro, sans pub)
- **Cloudflare Stream** (prix à l'usage)
- **YouTube non listé** (gratuit, les vidéos ne sont pas publiques si non listées)

### Authentification sécurisée
Pour un vrai système de login :
- Utilisez Firebase Authentication (Google)
- Ou un backend PHP/Node.js avec des mots de passe hashés (bcrypt)
- Ne stockez jamais les mots de passe en clair

## Contact

Institution Louis Chauvet  
Thomassin 25, Pétion-Ville, Haïti  
institutionlouischauvet@gmail.com

---
Fichiers générés pour l'ILCH · 2026
