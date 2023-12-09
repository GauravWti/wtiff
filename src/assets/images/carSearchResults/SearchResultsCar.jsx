import React, { useEffect, useState } from "react";
import Cars from "./Cars";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { emptyInvoice } from "../../../utils/invoice/invoiceSlice";
import { clearUser } from "../../../utils/userSlices/userSlice";
import { emptyExtraArr } from "../../../utils/extraSlice";
import { switchOffLoader } from "../../../utils/loaderSlice";

import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import SortIcon from "@mui/icons-material/Sort";
import FilterListOffIcon from "@mui/icons-material/FilterListOff";
import { checkIfLocationInDubai } from "../../../utils/commonFunction/checkBounds";


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function SearchResultsCar() {
  const dispatch = useDispatch();
  const [carList, setCarList] = useState([]);
  const [sortCarList, setSortCarList] = useState([]);
  const [sorting, setSorting] = useState();
  const [valueCheck, setValueCheck] = useState(0);
  const totalDays = useSelector(
    (store) => store.bookingInfoSlice.totalNumberOfDays
  );
  const carModalStatus = useSelector(
    (store) => store.modalToggleSlice.openCarModal
  );

  const [arrayOfCars,setArrayOfCars] = useState([]);

  useEffect(() => {
    dispatch(emptyInvoice());
    dispatch(clearUser());
    dispatch(emptyExtraArr());
  }, []);
  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url:
        "https://wticarrental.ae:3000/app/v1/vehicles/getSelfVehicles/" +
        totalDays,
    };

    try {
      axios
        .request(config)
        .then((response) => {
          setCarList(response.data.result);
          setSortCarList(response.data.result);
          dispatch(switchOffLoader());
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {}
  }, [totalDays]);

  useEffect(()=>{
  const uniqueNames = [...new Set(carList.map(item => item.type))];
  console.log(uniqueNames);
  setArrayOfCars(uniqueNames);
  },[carList])

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleCarSortList = (val) => {
    function getFirstPayNowValue(car) {
      for (const key in car.payNowPrice) {
        if (car.payNowPrice.hasOwnProperty(key)) {
          return car.payNowPrice[key];
        }
      }
    }

    let newArray = sortCarList.sort((a, b) => {
      const firstValueA = getFirstPayNowValue(a);
      const firstValueB = getFirstPayNowValue(b);
      if (val) {
        return firstValueA - firstValueB;
      } else {
        return firstValueB - firstValueA;
      }
    });
    setSortCarList(newArray);
  };

  const handleSorting = (e) => {
    console.log(e.target.value);
    setSorting(e.target.value == 0 ? true : false);
    handleCarSortList(e.target.value == 0 ? true : false);
    setValueCheck(valueCheck + 1);
  };

  const handleSortCanceling = () => {
    setValueCheck(0);
  };
  return (
    <>
      <div className="bg-white px-[10.27%] py-[2%] ">
        <div className="flex items-center justify-between pb-10">
          <div className="text-[#555555] block max-sm:hidden">
            <span className="border-r border-black pr-6">Self Drive Cars</span>
            <span className="font-bold text-black pl-6">Search Results</span> (
            {carList.length} vehicles available)
          </div>
          <div className="text-[#555555] hidden max-sm:block">
            <span className="font-bold text-black">Self Drive Cars</span>
            <br />
            <span className="font-bold text-black text-xs">
              Search Results
            </span>{" "}
            <br />{" "}
            <span className="text-xs">
              ({carList.length} vehicles available)
            </span>
          </div>
          <div className="flex max-sm:block">
            {/* <Tooltip title={sorting ? "Low to High" : "High to Low"}>
              <IconButton onClick={handleSorting}>
                <SortIcon
                  className={`${sorting ? "rotate-180" : "rotate-0"}`}
                />
              </IconButton>
            </Tooltip> */}
            <div className="flex items-center justify-end ">
              <label htmlFor="sorting" className="text-sm mr-2 max-sm:hidden">
                Sorting:{" "}
              </label>
              <select
                name="sorting"
                id="sorting"
                onChange={handleSorting}
                className="text-sm outline outline-[1px] rounded px-2 py-1 max-sm:w-[80%]"
              >
                <option value="" disabled selected>
                  Sort By Price
                </option>
                <option value="0">Price - Low to High</option>
                <option value="1">Price - High to Low</option>
              </select>
            </div>

            <div className="max-sm:flex max-sm:justify-end">
              <Tooltip title="Remove Sorting">
                <IconButton onClick={handleSortCanceling}>
                  <FilterListOffIcon />
                </IconButton>
              </Tooltip>
            </div>
          </div>
        </div>
        {valueCheck > 0 ? (
          <div className="grid grid-cols-2 gap-x-5 gap-y-6 pt-4 max-sm:grid-cols-1 max-sm:pt-2">
            {sortCarList.map((e, index) => (
              <div key={index}>
                <Cars sorted={true} handleClick={handleClick} carDetails={e} />
              </div>
            ))}
          </div>
        ) : (
          arrayOfCars.map((carCategory, index) => (
            <>{
              carList
              .filter((vehicle) => vehicle.type === carCategory).length != 0 ?
            <div key={index} className="mt-10 mb-10">
               <div
                key={index}
                className="underline underline-offset-4 decoration-[#555555] text-black pb-2 font-bold text-lg"
              >
                {carCategory}
              </div> 
              
              <div className="grid grid-cols-2 gap-x-5 gap-y-6 pt-4 max-sm:grid-cols-1 max-sm:pt-2">
                {carList
                  .filter((vehicle) => vehicle.type === carCategory)
                  .map((e, index) => (
                    <div key={index}>
                      <Cars
                        sorted={false}
                        handleClick={handleClick}
                        carDetails={e}
                      />
                    </div>
                  ))}
              </div>
            </div>
            : <></>
              }</>
          ))
        )}
      </div>

      <Stack spacing={2} sx={{ width: "100%", color: "white" }}>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity="info"
            sx={{ width: "100%", color: "white" }}
          >
            Currently Unavailable!
          </Alert>
        </Snackbar>
      </Stack>
    </>
  );
}

export default SearchResultsCar;
