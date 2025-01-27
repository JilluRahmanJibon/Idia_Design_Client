import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

const Footer = () => {
	const currentYear = new Date().getFullYear();
	return (
		<footer className="bg-gray-900 text-gray-200 py-8">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Grid Layout */}
				<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
					{/* Office Address */}
					<div>
						<h2 className="text-lg font-bold mb-4 text-primary">
							Office Address
						</h2>
						<ul className="space-y-2 text-sm">
							<li>
								H#147/3/C (4th Floor) Moddhopara, Meradia, Khilgaon-Dhaka-1219
							</li>
							<li>
								<span className="font-bold">Support: </span>
								<a
									href="mailto:iftekhairul.islam@gmail.com"
									className="hover:text-primary">
									iftekhairul.islam@gmail.com
								</a>
							</li>
							<li>
								<span className="font-bold">Helpline: </span>
								<a href="tel:01671940351" className="hover:text-primary">
									+880-01671940351
								</a>
							</li>
							<li className="text-sm">
								(Available: Sat - Thu, 10:00 AM to 7:00 PM)
							</li>
						</ul>
					</div>

					{/* Follow Me */}
					<div>
						<h2 className="text-lg font-bold mb-4 text-primary">Follow Me</h2>
						<div className="flex space-x-4">
							<a
								href="https://www.facebook.com/iftekhairul.islam.37"
								target="_blank"
								rel="noopener noreferrer"
								className="text-2xl hover:text-primary transition-colors">
								<FaFacebook />
							</a>
							<a
								href="/"
								className="text-2xl hover:text-primary transition-colors">
								<FaInstagram />
							</a>
							<a
								href="https://www.linkedin.com/in/iftekhairul"
								target="_blank"
								rel="noopener noreferrer"
								className="text-2xl hover:text-primary transition-colors">
								<FaLinkedin />
							</a>
							<a
								href="/"
								className="text-2xl hover:text-primary transition-colors">
								<FaYoutube />
							</a>
						</div>
					</div>

					{/* Branding and Copyright */}
					<div className="flex flex-col justify-between">
						<div>
							<h2 className="text-lg font-bold text-primary italic">
								Idia Designs Motion Studio
							</h2>
							<p className="mt-2 text-sm">
								Your trusted partner for creative designs and motion graphics.
							</p>
						</div>
						<p className="text-sm text-gray-400 mt-6 lg:mt-0">
							© {currentYear} All rights reserved.
						</p>
					</div>
				</div>

				{/* Bottom Section */}
				<div className="mt-8 border-t border-gray-700 pt-4 text-center">
					<p className="text-sm text-gray-400">
						Developed with ❤️ by{" "}
						<span className="text-primary font-bold">Afia Nasrin </span>.
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
