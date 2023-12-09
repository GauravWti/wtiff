import React, { useState } from "react";
import { useRef } from "react";
import FineComponent from "./FineComponent";
import { useEffect } from "react";
import axios from "axios";

function FinalInvoice() {
  const [items, setItems] = useState([]);
  const nextItemId = useRef(0);
  const [itemData, setItemData] = useState([]);
  const [resIDsave, setReservationID] = useState("");
  const [advFlag, setAdvFlag] = useState(false);
  const [finalFlag, setFinalFlag] = useState(false);
  const [advBillData, setAdvBillData] = useState({});

// eslint-disable-next-line no-unused-vars
  const [finalInvoiceID, setFinalInvoiceID] = useState("");

  const handleAddButtonClick = () => {
    setItems([...items, nextItemId.current]);
    nextItemId.current++;
  };

  const reservationID = useRef("");

  const handleFinalInvoiceSubmit = async () => {
    
// eslint-disable-next-line no-unused-vars
    let fineDataCollect = itemData.map(({ id: _, ...rest }) => rest);
    let data = {
      reservationID: resIDsave,
      finesAndTolls: fineDataCollect,
    };
    let reserveUpdateData = {
      reservationID: resIDsave,
      finalInvoice: true,
    };

    try {
      let response = await axios.post(
        "https://wticarrental.ae:3000/app/v1/invoice/createFinalInvoice",
        data
      );
      setFinalInvoiceID(response.data.invoiceID);

      let reservationUpdate = await axios.patch(
        "https://wticarrental.ae:3000/app/v1/reservation/updateReservationForFinalInvoice",
        reserveUpdateData
      );
      if (reservationUpdate.data.reservationUpdated) {
        setFinalFlag(true);
        setAdvFlag(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleReservationID = () => {
    setReservationID(reservationID.current.value);
    setAdvFlag(true);
    // console.log(reservationID.current.value);
  };

  useEffect(() => {
    const handleApiReservation = async () => {
      try {
        let result = await axios.get(
          `https://wticarrental.ae:3000/app/v1/invoice/getAdvanceInvoice/` +
            resIDsave
        );
        setAdvBillData(result.data.result);
        console.log(result.data.result);
      } catch (error) {
        console.log(error);
      }
    };
    if (resIDsave != "") {
      handleApiReservation();
    }
  }, [resIDsave]);

  const handleDeleteItem = (index) => {
    const updatedItems = items.filter((item) => item !== index);
    setItems(updatedItems);

    setItemData((prevData) => prevData.filter((data) => data.id !== index));
  };

  const handleSaveItem = (id, data) => {
    const newItemData = { id, ...data };

    setItemData((prevData) => [...prevData, newItemData]);

    const updatedItems = items.filter((item) => item !== id);
    setItems(updatedItems);
  };
  // console.log(itemData);
  // console.log("hello");
  return (
    <>
      <div className="p-4">
        <div className="text-xl font-bold border-b border-slate-300 w-fit">
          Final Invoice
        </div>
        {/* Enter Reservation ID Start  */}
        <div className="mt-3">
          <input
            ref={reservationID}
            type="text"
            placeholder="Enter Reservation ID"
            className="p-2 outline-none focus-visible:border-b-2 focus-visible:border-[#0f0a34] uppercase placeholder:normal-case mr-8 transition-all duration-300"
          />
          <input
            onClick={handleReservationID}
            type="button"
            value="Submit"
            className="px-4 py-2 cursor-pointer rounded text-sm text-white bg-[#0f0a34] hover:bg-white hover:text-[#0f0a34] border border-[#0f0a34] transition-all duration-300"
          />
        </div>
        {/* Enter Reservation ID End  */}
        {/* Advance Bill Start  */}
        {advFlag ? (
          <>
            <div className="mt-8">
              <div className="rounded border border-slate-300 flex justify-between ">
                <div className="w-[65%] border-r border-slate-300 p-4">
                  <div className=" flex justify-between items-center border-b border-slate-300 pb-2">
                    <div className="text-lg font-bold ">Advance Reciept</div>
                    <div>
                      <div className="text-xs">
                        <span className="w-[48%] mr-2">Reservation ID:</span>{" "}
                        <span className="font-bold w-[50%]">{resIDsave}</span>
                      </div>
                      <div className="text-xs">
                        <span className="w-[48%] mr-2">Advance Bill ID:</span>
                        <span className="font-bold w-[50%]">
                          {advBillData?.advanceInvoiceID}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <table className="text-xs mt-4 border border-slate-300 w-[50%]">
                      <tr>
                        <td className="border border-slate-300 p-2">
                          Base Rate
                        </td>
                        <td className="border border-slate-300 p-2 text-center">
                          {"AED "}
                          {advBillData?.baseRate}
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-slate-300 p-2">
                          Excess Insurance
                        </td>
                        <td className="border border-slate-300 p-2 text-center">
                          {"AED "}
                          {advBillData?.excessInsuranceCharge}
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-slate-300 p-2">
                          Delivery Charge
                        </td>
                        <td className="border border-slate-300 p-2 text-center">
                          {"AED "}
                          {advBillData?.deliveryCharge}
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-slate-300 p-2">
                          Collection Charge
                        </td>
                        <td className="border border-slate-300 p-2 text-center">
                          {"AED "}
                          {advBillData?.collectionCharge}
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-slate-300 p-2">Extras</td>
                        <td className="border border-slate-300 p-2 text-center">
                          {"AED "}
                          {advBillData?.addOnCharges}
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-slate-300 p-2">Taxes</td>
                        <td className="border border-slate-300 p-2 text-center">
                          {"AED "}
                          {advBillData?.taxes}
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-slate-300 p-2 font-bold text-sm">
                          Total
                        </td>
                        <td className="border border-slate-300 p-2 text-center font-bold text-sm">
                          {"AED "}
                          {advBillData?.totalCharges}
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
                <div className="w-[35%] my-auto mx-auto flex-col  ">
                  <div className="flex justify-center mb-9 ">
                  <h1 className="text-3xl ">Generate Invoice</h1>
                  </div>
                  <div
                    onClick={handleAddButtonClick}
                    className="px-4 py-2 w-fit m-auto cursor-pointer rounded text-sm text-white bg-[#0f0a34] hover:bg-white hover:text-[#0f0a34] border border-[#0f0a34] transition-all duration-300"
                  >
                    Add Fine
                  </div>
                  <div
                    onClick={handleFinalInvoiceSubmit}
                    className="px-4 py-2 w-fit m-auto mt-4 cursor-pointer rounded text-sm text-white bg-[#0f0a34] hover:bg-white hover:text-[#0f0a34] border border-[#0f0a34] transition-all duration-300"
                  >
                    Submit
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}

        {/* Advance Bill End  */}
        {/* Add Fine Start */}
        <div className="mt-8">
          {nextItemId.current === 0 ? (
            <></>
          ) : (
            <div className="text-xl font-bold border-b border-slate-300 w-fit">
              Fines
            </div>
          )}
          {itemData.length > 0 ? (
            <>
              <div className="mt-4">
                <table className="w-[100%] border border-slate-300">
                  <tr className="text-center">
                    <th className="border border-slate-300">S. No.</th>
                    <th className="border border-slate-300">Fine Name</th>
                    <th className="border border-slate-300">
                      Fine Description
                    </th>
                    <th className="border border-slate-300">Fine Amount</th>
                    <th className="border border-slate-300">Fine Image</th>
                  </tr>
                  {itemData.map((item, index) => (
                    <tr className="text-center p-2">
                      <td className="border border-slate-300">{index + 1}</td>
                      <td className="border border-slate-300">
                        {item.fineName}
                      </td>
                      <td className="border border-slate-300">
                        {item.fineDescription}
                      </td>
                      <td className="border border-slate-300">
                        {item.fineAmount}
                      </td>
                      <td className="border border-slate-300 p-2">
                        <img
                          src={item.fineImage}
                          className={`w-[150px] aspect-auto m-auto object-cover  rounded  hover:ring`}
                        />
                      </td>
                    </tr>
                  ))}
                </table>
              </div>
            </>
          ) : (
            <></>
          )}

          {items.map((index) => (
            <div key={index}>
              <FineComponent
                id={index}
                onDelete={() => handleDeleteItem(index)}
                onSave={handleSaveItem}
              />
            </div>
          ))}
        </div>
        {/* Add Fine End */}
        {/* Final Bill Start  */}
        {!advFlag && finalFlag ? (
          <>
            <div className="mt-8">
              <div className="rounded border border-slate-300 flex justify-between items-center">
                <div className="w-full p-4">
                  <div className="font-bold flex justify-between items-center border-b border-slate-300 pb-2">
                    <div className="text-lg ">Final Reciept</div>
                    <div className="text-sm">Reservation ID: {resIDsave}</div>
                  </div>
                  <div className="flex justify-center">
                    <table className="text-xs mt-4 border border-slate-300 w-[50%]">
                      <tr>
                        <td className="border border-slate-300 p-2">
                          Base Rate
                        </td>
                        <td className="border border-slate-300 p-2 text-center">
                          $40
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-slate-300 p-2">Extras</td>
                        <td className="border border-slate-300 p-2 text-center">
                          $40
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-slate-300 p-2">Taxes</td>
                        <td className="border border-slate-300 p-2 text-center">
                          $40
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-slate-300 p-2">Fines</td>
                        <td className="border border-slate-300 p-2 text-center">
                          $40
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-slate-300 p-2 font-bold text-sm">
                          Total
                        </td>
                        <td className="border border-slate-300 p-2 text-center font-bold text-sm">
                          $40
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}

        {/* Final Bill End  */}
      </div>
    </>
  );
}

export default FinalInvoice;
