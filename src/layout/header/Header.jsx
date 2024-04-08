import Container from "../container/Container";
import logo from "../../assets/header/logo.svg";
import LogInButton from "../../components/LogInButton/LogInButton";
import styles from "./styles.module.scss";
import { createPortal } from "react-dom";
import Form from "../../components/form/Form";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../UserContext";
import { Link } from "react-router-dom";

function Header() {
  const [showModal, setShowModal] = useState(false);
  const { user } = useContext(UserContext);

  const showAuthModal = () => {
    setShowModal(true);
  };
  const closeAuthModal = () => {
    setShowModal(false);
  };

  // Отключает прокрутку у боди
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }, [showModal]);

  return (
    <header>
      <Container>
        {showModal &&
          createPortal(<Form onClickHandler={closeAuthModal} />, document.body)}
        <div className={styles.headerWrapper}>
          <Link to="/">
            <img src={logo} alt="logo" width="114" height="48" />
          </Link>
          {user ? (
            <span className={styles.user}>{user}</span>
          ) : (
            <LogInButton onClickHandler={showAuthModal} />
          )}
        </div>
      </Container>
    </header>
  );
}

export default Header;
