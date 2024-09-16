const LOCAL_STORAGE_USER_KEY = "loggedPlaceguessrUser";

export const saveUser = (user) => {
  window.localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user));
};

export const getUser = () => {
  const user = window.localStorage.getItem(LOCAL_STORAGE_USER_KEY);
  return user ? JSON.parse(user) : null;
};

export const removeUser = () => {
  window.localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
};
