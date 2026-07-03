/**
 * ============================================================
 *  ILCH — DONNÉES DE L'ÉCOLE
 *  Modifiez CE SEUL FICHIER pour mettre à jour toute la plateforme
 * ============================================================
 */

const ILCH_DATA = {

  // ══════════════════════════════════════════════
  //  1. CLASSES
  // ══════════════════════════════════════════════
  classes: [
    { id: "ps",   nom: "Préscolaire",          niveau: "Préscolaire" },
    { id: "f1",   nom: "1ère Fondamentale",    niveau: "Fondamental" },
    { id: "f2",   nom: "2ème Fondamentale",    niveau: "Fondamental" },
    { id: "f3",   nom: "3ème Fondamentale",    niveau: "Fondamental" },
    { id: "f4",   nom: "4ème Fondamentale",    niveau: "Fondamental" },
    { id: "f5",   nom: "5ème Fondamentale",    niveau: "Fondamental" },
    { id: "f6",   nom: "6ème Fondamentale",    niveau: "Fondamental" },
    { id: "f7",   nom: "7ème Fondamentale",    niveau: "Fondamental" },
    { id: "f8",   nom: "8ème Fondamentale",    niveau: "Fondamental" },
    { id: "f9",   nom: "9ème Fondamentale",    niveau: "Fondamental" },
    { id: "sec1", nom: "Seconde",              niveau: "Secondaire"  },
    { id: "rhe",  nom: "Rhétorique",           niveau: "Secondaire"  },
    { id: "ta",   nom: "Terminale A",          niveau: "Terminale"   },
    { id: "tb",   nom: "Terminale B",          niveau: "Terminale"   },
  ],

  // ══════════════════════════════════════════════
  //  2. MATIÈRES
  // ══════════════════════════════════════════════
  matieres: [
    { id: "math",   nom: "Mathématiques"      },
    { id: "fr",     nom: "Français"           },
    { id: "sc",     nom: "Sciences naturelles"},
    { id: "hist",   nom: "Histoire-Géographie"},
    { id: "ang",    nom: "Anglais"            },
    { id: "philo",  nom: "Philosophie"        },
    { id: "esp",    nom: "Espagnol"           },
    { id: "info",   nom: "Informatique"       },
    { id: "eps",    nom: "Éducation physique" },
    { id: "musique",nom: "Musique"            },
  ],

  // ══════════════════════════════════════════════
  //  3. PROFESSEURS
  //  ⚠️  Remplacez les informations par les vrais noms
  //  ⚠️  Changez les mots de passe (motDePasse)
  // ══════════════════════════════════════════════
  professeurs: [
    {
      id:          "prof001",
      prenom:      "Marie",
      nom:         "Céleste",
      identifiant: "marie.celeste",
      motDePasse:  "ilch2026",          // ← CHANGER
      matieres:    ["math"],
      classes:     ["ta", "tb"],
      initiales:   "MC",
    },
    {
      id:          "prof002",
      prenom:      "René",
      nom:         "Joseph",
      identifiant: "rene.joseph",
      motDePasse:  "ilch2026",          // ← CHANGER
      matieres:    ["fr"],
      classes:     ["ta", "tb", "rhe"],
      initiales:   "RJ",
    },
    {
      id:          "prof003",
      prenom:      "Claire",
      nom:         "Blanc",
      identifiant: "claire.blanc",
      motDePasse:  "ilch2026",          // ← CHANGER
      matieres:    ["sc"],
      classes:     ["ta", "tb"],
      initiales:   "CB",
    },
    {
      id:          "prof004",
      prenom:      "Jean",
      nom:         "Luc",
      identifiant: "jean.luc",
      motDePasse:  "ilch2026",          // ← CHANGER
      matieres:    ["hist"],
      classes:     ["ta", "sec1"],
      initiales:   "JL",
    },
    {
      id:          "prof005",
      prenom:      "Sandra",
      nom:         "Moreau",
      identifiant: "sandra.moreau",
      motDePasse:  "ilch2026",          // ← CHANGER
      matieres:    ["ang"],
      classes:     ["ta", "tb", "rhe"],
      initiales:   "SM",
    },
    {
      id:          "prof006",
      prenom:      "Paul",
      nom:         "Henry",
      identifiant: "paul.henry",
      motDePasse:  "ilch2026",          // ← CHANGER
      matieres:    ["philo"],
      classes:     ["ta", "tb"],
      initiales:   "PH",
    },
    // ── Ajoutez d'autres professeurs ici ──
    // {
    //   id:          "prof007",
    //   prenom:      "Prénom",
    //   nom:         "Nom",
    //   identifiant: "prenom.nom",
    //   motDePasse:  "motdepasse",
    //   matieres:    ["math"],
    //   classes:     ["f9"],
    //   initiales:   "PN",
    // },
  ],

  // ══════════════════════════════════════════════
  //  4. ÉLÈVES
  //  ⚠️  Remplacez par les vrais noms et classes
  //  ⚠️  Changez les mots de passe
  // ══════════════════════════════════════════════
  eleves: [
    {
      id:          "elv001",
      prenom:      "Jean",
      nom:         "Pierre",
      identifiant: "jean.pierre",
      motDePasse:  "eleve2026",         // ← CHANGER
      classe:      "ta",
      initiales:   "JP",
      parentId:    "par001",
    },
    {
      id:          "elv002",
      prenom:      "Sophie",
      nom:         "Marc",
      identifiant: "sophie.marc",
      motDePasse:  "eleve2026",         // ← CHANGER
      classe:      "tb",
      initiales:   "SM",
      parentId:    "par002",
    },
    {
      id:          "elv003",
      prenom:      "Marc",
      nom:         "Antoine",
      identifiant: "marc.antoine",
      motDePasse:  "eleve2026",         // ← CHANGER
      classe:      "ta",
      initiales:   "MA",
      parentId:    "par003",
    },
    {
      id:          "elv004",
      prenom:      "Claire",
      nom:         "Dupont",
      identifiant: "claire.dupont",
      motDePasse:  "eleve2026",         // ← CHANGER
      classe:      "ta",
      initiales:   "CD",
      parentId:    "par004",
    },
    // ── Ajoutez d'autres élèves ici ──
    // {
    //   id:          "elv005",
    //   prenom:      "Prénom",
    //   nom:         "Nom",
    //   identifiant: "prenom.nom",
    //   motDePasse:  "motdepasse",
    //   classe:      "tb",
    //   initiales:   "PN",
    //   parentId:    "par005",
    // },
  ],

  // ══════════════════════════════════════════════
  //  5. PARENTS
  //  ⚠️  Remplacez par les vrais noms et contacts
  //  ⚠️  Changez les mots de passe
  // ══════════════════════════════════════════════
  parents: [
    {
      id:          "par001",
      prenom:      "Marie",
      nom:         "Pierre",
      identifiant: "marie.pierre",
      motDePasse:  "parent2026",        // ← CHANGER
      telephone:   "+509 3X XX XX XX",
      email:       "marie.pierre@email.com",
      enfantsIds:  ["elv001"],
      initiales:   "MP",
    },
    {
      id:          "par002",
      prenom:      "Robert",
      nom:         "Marc",
      identifiant: "robert.marc",
      motDePasse:  "parent2026",        // ← CHANGER
      telephone:   "+509 3X XX XX XX",
      email:       "robert.marc@email.com",
      enfantsIds:  ["elv002"],
      initiales:   "RM",
    },
    {
      id:          "par003",
      prenom:      "Louise",
      nom:         "Antoine",
      identifiant: "louise.antoine",
      motDePasse:  "parent2026",        // ← CHANGER
      telephone:   "+509 3X XX XX XX",
      email:       "",
      enfantsIds:  ["elv003"],
      initiales:   "LA",
    },
    {
      id:          "par004",
      prenom:      "Henri",
      nom:         "Dupont",
      identifiant: "henri.dupont",
      motDePasse:  "parent2026",        // ← CHANGER
      telephone:   "+509 3X XX XX XX",
      email:       "",
      enfantsIds:  ["elv004"],
      initiales:   "HD",
    },
    // ── Ajoutez d'autres parents ici ──
  ],

  // ══════════════════════════════════════════════
  //  6. ADMINISTRATEURS
  //  ⚠️  Changez le mot de passe obligatoirement !
  // ══════════════════════════════════════════════
  admins: [
    {
      id:          "adm001",
      prenom:      "Jean",
      nom:         "Baptiste",
      identifiant: "directeur",
      motDePasse:  "Admin@ILCH2026",    // ← CHANGER ABSOLUMENT
      role:        "Directeur",
      initiales:   "JB",
    },
    {
      id:          "adm002",
      prenom:      "Secrétariat",
      nom:         "ILCH",
      identifiant: "secretariat",
      motDePasse:  "Secr@ILCH2026",    // ← CHANGER
      role:        "Secrétaire",
      initiales:   "SE",
    },
  ],

  // ══════════════════════════════════════════════
  //  7. INFORMATIONS DE L'ÉCOLE
  // ══════════════════════════════════════════════
  ecole: {
    nom:       "Institution Louis Chauvet",
    sigle:     "ILCH",
    adresse:   "Thomassin 25, Pétion-Ville, Haïti",
    email:     "institutionlouischauvet@gmail.com",
    telephone: "+509 XX XX XX XX",
    anneeScolaire: "2025 – 2026",
  },
};

