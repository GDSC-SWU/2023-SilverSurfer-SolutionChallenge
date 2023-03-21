import React from "react";
import styled from "styled-components";
import NavigationBar from "../components/UI/NavigationBar";
import Card from "../components/UI/Card";

function SearchResultPage() {
  return (
    <>
      <NavigationBar />

      <Wrapper>
        <SearchWrapper>
          <InputText placeholder="검색어를 입력해주세요" />
        </SearchWrapper>
      </Wrapper>
      <ContentWrapper>
        <Title>&apos;버튼&apos; 검색 결과가 1건 있어요.</Title>
      </ContentWrapper>
      <ContentWrapper>
        <Card />
      </ContentWrapper>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
`;

const SearchWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;

  height: 100vh;
  height: 19.75rem;
`;

const InputText = styled.input`
  width: 38.75rem;
  height: 4rem;
  padding: 1rem;
  box-sizing: border-box;
  font-size: 2.25rem;
  border: none;
  border-bottom: 1px solid #19b5d8;
`;

const Title = styled.h4`
  font-size: 1.5rem;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  width: 73.25rem;
  margin: 0 auto;
`;

export default SearchResultPage;
