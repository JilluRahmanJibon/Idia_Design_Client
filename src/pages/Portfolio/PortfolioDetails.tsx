import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BaseApi } from "../../utils/BaseApi";
import ReactModalImage from "react-modal-image"; // Import the modal image library
import Loader from "../../components/Loader/Loader";
// import { toast } from "sonner";
// import { useUser } from "../../context/UserContext";
// import axios from "axios";

// Define the type for the image object
interface Image {
	img: string;
}

// Define the type for the portfolio data
interface PortfolioData {
	_id: string;
	title: string;
	price: string;
	description: string;
	createdAt: string;
	service: string;
	picture: string;
	video?: string;
	images?: Image[];
}

const PortfolioDetails = () => {
	const [data, setData] = useState<PortfolioData | null>(null);
	// const { user } = useUser();
	const params = useParams();
	// const navigate = useNavigate();
	const token = localStorage.getItem("AuthToken");

	useEffect(() => {
		fetch(`${BaseApi}/portfolio/${params?.id}`)
			.then(res => res.json())
			.then(data => {
				setData(data.data);
			});
	}, [params?.id, token]);

	// Early return if data is not loaded
	if (!data) {
		return <Loader />;
	}

	const { title, price, description, createdAt, service, video, images } = data;

	// const addToCart = async () => {
	// 	if (!user) {
	// 		toast.error("Please log in to add items to the cart.");
	// 		navigate("/login");
	// 		return;
	// 	}

	// 	const cartData = {
	// 		userId: user?._id,
	// 		userEmail: user?.email,
	// 		productId: _id,
	// 		productName: title,
	// 		price: price,
	// 		picture: picture,
	// 	};
	// 	try {
	// 		const res = await axios.post(`${BaseApi}/cart/add`, cartData, {
	// 			headers: {
	// 				Authorization: `${token}`,
	// 				"Content-Type": "application/json",
	// 			},
	// 		});

	// 		toast.success(res.data.message);
	// 	} catch (err: any) {
	// 		toast.error(err.response.data.message);
	// 	}
	// };

	// const buyNow = () => {
	// 	if (!token) {
	// 		toast.error("Please log in to proceed with the purchase.");
	// 		navigate("/login");
	// 	} else if (price) {
	// 		// const priceInCents = Number(price) * 100; // Convert price to cents
	// 		// alert(`Proceeding to purchase: ${title} for $${priceInCents / 100}`);
	// 		// Add further logic for payment processing, e.g., call to backend for payment integration
	// 		navigate('/cart')
	// 	} else {
	// 		toast.error("Invalid price data.");
	// 	}
	// };

	return (
		<main className="overflow-hidden pb-6">
			{/* Portfolio Title Section */}
			<section className="w-4/5 md:w-2/3 mx-auto pt-14 pb-10">
				<h1 className="md:text-6xl text-4xl font-extrabold text-center text-gray-800 leading-tight">
					{title}
				</h1>
			</section>

			{/* Image Gallery Section */}
			{images && images?.length > 0 && (
				<section className="w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
					{images.map((img, i) => (
						<div
							key={i}
							className="w-full md:h-[400px] bg-gray-100 overflow-hidden rounded-lg shadow-lg">
							<ReactModalImage
								className="object-cover w-full h-full transition-transform transform hover:scale-105 cursor-pointer"
								small={img.img}
								large={img.img}
								alt={`Portfolio image ${i}`}
							/>
						</div>
					))}
				</section>
			)}

			{/* Video Section */}
			{video && (
				<section className="mt-10 mx-auto px-2">
					<iframe
						className="w-full md:h-[500px] h-[300px] rounded-lg shadow-lg"
						src={video}
						frameBorder="0"
						allow="autoplay; fullscreen; picture-in-picture"
						allowFullScreen></iframe>
				</section>
			)}

			{/* Description and Details Section */}
			{description && (
				<section className="mt-12 px-4 md:px-12">
					<div className="text-lg text-gray-600 leading-relaxed">
						<p>{description}</p>
					</div>
				</section>
			)}
			{/* Price Section */}
			{price && (
				<section className="mt-6 px-4 md:px-12">
					<div className="text-lg text-gray-700">
						<p>
							<strong>Price:</strong> ${price}
						</p>
					</div>
				</section>
			)}

			{/* Service Section */}
			{service && (
				<section className="mt-6 px-4 md:px-12">
					<div className="text-lg text-gray-700">
						<p>
							<strong>Service:</strong> {service}
						</p>
					</div>
				</section>
			)}

			{/* Created Date Section */}
			{createdAt && (
				<section className="mt-6 px-4 md:px-12">
					<div className="text-lg text-gray-700">
						<p>
							<strong>Created on:</strong>{" "}
							{new Date(createdAt).toLocaleDateString()}
						</p>
					</div>
				</section>
			)}

			{/* Add to Cart and Buy Now Buttons */}
			{price ? (
				<section className="m-16 p-12 flex justify-center space-x-4">
					<Link
						to={``}
						className="px-8 py-3 bg-secondary text-white text-xl rounded-full shadow-md transform transition-all duration-300 hover:bg-primary hover:scale-105">
						{" "}
						Buy Now
					</Link>
					{/* <button
						onClick={addToCart}
						className="px-8 py-3 bg-secondary text-white text-xl rounded-full shadow-md transform transition-all duration-300 hover:bg-primary hover:scale-105">
						Add to Cart
					</button> */}
					{/* <button
						className="px-8 py-3 bg-primary text-white text-xl rounded-full shadow-md transform transition-all duration-300 hover:bg-secondary hover:scale-105">
						View Cart
					</button> */}
				</section>
			) : (
				<section className="m-16 p-12 flex justify-center">
					<p className="text-xl font-bold text-red-500">
						This product is not available at the moment. Please check back
						later.
					</p>
				</section>
			)}
		</main>
	);
};

export default PortfolioDetails;
