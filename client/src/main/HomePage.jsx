import Guideline from "../components/home/Guideline";
import Card from "../components/home/Card";
import NavigationBar from "../components/navigation/NavigationBar";
import styled from "styled-components";

export const HomePage = () => {
  return (
    <div>
      <NavigationBar />
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
