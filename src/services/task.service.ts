import { prisma } from '../config/db';

export const create = (data: {
  title: string;
  description?: string;
  projectId: string;
  assigneeId?: string;
  dueDate?: Date;
}) => prisma.task.create({ data });

export const list = (filter: { projectId?: string; assigneeId?: string; status?: any }) =>
  prisma.task.findMany({
    where: filter,
    include: { assignee: { select: { id: true, name: true } } },
    orderBy: { createdAt: 'desc' },
  });

export const update = (
  id: string,
  data: { title?: string; status?: any; assigneeId?: string; dueDate?: Date },
) => prisma.task.update({ where: { id }, data });

export const remove = (id: string) => prisma.task.delete({ where: { id } });
