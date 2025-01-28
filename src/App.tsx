import { useEffect, useState } from "react";
import MainLayout from "./layout/MainLayout";
import GoToTop from "./utils/GoToTop";
import axios from "axios";
import { BaseApi } from "./utils/BaseApi";
import { useUser } from "./context/UserContext";
import Loader from "./components/Loader/Loader";

function App() {
	const {user, setUser } = useUser();
	const [loading, setLoading] = useState(true);
	const token = localStorage.getItem("AuthToken");

	useEffect(() => {
		if (token) {
			const fetchUserData = async () => {
				try {
					const response = await axios.get(`${BaseApi}/users/me`, {
						headers: {
							Authorization: `${token}`,
							"Content-Type": "application/json",
						},
					});

					setUser(response.data.data);
				} catch (error) {
					console.error("Failed to fetch user data:", error);
				} finally {
					setLoading(false);
				}
			};

			fetchUserData();
		} else {
			setLoading(false);
		}
	}, [token, user, setUser]);

	
	if (loading) {
		return <Loader />;
	}

	return (
		<div>
			<div className="sticky top-[85%] z-50">
				<GoToTop />
			</div>
			<MainLayout />
		</div>
	);
}

export default App;
