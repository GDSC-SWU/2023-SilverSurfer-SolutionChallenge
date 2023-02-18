import React from 'react'
import { GoogleLogin } from '@react-oauth/google'
import jwt_decode from 'jwt-decode'

export const GoogleLoginButton = () => {
  return (
    <div>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse.credential)
          const decodeding = jwt_decode(credentialResponse.credential)
          console.log(decodeding)
        }}
        onError={() => {
          console.log('Login Failed')
        }}
      />
    </div>
  )
}
