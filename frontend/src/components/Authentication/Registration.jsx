import bgImage from "../../berlinsignup.png";
import SignUpForm from "./SignUpForm";

const Registration = () => {
  return (
    <div className="flex h-screen flex-col md:flex-row">
      <div className="flex flex-1 justify-center bg-indigo-300 text-white items-center">
        <SignUpForm />
      </div>
      <div
        style={{ backgroundImage: `url(${bgImage})` }}
        className="hidden md:block md:flex-1 bg-cover bg-center"
      ></div>
    </div>
  );
};

export default Registration;
