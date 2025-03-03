import { publicNavLinks } from "@/utils/links";
import Logo from "../navbar/Logo";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="fixed w-full z-10">
      <div className="container mx-auto px-4 py-4">
        {/* Navbar Content */}
        <div className="flex items-center justify-around">
          <Logo />
          <div className="flex gap-16">
            {publicNavLinks.map((link) => (
              <div key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
