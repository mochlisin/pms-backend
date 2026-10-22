import { prisma } from '../config/db';

export const create = (data: { name: string; description?: string; ownerId: string }) =>
  prisma.project.create({ data });

export const list = () =>
  prisma.project.findMany({
    include: { owner: { select: { id: true, name: true } }, _count: { select: { tasks: true } } },
    orderBy: { createdAt: 'desc' },
  });

export const getById = (id: string) =>
  prisma.project.findUniqueOrThrow({ where: { id }, include: { tasks: true } });

export const update = (id: string, data: { name?: string; description?: string }) =>
  prisma.project.update({ where: { id }, data });

export const remove = (id: string) => prisma.project.delete({ where: { id } });
