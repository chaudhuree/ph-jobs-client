import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../hooks/useAxiosHook";
import { Link } from "react-router-dom";
import Markdown from "react-markdown";
import moment from "moment";
import TruncatedText from "../components/TruncatedText";
export default function Blogs() {
  const {
    data: blogs = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: "blogs",
    queryFn: async () => {
      const { data } = await axiosSecure("/blogs");
      return data.blogs;
    },
  });
  if (isLoading)
    return (
      <div className="flex justify-center items-center w-full p-5 dark:text-primary h-screen">
        <span className="loading loading-ball loading-xs dark:text-primary"></span>
      </div>
    );

  return (
    <div className="mx-auto container px-5">
      <Helmet>
        <title>Blogs</title>
      </Helmet>

      <section className="bg-white dark:bg-gray-900">
        <div className="container px-6 py-10 mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-semibold lg:font-bold text-gray-800 capitalize  dark:text-white">
              Innovation Depot
            </h1>

            <p className="max-w-lg text-lg md:text-xl mx-auto mt-4 text-gray-500">
              Fuel Your Mind with the Latest Insights and Trends
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 mt-8 lg:grid-cols-2">
            {blogs?.map((blog) => (
              <div>
                <img
                  className="relative z-10 object-cover w-full rounded-md h-96"
                  src={blog.banner}
                  alt="blog banner image"
                />

                <div className="relative z-20 max-w-lg p-6 mx-auto -mt-20 bg-white rounded-md shadow dark:bg-gray-900 lg:h-[228px] flex flex-col">
                  <Link
                    to={`/blog/${blog._id}`} 
                    className="font-semibold  hover:underline md:text-xl text-transparent bg-gradient-to-tr bg-clip-text from-blue-500 via-sky-500 to-blue-500 dark:from-sky-300 dark:via-blue-300 dark:to-sky-500"
                  >
                    <Markdown >{blog.title}</Markdown>
                  </Link>

                  <p className="mt-3  text-sm text-gray-500 dark:text-gray-300 md:text-sm flex-1">
                    <Markdown>{blog.description}</Markdown>
                  </p>

                  <p className="mt-3 text-sm text-blue-500">{
                    moment(blog.createdAt).format("MMMM Do YYYY")
                  }</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
