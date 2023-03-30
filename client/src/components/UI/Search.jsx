import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import API from "../../API/API";
import searchIcon from "../../assets/icon/icon_search.svg";
import setRecentSearch from "../../store/setRecentSearch";

function Search({ onSearchClose }) {
  const navigation = useNavigate();
  const [keywords, setKeywords] = useState([]); // 자동완성 결과
  const [recentData, setRecentData] = useState([]);
  const input = useRef(""); // 입력값
  const searchRef = useRef(null);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  function handleClickOutside(e) {
    if (searchRef.current && !searchRef.current.contains(e.target)) {
      onSearchClose();
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRef]);

  useEffect(() => {
    if (state.recentSearch.length === 0) return;
    if (state.recentSearch.length === recentData.length) return;

    const result = [...recentData];
    state.recentSearch.map((item) => {
      result.push(item);
    });

    setRecentData(result);
  }, [state]);

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

  const onSearch = (isRecent) => {
    // 검색 버튼 클릭 or 엔터
    if (!isRecent) {
      setRecentSearch(dispatch, true, input.current);
    }
    navigation(`/search?query=${input.current}`);
    window.location.reload();
  };

  const handleOnKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSearch(false);
    }
  };

  const handleLeftClick = (e, id) => {
    e.preventDefault();
    setRecentData(recentData.filter((item) => item.id !== id));
    setRecentSearch(dispatch, false, id);
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

  return (
    <div>
      <Wrapper>
        <ModalBackground>
          <ModalWrapper ref={searchRef}>
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
                  onClick={() => onSearch(false)}
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
                      onSearch(false);
                    }}
                  >
                    {matchInput(word)}
                  </AutoKeywordWrapper>
                ))}
              </AutoKeywordContainer>
            )}
            <Title>최근 검색어</Title>
            <ItemWrapper>
              {recentData.length !== 0 &&
                recentData.map((item) => {
                  return (
                    <Item
                      key={item.id}
                      onClick={() => {
                        input.current = item.value;
                        onSearch(true);
                      }}
                      onContextMenu={(e) => handleLeftClick(e, item.id)}
                    >
                      {item.value}
                    </Item>
                  );
                })}
            </ItemWrapper>
          </ModalWrapper>
        </ModalBackground>
      </Wrapper>
    </div>
  );
}

const Wrapper = styled.div`
  // display: none;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.6);
`;

const ModalBackground = styled.div`
  width: 100%;
  height: 24rem;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
  width: 40rem;
  padding: 1rem;
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
  border-bottom: 1px solid #353535;
  &:focus {
    outline: none;
  }
`;

const SearchButton = styled.img`
  margin-bottom: 0.8125rem;
  margin-left: -3rem;
  cursor: pointer;
`;

const AutoKeywordContainer = styled.div`
  position: fixed;
  margin-top: -0.5rem;
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

const Title = styled.h4`
  font-size: 1.25rem;
  font-weight: 400;
  margin-top: 2.75rem;
  margin-bottom: 1rem;
`;

const ItemWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  width: 38.75rem;
  height: 2.5rem;
  overflow: hidden;
`;

const Item = styled.div`
  font-size: 1rem;
  padding: 0.5rem;
  max-width: 7.75rem;
  border: 1px solid #878787;
  border-radius: 0.25rem;
  margin-right: 0.75rem;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default Search;
