import { useEffect, useRef, useState } from "react";
import { DUMMY_DETAIL } from "../dummyDetail";
import Player from "./Player";
import { useDispatch, useSelector } from "react-redux";
import { selectTheme } from "../../search/slice/ThemeSlice";
import LockPost from "./LockPost";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { useGetUserQuery } from "../../profile/services/profileApi";
import { setAuthModel } from "../../../features/login/ModelSlice";
import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";
import Modal from "../../../components/Modal";

type Props = {
  post: typeof DUMMY_DETAIL;
};

const WebViewPostDetail: React.FC<Props> = ({ post }) => {
  const dispatch = useDispatch();
  let videoData = useRef<HTMLVideoElement[]>([]);
  const darkmode = useSelector(selectTheme);
  const isLoggedIn = localStorage.getItem("authToken");
  const parsedLoggedIn = isLoggedIn ? JSON.parse(isLoggedIn) : null;
  const token = parsedLoggedIn?.data?.access_token;
  const { data: userData } = useGetUserQuery(undefined, {
    skip: !token,
  });

  const [isNotEnoughPoints, setIsNotEnoughPoints] = useState(false);
  const [isNotEnoughLevel, setIsNotEnoughLevel] = useState(false);
  const [isEnoughUnlock, setIsEnoughUnlock] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [showRedirectModal, setShowRedirectModal] = useState(false);

  useEffect(() => {
    if (post.unlock_post && countdown > 0) {
      const timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (post.unlock_post && countdown === 0) {
      setShowRedirectModal(true);
    }
  }, [countdown, post.unlock_post]);

  const handleRedirectClick = () => {
    setShowRedirectModal(true);
  };

  const handleContinue = () => {
    window.location.href = "https://wws.dyls.com";
  };

  const handleCancel = () => {
    setShowRedirectModal(false);
  };
  const handleLoginClick = () => {
    if (!token) {
      dispatch(setAuthModel(true)); // Open the login modal if not logged in
    }
  };
  return (
    <>
      <div className="mt-[44px]">
        <PostHeader post={post} />
        <div className="flex flex-col gap-4 px-4">
          <h1
            className={`${darkmode ? "text-white" : ""} text-xl font-semibold`}
          >
            {post.post_detail.title}
          </h1>
          <p className={`${darkmode ? "text-white" : ""} text-md`}>
            {post.post_detail.top_content}
          </p>
          <img
            className=""
            src={post.post_detail.images[0]}
            alt={post.post_detail.title}
          />
          <p className={`${darkmode ? "text-white" : ""} text-md`}>
            {post.post_detail.bottom_content}
          </p>
          {post.post_detail.images.slice(1).map((img, index) => {
            return (
              <div key={index} className="relative">
                <img className="" src={img} alt={post.post_detail.title} />
              </div>
            );
          })}
          {!post.unlock_post ? (
            <div className="relative">
              <LockPost unlock={handleLoginClick} />
              <img
                className="blur-[2px] grayscale bg-black"
                src={post.files[0].resourceURL}
                alt={post.post_detail.title}
              />
            </div>
          ) : (
            <Player
              videoData={videoData}
              isCenterPlay={true}
              src={post.post_detail.video_url}
              thumbnail={post?.files[0].thumbnail}
              status={post?.type === "ads" ? true : false}
            />
          )}
        </div>
        <PostFooter post={post} />
        {!post.unlock_post && <div className="h-[104px]" />}
      </div>
      {post.unlock_post ? (
        <div className="p-4 rounded-md fixed bottom-0 left-0 z-30 bg-gray-800 w-full flex flex-col gap-2">
          <button
            onClick={handleRedirectClick}
            className="bg-gradient-to-r from-[#FE58B5] to-[#FF9153] px-4 py-2 rounded-md text-white w-full flex justify-center items-center gap-1"
          >
            View this post on website ({countdown}s)
          </button>
        </div>
      ) : (
        <div className="p-4 rounded-md fixed bottom-0 left-0 z-30 bg-gray-800 w-full flex flex-col gap-2">
          <button
            onClick={handleLoginClick}
            className="bg-gradient-to-r from-[#FE58B5] to-[#FF9153] px-4 py-2 rounded-md text-white w-full flex justify-center items-center gap-1"
          >
            <FontAwesomeIcon icon={faLock} className="text-white" />
            Unlock exclusive videos{" "}
          </button>
          <p className="text-white text-center">
            Require{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FE58B5] to-[#FF9153]">
              Qi Refining Level 4 + 2 Points
            </span>{" "}
            to unlock this post
          </p>
        </div>
      )}
      <Modal
        isOpen={isNotEnoughPoints}
        onClose={() => setIsNotEnoughPoints(false)}
      >
        <p className="text-white">积分不足，快去赚取吧！</p>
        <div className="flex justify-center items-center w-full gap-1">
          <button
            onClick={() => setIsNotEnoughPoints(false)}
            className="bg-[#FFFFFF1F] px-4 py-2 rounded-md text-white w-full flex justify-center items-center gap-1"
          >
            取消
          </button>
          <button
            onClick={() => setIsNotEnoughPoints(false)}
            className="bg-gradient-to-r from-[#FE58B5] to-[#FF9153] px-4 py-2 rounded-md text-white w-full flex justify-center items-center gap-1"
          >
            获取积分{" "}
          </button>
        </div>
      </Modal>
      <Modal
        isOpen={isNotEnoughLevel}
        onClose={() => setIsNotEnoughLevel(false)}
      >
        <p className="text-white">灵气等级不足，继续加油升级吧！</p>
        <div className="flex justify-center items-center w-full gap-1">
          <button
            onClick={() => setIsNotEnoughLevel(false)}
            className="bg-[#FFFFFF1F] px-4 py-2 rounded-md text-white w-full flex justify-center items-center gap-1"
          >
            取消
          </button>
          <button
            onClick={() => setIsNotEnoughLevel(false)}
            className="bg-gradient-to-r from-[#FE58B5] to-[#FF9153] px-4 py-2 rounded-md text-white w-full flex justify-center items-center gap-1"
          >
            我要升级{" "}
          </button>
        </div>
      </Modal>
      <Modal isOpen={isEnoughUnlock} onClose={() => setIsEnoughUnlock(false)}>
        <p className="text-white">
          解锁此帖子需 【
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FE58B5] to-[#FF9153]">
            练气四层
          </span>
          】 并消耗 【
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FE58B5] to-[#FF9153]">
            2积分
          </span>
          】
        </p>
        <div className="flex justify-center items-center w-full gap-1">
          <button
            onClick={() => setIsNotEnoughLevel(false)}
            className="bg-[#FFFFFF1F] px-4 py-2 rounded-md text-white w-full flex justify-center items-center gap-1"
          >
            取消
          </button>
          <button
            onClick={() => setIsEnoughUnlock(false)}
            className="bg-gradient-to-r from-[#FE58B5] to-[#FF9153] px-4 py-2 rounded-md text-white w-full flex justify-center items-center gap-1"
          >
            确认
          </button>
        </div>
      </Modal>
      <Modal isOpen={showRedirectModal} onClose={handleCancel}>
        <p className="text-white">
          You’re about to be redirected to{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FE58B5] to-[#FF9153]">
            {post.post_detail.jump_url}
          </span>
          , click{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FE58B5] to-[#FF9153]">
            continue
          </span>{" "}
          to proceed in browser
        </p>
        <div className="flex justify-center items-center w-full gap-1">
          <button
            onClick={handleCancel}
            className="bg-[#FFFFFF1F] px-4 py-2 rounded-md text-white w-full flex justify-center items-center gap-1"
          >
            Cancel
          </button>
          <button
            onClick={handleContinue}
            className="bg-gradient-to-r from-[#FE58B5] to-[#FF9153] px-4 py-2 rounded-md text-white w-full flex justify-center items-center gap-1"
          >
            Continue
          </button>
        </div>
      </Modal>
    </>
  );
};

export default WebViewPostDetail;
