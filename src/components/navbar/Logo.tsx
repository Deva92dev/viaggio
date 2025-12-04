import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/Logo.png";

const Logo = () => {
  return (
    <Link
      href="/"
      className="mx-2 flex items-center gap-2 group"
      aria-label="Homepage"
      style={{ width: 140, minWidth: 140, height: 40 }} // fixed width & height to prevent shift
    >
      <div className="relative w-10 h-10 flex-shrink-0">
        <Image
          src={logo}
          alt="Viaggio Logo"
          width={52}
          height={40}
          className="transition-transform duration-300 group-hover:scale-110"
          priority
          sizes="40px"
        />
      </div>
      <span className="hidden md:inline-block font-bold text-lg gradient-text tracking-tight select-none">
        Viaggio
      </span>
    </Link>
  );
};

export default Logo;
