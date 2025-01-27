import { Outlet } from "react-router-dom";
import Navbar from "../shared/Navbar/Navbar";
import Footer from "../shared/Footer/Footer";

const MainLayout = () => {
	return (
		<div>
			<div>
				<Navbar />
			</div>
			<Outlet />

			<div>
				<Footer />
			</div>
		</div>
	);
};

export default MainLayout;
