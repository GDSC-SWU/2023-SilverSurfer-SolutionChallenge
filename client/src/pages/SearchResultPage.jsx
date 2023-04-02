import React, { useEffect, useState, useRef, Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import NavigationBar from "../components/UI/NavigationBar";
import { useQueryClient } from "@tanstack/react-query";
import useToken from "../hooks/useToken";
import setRecentSearch from "../store/setRecentSearch";
// import Card from "../components/Card/UxGuide";
import qs from "query-string";
import API from "../API/API";
import searchIcon from "../assets/icon/icon_search.svg";
import bookmark from "../assets/icon/icon_bookmark_active.svg";
import inActiveBookmark from "../assets/icon/icon_bookmark_inactive.svg";
import {
  CardWrapper,
  CardImage,
  CardImageBox,
  Title,
  SubTitle,
  CardTextBox,
  BookmarkIcon,
  InActiveBookmarkIcon,
} from "../components/UI/Card";

function SearchResultPage() {
  const navigate = useNavigate();
  const searchParams = useLocation().search;
  const query = qs.parse(searchParams).query;
  const [results, setResults] = useState([]);
  const [scrap, setScrap] = useState([]);
  const [keywords, setKeywords] = useState([]); // 자동완성 결과
  const input = useRef(""); // 입력값
  const ACCESS_TOKEN = useToken();
  const queryClient = useQueryClient();
  const authState = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    getResult();
    getScrap();
  }, []);

  const handleBookmark = (postId) => async () => {
    const current = new Date().getTime();
    if (!authState.userName) {
      alert("북마크를 저장하기 위해서는 로그인이 필요합니다.");
    } else if (current >= authState.expireTime) {
      alert("로그아웃 되었습니다. 다시 로그인 해주세요.");
    } else {
      await API.post(
        `/content/scrap/${postId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );

      queryClient.invalidateQueries(["mypageScrap"]);
    }
  };

  const onInputChange = (e) => {
    const value = e.target.value;
    input.current = value;
    const check = /^[0-9가-힣a-zA-Z\s]+$/; // 숫자, 완성형 한글, 영문, 띄어쓰기
    if (value !== " " && value !== "" && value !== null && check.test(value)) {
      getKeyword(value);
    } else {
      const result = [];
      setKeywords(result);
    }
  };

  const onSearch = () => {
    // 검색 버튼 클릭 or 엔터
    setRecentSearch(dispatch, true, input.current);
    navigate(`/search?query=${input.current}`);
    window.location.reload();
  };

  const handleOnKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSearch();
    }
  };

  const matchInput = (word) => {
    const result = [];
    for (let i = 0; i < word.length; i++) {
      if (input.current.includes(word[i])) {
        result.push(
          <MatchedKeyword key={`${i}_${word[i]}`}>{word[i]}</MatchedKeyword>
        );
      } else {
        result.push(
          <UnmatchedKeyword key={`${i}_${word[i]}`}>{word[i]}</UnmatchedKeyword>
        );
      }
    }

    return result;
  };

  const getKeyword = async (search) => {
    try {
      await API.get("/search/auto", {
        params: {
          search: search,
        },
      }).then((res) => {
        const result = res.data.data === null ? [] : res.data.data;
        setKeywords(result);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getScrap = async () => {
    const current = new Date().getTime();
    if (!authState.userName || current >= authState.expireTime) return;
    try {
      await API.get("/mypage/scrap", {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }).then((res) => {
        const result = [];
        if (res.data.data) {
          res.data.data.map((item) => {
            result.push(item.postId);
          });
        }
        setScrap(result);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getResult = async () => {
    try {
      await API.get("/search", {
        params: {
          search: query,
        },
      }).then((res) => {
        const response = res.data.data === null ? [] : res.data.data;
        setResults(response);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const onClick = (postId) => {
    navigate(`/content/${postId}`);
    location.reload();
  };

  return (
    <>
      <NavigationBar />
      <Wrapper>
        <SearchWrapper>
          <form>
            <InputWrapper>
              <InputText
                placeholder="검색어를 입력해주세요"
                onChange={(e) => onInputChange(e)}
                onKeyDown={handleOnKeyDown}
              />
              <label htmlFor="searchBtn">
                <SearchButton src={searchIcon} />
              </label>
              <input
                id="searchBtn"
                type="button"
                style={{ display: "none" }}
                onClick={() => onSearch()}
              />
            </InputWrapper>
          </form>
          {keywords.length !== 0 && (
            <AutoKeywordContainer>
              {keywords.map((word, idx) => (
                <AutoKeywordWrapper
                  key={idx}
                  onClick={() => {
                    input.current = word;
                    onSearch();
                  }}
                >
                  {matchInput(word)}
                </AutoKeywordWrapper>
              ))}
            </AutoKeywordContainer>
          )}
        </SearchWrapper>
      </Wrapper>
      <ContentWrapper>
        <TitleWrapper>
          <Search>&apos;{query}&apos;</Search>
          <Result>
            검색 결과가 <Number>{results.length}</Number>건 있어요.
          </Result>
        </TitleWrapper>
        <CardBoxWrapper>
          {results?.map((it) => (
            <Fragment key={it.postId}>
              <CardWrapper>
                <CardImageBox onClick={() => onClick(it.postId)}>
                  <CardImage src={it.thumbnailImagePath} />
                </CardImageBox>
                <CardTextBox>
                  {!scrap?.includes(it.postId) ? (
                    <InActiveBookmarkIcon
                      src={inActiveBookmark}
                      onClick={handleBookmark(it.postId)}
                    />
                  ) : (
                    <BookmarkIcon
                      src={bookmark}
                      onClick={handleBookmark(it.postId)}
                    />
                  )}
                  <Title onClick={() => onClick(it.postId)}>{it.title}</Title>
                  <SubTitle>{it.explanation}</SubTitle>
                </CardTextBox>
              </CardWrapper>
            </Fragment>
          ))}
        </CardBoxWrapper>
      </ContentWrapper>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  margin-left: 8.25rem;
  margin-right: 8.25rem;
`;

const SearchWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;

  height: 100vh;
  height: 19.75rem;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: flex-end;
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

const Result = styled.span`
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
  justify-content: flex-start;
  align-items: center;
  width: 73.25rem;
  margin-left: 8.25rem;
  margin-right: 8.25rem;
`;

const SearchButton = styled.img`
  margin-bottom: 0.8125rem;
  margin-left: -3rem;
  cursor: pointer;
`;

const AutoKeywordContainer = styled.div`
  position: fixed;
  top: 11.375rem;
  z-index: 100;
  background: #353535;
  width: 25.5rem;
  border-radius: 0.75rem;
  height: auto;
  padding: 1rem 1.25rem;
  box-sizing: border-box;
`;

const AutoKeywordWrapper = styled.div`
  display: flex;
  cursor: pointer;
  margin: 1.25rem;
  box-sizing: border-box;
  font-size: 1.25rem;
  color: #fff;
`;

const UnmatchedKeyword = styled.span``;

const MatchedKeyword = styled.span`
  color: #19b5d8;
`;

const CardBoxWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  flex-direction: row;
  width: 73.25rem;
  flex-wrap: wrap;
`;

export default SearchResultPage;
