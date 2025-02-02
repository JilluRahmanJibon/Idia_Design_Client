import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import axios from "axios";
import { BaseApi } from "../../utils/BaseApi";
import { AiOutlineLoading3Quarters } from "react-icons/ai"; // Import spinner icon

type TFormData = {
	userName: string;
	email: string;
	phone: string;
	password: string;
	confirmPassword: string;
};

const Register = () => {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false); // Loading state

	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm<TFormData>();

	const onSubmit = async (data: TFormData) => {
		const { userName, email, phone, password, confirmPassword } = data;

		// Validate passwords match
		if (password !== confirmPassword) {
			setError("confirmPassword", {
				type: "manual",
				message: "Passwords do not match!",
			});
			return;
		}

		// Validate phone number
		const phoneRegex = /^\d{10}$/;
		if (!phoneRegex.test(phone)) {
			setError("phone", {
				type: "manual",
				message: "Please enter a valid 10-digit phone number.",
			});
			return;
		}

		setIsLoading(true); // Start loading

		try {
			const response = await axios.post(`${BaseApi}/users/register`, {
				userName,
				email,
				phone,
				password,
			});

			if (response.status === 200 || response.status === 201) {
				localStorage.setItem("AuthToken", response.data.data.accessToken);
				toast.success(`${response.data.message}`);
				navigate("/");
			}
		} catch (error: any) {
			console.error("🚀 ~ API Error:", error);
			if (error.response) {
				toast.error(error.response.data.message || "Registration failed!");
			} else {
				toast.error("An error occurred. Please try again.");
			}
		} finally {
			setIsLoading(false); // Stop loading
		}
	};

	return (
		<div className="min-h-screen flex flex-col bg-gradient-to-r from-secondary to-primary">
			<div className="flex-1 flex items-center justify-center py-10">
				<div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
					<h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
						Register
					</h2>

					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="mb-4">
							<label className="block text-lg font-medium text-gray-600 mb-2">
								Username
							</label>
							<input
								type="text"
								{...register("userName", { required: "Username is required" })}
								placeholder="Enter your username"
								className={`w-full p-3 border-2 rounded-md ${
									errors.userName ? "border-red-500" : "border-gray-300"
								} focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`}
							/>
							{errors.userName && (
								<p className="text-red-500 text-xs">
									{errors.userName.message}
								</p>
							)}
						</div>

						<div className="mb-4">
							<label className="block text-lg font-medium text-gray-600 mb-2">
								Email
							</label>
							<input
								type="email"
								{...register("email", {
									required: "Email is required",
									pattern: {
										value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
										message: "Invalid email address",
									},
								})}
								placeholder="Enter your email"
								className={`w-full p-3 border-2 rounded-md ${
									errors.email ? "border-red-500" : "border-gray-300"
								} focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`}
							/>
							{errors.email && (
								<p className="text-red-500 text-xs">{errors.email.message}</p>
							)}
						</div>

						<div className="mb-4">
							<label className="block text-lg font-medium text-gray-600 mb-2">
								Phone Number
							</label>
							<input
								type="text"
								{...register("phone", {
									required: "Phone number is required",
									pattern: {
										value: /^\d{10}$/,
										message: "Please enter a valid 10-digit phone number",
									},
								})}
								placeholder="Enter your phone number"
								className={`w-full p-3 border-2 rounded-md ${
									errors.phone ? "border-red-500" : "border-gray-300"
								} focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`}
							/>
							{errors.phone && (
								<p className="text-red-500 text-xs">{errors.phone.message}</p>
							)}
						</div>

						<div className="mb-4">
							<label className="block text-lg font-medium text-gray-600 mb-2">
								Password
							</label>
							<input
								type="password"
								{...register("password", { required: "Password is required" })}
								placeholder="Enter your password"
								className={`w-full p-3 border-2 rounded-md ${
									errors.password ? "border-red-500" : "border-gray-300"
								} focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`}
							/>
							{errors.password && (
								<p className="text-red-500 text-xs">
									{errors.password.message}
								</p>
							)}
						</div>

						<div className="mb-6">
							<label className="block text-lg font-medium text-gray-600 mb-2">
								Confirm Password
							</label>
							<input
								type="password"
								{...register("confirmPassword", {
									required: "Please confirm your password",
								})}
								placeholder="Confirm your password"
								className={`w-full p-3 border-2 rounded-md ${
									errors.confirmPassword ? "border-red-500" : "border-gray-300"
								} focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`}
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
							className="w-full py-3 bg-primary text-white text-lg font-semibold rounded-md shadow-md transform transition-all duration-300 hover:bg-secondary hover:scale-105 flex items-center justify-center"
							disabled={isLoading}>
							{isLoading ? (
								<AiOutlineLoading3Quarters className="animate-spin text-2xl mr-2" />
							) : (
								"Register"
							)}
							{isLoading ? "Registering..." : ""}
						</button>
					</form>

					<div className="mt-6 text-center">
						<p className="text-sm text-gray-600">
							Already have an account?{" "}
							<Link
								to="/login"
								className="text-secondary hover:text-primary font-medium">
								Login here
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Register;
