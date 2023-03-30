import API from "./API";
import setUserInfo from "../store/setUserInfo";

const setUserData = (dispatch, res) => {
  const accessToken = res.data.data.accessToken;
  const expireTime = new Date().getTime() + 60 * 1000 * 60;
  const profileImage = res.data.data.googleProfileImagePath;
  setUserInfo(dispatch, "user", accessToken, expireTime, profileImage); // redux setting
};

export const postLogin = async (dispatch, credential) => {
  try {
    await API.post(
      "auth/login",
      {
        credential: credential,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      setUserData(dispatch, res);
      window.location.replace("/");
    });
  } catch (err) {
    console.error("server error");
  }
};
