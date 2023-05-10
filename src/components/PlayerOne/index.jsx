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

const PlayerOne = ({ result }) => {
  const [option, setOption] = useState("rock");
  const [score, setScore] = useState(0);
  const rockHand = useRef();
  const { room, player_1, players } = useContext(SocketContext);

  useEffect(() => {
    if (result.show) {
      setOption(room.players[player_1].option);
      setScore(room.players[player_1].score);
      // rockHand.current.style.transform = `rotate(${result.rotate}deg)`;
    } else if (result.reset) {
      setOption("rock");
    } else {
      // rockHand.current.style.transform = `rotate(${result.rotate}deg)`;
    }
  }, [result]);

  return (
    <>
      {players.length == 2 ? (
        <div className={styles.container}>
          <div>
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
            <div className={`${styles.ken_death} hidden`}>
              <img className={styles.ken_death} />
            </div>
            <div className={`${styles.ken_ken} hidden`}>
            </div>
            <div className={`${styles.ken_run}`}>
            </div>
          </div>
          {/* {option === "rock" && (
          <img
            src={rock_left_hand_img}
            alt="rock_left_hand_img"
            className={styles.rock_left_hand_img}
            ref={rockHand}
          />
        )}
        {option === "paper" && (
          <img
            src={paper_left_hand_img}
            alt="paper_left_hand_img"
            className={styles.paper_left_hand_img}
          />
        )}
        {option === "scissors" && (
          <img
            src={scissors_left_hand_img}
            alt="scissors_left_hand_img"
            className={styles.scissors_left_hand_img}
          />
        )} */}
          {/* <div className={styles.ken}></div> */}

          {/* <img
          className={styles.ken_death}
        /> */}
        </div>
      ) : null}
    </>
  );
};

export default PlayerOne;
