import axios from "axios";

export const getData = async (url) => {
	try {
		const response = await axios.get(url);
		if (response.status === 200) {
			return response.data;
		}
	} catch (error) {
		console.error(error);
		return error.response;
	}
};

export const getTweetsByQuery = async (query, max, paginationToken) => {
	try {
		const response = await axios.get(
			`/2/tweets/search/recent?${
				query ? `query=${query} -is:retweet -is:quote -is:reply&` : ""
			}tweet.fields=author_id,created_at,entities,geo,in_reply_to_user_id,lang,possibly_sensitive,referenced_tweets,source${
				max ? `&max_results=${max}` : ""
			}${paginationToken ? `&pagination_token=${paginationToken}` : ""}`,
			{
				headers: {
					Accept: "application/json",
					Authorization: `Bearer ${process.env.REACT_APP_BEARER_TOKEN}`,
				},
			}
		);
		if (response.status === 200) {
			return response.data;
		}
	} catch (error) {
		console.error(error);
		return error.response;
	}
};
