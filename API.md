# API (extraits MVP)

## Auth
- `POST /auth/register` body `{ email, password, role, profile, tenantId, consentVersion, consentAcceptedAt }` → crée compte (médecin/infirmier en `pending`).
- `POST /auth/login` body `{ email, password }` → `{ accessToken, refreshToken, user }`.
- `POST /auth/refresh` body `{ refreshToken }`.
- `POST /auth/request-reset` body `{ email }`; `POST /auth/reset` body `{ token, password }`.

## Users & RBAC
- `GET /users/me` (auth) → profil + rôles + permissions.
- `PATCH /users/me` pour profil + photo (upload multipart)
- `GET /users` (Admin) query `tenantId`.
- Permissions: Patient (CRUD ses RDV/records), Doctor (RDV/consultations liés), Nurse (lecture dossiers + mises à jour soins), Admin (global). Décorateur `@Roles('Admin')` + `PoliciesGuard`.

## Structures
- `POST /tenants` (super-admin seed) ; `GET /hospitals` filter `country`; `POST /hospitals` (Admin). 
- `POST /services` (Admin) avec `hospitalId` optionnel (service indépendant). `POST /units` attaché à `serviceId`.

## Rendez-vous
- `GET /appointments` filtres `serviceId`, `staffId`, `status`, `dateFrom/to`.
- `POST /appointments` body `{ patientId, staffId, serviceId, dateTimeStart, dateTimeEnd, location, notes }` vérifie disponibilité.
- `PATCH /appointments/:id/confirm|cancel` avec audit.

## Consultations & Dossier
- `POST /consultations` body `{ appointmentId, summary, vitals, diagnosis, prescriptions }` (médecin/infirmier autorisés).
- `GET /records/:patientId` (patient ou staff autorisé) retourne données déchiffrées.
- `POST /documents` upload PDF/imagerie (stockage S3/minio adapter).

## Notifications
- `POST /notifications/test` (Admin) pour déclencher push/email.
- Webhook/adapters FCM+SMTP abstraits dans `NotificationService`.

## Audit & Consent
- `GET /audit` (Admin) filtres date/actor/entity.
- `GET /consent/me` et `POST /consent/accept`.
