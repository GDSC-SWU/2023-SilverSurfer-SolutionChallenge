import React from "react";
import styled from "styled-components";

function Form() {
  return (
    <div>
      <Wrapper>
        <InputBox placeholder="이름*" />
        <InputBox placeholder="메일*" />
      </Wrapper>
      <InputTextBox placeholder="내용*" />
    </div>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InputBox = styled.input`
  width: 35.75rem;
  height: 3.375rem;
  font-size: 1rem;
  color: ${(props) => props.theme.colors.text_gray2};
  margin-right: 1.25rem;
  box-sizing: border-box;
  padding: 1rem 1.5rem;
  border: 1px solid #878787;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  margin-top: 3.375rem;
`;

const InputTextBox = styled.textarea`
  width: 72.7rem;
  height: 14.375rem;
  padding: 1rem 1.5rem;
  border: 1px solid #878787;
  border-radius: 0.5rem;
  box-sizing: border-box;
  font-size: 1rem;
`;

export default Form;
