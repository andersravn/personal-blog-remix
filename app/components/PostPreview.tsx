import type { Post, Tag } from "@prisma/client";
import { Link } from "@remix-run/react";
import { format } from "date-fns";

type Props = {
  post: Pick<Post, "slug" | "title" | "markdown" | "createdAt" | "excerpt"> & {
    tags: Tag[];
  };
};

export default function PostPreview({ post }: Props) {
  return (
    <article className="mb-10" key={post.slug}>
      <h2 className="mb-2 text-2xl font-black text-orange-600">
        <Link to={`/posts/${post.slug}`}>{post.title}</Link>
      </h2>
      <div className="mb-4 text-sm font-light dark:text-slate-400">
        {format(new Date(post.createdAt), "LLLL d, y")}
      </div>
      <p className="dark:text-slate-300">{post.excerpt}</p>
    </article>
  );
}
