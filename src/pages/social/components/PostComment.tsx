import { useState } from "react";
import { useGetCommentListQuery } from "../services/socialApi";
import Loader from "../../search/components/Loader";

type Props = {
  postId: number;
};

const PostComment: React.FC<Props> = ({ postId }) => {
  const [page, setPage] = useState(1);
  const { data, isFetching, refetch, isLoading } = useGetCommentListQuery({
    post_id: postId,
    page,
  });
  if (isLoading) {
    return (
      <div className="flex bg-gray-300 dark:bg-[#161619] justify-center items-center w-full py-[100px]">
        <Loader />
      </div>
    );
  }
  return <div>PostComment</div>;
};

export default PostComment;
