import { useActionState, useContext } from "react";
import { useRegister } from "../../api/authAPI";
import { UserContext } from "../../contexts/UserContext";
import { Link, useNavigate } from "react-router";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useRegister();
  const { userLoginHandler } = useContext(UserContext);

  const registerHandler = async (formState, formData) => {
    const values = Object.fromEntries(formData);

    if (values.password !== values["confirm-password"]) {
      console.log("Password missmatch!");
      return values;
    }

    const authData = await register(values.email, values.password);
    userLoginHandler(authData);

    navigate("/");

    return values;
  };

  const [state, registerAction, isPending] = useActionState(registerHandler, {
    email: "",
    password: "",
    "confirm-password": "",
  });

  return (
    <section id="register-page" className="content auth">
      <form id="register" action={registerAction}>
        <div className="container">
          <div className="brand-logo"></div>
          <h1>Register</h1>

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            defaultValue={state.email}
            placeholder="maria@email.com"
          />

          <label htmlFor="pass">Password:</label>
          <input
            type="password"
            name="password"
            id="register-password"
            defaultValue={""}
          />

          <label htmlFor="con-pass">Confirm Password:</label>
          <input
            type="password"
            name="confirm-password"
            id="confirm-password"
            defaultValue={""}
          />

          <input className="btn submit" type="submit" value="Register" />

          <p className="field">
            <span>
              If you already have profile click <Link to="/login">here</Link>
            </span>
          </p>
        </div>
      </form>
    </section>
  );
}
