import "./profile.css";
import { Link, useNavigate } from "react-router-dom"; // Add useNavigate for navigation
import {
  useLazyGetSocialQuery,
  useLazySocialCallbackQuery,
} from "./services/profileApi";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showToast } from "./error/ErrorSlice";
import Loader from "../search/components/Loader";
import { selectTheme } from "../search/slice/ThemeSlice";
import { setCaptchaOpen } from "../../features/login/ModelSlice";
import Captcha from "./components/email/Captcha";
import Otp from "./components/email/Otp";

const Bind = () => {
  const [triggerGetSocial, { isLoading }] = useLazyGetSocialQuery(); // RTK lazy query for sending code
  const [triggerCallback] = useLazySocialCallbackQuery();
  const navigate = useNavigate(); // React Router's navigation function
  const dispatch = useDispatch();
  const darkmode = useSelector(selectTheme);
  const [active, setActive] = useState(false);
  const [text, setText] = useState("");
  const { openCaptcha, openOtp } = useSelector((state: any) => state.model); // OpenCaptcha and OpenOtp states

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^(13|14|15|16|17|18|19)\d{9}$/;
    return phoneRegex.test(phone);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let type = "";

    if (validateEmail(text)) {
      type = "email";
    } else if (validatePhone(text)) {
      type = "phone";
    } else {
      dispatch(
        showToast({
          message: "请输入有效的邮箱或手机号",
          type: "error",
        })
      );
      return;
    }

    dispatch(setCaptchaOpen(true));
    // Optionally store type in state if needed
  };

  useEffect(() => {
    if (text) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [text]);

  return (
    <div className="">
      <div className={`${darkmode ? "fixed-bg_dark" : "fixed-bg"}`}></div>
      {!openOtp && (
        <div>
          <div className="flex fixed top-0 w-full z-10 text-white bg-[#161619] justify-between items-center p-2">
            <Link to="/profile" className="back-button">
              {darkmode ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M7.828 10.9999H20V12.9999H7.828L13.192 18.3639L11.778 19.7779L4 11.9999L11.778 4.22192L13.192 5.63592L7.828 10.9999Z"
                    fill="white"
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
                    d="M7.828 10.9999H20V12.9999H7.828L13.192 18.3639L11.778 19.7779L4 11.9999L11.778 4.22192L13.192 5.63592L7.828 10.9999Z"
                    fill="#080808"
                  />
                </svg>
              )}
            </Link>
            <div
              className={`${
                darkmode ? "history-title_dark" : "history-title"
              } pr-10`}
            >
              绑定账号
            </div>
            <div className="edit-title"></div>
          </div>
          <div className="mt-[60px] p-4">
            <form onSubmit={handleSubmit} className="w-full">
              <input
                type="text"
                className={`${darkmode ? "new-input" : "new-input"}`}
                placeholder="输入你的昵称"
                value={text}
                onChange={(e) => setText(e.target.value)}
                disabled={isLoading} // Disable input during submission
              />
              <button
                className={`submit_btn`}
                disabled={!active}
                style={{
                  background: active ? "#FE58B5" : "#FE58B5",
                  opacity: active ? "1" : "0.5",
                  color: active ? "white" : "white",
                }}
              >
                保存
              </button>
            </form>
          </div>
        </div>
      )}

      {isLoading && (
        <div className="fixed inset-0 flex justify-center items-center">
          <Loader />
        </div>
      )}

      {/* Show Captcha if Captcha is open */}
      {openCaptcha && (
        <Captcha data={text} type={validateEmail(text) ? "email" : "phone"} />
      )}

      {/* Show Otp if Otp component is open */}
      {openOtp && (
        <Otp data={text} type={validateEmail(text) ? "email" : "phone"} />
      )}
    </div>
  );
};

export default Bind;
