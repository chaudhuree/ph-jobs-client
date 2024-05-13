import React, { useState,useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { AiOutlineHome } from "react-icons/ai";
import { CiLocationOn } from "react-icons/ci";
import axiosSecure from "../hooks/useAxiosHook";

const Search = ({setTotalJobs,setJobs,totalJobs}) => {
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [jobLocation, setJobLocation] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {data} =await axiosSecure
      .get(
        `/jobs?search=${jobTitle}&company=${company}&jobLocation=${jobLocation}&page=1&limit=5`
      )
      setJobs(data?.jobs);
      setTotalJobs(data?.total);
  };


  return (
    <div className="searchDiv hidden mt-12 lg:grid  gap-10 bg-greyIsh rounded-[10px] p-[3rem]">

      <form onSubmit={handleSubmit}>
        <div className="firstDiv flex justify-between items-center rounded-[8px] gap-[10px] bg-white p-5 shadow-lg shadow-greyIsh-700">
          <div className="flex gap-2 items-center">
            <AiOutlineSearch className="text-[25px] icon" />
            <input
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              type="text"
              className="bg-transparent text-blue-500 focus:outline-none w-[100%]"
              placeholder="Search Job Title"
            />
            <AiOutlineCloseCircle
              onClick={() => setJobTitle("")}
              className="text-[30px] text-[#a5a6a6] hover:text-textColor icon"
            />
          </div>

          <div className="flex gap-2 items-center">
            <AiOutlineHome className="text-[25px] icon" />
            <input
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              type="text"
              className="bg-transparent text-blue-500 focus:outline-none w-[100%]"
              placeholder="Search by company"
            />
            <AiOutlineCloseCircle
              onClick={() => setCompany("")}
              className="text-[30px] text-[#a5a6a6] hover:text-textColor icon"
            />
          </div>

          <div className="flex gap-2 items-center">
            <CiLocationOn className="text-[25px] icon" />
            <input
              value={jobLocation}
              onChange={(e) => setJobLocation(e.target.value)}
              type="text"
              className="bg-transparent text-blue-500 focus:outline-none w-[100%]"
              placeholder="Search by location"
            />
            <AiOutlineCloseCircle
              onClick={() => setJobLocation("")}
              className="text-[30px] text-[#a5a6a6] hover:text-textColor icon"
            />
          </div>

          <button
            type="submit"
            className={`bg-blueColor h-full p-5 px-10 rounded-[10px] text-white cursor-pointer hover:bg-blue-300 `}
          >
            Search
          </button>
        </div>
      </form>

      
    </div>
  );
};

export default Search;
