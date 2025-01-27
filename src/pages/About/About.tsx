
function About() {
	return (
		<main>
			<div className="px-6 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
				<div className="max-w-xl sm:mx-auto lg:max-w-2xl text-center">
					<div className="mb-10">
						<p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-300 uppercase bg-teal-500 rounded-full">
							Idia Designs
						</p>
						<h2 className="max-w-lg mb-6 font-sans text-4xl font-bold leading-none tracking-tight text-gray-900 sm:text-5xl md:mx-auto">
							<span className="relative inline-block">
								<span className="relative text-teal-600">Welcome</span>
							</span>{" "}
							to Our Website
						</h2>
						<p className="text-base text-gray-700 md:text-lg">
							Your one-stop destination for cutting-edge creative services. We
							specialize in 3D animation, motion graphics, video editing,
							graphic design, and web development solutions, delivering
							high-quality, visually stunning content worldwide.
						</p>
					</div>
				</div>
				<div className="grid gap-16 row-gap-10 lg:grid-cols-2">
					<div className="space-y-8">
						<div>
							<h3 className="mb-4 text-xl font-medium text-gray-800">
								At Our Core: Storytellers
							</h3>
							<p className="text-gray-600">
								We believe every brand, product, or idea has a unique story
								worth sharing. Using 3D animation and motion graphics, we craft
								immersive narratives to captivate and inspire your audience.
							</p>
						</div>
						<div>
							<h3 className="mb-4 text-xl font-medium text-gray-800">
								Expertise in Video Editing
							</h3>
							<p className="text-gray-600">
								From corporate videos to feature films, our editing transforms
								raw footage into compelling narratives that bring your vision to
								life on the screen.
							</p>
						</div>
						<div>
							<h3 className="mb-4 text-xl font-medium text-gray-800">
								Graphic Design That Stands Out
							</h3>
							<p className="text-gray-600">
								From branding and logo design to packaging and print, we create
								visuals that make a lasting impression, ensuring your message
								resonates.
							</p>
							<p className="mt-4 text-gray-600">
								Explore our website to learn more, view our portfolio, and
								discuss how we can turn your ideas into reality.
							</p>
						</div>
					</div>
					<div className="space-y-8">
						<div>
							<h3 className="mb-4 text-xl font-medium text-gray-800">
								Strong Online Presence
							</h3>
							<p className="text-gray-600">
								We offer comprehensive web development services to ensure your
								website is visually appealing, user-friendly, and optimized for
								search engines. Let’s establish your identity online.
							</p>
						</div>
						<div>
							<h3 className="mb-4 text-xl font-medium text-gray-800">
								Commitment to Quality
							</h3>
							<p className="text-gray-600">
								Your satisfaction is our priority. We work closely with you
								through every stage of the creative process to exceed your
								expectations and leave a lasting impact.
							</p>
						</div>
						<div>
							<h3 className="mb-4 text-xl font-medium text-gray-800">
								Collaboration for Every Scale
							</h3>
							<p className="text-gray-600">
								Whether you’re a small business, marketing agency, or production
								company, we bring expertise, passion, and creativity to handle
								projects of any complexity.
							</p>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}

export default About;
