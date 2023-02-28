import React from "react";
import styled from "styled-components";

function NavigationBar() {
  return (
    <div>
      <Wrapper>
        <LogoText>Silver Surfer</LogoText>
      </Wrapper>
    </div>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 4.5rem;
  background-color: #fff;
  padding: 0 4.5rem;
  display: flex;
  justify-content: space-between;
`;

const LogoText = styled.h3`
  font-size: 1.5rem;
  margin: 0;
  line-height: 4.5rem;
  letter-spacing: -0.04rem;
  font-weight: 400;
`;

export default NavigationBar;
