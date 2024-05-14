import { useParams } from "react-router-dom"
import { Helmet } from "react-helmet"
import { useEffect, useState } from "react"
import { useQuery,useQueryClient } from "@tanstack/react-query"
import axiosSecure from "../hooks/useAxiosHook"
import ApplicantListTable from "../components/ApplicantListTable"
export default function ApplicantList() {
  const [currentPage, setCurrentPage] = useState(1)
  const [limit, setLimit] = useState(2)
  const { id } = useParams()
  const queryClient = useQueryClient()
  const {data:list,isLoading,isError} = useQuery({
    queryKey: ["applicantList",id,currentPage,limit],
    queryFn: () => axiosSecure.get(`/appliedjobs/${id}?page=${currentPage}&limit=${limit}`),
  })
  console.log('list',list?.data?.applicants);
  console.log('total',list?.data?.totalApplicants);
  if (isLoading)
    return (
      <div className="flex justify-center items-center w-full p-5 dark:text-primary">
        <span className="loading loading-ball loading-xs dark:text-primary"></span>
      </div>
    );
  return (
    <div className="container mx-auto px-5">
      <Helmet>
        <title>Applicant List</title>
      </Helmet>
      <ApplicantListTable
        jobsData={list?.data?.applicants}
        total={list?.data?.totalApplicants}
        limit={limit}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  )
}
