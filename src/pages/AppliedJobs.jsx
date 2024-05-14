import { useState } from "react";
import { getAuth } from "firebase/auth";
import axiosSecure from "../hooks/useAxiosHook";
import { useQuery } from "@tanstack/react-query";
import TableWithoutPagination from "../components/TableWithoutPagination";
import AppliedJobsCardView from "../components/AppliedJobsCardView";
export default function AppliedJobs() {
  const auth = getAuth();
  const [category, setCategory] = useState("");
  const [view, setView] = useState("table");
  const { data: jobs, isLoading } = useQuery({
    queryFn: () => axiosSecure.get(`/appliedjobs?category=${category}`),
    queryKey: ["appliedjobs", auth?.currentUser?.email, category],
  });
  if (isLoading)
    return (
      <div className="flex justify-center items-center w-full min-h-screen p-5 dark:text-gray-300">
        <span className="loading loading-ball loading-xs dark:text-gray-300"></span>
      </div>
    );


  return (
    <div className="mx-auto container px-5">
      <div className="flex  max-w-5xl mx-auto items-center max-md:flex-col justify-between max-md:justify-center">
        <select
        value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-1/4 px-3 py-2 mb-3 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
        >
          <option  value="">All</option>
          <option value="On Site">On Site</option>
          <option value="Part Time">Part Time</option>
          <option value="Remote">Remote</option>
          <option value="Hybrid">Hybrid</option>
        </select>
        <div className="flex gap-4 items-center">
          <div className="flex gap-2 items-center ">
            <input checked={view==='table'} onChange={e=> setView(e.target.value)} type="radio" id="table" name="view" value="table" />
            <label for="table" className="text-lg font-bold">
              Table
            </label>
          </div>
          <div className="flex gap-2 items-center ">
            <input checked={view==='card'} onChange={e=> setView(e.target.value)} type="radio" id="card" name="view" value="card" />
            <label for="card" className="text-lg font-bold">Card</label>
          </div>
        </div>
      </div>

      {view === "table" ? (<TableWithoutPagination jobsData={jobs?.data?.appliedJobs} />) : <AppliedJobsCardView jobsData={jobs?.data?.appliedJobs} />}
    </div>
  );
}
