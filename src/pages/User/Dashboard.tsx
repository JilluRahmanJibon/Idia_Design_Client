import { Link, NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
	return (
		<div className="flex min-h-screen bg-gray-100">
			{/* Sidebar */}
			<div className="w-64 bg-primary text-white p-6 hidden md:block">
				<Link to="/dashboard">
					<h1 className="text-2xl font-semibold py-2">Dashboard</h1>
				</Link>
				<ul>
					<li>
						<NavLink
							to="/dashboard/orders"
							className={({ isActive }) =>
								isActive
									? "block py-2 px-4 mb-2 bg-secondary rounded-lg font-semibold transition duration-200"
									: "block py-2 px-4 mb-2 hover:bg-secondary rounded-lg transition duration-200"
							}>
							Orders
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/"
							className={({ isActive }) =>
								isActive
									? "block py-2 px-4 mb-2 bg-secondary rounded-lg font-semibold transition duration-200"
									: "block py-2 px-4 mb-2 hover:bg-secondary rounded-lg transition duration-200"
							}>
							Settings
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/"
							className={({ isActive }) =>
								isActive
									? "block py-2 px-4 bg-secondary rounded-lg font-semibold transition duration-200"
									: "block py-2 px-4 hover:bg-secondary rounded-lg transition duration-200"
							}>
							Logout
						</NavLink>
					</li>
				</ul>
			</div>

			{/* Main Content */}
			<div className="w-full">
				<Outlet />
			</div>
		</div>
	);
};

export default Dashboard;
