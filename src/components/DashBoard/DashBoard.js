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
								name: "Meta Toy DragonZ",
								count: 359,
								total_sales_in_gwei: 240871794200000,
								image_url:
									"https://lh3.googleusercontent.com/02PLvfCkPwgAeWBEmRa0HjdfXAabG4-fE9zIrNmecO2YMJUax-ZzvlkqNzT7w2GS19-9us0eoFWvd7S6O2DrSKdW3DrXVlegY1Hefg=s120",
								created_date: "2022-02-12T12:44:18.037416Z",
							},
							{
								name: "abibas originaIs metaverse",
								count: 281,
								total_sales_in_gwei: 232800000,
								image_url:
									"https://lh3.googleusercontent.com/B_ok6KC6e_o5tEwgQvOjkfFMPxowZ_-04atbMQVB1YR6LfHkEXMqh7pwiffwLlz7QY2nh0q6JQwXAU1W0T7ucPVo9HvpGPclncyLeYI=s120",
								created_date: "2022-02-09T01:00:24.891952Z",
							},
							{
								name: "Secret's muse",
								count: 80,
								total_sales_in_gwei: 56000000,
								image_url:
									"https://lh3.googleusercontent.com/kcQEJtpPXvgl_0D5nul_O2Azii31-zbJ9kQNvUViNa5FRSaf3yy4jsS0yrSfZVLesw0ux28IYTPDAwEtLe6dQWcIjmuZ5p6En8HMyg=s120",
								created_date: "2022-02-01T12:23:04.347871Z",
							},
							{
								name: "CinSity DAO Founders Pass",
								count: 61,
								total_sales_in_gwei: 4050400000,
								image_url:
									"https://lh3.googleusercontent.com/sM6EsrnhibURAaLn9wvjN3gtD9NHOGv_PgGeFjNUMYiTRqTDbgpLtXDcCm55Yp88j8eBH8kgq0p1CEgIdzkV4KsCwRldoaUq-tBKUA=s120",
								created_date: "2022-01-13T07:46:10.44336Z",
							},
							{
								name: "Apepunk Yatch Club",
								count: 58,
								total_sales_in_gwei: 61000000,
								image_url:
									"https://lh3.googleusercontent.com/Fu8qyZXxFFGGuoD4sitPN00RLnXXN6xuqN_qfxeAqrI_ioUXC6upSuWseyNyXM2BNTPpQRkD1lDF2uIQskPfYINZMgx7FMjAAUYF4w=s120",
								created_date: "2022-02-11T20:28:54.732324Z",
							},
							{
								name: "FEG One Million Hodler NFT",
								count: 45,
								total_sales_in_gwei: 33749167000,
								image_url:
									"https://lh3.googleusercontent.com/TFWFDKobiQNOEq3bkISqUknadKxx0sTNknm65oR3iFpvsHtOOcWfrfcQditsd9DiGDyoiaKX1EfFSvuUVgtSDF-TuMSyqUrn4x8cTAA=s120",
								created_date: "2022-02-10T16:24:00.241461Z",
							},
							{
								name: "Hape Monster Gang.",
								count: 38,
								total_sales_in_gwei: 34271000,
								image_url:
									"https://lh3.googleusercontent.com/VcrBKF-JTBRZv5Q4Ho0Y1vvXRVrBrvEDEMn7wTtt3x5WQxIZXQpw8wchZ4Si4Auuf4e5wCf-fvWyWFdyQR6YWJqLcO27pBjqQHkK2w=s120",
								created_date: "2022-02-10T18:19:16.748729Z",
							},
							{
								name: "TheHepeBeast",
								count: 33,
								total_sales_in_gwei: 20559000,
								image_url:
									"https://lh3.googleusercontent.com/B-Ts_QUB767-Or0yyShZMsjMRinsQyogpCULDJekTSTmF6cOtuGqm_Vl2eGrwIfsohd11bfFAa48iiQ8LehsVL0iFwT1d-iRZ2_4aw=s120",
								created_date: "2022-02-03T13:30:59.939049Z",
							},
							{
								name: "Buck Teeth Rabbit",
								count: 27,
								total_sales_in_gwei: 17383896,
								image_url:
									"https://lh3.googleusercontent.com/dpHCrlverfVuJMixZvOqKlOznhnAc9qMC7ewgeLvSv4deBwXizck72INJFLdzjipaNLD1j8exBiwFYcTWkf04B2nSswY5EFwEtZSh8s=s120",
								created_date: "2022-01-22T05:30:17.010712Z",
							},
							{
								name: "Mutant Kid Apes",
								count: 26,
								total_sales_in_gwei: 16169036,
								image_url:
									"https://lh3.googleusercontent.com/hOEsSi4f6Q3L53xeRVJonnr_dsut9Mh_VDKx7cbgZPj38dMSFPFmwRSHL-dip7VDov-6oZS4CPytCoEjOYEduuZHDmptwc65_TduvQ=s120",
								created_date: "2022-01-26T01:08:23.892244Z",
							},
							{
								name: "The Donut Shop Metaverse",
								count: 26,
								total_sales_in_gwei: 16198000,
								image_url:
									"https://lh3.googleusercontent.com/ysj_wELsV_ApOCMr5HRLXcwjKgR48rpKj6_pttKyGYKxtskbe3V9OaoFT1_ZY9WufK6pBtkuBOtKijxoGSOAYFOzhlk50Wd292Hdmw=s120",
								created_date: "2022-01-26T12:20:33.645502Z",
							},
							{
								name: "Asuki Metaverse",
								count: 26,
								total_sales_in_gwei: 18200000,
								image_url:
									"https://lh3.googleusercontent.com/W4A_NiVC3X_0mNeKgmcGwLyShlNjXTaZTcQgGx-Ly_P9ptzfnmUPHRVWa40uB5ebG1w_eW1ocJXZ7-EAH8n0YhaPA1_8IZJlkcCZh9A=s120",
								created_date: "2022-02-08T22:17:16.484285Z",
							},

							{
								name: "Duggee",
								count: 21,
								total_sales_in_gwei: 13059606,
								image_url:
									"https://lh3.googleusercontent.com/kfewBO8NsaP0WNHzOHkzbusosAa25KW2Vib76i-6UMdTLSHKDSEqUxqCIhZv9CEB6cYgLkIOVoQyOu54U1f4m_HHdtb2Wx7jjqdfOQ=s120",
								created_date: "2022-01-22T04:43:55.539984Z",
							},

							{
								name: "Bearest Teddy",
								count: 14,
								total_sales_in_gwei: 8946000,
								image_url:
									"https://lh3.googleusercontent.com/yaOR5qDuCXF2UovaZbROysxkKGabwuUvt5zfuNydaalhTLdlNy6AnNrpPhScBe4eZo7Q15bcPXMS6TCB01nrUCElZrXYj3kVrxpM0g=s120",
								created_date: "2022-02-09T02:35:34.742276Z",
							},
							{
								name: "Samuraverse",
								count: 14,
								total_sales_in_gwei: 9184000,
								image_url:
									"https://lh3.googleusercontent.com/B59k5jc3qiitnAAvAxRvVn0rrAotazYS2UIzaHR3ucCHCpvOe796IDfrCbBc9YQlrLJAW3V_7WmlnKYMYYBp1lIfWDQ56638u1W6vA=s120",
								created_date: "2022-01-26T08:38:40.263489Z",
							},
							{
								name: "Bull Shitor",
								count: 14,
								total_sales_in_gwei: 9044000,
								image_url:
									"https://lh3.googleusercontent.com/DjqtB8c1QYD_cN9NsppwbyZYny9d4CyCVakzxor5lvZhe5jKJX7NF1huW7Iiq0xDqGZ_-rAsR7tVBoYKnZmVLeuUx_d8i9Au-QB5=s120",
								created_date: "2022-01-22T08:27:22.711721Z",
							},
							{
								name: "Fashion Apes Club",
								count: 14,
								total_sales_in_gwei: 8748600,
								image_url:
									"https://lh3.googleusercontent.com/VJXdG0dbP3hPPXEpCJ68OOVjTDAK4gHmTCIN_1IN5ASTGds_t26o5dE1ZplJqivjiXwYvsrjOHbwbWzDZrC3pA6cM-H6uW-0szPu3Q=s120",
								created_date: "2022-01-27T17:50:08.292454Z",
							},

							{
								name: "Meta Myth",
								count: 13,
								total_sales_in_gwei: 8257158,
								image_url:
									"https://lh3.googleusercontent.com/pwmiKhbZ1L-wCDN8LgM1udszlYiYzDohdHgoKeVVPjv8786MsUcIDtdFtQHABv7f12vjwwpJBsIKONnQKFezJB8tdNdTMX-myyLPAw=s120",
								created_date: "2022-01-27T03:10:31.345774Z",
							},
							{
								name: "HAPE Multiverse",
								count: 13,
								total_sales_in_gwei: 8190000,
								image_url:
									"https://lh3.googleusercontent.com/b_5iUtd39bkzFr8MGXuGb31x-tO7jVEy4_w-VhdAjdAhzlgq2Fp0nsoAlIoNbRkC9RH6rK0LHZLFAhOeCBEs7EWSW3DQhurHVE0U=s120",
								created_date: "2022-01-22T10:31:13.264199Z",
							},
							{
								name: "Jeneva Bored Ape Official Club",
								count: 13,
								total_sales_in_gwei: 9724000,
								image_url:
									"https://lh3.googleusercontent.com/McqQT5Zd7s4mQmNXce8nEyJKnBieLForwDjc5BRWFkx1Jl-DL-wt9TfbZW9hX51y0Cd7NCDB6AYzmQYUyiANvao-R_EnkAoTjYBRyQ=s120",
								created_date: "2022-01-25T19:05:31.048746Z",
							},
							{
								name: "SheepFarm",
								count: 13,
								total_sales_in_gwei: 115610000000,
								image_url: "",
								created_date: "2021-12-16T21:04:44.727327Z",
							},
							{
								name: "AstralApe Club",
								count: 13,
								total_sales_in_gwei: 9888000,
								image_url:
									"https://lh3.googleusercontent.com/0YRQeCVGRHpaA1vb0z5IX-Iog_NUqCjhoxeR-lhcyIzAKBW93P19U7Q7NC7peODXKOCIH5OVJzJd2-EEKWS5unRRl0BTcCsiSugtjQ=s120",
								created_date: "2022-02-09T14:47:58.515863Z",
							},
							{
								name: "Baby Ape Social Official Club",
								count: 13,
								total_sales_in_gwei: 8047000,
								image_url:
									"https://lh3.googleusercontent.com/Sl50UULJ4-oA6wfnDxkaKEaqr1VM3D3LPd-k2w5iZmQRAXvzkXzztfMF7Yc5b1VLiQ7eL5qTI1laP_xx2HJY19pVRdOy3vNR9OZX6A=s120",
								created_date: "2022-01-26T09:09:56.187449Z",
							},
							{
								name: "Astronaull",
								count: 13,
								total_sales_in_gwei: 8281000,
								image_url:
									"https://lh3.googleusercontent.com/E0YQNBM4L-kdO_0T-DqrenCPpuUh5UcVcvLyZUL-0JjSvtgggaGMtf4LbraDyPJ8I1O6avIJGm2tgWe6S4CmMn_1PpFj416quaKiHw=s120",
								created_date: "2022-01-14T09:00:15.780474Z",
							},
							{
								name: "Micky Rabbits",
								count: 13,
								total_sales_in_gwei: 8502000,
								image_url:
									"https://lh3.googleusercontent.com/FpJWWSyL9ZF-hlpwtwSRhL-rLlSD-P5g0O6_x9L7z5wDj6U6TZb_aKhlpdXBHAwURa_WyKwvsmEUukac6SvKaAe3iqpINk5aGdUi7A=s120",
								created_date: "2022-01-22T07:50:16.931472Z",
							},
							{
								name: "Ado Kitty",
								count: 13,
								total_sales_in_gwei: 9464000,
								image_url:
									"https://lh3.googleusercontent.com/RTw-2yf5f9M1-q4B8YWfoGFOhkPJ4MvNVWjC6C3L4bG8SN1e_ESsql_U29W35MCXK8S59aY694CDPyN_u5y8hgV5KVSr6X-M_14xcw=s120",
								created_date: "2022-02-02T03:21:43.337941Z",
							},
							{
								name: "Mutant Doodle Apes Club",
								count: 12,
								total_sales_in_gwei: 7752000,
								image_url:
									"https://lh3.googleusercontent.com/uxL2JyXMw_jQCObIeTlf2A7uEgf0eigrk4Jt_5okDKe8W24nKc34OHA0AmfU7e8h72t8OLJSCjIYvXb1h-3yxE4FC_pOiWluqHPh=s120",
								created_date: "2022-01-22T12:14:22.711384Z",
							},
							{
								name: "FancyBirds",
								count: 12,
								total_sales_in_gwei: 4017980000,
								image_url:
									"https://lh3.googleusercontent.com/wrElaEBwneqKR669amNlLLxXC7rKuXoc50Et36hnwqYQcs2oa2cBtuKN1ogPnSJN8okccSoeqvpRTvdYwPFwPVyu8-4p33p6RCuwL_g=s120",
								created_date: "2022-02-11T17:41:34.108822Z",
							},
							{
								name: "ZED RUN",
								count: 12,
								total_sales_in_gwei: 240233000,
								image_url:
									"https://lh3.googleusercontent.com/tgpgbT3OwxX4REASLdyafzCWQ5EhOtgSiIlhI3am3aZ_mYPS0WbM9Z4F6hOhb0D-AKqhHlFg6BNBquchQy-_bwY=s120",
								created_date: "2021-03-03T01:21:00.501733Z",
							},
							{
								name: "3D Monster Ape Club | MAC",
								count: 12,
								total_sales_in_gwei: 7776000,
								image_url:
									"https://lh3.googleusercontent.com/WdwXi6P2JS43tD0b6tgGnS0AHk23tqe6e84nj6tu2UT3TUAz2Q0zZ4pIw_T2ia2oN9r9aby9LINcAm1bZhg53GcSxNXjPPPXRo4X=s120",
								created_date: "2022-02-08T00:47:42.21549Z",
							},
							{
								name: "Dystopit",
								count: 12,
								total_sales_in_gwei: 7788000,
								image_url:
									"https://lh3.googleusercontent.com/gzvFN-0_YAbyMSrHgbul7KCytJf6WxvqEJaZPNq0ae6M9xciFmGvm2jfu9KPNo0YIpwMcTvIXfdjCijHxZp8c_rBSea7vhUaMhMD=s120",
								created_date: "2022-01-25T01:23:02.611093Z",
							},

							{
								name: "Baby Ape Bone Yacht Society",
								count: 1,
								total_sales_in_gwei: 649990,
								image_url:
									"https://lh3.googleusercontent.com/gBFwI-3TcNSYqZmIRz_b1WK3iMZ4yJT-keqTjwcbLx13cuyEenrsR8tw_Ahxx7CqP4c9nxMQMaemSJco9y5n95ESaGqWAEAzPNzebHY=s120",
								created_date: "2022-01-02T01:45:08.363992Z",
							},
							{
								name: "Pepsi Mic Drop",
								count: 1,
								total_sales_in_gwei: 990000000,
								image_url:
									"https://lh3.googleusercontent.com/FFdqBWESVvcbuDddU32Y0ke99NYvjNEJiIvuc9T7nqV1_Z3_uDUVmj2bJqY07toaq2twkv5l-3ml2avuF17pzB9ib3dXFojcDlHZXN0=s120",
								created_date: "2021-12-09T15:07:17.985903Z",
							},
							{
								name: "Space Pod Stuff",
								count: 1,
								total_sales_in_gwei: 0,
								image_url:
									"https://lh3.googleusercontent.com/ZSfdiZIFNs3LpJumWH_Oo6EFLKQcWsdGh90HNuMllFegyiAO5pQIwqW56baoyAjpfve7QZk0V4k9BOf6ssfqMtbO-2bIUDKvWn1bhg=s120",
								created_date: "2021-12-26T16:23:44.509979Z",
							},
							{
								name: "Lucky Lion Club Official (LLC)",
								count: 1,
								total_sales_in_gwei: 346900000,
								image_url:
									"https://lh3.googleusercontent.com/KpvJIrdKRLfyyVa7aUE3Giu8OxFIRYEUNlJtPL1IneFflWggz8GMEyza8FOn4j8wh0eXY2XvkZna8cqeQYbWcWXDfZSZVbOiOXQV9w=s120",
								created_date: "2022-02-04T14:30:08.53108Z",
							},
							{
								name: "Doodles Cats Collection",
								count: 1,
								total_sales_in_gwei: 1000000,
								image_url:
									"https://lh3.googleusercontent.com/b1uaLTDO9fW580AGLvzyQfjUKM1R1_b2oKNc4DsrPhGtiblP39QJ0M7fstL4VCHbK0-jhCG9Y1tLK46ybDEhPQU5__ydekTrz8XanQ=s120",
								created_date: "2022-01-17T18:16:12.2161Z",
							},
							{
								name: "SlimeFarm_NFT",
								count: 1,
								total_sales_in_gwei: 32000000000,
								image_url:
									"https://lh3.googleusercontent.com/xPdjIxzvzrlEU2pObifoUjMGwXC0DA3jt3KLxJG-lnI9oCUGkVQL8XD1xAJJ-Mq4DI4Yf2oxabCM5-8PehkQg0RbEFYArUC3SaWBTg=s120",
								created_date: "2022-01-10T14:41:48.876776Z",
							},
							{
								name: "Junior Slotie",
								count: 1,
								total_sales_in_gwei: 455000000,
								image_url:
									"https://lh3.googleusercontent.com/BWQtHF0nroL_9SOzMOZyToLArZJQNtU3moqwDqkLYrSbl7BjY8DxncXOOwwBFIJAbXbrbLLzgodWOstKEmsz3ZhhD5_X-9I63s6UTQ=s120",
								created_date: "2022-02-09T22:09:28.658794Z",
							},
							{
								name: "STARKADE: Legion",
								count: 1,
								total_sales_in_gwei: 97900000,
								image_url:
									"https://lh3.googleusercontent.com/6qRCCRmBDJyHPt6LIwcALDK-GM0j0F78RUBuLX0m2oT4zIkKtadt4gMrPoKTh1HmqBQj8HpZYmS-BagtU8sydiYMnEMO6Z32Cc06U6k=s120",
								created_date: "2022-01-30T23:24:20.310773Z",
							},
							{
								name: "Picasso Lion Club",
								count: 1,
								total_sales_in_gwei: 5000000,
								image_url:
									"https://lh3.googleusercontent.com/BhVl9ZhrIi_6w-xxD9Q0JcF2MtHmhhAQWLXhhcUjNqHp0mijcYJ6_c4Vt5gbEsrEEFuQUF-TQiRj5SmP8SIDQckr-GqANVStoCSyzQ=s120",
								created_date: "2021-10-03T23:47:06.967451Z",
							},
							{
								name: "Ethermon",
								count: 1,
								total_sales_in_gwei: 800000,
								image_url:
									"https://lh3.googleusercontent.com/u485S1UVF8xufP54ZtynanKbb0KnPllKJQDjg8JESNS7tRYhMEMXkS2Ss7PcxVlh5PT9VlhYsYIJvGMIdy3PcfFazsfGxjCarTCW52U=s120",
								created_date: "2019-04-26T22:13:09.153813Z",
							},
							{
								name: "Mutan Apes Undead Pastel Club",
								count: 1,
								total_sales_in_gwei: 635170,
								image_url:
									"https://lh3.googleusercontent.com/dvcrWjYHh83wdOgOXChJioqkF_NtvHKOi63a8j33iivXMEtpGWQr6HQJ53N5RI8xWtKvK2PvN4XTjrgjVD0MUvWIGuKAGU697ReRaQ=s120",
								created_date: "2022-01-22T14:56:51.758688Z",
							},
							{
								name: "Lives of Asuna",
								count: 1,
								total_sales_in_gwei: 570000000,
								image_url:
									"https://lh3.googleusercontent.com/8JqiF7Kar1LRGnh4j6o2niMjrkqaK-XOr1h7MPkiYbjP0vaOIMzLnOp50Q_xKnrDNEScmnbii4IRjrGIXKUfjKI7iM7VdxGeX_cy=s120",
								created_date: "2022-01-27T11:28:51.486713Z",
							},
							{
								name: "Meta Angels NFT",
								count: 1,
								total_sales_in_gwei: 355000000,
								image_url:
									"https://lh3.googleusercontent.com/J4sUEAJDbvc-6bgkHQyNtQRxlFr1CkZZ1d14DSGR1x7miJZN0AXcV81Hlc9yQEx3XkyAnvbeFukFQlODyNDjwBcIvHOsh7eeYTIQnWs=s120",
								created_date: "2022-02-07T17:15:39.173425Z",
							},
							{
								name: "FoxFam #9",
								count: 1,
								total_sales_in_gwei: 7000000,
								image_url:
									"https://lh3.googleusercontent.com/CH20QMLw-f61foUMDFOWc-qp80b8qacX3GXLWlK8sp0XqR1Cju7CX8hjovh_8QhCOSc2sqP_GoWjfnG6BGh5URgmUKu2vHdyjnUkpmk=s120",
								created_date: "2022-01-03T17:34:19.513554Z",
							},
							{
								name: "Programmer Loves",
								count: 1,
								total_sales_in_gwei: 10000000,
								image_url:
									"https://lh3.googleusercontent.com/cGo9cKHojNxfnQFdlk4aTTBqkRAqwek7cOUKj1OU3ySjHQk1dVH8NMoZ90ULJ3uEdzDLXumz8BUNH0ZnGIBrWqhTRNP_XyWYek8Qgw=s120",
								created_date: "2022-01-08T12:05:48.309794Z",
							},
							{
								name: "DeadHeads",
								count: 1,
								total_sales_in_gwei: 275000000,
								image_url:
									"https://lh3.googleusercontent.com/m4u8qv8O3DsDz9pZo1_jAOBD9p67j5KoSTcgVy2JwfuDI1Bw309v0bPUwAKlJqpsUem1tzEZmqfeXMn1ZgIXBGdzzEBuyaSuPYi38A=s120",
								created_date: "2021-06-30T03:04:05.461379Z",
							},
							{
								name: "TARP NFTs",
								count: 1,
								total_sales_in_gwei: 69000000,
								image_url:
									"https://lh3.googleusercontent.com/0p8E0K4yjnx1Lm7mEpLmm_q6sweG95Y3yxF77qhhmzzFDB8QFmbkb5dfcPJcwWdFaKR1J441_KJfmeD2FfMN1c-8nvvO65pkBEEaLQ=s120",
								created_date: "2021-11-21T16:46:33.163864Z",
							},
							{
								name: "Klubs Army",
								count: 1,
								total_sales_in_gwei: 10000000000,
								image_url:
									"https://lh3.googleusercontent.com/jzNV1LNnj1Qg4AMUZ8cA9DrAA3E4KxJP25etxBYbvlhAXjc9_W1wCYl7zKTnFBZ1GPpTeT2NKsivAPiTTLAh1XiFDr8EV0cRIC5nQRI=s120",
								created_date: "2021-12-03T10:52:43.200335Z",
							},
							{
								name: "TheCraniumCollection",
								count: 1,
								total_sales_in_gwei: 1000000,
								image_url:
									"https://lh3.googleusercontent.com/RtoE25kcdJ-xSGNJ5mMDxguAalCQZVUB4kDQ3EpI-a8RF6l0YpYfbTYeXClZfpM5xfmCM4vprkl_b399ysqWISx5JBuiiJtxf-KaHzw=s120",
								created_date: "2022-02-11T09:51:26.453373Z",
							},
							{
								name: "Romanian Masks Pixel",
								count: 1,
								total_sales_in_gwei: 5000000,
								image_url:
									"https://lh3.googleusercontent.com/9Jghbjvj3Aq_PKCTojraZ2M-g2E5vVDHfPYylanyQ4ySN4cfiR6iBw5c46OIDSWvvMLZObCycw2rqYZS6cY0poNNIb7duRH8dKUt=s120",
								created_date: "2022-02-01T00:27:09.002887Z",
							},
							{
								name: "Safemoon NFT Card",
								count: 1,
								total_sales_in_gwei: 150000000,
								image_url:
									"https://lh3.googleusercontent.com/D4xBmltOWtPfRKlgUom-dwKW1vv_k44tRzqdmYflzO47zQtQnGvF5JNwxoDcvtcXFSW-prVJCHK1AUaP2BkYSI3dg1qzuUub4xro=s120",
								created_date: "2022-02-02T21:43:54.661257Z",
							},
							{
								name: "Crypt Unchain Kingdom season1",
								count: 1,
								total_sales_in_gwei: 7000000,
								image_url:
									"https://lh3.googleusercontent.com/Ypf2RdZFTRfyceDkQGjl73QDdZ9oEuTMNOY-J8xPJmOsyEPgVk3F6xSbLaoiVjpTc2P8zMvPufFgRt6oZvu3-cFxwZamkk4RdAZWNg=s120",
								created_date: "2022-01-08T06:11:32.571826Z",
							},
							{
								name: "Bored Ape Yacht Club Polygon",
								count: 1,
								total_sales_in_gwei: 690000,
								image_url:
									"https://lh3.googleusercontent.com/3KEhjuqrc6fZDz9ROWUF44vNit9hFUKjY-GDSJYhNkzOh_aVMIzy-f3wvO45H33S3l6z8vWt-M5XWFBPwEckH4xq2QJJgSYdwKYccg=s120",
								created_date: "2022-02-04T08:32:41.890841Z",
							},
							{
								name: "Tiny Motions",
								count: 1,
								total_sales_in_gwei: 1500000,
								image_url:
									"https://lh3.googleusercontent.com/Fo-nwx1CAbPUq2QjDuAuVFHTN4PAAUWneTOO7LrQCzkVw9SiZ6yKtqp-oisjknhHsssk5s8PaTv9wWz-TGgRYCiGeQKTwCjG5EYaiQ=s120",
								created_date: "2021-11-23T23:42:11.278892Z",
							},
							{
								name: "Larva Doods",
								count: 1,
								total_sales_in_gwei: 5000000,
								image_url:
									"https://lh3.googleusercontent.com/ZlDD9qOIEVwUOscCQFgoJy0xDdL5ZuR_TvyD12cNOjPIn_ec5OjPORl3ttzJFFnKkjt1elwM17VKmSiHJJ7MNScZ17q-L3VlM4ob7g=s120",
								created_date: "2022-01-08T11:39:54.35978Z",
							},
							{
								name: "Eyes of Fashion Official",
								count: 1,
								total_sales_in_gwei: 70000000,
								image_url:
									"https://lh3.googleusercontent.com/bZCclEyls0fQ8_BUM9FaFJa3x-YL1V6ucCG2UevoN4VYLwBMYC5WayddG1RwnyxH1Cm_mGE7ZnopSEInnAtJnu2VA7YkkDVgQ818=s120",
								created_date: "2022-01-30T11:47:23.243079Z",
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
