require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const db = require("./db");
const app = express();
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwtGenerator = require("./utils/jwtGenerator");
const validInfo = require("./middleware/validInfo");
const authorization = require("./middleware/authorization");

//Middleware to get the data in JSON object
app.use(cors());
app.use(express.json());


//GET all items
app.get("/api/v1/items",authorization,async (req,res)=>{
    const results = await db.query("select * from item");
    console.log(results);
    res.status(200).json({
        status:"success",
        data: {
            items:results.rows
        }
    });
});

//get image
app.get("/api/v1/image/:imageid",authorization, async (req,res)=>{
    const results = await db.query("select imagepath from images where imageid=$1",[req.params.imageid]);
    res.status(200).json({
        status:"success",
        data: {
            items:results.rows
        }
    });
})

//get user
app.get("/api/v1/user/:userid",authorization, async (req,res)=>{
    const results = await db.query("select * from userprofile where userid=$1",[req.params.userid]);
    res.status(200).json({
        status:"success",
        data: {
            user:results.rows
        }
    });
})


//GET an item gived itemid
app.get("/api/v1/items/:itemid",authorization, async (req,res)=>{
    const results = await db.query("select * from item where itemid=$1",[req.params.itemid]);
    //console.log(req.params);
    res.status(200).json({
        status:"success",
        data:{items:results.rows[0]}
    });
});


//GET an item gived itemid
app.get("/api/v1/items/:itemid",authorization, async (req,res)=>{
    const results = await db.query("select * from item where title=$1",[req.params.itemid]);
    //console.log(req.params);
    res.status(200).json({
        status:"success",
        data:{items:results.rows[0]}
    });
});

//Create an item
app.post("/api/v1/items", async (req,res)=>{
    console.log(req.body);
    const results = await db.query("INSERT INTO item (title, description, price, imageID, sellerID) values ($1,$2,$3,$4,$5) returning *",[req.body.title,req.body.description,req.body.price,req.body.imageID,req.body.sellerID]);
    res.status(201).json({
        status:"success",
        data:{item:results.rows[0]}
    })
})

//create an image
app.post("/api/v1/image", async (req,res)=>{
    console.log(req.body);
    const results = await db.query("INSERT INTO images (imagepath) values ($1) returning *",[req.body.image]);
    console.log(results);
    res.status(201).json({
        status:"success",
        data:{image:results.rows[0]}
    })
})

//Update item given itemid
app.put("/api/v1/items/:itemid", async (req,res)=>{
    console.log(req.params.itemid);
    const results = await db.query("UPDATE item SET title = $1, description=$2, price=$3 WHERE itemid=$4 returning *", [req.body.title,req.body.description,req.body.price, req.params.itemid]);
    res.status(200).json({
        status:"success",
        data:{item:results.rows[0]}
    });
});

//Delete item
app.delete("/api/v1/items/:itemid", (req,res)=>{
    const results = db.query("DELETE FROM item WHERE itemID=$1",[req.params.itemid]);
    res.status(204).json({
        status:"success",
        data:{item:"delted"}
    });
});

//login page post/get
app.post("/api/v1/login",validInfo, async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
  
    try {
      const result = await db.query("SELECT * FROM userProfile WHERE email = $1",[req.body.email]);
      console.log(result.rowCount);
      if (result.rowCount === 1) {
        const validPassword = await bcrypt.compare(password, result.rows[0].password);
        if(!validPassword){
            res.status(401).json("Incorrect password");
            return;
        }

        const token = jwtGenerator(result.rows[0].userid);
        res.status(200).json({token});
      } else {
        // User doesn't exist, return error response
        res.status(401).send("Incorrect email or password");
      }
    } catch (error) {
      // Error occurred, return error response
      console.error(error);
      res.status(500).send("Internal server error");
    }
  });

app.post("/api/v1/register",validInfo, async(req,res)=>{
    const { fname, lname, email, password } = req.body;
    const existingUser = await db.query("SELECT * FROM userProfile WHERE email = $1",[req.body.email]);
    console.log(req);
    console.log(existingUser.rows);
    if (existingUser.rows.length > 0) {
        return res.status(400).send("User with this email already exists");
    }
    console.log("hi");

    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    console.log(hashedPassword);

    // Insert the new user into the database
    try {
        const newUser = await db.query(
        "INSERT INTO userProfile (fname, lname, email, password) VALUES ($1, $2, $3, $4) RETURNING *",
        [req.body.fname, req.body.lname, req.body.email, hashedPassword]
        );
        const token = jwtGenerator(newUser.rows[0].userid);
        res.status(201).json({token});



        //res.status(201).send("User created successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
    });

//sign up page post
app.post("api/v1/signup", async (req, res) => {
    const { fname, lname, email, password } = req.body;
    console.log(req.body);

    // Check if the email already exists in the database
    const existingUser = await db.query(
        "SELECT * FROM userProfile WHERE email = $1",
        [email]
    );
    console.log(req.body);
    if (existingUser.rows.length > 0) {
        return res.status(400).send("User with this email already exists");
    }

    // Hash the password
    //const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    try {
        await pool.query(
        "INSERT INTO userProfile (fname, lname, email, password) VALUES ($1, $2, $3, $4)",
        [fname, lname, email, password]
        );
        res.status(201).send("User created successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
    });

//search items
app.get("/api/v1/items/search/:search",authorization, async (req,res)=>{
    console.log(req.params.search);
    const searchq = req.params.search.replace(/%/g, ' ').toLowerCase();
    const results = await db.query("SELECT * FROM item WHERE LOWER(title) = $1", [searchq]);
    console.log(searchq);
    res.status(200).json({
        status:"success",
        data:{items:results.rows}
    });
});
//wishlist

app.get("/api/v1/user/:userid/wishlist",authorization, async(req,res)=>{
    console.log(req.params.userid);
    const results = await db.query("SELECT * FROM wishlist w, item i WHERE w.userid=$1 AND i.itemid = w.itemid",[req.params.userid]);
    res.status(200).json({
        status:"success",
        data:{wishlist:results.rows}
    })

});

//Add to wishlist
app.post("/api/v1/usera/wishlist", async(req,res)=>{
    try{
        console.log(req.body.userid);
        console.log(req.body.itemid);
        await db.query("INSERT INTO wishlist(userid,itemid) VALUES($1,$2)",[req.body.userid, req.body.itemid]);
        res.status(200).send("Wishlist item added successfully");

    }catch(err){
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

//Delete from wishlist
app.post("/api/v1/usera/wishlist/:itemid", (req,res)=>{
    console.log("heeee");
    console.log(req.params.itemid);
    console.log(req.body);
    console.log("eeehaaa");
    const results = db.query("DELETE FROM wishlist WHERE userid=$2 AND itemID=$1",[req.params.itemid,req.body.userid]);
    res.status(204).json({
        status:"success",
        data:{item:"delted"}
    });
});

//get myitems
app.get("/api/v1/user/:userid/myitems",authorization, async(req,res)=>{
    console.log(req.params.userid);
    const results = await db.query("SELECT * FROM item i WHERE i.sellerid=$1",[req.params.userid]);
    res.status(200).json({
        status:"success",
        data:{myitems:results.rows}
    })

});

app.get("/api/v1/verify", authorization, async (req,res)=>{
    try{
        res.json(true);
    }catch(err){
        console.error(err);
        res.status(500).send("Server error");
    }
});
  

console.log("testing");
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`server is up and listening on ${port}`)
});
