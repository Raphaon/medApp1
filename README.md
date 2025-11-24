# MedApp Monorepo (squelette MVP → V2)

Monorepo Ionic/Angular + NestJS/Prisma + PostgreSQL/Redis. Ce socle adresse authentification, RBAC multi-tenant, rendez-vous, dossier médical, notifications, consentement et audit. Les dépendances externes (paiement, visio, e-mail/push) sont encapsulées dans des adapters remplaçables.

## Lancer rapidement
```bash
pnpm install
pnpm prisma:migrate # nécessite docker compose infra
pnpm --filter api-nest start:dev
```

## Structure
- `apps/api-nest`: API NestJS modulaire (auth, users, tenants, hospitals/services, appointments, consultations, records, notifications, audit, consent, reporting, stubs payments/telemedicine).
- `apps/mobile-ionic`: application Ionic/Angular (onboarding, auth, profil, recherche service, calendrier, prise RDV, dossiers, notifications, paramètres). NgRx + ngx-translate + stockage offline.
- `packages/shared`: modèles/DTO communs, constantes RBAC, schémas de validation.
- `infra/`: docker-compose Postgres/Redis, TLS dev avec mkcert (à compléter), migrations/seeds multi-tenant.

## ORM & multi-tenant
Prisma est choisi pour son typage strict et son support multi-provider (PostgreSQL pour prod, SQLite pour tests/offline). Le multi-tenant est géré par `tenantId` sur les tables + guards Nest (scoping applicatif) ; une évolution vers RLS PostgreSQL est décrite dans `ARCHITECTURE.md`.

## Sécurité
- JWT access/refresh, mots de passe hashés (bcrypt).
- RBAC via décorateur `@Roles` + guard `RbacGuard`.
- Consentement explicite stocké (date, version, scope) ; export des données utilisateur via endpoint dédié.
- Chiffrement applicatif des champs sensibles (dossier médical) avec AES-256 et rotation de clés (KMS/vars CI).
- Audit log des actions et accès aux dossiers.

## Formulaires d'inscription
Les champs patients/médecins/infirmiers/admin sont basés sur les spécifications fournies (identité, contacts, spécialité, numéro pro, consentement explicite). Les validations sont définies dans `packages/shared/src/validation.ts` et réutilisées côté mobile (Reactive Forms) et API (Pipes).

## Tests
- Backend: Jest unit (services/guards) + e2e Supertest (auth, RBAC, CRUD hospital/service, RDV). 
- Mobile: tests unitaires Angular + e2e Cypress (mock API). Les suites sont stubées ici ; à compléter.

## CI
GitHub Actions (non fournie ici) doit exécuter lint, build, tests, migrations (dry-run) et build APK debug.
