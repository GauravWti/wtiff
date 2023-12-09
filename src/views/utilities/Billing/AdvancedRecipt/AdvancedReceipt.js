import React from "react";
import AdvancedReciptRaw from "./AdvancedReceiptRaw";
import { useEffect } from "react";
import { useState } from "react";

import Loader from "ui-component/Loader";

const AdvancedRecipt = () => {
  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [totalPages, setTotalPages] = useState();
  
   // Make sure to update this with the actual total number of pages

  const paginate = (str) => {
    if (str === 'i' && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else if (str === 'd' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://wticarrental.ae:3000/app/v1/invoice/getAllAdvanceInvoice?page=${currentPage}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        
        setData(responseData.objects);
        setTotalPages(responseData.totalPages);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [currentPage , totalPages]); 
  
  return (
    <>
    <>
       {
        data?<>
        <h1 className="text-4xl font-bold text-blue-700 text-center">Download AdvancedReceipt </h1>
       <div className="container mx-auto p-4 overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 shadow-lg">
          <thead>
            <tr className="text-sm bg-black text-white">
              <th className="sm:py-2 sm:px-2 border-b">AdvanceInvoiceID</th>
              <th className="sm:py-2 sm:px-2 border-b">ReservationID</th>
              <th className="sm:py-2 sm:px-2 border-b">UserID</th>
              <th className="sm:py-2 sm:px-2 border-b">Issue Date</th>
              <th className="sm:py-2 sm:px-2 border-b">dueDate</th>
              <th className="sm:py-2 sm:px-2 border-b">Charge</th>
              <th className="sm:py-2 sm:px-2 border-b">Payment status</th>
              <th className="sm:py-2 sm:px-2 border-b">Payment Method</th>
              <th className="sm:py-2 sm:px-2 border-b">Download</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, key) => (
              <AdvancedReciptRaw data={item} key={key} />
            ))}
           
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4 items-center gap-2">
            <button onClick={() => paginate('d')} className={`${currentPage === 1 ? 'cursor-not-allowed' : ''} text-[8px] px-1 py-1 rounded-lg bg-blue-400 text-white`}>Prev Page</button>

            {[...Array(totalPages)].map((_, index) => {
              const pageNumber = index + 1;
              return (
                <button
                  key={index}
                  onClick={() => setCurrentPage(pageNumber)}
                  className={`mx-1 px-3 py-1 border ${currentPage === pageNumber ? 'bg-blue-500 text-white' : ''}`}
                >
                  {pageNumber}
                </button>
              );
            })}

            <button onClick={() => paginate('i')} className={`${currentPage === totalPages ? 'cursor-not-allowed' : ''} text-[8px] px-1 py-1 rounded-lg bg-blue-400 text-white`}>Next Page</button>
          </div>
        
        </>:<><Loader /></>
       }
    </>
    
     
    </>
  );
};

export default AdvancedRecipt;
