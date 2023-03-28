import { useRef, useEffect, useState } from "react";
import styled from "styled-components";

const IndexBar = ({ title, index, indexElements }) => {
  const indexRef = useRef(null);
  const [isFixed, setIsFixed] = useState(false);
  const [current, setCurrent] = useState(0);

  const setBarPosition = () => {
    if (!indexRef.current) return;
    const scrollTop = window.scrollY;
    if (scrollTop > 438) {
      const temp = true;
      setIsFixed(temp);
    } else {
      const temp = false;
      setIsFixed(temp);
    }
  };

  const getCurrentPosition = () => {
    const halfOfWindow = window.innerHeight / 2 - 70;
    indexElements.map((item, idx) => {
      if (!item) return;
      const distance = item.offsetTop - window.scrollY;
      if (distance < halfOfWindow) {
        setCurrent(idx);
        return;
      }
    });
  };

  const onItemClick = (idx) => {
    indexElements[idx]?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setBarPosition();
      getCurrentPosition();
    });
    return () => {
      window.removeEventListener("scroll", () => {
        setBarPosition();
        getCurrentPosition();
      });
    };
  }, []);

  return (
    <IndexBarWrapper ref={indexRef} isFixed={isFixed}>
      <IndexTitle>지금 페이지</IndexTitle>
      <IndexCurrentTitle>{title}</IndexCurrentTitle>
      <IndexItemWrapper>
        {index.length !== 0 &&
          index.map((item, idx) => {
            return (
              <IndexItem
                key={idx}
                onClick={() => onItemClick(idx)}
                isCurrent={idx === current}
              >
                {item}
              </IndexItem>
            );
          })}
      </IndexItemWrapper>
    </IndexBarWrapper>
  );
};

const IndexBarWrapper = styled.div`
  position: ${(props) => (props.isFixed ? "fixed" : "absolute")};
  margin-top: 5.0625rem;
  display: flex;
  flex-direction: column;
  top: ${(props) => props.isFixed && 0};
  right: 2.75rem;
`;

const IndexTitle = styled.h5`
  font-weight: 500;
  font-size: 0.625rem;
  line-height: 100%;
  letter-spacing: -0.025em;
  color: #929292;
  margin-bottom: 0.625rem;
  margin-left: 0.875rem;
`;

const IndexCurrentTitle = styled.span`
  font-weight: 500;
  font-size: 2.125rem;
  line-height: 100%;
  letter-spacing: -0.025em;
  color: #020202;
  margin-bottom: 0.875rem;
  margin-left: 0.875rem;
`;

const IndexItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const IndexItem = styled.span`
  font-weight: 500;
  font-size: 1rem;
  line-height: 100%;
  letter-spacing: -0.025em;
  color: #353535;
  padding: 0.625rem 5.1875rem 0.625rem 0.875rem;
  border: ${(props) => props.isCurrent && "1px solid #878787"};
  border-radius: 17px;
  cursor: pointer;
`;

export default IndexBar;
