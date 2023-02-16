import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
  Form,
  useActionData,
  useCatch,
  useLoaderData,
  useNavigation,
  useParams,
} from "@remix-run/react";
import { marked } from "marked";
import invariant from "tiny-invariant";
import PostFormFields from "~/components/PostFormFields";
import { deletePost, editPost, getPost } from "~/models/post.server";
import { getTags } from "~/models/tag.server";
import { requireAdminUser } from "~/session.server";

export const loader = async ({ params, request }: LoaderArgs) => {
  await requireAdminUser(request);
  invariant(params.slug, `params.slug is required`);

  const post = await getPost(params.slug);
  if (!post) {
    throw new Response(`Post not found: ${params.slug}`, { status: 404 });
  }

  const tags = await getTags();

  const html = marked(post.markdown);
  return json({ post, tags, html });
};

export const action = async ({ request }: ActionArgs) => {
  const { id: userId } = await requireAdminUser(request);
  const formData = await request.formData();

  const title = formData.get("title");
  const slug = formData.get("slug");
  const markdown = formData.get("markdown");
  const intent = formData.get("intent");
  const tags = formData.getAll("tags").map((tag) => tag.toString());

  invariant(typeof title === "string", "title must be a string");
  invariant(typeof markdown === "string", "markdown must be a string");
  invariant(typeof slug === "string", "slug must be a string");
  invariant(typeof tags === "object", "slug must be a string");

  if (intent === "delete") {
    await deletePost({ slug, userId });
    return redirect("/posts/admin");
  }

  const errors = {
    title: title ? null : "Title is required",
    slug: slug ? null : "Slug is required",
    markdown: markdown ? null : "Markdown is required",
  };

  const hasErrors = Object.values(errors).some((errorMessage) => errorMessage);

  if (hasErrors) {
    return json(errors);
  }

  await editPost({ title, slug, markdown, userId, tags });

  return redirect(`/posts/${slug}`);
};

export default function EditPost() {
  const errors = useActionData<typeof action>();
  const { post, tags } = useLoaderData<typeof loader>();

  const navigation = useNavigation();
  const isCreating = Boolean(navigation.state === "submitting");

  return (
    <Form method="post">
      <PostFormFields post={post} tags={tags} errors={errors} />
      <div className="flex justify-between">
        <button
          type="submit"
          name="intent"
          value="delete"
          className="ml-2 rounded py-1 px-2 text-sm text-red-500 hover:bg-red-600 hover:text-white focus:bg-red-400 disabled:bg-red-300"
        >
          Delete
        </button>
        <button
          type="submit"
          name="intent"
          value="update"
          disabled={isCreating}
          className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400 disabled:bg-blue-300"
        >
          Update Post
        </button>
      </div>
    </Form>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  const params = useParams();
  if (caught.status === 404) {
    return (
      <div>Uh oh! This post with the slug "{params.slug}" doesn't exist!</div>
    );
  }

  throw new Error(`Unsupported thrown response status code: ${caught.status}`);
}
