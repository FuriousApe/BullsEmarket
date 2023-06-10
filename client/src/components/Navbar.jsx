import React, { useEffect, useState } from 'react'
import { Link, Navigate} from 'react-router-dom';

export default function Navbar({handleSignUpSuccess}) {
  const [search,setSearch] = useState("");
  const [redirect, setRedirect] = useState(false);
  let replacedsearch;

  const searchbar = async(search) =>{
    replacedsearch = search.replace(/ /g,"%20");
    console.log(replacedsearch);
    window.location.href = `http://localhost:3000/items/search/${replacedsearch}`;
    setRedirect(true);

  }
  console.log(replacedsearch);

  function parseJwt () {
    var base64Url = localStorage.getItem('token').split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    console.log(JSON.parse(jsonPayload).user);
}

  const logout = async e => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      handleSignUpSuccess(false);
      //toast.success("Logout successfully");
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <div>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css" integrity="sha384-zCbKRCUGaJDkqS1kPbPd7TveP5iyJE0EjAuZQTgFLD2ylzuqKfdKlfG/eSrtxUkn" crossorigin="anonymous"></link>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand" to="/">BULLS MARKET</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
      
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto ml-3">
            <li className="nav-item active">
              <Link className="nav-link" to="/items/sell">SELL <span className="sr-only">(current)</span></Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to="/wishlist">WISHLIST <span className="sr-only">(current)</span></Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to="/myitems">MyItems <span className="sr-only">(current)</span></Link>
            </li>
            <li className="nav-item active">
              <button onClick={e => logout(e)} className="btn btn-outline-success my-2 my-sm-0" type="submit">Logout</button>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0" onSubmit={e => { e.preventDefault();}}>
            <input value = {search} onChange={(e)=> setSearch(e.target.value)}className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
            <button onClick={e => searchbar(search)} className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>
        </div>
      </nav>
    </div>
  );

};
