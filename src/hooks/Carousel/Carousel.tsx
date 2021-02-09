import { useState } from 'react';

const CarouselHook = () => {
  const [index, setIndex] = useState(0);
  const [movies, setMovies] = useState<Array<any>>([]);

  return { index, setIndex, movies, setMovies };
};

export default CarouselHook;
