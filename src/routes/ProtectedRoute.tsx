import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
	const token = localStorage.getItem("AuthToken");
	if (!token) {
		return <Navigate to={`/login`} replace={true} />;
	}

	return children;
};

export default ProtectedRoute;
