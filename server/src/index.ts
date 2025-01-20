import express, { Request, Response } from "express";
import connection from "../database/config";

const app = express();
const port = 3310;

/**
 * Import middleware
 */
import middlewarePwd from "../middlewares/hashPwd";

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
 */

app.use(express.json());

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

	res.json(req.user);
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
 * Le server se lance sur le port 3310
 **/
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
