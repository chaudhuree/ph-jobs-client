import { useNavigate } from "react-router-dom";
export default function Cta() {
  const navigate = useNavigate();
  return (
    <div className=" mt-[2rem] flex flex-wrap gap-8 justify-between bg-[#EAEAEA] p-[5rem] rounded-[10px]">
      <div>
        <h1 className="text-blueColor text-[30px] font-bold">
          
          Ready to switch a career
        </h1>
        <h2 className="text-textColor text-[20px] font-bold">
          Let's get started!
        </h2>
      </div>
      <button onClick={()=>navigate('/alljobs')} className="border-[2px] rounded-[10px] py-[4px] px-[50px] text-[18px] font-semibold text-blueColor hover:bg-white border-blueColor">
        Get Started
      </button>
    </div>
  );
}
