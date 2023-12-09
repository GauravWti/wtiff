import React, { useEffect, useState } from 'react';
import EachOrder from './EachOrder';
import Loader from 'ui-component/Loader';


const AllOrders = () => {
 
  const [reservationD, setreservationDetails] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [AssignedBooking, setAssignedBooking]=useState(true);

 const handleAssignedBooking=()=>{
    setAssignedBooking(!AssignedBooking);
    
}
console.log(AssignedBooking);




  useEffect(() => {
    // console.log("rendering");
    // const fun = async () => {
    //   try {
      

    //     const resData = await result.json();
    //     // console.log(resData.result);
    //     setUserData(resData.result);
    //     // setuserData(resData);
    //     // console.log(userData);
    //   } catch (error) {
    //     console.error('Error fetching data:', error);
    //   }
    // };
    
    const reservationfun = async () => {
      try {
        const result1 = await fetch('https://wticarrental.ae:3000/app/v1/reservation/getReservations', {
          method: 'GET',

          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const resData1 = await result1.json();
        console.log(resData1.result);
        
        setreservationDetails(resData1.result);

        console.log(reservationD);
      } catch (err) {
        console.log('err in getting reservation details');
      }
    };

    // fun();
    reservationfun();
  }, [AssignedBooking]); // empty dependency array to run only once

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentItems = reservationD?.slice(firstIndex, lastIndex);

  const paginate = (str) => {
    if(str==='i' && currentPage<totalpage){
        setCurrentPage(currentPage+1);

    }
    else if(str==='d' && currentPage>1){
        setCurrentPage(currentPage-1);
    }
  };

  const totalpage=Math.ceil(reservationD?.length / itemsPerPage);
 const firstshowpagenumber=currentPage;
 const LastshowPagenumber=currentPage+3;

 console.log(firstshowpagenumber);
 console.log(LastshowPagenumber);


  console.log(reservationD?.length);

  return (
    <>
    {
        reservationD ?<>
        
    
      <div className='relative'>
        <div className="flex gap-4 flex-wrap">
          <div className="flex gap-2 items-center">
            <span className="bg-gray-400 h-[10px] w-[10px]"></span>
            <p>Not Assigned</p>
          </div>
          {/* <div className="flex gap-2 items-center">
            <span className="bg-red-200 h-[10px] w-[10px]"></span>
            <p>Cancelled</p>
          </div> */}
          <div className="flex gap-2 items-center">
            <span className="bg-green-300 h-[10px] w-[10px]"></span>
            <p>Assigned</p>
          </div>
          {/* <div className="flex gap-2 items-center">
            <span className="bg-pink-300 h-[10px] w-[10px]"></span>
            <p>Enroute</p>
          </div> */}
          {/* <div className="flex gap-2 items-center">
            <span className="bg-orange-300 h-[10px] w-[10px]"></span>
            <p>Noshow</p>
          </div> */}
          {/* <div className="flex gap-2 items-center">
            <span className="bg-slate-200 h-[10px] w-[10px]"></span>
            <p>Overdue</p>
          </div> */}
        </div>
      </div>
      {currentItems ? (
        <div className="container mx-auto p-4 overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 shadow-lg">
            <thead>
              <tr className="text-[5px] sm:text-[10px] bg-blue-900 text-white">
                <th className=" sm:py-2 sm:px-2 border-b">Booking No</th>
                <th className="sm:py-2 sm:px-2 border-b">Vehicle Type</th>
                <th className="sm:py-2 sm:px-2 border-b">Pickup Time, Date</th>
                <th className="sm:py-2 sm:px-2 border-b">Pickup Location</th>
                <th className="sm:py-2 sm:px-2 border-b">Dropoff Location</th>
                <th className="sm:py-2 sm:px-2 border-b">Customer Name</th>
                <th className="sm:py-2 sm:px-2 border-b">Contact Details</th>
                <th className="sm:py-2 sm:px-2 border-b">Assign</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((data, key) => (
                <EachOrder handleAssignedBooking ={handleAssignedBooking} data={data} key={key}  />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <>Loading...</>
      )}
      

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
      </>:
      <><Loader/></>
}
    </>
  );
};

export default AllOrders;
