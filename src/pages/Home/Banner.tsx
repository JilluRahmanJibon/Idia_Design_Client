const HomeBanner = () => {
	return (
		<section className="relative bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-20">
			{/* Background image or animation */}
			<div className="absolute inset-0 z-0 overflow-hidden">
				<video
					className="w-full h-full object-cover"
					autoPlay
					loop
					muted
					src="path_to_your_motion_graphics_video.mp4" // Replace with a sample motion graphic video
				/>
			</div>

			{/* Banner Content */}
			<div className="relative z-10 text-center">
				<h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-4">
					Bring Your Brand to Life with Motion Graphics
				</h1>
				<p className="text-lg md:text-xl mb-6">
					Engage your audience with captivating visuals that leave a lasting
					impression.
				</p>
				<p className="text-xl font-semibold">
					Let’s create something extraordinary together.
				</p>
			</div>
		</section>
	);
};

export default HomeBanner;
