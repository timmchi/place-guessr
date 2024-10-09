import { useDispatch } from "react-redux";
import {
  showNotification,
  hideNotification,
} from "../reducers/notificationReducer";

const chooseColor = (type) => {
  if (type === "info") return "indigo";

  if (type === "error") return "red";

  if (type === "success") return "green";
};

const useNotification = () => {
  const dispatch = useDispatch();

  // I dont like this. I think this can be implemented in a better way using a thunk - something to take a look at later
  const displayNotification = (type, message) => {
    dispatch(showNotification({ color: chooseColor(type), message }));

    setTimeout(() => dispatch(hideNotification()), 5000);
  };

  const clearNotification = () => {
    dispatch(hideNotification());
  };

  return { displayNotification, clearNotification };
};

export default useNotification;
