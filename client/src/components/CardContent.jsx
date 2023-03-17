import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

function CardContent() {
  const [, setGuideData] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get("http://34.64.232.122:8080/content");

      setGuideData(data);
    })();
  }, []);

  return (
    <>
      <CardImageBox>
        <CardImage />
      </CardImageBox>
      <CardTextBox>
        <BookmarkIcon />
        <Title></Title>
        <SubTitle></SubTitle>
      </CardTextBox>
    </>
  );
}

const CardImageBox = styled.div`
  width: 23rem;
  height: 12.5rem;
  border-radius: 1.75rem 1.75rem 0 0;
  border: 1px solid #f0f0f0;
`;

const CardImage = styled.img`
  width: 100%;
`;

const CardTextBox = styled.div`
  width: 23rem;
  height: 8rem;
  border-radius: 0 0 1.75rem 1.75rem;
  border: 1px solid #f0f0f0;
  margin-top: -1px;
  background-color: ${(props) => props.theme.colors.sub1};
  padding: 1rem 2rem;
  box-sizing: border-box;
  position: relative;
`;

const Title = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
`;

const SubTitle = styled.h4`
  font-size: 0.875rem;
  font-weight: 400;
  margin-top: 0.8rem;
  line-height: 1.3rem;
`;

const BookmarkIcon = styled.img`
  width: 1.5rem;
  position: absolute;
  right: 2rem;
`;

export default CardContent;
