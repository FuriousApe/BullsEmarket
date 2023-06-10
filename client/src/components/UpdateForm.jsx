import React, { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom';
import ImageFetch from '../apis/ImageFetch';
import UserFetch from '../apis/UserFetch';
import ItemFetch from '../apis/ItemFetch';

export default function UpdateForm() {
    const { itemid } = useParams();
    const [items, setItems] = useState(null);
    const [user, setUser] = useState(null);

    console.log(itemid);

    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    const [price, setPrice] = useState("");

    const updateItem = async(event) =>{
        event.preventDefault();

        setTitle(event.target.itemTitle.value);
        setDescription(event.target.itemDescription.value);
        setPrice(event.target.itemPrice.value);

        console.log(title);
        console.log(description);
        console.log(price);

        const result = await ItemFetch.put(`/${itemid}`,{
            "title": `${title}`,
            "description": `${description}`,
            "price": price
        })

    
    };

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
            console.log(items);
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
    <div>

    <div class="container mt-5">
        <h1 class="mb-4">Update Item</h1>
        <form onSubmit={e => updateItem(e)}>
            <div class="form-group">
                <label for="itemTitle">Item Title</label>
                <input type="text" class="form-control" onChange={(e)=> setTitle(e.target.value)} id="itemTitle" defaultValue={items.title}/>
            </div>
            <div class="form-group">
                <label for="itemDescription">Item Description</label>
                <textarea  class="form-control" onChange={(e)=> setDescription(e.target.value)} id="itemDescription" rows="3" defaultValue={items.description}></textarea>
            </div>
            <div class="form-group">
                <label for="itemPrice">Item Price</label>
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text">$</span>
                    </div>
                    <input type="number" onChange={(e)=> setPrice(e.target.value)} class="form-control" id="itemPrice" defaultValue={items.price}/>
                </div>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
            <div class="d-grid gap-2 d-md-block mb-4">
          <button class="btn btn-danger" >Delete</button>
        </div>
        </form>
    </div>

    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi4+nW" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.3/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>

</div>
  )
}
