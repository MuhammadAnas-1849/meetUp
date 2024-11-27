// import { User } from "../models/user.model.js";
// import bcrypt from "bcrypt";
// import crypto from "crypto";
// import httpStatus from "http-status";


// //        /LOGIN CONTROLLER
// const login = async (req, res) => {
//   const { username, password } = req.body;

//   if (!username && !password) {
//     return res
//       .status(httpStatus.NOT_FOUND)
//       .json({ message: "please provide username or password" });
//   }
//   try {
//         const user = await User.findOne({username});
//     if (!user) {
//       return res.status(httpStatus.FOUND).json({ message: "user not found" });
//     }
//     if (await bcrypt.compare(password, user.password)) {
//       let token = crypto.randomBytes(20).toString("hex");
//       user.token = token;
//       await user.save();
//       return res.status(httpStatus.OK).json({ token: token });
//     }
//   } catch (e) {
//     res.json({ massage: `something went wrong ${e}` });
//   }
// };


// //        /REGISTER CONTROLLER
// const register = async (req, res) => {
//   const { name, username, password}  = req.body;
//   try {
//     const existingUser = await User.findOne({username});
//     if (existingUser) {
//       return res
//         .status(httpStatus.FOUND)
//         .json({ message: "user already exist" });
//     }
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new User({
//       name: name,
//       username: username,
//       password: hashedPassword,
//     });
//     await newUser.save();
//   } catch (e) {
//     res.json({ massage: `something went wrong ${e}` });
//   }
// };

// export {register, login};
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import httpStatus from "http-status";


//        /LOGIN CONTROLLER
const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ message: "Please provide both username and password." });
  }

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({ message: "User not found" });
    }

    if (await bcrypt.compare(password, user.password)) {
      const token = crypto.randomBytes(20).toString("hex");
      user.token = token;
      await user.save();
      return res.status(httpStatus.OK).json({ token });
    } else {
      return res.status(httpStatus.UNAUTHORIZED).json({ message: "Incorrect password" });
    }
  } catch (e) {
    console.error("Login error:", e);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: `Something went wrong ${e.message}` });
  }
};


//        /REGISTER CONTROLLER
const register = async (req, res) => {
  const { name, username, password}  = req.body;
  try {
    const existingUser = await User.findOne({username});
    if (existingUser) {
      return res
        .status(httpStatus.FOUND)
        .json({ message: "user already exist" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name: name,
      username: username,
      password: hashedPassword,
    });
    await newUser.save();
    return res.status(201).json({ message: 'User created successfully', user: { name, username } });
  } catch (e) {
    res.json({ massage: `something went wrong ${e}` });
  }
};

export {register, login};

