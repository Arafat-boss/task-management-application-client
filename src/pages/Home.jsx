import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";

const Home = () => {
  return (
    <div>
      <div className="flex justify-center items-center ">
        <Navbar></Navbar>
      </div>

      <Hero></Hero>
    </div>
  );
};

export default Home;
