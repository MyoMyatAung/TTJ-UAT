import { useParams } from "react-router-dom";
import DetailHeader from "./components/DetailHeader";
import { useSelector } from "react-redux";
import { selectTheme } from "../search/slice/ThemeSlice";
import { useGetPostDetailQuery } from "./services/socialApi";
import PostDetail from "./components/PostDetail";
import { DUMMY_DETAIL } from "./dummyDetail";
import Loader from "../../pages/search/components/Loader";

const SocialDetail = () => {
  const { id } = useParams();
  const darkmode = useSelector(selectTheme);
  const { data, refetch, isFetching, isLoading } = useGetPostDetailQuery({
    id,
  });
  console.log("SocialDetail ------> ", data);
  let content = null;
  if (isLoading) {
    content = (
      <div className="text-center -mt-[100px] max-sm:h-[80vh]  h-[100vh] flex justify-center items-center">
        <Loader />
      </div>
    );
  }
  switch (data.data.file_type) {
    case "web_view_post":
      content = <PostDetail post={DUMMY_DETAIL} />;
      break;
    default:
      content = <></>;
      break;
  }
  return (
    <div className="bg-white dark:bg-[#161619] min-h-screen">
      <DetailHeader darkmode={darkmode} />
      {content}
    </div>
  );
};

export default SocialDetail;
