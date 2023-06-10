import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ItemFetch from '../apis/ItemFetch';
import UserAuthentication from '../apis/UserAuthentication';
import ImageFetch from '../apis/ImageFetch';
import UserFetch from '../apis/UserFetch';

export default function EachItem({handleSignUpSuccess}) {
  const { itemid } = useParams();
  const [items, setItems] = useState(null);
  const [user, setUser] = useState(null);

  var base64Url = localStorage.getItem('token').split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  const userid = JSON.parse(jsonPayload).user;

  const edit = async () =>{
    window.location.href = `http://localhost:3000/${itemid}/update`;
  }


  const parseJwt = async () => {
    var base64Url = localStorage.getItem('token').split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    const userid = JSON.parse(jsonPayload).user;
    console.log(userid);
    console.log(itemid);
    const reponse = await UserAuthentication.post("/usera/wishlist",{
      "userid":userid,
      "itemid":itemid
    })
  
  }

  const handleImage = async (imageid) => {
    try {
      const response = await ImageFetch.get(`/${imageid}`,{
        headers: {token: localStorage.token}
      });
      return response.data.data.items[0].imagepath;
    } catch (err) {
      console.log(err);
    }
  };

  const handleUser = async (userid) => {
    try{
      const response = await UserFetch.get(`/${userid}`,{
        headers: {token: localStorage.token}
      });
      return response.data.data.user[0];
    }catch(err){
      console.log(err);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ItemFetch.get(`/${itemid}`,{
          headers: {token: localStorage.token}
        });
        const imageid = await handleImage(response.data.data.items.imageid);
        const sellerinfo = await handleUser(response.data.data.items.sellerid);
        console.log(sellerinfo);
        const updatedItems = { ...response.data.data.items, imageid };
        setItems(updatedItems);
        setUser(sellerinfo);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [itemid]);

  if (!items) {
    return <div>Loading...</div>;
  }

  if(!user){
    return <div>Loading...</div>;
  }

  return (
    <section class="py-5">
  <div class="container">
    <div class="row">
      <div class="col-md-6">
        <img src={items.imageid} alt="Item Image" class="img-fluid" />
      </div>
      <div class="col-md-6">
        <h1 class="display-4">{items.title}</h1>
        <h4 class="mb-4">{items.is_sold ? "SOLD" : "AVAILABLE"}</h4>
        <h2 class="fw-bold mb-4">{items.price}</h2>
        <p class="lead mb-4">{items.description}</p>
        <p class="mb-0">Contact seller:</p>
        <p class="mb-4">{user.email}</p>
        <div class="d-grid gap-2 d-md-block mb-4">
          <button onClick={e => parseJwt()} class="btn btn-primary">Add to Wishlist</button>
        </div>
        {userid === items.sellerid &&
        <div class="d-grid gap-2 d-md-block mb-4">
          <button class="btn btn-danger" onClick={() => edit()}>Edit Item</button>
        </div>
        }
      </div>
    </div>
  </div>
</section>

  );
}
