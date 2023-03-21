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
import bookmark from "../../assets/icon/icon_bookmark_active.svg";

function ComponentGuide() {
  const cardData = useCardData(
    "https://server-1-dot-silver-surfer-376919.du.r.appspot.com/content/컴포넌트"
  );

  return (
    <>
      {cardData?.data?.map((it) => (
        <Fragment key={it.postId}>
          <CardImageBox>
            <CardImage src={it.thumbnailPath} />
          </CardImageBox>
          <CardTextBox>
            <BookmarkIcon src={bookmark} />
            <Title>{it.title}</Title>
            <SubTitle>{it.explanation}</SubTitle>
          </CardTextBox>
        </Fragment>
      ))}
    </>
  );
}

export default ComponentGuide;
