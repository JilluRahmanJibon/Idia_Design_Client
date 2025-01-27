import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import axios from "axios";
import { BaseApi } from "../../utils/BaseApi";
type TFormData = {
	userName: string;
	email: string;
	phone: string;
	password: string;
	confirmPassword: string;
};

const Register = () => {
	const navigate = useNavigate();

	// Initialize useForm hook
	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm<TFormData>();

	const onSubmit = async (data: TFormData) => {
		const { userName, email, phone, password, confirmPassword } = data;

		// Validation checks
		if (password !== confirmPassword) {
			setError("confirmPassword", {
				type: "manual",
				message: "Passwords do not match!",
			});
			return;
		}

		// Simple phone number validation
		const phoneRegex = /^\d{10}$/;
		if (!phoneRegex.test(phone)) {
			setError("phone", {
				type: "manual",
				message: "Please enter a valid 10-digit phone number.",
			});
			return;
		}

		try {
			// Make the API call using Axios
			const response = await axios.post(`${BaseApi}/users/register`, {
				userName,
				email,
				phone,
				password,
			});

			// Check response status
			if (response.status === 200 || response.status === 201) {
				// Save token to localStorage
				localStorage.setItem("AuthToken", response.data.data.accessToken);

				// Show success toast
				toast.success(`${response.data.message}`);

				// Navigate to the desired page (e.g., dashboard or homepage)
				navigate("/");
			}
		} catch (error: any) {
			console.error("🚀 ~ API Error:", error);

			// Handle API errors
			if (error.response) {
				toast.error(error.response.data.message || "Registration failed!");
			} else {
				toast.error("An error occurred. Please try again.");
			}
		}
	};

	return (
		<div className="min-h-screen flex flex-col bg-gradient-to-r from-purple-500 to-indigo-800">
			<div className="flex-1 flex items-center justify-center py-10">
				<div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
					<h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
						Register
					</h2>

					{/* Registration Form */}
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="mb-4">
							<label
								htmlFor="username"
								className="block text-lg font-medium text-gray-600 mb-2">
								Username
							</label>
							<input
								type="text"
								id="username"
								{...register("userName", { required: "Username is required" })}
								placeholder="Enter your username"
								className={`w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
									errors.userName ? "border-red-500" : ""
								}`}
							/>
							{errors.userName && (
								<p className="text-red-500 text-xs">
									{errors.userName.message}
								</p>
							)}
						</div>

						<div className="mb-4">
							<label
								htmlFor="email"
								className="block text-lg font-medium text-gray-600 mb-2">
								Email
							</label>
							<input
								type="email"
								id="email"
								{...register("email", {
									required: "Email is required",
									pattern: {
										value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
										message: "Invalid email address",
									},
								})}
								placeholder="Enter your email"
								className={`w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
									errors.email ? "border-red-500" : ""
								}`}
							/>
							{errors.email && (
								<p className="text-red-500 text-xs">{errors.email.message}</p>
							)}
						</div>

						<div className="mb-4">
							<label
								htmlFor="phone"
								className="block text-lg font-medium text-gray-600 mb-2">
								Phone Number
							</label>
							<input
								type="text"
								id="phone"
								{...register("phone", {
									required: "Phone number is required",
									pattern: {
										value: /^\d{10}$/,
										message: "Please enter a valid 10-digit phone number",
									},
								})}
								placeholder="Enter your phone number"
								className={`w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
									errors.phone ? "border-red-500" : ""
								}`}
							/>
							{errors.phone && (
								<p className="text-red-500 text-xs">{errors.phone.message}</p>
							)}
						</div>

						<div className="mb-4">
							<label
								htmlFor="password"
								className="block text-lg font-medium text-gray-600 mb-2">
								Password
							</label>
							<input
								type="password"
								id="password"
								{...register("password", { required: "Password is required" })}
								placeholder="Enter your password"
								className={`w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
									errors.password ? "border-red-500" : ""
								}`}
							/>
							{errors.password && (
								<p className="text-red-500 text-xs">
									{errors.password.message}
								</p>
							)}
						</div>

						<div className="mb-6">
							<label
								htmlFor="confirmPassword"
								className="block text-lg font-medium text-gray-600 mb-2">
								Confirm Password
							</label>
							<input
								type="password"
								id="confirmPassword"
								{...register("confirmPassword", {
									required: "Please confirm your password",
								})}
								placeholder="Confirm your password"
								className={`w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
									errors.confirmPassword ? "border-red-500" : ""
								}`}
							/>
							{errors.confirmPassword && (
								<p className="text-red-500 text-xs">
									{errors.confirmPassword.message}
								</p>
							)}
						</div>

						{/* Submit Button */}
						<button
							type="submit"
							className="w-full py-3 bg-primary text-white text-lg font-semibold rounded-md shadow-md transform transition-all duration-300 hover:bg-secondary hover:scale-105">
							Register
						</button>
					</form>

					<div className="mt-6 text-center">
						<p className="text-sm text-gray-600">
							Already have an account?{" "}
							<a
								href="/login"
								className="text-secondary hover:text-primary font-medium">
								Login here
							</a>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Register;
