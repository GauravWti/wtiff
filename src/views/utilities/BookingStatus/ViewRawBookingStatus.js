import React from "react";
import ViewBooking from "./ViewBooking";
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SaveIcon from '@mui/icons-material/Save';
import { useState } from "react";
import Select from 'react-select';
import { useEffect } from "react";




const ViewRawBookingStatus=({item , editId , seteditId})=>{
    const [reservID, setreservID] = useState("");
  const [pickLoc, setpickLoc] = useState("");
  const [dropLoc, setdropLoc] = useState("");
  const [pickD, setpickD] = useState("");
  const [dropD, setdropD] = useState("");
  const [pickT, setpickT] = useState("");
  const [dropT, setdropT] = useState("");
  const [reservStatus, setreservStatus] = useState();
 

 let ReservationStatusOption;
  if(item.reservationStatus==='Pending'){
    ReservationStatusOption=[
      {value:"Pending" , label:"Pending"},
      {value:"Enroute" , label:"Enroute"},
      {value:"Noshow" , label:"Noshow"},
      {value:"Cancel" , label:"Cancel"}
    ]

  }   
  else if(item.reservationStatus==='Enroute') {
    ReservationStatusOption=[
      
      {value:"Enroute" , label:"Enroute"},
      {value:"Completed", label:"Completed"},
      {value:"Overdue", label:"Overdue"}
    ]
  }
  else if(item.reservationStatus==='Noshow'){
    ReservationStatusOption=[
    {value:"Noshow" , label:"Noshow"}
    ]
  }     
  else if(item.reservationStatus==='Overdue'){
    ReservationStatusOption=[
      {value:"Overdue" , label:"Overdue"},
      {value:"Completed", label:"Completed"}
      ]
  }
  else if(item.reservationStatus==='Completed'){
    ReservationStatusOption=[
      {value:"Completed" , label:"Completed"},

      ]
  } 
  else if(item.reservationStatus==='Cancel'){
    ReservationStatusOption=[
      {value:"Cancel" , label:"Cancel"},
      ]
  }        
  
  useEffect(()=>{
  handleEdit(-1);
  },[])

  
 
  const TimeOptions = [
    { label: "12:30 AM", value: "00:30" },
    { label: "01:00 AM", value: "01:00" },
    { label: "01:30 AM", value: "01:30" },
    { label: "02:00 AM", value: "02:00" },
    { label: "02:30 AM", value: "02:30" },
    { label: "03:00 AM", value: "03:00" },
    { label: "03:30 AM", value: "03:30" },
    { label: "04:00 AM", value: "04:00" },
    { label: "04:30 AM", value: "04:30" },
    { label: "05:00 AM", value: "05:00" },
    { label: "05:30 AM", value: "05:30" },
    { label: "06:00 AM", value: "06:00" },
    { label: "06:30 AM", value: "06:30" },
    { label: "07:00 AM", value: "07:00" },
    { label: "07:30 AM", value: "07:30" },
    { label: "08:00 AM", value: "08:00" },
    { label: "08:30 AM", value: "08:30" },
    { label: "09:00 AM", value: "09:00" },
    { label: "09:30 AM", value: "09:30" },
    { label: "10:00 AM", value: "10:00" },
    { label: "10:30 AM", value: "10:30" },
    { label: "11:00 AM", value: "11:00" },
    { label: "11:30 AM", value: "11:30" },
    { label: "12:00 PM", value: "12:00" },
    { label: "12:30 PM", value: "12:30" },
    { label: "01:00 PM", value: "13:00" },
    { label: "01:30 PM", value: "13:30" },
    { label: "02:00 PM", value: "14:00" },
    { label: "02:30 PM", value: "14:30" },
    { label: "03:00 PM", value: "15:00" },
    { label: "03:30 PM", value: "15:30" },
    { label: "04:00 PM", value: "16:00" },
    { label: "04:30 PM", value: "16:30" },
    { label: "05:00 PM", value: "17:00" },
    { label: "05:30 PM", value: "17:30" },
    { label: "06:00 PM", value: "18:00" },
    { label: "06:30 PM", value: "18:30" },
    { label: "07:00 PM", value: "19:00" },
    { label: "07:30 PM", value: "19:30" },
    { label: "08:00 PM", value: "20:00" },
    { label: "08:30 PM", value: "20:30" },
    { label: "09:00 PM", value: "21:00" },
    { label: "09:30 PM", value: "21:30" },
    { label: "10:00 PM", value: "22:00" },
    { label: "10:30 PM", value: "22:30" },
    { label: "11:00 PM", value: "23:00" },
    { label: "11:30 PM", value: "23:30" },
  ];

  
  const parseDate = (dateString) => {
    const months = {
      Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
      Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
    };

    const [monthStr, day, year] = dateString.split(',');
    const month = months[monthStr.trim().substr(0, 3)]; // Convert month string to number
    const formattedDate = new Date(year.trim(), month, day.trim());
 
    return formattedDate;
  };
 
  const parseDateForDb = (dateString) => {
    const months = [
      "", // leave the 0 index empty
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"
    ];
  
    const [yearStr, monthStr, dateStr] = dateString.split('-');
    const month = months[parseInt(monthStr)]; // Convert month string to number
    const strNew = `${month},${dateStr},${yearStr}`;
    return strNew;
  };
  

const convertStringToDateFormat=(dateStr)=>{
  console.log(dateStr);

  const formattedDate = parseDate(dateStr);

    // Formatting the date in 'yyyy-MM-dd' format
    const month = String(formattedDate.getMonth() + 1).padStart(2, '0');
    const day = String(formattedDate.getDate()).padStart(2, '0');
    const year = formattedDate.getFullYear();

    const formattedDateString = `${year}-${month}-${day}`;
  return formattedDateString;
}

  const handleEdit = async(reservationID) => {
    seteditId(reservationID);
    
    // console.log(item.travelItenary.pickupDate);
  const pickupDate=convertStringToDateFormat(item.travelItenary.pickupDate);
  const DropOffDate=convertStringToDateFormat(item.travelItenary.dropDate);
   

  //  console.log(pickupDate);
  //  console.log(DropOffDate);

   
      setreservID(item.reservationID);
      setpickLoc(item.travelItenary.pickupLocation);
      setdropLoc(item.travelItenary.dropLocation);
      setpickD(pickupDate);
      setdropD(DropOffDate);
      setpickT(item.travelItenary.pickupTime);
      setdropT(item.travelItenary.dropTime);
      setreservStatus(item.reservationStatus);
   

    
    
  };

  
  const handleUpdate = async() => {
  const pickDate=parseDateForDb(pickD);
  const dropDate=parseDateForDb(dropD);

    seteditId(-1);
    console.log(reservID);
    console.log(pickLoc);
    console.log(dropLoc);
    console.log(pickDate);
    console.log(dropDate);
    console.log(pickT);
    console.log(dropT);
    console.log(reservStatus);

    try {
      const result = await fetch('https://wticarrental.ae:3000/app/v1/reservation/changeReservationStatus', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reservationStatus: reservStatus,
          reservationID:reservID,
        }),
      });
    
      if (!result.ok) {
        throw new Error(`HTTP error! Status: ${result.status}`);
      }
    
      const resdata = await result.json();
      console.log(resdata);
    } catch (error) {
      console.error('Error changing reservation status:', error);
    }
    
    
  };

  const handleCancel = () => {
     seteditId(-1);
  }

  const [show,setShow] = useState(false);

  function openTerms(id){
    // console.log(id);
      setShow(id);
  }

  function closeTerms(){
      setShow(false)
  }


  function handlePickT(data) {
    setpickT(data.value);
    
  }

  function handleDropT(data) {
    setdropT(data.value);
    
  }
  function handleReservationStatus(data) {
    setreservStatus(data.value);
    
  }

