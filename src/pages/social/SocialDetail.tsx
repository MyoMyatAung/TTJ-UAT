import { useParams } from "react-router-dom";
import DetailHeader from "./components/DetailHeader";
import { useSelector } from "react-redux";
import { selectTheme } from "../search/slice/ThemeSlice";
import { useGetPostDetailQuery } from "./services/socialApi";
import PostDetail from "./components/PostDetail";
import { DUMMY_DETAIL } from "./dummyDetail";

const SocialDetail = () => {
  const { id } = useParams();
  const darkmode = useSelector(selectTheme);
  const { data, refetch, isFetching, isLoading } = useGetPostDetailQuery({
    id,
  });
  console.log("SocialDetail ------> ", data);
  return (
    <div className="bg-white dark:bg-[#161619] min-h-screen">
      <DetailHeader darkmode={darkmode} />
      <PostDetail post={DUMMY_DETAIL} />
    </div>
  );
};

export default SocialDetail;
