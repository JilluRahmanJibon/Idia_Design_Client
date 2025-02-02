import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUserAlt } from "react-icons/fa";
import logo from "../../assets/Logo/idia.png";
import { useUser } from "../../context/UserContext";

const Navbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const { user, setUser } = useUser();
	const navigate = useNavigate();

	const handleLogout = () => {
		setUser(null);
		localStorage.removeItem("AuthToken");
		navigate("/login");
	};

	// Get cart count from local storage
	const cartCount = () => {
		const savedCart = localStorage.getItem("cart");
		if (savedCart) {
			const cartItems = JSON.parse(savedCart);
			return cartItems.length; // Return the number of items in the cart
		}
		return 0; // Return 0 if no cart items are stored
	};

	const menuItems = (
		<>
			<li>
				<NavLink
					to="/"
					className={({ isActive }) =>
						isActive
							? "text-primary font-semibold text-lg"
							: "text-gray-600 hover:text-primary font-medium text-lg transition-colors"
					}>
					Portfolio
				</NavLink>
			</li>
			<li>
				<NavLink
					to="/contact"
					className={({ isActive }) =>
						isActive
							? "text-primary font-semibold text-lg"
							: "text-gray-600 hover:text-primary font-medium text-lg transition-colors"
					}>
					Contact
				</NavLink>
			</li>
			<li>
				<NavLink
					to="/about"
					className={({ isActive }) =>
						isActive
							? "text-primary font-semibold text-lg"
							: "text-gray-600 hover:text-primary font-medium text-lg transition-colors"
					}>
					About
				</NavLink>
			</li>
			{/* {!user?.email && (
				<>
					<li>
						<NavLink
							to="/about"
							className={({ isActive }) =>
								isActive
									? "text-primary font-semibold text-lg"
									: "text-gray-600 hover:text-primary font-medium text-lg transition-colors"
							}>
							About
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/login"
							className={({ isActive }) =>
								isActive
									? "text-primary font-semibold text-lg flex items-center gap-1"
									: "text-gray-600 hover:text-primary flex items-center gap-1 font-medium text-lg transition-colors"
							}>
							<FaUserAlt className="text-lg" />
							<span>Login</span>
						</NavLink>
					</li>
				</>
			)} */}
		</>
	);

	return (
		<nav className="bg-green-50 shadow-sm sticky top-0 z-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center py-4">
					{/* Logo Section - Left Column */}
					<Link to="/" className="flex items-center">
						<img src={logo} alt="Idia Designs" className="w-32" />
					</Link>

					{/* Menu and Icons Section - Right Column */}
					<div className="flex items-center space-x-6">
						{/* Menu Items for Desktop */}
						<ul className="hidden lg:flex items-center space-x-8">
							{menuItems}
						</ul>

						{/* Login/Profile/Logout */}
						{user && user?.email && (
							<div className="flex items-center space-x-4">
								{/* Cart Icon */}
								<NavLink
									to="/cart"
									className="relative text-gray-600 hover:text-primary transition-colors">
									<FaShoppingCart className="text-2xl" />
									<span className="absolute -top-3 -right-3 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-600 rounded-full">
										{cartCount()}
									</span>
								</NavLink>
								<NavLink
									to="/dashboard"
									className="flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors">
									<FaUserAlt className="text-lg" />
									<span>Profile</span>
								</NavLink>
								<button
									onClick={handleLogout}
									className="text-gray-100 bg-primary hover:bg-secondary px-2 py-1 rounded-md hover:text-white transition-colors">
									Logout
								</button>
							</div>
						)}

						{/* Mobile Menu Button (Hamburger) */}
						<div className="lg:hidden">
							<button
								onClick={() => setIsMenuOpen(!isMenuOpen)}
								className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
								<svg
									className="w-6 h-6 text-gray-600"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M4 6h16M4 12h16m-7 6h7"
									/>
								</svg>
							</button>
						</div>
					</div>
				</div>

				{/* Mobile Menu */}
				{isMenuOpen && (
					<div className="lg:hidden">
						<div className="bg-white shadow-md rounded-md p-4 space-y-4">
							<ul className="space-y-4">{menuItems}</ul>
							{user && user?.email ? (
								<div className="flex flex-col items-start space-y-4">
									<NavLink
										to="/dashboard"
										className="text-gray-600 hover:text-primary transition-colors">
										Profile
									</NavLink>
									<button
										onClick={handleLogout}
										className="text-gray-600 hover:text-primary transition-colors">
										Logout
									</button>
								</div>
							) : (
								""
							)}
						</div>
					</div>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
