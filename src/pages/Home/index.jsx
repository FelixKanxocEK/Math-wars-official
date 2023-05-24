import React, { useState, useCallback, useEffect, useRef } from "react";
import Button from "../../components/Button";
import logo from "../../images/logo-math-fighters.png";
import rock_left_hand_img from '../../images/rock_left_hand-min.png';
import styles from "./styles.module.css";
import { Howl } from "howler";
import movSound from "../../sound/mov.mp3";
import buttonSound from '../../sound/button2.mp3';

const Home = () => {
  var mov = new Howl({
    src: [movSound],
    volume: 1,
  });

  const soundMov = () => {
    mov.play();
  };

   var soundButton = new Howl({
    src:[buttonSound],
    volume: 1

   });

   const buttonS = () =>{
    soundButton.play();
   }

  return (
    <>
      <div className={`${styles.left}`}>
        <img src={logo} alt="logo" className={styles.logo} />
      </div>
      <div className={styles.right}>
        <img
          src={rock_left_hand_img}
          alt="rock_hand"
          className={styles.rock_hand}
        />
        <div onPointerOver={soundMov} className={styles.btn_container}>
          <Button name="Jugar con un amigo" type="friend" />
        </div>
      </div>
    </>
  );
};

export default Home;
