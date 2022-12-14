import * as React from "react";

import {
  Autocomplete,
  Button,
  CircularProgress,
  TextField,
} from "@mui/material";
import {
  useRedditJSON,
  useRedditSubreddits,
} from "../src/redditAPI/queryHooks";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Copyright from "../src/Copyright";
import MediaContainer from "../src/components/MediaContainer";
import Typography from "@mui/material/Typography";

export default function Home() {
  const [open, setOpen] = React.useState(false);
  const [subreddit, setSubreddit] = React.useState("memes");

  const handleOpen = (event: any) => {
    event.stopPropagation(); // Stops the ClickAwayListener event from bubbling up the DOM tree, preventing any parent handlers from being notified of the event.

    setOpen((prev) => !prev);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubredditChange = (
    _: React.SyntheticEvent<Element, Event>,
    newInputValue: string,
  ) => {
    setSubreddit(newInputValue);
  };

  // Get subreddit data from the api
  const redditQuery = useRedditJSON(subreddit);
  const subredditQuery = useRedditSubreddits();

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Reddit Memes
        </Typography>
        <Typography variant="subtitle1" component="h1" gutterBottom>
          The easier way to consume reddit content.
        </Typography>
        {subredditQuery.isLoading || !subredditQuery.data ? (
          <CircularProgress />
        ) : (
          <Autocomplete
            disablePortal
            freeSolo
            id="subreddit-select"
            options={subredditQuery.data}
            onInputChange={handleSubredditChange}
            value={subreddit}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Subreddit" />
            )}
          />
        )}
        {redditQuery.isLoading || !redditQuery.data ? (
          <CircularProgress />
        ) : (
          <>
            <Button
              variant="contained"
              onClick={handleOpen}
              disabled={!redditQuery.data.length}
            >
              Open
            </Button>
            <MediaContainer
              open={open}
              handleClose={handleClose}
              data={redditQuery.data}
            />
          </>
        )}
        <Copyright />
      </Box>
    </Container>
  );
}
