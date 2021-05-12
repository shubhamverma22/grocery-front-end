import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper";

function Signup() {
	const [values, setValues] = useState({
		name: "",
		email: "",
		password: "",
		error: "",
		success: false,
	});

	//destructing the values:
	const { name, email, password, error, success } = values;

	const handleChange = (name) => (event) => {
		setValues({ ...values, error: false, [name]: event.target.value });
	};

	const onSubmit = (e) => {
		e.preventDefault();
		setValues({ ...values, error: false });
		//auth->helper->index->signup
		signup({ name, email, password })
			.then((data) => {
				if (data.error) {
					setValues({ ...values, error: data.error, success: false });
				} else {
					setValues({
						...values,
						name: "",
						email: "",
						password: "",
						error: "",
						success: true,
					});
				}
			})
			.catch(console.log("Error in Sign up"));
	};

	const signUpForm = () => {
		return (
			<div className="row">
				<div className="col-md-6 offset-sm-3 text-left">
					<form>
						<div className="form-group">
							<label className="text-light">Name</label>
							<input
								className="form-control"
								onChange={handleChange("name")}
								type="text"
								value={name}
							/>
						</div>
						<div className="form-group">
							<label className="text-light">Email</label>
							<input
								className="form-control"
								onChange={handleChange("email")}
								type="text"
								value={email}
							/>
						</div>
						<div className="form-group">
							<label className="text-light">Password</label>
							<input
								className="form-control"
								onChange={handleChange("password")}
								type="text"
								value={password}
							/>
						</div>
						<div class="d-grid gap-2 col-6 mx-auto py-4">
							<button onClick={onSubmit} class="btn btn-success" type="button">
								Submit
							</button>
						</div>
					</form>
				</div>
			</div>
		);
	};

	const successMessage = () => {
		return (
			<div className="row">
				<div className="col-md-6 offset-sm-3 text-left">
					<div
						className="alert alert-success"
						style={{ display: success ? "" : "none" }}
					>
						New Accont has been Created. Please{" "}
						<Link to="/signin">Login Here</Link>
					</div>
				</div>
			</div>
		);
	};

	const errorMessage = () => {
		return (
			<div className="row">
				<div className="col-md-6 offset-sm-3 text-left">
					<div
						className="alert alert-Danger"
						style={{ display: error ? "" : "none" }}
					>
						{error}
					</div>
				</div>
			</div>
		);
	};

	return (
		<div>
			<Base title="Sign Up" description="User can Sign up from here">
				{successMessage()}
				{errorMessage()}
				{signUpForm()}
				<p className="text-white text-center">{JSON.stringify(values)}</p>
			</Base>
		</div>
	);
}

export default Signup;
