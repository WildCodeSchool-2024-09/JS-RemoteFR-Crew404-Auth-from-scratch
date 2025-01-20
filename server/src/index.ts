import express, { Request, Response } from "express";

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
	res.json({ response: "il existe 🤟" });
});

/**
 * Le server se lance sur le port 3310
 **/
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
