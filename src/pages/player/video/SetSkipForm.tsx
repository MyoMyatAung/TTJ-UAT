import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { setShowSetSkipDialog } from "../../../features/player/playerSlice";
import { setSkip } from "../../../features/player/playerSlice";

const SetSkipForm = () => {
  const { skipIntro, skipOutro } = useSelector((state: any) => state.episode);
  const [introSkip, setIntroSkip] = useState(skipIntro);
  const [outroSkip, setOutroSkip] = useState(skipOutro);
  const dispatch = useDispatch();

  const handleIntroChange = (value: number) => {
    setIntroSkip(value);
  };

  const handleOutroChange = (value: number) => {
    setOutroSkip(value);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  }

  return <div className="flex flex-col gap-2">
    <div>
      <label className="text-white" htmlFor="intro">
        跳过片头: {formatTime(introSkip)}
      </label>
      <input type="range" className="accent-[#F54100]" id="intro" name="intro" min="0" max="180" value={introSkip} onChange={(e) => handleIntroChange(Number(e.target.value))} />
    </div>
    <div>
      <label className="text-white" htmlFor="outro">
        跳过片尾 : {formatTime(outroSkip)}
      </label>
      <input type="range" className="accent-[#F54100]" id="outro" name="outro" min="0" max="180" value={outroSkip} onChange={(e) => handleOutroChange(Number(e.target.value))} />
    </div>
    <div className="flex justify-between">
      <button onClick={() => dispatch(setShowSetSkipDialog(false))} className="px-4 py-2 rounded text-white">定位</button>
      <div className="flex gap-2">
        <button onClick={() => dispatch(setShowSetSkipDialog(false))} className="px-4 py-2 rounded text-white">取消</button>
        <button onClick={() => {
          dispatch(setSkip({ intro: introSkip, outro: outroSkip }));
          dispatch(setShowSetSkipDialog(false));
        }} className="px-4 py-2 text-white rounded">确定</button>
      </div>
    </div>
  </div>;
};

export default SetSkipForm;
