import styled from "styled-components";

import {boardBackgroundColor} from "../../StyledComponents/Constants";

const StyledDiv = styled.div`
	display: flex;
	background-color: ${boardBackgroundColor};
	overflow: auto;
	margin-top: ${(props) => props.marginTop};
	flex-direction: column;
	padding-bottom: ${(props) => props.paddingBottom};
	padding-top: ${(props) => props.paddingTop};
`;

export const SocialPicks = ({
	children,
	marginTop,
	paddingBottom,
	paddingTop,
}) => (
	<StyledDiv
		marginTop={marginTop}
		paddingBottom={paddingBottom}
		paddingTop={paddingTop}
	>
		{children}
	</StyledDiv>
);
