import { Link } from "@remix-run/react";
import { ClientOnly } from "remix-utils";
import ModeToggle from "./ModeToggle";

export default function Header() {
  return (
    <header className="flex space-x-4 p-4">
      <div className="flex items-center space-x-1">
        <svg width="20" height="20">
          <rect width="20" height="20" className="fill-orange-500"></rect>
        </svg>{" "}
        <span className="font-bold dark:text-white">andersravn</span>
      </div>
      <Link to="/posts" className="text-orange-600">
        Blog
      </Link>
      <ClientOnly>{() => <ModeToggle />}</ClientOnly>
    </header>
  );
}
