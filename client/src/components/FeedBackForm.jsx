import styled from "styled-components";
import axios from "axios";
import { useForm } from "react-hook-form";

function FeedBackForm() {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const response = await axios.post(
      "https://server-1-dot-silver-surfer-376919.du.r.appspot.com/contribute",
      data
    );

    console.log(response);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormWrapper>
        <Wrapper>
          <InputBox placeholder="이름*" {...register("name")} />
          <InputBox placeholder="메일*" {...register("email")} />
        </Wrapper>
        <InputTextBox placeholder="내용*" {...register("content")} />

        <PostFormButton type="submit">보내기</PostFormButton>
      </FormWrapper>
    </form>
  );
}

export default FeedBackForm;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const FormWrapper = styled(Wrapper)`
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
`;

const PostFormButton = styled.button`
  width: 72.7rem;
  height: 4rem;
  background-color: #d0d0d0;
  border: none;
  border-radius: 0.5rem;
  font-size: 1.5rem;
  color: #fff;
  margin-top: 1rem;
  margin-bottom: 14rem;
`;

const InputBox = styled.input`
  width: 35.75rem;
  height: 3.375rem;
  font-size: 1rem;
  color: ${(props) => props.theme.colors.text_gray2};
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
