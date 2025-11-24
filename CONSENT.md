# Gestion du consentement

- Version actuelle: `v1.0` (consentement explicite pour traitement des données de santé, notifications, export, stockage cloud chiffré).
- Collecte lors de l'inscription (cases à cocher distinctes + lien politique de confidentialité). Opt-in par défaut désactivé.
- Stockage: `users.consentVersion`, `users.consentAcceptedAt`, `users.consentScope` (array). Historisé via `ConsentLog` (voir Prisma).
- Retrait: endpoint `POST /consent/revoke` → bloque accès non nécessaire et planifie purge lorsque légalement possible.
- Export: `GET /records/:id/export` fournit JSON/PDF stub ; l'action est auditée.
- Preuve: signature serveur des consentements (hash payload + timestamp) stockée en base.
