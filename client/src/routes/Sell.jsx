import React from 'react'
import Navbar from '../components/Navbar';
import SellForm from '../components/SellForm';

export const Sell = ({setAuth}) => {
  const handleSignUpSuccess = () => {
    setAuth(true);
  };
return (
<div>
    <Navbar handleSignUpSuccess={handleSignUpSuccess}/>
    <SellForm/>
</div>
)
}
export default Sell;