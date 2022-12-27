import { styled } from '@mui/material/styles';
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

  return (
    <Responsive>
      <ReactPlayer
        url={url}
        width='100%'
        height='100%'
        playing
        controls
      />
    </Responsive>
  )
}
