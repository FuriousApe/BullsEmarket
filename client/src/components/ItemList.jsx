import React,{useEffect, useContext, useState} from 'react'
import ItemFetch from '../apis/ItemFetch';
import ImageFetch from '../apis/ImageFetch';
import { ItemListContext } from '../context/ItemListContext';
import { Link } from 'react-router-dom';

export default function ItemList(props) {
  const {items, setItems} = useContext(ItemListContext);

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
      try{
        const response = await ItemFetch.get("/",{
          headers: {token: localStorage.token}
        });
        const updatedItems = await Promise.all(response.data.data.items.map(async(item) => {
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
        `}
      </style>
    </div>


  );
};
