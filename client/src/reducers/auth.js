let userState;

if (window.localStorage.getItem("auth")) {
  userState = JSON.parse(window.localStorage.getItem("auth"));
} else {
  userState = null; // null means empty object (user is not login)
}

// reducer function
export const authReducer = (state = userState, action) => {
  switch (action.type) {
    case "LOGGED_IN_USER":
      return { ...state, ...action.payload };
    case "LOGOUT":
      return action.payload;
    case "UPDATE":  
    return action.payload;
    default:
      return state;
  }
};