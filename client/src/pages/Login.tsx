function Login() {
	return (
		<form>
			<h1>Login</h1>
			<div>
				<label htmlFor="email">Email</label>
				<input type="email" />
			</div>
			<div>
				<label htmlFor="password">Password</label>
				<input type="password" />
			</div>
			<button type="submit">Go 🚀</button>
		</form>
	);
}

export default Login;
