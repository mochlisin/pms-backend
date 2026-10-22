"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.signToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
const signToken = (p) => jsonwebtoken_1.default.sign(p, env_1.env.jwtSecret, { expiresIn: env_1.env.jwtExpiresIn });
exports.signToken = signToken;
const verifyToken = (t) => jsonwebtoken_1.default.verify(t, env_1.env.jwtSecret);
exports.verifyToken = verifyToken;
