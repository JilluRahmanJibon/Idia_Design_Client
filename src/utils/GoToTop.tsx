import { useEffect, useState } from "react";
import { BsArrowUpCircle } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";

const GoToTop = () => {
	const [isVisible, setIsVisible] = useState(false);

	const goToBtn = () => {
		window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
	};

	const listenToScroll = () => {
		const threshold = 250;
		const windScroll =
			document.body.scrollTop || document.documentElement.scrollTop;
		setIsVisible(windScroll > threshold);
	};

	useEffect(() => {
		window.addEventListener("scroll", listenToScroll);
		return () => window.removeEventListener("scroll", listenToScroll);
	}, []);

	return (
		<div className="fixed bottom-8 right-8 z-50">
			<AnimatePresence>
				{isVisible && (
					<motion.button
						onClick={goToBtn}
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.9 }}
						transition={{ duration: 0.3 }}
						className="flex items-center justify-center bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white px-4 py-2 rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
						<BsArrowUpCircle className="mr-2 w-6 h-6" />
						<span className="text-sm font-semibold">Go to Top</span>
					</motion.button>
				)}
			</AnimatePresence>
		</div>
	);
};

export default GoToTop;
