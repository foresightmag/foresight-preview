import '../css/Hero.css';
import React from 'react'
import logo from "../images/BLUE-FORESIGHT-LOGO.svg"


export default function Hero()
{
    return (
    <div className="hero-section">
        <img src={logo} className="hero-logo" alt="logo"/>
    </div>
    );   
}