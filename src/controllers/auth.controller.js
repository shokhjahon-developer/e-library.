const User = require("../models/users.module");
const { createToken } = require("../utils/jwt");
const Joi = require("joi");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    const { fullname, username, password } = req.body;

    const users = await User.find();

    const findUser = users.find((el) => {
      return el.username === username;
    });

    if (findUser) {
      return res.status(403).json({ message: "This username already exists!" });
    }

    const check = Joi.object({
      fullname: Joi.string().min(6).required(),
      username: Joi.string().min(6).required(),
      password: Joi.string().min(10).required(),
    });

    const { error } = check.validate({ fullname, username, password });
    if (error) return res.status(400).json({ message: error.message });

    const hashedPass = await bcrypt.hash(password, 12);

    await User.create({
      fullname: fullname,
      username: username,
      password: hashedPass,
    });

    const token = createToken({ id: User.id, isAdmin: User.isAdmin });
    res.cookie("token", token);

    res.status(201).json({ message: "Success", data: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const verify = Joi.object({
      username: Joi.string().min(6).required(),
      password: Joi.string().min(6).required(),
    });

    const { error } = verify.validate({ username, password });
    if (error) return res.status(400).json({ message: error.message });

    const users = await User.find();
    const findUser = users.find((el) => {
      return el.username === username;
    });

    if (!findUser) {
      return res
        .status(403)
        .json({ message: "Incorrect password or username!" });
    }

    const check = await bcrypt.compare(password, findUser.password);

    if (!check) {
      return res
        .status(403)
        .json({ message: "Incorrect password or username!" });
    }
    const token = createToken({ id: findUser.id, isAdmin: findUser.isAdmin });
    res.cookie("token", token);

    res.json({ message: "You are successfully logged in!", data: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

module.exports = {
  register,
  login,
};
