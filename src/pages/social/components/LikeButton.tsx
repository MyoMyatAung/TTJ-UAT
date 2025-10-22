import { useDispatch, useSelector } from "react-redux";
import { selectTheme } from "../../../pages/search/slice/ThemeSlice";
import { useLikePostMutation } from "../services/socialApi";
import { useCallback } from "react";
import { setAuthModel } from "../../../features/login/ModelSlice";

type Props = {
  is_liked: boolean;
  like_count: number;
  post_id: any;
};

const LikeButton: React.FC<Props> = ({ is_liked, like_count, post_id }) => {
  const isLoggedIn = localStorage.getItem("authToken");
  const parsedLoggedIn = isLoggedIn ? JSON.parse(isLoggedIn) : null;
  const token = parsedLoggedIn?.data?.access_token; // To check authentication status
  const dispatch = useDispatch();
  const darkmode = useSelector(selectTheme);
  const [likePost, { isLoading }] = useLikePostMutation();
  const handleLike = useCallback(async () => {
    if (!token) {
      dispatch(setAuthModel(true));
      return;
    }
    await likePost({ post_id, is_like: !is_liked }).unwrap();
  }, [dispatch, is_liked, likePost, post_id, token]);
  if (darkmode) {
    return (
      <button
        onClick={handleLike}
        className="flex -mt-[2px] text-black items-center gap-x-2"
        disabled={isLoading}
      >
        {is_liked ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="21"
            viewBox="0 0 21 21"
            fill="none"
          >
            <path
              d="M4.2 8.79627V18.3963H1V8.79627H4.2ZM7.4 18.3963C6.97565 18.3963 6.56869 18.2277 6.26863 17.9276C5.96857 17.6276 5.8 17.2206 5.8 16.7963V8.79627C5.8 8.35627 5.976 7.95627 6.272 7.66827L11.536 2.39627L12.384 3.24427C12.6 3.46027 12.736 3.75627 12.736 4.08427L12.712 4.34027L11.952 7.99627H17C17.4243 7.99627 17.8313 8.16484 18.1314 8.4649C18.4314 8.76496 18.6 9.17192 18.6 9.59627V11.1963C18.6 11.4043 18.56 11.5963 18.488 11.7803L16.072 17.4203C15.832 17.9963 15.264 18.3963 14.6 18.3963H7.4Z"
              fill="#FE58B5"
              stroke="#FE58B5"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="21"
            viewBox="0 0 21 21"
            fill="none"
          >
            <path
              d="M4.2 8.79624V18.3962H1V8.79624H4.2ZM7.4 18.3962C6.97565 18.3962 6.56869 18.2277 6.26863 17.9276C5.96857 17.6276 5.8 17.2206 5.8 16.7962V8.79624C5.8 8.35624 5.976 7.95624 6.272 7.66824L11.536 2.39624L12.384 3.24424C12.6 3.46024 12.736 3.75624 12.736 4.08424L12.712 4.34024L11.952 7.99624H17C17.4243 7.99624 17.8313 8.16481 18.1314 8.46487C18.4314 8.76493 18.6 9.17189 18.6 9.59624V11.1962C18.6 11.4042 18.56 11.5962 18.488 11.7802L16.072 17.4202C15.832 17.9962 15.264 18.3962 14.6 18.3962H7.4Z"
              stroke="white"
            />
          </svg>
        )}{" "}
        <span className="text-black dark:text-white"> {like_count}</span>
      </button>
    );
  } else {
    return (
      <button
        onClick={handleLike}
        className="flex -mt-[2px] items-center gap-x-2"
        disabled={isLoading}
      >
        {is_liked ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="22"
            viewBox="0 0 21 22"
            fill="none"
          >
            <path
              d="M4.2 9.098V18.698H1V9.098H4.2ZM7.4 18.698C6.97565 18.698 6.56869 18.5294 6.26863 18.2294C5.96857 17.9293 5.8 17.5223 5.8 17.098V9.098C5.8 8.658 5.976 8.258 6.272 7.97L11.536 2.698L12.384 3.546C12.6 3.762 12.736 4.058 12.736 4.386L12.712 4.642L11.952 8.298H17C17.4243 8.298 17.8313 8.46657 18.1314 8.76663C18.4314 9.06669 18.6 9.47365 18.6 9.898V11.498C18.6 11.706 18.56 11.898 18.488 12.082L16.072 17.722C15.832 18.298 15.264 18.698 14.6 18.698H7.4Z"
              fill="#FE58B5"
              stroke="#FE58B5"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="21"
            viewBox="0 0 21 21"
            fill="none"
          >
            <path
              d="M4.2 8.4V18H1V8.4H4.2ZM7.4 18C6.97565 18 6.56869 17.8314 6.26863 17.5314C5.96857 17.2313 5.8 16.8243 5.8 16.4V8.4C5.8 7.96 5.976 7.56 6.272 7.272L11.536 2L12.384 2.848C12.6 3.064 12.736 3.36 12.736 3.688L12.712 3.944L11.952 7.6H17C17.4243 7.6 17.8313 7.76857 18.1314 8.06863C18.4314 8.36869 18.6 8.77565 18.6 9.2V10.8C18.6 11.008 18.56 11.2 18.488 11.384L16.072 17.024C15.832 17.6 15.264 18 14.6 18H7.4Z"
              stroke="black"
            />
          </svg>
        )}{" "}
        <span className="text-black dark:text-white"> {like_count}</span>
      </button>
    );
  }
};

export default LikeButton;
