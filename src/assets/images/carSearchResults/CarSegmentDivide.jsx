import React, { useMemo } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import CarSegmentTabs from "./CarSegmentTabs";

function CarSegmentDivide() {
  const [carData, setCarData] = useState([]);


  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://wticarrental.ae:3000/app/v1/vehicles/getSelfVehicles/1",
    };

    try {
      axios
        .request(config)
        .then((response) => {
          setCarData(response.data.result);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  

  return (
    <>
      <div className="w-full pt-4 pb-12 rounded">
        <div className="bg-white w-[85%] m-auto pb-2 relative rounded overflow-hidden shadow-lg">
          <CarSegmentTabs carData={carData} />
        </div>
      </div>
    </>
  );
}

export default CarSegmentDivide;
