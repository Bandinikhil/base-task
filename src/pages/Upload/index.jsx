import React, { useState } from "react";
import Papa from "papaparse";
import { useNavigate } from "react-router-dom";
import { Button, Img, Text } from "components";
import Sidebar1 from "components/Sidebar1";
import { signOut } from "firebase/auth";
import { auth } from "../../utils/firebase";
import Uploads from "pages/Uploads";
import SidebarMob from "components/SidebarMob";

const UploadPage = () => {
  const [data, setData] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSidebarVisible, setSidebarVisibility] = useState(false);
  const [upload, setUpload] = useState(false);
  const [isPopupVisible, setPopupVisibility] = useState(false);

  const navigate = useNavigate();

  const handleTogglePopup = () => setPopupVisibility(!isPopupVisible);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setData(null);
        navigate("/");
      })
      .catch(() => navigate("/error"));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }

    Papa.parse(file, {
      header: true,
      complete: (results) => {
        setData(results.data);
      },
    });
  };

  const handleUplaod = () => setUpload(true);

  const handleToggleSidebar = () => setSidebarVisibility(!isSidebarVisible);

  const closeSidebase = () => setSidebarVisibility(false);

  const handleOutsideClick = (e) => {
    if (isSidebarVisible && e.target.closest("#logo-sidebar") === null) {
      setSidebarVisibility(false);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setData(null);
    setUpload(false);
  };

  return (
    <div
      onClick={handleOutsideClick}
      className="bg-gray-50_01 flex flex-col font-nunito items-center justify-end mx-auto sm:px-5 md:px-5 w-full"
    >
      <div className="flex md:flex-col flex-row items-start justify-between mx-auto w-full">
        <div className="sticky top-0 h-screen  sm:hidden md:hidden">
          <Sidebar1 className="sticky! !w-[218px] bg-[#fff] flex h-full md:hidden sm:hidden justify-start overflow-auto top-0" />
        </div>

        {isSidebarVisible && (
          <SidebarMob
            closeSidebase={closeSidebase}
            className={`${
              isSidebarVisible
                ? "sm:absolute sm:left-0 sm:translate-x-0"
                : "hidden sm:translate-x-full"
            } sm:!sticky sm:h-screen sm:w-[300px] sm:rounded-r-lg bg-white sm:transition-transform sm:ease-out sm:duration-300`}
          />
        )}

        <div className="flex flex-1 flex-col font-figtree md:gap-10 gap-[50px] items-center justify-start sm:justify-start md:mt-0 mt-[49px] w-full">
          <div className="flex md:flex-col-reverse sm:flex-col-reverse mt-4 flex-row gap-[34px] items-start justify-between w-full">
            <div className="flex md:flex-1 flex-col items-start justify-center w-auto md:w-full">
              <div className="flex flex-col ml-4 items-start justify-start w-auto">
                <Text
                  className="text-2xl md:text-[22px] text-black-900 sm:text-xl w-auto"
                  size="txtFigtreeSemiBold24"
                >
                  Upload CSV
                </Text>
              </div>
            </div>
            <div className="flex md:flex-1 flex-row gap-[27px] items-center justify-between md:mt-0 mt-0.5 w-[7%] md:w-full">
              <div className="sm:flex md:flex hidden md:items-center sm:items-center md:gap-x-3 sm:gap-x-3 md:justify-between sm:justify-between">
                <div onClick={handleToggleSidebar}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="14"
                    viewBox="0 0 18 14"
                    fill="none"
                  >
                    <path
                      d="M1 1H17M1 13H17M1 7H17"
                      stroke="#231F20"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="26"
                    height="26"
                    viewBox="0 0 26 26"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M25.9902 12.6291L19.7848 9.44685C19.4943 8.735 18.7951 8.23336 17.9787 8.23336C17.1081 8.23336 16.3707 8.80392 16.1202 9.59152L9.99098 14.6481C9.67551 14.4286 9.29214 14.3 8.87872 14.3C8.36808 14.3 7.90328 14.4963 7.55566 14.8175L0.121365 11.1829C1.00521 4.86344 6.43234 0 12.9954 0C20.051 0 25.7938 5.62091 25.9902 12.6291ZM6.99929 16.7717L0 13.3498C0.185401 20.3678 5.93266 26 12.9954 26C19.6871 26 25.1979 20.944 25.9161 14.4437L25.7557 14.7565L19.4134 11.504C19.0571 11.891 18.5462 12.1334 17.9787 12.1334C17.5037 12.1334 17.0683 11.9635 16.73 11.6812L10.8023 16.5715C10.649 17.4955 9.84616 18.2 8.87872 18.2C7.98246 18.2 7.22743 17.5953 6.99929 16.7717Z"
                      fill="#605BFF"
                    />
                  </svg>
                </div>
                <div className="text-[#030229] font-nunito text-xl font-semibold">
                  Base
                </div>
              </div>
              {/* 2nd */}
              <div className="flex items-center justify-end sm:gap-x-2 md:gap-x-2 gap-x-7 text-left">
                <div>
                  <Img
                    className="h-[23px]"
                    src="images/img_vector.svg"
                    alt="vector"
                  />
                </div>

                <div
                  className="flex flex-col h-[30px] items-center justify-start w-[30px] relative"
                  onMouseEnter={handleTogglePopup}
                  onMouseLeave={handleTogglePopup}
                  onClick={handleTogglePopup}
                >
                  <Img
                    className="h-[30px] md:h-auto rounded-[50%] w-[30px]"
                    src="images/img_image1.png"
                    alt="imageOne"
                  />
                  {isPopupVisible && (
                    <div className="absolute top-[-50px] right-[-10px] bg-white p-4 border rounded font-nunito shadow-md">
                      <button onClick={handleSignOut}>Sign Out</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white-A700_01 flex flex-col gap-[21px] items-center justify-start p-4 rounded-lg w-[52%] md:w-full">
            <div className="border border-dashed border-gray-200_01 flex flex-col items-center justify-end p-[84px] md:px-10 sm:px-5 rounded-lg w-full">
              <div className="flex flex-col items-center justify-start mt-3.5 w-[68%] md:w-full">
                <div
                  onChange={handleFileUpload}
                  className="flex flex-col gap-4 items-center justify-start w-auto"
                >
                  <Img
                    className="h-9 w-9"
                    src="images/img_television_green_900.svg"
                    alt="television_One"
                  />
                  {selectedFile ? (
                    <div className="flex flex-col items-center gap-2">
                      <Text
                        className="text-base text-center text-gray-500_01 w-auto"
                        size="txtFigtreeRegular16"
                      >
                        {selectedFile.name}
                      </Text>
                      <div
                        className="text-red-700 mt-[12px] common-pointer cursor-pointer"
                        onClick={handleRemoveFile}
                        size="sm"
                      >
                        Remove
                      </div>
                    </div>
                  ) : (
                    <label className="text-center mx-0 self-center">
                      <input
                        type="file"
                        accept=".csv"
                        style={{ display: "none" }}
                        onChange={handleFileUpload}
                      />
                      <Text
                        className="text-base text-center text-gray-500_01 w-auto"
                        size="txtFigtreeRegular16"
                      >
                        <span className="text-gray-500_01 font-figtree font-normal">
                          Drop your excel sheet here or{" "}
                        </span>
                        <span className="text-indigo-A200 font-figtree font-normal">
                          browse
                        </span>
                      </Text>
                    </label>
                  )}
                </div>
              </div>
            </div>
            <Button
              className={`common-pointer cursor-pointer flex items-center justify-center min-w-[564px] sm:min-w-full rounded-lg ${
                data ? "opacity-40" : ""
              }`}
              onClick={handleUplaod}
              leftIcon={
                <Img
                  className="h-6 mr-2"
                  src="images/img_twitter.svg"
                  alt="twitter"
                />
              }
              size="sm"
            >
              <div className="font-semibold text-left text-sm">Upload</div>
            </Button>
          </div>

          {data && <Uploads data={data} />}
        </div>
      </div>
    </div>
  );
};

export default UploadPage;




