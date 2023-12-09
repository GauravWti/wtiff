
import React from "react";
import PersonIcon from "@mui/icons-material/Person";
// eslint-disable-next-line no-unused-vars
import { useSelector } from "react-redux";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import { ReactComponent as CarDoorIcon } from "../../../assets/images/carSearchResults/images/icons/car-door.svg";
import { ReactComponent as AirCondIcon } from "../../../assets/images/carSearchResults/images/icons/air-conditioner.svg";
import { ReactComponent as TransmissionIcon } from "../../../assets/images/carSearchResults/images/icons/transmission.svg";

// import { ReactComponent as CarDoorIcon } from "../../carSelectType/carSearchResults/images/icons/car-door.svg";
// import { ReactComponent as AirCondIcon } from "../../carSelectType/carSearchResults/images/icons/air-conditioner.svg";
// import { ReactComponent as TransmissionIcon } from "../../carSelectType/carSearchResults/images/icons/transmission.svg";

function BookingCarCard(props) {

  console.log(props);

  let payNowArray;

  if (props.totalDays < 7) {
    payNowArray = props?.carDetails?.payNowPrice?.daily;
  } else if (props.totalDays > 7 && props.totalDays < 30) {
    payNowArray = props?.carDetails?.payNowPrice?.weekly / 7;
  } else {
    payNowArray = props?.carDetails?.payNowPrice?.monthly / 30;
  }

  let payNowPercentageArray;

  if (props.totalDays < 7) {
    payNowPercentageArray = props?.carDetails?.percentageHikePayNow?.daily;
  } else if (props.totalDays > 7 && props.totalDays < 30) {
    payNowPercentageArray = props?.carDetails?.percentageHikePayNow?.weekly;
  } else {
    payNowPercentageArray = props?.carDetails?.percentageHikePayNow?.monthly;
  }

  //   const payNowPercentageArray = Object.values(
  //     props?.carDetails?.percentageHikePayNow
  //   );

  console.log(
      "/images/" +
      props?.carDetails?.imageName.split(" ").join("") +
      ".png"
  );
  return (
    <>
      <div className="shadow-lg hover:ring-[2px] hover:ring-[#172554] rounded max-sm:block flex justify-between p-4">
        <div className="hidden max-sm:block">
          {/* <div className="">{props?.carDetails?.type}</div> */}
          <div className="font-bold text-base">{props?.carDetails?.title}</div>
          <div className="mt-1 text-sm flex justify-between items-center">
            <div>or similar</div>
            <div className={`text-xs ${props.sorted ? "block" : "hidden"}`}>
              ({props?.carDetails?.type})
            </div>
          </div>
        </div>
        <div className="w-[38%] max-sm:w-full max-sm:mt-2 flex items-center justify-center">
          <img
            src={
              process.env.PUBLIC_URL +
              "/images/" +
              (props.carDetails.imageName
                ? props?.carDetails?.imageName.split(" ").join("")
                : "static") +
              ".png"
            }
            alt=""
            onError={(e) => {
              e.target.src = "../static/staticcarimage.png";
            }}
            className={`object-cover ${
              props?.carDetails?.imageName == undefined
                ? "missing-image rounded mb-2"
                : ""
            }`}
          />
        </div>
        <div className="w-[60%] max-sm:w-full">
          <div className="max-sm:hidden block">
            <div className="font-bold text-base">
              {props?.carDetails?.title.replace(" or similar", "")}
            </div>
            <div className="mt-1 text-sm flex justify-between items-center">
              <div>or similar</div>
              <div className={`text-xs ${props.sorted ? "block" : "hidden"}`}>
                ({props?.carDetails?.type})
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-4">
            <div className=" w-auto  flex justify-center items-center">
              <div className="mr-2 flex items-center">
                <PersonIcon className="text-base" />
              </div>
              <div className="text-[11px]">
                {props?.carDetails?.seats + " Passenger"}
              </div>
            </div>
            <div className="w-auto  flex justify-center items-center">
              <div className="mr-2 flex items-center">
                <BusinessCenterIcon className="text-base" />
              </div>
              <div className="text-[11px]">
                {props?.carDetails?.luggageCapacity + " Suitcases"}
              </div>
            </div>
            <div className=" w-auto  flex justify-center items-center">
              <div className="mr-2 flex items-center">
                <CarDoorIcon className="text-base text-black" />
              </div>
              <div className="text-[11px]">
                {props?.carDetails?.doors + " Doors"}
              </div>
            </div>
            <div className="w-auto  flex justify-center items-center">
              <div className="mr-2 flex items-center">
                <AirCondIcon className="text-base" />
              </div>
              <div className="text-[11px]">
                {props?.carDetails?.ac.toLowerCase() == "yes"
                  ? "Air Condition"
                  : "No A/C"}
              </div>
            </div>
            <div className="w-auto flex justify-center items-center">
              <div className="mr-2 flex items-center">
                {" "}
                <TransmissionIcon className="text-base" />
              </div>
              <div className="text-[11px]">
                {props?.carDetails?.transmissionType.charAt(0).toUpperCase() +
                  props?.carDetails?.transmissionType.slice(1)}
              </div>
            </div>
          </div>
          <div className="flex max-sm:block justify-evenly mt-4">
            {/* <div
              className="hover:cursor-pointer border border-blue-950 bg-white text-blue-950 px-5 py-2 text-[10px] text-center font-bold rounded max-sm:text-sm"
            >
              Pay Later <br /> AED
              {" " +
                (
                  (parseInt(payNowArray) +
                    parseInt(payNowArray) * 0.06 +
                    (parseInt(payNowArray) * payNowPercentageArray) /
                      100) *
                  props.totalDays
                ).toFixed(2)}
            </div> */}
            <div className="bg-blue-950 hover:cursor-pointer max-sm:mt-2 text-white px-5 py-2 text-[10px] font-bold rounded text-center max-sm:text-sm flex items-center justify-between max-sm:block">
              <div className="flex items-center justify-center pr-2 group-hover:scale-[1.05] transition-all delay-1">
                Price
              </div>
              <div>
                <div className="text-[11px] max-sm:text-sm">
                  AED
                  {" " +
                    (
                      (parseInt(payNowArray) +
                        (parseInt(payNowArray) * payNowPercentageArray) / 100) *
                      props.totalDays
                    ).toFixed(2) + " for " + props.totalDays + (props.totalDays > 1 ?  " days" : " day") }
                </div>

                {/* <div className="line-through max-sm:mr-0 max-sm:text-[11px]">
                  AED
                  {" " +
                    (
                      (parseInt(payNowArray) +
                        (parseInt(payNowArray) * payNowPercentageArray) / 100) *
                        props.totalDays +
                      (parseInt(payNowArray) +
                        (parseInt(payNowArray) * payNowPercentageArray) / 100) *
                        props.totalDays *
                        0.15
                    ).toFixed(2)}
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BookingCarCard;
