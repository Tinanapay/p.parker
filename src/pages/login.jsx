import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { loginUser } from "../api/api";

import "../styles/login.css";

import car from "../assets/car.svg";
import vector from "../assets/vector.svg";



function Login() {

  // ==========================
  // FORM STATES
  // ==========================
  const [full_name, setFullName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();



  // ==========================
  // LOGIN SUBMIT
  // ==========================
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      // send login request to backend
      const data = await loginUser({
        full_name,
        password
      });


      // ==========================
      // SUCCESS
      // ==========================
      if (data.status === "success") {

        // save jwt token
        localStorage.setItem(
          "token",
          data.token
        );

        // save user info
        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );

        localStorage.setItem(
          "auth",
          "true"
        );

        // redirect to home
        navigate("/home");

      }

      // ==========================
      // FAILED LOGIN
      // ==========================
      else {

        alert(data.message);
      }

    }

    // ==========================
    // SERVER ERROR
    // ==========================
    catch (error) {

      console.error(error);

      alert("Login error");
    }
  };


  // DEV ACCESS (instant admin login)
  const handleDevAccess = () => {
    localStorage.setItem("auth", "true");
    localStorage.setItem(
      "user",
      JSON.stringify({ role: "admin", email: "dev@admin.com" })
    );

    navigate("/home"); 
  };
  return (
    
    <div className="login-page">

<button
  className="dev-btn"
  onClick={handleDevAccess}
  type="button"
>
  Dev Access
</button>
      {/* BACKGROUND */}
      <div className="illusion"></div>

      <img
        src={car}
        className="car-bg"
        alt="car"
      />

      <img
        src={vector}
        className="vector"
        alt="yellow"
      />


      {/* LOGIN CONTAINER */}
      <div className="login-container">

        <h1 className="title">
          P.Parkers
        </h1>


        {/* LOGIN FORM */}
        <form
          onSubmit={handleSubmit}
          className="login-box"
        >

          {/* FULL NAME */}
          <input

            value={full_name}

            onChange={(e) =>
              setFullName(e.target.value)
            }

            placeholder="Full Name"
          />


          {/* PASSWORD */}
          <input

            type="password"

            value={password}

            onChange={(e) =>
              setPassword(e.target.value)
            }

            placeholder="Password"
          />


          {/* LOGIN BUTTON */}
          <button
            className="btnbtn"
            type="submit"
          >
            Login
          </button>

        </form>


        {/* REGISTER LINK */}
        <p>
          Don’t have an account?
          {" "}
          <Link to="/register">
            Register
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Login;