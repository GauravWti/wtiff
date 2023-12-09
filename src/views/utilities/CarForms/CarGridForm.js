import React from "react";
import { useState } from "react";
import axios from "axios";

function CarGridForm(props) {
  const [update, setUpdate] = useState({
    vehicleID: props.obj?.vehicleID,
    imageName: props.obj?.imageName,
    type: props.obj?.type,
    title: props.obj?.title,
    seats: props.obj?.seats,
    luggageCapacity: props.obj?.luggageCapacity,
    transmissionType: props.obj?.transmissionType,
    ac: props.obj?.ac,
    doors: props.obj?.doors,
    insuranceAndDamageCovers: [
      {
        id: "01",
        name: "CDW",
        title: "Collision Damage Waiver (CDW)",
        checked: false,
        img: "",
        description:
          "Your solid back-up plan. With CDW, you are protected if your personal insurance or credit card doesn't cover you for losses from a stolen or damaged rental.",
        price: {
          daily: props.obj?.insuranceAndDamageCovers[0].price.daily,
          weekly: props.obj?.insuranceAndDamageCovers[0].price.weekly,
          monthly: props.obj?.insuranceAndDamageCovers[0].price.monthly,
        },
      },
    ],
    payNowPrice: {
      daily: props.obj?.payNowPrice.daily,
      weekly: props.obj?.payNowPrice.weekly,
      monthly: props.obj?.payNowPrice.monthly,
    },
    percentageHikePayNow: {
      daily: props.obj?.percentageHikePayNow.daily,
      weekly: props.obj?.percentageHikePayNow.weekly,
      monthly: props.obj?.percentageHikePayNow.monthly,
    },
    percentageHikePayLater: {
      daily: props.obj?.percentageHikePayLater.daily,
      weekly: props.obj?.percentageHikePayLater.weekly,
      monthly: props.obj?.percentageHikePayLater.monthly,
    },
    securityDeposit: props.obj?.securityDeposit,
    securityDepositInsurance: props.obj?.securityDepositInsurance,
    securityDepositFluctuations: {
      daily: props.obj?.securityDepositFluctuations.daily,
      weekly: props.obj?.securityDepositFluctuations.weekly,
      monthly: props.obj?.securityDepositFluctuations.monthly,
    },
    extraKmCharge: props.obj?.extraKmCharge,
    excessInsuranceCharge: props.obj?.excessInsuranceCharge,
    isActive: false,
    freeSale: false,
    fuelType: props.obj?.fuelType,
    onDemand: false,
  });
  const [data, setData] = useState({
    vehicleID: props.vehicleNumber + 1,
    imageName: "",
    type: "",
    title: "",
    seats: "",
    luggageCapacity: "",
    transmissionType: "",
    ac: "",
    doors: "",
    insuranceAndDamageCovers: [
      {
        id: "01",
        name: "CDW",
        title: "Collision Damage Waiver (CDW)",
        checked: false,
        img: "",
        description:
          "Your solid back-up plan. With CDW, you are protected if your personal insurance or credit card doesn't cover you for losses from a stolen or damaged rental.",
        price: {
          daily: "",
          weekly: "",
          monthly: "",
        },
      },
    ],
    payNowPrice: {
      daily: "",
      weekly: "",
      monthly: "",
    },
    percentageHikePayNow: {
      daily: "",
      weekly: "",
      monthly: "",
    },
    percentageHikePayLater: {
      daily: "",
      weekly: "",
      monthly: "",
    },
    securityDeposit: "",
    securityDepositInsurance: "",
    securityDepositFluctuations: {
      daily: "",
      weekly: "",
      monthly: "",
    },
    extraKmCharge: "",
    excessInsuranceCharge: "",
    isActive: false,
    freeSale: false,
    fuelType: "",
    onDemand: false,
  });
  
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setData({ ...data, [name]: value });
  // };

  const handleCarAddApi = () => {
    try {
      axios
        .post(
          "https://wticarrental.ae:3000/app/v1/vehicles/addSelfVehicles",
          data
        )
        .then(function (response) {
          props.setTableUpdate(true);
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCarUpdateApi = (value) => {
    let config;
    if (value == "approve") {
      config = {
        method: "patch",
        maxBodyLength: Infinity,
        url: "https://wticarrental.ae:3000/app/v1/vehicles/updateSelfVehicle",
        headers: {
          "Content-Type": "application/json",
        },
        data: { ...update, isActive: true },
      };
    } else {
      config = {
        method: "patch",
        maxBodyLength: Infinity,
        url: "https://wticarrental.ae:3000/app/v1/vehicles/updateSelfVehicle",
        headers: {
          "Content-Type": "application/json",
        },
        data: update,
      };
    }

    try {
      axios
        .request(config)
        .then((response) => {
          props.setTableUpdate(true);
          console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
    // console.log(update);
  };

  const handleChange = (key, value) => {
    if (props.formNew) {
      setData((prevState) => {
        // Create a copy of the state object
        const updatedRentalObject = { ...prevState };

        // Check if the key includes nested keys (e.g., "price.daily")
        if (key.includes(".")) {
          const keys = key.split(".");
          let nestedObj = updatedRentalObject;
          for (let i = 0; i < keys.length - 1; i++) {
            nestedObj = nestedObj[keys[i]];
          }
          nestedObj[keys[keys.length - 1]] = value;
        } else {
          updatedRentalObject[key] = value; // Update the value in the object
        }

        // Return the updated state
        return updatedRentalObject;
      });
    } else {
      setUpdate((prevState) => {
        // Create a copy of the state object
        const updatedRentalObject = { ...prevState };

        // Check if the key includes nested keys (e.g., "price.daily")
        if (key.includes(".")) {
          const keys = key.split(".");
          let nestedObj = updatedRentalObject;
          for (let i = 0; i < keys.length - 1; i++) {
            nestedObj = nestedObj[keys[i]];
          }
          nestedObj[keys[keys.length - 1]] = value;
        } else {
          updatedRentalObject[key] = value; // Update the value in the object
        }

        // Return the updated state
        return updatedRentalObject;
      });
    }
  };

  const handleSubmit = () => {
    if (props.formNew) {
      handleCarAddApi();
      // console.log(data);
    } else {
      if (props.approve) {
        // console.log(update);
        handleCarUpdateApi("approve");
      } else {
        // console.log(update);
        handleCarUpdateApi("update");
      }
    }
    props.closeForm();
  };

  console.log(props.obj);

  return (
    <>
      {" "}
      <div className="mt-2 w-full border border-slate-300 p-4 rounded ">
        <div className="text-xl font-bold border-b border-slate-300 w-fit">
          Cars Form
        </div>
        <hr className="my-6" />
        {/* Basic Car Details  */}
        <div className="text-lg font-bold border-b border-slate-300 w-fit mt-6">
          Basic Car Details
        </div>
        <div className="flex justify-between w-full mt-6">
          <div className="w-[33%]">
            <label htmlFor="vehicleID" className="text-sm w-full">
              Vehicle ID
            </label>
            <input
              id="vehicleID"
              name="vehicleID"
              type="number"
              value={props.formNew ? data?.vehicleID : update?.vehicleID}
              placeholder="Vehicle ID"
              className="p-2 bg-slate-300 rounded w-full outline-none focus-visible:border-b-2 focus-visible:border-[#0f0a34] placeholder:normal-case mr-8 transition-all duration-300"
            />
          </div>
          <div className="w-[33%]">
            <label htmlFor="imageName" className="text-sm w-full">
              Image Name
            </label>
            <input
              id="imageName"
              name="imageName"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              type="text"
              value={props.formNew ? data?.imageName : update?.imageName}
              placeholder="Image Name"
              className="p-2 bg-slate-300 rounded w-full outline-none focus-visible:border-b-2 focus-visible:border-[#0f0a34] placeholder:normal-case mr-8 transition-all duration-300"
            />
          </div>
          <div className="w-[33%]">
            <label htmlFor="carType" className="text-sm w-full">
              Car Type
            </label>
            <input
              id="carType"
              name="type"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              type="text"
              value={props.formNew ? data?.type : update?.type}
              placeholder="Car Type"
              className="p-2 bg-slate-300 rounded w-full outline-none focus-visible:border-b-2 focus-visible:border-[#0f0a34] placeholder:normal-case mr-8 transition-all duration-300"
            />
          </div>
        </div>
        <div className="flex justify-between w-full mt-6">
          <div className="w-[50%]">
            <label htmlFor="carTitle" className="text-sm w-full">
              Car Title
            </label>
            <input
              id="carTitle"
              name="title"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              type="text"
              value={props.formNew ? data?.title : update?.title}
              placeholder="Car Title"
              className="p-2 bg-slate-300 rounded w-full outline-none focus-visible:border-b-2 focus-visible:border-[#0f0a34] placeholder:normal-case mr-8 transition-all duration-300"
            />
          </div>
        </div>
        <hr className="my-6" />
        {/* Car Features  */}
        <div className="text-lg font-bold border-b border-slate-300 w-fit mt-4">
          Car Features
        </div>
        <div className="flex justify-between w-full mt-6">
          <div className="w-[33%]">
            <label htmlFor="seats" className="text-sm w-full">
              Seats
            </label>
            <input
              id="seats"
              name="seats"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              type="text"
              value={props.formNew ? data?.seats : update?.seats}
              placeholder="Seats"
              className="p-2 bg-slate-300 rounded w-full outline-none focus-visible:border-b-2 focus-visible:border-[#0f0a34] placeholder:normal-case mr-8 transition-all duration-300"
            />
          </div>
          <div className="w-[33%]">
            <label htmlFor="luggage" className="text-sm w-full">
              Luggage Capacity
            </label>
            <input
              id="luggage"
              name="luggageCapacity"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              type="text"
              value={
                props.formNew ? data?.luggageCapacity : update?.luggageCapacity
              }
              placeholder="Luggage Capacity"
              className="p-2 bg-slate-300 rounded w-full outline-none focus-visible:border-b-2 focus-visible:border-[#0f0a34] placeholder:normal-case mr-8 transition-all duration-300"
            />
          </div>
          <div className="w-[33%]">
            <label htmlFor="transmission" className="text-sm w-full">
              Transmission Type
            </label>
            <input
              id="transmission"
              name="transmissionType"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              type="text"
              value={
                props.formNew
                  ? data?.transmissionType
                  : update?.transmissionType
              }
              placeholder="Transmission Type"
              className="p-2 bg-slate-300 rounded w-full outline-none focus-visible:border-b-2 focus-visible:border-[#0f0a34] placeholder:normal-case mr-8 transition-all duration-300"
            />
          </div>
        </div>
        <div className="flex justify-between w-full mt-6">
          <div className="w-[33%]">
            <label htmlFor="ac" className="text-sm w-full">
              AC
            </label>
            <select
              value={props.formNew ? data?.ac : update?.ac}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              name="ac"
              id="ac"
              className="p-2 bg-slate-300 rounded w-full outline-none focus-visible:border-b-2 focus-visible:border-[#0f0a34] placeholder:normal-case mr-8 transition-all duration-300"
            >
              <option value="" disabled>
                Select AC
              </option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div className="w-[33%]">
            <label htmlFor="doors" className="text-sm w-full">
              Doors
            </label>
            <input
              id="doors"
              name="doors"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              type="text"
              value={props.formNew ? data?.doors : update?.doors}
              placeholder="Doors"
              className="p-2 bg-slate-300 rounded w-full outline-none focus-visible:border-b-2 focus-visible:border-[#0f0a34] placeholder:normal-case mr-8 transition-all duration-300"
            />
          </div>
          <div className="w-[33%]">
            <label htmlFor="fuelType" className="text-sm w-full">
              Fuel Type
            </label>
            <select
              value={props.formNew ? data?.fuelType : update?.fuelType}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              name="fuelType"
              id="fuelType"
              className="p-2 bg-slate-300 rounded w-full outline-none focus-visible:border-b-2 focus-visible:border-[#0f0a34] placeholder:normal-case mr-8 transition-all duration-300"
            >
              <option value="" disabled>
                Select Fuel Type
              </option>
              <option value="petrol">Petrol</option>
              <option value="diesel">Diesel</option>
              <option value="electric">Electric</option>
            </select>
          </div>
        </div>
        <hr className="my-6" />
        {/* Insurance and Damage Covers  */}
        <div className="text-lg font-bold border-b border-slate-300 w-fit mt-4">
          Insurance and Damage Covers
        </div>

        <div className="text-base font-bold border-b border-slate-300 w-fit mt-4">
          CDW
        </div>
        <p className="text-sm mt-2 ml-[4px]"></p>
        <div className="flex justify-between w-full mt-6">
          <div className="w-[33%]">
            <label htmlFor="dailyInsurance" className="text-sm w-full">
              Daily
            </label>
            <input
              id="daily"
              name="insuranceAndDamageCovers.0.price.daily"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              type="number"
              value={
                props.formNew
                  ? data?.insuranceAndDamageCovers[0].price.daily
                  : update?.insuranceAndDamageCovers[0].price.daily
              }
              placeholder="Daily"
              className="p-2 bg-slate-300 rounded w-full outline-none focus-visible:border-b-2 focus-visible:border-[#0f0a34] placeholder:normal-case mr-8 transition-all duration-300"
            />
          </div>
          <div className="w-[33%]">
            <label htmlFor="weekly" className="text-sm w-full">
              Weekly
            </label>
            <input
              id="weekly"
              name="insuranceAndDamageCovers.0.price.weekly"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              type="number"
              value={
                props.formNew
                  ? data?.insuranceAndDamageCovers[0].price.weekly
                  : update?.insuranceAndDamageCovers[0].price.weekly
              }
              placeholder="Weekly"
              className="p-2 bg-slate-300 rounded w-full outline-none focus-visible:border-b-2 focus-visible:border-[#0f0a34] placeholder:normal-case mr-8 transition-all duration-300"
            />
          </div>
          <div className="w-[33%]">
            <label htmlFor="monthly" className="text-sm w-full">
              Monthly
            </label>
            <input
              id="monthly"
              name="insuranceAndDamageCovers.0.price.monthly"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              type="number"
              value={
                props.formNew
                  ? data?.insuranceAndDamageCovers[0].price.monthly
                  : update?.insuranceAndDamageCovers[0].price.monthly
              }
              placeholder="Monthly"
              className="p-2 bg-slate-300 rounded w-full outline-none focus-visible:border-b-2 focus-visible:border-[#0f0a34] placeholder:normal-case mr-8 transition-all duration-300"
            />
          </div>
        </div>

        <hr className="my-6" />
        {/* Price and Hikes  */}
        <div className="text-lg font-bold border-b border-slate-300 w-fit mt-4">
          Price and Hikes
        </div>
        <div className="text-base font-bold border-b border-slate-300 w-fit mt-4">
          Free Sales/ On Demand
        </div>
        <div className="flex justify-between w-full mt-6">
          <div className="w-[33%]">
            <label htmlFor="freeSale" className="text-sm w-full">
              Free Sales
            </label>
            <select
              value={props.formNew ? data?.freeSale : update?.freeSale}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              name="freeSale"
              id="freeSale"
              className="p-2 bg-slate-300 rounded w-full outline-none focus-visible:border-b-2 focus-visible:border-[#0f0a34] placeholder:normal-case mr-8 transition-all duration-300"
            >
              <option value="" disabled>
                Select Free Sale
              </option>
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
          <div className="w-[33%]">
            <label htmlFor="freeSale" className="text-sm w-full">
              On Demand
            </label>
            <select
              value={props.formNew ? data?.onDemand : update?.onDemand}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              name="onDemand"
              id="onDemand"
              className="p-2 bg-slate-300 rounded w-full outline-none focus-visible:border-b-2 focus-visible:border-[#0f0a34] placeholder:normal-case mr-8 transition-all duration-300"
            >
              <option value="" disabled>
                Select On Demand
              </option>
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
          <div className="w-[33%] EmptyDIV">

          </div>
        </div>
        <div className="text-base font-bold border-b border-slate-300 w-fit mt-4">
          Pay Now Price
        </div>
        <div className="flex justify-between w-full mt-6">
          <div className="w-[33%]">
            <label htmlFor="daily" className="text-sm w-full">
              Daily
            </label>
            <input
              id="dailyPayNow"
              name="payNowPrice.daily"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              type="number"
              value={
                props.formNew
                  ? data?.payNowPrice.daily
                  : update?.payNowPrice.daily
              }
              placeholder="Daily"
              className="p-2 bg-slate-300 rounded w-full outline-none focus-visible:border-b-2 focus-visible:border-[#0f0a34] placeholder:normal-case mr-8 transition-all duration-300"
            />
          </div>
          <div className="w-[33%]">
            <label htmlFor="weekly" className="text-sm w-full">
              Weekly
            </label>
            <input
              id="weeklyPayNow"
              name="payNowPrice.weekly"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              type="number"
              value={
                props.formNew
                  ? data?.payNowPrice.weekly
                  : update?.payNowPrice.weekly
              }
              placeholder="Weekly"
              className="p-2 bg-slate-300 rounded w-full outline-none focus-visible:border-b-2 focus-visible:border-[#0f0a34] placeholder:normal-case mr-8 transition-all duration-300"
            />
          </div>
          <div className="w-[33%]">
            <label htmlFor="monthly" className="text-sm w-full">
              Monthly
            </label>
            <input
              id="monthlyPayNow"
              name="payNowPrice.monthly"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              type="number"
              value={
                props.formNew
                  ? data?.payNowPrice.monthly
                  : update?.payNowPrice.monthly
              }
              placeholder="Monthly"
              className="p-2 bg-slate-300 rounded w-full outline-none focus-visible:border-b-2 focus-visible:border-[#0f0a34] placeholder:normal-case mr-8 transition-all duration-300"
            />
          </div>
        </div>
        <div className="text-base font-bold border-b border-slate-300 w-fit mt-4">
          Percentage Hike Pay Now
        </div>
        <div className="flex justify-between w-full mt-6">
          <div className="w-[33%]">
            <label htmlFor="dailyPercHike" className="text-sm w-full">
              Daily
            </label>
            <input
              id="dailyPercHike"
              name="percentageHikePayNow.daily"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              type="number"
              value={
                props.formNew
                  ? data?.percentageHikePayNow.daily
                  : update?.percentageHikePayNow.daily
              }
              placeholder="Daily"
              className="p-2 bg-slate-300 rounded w-full outline-none focus-visible:border-b-2 focus-visible:border-[#0f0a34] placeholder:normal-case mr-8 transition-all duration-300"
            />
          </div>
          <div className="w-[33%]">
            <label htmlFor="weeklyPercHike" className="text-sm w-full">
              Weekly
            </label>
            <input
              id="weeklyPercHike"
              name="percentageHikePayNow.weekly"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              type="number"
              value={
                props.formNew
                  ? data?.percentageHikePayNow.weekly
                  : update?.percentageHikePayNow.weekly
              }
              placeholder="Weekly"
              className="p-2 bg-slate-300 rounded w-full outline-none focus-visible:border-b-2 focus-visible:border-[#0f0a34] placeholder:normal-case mr-8 transition-all duration-300"
            />
          </div>
          <div className="w-[33%]">
            <label htmlFor="monthlyPercHike" className="text-sm w-full">
              Monthly
            </label>
            <input
              id="monthlyPercHike"
              name="percentageHikePayNow.monthly"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              type="number"
              value={
                props.formNew
                  ? data?.percentageHikePayNow.monthly
                  : update?.percentageHikePayNow.monthly
              }
              placeholder="Monthly"
              className="p-2 bg-slate-300 rounded w-full outline-none focus-visible:border-b-2 focus-visible:border-[#0f0a34] placeholder:normal-case mr-8 transition-all duration-300"
            />
          </div>
        </div>
        <div className="text-base font-bold border-b border-slate-300 w-fit mt-4">
          Percentage Hike Pay Later
        </div>
        <div className="flex justify-between w-full mt-6">
          <div className="w-[33%]">
            <label htmlFor="dailyPerHikeLater" className="text-sm w-full">
              Daily
            </label>
            <input
              id="dailyPerHikeLater"
              name="percentageHikePayLater.daily"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              type="number"
              value={
                props.formNew
                  ? data?.percentageHikePayLater.daily
                  : update?.percentageHikePayLater.daily
              }
              placeholder="Daily"
              className="p-2 bg-slate-300 rounded w-full outline-none focus-visible:border-b-2 focus-visible:border-[#0f0a34] placeholder:normal-case mr-8 transition-all duration-300"
            />
          </div>
          <div className="w-[33%]">
            <label htmlFor="weeklyPerHikeLater" className="text-sm w-full">
              Weekly
            </label>
            <input
              id="weeklyPerHikeLater"
              name="percentageHikePayLater.weekly"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              type="number"
              value={
                props.formNew
                  ? data?.percentageHikePayLater.weekly
                  : update?.percentageHikePayLater.weekly
              }
              placeholder="Weekly"
              className="p-2 bg-slate-300 rounded w-full outline-none focus-visible:border-b-2 focus-visible:border-[#0f0a34] placeholder:normal-case mr-8 transition-all duration-300"
            />
          </div>
          <div className="w-[33%]">
            <label htmlFor="monthlyPerHikeLater" className="text-sm w-full">
              Monthly
            </label>
            <input
              id="monthlyPerHikeLater"
              name="percentageHikePayLater.monthly"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              type="number"
              value={
                props.formNew
                  ? data?.percentageHikePayLater.monthly
                  : update?.percentageHikePayLater.monthly
              }
              placeholder="Monthly"
              className="p-2 bg-slate-300 rounded w-full outline-none focus-visible:border-b-2 focus-visible:border-[#0f0a34] placeholder:normal-case mr-8 transition-all duration-300"
            />
          </div>
        </div>
        <hr className="my-6" />
        {/* Security Deposit  */}
        <div className="text-base font-bold border-b border-slate-300 w-fit mt-4">
          Security Deposit
        </div>
        <div className="flex justify-between w-full mt-6">
          <div className="w-[100%]">
            <label htmlFor="securityDeposit" className="text-sm w-full">
              Security Deposit
            </label>
            <input
              id="securityDeposit"
              name="securityDeposit"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              type="number"
              value={
                props.formNew ? data?.securityDeposit : update?.securityDeposit
              }
              placeholder="Security Deposit"
              className="p-2 bg-slate-300 rounded w-full outline-none focus-visible:border-b-2 focus-visible:border-[#0f0a34] placeholder:normal-case mr-8 transition-all duration-300"
            />
          </div>
          {/* <div className="w-[49%]">
            <label
              htmlFor="securityDepositInsurance"
              className="text-sm w-full"
            >
              Security Deposit Insurance
            </label>
            <input
              id="securityDepositInsurance"
              name="securityDepositInsurance"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              type="text"
              value={
                props.formNew
                  ? data?.securityDepositInsurance
                  : update?.securityDepositInsurance
              }
              placeholder="Security Deposit Insurance"
              className="p-2 bg-slate-300 rounded w-full outline-none focus-visible:border-b-2 focus-visible:border-[#0f0a34] placeholder:normal-case mr-8 transition-all duration-300"
            />
          </div> */}
        </div>
        <div className="text-base font-bold border-b border-slate-300 w-fit mt-4">
          Security Deposit Fluctuations
        </div>
        <div className="flex justify-between w-full mt-6">
          <div className="w-[33%]">
            <label htmlFor="dailySecDepFluctuation" className="text-sm w-full">
              Daily
            </label>
            <input
              id="dailySecDepFluctuation"
              name="securityDepositFluctuations.daily"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              type="number"
              value={
                props.formNew
                  ? data?.securityDepositFluctuations.daily
                  : update?.securityDepositFluctuations.daily
              }
              placeholder="Daily"
              className="p-2 bg-slate-300 rounded w-full outline-none focus-visible:border-b-2 focus-visible:border-[#0f0a34] placeholder:normal-case mr-8 transition-all duration-300"
            />
          </div>
          <div className="w-[33%]">
            <label htmlFor="weeklySecDepFluctuation" className="text-sm w-full">
              Weekly
            </label>
            <input
              id="weeklySecDepFluctuation"
              name="securityDepositFluctuations.weekly"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              type="number"
              value={
                props.formNew
                  ? data?.securityDepositFluctuations.weekly
                  : update?.securityDepositFluctuations.weekly
              }
              placeholder="Weekly"
              className="p-2 bg-slate-300 rounded w-full outline-none focus-visible:border-b-2 focus-visible:border-[#0f0a34] placeholder:normal-case mr-8 transition-all duration-300"
            />
          </div>
          <div className="w-[33%]">
            <label
              htmlFor="monthlySecDepFluctuation"
              className="text-sm w-full"
            >
              Monthly
            </label>
            <input
              id="monthlySecDepFluctuation"
              name="securityDepositFluctuations.monthly"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              type="number"
              value={
                props.formNew
                  ? data?.securityDepositFluctuations.monthly
                  : update?.securityDepositFluctuations.monthly
              }
              placeholder="Monthly"
              className="p-2 bg-slate-300 rounded w-full outline-none focus-visible:border-b-2 focus-visible:border-[#0f0a34] placeholder:normal-case mr-8 transition-all duration-300"
            />
          </div>
        </div>
        <hr className="my-6" />
        {/* Extra Charges  */}
        <div className="text-base font-bold border-b border-slate-300 w-fit mt-4">
          Extra Charges
        </div>
        <div className="flex justify-between w-full mt-6">
          <div className="w-[49%]">
            <label htmlFor="extraKMCharges" className="text-sm w-full">
              Extra KM Charges
            </label>
            <input
              id="extraKMCharges"
              name="extraKmCharge"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              type="number"
              value={
                props.formNew ? data?.extraKmCharge : update?.extraKmCharge
              }
              placeholder="Extra KM Charges"
              className="p-2 bg-slate-300 rounded w-full outline-none focus-visible:border-b-2 focus-visible:border-[#0f0a34] placeholder:normal-case mr-8 transition-all duration-300"
            />
          </div>
          <div className="w-[49%]">
            <label htmlFor="excessInsuranceCharge" className="text-sm w-full">
              Excess Insurance Charge
            </label>
            <input
              id="excessInsuranceCharge"
              name="excessInsuranceCharge"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              type="number"
              value={
                props.formNew
                  ? data?.excessInsuranceCharge
                  : update?.excessInsuranceCharge
              }
              placeholder="Excess Insurance Charge"
              className="p-2 bg-slate-300 rounded w-full outline-none focus-visible:border-b-2 focus-visible:border-[#0f0a34] placeholder:normal-case mr-8 transition-all duration-300"
            />
          </div>
        </div>
      </div>
      <div className="w-full mt-8 flex justify-end items-center">
        <div
          onClick={handleSubmit}
          className="px-4 py-2 cursor-pointer rounded text-sm text-white bg-[#0f0a34] border border-[#0f0a34] transition-all duration-300 mr-4 hover:ring hover:ring-[#0f0a34ab]"
        >
          {props.approve ? "Approve" : "Submit"}
        </div>

        <div
          onClick={() => props.closeForm()}
          className="px-4 py-2 cursor-pointer rounded text-sm bg-white text-[#0f0a34] border border-[#0f0a34] hover:text-red-500 hover:border-red-500 transition-all duration-300"
        >
          Cancel
        </div>
      </div>
    </>
  );
}

export default CarGridForm;
