"use server";

import AnimeCard, { AnimeProp } from "@/components/AnimeCard";

export async function getData(page: number) {
	const data = await fetch(
		`https://shikimori.one/api/animes?page=${page}&limit=20&order=popularity&rating=rx`
	);
	const res = await data.json();

	console.log(res);
	//DElay is only applying to a portion of the cards kyoki delay ki value phle hi provide kar di hai
	return res?.map((item: AnimeProp, index: number) => (
		<AnimeCard key={item.id} anime={item} index={index} />
	));
}
