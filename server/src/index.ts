import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import connection from "../database/config";

const app = express();
const port = 3310;

app.use(
	cors({
		origin: "http://localhost:3000",
		// Ajout de l'option pour envoyer et receptionner des cookies
		credentials: true,
	})
);

/**
 * Import middleware
 */
import middlewarePwd from "../middlewares/hashPwd";
import jwt from "../middlewares/jwtMiddleware";

/**
 * Route de base
 * Path: /
 * Action: callBack
 * Methode: GET
 */
app.get("/", (req: Request, res: Response) => {
	res.send("<h1>Coucou c'est Derrick<h1>");
});

/**
 * Pour pouvoir lire le body (de request), j'ai besoin d'importer un middleware d'express pour lire la request correctement.
 * je vais donc utiliser express.json()
 *
 * Et je met un autre middleware pour pouvoir lire les cookies quand ils me seront envoyés
 */

app.use(express.json());
app.use(cookieParser());

/**
 * Route de login
 * Path: /login
 * !Middleware: Ajout d'un middleware pour vérifier le MDP
 * Action: callBack
 * Methode: POST
 */
app.post("/login", middlewarePwd.verifyPwd, (req: Request, res: Response) => {
	// Je supprime la clé password de l'objet user
	delete req.user.password;

	const token = jwt.createToken(req.user);

	res.cookie("user_token", token, {
		httpOnly: true,
		secure: false,
	}).json(req.user);
});

/**
 * Route de register
 * Path: /register
 * !Middleware: Ajout d'un middleware pour hasher le MDP
 * Action: callBack
 * Methode: POST
 */
app.post("/register", middlewarePwd.hashPwd, (req: Request, res: Response) => {
	const { email, password } = req.body;
	// 	Je fais une requête à la base de donnée pour insérer l'utilisateur
	connection.query(
		"INSERT INTO user (email, password) VALUES (?,?)",
		[email, password],

		function (err, results: any, fields) {
			// Si il y a une erreur
			if (results.affectedRows !== 1) {
				res.json({ error: "error server" });
				return;
			}
			// Si tout est bon
			res.status(201).json({ message: "User created" });
		}
	);
});

/**
 * Route pour checker le token
 * Path: /check
 * Action: callBack
 * Methode: GET
 */
app.get("/check", (req: Request, res: Response) => {
	if (!req.cookies.user_token) {
		res.sendStatus(401);
		return;
	}
	const token = jwt.verifyToken(req.cookies.user_token);
	res.json({ message: "c'est good !" });
});

/**
 * Le server se lance sur le port 3310
 **/
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
