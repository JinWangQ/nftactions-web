import {faRetweet, faSpinner} from "@fortawesome/free-solid-svg-icons";
import {Fragment, useEffect, useState} from "react";
import {TwitterTweetEmbed} from "react-twitter-embed";
import styled, {keyframes} from "styled-components";

import {getData, getTweetsByQuery} from "../../Scripts/Axios/axiosRequests";
import {baseUrl} from "../../Scripts/Constants";
import {StyledIcon} from "../../StyledComponents";
import {
	picksOnScreen,
	screenSize,
	sizeBreakpoints,
} from "../../StyledComponents/Constants";
import {SocialPicks, TradingPicks} from ".";

const StyledMain = styled.main`
	height: 100%;
	margin-top: 10px;
`;

const StyleTweetWrapper = styled.div`
	overflow: auto;
	max-height: 270px;
	border-radius: 12px;
`;

const TweetsSection = styled.div`
	flex-direction: row;
	display: flex;
	justify-content: space-around;
`;

const ripple = keyframes`
	0% {
    	background-color: #343a40;
  	}

  	50% {
    	background-color: #0b090a;
  	}

  	100% {
   		background-color: #343a40;
  	}
`;

const TweetPlaceholder = styled.div`
	width: 250px;
	height: 270px;
	margin-top: 10px;
	margin-bottom: 10px;
	animation: 1.5s ease-in-out ${ripple} infinite;
	animation-delay: 0s;
	border-radius: 12px;
`;

const TitleWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	padding-left: 40px;
	padding-right: 40px;
`;
const Title = styled.div`
	text-shadow: 0 0 5px #fff;
	color: #fff;
	font-size: 28px;
	align-self: center;
	@media (max-width: ${sizeBreakpoints.mobileL}) {
		font-size: 20px;
	}
