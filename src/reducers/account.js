const instiaiState = {
  user: localStorage.getItem("user"),
  avatar: localStorage.getItem("avatar"),
  userId: localStorage.getItem("userId"),
  role: localStorage.getItem("role"),
  token: localStorage.getItem("token"),
};

const account = (state = instiaiState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "LOGIN":
      const { user, avatar, userId, role, token } = payload;
      localStorage.setItem("user", user);
      localStorage.setItem("avatar", avatar);
      localStorage.setItem("userId", userId);
      localStorage.setItem("role", role);
      localStorage.setItem("token", token);
      return { user, avatar, userId, role, token };
    case "LOGOUT":
      localStorage.clear();
      return payload;
    default:
      return state;
  }
};

export default account;

export const login = (data) => {
  return {
    type: "LOGIN",
    payload: data,
  };
};

export const logout = () => {
  return {
    type: "LOGOUT",
    payload: { user: "", avatar: "", userId: "", role: "", token: "" },
  };
};
