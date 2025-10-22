import { useParams } from "react-router-dom";
import DetailHeader from "./components/DetailHeader";
import { useSelector } from "react-redux";
import { selectTheme } from "../search/slice/ThemeSlice";
import { useGetPostDetailQuery } from "./services/socialApi";
import WebViewPostDetail from "./components/WebViewPostDetail";
import Loader from "../search/components/Loader";
import SocialPostDetail from "./components/SocialPostDetail";
import { useState } from "react";

const SocialDetailPage = () => {
  const { id } = useParams();
  const darkmode = useSelector(selectTheme);
  const [activePlayer, setActivePlayer] = useState<any>(null);
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
  const { data, isLoading } =
    useGetPostDetailQuery({
      id,
    });
  let content = null;
  if (isLoading) {
    content = (
      <div className="text-center -mt-[100px] max-sm:h-[80vh]  h-[100vh] flex justify-center items-center">
        <Loader />
      </div>
    );
  } else {
    switch (data.data.file_type) {
      case "web_view_post":
        content = <WebViewPostDetail post={data.data} />;
        break;
      default:
        content = (
          <SocialPostDetail
            post={data.data}
            openLightbox={openLightbox}
            lightboxStates={lightboxStates}
            closeLightbox={closeLightbox}
            showCreatedTime={false}
            activePlayer={activePlayer}
            setActivePlayer={setActivePlayer}
          />
        );
        break;
    }
  }
  return (
    <div className="bg-white dark:bg-[#161619] min-h-screen">
      <DetailHeader darkmode={darkmode} />
      {content}
    </div>
  );
};

export default SocialDetailPage;
