// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { TextField } from "@mui/material";
import { Search } from "@mui/icons-material";
import InputAdornment from "@mui/material/InputAdornment";
import axios from "axios";
import BookingCarCard from "./BookingCarCard";
import PhoneInput from "react-phone-input-2";
import { allCountries } from "../../../utils/countryData/allcountries";
import 'react-phone-input-2/lib/style.css'

function CreateBooking() {
  const [value, setValue] = useState("");
  const [valueD, setValueD] = useState("");
  
  // eslint-disable-next-line no-unused-vars
  const [arr, setArr] = useState(["Hello", "World"]);

  const currentDate = new Date();
  const nextDay = new Date(currentDate);
  const nextToNextDay = new Date(currentDate);
  nextDay.setDate(currentDate.getDate() + 1);
  nextToNextDay.setDate(currentDate.getDate() + 2);

  console.log(nextDay)
  const changeDateFormat = (inputDateString) => {
    let inputDate = new Date(inputDateString);

   
    let year = inputDate.getFullYear();
    let month = (inputDate.getMonth() + 1).toString().padStart(2, "0"); 
    let day = inputDate.getDate().toString().padStart(2, "0");

    
    let formattedDateString = `${year}-${month}-${day}`;
    return formattedDateString;
  };

  const [pickDate, setPickDate] = useState(changeDateFormat(nextDay));
  const [dropDate, setDropDate] = useState(changeDateFormat(nextToNextDay));

  const [allCars, setAllCars] = useState([{}]);
  const [carObj, setCarObj] = useState({});

  const [extras, setExtras] = useState({});
  const [extrasSelect, setExtrasSelect] = useState({
    babysafetyseat: false,
    additionaldriver: false,
  });
  const [extrasRate, setExtrasRate] = useState(0);

  const [carDeliveryCharge, setCarDeliveryCharge] = useState(0);

  const options = [
    { label: "00:30", value: "00:30" },
    { label: "01:00", value: "01:00" },
    { label: "01:30", value: "01:30" },
    { label: "02:00", value: "02:00" },
    { label: "02:30", value: "02:30" },
    { label: "03:00", value: "03:00" },
    { label: "03:30", value: "03:30" },
    { label: "04:00", value: "04:00" },
    { label: "04:30", value: "04:30" },
    { label: "05:00", value: "05:00" },
    { label: "05:30", value: "05:30" },
    { label: "06:00", value: "06:00" },
    { label: "06:30", value: "06:30" },
    { label: "07:00", value: "07:00" },
    { label: "07:30", value: "07:30" },
    { label: "08:00", value: "08:00" },
    { label: "08:30", value: "08:30" },
    { label: "09:00", value: "09:00" },
    { label: "09:30", value: "09:30" },
    { label: "10:00", value: "10:00" },
    { label: "10:30", value: "10:30" },
    { label: "11:00", value: "11:00" },
    { label: "11:30", value: "11:30" },
    { label: "12:00", value: "12:00" },
    { label: "12:30", value: "12:30" },
    { label: "13:00", value: "13:00" },
    { label: "13:30", value: "13:30" },
    { label: "14:00", value: "14:00" },
    { label: "14:30", value: "14:30" },
    { label: "15:00", value: "15:00" },
    { label: "15:30", value: "15:30" },
    { label: "16:00", value: "16:00" },
    { label: "16:30", value: "16:30" },
    { label: "17:00", value: "17:00" },
    { label: "17:30", value: "17:30" },
    { label: "18:00", value: "18:00" },
    { label: "18:30", value: "18:30" },
    { label: "19:00", value: "19:00" },
    { label: "19:30", value: "19:30" },
    { label: "20:00", value: "20:00" },
    { label: "20:30", value: "20:30" },
    { label: "21:00", value: "21:00" },
    { label: "21:30", value: "21:30" },
    { label: "22:00", value: "22:00" },
    { label: "22:30", value: "22:30" },
    { label: "23:00", value: "23:00" },
    { label: "23:30", value: "23:30" },
  ];

  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://wticarrental.ae:3000/app/v1/vehicles/getSelfVehiclesWithAllPrices/2",
    };

    let configExtras = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://wticarrental.ae:3000/app/v1/extras/getAllExtras",
    };
    try {
      axios
        .request(config)
        .then((response) => {
          setAllCars(response.data.result);
        })
        .catch((error) => {
          console.log(error);
        });

      axios
        .request(configExtras)
        .then((response) => {
          
          setExtras(response.data.result);
          
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handlePickUpDate = (e) => {
    console.log(e.target.value);
    setPickDate(e.target.value);
  };

  const handleDropUpDate = (e) => {
    console.log(e.target.value);
    setDropDate(e.target.value);
  };

  function calculateDaysDifference(startDate, endDate) {
    // Convert the date strings to Date objects
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    // Calculate the difference in milliseconds
    const timeDifference = endDateObj - startDateObj;

    // Convert the difference to days
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    // console.log(daysDifference);
    return daysDifference;
  }

  

  const [totalDays, setTotalDays] = useState(calculateDaysDifference(pickDate,dropDate));

  useEffect(() => {
    setTotalDays(calculateDaysDifference(pickDate,dropDate));
  },[pickDate,dropDate])

  const handleOnChangeCarObj = (e) => {
    console.log(e.target.value);
    let selectedArray = allCars?.find((obj) => obj.vehicleID == e.target.value);
    // console.log(selectedArray);
    setCarObj(selectedArray);
  };

  const handleCdwChange = (e) => {
    console.log(e.target.value);
    // if(e.target.value){
    //     if(carObj.insuranceAndDamageCovers[0].price.daily * totalDays >= 200){
    //         setExtrasRate(extrasRate + 200)
    //     }
    //     //
    // }
  };

  const handleCheckBoxChange = (e) => {
    let name = e.target.name;
    setExtrasSelect((prevState) => ({
      ...prevState,
      [name]: e.target.checked,
    }));
    // console.log(name);
    if (name == "babysafetyseat" && e.target.checked) {
      let obj = extras.find((item) => item.id === e.target.value);
      if (obj.price.daily * totalDays >= obj.price.maximum) {
        setExtrasRate(extrasRate + 200);
      } else {
        setExtrasRate(extrasRate + obj.price.daily);
      }
    } else if (name == "babysafetyseat" && !e.target.checked) {
      let obj = extras.find((item) => item.id === e.target.value);
      if (obj.price.daily * totalDays >= obj.price.maximum) {
        setExtrasRate(extrasRate - 200);
      } else {
        setExtrasRate(extrasRate - obj.price.daily);
      }
    } else if (name == "additionaldriver" && e.target.checked) {
      let obj = extras.find((item) => item.id === e.target.value);
      setExtrasRate(extrasRate + obj.price.daily);
    } else if (name == "additionaldriver" && !e.target.checked) {
      let obj = extras.find((item) => item.id === e.target.value);
      setExtrasRate(extrasRate - obj.price.daily);
    }
  };

  let payNowArray;

  if (totalDays < 7) {
    payNowArray = carObj?.payNowPrice?.daily;
  } else if (totalDays > 7 && totalDays < 30) {
    payNowArray = carObj?.payNowPrice?.weekly / 7;
  } else {
    payNowArray = carObj?.payNowPrice?.monthly / 30;
  }

  let payNowPercentageArray;

  if (totalDays < 7) {
    payNowPercentageArray = carObj?.percentageHikePayNow?.daily;
  } else if (totalDays > 7 && totalDays < 30) {
    payNowPercentageArray = carObj?.percentageHikePayNow?.weekly;
  } else {
    payNowPercentageArray = carObj?.percentageHikePayNow?.monthly;
  }

  const [number, setNumber] = useState("us");
  const setPhoneNumber = (val) => {
    console.log(val);
    setNumber(val);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Get the form element
    const form = e.target;

    // Create a FormData object
    const formData = new FormData(form);

    // Convert FormData to an object
    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });
    console.log(totalDays);
    // Log the form data object
    console.log("Form Data:", formDataObject);
  };
  return (
    <>
      <div className="w-full overflow-x-hidden">
        <div className="text-2xl font-bold">Create Booking</div>
        <form method="post" className="w-full mt-8" onSubmit={handleSubmit}>
          {/* pick up and drop location  */}
          <div className="w-fit text-xl font-bold underline underline-offset-2 mt-10">
            Pick Up and Drop Location
          </div>
          <div className="w-full flex justify-between flex-wrap mt-4">
            <div className="w-[49%] mb-6">
              <label htmlFor="">Pick Up Location</label>
              <Autocomplete
                freeSolo
                value={value}
                onInputChange={(e, v) => setValue(v)}
                className=""
                componentsProps={{
                  popper: {
                    modifiers: [
                      {
                        name: "flip",
                        enabled: false,
                      },
                      {
                        name: "preventOverflow",
                        enabled: false,
                      },
                    ],
                  },
                }}
                id="combo-box-demo"
                options={arr}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Search here"
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: (
                        <InputAdornment position="start">
                          {" "}
                          <Search />
                        </InputAdornment>
                      ),
                      disableUnderline: true,
                    }}
                    className="inputStyleDashboard bg-slate-100"
                  />
                )}
              />
              {/* <input
                type="text"
                name="pickUpLocation"
                id="pickUpLocation"
                className="inputStyleDashboard"
              /> */}
            </div>

            <div className="w-[49%] mb-6">
              <label htmlFor="">Drop Location</label>
              <Autocomplete 
                freeSolo
                value={valueD}
                onInputChange={(e, v) => setValueD(v)}
               
                componentsProps={{
                  popper: {
                    modifiers: [
                      {
                        name: "flip",
                        enabled: false,
                      },
                      {
                        name: "preventOverflow",
                        enabled: false,
                      },
                    ],
                  },
                }}
                id="combo-box-demo"
                options={arr}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Search here"
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: (
                        <InputAdornment position="start">
                          {" "}
                          <Search />
                        </InputAdornment>
                      ),
                      disableUnderline: true,
                    }}
                    className="inputStyleDashboard bg-slate-100 "
                  />
                )}
              />
              {/* <input
                type="text"
                name="pickUpLocation"
                id="pickUpLocation"
                className="inputStyleDashboard"
              /> */}
            </div>
            <div className="w-[30%]">
              <label htmlFor="pickUpTime" className="w-full">
                Pick Up Date
              </label>
              <input
                type="date"
                name="pickUpDate"
                id="pickUpDate"
                value={pickDate}
                onChange={handlePickUpDate}
                className="inputStyleDashboard"
              />
            </div>
            <div className="w-[15%]">
              <label htmlFor="pickUpTime" className="w-full">
                Pick Up Time
              </label>
              <select
                name="pickUpTime"
                className="inputStyleDashboard"
                id="pickUpTime"
              >
                {options.map((option, key) => (
                  <option
                  key={key}
                    value={option.value}
                    selected={option.value == "10:00"}
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-[30%] h-full">
              <label htmlFor="dropDate" className="w-full">
                Drop Date
              </label>
              <input
                type="date"
                name="dropDate"
                id="dropDate"
                value={dropDate}
                onChange={handleDropUpDate}
                className="inputStyleDashboard"
              />
            </div>
            <div className="w-[15%] h-full">
              <label htmlFor="dropTime" className="w-full">
                Drop Time
              </label>
              <select
                name="dropTime"
                className="inputStyleDashboard h-full"
                id="dropTime"
              >
                {options.map((option) => (
                  <option
                    value={option.value}
                    selected={option.value == "10:00"}
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* choose car  */}
          <div className="w-fit text-xl font-bold underline underline-offset-2 mt-10">
            Car Selection
          </div>
          <div className="w-full flex justify-between flex-wrap mt-10">
            <div className="w-[49%]">
              <label htmlFor="carSelect">Car</label>
              <select
                name="carSelect"
                id="carSelect"
                className="inputStyleDashboard mb-4"
                onChange={handleOnChangeCarObj}
                required
              >
                <option value="1" disabled selected>
                  Select Car
                </option>
                {allCars.map((car, index) => (
                  <option key={index} value={car?.vehicleID}>
                    {car?.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-[49%]">
              {Object.entries(carObj).length === 0 ? (
                <></>
              ) : (
                <>
                  <BookingCarCard totalDays={totalDays} carDetails={carObj} />
                </>
              )}
            </div>
          </div>
          {/* choose extras  */}
          <div className="w-fit text-xl font-bold underline underline-offset-2 mt-10">
            Extras
          </div>
          <div className="w-full flex justify-between flex-wrap mt-10">
            <div className="w-[49%]">
              <label htmlFor="cdw" className="">
                CDW
              </label>
              <select
                name="cdw"
                id="cdw"
                className="inputStyleDashboard"
                onChange={handleCdwChange}
                required
              >
                <option value={false} disabled selected>
                  Select CDW
                </option>
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </select>
              <div className="mt-6">
                <label htmlFor="">Extras</label>
                {Object.entries(extras).length === 0 ? (
                  <></>
                ) : (
                  extras?.map((extra, index) => (
                    <>
                      <div key={index} className="mt-3">
                        <input
                          type="checkbox"
                          onChange={handleCheckBoxChange}
                          value={extra.id}
                          name={extra.name.split(" ").join("").toLowerCase()}
                          id={extra.name.split(" ").join("")}
                        />
                        <label
                          htmlFor={extra.name.split(" ").join("")}
                          className="ml-4"
                        >
                          {extra.name}
                        </label>
                      </div>
                    </>
                  ))
                )}
              </div>
            </div>
            <div className="w-[49%]">
              {Object.entries(carObj).length === 0 ? (
                <></>
              ) : (
                <>
                  <div className="bg-white max-sm:bg-[#EBEBEB] max-sm:rounded max-sm:mt-4 max-sm:pb-4 h-auto pt-4 pl-4 pr-4 pb-4 rounded w-full max-sm:w-full border shadow-2xl">
                    <div className="font-bold text-base">
                      Payment method : PAY NOW
                    </div>
                    <div className="text-sm mt-6">Included in the rates</div>
                    <div className="flex justify-between text-xs mt-5">
                      <div>Base Rate</div>
                      <div>
                        {"AED" + " " + (payNowArray * totalDays).toFixed(2)}
                      </div>
                    </div>
                    <div className="flex justify-between text-xs mt-1">
                      <div>Car delivery charges</div>
                      <div>{"AED" + " " + carDeliveryCharge.toFixed(2)}</div>
                    </div>
                    <div className="flex justify-between mt-1 text-xs">
                      <div>Extras</div>
                      <div>
                        {/* {console.log((extrasRate*currencyPrice))} */}
                        {/* {console.log((parseFloat(extrasRate).toFixed(2))+' '+ (parseFloat(currencyPrice).toFixed(2)))} */}
                        {"AED" + " " + extrasRate.toFixed(2)}
                      </div>
                    </div>
                    <div className="flex justify-between mt-1 text-xs">
                      <div className="text-blue-400">Taxes & Fees</div>
                      <div>
                        {/* {console.log(parseFloat(basePrice)+parseFloat(extrasRate)*parseFloat(currencyPrice))} */}
                        {"AED" +
                          " " +
                          (
                            (payNowArray * totalDays +
                              extrasRate +
                              carDeliveryCharge) *
                            0.05
                          ).toFixed(2)}
                      </div>
                    </div>
                    <div className="flex justify-between mt-1 font-bold text-xs">
                      <div>Estimated Total</div>
                      <div>
                        {"AED" +
                          " " +
                          (
                            payNowArray * totalDays +
                            extrasRate +
                            carDeliveryCharge +
                            (payNowArray * totalDays +
                              extrasRate +
                              carDeliveryCharge) *
                              0.05
                          ).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          {/* user data store  */}
          <div className="w-fit text-xl font-bold underline underline-offset-2 mt-10">
            User Info
          </div>
          <div className="w-full flex justify-between flex-wrap mt-6">
            <div className="w-[49%]">
              <label htmlFor="firstName">First Name</label>
              <input
              required
                type="text"
                name="firstName"
                id="firstName"
                className="inputStyleDashboard"
              />
            </div>
            <div className="w-[49%]">
              <label htmlFor="lastName">Last Name</label>
              <input
              required
                type="text"
                name="lastName"
                id="lastName"
                className="inputStyleDashboard"
              />
            </div>
            <div className="w-[49%] mt-4">
              <label htmlFor="email">Email</label>
              <input
              required
                type="email"
                name="email"
                id="email"
                className="inputStyleDashboard"
              />
            </div>
            <div id="adminForm" className="w-[49%] mt-4">
              <label htmlFor="mobile">Mobile</label>
              <PhoneInput
                required={true}
                country={number}
                countryCodeEditable={false}
                value={number}
                onChange={(value) => setPhoneNumber(value)}
                //  placeholder="Phone Number"
              />
            </div>
            <div className="w-[49%] mt-4">
              <label htmlFor="address">Address</label>
              <input
              required
                type="text"
                name="address"
                id="address"
                className="inputStyleDashboard"
              />
            </div>
            <div className="w-[49%] mt-4">
              <label htmlFor="city">City</label>
              <input
              required
                type="text"
                name="city"
                id="city"
                className="inputStyleDashboard"
              />
            </div>
            <div className="w-[49%] mt-4">
              <label htmlFor="countries">Countries</label>
              <select
                name="countries"
                id="countries"
                className="inputStyleDashboard mb-4"
                onChange={console.log("heeloo")}
              >
                <option value="1" disabled selected>
                  Select Country
                </option>
                {allCountries.map((country, index) => (
                  <option key={index} value={country?.name}>
                    {country?.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-[49%] mt-4">
              <label htmlFor="postalCode">Postal Code</label>
              <input
              required
                type="text"
                name="postalCode"
                id="postalCode"
                className="inputStyleDashboard"
              />
            </div>
          </div>
          {/* submit  */}
          <div className="flex justify-end">
            <input
              type="submit"
              className="w-fit mt-4 bg-[#0f0a34] text-white px-3 py-2 rounded cursor-pointer hover:ring "
              value="Submit"
            />
          </div>
        </form>
      </div>
    </>
  );
}

export default CreateBooking;
