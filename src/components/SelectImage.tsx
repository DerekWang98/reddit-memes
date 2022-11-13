import Image from 'next/image';
import { Dialog, IconButton, Modal, Stack } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import React from 'react';
import { useRedditJSON } from '../redditAPI/content';

interface Props {
  open: boolean;
  handleClose: () => void;
  subreddit: string;
}


export default function SelectImage(props: Props) {
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
    <Dialog onClose={handleClose} open={open} maxWidth='xl'>
      <Stack direction='row' spacing={2}>
        <IconButton aria-label="previous" onClick={handlePrevious} size="large">
          <ChevronLeftIcon fontSize='large' />
        </IconButton>
        <Image
          src={redditQuery.data[index]} // Route of the image file
          height={500} // Desired size with correct aspect ratio
          width={500} // Desired size with correct aspect ratio
          alt="Your Name"
        />
        <IconButton aria-label="next" onClick={handleNext} size="large">
          <ChevronRightIcon fontSize='large' />
        </IconButton>
      </Stack>
    </Dialog>
  );
}