import { useState, useContext, useEffect } from "react";
import { SocketContext } from "../../context/SocketContext";
import rock_right_hand_img from "../../images/rock_right_hand.png";
import paper_right_hand_img from "../../images/paper_right_hand.png";
import scissors_right_hand_img from "../../images/scissors_right_hand.png";
import styles from "./styles.module.css";
import movSound from "../../sound/mov.mp3"
import buttonSound from "../../sound/button.mp3"
import { Howl, Howler } from "howler";
function Controls() {
  Howler.autoUnlock = false;
  Howler.autoSuspend = false;
  var mov = new Howl({
    src:[movSound],
    volume: 1
   });

   var buttonS = new Howl({
    src:[buttonSound],
    volume: 1
   })

   const soundMov = () =>{
    mov.play();
   }
  const [option, setOption] = useState("");
  const { socket, room } = useContext(SocketContext);

  useEffect(() => {
    if (room.players[socket.id].optionLock) {
      setOption(room.players[socket.id].option);
    } else {
      setOption("");
    }
  }, [room]);

  const handleChange = ({ currentTarget: input }) => {
    setOption(input.value);
    room.players[socket.id].option = input.value;
    room.players[socket.id].optionLock = true;
    socket.emit("room:update", room);
    buttonS.play();
  };

  return (
    <div className={styles.container}>
      <button
        disabled={room.players[socket.id].optionLock}
        className={
          option === "rock"
            ? `${styles.option_btn} ${styles.option_btn_active}`
            : styles.option_btn
        }
        onClick={handleChange}
        onPointerOver={soundMov}
        value="rock"
      >
        <img
          src={rock_right_hand_img}
          alt="rock_hand"
          className={styles.option_btn_img}
        />
      </button>
      <button
        disabled={room.players[socket.id].optionLock}
        className={
          option === "paper"
            ? `${styles.option_btn} ${styles.option_btn_active}`
            : styles.option_btn
        }
        onClick={handleChange}
        onPointerOver={soundMov}
        value="paper"
      >
        <img
          src={paper_right_hand_img}
          alt="rock_hand"
          className={styles.option_btn_img}
        />
      </button>
      <button
        disabled={room.players[socket.id].optionLock}
        className={
          option === "scissors"
            ? `${styles.option_btn} ${styles.option_btn_active}`
            : styles.option_btn
        }
        onClick={handleChange}
        onPointerOver={soundMov}
        value="scissors"
      >
        <img
          src={scissors_right_hand_img}
          alt="rock_hand"
          className={styles.option_btn_img}
        />
      </button>
    </div>
  );
}

export default Controls;
