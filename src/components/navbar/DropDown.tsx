// "use client";

// import { useState } from "react";
// import { LucideAlignLeft, LogIn, UserPlus, LogOut } from "lucide-react";
// import { SignedIn, SignedOut, SignInButton, useUser } from "@clerk/nextjs";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "../ui/dropdown-menu";
// import { Button } from "../ui/button";
// import UserIcon from "./UserIcon";
// import { navLinks, publicNavLinks } from "@/utils/links";
// import Link from "next/link";
// import SignOutLink from "./SignOutLink";
// import { useResponsive } from "@/hooks/useResponsive";

// type DropDownProps = {
//   hidePublicNavLinks?: boolean;
// };

// const DropDown = ({ hidePublicNavLinks }: DropDownProps) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const user = useUser();
//   const profileImage = user.user?.imageUrl || null;
//   const { isMobile } = useResponsive();

//   const closeDropdown = () => setIsOpen(false);

//   // Button styles - extracted for reusability
//   const buttonStyles = {
//     width: "48px",
//     height: "48px",
//     minWidth: "48px",
//     minHeight: "48px",
//     maxWidth: "48px",
//     maxHeight: "48px",
//     display: "inline-flex",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: "0",
//     margin: "0",
//     flexShrink: 0,
//     flexGrow: 0,
//     position: "relative" as const,
//     overflow: "hidden",
//     contain: "none" as const,
//     gap: "8px",
//   };

//   return (
//     <DropdownMenu open={isOpen} onOpenChange={setIsOpen} modal={false}>
//       <DropdownMenuTrigger asChild>
//         <Button
//           className="hover:bg-[hsl(var(--primary))/0.1] transition-colors duration-150 cursor-pointer"
//           style={buttonStyles}
//           aria-label="User Options"
//         >
//           <LucideAlignLeft className="w-5 h-5 text-[hsl(var(--primary))] flex-shrink-0" />
//           <span className="w-6 h-6 flex items-center justify-center flex-shrink-0">
//             <UserIcon profileImage={profileImage} />
//           </span>
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent
//         side="bottom"
//         align="end"
//         sideOffset={8}
//         alignOffset={0}
//         className="w-52 bg-[hsl(var(--card))] border border-[hsl(var(--border))] shadow-lg rounded-lg z-50"
//         style={{
//           position: "fixed",
//           top: `${isMobile ? "16px" : "24px"}`,
//           right: "8px",
//           left: "auto",
//           maxWidth: "calc(100vw - 32px)", // Prevent overflow with padding
//           minWidth: "200px",
//           transform: "none",
//         }}
//         avoidCollisions={false} // Disable automatic collision detection
//         collisionPadding={0}
//       >
//         <SignedOut>
//           <DropdownMenuItem
//             onClick={closeDropdown}
//             className="hover:bg-[hsl(var(--primary))/0.1] cursor-pointer transition-colors duration-150"
//           >
//             <SignInButton mode="modal">
//               <button className="w-full text-left text-[hsl(var(--primary))] font-medium flex items-center gap-2 cursor-pointer transition-colors duration-150">
//                 <LogIn className="w-4 h-4" />
//                 <span>Login</span>
//               </button>
//             </SignInButton>
//           </DropdownMenuItem>
//           <DropdownMenuSeparator />
//           <DropdownMenuItem
//             onClick={closeDropdown}
//             className="hover:bg-[hsl(var(--primary))/0.1] cursor-pointer transition-colors duration-150"
//           >
//             <SignInButton mode="modal">
//               <button className="w-full text-left text-[hsl(var(--primary))] font-medium flex items-center gap-2 cursor-pointer transition-colors duration-150">
//                 <UserPlus className="w-4 h-4" />
//                 <span>Register</span>
//               </button>
//             </SignInButton>
//           </DropdownMenuItem>
//           <DropdownMenuSeparator />
//           {publicNavLinks.map((link) => (
//             <DropdownMenuItem
//               key={link.href}
//               className="cursor-pointer hover:bg-[hsl(var(--accent))/0.1] rounded-md transition-colors duration-150"
//               onClick={closeDropdown}
//             >
//               <Link
//                 href={link.href}
//                 className="w-full flex items-center gap-2 text-[hsl(var(--foreground))] transition-colors duration-150"
//               >
//                 <span>{link.label}</span>
//               </Link>
//             </DropdownMenuItem>
//           ))}
//         </SignedOut>
//         <SignedIn>
//           {navLinks.map((link) => {
//             if (
//               hidePublicNavLinks &&
//               publicNavLinks.some((pl) => pl.href === link.href)
//             ) {
//               return null;
//             }
//             return (
//               <DropdownMenuItem
//                 key={link.href}
//                 className="cursor-pointer hover:bg-[hsl(var(--accent))/0.1] rounded-md transition-colors duration-150"
//                 onClick={closeDropdown}
//               >
//                 <Link
//                   href={link.href}
//                   className="w-full flex items-center gap-2 text-[hsl(var(--foreground))] transition-colors duration-150"
//                 >
//                   <span>{link.label}</span>
//                 </Link>
//               </DropdownMenuItem>
//             );
//           })}
//           <DropdownMenuSeparator />
//           <DropdownMenuItem
//             onClick={closeDropdown}
//             className="hover:bg-[hsl(var(--destructive))/0.1] cursor-pointer transition-colors duration-150"
//           >
//             <div className="w-full flex items-center gap-2 text-[hsl(var(--destructive))] transition-colors duration-150">
//               <LogOut className="w-4 h-4" />
//               <SignOutLink />
//             </div>
//           </DropdownMenuItem>
//         </SignedIn>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// };

