import { API } from "../../backend";

//categorie call
export const createCategory = (userId, token, category) => {
	return fetch(`${API}/category/create/${userId}`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(category),
	})
		.then((res) => {
			return res.json();
		})
		.catch((er) => {
			console.log(er);
		});
};

//get all categories
export const getCategories = () => {
	return fetch(`${API}/categories`, {
		method: "GET",
	})
		.then((res) => {
			return res.json();
		})
		.catch((e) => console.log(e));
};

//product calls
export const createProduct = (userId, token, product) => {
	return fetch(`${API}/product/create/${userId}`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(product),
	})
		.then((res) => {
			return res.json();
		})
		.catch((er) => console.log(er));
};

//get all products
export const getallProducts = () => {
	return fetch(`${API}/products`, {
		method: "GET",
	})
		.then((res) => {
			return res.json();
		})
		.catch((e) => console.log(e));
};

//delete a product
export const deleteProduct = (productId, userId, token) => {
	return fetch(`${API}/product/${productId}/${userId}`, {
		method: "DELETE",
		headers: {
			Accept: "application/json",
			Authorization: `Bearer ${token}`,
		},
	})
		.then((res) => {
			return res.json();
		})
		.catch((e) => console.log(e));
};

//get a product
export const getProduct = (productId) => {
	return fetch(`${API}/product/${productId}`, {
		method: "GET",
	})
		.then((res) => {
			return res.json();
		})
		.catch((e) => console.log(e));
};

//update a product
export const updateProduct = (productId, userId, token, product) => {
	return fetch(`${API}/product/${productId}/${userId}`, {
		method: "PUT",
		headers: {
			Accept: "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(product),
	})
		.then((res) => {
			return res.json();
		})
		.catch((e) => console.log(e));
};
