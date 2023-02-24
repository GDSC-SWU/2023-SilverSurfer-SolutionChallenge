import React from 'react'
import { useGoogleLogin } from '@react-oauth/google'
import styled from 'styled-components'
import googleIcon from '../assets/googleIcon.svg'

export const GoogleLoginButton = () => {
  const googleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => console.log(tokenResponse),
    flow: 'implicit',
  })

  const handleGoogleLogin = () => {
    googleLogin()
  }

  return (
    <>
      <CustomButton onClick={handleGoogleLogin}>
        <ButtonWrapper>
          <ButtonImage src={googleIcon} />
          <ButtonText>Google계정으로 로그인</ButtonText>
        </ButtonWrapper>
      </CustomButton>
    </>
  )
}

const CustomButton = styled.div``

const ButtonWrapper = styled.div`
  // 크기
  width: 428px;
  height: 75px;
  // 폰트
  /* font-family: 'Noto Sans KR'; */
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  // 스타일
  border: 1px solid #d6d6d6;
  border-radius: 5px;
  // 위치
  display: flex;
  justify-content: center;
  align-items: center;
`
const ButtonImage = styled.img`
  // 크기
  width: 32px;
  height: 32px;
  // 위치
  margin-right: 32px;
`

const ButtonText = styled.h3`
  color: #353535;
`
