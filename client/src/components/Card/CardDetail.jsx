import React, { useState, useEffect, useMemo, useRef } from "react";
import { useParams } from "react-router-dom";
import SyntaxHighlighter from "react-syntax-highlighter";
import { arduinoLight } from "react-syntax-highlighter/dist/esm/styles/hljs";
import styled, { createGlobalStyle } from "styled-components";
import Select from "react-select";
import API from "../../API/API";
import NavigationBar from "../UI/NavigationBar";
import IndexBar from "../UI/IndexBar";
import thumbnail_background from "../../assets/thumbnailBackgroundImage.png";

function CardDetail() {
  const { postId } = useParams();
  const [detailData, setDetailData] = useState([]);
  const [options, setOptions] = useState([]);
  const [index, setIndex] = useState([]);
  const [lang, setLang] = useState("");
  const indexRef = useRef([]);

  const getData = async () => {
    try {
      await API.get(`/content/detail/${postId}`).then((res) => {
        const data = res.data.data;
        setDetailData(data);
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (detailData.length === 0 || detailData.paragraphs.length === 0) return;

    const codeData = [];
    const optionList = [...options];

    detailData.paragraphs.map((item) => {
      if (item.type === "코드") {
        if (item.code.length === options.length) return;
        item.code.map((value) => {
          codeData.push(value);
        });
      }
    });

    if (codeData.length !== 0) {
      codeData.map((item) => {
        optionList.push({
          value: item.language.toLowerCase(),
          label: item.language,
        });
      });
    }

    setOptions(optionList);
  }, [detailData]);

  useEffect(() => {
    if (detailData.length === 0 || detailData.paragraphs.length === 0) return;
    if (detailData.paragraphs.length === index.length) return;

    const indexList = [...index];

    detailData.paragraphs.map((item) => {
      const type = item.type === "코드" ? "구현코드" : item.type;
      indexList.push(type);
    });

    setIndex(indexList);
  }, [detailData]);

  const Language = () => {
    const onChange = (value) => {
      setLang(value);
    };

    const customStyle = useMemo(() => ({
      container: (provided) => ({
        ...provided,
        width: "8.3125rem",
      }),
      control: (provided) => ({
        ...provided,
        height: "3rem",
        borderRadius: "5px",
        border: "1px solid #353535",
        boxShadow: "none",
        ":hover": { outline: "none", border: "1px solid #2684ff" },
        ":focus": { outline: "none", border: "1px solid #2684ff" },
      }),
      valueContainer: (provided) => ({
        ...provided,
        padding: "12px 14px",
      }),
      singleValue: (provided) => ({
        ...provided,
        margin: 0,
        fontWeight: 400,
        fontSize: "1.5rem",
        lineHeight: "100%",
        color: "#020202",
        textAlign: "center",
      }),
      indicatorSeparator: (provided) => ({
        ...provided,
        display: "none",
      }),
      dropdownIndicator: (provided) => ({
        ...provided,
        padding: "0.75rem",
        transition: "all ease 0.5s",
        color: "#020202",
        transform: "rotate(-180deg)",
        ":hover": { color: "#2684ff", transform: "rotate(0deg)" },
        ":focus": { color: "#2684ff", transform: "rotate(0deg)" },
      }),
      menu: (provided) => ({
        ...provided,
        zIndex: 999,
      }),
    }));

    return (
      <>
        {options.length !== 0 && (
          <Select
            styles={customStyle}
            value={options.find((op) => {
              return op.value === lang;
            })}
            onChange={(value) => {
              onChange(value.value);
            }}
            options={options}
            isSearchable={false}
            defaultValue={options[0]}
          />
        )}
      </>
    );
  };

  const Paragraphs = ({ type, p, idx }) => {
    const Problem = () => {
      return (
        <ProblemWrapper ref={(ref) => (indexRef.current[idx] = ref)}>
          <SubTitle>{p.subTitle}</SubTitle>
          {p.content && (
            <ContentWrapper>
              {p.content.split("\n").map((item) => (
                <Content key={item}>{item}</Content>
              ))}
            </ContentWrapper>
          )}
          <ImageWrapper type={type}>
            {p.image && <Image src={p.image[0].imagePath} />}
          </ImageWrapper>
        </ProblemWrapper>
      );
    };

    const Solution = () => {
      return (
        <ParagraphContainer ref={(ref) => (indexRef.current[idx] = ref)}>
          <TagWrapper type={p.type}>
            <Tag type={p.type}>{p.type}</Tag>
          </TagWrapper>
          <ParagraphWrapper>
            <SubTitle>{p.subTitle}</SubTitle>
            {p.content && (
              <ContentWrapper>
                {p.content.split("\n").map((item) => (
                  <Content key={item}>{item}</Content>
                ))}
              </ContentWrapper>
            )}
            <ImageWrapper type={type}>
              {p.image && <Image src={p.image[0].imagePath} />}
            </ImageWrapper>
          </ParagraphWrapper>
        </ParagraphContainer>
      );
    };

    const Code = () => {
      return (
        <ParagraphContainer ref={(ref) => (indexRef.current[idx] = ref)}>
          <TagWrapper type={p.type}>
            <Tag type={p.type}>{p.type}</Tag>
          </TagWrapper>
          <ParagraphWrapper>
            <SubTitle>{p.subTitle}</SubTitle>
            {p.code && (
              <CodeWrapper>
                <Language />
                <SyntaxHighlighter
                  language={p.code[0].language.toLowerCase()}
                  style={arduinoLight}
                  customStyle={{
                    background: "#EDF3F4",
                    border: "1px solid #000000",
                    borderRadius: "5px",
                    width: "960px",
                    height: "695px",
                    padding: "1.1875rem",
                    marginTop: "2rem",
                    fontSize: "1.125rem",
                    lineHeight: "1.625rem",
                  }}
                >
                  {p.code[0].codeContent}
                </SyntaxHighlighter>
              </CodeWrapper>
            )}
          </ParagraphWrapper>
        </ParagraphContainer>
      );
    };

    switch (type) {
      case "문제점":
        return <Problem />;
      case "해결책":
        return <Solution />;
      case "코드":
        return <Code />;
    }
  };

  const Contents = ({ paragraphs }) => {
    const result = [];
    paragraphs.map((p, idx) => {
      result.push(<Paragraphs key={idx} type={p.type} p={p} idx={idx} />);
    });

    return result;
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container>
      <GlobalStyle />
      <NavigationBar />
      <Wrapper>
        {detailData.content && (
          <div>
            <TopWrapper>
              <TitleContainer>
                <MainTitle>{detailData.content.title}</MainTitle>
                <MainTitleEng>{detailData.content.title_eng}</MainTitleEng>
                <Explanation>{detailData.content.explanation}</Explanation>
              </TitleContainer>
              <ImageContainer>
                <BackgroundWrapper>
                  <BackgroundImage src={thumbnail_background} />
                </BackgroundWrapper>
                {detailData.content.thumbnailImagePath && (
                  <MainImageWrapper>
                    <MainImage src={detailData.content.thumbnailImagePath} />
                  </MainImageWrapper>
                )}
              </ImageContainer>
            </TopWrapper>
            <IndexBar
              title={detailData.content.title}
              index={index}
              indexElements={indexRef.current}
            />
          </div>
        )}
        <ContentsContainer>
          {detailData.paragraphs && (
            <Contents paragraphs={detailData.paragraphs} />
          )}
        </ContentsContainer>
      </Wrapper>
    </Container>
  );
}

const GlobalStyle = createGlobalStyle`
body {
  background: #f8fafb;
}
`;

const Container = styled.div`
  padding-bottom: 6.625rem;
`;

const Wrapper = styled.div`
  margin-left: 7.25rem;
`;

const TopWrapper = styled.div`
  display: flex;
  width: 1304px;
  padding-top: 0.625rem;
  margin: 0 auto;
`;

const TitleContainer = styled.div`
  width: 541px;
  height: 322px;
  background: #eaf8fb;
  border-radius: 30px;
  padding: 3.3125rem;
  margin-right: 0.625rem;
`;

const ImageContainer = styled.div`
  width: 647px;
  height: 428px;
  background: #f1f1f1;
  border-radius: 30px;
`;

const MainTitle = styled.span`
  font-weight: 500;
  font-size: 5.625rem;
  line-height: 100%;
  color: #000000;
  margin-right: 1.125rem;
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
  margin-top: 2.1875rem;
  word-break: keep-all;
`;

const BackgroundWrapper = styled.div`
  position: relative;
`;

const BackgroundImage = styled.img`
  width: 647px;
  height: 428px;
  border-radius: 30px;
  object-fit: cover;
`;

const MainImageWrapper = styled.div`
  position: absolute;
  top: 10px;
`;

const MainImage = styled.img`
  width: 647px;
  height: 428px;
  border-radius: 30px;
  object-fit: cover;
`;

const ContentsContainer = styled.div`
  width: 960px;
  margin: 0 auto;
  padding-right: 7.25rem;
`;

const ParagraphContainer = styled.div`
  padding-top: 7.4375rem;
`;

const ParagraphWrapper = styled.div``;

const ProblemWrapper = styled.div`
  padding-top: 6.625rem;
`;

const TagWrapper = styled.div`
  background: ${(props) =>
    props.type === "해결책" ? "rgba(0, 159, 115, 0.04)" : "#F5F0F4"};
  border-radius: 4px;
  width: 6.0625rem;
  height: 3.5rem;
  margin-bottom: 1.25rem;
`;

const Tag = styled.div`
  color: ${(props) => (props.type === "해결책" ? "#19B5D8" : "#CD78A5")};
  font-weight: 500;
  font-size: 26px;
  line-height: 129%;
  letter-spacing: -0.015em;
  padding: 11px 13px;
  text-align: center;
`;

const SubTitle = styled.h2`
  font-weight: 500;
  font-size: 3.125rem;
  line-height: 100%;
  color: #020202;
`;

const ContentWrapper = styled.div`
  margin-top: 2.25rem;
`;

const Content = styled.div`
  font-size: 1.25rem;
  font-weight: 400;
  line-height: 29px;
  letter-spacing: -0.03em;
  color: #353535;
  word-break: keep-all;
`;

const ImageWrapper = styled.div`
  width: 960px;
  height: ${(props) => (props.type === "문제점" ? "370px" : "780px")};
  background: #f1f1f1;
  border-radius: 1.25rem;
  margin-top: 2.75rem;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 1.25rem;
  object-fit: cover;
`;

const CodeWrapper = styled.div`
  margin-top: 3.5rem;
`;

export default CardDetail;
