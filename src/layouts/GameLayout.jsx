import React from "react";
import { Outlet } from "react-router-dom";
import BgMain from "../images/resources/scene0-Bg.jpeg"

const GameLayout = () => {
  return (
    <>
      <main className="main">
        <img
          src={BgMain}
          className="background_img"
          alt="background img"
        />
        <div className="container w-11/12">
            <Outlet />
        </div>
      </main>
    </>
  );
};

export default GameLayout;
