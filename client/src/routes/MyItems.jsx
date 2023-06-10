import React from 'react'
import Navbar from '../components/Navbar'
import MyItemList from '../components/myItemList';

export default function MyItems({setAuth}) {
    const handleSignUpSuccess = () => {
        setAuth(true);
      };
  return (
    <div>
        <Navbar handleSignUpSuccess={handleSignUpSuccess}/>
        <div>MyItems</div>
        <MyItemList/>
    </div>
  )
}