// ══════════════════════════════════════════════
//  FONCTION DE CONNEXION
//  Vérifie l'identifiant et le mot de passe
// ══════════════════════════════════════════════
function ilchLogin(identifiant, motDePasse, role) {
  var liste = [];
  if (role === "eleve")  liste = ILCH_DATA.eleves;
  if (role === "prof")   liste = ILCH_DATA.professeurs;
  if (role === "parent") liste = ILCH_DATA.parents;
  if (role === "admin")  liste = ILCH_DATA.admins;

  var utilisateur = liste.find(function(u) {
    return u.identifiant === identifiant && u.motDePasse === motDePasse;
  });

  if (utilisateur) {
    // Sauvegarde l'utilisateur connecté
    sessionStorage.setItem("ilch_user", JSON.stringify(utilisateur));
    sessionStorage.setItem("ilch_role", role);
    return { succes: true, utilisateur: utilisateur };
  }
  return { succes: false };
}

// ══════════════════════════════════════════════
//  UTILITAIRES
// ══════════════════════════════════════════════
function ilchGetClasse(id) {
  return ILCH_DATA.classes.find(function(c){ return c.id === id; });
}
function ilchGetMatiere(id) {
  return ILCH_DATA.matieres.find(function(m){ return m.id === id; });
}
function ilchGetEleve(id) {
  return ILCH_DATA.eleves.find(function(e){ return e.id === id; });
}
function ilchGetProf(id) {
  return ILCH_DATA.professeurs.find(function(p){ return p.id === id; });
}
function ilchGetParent(id) {
  return ILCH_DATA.parents.find(function(p){ return p.id === id; });
}
function ilchGetElevesParClasse(classeId) {
  return ILCH_DATA.eleves.filter(function(e){ return e.classe === classeId; });
}
function ilchGetProfsParMatiere(matiereId) {
  return ILCH_DATA.professeurs.filter(function(p){
    return p.matieres.indexOf(matiereId) !== -1;
  });
}

