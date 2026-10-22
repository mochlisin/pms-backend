"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stats = stats;
const db_1 = require("../config/db");
async function stats() {
    const [projects, users, tasksByStatus, overdue] = await Promise.all([
        db_1.prisma.project.count(),
        db_1.prisma.user.count(),
        db_1.prisma.task.groupBy({ by: ['status'], _count: { _all: true } }),
        db_1.prisma.task.count({ where: { dueDate: { lt: new Date() }, status: { not: 'DONE' } } }),
    ]);
    const byStatus = { TODO: 0, IN_PROGRESS: 0, DONE: 0 };
    for (const row of tasksByStatus)
        byStatus[row.status] = row._count._all;
    return {
        totalProjects: projects,
        totalUsers: users,
        totalTasks: Object.values(byStatus).reduce((a, b) => a + b, 0),
        tasksByStatus: byStatus,
        overdueTasks: overdue,
    };
}
