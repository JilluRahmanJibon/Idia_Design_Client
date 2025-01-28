const HomeBanner = () => {
	return (
		<section className="relative bg-gradient-to-r from-primary to-secondary text-white lg:py-32 py-10">
			{/* Background image or animation */}
			<div className="absolute inset-0 z-0 overflow-hidden">
				<video
					className="w-full h-full object-cover"
					autoPlay
					loop
					muted
					src="/src/assets/video/motion-video.mp4" 
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
