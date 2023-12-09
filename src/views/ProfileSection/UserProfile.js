import React from "react";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import { Divider } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import { BackendUrl } from "utils/config";


const UserProfile=()=>{
   const[profileData, setProfileData]=useState();


const role=localStorage.getItem('role');
const {userid}=useParams();

console.log(role);
console.log(userid);
   useEffect(()=>{
    const fun=async()=>{
        const result=await fetch(`${BackendUrl}/0auth/profile/getprofiledata`,{
            method:'POST',
            body:JSON.stringify({id:userid, role:role}),
            credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        })
        console.log(result);
        const resdata=await result.json();
        setProfileData(resdata)
        
        console.log(profileData);
    }

    
    fun();
  
   },[])


    
   
    return(
        <>
        <div>
            <img src="https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=2710&amp;q=80" alt="Sunset over the mountains"/>
        </div>
     <div className="flex flex-col gap-4 mx-7 px-6 rounded-xl py-2 relative bottom-8 shadow-lg bg-white">

        
        <div className="flex justify-center w-32 h-32 mx-auto ">
            
                <img className="rounded-full w-32 h-32 absolute -top-7" src='https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=2710&amp;q=80' alt="your profile"/>
            

        </div>
        
                <div className="flex flex-col items-center gap-4 relative -top-6">
                    {
                        role==='Vendor'?<><p className="text-blue-400 text-3xl">{profileData?.venderName}</p> </>:<p className="text-blue-400 text-3xl">{profileData?.OperatorName}</p> 
                    }
                    
                    <div>
                    <div className="flex gap-2">
                            <FmdGoodIcon/>
                            <p>{profileData?.contact.address}</p>
                        </div>
                    </div>
                    <div className="flex gap-7 ">
                        <div className="flex gap-2">
                            <LocalPhoneIcon/>
                            <p>{profileData?.contact.number}</p>
                        </div>
                        <div className="flex gap-2">
                            <EmailIcon/>
                            <p>{profileData?.contact.email}</p>
                        </div>
                    </div> 

                </div>
                {  role ==='Vendor'?
                    <>
                <Divider className=" w-full"/>  

                   <div className="pl-9">
                        <p className="text-2xl text-blue-950">Bank Details</p>
                        <div className="flex gap-2 items-center">
                            <p className="text-lg text-blue-950">ifsc :</p>
                            <p>{profileData?.bankDetails.ifsc}</p>
                        </div>
                        <div className="flex gap-2 items-center">
                            <p className="text-lg text-blue-950">holder name :</p>
                            <p>{profileData?.bankDetails.holderName}</p>
                        </div>
                    </div> 
                    </>:<></>
                    
                }
                
                
    
     </div>
        </>
    );

}

export default UserProfile;