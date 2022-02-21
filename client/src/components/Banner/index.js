import React from "react";
import { Link } from "react-router-dom";
import { Container, Carousel } from "react-bootstrap";
import BannerImage from "../../assets/hero-img-1.png";
import BannerImage2 from "../../assets/hero-img-2.png";

function Banner() {
  return (
    <div id="home" className="hero-img">
      <Carousel>
        <Carousel.Item>
          <img className="d-block w-100" src={BannerImage} alt="First slide" />
          <Carousel.Caption className="hero-img-content">
            <h2>
              Hand Carved <span>Tara</span>
            </h2>
            <Link to="/products">Browse More Products</Link>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={BannerImage2}
            alt="Second slide"
          />

          <Carousel.Caption className="hero-img-content">
            <h2>
              Hand Carved <span>Ghau</span>
            </h2>
            <Link to="/products">Browse More Products</Link>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default Banner;
