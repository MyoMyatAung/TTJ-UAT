// import React, { startTransition, useEffect, useState } from "react";
// import back from "../../assets/login/back.svg";
// import eye from "../../assets/login/eye.svg";
// import Captch from "./Captch";
// import Opt from "./Opt";
// import { motion, AnimatePresence } from "framer-motion";
// import eyeClose from "../../assets/login/eyeClose.svg";
// import "../../pages/login/login.css";
// import { useDispatch, useSelector } from "react-redux";
// import CloseBtn from "../../assets/svg/CloseBtn";
// import BackBtn from "../../assets/svg/BackBtn";
// import {
//   setAuthModel,
//   setCaptchaOpen,
//   setLoginOpen,
//   setSignupOpen,
// } from "../../features/login/ModelSlice";
// import axios from "axios";
// import Capt from "./forgot/Capt";
// // import { RecoverPassword } from "../../services/userService";
// import Panding from "./Panding";
// import Verify from "./forgot/Varify";
// import { showToast } from "../../pages/profile/error/ErrorSlice";
// import ErrorToast from "../../pages/profile/error/ErrorToast";
// import { selectTheme } from "../../pages/search/slice/ThemeSlice";
// import SecQues from "./forgot/SecQues";
// import Loader from "./Loader";
// import { get_ques_forgot } from "../../services/userService";

// interface ForgotPassProps {
//   setForgot: React.Dispatch<React.SetStateAction<boolean>>;
//   forgot: boolean;
// }

// const ForgotPass: React.FC<ForgotPassProps> = ({ setForgot }) => {
//   const darkmode = useSelector(selectTheme);
//   const [graphicKey, setGraphicKey] = useState<string | null>(null);

//   const dispatch = useDispatch();
//   const { openCaptcha, captchaCode, captchaKey } = useSelector(
//     (state: any) => state.model
//   );
//   const [panding, setPanding] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showRePassword, setShowRePassword] = useState(false);
//   const [showCapt, setShowCapt] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [isVisible, setIsVisible] = useState(true);
//   const [showVerify, setShowVerify] = useState<boolean>(false);
//   const [isFocusedEmail, setIsFocusedEmail] = useState(false);
//   const [isFocusedPassword, setIsFocusedPassword] = useState(false);
//   const [showQuestion, setShowQuestion] = useState(false);
//   const [ques_id, setQues_id] = useState<any>();
//   const [ques, setQues] = useState<any>("");

//   const validatePassword = (password: string) => {
//     const lengthValid = password.length >= 6 && password.length <= 25;
//     const containsLetters = /[a-zA-Z]/.test(password);
//     const containsNumbers = /\d/.test(password);
//     return lengthValid && containsLetters && containsNumbers;
//   };

//   const show = () => {
//     setShowPassword(!showPassword);
//   };

//   const Reshow = () => {
//     setShowRePassword(!showRePassword);
//   };

//   const passwordsMatch = (password: string, confirmPassword: string) => {
//     return password === confirmPassword;
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const validationError = validatePassword(email);
//     // console.log(validationError);
//     if (!validationError) {
//       dispatch(showToast({ message: "请输入5-25位用户名", type: "error" }));
//       return;
//     }
//     setShowCapt(true);
//   };

//   const variants = {
//     hidden: { y: 300 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { type: "spring", stiffness: 100, damping: 20 },
//     },
//     exit: {
//       y: "100%",
//       transition: { type: "tween", duration: 0.5 },
//     },
//   };

//   const handleDragEnd = (event: any, info: any) => {
//     if (info.offset.y > 100) {
//       setIsVisible(false);
//     }
//   };

//   const getAnswer = async () => {
//     setPanding(true);
//     try {
//       const data = await get_ques_forgot(email, graphicKey);
//       if (data) {
//         // console.log(data.data);
//         setQues(data.data[0].question);
//         setQues_id(data.data[0].id);
//         setIsVisible(false);
//         setShowQuestion(true);
//       } else {
//         throw new Error();
//       }
//     } catch (error: any) {
//       const msg = error.response.data.msg;
//       dispatch(showToast({ message: msg, type: "error" }));
//     }
//     setPanding(false);
//   };

