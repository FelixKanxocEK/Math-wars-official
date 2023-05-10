import { useEffect, useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { SocketContext } from "../../context/SocketContext";
import PlayerOne from "../../components/PlayerOne";
import PlayerTwo from "../../components/PlayerTwo";
import Controls from "../../components/Controls";
// import vs_img from "../../images/vs.jpg";
import win_img from "../../images/win.png";
import lose_img from "../../images/lose.png";
import boom_img from "../../images/boom.png";
import styles from "./styles.module.css";
import scene from "../../images/resources/Scene3_Bg.jpeg";
// import fight from "../../music/fight1.ogg"
// import music from "../../music/pista1.mp3";
// import { Howl, Howler } from "howler";

const Room = () => {
  // Howler.autoUnlock = false;
  // Howler.autoSuspend = false;

  // var fightTrack = new Howl({
  //   src:[fight],
  //   loop: true,
  //   volume: 0.4,
  // })

  // var track1 = new Howl({
  //   src:[music],
  //   autoplay: false,
  //   play:false
  // })

  // const [avoidExtraCall, setAvoidExtraCall] = useState(false);

  //   const handleClick = () =>{
  //     if(!avoidExtraCall){

  //       if(track1.playing){
  //         track1.stop();
  //         fightTrack.play();
  //         }
  //         setAvoidExtraCall(true);

  //     }
  //   }

  const [result, setResult] = useState({
    rotate: 0,
    show: false,
    reset: false,
  });
  const [resultText, setResultText] = useState("");
  const { socket, room, player_1, player_2 } = useContext(SocketContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let roomId = location.pathname.split("/")[2];
    let size = Object.keys(socket).length;

    if (size > 0) {
      socket.emit("room:join", { roomId }, (err, room) => {
        if (err) navigate("/");
      });
    }
  }, [socket]);

  useEffect(() => {
    const calculateResults = async () => {
      const players = room?.players;
      if (
        players &&
        players[player_1]?.optionLock === true &&
        players[player_2]?.optionLock === true
      ) {
        let result = { score: [0, 0], text: "tie" };

        // if (players[player_1].option !== players[player_2].option) {
        //   result = validateOptions(
        //     `${players[player_1].option} ${players[player_2].option}`
        //   );
        // }

        // if(players[player_1].option == room.problemas.respuestaCorrecta && players[player_2].option == room.problemas.respuestaCorrecta) {
          
        // }

        if (
          players[player_1].option == room.problemas.respuestaCorrecta &&
          players[player_2].option == room.problemas.respuestaCorrecta
        ) {
          result = { score: [0, 0], text: "tie" };
        }else if(players[player_1].option == room.problemas.respuestaCorrecta && players[player_2].option != room.problemas.respuestaCorrecta){
            result = { score: [1, 0], text: "win" };
        }else if(players[player_2].option == room.problemas.respuestaCorrecta && players[player_1].option != room.problemas.respuestaCorrecta){
            result = { score: [0, 1], text: "win" };
        }else {
          result = { score: [0, 0], text: "tie" };
        }

        console.log(result, ' desde result');
        room.players[player_1].score += result.score[0];
        room.players[player_2].score += result.score[1];

        await performAnimation(result.text);

        room.players[player_1].optionLock = false;
        room.players[player_2].optionLock = false;

        socket.emit("room:update", room);
      }
    };
    calculateResults();
  }, [room, socket, player_1, player_2]);

  const validateOptions = (value) => {
    switch (value) {
      case "0 1":
        console.log("desde rock paper");
        return { score: [0, 1], text: "lose" };
      case "1 2":
        console.log('desde "paper scissors');

        return { score: [0, 1], text: "lose" };
      case "2 0":
        console.log("desde scissors rock");

        return { score: [0, 1], text: "lose" };
      case "1 0":
        console.log("desde paper rock");
        return { score: [1, 0], text: "win" };
      case "2 1":
        console.log("desde scissors paper");
        return { score: [1, 0], text: "win" };
      case "0 2":
        console.log("desde rock scissors");
        return { score: [1, 0], text: "win" };
      default:
        console.log("Empate");
        return { score: [0, 0], text: "tie" };
    }
  };

  /**
   * The function performs an animation by changing the state of an object with different properties
   * and delays using async/await and a timer function.
   * @returns The function `performAnimation` is returning a resolved Promise.
   */
  const performAnimation = async (text) => {
    const timer = (ms) => new Promise((res) => setTimeout(res, ms));
    console.log("desde performAnimation");
    for (let i = 0; i <= 8; i++) {
      if (i === 7) {
        setResult({ rotate: 0, show: true, reset: false });
        setResultText(text);
        await timer(2000);
      } else if (i % 2 === 0 && i < 7) {
        setResult({ rotate: 10, show: false, reset: false });
        await timer(200);
      } else if (i === 8) {
        setResult({ rotate: 0, show: false, reset: true });
        setResultText("");
      } else {
        setResult({ rotate: -10, show: false, reset: false });
        await timer(200);
      }
    }

    return Promise.resolve();
  };

  return (
    <>
      {/* <Stage width={500} height={500} > */}
      <img src={scene} alt="vs" className={styles.background_img} />
      {/* <Example/> */}
      <PlayerOne result={result} />
      <PlayerTwo result={result} />
      {player_2 && <Controls />}
      {resultText === "win" && (
        <img src={win_img} alt="win_img" className={styles.win_img} />
      )}
      {/* <Example /> */}
      {resultText === "lose" && (
        <img src={lose_img} alt="lose_img" className={styles.lose_img} />
      )}
      {resultText === "tie" && (
        <img src={boom_img} alt="boom_img" className={styles.boom_img} />
      )}
      {/* </Stage> */}
    </>
  );
};

export default Room;
