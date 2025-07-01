import { FC, useState, Fragment, useMemo, useRef, useEffect } from "react";
import { useRequest, useSafeState } from "ahooks";
import Loader from "../../../pages/search/components/Loader";
import { useInfiniteScroll } from "ahooks";
import { Head, Card } from "../components";
import { getItems } from "../api";
import { GoodsData, List, ApiData } from "../types/goods";
import InfiniteScroll from "react-infinite-scroll-component";
import numeral from "numeral";
import "./style.css";
import { useGetActivityQuery } from "../service/PointApi";
import { useNavigate } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import noListImg from "../test2.png";
import { useGetUserQuery } from "../../../pages/profile/services/profileApi";

export const Mall = () => {
  const [t, st] = useState<any>(0);
  const isLoggedIn = localStorage.getItem("authToken");
  const parsedLoggedIn = isLoggedIn ? JSON.parse(isLoggedIn) : null;
  const ref = useRef<HTMLDivElement>(null);
  const token = parsedLoggedIn?.data?.access_token;
  const navigate = useNavigate();

  // const { data: activity } = useGetActivityQuery("", {
  //   skip: !token,
  // });
  const { data: userData } = useGetUserQuery(undefined, {
    skip: !token,
  });

  // staging
  const parsedUserData = JSON.parse(userData || "{}");

  //prod
  // const parsedUserData = userData;

  const integralDetails = parsedUserData?.data?.integral;
  const coupon = parsedUserData?.data?.coupon;

  const [pageConfig, setPageConfig] = useState({
    page: 1,
    pageSize: 6,
  });
  const [dataList, setData] = useState<List[]>([]);
  const { data, error, loading, refresh } = useRequest<ApiData, any>(
    (p) => {
      return getItems(pageConfig);
    },
    {
      refreshDeps: [pageConfig.page],
      cacheKey: `home-${pageConfig.page}`,
      staleTime: -1,
      cacheTime: -1,
    }
  );

  const fetchMoreData = () => {
    setPageConfig({
      ...pageConfig,
      page: pageConfig.page + 1,
    });

    refresh();
  };

  useEffect(() => {
    if (data?.data?.list?.length) {
      setData([...dataList, ...data.data.list]);
    }
  }, [data]);

  //   useEffect(() => {
  //     let f = 0;
  //     try {
  //       // @ts-ignore
  //       f = JSON.parse(JsBridge?.getUserInfo?.())?.integral ?? 0;
  //       st(f);
  //     } catch (e) {
  //       // @ts-ignore
  //       dsBridge.call("getUserInfo", "getUserInfo", function (v) {
  //         st(JSON.stringify(JSON.parse(v)?.integral));
  //       });
  //     }
  //   }, []);
  const handleOpenTask = () => {
    navigate("/point_info");
    // try {
    //   //@ts-ignore
    //   JsBridge?.openNativePage?.(JSON.stringify({ pageName: "get-integral" }));
    // } catch (error) {
    //   //@ts-ignore
    //   dsBridge.call(
    //     "openNativePage",
    //     JSON.stringify({ pageName: "get-integral" })
    //   );
    // }
  };

  const checkLoginStatus = () => {
    let userInfo;
    //@ts-ignore
    const loginStatus = JsBridge?.isLogin?.();
    if (!loginStatus) {
      try {
        //@ts-ignore
        JsBridge?.openNativePage?.(JSON.stringify({ pageName: "login" }));
      } catch (error) {
        //@ts-ignore
        dsBridge?.call?.(
          "openNativePage",
          JSON.stringify({ pageName: "integral-feedback" })
        );
      }
    } else {
      // @ts-ignore
      userInfo = JsBridge?.getUserInfo?.();
      var canCustomerServer = null;
      var option = {
        openUrl: "https://111.173.119.203:45443",
        token: "67aa98823a51c1f53818982058417121",
        kefuid: "",
        isShowTip: false, // Disable auto display of chat button
        mobileIcon: "",
        pcIcon: "",
        windowStyle: "center",
        domId: "customerServerTip",
        insertDomNode: "body", // Append chat window to body
        sendUserData: {
          uid: userInfo.uId,
          nickName: userInfo.nickName,
          phone: "",
          sex: "",
          avatar: userInfo.avatar,
          openid: "",
        },
      };
      // @ts-ignore
      if (!canCustomerServer) {
        // @ts-ignore
        canCustomerServer = new initCustomerServer(option);
        // @ts-ignore
        canCustomerServer.init();
        // @ts-ignore
        canCustomerServer.getCustomeServer(); // Show chat window
      } else {
        // @ts-ignore
        canCustomerServer.getCustomeServer();
        console.log("Chat server already initialized.");
      }
      // @ts-ignore
      //  const name = `DYLS-${userInfo.nic}`
      //  const hrefLink = `https://111.173.119.203:45443/chat/mobile?noCanClose=1&token=67aa98823a51c1f53818982058417121&uid=${userInfo.uId}&nickName=${userInfo.nickName}&avatar=${userInfo.avatar}`
      // window.location.href = hrefLink
    }
  };
  // const noList = data?.data?.list.length === 0
  const noList = data?.data?.list.length === 0;

  return (
    <div className="container bg-white/90" ref={ref}>
      <Head />

      <div className="w-full relative mt-[-54px]">
        <img alt="" src="head_bg2.png" className=" h-[190px] w-full mt-10" />
        <div className="container px-4 absolute bottom-[-39px]">
          <div className="w-full jf-card flex rounded-xl h-[94px] pl-[26px] pr-[19px] items-center justify-between text-[#ff6a33]">
            {/* add line */}
            <div className=" fles flex-col gap-[10px]">
              <div className="flex items-end leading-[32px] gap-2">
                <span className="text-[32px]">
                  {integralDetails ? integralDetails : 0}
                </span>
                <span className="text-black/60 text-sm">积分</span>
              </div>
              <span className="new_redeem">
                兑换劵 :{" "}
                <span className="new_redeem_num">{coupon ? coupon : 0}</span> 张
              </span>
            </div>
            <button
              onClick={handleOpenTask}
              className="border-2 broder-[#FF9153] px-4 py-1.5 rounded-full font-medium text-xs;"
            >
              获取积分
            </button>
          </div>
        </div>
      </div>

      {loading && dataList.length === 0 && (
        <div className="mt-[45px] px-4">
          <SkeletonTheme
            direction="ltr"
            baseColor="#E1E1E1"
            highlightColor="#00000030"
          >
            <div className="grid grid-cols-2 gap-3 pb-3">
              {[...Array(6)].map((_, index) => (
                <Skeleton className="rounded-lg w-[250px] h-[250px] xl:w-[600px]" />
              ))}
            </div>
          </SkeletonTheme>
        </div>
      )}

      {noList ? (
        <div className=" w-screen h-[70vh] flex justify-center items-center">
          <div className=" flex flex-col justify-center items-center">
            <img className=" h-[184px]" src={noListImg} alt="" />
            <h1 className="nolist_head">这里还没有商品</h1>
            <span className=" nolist_des">稍后再试</span>
          </div>
        </div>
      ) : (
        <div
          className="jf-infinitescroll bg-black/5 container px-4 mt-[55px] gap-3 pb-3 overflow-y-auto"
          id="scrollableDiv"
        >
          {/* {loading ? (
            <SkeletonTheme
              direction="ltr"
              baseColor="#E1E1E1"
              highlightColor="#00000030"
            >
              <div className="grid grid-cols-2 gap-3 pb-3">
                {[...Array(6)].map((_, index) => (
                  <Skeleton className="rounded-lg w-[250px] h-[250px] xl:w-[600px]" />
                ))}
              </div>
            </SkeletonTheme>
          ) : ( */}
          <InfiniteScroll
            className="grid grid-cols-2 gap-3 pb-3"
            dataLength={dataList.length}
            next={fetchMoreData}
            hasMore={dataList.length < (data?.data?.total ?? 1)}
            loader={
              <div className="flex bg-transparent justify-center items-center w-screen py-5">
                <Loader />
              </div>
            }
            scrollableTarget="scrollableDiv"
          >
            {dataList?.map((i, k) => (
              <Card key={i.id} data={i} />
            ))}
          </InfiniteScroll>
          {/* )} */}
        </div>
      )}
    </div>
  );
};

export default Mall;
