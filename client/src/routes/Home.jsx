import React, { useEffect} from 'react'
import Navbar from '../components/Navbar';
import ItemList from '../components/ItemList';

export const Home = ({setAuth}) => {
  const handleSignUpSuccess = () => {
    setAuth(true);
  };

  return (
    <div>
      <Navbar handleSignUpSuccess={handleSignUpSuccess}></Navbar>
      <ItemList></ItemList>
    </div>
  );
};

export default Home;