import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from '../context/AuthProvider';
import { useNavigate, useLocation, Link } from "react-router-dom";

import axios from "../api/axios";
const LOGIN_URL = "/auth";

const Login = () => {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/"
  
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);
  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  //e will be recieved by default we dont need to pass it from function call
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(user, pwd);
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ user, pwd, roles, accessToken });
      setUser("");
      setPwd("");
      // setSuccess(true);
      navigate(from ,{replace:true})
    } catch (error) {
      if (!error?.response) {
        setErrMsg("No Server Response");
      } else if (error.response?.status === 400) {
        setErrMsg("Missing username or password");
      } else if (error.response?.status === 401) {
        setErrMsg("Unathorized");
      } else {
        setErrMsg("Login Failed");
      }
      // for screen Readers to read the error message
      errRef.current.focus();
    }
  };

  return (
    // <>
    //   {success ? (
    //     <section>
    //       <h1>You Are logged in</h1>
    //       <br />
    //       <p>
    //         {/* <a href="#">Go to Home</a> */}
    //       </p>
    //     </section>
    //   ) : (
        <section>
          <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>
            {errMsg}
          </p>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
            />
            <button>Sign In</button>
          </form>
          <p>
            Nedd an Account?
            <br />
            <span className="line">
              {/* put router link here */}
              {/* <a href="#">Sign Up</a> */}
            </span>
          </p>
        </section>
    //   )}
    // </>
  );
};

export default Login;
// https://github.com/gitdagray/react_login_form/blob/main/src/Login.js
