import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { cardsAPI } from "../redux/services/cardsAPI";
import { fileAPI } from "../redux/services/fileAPI";

const Card = () => {
	let { id } = useParams();
	const [skip, setSkip] = useState(true);
	const [name, setName] = useState(true);

	const { card, error, isLoading } = cardsAPI.useFetchProjectQuery(
		{ id },
		{
			selectFromResult: ({ data, error, isLoading }) => {
				return {
					card: data?.cards[0],
					error: error,
					isLoading: isLoading,
				};
			},
			skip,
		}
	);

	const [getFile, {}] = siteAPI.useGetFileMutation();

	const [
		editCard,
		{
			error: editError,
			isError: isEditError,
			isLoading: isEditLoading,
			isSuccess: isEditSuccess,
			reset: resetEditResult,
		},
	] = cardsAPI.useEditCardMutation();

	useEffect(() => {
		if (id) {
			setSkip(false);
		}
	}, [id]);

	const onCloseModal = () => {
		resetEditResult();
	};

	const onEditCard = (e) => {
		e.preventDefault();
		if (name) {
			const body = {
				name: name,
			};

			editCard({ body });
			// editCard(body).unwrap();
		}
	};

	const getFileHadle = async () => {
		if (id) {
			const url = await getFile({ id });
			const link = document.createElement("a");
			link.setAttribute("href", url?.data);
			link.setAttribute("download", `fileName.html`);

			// Append to html link element page
			document.body.appendChild(link);

			// Start download
			link.click();

			// Clean up and remove the link
			link.parentNode.removeChild(link);
		}
	};

	return (
		<>
			{isLoading ? (
				<Loader />
			) : error ? (
				<SomeErrorComponent text={error} />
			) : (
				<div className="card">
					<h2>{card?.title}</h2>
					<p>{card?.text}</p>
				</div>
			)}
		</>
	);
};

export default Card;
