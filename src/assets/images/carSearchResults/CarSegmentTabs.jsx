import React, {useState} from 'react';
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import TabPanel from "@mui/lab/TabPanel";
import CarsSegmentCars from "./CarsSegmentCars";


function CarSegmentTabs(props) {
    const [selectedCategory, setSelectedCategory] = useState("Compact Cars");

    const StyledTabs = styled((props) => (
      <Tabs
        {...props}
        TabIndicatorProps={{
          children: <span className="MuiTabs-indicatorSpan" />,
        }}
      />
    ))({
      "& .MuiTabs-indicator": {
        display: "flex",
        justifyContent: "center",
        backgroundColor: "transparent",
      },
      "& .MuiTabs-indicatorSpan": {
        maxWidth: 40,
        width: "100%",
        backgroundColor: "#0f0a34",
      },
      "& .MuiTabs-flexContainer": {
        display: "flex",
        justifyContent: "center"
      },
    });
  
    const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
      ({ theme }) => ({
        textTransform: "none",
        fontWeight: theme.typography.fontWeightRegular,
        fontSize: "16px",
        marginRight: theme.spacing(1),
        "&:hover": {
          color: "#0f0a34",
          opacity: 1,
        },
        color: "rgb(203 213 225)",
        "&.Mui-selected": {
          color: "#0f0a34",
        },
        "&.Mui-focusVisible": {
          backgroundColor: "#fff",
        },
      })
    );
    const handleSelectOfCategory = (e, val) => {
        setSelectedCategory(val);
      };

  return (
    <>
        <TabContext value={selectedCategory}>
            <Box sx={{ width: "100%", bgcolor: "background.paper",textAlign: "center" }}>
              <StyledTabs
                value={selectedCategory}
                onChange={handleSelectOfCategory}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
                allowScrollButtonsMobile
              >
                {[...new Set(props.carData.map((item) => item.type))].map((tab) => (
                  <StyledTab value={tab} label={tab} />
                ))}
              </StyledTabs>
            </Box>
            {[...new Set(props.carData.map((item) => item.type))].map((tab) => (
              <TabPanel value={tab}>
                <CarsSegmentCars carData={props.carData} val={selectedCategory} />
              </TabPanel>
            ))}
          </TabContext>
    </>
  )
}

export default CarSegmentTabs