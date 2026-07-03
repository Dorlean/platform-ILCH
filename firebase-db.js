// ══════════════════════════════════════════════════════════
//  firebase-db.js — Toutes les opérations base de données
//  Institution Louis Chauvet · Pétion-Ville, Haïti
// ══════════════════════════════════════════════════════════

import {
  db, collection, doc,
  addDoc, setDoc, getDoc, getDocs,
  updateDoc, deleteDoc,
  onSnapshot, query, where, orderBy
} from './firebase-config.js';

// ══════════════════════════════════════════════════════════
//  UTILISATEURS
// ══════════════════════════════════════════════════════════

// Créer un utilisateur
export async function creerUtilisateur(data) {
  return await addDoc(collection(db, 'utilisateurs'), {
    ...data,
    dateCreation: new Date().toISOString()
  });
}

// Récupérer un utilisateur par identifiant + mot de passe
export async function connecterUtilisateur(identifiant, motDePasse) {
  const q = query(
    collection(db, 'utilisateurs'),
    where('identifiant', '==', identifiant),
    where('motDePasse', '==', motDePasse)
  );
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const docData = snap.docs[0];
  return { id: docData.id, ...docData.data() };
}

// Récupérer tous les utilisateurs
export async function getTousUtilisateurs() {
  const snap = await getDocs(collection(db, 'utilisateurs'));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

// Modifier un utilisateur
export async function modifierUtilisateur(id, data) {
  await updateDoc(doc(db, 'utilisateurs', id), data);
}

// Supprimer un utilisateur
export async function supprimerUtilisateur(id) {
  await deleteDoc(doc(db, 'utilisateurs', id));
}

// ══════════════════════════════════════════════════════════
//  ÉLÈVES
// ══════════════════════════════════════════════════════════

export async function ajouterEleve(data) {
  return await addDoc(collection(db, 'eleves'), {
    ...data, dateCreation: new Date().toISOString()
  });
}

export async function getTousEleves() {
  const snap = await getDocs(collection(db, 'eleves'));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function getElevesParClasse(classe) {
  const q = query(collection(db, 'eleves'), where('classe', '==', classe));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function modifierEleve(id, data) {
  await updateDoc(doc(db, 'eleves', id), data);
}

export async function supprimerEleve(id) {
  await deleteDoc(doc(db, 'eleves', id));
}

// Écouter les élèves en temps réel
export function ecouterEleves(callback) {
  return onSnapshot(collection(db, 'eleves'), snap => {
    callback(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  });
}

// ══════════════════════════════════════════════════════════
//  PROFESSEURS
// ══════════════════════════════════════════════════════════

export async function ajouterProfesseur(data) {
  return await addDoc(collection(db, 'professeurs'), {
    ...data, dateCreation: new Date().toISOString()
  });
}

export async function getTousProfesseurs() {
  const snap = await getDocs(collection(db, 'professeurs'));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function modifierProfesseur(id, data) {
  await updateDoc(doc(db, 'professeurs', id), data);
}

export async function supprimerProfesseur(id) {
  await deleteDoc(doc(db, 'professeurs', id));
}

export function ecouterProfesseurs(callback) {
  return onSnapshot(collection(db, 'professeurs'), snap => {
    callback(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  });
}

// ══════════════════════════════════════════════════════════
//  PARENTS
// ══════════════════════════════════════════════════════════

export async function ajouterParent(data) {
  return await addDoc(collection(db, 'parents'), {
    ...data, dateCreation: new Date().toISOString()
  });
}

export async function getTousParents() {
  const snap = await getDocs(collection(db, 'parents'));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function modifierParent(id, data) {
  await updateDoc(doc(db, 'parents', id), data);
}

export async function supprimerParent(id) {
  await deleteDoc(doc(db, 'parents', id));
}

// ══════════════════════════════════════════════════════════
//  CLASSES
// ══════════════════════════════════════════════════════════

export async function ajouterClasse(data) {
  return await addDoc(collection(db, 'classes'), data);
}

export async function getToutesClasses() {
  const snap = await getDocs(collection(db, 'classes'));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function supprimerClasse(id) {
  await deleteDoc(doc(db, 'classes', id));
}

// ══════════════════════════════════════════════════════════
//  MATIÈRES
// ══════════════════════════════════════════════════════════

export async function ajouterMatiere(data) {
  return await addDoc(collection(db, 'matieres'), data);
}

export async function getToutesMatieres() {
  const snap = await getDocs(collection(db, 'matieres'));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function supprimerMatiere(id) {
  await deleteDoc(doc(db, 'matieres', id));
}

// ══════════════════════════════════════════════════════════
//  NOTES
// ══════════════════════════════════════════════════════════

export async function ajouterNote(data) {
  return await addDoc(collection(db, 'notes'), {
    ...data, dateCreation: new Date().toISOString()
  });
}

export async function getNotesPourEleve(eleveId) {
  const q = query(collection(db, 'notes'), where('eleveId', '==', eleveId));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function getToutesNotes() {
  const snap = await getDocs(collection(db, 'notes'));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function modifierNote(id, data) {
  await updateDoc(doc(db, 'notes', id), data);
}

export async function supprimerNote(id) {
  await deleteDoc(doc(db, 'notes', id));
}

export function ecouterNotes(callback) {
  return onSnapshot(collection(db, 'notes'), snap => {
    callback(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  });
}

// ══════════════════════════════════════════════════════════
//  DEVOIRS
// ══════════════════════════════════════════════════════════

export async function publierDevoir(data) {
  return await addDoc(collection(db, 'devoirs'), {
    ...data,
    corrige: null,
    dateCreation: new Date().toISOString()
  });
}

export async function getTousDevoirs() {
  const snap = await getDocs(collection(db, 'devoirs'));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function modifierDevoir(id, data) {
  await updateDoc(doc(db, 'devoirs', id), data);
}

export async function publierCorrige(devoirId, corrige) {
  await updateDoc(doc(db, 'devoirs', devoirId), { corrige });
}

export async function supprimerDevoir(id) {
  await deleteDoc(doc(db, 'devoirs', id));
}

// Écouter les devoirs en temps réel (élèves voient instantanément)
export function ecouterDevoirs(callback) {
  return onSnapshot(collection(db, 'devoirs'), snap => {
    callback(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  });
}

// ══════════════════════════════════════════════════════════
//  ABSENCES
// ══════════════════════════════════════════════════════════

export async function ajouterAbsence(data) {
  return await addDoc(collection(db, 'absences'), {
    ...data, dateCreation: new Date().toISOString()
  });
}

export async function getToutesAbsences() {
  const snap = await getDocs(collection(db, 'absences'));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function supprimerAbsence(id) {
  await deleteDoc(doc(db, 'absences', id));
}

// ══════════════════════════════════════════════════════════
//  ANNONCES
// ══════════════════════════════════════════════════════════

export async function publierAnnonce(data) {
  return await addDoc(collection(db, 'annonces'), {
    ...data, date: new Date().toISOString()
  });
}

export async function getToutesAnnonces() {
  const snap = await getDocs(collection(db, 'annonces'));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function supprimerAnnonce(id) {
  await deleteDoc(doc(db, 'annonces', id));
}

// Écouter les annonces en temps réel
export function ecouterAnnonces(callback) {
  return onSnapshot(collection(db, 'annonces'), snap => {
    callback(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  });
}

// ══════════════════════════════════════════════════════════
//  FRAIS SCOLAIRES & VERSEMENTS
// ══════════════════════════════════════════════════════════

export async function creerDossierFrais(data) {
  return await addDoc(collection(db, 'frais'), {
    ...data, dateCreation: new Date().toISOString()
  });
}

export async function getTousDossiersFrais() {
  const snap = await getDocs(collection(db, 'frais'));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function modifierDossierFrais(id, data) {
  await updateDoc(doc(db, 'frais', id), data);
}

export async function supprimerDossierFrais(id) {
  await deleteDoc(doc(db, 'frais', id));
}

export async function ajouterVersement(data) {
  return await addDoc(collection(db, 'versements'), {
    ...data, dateCreation: new Date().toISOString()
  });
}

export async function getTousVersements() {
  const snap = await getDocs(collection(db, 'versements'));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function supprimerVersement(id) {
  await deleteDoc(doc(db, 'versements', id));
}

export async function ajouterDepense(data) {
  return await addDoc(collection(db, 'depenses'), {
    ...data, dateCreation: new Date().toISOString()
  });
}

export async function getToutesDepenses() {
  const snap = await getDocs(collection(db, 'depenses'));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function supprimerDepense(id) {
  await deleteDoc(doc(db, 'depenses', id));
}

// ══════════════════════════════════════════════════════════
//  BIBLIOTHÈQUE
// ══════════════════════════════════════════════════════════

export async function ajouterLivre(data) {
  return await addDoc(collection(db, 'livres'), {
    ...data, dateAjout: new Date().toISOString()
  });
}

export async function getTousLivres() {
  const snap = await getDocs(collection(db, 'livres'));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function modifierLivre(id, data) {
  await updateDoc(doc(db, 'livres', id), data);
}

export async function supprimerLivre(id) {
  await deleteDoc(doc(db, 'livres', id));
}

export async function ajouterEmprunt(data) {
  return await addDoc(collection(db, 'emprunts'), {
    ...data, statut: 'emprunte', dateCreation: new Date().toISOString()
  });
}

export async function getTousEmprunts() {
  const snap = await getDocs(collection(db, 'emprunts'));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function marquerLivreRendu(id) {
  await updateDoc(doc(db, 'emprunts', id), {
    statut: 'rendu',
    dateRendu: new Date().toISOString().slice(0, 10)
  });
}

export async function supprimerEmprunt(id) {
  await deleteDoc(doc(db, 'emprunts', id));
}

// ══════════════════════════════════════════════════════════
//  INFIRMERIE
// ══════════════════════════════════════════════════════════

export async function ajouterConsultation(data) {
  return await addDoc(collection(db, 'consultations'), {
    ...data, dateCreation: new Date().toISOString()
  });
}

export async function getToutesConsultations() {
  const snap = await getDocs(collection(db, 'consultations'));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function supprimerConsultation(id) {
  await deleteDoc(doc(db, 'consultations', id));
}

export async function getTousMedicaments() {
  const snap = await getDocs(collection(db, 'medicaments'));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function modifierMedicament(id, data) {
  await updateDoc(doc(db, 'medicaments', id), data);
}

// ══════════════════════════════════════════════════════════
//  MESSAGES
// ══════════════════════════════════════════════════════════

export async function envoyerMessage(data) {
  return await addDoc(collection(db, 'messages'), {
    ...data, date: new Date().toISOString(), lu: false
  });
}

export async function getMessagesUtilisateur(userId) {
  const q = query(
    collection(db, 'messages'),
    where('destinataireId', '==', userId)
  );
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function marquerMessageLu(id) {
  await updateDoc(doc(db, 'messages', id), { lu: true });
}

// Écouter les messages en temps réel
export function ecouterMessages(userId, callback) {
  const q = query(
    collection(db, 'messages'),
    where('destinataireId', '==', userId)
  );
  return onSnapshot(q, snap => {
    callback(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  });
}
