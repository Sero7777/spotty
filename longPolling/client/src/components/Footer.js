import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div className="footer">
            <div className="legal">
                <Link to="/impressum" className="footer-btn">Impressum</Link>
                <span>
                    &copy; 2020 by Max Wagner. All rights reserved.
                </span>
            </div>
        </div>
    )
}

export default Footer;