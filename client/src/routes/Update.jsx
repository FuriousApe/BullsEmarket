import React from 'react'
import Navbar from '../components/Navbar'
import UpdateForm from '../components/UpdateForm';

export default function Update({setAuth}) {
    const handleSignUpSuccess = () => {
        setAuth(true);
      };
  return (
    <div>
        <Navbar handleSignUpSuccess={handleSignUpSuccess}/>
        <UpdateForm/>
    </div>
  )
}
