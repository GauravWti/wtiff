import React, { useState, useEffect } from "react";
import VendorAssignCarNumber from "./VendorAssignCarNumber";
import { useParams } from "react-router";
import { BackendUrl } from "utils/config";

const VenderEachOrder = ({ data }) => {
    const [popupwindow ,setpopupwindow]=useState(0);
  const [userData, setUserData] = useState(null);
  const [reservationDetails, setReservationDetails] = useState(null);
  const [currbookingstatus,setcurrbookingstatus]=useState();
  const [carNumberAssigned, setCarNumberAssigned] = useState(false);

  const handleCarNumberAssigned = () => {
    setCarNumberAssigned(!carNumberAssigned);
    // console.log(carNumberAssigned);
  };

  function filterByReservationID(reservations, reservationID) {
    return reservations.filter(
      (reservation) => reservation.reservationID === reservationID
    );
  }

  const reservationID = data.reservationId;

  const fun = async (userID) => {
    try {
      const result = await fetch(
        "https://wticarrental.ae:3000/app/v1/user/getUserDetails",
        {
          method: "POST",
          body: JSON.stringify({ userID }),
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const resData = await result.json();
      setUserData(resData.result);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  const { venderID } = useParams(); 

  useEffect(() => {
    const reservationfun = async () => {
      try {
        const result1 = await fetch(
          "https://wticarrental.ae:3000/app/v1/reservation/getReservations",
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const resData1 = await result1.json();
        const filterReservationDetail = await filterByReservationID(
          resData1.result,
          reservationID
        );
        setReservationDetails(filterReservationDetail);

        if (filterReservationDetail.length > 0) {
          const userID = filterReservationDetail[0].userID;
          fun(userID);
        }
      } catch (err) {
        console.log("Error in getting reservation details");
      }
    };

   
    const getResevationStatus=async()=>{
      const result=await fetch(`${BackendUrl}/0auth/vendor/getstatusofCarTransactionforVendor/${venderID}`,{
        method:'POST',
        body:JSON.stringify({
          reservationId:reservationID
        }),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      })

      const carstatus= await result.json();
      setcurrbookingstatus(carstatus.statuscar);
     

    }


    reservationfun();
    getResevationStatus();
  }, [reservationID, carNumberAssigned]); // dependency includes reservationID

  console.log('each booking');

  const handleAssign=()=>{
    window.alert('Assigned task');
    setpopupwindow(1);
    console.log(popupwindow);
}
  return (
    <>
      {reservationDetails ? (
        <>
        <tr className={`text-[5px] sm:text-[10px] border-b 
        ${currbookingstatus==='assigned'?'bg-yellow-200'
        : currbookingstatus==='complete'?'bg-green-300'
        :''
      

      }`
        }>
          <td className="sm:py-2 sm:px-2">{reservationDetails[0]?.reservationID}</td>
          <td className="sm:py-2 sm:px-2">{reservationDetails[0]?.car.type}</td>
          <td className="sm:py-2 sm:px-2">
            {reservationDetails[0]?.travelItenary.pickupDate +
              " " +
              reservationDetails[0]?.travelItenary.pickupTime}
          </td>
          <td className="sm:py-2 sm:px-2">{reservationDetails[0]?.travelItenary.pickupLocation}</td>
          <td className="sm:py-2 sm:px-2">{reservationDetails[0]?.travelItenary.dropLocation}</td>
          <td className="sm:py-2 sm:px-2">
            {userData ? `${userData.firstName} ${userData.lastName}` : "Loading..."}
          </td>
          <td className="sm:py-2 sm:px-2">{userData ? userData.contact : "Loading..."}</td>
          <td className="sm:py-2 sm:px-2">
            {
              currbookingstatus==='assigned'?<> <button className="text-green px-2 py-1 rounded-md cursor-not-allowed bg-green-300" >Assigned</button></>:
          <button className="text-white px-2 py-1 rounded-md cursor-pointer bg-blue-950" onClick={handleAssign}>Assign</button>

            }
          </td>
        </tr>
        {
            popupwindow===1?<VendorAssignCarNumber handleCarNumberAssigned={handleCarNumberAssigned}  setpopupwindow={setpopupwindow} reservationDetails={reservationDetails}   />:<></>
        }
        </>
      ) : (
        <>Loading...</>
      )}
    </>
  );
};

export default VenderEachOrder;
