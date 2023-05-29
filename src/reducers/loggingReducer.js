import axios from "axios";
import { logoutaction, loginaction } from "../actions/loggingAction";
const initialState = {
  isLoggedIn: false,
  user: null,
};

const loggingReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
};
export const login = (email, password) => async (dispatch) => {
  const userData = {
    uemail: email,
    password,
  };
  try {
    const response = await axios.post("https://localhost:7221/login", userData);
    const user = response.data;
    dispatch(loginaction(user));
  } catch (error) {
    dispatch(logoutaction(error));
  }
};
export default loggingReducer;
