import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import genetrateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Hasło nie pasuje" });
    }

    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ error: "Taki Login już istnieje" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
    });

    if (newUser) {
      genetrateTokenAndSetCookie(newUser._id, res);

      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
      });
    } else {
      res.status(400).json({ error: "Nieprawidłowe dane użytkownika" });
    }
  } catch (error) {
    console.log("Błąd w kontrolerze rejestracji", error.message);
    res.status(500), json({ error: "Wewnętrzny błąd serwera" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Nieprawidłowy login lub hasło" });
    }

    genetrateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
    });
  } catch (error) {
    console.log("Błąd w kontrolerze logowania", error.message);
    res.status(500), json({ error: "Wewnętrzny błąd serwera" });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Wylogowano pomyślnie" });
  } catch (error) {
    console.log("Błąd w kontrolerze wylogowania", error.message);
    res.status(500), json({ error: "Wewnętrzny błąd serwera" });
  }
};
