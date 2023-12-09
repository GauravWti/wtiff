import React, { useRef, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Close } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import axios from "axios";

function FineComponent({ id, onDelete, onSave }) {
  const [file, setFile] = useState("");
  const [fineImage, setImageNameUpload] = useState('');


  const fineNameRef = useRef(null);
  const fineDescRef = useRef(null);
  const fineAmountRef = useRef(null);
  const fileInputRef = useRef(null);


  const imageUploadApi = async (value) => {
    try{
      let result = await axios.request(value);
          // console.log(result.data.name);
          let imageName = result.data.name;
          return imageName;
    }
    catch(error){
      console.log(error);
    }
    
  };


  const handleImageUpload = async (e) => {
    const selectedFile = e.target.files[0];
    const reader = new FormData();
    reader.append("file", selectedFile);
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
    setImageNameUpload(totalUrl);


    setFile(URL.createObjectURL(selectedFile));
    console.log("Selected File:", selectedFile);
  };

  const handleCloseImage = () => {
    setFile("");
    setImageNameUpload('');
    console.log("Close Clicked");
  };

  const handleDivClick = () => {
    fileInputRef.current.click();
  };

  const handleDelete = () => {
    onDelete(id);
  };

  const handleSaveClick = () => {
    const fineName = fineNameRef.current.value;
    const fineDescription = fineDescRef.current.value;
    const fineAmount = parseInt(fineAmountRef.current.value);
    
    const fineData = {
        fineName,
        fineDescription,
        fineAmount,
        fineImage,
    };


    
    onSave(id, fineData);
  };
  return (
    <>
      <div className="flex h-fit border-y-2 border-slate-300 my-4 pb-2">
        <div className="w-[45%]">
          <div className="pt-4">
            <label htmlFor="fineName" className="text-sm">Fine Name</label>
            <input
                ref={fineNameRef}
                id="fineName"
              type="text"
            //   placeholder="Fine Name"
              className="p-2 bg-slate-200 rounded w-[80%] outline-none focus-visible:border-b-2 focus-visible:border-[#0f0a34]  placeholder:normal-case mr-8 transition-all duration-300"
            />
          </div>
          <div className="pt-2">
            <label htmlFor="fineDesc" className="text-sm">Fine Description</label>
            <textarea
            ref={fineDescRef}
            id="fineDesc"
              name="fineDescription"
            //   placeholder="Fine Description"
              className="p-2 bg-slate-200 rounded w-[80%] outline-none focus-visible:border-b-2 focus-visible:border-[#0f0a34]  placeholder:normal-case mr-8 transition-all duration-300"
              rows="4"
            ></textarea>
          </div>
        </div>
        <div className="w-[45%] h-auto">
          <div className="pt-4 h-2/6">
            <label htmlFor="fineAmount" className="text-sm">Fine Amount (AED)</label>
            <input
            ref={fineAmountRef}
              type="number"
            //   placeholder="Fine Amount"
              className="remove-arrow bg-slate-200 rounded p-2 w-[80%] outline-none focus-visible:border-b-2 focus-visible:border-[#0f0a34]  placeholder:normal-case mr-8 transition-all duration-300 "
              onFocus={(e) =>
                e.target.addEventListener(
                  "wheel",
                  function (e) {
                    e.preventDefault();
                  },
                  { passive: false }
                )
              }
            />
          </div>
          <div className="pt-2 h-4/6 transition-all delay-200">
            {file == "" ? (
              <>
                <div
                  onClick={handleDivClick}
                  className="pt-1 w-[80%] h-full hover:ring cursor-pointer transition-all delay-200 rounded flex justify-center items-center bg-slate-300"
                >
                  <div className="font-bold">Fine Image</div>
                  <AddIcon />
                </div>
              </>
            ) : (
              <>
                <div className="relative w-[100px] aspect-square mt-2">
                  <img
                    src={file}
                    className={`${
                      file == "" ? "hidden" : ""
                    } w-fit rounded  hover:ring`}
                    alt="Car Image"
                  />
                  <div
                    onClick={handleCloseImage}
                    className="absolute top-1 right-1"
                  >
                    <Close className="text-sm bg-slate-300 cursor-pointer rounded-full" />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="w-[10%] p-2 flex justify-center items-center pt-6">
          <div className="mr-4">
            <Tooltip title="Save">
              <IconButton onClick={handleSaveClick}>
                <SaveIcon />
              </IconButton>
            </Tooltip>
          </div>
          <div>
            <Tooltip title="Delete">
              <IconButton onClick={handleDelete}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />
        </div>
      </div>
    </>
  );
}

export default FineComponent;
