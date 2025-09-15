import { useRef, useState } from "react";
import Ads from "../../../components/NewAds";
import { DUMMY_DETAIL } from "../dummyDetail";
import Player from "./Player";
import { useDispatch, useSelector } from "react-redux";
import { selectTheme } from "../../search/slice/ThemeSlice";
import LockPost from "./LockPost";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { useGetUserQuery } from "../../profile/services/profileApi";
import { setAuthModel } from "../../../features/login/ModelSlice";

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

  const [isDisplayUnlock, setIsDisplayUnlock] = useState(false);
  console.log("WebViewPostDetail -> ", userData);
  const handleShowUnlock = () => {
    setIsDisplayUnlock(true);
  };
  const handleLoginClick = () => {
    if (!token) {
      dispatch(setAuthModel(true)); // Open the login modal if not logged in
    }
  };
  return (
    <>
      <div className="mt-[44px]">
        <div className="relative mb-1">
          <img
            className="h-36 w-full object-cover"
            src={post.files[0].resourceURL}
            alt={post.description}
          />
          <div className="flex top-0 left-0 opacity-75 absolute w-full h-full z-10 bg-black justify-center items-center">
            <p className="text-white text-lg">{post.description}</p>
          </div>
        </div>
        <Ads section={"search_input_under"} />
        <div className="flex flex-col gap-4 px-10">
          <h1
            className={`${darkmode ? "text-white" : ""} text-lg font-semibold`}
          >
            {post.post_detail.title}
          </h1>
          <p className={`${darkmode ? "text-white" : ""} text-sm`}>
            {post.post_detail.top_content}
          </p>
          {post.post_detail.images.map((img, index) => {
            return (
              <div key={index} className="relative">
                <LockPost unlock={handleShowUnlock} />
                <img
                  className="blur-sm grayscale bg-black"
                  src={img}
                  key={index}
                  alt={post.post_detail.title}
                />
              </div>
            );
          })}
          {!post.unlock_post ? (
            <div className="relative">
              <LockPost unlock={handleShowUnlock} />
              <img
                className="blur-sm grayscale bg-black"
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
          <p className={`${darkmode ? "text-white" : ""} text-sm`}>
            {post.post_detail.bottom_content}
          </p>
        </div>
      </div>
      {isDisplayUnlock && (
        <div
          onClick={() => setIsDisplayUnlock(false)}
          className="fixed top-0 bottom-0 h-full w-full bg-black/75 z-20"
        >
          <div className="p-4 rounded-md fixed bottom-0 left-0 z-30 bg-gray-800 w-full flex flex-col gap-2">
            <button onClick={handleLoginClick} className="bg-gradient-to-r from-[#FE58B5] to-[#FF9153] px-4 py-2 rounded-md text-white w-full flex justify-center items-center gap-1">
              <FontAwesomeIcon icon={faLock} className="text-white" />
              Unlock this post
            </button>
            <p className="text-white text-center">
              Require{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FE58B5] to-[#FF9153]">
                Qi Refining Level 4 + 2 Points
              </span>{" "}
              to unlock this post
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default WebViewPostDetail;
