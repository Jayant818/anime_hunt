"use client";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { getData } from "@/app/getData.action";
import AnimeCard, { AnimeProp } from "./AnimeCard";

let page = 2;
let res: any = [];

export type AnimeCard = JSX.Element;

function LoadMore() {
	// ye ek hook hai to use client use karna padega
	const { ref, inView } = useInView();

	const [data, setData] = useState<AnimeCard[]>([]);

	useEffect(() => {
		async function fetchData(page: number) {
			res = await getData(page);
			setData([...data, ...res]);
			page++;
		}
		if (inView) {
			fetchData(page);
		}
	}, [inView, data]);

	return (
		<>
			{/*  yaha pe kya ho raha hai ki isme eventually bohot sare element ho jayege to delay bohot jayda ho jayega  to usko rokne k liye kya kar sakte hai ??*/}
			{/* solution kya hai ki har ek call pe hame bane banaye element mil jaye or unki index bhi kam hoga orr wo hum yaha state mai store kar le  */}
			{/* <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
				{data?.map((item: AnimeProp, index: number) => (
					<AnimeCard key={item.id} anime={item} index={index} />
				))}
			</section> */}
			<section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
				{data}
			</section>
			<section className="flex justify-center items-center w-full ">
				<div ref={ref}>
					<Image
						src="./spinner.svg"
						alt="spinner"
						width={56}
						height={56}
						className="object-contain"
					/>
				</div>
			</section>
		</>
	);
}

export default LoadMore;
