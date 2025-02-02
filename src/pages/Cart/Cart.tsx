import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa"; // Trash icon for removing items
import Loader from "../../components/Loader/Loader";
import { toast } from "sonner";
import axios from "axios";
import { BaseApi } from "../../utils/BaseApi";

// Define the type for cart item
interface ICartItem {
	_id: string;
	productId: string;
	productName: string;
	price: number;
	picture: string;
}

const Cart = () => {
	const token = localStorage.getItem("AuthToken");
	const [cartItems, setCartItems] = useState<ICartItem[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	console.log("🚀 ~ Cart ~ error:", error);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchCartData = async () => {
			try {
				const res = await axios.get(`${BaseApi}/cart/items`, {
					headers: {
						Authorization: `${token}`,
						"Content-Type": "application/json",
					},
				});
				// Handle the response data
				setCartItems(res.data.data.items);
				setLoading(false);
			} catch (err: any) {
				// Handle error
				setError(err.message || "Failed to load cart data");
				setLoading(false);
			}
		};

		// Fetch cart data when component mounts
		fetchCartData();
	}, [token]);

	const handleRemoveItem = async (id: string) => {
		try {
			// Optimistic UI Update: Remove item from state first

			// Send request to backend to remove the item from the cart
			const res = await axios.delete(`${BaseApi}/cart/remove/${id}`, {
				headers: {
					Authorization: `${token}`, // Include token if necessary
				},
			});
			console.log(res);
			setCartItems(cartItems.filter(item => item._id !== id));
			toast.success(res.data.message);
		} catch (error) {
			console.error("Failed to remove item:", error);
			// Optionally, handle the error by showing a message to the user
		}
	};

	// Calculate total amount without quantity
	const totalAmount = cartItems?.reduce(
		(total, item) => total + (Number(item.price) || 0),
		0
	);

	// Ensure the total amount is valid
	const validTotalAmount = !isNaN(totalAmount) ? totalAmount : 0;

	// Function to handle Proceed to Checkout
	const handleCheckout = () => {
		navigate("/payment", {
			state: { cartItems, totalAmount: validTotalAmount },
		});
	};

	return (
		<main className="py-12 px-6">
			<section className="max-w-7xl mx-auto">
				{/* Cart Title */}
				<h1 className="text-4xl font-semibold mb-8 text-center text-gray-800">
					Your Cart
				</h1>

				{loading ? (
					<Loader />
				) : cartItems?.length === 0 ? (
					<div className="text-center text-xl font-semibold h-[300px] flex justify-center items-center">
						Your cart is empty.{" "}
						<NavLink to="/" className="text-blue-600 hover:text-blue-800">
							Browse our products.
						</NavLink>
					</div>
				) : (
					<>
						{/* Cart Table */}
						<div className="overflow-x-auto">
							<table className="min-w-full table-auto">
								<thead className="">
									<tr>
										<th className="px-6 py-3 text-left text-gray-800">
											Product
										</th>
										<th className="px-6 py-3 text-left text-gray-800">Price</th>
										<th className="px-6 py-3 text-left text-gray-800">
											Quantity
										</th>
										<th className="px-6 py-3 text-left text-gray-800">
											Action
										</th>
									</tr>
								</thead>
								<tbody>
									{cartItems?.map((item, index) => (
										<tr
											key={item._id}
											className={`border-b transition-colors duration-200 ${
												index % 2 === 0 ? "bg-green-100" : "bg-blue-100"
											}`}>
											<td className="px-6 py-4 flex items-center space-x-4">
												<img
													className="w-16 h-16 object-cover rounded-md"
													src={item.picture}
													alt={item.productName}
												/>
												<span>{item.productName}</span>
											</td>
											<td className="px-6 py-4">${item.price}</td>
											<td className="px-6 py-4">
												<span>{1}</span>
											</td>
											<td className="px-6 py-4">
												<button
													onClick={() => handleRemoveItem(item.productId)}
													className="text-red-600 hover:text-red-800 transition-colors flex items-center space-x-2">
													<FaTrashAlt className="text-lg" />
													<span>Remove</span>
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
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
