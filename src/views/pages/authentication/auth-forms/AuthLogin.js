

// export default FirebaseLogin;
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Navigate } from "react-router";
import Toast from "ui-component/Toast/Toast";
import { BackendUrl, frontendUrl } from "utils/config";

import { useNavigate } from "react-router";

const AuthLogin = () => {
  const Navigate=useNavigate();
  
  const [userName , setUserName]=useState();
  const [password, setPassword]=useState();

  const[toastPopup, setToastpopup]=useState();
  const[toastMsg,setToastmsg]=useState();
  const[toastType,setToastType]=useState();
 

  useEffect(() => {
    // Check for access token in cookies on component mount
    const accessToken = getCookie("accessToken");
    console.log(accessToken);

    if (accessToken) {
      // Redirect to the dashboard or the desired page
      // window.location.href = `${frontendUrl}/dashboard/default`;
      Navigate('/dashboard/default');
      // window.location.href = `http://43.205.205.54/dashboard/default`;


    }
  }, []);
 
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  function setCookie(name, value, maxAgeInMilliseconds) {
    // Set the cookie with Secure and maxAge attributes
    var cookieString = name + "=" + value + "; Secure; max-age=" + maxAgeInMilliseconds / 1000;
    
    // console.log("Setting cookie:", cookieString);
    document.cookie = cookieString;
  }
  
  const handleCookies = async(responseData)=>{
        if(responseData){
          localStorage.setItem('id',responseData.userid);
          localStorage.setItem('role',responseData.role);
          setCookie("accessToken", responseData.accessToken, 7);
          setCookie("refreshToken", responseData.refreshToken, 24);
          return true;
        }else{
          return false;
        }
          

  }

  const handleSubmit=async(e)=>{
    e.preventDefault();
    console.log(userName + password);
  
    try{

      if ( password === '' ||  userName=='') {
        window.alert('Fill in all data');
        return;
      } else {
     

        const response = await fetch(`${BackendUrl}/0auth/Auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userName:userName,
            password:password,
            
          }),
          credentials: 'include',
        });

        const responseData = await response.json();
        console.log(responseData);

        if (response.status === 200) {
          setToastType('success');
          setToastpopup(true);
          setToastmsg('Login done')
          // window.alert('Login done');
          // Navigate(`free/utils/VendercarAssign/${responseData.vendorid}`)
          
          
          
          // window.location.href = `${frontendUrl}/dashboard/default`;
          if(handleCookies()){
            Navigate('/dashboard/default');
          }
          
          
        } else {
          setToastType('error');
          setToastpopup(true);
          setToastmsg('wrong Credentails')
          // console.error('Failed to register');
        }
      }
    } catch(error) {
      setToastType('error');
          setToastpopup(true);
          setToastmsg('someThing Went wrong Try again');
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
              
              
              
              
              
              <div className="flex items-start mb-5">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                    
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
};

export default AuthLogin;
