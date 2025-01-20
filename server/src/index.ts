import express, { Request, Response } from "express";

const app = express();
const port = 3310;

/**
 * Route de base
 * Path: /
 * Action: callBack
 * Mathode: GET
 */
app.get("/", (req: Request, res: Response) => {
	res.send("<h1>Coucou c'est Derrick<h1>");
});

/**
 * Le server se lance sur le port 3310
 **/
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
