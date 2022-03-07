import styled from "styled-components";

import {
	bentoBoxRed,
	boardBackgroundColor,
	sizeBreakpoints,
} from "../../StyledComponents/Constants";

const StyledDiv = styled.div`
	background-color: ${boardBackgroundColor};
	border-radius: 5px;
	width: 290px;
	min-width: 290px;
	height: 320px;
	padding: 10px;
	margin: 10px 25px;
	margin-right: 0px;

	@media (max-width: ${sizeBreakpoints.laptopM}) {
		width: 290px;
		margin: auto;
	}

	@media (max-width: ${sizeBreakpoints.tablet}) {
		min-width: 235px;
		margin: 10px 10px;
	}

	@media (max-width: ${sizeBreakpoints.mobileL}) {
		min-width: 300px;
		margin: auto;
	}
`;

const StyledDivForImg = styled.div`
	text-align: center;
	min-height: 210px;
`;

const StyledDivForCollectionImg = styled.img`
	width: 180px !important;
	height: auto;
	border-radius: 9px;
	margin: 10px;
`;

const CollectionName = styled.div`
	height: 30px;
	color: #fff;
	text-shadow: 0 0 5px #fff;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	font-size: 20px;
`;

const CollectionNameAndETH = styled.div`
	display: flex;
	justify-content: space-between;
	flex-direction: column;
`;

const Sold = styled.div``;

const Owners = styled.div``;

const SoldAndOwners = styled.div`
	color: #fff;
	text-shadow: 0 0 5px #fff;
	display: flex;
	justify-content: space-between;
	font-size: 16px;
`;
const ETH = styled.div`
	color: #fff;
	text-shadow: 0 0 5px #fff;
	align-self: flex-end;
	font-size: 16px;
`;
const Logo = styled.div`
	width: 30px;
	height: 30px;
	min-height: 30px;
	min-width: 30px;
	border-radius: 50%;
	background-color: ${bentoBoxRed};
	margin-right: 5px;
`;
const LogoAndName = styled.div`
	display: flex;
`;
const CollectionImg = ({img, alt}) => (
	<StyledDivForImg>
		<StyledDivForCollectionImg src={img} alt={alt} />
	</StyledDivForImg>
);
const Rank = styled.div`
	color: #fff;
	text-shadow: 0 0 5px #fff;
	align-self: flex-start;
	font-size: 16px;
`;
const RankAndETH = styled.div`
	display: flex;
	justify-content: space-between;
	padding-bottom: 3px;
`;

export const CollectionCard = ({collection, rank}) => {
	const eth = Math.pow(10, 9);
	return (
		<StyledDiv>
			<CollectionNameAndETH>
				<RankAndETH>
					<Rank>Rank {rank}</Rank>
					<ETH>{collection.total_sales_in_gwei / eth}ETH</ETH>
				</RankAndETH>
				<LogoAndName>
					<Logo></Logo>
					<CollectionName title={collection.name}>
						{collection.name}
					</CollectionName>
				</LogoAndName>
			</CollectionNameAndETH>
			<CollectionImg img={collection.image_url} alt={collection.name} />
			<SoldAndOwners>
				<Sold>{collection.count} sold</Sold>
				<Owners>456 owners</Owners>
			</SoldAndOwners>
		</StyledDiv>
	);
};
