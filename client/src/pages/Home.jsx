import NavigationBar from "../components/UI/NavigationBar";
import styled from "styled-components";
import bannerImage from "../assets/main_banner.jpg";
import keyGuide1 from "../assets/keyGuide_1.jpg";
import keyGuide2 from "../assets/keyGuide_2.jpg";
import keyGuide3 from "../assets/keyGuide_3.jpg";
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

      <Container>
        <Wrapper id="core">
          <GuidelineWrapper>
            <MainTitle>핵심 지침</MainTitle>
            <SubTitle>
              장노년층 사용자를 고려하기 위한 3가지 핵심 가이드라인
            </SubTitle>
            <GuideWrapper>
              <GuideImage src={keyGuide1} />
              <GuideTitleBox>
                <GuideTitle>
                  단어는 일상적이고 자연스러운 것을 쓰고, 명확한 정의를
                  제공하라.
                </GuideTitle>
                <GuideSubTitle>
                  Use words that are everyday and natural, and provide clear
                  definitions.
                </GuideSubTitle>
              </GuideTitleBox>
            </GuideWrapper>
            <GuideWrapper>
              <GuideImage src={keyGuide2} />
              <GuideTitleBox>
                <GuideTitle>
                  중요한 내용과 기능은 스크롤 없이 한 화면에서 볼 수 있도록
                  제공하라.
                </GuideTitle>
                <GuideSubTitle>
                  Provide important content and features in a single,
                  scroll-free view.
                </GuideSubTitle>
              </GuideTitleBox>
            </GuideWrapper>
            <GuideWrapper>
              <GuideImage src={keyGuide3} />
              <GuideTitleBox>
                <GuideTitle>
                  테스크는 너무 길지 않되, 순차적으로 수행할 수 있도록 설계하라.
                </GuideTitle>
                <GuideSubTitle>
                  Don&apos;t make your tasks too long, but design them so that
                  they can be performed sequentially.
                </GuideSubTitle>
              </GuideTitleBox>
            </GuideWrapper>
          </GuidelineWrapper>
        </Wrapper>
        <Wrapper id="ux">
          <TitleWrapper>
            <MainTitle>UX 가이드라인</MainTitle>
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

        <Wrapper id="component">
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

        <Wrapper id="style">
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

        <Wrapper id="contribute">
          <TitleWrapper>
            <MainTitle>의견 제출</MainTitle>
            <SubTitle>
              사용해보시고, 개선점이 있을 경우 해당 폼을 작성해주세요. <br />{" "}
              더욱 좋은 접근성을 제공하는데 있어 큰 도움이 됩니다.{" "}
            </SubTitle>
          </TitleWrapper>
        </Wrapper>

        <FeedBackForm />
      </Container>
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

const Container = styled.div`
  margin-left: 8.25rem;
`;

const MainTitle = styled.h2`
  color: ${(props) => props.theme.colors.text_gray1};
  font-size: 3.125rem;
  font-weight: 600;
  margin: 10rem 0 0 0;
`;

const SubTitle = styled.h4`
  color: ${(props) => props.theme.colors.text_gray3};
  font-size: 1.375rem;
  margin: 0.75rem 0 0 0;
  display: block;
  font-weight: 400;
`;

const GuideWrapper = styled.div`
  display: flex;
  margin-top: 3.375rem;
  width: 73.25rem;
`;

const GuideImage = styled.img`
  width: 14.7rem;
  height: 14.7rem;
`;

const GuideTitleBox = styled.div`
  margin: 0;
  margin-left: 1.75rem;
`;

const GuideTitle = styled.h3`
  font-size: 1.875rem;
  font-weight: 400;
`;

const GuideSubTitle = styled.h4`
  font-size: 1.25rem;
  font-weight: 400;
  color: ${(props) => props.theme.colors.text_gray3};
  margin-top: 1.25rem;
`;
