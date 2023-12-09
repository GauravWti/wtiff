import React, { useEffect, useState } from "react";
import axios from "axios";

import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import BlogUpdateForm from "./BlogUpdateForm";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { BackendUrl } from "utils/config";

function AllBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [editBlogID, setEditBlogID] = useState('');
  const[FavArr, setFavArr]=useState([]);
  const [refreshPage, setRefreshPage] = useState(false);

  useEffect(() => {
    const apiCall = async () => {
      let result = await axios.get(
        // "https://wticarrental.ae:3000/app/v1/blogs/allBlog"
        `${BackendUrl}/0auth/Blog/allBlog`
      );
      setBlogs(result.data);
      console.log(result.data);
    };
    const favblogApi=async()=>{
      let result=await fetch(`${BackendUrl}/0auth/Blog/getFavCategoriesblog`,{
        method:'GET',
        
      })
      const resdata=await result.json();

      const allslugs=resdata.map((data)=>data.slugs);
      // console.log(allslugs);
      setFavArr(allslugs);

    }

    apiCall();
    favblogApi();
  }, [refreshPage]);

  const convertDate = (val) => {
    let date = new Date(val);
    const options = { year: "numeric", month: "short", day: "numeric" };

    // Format options for time
    const timeOptions = { hour: "numeric", minute: "numeric" };

    const formattedDateString = `${date.toLocaleDateString(
      undefined,
      options
    )} ${date.toLocaleTimeString(undefined, timeOptions)}`;

    return formattedDateString;
  };

  const findObj = (id) => {
    let blog = blogs.filter((blog) => blog._id == id);
    console.log(blog[0]);
    return blog[0];
  } 


  const deleteParticluarBlog=async(id)=>{
    try{

      const result= await fetch(`${BackendUrl}/0auth/Blog/deletebyid`,{
        method:'DELETE',
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify({
          id:id,
        }),
        credentials: "include",
        
      });
      if(result.status===200){
        
          window.alert('your blog is deleted');
          setRefreshPage((prev) => !prev);
        }
      else{
        window.alert('Try again to delete the blog');
        
      }
    }
    catch(err){
      window.alert('error in deleting blog');

    }
       
  }
  const addFavToDb=async()=>{
    try{
      console.log(FavArr);

      const result=await fetch(`${BackendUrl}/0auth/Blog/addFavCategories`,{
        method:'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          favArr:FavArr
        }),
        credentials: "include",
      });
// eslint-disable-next-line no-unused-vars
      const resdata=await result.json();
      // console.log(resdata);

      
      
    }
    catch(err){
      window.alert('fav blog not added into db');
    }
  }
  useEffect(() => {
    if (FavArr.length > 0) {
      addFavToDb();
    }
  }, [FavArr]);
  

const AddFav = async(slug) => {

  const index = FavArr.indexOf(slug);

  if (index === -1) {
    if (FavArr.length < 5) {
      
       setFavArr((prevFavArr) => [...prevFavArr, slug]);
      
      console.log(`Added ${slug} to favorites.`);
    } else {
      alert('You can only have 5 favorites. Remove some other favorites.');
    }
  } else {
    
    setFavArr((prevFavArr) => prevFavArr.filter((item) => item !== slug));
    console.log(`Removed ${slug} from favorites.`);
  }
};

  return (
    <>
      {
        editBlogID == '' ? 
        <>
          <div className="w-full flex justify-center items-center">
        <div className="table w-[100%]">
          <table className="border border-black w-full">
            <tr>
              <th className="border border-black p-2">Title</th>
              <th className="border border-black p-2">Categories</th>
              <th className="border border-black p-2">Slugs</th>
              <th className="border border-black p-2">Created At</th>
              <th className="border border-black p-2">Updated At</th>
              <th className="border border-black p-2">Actions</th>
            </tr>
            {blogs.map((blog,key) => (
              <tr key={key}>
                <td className="border border-black p-2">{blog.title}</td>
                <td className="border border-black p-2">{blog.categories}</td>
                <td className="border border-black p-2">{blog.slugs}</td>
                <td className="border border-black p-2 text-center">
                  {convertDate(blog.createdAt)}
                </td>
                <td className="border border-black p-2 text-center">
                  {convertDate(blog.updatedAt)}
                </td>
                <td className="border-t border-black p-2 flex justify-around items-center h-full">
                  <Tooltip title="Edit">
                    <IconButton onClick={() => setEditBlogID(blog._id)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>{" "}
                  <Tooltip title="Delete">
                    <IconButton onClick={() => deleteParticluarBlog(blog._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Add Fav">
                    <IconButton 
                      onClick={() => AddFav(blog.slugs)}
                    >
                      <FavoriteBorderIcon   className={FavArr.includes(blog.slugs) ? 'fill-red-500' : ''}/>
                    </IconButton>
                  </Tooltip>
                  
                  

                </td>
              </tr>
            ))}
          </table>
        </div>
      </div>
        </> 
        : 
        <>
          <BlogUpdateForm blog={findObj(editBlogID)} setEditBlogID={setEditBlogID} />
        </>
      }
      
    </>
  );
}

export default AllBlogs;
