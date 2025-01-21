import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import App from "./App";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Check from "./pages/Check";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "/login",
				element: <Login />,
			},
			{
				path: "/register",
				element: <Register />,
			},
			{
				path: "/check",
				element: <Check />,
			},
		],
	},
]);

const rootElement = document.getElementById("root");
if (rootElement == null) {
	throw new Error(
		`Your HTML Document should contain a <div id="root"></div>`
	);
}

createRoot(rootElement).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>
);
