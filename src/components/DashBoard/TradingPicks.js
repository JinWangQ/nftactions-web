import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../../Stylesheets/Carousel.scss";

import React, {useEffect, useState} from "react";
import {Carousel} from "react-responsive-carousel";
import styled from "styled-components";

import {picksOnScreen, screenSize} from "../../StyledComponents/Constants";
import {CollectionCard} from ".";

const StyledDiv = styled.div`
	display: flex;
	padding-bottom: 20px;
	flex-direction: column;
`;

const CollectionSet = styled.div`
	display: flex;
	min-height: 350px;
	justify-content: space-around;
`;

export const TradingPicks = ({collections}) => {
	const [collectionsSet, setCollectionsSet] = useState([]);
	const totalCollection = 12;

	useEffect(() => {
		const spliceCollectionIntoChunks = (chunkSize) => {
			const splicedArray = [];
			const collectionArray = [...collections];
			while (collectionArray.length > 0) {
				const chunk = collectionArray.splice(0, chunkSize);
				splicedArray.push(chunk);
			}
			setCollectionsSet(splicedArray);
		};

		const handleResize = () => {
			const width = Number(window.innerWidth);
			if (width >= screenSize.large) {
				spliceCollectionIntoChunks(picksOnScreen.large);
			} else if (width < screenSize.large && width >= screenSize.medium) {
				spliceCollectionIntoChunks(picksOnScreen.medium);
			} else if (width < screenSize.medium) {
				spliceCollectionIntoChunks(picksOnScreen.small);
			}
		};

		window.addEventListener("resize", handleResize);
		handleResize();

		return () => window.removeEventListener("resize", handleResize);
	}, [collections, screenSize.large, screenSize.medium]);

	return (
		<StyledDiv>
			<Carousel
				emulateTouch={true}
				showArrows={false}
				showStatus={false}
				showThumbs={false}
			>
				{collectionsSet.map((collectionSet, setIndex) => (
					<CollectionSet key={setIndex}>
						{collectionSet.map((collection, collectionIndex) => (
							<CollectionCard
								collection={collection}
								key={collection.name}
								rank={
									(setIndex * totalCollection) / collectionsSet.length +
									(collectionIndex + 1)
								}
							/>
						))}
					</CollectionSet>
				))}
			</Carousel>
		</StyledDiv>
	);
};
