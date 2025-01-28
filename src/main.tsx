import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/Route.tsx";
import { Toaster } from "sonner";
import { UserProvider } from "./context/UserContext.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<UserProvider>
			<RouterProvider router={router} />
			<Toaster />
		</UserProvider>
	</StrictMode>
);
