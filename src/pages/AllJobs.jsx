import axiosSecure from "../hooks/useAxiosHook";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import Table from "../components/Table";
export default function AllJobs() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const {
    data: jobsData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["jobs", search, page],
    queryFn: async () => {
      const { data } = await axiosSecure(
        `jobs?search=${search}&page=${page}&limit=${limit}&sortBy=createdAt`
      );
      return data
    },
  });
  const handleSearch = (e) => {
    e.preventDefault();
    console.log('e', e);
    
    setSearch(e.target.search.value);
    setPage(1);
  };


  if (isLoading)
    return (
      <div className="flex justify-center items-center w-full p-5 dark:text-gray-300 h-screen">
        <span className="loading loading-ball loading-xs dark:text-gray-300"></span>
      </div>
    );
  if (isError) return <div>Error: {error.message}</div>;
  return (
    <div className="container mx-auto px-5 overflow-x-hidden font-poppins">
    <Helmet>
      <title>All Jobs</title>
    </Helmet>
    <div className="flex items-center justify-end py-5">
      <form onSubmit={handleSearch} className="w-full">
      <input
        type="text"
        placeholder="Search Jobs"
        className="w-1/3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
        name="search"
      />
      <button
        type="submit"
        className="px-4 py-2 text-white bg-blue-500 rounded-md ml-2"
      >
        Search
      </button>
      </form>
    </div>
      <Table jobsData={jobsData.jobs} total={jobsData.total} limit={limit} currentPage={page} setCurrentPage={setPage} />
    </div>
  );
}
