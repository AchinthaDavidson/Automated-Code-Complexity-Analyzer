import React, { useEffect, useState } from "react";
import "../CSS/Footer.css"
import logo from "../assect/MicrosoftTeams-image (1).png"
import { FaFacebook,FaYoutube,FaLinkedin,FaInstagram} from 'react-icons/fa';
import { Link } from "react-router-dom";


function footer(){
return(
    <footer className="footer">
        <hr />
        <br />
        <div className="footer-l">
        <img src={logo} />

            <p className="footer-links">
            <Link to="/">Home</Link>
           
               
                <a href="/about">About</a>
              
                <Link to="/contact">Contact Us</Link>
                
            </p>
            <p className="nsbm">Codelyzer © 2023</p>

        </div>
        <div className="footer-c">
            <div>
                <ion-icon name="location-sharp"></ion-icon>
                <p>
                SLIIT,<br />
                   New Kandy Rd,<br />
                    Malabe, Sri Lanka.
                </p>
            </div>

            <div>
                <ion-icon name="call"></ion-icon>
                <p>
                    +94 11 123 4567 <br /> +94 71 123 4567
                </p>
            </div>


            <div>
                <ion-icon name="mail"></ion-icon>
                <p><a href="" target="_blank">inquiries@codelyzer.lk</a></p>
            </div>

        </div>

        <div className="footer-r">
            <p className="about">
                {/* <span>Our University</span>
                NSBM prides itself on being a <br />forward-thinking entitiy,with the <br />constant drive to push boundaries */}
            </p>
            <div className="footericons">
                <a href="https://www.facebook.com" target="_blank"><ion-icon name="logo-facebook"><FaFacebook/></ion-icon></a>
                <a href="https://www.youtube.com" target="_blank"><ion-icon name="logo-youtube"><FaYoutube/></ion-icon></a>
                <a href="https://lk.linkedin.com" target="_blank"><ion-icon name="logo-linkedin"><FaLinkedin/></ion-icon></a>
                <a href="https://www.instagram.com" target="_blank"><ion-icon name="logo-instagram"><FaInstagram/></ion-icon></a>
            </div>
        </div>

    </footer>



)}

export default footer