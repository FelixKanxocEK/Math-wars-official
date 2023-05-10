import { useState, useContext, useEffect } from "react";
import { SocketContext } from "../../context/SocketContext";
// import rock_right_hand_img from "../../images/rock_right_hand.png";
// import paper_right_hand_img from "../../images/paper_right_hand.png";
// import scissors_right_hand_img from "../../images/scissors_right_hand.png";
import styles from "./styles.module.css";
import movSound from "../../sound/mov.mp3";
import { Howl, Howler } from "howler";
import Latex from "react-latex";
import { MathJaxContext, MathJax } from "better-react-mathjax";

function Controls() {
  Howler.autoUnlock = false;
  Howler.autoSuspend = false;
  var mov = new Howl({
    src: [movSound],
    volume: 1,
  });

  const soundMov = () => {
    mov.play();
  };
  const [option, setOption] = useState("");
  const { socket, room, listquestions } = useContext(SocketContext);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    console.log(room.problemas);
    setOptions(JSON.parse(room.problemas.incisos));
  }, [])

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
    <div className={`${styles.container} gap-5`}>
      <div className={`${styles.container_problem} w-6/12 px-3 py-2 rounded-md `}>
        <p className="preview-mathjax">
          <MathJaxContext>
            <MathJax>
            {`\\(${room.problemas.planteamiento}\\)`}

            </MathJax>
          </MathJaxContext>
        </p>
      </div>
      <div className="w-6/12 gap-3 flex">
        {options.map((inciso, key) => (
          <button
          key={key}
          disabled={room.players[socket.id].optionLock}
          className={
            option === "rock"
              ? `${styles.option_btn} ${styles.option_btn_active}`
              : styles.option_btn
          }
          onClick={handleChange}
          onPointerOver={soundMov}
          value={key}>
              <MathJaxContext>
                <MathJax> {`\\(${inciso}\\)`} </MathJax>
              </MathJaxContext>
          </button>
        ))}
        {/* <button
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
          <span>Opción 1</span> */}
          {/* <img
            src={rock_right_hand_img}
            alt="rock_hand"
            className={styles.option_btn_img}
          /> */}
        {/* </button>
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
          <span>Opción 2</span>
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
          <span>Opción 3</span>
        </button> */}
      </div>
    </div>
  );
}

export default Controls;
