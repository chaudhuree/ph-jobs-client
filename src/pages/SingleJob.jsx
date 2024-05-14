import { useParams } from "react-router-dom";
import moment from "moment";
import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../hooks/useAxiosHook";
export default function SingleJob() {
  const { id } = useParams();
  const getData = async () => {
    const { data } = await axiosSecure.get(`/job/${id}`);
    return data.job;
  };
  const {
    data: singleJob,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryFn: () => getData(),
    queryKey: ["job", id],
  });
  if (isLoading)
    return (
      <div className="flex justify-center items-center w-full min-h-screen p-5 dark:text-gray-300">
        <span className="loading loading-ball loading-xs dark:text-gray-300"></span>
      </div>
    );
  return (
    <div className="mx-auto px-5 min-h-screen overflow-hidden  rounded-t-lg ">
      <div className="bg-white rounded-lg dark:bg-[#111827]">
        <img
          className="object-fill w-full h-[300px]"
          src={singleJob?.bannerURL}
          alt="banner"
        />

        <div className="p-6">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-white bg-blue-600 uppercase dark:bg-blue-400 px-2 py-1 rounded-xl">
                {singleJob?.category}
              </span>
              <span className="text-xs font-medium text-white bg-blue-600 uppercase dark:bg-blue-400 px-2 py-1 rounded-xl">
                {singleJob?.salaryRange}
              </span>
            </div>
            <h1
              className="block mt-2 text-3xl font-semibold text-gray-800 transition-colors duration-300 transform dark:text-white hover:text-gray-600 font-poppins "
              tabindex="0"
              role="link"
            >
              {singleJob?.jobTitle} - ({singleJob?.jobType})
            </h1>
            <p className="mt-2 text-xl text-gray-600 dark:text-gray-400">
              {singleJob?.jobDescription}
            </p>
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center dark:text-gray-300">
                <span className="font-bold text-orange-500 mx-3 text-xl">
                  {singleJob?.applicants}
                </span>{" "}
                {singleJob?.applicants > 1 ? "applicants" : "applicant"} applied
                for this job
              </div>
              <p className=" text-base text-gray-600 dark:text-gray-300 ">
                <strong className="">Application Deadline:</strong>
                <span className=" ml-3 text-primary font-bold text-xl">
                  {moment(singleJob?.deadline)
                    .fromNow()
                    .toString()
                    .includes("ago")
                    ? "Closed"
                    : moment(singleJob?.deadline).fromNow()}
                </span>{" "}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4 my-5">
            <div className="flex  gap-3">
              <img
                className="object-cover h-10 rounded-full"
                src={singleJob?.recruiter?.photoURL}
                alt="Avatar"
              />
              <p
                className="mx-2 font-semibold text-gray-700 dark:text-gray-200 text-base"
                tabindex="0"
                role="link"
              >
                {singleJob?.recruiter?.displayName}
              </p>
            </div>
            <p>
              <strong className="dark:text-gray-300">Company name</strong> :{" "}
              <span className="text-primary font-bold">
                {singleJob?.company}
              </span>
            </p>
          </div>
        </div>
        
      </div>
      <div className="flex justify-center items-center">
          <button className="bg-primary hover:bg-blue-500 px-20 rounded-lg text-base text-white font-bold py-4">Apply Now</button>
        </div>
    </div>
  );
}
