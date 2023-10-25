// reducers/authReducer.js
const initialState = {
  user: null,
  isAuthenticated: false,
  authToken: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user, // Assuming action.payload has both user and authToken
        isAuthenticated: true,
        authToken: action.payload.authToken,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        authToken: null,
      };
    case 'SET_AUTH_TOKEN':
      return {
        ...state,
        authToken: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
