import express, { Request, Response } from "express";
import connection from "../database/config";

const app = express();
const port = 3310;

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
 * Action: callBack
 * Methode: POST
 */
app.post("/login", (req: Request, res: Response) => {
	connection.query(
		"SELECT * FROM user WHERE email= ?",
		[req.body.email],
		function (err, results: any[], fields) {
			if (
				results.length !== 0 &&
				req.body.password === results[0].password
			) {
				// Ici, j'ai bien un user, mais je n'ai pas testé si le MDP est juste, je vais donc le faire.

				// À la fin, je retourne mon user
				res.json({ response: results[0] });
				return;
			}

			res.json({ response: "Y'a degun" });
		}
	);
});

/**
 * Route de register
 * Path: /register"
 * Action: callBack
 * Methode: POST
 */
app.post("/register", (req: Request, res: Response) => {
	const { email, password } = req.body;

	connection.query(
		"INSERT INTO user (email, password) VALUES (?,?)",
		[email, password],

		function (err, results: any, fields) {
			if (results.affectedRows !== 1) {
				res.json({ error: "error server" });
				return;
			}
			res.json({ response: "Youhou ! Ça fonctionne !" });
		}
	);
});

/**
 * Le server se lance sur le port 3310
 **/
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
