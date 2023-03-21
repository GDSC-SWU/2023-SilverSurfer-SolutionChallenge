import React from "react";
import styled from "styled-components";

function Search() {
  return (
    <div>
      <Wrapper>
        <ModalBackground>
          <ModalWrapper>
            <InputText placeholder="검색어를 입력해주세요" />
            <Title>최근 검색어</Title>
            <ItemWrapper>
              <Item>버튼</Item>
              <Item>레이아웃</Item>
            </ItemWrapper>
          </ModalWrapper>
        </ModalBackground>
      </Wrapper>
    </div>
  );
}

const Wrapper = styled.div`
  // display: none;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.6);
`;

const ModalBackground = styled.div`
  width: 100%;
  height: 24rem;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
  width: 40rem;
  padding: 1rem;
`;

const InputText = styled.input`
  width: 100%;
`;

const Title = styled.h4`
  font-size: 1.25rem;
  font-weight: 400;
`;

const ItemWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
`;
const Item = styled.div`
  font-size: 1rem;
  padding: 0.5rem;
  border: 1px solid #000;
  border-radius: 0.25rem;
  margin-right: 0.75rem;
`;

export default Search;
