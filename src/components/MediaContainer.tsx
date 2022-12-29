import {
  Backdrop,
  Box,
  ClickAwayListener,
  Container,
  IconButton,
  Stack,
} from "@mui/material";
import React, { useCallback, useEffect } from "react";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ImageRender from "./ImageRender";
import VideoPlayer from "./VideoPlayer";

interface Props {
  open: boolean;
  handleClose: (event: MouseEvent | TouchEvent) => void;
  data: any;
}

export default function MediaContainer(props: Props) {
  // handle what happens on key press
  const handleKeyPress = useCallback((event: any) => {
    if (event.key === "ArrowRight") {
      handleNext();
    } else if (event.key === "ArrowLeft") {
      handlePrevious();
    } else if (event.key === "Escape") {
      handleClose(event);
    }
  }, []);

  useEffect(() => {
    // attach the event listener
    document.addEventListener("keydown", handleKeyPress);

    // remove the event listener
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

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
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
    >
      <ClickAwayListener onClickAway={handleClose}>
        <div role="presentation">
          <Stack direction="row" spacing={2}>
            <IconButton
              aria-label="previous"
              onClick={handlePrevious}
              size="large"
            >
              <ChevronLeftIcon fontSize="large" />
            </IconButton>
            <Container maxWidth="xl">
              {isImage ? (
                <ImageRender url={data[index]} handleError={handleNotImage} />
              ) : (
                <VideoPlayer url={data[index]} />
              )}
            </Container>
            <IconButton aria-label="next" onClick={handleNext} size="large">
              <ChevronRightIcon fontSize="large" />
            </IconButton>
          </Stack>
        </div>
      </ClickAwayListener>
    </Backdrop>
  );
}
