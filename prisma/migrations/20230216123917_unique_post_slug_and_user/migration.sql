/*
  Warnings:

  - A unique constraint covering the columns `[slug,userId]` on the table `Post` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Post_slug_userId_key" ON "Post"("slug", "userId");
