import React from "react";
import { useState } from "react";
import { BackendUrl } from "utils/config";

const AddOperator=()=>{
    const[operatorName, setOperatorName]=useState('');
    // const [selectedFile, setSelectedFile] = useState(null);
    const[phone,setPhone] =useState('');
    const[email, setEmail]=useState('');
    const[address, setAddress]=useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          if (operatorName === '' || phone === '' || email === '' || address === '') {
            window.alert('Fill in all data');
            return;
          } else {
            
            const response = await fetch(`${BackendUrl}/0auth/operator/addnewOperator`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                OperatorName: operatorName,
                contact: {
                  address: address,
                  number: phone,
                  email: email,
                }
              }),
              credentials: 'include',
            });
      
            const responseData = await response.json();
            console.log(responseData);
      
            if (response.status === 201) {
              window.alert('New Operator added');
              window.location.reload(); // Reload the page
            } else {
              console.error('Failed to New Operator');
            }
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };



    return(
        <>
         <div className="flex flex-col justify-center  mt-4  ">
                <h2 className="font-extrabold text-4xl my-10 text-blue-950 text-center">Add New Operator</h2>
                <div className="flex justify-center ">
                    <div className="w-3/4 md:w-2/5 shadow-2xl px-4 md:px-24 py-10 box-content rounded-xl">
                    <form className="mt-6 flex flex-col gap-3" onSubmit={handleSubmit}>
                        <div className="">
                        <label htmlFor="operatorName" className="text-left  block text-sm font-semibold text-gray-800">
                            Operator Name
                        </label>
                        <input
                            required={true}
                            onChange={(e) => setOperatorName(e.target.value)}
                            className="block w-full px-4 py-2 mt-2 text-[#053B50] bg-white border-black border-[1px] rounded-md focus:border-[#053B50] focus:ring-[#053B50] focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                        </div>
                        <div className="">
                        <label htmlFor="Phone" className="text-left  block text-sm font-semibold text-gray-800">
                            Phone number
                        </label>
                        <input
                            required={true}
                            onChange={(e) => setPhone(e.target.value)}
                            className="block w-full px-4 py-2 mt-2 text-[#053B50] border-black border-[1px] bg-white  rounded-md focus:border-[#053B50] focus:ring-[#053B50] focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                        </div>
                        <div className="">
                        <label htmlFor="Email" className="text-left  block text-sm font-semibold text-gray-800">
                            Email
                        </label>
                        <input
                            
                            onChange={(e) => setEmail(e.target.value)}
                            className="block w-full border-black border-[1px] px-4 py-2 mt-2 text-[#053B50] bg-white  rounded-md focus:border-[#053B50] focus:ring-[#053B50] focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                        </div>
                        <div className="">
                        <label htmlFor="Address" className="text-left  block text-sm font-semibold text-gray-800">
                            Address
                        </label>
                        <input
                            required={true}
                            onChange={(e) => setAddress(e.target.value)}
                            className="block w-full px-4 py-2 mt-2 text-[#053B50] border-black border-[1px] bg-white  rounded-md focus:border-[#053B50] focus:ring-[#053B50] focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                        </div>
                        <div className="mt-6">
                        <button
                            type="submit"
                            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-[#053B50] rounded-md hover-bg-[#053B50] focus:outline-none focus-bg-[#053B50]"
                        >
                            Submit
                        </button>
                        </div>
                    </form>
                    </div>
                    
                </div>
                </div>
        </>
    )
}

export default AddOperator;