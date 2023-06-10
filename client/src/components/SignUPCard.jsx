import React, { useState } from 'react'
import UserAuthentication from '../apis/UserAuthentication';
import { Link } from 'react-router-dom';

export default function SignUPCard({handleSignUpSuccess}) {
  const [email,setEmail] = useState("");
  const [fname,setFname] = useState("");
  const [lname,setLname] = useState("");
  const [password,setPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");

  const onSubmitForm = async(e)=>{
    e.preventDefault();

    try{
      const response = await UserAuthentication.post("/register",{
        fname:fname,
        lname: lname,
        email: email,
        password: password
      });

      localStorage.setItem("token",response.data.token);
      handleSignUpSuccess(true);

    }catch(err){
      console.error(err.message);

    }

  }
  return (
    <div>
      <head>
    <title>Signup Page</title>
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
              <h3>Signup</h3>
            </div>
            <div class="card-body">
              <form id="signup-form" onSubmit={onSubmitForm}>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="firstName">First Name:</label>
                    <input
                      type="text"
                      value={fname}
                      onChange={(e)=> setFname(e.target.value)}
                      class="form-control"
                      id="firstName"
                      placeholder="Enter first name"
                      required
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="lastName">Last Name:</label>
                    <input
                      type="text"
                      value={lname}
                      onChange={(e)=> setLname(e.target.value)}
                      class="form-control"
                      id="lastName"
                      placeholder="Enter last name"
                      required
                    />
                  </div>
                </div>
                <div class="form-group">
                  <label for="email">Email:</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                    class="form-control"
                    id="email"
                    placeholder="Enter email"
                    required
                  />
                  <div class="form-group">
                    <label for="password">Password:</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e)=> setPassword(e.target.value)}
                      class="form-control"
                      id="password"
                      placeholder="Enter password"
                      pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$"
                      required
                    />
                    <small id="passwordHelpBlock" class="form-text text-muted">
                      Password must contain at least 6 characters, one uppercase
                      letter, one lowercase letter, one number, and one special
                      character.
                    </small>
                  </div>
                </div>
                <div class="form-group">
                  <label for="confirmPassword">Confirm Password:</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e)=> setConfirmPassword(e.target.value)}
                    class="form-control"
                    id="confirmPassword"
                    placeholder="Confirm password"
                    required
                  />
                  <small
                    id="passwordMatchHelpBlock"
                    class="form-text text-muted"
                  >
                    Passwords do not match.
                  </small>
                </div>
                <div class="form-group">
                  <label for="phoneNumber">Phone Number:</label>
                  <input
                    type="tel"
                    class="form-control"
                    id="phoneNumber"
                    placeholder="Enter phone number"
                    pattern="[0-9]{10}"
                    title="Enter a 10-digit phone number"
                    required
                  />
                </div>
                <button type="submit" class="btn btn-primary btn-block">
                  Sign Up
                </button>
                <Link
                  to="/login"
                  class="btn btn-outline-primary btn-block mt-2"
                  >Back to Login</Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </body>
    </div>
  )
};
