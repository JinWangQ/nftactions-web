import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import styled from "styled-components";

import {bentoBoxRed, sizeBreakpoints} from "./Constants";

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
	color: ${(props) => props.iconcolor || bentoBoxRed};
	margin: 3px;
	padding: 10px;
	align-self: ${(props) => (props?.alignself ? props?.alignself : "stretch")};
	&:hover {
		cursor: pointer;
	}
	@media (max-width: ${sizeBreakpoints.mobileL}) {
		padding: 1px;
		width: 20px;
		height: 20px;
	}
`;

export const StyledIcon = (props) => (
	<StyledFontAwesomeIcon size="2x" {...props} />
);
