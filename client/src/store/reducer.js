// 초기 상태
const initialState = {
  userName: null,
  accessToken: null,
};

// Reducer
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SIGNIN":
      return {
        ...state, // 액션과 상관 없는 state 값 보존
        userName: action.userName,
        accessToken: action.accessToken,
      };
    case "SIGNOUT":
      return {
        ...state,
        userName: null,
        accessToken: null,
      };
    default:
      return state;
  }
};

export default userReducer;
