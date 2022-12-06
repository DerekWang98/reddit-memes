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
  videoUrl: string;
}

export default function DisplayImage(props: Props) {
  const { videoUrl } = props;

  return (
    <Responsive>
      <ReactPlayer
        url={videoUrl}
        width='100%'
        height='100%'
        playing
        controls
      />
    </Responsive>
  )
}
