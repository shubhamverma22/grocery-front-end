import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { createProduct, getCategories } from "./helper/adminapicall";
import { isAuthenticate } from "../auth/helper/index";
import { RotateLoader, ScaleLoader } from "react-spinners";

const AddProduct = () => {
	const { user, token } = isAuthenticate();

	const [values, setValues] = useState({
		name: "",
		description: "",
		price: "",
		stock: "",
		photo: "",
		categories: [],
		category: "",
		loading: false,
		error: "",
		createdProduct: "",
		getaRedirect: false,
		formData: "", //we use form data as to send all the information to the backend
	});

	const {
		name,
		description,
		price,
		stock,
		categories,
		category,
		loading,
		error,
		createdProduct,
		getaRedirect,
		formData,
	} = values;

	const preload = () => {
		getCategories().then((data) => {
			console.log("data is:", data);
			if (data.error) {
				setValues({ ...values, error: data.error });
			} else {
				setValues({
					...values,
					categories: data.categ,
					formData: new FormData(),
				});
				console.log("categ is:", categories);
				console.log("DEx:", formData);
			}
		});
	};

	useEffect(() => {
		preload();
	}, []);

	const onSubmit = (e) => {
		e.preventDefault();
		setValues({ ...values, error: "", loading: true });
		createProduct(user._id, token, formData)
			.then((data) => {
				if (data.error) {
					setValues({ ...values, error: data.error });
				} else {
					setValues({
						...values,
						name: "",
						description: "",
						price: "",
						photo: "",
						stock: "",
						loading: false,
						createdProduct: data.name,
					});
				}
			})
			.catch((e) => console.log(e));
	};

	const handleChange = (name) => (event) => {
		//if the value of name is photo than target the file else target the value
		const value = name === "photo" ? event.target.files[0] : event.target.value;
		formData.set(name, value);
		//load all values than we assign the values on the basis of their names
		setValues({ ...values, [name]: value });
	};

	const successMessage = () => {
		return (
			<div
				className="alert alert-success mt-3"
				style={{ display: createdProduct ? "" : "none" }}
			>
				<h4>{createdProduct} created Successfully</h4>
			</div>
		);
	};

	const errorMessage = () => {
		return (
			<div
				className="alert alert-warning mt-3"
				style={{ display: error ? "" : "none" }}
			>
				<h4>Failed To create a Product</h4>
			</div>
		);
	};

	const loadingMessage = (loading) => {
		if (loading) {
			return (
				<div className="sweet-loading">
					<ScaleLoader
						style={{ display: "block", margin: "auto", borderColor: "red" }}
						color={"#123abc"}
						loading={loading}
					/>
				</div>
			);
		}
	};

	const createProductForm = () => (
		<form>
			<span>Post photo</span>
			<div className="form-group mb-3">
				<label className="btn btn-block btn-success">
					<input
						onChange={handleChange("photo")}
						type="file"
						name="photo"
						accept="image"
						placeholder="choose a file"
					/>
				</label>
			</div>
			<div className="form-group mb-3">
				<input
					onChange={handleChange("name")}
					name="photo"
					className="form-control"
					placeholder="Name"
					value={name}
				/>
			</div>
			<div className="form-group mb-3">
				<textarea
					onChange={handleChange("description")}
					name="photo"
					className="form-control"
					placeholder="Description"
					value={description}
				/>
			</div>
			<div className="form-group mb-3">
				<input
					onChange={handleChange("price")}
					type="number"
					className="form-control"
					placeholder="Price"
					value={price}
				/>
			</div>
			<div className="form-group mb-3">
				<select
					onChange={handleChange("category")}
					className="form-control"
					placeholder="Category"
				>
					<option>Select</option>
					{categories &&
						categories.map((cate, index) => {
							return (
								<option key={index} value={cate._id}>
									{cate.name}
								</option>
							);
						})}
				</select>
			</div>
			<div className="form-group mb-3">
				<input
					onChange={handleChange("stock")}
					type="number"
					className="form-control"
					placeholder="Stock"
					value={stock}
				/>
			</div>

			<button
				type="submit"
				onClick={onSubmit}
				className="btn btn-outline-success mb-3"
			>
				Create Product
			</button>
		</form>
	);

	return (
		<Base
			title="Add a product here!"
			description="Welcome to product creation section"
			className="container bg-info p-4"
		>
			<Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
				Admin Home
			</Link>
			<div className="row bg-dark text-white rounded">
				<div className="col-md-8 offset-md-2">
					{loadingMessage(loading)}
					{errorMessage()}
					{successMessage()}
					{createProductForm()}
				</div>
			</div>
		</Base>
	);
};

export default AddProduct;
