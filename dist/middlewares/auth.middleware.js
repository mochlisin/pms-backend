"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = authenticate;
const jwt_1 = require("../utils/jwt");
function authenticate(req, res, next) {
    const h = req.headers.authorization;
    if (!h?.startsWith('Bearer '))
        return res.status(401).json({ message: 'Missing bearer token' });
    try {
        const p = (0, jwt_1.verifyToken)(h.slice(7));
        req.user = { id: p.sub, role: p.role };
        next();
    }
    catch {
        res.status(401).json({ message: 'Invalid or expired token' });
    }
}
