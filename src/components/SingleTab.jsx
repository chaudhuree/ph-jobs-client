import axiosSecure from "../hooks/useAxiosHook";
import { useQuery } from "@tanstack/react-query";
import SingleCardComponent from "./SingleCardComponent";
export default function SingleTab({ category, limit }) {
  const {
    data: categoryBasedData = [],
    error,
    isLoading,
  } = useQuery({
    queryFn: () => getData(),
    queryKey: ["categoryBasedData", category, limit],
  });
  const getData = async () => {
    const { data } = await axiosSecure.get(`/jobs/${category}/${limit}`);
    return data.jobs;
  };
  if (isLoading)
    return (
      <div className="flex justify-center items-center w-full p-5 dark:text-primary">
        <span className="loading loading-ball loading-xs dark:text-primary"></span>
      </div>
    );
  if (categoryBasedData?.length === 0)
    return (
      <div className="flex justify-center items-center w-full p-5 dark:text-gray-300">
        No jobs found
      </div>
    );
  return (
    <div className="flex flex-wrap gap-5 items-center justify-center py-5">
      {categoryBasedData.map(
        ({
          _id,
          recruiterName,
          jobTitle,
          createdAt,
          deadline,
          salaryRange,
          applicants,
        }) => (
          <SingleCardComponent
            key={_id}
            id={_id}
            recruiter={recruiterName}
            jobTitle={jobTitle}
            createdAt={createdAt}
            deadline={deadline}
            salaryRange={salaryRange}
            applicants={applicants}
          />
        )
      )}
    </div>
  );
}
