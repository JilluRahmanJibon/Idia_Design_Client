import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BaseApi } from "../../utils/BaseApi";
import Loader from "../../components/Loader/Loader";
import { FaPlay } from "react-icons/fa";

const Portfolio = () => {
	const [datas, setDatas] = useState([]);

	useEffect(() => {
		fetch(`${BaseApi}/portfolio`)
			.then(res => res.json())
			.then(data => {
				setDatas(data?.data);
			});
	}, []);

	return (
		<main className="pb-10">
			{datas?.length < 1 ? (
				<div>
					<Loader />
				</div>
			) : (
				<section className="pt-10 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-8 p-2">
					{datas?.map((data: any) => (
						<Link
							to={`/portfolio/${data?._id}`}
							className="relative group bg-[#345965] rounded-lg overflow-hidden shadow-xl transition-transform transform hover:scale-105 hover:shadow-2xl"
							key={data?._id}>
							{/* Portfolio Image */}
							<img
								className="absolute inset-0 w-full h-full object-cover transition-all group-hover:opacity-80"
								src={data?.picture}
								alt={data?.title}
							/>

							{/* Overlay with Background Animation */}
							<div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-[#345965] to-transparent group-hover:bg-gradient-to-l transition-all duration-300">
								<div className="absolute inset-0 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 ease-out">
									{/* React Icon - FaPlay */}
									<FaPlay className="w-[50px] h-[50px] text-white opacity-30 group-hover:opacity-100 transition-all duration-300 ease-in-out" />
								</div>
							</div>

							{/* Content Overlay */}
							<div className="relative z-10 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
								<h2 className="text-3xl font-extrabold text-white leading-tight transform translate-y-10 group-hover:translate-y-0 transition-transform duration-700 ease-out">
									{data?.title}
								</h2>
								<p className="mt-3 text-lg text-gray-200">
									{data?.description}
								</p>
							</div>
						</Link>
					))}
				</section>
			)}
		</main>
	);
};

export default Portfolio;
