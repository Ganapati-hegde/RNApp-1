const ValidateForm = (email, password, confirmPassword) => {
  let errors = {};
  let isValid = true;

  if (email.trim() === "") {
    isValid = false;
    errors["email"] = "Please enter your email Address.";
  }
  if (email && email.trim() !== "") {
    var pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    if (!pattern.test(email)) {
      isValid = false;
      errors["email"] = "Please enter valid email address.";
    }
  }
  if (password.trim() === "") {
    isValid = false;
    errors["password"] = "Please enter your password.";
  }
  if (password.trim() !== "") {
    var passwordPattern =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    if (!passwordPattern.test(password)) {
      isValid = false;
      errors["password"] = "Please enter valid password.";
    }
  }
  if (confirmPassword !== null) {
    if (confirmPassword?.trim() === "") {
      isValid = false;
      errors["confirmPassword"] = "Please enter confirm password.";
    }
    if (confirmPassword?.trim() !== "") {
      if (password !== confirmPassword) {
        isValid = false;
        errors["confirmPassword"] = "Passwords must be same";
      }
    }
  }

  return errors;
};
export default ValidateForm;

const GroupByKey = (array, key) => {
  return array.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};
