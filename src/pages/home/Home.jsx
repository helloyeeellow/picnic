import MainLayout from "../../layout/main/MainLayout";
import styles from "./styles.module.scss";

function Home() {
  return (
    <MainLayout>
      <h1 className={styles.title}>Главная</h1>
    </MainLayout>
  );
}

export default Home;
