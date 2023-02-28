import React, { useRef } from "react";
import useScript from "./useScript";
import { postLogin } from "../API/postLogin";
import styled from "styled-components";
import googleIcon from "../assets/googleIcon.svg";
import bcimg from "../assets/login_bc_img.svg";
import NavigationBar from "../components/NavigationBar";

export const GoogleLogin = () => {
  const googleSignInButton = useRef(null);

  const onGoogleSignIn = async (res) => {
    const result = await postLogin(res.credential);
    console.log(result);
    //콜백 함수
  };

  useScript("https://accounts.google.com/gsi/client", () => {
    window.google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      callback: onGoogleSignIn,
    });
    window.google.accounts.id.renderButton(googleSignInButton.current, {
      theme: "outline",
      width: "280",
      shape: "rectangular",
    });
  });

  const onClickGooglelogin = () => {
    document.querySelector('[aria-labelledby="button-label"]').click();
  };

  return (
    <Wrapper>
      <NavigationBar />
      <ContainerWrapper>
        <BackgroundImage src={bcimg} />
        <TitleText>Silver Surfer</TitleText>
        <SubTitleText>Accessibility Material Guide Web</SubTitleText>
        <GoogleDisplayNoneButton
          id="google-login-api"
          ref={googleSignInButton}
        />
        <ButtonWrapper onClick={onClickGooglelogin}>
          <ButtonImage src={googleIcon} />
          <ButtonText>Google계정으로 로그인</ButtonText>
        </ButtonWrapper>
      </ContainerWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100vh;
  overflow: hidden;
  margin: -8px;
`;

const ContainerWrapper = styled.div`
  // 위치
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  height: 100%;
  width: 100%;
  // 컬러
  background-color: #f8fafb;
`;

const BackgroundImage = styled.img`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 80%;
`;

const TitleText = styled.h3`
  font-size: 3.75rem;
  letter-spacing: -2px;
  margin: 12.5rem 0 0 0;
`;

const SubTitleText = styled.p`
  font-size: 1rem;
  letter-spacing: -0.02px;
  margin: 1rem 0 6.75rem 0;
`;

const ButtonWrapper = styled.div`
  // 크기
  width: 428px;
  height: 75px;
  // 스타일
  border: 1px solid #d6d6d6;
  border-radius: 5px;
  // 위치
  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
`;

const GoogleDisplayNoneButton = styled.div`
  display: none;
`;

const ButtonImage = styled.img`
  // 크기
  width: 32px;
  height: 32px;
  // 위치
  margin-right: 32px;
`;

const ButtonText = styled.h3`
  color: #353535;
  // 폰트
  /* font-family: 'Noto Sans KR'; */
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
`;
