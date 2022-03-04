import {faRetweet, faSpinner} from "@fortawesome/free-solid-svg-icons";
import {Fragment, useEffect, useState} from "react";
import {TwitterTweetEmbed} from "react-twitter-embed";
import styled from "styled-components";

import {getData, getTweetsByQuery} from "../../Scripts/Axios/axiosRequests";
import {baseUrl} from "../../Scripts/Constants";
import {StyledIcon} from "../../StyledComponents";
import {SocialPicks, TradingPicks} from ".";

const StyledMain = styled.main`
	height: 100%;
	margin-top: 10px;
`;

const StyleTweetWrapper = styled.div`
	padding: 5px;
	overflow: auto;
`;

const TweetsSection = styled.div`
	flex-direction: row;
	display: flex;
`;

export const DashBoard = () => {
	const saleCountCutoff = 1;
	const numberOfCollectionsToShow = 12;
	const tweetsPerSection = 5;
	// mock using 10
	const tweetsPerFetch = 20;
	const tweetsWhitelistPerFetch = 100;
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

	useEffect(() => {
		async function fetchData() {
			// mock collection summary will be placed here
			const response = await getData(`${baseUrl}v1/activity/summary`);
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
				const tweetsSet = removeTweetDuplicates(arraysOfTweetsArray);

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

		fetchData();
	}, []);

	const getCollectionNames = (currentCollections) => {
		return currentCollections
			.slice(0, numberOfCollectionsToShow)
			.map((collection) => collection.name);
	};

	const removeTweetDuplicates = (
		data,
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
		let a = 0;
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
		while (
			tweetsSet.size < tweetsPerSection &&
			localExit < totalTweetsCount &&
			a < 20
		) {
			a++;
			while (localTweetIndex < tweetsLength) {
				for (
					;
					localTweetArrayIndex < arraysOfTweetArrayLength;
					localTweetArrayIndex++
				) {
					if (!!data?.[localTweetArrayIndex]?.[localTweetIndex]) {
						tweetsSet.add(data[localTweetArrayIndex][localTweetIndex]);
						if (tweetsSet.size >= tweetsPerSection) {
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
				if (tweetsSet.size >= tweetsPerSection) {
					break;
				} else {
					localTweetIndex++;
					localTweetArrayIndex = 0;
				}
			}
		}
		if (tweetsSet.size < tweetsPerSection) {
			setExit(localExit);
		}
		return tweetsSet;
	};

	const refreshWhitelistTweets = async () => {
		if (
			(currentPageForWhitelist + 1) * tweetsPerSection >=
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
			const tweetsSet = removeTweetDuplicates(currentAllTweets);
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
			<SocialPicks marginTop="30px">
				{data?.length ? (
					<Fragment>
						<StyledIcon
							icon={faRetweet}
							alignself="flex-end"
							onClick={refreshTweets}
						/>
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
										}}
										placeholder={<StyledIcon icon={faSpinner} pulse />}
									/>
								</StyleTweetWrapper>
							))}
						</TweetsSection>
					</Fragment>
				) : (
					<StyledIcon icon={faSpinner} pulse />
				)}
			</SocialPicks>
			<SocialPicks marginTop="0">
				{currentAllTweetsWhitelist?.length ? (
					<Fragment>
						<StyledIcon
							icon={faRetweet}
							alignself="flex-end"
							onClick={refreshWhitelistTweets}
						/>
						<TweetsSection>
							{currentAllTweetsWhitelist
								.slice(
									currentPageForWhitelist * tweetsPerSection,
									(currentPageForWhitelist + 1) * tweetsPerSection
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
											placeholder={<StyledIcon icon={faSpinner} pulse />}
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
