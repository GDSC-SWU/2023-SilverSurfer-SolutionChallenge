import Guideline from "../components/UI/Guideline";

import NavigationBar from "../components/UI/NavigationBar";
import styled from "styled-components";
import bannerImage from "../assets/main_banner.jpg";
import FeedBackForm from "../components/FeedBackForm";
import UxGuide from "../components/Card/UxGuide";
import StyleGuide from "../components/Card/StyleGuide";
import ComponentGuide from "../components/Card/ComponentGuide";

const HomePage = () => {
  return (
    <>
      <BannerWrapper>
        <NavigationBar />
        <MainBannerImage src={bannerImage} />
      </BannerWrapper>

      <Wrapper>
        <GuidelineWrapper>
          <MainTitle>핵심 지침</MainTitle>
          <SubTitle>
            장노년층 사용자를 고려하기 위한 3가지 핵심 가이드라인
          </SubTitle>
          <Guideline />
          <Guideline />
          <Guideline />
        </GuidelineWrapper>
      </Wrapper>
      <Wrapper>
        <TitleWrapper>
          <MainTitle>UX 가이드</MainTitle>
          <SubTitle>
            장노년층 사용자를 고려하기 위한 5가지 UX 가이드라인
          </SubTitle>
        </TitleWrapper>
      </Wrapper>

      <Wrapper>
        <CardBoxWrapper>
          <UxGuide />
        </CardBoxWrapper>
      </Wrapper>

      <Wrapper>
        <TitleWrapper>
          <MainTitle>컴포넌트</MainTitle>
          <SubTitle>장노년층 사용자를 고려하기 위한 UI 가이드라인</SubTitle>
        </TitleWrapper>
      </Wrapper>

      <Wrapper>
        <CardBoxWrapper>
          <ComponentGuide />
        </CardBoxWrapper>
      </Wrapper>

      <Wrapper>
        <TitleWrapper>
          <MainTitle>스타일</MainTitle>
          <SubTitle>장노년층 사용자를 고려하기 위한 UI 가이드라인</SubTitle>
        </TitleWrapper>
      </Wrapper>

      <Wrapper>
        <CardBoxWrapper>
          <StyleGuide />
        </CardBoxWrapper>
      </Wrapper>

      <Wrapper>
        <TitleWrapper>
          <MainTitle>의견 제출</MainTitle>
          <SubTitle>
            사용해보시고, 개선점이 있을 경우 해당 폼을 작성해주세요. <br /> 더욱
            좋은 접근성을 제공하는데 있어 큰 도움이 됩니다.{" "}
          </SubTitle>
        </TitleWrapper>
      </Wrapper>

      <FeedBackForm />
    </>
  );
};

export default HomePage;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  width: 73.25rem;
`;

const GuidelineWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const CardBoxWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  flex-direction: row;
  width: 73.25rem;
  flex-wrap: wrap;
`;

const BannerWrapper = styled.div`
  display: flex;
`;

const MainBannerImage = styled.img`
  width: 100%;
  display: block;
  margin-left: 7.25rem;
  padding: 1rem;
`;

const MainTitle = styled.h2`
  color: ${(props) => props.theme.colors.text_gray1};
  font-size: 3.125rem;
  font-weight: 400;
  margin: 10rem 0 0 0;
`;

const SubTitle = styled.h4`
  color: ${(props) => props.theme.colors.text_gray3};
  font-size: 1.375rem;
  margin: 0.75rem 0 0 0;
  display: block;
  font-weight: 400;
`;
