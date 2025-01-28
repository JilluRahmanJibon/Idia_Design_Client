import { useUser } from "../../context/UserContext";

const User = () => {
	const { user } = useUser();

	return (
		<div>
			<div className="flex-1 p-6">
				<div className="bg-white p-8 rounded-lg shadow-xl">
					<h1 className="text-4xl font-semibold mb-4 text-gray-800">
						Welcome,<span className="text-primary"> {user?.userName}</span>!
					</h1>
					<p className="text-lg text-gray-600">Email: {user?.email}</p>
					<p className="text-lg text-gray-600">Number: {user?.phone}</p>
				</div>
			</div>
		</div>
	);
};

export default User;
