# Server Actions and Infinite Scroll

### Learnings

1. Server Actions - Just like Normal Function that runs on server
2. We can return Data or JSX Element Also.

```ts
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
```

3. Infinite Scroll - using `react-intersection-observer`
   a) Basic Logic - As soon as Loader came into the view the `inView` property changes and using useEffect we get more data and concat that into the Data Array.

4. We can also make a parent component render as client component while childeren components renders on server side.

```jsx
"use client";

import { motion } from "framer-motion";

export const MotionDiv = motion.div;
//  Using the component
const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
};

<MotionDiv
    variants={variants}
    initial="hidden"
    animate="visible"
    transition={{
        delay: 0.25 * index,
        ease: "easeInOut",
        duration: 0.5,
    }}
    viewport={{ amount: 0 }}
    className="max-w-sm rounded relative w-full"
>
```

#### Making the animation

- opacity 0 se 1 ja rahi hai orr uske ander hamne transition daal diya hia orr delay har ek element k liye alag de rakha hai
