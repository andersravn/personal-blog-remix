import { Link } from "@remix-run/react";
import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { requireAdminUser } from "~/session.server";

export const loader = async ({ request }: LoaderArgs) => {
  await requireAdminUser(request);
  return json({});
};

export default function AdminIndex() {
  return (
    <p>
      <Link to="new" className="text-blue-600 underline">
        Create a new post
      </Link>
    </p>
  );
}
