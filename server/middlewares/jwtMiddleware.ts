import jwt from "jsonwebtoken";
import "dotenv/config";

// Ici, je créer dans ma variable d'environnement un mdp pour mon encodage de mon token
const JWT_SECRET = process.env.JWT_SECRET as string;

/**
 * Je créer un token grâce au package jsonwebtoken.
 */
const createToken = (payload: any) => {
	return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
};

/**
 * Je vais vérifier mon token
 */
const verifyToken = (token: string) => {
	return jwt.verify(token, JWT_SECRET);
};

export default { createToken, verifyToken };
