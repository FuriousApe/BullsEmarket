import React from 'react'
import { LoginCard } from '../components/LoginCard'

export default function Login({setAuth}) {
  const handleSignUpSuccess = () => {
    setAuth(true);
  };
  return (
    <div>
        <LoginCard handleSignUpSuccess={handleSignUpSuccess}/>
    </div>
  )
}
