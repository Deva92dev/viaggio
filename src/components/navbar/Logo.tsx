import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" className="mx-2">
      <Image src="/Logo.png" alt="Logo" width={30} height={30} />
    </Link>
  );
};

export default Logo;
