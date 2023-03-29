import { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import useCardData from "../../hooks/useCardData";
import {
  CardWrapper,
  CardImage,
  CardImageBox,
  Title,
  SubTitle,
  CardTextBox,
  BookmarkIcon,
  InActiveBookmarkIcon,
} from "../UI/Card";
import bookmark from "../../assets/icon/icon_bookmark_active.svg";
import inActiveBookmark from "../../assets/icon/icon_bookmark_inactive.svg";
import { useNavigate } from "react-router-dom";
import useLoginCardData from "../../hooks/useLoginCardData";
import API from "../../API/API";
import useToken from "../../hooks/useToken";

function UxGuide() {
  const ACCESS_TOKEN = useToken();
  const [itemIndex, setItemIndex] = useState({});
  const navigate = useNavigate();

  const authState = useSelector((state) => state);
  const current = new Date().getTime();
  const cardData =
    !authState.userName || current >= authState.expireTime
      ? useCardData(
          `${process.env.REACT_APP_API_BASE_URL}/content/UX 가이드라인`
        )
      : useLoginCardData(
          `${process.env.REACT_APP_API_BASE_URL}/content/us/UX 가이드라인`
        );

  const handleBookmark = (index, postId) => async () => {
    setItemIndex((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));

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
    }
  };

  const onClick = (postId) => {
    navigate(`/content/${postId}`);
    location.reload();
  };

  return (
    <>
      {cardData?.data?.map((it, i) => (
        // <Link to={`content/${it.postId}`} state={it.postId} key={it.postId}>
        <Fragment key={it.postId}>
          <CardWrapper>
            <CardImageBox onClick={() => onClick(it.postId)}>
              <CardImage src={it.thumbnailImagePath} />
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
              <Title onClick={() => onClick(it.postId)}>{it.title}</Title>
              <SubTitle>{it.explanation}</SubTitle>
            </CardTextBox>
          </CardWrapper>
        </Fragment>
        // </Link>
      ))}
    </>
  );
}

export default UxGuide;
