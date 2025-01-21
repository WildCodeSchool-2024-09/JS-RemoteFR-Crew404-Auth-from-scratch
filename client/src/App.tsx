import { Link, Outlet } from "react-router-dom";

function App() {
	return (
		<section>
			<nav>
				<Link to="/login">Login</Link>
				<Link to="/register">Register</Link>
				<Link to="/check">Check</Link>
			</nav>
			<Outlet />
		</section>
	);
}

export default App;
