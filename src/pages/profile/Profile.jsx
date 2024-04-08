import { useContext } from "react";
import MainLayout from "../../layout/main/MainLayout";
import { UserContext } from "../../UserContext";
import styles from "./styles.module.scss";

function Profile() {
  const { user } = useContext(UserContext);
  return (
    <>
      <MainLayout>
        <h1 className={styles.title}>Профиль</h1>
        <div className={styles.name}>{user}</div>
        <div className={styles.text}>Добро Пожаловать!</div>
      </MainLayout>
    </>
  );
}

export default Profile;
