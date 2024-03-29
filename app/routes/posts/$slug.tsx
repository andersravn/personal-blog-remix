import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { marked } from "marked";
import invariant from "tiny-invariant";
import { getPost } from "~/models/post.server";

export const loader = async ({ params }: LoaderArgs) => {
  invariant(params.slug, `params.slug is required`);

  const post = await getPost(params.slug);
  invariant(post, `Post not found: ${params.slug}`);

  const html = marked(post.markdown);
  return json({ post, html });
};

export default function PostSlug() {
  const { post, html } = useLoaderData<typeof loader>();
  return (
    <main className="mx-auto max-w-4xl">
      <h1 className="my-6 text-center text-3xl font-black text-orange-600">
        {post.title}
      </h1>
      <div
        className="px-4 dark:text-slate-300"
        dangerouslySetInnerHTML={{ __html: html }}
      ></div>
      <div className="space-x-2 text-sm dark:text-slate-300">
        <span>Tags:</span>
        {post.tags.map((tag) => (
          <span key={tag.name}>{tag.name}</span>
        ))}
      </div>
    </main>
  );
}
