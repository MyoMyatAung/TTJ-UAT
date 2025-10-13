import { useNavigate } from "react-router-dom";
import CustomLightbox from "./CustomLightBox";
import ImageWithPlaceholder from "./socialImgPlaceholder";
import LockPost from "./LockPost";

type Props = {
  post: any;
  openLightbox: (postId: any, index: any) => void;
  closeLightbox: (postId: any) => void;
  lightboxStates: {
    [key: string]: { isOpen: boolean; currentIndex: number };
  };
};

const WebViewPost: React.FC<Props> = ({
  post,
  openLightbox,
  closeLightbox,
  lightboxStates,
}) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/detail-social/${post.post_id}`);
  };
  return (
    <div className="relative">
      {!post.unlock_post && <LockPost unlock={handleNavigate} unlockText="Click To View Details" />}
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
