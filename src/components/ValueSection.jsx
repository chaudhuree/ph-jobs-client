import simple from "/simple.png";
import valentine from "/valentine.png";
import shield from "/shield.png";
export default function ValueSection() {
  return (
    <div className="mb-[4rem] mt-[6rem] ">
      <h1 className="text-textColor dark:text-gray-300 text-[25px] py-[2rem] pb-[3rem] font-bold w-[400px] block">
        {" "}
        The Value that holds us true and to account{" "}
      </h1>
      <div className="grid gap-5 grid-cols-12 items-center">
        <div className="singleGrid col-span-12 md:col-span-6 lg:col-span-4 rounded-[10px] hover:bg-[#E7F5FF] dark:hover:bg-gray-800 p-[1.5rem]">
          <div className="flex items-center gap-3">
            <div className="imgDiv p-[4px] rounded-[.8rem] bg-[#dedef8] h-[40px] w-[40px] flex items-center justify-center">
              <img src={simple} alt="" className="w-[90%]" />
            </div>
            <span className="font-semibold text-textColor dark:text-gray-300 text-[18px]">
              Simplicity
            </span>
          </div>
          <p className="text-[13px] text-textColor dark:text-gray-300 opacity-[0.7] py-[1rem] font-semibold ">
            {" "}
            Things being made beautifuk simple are at the heart of Everything we
            do.
          </p>
        </div>

        <div className="singleGrid col-span-12 md:col-span-6 lg:col-span-4 rounded-[10px] hover:bg-[#f7edf5] dark:hover:bg-gray-800 p-[1.5rem]">
          <div className="flex items-center gap-3">
            <div className="imgDiv p-[4px] rounded-[.8rem] bg-[#F4C2E0] h-[40px] w-[40px] flex items-center justify-center">
              <img src={valentine} alt="" className="w-[90%]" />
            </div>
            <span className="font-semibold dark:text-gray-300 text-textColor text-[18px]">
              Motivated
            </span>
          </div>
          <p className="text-[13px] dark:text-gray-300 text-textColor opacity-[0.7] py-[1rem] font-semibold ">
            {" "}
            We believe in making things better for everyone, even if just by a
            little bit!{" "}
          </p>
        </div>

        <div className="singleGrid col-span-12 md:col-span-6 lg:col-span-4 rounded-[10px] hover:bg-[#fcfae3] dark:hover:bg-gray-800 p-[1.5rem]">
          <div className="flex items-center gap-3">
            <div className="imgDiv p-[4px] rounded-[.8rem] bg-[#FFE8A7] h-[40px] w-[40px] flex items-center justify-center">
              <img src={shield} alt="" className="w-[90%]" />
            </div>
            <span className="font-semibold dark:text-gray-300 text-textColor text-[18px]">
            Dedicated
            </span>
          </div>
          <p className="text-[13px] dark:text-gray-300 text-textColor opacity-[0.7] py-[1rem] font-semibold ">
            {" "}
            We working on the basis of creating trust which can be nurtured
            through authenticity
          </p>
        </div>
      </div>
    </div>
  );
}
