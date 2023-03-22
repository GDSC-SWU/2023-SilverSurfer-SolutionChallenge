import { Fragment } from "react";
import useCardData from "../../hooks/useCardData";
import {
  CardImage,
  CardImageBox,
  Title,
  SubTitle,
  CardTextBox,
  BookmarkIcon,
} from "../UI/Card";
// import bookmark from "../assets/icon_bookmark_active.svg";
import bookmark from "../../assets/icon/icon_bookmark_active.svg";
import { Link } from "react-router-dom";

function UxGuide() {
  const cardData = useCardData(
    "https://server-1-dot-silver-surfer-376919.du.r.appspot.com/content/UX 가이드라인"
  );

  return (
    <>
      {cardData?.data?.map((it) => (
        <Link to={`content/${it.postId}`} state={it.postId} key={it.postId}>
          <CardImageBox>
            <CardImage src={it.thumbnailPath} />
          </CardImageBox>
          <CardTextBox>
            <BookmarkIcon src={bookmark} />
            <Title>{it.title}</Title>
            <SubTitle>{it.explanation}</SubTitle>
          </CardTextBox>
        </Link>
      ))}
    </>
  );
}

export default UxGuide;
