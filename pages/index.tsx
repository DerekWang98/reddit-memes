import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '../src/Link';
import ProTip from '../src/ProTip';
import Copyright from '../src/Copyright';
import MediaContainer from '../src/components/MediaContainer';
import { Button, CircularProgress, TextField } from '@mui/material';
import { useRedditJSON } from '../src/redditAPI/content';

export default function Home() {

  const [open, setOpen] = React.useState(false);
  const [subreddit, setSubreddit] = React.useState('memes');

  const handleOpen = (event: any) => {
    event.stopPropagation(); // Stops the ClickAwayListener event from bubbling up the DOM tree, preventing any parent handlers from being notified of the event.

    setOpen((prev) => !prev);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubredditChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSubreddit(event.target.value);
  };

  // Get subreddit data from the api
  const redditQuery = useRedditJSON(subreddit);

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Reddit Memes
        </Typography>
        <Typography variant="subtitle1" component="h1" gutterBottom>
          The easier way to consume reddit content.
        </Typography>
        <Link href="/about" color="secondary">
          Go to the about page
        </Link>
        <TextField id="standard-basic" label="Subreddit" placeholder="E.g. ProgrammingHumor" variant="standard" onChange={handleSubredditChange} value={subreddit}/>
        {redditQuery.isLoading || !redditQuery.data ?
          <CircularProgress /> : (
            <>
              <Button variant="contained" onClick={handleOpen}>Open</Button>
              <MediaContainer open={open} handleClose={handleClose} data={redditQuery.data} />
            </>
          )
        }
        <ProTip />
        <Copyright />
      </Box>
    </Container>
  );
}
