import { GET_USER_ID, RESET_LOGIN } from "../actions/loginActions";

const initialStateLogin = {
  id: null
};

const loginReducer = (state = initialStateLogin, action) => {
  switch (action.type) {
    case GET_USER_ID: {
      return {
        ...state,
        id: action.payload
      };
    }
    case RESET_LOGIN: {
      return initialStateLogin;
    }
    default:
      return state;
  }
};

export default loginReducer;
