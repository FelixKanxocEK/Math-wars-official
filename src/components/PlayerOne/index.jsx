import { useEffect, useRef, useState, useContext } from "react";
import { SocketContext } from "../../context/SocketContext";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteIcon from "@mui/icons-material/Favorite";
// import StarIcon from "@mui/icons-material/Star";
import rock_left_hand_img from "../../images/rock_left_hand.png";
import paper_left_hand_img from "../../images/paper_left_hand.png";
import scissors_left_hand_img from "../../images/scissors_left_hand.png";
import styles from "./styles.module.css";
import ken from "../../images/characters/ken.png";
import { keyframes } from "@emotion/react";
import { Calculate, Translate } from "@mui/icons-material";

// let width = innerWidth;
// let height = innerHeight;

const animF = () => {
  let i = 2;
  if ((i = 1)) {
    <div className={styles.ken}></div>;
  } else {
    <div>hello</div>;
  }
};

// console.log(() => animF() + "hello");

const PlayerOne = ({ result, resultText }) => {
  const [option, setOption] = useState("rock");
  const [score, setScore] = useState(0);
  const rockHand = useRef();
  const { room, player_1, players } = useContext(SocketContext);
  const [text, setText] = useState("");

  useEffect(() => {
    if (result.show) {
      console.log(resultText, " desde result");
      setOption(room.players[player_1].option);
      setScore(room.players[player_1].score);
      setText(resultText);
    } else if (result.reset) {
      setOption("rock");
    } else {
    }
  }, [result]);

  return (
    <>
      {players.length == 2 ? (
        <div className={styles.container}>
          <div className="flex flex-1">
            <div className={styles.player_info}>
              <div className={styles.person}>
                <PersonIcon />
              </div>
              <div className={styles.star_container}>
                {[...Array(3).keys()].map((ele, index) =>
                  index + 1 <= score ? (
                    <FavoriteIcon
                      key={index}
                      className={`${styles.star} ${styles.active_star}`}
                    />
                  ) : (
                    <FavoriteIcon key={index} className={styles.star} />
                  )
                )}
              </div>
            </div>
            <div className="flex flex-1">
              {/* GOLPE */}
              <div
                className={`${styles.ken} ${
                  resultText === "win" ? "" : "hidden"
                }`}
              ></div>
              {/* DEATH */}
              <div
                className={`${styles.ken_death} ${
                  resultText === "lose" ? "" : "hidden"
                }`}
              ></div>
              {/* NORMAL */}
              <div
                className={`${styles.ken_run} ${
                  resultText === "win"
                    ? "hidden"
                    : resultText === "lose"
                    ? "hidden"
                    : ""
                }`}
              ></div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default PlayerOne;
