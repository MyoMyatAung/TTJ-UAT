type Props = {
  unlock: () => void;
  unlockText?: string;
};

const UnlockedPost: React.FC<Props> = ({ unlock, unlockText = "立即解锁" }) => {
  return (
    <div className="absolute top-0 left-0 flex flex-col items-center justify-center w-full h-full z-10 gap-4 bg-gray-700/75 shadow-2xl">
      <button
        onClick={unlock}
        className="bg-gradient-to-r from-[#FE58B5] to-[#FF9153] px-4 py-2 rounded-md text-white"
      >
        {unlockText}
      </button>
    </div>
  );
};

export default UnlockedPost;
