import { Link } from "@remix-run/react";
import { getPostsForFrontPage } from "~/models/post.server";
import PostPreview from "~/components/PostPreview";
import { typedjson, useTypedLoaderData } from "remix-typedjson";

export const loader = async () => {
  const posts = await getPostsForFrontPage();

  return typedjson({ posts });
};

export default function Index() {
  const { posts } = useTypedLoaderData<typeof loader>();

  return (
    <main className="relative mx-auto mt-20 min-h-screen md:w-2/5">
      {posts.map((post) => (
        <PostPreview post={post} key={post.slug} />
      ))}
      {posts.length > 5 && (
        <Link className="text-orange-500" to={"/posts"}>
          See all posts
        </Link>
      )}
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
