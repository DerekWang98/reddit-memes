import Image from 'next/image';
import { Backdrop, Box, ClickAwayListener, Container, Dialog, IconButton, Stack } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import React from 'react';
import { useRedditJSON } from '../redditAPI/content';


interface Props {
  open: boolean;
  handleClose: (event: MouseEvent | TouchEvent) => void;
  subreddit: string;
}


export default function DisplayImage(props: Props) {
  const { open, handleClose, subreddit } = props;

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
  const redditQuery = useRedditJSON(subreddit);

  if (redditQuery.isLoading || !redditQuery.data) {
    return <div>Loading...</div>;
  }

  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
    >
      <ClickAwayListener onClickAway={handleClose}>
        <div role="presentation">
          <Stack direction='row' spacing={2}>
            <IconButton aria-label="previous" onClick={handlePrevious} size="large">
              <ChevronLeftIcon fontSize='large' />
            </IconButton>
            <Container maxWidth="sm">
              <Image
                quality={100}
                alt='Hello'
                src={redditQuery.data[index]} // Route of the image file
                width={1000} // Desired size with correct aspect ratio
                height={1000} // Desired size with correct aspect ratio
                style={{ objectFit: 'contain', maxInlineSize: '100%', blockSize: 'auto', maxHeight: '90vh' }}
              />
            </Container>
            <IconButton aria-label="next" onClick={handleNext} size="large">
              <ChevronRightIcon fontSize='large' />
            </IconButton>
          </Stack>
        </div>

      </ClickAwayListener>
    </Backdrop>
  );
}