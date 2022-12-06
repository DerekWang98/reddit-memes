import Image from 'next/image';
import { Backdrop, Box, ClickAwayListener, Container, IconButton, Stack } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import React from 'react';
import VideoPlayer from './VideoPlayer';

interface Props {
  open: boolean;
  handleClose: (event: MouseEvent | TouchEvent) => void;
  data: any;
}

export default function DisplayImage(props: Props) {
  const { open, handleClose, data } = props;

  // React state to store the index of the current image
  const [index, setIndex] = React.useState(0);

  // React state to check if the url is an image or a video
  const [isImage, setIsImage] = React.useState(true);

  // Handler for the next and previous buttons
  // Index cannot go below 0 or above the length of the array
  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % data.length);
    setIsImage(true);
  };

  const handlePrevious = () => {
    setIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
    setIsImage(true);
  };

  const handleNotImage = () => {
    setIsImage(false);
  };

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
            <Container maxWidth='xl'>
              {
                isImage ? (
                  <Image
                    quality={100}
                    alt='Image Unavailable'
                    src={data[index]} // Route of the image file
                    width={1000} // Desired size with correct aspect ratio
                    height={1000} // Desired size with correct aspect ratio
                    style={{ objectFit: 'contain', maxInlineSize: '100%', blockSize: 'auto', maxHeight: '80vh' }}
                    onError={handleNotImage}
                  />
                ) : (
                  <VideoPlayer videoUrl={data[index]} />
                )
              }
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