import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom"; // For navigation after login
import { toast } from "sonner"; // For toast notifications
import { BaseApi } from "../../utils/BaseApi";
import { useUser } from "../../context/UserContext";

interface ILoginForm {
	email: string;
	password: string;
}

const Login = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ILoginForm>();
	const navigate = useNavigate();
		const location = useLocation();
		const from = location.state?.from?.pathname || "/";

	const { setUser } = useUser();

	const onSubmit: SubmitHandler<ILoginForm> = async data => {
		try {
			// Make the API call
			const response = await axios.post(`${BaseApi}/auth/login`, data);

			// Check if token exists
			if (response.data.data.accessToken) {
				// Save token to localStorage
				localStorage.setItem("AuthToken", response.data.data.accessToken);
				setUser(response.data.data.accessToken);
				// Show success message
				toast.success(`${response.data.message}`);

				// Redirect to homepage/dashboard
			navigate(from, { replace: true });
			} else {
				throw new Error("Access token is missing in the response!");
			}
		} catch (error: any) {
			console.error("🚀 ~ Login Error:", error);

			// Handle API errors
			if (error.response) {
				toast.error(error.response.data.message || "Login failed!");
			} else {
				toast.error("An error occurred. Please try again.");
			}
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-primary to-secondary">
			<div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
				<h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
					Login
				</h2>

				{/* Login Form */}
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="mb-4">
						<label
							htmlFor="email"
							className="block text-lg font-medium text-gray-600 mb-2">
							Email
						</label>
						<input
							type="email"
							id="email"
							{...register("email", { required: "Email is required!" })}
							placeholder="Enter your email"
							className={`w-full p-3 border-2 rounded-md ${
								errors.email
									? "border-red-500 focus:ring-red-500"
									: "border-gray-300 focus:ring-blue-500"
							} focus:outline-none focus:ring-2 transition-all`}
						/>
						{errors.email && (
							<p className="text-red-500 text-sm mt-1">
								{errors.email.message}
							</p>
						)}
					</div>

					<div className="mb-6">
						<label
							htmlFor="password"
							className="block text-lg font-medium text-gray-600 mb-2">
							Password
						</label>
						<input
							type="password"
							id="password"
							{...register("password", { required: "Password is required!" })}
							placeholder="Enter your password"
							className={`w-full p-3 border-2 rounded-md ${
								errors.password
									? "border-red-500 focus:ring-red-500"
									: "border-gray-300 focus:ring-blue-500"
							} focus:outline-none focus:ring-2 transition-all`}
						/>
						{errors.password && (
							<p className="text-red-500 text-sm mt-1">
								{errors.password.message}
							</p>
						)}
					</div>

					{/* Submit Button */}
					<button
						type="submit"
						className="w-full py-3 bg-primary text-white text-lg font-semibold rounded-md shadow-md transform transition-all duration-300 hover:bg-secondary hover:scale-105">
						Login
					</button>
				</form>

				<div className="mt-6 text-center">
					<p className="text-sm text-gray-600">
						Don't have an account?{" "}
						<Link
							to="/register"
							className="text-secondary hover:text-primary font-medium">
							Register here
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Login;
