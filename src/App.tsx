import MainLayout from "./layout/MainLayout";
import GoToTop from "./utils/GoToTop";

function App() {
	return (
		<div>
			<div className="sticky  top-[85%]  z-50 ">
				<GoToTop />
			</div>
			<MainLayout />
		</div>
	);
}

export default App;
