import { selectClasses } from "@mui/material";
import React from "react";
import { useState } from "react";
import Select from 'react-select';
import Toast from "ui-component/Toast/Toast";
import { BackendUrl } from "utils/config";

const AuthRegister=()=>{
  const [selectRole, setSelectRole] = useState();
  const [userName , setUserName]=useState();
  const [password, setPassword]=useState();
  const [vendorName,setVendorName]=useState();

  const[toastPopup, setToastpopup]=useState();
  const[toastMsg,setToastmsg]=useState();
  const[toastType,setToastType]=useState();
 
  const RoleList = [
    { value: 'Vendor', label: 'Vendor' },
    { value: 'Operator', label: 'Operator' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Admin', label: 'Admin' },
    { value: 'Checker', label: 'Checker' },
  ];

  function handleSelect(data) {
    setSelectRole(data);
    
  }
  

  const handleSubmit=async(e)=>{
    e.preventDefault();
    console.log(userName + password+vendorName);
    console.log(selectRole);
    try{

      if (vendorName === '' || password === '' || selectClasses.value === '' || userName=='') {
        window.alert('Fill in all data');
        return;
      } else {
     

        const response = await fetch(`${BackendUrl}/0auth/Auth/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userName:userName,
            password:password,
            role:selectRole.value,
            name:vendorName
            
          }),
          credentials: 'include',
        });

        const responseData = await response.json();
        console.log(responseData);
        console.log(response.status);
        if (response.status === 200) {
          setToastType('success');
          setToastpopup(true);
          setToastmsg('Registeration done')
          window.location.reload(); 
        } else {
          setToastType('error');
          setToastpopup(true);
          setToastmsg('someThing Went wrong Try again')
          // console.error('Failed to register');
        }
      }
    } catch(error) {
      setToastType('error');
      setToastpopup(true);
      setToastmsg('someThing Went wrong Try again')
      // console.error('Error:', error);
    }
  }

  return (
    <>
     {   toastPopup===true?
      <Toast  msg={toastMsg} type={toastType} setToastpopup={setToastpopup}/>:<></>

    }
        <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
              <div className="mb-5">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your Username
                </label>
                <input
                  type="text"
                 
                  onChange={(e) => setUserName(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Username"
                  required
                />
              </div>
              <div className="mb-5">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your password
                </label>
                <input
                  type="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-5">
                  <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Role 
                  </label>
                  <div className="w-[300px] ">
                    <Select options={RoleList} placeholder="Select Vender" value={selectRole} onChange={handleSelect} isSearchable={true} />
                  </div>
              </div>
              <div className="mb-5">
                  <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Name Of Vendor 
                  </label>
                  <input
                  type="text"
                  onChange={(e) => setVendorName(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name-rental-car"
                  required
                />
              </div>
              
              
              
              <div className="flex items-start mb-5">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                    required
                  />
                </div>
                <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Remember me
                </label>
              </div>
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Submit
              </button>
      </form>
    
    </>
  );
}

export default AuthRegister