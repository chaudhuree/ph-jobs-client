import moment from "moment";
import {Link } from "react-router-dom";
export default function TableWithoutPagination({ jobsData=[] }) {
  return (
    <section className=" mx-auto container">
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
                      Job Title
                    </th>

                    <th
                      scope="col"
                      className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Salary Range
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Applied On
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Deadline
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Status
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Details
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                  {jobsData?.length === 0
                    ? (<tr> <td className="text-center p-5 text-xl text-bold text-orange-500" colSpan={6}>no jobs found</td></tr>)
                    : jobsData?.map((job) => (
                        <tr key={job._id}>
                          <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                            <div>
                              <h2 className="font-medium text-gray-800 dark:text-white ">
                                {job.job.jobTitle}
                              </h2>
                            </div>
                          </td>
                          <td className="px-12 py-4 text-sm font-medium whitespace-nowrap">
                            <div className="inline px-3 py-1 text-sm font-normal rounded-full text-emerald-500 gap-x-2 bg-emerald-100/60 dark:bg-gray-800">
                              {job.job.salaryRange}
                            </div>
                          </td>
                          <td className="px-4 py-4 text-sm whitespace-nowrap">
                            <div>
                              <p className="text-gray-500 dark:text-gray-400">
                                {moment(job.appliedDate).format("MMM Do YY")}
                              </p>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-sm whitespace-nowrap">
                            <div className="flex items-center">
                              <p className="text-gray-500 dark:text-gray-400">
                                {moment(job.job.deadline).fromNow()}
                              </p>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-sm whitespace-nowrap">
                            <div className="flex items-center">
                              <p className="text-gray-500 dark:text-gray-400">
                                {job.status}
                              </p>
                            </div>
                          </td>

                          <td className="px-4 py-4 text-sm whitespace-nowrap">
                            <Link
                              to={`/job/${job.job._id}`}
                              className="text-blue-500 dark:text-blue-400"
                            >
                              View
                            </Link>
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
