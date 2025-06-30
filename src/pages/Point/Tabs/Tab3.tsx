import React from "react";
import ImageWithPlaceholder from "../../../components/home/bannerPlaceholder";

interface Tab3Props {
  inviteList: any;
}

const Tab3: React.FC<Tab3Props> = ({ inviteList }) => {
  const list = inviteList?.data.list;
  const formatTimestamp = (timestamp: number): string => {
    const date = new Date(timestamp * 1000);

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${year}-${month}-${day} - ${hours}:${minutes}`;
  };
  // console.log(list);
  return (
    <div className=" flex flex-col">
      {list.length === 0 ? (
        <div className=" h-[600px] member_pag">
          <div className="flex flex-col h-full justify-center items-center w-full gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="41"
              viewBox="0 0 32 41"
              fill="none"
            >
              <path
                d="M32 36.3636C32.0036 37.909 30.9018 39.2381 29.3818 39.5181C24.9655 40.3199 20.4875 40.7254 16.0001 40.7272C11.5165 40.7254 7.04016 40.3235 2.62908 39.5236C1.10184 39.2472 -0.00547199 37.9145 2.03413e-05 36.3636C0.00365645 32.5072 1.5382 28.8107 4.26546 26.0836C6.99273 23.3564 10.6892 21.8219 14.5454 21.8182H17.4545C21.3109 21.8218 25.0074 23.3564 27.7345 26.0836C30.4617 28.8109 31.9963 32.5073 32 36.3636ZM16.0001 20.3637C18.7001 20.3637 21.2909 19.291 23.2002 17.3819C25.1094 15.4729 26.1819 12.8819 26.1819 10.1818C26.1819 7.48176 25.1092 4.89106 23.2002 2.98177C21.2911 1.07249 18.7002 0 16.0001 0C13.3 0 10.7093 1.07273 8.80003 2.98177C6.89075 4.89082 5.81826 7.48176 5.81826 10.1818C5.82189 12.8818 6.89461 15.4689 8.80371 17.3782C10.7128 19.2873 13.3001 20.36 16.0001 20.3637Z"
                fill="url(#paint0_linear_1224_6761)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_1224_6761"
                  x1="16"
                  y1="40.7272"
                  x2="16"
                  y2="0"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#444444" stop-opacity="0.2" />
                  <stop offset="1" stop-color="#AAAAAA" stop-opacity="0.36" />
                </linearGradient>
              </defs>
            </svg>
            <h1 className=" text-[#888] text-[14px] font-[400]">
              没有受邀用户
            </h1>
          </div>
        </div>
      ) : (
        <>
          {list?.map((ll: any) => (
            <div className=" py-[20px] flex gap-[16px] justify-cente items-center w-full">
              <ImageWithPlaceholder
                alt="avatar"
                src={ll.avatar}
                width={40}
                height={40}
                className={"rounded-full"}
              />
              {/* <img
              className=" w-[40px] h-[40px] rounded-full"
              src={ll.avatar}
              alt=""
            /> */}
              <div className="">
                <h1 className=" text-white text-[14px] font-[500] leading-[20px]">
                  {ll.nickname}
                </h1>
                <span className=" text-[#888] text-[12px] font-[400]">
                  {formatTimestamp(ll.create_time)}
                </span>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Tab3;
