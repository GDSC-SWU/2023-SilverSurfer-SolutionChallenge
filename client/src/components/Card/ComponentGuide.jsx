// import { Fragment } from "react";
// import useCardData from "../../hooks/useCardData";
// import useLoginCardData from "../../hooks/useLoginCardData";
// import {
//   CardImage,
//   CardImageBox,
//   Title,
//   SubTitle,
//   CardTextBox,
//   BookmarkIcon,
//   InActiveBookmarkIcon,
// } from "../UI/Card";
// import bookmark from "../../assets/icon/icon_bookmark_active.svg";
// import inActiveBookmark from "../../assets/icon/icon_bookmark_inactive.svg";

// import { useSelector } from "react-redux";

// function ComponentGuide() {
// const [isBookmarkActive, setIsBookmarkActive] = useState(true);
//   const authState = useSelector((state) => state);

//   console.log(`component guide line 21`, authState);
//   console.log(`hello world`);

//   const cardData = useCardData(
//         "https://server-1-dot-silver-surfer-376919.du.r.appspot.com/content/컴포넌트"
//       )
//     // : useLoginCardData(
//     //     "https://server-1-dot-silver-surfer-376919.du.r.appspot.com/content/us/컴포넌트"
//     //   );

//   return (
//     <>
//       {cardData?.data?.map((it) => (
//         <Fragment key={it.postId}>
//           <CardImageBox>
//             <CardImage src={it.thumbnailPath} />
//           </CardImageBox>
//           {console.log(it.bookmark)}
//           <CardTextBox>
//             <InActiveBookmarkIcon src={inActiveBookmark} />

//             <Title>{it.title}</Title>
//             <SubTitle>{it.explanation}</SubTitle>
//           </CardTextBox>
//         </Fragment>
//       ))}
//     </>
//   );
// }

// export default ComponentGuide;
