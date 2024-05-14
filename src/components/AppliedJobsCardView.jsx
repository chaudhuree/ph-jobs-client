import AppliedJobCard from "./AppliedJobCard";

export default function AppliedJobsCardView({ jobsData }) {
  return (
    <div className="container mx-auto px-5 my-5">
      <div className="flex flex-wrap gap-6 ">
        {jobsData.length === 0 ? (
          <div className="text-center p-5 mx-auto text-xl text-bold text-orange-500">
            no jobs found
          </div>
        ) : (
          jobsData.map((job) => <AppliedJobCard key={job._id} job={job} />)
        )}
      </div>
    </div>
  );
}
