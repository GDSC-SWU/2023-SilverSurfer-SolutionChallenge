import React from "react";
import styled from "styled-components";
import CardContent from "../CardContent";

function Card() {
  return (
    <CardWrapper>
      <CardContent />
    </CardWrapper>
  );
}

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
`;

export default Card;
