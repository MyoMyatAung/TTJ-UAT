import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  unlock: () => void;
  unlockText?: string;
};

const LockPost: React.FC<Props> = ({ unlock, unlockText = "Unlock Now" }) => {
  return (
    <div className="absolute top-0 left-0 flex flex-col items-center justify-center w-full h-full z-10 gap-4 bg-gray-700/75 shadow-2xl">
      <FontAwesomeIcon icon={faLock} className="text-white text-2xl" />
      <p className="text-white font-semibold text-lg">
        You need to to unlock to view exclusive videos{" "}
      </p>
      <button
        onClick={unlock}
        className="bg-gradient-to-r from-[#FE58B5] to-[#FF9153] px-4 py-2 rounded-md text-white"
      >
        {unlockText}
      </button>
    </div>
  );
};

export default LockPost;
