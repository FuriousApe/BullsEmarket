import React, {useState} from 'react'
import ImageFetch from '../apis/ImageFetch';
import ItemFetch from '../apis/ItemFetch';

export default function SellForm() {
    const [image,setImage] = useState("");
    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    const [price, setPrice] = useState("");

    var base64Url = localStorage.getItem('token').split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    const userid = JSON.parse(jsonPayload).user;

    const addItem = async(event) =>{
        event.preventDefault();
        const imageresult = await ImageFetch.post("/",{
            "image":image
        })
        console.log(imageresult.data.data.image.imageid);
        console.log(title);
        console.log(description);
        console.log(price);

        const result = await ItemFetch.post("/",{
            "title": `${title}`,
            "description": `${description}`,
            "price": price,
            imageID: imageresult.data.data.image.imageid,
            sellerID: userid 
        })

    
    };

  return (
    <div>

    <div class="container mt-5">
        <h1 class="mb-4">Sell Item</h1>
        <form onSubmit={e => addItem(e)}>
            <div class="form-group">
                <label for="imageUrl">Image URL</label>
                <input type="text" value={image} onChange={(e)=> setImage(e.target.value)} class="form-control" id="imageUrl" placeholder="Enter image URL"/>
            </div>
            <div class="form-group">
                <label for="itemTitle">Item Title</label>
                <input type="text" value={title} onChange={(e)=> setTitle(e.target.value)} class="form-control" id="itemTitle" placeholder="Enter item title"/>
            </div>
            <div class="form-group">
                <label for="itemDescription">Item Description</label>
                <textarea value={description} onChange={(e)=> setDescription(e.target.value)} class="form-control" id="itemDescription" rows="3" placeholder="Enter item description"></textarea>
            </div>
            <div class="form-group">
                <label for="itemPrice">Item Price</label>
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text">$</span>
                    </div>
                    <input type="number" value={price} onChange={(e)=> setPrice(e.target.value)} class="form-control" id="itemPrice" placeholder="Enter item price"/>
                </div>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>

    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi4+nW" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.3/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>

</div>
  )
}