const customStyles = {
    control: (provided) => ({
      ...provided,
      width: '80%', // Adjust the width as needed
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      width: '10px', // Set the desired width for the dropdown indicator
    }),
  };

   
    return(
        <>
        {/* <input
                    type="text"
                    value={reservID}
                    onChange={(e) => setreservID(e.target.value)} className="w-full px-2"
                  /> */}
{
    item?<>
        {
            item.reservationID === editId ? (
              <tr>
                <td className="w-[10%] border ">
                 
                <td className="border-[2px] text-center px-2 ">{item.reservationID}</td>

                </td>
                <td className="w-[15%] border" >
                  <input
                    type="text"
                    value={pickLoc}
                    onChange={(e) => setpickLoc(e.target.value)} className="w-full px-2"
                  />
                </td>
                <td className="w-[15%] border">
                  <input
                    type="text"
                    value={dropLoc}
                    onChange={(e) => setdropLoc(e.target.value)} className="w-full px-2"
                  />
                </td>
                <td className="w-[10%] border">
                  <input
                    type="date"
                    value={pickD}
                    onChange={(e) => setpickD(e.target.value)} className="w-full px-2"
                  />
                </td>
                <td className="w-[10%] border">
                  <input 
                    type="date"
                    value={dropD}
                    onChange={(e) => setdropD(e.target.value)} className="w-full px-2"
                  />
                </td>
                <td className="w-[10%] border">
             
                  <Select  className="w-24 text-[10px]" styles={customStyles} options={TimeOptions}  value={TimeOptions.find((option) => option.value === pickT)} onChange={handlePickT}/>
                </td>
                {/* <td><input type="time" value={dropT} onChange={e => setdropT(e.target.value)}/></td> */}
                <td className="w-[10%] border">
                 
                  <Select  className="w-24 text-[10px]" styles={customStyles} options={TimeOptions}  value={TimeOptions.find((option) => option.value === dropT)} onChange={handleDropT}/>

                </td>
                
                <td className="w-[10%] border">
                 
                  <Select  className="w-24 text-[10px]" styles={customStyles} options={ReservationStatusOption}  value={ReservationStatusOption.find((option) => option.value === reservStatus)} onChange={handleReservationStatus}/>

                </td >
                <td className="flex justify-center items-center ">
                  <button className=" px-6 py-2 text-gray-800" onClick={() => handleUpdate()}><SaveIcon/></button>
                  <button className=" py-2 pr-6 text-gray-800" onClick={() => handleCancel(item.reservationID)}><CancelIcon/></button>
                </td>
              </tr>
            ) : (
              <tr >
                <td className="border-[2px] text-center px-2 ">{item.reservationID}</td>
                <td className="border-[2px] text-center px-2 ">
                  {item.travelItenary.pickupLocation}
                </td>
                <td className="border-[2px] text-center px-2 ">
                  {item.travelItenary.dropLocation}
                </td>
                <td className="border-[2px] text-center px-2 ">
                  {item.travelItenary.pickupDate}
                </td>
                <td className="border-[2px] text-center px-2 ">
                  {item.travelItenary.dropDate}
                </td>
                <td className="border-[2px] text-center px-2 ">
                  {item.travelItenary.pickupTime}
                </td>
                <td className="border-[2px] text-center px-2 ">
                  {item.travelItenary.dropTime}
                </td>
                <td className="border-[2px] text-center px-2 ">{item.reservationStatus}
                </td>
                <td className="flex justify-center item-center  ">
                  <button
                    className="px-6 py-2 text-gray-800"
                    onClick={() => handleEdit(item.reservationID)}
                  >
                    <EditIcon/>
                  </button>
                  {show===item.reservationID?<>
              
                    <ViewBooking  setBookingView={setShow} selectViewRow={item}/>
      
                  </>:
                  <button className="py-2 pr-6 text-gray-800 "  onClick={()=>openTerms(item.reservationID)}><VisibilityIcon/></button>}

                </td>
              </tr>
            )
    }
    
    
    
    </>:<></>
}
        
       
        
        </>
    )
}

export default ViewRawBookingStatus;