// 초기 상태
const initialState = {
  userName: null,
  accessToken: null,
  expireTime: null,
  profileImage: null,
};

// Reducer
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SIGNIN":
      return {
        ...state, // 액션과 상관 없는 state 값 보존
        userName: action.userName,
        accessToken: action.accessToken,
        expireTime: action.expireTime,
        profileImage: action.profileImage,
      };
    case "SIGNOUT":
      return {
        ...state,
        userName: null,
        accessToken: null,
        expireTime: null,
        profileImage: null,
      };
    default:
      return state;
  }
};

export default userReducer;
