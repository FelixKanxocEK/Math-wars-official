import { useState } from "react";
import styles from "./styles.module.css";

const JoinLink = ({ link }) => {
  const [active, setActive] = useState(false);

  const handleChange = () => {
    setActive(true);
    navigator.clipboard.writeText(link);
  };

  return (
    <div className={styles.join_link_container}>
      <div className={styles.copy_link} onClick={handleChange}>
        {active ? "Copiado!" : "Click para copiar !"}
      </div>
      <button
        className={
          active
            ? `${styles.join_link} ${styles.join_link_active}`
            : styles.join_link
        }
        onClick={handleChange}
      >
        {link}
      </button>
      <h2 className={styles.join_link_text}>
        ¡Manda el link a tu amigo y desafialo!
      </h2>
    </div>
  );
};

export default JoinLink;
