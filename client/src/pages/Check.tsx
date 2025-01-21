import axios from "axios";
import { useEffect } from "react";
function Check() {
	useEffect(() => {
		async function data() {
			const response = await axios.get("http://localhost:3310/check", {
				withCredentials: true,
			});
			console.log({ response });
		}

		data();
	});

	return (
		<section>
			<h1>Je suis le composant : `Check`</h1>
		</section>
	);
}

export default Check;
