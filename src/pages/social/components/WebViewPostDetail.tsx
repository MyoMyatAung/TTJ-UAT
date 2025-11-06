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
import { useGetCommentListQuery, useUnlockPostMutation } from "../services/socialApi";
import Loader from "../../search/components/Loader";
import Comment from "./Comment";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";

type Props = {
  post: typeof DUMMY_DETAIL;
};

const WebViewPostDetail: React.FC<Props> = ({ post }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let videoData = useRef<HTMLVideoElement[]>([]);
  const darkmode = useSelector(selectTheme);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [list, setList] = useState<any[]>([]);
  const isLoggedIn = localStorage.getItem("authToken");
  const parsedLoggedIn = isLoggedIn ? JSON.parse(isLoggedIn) : null;
  const token = parsedLoggedIn?.data?.access_token;
  const { data: userData } = useGetUserQuery(undefined, {
    skip: !token,
  });

  console.log("userData", userData, post);

  const { data, isFetching, refetch, isLoading } = useGetCommentListQuery({
    post_id: post.post_id,
    page,
  });
  const [unlockPost, { isLoading: isUnlocking }] = useUnlockPostMutation();

  const fetchMoreDataCmt = () => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
    // console.log("Fetching more data...", page);
  };

  useEffect(() => {
    if (data?.data) {
      setList((prevList) => [...prevList, ...data.data.list]);
      const loadedItems = data?.data.page * data?.data.pageSize;
      //   console.log("text", loadedItems);
      setHasMore(loadedItems < data?.data.total);
    }
  }, [data]);

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
    setCountdown(0);
  };

  const handleContinue = (url: string) => {
    // Redirect to the URL with new tab
    window.open(url, "_blank");
    setShowRedirectModal(false);
  };

  const handleCancel = () => {
    setShowRedirectModal(false);
  };
  const handleUnlockClick = () => {
    if (!token) {
      dispatch(setAuthModel(true)); // Open the login modal if not logged in
      return;
    }
    if (userData) {
      if (userData.data.level_id < post.level_id) {
        setIsNotEnoughLevel(true);
        return;
      } else if (userData.data.integral < post.point) {
        setIsNotEnoughPoints(true);
        return;
      } else {
        setIsEnoughUnlock(true);
        return;
      }
    }
  }
  const handleUnlock = async () => {
    try {
      await unlockPost({ post_id: post.post_id }).unwrap();
    } catch (error) {
      console.error("Failed to unlock post:", error);
    } finally {
      setIsEnoughUnlock(false);
    }
  };
  const handleNavigatePointInfo = () => {
    // Navigate to point info page
    navigate("/point_info");
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
              <LockPost unlock={handleUnlockClick} />
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
      {isFetching || isLoading ? (
        <div className="flex bg-gray-300 dark:bg-[#161619] justify-center items-center w-full py-[100px]">
          <Loader />
        </div>
      ) : (
        <>
          <div className=" h-[4px] bg-[#E4E4E4] dark:bg-[#000] w-full"></div>
          {/* comment */}
          <div className="px-4">
            <Comment
              setList={setList}
              darkmode={darkmode}
              post_id={post.post_id}
              list={list}
              isFetching={hasMore}
              isLoading={isLoading}
              hideCommentInput={post.unlock_post ? false : true}
            />
          </div>

          <InfiniteScroll
            // className=" h-[100px]"
            dataLength={list.length}
            next={fetchMoreDataCmt}
            hasMore={hasMore}
            loader={
              <div className="flex bg-gray-300 dark:bg-[#161619] justify-center items-center w-full pb-32">
                <Loader />
              </div>
            }
            endMessage={
              <div className="flex bg-gray-300 dark:bg-[#161619] justify-center items-center w-full pb-32">
                <p style={{ textAlign: "center" }}>
                  <b className=" hidden text-white/60">没有更多评论</b>
                </p>
              </div>
            }
          >
            <></>
          </InfiniteScroll>
        </>
      )}
      {post.unlock_post ? (
        <div className="p-4 fixed bg-[#161619] bottom-[70px] left-0 z-[999] w-full flex flex-col gap-2">
          <button
            onClick={handleRedirectClick}
            className="bg-gradient-to-r from-[#FE58B5] to-[#FF9153] px-4 py-2 rounded-md text-white w-full flex justify-center items-center gap-1"
          >
            在网站上查看此帖子 {countdown === 0 ? "" : `(${countdown}s)`}
          </button>
          <p className="text-sm text-white text-center">30 秒后将自动跳转到网站</p>
        </div>
      ) : (
        <div className="p-4 rounded-md fixed bottom-0 left-0 z-30 bg-gray-800 w-full flex flex-col gap-2">
          <button
            onClick={handleUnlockClick}
            className="bg-gradient-to-r from-[#FE58B5] to-[#FF9153] px-4 py-2 rounded-md text-white w-full flex justify-center items-center gap-1"
          >
            <FontAwesomeIcon icon={faLock} className="text-white" />
            解锁独家视频
          </button>
          <p className="text-white text-center">
             解锁此帖子需{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FE58B5] to-[#FF9153]">
              练气{post.level_id}层 + {post.point}积分
            </span>
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
            onClick={handleNavigatePointInfo}
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
            onClick={handleNavigatePointInfo}
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
            练气{post.level_id}层
          </span>
          】 并消耗 【
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FE58B5] to-[#FF9153]">
            {post.point}积分
          </span>
          】
        </p>
        <div className="flex justify-center items-center w-full gap-1">
          <button
            onClick={() => setIsEnoughUnlock(false)}
            className="bg-[#FFFFFF1F] px-4 py-2 rounded-md text-white w-full flex justify-center items-center gap-1"
          >
            取消
          </button>
          <button
            onClick={handleUnlock}
            className="bg-gradient-to-r from-[#FE58B5] to-[#FF9153] px-4 py-2 rounded-md text-white w-full flex justify-center items-center gap-1"
            disabled={isUnlocking}
          >
            确认
          </button>
        </div>
      </Modal>
      <Modal isOpen={showRedirectModal} onClose={handleCancel}>
        <p className="text-white">
          您将被重定向至{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FE58B5] to-[#FF9153]">
            {post.post_detail.jump_url}
          </span>
          , 点击{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FE58B5] to-[#FF9153]">
            "继续"
          </span>{" "}
          在浏览器中继续
        </p>
        <div className="flex justify-center items-center w-full gap-1">
          <button
            onClick={handleCancel}
            className="bg-[#FFFFFF1F] px-4 py-2 rounded-md text-white w-full flex justify-center items-center gap-1"
          >
            取消
          </button>
          <button
            onClick={() => handleContinue(post.post_detail.jump_url)}
            className="bg-gradient-to-r from-[#FE58B5] to-[#FF9153] px-4 py-2 rounded-md text-white w-full flex justify-center items-center gap-1"
          >
            继续
          </button>
        </div>
      </Modal>
    </>
  );
};

export default WebViewPostDetail;
