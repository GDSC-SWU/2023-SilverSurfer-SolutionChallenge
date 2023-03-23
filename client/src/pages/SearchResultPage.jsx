import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import NavigationBar from "../components/UI/NavigationBar";
//import Card from "../components/UI/Card";
import qs from "query-string";
import API from "../API/API";

function SearchResultPage() {
  const searchParams = useLocation().search;
  const query = qs.parse(searchParams).query;
  const [result, setResult] = useState([]);

  useEffect(() => {
    getResult();
  }, []);

  const getResult = async () => {
    try {
      await API.get("/search", {
        params: {
          search: query,
        },
      }).then((res) => {
        const response = res.data.data === null ? [] : res.data.data;
        setResult(response);
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <NavigationBar />

      <Wrapper>
        <SearchWrapper>
          <InputText placeholder="검색어를 입력해주세요" />
        </SearchWrapper>
      </Wrapper>
      <ContentWrapper>
        <TitleWrapper>
          <Search>&apos;{query}&apos;</Search>
          <Title>
            검색 결과가 <Number>{result.length}</Number>건 있어요.
          </Title>
        </TitleWrapper>
      </ContentWrapper>
      <ContentWrapper>{/* <Card /> */}</ContentWrapper>
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
  &:focus {
    outline: none;
  }
`;

const TitleWrapper = styled.div``;

const Search = styled.span`
  font-size: 1.5rem;
  font-weight: 500;
  color: #353535;
  line-height: 100%;
  margin-right: 0.25rem;
`;

const Title = styled.span`
  font-size: 1.5rem;
  font-weight: 400;
  color: #353535;
`;

const Number = styled.span`
  font-size: 1.5rem;
  font-weight: 500;
  color: #19b5d8;
  margin-left: 0.5rem;
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
