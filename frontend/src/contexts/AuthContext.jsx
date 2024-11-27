// import { createContext, useContext, useState } from "react";
// import axios from "axios";
// // import { useNavigate } from "react-router-dom";
// import httpStatus from "http-status";

// export const AuthContext = createContext({});

// const client = axios.create({
//   baseURL: "http://localhost:8000/api/v1/user",
// });

// // eslint-disable-next-line react/prop-types
// export const AuthProvider = ({ children }) => {
//   const authContext = useContext(AuthContext);

//   const [userData, setUserData] = useState(authContext);

//   // const router = useNavigate();

//   const handleRegister = async (name, username, password) => {
//     try {
//       let request = await client.post("/register", {
//         name: name,
//         username: username,
//         password: password,
//       });
//       if (request.status === httpStatus.CREATED) {
//         return request.data.message;
//       }
//     } catch (err) {
//       console.error("Registration Error context:");
//       throw err;
//     }
//   };

//   const handleLogin = async (username, password) => {
//     // eslint-disable-next-line no-useless-catch
//     try {
//       const request = await client.post("/login", {
//         username,
//         password,
//       });
//       if (request.status === httpStatus.OK) {
//         localStorage.setItem("token", request.data.token);
//       }
//     } catch (err) {
//       throw err;
//     }
//   };

//   const data = {
//     userData,
//     setUserData,
//     handleRegister,
//     handleLogin,
//   };

//   return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
// };
import { createContext, useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { httpStatus } from "http-status";

export const AuthContext = createContext({});

const client = axios.create({
  baseURL: "http://localhost:8000/api/v1/user",
});

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const authContext = useContext(AuthContext);

  const [userData, setUserData] = useState(authContext);

  const router = useNavigate();

  const handleRegister = async (name, username, password) => {
    try {
      let request = await client.post("/register", {
        name,
        username,
        password,
      });
        console.log("Response status:", request.status); 
      console.log("Response data:", request.data); 
  
      if (request && request.status === 201) {
        console.log("Registration successful:", request.data.message);
        return request.data.message; 
      } else {
        console.error("Unexpected response status:", request.status);
        return "An unexpected error occurred during registration.";
      }
    } catch (err) {
      console.error("Error during registration:", err);
  
      if (err.response && err.response.data) {
        console.error("Error response data:", err.response.data);
        throw new Error(err.response.data.message || "An error occurred during registration.");
      } else {
        throw new Error("An error occurred while making the request.");
      }
    }
  };
  
  const handleLogin = async (username, password) => {
    try {
      const request = await client.post("/login", {
        username,
        password,
      });
      if (request && request.status === 200) {
        localStorage.setItem("token", request.data.token);
        router("/"); 
      } else {
        console.error("Unexpected response:", request);
        return "Invalid credentials, please try again.";  // Return error message
      }
    } catch (err) {
      console.error("Login failed:", err);
      if (err.response && err.response.data) {
        return err.response.data.message || "Login failed. Please try again.";  // Return error message
      } else {
        return "An error occurred while logging in.";
      }
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
