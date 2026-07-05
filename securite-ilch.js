// ══════════════════════════════════════════════════════════
//  securite-ilch.js — Système de sécurité complet ILCH
//  À inclure dans login.html et tous les dashboards
// ══════════════════════════════════════════════════════════

// ── Configuration sécurité ─────────────────────────────────
const SECURITY_CONFIG = {
  MAX_TENTATIVES:     5,        // Tentatives avant blocage
  BLOCAGE_MINUTES:   15,        // Minutes de blocage
  SESSION_HEURES:     8,        // Durée session (heures)
  SESSION_KEY:       'ilch_session',
  TENTATIVES_KEY:    'ilch_tentatives',
  JOURNAL_KEY:       'ilch_journal',
};

// ── 1. LIMITE DE TENTATIVES DE CONNEXION ──────────────────

const SecuriteTentatives = {

  // Obtenir les tentatives pour un identifiant
  get: function(identifiant) {
    try {
      var data = JSON.parse(localStorage.getItem(
        SECURITY_CONFIG.TENTATIVES_KEY + '_' + identifiant
      ) || '{}');
      return data;
    } catch(e) { return {}; }
  },

  // Enregistrer une tentative échouée
  echouer: function(identifiant) {
    var data = this.get(identifiant);
    data.compte = (data.compte || 0) + 1;
    data.dernierEssai = Date.now();
    if (data.compte >= SECURITY_CONFIG.MAX_TENTATIVES) {
      data.bloqueJusqua = Date.now() + (SECURITY_CONFIG.BLOCAGE_MINUTES * 60 * 1000);
    }
    localStorage.setItem(
      SECURITY_CONFIG.TENTATIVES_KEY + '_' + identifiant,
      JSON.stringify(data)
    );
    return data;
  },

  // Réinitialiser après connexion réussie
  reinitialiser: function(identifiant) {
    localStorage.removeItem(SECURITY_CONFIG.TENTATIVES_KEY + '_' + identifiant);
  },

  // Vérifier si bloqué
  estBloque: function(identifiant) {
    var data = this.get(identifiant);
    if (!data.bloqueJusqua) return { bloque: false };
    if (Date.now() < data.bloqueJusqua) {
      var restant = Math.ceil((data.bloqueJusqua - Date.now()) / 60000);
      return { bloque: true, minutes: restant };
    }
    // Débloquer automatiquement après le délai
    this.reinitialiser(identifiant);
    return { bloque: false };
  },

  // Tentatives restantes
  restantes: function(identifiant) {
    var data = this.get(identifiant);
    return Math.max(0, SECURITY_CONFIG.MAX_TENTATIVES - (data.compte || 0));
  }
};

// ── 2. GESTION DE SESSION SÉCURISÉE ───────────────────────

const SecuriteSession = {

  // Créer une session après connexion réussie
  creer: function(user, role) {
    var expiration = Date.now() + (SECURITY_CONFIG.SESSION_HEURES * 60 * 60 * 1000);
    var session = {
      userId:     user.id,
      identifiant: user.identifiant,
      prenom:     user.prenom,
      nom:        user.nom,
      role:       role,
      expiration: expiration,
      token:      this.genererToken(),
      ip:         'local',
      creedLe:    new Date().toISOString()
    };
    sessionStorage.setItem(SECURITY_CONFIG.SESSION_KEY, JSON.stringify(session));
    sessionStorage.setItem('ilch_user', JSON.stringify(user));
    sessionStorage.setItem('ilch_role', role);
    return session;
  },

  // Vérifier si la session est valide
  verifier: function() {
    try {
      var session = JSON.parse(sessionStorage.getItem(SECURITY_CONFIG.SESSION_KEY) || '{}');
      if (!session.userId) return null;
      if (Date.now() > session.expiration) {
        this.detruire();
        return null;
      }
      return session;
    } catch(e) { return null; }
  },

  // Obtenir l'utilisateur connecté
  getUser: function() {
    var session = this.verifier();
    if (!session) return null;
    try {
      return JSON.parse(sessionStorage.getItem('ilch_user') || '{}');
    } catch(e) { return null; }
  },

  // Détruire la session (déconnexion)
  detruire: function() {
    sessionStorage.removeItem(SECURITY_CONFIG.SESSION_KEY);
    sessionStorage.removeItem('ilch_user');
    sessionStorage.removeItem('ilch_role');
  },

  // Générer un token unique
  genererToken: function() {
    return Math.random().toString(36).substr(2) + Date.now().toString(36);
  },

  // Vérifier et rediriger si non connecté
  requireAuth: function(role) {
    var session = this.verifier();
    if (!session) {
      window.location.href = 'login.html';
      return false;
    }
    if (role && session.role !== role && session.role !== 'owner' && session.role !== 'admin') {
      window.location.href = 'login.html';
      return false;
    }
    return session;
  }
};

