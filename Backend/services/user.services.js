import User from "../model/user.model.js";
import bcrypt from "bcrypt";

export const registerUser = async (userData) => {
  try {
    const { firstName, lastName, email, password, role } = userData; // get user details from userData
    const emailExist = await User.findOne({ email });
    if (emailExist) {
      throw new Error("User already exist with this email..", email);
    }
    const hashPassword = await bcrypt.hash(password, 8);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashPassword,
    });
    return user;
  } catch (err) {
    console.log("error", err.message);
    throw new Error(err.message);
  }
};

export const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      // throw new Error("User Does Not Exists With This Email", email);
      return null; // Should return null if not found so controller can handle "not registered" message
    }
    return user;
  } catch (err) {
    throw new Error(err.message);
  }
};
