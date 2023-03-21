import React from "react";
import styled from "styled-components";
import NavigationBar from "../components/UI/NavigationBar";
import MyBackImage from "../assets/myBackgroundImage.jpg";

function MyPage() {
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
