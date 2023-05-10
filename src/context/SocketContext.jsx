import { useEffect, useState, createContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { io } from "socket.io-client";

const SocketContext = createContext();

const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState({});
  const [room, setRoom] = useState({});
  const [player_1, setPlayer_1] = useState("");
  const [player_2, setPlayer_2] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [players, setPlayers] = useState([]);
  const [listQuestions, setListQuestion] = useState([]);

  useEffect(() => {
    const socket = io(process.env.REACT_APP_SOCKET_URL);
    setSocket(socket);

    socket.on("room:get", (payload) => {
      console.log(payload);
      setRoom(payload);
      setPlayers(Object.values(payload.players));
      setListQuestion(payload.problemas);
      // socket.emit("room:getProblemas", payload);

      let play_1 = Object.keys(payload.players)[0];
      let play_2 = Object.keys(payload.players)[1];

      if (play_1 === socket.id) {
        setPlayer_1(play_1);
        setPlayer_2(play_2);
      } else {
        setPlayer_1(play_2);
        setPlayer_2(play_1);
      }

      if (
        payload?.players[play_1]?.score === 3 ||
        payload?.players[play_2]?.score === 3
      ) {
        let pathname = "/result";
        if (pathname !== location.pathname) navigate(pathname);
      }
    });
  }, []);

  return (
    <SocketContext.Provider
      value={{
        socket,
        room,
        setRoom,
        player_1,
        player_2,
        navigate,
        players,
        listQuestions,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { SocketContextProvider, SocketContext };
