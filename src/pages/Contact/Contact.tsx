import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { FiMapPin, FiPhone, FiMail } from "react-icons/fi"; // Importing icons

function Contact() {
	const form = useRef<HTMLFormElement | null>(null);
	const [done, setDone] = useState(false);

	const sendEmail = (e: React.FormEvent) => {
		e.preventDefault();
		if (!form.current) {
			console.error("Form reference is not available.");
			return;
		}

		emailjs
			.sendForm(
				"service_fw1aj2r",
				"template_h866lwi",
				form.current,
				"w1lyvILBFbG3awpdD"
			)
			.then(
				result => {
					console.log(result.text);
					setDone(true);
					form.current?.reset();
				},
				error => {
					console.log(error.text);
				}
			);
	};

	return (
		<main className="my-20">
			<section className="py-10">
				<div className="max-w-6xl mx-auto px-6 lg:px-8">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
						{/* Left Section */}
						<div className="space-y-6">
							<h1 className="text-4xl font-bold text-gray-800">Get in Touch</h1>
							<p className="text-gray-600">
								Fill in the form below to start a conversation with us.
							</p>
							<div className="space-y-4 text-gray-700">
								<div className="flex items-start">
									<FiMapPin className="w-6 h-6 text-teal-500 mr-4" />
									<span>
										H#147/3/C (4th Floor), Moddhopara, Meradia,
										Khilgaon-Dhaka-1219
									</span>
								</div>
								<div className="flex items-start">
									<FiPhone className="w-6 h-6 text-teal-500 mr-4" />
									<span>+880-01671940351</span>
								</div>
								<div className="flex items-start">
									<FiMail className="w-6 h-6 text-teal-500 mr-4" />
									<span>iftekhairul.islam@gmail.com</span>
								</div>
							</div>
						</div>

						{/* Right Section */}
						<form
							ref={form}
							onSubmit={sendEmail}
							className="bg-white shadow-lg rounded-lg p-8 space-y-6">
							<div className="space-y-2">
								<label className="block text-gray-700 font-medium">
									Full Name
								</label>
								<input
									type="text"
									name="user_name"
									placeholder="Enter your name"
									required
									className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-teal-500"
								/>
							</div>
							<div className="space-y-2">
								<label className="block text-gray-700 font-medium">
									Email Address
								</label>
								<input
									type="email"
									name="user_email"
									placeholder="example@gmail.com"
									required
									className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-teal-500"
								/>
							</div>
							<div className="space-y-2">
								<label className="block text-gray-700 font-medium">
									Message
								</label>
								<textarea
									name="message"
									rows={4}
									placeholder="Write your message..."
									required
									className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-teal-500"></textarea>
							</div>
							<button
								type="submit"
								className="w-full bg-teal-500 text-white py-2 rounded-md hover:bg-teal-600 focus:outline-none focus:ring focus:ring-teal-300">
								Submit
							</button>
							{done && (
								<p className="text-teal-600 text-center mt-4">
									Thanks for contacting us!
								</p>
							)}
						</form>
					</div>
				</div>
			</section>

			<section className="mt-10">
				<iframe
					src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d230909.50116511656!2d89.58961976545787!3d25.27189883989743!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fd41e4ee1618af%3A0x5c46c1ce4da21d04!2sDewanganj%20Upazila!5e0!3m2!1sen!2sbd!4v1686968447451!5m2!1sen!2sbd"
					className="w-full h-[400px] border-0 rounded-md shadow-lg"
					loading="lazy"
					referrerPolicy="no-referrer-when-downgrade"></iframe>
			</section>
		</main>
	);
}

export default Contact;
