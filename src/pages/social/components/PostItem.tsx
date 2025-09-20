import { useRef, useState } from "react";
import CustomLightbox from "./CustomLightBox";
import ImageWithPlaceholder1 from "./gifPlaceholder";
import Player from "./Player";
import ImageWithPlaceholder from "./socialImgPlaceholder";
import AudioPlayer from "./AudioPlayer";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectTheme } from "../../../pages/search/slice/ThemeSlice";
import ShareButton from "./ShareButton";
import FollowButton from "./FollowButton";
import LikeButton from "./LikeButton";
import WebViewPost from "./WebViewPost";
import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";

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
      <PostHeader post={post} />
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
        <WebViewPost
          post={post}
          openLightbox={openLightbox}
          closeLightbox={closeLightbox}
          lightboxStates={lightboxStates}
        />
      )}
      {post?.type === "post" || !post?.type ? (
        <PostFooter post={post} />
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
