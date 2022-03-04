import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../../Stylesheets/Carousel.scss";

import React, {useEffect, useState} from "react";
import {Carousel} from "react-responsive-carousel";
import styled from "styled-components";

import {CollectionCard} from ".";

const StyledDiv = styled.div`
	display: flex;
	padding-bottom: 20px;
	flex-direction: column;
`;

const CollectionSet = styled.div`
	display: flex;
	min-height: 350px;
`;

export const TradingPicks = ({collections}) => {
	const [collectionsSet, setCollectionsSet] = useState([]);
	const totalCollectionsCount = 12;
	const setsOnLargeScreen = 3;
	const setsOnMediumScreen = 4;
	const setsOnSmallScreen = 12;
	const screenSize = {
		large: 1280,
		medium: 768,
	};

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
				spliceCollectionIntoChunks(totalCollectionsCount / setsOnLargeScreen);
			} else if (width < screenSize.large && width >= screenSize.medium) {
				spliceCollectionIntoChunks(totalCollectionsCount / setsOnMediumScreen);
			} else if (width < screenSize.medium) {
				spliceCollectionIntoChunks(totalCollectionsCount / setsOnSmallScreen);
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
				{collectionsSet.map((collectionSet, index) => (
					<CollectionSet key={index}>
						{collectionSet.map((collection) => (
							<CollectionCard collection={collection} key={collection.name} />
						))}
					</CollectionSet>
				))}
			</Carousel>
		</StyledDiv>
	);
};
