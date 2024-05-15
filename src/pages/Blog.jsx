import axiosSecure from '../hooks/useAxiosHook';
import {useQuery} from '@tanstack/react-query'
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import Markdown from 'react-markdown'
export default function Blog() {
  const {id} = useParams();
  const {data: blogData, isLoading, isError, error} = useQuery({
    queryKey: ['blog', id],
    queryFn: async () => {
      const {data} = await axiosSecure(`/blogs/${id}`);
      return data.blog;
    }
  });
    
  if (isLoading) return <div className='flex justify-center items-center w-full p-5 dark:text-primary h-screen'>
    <span className='loading loading-ball loading-xs dark:text-primary'></span>
  </div>
  return (
    <div className='container mx-auto px-5'>
      <Helmet>
        <title>{blogData?.title}</title>
      </Helmet>
       
    <div className="container flex flex-col px-6 py-10 mx-auto space-y-6 lg:h-[32rem] lg:py-16 lg:flex-row lg:space-x-4 lg:items-center">
    <div className="w-full lg:w-1/2">
        <div className="lg:max-w-lg">
        <Markdown className="text-3xl md:text-4xl  lg:text-4xl text-center my-4  text-transparent bg-gradient-to-tr bg-clip-text from-blue-500 via-sky-500 to-blue-500 dark:from-sky-300 dark:via-blue-300 dark:to-sky-500">{blogData?.title}</Markdown>
        <Markdown className="dark:text-gray-300 text-gray-500 text-lg md:text-lg max-w-5xl mx-auto text-center my-8">{blogData?.description}</Markdown>
            
        </div>
    </div>

    <div className="flex items-center justify-center w-full h-40 md:h-96 lg:w-1/2">
        <img className="max-md:object-contain object-cover w-full h-full max-w-2xl rounded-md" src={blogData.banner} alt="blog banner photo" style={{backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat"}}/>
    </div>
</div>

<Markdown className="text-gray-800 dark:text-gray-400 text-base md:text-lg text-justify my-4">{blogData?.content}</Markdown>
    </div>
  )
}
