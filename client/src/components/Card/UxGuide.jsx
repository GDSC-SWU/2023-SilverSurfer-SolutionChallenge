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
// import { Link } from "react-router-dom";
import useLoginCardData from "../../hooks/useLoginCardData";
import API from "../../API/API";
import useToken from "../../hooks/useToken";

function UxGuide() {
  const ACCESS_TOKEN = useToken();
  const [itemIndex, setItemIndex] = useState({});

  const authState = useSelector((state) => state);

  console.log(ACCESS_TOKEN);

  const cardData = !authState.userName
    ? useCardData(`${process.env.REACT_APP_API_BASE_URL}/content/UX 가이드라인`)
    : useLoginCardData(
        `${process.env.REACT_APP_API_BASE_URL}/content/us/UX 가이드라인`
      );

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

  return (
    <>
      {cardData?.data?.map((it, i) => (
        // <Link to={`content/${it.postId}`} state={it.postId} key={it.postId}>
        <Fragment key={it.postId}>
          <CardWrapper>
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
          </CardWrapper>
        </Fragment>
        // </Link>
      ))}
    </>
  );
}

export default UxGuide;
