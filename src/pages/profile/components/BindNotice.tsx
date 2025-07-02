import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BIND_NOTICE_KEY = "hideBindNoticeUntil";

function BindNotice({
  token,
  shouldShowBind,
  close,
  sec,
  go,
}: {
  token: string;
  shouldShowBind: boolean;
  close: any;
  sec: any;
  go: any;
}) {
  const [showNotice, setShowNotice] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    if (!token || !shouldShowBind) return;

    const today = new Date().toISOString().slice(0, 10); // e.g., "2025-07-02"
    const hiddenUntil = localStorage.getItem(BIND_NOTICE_KEY);

    if (hiddenUntil !== today) {
      setShowNotice(true);
    }
  }, [token, shouldShowBind]);

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("click");
    // return;
    const today = new Date().toISOString().slice(0, 10);
    localStorage.setItem(BIND_NOTICE_KEY, today);
    setShowNotice(false);
  };

  if (!showNotice) return null;

  return (
    <div
      onClick={() => navigate("/update_email")}
      className="px-[16px] py-[12px] new_notice_bind flex flex-col gap-[8px]"
    >
      <div className="flex w-full justify-between items-center">
        <div className="flex gap-[6px]">
          <img src={sec} alt="" />
          <span className="text-white text-[14px] font-[700]">
            绑定邮箱或手机号
          </span>
        </div>
        <div
          className="p-2 bg-white/40 rounded-full cursor-pointer"
          onClick={handleClose}
        >
          {close}
        </div>
      </div>
      <div className="flex items-center justify-between w-full">
        <span className="w-2/3 text-white/80 text-[12px] font-[500] leading-[16px]">
          您还没有绑定任何安全验证方式，确保账号丢失后可以找回，建议您立即绑定。
        </span>
        <button className="bg-white/20 rounded-[12px] p-[8px] flex justify-center items-center gap-[6px] text-white text-[12px] font-[600]">
          完善账号 {go}
        </button>
      </div>
    </div>
  );
}

export default BindNotice;
