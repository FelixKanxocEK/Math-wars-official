import { useEffect, useState, useContext } from "react";
import { SocketContext } from "../../context/SocketContext";
import Button from "../../components/Button";
import win_background_img from "../../images/win_background.png";
import rock_left_hand_img from "../../images/rock_left_hand.png";
import scissors_right_hand_img from "../../images/scissors_right_hand.png";
import win_board_img from "../../images/win_board.png";
import lose_board_1_img from "../../images/lose_board_1.png";
import lose_board_2_img from "../../images/lose_board_2.png";
import lose_board_3_img from "../../images/lose_board_3.png";
import defeat_img from "../../images/Character-VerP/Derrota/Derrota.gif"
import stand_img from "../../images/Character-VerP/Parado/Parado.gif"
import movSound from "../../sound/mov.mp3";
import buttonSound from "../../sound/button.mp3";
import winner from "../../sound/winner.mp3"
import looser from "../../sound/looser.mp3";
import { Howl, Howler } from "howler";
import styles from "./styles.module.css";

const Result = () => {
  Howler.autoUnlock = false;
  Howler.autoSuspend = false;
  var mov = new Howl({
    src:[movSound],
    volume: 1
  })

  const soundMov = () =>{
    mov.play();
  }

  var buttonS = new Howl({
    src:[buttonSound],
    volume: 1
  })

  const soundButton = () =>{
    buttonS.play();
  }

  var win = new Howl({
    src:[winner],
    volume: 1
  })

  var loose = new Howl({
    src:[looser],
    volume: 1
  })

  
  const [boardImg, setBoardImg] = useState("");

  const { room, player_1 } = useContext(SocketContext);

  useEffect(() => {
    let score = room.players[player_1].score;

    if (score === 3) {
      setBoardImg(win_board_img);
      win.play();
    }
    else if (score === 2){
      setBoardImg(lose_board_2_img);
      loose.play();
    } 
    else if (score === 1){
      setBoardImg(lose_board_1_img);
      loose.play();
    } 
    else{
      setBoardImg(lose_board_3_img);
      loose.play();
    } 
  }, []);

  return (
    <div className={styles.container}>
      {boardImg === win_board_img && (
        <img
          src={win_background_img}
          alt="win_background_img"
          className={styles.win_background_img}
        />
      )}
      <img
        src={rock_left_hand_img}
        alt="rock_left_hand_img"
        className={styles.rock_hand}
      />
      <img
        src={scissors_right_hand_img}
        alt="scissors_right_hand_img"
        className={styles.scissors_hand}
      />
      <img src={boardImg} alt="boardImg" className={`${styles.board_img} h-full`} />
      <div  className={styles.btn_container}>
        <div onPointerOver={soundMov}  onClick={soundButton} className="mt-0">
          <Button name="play with friend" type="friend" />
        </div>
        {boardImg === win_board_img ? (<img className="my-16" src={stand_img}/>) : (<img src={defeat_img}/>)}
        
      </div>
     
    </div>
  );
};

export default Result;
