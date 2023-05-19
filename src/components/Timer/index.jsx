import React, {useContext, useState, useEffect} from "react";
import styles from "./styles.module.css";
import Countdown from "react-countdown";
import { SocketContext } from "../../context/SocketContext";

const Timer = ({tiempo, setTiempo}) => {
  const { socket, room } = useContext(SocketContext);
    // let tiempo= 180;
    useEffect(() => {
        const intervalo = setInterval(() => {
            if(tiempo > 0) {
                return setTiempo((prev) => prev - 1 )
            }else {
                if(!Object.values(room.players)[0].optionLock || !Object.values(room.players)[1].optionLock){
                    console.log(!Object.values(room.players)[0].optionLock, 'optionLock 1');
                    console.log(!Object.values(room.players)[1].optionLock, 'optionLock 2');
                    if(!Object.values(room.players)[0].option){
                        document.querySelector('#btnTiempoAgotado').click();
                        setTiempo(180);
                    }else if(!Object.values(room.players)[1].option){
                        document.querySelector('#btnTiempoAgotado').click();
                        setTiempo(180);
                    
                    }
                }
            } 
        }, 1000);
        return () => clearInterval(intervalo);
    }, [tiempo])

  const renderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      console.log("Tiempo agotado");

      return (
        <span
          className={`${styles.temporizador} rounded-lg p-2 w-auto text-center bitOperatorPlus-Regular text-white text-2xl font-bold tracking-widest`}
        >
          00:00
        </span>
      );
    } else {
      console.log("desde renderer");
      return (
        <span
          className={`${styles.temporizador} rounded-lg p-2 w-auto text-center bitOperatorPlus-Regular text-white text-2xl font-bold tracking-widest`}
        >
          0{minutes}:{seconds}
        </span>
      );
    }
  };

  return (
    <>
      {room?.problemas ? (
        <div className="absolute top-6 pt-3 left-1/2">
          <p className={`${styles.temporizador} rounded-lg p-2 w-auto text-center bitOperatorPlus-Regular text-white text-3xl font-bold tracking-widest`}>{tiempo}</p>
          {/* <Countdown
            date={Date.now() + timer}
            renderer={renderer}
            className="mt-5"
          /> */}
        </div>
      ) : null}
    </>
  );
};

export default Timer;
