import React, { useEffect, useState } from "react";
import "../CSS/Footer.css"
import logo from "../assect/MicrosoftTeams-image (1).png"
import { FaFacebook,FaYoutube,FaLinkedin,FaInstagram} from 'react-icons/fa';
import { Link } from "react-router-dom";


function footer(){
return(
    <footer class="footer">
        <hr />
        <br />
        <div class="footer-l">
        <img src={logo} />

            <p class="footer-links">
            <Link to="/">Home</Link>
           
               
                <a href="#">About</a>
              
                <Link to="/contact">Contact Us</Link>
                
            </p>
            {/* <p class="nsbm">NSBM Green University Town</p> */}

        </div>
        <div class="footer-c">
            <div>
                <ion-icon name="location-sharp"></ion-icon>
                <p>
                SLIIT,<br />
                   New Kandy Rd,<br />
                    Malabe Sri Lanka.
                </p>
            </div>

            <div>
                <ion-icon name="call"></ion-icon>
                <p>
                    +94 11 544 5000 <br /> +94 71 244 5000
                </p>
            </div>


            <div>
                <ion-icon name="mail"></ion-icon>
                <p><a href="" target="_blank">inquiries@codeliyzer.lk</a></p>
            </div>

        </div>

        <div class="footer-r">
            <p class="about">
                {/* <span>Our University</span>
                NSBM prides itself on being a <br />forward-thinking entitiy,with the <br />constant drive to push boundaries */}
            </p>
            <div class="footericons">
                <a href="https://www.facebook.com/nsbm.lk" target="_blank"><ion-icon name="logo-facebook"><FaFacebook/></ion-icon></a>
                <a href="https://www.youtube.com/channel/UCHsodhRyiuri2jD7H7nfsRg/feed" target="_blank"><ion-icon name="logo-youtube"><FaYoutube/></ion-icon></a>
                <a href="https://lk.linkedin.com/school/nsbmgreenuniversity/" target="_blank"><ion-icon name="logo-linkedin"><FaLinkedin/></ion-icon></a>
                <a href="https://www.instagram.com/nsbmgreenuniversity/" target="_blank"><ion-icon name="logo-instagram"><FaInstagram/></ion-icon></a>
            </div>
        </div>

    </footer>



)}

export default footer