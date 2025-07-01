import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAuthModel } from "../../../features/login/ModelSlice";
import { setSignupOpen } from "../../../features/login/ModelSlice";
import { setLoginOpen } from "../../../features/login/ModelSlice";
import CloseBtn from "../../../assets/svg/CloseBtn";
import { selectTheme } from "../../../pages/search/slice/ThemeSlice";
import back from "../../../assets/login/back.svg";
import ForgotPass from "../ForgotPass";
import ForgotQues from "../ForgotQues";

interface OptionsProps {
  setForgot: React.Dispatch<React.SetStateAction<boolean>>;
  forgot: boolean;
}

const Options: React.FC<OptionsProps> = ({ setForgot }) => {
  const [isVisible, setIsVisible] = useState(true);
  const dispatch = useDispatch();
  const darkmode = useSelector(selectTheme);
  const [ques, setQues] = useState(false);
  const [code, setCode] = useState(false);

  const handleClose = () => {
    dispatch(setLoginOpen(false));
    dispatch(setSignupOpen(false));
    dispatch(setAuthModel(false));
    setIsVisible(false);
  };

  const variants = {
    hidden: { y: 300 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
    exit: {
      y: "100%",
      transition: { type: "tween", duration: 0.5 },
    },
  };

  const handleDragEnd = (event: any, info: any) => {
    if (info.offset.y > 100) {
      setIsVisible(false);
    }
  };

  const handleBack = () => {
    setForgot(false);
  };

  const quesIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="23"
      viewBox="0 0 20 23"
      fill="none"
    >
      <path
        d="M16.9762 2.36531L11.3625 0.261563C10.4287 -0.0871875 8.89874 -0.0871875 7.96499 0.261563L2.35125 2.36531C1.0575 2.84906 0 4.37906 0 5.75156V14.1103C0 15.4378 0.8775 17.1816 1.94625 17.9803L6.78375 21.5916C8.36999 22.7841 10.98 22.7841 12.5662 21.5916L17.4037 17.9803C18.4725 17.1816 19.35 15.4378 19.35 14.1103V5.75156C19.3275 4.37906 18.27 2.84906 16.9762 2.36531ZM9.58499 5.65031C10.9125 5.65031 11.9925 6.73031 11.9925 8.05781C11.9925 9.3628 10.9687 10.4091 9.67499 10.4541H9.65249H9.62999C9.60749 10.4541 9.58499 10.4541 9.56249 10.4541C8.21249 10.4091 7.2 9.3628 7.2 8.05781C7.18875 6.73031 8.26874 5.65031 9.58499 5.65031ZM12.1275 16.1466C11.4412 16.5966 10.5525 16.8328 9.66374 16.8328C8.77499 16.8328 7.87499 16.6078 7.2 16.1466C6.55875 15.7191 6.21 15.1341 6.19875 14.4928C6.19875 13.8628 6.55875 13.2553 7.2 12.8278C8.56124 11.9278 10.7775 11.9278 12.1387 12.8278C12.78 13.2553 13.14 13.8403 13.14 14.4816C13.1287 15.1116 12.7687 15.7191 12.1275 16.1466Z"
        fill="white"
      />
    </svg>
  );

  const otpcode = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M5 20.4854C4.20435 20.4854 3.44129 20.1693 2.87868 19.6067C2.31607 19.0441 2 18.281 2 17.4854V7.48535C2 6.6897 2.31607 5.92664 2.87868 5.36403C3.44129 4.80142 4.20435 4.48535 5 4.48535H19C19.7956 4.48535 20.5587 4.80142 21.1213 5.36403C21.6839 5.92664 22 6.6897 22 7.48535V17.4854C22 18.281 21.6839 19.0441 21.1213 19.6067C20.5587 20.1693 19.7956 20.4854 19 20.4854H5ZM7.625 8.70535C7.52313 8.61837 7.40483 8.55274 7.27711 8.51235C7.1494 8.47197 7.01487 8.45766 6.88151 8.47027C6.74816 8.48287 6.61869 8.52214 6.50081 8.58575C6.38292 8.64935 6.27901 8.73599 6.19525 8.84052C6.11149 8.94505 6.04959 9.06535 6.01321 9.19426C5.97684 9.32318 5.96673 9.45809 5.9835 9.59099C6.00026 9.72389 6.04356 9.85206 6.11081 9.9679C6.17806 10.0837 6.2679 10.1849 6.375 10.2654L10.125 13.2664C10.6571 13.6924 11.3184 13.9245 12 13.9245C12.6816 13.9245 13.3429 13.6924 13.875 13.2664L17.625 10.2664C17.7276 10.1843 17.813 10.0828 17.8763 9.96772C17.9396 9.85265 17.9797 9.72622 17.9942 9.59566C18.0087 9.4651 17.9973 9.33297 17.9607 9.2068C17.9241 9.08064 17.8631 8.96291 17.781 8.86035C17.6989 8.75779 17.5974 8.6724 17.4824 8.60905C17.3673 8.5457 17.2409 8.50565 17.1103 8.49116C16.9798 8.47667 16.8476 8.48805 16.7215 8.52462C16.5953 8.5612 16.4776 8.62228 16.375 8.70435L12.625 11.7044C12.4476 11.8464 12.2272 11.9237 12 11.9237C11.7728 11.9237 11.5524 11.8464 11.375 11.7044L7.625 8.70535Z"
        fill="white"
      />
    </svg>
  );

  const handleOpenQues = () => {
    setIsVisible(false);
    setQues(true);
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center overflow-hidden">
      {code && <ForgotPass forgot={code} setForgot={setCode} />}
      {ques && (
        <ForgotQues forgot={ques} setForgot={setQues} parent={setIsVisible} />
      )}
      {isVisible && (
        <AnimatePresence>
          <motion.div
            className="login_box h-[420px] fixed bottom-0 z-[99999] w-screen  py-4 px-[20px] bg-[#fff] dark:bg-[#2B2B2D] dark:text-white rounded-t-2xl"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants}
            drag="y"
            dragConstraints={{ top: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
          >
            <div className="flex flex-col justify-center items-center gap-[16px]">
              <motion.p className="w-[60px] h-[4px] drag_line mt-[1px] mb-[12px] cursor-pointer bg-[#fff]"></motion.p>
              <div className=" flex justify-center items-center w-full pb-[20px] relative">
                <img
                  className="p-2 cursor-pointer fixed z-[999991] left-[20px]"
                  src={back}
                  alt="Back"
                  onClick={handleBack}
                />
                <div className=""></div>
                <h2 className="text-[18px] font-[600] leading-[20px] text-black dark:text-white">
                  找回密码
                </h2>
                <div
                  className="p-3 cursor-pointer fixed z-[999991] right-[20px]"
                  onClick={handleClose}
                >
                  {darkmode ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                    >
                      <path
                        d="M5 3.88906L8.88906 0L10 1.11094L6.11094 5L10 8.88906L8.88906 10L5 6.11094L1.11094 10L0 8.88906L3.88906 5L0 1.11094L1.11094 0L5 3.88906Z"
                        fill="white"
                        fill-opacity="0.8"
                      />
                    </svg>
                  ) : (
                    <CloseBtn />
                  )}
                </div>
              </div>
              <p className=" text-white w-full pl-2 text-[16px] font-[400] text-start">
                Select Your Password Recovery Options
              </p>
              <div className=" w-full flex flex-col gap-[16px] pt-[20px]">
                {/* ques */}
                <div
                  onClick={handleOpenQues}
                  className=" bg-white/10 rounded-[12px] p-[16px] flex flex-col gap-[6px]"
                >
                  <div className=" flex gap-[8px] items-center">
                    {quesIcon}{" "}
                    <span className=" text-white font-[600] text-[16px] leading-[22px]">
                      Security Question
                    </span>{" "}
                  </div>
                  <p className=" text-[14px] font-[500] leading-[22px] text-[#CCC]">
                    For security question registration, select this.
                  </p>
                </div>
                {/* otp */}
                <div
                  onClick={() => setCode(true)}
                  className=" bg-white/10 rounded-[12px] p-[16px] flex flex-col gap-[6px]"
                >
                  <div className=" flex gap-[8px] items-center">
                    {otpcode}{" "}
                    <span className=" text-white font-[600] text-[16px] leading-[22px]">
                      SMS Verificaiton
                    </span>{" "}
                  </div>
                  <p className=" text-[14px] font-[500] leading-[22px] text-[#CCC]">
                    Receive OTP via Email or Phone for recovery.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default Options;
