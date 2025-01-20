import { Request, Response, NextFunction } from "express";
import * as argon2 from "argon2";

/**
 * J'importe la connection à la base de donnée
 */

import connection from "../database/config";

/**
 * Fonction pour hasher le mot de passe
 * C'est un middleware qui va hasher le mot de passe avant de l'envoyer à la base de donnée
 */
const hashPwd = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const hash = await argon2.hash(req.body.password);
		req.body.password = hash;
		next();
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal server error" });
	}
};

/**
 * Fonction pour vérifier le mot de passe
 * C'est un middleware qui va vérifier le mot de passe avant de le comparer à celui de la base de donnée
 */

const verifyPwd = async (req: Request, res: Response, next: NextFunction) => {
	// 	Ici, je vais chercher l'utilisateur dans la base de donnée
	connection.query(
		"SELECT * FROM user WHERE email= ?",
		[req.body.email],
		// 	Je vérifie si l'utilisateur existe
		async function (err, results: any[], fields) {
			if (results.length === 0) {
				res.status(401).json({ message: "Unauthorized" });
				return;
			}

			// 	Je vérifie si le mot de passe est correct
			const match = await argon2.verify(
				results[0].password,
				req.body.password
			);
			if (!match) {
				res.status(401).json({ message: "Unauthorized" });
				return;
			}

			// 	Si tout est bon, je stocke l'utilisateur dans la requête
			req.user = results[0];
			next();
		}
	);
};

export default { hashPwd, verifyPwd };
