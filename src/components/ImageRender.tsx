import Image from 'next/image';

interface Props {
  url: string;
  handleError: () => void;
}

export default function ImageRender(props: Props) {
  const { url, handleError } = props;

  return (
    <Image
      quality={100}
      alt='Image Unavailable'
      src={url} // Route of the image file
      width={1000} // Desired size with correct aspect ratio
      height={1000} // Desired size with correct aspect ratio
      style={{ objectFit: 'contain', maxInlineSize: '100%', blockSize: 'auto', maxHeight: '80vh' }}
      onError={handleError}
  />
  )
}