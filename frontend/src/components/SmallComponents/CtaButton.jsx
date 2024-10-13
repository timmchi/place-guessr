import { Button } from "@material-tailwind/react";

const CtaButton = ({ handleClick, text }) => {
  return (
    <Button
      onClick={handleClick}
      className="bg-green-500 hover:bg-green-700 text-md px-2 py-4 md:px-3 md:py-4.5 md:text-xl"
    >
      {text}
    </Button>
  );
};

export default CtaButton;
