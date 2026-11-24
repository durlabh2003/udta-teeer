# Security Specification — Urdta Teeeeeer Firestore & Auth

## 1. Data Invariants
1. **Strict Ownership (`ownerUid`)**: Every `/leads/{leadId}` and `/audits/{auditId}` document created from the client MUST belong strictly to `request.auth.uid` (`ownerUid == request.auth.uid`) and require a verified email (`request.auth.token.email_verified == true`). `ownerUid`, `leadId`/`auditId`, and `createdAt` are immutable after creation.
2. **PII Isolation (`/users/{userId}`)**: User profiles containing `email`, `phone`, and `displayName` are strictly readable (`get`) only by the owning user (`request.auth.uid == userId`) or a verified admin. `list` queries across `/users` are completely disabled (`allow list: if false;`) to prevent account enumeration.
3. **Self-Assigned Privilege Prevention**: Users cannot write `/admins/{adminId}` from the client (`allow read, write: if false;` on `/admins`), nor can they inject `role` or `isAdmin` ghost fields into `/users/{userId}` or `/leads/{leadId}` (blocked by `keys().hasOnly(...)` in `isValidUserProfile` and `isValidLead`).
4. **Tiered Update Partitioning & Terminal State Locking**:
   - Standard owners on `/leads/{leadId}` can only update `requirementNotes`, `budget`, `timeline`, and `updatedAt` via `affectedKeys().hasOnly(...)`, and are blocked once `status` reaches terminal states (`'Won'` or `'Lost'`).
   - Only verified studio admins (`isAdmin()`) can transition `status` or update `internalNotes`.
5. **Temporal Integrity & Path Hardening**:
   - Every document ID path variable (`userId`, `leadId`, `auditId`) MUST pass `isValidId(id)` (`^[a-zA-Z0-9_-]+$`, `<= 128` chars) on single-doc operations.
   - `createdAt == request.time` on `create` and `updatedAt == request.time` on `create`/`update`.

---

## 2. The "Dirty Dozen" Adversarial Payloads (Must All Return `PERMISSION_DENIED`)

1. **Unauthenticated Lead Write**: `POST /leads/UT-2026-999` with `request.auth == null` -> **DENIED** by `isVerifiedUser()`.
2. **Unverified Email Spoof**: `POST /users/u1` with `request.auth.token.email == 'durlabhdaryani70@gmail.com'` and `email_verified == false` -> **DENIED** by `isVerifiedUser()` & `isAdmin()`.
3. **UID Ownership Hijack**: User `u1` creates `/leads/lead-1` with `{ ownerUid: 'u2', ... }` -> **DENIED** by `incoming().ownerUid == request.auth.uid`.
4. **Shadow Admin / Ghost Field Injection**: User `u1` creates `/users/u1` including `{ ..., role: 'admin', isAdmin: true }` -> **DENIED** by `data.keys().hasOnly([...])`.
5. **Self-Promote to `/admins/{uid}`**: User `u1` attempts `setDoc(doc(db, 'admins', 'u1'), { uid: 'u1' })` -> **DENIED** by `allow read, write: if false;` on `/admins/{adminId}`.
6. **Cross-User PII Enumeration**: User `u2` calls `getDocs(collection(db, 'users'))` or `getDoc(doc(db, 'users', 'u1'))` -> **DENIED** by `allow list: if false` and `isOwner(userId)`.
7. **Unscoped List Query Scraping**: User `u2` runs `getDocs(collection(db, 'leads'))` without `where('ownerUid', '==', 'u2')` -> **DENIED** by `allow list: if (isSignedIn() && existing().ownerUid == request.auth.uid) || isAdmin()`.
8. **Lead Status Bypass / Self-Approval**: User `u1` creates `/leads/lead-1` with `{ status: 'Won' }` -> **DENIED** by `incoming().status == 'New'` on create.
9. **Unauthorized Status Escalation on Update**: User `u1` updates `/leads/lead-1` changing `{ status: 'Qualified', internalNotes: 'Approved' }` -> **DENIED** by owner tier `affectedKeys().hasOnly(['requirementNotes', 'budget', 'timeline', 'updatedAt'])`.
10. **Terminal State Mutation**: User `u1` updates `requirementNotes` on `/leads/lead-1` when existing `status == 'Won'` -> **DENIED** by `!(existing().status in ['Won', 'Lost'])`.
11. **Backdated Timestamp Poisoning**: User `u1` creates `/leads/lead-1` with `createdAt: '2020-01-01T00:00:00Z'` -> **DENIED** by `incoming().createdAt == request.time`.
12. **Denial-of-Wallet Payload / Oversized ID**: User `u1` creates `/leads/lead_with_200_chars...` or `requirementNotes` with 50KB string or 100 items in `selectedServices` -> **DENIED** by `isValidId()`, `requirementNotes.size() <= 2000`, and `selectedServices.size() <= 15`.
