import React, { useState } from 'react';
import DownloadIcon from '@mui/icons-material/Download';
import LinearProgress from '@mui/material/LinearProgress';

const AdvancedReciptRaw = ({ data }) => {
  const [loading, setLoading] = useState(false);

  function convertToReadableDate(timestamp) {
    const dateObject = new Date(timestamp);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const formattedDate = dateObject.toLocaleDateString('en-US', options);
    return formattedDate;
  }

  const issueDate = convertToReadableDate(data.advanceInvoiceDate.issueDate);
  const dueDate = convertToReadableDate(data.advanceInvoiceDate.dueDate);

  const downloadRecipt = async (id) => {
    console.log('Download Receipt called with ID:', id);
    setLoading(true);

    try {
      const response = await fetch(`https://wticarrental.ae:3000/app/v1/user/printConfirmation/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `receipt_${id}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      window.alert('Pdf Downloaded');
    } catch (error) {
      console.error('Error downloading PDF:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <tr className="text-[5px] sm:text-[10px] bg-blue-900 text-white">
        <td className=" sm:py-2 sm:px-2 border">{data.advanceInvoiceID}</td>
        <td className="sm:py-2 sm:px-2 border">{data.reservationID}</td>
        <td className="sm:py-2 sm:px-2 border">{data.userID}</td>
        <td className="sm:py-2 sm:px-2 border">{issueDate}</td>
        <td className="sm:py-2 sm:px-2 border">{dueDate}</td>
        <td className="sm:py-2 sm:px-2 border">{data.totalCharges}</td>
        <td className="sm:py-2 sm:px-2 border">{data.paymentStatus}</td>
        <td className="sm:py-2 sm:px-2 border">{data.paymentMethod}</td>
        <td className="sm:py-2 sm:px-2 border cursor-pointer">
          <button onClick={() => downloadRecipt(data.reservationID)}>
            <DownloadIcon />
          </button>
          {loading && <LinearProgress color="primary" />}
        </td>
      </tr>
    </>
  );
};

export default AdvancedReciptRaw;
