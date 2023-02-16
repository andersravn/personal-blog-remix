import { prisma } from "~/db.server";

export function createTag(name: string) {
  return prisma.tag.create({ data: { name } });
}

export function getTags() {
  return prisma.tag.findMany();
}
