import React from 'react'
import { Img, Text } from "components";
import { useNavigate } from 'react-router-dom';
const SidebarMob = (props) => {
    const closeSidebase = props.closeSidebase;
  const navigate = useNavigate();
    const sideBarMenu = [
        {
          icon: (
            <Img
              className="h-6 w-6"
              src="images/img_grid.svg"
              alt="grid"
            />
          ),
          label: "Dashboard",
        },
        {
          icon: (
            <Img
              className="common-pointer h-[22px]"
              src="images/img_user_indigo_a200.svg"
              alt="user"
              onClick={() => navigate("/upload")}
            />
          ),
          label: "Upload",
        },
        {
          icon: (
            <Img
              className="h-4 mt-2"
              src="images/img_television.svg"
              alt="television"
            />
          ),
          label: "Invoice",
        },
        {
          icon: (
            <Img
              className="h-[26px]"
              src="images/img_megaphone.svg"
              alt="megaphone"
            />
          ),
          label: "Schedule",
        },
        {
          icon: (
            <Img
              className="h-[26px]"
              src="images/img_calendar.svg"
              alt="calendar"
            />
          ),
          label: "Calendar",
        },
        {
          icon: (
            <Img
              className="h-[26px]"
              src="images/img_iconlyboldnotification.svg"
              alt="iconlyboldnotif"
            />
          ),
          label: "Notification",
        },
        {
          icon: (
            <Img className="h-[26px]" src="images/img_search.svg" alt="search" />
          ),
          label: "Settings",
        },
      ];
    


  return (
    <>
    <div
    id="logo-sidebar"
    className='absolute logo-sidebar z-50 bg-[#fff] flex flex-col items-center top-0 left-0 w-[300px] h-[800px]'>
     <div className="flex  bg-[#fff] flex-row gap-[15px] items-center sm:w-[259px] sm:justify-around md:justify-between justify-between gap-x-3 ml-14 md:ml-[0] sm:mr-0 md:mr-0 mr-[51px] mt-[50px]  w-[51%]">
          <div className="flex flex-row items-center justify-between gap-x-3">
          <div
            className="bg-cover bg-no-repeat flex flex-col sm:flex-row md:flex-row gap-x-2  h-[42px] items-center justify-start w-[42px]"
            style={{ backgroundImage: "url('images/img_group5.svg')" }}
          >
            <Img
              className="h-[42px] w-[42px] sm:w-[22px] sm:h-[22px] md:w-[22px] md:h-[22px]"
              src="images/img_group5.svg"
              alt="subtract"
            />
          </div>
          <Text
            className="text-2xl md:text-[22px] text-black-900_01 sm:text-xl"
            size="txtNunitoSemiBold24"
          >
            Base
          </Text>
          </div>
          <div onClick={closeSidebase} className="hidden sm:flex md:flex sm:text-right">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path d="M25.3424 14.6568L19.6855 20.3137M19.6855 20.3137L14.0287 14.6568M19.6855 20.3137L14.0287 25.9706M19.6855 20.3137L25.3424 25.9706" stroke="#999CA0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          </div>

          {/* icon */}
        </div>
        <div className="flex flex-col gap-10 items-start ml-16  justify-start mt-[38px] w-full">
            {sideBarMenu?.map((menu, i) => (
              <div className='flex flex-row items-start gap-x-2 justify-between'>

            <div>
              {menu.icon}
            </div>
             
             <div
             className={menu.label === "Upload"?"text-[#605BFF]":""}
             >
             {menu.label}
             </div>
             </div>  
             
            ))}
          </div>
          </div>

    
    </>
  )
}

export default SidebarMob