import { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BaseApi } from "../../utils/BaseApi";

const User = () => {
	const token = localStorage.getItem("AuthToken");
	const [userData, setUserData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const navigate = useNavigate();

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
					// Handle error by showing default values or an error message
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

	if (isLoading) {
		return <Loader />;
	}
	return (
		<div>
			<div className="flex-1 p-6">
				<div className="bg-white p-8 rounded-lg shadow-xl">
					<h1 className="text-4xl font-semibold mb-4 text-gray-800">
						Welcome,<span className="text-primary"> {userData?.userName}</span>!
					</h1>
					<p className="text-lg text-gray-600">
						Email: {userData?.email}
					</p>
					<p className="text-lg text-gray-600">
						Number: {userData?.phone}
					</p>
				</div>
			</div>
		</div>
	);
};

export default User;
