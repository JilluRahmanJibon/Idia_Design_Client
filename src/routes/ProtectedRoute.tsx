import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "../context/UserContext";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
	const { user } = useUser();
	const location = useLocation();
	const token = localStorage.getItem("AuthToken");
	if (!token && !user?.email) {
		return <Navigate to={`/login`} state={{ from: location }} replace />;
	}

	return children;
};

export default ProtectedRoute;
