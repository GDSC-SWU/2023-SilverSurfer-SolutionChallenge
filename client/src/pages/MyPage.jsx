import React from "react";
import styled from "styled-components";
import NavigationBar from "../components/UI/NavigationBar";
import MyBackImage from "../assets/myBackgroundImage.jpg";
import { useSelector, useDispatch } from "react-redux";
import API from "../API/API";
import setUserInfo from "../store/setUserInfo";

function MyPage() {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.accessToken);
  const postLogout = async () => {
    try {
      await API.post("/auth/logout", null, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }).then(() => setUserInfo(dispatch));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <BannerWrapper>
        <NavigationBar />
        <MyBackgroundImage src={MyBackImage} />
      </BannerWrapper>
      <Wrapper>
        <ProfileImage />
      </Wrapper>
      <Wrapper>
        <MyName>보경</MyName>
      </Wrapper>
      <Wrapper>
        <MyEmail>qkrqhrud3748@gmail.com</MyEmail>
      </Wrapper>
      <Wrapper>
        <Title>내 스크랩</Title>
        <ScrapNumber>5</ScrapNumber>
      </Wrapper>
      <LogoutWrapper onClick={() => postLogout()}>
        <Logout>로그아웃</Logout>
      </LogoutWrapper>
    </div>
  );
}

export default MyPage;

const BannerWrapper = styled.div`
  display: flex;
`;

const MyBackgroundImage = styled.img`
  width: 100%;
  height: 19.375rem;
`;

const Wrapper = styled.div`
  width: 73rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 0 auto;
`;

const ProfileImage = styled.div`
  width: 11.375rem;
  height: 11.375rem;
  background-color: aliceblue;
  position: absolute;
  border-radius: 50%;
`;

const MyName = styled.h3`
  color: ${(props) => props.theme.colors.text_gray1};
  font-size: 3.125rem;
  font-weight: 500;
  margin-top: 8rem;
`;

const MyEmail = styled.h5`
  color: ${(props) => props.theme.colors.text_gray2};
  margin-top: 0.5rem;
  font-size: 1.5rem;
`;

const Title = styled.h4`
  color: ${(props) => props.theme.colors.text_gray1};
  font-size: 2.25rem;
  font-weight: 500;
  margin-top: 5.875rem;
`;

const ScrapNumber = styled.h4`
  color: ${(props) => props.theme.colors.main};
  font-size: 2.25rem;
  font-weight: 500;
  margin-top: 5.875rem;
  margin-left: 1rem;
`;

const LogoutWrapper = styled.div`
  cursor: pointer;
  width: 170px;
  height: 66px;
  background: #dc8080;
  margin: 0 auto;
`;

const Logout = styled.div`
  font-size: 2.25rem;
  text-align: center;
`;
