import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import API from "../../API/API";

function CardDetail() {
  const { postId } = useParams();
  const [detailData, setDetailData] = useState([]);

  const getData = async () => {
    try {
      await API.get(`/content/detail/${postId}`).then((res) => {
        const data = res.data.data;
        setDetailData(data);
        console.log(data);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const Paragraph = ({ type, p }) => {
    return type === "문제점" ? (
      <ParagraphContainer>
        <SubTitle>{p.subTitle}</SubTitle>
        <ContentWrapper>
          <Content>{p.content}</Content>
        </ContentWrapper>
      </ParagraphContainer>
    ) : (
      <SolutionContainer>
        <TagWrapper>
          <Tag>{p.type}</Tag>
        </TagWrapper>
        <ParagraphContainer>
          <SubTitle>{p.subTitle}</SubTitle>
          <ContentWrapper>
            <Content>
              {p.content.split("\n").map((item) => (
                <Content key={item}>{item}</Content>
              ))}
            </Content>
          </ContentWrapper>
          <ImageWrapper>
            {p.image && <Image src={p.image[0].imagePath} />}
          </ImageWrapper>
        </ParagraphContainer>
        {p.code && (
          <CodeContainer>
            <CodeTagWrapper>
              <CodeTag>{`코드`}</CodeTag>
            </CodeTagWrapper>
            <SubTitle>{`이렇게 구현하면 돼요`}</SubTitle>
            <CodeWrapper>
              <Code>{p.code[0].codeContent}</Code>
            </CodeWrapper>
          </CodeContainer>
        )}
      </SolutionContainer>
    );
  };

  const Contents = ({ paragraphs }) => {
    const result = [];
    paragraphs.map((p, idx) => {
      result.push(<Paragraph key={idx} type={p.type} p={p} />);
    });

    return result;
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container>
      {detailData.content && (
        <TitleContainer>
          <MainTitle>{detailData.content.title}</MainTitle>
          <MainTitleEng>{detailData.content.title_eng}</MainTitleEng>
          <Explanation>{detailData.content.explanation}</Explanation>
          {detailData.content.thumbnailImagePath && (
            <MainImage src={detailData.content.thumbnailImagePath} />
          )}
        </TitleContainer>
      )}
      <ContentsContainer>
        {detailData.paragraphs && (
          <Contents paragraphs={detailData.paragraphs} />
        )}
      </ContentsContainer>
    </Container>
  );
}
const Container = styled.div``;

const TitleContainer = styled.div``;

const MainTitle = styled.span`
  font-weight: 500;
  font-size: 5.625rem;
  line-height: 100%;
  color: #000000;
`;

const MainTitleEng = styled.span`
  font-weight: 400;
  font-size: 1.875rem;
  line-height: 100%;
  color: #83b4bf;
`;

const Explanation = styled.p`
  font-weight: 400;
  font-size: 1.25rem;
  line-height: 155.5%;
  color: #000000;
`;

const MainImage = styled.img``;

const ContentsContainer = styled.div``;

const SolutionContainer = styled.div``;

const ParagraphContainer = styled.div``;

const TagWrapper = styled.div`
  background: rgba(0, 159, 115, 0.04);
  border-radius: 4px;
`;

const Tag = styled.div``;

const CodeTagWrapper = styled.div``;

const CodeTag = styled.div``;

const SubTitle = styled.h2`
  font-weight: 500;
  font-size: 3.125rem;
  line-height: 100%;
  color: #020202;
`;

const ContentWrapper = styled.div``;

const Content = styled.p`
  font-size: 1.25rem;
  font-weight: 400;
  line-height: 29px;
  letter-spacing: -0.03em;
  color: #353535;
`;

const ImageWrapper = styled.div``;

const Image = styled.img``;

const CodeContainer = styled.div``;

const CodeWrapper = styled.div``;

const Code = styled.div``;

export default CardDetail;
