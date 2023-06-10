import React, { useState, useEffect } from "react";
import {BrowserRouter as Router, Route, Routes, redirect, Navigate} from "react-router-dom";
import Home from "./routes/Home";
import Post from "./routes/Post";
import Sell from "./routes/Sell";
import Wishlist from "./routes/Wishlist";
import { ItemListContextProvider } from "./context/ItemListContext";
import Item from "./routes/Item";
import Login from "./routes/Login";
import SignUP from "./routes/SignUP";
import UserAuthentication from "./apis/UserAuthentication";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from 'react-toastify';
import Search from "./routes/Search";
import Update from "./routes/Update";
import MyItems from "./routes/MyItems";


const App = () =>{

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const setAuth = boolean => {
        setIsAuthenticated(boolean);
    };

    async function isAuth(){
        try{
            const response = await UserAuthentication.get('/verify',{
                headers: {token: localStorage.token}
            });
        console.log(response.data);
        response.data===true ? setIsAuthenticated(true): setIsAuthenticated(false);

        }catch(err){
            console.error(err.message);

        }
    }

    useEffect(()=>{
        isAuth();
    },[isAuthenticated])

    return(
    <div>
        <ToastContainer/>
        <ItemListContextProvider>
            <Router>
                    <Routes>
                        <Route exact path = "/" Component={props => isAuthenticated ? (<Home {...props} setAuth={setAuth}/>):(<Navigate to="/login"/>)}/>
                        <Route exact path = "/items/post" Component={props => isAuthenticated ? (<Post {...props} setAuth={setAuth}/>):(<Navigate to="/login"/>)}/>
                        <Route exact path = "/items/sell" Component={props => (<Sell {...props} setAuth={setAuth}/>)}/>
                        <Route exact path = "/wishlist" Component={props => isAuthenticated ? (<Wishlist {...props} setAuth={setAuth}/>):(<Navigate to="/login"/>)}/>
                        <Route exact path = "/items/:itemid/" Component={props => isAuthenticated ? (<Item {...props} setAuth={setAuth}/>):(<Navigate to="/login"/>)}/>
                        <Route exact path = "/login" Component={props => !isAuthenticated ? (<Login {...props} setAuth={setAuth}/>):(<Navigate to="/"/>)}/>
                        <Route exact path = "/signup" Component={props => !isAuthenticated ? (<SignUP {...props} setAuth={setAuth}/>):(<Navigate to="/"/>)}/>
                        <Route exact path = "/items/search/:search" Component={props => (<Search {...props} setAuth={setAuth}/>)}/>
                        <Route exact path = "/:itemid/update" Component={props => (<Update {...props} setAuth={setAuth}/>)}/>
                        <Route exact path = "/myitems" Component={props => isAuthenticated ? (<MyItems {...props} setAuth={setAuth}/>):(<Navigate to="/login"/>)}/>
                    </Routes>
            </Router>
        </ItemListContextProvider>
    </div>
    );
};
export default App;