import AuthFormInput from "../authFormInput/AuthFormInput";
import style from "./styles.module.scss";
import close from "../../assets/form/close.svg";
import { useContext, useEffect, useState } from "react";
import { validateInput } from "../../utils/validateInput";
import { UserContext } from "../../UserContext";
import { useNavigate } from "react-router-dom";

function Form({ onClickHandler }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState(null);
  const [errors, setErrors] = useState(null);
  const [formIsValid, setFormIsValid] = useState(false);
  const [resultValidationName, setResultValidationName] = useState(null);
  const [resultValidationPassword, setResultValidationPassword] =
    useState(null);

  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    if (formIsValid) {
      try {
        const response = await fetch("/api/users", {
          method: "post",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
          body: JSON.stringify({
            name,
            password,
          }),
        });
        const data = await response.json();

        if (data.errors) {
          setErrors(data.errors);
        } else {
          setData(data);
          setUser(data.name);
          navigate("/profile");
        }
      } catch (error) {
        console.error(error);
      }
      setName("");
      setPassword("");
    }
  };

  useEffect(() => {
    if (resultValidationName !== null && resultValidationPassword !== null) {
      setFormIsValid(
        resultValidationName.isValid && resultValidationPassword.isValid
      );

      if (!resultValidationName.isValid || !resultValidationPassword.isValid) {
        setErrors({
          username: resultValidationName.username,
          password: resultValidationPassword.password,
        });
      } else {
        setErrors(null);
      }
    }
  }, [resultValidationName, resultValidationPassword]);

  useEffect(() => {
    setResultValidationName(validateInput(name, "username"));
    setResultValidationPassword(validateInput(password, "password"));
  }, [name, password]);

  return (
    <>
      <div className={style.overlay}></div>
      <form onSubmit={formSubmitHandler} className={style.form}>
        <button
          onClick={onClickHandler}
          className={style.closeButton}
          type="button"
        >
          <img src={close} alt="close" width="24" height="24" />
        </button>
        <AuthFormInput
          error={errors}
          value={name}
          setValue={setName}
          type="text"
          name="username"
          id="username"
          text="Укажите ваши персональные данные"
        >
          Ваш логин
        </AuthFormInput>
        <div className={style.divider}></div>
        <AuthFormInput
          error={errors}
          value={password}
          setValue={setPassword}
          type="password"
          name="password"
          id="pass"
          text="Укажите ваши персональные данные"
        >
          Ваш персональный пароль
        </AuthFormInput>
        <button disabled={!formIsValid} className={style.button}>
          войти в кабинет
        </button>
      </form>
    </>
  );
}

export default Form;
