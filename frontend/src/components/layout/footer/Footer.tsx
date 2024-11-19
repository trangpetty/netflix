import React from "react"
import './Footer.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Footer = () => {
    return (
        <div className='footer'>
            <div className="footer-icons">
                <FontAwesomeIcon className="icon" icon="fa-brands fa-facebook" />
                <FontAwesomeIcon className="icon" icon="fa-brands fa-instagram" />
                <FontAwesomeIcon className="icon" icon="fa-brands fa-twitter" />
                <FontAwesomeIcon className="icon" icon="fa-brands fa-youtube" />
            </div>
            <ul>
                <li>Audio Description</li>
                <li>Help Centre</li>
                <li>Gift Cards</li>
                <li>Media Centre</li>
                <li>Investor Relations</li>
                <li>Jobs</li>
                <li>Term of Use</li>
                <li>Privacy</li>
                <li>Legal Notices</li>
                <li>Cookie Preferences</li>
                <li>Corporate Information</li>
                <li>Contact Us</li>
            </ul>
            <div className="copyright-text">© 1997-2024 Netflix, Inc.</div>
        </div>
    )
}

export default Footer