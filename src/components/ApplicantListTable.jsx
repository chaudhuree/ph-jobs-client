import { TiTick,TiTimesOutline  } from "react-icons/ti";
import { Link } from "react-router-dom";
import { FaRegFilePdf } from "react-icons/fa";
import { useQueryClient,useMutation } from "@tanstack/react-query";
import axiosSecure from "../hooks/useAxiosHook";
import {toast} from "react-toastify";
export default function ApplicantListTable({ jobsData,total,limit,currentPage,setCurrentPage }) {
  const queryClient = useQueryClient()
  const {mutateAsync} = useMutation({
    mutationFn: async ({id,status}) => {
      const { data } = await axiosSecure.put(`/appliedjob/${id}`,{
        status: status
      }
      )
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["applicantList"])
      toast.success("Status Updated")
    }
  })
     // calculate page number
     const numberOfPages = Math.ceil(total / limit)
     const pages = [...Array(numberOfPages).keys()].map(element => element + 1)
   
     //  handle pagination button
     const handlePaginationButton = value => {
       setCurrentPage(value)
     }
     const handleStatus = async (id,status) => {
      await mutateAsync({id,status})
    }
  return (
    <section className=" mx-auto">
      <div className="flex flex-col mt-6">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th
                      scope="col"
                      className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Email
                    </th>

                    <th
                      scope="col"
                      className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                     Name
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Resume
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Status
                    </th>
                    <th scope="col"
                    className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                  {jobsData.map((job) => (
                    <tr key={job?._id}>
                      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                        <div>
                          <h2 className="font-medium text-gray-800 dark:text-white ">
                            {job?.user?.email}
                          </h2>
                        </div>
                      </td>
                      <td className="px-12 py-4 text-sm font-medium whitespace-nowrap">
                        <div className="font-medium text-gray-800 dark:text-white">
                          {job?.user?.displayName}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <div>
                          <a
                            href={job?.resume}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-500 dark:text-blue-400"
                          >
                            <FaRegFilePdf className="text-xl ml-4" />
                          </a>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <div className="flex items-center">
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full  dark:text-green-100 ${job.status ==="Accepted" ? "text-blue-800 bg-blue-100 dark:bg-blue-500" : job.status==="Rejected"?"text-red-800 bg-red-100  dark:bg-red-500":"text-green-800 bg-green-100 dark:bg-green-500"}`}>
                            {job?.status}
                          </span>
                        </div>
                      </td>
                      <td className=" py-4 text-sm whitespace-nowrap">
                        <div className="flex ">
                          <button
                            onClick={() => handleStatus(job?._id,"Accepted")}
                            className="text-blue-500 dark:text-blue-400"
                          >
                            <TiTick className="text-xl ml-4" />
                          </button>
                          <button
                            onClick={() => handleStatus(job?._id,"Rejected")}
                            className="text-red-500 dark:text-red-400"
                          >
                            <TiTimesOutline  className="text-xl ml-4" />
                          </button>
                        </div>
                      </td>
                      
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

{/* Pagination Section */}
<div className='flex justify-center mt-12'>
{/* Previous Button */}
<button
  disabled={currentPage === 1}
  onClick={() => handlePaginationButton(currentPage - 1)}
  className='flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800'
>
  <div className='flex items-center -mx-1'>
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='w-6 h-6 mx-1 rtl:-scale-x-100'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        d='M7 16l-4-4m0 0l4-4m-4 4h18'
      />
    </svg>

    <span className='mx-1'>previous</span>
  </div>
</button>
{/* Numbers */}
{pages.map(btnNum => (
  <button
    onClick={() => handlePaginationButton(btnNum)}
    key={btnNum}
    className={`hidden ${
      currentPage === btnNum ? 'bg-blue-500 text-white' : ''
    } px-2 py-2 text-sm mx-1 transition-colors duration-300 transform  rounded-md sm:inline hover:bg-blue-500  hover:text-white`}
  >
    {btnNum}
  </button>
))}
 
{/* Next Button */}
<button
  disabled={currentPage === numberOfPages}
  onClick={() => handlePaginationButton(currentPage + 1)}
  className='flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800'
>
  <div className='flex items-center -ml-1'>
    <span className='mx-1'>Next</span>

    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='w-6 h-6 mx-1 rtl:-scale-x-100'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        d='M17 8l4 4m0 0l-4 4m4-4H3'
      />
    </svg>
  </div>
</button>
</div>
{/*
  ends pagination
*/}
      
    </section>
  );
}
