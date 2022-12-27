import { styled } from '@mui/material/styles';
import React from 'react';
import ReactPlayer from 'react-player/lazy';

const Responsive = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    width: 300,
    height: 200,
  },
  [theme.breakpoints.up('md')]: {
    width: 700,
    height: 500,
  },
  [theme.breakpoints.up('lg')]: {
    width: 1000,
    height: 700,
  },
}));

interface Props {
  url: string;
}

export default function VideoPlayer(props: Props) {
  const { url } = props;

  const [playError, setPlayError] = React.useState<boolean>(false);

  const handleError = () => {
    setPlayError(true);
  }

  return (
    <Responsive>
      {!playError ? (
        <ReactPlayer
          url={url}
          width='100%'
          height='100%'
          playing
          controls
          onError={handleError}
        />
      ) : (
        <video 
          controls 
          autoPlay
          width='100%'
          height='100%'
        >
          <source src={url} type="video/mp4" />
          Sorry, your browser doesn't support embedded videos.
        </video>
      )}
    </Responsive>
  )
}
