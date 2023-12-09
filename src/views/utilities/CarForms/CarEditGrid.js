import React, { useEffect, useRef } from "react";

import { useState } from "react";
import CarGridForm from "./CarGridForm";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Add from "@mui/icons-material/Add";

import axios from "axios";
// import { useSelector } from "react-redux";

function CarEditGrid() {
  const [newForm, setNew] = useState(false);
  const [form, setForm] = useState(false);
  const [obj, setObj] = useState({});
  const [tableUpdate, setTableUpdate] = useState(false);

  const [carData, setCarData] = useState({});
// eslint-disable-next-line no-unused-vars
  const [isActiveVehicles, setActiveVehicle] = useState({});

//   const adminUser = useSelector((store) => store.loginSlice.adminUser);
// const adminUser="checkeradmin@wti.ae";
// const adminUser = "admin@wti.ae";

  const formRef = useRef();

  useEffect(() => {
    try{
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://wticarrental.ae:3000/app/v1/vehicles/getAllSelfVehicles',
        headers: { }
      };
      
      axios.request(config)
      .then((response) => {
        setCarData(response.data);
        setActiveVehicle(response.data.result?.filter((vehicle) => !vehicle.isActive));
        // console.log(JSON.stringify(response.data.result));
      })
      .catch((error) => {
        console.log(error);
      });
    }
    catch(error){
      console.log(error + "Car Get API ")
    }
  },[tableUpdate])

  const handleEditClick = (val) => {
    let selectedArray = carData?.result.find(
      (obj) => obj.vehicleID === val
    );
    setObj(selectedArray);
    setForm(true);
  };

  const handleCancel = () => {
    setForm(false);
  };

  const handleAddClose = () => {
    setNew(false);
  }

  return (
    <>
    {
    newForm ? 
    <CarGridForm formNew={true} vehicleNumber={carData?.result.length}  setTableUpdate={setTableUpdate} closeForm={handleAddClose} /> 
    : 
    <div className="p-4">
        <div className="flex justify-between w-full">
          <div className="text-xl font-bold border-b border-slate-300 w-fit">
            Cars Edit
          </div>
          <div>
            <Tooltip title="Add Car" placement="left">
              <IconButton onClick={() => setNew(true)}>
                <Add className=" bg-blue-700 text-white rounded-full" />
              </IconButton>
            </Tooltip>
          </div>
        </div>

        <div className="h-[200px] overflow-y-auto border border-slate-300 mt-6">
          <table className="text-xs  w-full">
            <thead className="border border-slate-300 bg-white sticky top-[-1px]">
              <tr>
                <th className="border border-slate-300 p-2">Car Name</th>
                <th className="border border-slate-300 p-2 text-center">
                  Status
                </th>
                <th className="border border-slate-300 p-2 text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {carData?.result?.map((item ,key) => (
                <tr key={key}>
                  <td className="border border-slate-300 p-2">
                    {item?.imageName}
                  </td>
                  <td
                    className={`border border-slate-300 font-bold p-2 text-center ${
                      item?.isActive ? " text-green-600" : " text-red-500"
                    }`}
                  >
                    {item?.isActive ? "Active" : "Not Active"}
                  </td>
                  <td className="border border-slate-300 p-2 text-center">
                    <span
                      onClick={() => {
                        handleEditClick(item?.vehicleID);
                        formRef.current?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="underline text-blue-500 cursor-pointer"
                    >
                      Edit
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div ref={formRef} className="mt-6">
          {form ? (
            <>
              <CarGridForm formNew={false} obj={obj} setTableUpdate={setTableUpdate} closeForm={handleCancel} />
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
}
    </>
  );
}

export default CarEditGrid;