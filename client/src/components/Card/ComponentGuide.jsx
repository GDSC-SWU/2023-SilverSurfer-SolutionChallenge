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

function ComponentGuide() {
  const ACCESS_TOKEN = useToken();
  const [itemIndex, setItemIndex] = useState({});
  const navigate = useNavigate();

  const authState = useSelector((state) => state);

  const cardData = !authState.userName
    ? useCardData(`${process.env.REACT_APP_API_BASE_URL}/content/컴포넌트`)
    : useLoginCardData(
        `${process.env.REACT_APP_API_BASE_URL}/content/us/컴포넌트`
      );

  const handleBookmark = (index, postId) => async () => {
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
          <CardWrapper onClick={() => onClick(it.postId)}>
            <CardImageBox>
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
              <Title>{it.title}</Title>
              <SubTitle>{it.explanation}</SubTitle>
            </CardTextBox>
          </CardWrapper>
        </Fragment>
        // </Link>
      ))}
    </>
  );
}

export default ComponentGuide;
