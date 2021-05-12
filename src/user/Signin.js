import React, { useState } from "react";
import Base from "../core/Base";
import { Link, Redirect } from "react-router-dom";
import { authenticate, isAuthenticate, signin } from "../auth/helper";

function Signin() {
	const [values, setValues] = useState({
		email: "",
		password: "",
		error: "",
		loading: false,
		didRedirect: false,
	});

	const { email, password, error, loading, didRedirect } = values;
	const { user } = isAuthenticate;

	const handleChange = (name) => (event) => {
		setValues({ ...values, error: false, [name]: event.target.value });
	};

	const onSubmit = (event) => {
		event.preventDefault();
		setValues({ ...values, error: false, loading: true });
		signin({ email, password })
			.then((data) => {
				if (data.error) {
					setValues({ ...values, error: data.error, loading: false });
				} else {
					authenticate(data, () => {
						setValues({
							...values,
							didRedirect: true,
						});
					});
				}
			})
			.catch(console.log("Sign in Request Failed"));
	};

	const performRedirect = () => {
		if (didRedirect) {
			if (user && user.role === 1) {
				return <p>Redirect to Admin</p>;
			} else {
				return <p>Redirect to user dashboard</p>;
			}
		}
		if (isAuthenticate()) {
			return <Redirect to="/" />;
		}
	};
	const loadingMessage = () => {
		return (
			loading && (
				<div className="alert alert-info">
					<h2>Loading...</h2>
				</div>
			)
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

	const signInForm = () => {
		return (
			<div className="row">
				<div className="col-md-6 offset-sm-3 text-left">
					<form>
						<div className="form-group">
							<label className="text-light">Email</label>
							<input
								onChange={handleChange("email")}
								value={email}
								className="form-control"
								type="text"
							/>
						</div>
						<div className="form-group">
							<label className="text-light">Password</label>
							<input
								onChange={handleChange("password")}
								value={password}
								className="form-control"
								type="text"
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
	return (
		<div>
			<Base title="Sign In" description="User can Sign in from here">
				{loadingMessage()}
				{errorMessage()}
				{signInForm()}
				{performRedirect()}
				<p className="text-white text-center">{JSON.stringify(values)}</p>
			</Base>
		</div>
	);
}

export default Signin;
