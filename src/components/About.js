import '../css/About.css';
import React from 'react';
import placeholderimage from "../images/placeholder.jpeg"
import aboutmag from "../images/aboutmag.svg"
import releaseday from "../images/releaseday.png"
import cloud from "../images/cloud-bg.svg"

export default function About()
{
    return (
      <div className="about">
        <img className="cloud-about" src={cloud}/>
      </div>

       );
}