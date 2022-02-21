import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import BannerImage from "../../assets/hero-img.png";

function Banner() {
  return (
    <div id="home" className="hero-img" style={{backgroundImage: `url(${BannerImage})`}}>
      <Container>   
          <div className="column-full hero-img-content">
            <h2>Hand Carved <span>Tara</span></h2>
            <Link to="/products">Browse More Products</Link>
          </div>
        
        </Container>
      </div>
  );
}

export default Banner;