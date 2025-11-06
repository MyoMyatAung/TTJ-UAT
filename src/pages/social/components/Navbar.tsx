import React, { useState, useEffect, useRef } from "react";
import PullToRefresh from "react-simple-pull-to-refresh";
import {
  useGetPostsQuery,
  useGetRecommandPostsQuery,
  useGetFollowPostsQuery,
  useGetAudioPostsQuery,
} from "../services/socialApi";
import PostList from "./PostList";
import Ads from "../../../components/NewAds";
import Loader from "../../../pages/search/components/Loader";
import { useGetHeaderTopicsQuery } from "../../../services/helperService";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTab } from "../../../features/social/socialSlice";

const Navbar = () => {
  // const [activeTab, setActiveTab] = useState(2);
  const {activeTab} = useSelector((state: any) => state.social);
  const dispatch = useDispatch();
  const activeTabRef = useRef(activeTab);
  activeTabRef.current = activeTab;

  const { data } = useGetHeaderTopicsQuery();
  const social_menu =
    data?.data?.social_menu?.length > 0
      ? data.data.social_menu
      : [
        { text: "关注", path: "/followed/post/list" },
        { text: "推荐", path: "/post/recommend/list" },
        { text: "最新", path: "/post/list" },
      ];

  const [page, setPage] = useState(1);
  const [dataList, setDataList] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showDetail, setShowDetail] = useState(false);

  const selectedMenuPath = social_menu?.[activeTab]?.path;
  const queryOptions = { page, path: selectedMenuPath };

  const {
    data: postsData,
    refetch: postRefetch,
    isFetching: postsFetching,
    isLoading: postsLoading,
  } = useGetPostsQuery(queryOptions, { skip: activeTab !== 2 });
  const {
    data: recommandData,
    refetch: recommandRefetch,
    isFetching: recommandFetching,
    isLoading: recommandLoading,
  } = useGetRecommandPostsQuery(queryOptions, { skip: activeTab !== 1 });
  const {
    data: followData,
    refetch: followRefetch,
    isFetching: followFetching,
    isLoading: followLoading,
  } = useGetFollowPostsQuery(queryOptions, { skip: activeTab !== 0 });
  const {
    data: audioData,
    refetch: audioRefetch,
    isFetching: audioFetching,
    isLoading: audioLoading,
  } = useGetAudioPostsQuery(queryOptions, { skip: activeTab !== 3 });

  useEffect(() => {
    const currentData =
      activeTab === 2
        ? postsData
        : activeTab === 1
          ? recommandData
          : activeTab === 0
            ? followData
            : audioData;

    if (currentData?.data?.list) {
      setDataList((prev) =>
        page === 1 ? currentData.data.list : [...prev, ...currentData.data.list]
      );
      setHasMore(
        currentData.data.page * currentData.data.pageSize <
        currentData.data.total
      );
    }
  }, [postsData, recommandData, followData, audioData, activeTab]);

  const fetchMoreData = () => {
    if (
      !postsFetching &&
      !recommandFetching &&
      !followFetching &&
      !audioFetching &&
      hasMore
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    setPage(1);
    setHasMore(true);

    if (activeTabRef.current === 2) await postRefetch();
    else if (activeTabRef.current === 1) await recommandRefetch();
    else if (activeTabRef.current === 0) await followRefetch();
    else await audioRefetch();

    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsRefreshing(false);
  };

  const handleTabClick = (index: number) => {
    if (index !== activeTab) {
      window.scrollTo(0, 0);
      dispatch(setActiveTab(index));
      setPage(1);
      setDataList([]);
      setHasMore(true);
    }
  };

  return (
    <div className="h-full bg-white dark:bg-[#161619]">
      <div className="fixed bg-white dark:bg-[#161619] p-3 w-full z-[98] pb-3 transition-all duration-300 top-0">
        <nav className="flex flex-wrap gap-4 items-center">
          {social_menu?.map((tab: any, index: any) => (
            <button
              key={index}
              className={`inline-flex whitespace-nowrap social_nav text-black dark:text-white relative ${activeTab === index ? " text-[20px]" : "text-[20px]"
                }`}
              onClick={() => handleTabClick(index)}
              style={{ paddingBottom: "4px" }}
            >
              {tab.text}
              {activeTab === index && (
                <span className="absolute rounded-full bottom-0 left-1/2 transform -translate-x-1/2 new_active_line h-[2px] w-[50%]" />
              )}
            </button>
          ))}
        </nav>
      </div>
      <div className="pt-[70px] pb-[10px] bg-white dark:bg-[#161619]">
        <Ads section={"search_input_under"} />
      </div>
      {/* {isRefreshing ? (
        <div className="flex justify-center items-center h-[50vh]">
          <Loader />
        </div>
      ) : ( */}
      <PullToRefresh
        pullingContent={<div></div>}
        refreshingContent={
          <div className="flex justify-center py-2 mt-2 text-center">
            <Loader />
          </div>
        }
        onRefresh={handleRefresh}
        isPullable={!showDetail}
      >
        <PostList
          setShowDetail={setShowDetail}
          showDetail={showDetail}
          data={dataList}
          loading={
            postsLoading || recommandLoading || followLoading || audioLoading
          }
          hasMore={hasMore}
          fetchMoreData={fetchMoreData}
        />
      </PullToRefresh>
      {/* )} */}
    </div>
  );
};

export default Navbar;
