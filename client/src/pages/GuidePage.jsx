import NavigationBar from "../components/UI/NavigationBar";
import styled from "styled-components";
import guideImage from "../assets/guideImage.jpg";
import contentImage from "../assets/contentImage.jpg";

function GuidePage() {
  return (
    <div>
      <BannerWrapper>
        <NavigationBar />
        <GuideTitleWrapper>
          <GuideTitleBox>
            <Title>
              <GuideTitle>버튼</GuideTitle>
              <GuideTitleEn>Button</GuideTitleEn>
            </Title>
            <Description>
              버튼 크기는 충분한 크기로 쉽게 터치할 수 있게, <br />
              영역 구분은 확실하게 해야 합니다.
            </Description>
          </GuideTitleBox>
          <GuideImage src={guideImage} />
        </GuideTitleWrapper>
      </BannerWrapper>
      <Wrapper>
        <GuidelineWrapper>
          <MainTitle>문제점</MainTitle>
          <SubTitle>
            고령자는 손 떨림, 시력 저하 등으로 인해 정교한 조작을 어려워하는
            편이에요. <br /> 그래서 버튼 터치를 하는데 어려움을 겪을 수 있어요.
          </SubTitle>
        </GuidelineWrapper>
      </Wrapper>
      <Wrapper>
        <ContentImage src={contentImage} />
      </Wrapper>
      <Wrapper>
        <GuidelineWrapper>
          <SolutionBadge>해결책</SolutionBadge>
          <MainTitle>쉽게 터치할 수 있도록</MainTitle>
          <SubTitle>
            시니어 세대는 운동 능력이 떨어져 빠른 조작이나 세밀한 조작에 있어
            어려움을 느끼고 입력 과정에서 오류가 발생하곤 해요. 따라서 터치
            인터페이스의 버튼은 대각선의 길이가 최소 9.6m 이상을 유지할 수
            있도록 하는 것이 좋아요.
          </SubTitle>
        </GuidelineWrapper>
      </Wrapper>
      <Wrapper>
        <TemporaryBox></TemporaryBox>
      </Wrapper>
      <Wrapper>
        <GuidelineWrapper>
          <CodeBadge>코드</CodeBadge>
          <MainTitle>이렇게 구현하면 돼요</MainTitle>
        </GuidelineWrapper>
      </Wrapper>
      <Wrapper>
        <TemporaryBox></TemporaryBox>
      </Wrapper>
    </div>
  );
}

export default GuidePage;

const BannerWrapper = styled.div`
  display: flex;
  margin-bottom: 6.625rem;
`;

const GuideTitleWrapper = styled.div`
  display: flex;
  margin-left: 7.25rem;
  justify-content: space-between;
  width: 100%;
`;

const Title = styled.div`
  display: flex;
`;

const GuideTitleBox = styled.div`
  width: 100%;
  height: 26.75rem;
  background-color: #eaf8fb;
  margin: 1rem;
  border-radius: 2rem;
  padding: 3.375rem;
  box-sizing: border-box;
`;

const GuideTitle = styled.h1`
  font-size: 5.625rem;
  font-weight: 500;
`;

const GuideTitleEn = styled.h3`
  font-size: 1.875rem;
  font-weight: 400;
  color: #83b4bf;
  line-height: 10rem;
  margin-left: 1rem;
`;

const Description = styled.h4`
  font-size: 1.25rem;
  font-weight: 400;
  line-height: 2rem;
`;

const Wrapper = styled.div`
  width: 60rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 0 auto;
`;

const GuideImage = styled.img`
  width: 40.5rem;
  display: block;
  padding: 1rem;
`;

const MainTitle = styled.h2`
  color: ${(props) => props.theme.colors.text_gray1};
  font-size: 3.125rem;
  font-weight: 400;
`;

const SubTitle = styled.h4`
  color: ${(props) => props.theme.colors.text_gray3};
  font-size: 1.375rem;
  margin: 0.75rem 0 0 0;
  display: block;
  font-weight: 400;
  line-height: 2rem;
`;

const GuidelineWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContentImage = styled.img`
  width: 100%;
  margin-top: 2.9rem;
  border-radius: 1.25rem;
  margin-bottom: 6.625rem;
`;

const SolutionBadge = styled.div`
  width: 6.125rem;
  height: 3.5rem;
  color: ${(props) => props.theme.colors.main};
  font-size: 1.625rem;
  background-color: #eef6f6;
  line-height: 3.5rem;
  text-align: center;
  margin-bottom: 1.25rem;
`;

const CodeBadge = styled.div`
  width: 4.625rem;
  height: 3.5rem;
  color: #cd78a5;
  font-size: 1.625rem;
  background-color: #f5f0f4;
  line-height: 3.5rem;
  text-align: center;
  margin-bottom: 1.25rem;
`;

const TemporaryBox = styled.div`
  width: 100%;
  height: 52rem;
`;
