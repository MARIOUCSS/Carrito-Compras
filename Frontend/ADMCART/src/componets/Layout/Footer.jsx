import React from "react";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <div className="footer">
      <h1 className="text-center"> All Right Reserved & copy</h1>
      <p className="text-center mt-3">
        <Link to="/contact">Contact</Link>|<Link to="/about">About</Link>|
        <Link to="/about">About</Link>
      </p>
    </div>
  );
}

export default Footer;
