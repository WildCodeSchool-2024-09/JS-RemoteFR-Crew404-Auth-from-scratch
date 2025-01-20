/**
 * Je vais importer les .env pour l'utilisation de celles ci
 */
import "dotenv/config";

// Get the client
import mysql from "mysql2";

// Create the connection to database
const connection = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
});

export default connection;
