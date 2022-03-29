import React from "react";
import {Route, Routes} from "react-router-dom";
import {injectStyle} from "react-toastify/dist/inject-style";
import styled from "styled-components";

import {About, DashBoard, Header} from "./components";
import {backgroundColor} from "./StyledComponents/Constants";

const StyledDiv = styled.div`
	height: 100vh;
	background-color: ${backgroundColor};
`;

if (typeof window !== "undefined") {
	injectStyle();
}
const App = () => (
	<StyledDiv>
		<Header />
		<Routes>
			<Route exact path="/" element={<DashBoard />} />
			<Route path="/about" element={<About />} />
		</Routes>
	</StyledDiv>
);

export default App;
