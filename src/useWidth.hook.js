import { useState, useEffect, useRef } from 'react';
import { debounce } from 'debounce';

export const useWidth = (debounceTime = 100) => {
  //get element width provided by ref
  const getElementWidth = () => {
    if (elementRef && elementRef.current !== null) {
      const { width } = elementRef.current.getBoundingClientRect();

      return width;
    }
  };

  const [width, setWidth] = useState(null);
  const elementRef = useRef(null);

  //handle resize event with debounce
  const handleResize = debounce(() => {
    if (elementRef) {
      setWidth(getElementWidth());
    }

    return setWidth(window.innerWidth);
  }, debounceTime);

  //add event listener on mount
  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  //update width when ref has changed
  useEffect(() => {
    setWidth(getElementWidth());
  }, [elementRef]);

  return { width, elementRef };
};
