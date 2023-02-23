import API from "./API";
import setUserInfo from "../store/setUserInfo";

const setUserData = (dispatch, res) => {
  console.log(res);
  const accessToken = res.data.data.accessToken;
  setUserInfo(dispatch, "user", accessToken); // redux setting
};

export const postLogin = async (dispatch, credential) => {
  try {
    console.log(credential);
    await API.post(
      "auth/login",
      {
        auth_code: credential,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => setUserData(dispatch, res));
  } catch (err) {
    console.log(err);
    console.log("server error");
  }
};
