import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import BookingAssign from "./BookingAssign";


const EachOrder=({handleAssignedBooking , data })=>{

    const [userdata, setUserData] = useState(null);

    const [popupwindow ,setpopupwindow]=useState(0);
    
    

    const [color, setColor]=useState();
    console.log(color);
    useEffect(() => {

        const fetchData = async () => {
            try {
              // Use Promise.all to wait for both fetch requests
              const [colorResult, userResult] = await Promise.all([
                fetchColor(),
                fetchUserData(),
                
              ]);
      
              // Set the state based on the results
              setColor(colorResult);
              setUserData(userResult);
              
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          };

     const fetchColor=async()=>{
         return data?.allocatedCarID;
        // return data?.reservationStatus;
     }

        const fetchUserData = async () => {
            try {
                const result = await fetch('https://wticarrental.ae:3000/app/v1/user/getUserDetails', {
                    method: 'POST',
                    body: JSON.stringify({ "userID": data?.userID }),
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });

               ///get booking details on particluar unique details for vender 
                


                const resData = await result.json();
                
                return resData.result;
               
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
       
        fetchData()
       
console.log('rendering');
    }, []);

    const handleAssign=()=>{
        window.alert('Assigned task');
        setpopupwindow(1);
    }

    return(
       <> <tr className={`text-[5px] sm:text-[10px] border-b ${
        // color === 'Cancelled' ? 'bg-red-200' :
        // color === 'Pending' ? 'bg-yellow-300' :
        // color === 'Complete' ? 'bg-green-300' :
        // color=== 'Enroute' ? 'bg-pink-300':
        // color==='Noshow'?'bg-orange-300':
        // color==='Overdue'?'bg-slate-200':
        color!==''?'bg-green-300':'bg-slate-400'
         // Default case if none of the conditions match
      }`}>
       <td className="sm:py-2 sm:px-2">{data?.reservationID}</td>
       <td className="sm:py-2 sm:px-2">{data?.car.type}</td>
       <td className="sm:py-2 sm:px-2">
       {data?.travelItenary.pickupDate +
           ' ' +
           data?.travelItenary.pickupTime}
       </td>
       <td className="sm:py-2 sm:px-2">{data?.travelItenary.pickupLocation}</td>
       <td className="sm:py-2 sm:px-2">{data?.travelItenary.dropLocation}</td>
       <td className="sm:py-2 sm:px-2">
       {userdata?.firstName} {userdata?.lastName}
       </td>
       <td className="sm:py-2 sm:px-2">{userdata?.contact}</td>
       <td className="sm:py-2 sm:px-2">
       {
         color!==''?<>
          <button className="bg-green px-2 py-1 rounded-md cursor-not-allowed"> Assigned</button>
         </> :<button className="bg-white px-2 py-1 rounded-md cursor-pointer" onClick={handleAssign}>Assign</button>
         
       }
         </td>
   </tr>
    {
        popupwindow===1?<BookingAssign handleAssignedBooking={handleAssignedBooking} setpopupwindow={setpopupwindow}  data={data} userdata={userdata}  />:<></>
    }
        
   
   </>
    );
}

export default EachOrder;