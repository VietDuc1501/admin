import React from 'react';
import "../../styles/layout/Footer.css";

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>&copy; 2023 Todo App. All rights reserved.</p>
                <div className="footer-contact">
                    <span>Contact: </span>
                    <a href="mailto:"></a> |
                    <a href="tel:" style={{ marginLeft: 8 }}></a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;