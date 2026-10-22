"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
require("dotenv/config");
function required(key) {
    const v = process.env[key];
    if (!v)
        throw new Error(`Missing required env var: ${key}`);
    return v;
}
exports.env = {
    port: Number(process.env.PORT ?? 3000),
    jwtSecret: required('JWT_SECRET'),
    jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? '7d',
};
