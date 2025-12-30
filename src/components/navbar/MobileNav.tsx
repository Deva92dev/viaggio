import { publicNavLinks } from "@/utils/links";
import Link from "next/link";

const MobileMenu = () => {
  return (
    <div className="relative z-50 block lg:hidden">
      <input
        type="checkbox"
        id="mobile-menu-toggle"
        className="peer hidden"
        aria-hidden="true"
      />

      <label
        htmlFor="mobile-menu-toggle"
        className="flex flex-col gap-1.5 w-8 cursor-pointer select-none p-1"
        aria-label="Open menu"
      >
        <span className="h-0.5 w-full bg-gray-700 dark:bg-gray-200 rounded-full transition-all duration-300 origin-center peer-checked:rotate-45 peer-checked:translate-y-2" />
        <span className="h-0.5 w-full bg-gray-700 dark:bg-gray-200 rounded-full transition-all duration-300 peer-checked:opacity-0" />
        <span className="h-0.5 w-full bg-gray-700 dark:bg-gray-200 rounded-full transition-all duration-300 origin-center peer-checked:-rotate-45 peer-checked:-translate-y-2" />
      </label>

      <div
        className="
        absolute right-0 top-14
        w-64 p-2 rounded-2xl
        bg-white dark:bg-neutral-900 
        border border-gray-200 dark:border-gray-800
        shadow-2xl
        origin-top-right
        opacity-0 scale-95 pointer-events-none translate-y-[-10px]
        transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
        peer-checked:opacity-100
        peer-checked:scale-100
        peer-checked:pointer-events-auto
        peer-checked:translate-y-0
        z-[200]
      "
      >
        <ul className="flex flex-col gap-1">
          {publicNavLinks.map((link) => (
            <li key={link.href}>
              <label htmlFor="mobile-menu-toggle" className="block w-full">
                <Link
                  href={link.href}
                  className="block w-full px-4 py-3 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                >
                  {link.label}
                </Link>
              </label>
            </li>
          ))}

          <li className="pt-2 mt-2 border-t border-gray-100 dark:border-gray-800">
            <label htmlFor="mobile-menu-toggle" className="block w-full">
              <Link
                href="/sign-up"
                className="block w-full text-center px-4 py-3 rounded-xl text-sm font-bold text-white bg-orange-700 hover:bg-orange-800 transition-colors"
              >
                Sign Up for Free
              </Link>
            </label>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MobileMenu;