// export default DropDown;
"use client";

import { useState } from "react";
import { LucideAlignLeft, LogIn, UserPlus, LogOut } from "lucide-react";
import { SignedIn, SignedOut, SignInButton, useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import UserIcon from "./UserIcon";
import { navLinks, publicNavLinks } from "@/utils/links";
import Link from "next/link";
import { useResponsive } from "@/hooks/useResponsive";
import { toast } from "sonner";
import { SignOutButton } from "@clerk/nextjs";

type DropDownProps = {
  hidePublicNavLinks?: boolean;
};

const DropDown = ({ hidePublicNavLinks }: DropDownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useUser();
  const profileImage = user.user?.imageUrl || null;
  const { isMobile } = useResponsive();
  const pathname = usePathname();

  const closeDropdown = () => setIsOpen(false);

  const handleLogout = () => {
    toast("Logging out....");
    closeDropdown();
  };

  const buttonStyles = {
    width: "48px",
    height: "48px",
    minWidth: "48px",
    minHeight: "48px",
    maxWidth: "48px",
    maxHeight: "48px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0",
    margin: "0",
    flexShrink: 0,
    flexGrow: 0,
    position: "relative" as const,
    overflow: "hidden",
    contain: "none" as const,
    gap: "8px",
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen} modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          className="hover:bg-[hsl(var(--primary))/0.1] transition-colors duration-150 cursor-pointer"
          style={buttonStyles}
          aria-label="User Options"
        >
          <LucideAlignLeft className="w-5 h-5 text-[hsl(var(--primary))] flex-shrink-0" />
          <span className="w-6 h-6 flex items-center justify-center flex-shrink-0">
            <UserIcon profileImage={profileImage} />
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="bottom"
        align="end"
        sideOffset={8}
        alignOffset={0}
        className="w-52 bg-[hsl(var(--card))] border border-[hsl(var(--border))] shadow-lg rounded-lg z-50"
        style={{
          position: "fixed",
          top: `${isMobile ? "16px" : "24px"}`,
          right: "8px",
          left: "auto",
          maxWidth: "calc(100vw - 32px)", // Prevent overflow with padding
          minWidth: "200px",
          transform: "none",
        }}
        avoidCollisions={false} // Disable automatic collision detection
        collisionPadding={0}
      >
        <SignedOut>
          <DropdownMenuItem
            onClick={closeDropdown}
            className="hover:bg-[hsl(var(--primary))/0.1] cursor-pointer transition-colors duration-150"
          >
            <SignInButton mode="modal">
              <button className="w-full text-left text-[hsl(var(--primary))] font-medium flex items-center gap-2 cursor-pointer transition-colors duration-150">
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </button>
            </SignInButton>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={closeDropdown}
            className="hover:bg-[hsl(var(--primary))/0.1] cursor-pointer transition-colors duration-150"
          >
            <SignInButton mode="modal">
              <button className="w-full text-left text-[hsl(var(--primary))] font-medium flex items-center gap-2 cursor-pointer transition-colors duration-150">
                <UserPlus className="w-4 h-4" />
                <span>Register</span>
              </button>
            </SignInButton>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {publicNavLinks.map((link) => (
            <DropdownMenuItem
              key={link.href}
              className="cursor-pointer hover:bg-[hsl(var(--accent))/0.1] rounded-md transition-colors duration-150"
              onClick={closeDropdown}
            >
              <Link
                href={link.href}
                className="w-full flex items-center gap-2 text-[hsl(var(--foreground))] transition-colors duration-150"
              >
                <span>{link.label}</span>
              </Link>
            </DropdownMenuItem>
          ))}
        </SignedOut>
        <SignedIn>
          {navLinks.map((link) => {
            if (
              hidePublicNavLinks &&
              publicNavLinks.some((pl) => pl.href === link.href)
            ) {
              return null;
            }
            return (
              <DropdownMenuItem
                key={link.href}
                className="cursor-pointer hover:bg-[hsl(var(--accent))/0.1] rounded-md transition-colors duration-150"
                onClick={closeDropdown}
              >
                <Link
                  href={link.href}
                  className="w-full flex items-center gap-2 text-[hsl(var(--foreground))] transition-colors duration-150"
                >
                  <span>{link.label}</span>
                </Link>
              </DropdownMenuItem>
            );
          })}
          <DropdownMenuSeparator />
          <DropdownMenuItem className="hover:bg-[hsl(var(--destructive))/0.1] cursor-pointer transition-colors duration-150 p-0">
            <SignOutButton redirectUrl={pathname}>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 text-[hsl(var(--destructive))] transition-colors duration-150 px-2 py-1.5 text-left cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </SignOutButton>
          </DropdownMenuItem>
        </SignedIn>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropDown;
