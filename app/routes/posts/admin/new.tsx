import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";
import invariant from "tiny-invariant";
import PostFormFields from "~/components/PostFormFields";
import { createPost } from "~/models/post.server";
import { getTags } from "~/models/tag.server";
import { requireAdminUser } from "~/session.server";

export const loader = async ({ request }: LoaderArgs) => {
  await requireAdminUser(request);
  const tags = await getTags();
  return json({ tags });
};

export const action = async ({ request }: ActionArgs) => {
  const { id: userId } = await requireAdminUser(request);
  const formData = await request.formData();

  const title = formData.get("title");
  const slug = formData.get("slug");
  const markdown = formData.get("markdown");
  const tags = formData.getAll("tags").map((entry) => entry.toString());

  const errors = {
    title: title ? null : "Title is required",
    slug: slug ? null : "Slug is required",
    markdown: markdown ? null : "Markdown is required",
  };

  const hasErrors = Object.values(errors).some((errorMessage) => errorMessage);

  if (hasErrors) {
    return json(errors);
  }

  invariant(typeof title === "string", "title must be a string");

  invariant(typeof slug === "string", "slug must be a string");

  invariant(typeof markdown === "string", "markdown must be a string");

  invariant(typeof tags === "object", "tags must be a string");

  await createPost({ title, slug, markdown, userId, tags });

  return redirect("/posts/admin");
};

export default function NewPost() {
  const { tags } = useLoaderData();
  const errors = useActionData<typeof action>();

  const navigation = useNavigation();
  const isCreating = Boolean(navigation.state === "submitting");

  return (
    <Form method="post">
      <PostFormFields tags={tags} errors={errors} />
      <p className="text-right">
        <button
          type="submit"
          disabled={isCreating}
          className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400 disabled:bg-blue-300"
        >
          Create Post
        </button>
      </p>
    </Form>
  );
}
