import { Link } from "@remix-run/react";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
import PostPreview from "~/components/PostPreview";
import { getPosts } from "~/models/post.server";
import { useOptionalAdminUser } from "~/utils";

export const loader = async () => {
  return typedjson({ posts: await getPosts() });
};

export default function Posts() {
  const { posts } = useTypedLoaderData<typeof loader>();
  const adminUser = useOptionalAdminUser();

  return (
    <main>
      {adminUser ? (
        <Link to="admin" className="text-red-600 underline">
          Admin
        </Link>
      ) : null}
      <ul>
        {posts.map((post) => (
          <PostPreview post={post} key={post.slug} />
        ))}
      </ul>
    </main>
  );
}
