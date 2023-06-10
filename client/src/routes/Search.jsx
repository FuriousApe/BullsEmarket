import React, { useEffect} from 'react'
import Navbar from '../components/Navbar';
import ItemList2 from '../components/ItemList2';


export const Search = ({setAuth}) => {
  const handleSignUpSuccess = () => {
    setAuth(true);
  };

  return (
    <div>
      <Navbar handleSignUpSuccess={handleSignUpSuccess}></Navbar>
      <ItemList2/>
    </div>
  );
};

export default Search;