import NavigationBar from "../components/UI/NavigationBar";
import styled from "styled-components";
import logo from "../assets/logo3.png";
const ProjectIntro = () => {
  return (
    <div>
      <NavigationBar />
      <Container>
        <Wrapper>
          <img src={logo} />
          <Name>Silver Surfer</Name>
          <Sub>For A World Where all seniors surf the digital sea</Sub>
        </Wrapper>
        <Wrapper>
          <Text>To be Continued...</Text>
        </Wrapper>
      </Container>
    </div>
  );
};
const Container = styled.div`
  padding: 7rem 8.25rem 8.25rem 8.25rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Name = styled.h1`
  font-size: 4.625rem;
`;

const Sub = styled.h3`
  font-size: 1.25rem;
`;

const Text = styled.h3`
  margin-top: 5rem;
  font-size: 3.125rem;
`;

export default ProjectIntro;
