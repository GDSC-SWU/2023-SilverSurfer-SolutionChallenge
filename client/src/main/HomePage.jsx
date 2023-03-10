import Guideline from "../components/home/Guideline";
import Card from "../components/home/Card";
import NavigationBar from "../components/navigation/NavigationBar";
import styled from "styled-components";
import bannerImage from "../assets/main_banner.jpg";

export const HomePage = () => {
  return (
    <div>
      <BannerWrapper>
        <NavigationBar />
        <MainBannerImage src={bannerImage} />
      </BannerWrapper>
      <Wrapper>
        <GuidelineWrapper>
          <Guideline />
          <Guideline />
          <Guideline />
        </GuidelineWrapper>
      </Wrapper>
      <CardWrapper>
        <Card />
        <Card />
        <Card />
        <Card />
      </CardWrapper>
    </div>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GuidelineWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  width: 73.25rem;
  margin: 0 auto;
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
