import React from "react";
import { useNavigate } from "react-router";

type Props = {
  darkmode: boolean;
};

const DetailHeader: React.FC<Props> = ({ darkmode }) => {
  const navigate = useNavigate();
  const handleBackSocial = () => {
    navigate(-1);
  };
  return (
    <div className="fixed bg-gray-300 dark:bg-[#161619] z-[99] w-full top-0 grid grid-cols-3 py-[10px] justify-betwee items-cente">
      <span onClick={handleBackSocial}>
        {!darkmode ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M7.828 11.0002H20V13.0002H7.828L13.192 18.3642L11.778 19.7782L4 12.0002L11.778 4.22217L13.192 5.63617L7.828 11.0002Z"
              fill="black"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M7.828 11H20V13H7.828L13.192 18.364L11.778 19.778L4 12L11.778 4.22205L13.192 5.63605L7.828 11Z"
              fill="white"
            />
          </svg>
        )}
      </span>
      <h1 className=" dark:text-white text-black text-[18px] text-center font-[600] leading-[20px]">
        详情
      </h1>
      <div className=""></div>
    </div>
  );
};

export default DetailHeader;
