import { Box, IconButton, useBreakpointValue } from '@chakra-ui/react';
import { useState } from 'react';
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
import Slider from 'react-slick';
import { FallbackImage } from '../Layout/Image';

const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: false,
  speed: 500,
  autoplaySpeed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
  adaptiveHeight: true,
  draggable: true,
};

type CarouselProps = {
  cards: string[]
}

export default function Carousel({cards, ...props}: CarouselProps) {
  const [slider, setSlider] = useState<Slider | null>(null);
  const top = useBreakpointValue({ base: '90%', md: '50%' });
  const side = useBreakpointValue({ base: '30%', md: '10px' });


  return (
    <Box
      position={'relative'}
      height={'600px'}
      width={'full'}
      overflow={'hidden'}>
      {/* CSS files for react-slick */}
      <link
        rel="stylesheet"
        type="text/css"
        charSet="UTF-8"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
      {/* Left Icon */}
      <IconButton
        aria-label="left-arrow"
        colorScheme="messenger"
        borderRadius="full"
        position="absolute"
        left={side}
        top={top}
        transform={'translate(0%, -50%)'}
        zIndex={2}
        onClick={() => slider?.slickPrev()}>
        <BiLeftArrowAlt />
      </IconButton>
      {/* Right Icon */}
      <IconButton
        aria-label="right-arrow"
        colorScheme="messenger"
        borderRadius="full"
        position="absolute"
        right={side}
        top={top}
        transform={'translate(0%, -50%)'}
        zIndex={2}
        onClick={() => slider?.slickNext()}>
        <BiRightArrowAlt />
      </IconButton>
      {/* Slider */}
      <Slider {...settings} ref={(slider) => setSlider(slider)}>
        {
          cards?.length === 0 ? <FallbackImage height={'600px'}></FallbackImage> :
            cards?.map((url, index) => (
              <Box
                key={index}
                height={'600px'}
                width={'100%'}
                position={'static'}
                backgroundPosition="center"
                backgroundRepeat="no-repeat"
                backgroundSize="contain"
                backgroundImage={`url(${url})`}
              />
            ))
        }
      </Slider>
    </Box>
  );
}