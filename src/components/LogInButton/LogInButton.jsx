import avatar from "../../assets/header/avatar.svg";
import styles from "./styles.module.scss";

function LogInButton({ onClickHandler }) {
  return (
    <button onClick={onClickHandler} className={styles.button} type="button">
      <img src={avatar} alt="avatar" width="24" height="24" />
      <span className={styles.text}>Вход в кабинет</span>
    </button>
  );
}

export default LogInButton;
