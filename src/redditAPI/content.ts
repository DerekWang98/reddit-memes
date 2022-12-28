import axios from "axios";

export const getRedditJSON = async (subreddit: string): Promise<string[]> => {
  const url = `https://www.reddit.com/r/${subreddit}.json`;
  const response = await axios.get(url);

  console.log("response", response.data.data.children);

  // Extract image url from reddit json and remove undefined values
  const imageURLs = response.data.data.children
    .map(dehydrateRedditJSON)
    .filter(Boolean);

  console.log("imageURLs", imageURLs);
  return imageURLs;
};

const dehydrateRedditJSON = (data: any): string | undefined => {
  if (data.data.media) {
    return data.data.media.reddit_video?.fallback_url;
  }
  // If the post is marked as NSFW, return undefined
  if (data.data.over_18) {
    return;
  }
  return data.data.url_overridden_by_dest;
};

export const getRedditSubreddits = async (): Promise<string[]> => {
  const url = `https://www.reddit.com/r/ListOfSubreddits/wiki/listofsubreddits.json`;
  const response = await axios.get(url);
  const subredditNames = filterSubredditNames(response.data.data.content_md);
  return subredditNames;
};

const filterSubredditNames = (data: string): string[] => {
  // Subreddit names are in the format of /r/subredditname
  // This regex will return an array of subreddit names
  // Remove the /r/ from the subreddit name and all duplicates
  const regex = /\/r\/\w+/g;
  const matches = data.match(regex);
  if (matches) {
    const subredditNames = matches
      .map((subreddit) => subreddit.replace("/r/", ""))
      .filter((subreddit, index, self) => self.indexOf(subreddit) === index);
    return subredditNames;
  }
  return [];
};
