import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useDispatch } from "react-redux";
import {
  switchToPayLater,
  switchToPayNow,
} from "../../../utils/CarSlices/carDetailSlice";
import { useSelector } from "react-redux";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import { ReactComponent as CarDoorIcon } from "./images/icons/car-door.svg";
import { ReactComponent as AirCondIcon } from "./images/icons/air-conditioner.svg";
import { ReactComponent as TransmissionIcon } from "./images/icons/transmission.svg";
import { addBaseRate } from "../../../utils/invoice/invoiceSlice";
import { switchOnStepThree } from "../../../utils/stepperSlice";
import { tillTwo } from "../../../utils/stepperSlice";
import { emptyExtraArr } from "../../../utils/extraSlice";
import { addInsuranceArr } from "../../../utils/insuranceSlice";
import { calculateExcessInsurance } from "../../../utils/commonFunction/calcExcessInsurance";

import {
  toggleCarDetail,
  addCarDetail,
} from "../../../utils/ModalSlice/modalToggleSlice";
import { switchCarModal } from "../../../utils/ModalSlice/modalToggleSlice";
import { switchOnLoader, switchOffLoader } from "../../../utils/loaderSlice";
import { addExcessInsurance } from "../../../utils/invoice/invoiceSlice";


function Cars(props) {
  console.log(props);
  const { state } = useLocation();
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const addSliceOneStatus = useSelector(
    (store) => store.addSliceOne.addSliceOne
  );
  const carObj = useSelector((store) => store.carDetailSlice.carDetailObj);
  const pickUpDes = useSelector(
    (store) => store.bookingInfoSlice.pickupLocation
  );
  const currencyPrice = useSelector(
    (store) => store.currencySlice.currentCurrRate
  );
  const currencyName = useSelector((store) => store.currencySlice.currentCurr);
  const totalDays = useSelector(
    (store) => store.bookingInfoSlice.totalNumberOfDays
  );

  const detailModalStatus = useSelector(
    (store) => store.modalToggleSlice.carDetail
  );

  const carModalStatus = useSelector(
    (store) => store.modalToggleSlice.openCarModal
  );
  //--> this use effect will disable all the stepper other than two
  useEffect(() => {
    //this change is done for new marketing adds
    if (!addSliceOneStatus) {
      if (pickUpDes == "") {
        navigate("/");
      }
    }

    if (!carModalStatus) {
      dispatch(tillTwo());
    }

    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const handlePayNow = (carData) => {
    // console.log(carData.excessInsuranceCharge);
    const excessInsurancePrice = calculateExcessInsurance(carData.excessInsuranceCharge,totalDays);
    dispatch(addExcessInsurance(excessInsurancePrice));
    dispatch(switchToPayNow(carData));
    dispatch(addInsuranceArr(carData.insuranceAndDamageCovers));
    if (!carModalStatus) {
      dispatch(emptyExtraArr());
    }
    dispatch(switchOnLoader());
    if (carModalStatus) {
      dispatch(switchCarModal());
      document.documentElement.style.overflow = "visible";
      dispatch(switchOffLoader());
    }
    // .toFixed(2))));
    dispatch(
      addBaseRate(
        parseInt(payNowArray[0]) +
          (parseInt(payNowArray[0]) * payNowPercentageArray[0]) / 100
      )
    );
    // *totalDays);
    dispatch(switchOnStepThree());
    if (pickUpDes == "") {
    } else {
      navigate("/reservation/extras");
    }
  };

  //note * -pay now = 0 and pay later = 1

  const handlePayLater = (carData) => {
    dispatch(switchToPayLater(carData));
    if (!carModalStatus) {
      dispatch(emptyExtraArr());
    }

    dispatch(switchOnLoader());
    if (carModalStatus) {
      dispatch(switchCarModal());
      document.documentElement.style.overflow = "visible";
      dispatch(switchOffLoader());
    }
    dispatch(
      addBaseRate(
        parseInt(payNowArray[0]) +
          parseInt(payNowArray[0]) * 0.06 +
          (parseInt(payNowArray[0]) * payNowPercentageArray[0]) / 100
      )
    );
    dispatch(switchOnStepThree());
    navigate("/reservation/extras");
  };

  const handleDetailModal = (carInfo) => {
    dispatch(addCarDetail(carInfo));
    dispatch(toggleCarDetail());
    document.documentElement.style.overflow = "hidden";
  };

  const payNowArray = Object.values(props?.carDetails?.payNowPrice);

  const payNowPercentageArray = Object.values(
    props?.carDetails?.percentageHikePayNow
  );

  console.log(
    process.env.PUBLIC_URL +
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
            classNa
            me={`object-cover ${
              props?.carDetails?.imageName == undefined
                ? "missing-image rounded mb-2"
                : ""
            }`}
          />
          {/* <LazyLoadImage
          // effect="blur"
      // alt={image.alt}
      // height={image.height}
      // src={props?.carDetails?.image[0].src} 
      // use normal <img> attributes as props
      // width={image.width} 
      /> */}
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
            <div className="w-auto flex justify-center items-center">
              <span
                className="text-[#092C85] underline font-normal text-xs cursor-pointer"
                onClick={() => handleDetailModal(props?.carDetails)}
              >
                More details+
              </span>
            </div>
          </div>
          <div className="flex max-sm:block justify-evenly mt-4">
            <div
              onClick={() => {
                // handlePayLater(props?.carDetails);
                props.handleClick();
              }}
              className="hover:cursor-pointer border border-blue-950 bg-white text-blue-950 px-5 py-2 text-[10px] text-center font-bold rounded max-sm:text-sm"
            >
              Pay Later <br /> {currencyName}
              {" " +
                (
                  (parseInt(payNowArray[0]) +
                    parseInt(payNowArray[0]) * 0.06 +
                    (parseInt(payNowArray[0]) * payNowPercentageArray[0]) /
                      100) *
                  totalDays *
                  currencyPrice
                ).toFixed(2)}
            </div>
            <div
              onClick={() => {
                handlePayNow(props?.carDetails);
              }}
              className="bg-blue-950 hover:cursor-pointer max-sm:mt-2 text-white px-5 py-2 text-[10px] font-bold rounded text-center max-sm:text-sm flex items-center justify-between max-sm:block"
            >
              <div className="flex items-center justify-center pr-2 group-hover:scale-[1.05] transition-all delay-1">
                Pay Now
              </div>
              <div>
                <div className="text-[11px] max-sm:text-sm">
                  {currencyName}
                  {" " +
                    (
                      (parseInt(payNowArray[0]) +
                        (parseInt(payNowArray[0]) * payNowPercentageArray[0]) /
                          100) *
                      totalDays *
                      currencyPrice
                    ).toFixed(2)}
                </div>

                <div className="line-through max-sm:mr-0 max-sm:text-[11px]">
                  {currencyName}
                  {" " +
                    (
                      (parseInt(payNowArray[0]) +
                        (parseInt(payNowArray[0]) * payNowPercentageArray[0]) /
                          100) *
                        totalDays *
                        currencyPrice +
                      (parseInt(payNowArray[0]) +
                        (parseInt(payNowArray[0]) * payNowPercentageArray[0]) /
                          100) *
                        totalDays *
                        currencyPrice *
                        0.15
                    ).toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cars;
