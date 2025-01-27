import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa"; // Trash icon for removing items
import Loader from "../../components/Loader/Loader";
import { toast } from "sonner";

// Define the type for cart item
interface CartItem {
	_id: string;
	title: string;
	price: string;
	picture: string;
}

const Cart = () => {
	const [cart, setCart] = useState<CartItem[]>([]);
	const [loading, setLoading] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
	const navigate = useNavigate();

	useEffect(() => {
		setLoading(true);
		const token = localStorage.getItem("AuthToken");
		setIsLoggedIn(!!token);
		// Fetch cart from localStorage
		const savedCart = localStorage.getItem("cart");
		if (savedCart) {
			setCart(JSON.parse(savedCart));
		}
		setLoading(false);
	}, []);

	// Handle item removal
	const handleRemoveItem = (id: string) => {
		const updatedCart = cart.filter(item => item._id !== id);
		setCart(updatedCart);
		localStorage.setItem("cart", JSON.stringify(updatedCart));
	};

	// Calculate total amount without quantity
	const totalAmount = cart.reduce(
		(total, item) => total + (Number(item.price) || 0),  
		0
	);

	// Ensure the total amount is valid
	const validTotalAmount = !isNaN(totalAmount) ? totalAmount : 0;

	// Function to handle Proceed to Checkout
	const handleCheckout = () => {
		if (!isLoggedIn) {
			toast.error("Please log in to proceed with the purchase.");
			navigate("/login");
		} else {
			// Proceed to the checkout page with the cart data
			navigate("/payment", { state: { cart, totalAmount: validTotalAmount } });
		}
	};

	return (
		<main className="py-12 px-6 bg-gray-100">
			<section className="max-w-7xl mx-auto">
				{/* Cart Title */}
				<h1 className="text-4xl font-semibold mb-8 text-center text-gray-800">
					Your Cart
				</h1>

				{loading ? (
					<div className="text-center text-xl font-semibold">
						<Loader />
						<p>Loading your cart...</p> {/* Optional, for clarity */}
					</div>
				) : cart.length === 0 ? (
					<div className="text-center text-xl font-semibold h-[300px] flex justify-center items-center">
						Your cart is empty.{" "}
						<NavLink to="/" className="text-blue-600 hover:text-blue-800">
							Browse our products.
						</NavLink>
					</div>
				) : (
					<>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
							{cart.map(item => (
								<div
									key={item._id}
									className="bg-white p-6 rounded-lg shadow-lg hover:scale-105 transition-all duration-300 transform hover:shadow-xl">
									<img
										className="w-full h-48 object-cover rounded-md mb-4 transition-transform transform hover:scale-105"
										src={item.picture}
										alt={item.title}
									/>
									<h3 className="text-xl font-semibold text-gray-800 mb-2">
										{item.title}
									</h3>
									<p className="text-lg text-gray-600">Price: ${item.price}</p>
									<div className="flex items-center justify-between mt-4">
										<button
											onClick={() => handleRemoveItem(item._id)}
											className="text-red-600 hover:text-red-800 transition-colors flex items-center space-x-2">
											<FaTrashAlt className="text-lg" />
											<span>Remove</span>
										</button>
									</div>
								</div>
							))}
						</div>

						{/* Total Amount Section */}
						<div className="mt-8 flex justify-between items-center text-xl font-semibold">
							<p>Total Amount:</p>
							<p>${validTotalAmount.toFixed(2)}</p>{" "}
							{/* Ensures 2 decimal places */}
						</div>

						{/* Checkout Button */}
						<div className="mt-8 flex justify-center">
							<button
								onClick={handleCheckout}
								className="px-8 py-3 bg-primary text-white text-xl rounded-full shadow-md transform transition-all duration-300 hover:bg-secondary hover:scale-105">
								Proceed to Checkout
							</button>
						</div>
					</>
				)}
			</section>
		</main>
	);
};

export default Cart;
