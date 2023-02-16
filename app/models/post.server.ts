import { prisma } from "~/db.server";
import type { Post, Tag, User } from "@prisma/client";

export async function getPosts() {
  return prisma.post.findMany();
}

export async function getPost(slug: string) {
  return prisma.post.findUnique({ where: { slug }, include: { tags: true } });
}

export async function createPost({
  slug,
  title,
  markdown,
  userId,
  tags,
}: Pick<Post, "slug" | "title" | "markdown"> & {
  userId: User["id"];
} & {
  tags: Tag["name"][];
}) {
  return prisma.post.create({
    data: {
      slug,
      title,
      markdown,
      tags: {
        connect: tags.map((name) => ({ name })),
      },
      user: { connect: { id: userId } },
    },
  });
}

export async function editPost({
  slug,
  title,
  markdown,
  tags,
  userId,
}: Pick<Post, "slug" | "title" | "markdown"> & {
  userId: User["id"];
} & {
  tags: Tag["name"][];
}) {
  return prisma.post.update({
    where: {
      slugAndUser: {
        slug,
        userId,
      },
    },
    data: {
      slug,
      title,
      markdown,
      tags: { set: tags.map((name) => ({ name })) },
    },
  });
}

export async function deletePost({
  slug,
  userId,
}: { slug: string } & { userId: User["id"] }) {
  return prisma.post.deleteMany({ where: { slug, userId } });
}
