import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '../src/Link';
import ProTip from '../src/ProTip';
import Copyright from '../src/Copyright';
import SelectImage from '../src/components/SelectImage';
import { Button, TextField } from '@mui/material';

export default function Home() {

  const [open, setOpen] = React.useState(false);
  const [subreddit, setSubreddit] = React.useState('memes');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubredditChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSubreddit(event.target.value);
  };

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
          MUI v5 + Next.js with TypeScript example
        </Typography>
        <Link href="/about" color="secondary">
          Go to the about page
        </Link>
        <TextField id="standard-basic" label="Subreddit" placeholder="E.g. ProgrammingHumor" variant="standard" onChange={handleSubredditChange} />
        <Button onClick={handleOpen} variant='contained'>Show Images</Button>
        <SelectImage open={open} handleClose={handleClose} subreddit={subreddit} />
        <ProTip />
        <Copyright />
      </Box>
    </Container>
  );
}
