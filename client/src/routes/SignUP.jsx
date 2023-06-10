import React from 'react'
import SignUPCard from '../components/SignUPCard'

export default function SignUP({setAuth}) {
  const handleSignUpSuccess = () => {
    setAuth(true);
  };
  return (
    <SignUPCard handleSignUpSuccess={handleSignUpSuccess}/>
  )
}
