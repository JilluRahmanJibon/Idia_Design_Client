import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { useEffect, useState } from "react";
import { BaseApi } from "../../utils/BaseApi";
import { useLocation } from "react-router-dom";

const CheckoutForm = () => {
	const stripe = useStripe();
	const elements = useElements();
	const token = localStorage.getItem("AuthToken");
	const [error, setError] = useState("");
	const [clientSecret, setClientSecret] = useState("");
	const [transactionId, setTransactionId] = useState("");
	const [userData, setUserData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const location = useLocation();
	const { cart, totalAmount } = location.state || {};

	useEffect(() => {
		if (token) {
			// Fetch user data with token
			const fetchUserData = async () => {
				try {
					const response = await axios.get(`${BaseApi}/users/me`, {
						headers: {
							Authorization: `${token}`,
							"Content-Type": "application/json",
						},
					});

					// Set user data from the API response
					setUserData(response.data.data);
				} catch (error) {
					// navigate("/login");
					console.error(error);
					localStorage.removeItem("AuthToken");
					// Handle error by showing default values or an error message
				} finally {
					setIsLoading(false);
				}
			};

			fetchUserData();
		} else {
			// navigate("/");
			console.log("No AuthToken found in localStorage");
			setIsLoading(false);
		}
	}, [token]);

	useEffect(() => {
		if (token && totalAmount) {
			// Fetch user data and create payment intent
			const fetchPaymentData = async () => {
				try {
					const response = await axios.post(
						`${BaseApi}/checkout/create-payment`,
						{ totalAmount },
						{
							headers: {
								Authorization: `${token}`,
								"Content-Type": "application/json",
							},
						}
					);
					// Set the clientSecret from the API response
					setClientSecret(response.data.data.clientSecret);
				} catch (error) {
					console.error("Error creating payment:", error);
					// Handle error by showing an error message
				} finally {
					setIsLoading(false);
				}
			};

			fetchPaymentData();
		} else {
			setIsLoading(false);
		}
	}, [token, totalAmount]);

	const handleSubmit = async event => {
		event.preventDefault();

		if (!stripe || !elements) {
			return;
		}
		if (!clientSecret) {
			return;
		}
		if (!userData?.email) {
			return;
		}

		const card = elements.getElement(CardElement);
		if (card === null) {
			return;
		}

		// Use your card Element with other Stripe.js APIs
		const { error, paymentMethod } = await stripe.createPaymentMethod({
			type: "card",
			card,
		});

		if (error) {
			setError(error.message);
			console.log("[error]", error);
		} else {
			setError("");

			console.log("[PaymentMethod]", paymentMethod);
		}

		// confirm payment
		const { paymentIntent, error: confirmError } =
			await stripe.confirmCardPayment(clientSecret, {
				payment_method: {
					card: card,
					billing_details: {
						email: userData?.email || "anonymous",
						name: userData?.userName || "anonymous",
						phone: userData?.phone || "anonymous",
					},
				},
			});

		if (confirmError) {
			console.log(confirmError);
			setError(confirmError.message);
		} else {
			if (paymentIntent.status === "succeeded") {
				console.log(paymentIntent.id);
				setTransactionId(paymentIntent.id);
			}
		}
	};
	return (
		<form onSubmit={handleSubmit}>
			<p className="pb-3">
				Payment will deducted: <span className="text-secondary font-bold"> ${totalAmount}</span>
			</p>
			<CardElement
				options={{
					style: {
						base: {
							fontSize: "16px",
							color: "#424770",
							"::placeholder": {
								color: "#aab7c4",
							},
						},
						invalid: {
							color: "#9e2146",
						},
					},
				}}
			/>
			{!stripe || !clientSecret ? (
				<button
					className="bg-red-400 mt-4 text-white py-2 px-6 rounded-md"
					disabled>
					Pay
				</button>
			) : (
				<>
					<button
						className="bg-primary mt-4 text-white py-2 px-6 rounded-md"
						type="submit"
						disabled={!stripe || !clientSecret}>
						Pay
					</button>
				</>
			)}
			<p className="text-red-600 ">{error}</p>
			{transactionId && (
				<p className="text-primary">Your transaction id: {transactionId}</p>
			)}
		</form>
	);
};

export default CheckoutForm;
