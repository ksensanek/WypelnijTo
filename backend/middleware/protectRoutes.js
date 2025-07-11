import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoutes = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res
        .status(401)
        .json({ error: "Brak autoryzacji - Brak dostawcy tokenów" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res
        .status(401)
        .json({ error: "Brak autoryzacji - Nieprawidłowy token" });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ error: "Nie znaleziono użytkownika" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log("Błąd w middleware protectRoutes", error.message);
    res.status(500).json({ error: "Brak autoryzacji" });
  }
};

export default protectRoutes;
