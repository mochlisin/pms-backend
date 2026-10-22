# PMS Backend

Express + TypeScript + Prisma + PostgreSQL. Siap deploy Coolify.

## Jalankan lokal
```bash
npm install
cp .env.example .env     # isi JWT_SECRET + DATABASE_URL
npx prisma db push
npm run dev
```

## Self-check
```bash
JWT_SECRET=dummy-secret-123456 npx tsx tests/self-check.ts   # -> SELF-CHECK OK
```

## Deploy Coolify
1. Coolify > New Resource > **PostgreSQL**. Salin internal connection string.
2. New Resource > **Application** > source Git repo ini, Build Pack = **Dockerfile**.
3. Environment Variables:
   - `DATABASE_URL` = connection string Postgres internal (`?schema=public`)
   - `JWT_SECRET` = string acak panjang (jangan pakai nilai contoh)
   - `JWT_EXPIRES_IN` = `7d`
   - `PORT` = `3000`
4. Port Exposes: `3000`. Healthcheck path: `/health`.
5. Deploy. Container otomatis menjalankan `prisma db push` sebelum start.

## Endpoint
- `POST /api/auth/register`, `POST /api/auth/login`
- `GET /api/auth/users` (ADMIN, PROJECT_MANAGER), `PATCH /api/auth/users/:id/role` (ADMIN)
- `GET|POST /api/projects`, `GET|PATCH|DELETE /api/projects/:id`
- `GET|POST /api/tasks`, `PATCH|DELETE /api/tasks/:id`
- `GET /api/dashboard`
- `GET /health`

Semua rute kecuali register/login/health butuh header `Authorization: Bearer <token>`.
