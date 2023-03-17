import React from "react";
import styled from "styled-components";
import Menu from "./Menu";

function NavigationBar() {
  return (
    <Wrapper>
      <Menu />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: absolute;
  z-index: 1;
  width: 7.25rem;
  height: 100vh;
  background-color: #fff;
  display: inline;
  justify-content: space-between;
  background-color: ${(props) => props.theme.colors.sub1};
`;

export default NavigationBar;
