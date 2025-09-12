import { useRef, useState } from "react";
import CustomLightbox from "./CustomLightBox";
import ImageWithPlaceholder1 from "./gifPlaceholder";
import Player from "./Player";
import ImageWithPlaceholder from "./socialImgPlaceholder";
import AudioPlayer from "./AudioPlayer";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectTheme } from "../../../pages/search/slice/ThemeSlice";
import ShareButton from "./ShareButton";
import FollowButton from "./FollowButton";
import LikeButton from "./LikeButton";

type Props = {
  post: any;
  renderDescription: any;
  lightboxStates: any;
  openLightbox: any;
  closeLightbox: any;
  index: number;
  activePlayer: any;
  setActivePlayer: any;
};

const PostItem: React.FC<Props> = ({
  post,
  renderDescription,
  lightboxStates,
  openLightbox,
  closeLightbox,
  index,
  activePlayer,
  setActivePlayer,
}) => {
  let videoData = useRef<HTMLVideoElement[]>([]);
  const [showCreatedTime, setShowCreatedTime] = useState(false);
  const darkmode = useSelector(selectTheme);
  const navigate = useNavigate();

  const handleShowDetail = (post: any) => {
    navigate(`/detail-social/${post.post_id}`);
  };

  return (
    <div
      key={post.post_id}
      className="bg-background dark:bg-[#161619] mt-2 rounded-lg p-0 text-white"
    >
      <div className="flex justify-between items-center mb-4 px-4 pt-4">
        {/* profile, name, level, etc. */}
        <div className="flex items-center ">
          {post?.user?.avatar ? (
            <img
              src={post.user.avatar}
              alt={post.user.nickname}
              className="w-10 h-10 rounded-full mr-2 border border-[#4A4A4A]"
            />
          ) : (
            <div className="mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="56"
                height="50"
                viewBox="0 0 56 50"
                fill="none"
              >
                <g filter="url(#filter0_d_1594_11143)">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M28.0605 0.013916C41.2937 0.013916 51.9873 10.7075 51.9873 24.0744C51.9873 31.1588 48.9129 37.575 44.1008 41.9861C40.8927 24.8764 15.2282 24.8764 12.0202 41.9861C7.07439 37.575 4 31.1588 4 24.0744C4 10.7075 14.6935 0.013916 28.0605 0.013916ZM28.0605 12.0441C32.6052 12.0441 36.348 15.7869 36.348 20.3316C36.348 24.8764 32.6052 28.6191 28.0605 28.6191C23.5157 28.6191 19.773 24.8764 19.773 20.3316C19.773 15.7869 23.5157 12.0441 28.0605 12.0441Z"
                    fill="white"
                    fill-opacity="0.8"
                    shape-rendering="crispEdges"
                  />
                </g>
                <defs>
                  <filter
                    id="filter0_d_1594_11143"
                    x="0"
                    y="0.013916"
                    width="55.9873"
                    height="49.9722"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                  >
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_1594_11143"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_1594_11143"
                      result="shape"
                    />
                  </filter>
                </defs>
              </svg>
            </div>
          )}

          <div>
            <div className="flex gap-1 items-center">
              <h4 className="font-[500] text-[14px] truncate text-black dark:text-white">
                {post.user.nickname}
              </h4>

              {post?.type !== "ads" && post?.user?.level && (
                <img src={post?.user?.level} alt="" className="h-6 w-auto" />
              )}
            </div>
            {post?.type !== "ads" && post?.is_top === 1 && (
              <div className="flex items-center gap-1 text-black dark:text-white">
                <span className="pin">Pinned</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="17"
                  viewBox="0 0 16 17"
                  fill="none"
                >
                  <path
                    d="M12.7754 6.14272L9.85753 3.22538C9.7861 3.15393 9.70129 3.09726 9.60795 3.05859C9.51461 3.01992 9.41457 3.00002 9.31353 3.00002C9.2125 3.00002 9.11246 3.01992 9.01912 3.05859C8.92578 3.09726 8.84097 3.15393 8.76954 3.22538L6.19114 5.81195C5.67864 5.65137 4.50843 5.45762 3.28726 6.44369C3.20309 6.51137 3.13411 6.59602 3.08483 6.69213C3.03554 6.78823 3.00704 6.89364 3.00119 7.00149C2.99534 7.10934 3.01227 7.21722 3.05087 7.31809C3.08947 7.41897 3.14889 7.51058 3.22524 7.58697L5.54835 9.90911L3.49736 11.9587C3.42519 12.0308 3.38464 12.1287 3.38464 12.2308C3.38464 12.3328 3.42519 12.4307 3.49736 12.5029C3.56953 12.5751 3.66741 12.6156 3.76948 12.6156C3.87154 12.6156 3.96943 12.5751 4.0416 12.5029L6.09114 10.4519L8.4128 12.7736C8.48417 12.8452 8.56898 12.9021 8.66237 12.941C8.75576 12.9798 8.85589 12.9999 8.95704 13C8.97531 13 8.9931 13 9.01137 13C9.12102 12.9924 9.22776 12.9613 9.32432 12.9088C9.42088 12.8563 9.50501 12.7836 9.57099 12.6957C10.5152 11.4409 10.4244 10.4207 10.2051 9.81104L12.7758 7.23072C12.8472 7.15925 12.9039 7.07442 12.9425 6.98106C12.9811 6.88771 13.001 6.78765 13.001 6.68662C13.0009 6.58559 12.981 6.48555 12.9423 6.39223C12.9035 6.29891 12.8468 6.21412 12.7754 6.14272ZM12.2311 6.68696L9.47772 9.44949C9.42086 9.50657 9.38335 9.58006 9.3705 9.65959C9.35765 9.73912 9.37009 9.82069 9.40608 9.89277C9.8609 10.8029 9.31954 11.7481 8.95704 12.2303L3.76948 7.04225C4.35025 6.57398 4.90603 6.45042 5.33104 6.45042C5.60071 6.44674 5.86817 6.49964 6.11614 6.60571C6.18848 6.64192 6.2704 6.65439 6.35024 6.64136C6.43008 6.62832 6.50378 6.59045 6.56086 6.53311L9.31377 3.76914L12.2311 6.68696Z"
                    fill="#555555"
                  />
                  <path
                    d="M12.2311 6.68696L9.47772 9.44949C9.42086 9.50657 9.38335 9.58006 9.3705 9.65959C9.35765 9.73912 9.37009 9.82069 9.40608 9.89277C9.8609 10.8029 9.31954 11.7481 8.95704 12.2303L3.76948 7.04225C4.35025 6.57398 4.90603 6.45042 5.33104 6.45042C5.60071 6.44674 5.86817 6.49964 6.11614 6.60571C6.18848 6.64192 6.2704 6.65439 6.35024 6.64136C6.43008 6.62832 6.50378 6.59045 6.56086 6.53311L9.31377 3.76914L12.2311 6.68696Z"
                    fill="#555555"
                  />
                </svg>
              </div>
            )}
            {post?.type === "ads" && (
              <div className="flex items-center gap-1">
                <span className="pin text-black dark:text-white">
                  {post?.ads_info?.profile_text}
                </span>
              </div>
            )}
          </div>
        </div>
        {/* follow button */}
        {post?.type !== "ads" && (
          <FollowButton is_followed={post.is_followed} user_id={post.user.id} />
        )}
      </div>
      <p className="mb-2 px-4 social_des">{renderDescription(post)}</p>{" "}
      {post.file_type === "image" && (
        <div className="grid grid-cols-3 lg:grid-cols-6 gap-2 px-4">
          {post.files.map((file: any, index: any) => (
            <div
              key={index}
              className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md"
              onClick={() => openLightbox(post.post_id, index)}
            >
              <ImageWithPlaceholder
                src={file.resourceURL}
                alt={`Picture of social_image`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
          {lightboxStates[post.post_id]?.isOpen && (
            <CustomLightbox
              images={post.files}
              isOpen={lightboxStates[post.post_id]?.isOpen}
              onClose={() => closeLightbox(post.post_id)}
              initialIndex={lightboxStates[post.post_id]?.currentIndex}
            />
          )}
        </div>
      )}
      {post.file_type === "gif" && (
        <ImageWithPlaceholder1
          src={post.files[0]?.resourceURL}
          alt={`Picture of social_image`}
          className="w-full h-full object-cover"
        />
      )}
      {post.file_type === "video" && (
        <Player
          videoData={videoData}
          isCenterPlay={true}
          src={post?.files[0].resourceURL}
          thumbnail={post?.files[0].thumbnail}
          status={post?.type === "ads" ? true : false}
        />
      )}
      {post.file_type === "audio" && (
        <AudioPlayer
          src={post?.files[0]?.resourceURL}
          title={post?.files[0]?.title || post?.description}
          index={index}
          setActivePlayer={setActivePlayer}
          activePlayer={activePlayer}
        />
      )}
      {post?.file_type === "web_view_post" && post?.type !== "ads" && (
        <div>
          {post.files.map((file: any, index: any) => (
            <div
              key={index}
              className="aspect-w-1 aspect-h-1 w-full overflow-hidden"
              onClick={() => openLightbox(post.post_id, index)}
            >
              <ImageWithPlaceholder
                src={file.resourceURL}
                alt={`Picture of social_image`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
          <div className="pt-3 px-4 flex items-center gap-x-2 justify-between">
            <div className="flex items-center gap-x-1">
              {post?.level_info && (
                <img
                  src={post?.level_info?.icon}
                  alt=""
                  className="h-6 w-auto"
                />
              )}
              <p className="text-xs px-2 bg-mainColor rounded-full">
                {post?.info_text}
              </p>
            </div>

            <Link
              // update route on post detail
              to={`/social/${post?.post_id}`}
              className="flex border bg-[#FE58B51F] border-mainColor rounded-md px-2 py-1 text-mainColor"
            >
              <span className="text-sm">点击查看完整版</span>
              <svg
                width="21"
                height="21"
                viewBox="0 0 21 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.3125 10.3238L7.1875 6.19884L8.36583 5.02051L13.6692 10.3238L8.36583 15.6272L7.1875 14.4488L11.3125 10.3238Z"
                  fill="#FE58B5"
                />
              </svg>
            </Link>
          </div>
          {lightboxStates[post.post_id]?.isOpen && (
            <CustomLightbox
              images={post.files}
              isOpen={lightboxStates[post.post_id]?.isOpen}
              onClose={() => closeLightbox(post.post_id)}
              initialIndex={lightboxStates[post.post_id]?.currentIndex}
            />
          )}
        </div>
      )}
      {post?.type === "post" || !post?.type ? (
        <div className="flex justify-between items-center px-4 py-3 text-xs">
          {showCreatedTime ? (
            <div className="fixed top-0 left-0 flex h-screen items-center justify-center z-[1000] w-full">
              <p className="text-[12px] text-white font-semibold bg-gradient-to-r from-background to-gray-800 px-3 py-1 rounded-md">
                该功能还在开发中，敬请期待！
              </p>
            </div>
          ) : (
            <></>
          )}

          <div>
            <p className="text-gray-400 text-xs">{post?.create_time}</p>
          </div>

          <div className="flex gap-x-5  items-center justify-center">
            <LikeButton is_liked={post.is_liked} like_count={post.like_count} post_id={post.post_id} />
            <button
              onClick={() => handleShowDetail(post)}
              // onClick={() => showCreatedTimeHandler()}
              className="flex -mt-[2px] items-center gap-x-2 text-black dark:text-white"
            >
              {!darkmode ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19"
                  height="18"
                  viewBox="0 0 19 18"
                  fill="none"
                >
                  <path
                    d="M2.23138 13.7092C2.00563 13.3259 1.85776 13.0689 1.78426 12.9318C1.10331 11.6618 0.747951 10.2428 0.750009 8.80176C0.750009 3.96935 4.6676 0.0517578 9.50001 0.0517578C14.3324 0.0517578 18.25 3.96935 18.25 8.80176C18.25 13.6342 14.3324 17.5518 9.50001 17.5518C7.91718 17.5541 6.36362 17.1252 5.00623 16.311C4.86948 16.23 4.7324 16.1496 4.59498 16.0697L2.45385 16.6538C1.96385 16.7872 1.51454 16.3377 1.6482 15.8479L2.23138 13.7092ZM3.57057 13.7869L3.21663 15.0851L4.51491 14.7312C4.59892 14.7083 4.68665 14.7023 4.77299 14.7136C4.85933 14.7249 4.94256 14.7532 5.01782 14.797C5.23951 14.9256 5.46067 15.0551 5.68129 15.1855C6.83476 15.8773 8.15499 16.2416 9.50001 16.2393C13.6077 16.2393 16.9375 12.9094 16.9375 8.80176C16.9375 4.69407 13.6077 1.36426 9.50001 1.36426C5.39232 1.36426 2.06251 4.69407 2.06251 8.80176C2.06251 10.0443 2.36701 11.2413 2.94079 12.3114C3.01692 12.4531 3.20592 12.7795 3.5021 13.28C3.54686 13.3556 3.57598 13.4394 3.58774 13.5265C3.59951 13.6135 3.59367 13.7021 3.57057 13.7869ZM6.5646 12.3354C6.49715 12.2807 6.44123 12.2132 6.40009 12.1367C6.35894 12.0602 6.33339 11.9763 6.32491 11.8899C6.31643 11.8034 6.32519 11.7162 6.35069 11.6331C6.37618 11.5501 6.41791 11.473 6.47344 11.4062C6.52897 11.3394 6.5972 11.2843 6.67419 11.2441C6.75117 11.2039 6.83537 11.1794 6.9219 11.1719C7.00844 11.1645 7.09559 11.1743 7.17829 11.2008C7.261 11.2274 7.33763 11.27 7.40373 11.3264C7.9921 11.8167 8.73412 12.0845 9.50001 12.083C10.277 12.083 11.0109 11.8129 11.5956 11.3266C11.6619 11.2715 11.7384 11.23 11.8207 11.2044C11.903 11.1789 11.9895 11.1698 12.0754 11.1777C12.1612 11.1856 12.2446 11.2103 12.3209 11.2505C12.3971 11.2906 12.4648 11.3454 12.5199 11.4117C12.575 11.4779 12.6165 11.5544 12.642 11.6367C12.6675 11.719 12.6766 11.8056 12.6687 11.8914C12.6608 11.9772 12.6361 12.0606 12.5959 12.1369C12.5558 12.2132 12.501 12.2808 12.4348 12.3359C11.6108 13.0219 10.5722 13.3969 9.50001 13.3955C8.42756 13.397 7.38866 13.0218 6.5646 12.3354Z"
                    fill="black"
                  />
                </svg>
              ) : (
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 21 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.23138 15.4075C3.00563 15.0242 2.85776 14.7672 2.78426 14.63C2.10331 13.3601 1.74795 11.941 1.75001 10.5C1.75001 5.66762 5.6676 1.75003 10.5 1.75003C15.3324 1.75003 19.25 5.66762 19.25 10.5C19.25 15.3324 15.3324 19.25 10.5 19.25C8.91718 19.2524 7.36362 18.8234 6.00623 18.0093C5.86948 17.9283 5.7324 17.8479 5.59498 17.768L3.45385 18.3521C2.96385 18.4855 2.51454 18.036 2.6482 17.5462L3.23138 15.4075ZM4.57057 15.4851L4.21663 16.7834L5.51491 16.4295C5.59892 16.4065 5.68665 16.4005 5.77299 16.4118C5.85933 16.4231 5.94256 16.4515 6.01782 16.4953C6.23951 16.6239 6.46067 16.7534 6.68129 16.8838C7.83476 17.5756 9.15499 17.9399 10.5 17.9375C14.6077 17.9375 17.9375 14.6077 17.9375 10.5C17.9375 6.39234 14.6077 3.06253 10.5 3.06253C6.39232 3.06253 3.06251 6.39234 3.06251 10.5C3.06251 11.7425 3.36701 12.9395 3.94079 14.0097C4.01692 14.1514 4.20592 14.4778 4.5021 14.9783C4.54686 15.0539 4.57598 15.1377 4.58774 15.2248C4.59951 15.3118 4.59367 15.4004 4.57057 15.4851ZM7.5646 14.0337C7.49715 13.979 7.44123 13.9114 7.40009 13.835C7.35894 13.7585 7.33339 13.6746 7.32491 13.5881C7.31643 13.5017 7.32519 13.4144 7.35069 13.3314C7.37618 13.2484 7.41791 13.1712 7.47344 13.1045C7.52897 13.0377 7.5972 12.9826 7.67419 12.9424C7.75117 12.9022 7.83537 12.8776 7.9219 12.8702C8.00844 12.8628 8.09559 12.8726 8.17829 12.8991C8.261 12.9256 8.33763 12.9683 8.40373 13.0246C8.9921 13.5149 9.73412 13.7828 10.5 13.7813C11.277 13.7813 12.0109 13.5111 12.5956 13.0248C12.6619 12.9697 12.7384 12.9282 12.8207 12.9027C12.903 12.8772 12.9895 12.8681 13.0754 12.876C13.1612 12.8839 13.2446 12.9086 13.3209 12.9488C13.3971 12.9889 13.4648 13.0437 13.5199 13.1099C13.575 13.1762 13.6165 13.2527 13.642 13.335C13.6675 13.4173 13.6766 13.5038 13.6687 13.5897C13.6608 13.6755 13.6361 13.7589 13.5959 13.8352C13.5558 13.9114 13.501 13.9791 13.4348 14.0342C12.6108 14.7202 11.5722 15.0952 10.5 15.0938C9.42756 15.0952 8.38866 14.7201 7.5646 14.0337Z"
                    fill="white"
                  />
                </svg>
              )}
              {post.comment_count}
            </button>
            <ShareButton />
          </div>
        </div>
      ) : (
        post?.type === "ads" && (
          <div className="flex justify-between items-center px-4 py-3 text-xs">
            <div className="flex items-center gap-2">
              <div>
                <img src={post?.ads_info?.icon} alt="" width={36} height={36} />
              </div>
              <div>
                <div className="flex flex-col dark:text-white text-black">
                  <span className="ads-title">{post?.ads_info?.title}</span>
                  <span className="ads-description">
                    {post?.ads_info?.description}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <a
                target="_blank"
                rel="noreferrer"
                href={post?.ads_info?.jump_url}
                className={`flex gap-2 px-2 py-1 items-center
                    bg-[#fe58b5]
                rounded-[6px]`}
              >
                <span className="text-sm">{post?.ads_info?.btn_text}</span>
              </a>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default PostItem;
