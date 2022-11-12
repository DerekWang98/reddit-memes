import axios from "axios";
import { useQuery } from "react-query";

const getRedditJSON = async (subreddit: string): Promise<string[]> => {
  const url = `https://www.reddit.com/r/${subreddit}.json`;
  const response = await axios.get(url);

  // Extract image url from reddit json
  const imageURLs = response.data.data.children.map(dehydrateRedditJSON);
  return imageURLs;
};

const dehydrateRedditJSON = (data: any) => {
  return data.data.url_overridden_by_dest
}

export const useRedditJSON = (subreddit: string) => {
  return useQuery(["reddit", subreddit], () => getRedditJSON(subreddit));
}

export const getImageURLfromRedditJSON = (data: any) => {
  const imageURL = data?.data?.children[0]?.data?.url;
  return imageURL;
};

