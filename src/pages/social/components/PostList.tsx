import Loader from "../../../pages/search/components/Loader";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";
import { useState } from "react";
import { selectTheme } from "../../../pages/search/slice/ThemeSlice";
import PostItem from "./PostItem";

const PostList = ({
  data,
  loading,
  hasMore,
  fetchMoreData,
  setShowDetail,
  showDetail,
}: {
  data: any;
  loading: boolean;
  hasMore: boolean;
  fetchMoreData: () => void;
  setShowDetail: (showDetail: boolean) => void;
  showDetail: boolean;
}) => {
  const [activePlayer, setActivePlayer] = useState<any>(null);
  const darkmode = useSelector(selectTheme);

  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});
  const [lightboxStates, setLightboxStates] = useState<{
    [key: string]: { isOpen: boolean; currentIndex: number };
  }>({});

  // Open lightbox specific to a post and image index
  const openLightbox = (postId: any, index: any) => {
    const bodyElement = document.querySelector("body");
    if (bodyElement) {
      bodyElement.style.overflow = "hidden";
    }
    setLightboxStates({
      ...lightboxStates,
      [postId]: { isOpen: true, currentIndex: index },
    });
  };

  const closeLightbox = (postId: any) => {
    const bodyElement = document.querySelector("body");
    if (bodyElement) {
      bodyElement.style.removeProperty("overflow"); // Remove the overflow style
    }
    const newState = { ...lightboxStates };
    if (newState[postId]) {
      newState[postId].isOpen = false;
    }
    setLightboxStates(newState);
  };

  if (loading && !data.length) {
    return (
      <div className="text-center -mt-[100px] max-sm:h-[80vh]  h-[100vh] flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="text-center -mt-[100px]  max-sm:h-[80vh]  h-[100vh] flex justify-center items-center">
        <div className="text-center flex flex-col justify-center items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M7.3245 0C5.58752 0 4.09952 1.24051 3.78449 2.9475L0.0599999 23.1674C0.0194995 23.3819 0 23.6009 0 23.8184V32.4C0 34.3875 1.61249 36 3.6 36H32.4C34.3875 36 36 34.3875 36 32.4V23.8184C36 23.6009 35.9805 23.3819 35.94 23.1674L32.2155 2.9475C31.9005 1.24051 30.4125 0 28.6755 0H7.3245ZM6.14401 3.3825C6.24901 2.81399 6.74551 2.4 7.3245 2.4H28.6756C29.2546 2.4 29.7512 2.81399 29.8561 3.3825L33.3226 22.2H25.797C25.161 22.2 24.5505 22.4535 24.1005 22.9035L21.003 25.9995H14.397L11.2996 22.9035C10.8495 22.4535 10.2391 22.2 9.60304 22.2H2.67761L6.14401 3.3825ZM2.40002 24.6V32.3998C2.40002 33.0628 2.937 33.5998 3.60001 33.5998H32.4C33.063 33.5998 33.6 33.0628 33.6 32.3998V24.6H25.7971L22.6996 27.6975C22.2496 28.1475 21.6391 28.3995 21.0031 28.3995H14.3972C13.7612 28.3995 13.1507 28.1475 12.7007 27.6975L9.60316 24.6H2.40002Z"
              fill="#888888"
            />
          </svg>
          <h1 className="not_found_text">快关注你喜欢的贴子吧！</h1>
        </div>
      </div>
    );
  }

  const toggleDescription = (postId: any) => {
    setExpanded((prev) => ({
      ...prev,
      [postId]: !prev[postId], // Toggle the state for the given post ID
    }));
  };

  const renderDescription = (post: any) => {
    const isExpanded = expanded[post.post_id];
    if (!isExpanded && post.description.length > 80) {
      // Assuming 300 characters as roughly four lines of text
      return (
        <>
          {post.description.substring(0, 80)}
          <button
            onClick={() => toggleDescription(post.post_id)}
            className="text-[#000000CC] dark:text-[#FFFFFFCC] ml-1"
          >
            ...展开
          </button>
        </>
      );
    }
    return (
      <>
        {post.description}
        {post.description.length > 80 && (
          <button
            onClick={() => toggleDescription(post.post_id)}
            className="text-[#000000CC] dark:text-[#FFFFFFCC] ml-1"
          >
            收起
          </button>
        )}
      </>
    );
  };

  return (
    <div className="bg-gray-300 dark:bg-black pt-0.5">
      {/* {showDetail && (
        <Social_details
          darkmode={darkmode}
          followStatus={followStatus}
          handleFollowChange={handleFollowChange}
          post={activePost}
          setShowDetail={setShowDetail}
          openLightbox={openLightbox}
          lightboxStates={lightboxStates}
          closeLightbox={closeLightbox}
          showCreatedTime={showCreatedTime}
          likeStatus={likeStatus}
          sendEventToNative={handleShare}
          handleLikeChange={handleLikeChange}
        />
      )} */}
      {/* {!showDetail && (

      )} */}
      <div>
        {data.map((post: any, index: number) => {
          return (
            <PostItem
              key={index}
              post={post}
              renderDescription={renderDescription}
              lightboxStates={lightboxStates}
              openLightbox={openLightbox}
              closeLightbox={closeLightbox}
              index={index}
              activePlayer={activePlayer}
              setActivePlayer={setActivePlayer}
            />
          );
        })}
        <InfiniteScroll
          dataLength={data.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={
            <div
              className={`flex  ${
                darkmode ? "bg-[#161619]" : "bg-white"
              }    justify-center items-center w-full py-5`}
            >
              <Loader />
            </div>
          }
          endMessage={
            <div
              className={`flex  ${
                darkmode ? "bg-[#161619]" : "bg-white"
              }    justify-center items-center w-full py-5`}
            >
              <p style={{ textAlign: "center" }}>
                <b className={`${darkmode ? "text-white" : "text-black"} `}>
                  快关注你喜欢的贴子吧！
                </b>
              </p>
            </div>
          }
        >
          <></>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default PostList;
