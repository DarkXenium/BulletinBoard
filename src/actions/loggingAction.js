export const loginaction = (user) => {
  return {
    type: "LOGIN",
    payload: user,
  };
};

export const logoutaction = () => {
  return {
    type: "LOGOUT",
  };
};
