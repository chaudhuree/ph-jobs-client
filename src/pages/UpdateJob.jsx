import { useParams } from "react-router-dom"
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import axiosSecure from "../hooks/useAxiosHook";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function UpdateJob() {
  const auth = getAuth();
  const [bannerURL, setBannerURL] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [recruiterName, setRecruiterName] = useState(
    auth.currentUser.displayName || ""
  );
  const [recruiterEmail, setRecruiterEmail] = useState(
    auth.currentUser.email || ""
  );
  const [category, setCategory] = useState("");
  const [jobType, setJobType] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [salaryRange, setSalaryRange] = useState("");
  const [deadline, setDeadline] = useState(new Date());
  const [jobLocation, setJobLocation] = useState("");
  const { id } = useParams()
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  // fetching single job
  const {data:singleJob,isLoading} = useQuery({
    queryKey: ["singleJob",id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/job/${id}`)
      return data.job
    },
  })
  useEffect(() => {
    if(singleJob){
      setBannerURL(singleJob.bannerURL)
      setJobTitle(singleJob.jobTitle)
      setCompany(singleJob.company)
      setRecruiterName(singleJob.recruiterName)
      setRecruiterEmail(singleJob.recruiterEmail)
      setCategory(singleJob.category)
      setJobType(singleJob.jobType)
      setJobDescription(singleJob.jobDescription)
      setSalaryRange(singleJob.salaryRange)
      setDeadline(singleJob.deadline)
      setJobLocation(singleJob.jobLocation)
    }
  }, [singleJob])
  // updating job
  const {mutateAsync} = useMutation({
    mutationFn: async ({data}) => {
      const { data: job } = await axiosSecure.put(`/job/${id}`, data)
      return job
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["jobs","myjobs"])
      toast.success("Job Updated Successfully")
    }
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        bannerURL,
        jobTitle,
        company,
        recruiterName,
        recruiterEmail,
        category,
        jobType,
        jobDescription,
        salaryRange,
        deadline,
        jobLocation,
      }
      await mutateAsync({data})
      navigate("/myjobs");
    } catch (error) {
      toast.error("Something went wrong");
    }
  }
  return (
    <div className="mx-auto container px-5">
      <Helmet>
        <title>Add Job</title>
      </Helmet>
      <form onSubmit={handleSubmit} className="grid grid-cols-12 gap-6 mt-8 ">
        <div className="col-span-12 md:col-span-6">
          <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
            Banner URL
          </label>
          <input
            type="text"
            placeholder="banner URL"
            className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
            value={bannerURL}
            onChange={(e) => setBannerURL(e.target.value)}
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
            Job Title
          </label>
          <input
            type="text"
            placeholder="Job Title"
            className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
            Company
          </label>
          <input
            type="text"
            placeholder="Company"
            className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>

        <div className="col-span-12 md:col-span-6">
          <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
            Recruiter Name
          </label>
          <input
            disabled
            type="text"
            placeholder="Recruiter Name"
            className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
            value={recruiterName}
            onChange={(e) => setRecruiterName(e.target.value)}
          />
        </div>

        <div className="col-span-12 md:col-span-6">
          <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
            Recruiter Email
          </label>
          <input
            type="email"
            disabled
            placeholder="Recruiter Email"
            className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
            value={recruiterEmail}
            onChange={(e) => setRecruiterEmail(e.target.value)}
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
            Job Location
          </label>
          <input
            type="text"
            placeholder="Job Location"
            className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
            value={jobLocation}
            onChange={(e) => setJobLocation(e.target.value)}
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
            Category
          </label>
          <select
            type="select"
            placeholder="Category"
            className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="" disabled>
              Select One
            </option>
            <option value="On Site">On Site</option>
            <option value="Remote">Remote</option>
            <option value="Part Time">Part Time</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>

        <div className="col-span-12 md:col-span-6">
          <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
            Job Type
          </label>
          <select
            type="select"
            placeholder="Job Type"
            className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
          >
            <option value="" disabled>
              Select one
            </option>
            <option value="Intern">Intern</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Senior">Senior</option>
            <option value="Advocate">Advocate</option>
          </select>
        </div>

        <div className="col-span-12">
          <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
            Job Description
          </label>
          <textarea
            placeholder="Job Description"
            className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
        </div>

        <div className="col-span-12 md:col-span-6">
          <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
            Salary Range
          </label>
          <input
            type="text"
            placeholder="Salary Range"
            className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
            value={salaryRange}
            onChange={(e) => setSalaryRange(e.target.value)}
          />
        </div>

        <div className="col-span-12 md:col-span-6">
          <div className="flex justify-center flex-col">
            <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
              Deadline
            </label>
            <DatePicker
              selected={deadline}
              onChange={(date) =>
                setDeadline(
                  moment(date).utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]")
                )
              }
              className="block w-full px-5 py-3  text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
        </div>

        <div className="col-span-12 justify-center items-center">
          <button className="flex font-bold text-xl items-center mx-auto justify-center w-full px-6 py-4 tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
            <span>Post Job</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 rtl:-scale-x-100"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  )};
