"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const env_1 = require("./config/env");
const db_1 = require("./config/db");
const server = app_1.app.listen(env_1.env.port, () => console.log(`API listening on :${env_1.env.port}`));
for (const sig of ['SIGINT', 'SIGTERM']) {
    process.on(sig, async () => {
        server.close();
        await db_1.prisma.$disconnect();
        process.exit(0);
    });
}