//   useEffect(() => {
//     if (graphicKey) {
//       getAnswer();
//     } else {
//       return;
//     }
//   }, [graphicKey]);
//   // console.log(ques, ques_id);

//   const closeAllModals = () => {
//     startTransition(() => {
//       dispatch(setAuthModel(false));
//       dispatch(setLoginOpen(false));
//       dispatch(setSignupOpen(false));
//     });
//   };
//   return (
//     <>
//       {panding && <Loader />}
//       {showQuestion && <SecQues graphicKey={graphicKey} email={email} ques={ques} ques_id={ques_id} />}

//       {isVisible && (
//         <div className=" min-h-screen flex items-center justify-center overflow-hidde fixed z-[99999]">
//           {showCapt && (
//             <Capt
//               setGraphicKey={setGraphicKey}
//               setShowCapt={setShowCapt}
//               password={password}
//               confirmPassword={confirmPassword}
//               email={email}
//             />
//           )}

//           <motion.div
//             className={`login_box h-[480px] fixed bottom-0 z-[9999] w-screen py-4 px-[20px] ${
//               darkmode ? "bg-[#2B2B2D]" : "bg-white"
//             } rounded-t-2xl`}
//             initial="hidden"
//             animate="visible"
//             exit="exit"
//             variants={variants}
//             drag="y"
//             dragConstraints={{ top: 0 }}
//             dragElastic={0.2}
//             onDragEnd={handleDragEnd}
//           >
//             <div className="flex flex-col justify-center items-center gap-[16px]">
//               <motion.p className="w-[60px] h-[4px] drag_line mt-[8px] cursor-pointer bg-gray-400"></motion.p>
//               <div className="flex justify-between items-center w-full pb-[20px]">
//                 <div
//                   className="p-3 cursor-pointer"
//                   onClick={() => setForgot(false)}
//                 >
//                   {darkmode ? (
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       width="24"
//                       height="24"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                     >
//                       <path
//                         d="M7.828 10.9999H20V12.9999H7.828L13.192 18.3639L11.778 19.7779L4 11.9999L11.778 4.22192L13.192 5.63592L7.828 10.9999Z"
//                         fill="white"
//                       />
//                     </svg>
//                   ) : (
//                     <BackBtn />
//                   )}
//                 </div>
//                 <h2
//                   className={`text-[18px] font-[600] leading-[20px] ${
//                     darkmode ? " text-white" : "text-black"
//                   }`}
//                 >
//                   找回密码
//                 </h2>

//                 <div className="p-3 cursor-pointer" onClick={closeAllModals}>
//                   {darkmode ? (
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       width="10"
//                       height="10"
//                       viewBox="0 0 10 10"
//                       fill="none"
//                     >
//                       <path
//                         d="M5 3.88906L8.88906 0L10 1.11094L6.11094 5L10 8.88906L8.88906 10L5 6.11094L1.11094 10L0 8.88906L3.88906 5L0 1.11094L1.11094 0L5 3.88906Z"
//                         fill="white"
//                         fill-opacity="0.8"
//                       />
//                     </svg>
//                   ) : (
//                     <CloseBtn />
//                   )}
//                 </div>
//               </div>

//               <form
//                 onSubmit={handleSubmit}
//                 className="w-full flex flex-col gap-[40px] px-[10px]"
//               >
//                 <div className="relative ">
//                   <input
//                     type="text"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     onFocus={() => setIsFocusedEmail(true)}
//                     onBlur={() => setIsFocusedEmail(email !== "")}
//                     className={`w-full px- py-2 ${
//                       darkmode ? "input_border_dark" : "input_border"
//                     }  bg-transparent focus:outline-none ${
//                       darkmode ? "text-white" : "text-black"
//                     } placeholder-[#5B5B5B]`}
//                     required
//                     placeholder="请输入您的用户名"
//                   />
//                 </div>

