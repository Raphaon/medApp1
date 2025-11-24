# Architecture MedApp (MVP → V2)

## Vue d'ensemble (texte)
- **Front mobile (Ionic/Angular)**: modules `auth`, `onboarding`, `profile`, `search`, `appointments`, `records`, `notifications`, `settings`. State NgRx (feature par domaine). Services API Axios, interceptors JWT/tenant, stockage offline (Ionic Storage + SQLite), file queue pour synchro.
- **API NestJS**: modular monolith avec domaines: `auth`, `users`, `tenants`, `hospitals`, `services`, `units`, `staff`, `appointments`, `consultations`, `medical-records`, `documents`, `notifications`, `audit`, `consent`, `reporting`, `payments` (stub), `telemedicine` (stub). Guards: `JwtAuthGuard`, `RbacGuard`, `TenantGuard`, `AuditInterceptor`. Pipes de validation (class-validator/zod). Prisma pour ORM.
- **Infra**: PostgreSQL + Redis (queues + rate limiting). Docker Compose pour dev. TLS via mkcert. CI GitHub Actions (lint/build/test/migrations dry-run/apk debug).

```
[Mobile Ionic] --HTTPS/JWT--> [API Gateway (Nest)] --Prisma--> [PostgreSQL]
                                        |--Redis (queues/rate-limit)
                                        |--Adapters: FCM/SMTP, Stripe (V2), Visio (V2)
                                        |--Storage (S3/minio dev) pour documents
```

## Bounded contexts
- **Identity**: auth, users, tenants, RBAC, consent, audit.
- **Care Delivery**: hospitals/services/units/staff, appointments, consultations.
- **Records**: dossiers médicaux, documents, export, chiffrement.
- **Engagement**: notifications, onboarding, search.
- **Billing/Visio (V2)**: payments, télémed.

## ORM, multi-tenant et sécurité
- Prisma avec `tenantId` obligatoire sur les entités multi-tenant. Guards Nest ajoutent un scope Prisma `{ where: { tenantId: currentTenant } }`. Postgres RLS recommandé en prod (policies générées par migrations) ; non activé dans ce squelette.
- Chiffrement applicatif: champ `medicalRecords.encryptedPayload` avec AES-256-GCM ; clé fournie via variable d'env (`ENCRYPTION_KEY`).
- Audit: interceptor enregistre `actorId`, action, entité, timestamp, IP, tenant. Persisté via Prisma.
- Consentement: versionnage (`consentVersion`) + timestamp `consentAt` + scope. Refus bloque opérations sensibles (guard `ConsentGuard`).

## Rendez-vous & calendrier
- Plages horaires stockées dans `StaffAvailability` (schéma Prisma). Création RDV vérifie chevauchements via requête Prisma (conflit si `start < existingEnd && end > existingStart`).
- Rappels: cron Nest Schedule + queue Redis; envoie via adapter FCM (push) et SMTP (email) selon préférences utilisateur.

## Offline & sync mobile
- Cache SQLite via Ionic Storage pour services, hôpitaux, RDV de l'utilisateur. File d'actions offline (création RDV) rejouée au regain de réseau ; stratégie de réconciliation `last-write-wins` avec notifications utilisateur en cas de conflit.

## Navigation & i18n mobile
- Angular Router segments: `/onboarding`, `/auth/login`, `/auth/register/:role`, `/search`, `/services/:id`, `/appointments`, `/appointments/:id`, `/records`, `/notifications`, `/settings`.
- ngx-translate avec bundles `en`, `fr`; clés partagées dans `packages/shared/src/i18n-keys.ts`.

## Extensions V2
- Paiements: adapter Stripe (mode test) exposé via service `BillingService` et contrôleur `PaymentsController`.
- Télé-médecine: adapter abstrait `VideoProvider` avec implémentations Twilio/Jitsi/Daily et mock pour tests.
- Partage inter-établissements: endpoint export/import dossier + autorisations temporaires (scope OAuth-like).
