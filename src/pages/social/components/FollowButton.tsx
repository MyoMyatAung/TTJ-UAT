import { useDispatch } from "react-redux";
import { useFollowUserMutation } from "../services/socialApi";
import { setAuthModel } from "../../../features/login/ModelSlice";
import { useCallback } from "react";

type Props = {
  is_followed: boolean;
  user_id: any;
};

const FollowButton: React.FC<Props> = ({ is_followed, user_id }) => {
  const isLoggedIn = localStorage.getItem("authToken");
  const parsedLoggedIn = isLoggedIn ? JSON.parse(isLoggedIn) : null;
  const token = parsedLoggedIn?.data?.access_token; // To check authentication status
  const [followUser, { isLoading }] = useFollowUserMutation();
  const dispatch = useDispatch();
  const handleFollow = useCallback(async () => {
    if (!token) {
      dispatch(setAuthModel(true));
      return;
    }
    await followUser({
      follow_user_id: user_id,
      is_follow: !is_followed,
    }).unwrap();
  }, [dispatch, followUser, is_followed, token, user_id]);
  return (
    <button
      onClick={handleFollow}
      disabled={isLoading}
      className={`flex gap-2 follow_btn items-center ${
        is_followed
          ? "border-[#fe58b5] border-[1px] text-[#fe58b5] bg-transparent"
          : "bg-[#fe58b5]"
      } rounded-[6px]`}
    >
      {is_followed ? (
        <span className="text-sm">已关注</span>
      ) : (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="11"
            height="12"
            viewBox="0 0 11 12"
            fill="none"
          >
            <path
              d="M5.92392 5.25532H9.40265C9.8198 5.25532 10.158 5.59349 10.158 6.01064C10.158 6.42779 9.8198 6.76596 9.40265 6.76596H5.92392V10.383C5.92392 10.806 5.58099 11.1489 5.15797 11.1489C4.73494 11.1489 4.39201 10.806 4.39201 10.383V6.76596H0.913287C0.496135 6.76596 0.157967 6.42779 0.157967 6.01064C0.157967 5.59349 0.496135 5.25532 0.913286 5.25532H4.39201V1.61702C4.39201 1.194 4.73494 0.851067 5.15797 0.851067C5.58099 0.851067 5.92392 1.194 5.92392 1.61702V5.25532Z"
              fill="white"
            />
          </svg>
          <span className="text-sm">关注</span>
        </>
      )}
    </button>
  );
};

export default FollowButton;
