import React, { useState, Fragment } from "react";
import styled from "styled-components";
import NavigationBar from "../components/UI/NavigationBar";
import MyBackImage from "../assets/myBackgroundImage.jpg";
import { useQuery } from "@tanstack/react-query";
import API from "../API/API";
import useToken from "../hooks/useToken";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  CardImage,
  CardImageBox,
  Title,
  SubTitle,
  CardTextBox,
  BookmarkIcon,
  InActiveBookmarkIcon,
} from "../components/UI/Card";
import bookmark from "../assets/icon/icon_bookmark_active.svg";
import inActiveBookmark from "../assets/icon/icon_bookmark_inactive.svg";

function MyPage() {
  const [itemIndex, setItemIndex] = useState({});

  const navigation = useNavigate();

  const isLogin = useSelector((state) => state);

  if (!isLogin) navigation("/login");

  const ACCESS_TOKEN = useToken();

  const getUserData = async (url) => {
    const { data } = await API.get(url, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });

    return data;
  };

  const {
    data: mypage,
    isFetching,
    error,
  } = useQuery(["mypage"], () => getUserData("/mypage"));

  const { data: mypageScrap } = useQuery(["mypageScrap"], () =>
    getUserData("/mypage/scrap")
  );

  console.log(mypageScrap);

  const handleBookmark = (index, postId) => async () => {
    console.log(`function`, postId);

    setItemIndex((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));

    await API.post(
      `/content/scrap/${postId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }
    );

    console.log(postId);
    console.log(`request success and clicked`);
  };

  if (isFetching) {
    <p>잠시만 기다려주세요..</p>;

    return;
  }

  if (error) {
    <p>문제가 발생했습니다. 잠시 후 시도해주세요.</p>;
  }

  return (
    <>
      <BannerWrapper>
        <NavigationBar />
        <MyBackgroundImage src={MyBackImage} />
      </BannerWrapper>
      <Wrapper>
        <ProfileImage src={mypage.data.userInfo.googleProfileImagePath} />
      </Wrapper>
      <Wrapper>
        <MyName>{mypage.data.userInfo.googleNickname}</MyName>
      </Wrapper>
      <Wrapper>
        <MyEmail>{mypage.data.userInfo.googleEmail}</MyEmail>
      </Wrapper>
      <Wrapper>
        <Title>내 스크랩</Title>
        <ScrapNumber>{mypage.data.userInfo.scrapCount}</ScrapNumber>
      </Wrapper>

      {mypageScrap.data.map((it, i) => (
        <Fragment key={it.postId}>
          <CardImageBox>
            <CardImage src={it.thumbnailPath} />
          </CardImageBox>
          <CardTextBox>
            {it.bookmark || itemIndex[i] ? (
              <BookmarkIcon
                src={bookmark}
                onClick={handleBookmark(i, it.postId)}
              />
            ) : (
              <InActiveBookmarkIcon
                src={inActiveBookmark}
                onClick={handleBookmark(i, it.postId)}
              />
            )}
            <Title>{it.title}</Title>
            <SubTitle>{it.explanation}</SubTitle>
          </CardTextBox>
        </Fragment>
      ))}
    </>
  );
}

export default MyPage;

const BannerWrapper = styled.div`
  display: flex;
`;

const MyBackgroundImage = styled.img`
  width: 100%;
  height: 19.375rem;
`;

const Wrapper = styled.div`
  width: 73rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 0 auto;
`;

const ProfileImage = styled.img`
  width: 11.375rem;
  height: 11.375rem;
  background-color: aliceblue;
  position: absolute;
  border-radius: 50%;
`;

const MyName = styled.h3`
  color: ${(props) => props.theme.colors.text_gray1};
  font-size: 3.125rem;
  font-weight: 500;
  margin-top: 8rem;
`;

const MyEmail = styled.h5`
  color: ${(props) => props.theme.colors.text_gray2};
  margin-top: 0.5rem;
  font-size: 1.5rem;
`;

const ScrapNumber = styled.h4`
  color: ${(props) => props.theme.colors.main};
  font-size: 2.25rem;
  font-weight: 500;
  margin-top: 5.875rem;
  margin-left: 1rem;
`;
