import React, { useState, Fragment } from "react";
import styled from "styled-components";
import NavigationBar from "../components/UI/NavigationBar";
import { useDispatch } from "react-redux";
import { useQuery, useQueryClient } from "@tanstack/react-query";
// import { useNavigate } from "react-router-dom";
import API from "../API/API";
import setUserInfo from "../store/setUserInfo";
import useToken from "../hooks/useToken";
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
import MyBackImage from "../assets/myBackgroundImage.jpg";
import bookmark from "../assets/icon/icon_bookmark_active.svg";
import inActiveBookmark from "../assets/icon/icon_bookmark_inactive.svg";

function MyPage() {
  const dispatch = useDispatch();
  const [itemIndex, setItemIndex] = useState({});
  // const navigation = useNavigate();
  const ACCESS_TOKEN = useToken();
  const queryClient = useQueryClient();

  const postLogout = async () => {
    try {
      await API.post("/auth/logout", null, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }).then(() => setUserInfo(dispatch));
    } catch (error) {
      console.error(error);
    }
  };

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

  const handleBookmark = (postId) => async () => {
    setItemIndex((prev) => ({
      ...prev,
      [postId]: !prev[postId],
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

    // alert("삭제되었습니다.");

    queryClient.invalidateQueries(["mypageScrap"]);
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
      <MyPageContentBox>
        <BannerWrapper>
          <NavigationBar />
          <MyBackgroundImage src={MyBackImage} />
        </BannerWrapper>
        <Wrapper>
          <ProfileImage src={mypage.data.userInfo.googleProfileImagePath} />
        </Wrapper>
        <NameLogoutWrapper>
          <MyName>{mypage.data.userInfo.googleNickname}</MyName>
          <LogoutWrapper onClick={() => postLogout()}>
            <Logout>로그아웃</Logout>
          </LogoutWrapper>
        </NameLogoutWrapper>
        <Wrapper>
          <MyEmail>{mypage.data.userInfo.googleEmail}</MyEmail>
        </Wrapper>
        <Wrapper>
          <Title>내 스크랩</Title>
          <ScrapNumber>{mypage.data.userInfo.scrapCount}</ScrapNumber>
        </Wrapper>
        <Wrapper>
          <CardBoxWrapper>
            {mypageScrap?.data?.map((it, i) => (
              <Fragment key={it.postId}>
                <CardWrapper>
                  <CardImageBox>
                    <CardImage src={it.thumbnailPath} />
                  </CardImageBox>
                  <CardTextBox>
                    {itemIndex[i] ? (
                      <InActiveBookmarkIcon src={inActiveBookmark} />
                    ) : (
                      <BookmarkIcon
                        src={bookmark}
                        onClick={handleBookmark(it.postId)}
                      />
                    )}
                    <Title>{it.title}</Title>
                    <SubTitle>{it.explanation}</SubTitle>
                  </CardTextBox>
                </CardWrapper>
              </Fragment>
            ))}
          </CardBoxWrapper>
        </Wrapper>
      </MyPageContentBox>
    </>
  );
}

export default MyPage;

const MyPageContentBox = styled.div`
  margin-bottom: 10rem;
`;

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

const NameLogoutWrapper = styled.div`
  width: 73rem;
  display: flex;
  justify-content: space-between;
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
  margin-bottom: 4rem;
`;

const ScrapNumber = styled.h4`
  color: ${(props) => props.theme.colors.main};
  font-size: 1.75rem;
  font-weight: 500;
  margin-left: 1rem;
`;

const LogoutWrapper = styled.div`
  cursor: pointer;
  height: 3.2rem;
  background: #d0d5db;
  margin-top: 8rem;
  font-size: 1.5rem;
  color: #fff;
  padding: 0.5rem 1.75rem;
  line-height: 3.2rem;
  border-radius: 0.5rem;
`;

const Logout = styled.div`
  font-size: 2.25rem;
  text-align: center;
`;

const CardBoxWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  flex-direction: row;
  width: 73.25rem;
  flex-wrap: wrap;
`;