// ── 3. JOURNAL DE SÉCURITÉ ────────────────────────────────

const JournalSecurite = {

  // Ajouter une entrée au journal
  ajouter: function(type, details) {
    try {
      var journal = JSON.parse(localStorage.getItem(SECURITY_CONFIG.JOURNAL_KEY) || '[]');
      journal.unshift({
        type:    type,
        details: details,
        date:    new Date().toISOString(),
        heure:   new Date().toLocaleTimeString('fr-FR'),
        jour:    new Date().toLocaleDateString('fr-FR')
      });
      // Garder seulement les 200 dernières entrées
      if (journal.length > 200) journal = journal.slice(0, 200);
      localStorage.setItem(SECURITY_CONFIG.JOURNAL_KEY, JSON.stringify(journal));
    } catch(e) {}
  },

  // Lire le journal
  lire: function() {
    try {
      return JSON.parse(localStorage.getItem(SECURITY_CONFIG.JOURNAL_KEY) || '[]');
    } catch(e) { return []; }
  },

  // Types d'événements
  TYPES: {
    CONNEXION_OK:     '✅ Connexion réussie',
    CONNEXION_ECHEC:  '❌ Tentative échouée',
    DECONNEXION:      '🚪 Déconnexion',
    BLOCAGE:          '🔒 Compte bloqué',
    MOT_PASSE_CHANGE: '🔑 Mot de passe changé',
    COMPTE_CREE:      '👤 Compte créé',
    COMPTE_SUPPRIME:  '🗑️ Compte supprimé',
    SESSION_EXPIREE:  '⏰ Session expirée',
    ACCES_REFUSE:     '🚫 Accès refusé',
  }
};

// ── 4. PROTECTION CONTRE LES ATTAQUES ────────────────────

const ProtectionAttaques = {

  // Nettoyer les entrées (éviter injection XSS)
  nettoyerInput: function(str) {
    if (!str) return '';
    return String(str)
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
  },

  // Valider un identifiant
  validerIdentifiant: function(id) {
    // Seulement lettres, chiffres, points et tirets
    return /^[a-zA-Z0-9._-]{3,50}$/.test(id);
  },

  // Valider un mot de passe
  validerMotDePasse: function(pw) {
    return pw && pw.length >= 6;
  },

  // Vérifier force du mot de passe
  forcePW: function(pw) {
    var score = 0;
    if (!pw) return { score: 0, label: 'Vide', color: '#9CA3AF' };
    if (pw.length >= 8)  score++;
    if (pw.length >= 12) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^a-zA-Z0-9]/.test(pw)) score++;
    var labels = ['Très faible','Faible','Moyen','Fort','Très fort'];
    var colors = ['#DC2626','#D97706','#F59E0B','#16A34A','#0D9488'];
    return { score, label: labels[score] || 'Inconnu', color: colors[score] || '#9CA3AF' };
  }
};

// ── 5. DÉCONNEXION AUTOMATIQUE ────────────────────────────

const DeconnexionAuto = {

  timer: null,
  INACTIVITE_MINUTES: 30, // Déconnecter après 30 min d'inactivité

  // Démarrer le timer
  demarrer: function() {
    this.reinitialiser();
    // Écouter les actions de l'utilisateur
    ['click','keypress','scroll','mousemove'].forEach(event => {
      document.addEventListener(event, () => this.reinitialiser(), { passive: true });
    });
  },

  // Réinitialiser le timer
  reinitialiser: function() {
    if (this.timer) clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      var session = SecuriteSession.verifier();
      if (session) {
        JournalSecurite.ajouter(
          JournalSecurite.TYPES.SESSION_EXPIREE,
          'Inactivité de ' + this.INACTIVITE_MINUTES + ' minutes'
        );
        SecuriteSession.detruire();
        alert('Votre session a expiré par inactivité. Veuillez vous reconnecter.');
        window.location.href = 'login.html';
      }
    }, this.INACTIVITE_MINUTES * 60 * 1000);
  },

  // Arrêter
  arreter: function() {
    if (this.timer) clearTimeout(this.timer);
  }
};

// ── 6. EXPORT GLOBAL ──────────────────────────────────────
window.ILCH_SECURITE = {
  Tentatives:    SecuriteTentatives,
  Session:       SecuriteSession,
  Journal:       JournalSecurite,
  Protection:    ProtectionAttaques,
  DeconnexionAuto: DeconnexionAuto,
  Config:        SECURITY_CONFIG
};

console.log('🛡️ Système de sécurité ILCH chargé ✓');
