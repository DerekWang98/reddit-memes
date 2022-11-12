import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '../src/Link';
import ProTip from '../src/ProTip';
import Copyright from '../src/Copyright';
import { useRedditJSON } from '../src/redditAPI/content';
import Image from 'next/image';
import { Backdrop, IconButton } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

export default function Home() {

  // React state to store the index of the current image
  const [index, setIndex] = React.useState(0);

  // Handler for the next and previous buttons
  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex + 1));
  };

  const handlePrevious = () => {
    setIndex((prevIndex) => (prevIndex - 1));
  };

  // Get subreddit data from the api
  const redditQuery = useRedditJSON('memes');

  if (redditQuery.isLoading || !redditQuery.data) {
    return <div>Loading...</div>;
  }

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
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <IconButton aria-label="previous" onClick={handlePrevious}>
            <ChevronLeftIcon />
          </IconButton>
            <Image
              src={redditQuery.data[index]} // Route of the image file
              height={500} // Desired size with correct aspect ratio
              width={500} // Desired size with correct aspect ratio
              alt="Your Name"
            />
          <IconButton aria-label="next" onClick={handleNext}>
            <ChevronRightIcon />
          </IconButton>
        </Backdrop>
        <ProTip />
        <Copyright />
      </Box>
    </Container>
  );
}
