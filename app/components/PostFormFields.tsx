import type { Post, Tag } from "@prisma/client";

const inputClassName = `w-full rounded border border-gray-500 px-2 py-1 text-lg`;

type Props = {
  post?: Pick<Post, "slug" | "title" | "markdown"> & {
    tags: Tag[];
  };
  tags: Tag[];
  errors:
    | {
        title: string | null;
        slug: string | null;
        markdown: string | null;
      }
    | undefined;
};

export default function PostFormFields({ post, errors, tags }: Props) {
  return (
    <>
      <p>
        <label>
          Post Title:{" "}
          {errors?.title ? (
            <em className="text-red-600">{errors.title}</em>
          ) : null}
          <input
            type="text"
            name="title"
            defaultValue={post?.title || ""}
            className={inputClassName}
          />
        </label>
      </p>
      <p>
        <label>
          Post Slug:{" "}
          {errors?.slug ? (
            <em className="text-red-600">{errors.slug}</em>
          ) : null}
          <input
            type="text"
            name="slug"
            defaultValue={post?.slug || ""}
            className={inputClassName}
          />
        </label>
      </p>
      <p>
        <label htmlFor="markdown">
          Markdown:{" "}
          {errors?.markdown ? (
            <em className="text-red-600">{errors.markdown}</em>
          ) : null}
        </label>
        <br />
        <textarea
          id="markdown"
          rows={10}
          name="markdown"
          defaultValue={post?.markdown}
          className={`${inputClassName} font-mono`}
        ></textarea>
      </p>
      <div className="flex items-start">
        <label>
          Tags:{" "}
          <select name="tags" multiple>
            {tags.map((tag) => (
              <option
                value={tag.name}
                selected={post?.tags
                  .map((selectedTag) => selectedTag.name)
                  .includes(tag.name)}
                key={tag.name}
              >
                {tag.name}
              </option>
            ))}
          </select>
        </label>
      </div>
    </>
  );
}
