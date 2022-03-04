import styled from "styled-components";

import {sizeBreakpoints} from "../../StyledComponents/Constants";

const StyledDiv = styled.div`
	padding-left: 5px;
	@media (max-width: ${sizeBreakpoints.mobileL}) {
		padding: 2px;
	}
`;

export const SocialMediaIcons = ({children}) => (
	<StyledDiv>{children}</StyledDiv>
);
