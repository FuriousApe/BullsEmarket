import React from 'react'
import Navbar from '../components/Navbar';
import ItemList3 from '../components/ItemList3';

export const wishlist = ({setAuth}) => {
  const handleSignUpSuccess = () => {
    setAuth(true);
  };
  return (
    <div>
      <Navbar handleSignUpSuccess={handleSignUpSuccess}></Navbar>
      <ItemList3/>
    </div>
  )
}
export default wishlist;