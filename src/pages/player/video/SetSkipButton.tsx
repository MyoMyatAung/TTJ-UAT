import { useDispatch, useSelector } from "react-redux";
import { setShowSetSkipDialog } from "../../../features/player/playerSlice";

const SetSkipButton = () => {
  const { skipIntro, skipOutro } = useSelector((state: any) => state.episode);
  const dispatch = useDispatch();
  const hasSkip = skipIntro > 0 || skipOutro > 0;

  const handleClick = () => {
    dispatch(setShowSetSkipDialog(true));
  };

  return <button className="flex items-center gap-0.5" onClick={handleClick}>
    <div className="bg-[#FFFFFF1A] h-[32px] flex justify-center items-center text-white font-semibold px-4 rounded-l-full">
      跳过片头片尾
    </div>
    <div className="bg-[#FFFFFF1A] h-[32px] flex justify-center items-center px-2 rounded-r-full">
      {hasSkip ?
        <svg width="22" height="22" viewBox="0 0 22 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.1829 0.448242V1.87574H9.97107V5.06014H12.8574V6.45626H9.97107V12.4486H8.52789V6.45626H4.91994C4.86765 7.14648 4.7683 7.78441 4.62189 8.37005C4.48594 8.94523 4.31861 9.45766 4.11992 9.90735C3.55519 11.0891 2.66105 11.9937 1.43748 12.6212L0.63746 11.3819C1.76691 10.7126 2.5251 9.89166 2.91204 8.91908C3.16302 8.23932 3.34081 7.41838 3.44539 6.45626H0.449219V5.06014H3.55519V1.87574H1.15512V0.448242H12.1829ZM5.04543 4.82484C5.04543 4.85622 5.0402 4.89282 5.02975 4.93465C5.02975 4.97648 5.02975 5.01831 5.02975 5.06014H8.52789V1.87574H5.04543V4.82484Z" fill="white" stroke="white" stroke-width="0.896385" />
          <circle cx="15.8485" cy="10.7479" r="5.60241" fill="#2D2D30" />
          <circle cx="15.8452" cy="10.7476" r="4.48193" fill="#F54100" />
          <path d="M13.6055 10.7477L15.2862 12.4284L18.0874 9.6272" stroke="white" stroke-width="1.12048" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        : <svg width="22" height="22" viewBox="0 0 22 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.28941 0.568825C4.53694 0.889213 4.77951 1.22416 5.01713 1.57368C5.26466 1.91348 5.50228 2.27756 5.73 2.66591L4.95773 3.04455H7.57159C7.80921 2.68533 8.02703 2.29213 8.22505 1.86494C8.42307 1.43776 8.61614 0.976591 8.80426 0.481445L10.1409 0.845524C9.84387 1.66106 9.50228 2.39407 9.11614 3.04455H11.5369V4.3698H7.28941V4.67562C7.26961 4.96688 7.24486 5.25814 7.21515 5.54941C7.18545 5.83096 7.14585 6.09795 7.09634 6.35038H12.2944V7.67562H7.74981C8.39337 9.15135 10.0171 10.3261 12.6211 11.1999L11.8191 12.4814C9.10624 11.3941 7.35872 9.96688 6.57654 8.19989C6.35872 8.73387 6.08644 9.22902 5.75971 9.68533C4.85872 10.831 3.39832 11.7193 1.37852 12.3504L0.621094 11.1853C2.6409 10.5348 4.00228 9.71931 4.70525 8.73873C4.83396 8.58339 4.93793 8.41348 5.01713 8.22902C5.10624 8.04455 5.2003 7.86009 5.29931 7.67562H0.858717V6.35038H5.7003C5.80921 5.80669 5.86862 5.24844 5.87852 4.67562V4.3698H1.61614V3.04455H4.36367C3.93793 2.35523 3.49733 1.72416 3.04189 1.15135L4.28941 0.568825Z" fill="white" stroke="white" stroke-width="0.8" />
          <circle cx="16.0204" cy="10.7811" r="5.60241" fill="#2D2D30" />
          <circle cx="16.0171" cy="10.7808" r="3.58193" stroke="white" stroke-width="1.8" />
          <path d="M13.6211 13.4814L18.1211 8.48145" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>}
    </div>
  </button>
}

export default SetSkipButton;