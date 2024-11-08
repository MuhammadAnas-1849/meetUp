import { createContext, useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { httpStatus } from "http-status";

export const AuthContext = createContext({});

const client = axios.create({
  baseURL: "http://localhost:8000/api/v1/user",
});

export const AuthProvider = ({ children }) => {
  const authContext = useContext(AuthContext);

  const [userData, setUserData] = useState(authContext);

  const router = useNavigate();

  const handleRegister = async (name, username, password) => {
    // eslint-disable-next-line no-useless-catch
    try {
      let request = await client.post("/register", {
        name,
        username,
        password,
      });
      if (request.status === httpStatus.CREATED) {
        console.log("Registration successful:", request.data);
        return request.data.message;
      }
    } catch (err) {
      throw err;
    }
  };

  const handleLogin = async (username, password) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const request = await client.post("/login", {
        username,
        password,
      });
      if (request.status === httpStatus.OK) {
        localStorage.setItem("token", request.data.token);
      }
    } catch (err) {
      throw err;
    }
  };

  const data = {
    userData,
    setUserData,
    handleRegister,
    handleLogin,
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};
