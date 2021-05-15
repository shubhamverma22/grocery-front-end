import React from "react";

function test() {
	fetch("")
		.then((e) => console.log(e))
		.catch();
	return <div></div>;
}

export default test;
