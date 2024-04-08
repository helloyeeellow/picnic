export const validateInput = (value, type) => {
  const resultValidationInput = { isValid: true };

  switch (type) {
    case "username":
      if (value.length < 3) {
        resultValidationInput.username = "Укажите больше трех символов";
        resultValidationInput.isValid = false;
      } else if (!value.match(/^[a-zA-Z0-9]*$/gm)) {
        resultValidationInput.username =
          "Используйте только латинские буквы и цифры";
        resultValidationInput.isValid = false;
      } else {
        resultValidationInput.isValid = true;
      }
      break;

    case "password":
      if (value.length < 3) {
        resultValidationInput.password = "Укажите больше трех символов";
        resultValidationInput.isValid = false;
      } else if (!value.match(/^[^а-яА-ЯёЁ]+$/gm)) {
        resultValidationInput.password = "Нельзя использовать кириллицу";
        resultValidationInput.isValid = false;
      } else {
        resultValidationInput.isValid = true;
      }
      break;
  }
  return resultValidationInput;
};
