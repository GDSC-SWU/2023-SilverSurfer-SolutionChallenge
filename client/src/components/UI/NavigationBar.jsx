import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Menu from "./Menu";
import API from "../../API/API";
import Search from "./Search";

function NavigationBar() {
  const [hover, setHover] = useState("");
  const [search, setSearch] = useState(false);
  const [uxList, setUxList] = useState([]);
  const [comList, setComList] = useState([]);
  const [styleList, setStyleList] = useState([]);
  const navigate = useNavigate();

  const onSearchClick = () => {
    const temp = true;
    setSearch(temp);
  };

  const onSearchClose = () => {
    const temp = false;
    setSearch(temp);
  };

  const onItemClick = (postId) => {
    navigate(`/content/${postId}`);
    location.reload();
  };

  const onMouseEnter = (key) => {
    setHover(key);
  };

  const onMouseLeave = () => {
    setHover("");
  };

  const getContentList = async () => {
    try {
      const uxData = await API.get(`/content/UX 가이드라인`);
      const comData = await API.get(`/content/컴포넌트`);
      const styleData = await API.get(`/content/스타일`);

      setUxList(uxData.data.data);
      setComList(comData.data.data);
      setStyleList(styleData.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getContentList();
  }, []);

  const Detail = ({ type }) => {
    switch (type) {
      case "ux":
        return (
          uxList &&
          uxList.map((item, idx) => {
            return (
              <DetailWrapper
                key={`ux_${idx}`}
                onClick={() => onItemClick(item.postId)}
              >
                <DetailItem>{item.title}</DetailItem>
              </DetailWrapper>
            );
          })
        );
      case "component":
        return (
          comList &&
          comList.map((item, idx) => {
            return (
              <DetailWrapper
                key={`component_${idx}`}
                onClick={() => onItemClick(item.postId)}
              >
                <DetailItem>{item.title}</DetailItem>
              </DetailWrapper>
            );
          })
        );
      case "style":
        return (
          styleList &&
          styleList.map((item, idx) => {
            return (
              <DetailWrapper
                key={`style_${idx}`}
                onClick={() => onItemClick(item.postId)}
              >
                <DetailItem>{item.title}</DetailItem>
              </DetailWrapper>
            );
          })
        );
    }
  };

  return (
    <div>
      <Wrapper>
        <Menu
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onSearchClick={onSearchClick}
        />
      </Wrapper>
      {hover !== "" && (
        <DetailBox
          onMouseEnter={() => onMouseEnter(hover)}
          onMouseLeave={onMouseLeave}
        >
          <Detail type={hover} />
        </DetailBox>
      )}
      {search && <Search onSearchClose={onSearchClose} />}
    </div>
  );
}

const Wrapper = styled.div`
  position: fixed;
  z-index: 100;
  width: 7.25rem;
  height: 100vh;
  background-color: #fff;
  display: inline;
  justify-content: space-between;
  background-color: ${(props) => props.theme.colors.sub1};
`;

const DetailBox = styled.div`
  position: fixed;
  z-index: 100;
  width: 11.875rem;
  height: 100vh;
  background-color: #daf5fb;
  border-left: 1px solid #d0d5db;
  left: 7.25rem;
  padding: 38px 6.5px;
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
  cursor: pointer;
`;

const DetailWrapper = styled.div`
  border-radius: 100px;
  padding-top: 14px;
  padding-bottom: 14px;
  display: flex;
  justify-content: center;
  border-radius: 100px;

  &:hover {
    background: rgba(25, 181, 216, 0.2);
    border-left: 1px solid #d0d5db;
  }
`;

const DetailItem = styled.h3`
  font-weight: 500;
  font-size: 1rem;
  line-height: 1.375rem;
  color: #000000;
`;

export default NavigationBar;
