import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import UserAuthentication from '../apis/UserAuthentication';
import { toast } from 'react-toastify';

export const LoginCard = ({handleSignUpSuccess}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await UserAuthentication.post("/login",{
            email:email,
            password:password
        })
        console.log(response.status);

        if (response.status === 200) {
            localStorage.setItem("token",response.data.token);
            handleSignUpSuccess(true);
            toast.success("Login Successful!");
            //return response;
        } else if (response.status === 401) {
            console.log("Incorrect Email or Password");
            toast.error(response.data);
            throw new Error("Incorrect email or password");
            toast.error(response.status);
        } else {
            console.log("Server Error");
            throw new Error("Server error");
        }
    /*
        try{
            const response = await UserAuthentication.post("/login",{
                email:email,
                password:password
            })
            console.log(response.response.status);
    
            if (response.ok) {
                return response.json();
            } else if (response.status === 401) {
                throw new Error("Incorrect email or password");
            } else {
                throw new Error("Server error");
            }
        }catch(err){
            console.log(err);
    
        }*/
/*
    useEffect(() => {
    const form = document.querySelector("form");
    form.addEventListener("submit", handleSubmit);

    return () => {
        form.removeEventListener("submit", handleSubmit);
    };
    }, []);

    const handleSubmit = async (event) => {
    event.preventDefault();

    try{
        const response = await UserAuthentication.post("/login",{
            email:email,
            password:password
        })
        console.log(response);

        if (response.ok) {
            return response.json();
        } else if (response.status === 401) {
            throw new Error("Incorrect email or password");
        } else {
            throw new Error("Server error");
        }
    }catch(err){
        console.log(err);

    }*/
    /*

    // make fetch request to login route
    fetch("/api/v1/login", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "same-origin",
    })
        .then((response) => {
        if (response.ok) {
            return response.json();
        } else if (response.status === 401) {
            throw new Error("Incorrect email or password");
        } else {
            throw new Error("Server error");
        }
        })
        .then((data) => {
        console.log(data);
        // do something with data
        })
        .catch((error) => {
        console.error(error);
        });

    setEmail("");
    setPassword("");*/
  };
  return(
    <div>
        <head>
    <title>Login Page</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link
      rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
    />
    
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <h3>Login</h3>
            </div>
            <div class="card-body">
              <form>
                <div class="form-group">
                  <label for="email">Email:</label>
                  <input
                    value = {email}
                    onChange={(e)=> setEmail(e.target.value)}
                    type="email"
                    class="form-control"
                    id="email"
                    placeholder="Enter email"
                  />
                </div>
                <div class="form-group">
                  <label for="password">Password:</label>
                  <input
                    value = {password}
                    onChange={(e)=> setPassword(e.target.value)}
                    type="password"
                    class="form-control"
                    id="password"
                    placeholder="Enter password"
                  />
                </div>
                <button onClick={handleSubmit} type="submit" class="btn btn-primary btn-block">
                  Login
                </button>
                <Link
                  to="/signup"
                  class="btn btn-outline-primary btn-block mt-2"
                  >Sign Up</Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </body>
    </div>);
}
