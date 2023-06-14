import React from "react";
import { cardsAPI } from "../redux/services/cardsAPI";

const Cards = () => {
	const { data, error, isLoading } = cardsAPI.useFetchAllCardsQuery();

	return (
		<div className="cards">
			{isLoading ? (
				<Loader />
			) : error ? (
				<SomeErrorComponent text={error} />
			) : (
				data?.map((item, i) => (
					<Card key={i} title={item.title} text={item.text} />
				))
			)}
		</div>
	);
};

export default Cards;
