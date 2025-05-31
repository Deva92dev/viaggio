/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "../ui/button";
import { FaHeart } from "react-icons/fa";

const FavoriteToggleButton = ({ destinationId }: { destinationId: string }) => {
  return (
    <Button size="icon" variant="outline" className="p-2 cursor-pointer">
      <FaHeart />
    </Button>
  );
};

export default FavoriteToggleButton;
