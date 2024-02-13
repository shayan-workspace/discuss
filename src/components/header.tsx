import Link from "next/link";
import { HeaderAuth } from "@/components";

export default function Header() {
  return (
    <header>
      <nav className="navbar px-8">
        <div className="navbar-start">
          <Link
            href={"/"}
            className="navbar-item font-mono text-3xl font-semibold uppercase text-primary"
          >
            Discuss
          </Link>
        </div>
        {/* <div className="navbar-center">
          <form>
            <input className="input input-ghost-primary" placeholder="Search" />
          </form>
        </div> */}
        <div className="navbar-end">
          <HeaderAuth />
        </div>
      </nav>
    </header>
  );
}
