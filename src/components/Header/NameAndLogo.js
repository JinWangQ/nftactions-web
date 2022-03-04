import styled from "styled-components";

import {sizeBreakpoints} from "../../StyledComponents/Constants";

const StyledLink = styled.a`
	display: flex;
	text-decoration: none;
	color: #fff;
	font-size: 36px;
	text-shadow: 0 0 7px #fff, 0 0 10px #fff;
	&:hover {
		cursor: pointer;
	}
	@media (max-width: ${sizeBreakpoints.mobileL}) {
		font-size: 32px;
	}
`;

export const NameAndLogo = ({children}) => <StyledLink>{children}</StyledLink>;
