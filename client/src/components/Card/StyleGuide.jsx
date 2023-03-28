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

function StyleGuide() {
  const cardData = useCardData(
    `${process.env.REACT_APP_API_BASE_URL}/content/스타일`
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

export default StyleGuide;
