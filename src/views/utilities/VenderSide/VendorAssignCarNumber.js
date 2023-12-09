import React, { useState } from "react";
import { useParams } from "react-router";

// Uncomment the following import if CancelIcon is needed
import CancelIcon from '@mui/icons-material/Cancel';
import { BackendUrl } from "utils/config";

const VendorAssignCarNumber = ({ setpopupwindow, reservationDetails , handleCarNumberAssigned }) => {
  const [carNumber, setCarNumber] = useState("");
  const { venderID } = useParams();

  const handleSubmit = async () => {
    try {
      // console.log(reservationDetails[0]);
      
      // console.log(reservationDetails[0]?.travelItenary.pickupTime);

      const result = await fetch(`${BackendUrl}/0auth/vendor/setCarNumbertovender/${venderID}`, {
        method: "POST",
        body: JSON.stringify({
          carType: reservationDetails[0].car.type,
          carNumber: carNumber,
          startDay: reservationDetails[0].travelItenary.pickupDate,
          EndDay: reservationDetails[0].travelItenary.dropDate,
          startTime: reservationDetails[0].travelItenary.pickupTime,
          endTime: reservationDetails[0].travelItenary.dropTime,
          reservationId:reservationDetails[0].reservationID,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const resdata = await result.json();
      handleCarNumberAssigned();
      console.log("running" + resdata);
      handleclose();
    } catch (err) {
      console.log(err);
    }
  };

  const handleclose = () => {
    setpopupwindow(0);
  };

  return (
    <>
      {!reservationDetails || !venderID ? (
        <>Loading....</>
      ) : (
        <div className='w-screen h-screen fixed top-0 left-0 backdrop-filter backdrop-blur-sm flex items-center justify-center '>
        
        <div className="relative h-[80vh] flex flex-col justify-center mt-24 bg-white shadow-2xl border-[2px] border-black ">
          <h2 className="font-extrabold text-2xl  text-blue-950 text-center">Confirm booking</h2>
          <div className="flex justify-center">
            <div className="w-3/4 md:w-2/5  px-4 md:px-24 py-10 box-content rounded-xl">
              <div className="mt-2 flex flex-col gap-3">
                {/* Uncomment the following line if CancelIcon is needed */}
                <CancelIcon className=' absolute top-5  right-3 cursor-pointer' onClick={handleclose} />
                <div className="">
                  <label htmlFor="Car Type" className="text-left block text-sm font-semibold text-gray-800">
                    Car Type
                  </label>
                  <p>{reservationDetails[0].car.type}</p>
                </div>
                <div className="">
                  <label htmlFor="Car Type" className="text-left block text-sm font-semibold text-gray-800">
                    start time
                  </label>
                  <p>{reservationDetails[0].travelItenary.pickupDate + " " +  reservationDetails[0].travelItenary.pickupTime}</p>
                </div>
                <div className="">
                  <label htmlFor="Car Type" className="text-left block text-sm font-semibold text-gray-800">
                    End time
                  </label>
                  <p>{reservationDetails[0].travelItenary.dropDate + " " +  reservationDetails[0].travelItenary.dropTime}</p>
                </div>
                <div className="">
                  <label htmlFor="Car Number" className="text-left block text-sm font-semibold text-gray-800">
                    Car Number
                  </label>
                  <input
                    value={carNumber}
                    onChange={(e) => setCarNumber(e.target.value)}
                    className="block w-full border-black border-[1px] px-4 py-2 mt-2 text-[#053B50] bg-white  rounded-md focus:border-[#053B50] focus:ring-[#053B50] focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>
                <div className="mt-6">
                  <button
                    onClick={handleSubmit}
                    type="submit"
                    className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-[#053B50] rounded-md hover-bg-[#053B50] focus:outline-none focus-bg-[#053B50]"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      )}
    </>
  );
};

export default VendorAssignCarNumber;
