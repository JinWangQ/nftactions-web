import {faTelegram, faTwitter} from "@fortawesome/free-brands-svg-icons";
import {Link} from "react-router-dom";
import styled from "styled-components";

import {StyledIcon} from "../../StyledComponents";
import {
	bentoBoxRed,
	boardBackgroundColor,
	sizeBreakpoints,
} from "../../StyledComponents/Constants";
import {NameAndLogo, Navigation, SocialMediaIcons} from ".";

const StyledHeader = styled.header`
	display: flex;
	align-items: center;
	position: relative;
	background-color: ${boardBackgroundColor};
	@media (max-width: ${sizeBreakpoints.mobileL}) {
		padding: 0.5rem 0;
	}
`;

const CollectionLogo = styled.div`
	background-color: ${bentoBoxRed};
	width: 48px;
	height: 48px;
	border-radius: 50%;
	margin-top: 5px;
	margin-right: 5px;
	text-align: center;
	font-size: 15px;
	@media (max-width: ${sizeBreakpoints.mobileL}) {
		width: 40px;
		height: 40px;
	}
`;

const StyledSecondaryNav = styled.div`
	display: flex;
`;

const StyledLink = styled(Link)`
	display: flex;
	text-decoration: none;
	color: #fff;
	font-size: 18px;
	text-shadow: 0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff;
	margin-left: 20px;
	&:hover {
		cursor: pointer;
	}
	@media (max-width: ${sizeBreakpoints.mobileL}) {
		font-size: 12px;
	}
`;

export const Header = () => (
	<StyledHeader>
		<Navigation>
			<NameAndLogo>
				<CollectionLogo></CollectionLogo>
				Bento
			</NameAndLogo>
			<StyledSecondaryNav>
				<StyledLink to="/">Dashboard</StyledLink>
				<StyledLink to="/about">About</StyledLink>
			</StyledSecondaryNav>
			<SocialMediaIcons>
				<StyledIcon icon={faTwitter} iconcolor={"#0088cc"} />
				<StyledIcon icon={faTelegram} iconcolor={"#1d9bf0"} />
			</SocialMediaIcons>
		</Navigation>
	</StyledHeader>
);
