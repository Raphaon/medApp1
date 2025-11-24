# Sécurité & conformité

## Menaces
- Usurpation d'identité / vol de token
- Escalade de privilèges inter-tenant
- Accès non autorisé au dossier médical
- Fuite de données au repos/en transit
- Désynchronisation offline → données conflictuelles

## Mesures
- HTTPS obligatoire (TLS), HSTS côté reverse-proxy.
- JWT signés avec rotation (access court, refresh long) + stockage sécurisé mobile (Capacitor Secure Storage recommandé).
- RBAC + guards `TenantGuard` (scope tenant) ; politiques Admin vs staff vs patient.
- Hash bcrypt + politique mot de passe complexe + verrouillage après X échecs (à implémenter via Redis rate-limit).
- Audit log de toutes les actions sensibles (consultation de dossier, export, modification RDV).
- Chiffrement applicatif AES-256-GCM pour payload médical ; clés hors repo via variables CI/KMS.
- Backups chiffrés, rétention et purge conforme RGPD (droit à l'oubli limité dossier médical selon loi locale).
- Export/portabilité: endpoint `GET /records/:id/export` générant JSON/PDF (stub ici).
- Tests de sécurité automatisés recommandés (SAST, dépendances, OWASP ASVS/MASVS checklists).
