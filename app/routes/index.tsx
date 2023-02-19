import { Link, useLoaderData } from "@remix-run/react";
import { getPostsForFrontPage } from "~/models/post.server";
import { json } from "@remix-run/node";
import { format } from "date-fns";

export const loader = async () => {
  const posts = await getPostsForFrontPage();

  return json({ posts });
};

export default function Index() {
  const { posts } = useLoaderData<typeof loader>();

  return (
    <main className="relative mx-auto mt-20 min-h-screen md:w-2/5">
      {posts.map((post) => (
        <article className="mb-10" key={post.slug}>
          <h2 className="mb-2 text-2xl font-black text-orange-600">
            <Link to={`/posts/${post.slug}`}>{post.title}</Link>
          </h2>
          <div className="mb-4 text-sm font-light dark:text-slate-400">
            {format(new Date(post.createdAt), "LLLL d, y")}
          </div>
          <p className="dark:text-slate-300">{post.excerpt}</p>
        </article>
      ))}
      <Link className="text-orange-500" to={"/posts"}>
        See all posts
      </Link>
    </main>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <div className="text-red-600">
      Something went wrong
      <pre>{error.message}</pre>
    </div>
  );
}
