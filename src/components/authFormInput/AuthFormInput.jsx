import { useState } from "react";

import styles from "./styles.module.scss";

function AuthFormInput({
  type,
  id,
  name,
  text,
  children,
  value,
  setValue,
  error,
}) {
  const [isInputWasActive, setIsInputWasActive] = useState(false);

  const isInputError = isInputWasActive && error && error[name];

  const changeHandler = (e) => {
    setValue(e.target.value);
  };

  const inputHandler = () => {
    setIsInputWasActive(true);
  };

  const blurHandler = () => {
    // setIsInputWasActive(false);
  };

  return (
    <div className={`${styles.wrapper} ${isInputError && styles.inputError}`}>
      <label className={styles.label} htmlFor={id}>
        {children}
      </label>
      <span className={styles.textInfo}>{text}</span>
      <div className={styles.inputWrapper}>
        <input
          onChange={changeHandler}
          onInput={inputHandler}
          onBlur={blurHandler}
          value={value}
          className={styles.input}
          type={type}
          name={name}
          id={id}
        />
        {isInputError && (
          <span className={styles.textError}>{error[name]}</span>
        )}
      </div>
    </div>
  );
}

export default AuthFormInput;
