import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getAuth } from "firebase/auth";
import moment from "moment";
export default function SingleCardComponent({
  recruiter,
  jobTitle,
  createdAt,
  deadline,
  salaryRange,
  applicants,
}) {
  const navigate = useNavigate();

  const handleVisit = () => {
    if (getAuth().currentUser) {
      navigate("/profile");
    } else {
      toast.error("Please login to view the course details");
      navigate("/signin");
    }
  };
  return (
    <div className="w-full md:w-[45%] lg:w-[30%] max-w-sm px-4 py-3 bg-white rounded-md shadow-md dark:bg-gray-800">
      <div className="flex items-center justify-between">
        <span className="text-sm font-light text-gray-800 dark:text-gray-400">
          {moment(createdAt).fromNow()} by {recruiter}
        </span>
        <span className="px-3 py-1 text-xs text-blue-800 uppercase bg-blue-200 rounded-full dark:bg-blue-300 dark:text-blue-900">
          {applicants} applicants
        </span>
      </div>

      <div>
        <h1 className="mt-2 text-lg font-semibold text-gray-800 dark:text-white">
          {jobTitle}
        </h1>
        <div className="mt-2 text-sm text-gray-600 dark:text-gray-300 flex flex-wrap justify-between">
          <span>Salary: {salaryRange}</span> 
          <span>Apply Before: {moment(deadline).format("MMM Do YY")}</span>
        </div>
      </div>

      <div>
        

        <button
          onClick={handleVisit}
          type="button"
          className="px-3 py-2 my-4 w-full text-sm text-white bg-blue-600 rounded-md hover:bg-blue-500"
        >
          Details
        </button>
      </div>
    </div>
  );
}
