import axios from "axios";
import { useState } from "react";

function Register() {
	const [register, setRegister] = useState({
		email: "",
		password: "",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setRegister((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault();

			/**
			 * Je vais utiliser axios pour envoyer mon state register vers mon backend
			 * Pour que celui ci prenne en considération l'inscription de mon user
			 */

			const response = await axios.post(
				"http://localhost:3310/register",
				register
			);

			console.log(response.data);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<h1>Register</h1>

			<div>
				<label htmlFor="email">Email</label>
				<input type="email" name="email" onChange={handleChange} />
			</div>
			<div>
				<label htmlFor="password">Password</label>
				<input
					type="password"
					name="password"
					onChange={handleChange}
				/>
			</div>
			<button type="submit">Go 🚀</button>
		</form>
	);
}

export default Register;
