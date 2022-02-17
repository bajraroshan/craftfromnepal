import React from "react";
import Banner from "../components/Banner";
import FeatureList from "../components/FeatureList";
import { Container } from "react-bootstrap";

const Home = () => {
  return (
    <>
      <Banner />
      <Container>
        <FeatureList />
      </Container>
    </>
  );
};

export default Home;
