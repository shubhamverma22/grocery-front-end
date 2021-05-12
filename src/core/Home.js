import React from "react";
import { API } from "../backend";
import "../styles.css";
import Base from "./Base";

function Home() {
	// console.log("API is", API);
	return (
		<Base >
			<h1 className="text-white">I'm Home</h1>
		</Base>
	);
}

export default Home;
