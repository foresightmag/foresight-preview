import '../css/Nav.css';
import React from 'react';
import logo from "../images/BLUE-FORESIGHT-LOGO.svg";
import instaicon from "../images/instagram.svg"
import facebookicon from "../images/facebook.svg"

export default function Nav()
{
    return (
        <div className="Nav" href='/'>
          <div className="nav-container">
            <nav className="nav">
              <img className="nav-logo" src={logo}/>
              <a href="/">+1 (480) 878-9827</a>
              <a href="/">foresightzine@outlook.com</a>
              <div className="social-links">
                <a href="/"><img className="social-icon" src={instaicon} alt="instagram-icon"/>        </a>
                <a href="/"><img className="social-icon" src={facebookicon} alt="facebook-icon"/></a>
              </div>
            </nav>
          </div>
        </div>
       );
}