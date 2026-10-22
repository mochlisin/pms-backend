import { app } from './app';
import { env } from './config/env';
import { prisma } from './config/db';

const server = app.listen(env.port, () => console.log(`API listening on :${env.port}`));

for (const sig of ['SIGINT', 'SIGTERM'] as const) {
  process.on(sig, async () => {
    server.close();
    await prisma.$disconnect();
    process.exit(0);
  });
}
