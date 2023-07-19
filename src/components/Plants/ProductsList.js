import React, { useEffect, useState } from "react";
import { ThreeCircles } from "react-loader-spinner";
import styled from "styled-components";
import PlantItem from "./PlantItem/PlantItem";

const ProductsList = () => {
  const [plants, setPlants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://plants-app-ef536-default-rtdb.firebaseio.com/Plants.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const responseData = await response.json();
      const dataToArrive = [];
      for (const key in responseData) {
        dataToArrive.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
          image: responseData[key].image,
        });
      }
      setPlants(dataToArrive);
      setIsLoading(false);
    };
  
       fetchData().catch((error) => {
         setIsLoading(false)
         setError(error.message)

       });
  
    
  }, []);

  if (isLoading) {
    return (
      <ThreeCircles
        height="50"
        width="50"
        color="#337a63"
        wrapperStyle={{ justifyContent: "center", margin: "5rem 0" }}
        visible={true}
        ariaLabel="three-circles-rotating"
      />
    );
  }

  if (error) {
    return <section className="text-center mt-2">{error}</section>
  }

  const plantList = plants.map((plant) => {
    return (
      <PlantItem
        id={plant.id}
        key={plant.id}
        name={plant.name}
        description={plant.description}
        price={plant.price}
        image={plant.image}
      />
    );
  });
  return (
    <section className="pt-4 container">
      
      <List className="">{plantList}</List>
    </section>
  );
};

const List = styled.section`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  
`;

export default ProductsList;
