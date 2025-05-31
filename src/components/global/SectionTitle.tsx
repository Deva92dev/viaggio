import { Separator } from "../ui/separator";

const SectionTitle = ({
  text,
  description,
}: {
  text: string;
  description: string;
}) => {
  return (
    <div className="text-center">
      <Separator />
      <h2 className="text-3xl font-medium  capitalize mb-4">{text}</h2>
      <p className="text-sm font-normal mb-8">{description}</p>
    </div>
  );
};

export default SectionTitle;