//                 <button
//                   // disabled={!validatePassword(email)}
//                   type="submit"
//                   className={`w-full text-[14px] text-white font-[600] leading-[22px]  mt-[20px] py-[10px] px-[16px] rounded-[80px] ${
//                     validatePassword(password) ? "next_button " : "next_button"
//                   } transition duration-300 ease-in-out`}
//                 >
//                   注册
//                 </button>
//               </form>

//               {/* <button className=" bg-white text-black px-2 py-2" onClick={getOtp}>test</button> */}

//               {/* {error && <p className="text-red-500 mt-2">{error}</p>} */}
//             </div>
//           </motion.div>
//         </div>
//       )}
//       <ErrorToast />
//     </>
//   );
// };

// export default ForgotPass;

import React, { useEffect, useState } from "react";
import back from "../../assets/login/back.svg";
import eye from "../../assets/login/eye.svg";
import Captch from "./Captch";
import Opt from "./Opt";
import eyeClose from "../../assets/login/eyeClose.svg";
import "../../pages/login/login.css";
import { useDispatch, useSelector } from "react-redux";
import { setCaptchaOpen } from "../../features/login/ModelSlice";
import axios from "axios";
import Capt from "./forgot/Capt";
// import { RecoverPassword } from "../../services/userService";
import Panding from "./Panding";
import Verify from "./forgot/Varify";
import { showToast } from "../../pages/profile/error/ErrorSlice";
import ErrorToast from "../../pages/profile/error/ErrorToast";

interface ForgotPassProps {
  setForgot: React.Dispatch<React.SetStateAction<boolean>>;
  forgot: boolean;
}

