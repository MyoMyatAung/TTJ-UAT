import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  unlock: () => void;
};

const LockPost: React.FC<Props> = ({ unlock }) => {
  return (
    <div className="absolute top-0 left-0 flex flex-col items-center justify-center w-full h-full z-10 gap-2 bg-gray-700/75 rounded-lg shadow-2xl">
      <FontAwesomeIcon icon={faLock} className="text-white text-xl" />
      <p className="text-white font-semibold text-lg">
        You need to to unlock this post to view this media
      </p>
      <button
        onClick={unlock}
        className="bg-gradient-to-r from-[#FE58B5] to-[#FF9153] px-4 py-2 rounded-md text-white"
      >
        Unlock New
      </button>
    </div>
  );
};

export default LockPost;
