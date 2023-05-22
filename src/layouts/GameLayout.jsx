import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import BgMain from "../images/resources/scene1-Bg-min.jpeg"
import {Howl, Howler} from 'howler';
import music from "../music/fight1.ogg";

const GameLayout = () => {

  Howler.autoUnlock = false;
  Howler.autoSuspend = false;
  
  var track1 = new Howl({
     src: [music],
     loop: true,
     volume: 0.3,
    });
  
    const [avoidExtraCall, setAvoidExtraCall] = useState(false);

    const handleClick = () =>{
      if(!avoidExtraCall){
        
          track1.play();
          setAvoidExtraCall(true);

        
      }
    }
  return (
    <>
      <main onClick={handleClick} className="main">
        <img
          src={BgMain}
          className="background_img"
          alt="background img"
        />
        <div className="container w-11/12 h-height_90">
            <Outlet />
        </div>
      </main>
    </>
  );
};

export default GameLayout;
