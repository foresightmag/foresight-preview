import '../css/About.css';
import React from 'react';
import placeholderimage from "../images/placeholder.jpeg"
import aboutmag from "../images/aboutmag.svg"
import releaseday from "../images/releaseday.png"

export default function About()
{
    return (
      <div className="about">
        <table>
          <tr>
            <th><img className="about-title" src={aboutmag} width="300vw"/></th>
          </tr>
          <tr>
            <td className='about-text'>
            <img className="about-image" src={releaseday} width=""/> <br/>
            <p className='about-content'>Each issue will feature a student and experienced professional from diverse backgrounds and career paths. Since your career is a huge part of your life, you should be in a  industry you actually enjoy.
Foresight indents to strengthen your understanding of your career and equip a generation passionate and willing to inspire change.</p>
            </td>
          </tr>
        </table>
      </div>

       );
}