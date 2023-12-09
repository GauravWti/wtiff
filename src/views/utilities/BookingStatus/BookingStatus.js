import axios from "axios";
import React, { useEffect, useState } from "react";
// import CancelIcon from '@mui/icons-material/Cancel';
// import EditIcon from '@mui/icons-material/Edit';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import SaveIcon from '@mui/icons-material/Save';
// import ViewBooking from "./ViewBooking";
import ViewRawBookingStatus from "./ViewRawBookingStatus";
import { useParams } from "react-router";

const BookingStatus=()=>{
    const [data, setData] = useState([]);

    const [editId, seteditId] = useState(-1);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    
  
  
  
    const {status}=useParams();
    console.log(status);
  
    useEffect(() => {
      axios
        .get("https://wticarrental.ae:3000/app/v1/reservation/getReservations")
        .then((res) =>{
          console.log('running');
             setData(res.data.result);
        
        const filteredData = res.data.result.filter(item => item.reservationStatus === `${status}`);
        setData(filteredData);
        console.log(data);
        
    })
        .catch((er) => console.log(er));
    }, [status]);


  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentItems = data?.slice(firstIndex, lastIndex);

  const paginate = (str) => {
    if(str==='i' && currentPage<totalpage){
        setCurrentPage(currentPage+1);

    }
    else if(str==='d' && currentPage>1){
        setCurrentPage(currentPage-1);
    }
  };

  const totalpage=Math.ceil(data?.length / itemsPerPage);
  const firstshowpagenumber=currentPage;
  const LastshowPagenumber=currentPage+3;

    return (
      <div className="relative">
        <table>
          <thead>
            <tr className="bg-blue-950 text-white ">
              <th className="w-[10%] border">Reservation ID</th>
              <th className="w-[15%] border">Pick Up Location</th>
              <th className="w-[15%] border">Drop Location</th>
              <th className="w-[10%] border">Pick Date</th>
              <th className="w-[10%] border">Drop Date</th>
              <th className="w-[10%] border">Pick Up Time</th>
              <th className="w-[10%] border">Drop Time</th>
              <th className="w-[10%] border">Reservation Status</th>
              <th className="w-[10%] border"> Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) =>
              
              <ViewRawBookingStatus key={index} item={item} editId={editId} seteditId={seteditId}  />
            )}
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
       
      </div>
    );
  }

export default BookingStatus;