import React, { useState, useEffect } from "react";
import axiosInstance from "../../axios";
import { useHistory } from "react-router-dom";
import "./Login.css";
import Logo from "../Logo";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
} from 'react-router-dom';

export default function SignIn() {
  const history = useHistory();
  const initialFormData = Object.freeze({
    email: "",
    password: "",
  });

  const [formData, updateFormData] = useState(initialFormData);

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const response = await axiosInstance
        .post("token/", {
          email: formData.email,
          password: formData.password,
        })
        .then((result) => {
          axiosInstance.defaults.headers["Authorization"] =
            "JWT " + result.data.access;
          localStorage.setItem("access_token", result.data.access);
          localStorage.setItem("refresh_token", result.data.refresh);
          localStorage.setItem("email", formData.email);
          if (formData.email === "dlb.admin@dlb.com") {
            history.push({
              pathname: "/managerdashboard",
            });
          } else {
            history.push({
              pathname: "/userdashboard",
            });
          }
          console.log(
            "Header BEFORE: " + axiosInstance.defaults.headers["Authorization"]
          );
        })
        .catch((error) => {
          throw error;
        });
      return response;
    } catch (err) {
      throw err;
    }
  };
  
  // if (localStorage.getItem('user_id') == null) {
  //   return (
  //     <Redirect to='/' />
  //   )
  // }

  return (
    <div className="Login">
      <div className="form1">
        <Logo color="rgb(255,255,255)" text="Deep Learning Bank"></Logo>
        <input
          className="form-control"
          name="email"
          id="email"
          label="Email Address"
          placeholder="Email Address"
          onChange={handleChange}
        />
        <input
          className="form-control"
          name="password"
          label="Password"
          type="password"
          id="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <button className="btn" type="submit" onClick={handleSubmit}>
          Login
        </button>
      </div>
      <div className="footer">
        Don't have an account? <Link to="/register">Register</Link>
      </div>
      <div className="footer">
        Forgot your password? <Link to="/recovery">Recover Password</Link>
      </div>
      <div className="footer">
        <Link to="/main">Back to home page</Link>
      </div>
    </div>
  );
}
