"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.getById = exports.list = exports.create = void 0;
const db_1 = require("../config/db");
const create = (data) => db_1.prisma.project.create({ data });
exports.create = create;
const list = () => db_1.prisma.project.findMany({
    include: { owner: { select: { id: true, name: true } }, _count: { select: { tasks: true } } },
    orderBy: { createdAt: 'desc' },
});
exports.list = list;
const getById = (id) => db_1.prisma.project.findUniqueOrThrow({ where: { id }, include: { tasks: true } });
exports.getById = getById;
const update = (id, data) => db_1.prisma.project.update({ where: { id }, data });
exports.update = update;
const remove = (id) => db_1.prisma.project.delete({ where: { id } });
exports.remove = remove;
