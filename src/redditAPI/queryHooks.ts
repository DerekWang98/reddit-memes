import { getRedditJSON, getRedditSubreddits } from "./content";

import { useQuery } from "react-query";

export const useRedditJSON = (subreddit: string) => {
  return useQuery(["reddit", subreddit], () => getRedditJSON(subreddit));
};

export const useRedditSubreddits = () => {
  return useQuery(["subreddits"], () => getRedditSubreddits());
};
