import bgImage from "../../berlinsignup.png";
import SignUpForm from "./SignUpForm";
import usersService from "../../services/users";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const newUserMutation = useMutation({
    mutationFn: usersService.createUser,
    onSuccess: () => navigate("/login"),
  });
  const navigate = useNavigate();

  const handleUserCreation = async (userData) => {
    newUserMutation.mutate(userData);
  };

  return (
    <div className="flex h-screen flex-col md:flex-row">
      <div className="flex flex-1 justify-center bg-indigo-300 text-white items-center">
        <SignUpForm handleUserCreation={handleUserCreation} />
      </div>
      <div
        style={{ backgroundImage: `url(${bgImage})` }}
        className="hidden md:block md:flex-1 bg-cover bg-center"
      ></div>
    </div>
  );
};

export default Registration;
