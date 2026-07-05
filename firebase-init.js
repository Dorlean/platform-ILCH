// ══════════════════════════════════════════════════════════
//  firebase-init.js — Initialisation centrale Firebase ILCH
//  À inclure dans tous les dashboards avec type="module"
// ══════════════════════════════════════════════════════════

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getFirestore,
  collection, doc,
  addDoc, setDoc, getDoc, getDocs, updateDoc, deleteDoc,
  onSnapshot, query, where, orderBy, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDjrBnsTu7CNWnqeqSm29-arbs8MPoTBJ0",
  authDomain: "ilch-plateforme.firebaseapp.com",
  projectId: "ilch-plateforme",
  storageBucket: "ilch-plateforme.firebasestorage.app",
  messagingSenderId: "978336467476",
  appId: "1:978336467476:web:1f716ca406469a0c62b501"
};

const app = initializeApp(firebaseConfig);
const db  = getFirestore(app);

// ── Récupérer session utilisateur ──────────────────────────
function getUser() {
  try { return JSON.parse(sessionStorage.getItem('ilch_user')); }
  catch(e) { return null; }
}

function getRole() {
  return sessionStorage.getItem('ilch_role') || '';
}

// ── Rediriger si non connecté ──────────────────────────────
function requireAuth() {
  if (!getUser()) window.location.href = 'login.html';
}

// ── CRUD générique ─────────────────────────────────────────
async function fbAdd(col, data) {
  return await addDoc(collection(db, col), {
    ...data, createdAt: new Date().toISOString()
  });
}

async function fbGetAll(col) {
  const snap = await getDocs(collection(db, col));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

async function fbGet(col, id) {
  const snap = await getDoc(doc(db, col, id));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

async function fbUpdate(col, id, data) {
  await updateDoc(doc(db, col, id), data);
}

async function fbDelete(col, id) {
  await deleteDoc(doc(db, col, id));
}

async function fbQuery(col, field, op, value) {
  const q = query(collection(db, col), where(field, op, value));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

function fbListen(col, callback) {
  return onSnapshot(collection(db, col), snap => {
    callback(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  });
}

function fbListenQuery(col, field, op, value, callback) {
  const q = query(collection(db, col), where(field, op, value));
  return onSnapshot(q, snap => {
    callback(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  });
}

// ── localStorage fallback ──────────────────────────────────
function lsGet(key) {
  try { return JSON.parse(localStorage.getItem('ilch_' + key)) || []; }
  catch(e) { return []; }
}
function lsSet(key, val) {
  localStorage.setItem('ilch_' + key, JSON.stringify(val));
}

export {
  db, getUser, getRole, requireAuth,
  fbAdd, fbGetAll, fbGet, fbUpdate, fbDelete,
  fbQuery, fbListen, fbListenQuery,
  lsGet, lsSet,
  collection, doc, addDoc, getDocs, updateDoc, deleteDoc,
  onSnapshot, query, where, orderBy
};
