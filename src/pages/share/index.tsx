import React, { useEffect, useRef, useState } from "react";
import "./share.css";
import bg1 from "../../assets/share/bg1.png";
import back from "../../assets/login/back.svg";
import down from "../../assets/share/down1.svg";
import friend from "../../assets/share/friends1.svg";
import copy from "../../assets/share/copy.svg";
import form from "../../assets/share/alert1.svg";
import link from "../../assets/share/link.svg";
import linkD from "../../assets/share/linkD.svg";
import fire from "../../assets/share/fire.png";
import dolar from "../../assets/share/dolar.svg";
import go from "../../assets/share/go.svg";
import { Link, useNavigate } from "react-router-dom";
import { useGetShareScanQuery } from "../../features/share/ShareApi";
import { useDispatch, useSelector } from "react-redux";
import { useGetUserQuery } from "../profile/services/profileApi";
import { showToast } from "../profile/error/ErrorSlice";
import { toPng } from "html-to-image";
import axios from "axios";
import {
  convertToSecureUrl,
  decryptWithAes,
} from "../../services/newEncryption";
import { useGetInviteNoticeQuery } from "../Point/service/PointApi";
import Alert from "./Alert";
import { setAuthModel, setPointMall } from "../../features/login/ModelSlice";

interface ShareProps {}

