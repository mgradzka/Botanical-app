import React from "react";
import styled from "styled-components";

const Teaser = () => {
  return (
    <PlantTeaser>
      <h2>Want to add a touch of greenery to your home?</h2>
      <p>
        Create your dream, cozy apartment with our beautiful plants... All of
        that without leaving the house! Just pick the plants you like and we
        will deliver it for you.
      </p>
    </PlantTeaser>
  );
};

const PlantTeaser = styled.section`
  text-align: center;
  position: absolute;
  left: 50%;
  top: 30%;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 0.5);;  
 backdrop-filter: blur(5px);
  padding: 2rem 3rem;
`;

export default Teaser;
