import React, { useState, useCallback, useEffect, useRef } from "react";
import Button from "../../components/Button";
import logo from "../../images/resources/logo-math-wars-5.png"
import rock_left_hand_img from "../../images/rock_left_hand.png";
import styles from "./styles.module.css";
import {Howl} from 'howler';
import movSound from "../../sound/mov.mp3";




 

const Home = () => {

   var mov = new Howl({
    src:[movSound],
    volume: 1
   });

   const soundMov = () =>{
    mov.play();
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
          <img
            src={rock_left_hand_img}
            alt="rock_hand"
            className={styles.rock_hand}
          />
          <div onPointerOver={soundMov} className={styles.btn_container}>
             
              <Button  name="Jugar con un amigo" type="friend" />
            
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
