import styled from "styled-components";
import axios from "axios";
import { useForm } from "react-hook-form";

function FeedBackForm() {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data, e) => {
    const { name, email, content } = data;
    try {
      await axios.post(
        "https://server-1-dot-silver-surfer-376919.du.r.appspot.com/contribute",
        {
          name: name,
          email: email,
          content: content,
        }
      );

      e.target.reset();
      alert("소중한 의견 감사합니다.");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormWrapper>
        <Wrapper>
          <InputBox placeholder="이름*" {...register("name")} />
          <InputBox placeholder="메일*" {...register("email")} />
        </Wrapper>
        <InputTextBox placeholder="내용*" {...register("content")} />

        <PostFormButton type="submit" onClick={reset}>
          보내기
        </PostFormButton>
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
  background-color: #daf5fb;
  border: none;
  border-radius: 0.5rem;
  font-size: 1.5rem;
  color: #a7a7a7;
  margin-top: 1rem;
  margin-bottom: 14rem;
  cursor: pointer;
  &:hover {
    background-color: skyblue;
    color: #ffffff;
  }
`;

const InputBox = styled.input`
  width: 35.75rem;
  height: 3.375rem;
  font-size: 1rem;
  color: #000000;
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
