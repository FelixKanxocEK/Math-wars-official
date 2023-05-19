import { useState, useContext, useEffect } from "react";
import { SocketContext } from "../../context/SocketContext";
// import rock_right_hand_img from "../../images/rock_right_hand.png";
// import paper_right_hand_img from "../../images/paper_right_hand.png";
// import scissors_right_hand_img from "../../images/scissors_right_hand.png";
import styles from "./styles.module.css";
import movSound from "../../sound/mov.mp3";
import { Howl, Howler } from "howler";
import { MathJaxContext, MathJax } from "better-react-mathjax";
import Latex from "react-latex";
import Countdown from "react-countdown";
import Timer from "../Timer";

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
  const { socket, room, listquestions, tiempo, setTiempo } = useContext(SocketContext);
  const [options, setOptions] = useState([]);
  // const [timer, setTimer] = useState(180);


  useEffect(() => {
    console.log(Object.values(JSON.parse(room.problemas.incisos)));
    setOptions(JSON.parse(room.problemas.incisos));
  }, [room.problemas.incisos])

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
    // buttonS.play();
  };

  return (
    <>
    <Timer tiempo={tiempo} setTiempo={setTiempo}/>
    <div className={`${styles.container} gap-5`}>
      <div className={`${styles.container_problem} w-6/12 px-3 py-2 rounded-md `}>
        <p className="preview-mathjax">
          <Latex>{`$${room.problemas.planteamiento}$`}</Latex>
        </p>
      </div>
      <div className="w-6/12 gap-3 flex">
        {options.map((inciso, key) => (
          <button
          key={key}
          disabled={Object.values(room.players)[1].option == key || Object.values(room.players)[0].option == key}
          className={
            option === key
              ? `${styles.option_btn} ${styles.option_btn_active}`
              : styles.option_btn
          }
          onClick={handleChange}
          onPointerOver={soundMov}
          value={key}>
              <Latex strict>{`$${inciso}$`}</Latex>
          </button>
        ))}
        <button
          id="btnTiempoAgotado"
          className='hidden'
          onClick={handleChange}
          onPointerOver={soundMov}
          value={10}>
             10
          </button>
      </div>
    </div>
    </>
  );
}

export default Controls;
