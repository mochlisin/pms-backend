"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.list = exports.create = void 0;
const db_1 = require("../config/db");
const create = (data) => db_1.prisma.task.create({ data });
exports.create = create;
const list = (filter) => db_1.prisma.task.findMany({
    where: filter,
    include: { assignee: { select: { id: true, name: true } } },
    orderBy: { createdAt: 'desc' },
});
exports.list = list;
const update = (id, data) => db_1.prisma.task.update({ where: { id }, data });
exports.update = update;
const remove = (id) => db_1.prisma.task.delete({ where: { id } });
exports.remove = remove;
