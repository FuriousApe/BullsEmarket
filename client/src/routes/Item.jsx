import React from 'react'
import { useParams } from 'react-router-dom'
import EachItem from '../components/EachItem';
import Navbar from '../components/Navbar';

export default function Item({setAuth}) {
    const handleSignUpSuccess = () => {
        setAuth(true);
      };
    return (
        <div>
            <Navbar handleSignUpSuccess={handleSignUpSuccess}/>
            <EachItem/>
        </div>
    )
}
