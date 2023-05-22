import { useRef, useState, useEffect, useContext } from "react";
import { SocketContext } from "../../context/SocketContext";
import JoinLink from "../JoinLink";
import PersonIcon from "@mui/icons-material/Person";
// import StarIcon from "@mui/icons-material/Star";
import FavoriteIcon from "@mui/icons-material/Favorite";
import rock_right_hand_img from "../../images/rock_right_hand.png";
import paper_right_hand_img from "../../images/paper_right_hand.png";
import scissors_right_hand_img from "../../images/scissors_right_hand.png";
import styles from "./styles.module.css";

const PlayerTwo = ({ result, resultText }) => {
  const [option, setOption] = useState("rock");
  const [score, setScore] = useState(0);
  const rockHand = useRef();
  const { room, player_2, players } = useContext(SocketContext);
  const [text, setText] = useState("");

  useEffect(() => {
    if (result.show) {
      setOption(room.players[player_2].option);
      setScore(room.players[player_2].score);
      // rockHand.current.style.transform = `rotate(${result.rotate}deg)`;
      setText(resultText);
    } else if (result.reset) {
      // setOption("rock");
    } else {
      // if (rockHand.current)
      // rockHand.current.style.transform = `rotate(${result.rotate}deg)`;
    }
  }, [result]);

  return (
    <div className={styles.container}>
      {!player_2 && room.type === "friend" && (
        <JoinLink
          link={`${process.env.REACT_APP_BASE_URL}/room/${room.roomId}`}
        />
      )}
      {!player_2 && (
        <div className={styles.opponent_container}>
          <div className={styles.opponent_card}>
            <PersonIcon />
          </div>
          <p className={styles.opponent_text}>
            waiting for opponent connection...
          </p>
        </div>
      )}
      {player_2 && (
        <div className="w-full flex">
          <div className={styles.player_info}>
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
            <div className={styles.person}>
              <PersonIcon />
            </div>
          </div>
          <div className="flex flex-1">
            <div className={`${styles.eri_attack} ${resultText === 'lose' ? '' : 'hidden'}`}></div>
            <div className={`${styles.eri_death} ${resultText === 'win' ? '' : 'hidden'}`}></div>
            <div className={`${styles.eri_eat} ${resultText === 'win' ? 'hidden' : resultText
           === 'lose' ? 'hidden' : ''}`}></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayerTwo;
