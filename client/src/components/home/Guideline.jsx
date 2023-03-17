import React from "react";
import styled from "styled-components";

function Guideline() {
  return (
    <div>
      <Wrapper>
        <GuideImage />
        <TitleBox>
          <GuideTitle>
            주요한 기능은 왼손 엄지존 안에서 구동되도록 디자인하라.
          </GuideTitle>
          <GuideSubTitle>
            The main function should be operated in the left thumb zone.
          </GuideSubTitle>
        </TitleBox>
      </Wrapper>
    </div>
  );
}

const Wrapper = styled.div`
  display: flex;
  width: 73.75rem;
  margin-top: 3.375rem;
`;

const GuideImage = styled.img`
  width: 14.7rem;
  height: 14.7rem;
`;

const TitleBox = styled.div`
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

export default Guideline;
