import { prisma } from '../config/db';
import { hashPassword, verifyPassword } from '../utils/password';
import { signToken } from '../utils/jwt';

export async function register(data: { email: string; password: string; name: string; role?: any }) {
  return prisma.user.create({
    data: { ...data, password: await hashPassword(data.password) },
    select: { id: true, email: true, name: true, role: true },
  });
}

export async function login(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await verifyPassword(password, user.password))) {
    const e: any = new Error('Invalid credentials');
    e.status = 401;
    throw e;
  }
  return {
    token: signToken({ sub: user.id, role: user.role }),
    user: { id: user.id, email: user.email, name: user.name, role: user.role },
  };
}

export const listUsers = () =>
  prisma.user.findMany({ select: { id: true, email: true, name: true, role: true } });

export const updateRole = (id: string, role: any) =>
  prisma.user.update({ where: { id }, data: { role }, select: { id: true, email: true, role: true } });
