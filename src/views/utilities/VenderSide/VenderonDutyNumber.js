// VenderonDutyNumber.jsx

import React from 'react';

const VenderonDutyNumber = ({ data }) => {
  return (
    <tr>
      <td className="border px-2 py-2">{data.cartype}</td>
      <td className="border px-2 py-2">{data.ondutycar}</td>
      <td className="border px-2 py-2">{data.notAssign}</td>
      <td className="border px-2 py-2">{data.complete}</td>
      <td className="border px-2 py-2">{data.pending}</td>


    </tr>
  );
};

export default VenderonDutyNumber;
