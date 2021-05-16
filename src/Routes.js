import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./core/Home";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import AdminRoute from "./auth/helper/AdminRoutes";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import UserDashboard from "./user/UserDashBoard";
import AdminDashBoard from "./user/AdminDashBoard";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import ManageCategories from "./admin/ManageCategories";
import ManageProducts from "./admin/ManageProducts";
import UpdateProduct from "./admin/UpdateProduct";

function Routes() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" exact component={Home} />
				<Route path="/signup" exact component={Signup} />
				<Route path="/signin" exact component={Signin} />
				<AdminRoute path="/admin/dashboard" exact component={AdminDashBoard} />
				<AdminRoute
					path="/admin/create/category"
					exact
					component={AddCategory}
				/>
				<PrivateRoute path="/user/dashboard" exact component={UserDashboard} />
				<AdminRoute
					path="/admin/create/product"
					exact
					component={AddProduct}
				></AdminRoute>
				<AdminRoute
					path="/admin/categories"
					exact
					component={ManageCategories}
				></AdminRoute>
				<AdminRoute
					path="/admin/products"
					exact
					component={ManageProducts}
				></AdminRoute>
				<AdminRoute
					path="/admin/product/update/:productId"
					exact
					component={UpdateProduct}
				></AdminRoute>
			</Switch>
		</BrowserRouter>
	);
}

export default Routes;
