// authActions.js
export const loginSuccess = (user, authToken) => ({
    type: 'LOGIN_SUCCESS',
    payload: { user, authToken },
  });
  
  export const logout = () => ({
    type: 'LOGOUT',
  });
  
  