// ══════════════════════════════════════════════
//  8. RESPONSABLES PÉDAGOGIQUES
//  ⚠️  Remplacez par les vrais noms
//  ⚠️  Changez les mots de passe
// ══════════════════════════════════════════════
ILCH_DATA.responsables = [
  {
    id:          "resp001",
    prenom:      "Prénom",
    nom:         "Responsable",
    identifiant: "resp.prescolaire",
    motDePasse:  "resp2026",          // ← CHANGER
    section:     "prescolaire",
    sectionNom:  "Préscolaire",
    classes:     ["Maternelle"],
    initiales:   "PS",
  },
  {
    id:          "resp002",
    prenom:      "Prénom",
    nom:         "Responsable",
    identifiant: "resp.cycle1",
    motDePasse:  "resp2026",          // ← CHANGER
    section:     "cycle1",
    sectionNom:  "Fondamental Cycle 1",
    classes:     ["1ère", "2ème", "3ème année"],
    initiales:   "C1",
  },
  {
    id:          "resp003",
    prenom:      "Prénom",
    nom:         "Responsable",
    identifiant: "resp.cycle2",
    motDePasse:  "resp2026",          // ← CHANGER
    section:     "cycle2",
    sectionNom:  "Fondamental Cycle 2",
    classes:     ["4ème", "5ème", "6ème année"],
    initiales:   "C2",
  },
  {
    id:          "resp004",
    prenom:      "Prénom",
    nom:         "Responsable",
    identifiant: "resp.cycle3",
    motDePasse:  "resp2026",          // ← CHANGER
    section:     "cycle3",
    sectionNom:  "Fondamental Cycle 3",
    classes:     ["7ème", "8ème", "9ème", "Nouveau Secondaire"],
    initiales:   "C3",
  },
  {
    id:          "resp005",
    prenom:      "Prénom",
    nom:         "Responsable",
    identifiant: "resp.secondaire",
    motDePasse:  "resp2026",          // ← CHANGER
    section:     "secondaire",
    sectionNom:  "Secondaire",
    classes:     ["Rhétorique", "Terminale A", "Terminale B"],
    initiales:   "SC",
  },
];
