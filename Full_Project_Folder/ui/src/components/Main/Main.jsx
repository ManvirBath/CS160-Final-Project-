import React from "react";
import "./Main.css";
import BackgroundImg from "./dlb.svg";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  Link
} from 'react-router-dom';
class Main extends React.Component {
  


  render() {
    const color = this.props.color || "rgb(70, 88, 190)";
    
    if (localStorage.getItem('email') != null) {
      return (
        <Redirect to='/userdashboard' />
      )
    }
    
    return (
      
      <div className="MainPage">
        <div className="introDiv">
          <h1 className="introHeader">Deep Learning Bank</h1>
          <h6 className="introFooter">
            The First Online-Only Bank in the Silicon Valley
          </h6>
        </div>
        <div className="Logo">
          <svg
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 469.333 469.333"
            style={{ fill: color, height: "500px" }}
          >
            <path
              d="M458.667,192c5.896,0,10.667-4.742,10.667-10.637v-42.662c0-3.76-1.979-7.249-5.219-9.166L255.177,5.454
            c-12.969-7.187-27.594-7.406-41.313,0.146L5.219,129.535C1.979,131.451,0,134.941,0,138.701v42.662
            C0,187.258,4.771,192,10.667,192h32v192.009C19.135,384.009,0,403.142,0,426.671v31.997c0,5.895,4.771,10.666,10.667,10.666h448
            c5.896,0,10.667-4.77,10.667-10.666v-31.997c0-23.529-19.135-42.662-42.667-42.662V192H458.667z M192,384h-64V192h64V384z
             M234.646,149.387c-23.542,0-42.688-19.144-42.688-42.683s19.146-42.683,42.688-42.683c23.542,0,42.687,19.144,42.687,42.683
            S258.187,149.387,234.646,149.387z M341.333,384h-64V192h64V384z"
            ></path>
          </svg>
        </div>
        <div className="buttons">
          <Link to="/login">
            <button className="btn" class="btn btn-light" type="button">
              Login
            </button>
          </Link>
          <Link to="/register">
            <button className="btn" class="btn btn-light" type="button">
              Register
            </button>
          </Link>
          <Link to="/GMap">
            <button className="btn" class="btn btn-light" type="button">
              ATM Finder
            </button>
          </Link>
          <Link to="/contact">
            <button className="btn" class="btn btn-light" type="button">
              Contact Us
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Main;
