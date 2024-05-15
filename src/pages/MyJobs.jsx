import axiosSecure from "../hooks/useAxiosHook"
import { getAuth } from "firebase/auth"
import { useQuery,useMutation,useQueryClient } from "@tanstack/react-query"
import MyPostedJobsTable from "../components/MyPostedJobsTable"
import { Helmet } from "react-helmet"
export default function MyJobs() {
  const auth = getAuth()
  const queryClient = useQueryClient()
  const { data:jobs, error, isLoading } = useQuery({
    queryKey: ["myjobs", auth?.currentUser?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/postedjobs")
      return data.jobs
    },
  })
  if (isLoading)
    return (
      <div className="flex justify-center items-center w-full p-5 dark:text-primary h-screen">
        <span className="loading loading-ball loading-xs dark:text-primary"></span>
      </div>
    );
    // console.log(jobs);
    
  return (
    <div className="container mx-auto px-5">
      <Helmet>
        <title>My Jobs</title>
      </Helmet>
      {jobs.length === 0 ? (
        <div className="flex justify-center items-center w-full p-5 dark:text-primary">
          <span className="text-xl text-bold text-orange-500">no jobs found</span>
        </div>
      ) : (
        <MyPostedJobsTable jobsData={jobs} />
      )
      
      }
    </div>
  )
}
