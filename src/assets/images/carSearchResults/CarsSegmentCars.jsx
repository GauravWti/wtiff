import React from 'react'

function CarsSegmentCars(props) {
  return (
    <>
        <div className="my-8 w-full grid grid-cols-4 max-sm:grid-cols-1 max-sm:divide-y-2 gap-4 px-6 ">
                {props.carData.filter((vehicle) => vehicle.type === props.val).map((cars, index) => (
                  <div
                    key={index}
                    className="hover:cursor-pointer group transition-all duration-300 rounded"
                  >
                    <div className="w-[150px] group-hover:scale-105 transition-all duration-300 flex items-center m-auto pt-4 aspect-square object-cover">
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "/images/" +
                          (cars.imageName
                            ? cars?.imageName.split(" ").join("")
                            : "static") +
                          ".png"
                        }
                        className=""
                        onError={(e) => {
                          e.target.src = "../static/staticcarimage.png";
                        }}
                        alt=""
                      />
                    </div>
                    <div className="m-auto w-fit text-sm font-medium max-sm:text-lg break-words px-2 pb-6 text-center">
                      {cars.imageName}
                    </div>
                  </div>
                ))}
              </div>
    </>
  )
}

export default CarsSegmentCars