`;

export const DashBoard = () => {
	const saleCountCutoff = 1;
	const numberOfCollectionsToShow = 12;
	// mock using 10
	const tweetsPerFetch = 24;
	const tweetsWhitelistPerFetch = 96;
	const whiteListMint = "whitelist mint";
	const [data, setData] = useState({data: []});
	const [collections, setCollections] = useState([]);
	const [tweetArrayIndex, setTweetArrayIndex] = useState(0);
	const [tweetIndex, setTweetIndex] = useState(0);
	const [exit, setExit] = useState(1);
	const [currentPageForWhitelist, setCurrentPageForWhitelist] = useState(0);
	const [currentAllTweetsWhitelist, setCurrentAllTweetsWhitelist] = useState(
		[]
	);
	const [currentNextTokenWhitelist, setCurrentNextTokenWhitelist] =
		useState("");
	const [currentAllTweets, setCurrentAllTweets] = useState([]);
	const [currentNextTokens, setCurrentNextTokens] = useState("");
	const [picksCount, setPicksCount] = useState(null);

	useEffect(() => {
		let counts;
		const handleResize = () => {
			const width = Number(window.innerWidth);
			if (width >= screenSize.large) {
				counts = picksOnScreen.large;
			} else if (width < screenSize.large && width >= screenSize.medium) {
				counts = picksOnScreen.medium;
			} else if (width < screenSize.medium) {
				counts = picksOnScreen.small;
			}
			setPicksCount(counts);
		};

		async function fetchData() {
			// mock collection summary will be placed here
			const response = await new Promise((resolve) =>
				setTimeout(
					resolve({
						collections: [
							{
								name: "SwampCatz",
								count: 45,
								total_sales_in_gwei: 269000000,
								image_url:
									"https://lh3.googleusercontent.com/x4797RjqbbPsmvdcpcVMU0sVLW0IC6o7vroz4Q3CPhIAgwYRLek673amMKAcCeNm222wua1ohwb2F3IvaPzgiXv2gHj5zWbS5ENk=s120",
								created_date: "2022-03-13T16:01:35.252631Z",
								distinct_buyers: 23,
							},
							{
								name: "Omni Mosquitoes (ETH)",
								count: 43,
								total_sales_in_gwei: 2723689990,
								image_url:
									"https://lh3.googleusercontent.com/Z8AaDOraag4zfpkt3a7EUGORvK9ReU-O_AoJp7mPSeOUozkrXlR-CQAsiT44CdgEXE5MnK09m9sJQKOnubr-kRzNWZSHcaeHTNfL=s120",
								created_date: "2022-04-12T09:42:14.422765Z",
								distinct_buyers: 33,
							},
							{
								name: "Cool Kids Walk (Official)",
								count: 36,
								total_sales_in_gwei: 1096600000,
								image_url:
									"https://lh3.googleusercontent.com/AKsKK2iNwREk542TWGPv5wAXTVaYJwjZacsNjTrDRt3th57D7frMm71giTQ7swrHi8ENEXkoSHAjzsTQZU9h4zAK4zioJ-h4sex-UQ=s120",
								created_date: "2022-04-11T11:49:13.027268Z",
								distinct_buyers: 31,
							},
							{
								name: "Forest Spirits  by  ZENFT",
								count: 29,
								total_sales_in_gwei: 3298589800,
								image_url:
									"https://lh3.googleusercontent.com/ZKujAXVFIzvgS4j_3Z2uF7-keeDLrQwR-e8z9f15ro9bAL2P0oZJxZwAUO0Oj-TMJ2YnUJlcGyimbyDJgrH1OBj2_DOaimiTvyGdcg=s120",
								created_date: "2022-04-08T18:47:14.962655Z",
								distinct_buyers: 20,
							},
							{
								name: "Fools NFT",
								count: 20,
								total_sales_in_gwei: 1699700000,
								image_url:
									"https://lh3.googleusercontent.com/8xiaUQJMo8LI4dINeldbpPDrzfb5GJfsYQoumIf2u4GnQjrL67DdMpxraHTCwH23dN4B3Fsl4f6lixrqeNO_jCarky1Wy6ZfblpjWoA=s120",
								created_date: "2022-04-11T11:06:06.128249Z",
								distinct_buyers: 18,
							},
							{
								name: "Remember~Me",
								count: 13,
								total_sales_in_gwei: 112299897,
								image_url:
									"https://lh3.googleusercontent.com/MahyAXs_V9mfPhjn6FYcRFuCTBqs3-TT1ZoO1O8DZLbkEnR4e5S1u8BHbLOvVRw_pDTOtW4FAZLeffIw1kXqhAWA1KXz3TdcGyf11A=s120",
								created_date: "2022-04-11T14:46:32.323997Z",
								distinct_buyers: 6,
							},
							{
								name: "Scott Kelly: Dreams Out of This World, Postcards from Space Collection",
								count: 11,
								total_sales_in_gwei: 582999999,
								image_url:
									"https://lh3.googleusercontent.com/dWwyaEelR0Za-3MLCkb6EVDodpVTlwdQrmQAIVuzEehzJQOIRzGIlZVq7j0ZOi6hqsOGL18ig7mg7DEApnVjv4Rqnggk_YQl_jXV=s120",
								created_date: "2022-04-06T01:00:21.506529Z",
								distinct_buyers: 10,
							},
							{
								name: "Omni Mosquitoes (POLY)",
								count: 10,
								total_sales_in_gwei: 274989000,
								image_url:
									"https://lh3.googleusercontent.com/8HPcwybwYQaA7IWPwOTGGFFSRLINgEk5c9_qTCkQqmuKwf6KFSZXOZ_zlEN1cwAQkKROjRYzWfCvexxnWs88Fhnm4eiZpvuMhbh2=s120",
								created_date: "2022-04-12T09:15:25.497475Z",
								distinct_buyers: 7,
							},
							{
								name: "Aki Story",
								count: 10,
								total_sales_in_gwei: 1588400000,
								image_url:
									"https://lh3.googleusercontent.com/XIAG1mqxOQgv02qtOXDjwVEmy6ZexNbS74SgM7JgjHou6UOKY6vTSEBFeKcJIAgLlybHSmVf_UfnEompHP7NBDHkeRftZiDa4GB4yQ=s120",
								created_date: "2022-04-09T14:03:03.140319Z",
								distinct_buyers: 9,
							},
							{
								name: "tiny dinos (eth)",
								count: 9,
								total_sales_in_gwei: 3883388880,
								image_url:
									"https://lh3.googleusercontent.com/sTFA4ju5Wkw9xU5Y3gfWWehRfIB0BtW4Sf_z4xnRQrPqt7ChvyrWd6kKNn6sFInyIn91rBOKlYwZA6APr33bj1muz-bXlR6CC1js=s120",
								created_date: "2022-04-05T21:56:39.594458Z",
								distinct_buyers: 9,
							},
							{
								name: "Official Plowieverse",
								count: 9,
								total_sales_in_gwei: 14540000,
								image_url:
									"https://lh3.googleusercontent.com/eYKlC2bRzfoVbU-0KvU_S-Qb51SChE6viKbd7uubgvCZPz448bYMo_eY1hcKQM4muOQYjo9TeCYdbMVIUAg588v3FYtsIQZalLYG=s120",
								created_date: "2022-04-08T09:03:43.831799Z",
								distinct_buyers: 2,
							},
							{
								name: "OmniDoors",
								count: 9,
								total_sales_in_gwei: 41300000,
								image_url:
									"https://lh3.googleusercontent.com/Xbp63PJTgIyS6OL2ui1hW0S3k6_hVXDf2OiLZCWRD_sy-ceXRNEkFAsUenx0V0grDs13JxSfo_zcwis9QTNowauin6s86DC3rDSn=s120",
								created_date: "2022-04-12T20:21:13.926766Z",
								distinct_buyers: 2,
							},
							{
								name: "The Lobstars",
								count: 8,
								total_sales_in_gwei: 1395000000,
								image_url:
									"https://lh3.googleusercontent.com/aDiMBuR5mgkI0rcYNqKl5jjFLuIMBQ-b7k2mxAX5gm2Is132Ot4FQEZHDuNSoQ8peIjmyq4LB1a-_vY3CDGOoEtKCg3AOgNYlC2tBV4=s120",
								created_date: "2022-04-09T22:42:43.763902Z",
								distinct_buyers: 7,
							},
							{
								name: "SunCity Ape Club",
								count: 8,
								total_sales_in_gwei: 16000000,
								image_url:
									"https://lh3.googleusercontent.com/ZxtJxpKB3uTVGxexorYgQ-PriZNrFQKTSQKUkmix7dM68zXY0qzxOeXFiX8yxkEKVYXrs1RI62xHr8J0SS-lUqeDWlSsubN2wgbv2Q=s120",
								created_date: "2022-03-27T12:55:43.998176Z",
								distinct_buyers: 5,
							},
							{
								name: "Dajo Cat",
								count: 7,
								total_sales_in_gwei: 11900000,
								image_url:
									"https://lh3.googleusercontent.com/AFlG1S3uNTF85Zh5n43qJylVy2W9yD6ty2Fy0H0MGzw4FjGzDSmpvnpOAdHz2K6h3Res0TS5_5NLH84rKRO2CEWMbg85uznmM15J4A=s120",
								created_date: "2022-04-09T06:33:14.651938Z",
								distinct_buyers: 3,
							},
							{
								name: "TPL Mecha Part",
								count: 7,
								total_sales_in_gwei: 1628000000,
								image_url:
									"https://lh3.googleusercontent.com/PR9v4eDzDzVz2451XBmTCugQeqRmr3L4kGbk47KmtOdINXHbF0Wt_hNY9AtsA6kwoqc-tYkujrF0qcCHlaQ5wRkcC5wlol77r3jJBQ=s120",
								created_date: "2022-04-12T23:40:21.896405Z",
								distinct_buyers: 5,
							},
							{
								name: "The Art of Seasons",
								count: 7,
								total_sales_in_gwei: 5524000000,
								image_url:
									"https://lh3.googleusercontent.com/wRpNOK_6qKV-cdvagJbo-7KBtHpU64X2IQXzEvyx8gTIy3MRlzyAuCJ87Hjf3wErneE8vrViwDLLz3fdyTSYEAmAMug1SqdGe7p9djQ=s120",
								created_date: "2022-03-24T11:56:01.120315Z",
								distinct_buyers: 7,
							},
							{
								name: "Stoned Apes Club",
								count: 7,
								total_sales_in_gwei: 25000000,
								image_url:
									"https://lh3.googleusercontent.com/vke8eM8H9jPCg0UMe70VDjp1u18OsPb3EThe1KRIxHKf_FeipT0KjjUaw793xmjRzwqRmqjUao-JfAueGcKX3AQN6he_9OTGJLNjew=s120",
								created_date: "2022-04-11T21:21:11.826996Z",
								distinct_buyers: 7,
							},
							{
								name: "New World Order - NWO",
								count: 6,
								total_sales_in_gwei: 304800000,
								image_url:
									"https://lh3.googleusercontent.com/OefniGof91-cArSxbJPGn4G7T7yG7bJeMOfZGNUxUWUznrI5QUP1ldT_KyJarr2lfdEC9eoIA26XVfjS2IT2Z5sCVS_fP1JivzBY=s120",
								created_date: "2022-01-26T22:14:17.438291Z",
								distinct_buyers: 1,
							},
							{
								name: "Sipherian Surge",
								count: 6,
								total_sales_in_gwei: 1280900000,
								image_url:
									"https://lh3.googleusercontent.com/-V0eEOrC5W9AcbS_tvv_Ew9zp-Gf5WLS0WNdBGhd2b9CKVjO2IMDUsbN5uEzwxRuLpR_AiUU_TDfANQuh9uO-auOxW5Cdu435MFcKg=s120",
								created_date: "2021-09-06T15:55:37.695271Z",
								distinct_buyers: 1,
							},
							{
								name: "Loner Girl",
								count: 6,
								total_sales_in_gwei: 176900000,
								image_url:
									"https://lh3.googleusercontent.com/spdosskO3JQ_04wl8wKE9OMdVoO96S72kiclwDgp6XBiqXVy2BlCVniZ2TNxtcF9fcIbpQmSvPT5_LEEvsoTYA9MD47uNsVMhyHSm2w=s120",
								created_date: "2022-03-01T03:17:26.572776Z",
								distinct_buyers: 6,
							},
							{
								name: "Los Muertos World",
								count: 5,
								total_sales_in_gwei: 5633000000,
								image_url:
									"https://lh3.googleusercontent.com/03rOENpWzSj8fNy8F53vxnJkcGT1Al7mPGG30xg88FLiYX2xPHGFiWQqrPvz20y_rVrPXB0hK-CkoNTXaHzfzJE3ajAhKEijvI-6fQ=s120",
								created_date: "2022-04-03T07:47:28.520564Z",
								distinct_buyers: 5,
							},
							{
								name: "Kureiji NFT Official",
								count: 4,
								total_sales_in_gwei: 341400000,
								image_url:
									"https://lh3.googleusercontent.com/zenT-HOEa_NtAlD_6tgO59Q8Ey74BOl4sq4Z6vO2Mr-tlBskAA7OEtwRnHwrR7I4eKB83fI1ers-GRKxqR4Jl3AGnZ44tsxvcUyPYw=s120",
								created_date: "2022-04-08T16:05:40.568996Z",
								distinct_buyers: 4,
							},
							{
								name: "Quacky Ducks Official NFT",
								count: 4,
								total_sales_in_gwei: 169000000,
								image_url:
									"https://lh3.googleusercontent.com/hpkQ9uRu-CdBqsNtdcHgGbRDqCBg_6zxQWW2zyqaBNcUDUHsYld9yoznVnnlx9YKJ8n9W0E2zqzxR4ORZ_FWciIy2k4DYxqdXPcV3A=s120",
								created_date: "2022-03-02T13:20:39.008522Z",
								distinct_buyers: 2,
							},
							{
								name: "tiny monkeys (ether)",
								count: 4,
								total_sales_in_gwei: 40000000,
								image_url:
									"https://lh3.googleusercontent.com/ZHtUcksIk2P-rok_6xPgoVpAHvO0qZRCemB6t7rxoz4svUOp6HRh4rSkB51Z7T2neoXAKgtMO_wM6x4ofxhXoxv535BcLW6YZ9agyg=s120",
								created_date: "2022-04-12T16:07:26.932396Z",
								distinct_buyers: 3,
							},
							{
								name: "Impostors Genesis Aliens",
								count: 4,
								total_sales_in_gwei: 11440000000,
								image_url:
									"https://lh3.googleusercontent.com/oyEO1RajjrJuCYtbXX9Oa3FhoRvX5BO_TkFc8PTUkN5egJwFG2mlM0lRl7zuOvBj_HciCY35D4exJm0b3DZya6qxpyhk0aBN7oCH=s120",
								created_date: "2022-03-28T19:00:24.06601Z",
								distinct_buyers: 4,
							},
							{
								name: "Space Riders NFT",
								count: 3,
								total_sales_in_gwei: 319990000,
								image_url:
									"https://lh3.googleusercontent.com/HupzZTfZI85dH-VfjpxLozik8IuS1w4bOwBhJR4eiBtWqNYc8gIaeQvp7Muo9uG3XdhN3Cj_MFXHcN48ucb5icFxSXc6gW_d54Jp_g=s120",
								created_date: "2022-03-17T21:58:24.778326Z",
								distinct_buyers: 3,
							},
							{
								name: "Labo NFT",
								count: 3,
								total_sales_in_gwei: 6999998,
								image_url:
									"https://lh3.googleusercontent.com/mp15Aauwa37JoBkSM22I1cbnejE1OYw1r-VK9E101yWTWaBw8OfJiT_fI2cIaumn5vMeNb4aqpBWPY9AuuuEt3Q0kwCdvrnnEQ4qOUw=s120",
								created_date: "2021-10-23T08:51:03.313924Z",
								distinct_buyers: 1,
							},
							{
								name: "Gh0stly Gh0sts",
								count: 3,
								total_sales_in_gwei: 1534000000,
								image_url:
									"https://lh3.googleusercontent.com/MACJRvA4MOLHonq73rxU8TaHPrbYuGbJ5_rqV7pw9ZGd97h5mo5NyU6PpQNOvZzdoVu2KRVs3jP-oMK3FF1XQtNSxN6xf1ZVd9is=s120",
								created_date: "2022-04-04T05:00:47.319665Z",
								distinct_buyers: 3,
							},
							{
								name: "Centauri DAO NFT Investment Fund",
								count: 3,
								total_sales_in_gwei: 30000000,
								image_url:
									"https://lh3.googleusercontent.com/R932ohuq7XXqKlDU5IE53SukA6jAl3FCSBWfG_Grce0QLBd-TmDMXfdaHiVkGBFxmdH8Dfy5qqRZZgc6Xe8NGlmWWhryjII0vEJkTpM=s120",
								created_date: "2022-03-13T11:24:29.989129Z",
								distinct_buyers: 1,
							},
							{
								name: "fRiENDSiES",
								count: 3,
								total_sales_in_gwei: 1058900000,
								image_url:
									"https://lh3.googleusercontent.com/kYHEXz4XAzgU5FzvUS-yu6H7sAIEhCUVOWXAzIXDenygg4c8pW4GZ4C4_LE-nitJ6VRhH_gG3_LEAoIr1Px8z_egduqKvudK5Y6V5Q=s120",
								created_date: "2022-03-23T21:16:35.883487Z",
								distinct_buyers: 3,
							},
							{
								name: "SlimeFarm_NFT",
								count: 3,
								total_sales_in_gwei: 1240000000000,
								image_url:
									"https://lh3.googleusercontent.com/WcjErxeq_EfVMTAXiivur1GzdjPxejSI-yaixuyuoCfGC4Ym4djEdEEPrfsu04u4mThoK-IcIzrFZ_rPZf3KzhHlkNgBVyjorr7K7A=s120",
								created_date: "2022-01-10T14:41:48.876776Z",
								distinct_buyers: 3,
							},
							{
								name: "HeavenComputer",
								count: 3,
								total_sales_in_gwei: 290000000,
								image_url:
									"https://lh3.googleusercontent.com/V2OhcyCZgsU8EzLc7tbreU12jRFa3R3XIcmDgZQ-10iej-KBucLC3DgCIr8sQQmOHwtzl1DNqCuFuBmViPiF2SSkFVkDrF7fqvaVdg=s120",
								created_date: "2021-08-15T23:24:44.019113Z",
								distinct_buyers: 1,
							},
							{
								name: "ZED RUN",
								count: 3,
								total_sales_in_gwei: 22720000,
								image_url:
									"https://lh3.googleusercontent.com/tgpgbT3OwxX4REASLdyafzCWQ5EhOtgSiIlhI3am3aZ_mYPS0WbM9Z4F6hOhb0D-AKqhHlFg6BNBquchQy-_bwY=s120",
								created_date: "2022-02-22T21:08:32.689118Z",
								distinct_buyers: 3,
							},
							{
								name: "OFFICIAL KREEPY CLUB",
								count: 3,
								total_sales_in_gwei: 559000000,
								image_url:
									"https://lh3.googleusercontent.com/Xik2Bhcl3fLSpDtcVkra4XS4IoPbEDW0BmXp3wSBJTrT_PrmoPdFKhzgDD03FeBpmnSOJJCbkZBvgXrFf7yiJHk2G87NgawpfO9L4a4=s120",
								created_date: "2022-04-08T08:14:29.427247Z",
								distinct_buyers: 3,
							},
							{
								name: "Bao Society Official",
								count: 3,
								total_sales_in_gwei: 298900000,
								image_url:
									"https://lh3.googleusercontent.com/fhBaRhalkzcSE4a_wbse5qOfoWUFi6xMEoNveFRzs9K-JDfdw4rQ5P_7a2BLxbJtLTC9GUfjr6VOj1oQV8z9qshhB6FLsNrJrx5AT8E=s120",
								created_date: "2022-04-11T08:53:18.208016Z",
								distinct_buyers: 3,
							},
							{
								name: "SUPERPLASTIC:  Headtripz",
								count: 3,
								total_sales_in_gwei: 502500000,
								image_url:
									"https://lh3.googleusercontent.com/5LSMQsfk2kgkbTT0ih8TMrhoXDETO3inMahYX6-l-vMRkn-JNxOTubZQFPyDLt0JS5sNIFAQx7jgVLF56nO7OmHh0n7eD3mvCXDEvgE=s120",
								created_date: "2022-01-20T02:29:44.719023Z",
								distinct_buyers: 3,
							},
							{
								name: "Project Galaxy NFT",
								count: 3,
								total_sales_in_gwei: 19440000,
								image_url:
									"https://lh3.googleusercontent.com/-tom5N1JkMBvXw3rtz7JseJpAIHLrVvU13rTto4uqQCPmW4ZNvboPj34x3Ub3r7baOGYQ43KhcQ3gADkewfOY1gWKFtZ7ZoTFG7_EQ=s120",
								created_date: "2022-01-06T16:00:29.116606Z",
								distinct_buyers: 2,
							},
							{
								name: "Hero Galaxy: Artifacts",
								count: 2,
								total_sales_in_gwei: 83300000,
								image_url:
									"https://lh3.googleusercontent.com/DduOoAikAyFHfZG0FNqYQl3lcdnr5s5FWRtHUuzAcantq7RDCnnROEHOH5hVzYyfxS87t5ugD7hfdfr-jb9dnyDSo2am0G29hR1ko2I=s120",
								created_date: "2022-03-08T05:11:14.012207Z",
								distinct_buyers: 1,
							},
							{
								name: "Crypto Prisoners",
								count: 2,
								total_sales_in_gwei: 48000000,
								image_url:
									"https://lh3.googleusercontent.com/MsEai4zyO5iuWEUrWpd93CdcrSZpGTUFf63Y__LjCABYbvvq1ZQEx1kD0gEbPGrSyDw0FX_wszkDQzTYigh-wSzPUyM0mZ3WcxO6VQ=s120",
								created_date: "2021-12-10T10:19:58.216911Z",
								distinct_buyers: 1,
							},
							{
								name: "KamiMain",
								count: 2,
								total_sales_in_gwei: 30000000,
								image_url:
									"https://lh3.googleusercontent.com/EgtV19jIpdem9rxOk5TTcr45aOIrAc_6ZN1KegwIju73BhX4zgVdZB5TCQXwLZUfk_i_WIKfbu7U0JgPBKVLKAbSNpcHoRASuCA1AQ=s120",
								created_date: "2022-03-31T14:17:42.20898Z",
								distinct_buyers: 1,
							},
							{
								name: "Rarible",
								count: 2,
								total_sales_in_gwei: 81390000,
								image_url:
									"https://lh3.googleusercontent.com/FG0QJ00fN3c_FWuPeUr9-T__iQl63j9hn5d6svW8UqOmia5zp3lKHPkJuHcvhZ0f_Pd6P2COo9tt9zVUvdPxG_9BBw=s60",
								created_date: "2020-01-01T13:22:57.777065Z",
								distinct_buyers: 2,
							},
							{
								name: "Evaverse Hoverboards",
								count: 2,
								total_sales_in_gwei: 82000000,
								image_url:
									"https://lh3.googleusercontent.com/qcQqdAW8G7vS7kjpFrkUfgp-SJnmkV75ONNdSlH-wLzW7EoXFsMuu2kC3UxidNgRTDm0bEnrVhptffYIVog6f8HiA_4ZMfvwK4ky=s120",
								created_date: "2021-12-10T17:54:51.479947Z",
								distinct_buyers: 2,
							},
							{
								name: "Akutar Mint Pass",
								count: 2,
								total_sales_in_gwei: 3889000000,
								image_url:
									"https://lh3.googleusercontent.com/lg986fbySoubsX1AWvzacXYcrTPVKfQxXmSedDW8Uab-rEhZo1j6GbkZSTfifN2aLnfSCmpqkExZLqqxWTmWkNLv3qRjlTQuOEerPw=s120",
								created_date: "2022-04-08T20:03:23.576951Z",
								distinct_buyers: 2,
							},
							{
								name: "Lil Pudgys",
								count: 2,
								total_sales_in_gwei: 269500000,
								image_url:
									"https://lh3.googleusercontent.com/AvHI5OgCdpLihPnQ48Rat_v8xy-INEsDAN8id8naaZrH6JwcYqsF6LcvQAnDoubbemRoSzl9Fg8O4OzheAwT3mSUS5DpYe54OyyLrw=s120",
								created_date: "2021-12-19T17:19:18.712729Z",
								distinct_buyers: 2,
							},
							{
								name: "Dennis Rodman's Barbershop",
								count: 2,
								total_sales_in_gwei: 244000000,
								image_url:
									"https://lh3.googleusercontent.com/XAh3ZBdFDIOiXmaDbUjypz-VvXwNIB-lmXrcO7acxQyFXXNWSmDIslQsx7OPQOCnTtEchox65W1skJv16zkC2ugBNbDptTsfkQJxrnY=s120",
								created_date: "2022-04-08T18:21:47.345853Z",
								distinct_buyers: 2,
							},
							{
								name: "The Seekers",
								count: 2,
								total_sales_in_gwei: 379900000,
								image_url:
									"https://lh3.googleusercontent.com/a2cEDMuBQQ0uxysDKzUq_1ys5yzDXTS6aDCUCE7SmuEBVXyTqcY1NWqmFSKrtowaCnzjh8MrL1kxmF_smNaiyzwZGzJH0Lj_0rvbs6I=s120",
								created_date: "2022-03-27T21:14:08.499518Z",
								distinct_buyers: 2,
							},
							{
								name: "NSUJPG 2.0",
								count: 2,
								total_sales_in_gwei: 110000000,
								image_url:
									"https://lh3.googleusercontent.com/-SieAd9GA5ZuYOCqN2-o8eCGRMggx6PDRPKot4sgGILGCy8ghFPenSzvlxpl7gB2LLnJl-5uNcJjR-RA5ExY1cHILE6NbKFmDqGM=s120",
								created_date: "2022-02-19T16:45:29.850001Z",
								distinct_buyers: 1,
							},
							{
								name: "NftWomen651 Art Collection",
								count: 2,
								total_sales_in_gwei: 3700000,
								image_url:
									"https://lh3.googleusercontent.com/MYehhhGtnGttw5Ub2v1345rt1-PxmjVld4I0tss9HLN4RvLhYr0rPeilmRuZQjZNIYN_O3m1RLZrgQWNUbkCT3vrB2NWpHlCQEnR=s120",
								created_date: "2022-04-10T13:45:59.066074Z",
								distinct_buyers: 1,
							},
							{
								name: "Pixel Vault MintPass",
								count: 2,
								total_sales_in_gwei: 325600000,
								image_url:
									"https://lh3.googleusercontent.com/3Y2i7gCGgr6JY6-qPQ3aeFTGbgZfznTprxHaCJd0xVjEQ0n-NjBISvS8pnPGfh8BAmkx67zeOu9P0XNOj8I5TOEUrPbvtTNT46rM=s120",
								created_date: "2022-03-10T21:51:39.766729Z",
								distinct_buyers: 1,
							},
							{
								name: "HAKI NFT",
								count: 2,
								total_sales_in_gwei: 630000000,
								image_url:
									"https://lh3.googleusercontent.com/Cq1G1NVYtecZKoHdzDt9xkYliJPpkoDniUAEIodD_WFfhaykPpyxrMxggWcIdfqrSx8xajwxT5UYehZNwNPI5l8s5xeLC88xmhi8oQ=s120",
								created_date: "2022-04-09T22:52:17.019388Z",
								distinct_buyers: 2,
							},
							{
								name: "boohooverse Access Card",
								count: 2,
								total_sales_in_gwei: 17900000,
								image_url:
									"https://lh3.googleusercontent.com/Vk8dTlHkbdCseSXFtGW2WPPxrL-sWtLfsblAY6TKjuzvwW5jLddVHTCHAqEvtj8a_L6906hHb5ZCwXgo1mZlq8F4S2Ivl1fv8Di-=s120",
								created_date: "2022-04-10T12:02:34.702035Z",
								distinct_buyers: 2,
							},
							{
								name: "Emo Buddies",
								count: 2,
								total_sales_in_gwei: 70000000,
								image_url:
									"https://lh3.googleusercontent.com/L442UHNpXQ0xJ3z3k-9jA9Wc2i6aJhTC-SuObvAqsbruFVac61bHH3Cng5oBWJeSKS25oVQqCdDKmEUGTdp-LhoClttuU8MebOJVJA=s120",
								created_date: "2022-03-26T04:11:31.647705Z",
								distinct_buyers: 2,
							},
							{
								name: "Hikari Official",
								count: 2,
								total_sales_in_gwei: 687000000,
								image_url:
									"https://lh3.googleusercontent.com/5cktBG-sVYI7VmiTVJyGj1x0SrliEZ3I3Pe8QgwGszWE-jPP7VovVlSulazoeGpspyd-AKoPFmk3x0t046nF1At208TFCv_jcRAg4zo=s120",
								created_date: "2022-04-10T20:00:15.145409Z",
								distinct_buyers: 2,
							},
							{
								name: "Wabi Sabi Collective Genesis",
								count: 2,
								total_sales_in_gwei: 200000000,
								image_url:
									"https://lh3.googleusercontent.com/t2x-ximr6kA_-6OcWQiv9S_cHXZou9NhoDpXyI3aMu1B5WnVAeqAfwJvAAyDI4J7kKs1di1x_YTo1jR5FSnrygGwYpRJ1Eo9sX14EYo=s120",
								created_date: "2022-03-03T03:57:07.183819Z",
								distinct_buyers: 1,
							},
							{
								name: "Worldwide Webb Land",
								count: 2,
								total_sales_in_gwei: 3340000000,
								image_url:
									"https://lh3.googleusercontent.com/Tc7kJNU7hcpmCCykek6ANVhWervl1zhbNIlM_T3VSR1hsSCrOGG6IiNALSs8v-OgUVJvoKW6tVbJWjnJti_o0ihvUNlxFWfZV9V9=s120",
								created_date: "2021-11-29T08:20:45.145208Z",
								distinct_buyers: 2,
							},
							{
								name: "Meta Toy Gamers",
								count: 2,
								total_sales_in_gwei: 539000000000,
								image_url:
									"https://lh3.googleusercontent.com/g3ZUstVbUF6GOqMpsRkyppqrKaEULAIRAQWCa-EX1yCN5qZMyO_MuFz6f732b2YHzGl2B6I5sxWcgY9XyxfRCUA0NPO7k3ryvapnRA=s120",
								created_date: "2022-03-23T06:35:03.399808Z",
								distinct_buyers: 1,
							},
							{
								name: "Pirates of the Metaverse by Drip Studios",
								count: 2,
								total_sales_in_gwei: 118000000,
								image_url:
									"https://lh3.googleusercontent.com/omWEzdGF0iTslQqMQt5RlKo0nVJ9WBTabjxOxRZSdVxrXS_6LZ6cfbbKPYDlnZVWFiLl-Vny7oOfbW-rpwFwk47t8eJKw5f_oSuV=s120",
								created_date: "2022-03-07T04:27:37.609442Z",
								distinct_buyers: 2,
							},
							{
								name: "illogics",
								count: 2,
								total_sales_in_gwei: 459000000,
								image_url:
									"https://lh3.googleusercontent.com/wG9tN1YkG6xQ3AJ9zENy8v548QkLyK1HRZuCVc5GZSat2Ngh633aYNXZSMGVroN2b0j0AcfEj-ibKkIPsBu2fq0NStEbQWJB7BMm=s120",
								created_date: "2022-04-05T06:13:00.724585Z",
								distinct_buyers: 2,
							},
							{
								name: "SmallBrosNFT",
								count: 2,
								total_sales_in_gwei: 102000000,
								image_url:
									"https://lh3.googleusercontent.com/qaPMpi99FcdRO--1L9ZXwXEea3MGy82KKePOaEYGqB4-wMxqtDcXI8FyXgfMeN0bV8inEZScQ0R-iiJsJYn1XJenHJ37upDsPiquXA=s120",
								created_date: "2022-03-21T14:46:39.714501Z",
								distinct_buyers: 2,
							},
							{
								name: "Arcade Land",
								count: 2,
								total_sales_in_gwei: 2119000000,
								image_url:
									"https://lh3.googleusercontent.com/Pu2TAnykhmrL5jtD48VcYgFb8lTMZeUDabfcUZMQgseS0KJ6CB1hlgIulwdzeVLPnD4yAVXsF9o-3rT9xnuAkbuAcSFH9Wnh0MGP=s120",
								created_date: "2022-03-31T09:35:06.582657Z",
								distinct_buyers: 2,
							},
							{
								name: "FEWK;4teens DDOGG for Klaytn",
								count: 2,
								total_sales_in_gwei: 36000000000,
								image_url:
									"https://lh3.googleusercontent.com/aryFQAubBd9N34_vahyQAxBLVDWgYTnoK1Aig7-yW3ng0DEyuDhvx5o2x6tWz1xPDO_Qe1bRYYINI5kPbFbyCDs1MYIRTD-0hJzYbw=s120",
								created_date: "2021-12-05T12:16:14.515612Z",
								distinct_buyers: 1,
							},
							{
								name: "Phantom Galaxies Origin Collection",
								count: 2,
								total_sales_in_gwei: 7201000,
								image_url:
									"https://lh3.googleusercontent.com/NZ0WI9Fxr69mfjNye3t2Ct_Uk-JnPTqWoA7TF4RK18wslgZkR2I1WJ1Uw6PzLK9oj-r02r5r30VR7TVNYqidtg4b75rBqD5p7E1S9g=s120",
								created_date: "2021-12-02T08:56:56.798497Z",
								distinct_buyers: 2,
							},
							{
								name: "Cool Cats NFT",
								count: 2,
								total_sales_in_gwei: 15860000000,
								image_url:
									"https://lh3.googleusercontent.com/LIov33kogXOK4XZd2ESj29sqm_Hww5JSdO7AFn5wjt8xgnJJ0UpNV9yITqxra3s_LMEW1AnnrgOVB_hDpjJRA1uF4skI5Sdi_9rULi8=s120",
								created_date: "2021-06-27T09:03:35.403074Z",
								distinct_buyers: 2,
							},
							{
								name: "Emblem Vault [Ethereum]",
								count: 2,
								total_sales_in_gwei: 7020000000,
								image_url:
									"https://lh3.googleusercontent.com/VkSY4QiLanH0h2oS37cjRAENLDLBqLKUX3YC4ZvdEW60zI9OXoRl4E9uR1x3d8hU8ekFai4Ruwq4FObZ0VH2NpU=s120",
								created_date: "2020-09-09T02:00:42.938798Z",
								distinct_buyers: 2,
							},
							{
								name: "BuddyLab",
								count: 2,
								total_sales_in_gwei: 133900000000,
								image_url:
									"https://lh3.googleusercontent.com/-B3DgWoLG3ByZBa8JBwfzp4sjghC-hIQAvAfwiRQTmKKXLvdctuI3BvoDBaxFQe4vvHbPsJ2TEgwyWmQQPUeOG8GlwszHSwgqGtJ=s120",
								created_date: "2022-03-03T02:48:11.592359Z",
								distinct_buyers: 1,
							},
							{
								name: "Cosmodinos Omega",
								count: 2,
								total_sales_in_gwei: 338900000,
								image_url:
									"https://lh3.googleusercontent.com/7EqN5mJiOwd4IknA3oAImSQKsNHTlw_NCZ5p6MEbWnGmA4x56jkr55s-kjDp1NkQbhEK9rAvnu1KYPNtd3jbrcbNFXvbcVqyaRNANUA=s120",
								created_date: "2022-02-15T16:01:34.175856Z",
								distinct_buyers: 2,
							},
							{
								name: "Creepz Mega Shapeshifterz",
								count: 2,
								total_sales_in_gwei: 1440000000,
								image_url:
									"https://lh3.googleusercontent.com/q2Mbczrn-KvVuawxYccKIPchWTP953CyB5ZNYG8BTW1B5PSz4t0XQfpU4SYmZP2CplueFA7IOB3nk5KxuMTEAiTK3PKfPm6WCfTV=s120",
								created_date: "2022-01-28T18:18:45.251134Z",
								distinct_buyers: 2,
							},
							{
								name: "BFF Friendship Bracelets",
								count: 2,
								total_sales_in_gwei: 3130000000,
								image_url:
									"https://lh3.googleusercontent.com/9LK52eD3wmwzsk2uuNr1Bl9AZNe89ixNgQzhxIEKodUOcf2vLdJv9DAEpC25aIiCfeUFdWTugdUwGyHuHHUKQpvCz3AA8ZmMex00=s120",
								created_date: "2022-02-02T23:36:43.97422Z",
								distinct_buyers: 2,
							},
							{
								name: "A Wonderful New World",
								count: 2,
								total_sales_in_gwei: 22000000,
								image_url:
									"https://lh3.googleusercontent.com/D9LBUul1lY2KPetBNxRVgFQqvWVSSKppcFhF1zk7cPXW3HVIufE4H58drkKnGefJ3p6w0g2ZzPW7X9RMYwEGmcBh_cg6ICbhSdwxZw=s120",
								created_date: "2022-02-25T09:52:04.964083Z",
								distinct_buyers: 1,
							},
							{
								name: "0xApes Trilogy",
								count: 2,
								total_sales_in_gwei: 285000000,
								image_url:
									"https://lh3.googleusercontent.com/RpkU22TwUksonije0rrA7_edf7J5fZkCnLEmKbSPNa7rjL8uB2H_5gIple5CgzWcH8G8bQJz4Xhr7EJMYWkKPPDkzr5CRYXL1mlyieU=s120",
								created_date: "2022-01-15T03:20:50.582724Z",
								distinct_buyers: 2,
							},
							{
								name: "Acrocalypse",
								count: 2,
								total_sales_in_gwei: 1369999900,
								image_url:
									"https://lh3.googleusercontent.com/2A1CFc0BZ_4wmXLeAd-2KgxsRGa_KdkvBRex3BC64HoPnLPzBjPz79xmX5JPq6OXEx8yhc38oGIlh1OjwDqvgU0-Tx_s3P9hAdUY5Fk=s120",
								created_date: "2021-12-22T13:41:49.115824Z",
								distinct_buyers: 1,
							},
							{
								name: "World of Women Galaxy",
								count: 2,
								total_sales_in_gwei: 4383700000,
								image_url:
									"https://lh3.googleusercontent.com/hP4JJhiY5yXu1mCvNycTke2O_xbtgIFfkLTjfT7C9TNKinkGpP2COikt7cwn0xqzoATRNC21wsiwy_Fe-MQ3PPTgRjkbbCfJf__L=s120",
								created_date: "2022-03-23T16:19:31.817709Z",
								distinct_buyers: 1,
							},
							{
								name: "Chum Chums NFT",
								count: 2,
								total_sales_in_gwei: 194560000,
								image_url:
									"https://lh3.googleusercontent.com/itxl9IQpTPNQLas3Heuzz30xiiUXfFpPj-znZVe6jPaNP-UZ94lAkt1OvQM4mp2gLv7Wgk5irzgqfYcz1nSzVde1zDqfoly492e2=s120",
								created_date: "2022-03-22T18:15:54.333231Z",
								distinct_buyers: 2,
							},
							{
								name: "alien frens",
								count: 1,
								total_sales_in_gwei: 1790000000,
								image_url:
									"https://lh3.googleusercontent.com/_zidXBb2QsMBD6OYdjED63tczeXDUr1ah7zvhSSLHQjU4BF-H-lUexkLJ76_ahmbkkItEiH738jVPG88DOFVdt4GX377cvNNgCyzFT4=s120",
								created_date: "2021-12-18T06:46:31.634552Z",
								distinct_buyers: 1,
							},
							{
								name: "Fuzzy Felons",
								count: 1,
								total_sales_in_gwei: 135000000,
								image_url:
									"https://lh3.googleusercontent.com/s1fYrkm-wFvcIRgDUhrUk9q63zEuvTpIqVLXwnaPaU8YibKdEgj6UljLp6oOdcg_MpOmSbMgrKKIrYJEHHr7_qi7maU7xih-Ujxqkw=s120",
								created_date: "2022-03-31T23:01:00.774807Z",
								distinct_buyers: 1,
							},
							{
								name: "Squishy Squad NFT",
								count: 1,
								total_sales_in_gwei: 171000000,
								image_url:
									"https://lh3.googleusercontent.com/QpNMoHSR7sSxv27_B1v3Y7VvOl8-_JigGgy84CL2xLFKqJCVf7-giOcyl4mkheXdDi1FO2V2RDAx99DaQDHmiWSLZTxCpS3g2ASLwZg=s120",
								created_date: "2021-12-10T03:03:28.835654Z",
								distinct_buyers: 1,
							},
							{
								name: "FEWOCiOUS x FewoWorld: Paint",
								count: 1,
								total_sales_in_gwei: 845000000,
								image_url:
									"https://lh3.googleusercontent.com/bfpxZRxKsuxzNPpjwjAzADl16wxQfjSzQbQ4PMCnuWnNL5CQ-yvKqXQrG4mZeB63yY4UH9KA_lvN-GFGRSN8oqqMy7LdG3R_XL_c=s120",
								created_date: "2022-04-06T00:39:55.422789Z",
								distinct_buyers: 1,
							},
							{
								name: "DEZUKI",
								count: 1,
								total_sales_in_gwei: 90000000,
								image_url:
									"https://lh3.googleusercontent.com/kTVkggv5uEZ-AJkmjJEbJv82zAPOjwstfdcCtntIqtWjxmGGhs7ioLXPxdkj5KehTt9QZsINkwEEbqOuwC-85_kZvtziTXVl3MIO5g=s120",
								created_date: "2022-02-23T13:17:33.30254Z",
								distinct_buyers: 1,
							},
							{
								name: "Gummies Gang - Official",
								count: 1,
								total_sales_in_gwei: 100000000,
								image_url:
									"https://lh3.googleusercontent.com/ZIZhw_lI-_2-yA6asJxByx6nmIlNppxCmdE0h1HYzk0wIX17tSwtHnBySM65NOLtqcMhJfcd2JTJERJOd-IwFL4apaBL9OmOLKXEWQ=s120",
								created_date: "2022-04-07T04:26:38.145336Z",
								distinct_buyers: 1,
							},
							{
								name: "Baby Chimp",
								count: 1,
								total_sales_in_gwei: 8000000,
								image_url:
									"https://lh3.googleusercontent.com/UxJP0wItnA6XqC6rhrsgkl2tGH5KhVaxIxl9NwLF83kTtGb2zPS-kwdx-FaQjF_TDnPAMOCywZCpYtWvqZ___k-erc7UqK3GByPfNw=s120",
								created_date: "2021-12-08T22:10:46.998404Z",
								distinct_buyers: 1,
							},
							{
								name: "Sacred Skulls (Official)",
								count: 1,
								total_sales_in_gwei: 120000000,
								image_url:
									"https://lh3.googleusercontent.com/3SmdxWY0x_jYYhlbugvGtJLwAjWpoM6_FgRQRiqF-9H7h9PrJfEC4k4K5fdkc9Zn4PVFJMdOUMxW48IMwDB2SbhL8P_TYzv1rTGWRA=s120",
								created_date: "2022-01-25T12:44:50.270007Z",
								distinct_buyers: 1,
							},
							{
								name: "Droplets - Official",
								count: 1,
								total_sales_in_gwei: 34000000,
								image_url:
									"https://lh3.googleusercontent.com/gWs8Y4dfUQuRwonLahXmkX67um8py5k6M1ImJr_1Rx8IatXYg6kewXFS_8-Q8mqE_t24o3GqKYOAW3Li6Au9KdOyHJn22Mrs8dCAIM0=s120",
								created_date: "2022-03-30T14:54:28.493978Z",
								distinct_buyers: 1,
							},
							{
								name: "The Heart Project",
								count: 1,
								total_sales_in_gwei: 300000000,
								image_url:
									"https://lh3.googleusercontent.com/Xgx0cYJjfcbZI1tNOwBwlvtrcDAIm8aAP6U5Hkf7khEKmt5L-i7FGoc83RXvW6pg-oTy4x6HKlbjCTioqbA_Yqq-LhBQe7TMDse7CQ=s120",
								created_date: "2021-09-23T22:01:27.001772Z",
								distinct_buyers: 1,
							},
							{
								name: "Ben Mezrich Project - Meme Stock Collection",
								count: 1,
								total_sales_in_gwei: 39500000,
								image_url:
									"https://lh3.googleusercontent.com/VOjjRMuYrr0NKOxgzHINApqU4CNPhf4VDMYEIglOcKJruPJ94UAi4ImrjPQvz8q1yszyHfodyVgdHsJqNyHN7HA1AdH4-B7vQCuL=s120",
								created_date: "2022-01-03T01:26:51.513388Z",
								distinct_buyers: 1,
							},
							{
								name: "GENZ!",
								count: 1,
								total_sales_in_gwei: 600000,
								image_url:
									"https://lh3.googleusercontent.com/GWKY4tynlbKPLjGRmZ3Ro0UcArtaxXtIV5M6Z3StjuLzt6dmCtC21ZK6_d9HubbmtcnpH4_08n568MAqtXVzGNecZ-JJLCU4rplubxw=s120",
								created_date: "2021-12-10T19:03:30.681801Z",
								distinct_buyers: 1,
							},
							{
								name: "BitDrivers",
								count: 1,
								total_sales_in_gwei: 485000,
								image_url:
									"https://lh3.googleusercontent.com/9qa792Xg7GTVxc5AIaDpzrbbBxtkKaVRhmKeXx77Ox2a0Vzjd4pPZY_S-qMHEdQOdQ4gOZUAq3fGS5wBYanqpDQ7Vi_NlQTQfDqY_w=s120",
								created_date: "2021-12-08T23:53:29.626256Z",
								distinct_buyers: 1,
							},
							{
								name: "Revolutionary Alpha",
								count: 1,
								total_sales_in_gwei: 820000000,
								image_url:
									"https://lh3.googleusercontent.com/URcyIacQDZWetnhgE-psYZBma6gy8xnnC0E9xLK8LVKaSlktGqe7UqL5j9cBglnczuiRrMsSa4Bw7bG5gkh4hg81WIPMxUO3SS4trSA=s120",
								created_date: "2022-03-10T18:35:36.62032Z",
								distinct_buyers: 1,
							},
							{
								name: "JPunks: OG-Rex",
								count: 1,
								total_sales_in_gwei: 110000000,
								image_url:
									"https://lh3.googleusercontent.com/4nxlfHPvdUE2TJiHK1VnnLwamTbn6isMPfhASY5wBjttHL2YctD0Po0f8l_fPTr0-EoIQ_OEKGjiF7DmsllSo9Ds8gygs3vnPZn4Wg=s120",
								created_date: "2022-03-24T09:21:04.166724Z",
								distinct_buyers: 1,
							},
							{
								name: "GIFT",
								count: 1,
								total_sales_in_gwei: 60000000000,
								image_url:
									"https://lh3.googleusercontent.com/ofSwcnotdu_tGoTDNhGHG0AvkdXytsGD5NA2Z9RSReN57JTzT3zNg2GtaCOVkT4B_OUz-IktyjiBJLE7FFv0shmTx5OoTSJJ9eU9Ww=s120",
								created_date: "2022-03-30T12:30:32.080506Z",
								distinct_buyers: 1,
							},
							{
								name: "Alto city",
								count: 1,
								total_sales_in_gwei: 5000000,
								image_url:
									"https://lh3.googleusercontent.com/bkSUsfCClJS64fDhQsohtWjDaBTV3PW5gMRygxvSxAS-WD39TnJr_gIIQhIGnh97IwB6Tb5Sg3TQYOMtRHz9buJMoeE8hhO32Caw=s120",
								created_date: "2021-08-28T05:22:28.768559Z",
								distinct_buyers: 1,
							},
							{
								name: "Milady Maker",
								count: 1,
								total_sales_in_gwei: 796000000,
								image_url:
									"https://lh3.googleusercontent.com/j8PFqoTtQQ1LkwnFhBRUwFvG2RVXrLpnmSZ6d5he2yxJnDvN3NcaWIaK9Vnmk5Ip2VhrSNVfQD10MyPyM8R1jjs8z1d6cPtjgcPWcA=s120",
								created_date: "2021-08-24T21:13:48.457143Z",
								distinct_buyers: 1,
							},
							{
								name: "Age of Zen Swords",
								count: 1,
								total_sales_in_gwei: 15000000000,
								image_url:
									"https://lh3.googleusercontent.com/QhJRxfPxuXtm_KMuEkKDGskrsFSI8pC1mbTzpzx0q1Lr92C4IEJ6Ne_e4Wkht0rDphqzsLJP4mYW1eo8B5GBhE8vElzGWKtDveVqCQ=s120",
								created_date: "2022-03-31T14:06:47.02249Z",
								distinct_buyers: 1,
							},
							{
								name: "KIWAMI Genesis",
								count: 1,
								total_sales_in_gwei: 410000000,
								image_url:
									"https://lh3.googleusercontent.com/crR2qxl8Gnpg8TUKP45sxdR0NOlDXQrQH0L5n6LEcB2OSMwVKveVkwZFkvB8qytmy51D59TeMZbqhn6mgffRbKBgsshdCryGtJ8PsAU=s120",
								created_date: "2022-03-24T00:01:03.777862Z",
								distinct_buyers: 1,
							},
							{
								name: "RiceDay.GG",
								count: 1,
								total_sales_in_gwei: 45000000,
								image_url:
									"https://lh3.googleusercontent.com/wBIruHrM2flJtQ0QhBg5yb-k7wXWetrj4xGoYPzbfNQ444deiNoLLxbcB_kguZcgv99RYw1TTCNdOl9i1wJrMG7TxlHbQg08_9zVuQ=s120",
								created_date: "2022-04-04T11:20:23.800008Z",
								distinct_buyers: 1,
							},
							{
								name: "The Ape List",
								count: 1,
								total_sales_in_gwei: 430000000,
								image_url:
									"https://lh3.googleusercontent.com/2i0NHbkyRNX1cYRQRRDdO6PUumTAZpCBZfkW9aBDv0uOzEXDQesFRckN8HmCfHWI7lsqCop3EAiQmwQE-ISQmsfg-7AFRt38beICRQ=s120",
								created_date: "2022-04-03T13:12:56.344582Z",
								distinct_buyers: 1,
							},
							{
								name: "Spunks",
								count: 1,
								total_sales_in_gwei: 25000000,
								image_url:
									"https://lh3.googleusercontent.com/ULYeCKiVRQweeGhIxtu-HfHGPAVrZORRGPaS1Dfx6egL0lKg_BNhg0qk1_ZlnEUkriWb76nXY6wvLieoDAx2vfunYwv3xRPVnBY=s120",
								created_date: "2021-06-19T04:24:42.885315Z",
								distinct_buyers: 1,
							},
							{
								name: "ShatteredEon",
								count: 1,
								total_sales_in_gwei: 600000000,
								image_url: "",
								created_date: "2022-04-10T09:34:02.116817Z",
								distinct_buyers: 1,
							},
							{
								name: "ZED RUN Legacy",
								count: 1,
								total_sales_in_gwei: 8000000,
								image_url:
									"https://lh3.googleusercontent.com/tgpgbT3OwxX4REASLdyafzCWQ5EhOtgSiIlhI3am3aZ_mYPS0WbM9Z4F6hOhb0D-AKqhHlFg6BNBquchQy-_bwY=s120",
								created_date: "2021-03-03T01:21:00.501733Z",
								distinct_buyers: 1,
							},
							{
								name: "Ethernal Elves Sentinels",
								count: 1,
								total_sales_in_gwei: 380000000,
								image_url:
									"https://lh3.googleusercontent.com/gSU3jb0xhYHZfmfrwzrDx68cg6oWbjJRndNhtyYjntb9KsdWV0tB9ycxgEgaYIqoSwcgdsEcQhFfVZjVpZt6S7XS87kdbdQTscob=s120",
								created_date: "2022-01-31T09:18:17.884778Z",
								distinct_buyers: 1,
							},
							{
								name: "poptarts",
								count: 1,
								total_sales_in_gwei: 1700000,
								image_url:
									"https://lh3.googleusercontent.com/bP_1yXsRiUmhNra6ztzkYu40y6FhMiTHz8iYw_sLU1ZiG6K8rGsnzUhOhTlVlsMO0qXhTtcFqdv3wsgEPzezuLYLS81PUolxXAuQdqk=s120",
								created_date: "2022-04-12T22:47:10.150856Z",
								distinct_buyers: 1,
							},
							{
								name: "Omni Robotics (Polygon)",
								count: 1,
								total_sales_in_gwei: 5000000,
								image_url:
									"https://lh3.googleusercontent.com/avWIGz8N2BUGScF1ds7As85OiEZwiVnlaZXHkfTise23heGzpg3xBsPuGlG9FbT8SIl6jU59U8ENisGr4NVhsFQEbzJz6mZoKuVGYA=s120",
								created_date: "2022-04-12T21:02:49.918608Z",
								distinct_buyers: 1,
							},
							{
								name: "Kraken Secret Society | KSS",
								count: 1,
								total_sales_in_gwei: 16900000,
								image_url:
									"https://lh3.googleusercontent.com/nmFgGhsEyd0YLwKMFyT_vscQYrLe-fjJxT4dCL5x7X99mS4UM6RY_DdADwNk8K6ebvEHuLewRlDfjD1FfVHyMcLmMlYfydfRWlTr=s120",
								created_date: "2022-04-06T18:27:28.312472Z",
								distinct_buyers: 1,
							},
							{
								name: "Metakages Official",
								count: 1,
								total_sales_in_gwei: 240000000,
								image_url:
									"https://lh3.googleusercontent.com/s6iDl4DkOH3QghGZ4KoYcg5gbLgE66OCi9Z9j4C13Xij-5ivSEOKZ1_VGQK1ZS06vOZVCeKkQRjADSOpDqpwSRL_0HTz5XoBI731bas=s120",
								created_date: "2022-04-07T11:39:37.68295Z",
								distinct_buyers: 1,
							},
							{
								name: "Sheet Fighter",
								count: 1,
								total_sales_in_gwei: 40000000,
								image_url:
									"https://lh3.googleusercontent.com/kDH-uK6KqoB_eTJdkpl-VN_CPVD7mWlCvfb5JHm5zyJgMGhVQ7uDCwCMD8zx89qUHWk-6QRdG7UuSXcTyyIeTNBIbQ-aNoV1FsxnYA=s120",
								created_date: "2022-02-16T23:19:34.075503Z",
								distinct_buyers: 1,
							},
							{
								name: "PREMINT Collector Pass - OFFICIAL",
								count: 1,
								total_sales_in_gwei: 1200000000,
								image_url:
									"https://lh3.googleusercontent.com/aMMR2KXGtRL_jqpS6l1pLoLwUArlwKH9oEnZw-ezBoSANzRGKdManYxuzlB_kztn5bcEQA2Bgx9JWhdEQKLbgj0aFbhC7yFmMS7txw=s120",
								created_date: "2022-04-01T07:06:25.284208Z",
								distinct_buyers: 1,
							},
							{
								name: "TheHolyOnes NFT",
								count: 1,
								total_sales_in_gwei: 60000000,
								image_url:
									"https://lh3.googleusercontent.com/-KMMpfYUF21mAIA2W8YW0US3J831HFrKxcJ1mosxkmsvYQhQi_qZdiUQFUqcdYHPp96_W8WgILQtIm-yeh70tx8qt2YieSQCh3JIIoM=s120",
								created_date: "2022-02-21T18:43:10.195939Z",
								distinct_buyers: 1,
							},
							{
								name: "Trippy Toadz NFT",
								count: 1,
								total_sales_in_gwei: 159900000,
								image_url:
									"https://lh3.googleusercontent.com/mhHqco_bu5oRx1TftVg36aztvlsk44FT_RSzHv0MC0erh6_jwJSjdA-dvZumhTLaBo8-HDzTh5xVRGVExLeNbBK4oYK3N9xJxR2CHg=s120",
								created_date: "2022-03-21T03:02:30.863652Z",
								distinct_buyers: 1,
							},
							{
								name: "Rebel Bots",
								count: 1,
								total_sales_in_gwei: 1500000000,
								image_url:
									"https://lh3.googleusercontent.com/omqoY9eXusai_i9j0lZ3icG1U7bY9Ec7wxEhk7srEDZI2DDW3xbNnejxxHHhYnK8mHE_EK7fQhBteU-K28J4PwQzNju2L6FvEyKriQ=s120",
								created_date: "2021-08-01T07:56:46.578842Z",
								distinct_buyers: 1,
							},
							{
								name: "MegaKongs",
								count: 1,
								total_sales_in_gwei: 496900000,
								image_url:
									"https://lh3.googleusercontent.com/xyPAYpVF0F812Qz4hEJls_3tCvX1Y2BcdCVDvPvUuyFVQD-vHFitjmButrEBlZ8ESkLHCr2STjAo9X9mIdkWIzsCtK9I1ckTDGJa=s120",
								created_date: "2022-04-11T12:01:26.923057Z",
								distinct_buyers: 1,
							},
							{
								name: "Neonz Ape",
								count: 1,
								total_sales_in_gwei: 1670000,
								image_url:
									"https://lh3.googleusercontent.com/sXAxZJ207BoAQ4h2imFblfQUEAVDlTVpxXbt1DuBaXAGLIwG84WYfQxctzBEp4uICoMSuejubDU0RiIeP7mg25mTKe53ZuujVewenQ=s120",
								created_date: "2022-01-07T07:16:31.750815Z",
								distinct_buyers: 1,
							},
							{
								name: "Recon Rams",
								count: 1,
								total_sales_in_gwei: 60000000,
								image_url:
									"https://lh3.googleusercontent.com/8pX6e4T74K34yHJqysc8JB9FJ3CLi1M8NjvxvsS32ISwhTWa2Auipj0IyLijg2GoRH2nXRRgnBIGax7LA4FU3ylzKM3EG-xUjemk=s120",
								created_date: "2022-01-20T18:57:13.623348Z",
								distinct_buyers: 1,
							},
							{
								name: "Nonconformist Ducks",
								count: 1,
								total_sales_in_gwei: 200000000,
								image_url:
									"https://lh3.googleusercontent.com/VnoCdlfx9S-2zkWhrh8ZD4QpDoB0sgQoET9RBypofUnuz8AtKovZW9X-aBwSD4nui2ka_J63ej0nocrNhVJbotbsool2lMDI9lw4wg=s120",
								created_date: "2021-10-01T22:00:39.501365Z",
								distinct_buyers: 1,
							},
							{
								name: "SheepFarm",
								count: 1,
								total_sales_in_gwei: 125000000000,
								image_url:
									"https://lh3.googleusercontent.com/ynlAQE698lEpXooP100VUIGQIUdFapJZweh8WhPuvnucEuRv5DcL0PFo80dgkdiQY3ydUaTl7ZzsGl51NCNpuAp-Wxswlq1O6RS6JQ=s120",
								created_date: "2021-12-16T21:04:44.727327Z",
								distinct_buyers: 1,
							},
							{
								name: "BEANZ Official",
								count: 1,
								total_sales_in_gwei: 5650000000,
								image_url:
									"https://lh3.googleusercontent.com/YNAlfkgf4GU_RKNCwOH_nS0Y20pNzVVyI_w_Q2GyL8pNH0yU5_K3Fo9n1v4IfSyM4TbmEg3ALJ2CnxSnNWDeYMJ0DppvhRKlTiW2AiE=s120",
								created_date: "2022-03-31T05:32:31.772609Z",
								distinct_buyers: 1,
							},
							{
								name: "StarFrens Official",
								count: 1,
								total_sales_in_gwei: 30000000,
								image_url:
									"https://lh3.googleusercontent.com/xKoQ_e87hhQbKZW_cne7Jvp3AhlYsN7ZFjH3Aue3WgjKxxrgrJLFE4BBn-Zm1NaCADrjUL1OBr3dz0x5SZKp0gbjStjBstSC3LEp_Q=s120",
								created_date: "2022-04-08T19:02:35.482834Z",
								distinct_buyers: 1,
							},
							{
								name: "Shinsekai Portal",
								count: 1,
								total_sales_in_gwei: 584000000,
								image_url:
									"https://lh3.googleusercontent.com/Gn0XI0Bu3n0xBe1IKqr0AbnKP0eY_NwVAhjDr-ZSb9yHQNLMxvlVG8d8FElkoRs99yKg13a3VB6DeHbOAUCiqHI1nRwoWuwVNSv_fQ=s120",
								created_date: "2022-04-07T14:15:21.841437Z",
								distinct_buyers: 1,
							},
							{
								name: "Cath Simard Editions",
								count: 1,
								total_sales_in_gwei: 1010000000,
								image_url:
									"https://lh3.googleusercontent.com/D-f5ldS9dzXIoYO_oHOnLMjvX-4r0r7dY3qO31j1RACz07iqgWQMuB5g9AlQN281X5dEp7X5RC8JC00Tejo5EGqJjcr8LhTywCXu1g=s120",
								created_date: "2021-12-30T23:22:07.760982Z",
								distinct_buyers: 1,
							},
							{
								name: "Mutant Shiba Club | MSC",
								count: 1,
								total_sales_in_gwei: 249000000,
								image_url:
									"https://lh3.googleusercontent.com/fXfimMmYPjo4jvl7IrhZkii8ZtAh5-_n3Pw824KaxfWVYWm5i7ueh9GVJAc7v9hjivXevoK0ReWya9F8oiIPcfSrMMsFIyTZhM8TLQ=s120",
								created_date: "2022-03-29T23:10:29.778472Z",
								distinct_buyers: 1,
							},
							{
								name: "Gray Boys: Science Lab",
								count: 1,
								total_sales_in_gwei: 138990000,
								image_url:
									"https://lh3.googleusercontent.com/IKHZ7hSQCwGa_wcc2GOoDwUwKZsZ-XzKGwyjcaklDCiROYq2JKVG-05LEpRtesFUbBYd4xyQTACmxdRUtw0R-eForzUK73GaA4A8=s120",
								created_date: "2022-03-31T05:20:47.895725Z",
								distinct_buyers: 1,
							},
							{
								name: "SKULLTOONS Gavroche by Theodoru",
								count: 1,
								total_sales_in_gwei: 40000000,
								image_url:
									"https://lh3.googleusercontent.com/DXqcBeG28Viqj4QQp-BMPqwCfmL_Jkveq7S5netvbRPpBGtIkvWncvApaKRh1TcKS5zE7y5fo5n9OmABIYdlrRTDDbz0u1KsdTrA=s120",
								created_date: "2022-03-18T19:40:07.207585Z",
								distinct_buyers: 1,
							},
							{
								name: "CryptoHippos Official",
								count: 1,
								total_sales_in_gwei: 88000000,
								image_url:
									"https://lh3.googleusercontent.com/cKot66xP_sbhBsgrIB7oufLqMdnLQ9T2zkrPlwX-E0WTdWxSROIX2sbr_piex1ihiQBdMnqMbHklJmIu5Ai_WCNy8qluUnbZ1u5Zkw=s120",
								created_date: "2022-02-22T03:38:31.519169Z",
								distinct_buyers: 1,
							},
							{
								name: "Space SlugZ",
								count: 1,
								total_sales_in_gwei: 10000000,
								image_url:
									"https://lh3.googleusercontent.com/IF82nqXUHxRAwERjYIQJ2fBAy8nIMxA6IegPSfp-EG_J8Jgizu_1ZmWtKcom5dEkmXHWKoH8HUBI3riH0AiEWF1Jcu-VVrf4t5bNYg=s120",
								created_date: "2022-02-26T19:22:42.039054Z",
								distinct_buyers: 1,
							},
							{
								name: "HeadDAO",
								count: 1,
								total_sales_in_gwei: 92000000,
								image_url:
									"https://lh3.googleusercontent.com/JRXwsJJ0RexPHPd1jQf88efrIsepmn6URx9GyTGd9pba6S-7xJj3fXh5uIdeKjbi2AkBS-8Gsp1gU-LKIOhfi8Z3zYH894bN0yofxhk=s120",
								created_date: "2021-10-17T21:57:12.095051Z",
								distinct_buyers: 1,
							},
							{
								name: "OKOKU OFFICIAL",
								count: 1,
								total_sales_in_gwei: 25000000,
								image_url:
									"https://lh3.googleusercontent.com/JGeeBYDjsMy63PxTNbobcQXQaEPPKvAWFy0ng6OeAZqcpRGs-Q529aM_IA0Bmobv9-stHhQn09QePYqcQIbAeObiz-zf7ChRMw8V8g=s120",
								created_date: "2022-04-06T16:48:10.619389Z",
								distinct_buyers: 1,
							},
							{
								name: "Peacefall",
								count: 1,
								total_sales_in_gwei: 166800000,
								image_url:
									"https://lh3.googleusercontent.com/sd-FLUhI_px5C_v7nMaU5ieokwN9XyrkH_Qj_7us9NrU56Z3ASN9H4IqrAFnWM-r4HqlD_uh6uZ2Qv6acw3iuFgSjCoQuUk1lEYm=s120",
								created_date: "2022-03-22T13:18:48.466276Z",
								distinct_buyers: 1,
							},
							{
								name: "Akuma Origins",
								count: 1,
								total_sales_in_gwei: 800000000,
								image_url:
									"https://lh3.googleusercontent.com/xla27hWmOcgl7USvsJMfOU9MPzJz3ltIJc1SKQAubteF_NTIKDaVJoGnYVrI6b6OADrl_esygWKIumCqYzEItR01lZ0CL1RJZhRMhig=s120",
								created_date: "2022-03-31T18:43:20.530159Z",
								distinct_buyers: 1,
							},
							{
								name: "MoonBirds,",
								count: 1,
								total_sales_in_gwei: 35000000,
								image_url:
									"https://lh3.googleusercontent.com/QsHHhJhzzqFmW_i7qENvzJMq0RI5BdReUaEhYtCEvhLDIJIDCCjrXoHNp-CIl93FMD8ovRRsgFzeCQihyWd55WnkyenfITEH07WmBA=s120",
								created_date: "2022-04-10T07:05:42.324054Z",
								distinct_buyers: 1,
							},
							{
								name: "Chibi Frens",
								count: 1,
								total_sales_in_gwei: 65900000,
								image_url:
									"https://lh3.googleusercontent.com/gp4b4TiQeYUOMlvkJhHvytb-Y6vk0WeA0m366vIA_j8Fx2fijn9tdVnToFHGHYvNZ2cP3T-IySQQFckpEaKTestmvwWemTXJj7OT4Q=s120",
								created_date: "2022-04-12T18:19:55.292461Z",
								distinct_buyers: 1,
							},
							{
								name: "Atem NFT Passport",
								count: 1,
								total_sales_in_gwei: 7800000,
								image_url:
									"https://lh3.googleusercontent.com/y47TUeZY1kGgtE84faZyftIrkpWRttxUoPVGcU59wsdZxjM2d11TUMZHtXuhni1vlCei_uKKeVnJ2oOK4fwtaIv0FKpYsyP6duaCL_8=s120",
								created_date: "2022-04-04T14:35:10.097492Z",
								distinct_buyers: 1,
							},
							{
								name: "Private Jet Pyjama Party First Ladies",
								count: 1,
								total_sales_in_gwei: 600000000,
								image_url:
									"https://lh3.googleusercontent.com/egBcRMpz1NOv_dOxLMTWeP3KgusUk9CqQoq2DlR5W3GsY-jdLEXrhjX1vlnDL5RVr0TQNnCJ7QuyoN-5kxJ0ReCHAURUpik6Kz8dbvo=s120",
								created_date: "2022-04-06T16:00:26.586168Z",
								distinct_buyers: 1,
							},
							{
								name: "BYOCraft",
								count: 1,
								total_sales_in_gwei: 130000000,
								image_url:
									"https://lh3.googleusercontent.com/loLaTLldopCn0--dDGt77s-5pRf9-s0LljgUgRszbCJpkW2ylJ4ZdElCkOxDWbMSylTPLttePH0Is3h7YbDbbnLCpFShkPeK1yGppw=s120",
								created_date: "2022-03-10T19:34:36.119153Z",
								distinct_buyers: 1,
							},
							{
								name: "Omni Robotics (ETH)",
								count: 1,
								total_sales_in_gwei: 6900000,
								image_url:
									"https://lh3.googleusercontent.com/avWIGz8N2BUGScF1ds7As85OiEZwiVnlaZXHkfTise23heGzpg3xBsPuGlG9FbT8SIl6jU59U8ENisGr4NVhsFQEbzJz6mZoKuVGYA=s120",
								created_date: "2022-04-12T22:11:27.663502Z",
								distinct_buyers: 1,
							},
							{
								name: "I'm Frank",
								count: 1,
								total_sales_in_gwei: 28400000,
								image_url:
									"https://lh3.googleusercontent.com/QhTw6ymUf9I6fGOHkLVlssqaTC8Ytw1jgvNKxFOVgAZpFyF_w-EUpVayy_a9rL6A3RuvxMFsyVWY5fTKm8mSxUGiaWc9zssM7CLxhA=s120",
								created_date: "2021-10-20T19:05:38.009061Z",
								distinct_buyers: 1,
							},
							{
								name: "Gutter Juice",
								count: 1,
								total_sales_in_gwei: 290000000,
								image_url:
									"https://lh3.googleusercontent.com/xsApnCm19QrZDa8uPuZ8GBoNxRbKW5aPZQsUedWh3giAEM5Oo7dEDDjAQcEdVHDvbDlHfmOOv2mqyv5owaGHWvmDfc4zZ8Nq-gRxbw=s120",
								created_date: "2022-03-08T21:08:40.869515Z",
								distinct_buyers: 1,
							},
							{
								name: "Nerd Head Club",
								count: 1,
								total_sales_in_gwei: 3500000,
								image_url:
									"https://lh3.googleusercontent.com/T9_Fa35HGbuHWz0FK1ffhIY1Iyii9ZsgLftvnL77hJldpdUGGBAuxRs15qRZ4lrBrnMM-tQMcG1IWBViP10N0CNwCp7wNOPiBdJJ=s120",
								created_date: "2021-10-11T03:06:55.575362Z",
								distinct_buyers: 1,
							},
							{
								name: "Aww Rats",
								count: 1,
								total_sales_in_gwei: 14000000,
								image_url:
									"https://lh3.googleusercontent.com/eLazEpRaRPM81c1n2gdzr5SSGeLFuAOd6wqKczLdQoOtLCz1eLKbZSYpuKWKbvdBLLaYlxIdzDhM9GmHr6ZVrJNYucUShG49YU8-Zw=s120",
								created_date: "2021-10-03T05:36:40.529081Z",
								distinct_buyers: 1,
							},
							{
								name: "CryptoVerse Spike",
								count: 1,
								total_sales_in_gwei: 17000000,
								image_url:
									"https://lh3.googleusercontent.com/uEsoyYR3z49RiWdSSB39IuAriZZVcHGJld3mAYfCpKm07RknRppdy8aVrCFE2ah_0Jk6JUd2BDQO2XUtwxULxvEarSP32uJRJsdoyA=s120",
								created_date: "2022-02-08T19:08:32.43469Z",
								distinct_buyers: 1,
							},
							{
								name: "KUSHO WORLD",
								count: 1,
								total_sales_in_gwei: 6500000,
								image_url:
									"https://lh3.googleusercontent.com/hi11J3w1iwwxZZGe3tb_DWgjZvkgEFcq5DXffeC0Nx2Rdd1EMTz-HldtYlU8tDKlKOzBBUl9dsV7Xb6-i1CDYkelg5X7bc46JJx8lg=s120",
								created_date: "2022-03-15T17:35:25.546292Z",
								distinct_buyers: 1,
							},
							{
								name: "MetaSoccer  Youth Scouts",
								count: 1,
								total_sales_in_gwei: 57000000,
								image_url:
									"https://lh3.googleusercontent.com/JZTuy0tsGfGUy_oazi1H571fE48IlK8vbv_cHKHSc9llPtcoYjIm-_0OisDq6gdRWOqfHtulkkhY5zL1lIi7OnP_hnuVNXBErTux=s120",
								created_date: "2022-01-19T20:47:24.879085Z",
								distinct_buyers: 1,
							},
							{
								name: "Bouncing Sushis",
								count: 1,
								total_sales_in_gwei: 2000000,
								image_url:
									"https://lh3.googleusercontent.com/nu55IM6Zu39LTT0fgvcu1pzjSwjVStqy87ALd_eWBeM6dIYcRv713k61pyevMKD4URQbuLV4v3cRwKCH9_UPhJFPqpG3Ev40dsdqlug=s120",
								created_date: "2022-01-20T13:42:57.598204Z",
								distinct_buyers: 1,
							},
							{
								name: "Ethermon",
								count: 1,
								total_sales_in_gwei: 1000000,
								image_url:
									"https://lh3.googleusercontent.com/u485S1UVF8xufP54ZtynanKbb0KnPllKJQDjg8JESNS7tRYhMEMXkS2Ss7PcxVlh5PT9VlhYsYIJvGMIdy3PcfFazsfGxjCarTCW52U=s120",
								created_date: "2019-04-26T22:13:09.153813Z",
								distinct_buyers: 1,
							},
							{
								name: "The CryptoBear Watch Club",
								count: 1,
								total_sales_in_gwei: 690000000,
								image_url:
									"https://lh3.googleusercontent.com/aFkUo8Fr340Nz6xgb9FTmiyK7atG70xFufd5z0OZGEuYZb-miubcTCd5-0XJ7Tixm3Wt5RqIUuSEZ0uTTFI3HZLP1r22iVoqOISZcw=s120",
								created_date: "2022-02-21T08:24:43.087568Z",
								distinct_buyers: 1,
							},
							{
								name: "Loveless City Metropass",
								count: 1,
								total_sales_in_gwei: 142000000,
								image_url:
									"https://lh3.googleusercontent.com/kKlBgXFbfEjo-d72xOLbVjbZi3kReV0CMrk_6RetSgErP_2XpTtYbxKAQ9LvQbYk_bz4hnEVzKqHQvbVBxrOGzdCjagDo8CNmk0K=s120",
								created_date: "2022-03-04T15:14:16.122731Z",
								distinct_buyers: 1,
							},
							{
								name: "Quirkies Originals",
								count: 1,
								total_sales_in_gwei: 3900000000,
								image_url:
									"https://lh3.googleusercontent.com/XS6RqsT7CBpoeX8vUmWkJYldMV6h0Ko7TpagNgFZ-nEh4yrMZFrpY4gtBqyuRDJV6mx2B0ssYxoh9Z9XlO770Xe8FNSu-kj-1EVzMQ=s120",
								created_date: "2022-02-10T21:09:31.86096Z",
								distinct_buyers: 1,
							},
							{
								name: "ExpansionPunks",
								count: 1,
								total_sales_in_gwei: 285000000,
								image_url:
									"https://lh3.googleusercontent.com/wOcdC7XRZ5JZ3Z5xym5jEi895YGuZKzrDxRLaxHPXWBPxH8fzXs9_7oml8mka4Suj2xp-yAu4q9Qp3-vx5aiWCbh-WCyu2pybUUEIQ=s120",
								created_date: "2021-08-15T05:37:14.456999Z",
								distinct_buyers: 1,
							},
							{
								name: "Bad Baby Dinos",
								count: 1,
								total_sales_in_gwei: 90000000,
								image_url:
									"https://lh3.googleusercontent.com/SPqdKjRKCuWCAM4CROgWQIi981bpu691A3-oyr21GhXTeqNaP-iq22dgG8mkKkml8zmvoi_VesCqfDL6fktxk2SxzuNkcrdsssEnrw=s120",
								created_date: "2021-10-15T11:02:07.834716Z",
								distinct_buyers: 1,
							},
							{
								name: "Creature World",
								count: 1,
								total_sales_in_gwei: 750000000,
								image_url:
									"https://lh3.googleusercontent.com/PkMdNUr4UsEq5RLvAm721Ja5QGAijunAVDMz0hfRuyHQn853TRQzKL4aTFBgWPoy-nWlYA3hXzAm7flCmKn7Z9p2HN0GJxAtAixB4g=s120",
								created_date: "2021-08-28T19:25:09.137211Z",
								distinct_buyers: 1,
							},
							{
								name: "MAPC - Maniak Aliens Philanthropy Club",
								count: 1,
								total_sales_in_gwei: 20000000,
								image_url:
									"https://lh3.googleusercontent.com/vcVSlay_Pq60moR_dJ10BEi1gomuiQ2LuxVOqEYC8hbXzxhdSNjzPFCOleTmAdU1Q_D15EPk1VBp9nhyUODxMPc4tND7hcQqiA_X=s120",
								created_date: "2022-03-20T06:08:06.359337Z",
								distinct_buyers: 1,
							},
							{
								name: "Toxic Ape Official",
								count: 1,
								total_sales_in_gwei: 150000000000,
								image_url:
									"https://lh3.googleusercontent.com/DZbtP9-eZMaBMTweX8xJyubbbekPuLN1wEkFNso_XF5R51A6q0qoHSs6g_4mkmb3jCHWsrByRiLmrHsIQIY-555jN58MDNgrpyPX_IA=s120",
								created_date: "2022-02-20T12:00:08.536505Z",
								distinct_buyers: 1,
							},
							{
								name: "AlphaSharks NFT",
								count: 1,
								total_sales_in_gwei: 550000000,
								image_url:
									"https://lh3.googleusercontent.com/TKjFmkGpVMXP7m3Hi-N_90yEd1gSQ7Vp8iK2MC40dcOYFWEZlIPb0YbQLMU9nuReNb-ACCxx_ap_ny0aQFLK8o8Tp7FfftYibpBf-fA=s120",
								created_date: "2022-03-25T12:28:40.934386Z",
								distinct_buyers: 1,
							},
							{
								name: "Giraffe Manor Club",
								count: 1,
								total_sales_in_gwei: 0,
								image_url:
									"https://lh3.googleusercontent.com/YEEN0TzFsxP8_rPHT_pOS3SAYAJi4m0ZuWULURxGGh1DyGwr9wm7Olqmr03YuTeXcEwMhvH6xhYd_ReBFo2WJbch2oNgg9MpJMNmZ-Q=s120",
								created_date: "2022-02-02T23:18:50.753704Z",
								distinct_buyers: 1,
							},
							{
								name: "Retro Arcade Collection",
								count: 1,
								total_sales_in_gwei: 130000000,
								image_url:
									"https://lh3.googleusercontent.com/fUmjYrAwDDO6yitJ1VgR1e9jzmf7y4geJ19JhpHcE3wpH8jdOAol1YgM-c9QmkZ3N4e-MKSV5-58jv8BzQQoc0b5uVS72qViz_s6=s120",
								created_date: "2022-04-06T13:34:28.683835Z",
								distinct_buyers: 1,
							},
							{
								name: "Meta Penguin Island",
								count: 1,
								total_sales_in_gwei: 15000000,
								image_url:
									"https://lh3.googleusercontent.com/wM3TKt4edpku5IgFw0JVLhFDdX-jrZo9IOAfglxBK7rutL5_gMhkmGvA_ObLttfdldZEiAdhxLUrUx75m59SksAvK95Qz5WsYXdZBw=s120",
								created_date: "2022-02-13T14:34:43.361914Z",
								distinct_buyers: 1,
							},
							{
								name: "PUNKS: Origin Stories",
								count: 1,
								total_sales_in_gwei: 79000000,
								image_url:
									"https://lh3.googleusercontent.com/MBHzz-Zn41uYiFYrAGyWL8Gx8o0lMveo5jlB9B58LipgRfgLN-XVm0TXE-J5RNexYqj9dCYFgh_iAeOagXms8O6f3rSNcQyL7jXLrg=s120",
								created_date: "2022-02-17T12:05:49.608141Z",
								distinct_buyers: 1,
							},
							{
								name: "Skallz",
								count: 1,
								total_sales_in_gwei: 38000000,
								image_url:
									"https://lh3.googleusercontent.com/XhPYJ02tV9KwvXQ-1792AwXb9zg1o_b7_SCLqS_1IDG6zxiPi48dDuxaIr-dyxyvS8yZUkzjp90T_M6gXhmJg9HQpFlEtxZzcFia4FA=s120",
								created_date: "2022-04-11T06:01:08.478817Z",
								distinct_buyers: 1,
							},
							{
								name: "Look Labs 420 Game",
								count: 1,
								total_sales_in_gwei: 450000000,
								image_url:
									"https://lh3.googleusercontent.com/oLh0YxnRwrQLb0G58iVuPOshNhLEe5Djx99pnbR8dqgHTR-2BZKuPXVL3nPH93_BJxDZ2EcOOHVcb3xN7UnMF9yJlgnzuGJVhxF4MQ=s120",
								created_date: "2022-02-12T17:00:33.980799Z",
								distinct_buyers: 1,
							},
							{
								name: "Metapals Metaverse Pass",
								count: 1,
								total_sales_in_gwei: 34000000,
								image_url:
									"https://lh3.googleusercontent.com/3bJVE-i1HPB2Q-9xGXYGm6SPQDRdVQXe9TIV62Ot6fSLnqu_W2rK2trdOz1Yh8Um0JwplePeuKFW4N43Rgtnk5VoLHATu-pPtfNQdA=s120",
								created_date: "2022-04-09T00:20:26.857674Z",
								distinct_buyers: 1,
							},
							{
								name: "",
								count: 1,
								total_sales_in_gwei: 25000000,
								image_url: "",
								created_date: "0001-01-01T00:00:00Z",
								distinct_buyers: 1,
							},
							{
								name: "Shroomojis",
								count: 1,
								total_sales_in_gwei: 10000000,
								image_url:
									"https://lh3.googleusercontent.com/2R7B2wmzu-s1lt6kj0TgWGFaYwVYvcaYbXqrUrRUF7WRcuXvRDRTaKVFTCDii70iFDJyaFaI3CT_OD-uetg_UnLImE7AT0xH4VmlXQ=s120",
								created_date: "2021-11-22T01:23:55.032794Z",
								distinct_buyers: 1,
							},
							{
								name: "Mirandus",
								count: 1,
								total_sales_in_gwei: 400,
								image_url:
									"https://lh3.googleusercontent.com/zH2rP3EBA9cpYdlxCkQhLAiJzqyoIIkQ6ex5YkbRczElE6H4-suVezS7gOkM143PFcns_WYvN0qwWKF2eJAL57t_0COOK5VGP5Y5Bw=s120",
								created_date: "2020-10-06T14:44:37.466864Z",
								distinct_buyers: 1,
							},
							{
								name: "CartoonsNFT",
								count: 1,
								total_sales_in_gwei: 34000000,
								image_url:
									"https://lh3.googleusercontent.com/VyVQ32g-wP3_k6rYQFZSoP7pf37cSw_9Yvr6L_gGZxx5zZTjVJyRxzwyVUakiKLRu9KFZnBjgrOWsH2rQ8zt4QyzplRirqUiIZ9b=s120",
								created_date: "2022-03-01T04:16:52.834092Z",
								distinct_buyers: 1,
							},
							{
								name: "Lazy Lions Bungalows",
								count: 1,
								total_sales_in_gwei: 450000000,
								image_url:
									"https://lh3.googleusercontent.com/3KcspJbsroNdhSs8ATcyKpKL_xjwUVlsSIhqxM_1qofjQF-pUFr-P88ehsk45uhLN_pQM02HOyp_HRQW7FaFxfVio9t8QVxrzTFfQw=s120",
								created_date: "2021-09-25T12:33:38.189249Z",
								distinct_buyers: 1,
							},
							{
								name: "Standametti",
								count: 1,
								total_sales_in_gwei: 100000000,
								image_url:
									"https://lh3.googleusercontent.com/PyjdGzxwecPFyts98HLQW4Yq2oD-dmhg22h7UKZufLgHZJ10Scq7LoQRt1t1NK_A80umUUE7exBVtDwnP_oqEC99wC2OL-RV0o9cWQ=s120",
								created_date: "2021-09-25T16:32:52.072188Z",
								distinct_buyers: 1,
							},
							{
								name: "Legend Maps Adventurers",
								count: 1,
								total_sales_in_gwei: 39000000,
								image_url:
									"https://lh3.googleusercontent.com/S9hnzYWa3a4DoOJ4KK57iUFzjBQw7fUGkChX9nHUI5jv0v4RvvAk_DFe31PAXWZ_facSg5I0_kJH4g-FltS7An1gMR0H5397Y39b=s120",
								created_date: "2022-04-11T20:37:20.106137Z",
								distinct_buyers: 1,
							},
							{
								name: "WonderPals",
								count: 1,
								total_sales_in_gwei: 350000000,
								image_url:
									"https://lh3.googleusercontent.com/DA_iUjt7S9PdmAANh0aqMkxYVhvGogTuKbMSzFO3uEnbvRRt5hn1B8DuN50HQpkRtH34QX7EOYYKIayz1q5KgZWfgLedNo7xBQzK=s120",
								created_date: "2021-12-24T21:04:28.518631Z",
								distinct_buyers: 1,
							},
							{
								name: "Meta Angels NFT",
								count: 1,
								total_sales_in_gwei: 300000000,
								image_url:
									"https://lh3.googleusercontent.com/J4sUEAJDbvc-6bgkHQyNtQRxlFr1CkZZ1d14DSGR1x7miJZN0AXcV81Hlc9yQEx3XkyAnvbeFukFQlODyNDjwBcIvHOsh7eeYTIQnWs=s120",
								created_date: "2022-02-07T17:15:39.173425Z",
								distinct_buyers: 1,
							},
							{
								name: "Wassies by Wassies",
								count: 1,
								total_sales_in_gwei: 685000000,
								image_url:
									"https://lh3.googleusercontent.com/ju6vDR0sbEvqT0bAb4QPEzYMzpReEllDZ5MlICtxqJu76G5UrZ0cT-w6X3Mzf9e8KXZXJGNIyXGDRAoL-qlaApiJsj27ZdbOY5VvCA=s120",
								created_date: "2021-09-22T23:40:47.337198Z",
								distinct_buyers: 1,
							},
							{
								name: "Kindergarten BabyApes (KBA)",
								count: 1,
								total_sales_in_gwei: 20000000,
								image_url:
									"https://lh3.googleusercontent.com/taWDanyn_KhLCgJv73pXQ8anHcUr2v7oX4OSwfNK0dXR6ttgFziyrSjPR1p8sS5kW4TWL5ekx2T4Ycne_Z0vWfouEFebH76KRMctobE=s120",
								created_date: "2021-12-29T12:43:46.957874Z",
								distinct_buyers: 1,
							},
							{
								name: "The Monster Punk Club",
								count: 1,
								total_sales_in_gwei: 4000000,
								image_url:
									"https://lh3.googleusercontent.com/GhlFwZolvf1RaDbKDj5X9-xkMEB0PC7Vij-Nf6lhBY69_bwYg7kwwS4MKBGwuSYu9wyalw0xRSIltm3SDgNQVSTV7aESrW046epOuyQ=s120",
								created_date: "2021-09-10T16:45:13.118735Z",
								distinct_buyers: 1,
							},
							{
								name: "Sneaky Bat Syndicate",
								count: 1,
								total_sales_in_gwei: 61200000,
								image_url:
									"https://lh3.googleusercontent.com/KotCDfiV_JINlcKba388STkwDCGyJY7fLBcmhs3ZdmNyUO_TvnnHt2vCnt90SCUWIBO_LFioesfyaFPIy-UFn8cLVlh_EAfoHqXsUi4=s120",
								created_date: "2021-10-19T20:18:45.412007Z",
								distinct_buyers: 1,
							},
							{
								name: "BIAS CARDS",
								count: 1,
								total_sales_in_gwei: 15000000000,
								image_url:
									"https://lh3.googleusercontent.com/sbmJDyxScjY8DuaOnM7LbLTvMMfuW8-nfGSHT6Q7hIjc_V8fTVxBS1nwS4_A2wkXKYH8VXtooSAKY3JuSgnYxGzKeVkH_B11B6p4lq8=s120",
								created_date: "2022-01-16T12:12:02.40039Z",
								distinct_buyers: 1,
							},
							{
								name: "Lucky Ducky NFT",
								count: 1,
								total_sales_in_gwei: 40000000,
								image_url:
									"https://lh3.googleusercontent.com/uan7HGldIJyIlYblUBIlrtwwScF3ozD9-NMN9JDDXVmwEbCXd93oypasouSG1nseZC8yWHEFR7dDlxpKIZOYOm_lL4MeVLvk9JVv2A=s120",
								created_date: "2022-03-21T22:32:47.363065Z",
								distinct_buyers: 1,
							},
							{
								name: "ASM Brains",
								count: 1,
								total_sales_in_gwei: 2500000000,
								image_url:
									"https://lh3.googleusercontent.com/IbvW1k5GNi-3kcGDSUlguX6JsqxxdJgDhEXT9pnlk8KmHch_M9QyhaES0gBY3EzECeYKUm9SSQ4y0wfPHnU7MrJHfdqS5uXm71q9fCo=s120",
								created_date: "2021-12-05T21:49:36.894084Z",
								distinct_buyers: 1,
							},
							{
								name: "AZUKl   Animated",
								count: 1,
								total_sales_in_gwei: 50000000,
								image_url:
									"https://lh3.googleusercontent.com/kiartthYt8YSsw_4IoRCX_I5D4ZYmFZW1LgemXGRMu5l_DGVt-WdjHl3zaX0OeROYcSce-m8XS6_1pFec0CIEo6Mhle1swWDIKOUwA=s120",
								created_date: "2022-04-03T02:42:40.045641Z",
								distinct_buyers: 1,
							},
							{
								name: "CryptoDunks",
								count: 1,
								total_sales_in_gwei: 15000000,
								image_url:
									"https://lh3.googleusercontent.com/sWr6F0KvlW0sXZl4eikxm6OQlW3ELLbwPIVc0BkldjMWpORryxlX5PneG2v_YH1jZ5C8mDIH4mffr99bD2Nz0jYiH8TMKz7VLdZitA=s120",
								created_date: "2021-02-19T11:39:06.354865Z",
								distinct_buyers: 1,
							},
							{
								name: "Defenders of Dogewood",
								count: 1,
								total_sales_in_gwei: 95000000,
								image_url:
									"https://lh3.googleusercontent.com/kqAP8jddJ8fKJ6kA8XY9d1jOXAJMjgC5tcqmijrytRyxpBgqVFRqxGVLA2_8NgveZgs469O7fpnzkiWX6gvGfhUQkoB_Ex6HbH8N=s120",
								created_date: "2021-12-01T22:32:28.320657Z",
								distinct_buyers: 1,
							},
							{
								name: "Dracattus",
								count: 1,
								total_sales_in_gwei: 10000000,
								image_url:
									"https://lh3.googleusercontent.com/e-1Ge4GclC-BwmXQBtK8crG4R2_nvh-JhkDYbeXiEqNx9N0KuGyNALyNbsxF26xBwNmpwYtaIS1Rvx-jKda5chx7nqA0X4HQARb4=s120",
								created_date: "2022-01-28T16:03:33.327578Z",
								distinct_buyers: 1,
							},
							{
								name: "Bridges by Oshi",
								count: 1,
								total_sales_in_gwei: 160900000,
								image_url:
									"https://lh3.googleusercontent.com/xPfFBX3-F-QyIFyMqPGlKWYoWMZA15P9Tt30UQaVTnrJ0HY9j6vvy_XGN9POT37bqnX97qapFVTG_cCrt3w21Y35LIxA74_kZFpz37c=s120",
								created_date: "2022-04-11T04:00:15.3575Z",
								distinct_buyers: 1,
							},
							{
								name: "Goopdoods by Goopdude - Official Collection",
								count: 1,
								total_sales_in_gwei: 260000000,
								image_url:
									"https://lh3.googleusercontent.com/Bfx317HTqAqQQJNp9vorDeHSN3xI8ToSLadwJPCe79XZ6hpukQYZ4joRUJXykGWleLGCZTBJ6hqRS3qLgciVG8Kx5TwVjXqSD3unOg=s120",
								created_date: "2022-03-15T16:00:55.117523Z",
								distinct_buyers: 1,
							},
							{
								name: "EtherOrcs Items",
								count: 1,
								total_sales_in_gwei: 21200000,
								image_url:
									"https://openseauserdata.com/files/c11429c7afc0015c888647062e2e65e4.svg",
								created_date: "2021-12-15T21:49:27.723789Z",
								distinct_buyers: 1,
							},
							{
								name: "Crypto Raiders Characters",
								count: 1,
								total_sales_in_gwei: 23000000,
								image_url:
									"https://lh3.googleusercontent.com/44XZseVPcTMuIseriL_HWueJ1pVaTp7p5JbMlAyQccPRCE3IsbOohEZ9WzKH0zOlmXIUsEH8NIULCA5PunKfNhTAi2yhXyVim745OA=s120",
								created_date: "2021-07-27T20:17:27.309363Z",
								distinct_buyers: 1,
							},
							{
								name: "GOD HOOD",
								count: 1,
								total_sales_in_gwei: 75000000,
								image_url:
									"https://lh3.googleusercontent.com/HFKrRSd39Z5QMYQ8vVWSr2uEnE9caTBQ1MIzZLY1o06GEGdWK8Wqq23vPd-UdHFyuvRKxH8U7U58Qxio1FibdQm6HTSJW-NMtK4Q=s120",
								created_date: "2022-04-02T10:52:01.789991Z",
								distinct_buyers: 1,
							},
							{
								name: "World of Zuki Women",
								count: 1,
								total_sales_in_gwei: 20000000,
								image_url:
									"https://lh3.googleusercontent.com/U24pNxQ3d3hQJ6THPTdmSTYKr7Ij7P4Hi1o2mp4vzXO3lzI6AjGzAycqrFREEqup4QOjj25vNMGzXfdzUYjCxYWA54slSV5Szi8Khzw=s120",
								created_date: "2022-04-02T13:41:14.564116Z",
								distinct_buyers: 1,
							},
							{
								name: "Ragnarok NFT: Collectibles",
								count: 1,
								total_sales_in_gwei: 10000000,
								image_url:
									"https://lh3.googleusercontent.com/Nh7jqQPVercrZWOCWxbIujhOGQ4i_x6-uzonVk1U45tyEoJi6rhhJuhiMwWgxIeqXJpqXBxd6mKToAwHL7DPpY6s4qh9cL8zU0kZXYc=s120",
								created_date: "2022-03-13T18:42:40.15074Z",
								distinct_buyers: 1,
							},
							{
								name: "Apes in The Forest",
								count: 1,
								total_sales_in_gwei: 2799980,
								image_url:
									"https://lh3.googleusercontent.com/poVdfTXqD3gsKNrmz-ptjAo2Mn8g-epKJHYigyHNZUW1o9ObK3ryYO7_BlvHcClEU8MpXGNFRihemoKrYSi8_LZEkZ7nATi_7lPm=s120",
								created_date: "2022-03-27T02:33:20.839903Z",
								distinct_buyers: 1,
							},
							{
								name: "Ethalien VOX",
								count: 1,
								total_sales_in_gwei: 25000000,
								image_url:
									"https://lh3.googleusercontent.com/7W8nEqYdWEFY1bF31tMZmZnsZ3V3cY4qi7PqWpQKWyl1Q-MNsQKa2jj9OYJJ6XaHAH1Z1HofdpM9TsJmRSmIHR0Zs6f9e7w663DX820=s120",
								created_date: "2022-01-28T08:19:13.491468Z",
								distinct_buyers: 1,
							},
							{
								name: "Bored Dilfs",
								count: 1,
								total_sales_in_gwei: 1521300,
								image_url:
									"https://lh3.googleusercontent.com/TwgEhYdBar4Bl28ZvtttfDyRFK9PZBoZbJPOW3x-vbHFIhITZ1Y8WFh5hlRKT8otrYhwgseV3ABUQNdkXpPaQbQn0wc_qn0kDU6B=s120",
								created_date: "2022-03-06T21:53:23.538435Z",
								distinct_buyers: 1,
							},
							{
								name: "Sealenza by hrunz",
								count: 1,
								total_sales_in_gwei: 10000000,
								image_url:
									"https://lh3.googleusercontent.com/Zjnf4e0XJdTW7_X7LZbrb3MYrikiQhqnRHMYWGenlaF6KWg3ogsYD0KNLOcolSKrEwBAieGu6Wo5IL9ycHoIMapquh7gprS7svgfAw=s120",
								created_date: "2022-02-07T11:13:51.767459Z",
								distinct_buyers: 1,
							},
							{
								name: "Badass Ape NFT Club (BANC)",
								count: 1,
								total_sales_in_gwei: 250000000,
								image_url:
									"https://lh3.googleusercontent.com/2vDmF7xR2WfMJbUyI0zpRCoc57U0ykiQquo1Dc6AiH8r6x5gG6mRNrQzktbw_wbaDMDQJqJ2WI7mqLTkVBgZeYgH_qMMwigUOE0MPA=s120",
								created_date: "2022-03-16T22:04:24.158121Z",
								distinct_buyers: 1,
							},
							{
								name: "VeeCon  Tickets",
								count: 1,
								total_sales_in_gwei: 610000000,
								image_url:
									"https://lh3.googleusercontent.com/6rZAbasga3ZTc2Y7upz_SOnxM39o9jpACORg0pyfWf8EuUrWmEVhzEV-CtOHX2oOVF0WOddYxjMQgkzZCLUiFtzwzSsITkaMilsd=s120",
								created_date: "2022-03-23T01:39:53.977149Z",
								distinct_buyers: 1,
							},
							{
								name: "Crypto Unicorns Land Market",
								count: 1,
								total_sales_in_gwei: 269000000,
								image_url:
									"https://lh3.googleusercontent.com/jLi7QyLxZLXAeAqtKuecs5ebhGpDwWG6iI_EsfeXanpCCjCnDtqW9Db4b2ZAO0poqfIgBuGdYmyJCFL-c9wVJFIjJUZ2Lmna13kTDg=s120",
								created_date: "2022-01-03T16:56:24.208893Z",
								distinct_buyers: 1,
							},
							{
								name: "Ben Mezrich Project - Bitcoin and Billionaires Collection",
								count: 1,
								total_sales_in_gwei: 52500000,
								image_url:
									"https://lh3.googleusercontent.com/xKp1hSoG-y198df4DNIYWWYF1L7ajMFGsdRE63qbXiVP7r1PH0WrbQ23b_4Wzd9bOkLN6u7eLz79KRMC4LIXu4Bto8nLZfJV5OIReA=s120",
								created_date: "2022-03-30T17:45:26.192401Z",
								distinct_buyers: 1,
							},
							{
								name: "HappyVoices",
								count: 1,
								total_sales_in_gwei: 100000000,
								image_url:
									"https://lh3.googleusercontent.com/UvrAFtCYpo-nmQyKj4dhEQzqYAWxQGRlwd_Scj5_mBZ_Nw8LfhQD16NDkANIylw_Jt7iYhKTJKPgyLrGXrGYDl_E5yKauHbhlCzYCA=s120",
								created_date: "2022-01-27T09:49:34.844641Z",
								distinct_buyers: 1,
							},
							{
								name: "Psychedelics Anonymous Genesis",
								count: 1,
								total_sales_in_gwei: 3000000000,
								image_url:
									"https://lh3.googleusercontent.com/9VndAx-5SvVdamB8KvABGcw2bdXMdeyEYdhHJ22WMV98C2yS85SDT5rnBtT0zOxVjeJ6KBz2fXKXcYSIXeOc7aGiU4i0Rx9IwaMfO9o=s120",
								created_date: "2021-12-22T21:00:33.484429Z",
								distinct_buyers: 1,
							},
							{
								name: "Obscura Mint Pass",
								count: 1,
								total_sales_in_gwei: 1100000000,
								image_url:
									"https://lh3.googleusercontent.com/5nxR0sWPWauZMRHm0JnlDvn65zPBmlfDkwU5_uyWKLRyCQEUIb-GOGyQ4aeM3VaOBtewX-VS5njYYvvxnxKptMZkpU72xw4LpNpeGw=s120",
								created_date: "2021-12-27T20:33:33.349533Z",
								distinct_buyers: 1,
							},
							{
								name: "RaidParty Fighters",
								count: 1,
								total_sales_in_gwei: 148900000,
								image_url:
									"https://lh3.googleusercontent.com/xFWORGa69G8bUyY9cDTO-33PSBKd2Ua8GoPQj_0v1xyYgyUYRR05QJi7Fl4Xv75Vdxm-j8Ov5m9hIpR6tw246IGAOGP7vB4VTulYnA=s120",
								created_date: "2022-01-31T13:40:41.905169Z",
								distinct_buyers: 1,
							},
							{
								name: "Project MIP Network",
								count: 1,
								total_sales_in_gwei: 33000000,
								image_url:
									"https://lh3.googleusercontent.com/r-3uEX1r-zgsjSc389aPmH0nXcjNRtG1kc_9hqqL7gMkTZ538IO0fzJ5PfGLhg4Zmwq2j6rOUFJdcwFazOxu4hEnFsNKuak5QUAKfg=s120",
								created_date: "2022-01-25T17:30:57.407633Z",
								distinct_buyers: 1,
							},
							{
								name: "Weird Whales",
								count: 1,
								total_sales_in_gwei: 138000000,
								image_url:
									"https://lh3.googleusercontent.com/88MMlyhOGXV85s2yTqowslZsU6CObwC7tFOUi5faTs9jR3KRaBAyg5hRK1SuwJZw7iO6JersTiiHM-vJ_oA1iwQ_0SEwxfboNaoY=s120",
								created_date: "2021-07-19T10:06:14.086325Z",
								distinct_buyers: 1,
							},
							{
								name: "The Habibiz",
								count: 1,
								total_sales_in_gwei: 870000000,
								image_url:
									"https://lh3.googleusercontent.com/CmVGfawvyc-qv-RqqhSbN_t2svxwbOvWrYsvGhH2pY8cU2f07bmOe1vAXu26ZIWoJLRn8D0ubKAhCmZ30bG7COO0fO614UQmC-W9_A=s120",
								created_date: "2021-12-26T14:17:40.291597Z",
								distinct_buyers: 1,
							},
							{
								name: "DRP Member OG",
								count: 1,
								total_sales_in_gwei: 135000000,
								image_url:
									"https://lh3.googleusercontent.com/wzQBiumWsECmCBCodeLG7RbDNcpib0kTmKrsiYqUfpExwufKIAGkN8W9lqp7UtzEBfoPuPtlzDE7IGl0a1FKVyuYfNFKqSrDtRr0=s120",
								created_date: "2022-01-15T04:45:02.627157Z",
								distinct_buyers: 1,
							},
							{
								name: "HUMBL - EW3RL1m6cH",
								count: 1,
								total_sales_in_gwei: 16700000,
								image_url: "",
								created_date: "2022-04-12T00:57:30.09776Z",
								distinct_buyers: 1,
							},
							{
								name: "MonkeVerse",
								count: 1,
								total_sales_in_gwei: 20000000,
								image_url:
									"https://lh3.googleusercontent.com/tg9kYR5tW3acrZInDc1iOBiORL5kwzwRlEQBPlLWHAMkwDuTIIZO3XhhUY8VcgG2QdO8UOmqgCfVKweqOaG1pK72kzG01jXUcneOZA=s120",
								created_date: "2021-11-14T09:57:03.809274Z",
								distinct_buyers: 1,
							},
							{
								name: "Gaia Kronos",
								count: 1,
								total_sales_in_gwei: 1200000000000,
								image_url:
									"https://lh3.googleusercontent.com/4i1fVTYmdwPIYeLpbFdykieHtWBz_DqY_-JAgrgPzQ8AxtXjZBSEfg1JbHPCsdnOTt8J4ip6NFF9306IA7GsPC4Xw_SvnYAyjO5XzQ=s120",
								created_date: "2022-02-09T09:17:08.198762Z",
								distinct_buyers: 1,
							},
							{
								name: "",
								count: 1,
								total_sales_in_gwei: 35000000,
								image_url: "",
								created_date: "0001-01-01T00:00:00Z",
								distinct_buyers: 1,
							},
							{
								name: "Bored Otter Club NFT",
								count: 1,
								total_sales_in_gwei: 1880000,
								image_url:
									"https://lh3.googleusercontent.com/hciZxVI-WeTJwctB4HzeOX2y_VmZA6mRtUVqZ-uqj6ppFkcyMXkhd6hvzZUarxre4UQpOh9qtekFNNawgnMt-UpsTVrdxc0zwiymp8g=s120",
								created_date: "2022-03-06T01:07:51.5214Z",
								distinct_buyers: 1,
							},
							{
								name: "GNSS Art by MGXS",
								count: 1,
								total_sales_in_gwei: 800000000,
								image_url:
									"https://lh3.googleusercontent.com/4xgTjZ0_ybQi2TuRMsjmiL6-uqsbWl3UyinkbVZob92BCQFdl6JQowJ6e41gCxZ0Ut7D9wpjq-hQdEcQYQSrZHEKkPZjnbyGc8bhog=s120",
								created_date: "2022-03-17T17:21:31.667872Z",
								distinct_buyers: 1,
							},
							{
								name: "Glitchin' Alpacas",
								count: 1,
								total_sales_in_gwei: 500000000,
								image_url:
									"https://lh3.googleusercontent.com/z4xhdGFQb8X9uXMScdI-MH-3BlOzwDkax-9Dm-_IK8LrT2DwxzWuttGeu5NNjjd1iljYJcyiYgvEtgAvFKB_9B0oay3dWHZJtn6XSgw=s120",
								created_date: "2021-11-29T19:24:41.473552Z",
								distinct_buyers: 1,
							},
							{
								name: "Degen Space Social Club",
								count: 1,
								total_sales_in_gwei: 3400000,
								image_url:
									"https://lh3.googleusercontent.com/w7rNVpyrbWjykH7ZgFLAWJNzu6XdMZFW4G2Fdb2ezRCQ3QQyFgTD0LkmqUEukdzD6dZTu-HpvQqIQzMwZLEFiRVlcvT3ubXtnn0c=s120",
								created_date: "2022-03-18T01:52:25.775579Z",
								distinct_buyers: 1,
							},
							{
								name: "Forgotten Babies Wizard Orphanage",
								count: 1,
								total_sales_in_gwei: 26000000,
								image_url:
									"https://lh3.googleusercontent.com/Wmzx3HGbow88_3QybHooa1bK6eEa49r8ruxfPi8BcZyLKuRmT6jeW85qwrWO50i2kF625kqzQ2gDtkpKA-q2MmAaMrgxWooYkwXuwMQ=s120",
								created_date: "2022-02-22T19:24:03.254653Z",
								distinct_buyers: 1,
							},
							{
								name: "Sleepy Sloth Society by Zzz Labs",
								count: 1,
								total_sales_in_gwei: 65000000,
								image_url:
									"https://lh3.googleusercontent.com/heuqYphUq9kAPjdN1_EIig669XspxJ6A1miGRzeThSqjEdWIeK4Oy4CwVI2fYgsPdd88nTk8LZSN0MqhYHEJ0kM5gYBpsmasgrtRRA=s120",
								created_date: "2021-12-16T14:58:11.775053Z",
								distinct_buyers: 1,
							},
							{
								name: "GOATz",
								count: 1,
								total_sales_in_gwei: 275000000,
								image_url:
									"https://lh3.googleusercontent.com/0STDpLBcFhPOCtuFE4QBmhiFFDgGAbv3PeavmjWzljUWL5SAYHJVrWyuzjculnkUzJuAfAwSa48yTgZYGLpoIC7Ep_7Mo7uLq_4JcA=s120",
								created_date: "2021-07-08T21:58:02.244433Z",
								distinct_buyers: 1,
							},
							{
								name: "ConiunPass",
								count: 1,
								total_sales_in_gwei: 458900000,
								image_url:
									"https://lh3.googleusercontent.com/RmHHZEQZJIl2Go9W3pHScS_44b-G6ErPhI8vXUhC3iw-kw-A9CsAstAfnk3BRbtiakvvrkC2iCmCkJK5nbdv7cy-B924kjfeKmDTxWQ=s120",
								created_date: "2022-03-09T21:50:34.809305Z",
								distinct_buyers: 1,
							},
							{
								name: "Ghxsts Cxlture",
								count: 1,
								total_sales_in_gwei: 0,
								image_url:
									"https://lh3.googleusercontent.com/4xk86c4u2aP0Z5sKd0mrgCiIBQtJ29808VYmarJWDNnQKRWdaHGYrKb6jTAMa_EDPiRLT4PQwS6MVkCRIdg6thN6fWfPdCjSQ0Vht74=s120",
								created_date: "2021-06-07T05:37:16.665308Z",
								distinct_buyers: 1,
							},
							{
								name: "Bored Ape x NIKE Official NFT",
								count: 1,
								total_sales_in_gwei: 7000000,
								image_url:
									"https://lh3.googleusercontent.com/wMDB-MBkycB_f74bMB0M0fxEr30xk3oAbyzCLEUnJ-72womyA0wquGHcmNvx8HfBzQfARm7EEBXIlHqGaVVCBGimgeURm3jWDxrd=s120",
								created_date: "2022-04-12T22:31:50.912933Z",
								distinct_buyers: 1,
							},
							{
								name: "Fortune Friends Club Official NFT",
								count: 1,
								total_sales_in_gwei: 34000000,
								image_url:
									"https://lh3.googleusercontent.com/hMbOHECbaMtuobe66b0D3XL7c27SCjuR-TB1YmyTOYv7fLEZqMjE_Qv-Y5sMuyz5wV3QlxSaiUOOlJ2_FsI26fRoEUE1Jh6RAFPowA=s120",
								created_date: "2022-02-06T13:57:05.354195Z",
								distinct_buyers: 1,
							},
							{
								name: "Ocarinas",
								count: 1,
								total_sales_in_gwei: 120000000,
								image_url:
									"https://lh3.googleusercontent.com/xPfFBX3-F-QyIFyMqPGlKWYoWMZA15P9Tt30UQaVTnrJ0HY9j6vvy_XGN9POT37bqnX97qapFVTG_cCrt3w21Y35LIxA74_kZFpz37c=s120",
								created_date: "2022-01-22T16:59:10.645625Z",
								distinct_buyers: 1,
							},
							{
								name: "GEMMA BY TRISTAN EATON",
								count: 1,
								total_sales_in_gwei: 150000000,
								image_url:
									"https://lh3.googleusercontent.com/FeqZQ2fAjaNqCrxpz2x9ZlNR9PXAP6Ok-lwnaX6ti-BomzyEKmnslCZorU1-aKWM_zq6Mop7RJHT_YqVEKBXh9PIOEciNlxnQYjl=s120",
								created_date: "2022-01-12T21:13:47.243854Z",
								distinct_buyers: 1,
							},
							{
								name: "Mr. Crypto by Racksmafia",
								count: 1,
								total_sales_in_gwei: 72800000,
								image_url:
									"https://lh3.googleusercontent.com/Qh-Fjba1E6oJKNNNW4sSvC9Zp2LWesdPbvyV9hXbghzO7tMJB7KzzlxZCl0zF5MYWL1xnbrfn0HNJ_66en1wkn_pcvOW5irO8D3nJSM=s120",
								created_date: "2022-03-11T20:38:17.346196Z",
								distinct_buyers: 1,
							},
							{
								name: "Morphis Art Collection",
								count: 1,
								total_sales_in_gwei: 250000000,
								image_url:
									"https://lh3.googleusercontent.com/G5kZq6tSB--e8ooOfIeOP5bN4kya9S2vNidEHG2HqJQbpr1hAOZnlAVliBSJg_TCMCi2N5Bj76bW4n-RqT9qrvfSdhg-Gw1z506P8g=s120",
								created_date: "2021-02-25T21:56:03.237226Z",
								distinct_buyers: 1,
							},
							{
								name: "Mutant Punks NFT",
								count: 1,
								total_sales_in_gwei: 40000000,
								image_url:
									"https://lh3.googleusercontent.com/pfL_PWuSlR1eFhswbQKxnDXxSl4PCwTb0qH0mqh0G0Djp9dyv5ntkiXBBejDV0baRbuf-1K5zYAMAF6s2M-HmKn1QJXfT2u2unvq=s120",
								created_date: "2021-10-14T05:52:47.509095Z",
								distinct_buyers: 1,
							},
							{
								name: "Moon Ape Lab Genesis",
								count: 1,
								total_sales_in_gwei: 66000000,
								image_url:
									"https://lh3.googleusercontent.com/kLQSuxxCwAaal3Sn6BpVDSudBmT43qgxAJl4sTOtZOrBqUelIksTJ2DvmYQBRrDlXIqCAY3qb-Vrbq513QZx5-S-MffVNWIyoD_u4Q=s120",
								created_date: "2022-01-17T14:57:50.609711Z",
								distinct_buyers: 1,
							},
							{
								name: "KlayWeatherGirls",
								count: 1,
								total_sales_in_gwei: 20000000000,
								image_url:
									"https://lh3.googleusercontent.com/0uG41lX9kAYoeQwaW2fypdSnFHYOAijvLuaeimTPZywanSKaMqp3Z_nVPNThYS0pcJCR9j-okNwJfcdl14ukZHVQCWped7R0mdDUxDw=s120",
								created_date: "2022-04-11T11:35:06.503043Z",
								distinct_buyers: 1,
							},
							{
								name: "TOKIMEKI",
								count: 1,
								total_sales_in_gwei: 5000000,
								image_url:
									"https://lh3.googleusercontent.com/zsfH3vbtZ85z1HCTDn8zpcbkgC-DkhcB7-QUvTHWTwh_Kz8iLDu5fPrROnhCkMf2ZttCrauQX3dyi0ZsL9eBSzB5MrNvOStjWx4I=s120",
								created_date: "2021-08-16T12:20:51.34427Z",
								distinct_buyers: 1,
							},
							{
								name: "Female Cyborg NFT",
								count: 1,
								total_sales_in_gwei: 890000,
								image_url:
									"https://lh3.googleusercontent.com/4M6Z3R7PwLxHu0IqkJbM83zVrcm6aIiaKr3Q7kWRPVWCRKnrE1vXEKugVYY5nhIJB8XAzoC8bZX1FjZfE4n5xKtsob7or4V-VkOeYxo=s120",
								created_date: "2021-11-02T00:52:22.376245Z",
								distinct_buyers: 1,
							},
							{
								name: "Toddlerpillars",
								count: 1,
								total_sales_in_gwei: 30000000,
								image_url:
									"https://lh3.googleusercontent.com/31RZhPj27IDpGf8MF_IYJHpj2UVU4eJtw0xnYrcow35Fml3_q2BPh0t5JYqALbWUj7g2Ues31i7Fx3N7Pobe3txJGEdZ8O3RNLR9cQ=s120",
								created_date: "2021-11-16T17:02:13.056322Z",
								distinct_buyers: 1,
							},
						],
					}),
					1000
				)
			);
			//const response = await getData(`${baseUrl}v1/activity/summary`);
			const filteredCollections = response.collections
				.filter(
					(responseCollection) => responseCollection.count >= saleCountCutoff
				)
				.slice(0, numberOfCollectionsToShow);
			setCollections(filteredCollections);

			const names = getCollectionNames(filteredCollections);
			// mock tweets will be placed here
			await Promise.all(
				names.map((name) => getTweetsByQuery(name, tweetsPerFetch))
			).then((responses) => {
				const data = responses.filter(
					(response) => response?.data && Array.isArray(response?.data)
				);

				const tokens = responses.map((response, index) => {
					return {
						token: response.meta?.next_token,
						name: filteredCollections[index].name,
					};
				});
				setCurrentNextTokens([...tokens]);

				const arraysOfTweetsArray = [...data.map((data) => data.data)];
				setCurrentAllTweets(arraysOfTweetsArray);
				const tweetsSet = removeTweetDuplicates(arraysOfTweetsArray, counts);
				setData([...tweetsSet]);
			});

			const whitelistMintTweetsResponse = await getTweetsByQuery(
				whiteListMint,
				tweetsWhitelistPerFetch
			);
			setCurrentAllTweetsWhitelist([...whitelistMintTweetsResponse.data]);
			setCurrentNextTokenWhitelist(
				whitelistMintTweetsResponse.meta?.next_token
			);
		}

		handleResize();
		window.addEventListener("resize", handleResize);

		fetchData();
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const getCollectionNames = (currentCollections) => {
		return currentCollections
			.slice(0, numberOfCollectionsToShow)
			.map((collection) => collection.name);
	};

	const removeTweetDuplicates = (
		data,
		tweetCounts,
		currentExit = exit,
		currentTweetIndex = tweetIndex,
		currentTweetArrayIndex = tweetArrayIndex
	) => {
		let tweetsSet = new Set();
		let localExit = currentExit;
		const indexOfLongestArray = data.reduce((acc, arr, idx) => {
			return arr.length > data[acc].length ? idx : acc;
		}, 0);
		const totalTweetsCount = data?.[indexOfLongestArray].length * data.length;

		let localTweetIndex = currentTweetIndex;
		let localTweetArrayIndex = currentTweetArrayIndex;
		const arraysOfTweetArrayLength = data.length;
		let tweetsLength = data?.[localTweetArrayIndex]?.length;
		if (localTweetIndex >= tweetsLength) {
			while (localTweetArrayIndex < arraysOfTweetArrayLength) {
				localTweetArrayIndex =
					(localTweetArrayIndex + 1) % arraysOfTweetArrayLength;
				if (!!data?.[localTweetArrayIndex]?.[localTweetIndex]) {
					tweetsLength = data?.[localTweetArrayIndex]?.length;
					break;
				}
			}
		}
		while (tweetsSet.size < tweetCounts && localExit < totalTweetsCount) {
			while (localTweetIndex < tweetsLength) {
				for (
					;
					localTweetArrayIndex < arraysOfTweetArrayLength;
					localTweetArrayIndex++
				) {
					if (!!data?.[localTweetArrayIndex]?.[localTweetIndex]) {
						tweetsSet.add(data[localTweetArrayIndex][localTweetIndex]);
						if (tweetsSet.size >= tweetCounts) {
							setTweetIndex(
								localTweetArrayIndex === arraysOfTweetArrayLength - 1
									? localTweetIndex + 1
									: localTweetIndex
							);

							setTweetArrayIndex(
								(localTweetArrayIndex + 1) % arraysOfTweetArrayLength
							);

							setExit(localExit + 1);
							break;
						}
					}

					localExit++;
				}
				if (tweetsSet.size >= tweetCounts) {
					break;
				} else {
					localTweetIndex++;
					localTweetArrayIndex = 0;
				}
			}
		}
		if (tweetsSet.size < tweetCounts) {
			setExit(localExit);
		}
		return tweetsSet;
	};

	const refreshWhitelistTweets = async (tweetCounts) => {
		if (
			(currentPageForWhitelist + 1) * tweetCounts >=
			tweetsWhitelistPerFetch
		) {
			if (currentNextTokenWhitelist) {
				const whitelistMintTweetsResponse = await getTweetsByQuery(
					whiteListMint,
					tweetsWhitelistPerFetch,
					currentNextTokenWhitelist
				);
				setCurrentAllTweetsWhitelist([...whitelistMintTweetsResponse.data]);
				setCurrentNextTokenWhitelist(
					whitelistMintTweetsResponse.meta?.next_token
				);
				setCurrentPageForWhitelist(currentPageForWhitelist + 1);
			} else {
				console.log("There is no more tweets");
			}
		} else {
			setCurrentPageForWhitelist(currentPageForWhitelist + 1);
		}
	};

	const refreshTweets = async () => {
		const indexOfLongestArray = currentAllTweets.reduce((acc, arr, idx) => {
			return arr.length > currentAllTweets[acc].length ? idx : acc;
		}, 0);
		const totalTweetsCount =
			currentAllTweets[indexOfLongestArray].length * currentAllTweets.length;
		if (exit >= totalTweetsCount) {
			if (currentNextTokens.some((token) => !!token)) {
				const names = getCollectionNames(collections);
				await Promise.all(
					names.map(async (name) => {
						const token = currentNextTokens.find(
							(tokenObject) => tokenObject.name === name
						);
						if (token?.token) {
							const response = await getTweetsByQuery(
								name,
								tweetsPerFetch,
								token.token
							);
							return {
								response,
								name,
							};
						}
						return {};
					})
				).then((responses) => {
					const data = responses.filter(
						(response) =>
							response?.response?.data &&
							Array.isArray(response?.response?.data)
					);
					if (data?.length) {
						const tokens = responses.map((response) => {
							return {
								token: response?.response?.meta?.next_token,
								name: response.name,
							};
						});

						setCurrentNextTokens([tokens]);

						const arraysOfTweetsArray = [
							...data.map((data) => data.response.data),
						];

						setCurrentAllTweets(arraysOfTweetsArray);

						const tweetsSet = removeTweetDuplicates(
							arraysOfTweetsArray,
							picksCount,
							0,
							0,
							0
						);
						setData([...tweetsSet]);
					} else {
						console.log("There is no more tweets");
					}
				});
			} else {
			}
		} else {
			const tweetsSet = removeTweetDuplicates(currentAllTweets, picksCount);
			setData([...tweetsSet]);
		}
	};

	return (
		<StyledMain>
			{collections.length ? (
				<TradingPicks collections={collections} />
			) : (
				<StyledIcon icon={faSpinner} pulse />
			)}
			<SocialPicks marginTop="30px" paddingTop="10px">
				{data?.length ? (
					<Fragment>
						<TitleWrapper>
							<Title>Top sales</Title>
							<StyledIcon
								icon={faRetweet}
								alignself="flex-end"
								onClick={refreshTweets}
							/>
						</TitleWrapper>
						<TweetsSection>
							{data.map((tweet) => (
								<StyleTweetWrapper key={tweet.id}>
									<TwitterTweetEmbed
										tweetId={tweet.id}
										options={{
											conversation: "none",
											width: 250,
											cards: "hidden",
											theme: "dark",
											lang: "en",
										}}
										placeholder={<TweetPlaceholder />}
									/>
								</StyleTweetWrapper>
							))}
						</TweetsSection>
					</Fragment>
				) : (
					<StyledIcon icon={faSpinner} pulse />
				)}
			</SocialPicks>{" "}
			<SocialPicks paddingBottom="30px" marginTop="0" paddingTop="10px">
				{currentAllTweetsWhitelist?.length && picksCount ? (
					<Fragment>
						<TitleWrapper>
							<Title>Whitelist Mint</Title>
							<StyledIcon
								icon={faRetweet}
								alignself="flex-end"
								onClick={() => refreshWhitelistTweets(picksCount)}
							/>
						</TitleWrapper>
						<TweetsSection>
							{currentAllTweetsWhitelist
								.slice(
									currentPageForWhitelist * picksCount,
									(currentPageForWhitelist + 1) * picksCount
								)
								.map((tweet) => (
									<StyleTweetWrapper key={tweet.id}>
										<TwitterTweetEmbed
											tweetId={tweet.id}
											options={{
												conversation: "none",
												width: 250,
												cards: "hidden",
												theme: "dark",
											}}
											placeholder={<TweetPlaceholder />}
										/>
									</StyleTweetWrapper>
								))}
						</TweetsSection>
					</Fragment>
				) : (
					<StyledIcon icon={faSpinner} pulse />
				)}
			</SocialPicks>
		</StyledMain>
	);
};
