import React, { useState } from "react";
import { Text } from "components";

const Uploads = ({ data }) => {
  const [selectedTags, setSelectedTags] = useState({});
  const [dropdownStyle, setDropdownStyle] = useState({});

  
  const options = [
    "Select Tags",
    "Technology",
    "Fashion",
    "Food",
    "Travel",
    "Sports",
    "Music",
    "Art",
    "Health",
    "Education",
    "Finance",
  ];

  const handleSelectChange = (e, rowId) => {
    const value = e.target.value;
    setSelectedTags((prevTags) => ({
      ...prevTags,
      [rowId]:
        value === "Select Tags" ? [] : [...(prevTags[rowId] || []), value],
    }));
  };

  const handleRemoveTag = (rowId, tag) => {
    setSelectedTags((prevTags) => ({
      ...prevTags,
      [rowId]: prevTags[rowId].filter((selectedTag) => selectedTag !== tag),
    }));
  };

  if (data.length === 0) return null;

  //Table to show the data retrived from CSV file
  return (
    <>
      <div className="flex flex-col gap-[46px] items-start justify-start  md:w-full">
        <div className="flex flex-col items-start justify-start w-auto">
          <Text
            className="text-2xl mt-0 md:text-[22px] text-black-900 sm:text-xl w-auto"
            size="txtFigtreeSemiBold24"
          >
            Uploads
          </Text>
        </div>
        <div className="h-[455px] w-screen max-w-[1065px]  overflow-scroll sm:h-[551px] md:h-[786px] relative ">
          <div className="absolute bg-gray-100 flex overflow-scroll flex-col inset-x-[0] items-center justify-start mx-auto pb-[15px] px-[15px] rounded-lg top-[0]  w-screen  max-w-[1065px] ">
            <div className=" w-screen overflow-scroll  max-w-[1065px] ">
              {data.length ? (
                <table className="table bg-[#F2F2F2] gap-3">
                  <thead className="my-[31px]">
                    <tr className="text-center my-[31px] p-4">
                      <th className="p-4">Sl No.</th>
                      <th>Links</th>
                      <th>Prefix</th>
                      <th>Add Tags</th>
                      <th>Selected Tags</th>
                    </tr>
                  </thead>
                  <tbody className="my-4 gap-4 border-separate border border-spacing-y-[10px] ">
                    {data.map((row) => (
                      <tr
                        key={row.id}
                        className="text-center h-[58px] my-6  gap-y-3 rounded-[8px] mx-[16px]  flex-shrink-0"
                      >
                        <td className="my-4">{row.id}</td>

                        <td>
                          {" "}
                          <a
                            className="text-blue-500 underline"
                            target="_blank"
                            rel="noopener noreferrer"
                            href={`http://${row.links}`}
                          >
                            {row.links}
                          </a>{" "}
                        </td>
                        <td>{row.prefix}</td>
                        <td>
                          <div className="relative inline-block text-left">
                            <select
                              value={
                                selectedTags[row.id]
                                  ? selectedTags[row.id][0]
                                  : "Select Tags"
                              }
                              onChange={(e) => handleSelectChange(e, row.id)}
                              className="appearance-none border bg-[#fff] border-[#F2F2F2] rounded-[8px] py-2 px-4 pr-8 leading-tight focus:outline-none "
                              style={{ ...dropdownStyle }}
                            >
                              {options.map((option, index) => (
                                <option
                                  className="p-[8px] gap-[8px] mx-2 bg-[#F5F5F5] rounded-[8px]"
                                  key={index}
                                  value={option}
                                >
                                  {option}
                                </option>
                              ))}
                            </select>
                          </div>
                        </td>
                        <td>
                          <div className="flex  flex-wrap overflow-y-scroll w-[400px] gap-1">
                            {selectedTags[row.id] &&
                              selectedTags[row.id].map((tag, tagIndex) => (
                                <div
                                  key={tagIndex}
                                  className="flex flex-wrap rounded-[4px] bg-[#605BFF] py-1 pr-1 pl-2 items-center"
                                >
                                  <span className="mr-2 text-[#fff]">
                                    {tag}
                                  </span>
                                  <button
                                    onClick={() => handleRemoveTag(row.id, tag)}
                                    className="text-[#fff]"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16"
                                      height="16"
                                      viewBox="0 0 16 16"
                                      fill="none"
                                    >
                                      <path
                                        d="M5 5L8 8M8 8L5 11M8 8L11 11M8 8L11 5"
                                        stroke="white"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                      />
                                    </svg>
                                  </button>
                                </div>
                              ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Uploads;
