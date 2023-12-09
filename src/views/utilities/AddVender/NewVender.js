
import React from "react";
import { useState } from "react";
import Select from "react-select";
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import axios from 'axios';
import {BackendUrl} from '../../../utils/config.js'


const NewVender = () =>{
  
  const[venderName, setVenderName]=useState('');
  // const [selectedFile, setSelectedFile] = useState(null);
  const[phone,setPhone] =useState('');
  const[email, setEmail]=useState('');
  const[address, setAddress]=useState('');
  // const[pancard, setPanCard]=useState('');
  const[ifsc, setIFSC]=useState('');
  const[accountholdername, setAccountHolderName]=useState('');
  const [idproofList, setidproofList] = useState([{ IdProofType: "", Link: "" }]);

  const IdProofTypeList=[
    {value:"Pan Card",label:"Pan Card"},
    {value:"Aadhar card",label:"Aadhar card"},
    {value:"Voter id",label:"Voter id"},
  ]
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (venderName === '' || phone === '' || email === '' || address === ''  || ifsc===''|| accountholdername==='') {
        window.alert('Fill in all data');
        return;
      } else {
        const filteredDataidproof = idproofList.filter(entry => entry.IdProofType !== '' || entry.Link !== '');
        const response = await fetch(`${BackendUrl}/0auth/vendor/addvender`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            venderName: venderName,
            contact: {
              address: address,
              number: phone,
              email: email,
            },
            document: filteredDataidproof,
            bankDetails: {
              ifsc:ifsc,
              holderName:accountholdername,
            },
            
          }),
          credentials: 'include',
        });
  
        const responseData = await response.json();
        console.log(responseData);
  
        if (response.status === 200) {
          window.alert('New vender added');
          window.location.reload(); // Reload the page
        } else {
          console.error('Failed to add new vender');
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleInputChange = (value, index, name) => {
    const list = [...idproofList];
    list[index][name] = value;
    setidproofList(list);
  };

  const handleRemoveClick = (index) => {
    const list = [...idproofList];
    list.splice(index, 1);
    setidproofList(list);
  };

  const handleAddClick = () => {
    setidproofList([...idproofList, { IdProofType: "", Link: "" }]);
  };

  // const handleFileChange = (event) => {

  //   const file = event.target.files[0];
  //   console.log(file.name);

  //   if (file && file.type === 'image/png') {
      
  //     setSelectedFile(file);
  //     console.log((selectedFile));
  //   } else {
  //     window.alert('please select png file')
      
  //   }
  // };

  const idproofimagehandler=async(event, index, name) => {
   let lurl= await imageTest(event);
    const list = [...idproofList];
    list[index][name] = lurl;
    setidproofList(list);
  };
  const imageUploadApi = async (value) => {
    let result = await axios.request(value);
    // console.log(result.data.name);
    let imageName = result.data.name;
    return imageName;
  };

  const imageTest = async (e) => {
    console.log(e.target.files[0]);
    const reader = new FormData();
    reader.append("file", e.target.files[0]);
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://wticarrental.ae:3000/app/v1/aws/upload/blogimages",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: reader,
    };
    let imageName = await imageUploadApi(config);

    let totalUrl =
      `https://wticarrental.ae:3000/app/v1/aws/getImage/blogimages/` +
      imageName;
    console.log(totalUrl);
    return totalUrl;
  };

 

  console.log(idproofList);
  return(
 
  <div className="flex flex-col justify-center  mt-4  ">
   <h2 className="font-extrabold text-4xl my-10 text-blue-950 text-center">Add New Vender</h2>
  <div className="flex justify-center ">
    <div className="w-3/4 md:w-2/5 shadow-2xl px-4 md:px-24 py-10 box-content rounded-xl">
      <form className="mt-6 flex flex-col gap-3" onSubmit={handleSubmit}>
        <div className="">
          <label htmlFor="venderName" className="text-left  block text-sm font-semibold text-gray-800">
            Vender Name
          </label>
          <input
            required={true}
            onChange={(e) => setVenderName(e.target.value)}
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
       
 <label htmlFor="text" className="text-left  block text-sm font-semibold text-gray-800">
            Id Proof
          </label>
          
          <div className="flex flex-col gap-4 relative">

{idproofList.map((x, i) => (
  <div key={i} className="box flex md:flex-row flex-col gap-4  w-[40vw]">
          <div className="flex flex-col gap-2">

          <Select
            className="w-full md:w-[70%]"
            options={IdProofTypeList}
            placeholder="Select car type"
            value={IdProofTypeList.find((option) => option.value === x.IdProofType)}
            onChange={(data) => handleInputChange(data.value, i, "IdProofType")}
            isSearchable={true}
            />
          

<input
        type="file"
        accept="image/png" // Restrict to image files
        onChange={(e) => idproofimagehandler(e, i, "Link")}
        // onChange={handleFileChange}
        />
          
        </div>
          <div className="btn-box w-[20%] ">
            {idproofList.length !== 1 && (
              <button className="" onClick={() => handleRemoveClick(i)}>
                <DeleteRoundedIcon  style={{ color: 'red' }} />
              </button>
            )}
            {idproofList.length - 1 === i && (
              <button onClick={handleAddClick} className="absolute -top-[30px] -right-[10px]">
                <AddCircleOutlineRoundedIcon  style={{ color: 'blue' }}/>
              </button>
            )}
          </div>
        </div>
      ))}
      </div>

       
        <div className="">
          <label htmlFor="text" className="text-left  block text-sm font-semibold text-gray-800">
            IFSC Code
          </label>
          <input
            required={true}
            onChange={(e) => setIFSC(e.target.value)}
            className="block w-full px-4 py-2 mt-2 text-[#053B50] border-black border-[1px] bg-white  rounded-md focus:border-[#053B50] focus:ring-[#053B50] focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>
        <div className="">
          <label htmlFor="text" className="text-left  block text-sm font-semibold text-gray-800">
           Account Holder Name
          </label>
          <input
            required={true}
            onChange={(e) => setAccountHolderName(e.target.value)}
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

);
  }

export default NewVender;
