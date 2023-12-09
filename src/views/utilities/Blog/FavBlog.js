import React, { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { BackendUrl } from "utils/config";

const FavBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [FavArr, setFavArr] = useState([]);
  const [refreshpage,setRefreshPage]=useState(false);

  const favblogApi = async () => {
    try {
      let result = await fetch(`${BackendUrl}/0auth/Blog/getFavCategoriesblog`, {
        method: 'GET',
      });
      const resdata = await result.json();
      setBlogs(resdata);
      const allslugs = resdata.map((data) => data.slugs);
      setFavArr(allslugs);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    favblogApi();
  }, []);

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

  const addFavToDb = async () => {
    try {
      console.log(FavArr);

      const result = await fetch(`${BackendUrl}/0auth/Blog/addFavCategories`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          favArr: FavArr
        }),
        credentials: "include",
      });

  // eslint-disable-next-line no-unused-vars
      const resdata = await result.json();
      // console.log("Response from addFavToDb:", resdata);
      favblogApi();

    } catch (err) {
      console.error('Error adding fav blog to db:', err);
    }
  };

  useEffect(()=>{
    if(FavArr.length>0){
      addFavToDb();

    }
  },[refreshpage])

  const remove = async (slug) => {
    console.log(`Removing ${slug} from favorites.`);
    if(FavArr.length===1){
      window.alert('favblog have ayleast 1 blog');
      return;
    }

    // Update FavArr state without triggering an immediate re-render
    setFavArr((prevFavArr) => prevFavArr.filter((item) => item !== slug));
    setRefreshPage(!refreshpage);

   
  };

  return (
    <>
      <div className="w-full flex justify-center items-center">
        <div className="table w-[100%]">
          <table className="border border-black w-full">
            <thead>
              <tr>
                <th className="border border-black p-2">Title</th>
                <th className="border border-black p-2">Categories</th>
                <th className="border border-black p-2">Slugs</th>
                <th className="border border-black p-2">Created At</th>
                <th className="border border-black p-2">Updated At</th>
                <th className="border border-black p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog, key) => (
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
                    <Tooltip title="Remove Fav">
                      <IconButton onClick={() => remove(blog.slugs)}>
                        <FavoriteBorderIcon className={FavArr.includes(blog.slugs) ? 'fill-red-500' : ''} />
                      </IconButton>
                    </Tooltip>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default FavBlog;
