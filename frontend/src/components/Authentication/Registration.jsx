import bgImage from "../../berlinsignup.png";
import SignUpForm from "./SignUpForm";

const Registration = () => {
  return (
    <div className="flex h-screen">
      <div className="flex md:basis-1/2 justify-center bg-indigo-300 text-white items-center">
        <SignUpForm />
      </div>
      <div
        style={{ backgroundImage: `url(${bgImage})` }}
        className="flex md:basis-1/2 bg-cover bg-center "
      ></div>
    </div>
  );
};

export default Registration;