const ForgotPass: React.FC<ForgotPassProps> = ({ setForgot }) => {
  const dispatch = useDispatch();
  const { openCaptcha, captchaCode, captchaKey } = useSelector(
    (state: any) => state.model
  );
  const [panding, setPanding] = useState(false);
  const [accessToken, setToken] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [showVerify, setShowVerify] = useState<boolean>(false);
  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [isFocusedPassword, setIsFocusedPassword] = useState(false);
  const [isFocusedConfirmPassword, setIsFocusedConfirmPassword] =
    useState(false); // Focus state for confirm password

  const validatePassword = (password: string) => {
    const lengthValid = password.length >= 8 && password.length <= 25;
    const containsLetters = /[a-zA-Z]/.test(password);
    const containsNumbers = /\d/.test(password);
    return lengthValid && containsLetters && containsNumbers;
  };

  const RevalidatePassword = (password: string) => {
    const lengthValid = confirmPassword.length >= 8 && password.length <= 25;
    const containsLetters = /[a-zA-Z]/.test(password);
    const containsNumbers = /\d/.test(password);
    return lengthValid && containsLetters && containsNumbers;
  };

  const show = () => {
    setShowPassword(!showPassword);
  };

  const Reshow = () => {
    setShowRePassword(!showRePassword);
  };

  const passwordsMatch = (password: string, confirmPassword: string) => {
    return password === confirmPassword;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!passwordsMatch(password, confirmPassword)) {
      dispatch(showToast({ message: "密码不匹配", type: "error" }));
      return;
    }
    dispatch(setCaptchaOpen(true));
  };

  return (
    <>
      {panding && <Panding />}

      {isVisible && (
        <div className=" w-screen h-screen bg-[#161619] fixed top-0 z-[99990088]">
          {openCaptcha && (
            <Capt
              password={password}
              confirmPassword={confirmPassword}
              email={email}
            />
          )}
          <div className="p-[20px]">
            {/* head */}
            <div className=" flex justify-center items-center ">
              <img
                className=" absolute top-[20px] left-[20px] z-[9090]"
                onClick={() => setForgot(false)}
                src={back}
                alt="Back"
              />
              <h1 className="text-white text-[16px] font-[600] leading-[20px]">
                找回密码
              </h1>
              {/* <div className=""></div> */}
            </div>
            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col gap-[40px] pt-[40px] px-[10px]"
            >
              <div className="relative">
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setIsFocusedEmail(true)}
                  onBlur={() => setIsFocusedEmail(email !== "")}
                  className="w-full px- py-2 bg-transparent input_border focus:outline-none text-white placeholder-[#5B5B5B]"
                  required
                  placeholder=" 请输入手机号/邮箱"
                />
                {/* <label
                  htmlFor="email"
                  className={`absolute  text-[14px] left-4 transition-all text-[#5B5B5B] pointer-events-none ${
                    isFocusedEmail || email
                      ? "top-0 text-xs text-blue-500 -translate-y-full"
                      : "top-1/2 transform -translate-y-1/2"
                  }`}
                >
                 请输入手机号/邮箱
                </label> */}
              </div>

              {/* Password input */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setIsFocusedPassword(true)}
                  onBlur={() => setIsFocusedPassword(password !== "")}
                  className="w-full px- py-2 bg-transparent input_border focus:outline-none text-white placeholder-[#5B5B5B]"
                  required
                  placeholder="输入新密码"
                  minLength={8}
                  maxLength={25}
                />
                {/* <label
                  htmlFor="password"
                  className={`absolute text-[14px] left-4 transition-all text-[#5B5B5B] pointer-events-none ${
                    isFocusedPassword || password
                      ? "top-0 text-xs text-blue-500 -translate-y-full"
                      : "top-1/2 -translate-y-1/2"
                  }`}
                >
                 输入新密码
                </label> */}
                <div
                  onClick={show}
                  className=" w-[50px] flex justify-end items-center absolute right-0 bottom-[15px] h-[10px]"
                >
                  <img
                    className=""
                    src={showPassword ? eye : eyeClose}
                    alt="Show Password"
                  />
                </div>
              </div>

              {/* Confirm Password input */}
              <div className="relative">
                <input
                  type={showRePassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onFocus={() => setIsFocusedConfirmPassword(true)}
                  onBlur={() =>
                    setIsFocusedConfirmPassword(confirmPassword !== "")
                  }
                  className="w-full px- py-2 bg-transparent input_border focus:outline-none text-white placeholder-[#5B5B5B]"
                  required
                  placeholder="再次输入新密码"
                  minLength={8}
                  maxLength={25}
                />
                {/* <label
                  htmlFor="confirm-password"
                  className={`absolute text-[14px] left-4 transition-all text-[#5B5B5B] pointer-events-none ${
                    isFocusedConfirmPassword || confirmPassword
                      ? "top-0 text-xs text-blue-500 -translate-y-full"
                      : "top-1/2 -translate-y-1/2"
                  }`}
                >
                 再次输入新密码
                </label> */}
                <div
                  onClick={Reshow}
                  className=" w-[50px] flex justify-end items-center absolute right-0 bottom-[15px] h-[10px]"
                >
                  <img
                    className=""
                    src={showRePassword ? eye : eyeClose}
                    alt="Show Password"
                  />
                </div>
              </div>

              {/* Notice */}
              <div
                className={` mt-[-20px] text-[14px] font-[500] leading-[20px] ${
                  validatePassword(password) ? " text-[#00A048]" : "text-[#888]"
                }  `}
              >
                <p>8-25个字符</p>
                <p>必须是以下两者中的至少两种组合：字母，数字</p>{" "}
                {/* <p>letters, numbers.</p> */}
              </div>
              <button
                disabled={!validatePassword(password)}
                type="submit"
                className={`w-full text-[14px] font-[600] leading-[22px]  mt-[20px] py-[10px] px-[16px] rounded-[80px] ${
                  !validatePassword(password) &&
                  !RevalidatePassword(confirmPassword)
                    ? "login_button text-white"
                    : "next_button text-[#fff]"
                } transition duration-300 ease-in-out`}
              >
                下一步
              </button>
            </form>
          </div>
        </div>
      )}
      <ErrorToast />
    </>
  );
};

export default ForgotPass;
