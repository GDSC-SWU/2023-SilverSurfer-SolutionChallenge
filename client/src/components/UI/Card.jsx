import styled from "styled-components";

export const CardWrappers = styled.div`
  float: inline-start;
  flex-direction: row;
`;

export const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  margin-right: 1rem;
`;

export const CardImageBox = styled.div`
  position: relative;
  width: 23rem;
  height: 12.5rem;
  border-radius: 1.75rem 1.75rem 0 0;
  border: 1px solid #aed2da;
  box-sizing: border-box;
  cursor: pointer;
`;

export const CardImage = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  object-fit: cover;
  border-radius: 1.75rem 1.75rem 0 0;
`;

export const CardTextBox = styled.div`
  width: 23rem;
  height: 9rem;
  border-radius: 0 0 1.75rem 1.75rem;
  border: 1px solid #aed2da;
  margin-top: -1px;
  background-color: ${(props) => props.theme.colors.sub1};
  padding: 1rem 2rem;
  box-sizing: border-box;
  position: relative;
`;

export const Title = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  cursor: pointer;
`;

export const SubTitle = styled.h4`
  font-size: 0.875rem;
  font-weight: 400;
  margin-top: 0.8rem;
  line-height: 1.3rem;
`;

export const BookmarkIcon = styled.img`
  width: 1.5rem;
  position: absolute;
  right: 2rem;
  cursor: pointer;
`;

export const InActiveBookmarkIcon = styled.img`
  width: 1.5rem;
  position: absolute;
  right: 2rem;
`;
