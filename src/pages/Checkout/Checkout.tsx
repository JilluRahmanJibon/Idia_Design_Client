import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner"; // For showing messages
import { BaseApi } from "../../utils/BaseApi"; // Assuming you have a Base API utility
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js"; // For Stripe integration

const Checkout = () => {
	const token = localStorage.getItem("AuthToken");
	const location = useLocation();
	const [userData, setUserData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [paymentMethodId, setPaymentMethodId] = useState<string>("");
	const { productId, title, price, picture } = location.state || {};
	const navigate = useNavigate();
	const stripePromise = loadStripe("your-stripe-public-key"); // Add your Stripe public key here

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
					navigate("/login");
					console.error(error);
					localStorage.removeItem("AuthToken");
				} finally {
					setIsLoading(false);
				}
			};

			fetchUserData();
		} else {
			navigate("/");
			console.log("No AuthToken found in localStorage");
			setIsLoading(false);
		}
	}, [token, navigate]);

	const handlePayment = async () => {
		if (!paymentMethodId) {
			toast.error("Please select a payment method.");
			return;
		}

		const payload = {
			userEmail: userData?.email,
			userName: userData?.userName,
			productId: productId,
			productName: title,
			amount: price, // Use the price passed in cents
			status: "pending", // Initial status as pending
			paymentMethodId: paymentMethodId,
			createdAt: new Date(),
		};

		try {
			// Send request to the back-end to create the purchase record
			const response = await fetch(`${BaseApi}/purchase`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(payload),
			});

			const result = await response.json();
			if (result.success) {
				toast.success("Payment successful!");
				// Redirect user to success page or order confirmation page
			} else {
				toast.error("Payment failed. Please try again.");
			}
		} catch (error) {
			toast.error("Something went wrong. Please try again.");
		}
	};

	const handleStripePayment = async () => {
		// Load Stripe.js and create a payment intent
		const stripe = await stripePromise;
		if (!stripe) {
			toast.error("Stripe failed to load.");
			return;
		}

		const { clientSecret } = await axios.post(
			`${BaseApi}/checkout/create-payment`,
			{
				amount: price,
			}
		);

		const { error, paymentIntent } = await stripe.confirmCardPayment(
			clientSecret,
			{
				payment_method: paymentMethodId,
			}
		);

		if (error) {
			toast.error("Payment failed. Please try again.");
		} else if (paymentIntent?.status === "succeeded") {
			toast.success("Payment successful!");
			// You can call the handlePayment function here for further processing
		}
	};

	return (
		<div className="checkout">
			<h1>Checkout</h1>
			<div>
				<img src={picture} alt={title} />
				<h3>{title}</h3>
				<p>Price: ${price / 100}</p> {/* Convert cents to dollars */}
			</div>

			{/* Add payment method selection logic here */}
			<div>
				{/* For example, using Stripe Elements or another method */}
				<button onClick={handleStripePayment}>Complete Payment</button>
			</div>
		</div>
	);
};

export default Checkout;
