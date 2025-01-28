import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../components/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home";
import App from "../App";
import PortfolioDetails from "../pages/Portfolio/PortfolioDetails";
import Contact from "../pages/Contact/Contact";
import About from "../pages/About/About";
import Cart from "../pages/Cart/Cart";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Dashboard from "../pages/User/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import Orders from "../pages/User/Orders";
import User from "../pages/User/User";
import Payment from "../pages/Checkout/Payment";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{ path: "/portfolio/:id", element: <PortfolioDetails /> },
			{ path: "/contact", element: <Contact /> },
			{ path: "/about", element: <About /> },
			{
				path: "/cart",
				element: (
					<ProtectedRoute>
						<Cart />
					</ProtectedRoute>
				),
			},
			{
				path: "/payment",
				element: (
					<ProtectedRoute>
						<Payment />{" "}
					</ProtectedRoute>
				),
			},
			{ path: "/register", element: <Register /> },
			{ path: "/login", element: <Login /> },
			{
				path: "/dashboard",
				element: (
					<ProtectedRoute>
						<Dashboard />
					</ProtectedRoute>
				),
				children: [
					{
						path: "/dashboard/",
						element: <User />,
					},
					{
						path: "/dashboard/orders",
						element: <Orders />,
					},
				],
			},
		],
	},
	{
		path: "*",
		element: <ErrorPage />,
	},
]);

export default router;
