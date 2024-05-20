import "../App.css";
import Friends from "../Images/friend.png";
import Groups from "../Images/2.png";
import Market from "../Images/3.png";
import Watch from "../Images/4.png";
import Memories from "../Images/5.png";
import Events from "../Images/6.png";
import Gaming from "../Images/7.png";
import Gallery from "../Images/8.png";
import Videos from "../Images/9.png";
import Messages from "../Images/10.png";
import Tutorials from "../Images/11.png";
import Courses from "../Images/12.png";
import Fund from "../Images/13.png";
import { getAuth } from "firebase/auth";
import { Link } from "react-router-dom";
import { Flex } from "@chakra-ui/react";

const Sidebar = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  return (
    <div className="leftBar">
      <div className="container">
        <div className="menu">
          <div className="user">
          <Link to={`/profile/${user?.displayName}/${user?.uid}`}>
            <Flex >
            <img src={user?.photoURL as any} alt="" style={{ marginRight: "8px" }}/>
            <span>{user?.displayName}</span>
            </Flex>
            </Link>
          </div>
          <div className="item">
            <img src={Friends} alt="" />
            <span>Friends</span>
          </div>
          <div className="item">
            <img src={Groups} alt="" />
            <span>Groups</span>
          </div>
          <div className="item">
            <img src={Market} alt="" />
            <span>Marketplace</span>
          </div>
          <div className="item">
            <img src={Watch} alt="" />
            <span>Watch</span>
          </div>
          <div className="item">
            <img src={Memories} alt="" />
            <span>Memories</span>
          </div>
        </div>
        <hr />
        <div className="menu">
          <span>Your shortcuts</span>
          <div className="item">
            <img src={Events} alt="" />
            <span>Events</span>
          </div>
          <div className="item">
            <img src={Gaming} alt="" />
            <span>Gaming</span>
          </div>
          <div className="item">
            <img src={Gallery} alt="" />
            <span>Gallery</span>
          </div>
          <div className="item">
            <img src={Videos} alt="" />
            <span>Videos</span>
          </div>
          <div className="item">
            <img src={Messages} alt="" />
            <span>Messages</span>
          </div>
        </div>
        <hr />
        <div className="menu">
          <span>Others</span>
          <div className="item">
            <img src={Fund} alt="" />
            <span>Fundraiser</span>
          </div>
          <div className="item">
            <img src={Tutorials} alt="" />
            <span>Tutorials</span>
          </div>
          <div className="item">
            <img src={Courses} alt="" />
            <span>Courses</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
