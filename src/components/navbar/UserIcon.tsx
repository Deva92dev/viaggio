/* eslint-disable @next/next/no-img-element */
import { LucideUser } from "lucide-react";

const UserIcon = ({ profileImage }: { profileImage: string | null }) => {
  if (profileImage) {
    return (
      <img
        src={profileImage}
        alt="User icon"
        className="w-6 h-6 rounded-full object-center"
      />
    );
  }
  return <LucideUser className="w-6 h-6 bg-primary rounded-full text-white" />;
};

export default UserIcon;
