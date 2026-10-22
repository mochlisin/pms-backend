import assert from 'node:assert';
import http from 'node:http';
// Jalankan: JWT_SECRET=dummy npx tsx tests/self-check.ts
import { app } from '../src/app';

const server = http.createServer(app);
server.listen(0, async () => {
  const port = (server.address() as any).port;
  try {
    const res = await fetch(`http://127.0.0.1:${port}/health`);
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.deepEqual(body, { status: 'ok' });

    const authRes = await fetch(`http://127.0.0.1:${port}/api/projects`);
    assert.equal(authRes.status, 401);

    console.log('SELF-CHECK OK');
  } finally {
    server.close();
  }
});
