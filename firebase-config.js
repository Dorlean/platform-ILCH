// ══════════════════════════════════════════════════════════
//  firebase-config.js — Configuration Firebase ILCH
//  Institution Louis Chauvet · Pétion-Ville, Haïti
// ══════════════════════════════════════════════════════════

// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, doc, addDoc, setDoc, getDoc, getDocs, updateDoc, deleteDoc, onSnapshot, query, where, orderBy } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// ── Vos clés Firebase ──────────────────────────────────────
const firebaseConfig = {
  apiKey: "AIzaSyDjrBnsTu7CNWnqeqSm29-arbs8MPoTBJ0",
  authDomain: "ilch-plateforme.firebaseapp.com",
  projectId: "ilch-plateforme",
  storageBucket: "ilch-plateforme.firebasestorage.app",
  messagingSenderId: "978336467476",
  appId: "1:978336467476:web:1f716ca406469a0c62b501"
};

// ── Initialisation ─────────────────────────────────────────
const app  = initializeApp(firebaseConfig);
const db   = getFirestore(app);
const auth = getAuth(app);

// ── Collections Firestore ──────────────────────────────────
// Chaque collection = un tableau dans la base de données
//
//  utilisateurs/   → comptes de tous les utilisateurs
//  eleves/         → dossiers élèves
//  professeurs/    → dossiers professeurs
//  parents/        → dossiers parents
//  classes/        → classes de l'école
//  matieres/       → matières enseignées
//  notes/          → notes des élèves
//  devoirs/        → devoirs publiés par les profs
//  absences/       → absences enregistrées
//  annonces/       → annonces publiées
//  frais/          → dossiers de frais scolaires
//  versements/     → paiements enregistrés
//  depenses/       → dépenses de l'école
//  livres/         → catalogue bibliothèque
//  emprunts/       → emprunts bibliothèque
//  consultations/  → consultations infirmerie
//  medicaments/    → stock médicaments
//  messages/       → messages entre utilisateurs

// ── Export ─────────────────────────────────────────────────
export {
  db, auth,
  collection, doc,
  addDoc, setDoc, getDoc, getDocs,
  updateDoc, deleteDoc,
  onSnapshot, query, where, orderBy,
  signInWithEmailAndPassword, signOut, onAuthStateChanged
};