const Share: React.FC<ShareProps> = ({}) => {
  const dispatch = useDispatch();
  const { data } = useGetShareScanQuery({ qr_create: "1" });
  const [invite, setInvite] = useState<any>();
  const [list, setList] = useState<any[]>([]);

  const { data: notice } = useGetInviteNoticeQuery("");

  const getkk = async () => {
    const { data } = await axios.get(
      convertToSecureUrl(
        `${process.env.REACT_APP_API_URL}//user/get_share?qr_create=1`
      )
    );
    const result: any = await decryptWithAes(data);
    setInvite(result);
  };

  useEffect(() => {
    getkk();
  }, []);

  useEffect(() => {
    setList(notice?.data);
  }, [notice]);

  const [copySuccess, setCopySuccess] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  const isLoggedIn = localStorage.getItem("authToken");
  const parsedLoggedIn = isLoggedIn ? JSON.parse(isLoggedIn) : null;
  const token = parsedLoggedIn?.data?.access_token;

  const { data: userData, error } = useGetUserQuery(token);
  // console.log(userData)

  const navigate = useNavigate();
  const handleCopy = () => {
    if (userData) {
      const inviteCode = userData.data.invite_code;
      navigator.clipboard
        .writeText(inviteCode)
        .then(() => {
          dispatch(showToast({ message: "已复制", type: "success" }));
          setCopySuccess(true);
        })
        .catch(() => {
          dispatch(showToast({ message: "复制失败", type: "error" }));
          setCopySuccess(false);
        });
    }
  };

  const handleShareLink = () => {
    if (invite) {
      const link = invite?.data?.content;
      sendEventToNative("movieDetailShare", link);
      navigator.clipboard
        .writeText(link)
        .then(() => {
          dispatch(showToast({ message: "已复制", type: "success" }));
          setCopySuccess(true);
        })
        .catch(() => {
          dispatch(showToast({ message: "复制失败", type: "error" }));
          setCopySuccess(false);
        });
    }
  };

  const sendEventToNative = (name: string, text: string) => {
    if (
      (window as any).webkit &&
      (window as any).webkit.messageHandlers &&
      (window as any).webkit.messageHandlers.jsBridge
    ) {
      (window as any).webkit.messageHandlers.jsBridge.postMessage({
        eventName: name,
        value: text,
      });
    }
  };

  const isIOSApp = () => {
    return (
      (window as any).webkit &&
      (window as any).webkit.messageHandlers &&
      (window as any).webkit.messageHandlers.jsBridge
    );
  };

  const handleSaveAsImage = () => {
    if (isIOSApp()) {
      sendEventToNative("saveImage", invite?.data?.qrcode.data); // shareUrl should be base64
    } else {
      console.log(invite?.data?.qrcode.data);
      if (!invite?.data?.qrcode.data.startsWith("data:image")) {
        console.error("Invalid image format.");
        return;
      }

      try {
        // Convert data URL to blob
        const response = fetch(invite?.data?.qrcode.data)
          .then((res) => res.blob())
          .then((blob) => {
            // Create a blob URL and initiate download
            const blobUrl = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = blobUrl;
            link.download = "QRCode.png";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Clean up the blob URL after download
            setTimeout(() => {
              URL.revokeObjectURL(blobUrl);
            }, 100);
          });
      } catch (error) {
        console.error("Error downloading QR code:", error);
      }
    }
  };

  // const handleSaveAsImage = () => {
  //   if (imageRef.current) {
  //     toPng(imageRef.current, { cacheBust: true })
  //       .then((dataUrl) => {
  //         const link = document.createElement("a");
  //         link.href = dataUrl;
  //         link.download = "share-info.png";
  //         link.click();
  //         dispatch(showToast({ message: "保存成功", type: "success" }));
  //       })
  //       .catch((err) => {
  //         console.error("Failed to generate image:", err);
  //       });
  //   }
  // };
  return (
    <div className="bg-[#161619] min-h-screen flex flex-col  gap-[10px]">
      {/* header */}
      <img src={bg1} className=" absolute z-[1] top-0 left-0 w-screen" alt="" />
      <div className="flex w-full z-[2] justify-between items-center pl-[20px] py-4">
        <Link className=" absolute z-[2]" to="/profile">
          <img src={back} className="" alt="" />
        </Link>
        <div className=" pl-10"></div>
        <p className="text-[18px] text-white font-semibold">邀请朋友</p>
        <div
          // onClick={() => navigate("")}
          className="rule py-[8px] px-[16px] mt-[5px]"
        >
          <a
            target="_blink"
            href="https://cc3e497d.qdhgtch.com:1333/help"
            className=" text-white text-[14px] font-[500]"
          >
            积分商城
          </a>
        </div>
      </div>
      <div className=" flex flex-col gap-[20px] pt-[130px]">
        {/* tab */}
        <div className="">
          <div className=" flex justify-around items-center">
            {/* friend */}
            <div className="flex flex-col items-center gap-[14px]">
              <img src={friend} alt="" />
              <div className=" flex justify-center items-center gap-1">
                <div className=" text-[12px] flex justify-center items-center gap-1 font-[400] text-[#fff]">
                  <span className=" w-[2px] h-[2px] bg-white "></span>
                  <span>分享链接给好友</span>
                </div>
              </div>
            </div>
            {/* down */}
            <div className=" flex flex-col items-center gap-[14px]">
              <img src={down} alt="" />
              <div className=" flex justify-center items-center gap-1">
                <div className=" text-[12px] flex justify-center items-center gap-1 font-[400] text-[#fff]">
                  <span className=" w-[2px] h-[2px] bg-white "></span>
                  <span>下载APP</span>
                </div>
              </div>
            </div>
            <div className=" flex flex-col items-center gap-[14px]">
              <img src={form} alt="" />
              <div className=" flex justify-center items-center gap-1">
                <div className=" text-[12px] flex justify-center items-center gap-1 font-[400] text-[#fff]">
                  <span className=" w-[2px] h-[2px] bg-white "></span>
                  <span>注册填写邀请码</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* scan */}
        <div className="">
          {invite ? (
            <div
              ref={imageRef}
              className=" flex justify-center items-center pt-[30px "
            >
              <div className="py-6 px-10 flex flex-col justify-center items-center gap-[16px] scan">
                <img
                  className=" w-[180px] h-[180px] rounded-[10px]"
                  src={invite?.data?.qrcode.data}
                  alt="QR Code"
                />

                {/* data */}
                {userData ? (
                  <div className="">
                    <div className="flex gap-[8px] invite_code px-[16px] py-[8px]">
                      <h1 className=" text-white text-[16px] font-[500] leading-[20px]">
                        我的邀请码 :
                      </h1>
                      <span className=" text-white text-[16px] font-[500] leading-[20px]">
                        {userData?.data?.invite_code}
                      </span>
                      <img onClick={handleCopy} src={copy} alt="" />
                    </div>
                  </div>
                ) : (
                  <button
                    className="login-div gap-2"
                    onClick={() => dispatch(setAuthModel(true))}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M2 12.1211C2 11.7069 2.33579 11.3711 2.75 11.3711H14.791C15.2052 11.3711 15.541 11.7069 15.541 12.1211C15.541 12.5353 15.2052 12.8711 14.791 12.8711H2.75C2.33579 12.8711 2 12.5353 2 12.1211Z"
                        fill="white"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M11.3319 8.67584C11.6242 8.38235 12.0991 8.38137 12.3926 8.67366L15.3206 11.5897C15.4619 11.7304 15.5414 11.9217 15.5414 12.1211C15.5414 12.3206 15.4619 12.5118 15.3206 12.6525L12.3926 15.5685C12.0991 15.8608 11.6242 15.8598 11.3319 15.5664C11.0396 15.2729 11.0406 14.798 11.3341 14.5057L13.7285 12.1211L11.3341 9.7365C11.0406 9.44421 11.0396 8.96934 11.3319 8.67584Z"
                        fill="white"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M9.32939 4.45009C8.55268 5.02564 8.16438 5.96655 8.0047 7.69884C7.96668 8.11131 7.60149 8.41485 7.18903 8.37683C6.77656 8.33881 6.47301 7.97362 6.51103 7.56116C6.68135 5.71345 7.12806 4.21436 8.43634 3.24491C9.69065 2.31545 11.5804 2 14.2578 2C17.8077 2 19.9902 2.55654 21.1103 4.37994C21.6441 5.249 21.88 6.3253 21.9947 7.55739C22.1088 8.78465 22.1088 10.259 22.1088 11.9684V12.0316C22.1088 13.741 22.1088 15.2154 21.9947 16.4426C21.88 17.6747 21.6441 18.751 21.1103 19.6201C19.9902 21.4435 17.8077 22 14.2578 22C11.5804 22 9.69065 21.6846 8.43634 20.7551C7.12806 19.7857 6.68135 18.2866 6.51103 16.4389C6.47301 16.0264 6.77656 15.6612 7.18903 15.6232C7.60149 15.5852 7.96668 15.8887 8.0047 16.3012C8.16438 18.0335 8.55268 18.9744 9.32939 19.5499C10.1601 20.1655 11.6053 20.5 14.2578 20.5C17.809 20.5 19.177 19.9016 19.8322 18.835C20.1859 18.259 20.3938 17.4566 20.5011 16.3037C20.6081 15.1535 20.6088 13.7472 20.6088 12C20.6088 10.2528 20.6081 8.84654 20.5011 7.69636C20.3938 6.54345 20.1859 5.741 19.8322 5.16506C19.177 4.09846 17.809 3.5 14.2578 3.5C11.6053 3.5 10.1601 3.83454 9.32939 4.45009Z"
                        fill="white"
                      />
                    </svg>
                    <h1>登陆获取邀请</h1>
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className=" flex justify-center items-center pt-[30px]">
              <div className="scan py-6 px-10 flex flex-col justify-center items-center gap-[16px]">
                <div className=" animate-pulse bg-white/30 w-[180px] h-[180px] rounded-[10px]"></div>
                <div className="">
                  <div className="bg-white/30 rounded-[16px] animate-pulse w-[200px] h-[30px] flex gap-[8px]  px-[16px] py-[8px]"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* alert */}
      <Alert list={list} img={fire} />
      {/* invited user */}
      <div className="flex invite_user mx-[20px] justify-around items-center mt-[20px] p-4">
        <div
          onClick={() => {
            if (userData) {
              dispatch(setPointMall("/share"));
              navigate("/point_mall");
            } else {
              dispatch(setAuthModel(true));
            }
          }}
          className=" flex flex-col items-center justify-center gap-[8px]"
        >
          <img
            className=" w-[30px] h-[30px] dolar p-[8px]"
            src={dolar}
            alt=""
          />
          <div className=" flex justify-center items-center gap-[6px]">
            <div className=" flex flex-col">
              <h1 className=" text-center text-[12px] font-[500] text-[#CCC3B2]">
                积分兑换
              </h1>
              <h1 className=" text-center text-[12px] font-[400] text-[#CCC3B2]">
                兑换价值百元大礼包
              </h1>
            </div>
            <img src={go} alt="" />
          </div>
        </div>
        <p className=" line"></p>
        <div
          onClick={() => {
            if (userData) {
              navigate("/share/member");
            } else {
              dispatch(setAuthModel(true));
            }
          }}
          className=" flex flex-col items-center justify-center gap-[8px]"
        >
          <h1 className=" text-[18px] font-[600] text-white/70">
            {userData?.data?.invite_user_num
              ? userData?.data?.invite_user_num
              : 0}
          </h1>
          <div className=" flex justify-center items-center gap-[6px]">
            <h1 className="text-center text-[12px] font-[500] text-[#CCC3B2]">
              我的邀请
            </h1>

            <img src={go} alt="" />
          </div>
        </div>
      </div>
      {/* two button */}
      <div className="flex justify-center items-center gap-[16px] py-4">
        {/* copy */}
        <div
          onClick={handleShareLink}
          className=" flex gap-[8px] px-[20px] py-[16px] bg-[#FFFFFF0A] rounded-[24px]"
        >
          <img src={link} alt="" />
          <h1 className=" text-white text-[16px] font-[500] ">复制分享链接</h1>
        </div>
        {/* down and save qr card */}
        <div
          onClick={handleSaveAsImage}
          className=" flex gap-[8px] px-[20px] py-[16px] bg-[#FFFFFF0A] rounded-[24px]"
        >
          <img src={linkD} alt="" />
          <h1 className=" text-white text-[16px] font-[500] ">手动截图保存</h1>
        </div>{" "}
      </div>
    </div>
  );
};

export default Share;
