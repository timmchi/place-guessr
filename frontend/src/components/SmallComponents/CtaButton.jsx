import { Button } from "@material-tailwind/react";

const CtaButton = ({ handleClick, text }) => {
  return (
    <Button
      onClick={handleClick}
      className="bg-green-500 hover:bg-green-700 text-xs md:text-xl rounded-full"
      size="md"
    >
      {text}
    </Button>
  );
};

export default CtaButton;
