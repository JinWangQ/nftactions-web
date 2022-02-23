import React, {useEffect, useState} from "react";
import styled from "styled-components";

import {Board, TradingSummaryChart} from "./";

const StyledDiv = styled.div`
	display: flex;
	height: 460px;
`;

export const TradingPicks = ({collections}) => {
	const [currentCollectionIndex, setCurrentCollectionIndex] = useState(0);

	useEffect(() => {
		setCurrentCollectionIndex(0);
	}, []);

	const getChartData = () => {
		const names = collections.map(
			(filteredCollection) => filteredCollection.name
		);
		const saleCounts = collections.map((filteredCollection) =>
			parseInt(filteredCollection.count)
		);
		return {
			labels: names,
			datasets: [
				{
					label: "Number of sales",
					data: saleCounts,
					backgroundColor: "rgba(24,104,182,1)",
					borderWidth: 1,
				},
			],
		};
	};

	const updateSelectedCollection = (index) => {
		if (index !== currentCollectionIndex) setCurrentCollectionIndex(index);
	};

	const chartData = getChartData();

	return (
		<StyledDiv>
			<TradingSummaryChart
				chartData={chartData}
				updateSelectedCollection={updateSelectedCollection}
			/>
			<Board
				currentCollection={
					collections ? collections[currentCollectionIndex] : null
				}
				rank={currentCollectionIndex + 1}
			/>
		</StyledDiv>
	);
};
