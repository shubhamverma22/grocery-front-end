import React, { useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticate } from "../auth/helper";
import Base from "../core/Base";
import { createCategory } from "./helper/adminapicall";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddCategory = () => {
	const [name, setName] = useState("");
	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false);

	const { user, token } = isAuthenticate(); //we take a big object "user" and "token" for user from isAuthenticated. token is a beare token which we have to put in postman for creating a categorie.

	const handleChange = (e) => {
		setError("");
		setName(e.target.value);
	};

	const onSubmit = (e) => {
		e.preventDefault();
		setError("");
		setSuccess(false);

		//backend Request Fired
		//Why we use name in {} ?? -->in createCategory() we turn down the name of category in json format So we have to pass it like a object
		createCategory(user._id, token, { name }).then((data) => {
			if (data.error) {
				setError(true);
			} else {
				setError("");
				setSuccess(true);
				setName("");
			}
		});

		//React Tostify Message
		const successMessage = () => {
			if (success) {
				toast("Category created successfully", {
					//This is how toast can declare:- toast("",type)
					type: "success",
				});
			}
		};
		successMessage();

		const errorMessage = () => {
			if (error) {
				toast("Failed to create Category", {
					//This is how toast can declare:- toast("",type)
					type: "error",
				});
			}
		};
		errorMessage();
	};

	//form creation
	const myCategorieForm = () => {
		return (
			<form>
				<div className="form-group">
					<p className="lead">Enter a Category</p>
					<input
						type="text"
						className="form-control my-3"
						onChange={handleChange}
						value={name}
						autoFocus
						required
						placeholder="For eg. Household Product"
					></input>
					<button onClick={onSubmit} className="btn btn-outline-info">
						Create Category
					</button>
				</div>
			</form>
		);
	};
	//back button
	const goBack = () => {
		return (
			<div className="mt-4">
				<Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">
					Admin Home
				</Link>
			</div>
		);
	};
	return (
		<Base
			title="Create a Category here"
			description="Add a new Category of your Product"
			className="container bg-info p-4"
		>
			<ToastContainer />
			<div className="row bg-white rounded">
				<div className="col-md-8 offset-md-2 p-4">
					{myCategorieForm()}
					{goBack()}
				</div>
			</div>
		</Base>
	);
};

export default AddCategory;
