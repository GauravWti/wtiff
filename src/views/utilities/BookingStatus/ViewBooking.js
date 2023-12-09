import React from "react";
import CloseIcon from '@mui/icons-material/Close';

const ViewBooking=({setBookingView, selectViewRow})=>{
 
    function getDaysInBetween(startDateStr, endDateStr){
        // Parse the start and end dates from their string representations
        const startDate = new Date(startDateStr);
        const endDate = new Date(endDateStr);
    
        // Calculate the difference in milliseconds
        const timeDifference = endDate - startDate;
    
        // Calculate the difference in days
        const daysDifference = timeDifference / (1000 * 3600 * 24);
    
        // Round to the nearest whole number to get the number of days
        // console.log(Math.round(daysDifference));
        return Math.round(daysDifference);
      }

      const handleCloseModal=()=>{
        setBookingView(false);
      }
    return (
        <>
        <div className="  ">
          <div className="relative bg-slate-500 opacity-50 top-0 left-0 w-full h-screen">
            
          </div>
          <div className="absolute top-100px h-screen flex flex-col">
            <div className="flex justify-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-[60%] my-auto mx-auto top-[70px] left-[70px]">
                <div className="border-0 rounded-lg shadow-lg relative  flex flex-col w-full bg-white outline-none focus:outline-none">
                  <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                    <h3 className="text-2xl font-semibold">View Booking</h3>
                    <button
                      className="bg-transparent border-0 text-black float-right"
                      onClick={() => handleCloseModal()}
                    >
                      <CloseIcon className="text-white text-lg bg-slate-600 rounded-full" />
                    </button>
                  </div>
                  <div className="relative p-6 flex-auto">
                    {/* start  */}
                    <div className="w-full mt-2 block h-[400px] overflow-y-auto">
                      <div className="w-full">
                        <div className="bg-[#EBEBEB] w-full p-4  rounded mb-4 flex justify-between">
                          <div>
                            <div className="font-bold text-black text-base">
                              Pick-Up
                            </div>
                            <div className="text-[#2F2F2F] mt-1 text-sm font-normal">
                              {selectViewRow?.travelItenary?.pickupLocation}
                            </div>
                            <div className="text-[#092C85] mt-1 text-sm font-semibold">
                              {selectViewRow?.travelItenary?.pickupDate}
                            </div>
                          </div>
                          <div className="p-4">
                            <div className="text-center text-xs mb-1 inline-flex justify-center items-center w-full">
                              <span className="max-sm:block">-----</span>
                              {getDaysInBetween(selectViewRow?.travelItenary?.pickupDate,selectViewRow?.travelItenary?.dropDate) + 1} Days
                              <span className="max-sm:block">-----</span>
                            </div>
                          </div>
                          <div>
                            <div className="font-bold text-black">Drop-off</div>
                            <div className="text-[#2F2F2F] mt-1 text-sm font-normal">
                              {selectViewRow?.travelItenary?.dropLocation}
                          </div>
                            <div className="text-[#092C85] mt-1 text-sm font-semibold">
                              {selectViewRow?.travelItenary?.dropDate}
                            </div>
                          </div>
                        </div>
                        <div className="bg-white w-full pt-4 pl-4 pr-4  rounded block border-2 border-[#EBEBEB]">
                          <div className="flex">
                            <div className="w-full flex items-center">
                              <img
                                // src={(selectViewRow?.car?.src) ? process.env.PUBLIC_URL +
                                //   "/images/" + selectViewRow?.car?.src.split(" ").join("") + ".png" : ""}
                                src="https://media.istockphoto.com/id/1189903200/photo/red-generic-sedan-car-isolated-on-white-background-3d-illustration.jpg?s=612x612&w=0&k=20&c=uRu3o_h5FVljLQHS9z0oyz-XjXzzXN_YkyGXwhdMrjs="
                                alt=""
                                onError={(e) => {
                                  e.target.src = "../static/staticcarimage.png";
                                }}
                                className="object-cover"
                              />
                            </div>
                            <div className="w-full py-2 pb-4">
                              <div className="font-bold text-base">
                                {selectViewRow?.car?.type}
                              </div>
                              <div className="mt-1 text-sm">{selectViewRow?.car?.title}</div>
                              
                            </div>
                          </div>
                        </div>
                        {selectViewRow.extras.length > 0 ? 
                        <>
                        <div className="text-2xl font-bold mt-4 mb-4">
                          Extras 
                        </div>
                        {selectViewRow.extras.map((item, index) => (
                          <>
                            <div className="bg-[#EBEBEB] w-full p-4  rounded mb-4 flex justify-between">
                          <div>
                            {index + 1}{". "}{item.name}
                          </div>
                        </div>
                          </>
                        ))
                        }
                        </> 
                        : 
                        <></>}
                      </div>
                    </div>
                    {/* end  */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        </>
    );
}

export default ViewBooking