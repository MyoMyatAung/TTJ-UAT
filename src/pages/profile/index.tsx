import "./profile.css";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import ProfileFirst from "./components/ProfileFirst";
import ProfileSecond from "./components/ProfileSecond";
import bg from "../home/images/pbg.png";

const index = () => {
  return (
    <>
      {/* <div className="profile-bg"></div> */}
      <div className="text-black profile-bg  h-screen">
        {/* <img src={bg} alt="" className="fixed top-0 left-0" /> */}
        <div className="">
          <div>
            <Navbar />
          </div>
          <div>
            <Header />
          </div>
          <div className="pb-[100px]">
            <ProfileFirst />
            <ProfileSecond />
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
