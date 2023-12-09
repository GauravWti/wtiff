import React, { useEffect } from "react"
import { useState } from "react";
import { useParams } from "react-router";
import VenderEachOrder from "./VenderEachOrder";
import VenderonDutyNumber from "./VenderonDutyNumber";
import { BackendUrl } from "utils/config";

const VenderAllBooking=()=>{
    const [booking , setBooking]=useState([]);
  const { venderID } = useParams(); 

  const [allAssignedBokingCar,setallAssignedBokingCar]=useState(null);

//   const func=async()=>{
//     try{
//        const result=await fetch(`http://localhost:5000/0auth/getAllBookingIdofParticularVender/${venderID}`,{
//         method:'GET',

//        })
//        const resdata=await result.json();
//        console.log(resdata);
//          setBooking(resdata[0].booking);
//          console.log(booking);

//     }
//     catch(err){
//         console.log('err in fetching bookingId');
//     }
// }

//   const getcountOfallBookingcarArr = async()=>{
//     console.log('runiing arr');
//     try{
//       const result=await fetch(`http://localhost:5000/0auth/getAllBookingIdofParticularVender/${venderID}`,{
//        method:'GET',
//        headers: {
//         "Content-Type": "application/json",
//       },
//       credentials: "include",

//       })
//       const resdata=await result.json();
//       console.log(resdata);
//         setallAssignedBokingCar(resdata);
//         console.log(allAssignedBokingCar);
//         console.log(resdata);


//    }
//    catch(err){
//        console.log('err in fetching getcountOfallBookingcarArr');
//    }
//   }

//   useEffect(()=>{

    


    
//     getcountOfallBookingcarArr();
//     func();

//   },[])

const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 5;


const func = async () => {
  try {
    const result = await fetch(`${BackendUrl}/0auth/vendor/getAllBookingIdofParticularVender/${venderID}`, {
      method: 'GET',
    });

    if (result.ok) {
      const resdata = await result.json();
      console.log(resdata);
      setBooking(resdata[0].booking);
      console.log(booking);
    } else {
      console.error('Error in fetching bookingId:', result.status);
    }
  } catch (err) {
    console.error('Error in fetching bookingId:', err);
  }
};

const getcountOfallBookingcarArr = async () => {
  console.log('running arr');
  try {
    const result = await fetch(`${BackendUrl}/0auth/vendor/getAllBookingCarOfParticularVendor/${venderID}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (result.ok) {
      const resdata = await result.json();
      console.log(resdata);
      setallAssignedBokingCar(resdata);
     
      console.log(allAssignedBokingCar);
    } else {
      console.error('Error in fetching getcountOfallBookingcarArr:', result.status);
    }
  } catch (err) {
    console.error('Error in fetching getcountOfallBookingcarArr:', err);
  }
};

useEffect(() => {
  // Ensure that venderID is defined before making fetch requests
  if (venderID) {
    getcountOfallBookingcarArr();
    func();
  }
}, [venderID]);

const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentItems = booking?.slice(firstIndex, lastIndex);

  const paginate = (str) => {
    if(str==='i' && currentPage<totalpage){
        setCurrentPage(currentPage+1);

    }
    else if(str==='d' && currentPage>1){
        setCurrentPage(currentPage-1);
    }
  };

  const totalpage=Math.ceil(booking?.length / itemsPerPage);
  const firstshowpagenumber=currentPage;
  const LastshowPagenumber=currentPage+3;

  return(
    <>
    {
      allAssignedBokingCar?<>
        <table className="min-w-full bg-white border border-gray-300 shadow-lg">
    <thead>
      <tr className="text-[5px] sm:text-[10px] bg-blue-400">
        <th className=" sm:py-2 sm:px-2 border-b">car Type</th>
        <th className="sm:py-2 sm:px-2 border-b">on Duty</th>
        <th className="sm:py-2 sm:px-2 border-b">duty not Assign</th>
        <th className="sm:py-2 sm:px-2 border-b">complete</th>
        <th className="sm:py-2 sm:px-2 border-b">pending</th>

      </tr>
    </thead>
    <tbody>
    {
            allAssignedBokingCar.map((data,key)=>(
                // <p key={key}>{data.reservationId}</p>
                 <VenderonDutyNumber key={key} data={data} />
                ))
           }
    </tbody>
  </table>
      </>:<>Loading....</>
    }
    
      {
        booking?
           
            <div className="container mx-auto p-4 overflow-x-auto">
  <table className="min-w-full bg-white border border-gray-300 shadow-lg">
    <thead>
      <tr className="text-[5px] sm:text-[10px] bg-blue-400">
        <th className=" sm:py-2 sm:px-2 border-b">Booking No</th>
        <th className="sm:py-2 sm:px-2 border-b">Vehicle Type</th>
        <th className="sm:py-2 sm:px-2 border-b">Pickup Time, Date</th>
        <th className="sm:py-2 sm:px-2 border-b">Pickup Location</th>
        <th className="sm:py-2 sm:px-2 border-b">Dropoff Location</th>
        <th className="sm:py-2 sm:px-2 border-b">Customer Name</th>
        <th className="sm:py-2 sm:px-2 border-b">Contact Details</th>
        <th className="sm:py-2 sm:px-2 border-b">Attached Docs</th>
      </tr>
    </thead>
    <tbody>
    {
            currentItems.map((data,key)=>(
                // <p key={key}>{data.reservationId}</p>
                 <VenderEachOrder key={key} data={data} />
                ))
           }
    </tbody>
  </table>
  <div className="flex justify-center mt-4 items-center gap-2">
      <button onClick={()=>paginate('d')} className={` ${1===currentPage?'cursor-not-allowed':''} text-[8px] px-1 py-1 rounded-lg bg-blue-400 text-white`}>Prev Page</button>

      {[...Array(totalpage)].map((_, index) => {
              const pageNumber = index + 1;
              if (pageNumber >= firstshowpagenumber && pageNumber <= LastshowPagenumber) {
                return (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(pageNumber)}
                    className={`mx-1 px-3 py-1 border ${currentPage === pageNumber ? 'bg-blue-500 text-white' : ''}`}
                  >
                    {pageNumber}
                  </button>
                );
              }
              return null;
            })}
        

        <button onClick={()=>paginate('i')}  className={`${totalpage==currentPage?'cursor-not-allowed':''}  text-[8px] px-1 py-1 rounded-lg bg-blue-400 text-white`}>next Page</button>
      </div>
</div>:<>Loading...</>

        
      }
    </>
  );
}

export default VenderAllBooking;