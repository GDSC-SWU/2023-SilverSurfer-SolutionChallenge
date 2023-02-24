import { persistor } from "../";

// 로그인 정보 변경 시 호출 함수 (dispatch, 새로운 유저 이름, 새로운 토큰)
function setUserInfo(dispatch, newName, newToken) {
  // persistStore 데이터 전부 삭제
  const purge = async () => {
    window.location.href = "/";
    await persistor.purge();
  };

  // Actions
  // 사용자 로그인
  const signIn = (userName, accessToken) => ({
    type: "SIGNIN",
    userName,
    accessToken,
  });
  // 사용자 로그아웃 (토큰 만료)
  const signOut = () => ({ type: "SIGNOUT" });
  console.log(`setUserInfo ${newName} ${newToken}`);

  // 파라미터로 받은 newName, newToken 값에 따라 state 갱신
  if (newName !== undefined && newToken !== undefined) {
    dispatch(signIn(newName, newToken));
  } else if (newName === undefined && newToken === undefined) {
    dispatch(signOut());
    purge();
  } else {
    console.log("Input Error");
  }
}

export default setUserInfo;
