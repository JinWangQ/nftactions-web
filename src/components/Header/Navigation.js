import styled from "styled-components";

import {sizeBreakpoints} from "../../StyledComponents/Constants";

const StyledNav = styled.nav`
	display: flex;
	width: 100%;
	align-items: center;
	justify-content: space-between;
	margin-left: 20px;
	margin-right: 20px;
	padding-left: 0.75rem;
	padding-right: 0.75rem;
	@media (max-width: ${sizeBreakpoints.mobileL}) {
		margin-left: 0;
		margin-right: 0;
	}
`;

export const Navigation = ({children}) => <StyledNav>{children}</StyledNav>;
