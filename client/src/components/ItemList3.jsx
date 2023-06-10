import React,{useEffect, useContext, useState} from 'react'
import { useParams } from 'react-router-dom';
import ItemFetch from '../apis/ItemFetch';
import ImageFetch from '../apis/ImageFetch';
import UserFetch from '../apis/UserFetch';
import { ItemListContext } from '../context/ItemListContext';
import { Link } from 'react-router-dom';
import UserAuthentication from '../apis/UserAuthentication';

export default function ItemList3(props) {
    const { search } = useParams();
  const {items, setItems} = useContext(ItemListContext);

  const remove = async(itemid)=>{
    try{
      var base64Url = localStorage.getItem('token').split('.')[1];
      var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      console.log(itemid);
      console.log('hehehe2.0');
      const userid = await JSON.parse(jsonPayload).user;
      console.log(userid);
      await UserAuthentication.post(`/usera/wishlist/${itemid}`,{
        "userid":userid
      });
      console.log("hehe3.0");

      const updatedItems = items.filter(item => item.itemid !== itemid);
      setItems(updatedItems);

    }catch(err){
      console.log(err);
    }
  }

  const handleImage = async(imageid)=>{
    try{
      const response = await ImageFetch.get(`/${imageid}`,{
        headers: {token: localStorage.token}
      });
      return(response.data.data.items[0].imagepath);

    }catch(err){
      console.log(err);
    }

  }
  useEffect(() => {
    const fetchData = async () =>{
        var base64Url = localStorage.getItem('token').split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    const userid = JSON.parse(jsonPayload).user;
      try{
        console.log("whats up fella");
        const response = await UserFetch.get(`/${userid}/wishlist`,{
          headers: {token: localStorage.token}
        });
        console.log(response.data.data);
        const updatedItems = await Promise.all(response.data.data.wishlist.map(async(item) => {
          const newImageId = await handleImage(item.imageid);
          return {...item, imageid: newImageId};
        }));
      
        setItems(updatedItems);
      }catch(err){
        console.log(err);
      }
    };
    fetchData();

  },[]);
  
  return (
    <div className="container my-4">
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {items && items.map((item) => (
          <div className="col" key={item.itemid}>
            <Link to={`/items/${item.itemid}/`} className="text-decoration-none">
              <div className="card h-100 shadow-sm">
                <div className="card-img-top position-relative">
                  <img src={item.imageid} alt="" className="w-100" style={{ height: '200px', objectFit: 'cover' }} />
                  <div className="overlay position-absolute top-0 start-0 w-100 h-100">
                    <div className="d-flex justify-content-center align-items-center h-100">
                      <span className="text-light">{item.title}</span>
                    </div>
                  </div>
                </div>
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text">{item.price}</p>
                  </div>
                  <div>
                    <p className="card-text text-muted mb-0">{item.is_sold ? 'SOLD' : 'AVAILABLE'}</p>
                  </div>
                </div>
              </div>
            </Link>
            <button onClick={e => remove(item.itemid)}className="remove">Remove</button>
          </div>
        ))}
      </div>
      <style>
        {`
          .card-img-top {
            height: 200px;
            overflow: hidden;
          }
          .overlay {
            background-color: rgba(0, 0, 0, 0.5);
            opacity: 0;
            transition: opacity 0.3s;
          }
          .card:hover .overlay {
            opacity: 1;
          }
          button.remove {
            background-color: #f44336;
            color: white;
            border: none;
            padding: 8px 12px;
            font-size: 16px;
            font-weight: 600;
            border-radius: 5px;
            transition: all 0.2s;
            margin-top: 8px;
          }
          
          button.remove:hover {
            background-color: #d32f2f;
            cursor: pointer;
          }
        `}
      </style>
    </div>


  );
};
