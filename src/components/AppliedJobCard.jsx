import { useNavigate } from "react-router-dom";
import moment from "moment";
export default function AppliedJobCard({ job }) {
  
  const navigate = useNavigate();

  return (
    <div className="w-full md:w-[45%] lg:w-[30%] max-w-sm px-4 py-3 bg-white rounded-md shadow-md dark:bg-gray-800">
      <div className="flex items-center justify-between">
        <span className="text-sm font-light text-gray-800 dark:text-gray-400">
          Applied on: {moment(job.appliedDate).fromNow()}
        </span>
        <span className="px-3 py-1 text-xs text-blue-800 uppercase bg-blue-200 rounded-full dark:bg-blue-300 dark:text-blue-900">
          {job.job.applicants}
        </span>
      </div>

      <div>
        <h1 className="mt-2 text-lg font-semibold text-gray-800 dark:text-white">
          {job.job.jobTitle}
        </h1>
        <div className="mt-2 text-sm text-gray-600 dark:text-gray-300 flex flex-wrap justify-between">
          <span>Salary: {job.job.salaryRange}</span>
          <span>Deadline: {moment(job.job.deadline).format("MMM Do YY")}</span>
        </div>
      </div>
      <div className="mt-2 text-sm text-gray-600 dark:text-gray-300 flex flex-wrap justify-between">
          <span>Job Type: {job.job.jobType}</span>
          <span>Category: {job.job.category}</span>
         
        </div>
      <div className="flex my-2 justify-end items-center"> <span className="text-sm font-bold">Status : {job.status}</span></div>
      <div>
        <button
          onClick={() => navigate(`/job/${job.job._id}`)}
          type="button"
          className="px-3 py-2 my-4 w-full text-sm text-white bg-blue-600 rounded-md hover:bg-blue-500"
        >
          Details
        </button>
      </div>
    </div>
  );
}
