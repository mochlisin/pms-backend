"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = notFound;
exports.errorHandler = errorHandler;
const zod_1 = require("zod");
function notFound(_req, res) {
    res.status(404).json({ message: 'Route not found' });
}
function errorHandler(err, _req, res, _next) {
    if (err instanceof zod_1.ZodError) {
        return res.status(400).json({ message: 'Validation failed', issues: err.issues });
    }
    if (err?.code === 'P2002')
        return res.status(409).json({ message: 'Duplicate value' });
    if (err?.code === 'P2025')
        return res.status(404).json({ message: 'Record not found' });
    const status = err.status ?? 500;
    res.status(status).json({ message: status === 500 ? 'Internal server error' : err.message });
}
