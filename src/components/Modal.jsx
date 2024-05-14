import React, { useState } from "react";
import { useMutation ,useQueryClient} from "@tanstack/react-query";
import { getAuth } from "firebase/auth";
import axiosSecure from "../hooks/useAxiosHook";
import { toast } from "react-toastify";

const Modal = ({ isOpen, onClose, jobTitle,jobId }) => {
  const auth = getAuth();
  const [email, setEmail] = useState(auth.currentUser.email || "");
  const [displayName, setDisplayName] = useState(
    auth.currentUser.displayName || ""
  );
  const [resumeLink, setResumeLink] = useState("");
  const queryClient = useQueryClient();
  const {mutateAsync} = useMutation({
    mutationFn: async ({jobId,resumeLink}) => {
      const { data } = await axiosSecure.post(`/apply`, {
        jobId,
        resumeLink,
      });
      return data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({queryKey:["job",jobId]});
      onClose();
    },
    onError: (error) => {
      toast.error(error.response.data.message);
      onClose();
    },
 

  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    
    await mutateAsync({jobId,resumeLink});
  };

  return (
    <div
      className={`${
        isOpen ? "fixed inset-0 z-10 overflow-y-auto" : "hidden"
      } flex items-center justify-center`}
    >
      <div className="fixed inset-0 transition-opacity" aria-hidden="true">
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <div className="relative inline-block align-bottom bg-white dark:bg-gray-700 rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div>
          <h3 className="text-lg  font-medium leading-6 text-gray-800 capitalize dark:text-white">
            Apply For {jobTitle}
          </h3>
          

          <form onSubmit={handleSubmit} className="mt-4">
            <label key="email" className="block mt-3" htmlFor="email">
              <input
                disabled
                type="email"
                name="email"
                id="email"
                placeholder="user@email.xyz"
                value={email}
                className="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
              />
            </label>
            <label
              key="displayName"
              className="block mt-3"
              htmlFor="displayName"
            >
              <input
                disabled
                type="text"
                name="displayName"
                id="displayName"
                placeholder="John Doe"
                value={displayName}
                className="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
              />
            </label>
            <label key="resumeLink" className="block mt-3" htmlFor="resumeLink">
              <input
                type="text"
                name="resumeLink"
                id="resumeLink"
                placeholder="your resume link"
                value={resumeLink}
                onChange={(e) => setResumeLink(e.target.value)}
                className="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
              />
            </label>

            <div className="mt-4 sm:flex sm:items-center sm:-mx-2">
              <button
                type="button"
                onClick={onClose}
                className="w-full px-4 py-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:w-1/2 sm:mx-2 dark:text-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-900 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="w-full px-4 py-2 mt-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md sm:mt-0 sm:w-1/2 sm:mx-2 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
              >
                Apply
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const ModalExample = ({ jobTitle, jobId }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative flex justify-center">
      <button
        onClick={openModal}
        className="px-20 py-4 mx-auto tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
      >
        Apply Now
      </button>

      <Modal isOpen={isOpen} onClose={closeModal} jobTitle={jobTitle} jobId={jobId} />
    </div>
  );
};

export default ModalExample;
