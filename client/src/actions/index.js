import axios from "axios";
import { AUTH_USER } from "./types";

export const signup = ({ formProps }) => (dispatch) => {
  axios.post("http://localhost:3090/signup", formProps);
};

// //this is how you will usually see redux thunk
// export const signup = ({ email, password }) => (dispatch) => {

// };
