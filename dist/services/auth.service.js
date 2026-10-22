"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRole = exports.listUsers = void 0;
exports.register = register;
exports.login = login;
const db_1 = require("../config/db");
const password_1 = require("../utils/password");
const jwt_1 = require("../utils/jwt");
async function register(data) {
    return db_1.prisma.user.create({
        data: { ...data, password: await (0, password_1.hashPassword)(data.password) },
        select: { id: true, email: true, name: true, role: true },
    });
}
async function login(email, password) {
    const user = await db_1.prisma.user.findUnique({ where: { email } });
    if (!user || !(await (0, password_1.verifyPassword)(password, user.password))) {
        const e = new Error('Invalid credentials');
        e.status = 401;
        throw e;
    }
    return {
        token: (0, jwt_1.signToken)({ sub: user.id, role: user.role }),
        user: { id: user.id, email: user.email, name: user.name, role: user.role },
    };
}
const listUsers = () => db_1.prisma.user.findMany({ select: { id: true, email: true, name: true, role: true } });
exports.listUsers = listUsers;
const updateRole = (id, role) => db_1.prisma.user.update({ where: { id }, data: { role }, select: { id: true, email: true, role: true } });
exports.updateRole = updateRole;
