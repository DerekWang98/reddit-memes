import axios from "axios";
import { useQuery } from "react-query";

const getRedditJSON = async (subreddit: string): Promise<string[]> => {
  const url = `https://www.reddit.com/r/${subreddit}.json`;
  const response = await axios.get(url);

  // Extract image url from reddit json and remove undefined values
  const imageURLs = response.data.data.children.map(dehydrateRedditJSON).filter(Boolean);
  return imageURLs;
};

const dehydrateRedditJSON = (data: any) => {
  if (data.data.media) {
    return data.data.media.reddit_video.fallback_url;
  };
  return data.data.url_overridden_by_dest
};

export const useRedditJSON = (subreddit: string) => {
  return useQuery(["reddit", subreddit], () => getRedditJSON(subreddit));
};
