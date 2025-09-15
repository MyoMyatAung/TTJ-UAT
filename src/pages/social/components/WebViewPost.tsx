import { Link } from "react-router-dom";
import CustomLightbox from "./CustomLightBox";
import ImageWithPlaceholder from "./socialImgPlaceholder";

type Props = {
  post: any;
  openLightbox: (postId: any, index: any) => void;
  closeLightbox: (postId: any) => void;
  lightboxStates: {
    [key: string]: { isOpen: boolean; currentIndex: number };
  };
};

const WebViewPost: React.FC<Props> = ({ post, openLightbox, closeLightbox, lightboxStates }) => {
  return (
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
            <img src={post?.level_info?.icon} alt="" className="h-6 w-auto" />
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
  );
};

export default WebViewPost;
