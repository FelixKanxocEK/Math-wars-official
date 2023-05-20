import React, { useState, useCallback, useEffect, useRef } from "react";
import Button from "../../components/Button";
import logo from "../../images/resources/logo-math-wars-5-min.png"
import rock_left_hand_img from "../../images/rock_left_hand-min.png";
import styles from "./styles.module.css";
import {Howl} from 'howler';
import buttonSound from "../../sound/button2.mp3"
import movSound from "../../sound/mov2.mp3";




 

const Home = () => {

   var mov = new Howl({
    src:[movSound],
    volume: 1
   });

   const soundMov = () =>{
    mov.play();
   }

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
          {/* <img
            src={scissors_right_hand_img}
            alt="paper_hand"
            className={styles.paper_hand}
          /> */}
          {/* <img
            src={pi}
            alt="pi"
            className={styles.rock_hand}
          /> */}
          <div onPointerOver={soundMov} className={styles.btn_container}>
             <div onClick={buttonS}>
                <Button  name="Jugar con un amigo" type="friend" />
             </div>
            
            {/* <button className="play" >HOLA</button>
            <p>{playing ? "playing" : "not playing"}</p> */}
            {/* <button onClick={handleClick}>click me uwu</button>           */}
           
            {/* <Button name="Play with stranger" type="stranger" /> */}
          </div>
        </div>
        

      
    </>
    
  );
  
};

export default Home;
