import FollowButton from "./FollowButton";

type Props = {
  post: any;
};

const PostHeader: React.FC<Props> = ({ post }) => {
  return (
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
  );
};

export default PostHeader;
