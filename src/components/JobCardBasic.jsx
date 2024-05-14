import moment from "moment"
import { Link } from "react-router-dom"
export default function JobCardBasic({id,jobTitle,recruiter,jobDescription,category,deadline}) {
 
  return (
    <div className="w-full md:w-[45%] max-w-2xl px-8 py-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
    <div className="flex items-center justify-between">
        <span className="text-sm font-light text-gray-600 dark:text-gray-400">{moment(deadline).fromNow()}</span>
        <a className="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-300 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500" tabindex="0" role="button">{category}</a>
    </div>

    <div className="mt-2">
        <p className="text-xl font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 hover:underline" tabindex="0" role="link">{jobTitle}</p>
        <p className="mt-2 text-gray-600 dark:text-gray-300">{jobDescription}</p>
    </div>

    <div className="flex items-center justify-between mt-4">
        <Link to={`/job/${id}`} className="text-blue-600 dark:text-blue-400 hover:underline" tabindex="0" role="link">View Details</Link>

        <div className="flex items-center">
            <img className="hidden object-cover w-10 h-10 mx-4 rounded-full sm:block" src={recruiter.photoURL} alt="avatar"/>
            <a className="font-bold text-gray-700 cursor-pointer dark:text-gray-200" tabindex="0" role="link">{recruiter.displayName}</a>
        </div>
    </div>
</div>
  )
}
